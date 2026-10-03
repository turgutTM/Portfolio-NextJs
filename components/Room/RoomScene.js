// Vanilla three.js scene for the room. React talks to it through the small API returned at the bottom.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { META, PJ, SK, I, BOOK_COLORS } from "./content";

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{
 *   fonts:{display:string, body:string},
 *   hotEls:()=>Record<string,HTMLElement>, tip:HTMLElement,
 *   label:(key:string)=>string,
 *   onActivate:(key:string|null)=>void, onBook:(i:number)=>void, onReady:()=>void
 * }} opts
 */
export function createRoomScene(canvas, opts) {
const F = opts.fonts;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const state = { focus:null, proj:0, skill:0, lang:"en", mode:"day" };
const NP = META.length;

let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true }); } catch (e) { return null; }
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
let pmremRef = null;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
renderer.physicallyCorrectLights = false;
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,200);
{
  const pm = new THREE.PMREMGenerator(renderer); pmremRef = pm;
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
}
const ANISO = renderer.capabilities.getMaxAnisotropy();

const hemi = new THREE.HemisphereLight(0xffffff, 0x8890a8, .35); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff4e6, 1.1);
sun.position.set(9, 14, 7); sun.castShadow = true; sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera, {left:-9,right:9,top:9,bottom:-9,near:1,far:50}); sun.shadow.bias = -0.0005; sun.shadow.normalBias = .02; sun.shadow.radius = 5;
scene.add(sun);
const lampLight = new THREE.PointLight(0xffc27a, 1.2, 9, 2); lampLight.castShadow = true; lampLight.shadow.mapSize.set(512,512); lampLight.shadow.bias = -.002;
scene.add(lampLight);

const room = new THREE.Group(); scene.add(room);
const MATS = [];
const col = h => new THREE.Color(h).convertSRGBToLinear();
function mat(c, o={}){ const m = new THREE.MeshStandardMaterial(Object.assign({color:col(c), roughness:.7, metalness:0}, o)); MATS.push(m); return m; }
function tmat(map, o={}){ const m = new THREE.MeshStandardMaterial(Object.assign({map, roughness:.7, metalness:0}, o)); MATS.push(m); return m; }
function ctex(cv, rx=1, ry=1){ const t = new THREE.CanvasTexture(cv); t.encoding = THREE.sRGBEncoding; t.anisotropy = ANISO;
  if (rx !== 1 || ry !== 1){ t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); } return t; }
function cnv(w,h){ const c = document.createElement("canvas"); c.width = w; c.height = h; return [c, c.getContext("2d")]; }
let SEED = 42; const rnd = () => (SEED = (SEED*16807) % 2147483647) / 2147483647;
const RB = (w,h,d,r=.03,s=3) => new RoundedBoxGeometry(w,h,d,s,Math.min(r, w/2-.001, h/2-.001, d/2-.001));
function add(geo, m, x,y,z, parent=room, cast=true){ const o = new THREE.Mesh(geo, m); o.position.set(x,y,z); o.castShadow = cast; o.receiveShadow = true; parent.add(o); return o; }
function rod(a, b, r, m, parent=room){
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), d = B.clone().sub(A);
  const o = add(new THREE.CylinderGeometry(r, r, d.length(), 16), m, 0,0,0, parent);
  o.position.copy(A).add(B).multiplyScalar(.5);
  o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), d.normalize()); return o;
}

/* ---------- procedural textures ---------- */
function woodCanvas(base, dark, planks, w=1024, h=1024, stagger=true){
  const [c,g] = cnv(w,h); const ph = h/planks;
  for (let p=0;p<planks;p++){
    const tone = (rnd()-.5)*18;
    const off = stagger ? rnd()*w : 0, segs = stagger ? 2 : 1;
    for (let s=0;s<segs;s++){
      const x0 = (off + s*w/segs) % w;
      const draw = (x) => {
        const b = new THREE.Color(base); b.offsetHSL(0, 0, tone/255);
        g.globalAlpha = 1; g.fillStyle = "#" + b.getHexString(); g.fillRect(x, p*ph, w/segs, ph);
        for (let l=0;l<26;l++){                       // grain
          g.strokeStyle = dark; g.globalAlpha = .05 + rnd()*.12; g.lineWidth = .6 + rnd()*1.6;
          const y = p*ph + rnd()*ph, amp = 1 + rnd()*3, fq = .004 + rnd()*.01, ph0 = rnd()*6;
          g.beginPath(); for (let xx=0; xx<=w/segs; xx+=8){ const yy = y + Math.sin(xx*fq + ph0)*amp; xx? g.lineTo(x+xx,yy) : g.moveTo(x+xx,yy); } g.stroke();
        }
        if (rnd() < .5){ g.globalAlpha = .18; g.fillStyle = dark; g.beginPath(); g.ellipse(x + rnd()*w/segs, p*ph + ph/2, 10+rnd()*14, 3+rnd()*3, 0, 0, 7); g.fill(); }
        g.globalAlpha = .55; g.fillStyle = dark; g.fillRect(x, p*ph, 2, ph);   // end joint
      };
      draw(x0); if (x0 + w/segs > w) draw(x0 - w);
    }
    g.globalAlpha = .5; g.fillStyle = dark; g.fillRect(0, p*ph, w, 2);         // seam
  }
  g.globalAlpha = 1; return c;
}
function noiseCanvas(base, amt, w=256, h=256, weave=false){
  const [c,g] = cnv(w,h); g.fillStyle = base; g.fillRect(0,0,w,h);
  const id = g.getImageData(0,0,w,h), d = id.data;
  for (let i=0;i<d.length;i+=4){
    const x = (i/4)%w, y = Math.floor(i/4/w);
    let n = (rnd()-.5)*amt;
    if (weave) n += ((x%4<2) ^ (y%4<2) ? 10 : -10);
    d[i] += n; d[i+1] += n; d[i+2] += n;
  }
  g.putImageData(id,0,0); return c;
}
function rugCanvas(){
  const W = 1024, H = 680, [c,g] = cnv(W,H);
  const cream = "#ece6d8", navy = "#1c2238", cob = "#2b3bff", rust = "#a4553a", sand = "#cdbf9f";
  g.fillStyle = cream; g.fillRect(0,0,W,H);
  const band = (i, col) => { g.fillStyle = col; g.fillRect(i,i,W-2*i,H-2*i); };
  band(18, navy); band(44, cream); band(58, cob); band(70, cream); band(98, sand); band(104, cream);
  // central medallions
  g.save(); g.translate(W/2,H/2);
  for (let k=-2;k<=2;k++){
    const x = k*170, s = k===0 ? 1.35 : 1;
    const dia = (r, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(x, -r*1.25*s); g.lineTo(x + r*s, 0); g.lineTo(x, r*1.25*s); g.lineTo(x - r*s, 0); g.closePath(); g.fill(); };
    dia(90, navy); dia(70, cream); dia(54, k%2 ? rust : cob); dia(30, cream); dia(14, navy);
  }
  g.restore();
  // little hooks along the border
  g.fillStyle = navy;
  for (let x=130; x<W-130; x+=34){ g.fillRect(x, 80, 12, 12); g.fillRect(x, H-92, 12, 12); }
  // weave + wear
  const id = g.getImageData(0,0,W,H), d = id.data;
  for (let i=0;i<d.length;i+=4){
    const x = (i/4)%W, y = Math.floor(i/4/W);
    const n = (rnd()-.5)*26 + ((y%3===0) ? -14 : 0) + ((x%6<3) ? 4 : -4);
    d[i] += n; d[i+1] += n; d[i+2] += n;
  }
  g.putImageData(id,0,0); return c;
}
const SPINE_TITLES = ["FRONTEND","BACKEND","UI / UX","MOBILE","AI","SECURITY","DEVOPS","3D & BLENDER"];
function spineCanvas(bg, title, fg, deco){
  const [c,g] = cnv(128,512);
  g.fillStyle = bg; g.fillRect(0,0,128,512);
  const gr = g.createLinearGradient(0,0,128,0);   // rounded spine shading
  gr.addColorStop(0,"rgba(0,0,0,.35)"); gr.addColorStop(.25,"rgba(255,255,255,.08)"); gr.addColorStop(.6,"rgba(0,0,0,0)"); gr.addColorStop(1,"rgba(0,0,0,.4)");
  g.fillStyle = gr; g.fillRect(0,0,128,512);
  g.fillStyle = fg; g.globalAlpha = .9;
  if (deco % 2 === 0){ g.fillRect(0,34,128,5); g.fillRect(0,46,128,2); g.fillRect(0,466,128,2); g.fillRect(0,474,128,5); }
  else { g.fillRect(14,24,100,2); g.fillRect(14,488,100,2); g.beginPath(); g.arc(64,440,10,0,7); g.fill(); }
  g.save(); g.translate(64,256); g.rotate(-Math.PI/2);
  g.textAlign = "center"; g.textBaseline = "middle";
  let fs = 46; g.font = `800 ${fs}px ${F.display}`;
  while (g.measureText(title).width > 360 && fs > 18){ fs -= 2; g.font = `800 ${fs}px ${F.display}`; }
  g.fillText(title, 0, 0); g.restore(); g.globalAlpha = 1;
  return c;
}
function pagesCanvas(){
  const [c,g] = cnv(64,256); g.fillStyle = "#efe8d6"; g.fillRect(0,0,64,256);
  for (let x=0;x<64;x+=2){ g.fillStyle = `rgba(120,100,70,${.05+rnd()*.12})`; g.fillRect(x,0,1,256); }
  return c;
}
function leafShape(){
  const s = new THREE.Shape();
  s.moveTo(0,0); s.bezierCurveTo(.32,.18,.38,.62,0,1); s.bezierCurveTo(-.38,.62,-.32,.18,0,0); return s;
}

/* materials */
const floorTex = ctex(woodCanvas("#c79d70","#5b3a22",8), 2, 2);
const walnutTex = ctex(woodCanvas("#6e4a32","#2e1b10",4,1024,512,false));
const oakTex = ctex(woodCanvas("#d2b08a","#7a5636",6,512,512,false));
const plasterTex = ctex(noiseCanvas("#e9eaee", 7), 6, 6);
const plasterBlue = ctex(noiseCanvas("#cfd5e4", 7), 6, 6);
const fabricTex = ctex(noiseCanvas("#3140d4", 26, 128, 128, true), 6, 6);
const meshTex = ctex(noiseCanvas("#22242c", 30, 128, 128, true), 8, 8);
const curtainTex = ctex(noiseCanvas("#e4e6ee", 16, 128, 128, true), 4, 8);
const basketTex = ctex(noiseCanvas("#b89a6b", 60, 128, 128, true), 3, 3);
const M = {
  floorSide: mat("#a98a68",{roughness:.8}),
  wood: tmat(floorTex,{roughness:.55}),
  walnut: tmat(walnutTex,{roughness:.45}),
  oak: tmat(oakTex,{roughness:.6}),
  wall: tmat(plasterTex,{roughness:.95}),
  wallB: tmat(plasterBlue,{roughness:.95}),
  white: mat("#f4f4f2",{roughness:.4}),
  ceramic: mat("#f6f5f2",{roughness:.22}),
  black: mat("#16171b",{roughness:.45}),
  plastic: mat("#1b1c21",{roughness:.38}),
  metal: mat("#2a2c31",{roughness:.32,metalness:.75}),
  chrome: mat("#d9dce2",{roughness:.15,metalness:1}),
  alu: mat("#c8ccd4",{roughness:.3,metalness:.8}),
  fabric: tmat(fabricTex,{roughness:.95}),
  meshF: tmat(meshTex,{roughness:.9}),
  cobalt: mat("#2b3bff",{roughness:.35,metalness:.25}),
  key: mat("#f1f2f4",{roughness:.5}),
  curtain: tmat(curtainTex,{roughness:.95, side:THREE.DoubleSide}),
  soil: mat("#3a2a1e",{roughness:1}),
  basket: tmat(basketTex,{roughness:.95})
};

/* ---------- shell ---------- */
add(new THREE.BoxGeometry(10.6,.5,10.6), [M.floorSide,M.floorSide,M.wood,M.floorSide,M.floorSide,M.floorSide], 0,-.25,0, room, false);
add(new THREE.BoxGeometry(.3,6.2,10.6), M.wall, -5.15,3.1,0, room, false);
add(new THREE.BoxGeometry(10.6,6.2,.3), M.wallB, 0,3.1,-5.15, room, false);
add(RB(.07,.22,10.3,.02), M.white, -4.97,.11,.15); add(RB(10.3,.22,.07,.02), M.white, .15,.11,-4.97);

/* ---------- rug with fringe ---------- */
const rugTex = ctex(rugCanvas());
const rugTop = tmat(rugTex,{roughness:1}), rugSide = mat("#e6dfcf",{roughness:1});
const rug = add(new THREE.BoxGeometry(5.4,.035,3.6), [rugSide,rugSide,rugTop,rugSide,rugSide,rugSide], .45,.018,-1.55, room, false);
rug.rotation.y = Math.PI/2; rug.position.set(.55,.018,-1.2);
{ const fr = new THREE.InstancedMesh(new THREE.BoxGeometry(.018,.006,.2), mat("#ebe4d3",{roughness:1}), 120);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  let n = 0;
  for (const side of [-1,1]) for (let i=0;i<60;i++){
    const x = .55 - 1.75 + i*(3.5/59), z = -1.2 + side*(2.7 + .09);
    e.set(0, (rnd()-.5)*.35, 0); q.setFromEuler(e);
    m4.compose(new THREE.Vector3(x + (rnd()-.5)*.02, .006, z), q, new THREE.Vector3(1,1,.8 + rnd()*.4)); fr.setMatrixAt(n++, m4);
  }
  fr.receiveShadow = true; room.add(fr); }

/* interactive groups */
const groups = {};
function G(key){ const g = new THREE.Group(); g.userData.key = key; g.userData.hl = 0; room.add(g); groups[key] = g; return g; }

/* ---------- desk ---------- */
const desk = new THREE.Group(); room.add(desk);
add(RB(4.6,.12,1.9,.04), M.walnut, .6,1.9,-3.95, desk);
for (const x of [-1.55, 2.75]){
  rod([x,0,-4.7],[x,1.84,-4.7],.045,M.metal,desk); rod([x,0,-3.2],[x,1.84,-3.2],.045,M.metal,desk);
  rod([x,.06,-4.8],[x,.06,-3.1],.05,M.metal,desk); rod([x,1.8,-4.7],[x,1.8,-3.2],.035,M.metal,desk);
}
rod([-1.55,1.78,-4.7],[2.75,1.78,-4.7],.03,M.metal,desk);
// drawer unit
add(RB(.95,1.45,1.45,.04), M.white, 2.05,.76,-4.0, desk);
for (const y of [.42, .9, 1.3]){ add(new THREE.BoxGeometry(.008,.01,1.3), M.black, 2.53,y+.2,-4.0, desk, false); add(RB(.04,.04,.28,.015), M.alu, 2.55,y,-4.0, desk); }
// mouse pad, keyboard + keycaps, mouse
add(RB(1.15,.012,.75,.006), mat("#24262d",{roughness:.95}), 1.55,1.968,-3.55, desk, false);
add(RB(1.55,.05,.52,.02), M.alu, .45,1.985,-3.5, desk);
{ const cols = 15, rows = 4, kw = .085, gap = .013;
  const caps = new THREE.InstancedMesh(RB(kw,.03,kw,.012,2), M.key, cols*rows);
  const m4 = new THREE.Matrix4(); let n = 0;
  for (let r=0;r<rows;r++) for (let c=0;c<cols;c++){ m4.makeTranslation(.45 - (cols-1)*(kw+gap)/2 + c*(kw+gap), 2.02, -3.5 - .15 + r*(kw+gap) - (r===3?0:0)); caps.setMatrixAt(n++, m4); }
  caps.castShadow = true; desk.add(caps);
  add(RB(.55,.03,kw,.012,2), M.key, .45,2.02,-3.5+.15+ (kw+gap)*0.0 + .1, desk); }
{ const mouse = add(new THREE.SphereGeometry(1,24,16), M.ceramic, 1.6,1.99,-3.5, desk); mouse.scale.set(.1,.05,.16); }
// notebook + pen
add(RB(.6,.05,.82,.02), mat("#2b3bff",{roughness:.6}), -.4,1.99,-4.55, desk).rotation.y = -.2;
add(RB(.56,.04,.78,.01), mat("#f0ead9",{roughness:.9}), -.38,1.985,-4.55, desk).rotation.y = -.2;
rod([-.2,2.03,-4.25],[.15,2.03,-4.55],.018,M.black,desk);
// mug (lathe) + steam
const mugPts = [[0,0],[.15,0],[.16,.02],[.17,.31],[.155,.31],[.145,.04],[0,.04]].map(p=>new THREE.Vector2(...p));
const mug = add(new THREE.LatheGeometry(mugPts, 40), mat("#2b3bff",{roughness:.25,side:THREE.DoubleSide}), 2.35,1.96,-3.7, desk);
add(new THREE.CircleGeometry(.145,32), mat("#3b2114",{roughness:.2}), 2.35,2.22,-3.7, desk, false).rotation.x = -Math.PI/2;
{ const h = add(new THREE.TorusGeometry(.085,.022,10,24,Math.PI), mug.material, 2.52,2.12,-3.7, desk); h.rotation.z = -Math.PI/2; }
const steam = [];
for (let i=0;i<3;i++){ const s = new THREE.Mesh(new THREE.SphereGeometry(.06,10,10), new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.5,depthWrite:false})); s.userData.o = i/3; desk.add(s); steam.push(s); }

/* ---------- office chair ---------- */
const chair = new THREE.Group(); chair.position.set(.6,0,-2.3); chair.rotation.y = .3; room.add(chair);
for (let i=0;i<5;i++){
  const a = i/5*Math.PI*2, arm = new THREE.Group(); arm.rotation.y = a; chair.add(arm);
  const b = add(RB(.09,.07,.62,.03), M.plastic, 0,.2,.31, arm); b.rotation.x = -.12;
  rod([0,.18,.6],[0,.12,.62],.02,M.metal,arm);
  const w = add(new THREE.CylinderGeometry(.065,.065,.07,20), M.plastic, 0,.07,.62, arm); w.rotation.z = Math.PI/2;
}
add(new THREE.CylinderGeometry(.11,.13,.12,24), M.plastic, 0,.24,0, chair);
add(new THREE.CylinderGeometry(.075,.075,.32,24), M.plastic, 0,.42,0, chair);
add(new THREE.CylinderGeometry(.05,.05,.38,24), M.chrome, 0,.74,0, chair);
add(RB(.55,.08,.55,.02), M.plastic, 0,.94,0, chair);
add(RB(1.2,.2,1.15,.09,4), M.fabric, 0,1.08,0, chair);
// curved mesh backrest
{ const geo = new THREE.BoxGeometry(1.12,1.3,.1,20,10,1); const p = geo.attributes.position;
  for (let i=0;i<p.count;i++){ const x = p.getX(i), y = p.getY(i); p.setZ(i, p.getZ(i) - .32*x*x + .06*Math.cos(y*2.2)); }
  geo.computeVertexNormals();
  const back = add(geo, M.meshF, 0,1.95,.6, chair); back.rotation.x = -.12;
  const frame = add(new THREE.TorusGeometry(.62,.025,8,40), M.plastic, 0,1.95,.63, chair); frame.scale.set(.92,1.07,1); frame.rotation.x = -.12; }
rod([0,1.02,.45],[0,1.35,.62],.045,M.plastic,chair);
for (const s of [-1,1]){
  rod([s*.5,1.12,.12],[s*.62,1.5,.12],.035,M.plastic,chair);
  add(RB(.14,.06,.52,.03), M.plastic, s*.62,1.53,.08, chair);
}

/* ---------- plant (fiddle-leaf) ---------- */
const plant = new THREE.Group(); plant.position.set(-4.2,0,-4.2); room.add(plant);
add(new THREE.LatheGeometry([[0,0],[.36,0],[.4,.05],[.5,.85],[.47,.86],[.44,.8],[0,.8]].map(p=>new THREE.Vector2(...p)), 40), M.ceramic, 0,0,0, plant);
add(new THREE.CircleGeometry(.44,32), M.soil, 0,.815,0, plant, false).rotation.x = -Math.PI/2;
rod([0,.8,0],[.05,2.6,-.05],.035,mat("#5a4330"),plant);
{ const leafGeo = new THREE.ShapeGeometry(leafShape(), 10);
  for (let i=0;i<26;i++){
    const t = i/26, y = 1.25 + t*1.55, a = i*2.4;
    const l = new THREE.Mesh(leafGeo, mat(new THREE.Color().setHSL(.27 + rnd()*.05, .45, .2 + rnd()*.1).getStyle(), {side:THREE.DoubleSide, roughness:.55}));
    const s = .38 + (1-t)*.18 + rnd()*.08; l.scale.set(s, s*1.15, s);
    l.position.set(Math.cos(a)*.06, y, Math.sin(a)*.06);
    l.rotation.set(0, a, 0); l.rotateX(-(.5 + rnd()*.5)); l.rotateZ((rnd()-.5)*.4);
    l.castShadow = true; plant.add(l);
  } }

/* ---------- monitor = projects ---------- */
const gP = G("projects");
add(RB(.75,.035,.45,.015), M.alu, .6,1.98,-4.5, gP);
rod([.6,1.99,-4.6],[.6,2.6,-4.62],.05,M.alu,gP);
add(RB(2.78,1.62,.08,.04), M.plastic, .6,3.05,-4.5, gP);
const monCanvas = document.createElement("canvas"); monCanvas.width = 1024; monCanvas.height = 576;
const monTex = ctex(monCanvas);
const monitor = add(new THREE.PlaneGeometry(2.66,1.5), new THREE.MeshBasicMaterial({map:monTex, toneMapped:false}), .6,3.06,-4.455, gP, false);

/* ---------- phone = contact ---------- */
const gC = G("contact");
const phoneCanvas = document.createElement("canvas"); phoneCanvas.width = 360; phoneCanvas.height = 720;
const phoneTex = ctex(phoneCanvas);
const phone = new THREE.Group(); phone.position.set(-.75,1.985,-3.55); phone.rotation.y = .3; gC.add(phone);
add(RB(.4,.045,.8,.05), M.plastic, 0,0,0, phone);
add(new THREE.PlaneGeometry(.36,.74), new THREE.MeshBasicMaterial({map:phoneTex, toneMapped:false}), 0,.0235,0, phone, false).rotation.x = -Math.PI/2;
const phoneHit = new THREE.Mesh(new THREE.BoxGeometry(1,.5,1.3), new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
phoneHit.position.set(-.75,2.15,-3.55); gC.add(phoneHit);

/* ---------- architect lamp ---------- */
const gL = G("lamp");
add(new THREE.LatheGeometry([[0,0],[.27,0],[.28,.02],[.22,.07],[0,.08]].map(p=>new THREE.Vector2(...p)),32), M.cobalt, -1.55,1.96,-4.45, gL);
const J1 = [-1.55,2.06,-4.45], J2 = [-1.62,2.95,-4.62], J3 = [-1.38,3.22,-4.05];
rod(J1,J2,.028,M.metal,gL); rod(J2,J3,.028,M.metal,gL);
for (const j of [J1,J2]) add(new THREE.SphereGeometry(.05,16,12), M.metal, ...j, gL);
const shade = add(new THREE.LatheGeometry([[.05,0],[.07,.05],[.12,.12],[.24,.32],[.25,.34]].map(p=>new THREE.Vector2(...p)),32), mat("#2b3bff",{roughness:.3,metalness:.4,side:THREE.DoubleSide}), ...J3, gL);
shade.rotation.x = Math.PI - .55;
const bulb = new THREE.Mesh(new THREE.SphereGeometry(.09,16,16), new THREE.MeshBasicMaterial({color:0xfff1d6, toneMapped:false}));
bulb.position.set(-1.38,3.04,-3.93); gL.add(bulb);
lampLight.position.set(-1.33,2.88,-3.8);
let lampOn = true;

/* ---------- bookshelf = skills ---------- */
const gS = G("skills");
const SX = -4.55;
for (const y of [.12,1.25,2.45,3.65]) add(RB(.95,.07,2.8,.015), M.oak, SX,y,-2.0, gS);
add(RB(.95,3.82,.08,.015), M.oak, SX,1.9,-3.4, gS); add(RB(.95,3.82,.08,.015), M.oak, SX,1.9,-.6, gS);
add(new THREE.BoxGeometry(.04,3.7,2.72), M.oak, SX-.46,1.9,-2.0, gS, false);
// baskets
add(RB(.8,.95,1.15,.05), M.basket, SX+.02,.64,-2.68, gS); add(RB(.8,.95,1.15,.05), M.basket, SX+.02,.64,-1.32, gS);
// skill books
const books = [];
const BH = [.9,.98,.78,.92,.84,.8,.95,1.0], BT = [.24,.2,.3,.22,.26,.2,.28,.24];
const pagesTex = ctex(pagesCanvas());
const pagesM = tmat(pagesTex,{roughness:.9});
let zc = [-3.25,-3.25];
BOOK_COLORS.forEach((c,i) => {
  const shelf = i < 4 ? 0 : 1, y0 = shelf === 0 ? 1.285 : 2.485, h = BH[i], t = BT[i];
  const z = zc[shelf] + t/2; zc[shelf] += t + .04;
  const light = ["#e9e2d0","#cdbf9f"].includes(c);
  const spine = tmat(ctex(spineCanvas(c, SPINE_TITLES[i], light ? "#1c2238" : "#e9d9a6", i)),{roughness:.6});
  const cover = mat(c,{roughness:.6});
  const b = add(new THREE.BoxGeometry(.72,h,t), [spine,pagesM,pagesM,cover,cover,cover], SX+.05,y0+h/2,z, gS);
  b.userData.bx = SX+.05; b.userData.book = i; books.push(b);
});
// filler books: a leaning one and a horizontal stack
{ const lean = add(new THREE.BoxGeometry(.72,.86,.2), [tmat(ctex(spineCanvas("#7a2f36","NOTES","#e9d9a6",1))),pagesM,pagesM,mat("#7a2f36"),mat("#7a2f36"),mat("#7a2f36")], SX+.05,1.285+.41,-1.0, gS);
  lean.rotation.x = -.3;
  [["#1c2238","ARCHIVE"],["#cdbf9f","SKETCH"],["#2f4a3a","IDEAS"]].forEach(([c2,t2],k) => {
    const s = add(new THREE.BoxGeometry(.72 - k*.05,.14,.95 - k*.06), [mat(c2),mat(c2),pagesM,mat(c2),mat(c2),mat(c2)], SX+.05,2.485+.07+k*.14,-1.2, gS);
    s.rotation.y = (rnd()-.5)*.2;
  }); }
// globe + vase on the top shelf
const globeCanvas = (() => { const [c,g] = cnv(512,256); g.fillStyle = "#2b3bff"; g.fillRect(0,0,512,256);
  g.fillStyle = "#e9e2d0"; for (let i=0;i<26;i++){ g.beginPath(); g.ellipse(rnd()*512, 40+rnd()*176, 20+rnd()*50, 10+rnd()*30, rnd()*3, 0, 7); g.fill(); } return c; })();
const trophy = add(new THREE.SphereGeometry(.26,32,24), tmat(ctex(globeCanvas),{roughness:.4}), SX,4.08,-2.6, gS);
trophy.rotation.z = .4;
add(new THREE.TorusGeometry(.3,.012,8,40,Math.PI), M.alu, SX,4.08,-2.6, gS).rotation.set(0,Math.PI/2,.4);
add(new THREE.CylinderGeometry(.1,.14,.08,24), M.alu, SX,3.73,-2.6, gS);
add(new THREE.LatheGeometry([[0,0],[.14,0],[.18,.12],[.12,.36],[.08,.42],[.1,.46],[0,.46]].map(p=>new THREE.Vector2(...p)),32), M.ceramic, SX,3.69,-1.5, gS);
rod([SX,4.1,-1.5],[SX+.05,4.55,-1.45],.008,mat("#5a4330"),gS);

/* ---------- poster = about ---------- */
const gA = G("about");
const posterCanvas = document.createElement("canvas"); posterCanvas.width = 512; posterCanvas.height = 704;
const posterTex = ctex(posterCanvas);
add(RB(.06,2.5,1.9,.015), M.black, -4.97,3.4,1.9, gA, false);
add(new THREE.PlaneGeometry(1.78,2.38), mat("#f4f4f2",{roughness:.9}), -4.935,3.4,1.9, gA, false).rotation.y = Math.PI/2;
const poster = add(new THREE.PlaneGeometry(1.5,2.06), new THREE.MeshStandardMaterial({map:posterTex,roughness:.6}), -4.93,3.4,1.9, gA, false);
poster.rotation.y = Math.PI/2; MATS.push(poster.material);

/* ---------- pixel frame ---------- */
const gX = G("pixel");
const pxCanvas = document.createElement("canvas"); pxCanvas.width = pxCanvas.height = 192;
const pxTex = ctex(pxCanvas); pxTex.magFilter = THREE.NearestFilter; pxTex.minFilter = THREE.NearestFilter;
add(RB(1.42,1.42,.07,.015), M.oak, -2.55,4.15,-4.97, gX, false);
add(new THREE.PlaneGeometry(1.24,1.24), mat("#f4f4f2"), -2.55,4.15,-4.93, gX, false);
const pxPlane = add(new THREE.PlaneGeometry(1.0,1.0), new THREE.MeshStandardMaterial({map:pxTex,roughness:.8}), -2.55,4.15,-4.925, gX, false);
MATS.push(pxPlane.material);

/* ---------- window + curtains ---------- */
const skyCanvas = document.createElement("canvas"); skyCanvas.width = 512; skyCanvas.height = 460;
const skyTex = ctex(skyCanvas);
add(RB(2.5,2.3,.12,.02), M.white, 3.4,3.6,-4.96, room, false);
const glass = add(new THREE.PlaneGeometry(2.2,2.0), new THREE.MeshBasicMaterial({map:skyTex, toneMapped:false}), 3.4,3.6,-4.89, room, false);
add(new THREE.BoxGeometry(.07,2.0,.06), M.white, 3.4,3.6,-4.86, room, false); add(new THREE.BoxGeometry(2.2,.07,.06), M.white, 3.4,3.6,-4.86, room, false);
add(RB(2.75,.1,.38,.02), M.white, 3.4,2.42,-4.8);
rod([1.85,5.25,-4.72],[4.95,5.25,-4.72],.025,M.metal);
for (const cx of [2.1, 4.7]){
  const geo = new THREE.PlaneGeometry(.75,3.3,24,1), p = geo.attributes.position;
  for (let i=0;i<p.count;i++){ const x = p.getX(i), y = p.getY(i); p.setZ(i, Math.sin(x*26)*.05 + (y<-1.4 ? Math.sin(x*26)*.02 : 0)); }
  geo.computeVertexNormals();
  add(geo, M.curtain, cx,3.55,-4.68);
}

/* ---------- clock ---------- */
const clock = new THREE.Group(); clock.position.set(.6,4.85,-4.96); room.add(clock);
const clockCanvas = (() => { const [c,g] = cnv(256,256); g.fillStyle = "#f6f5f2"; g.fillRect(0,0,256,256); g.fillStyle = "#16171b";
  for (let i=0;i<60;i++){ g.save(); g.translate(128,128); g.rotate(i/60*Math.PI*2); const big = i%5===0; g.fillRect(-(big?3:1), -118, big?6:2, big?22:9); g.restore(); } return c; })();
const face = add(new THREE.CylinderGeometry(.48,.48,.05,48), [M.black, tmat(ctex(clockCanvas),{roughness:.4}), M.black], 0,0,0, clock, false); face.rotation.x = Math.PI/2;
add(new THREE.TorusGeometry(.48,.035,10,48), M.metal, 0,0,.02, clock, false);
function hand(len,w,c){ const p = new THREE.Group(); const h = new THREE.Mesh(new THREE.BoxGeometry(w,len,.015), mat(c)); h.position.y = len/2 - .05; p.add(h); p.position.z = .04; clock.add(p); return p; }
const hH = hand(.26,.04,"#16171b"), hM = hand(.38,.028,"#16171b"), hS = hand(.42,.012,"#2b3bff");


/* interactive objects get their own materials so hover glow stays local */
Object.values(groups).forEach(g => g.traverse(o => {
  if (!o.isMesh || !o.material) return;
  const cl = mm => { if (!mm.emissive) return mm; const c2 = mm.clone(); MATS.push(c2); return c2; };
  o.material = Array.isArray(o.material) ? o.material.map(cl) : cl(o.material);
}));

/* ================= canvas textures ================= */
function rr(g,x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
const MON_W = 1024, MON_H = 576;

// real project screenshots from /public (videos are skipped)
const shots = META.map((m) => {
  if (!m.image || /\.(mov|mp4|webm)$/i.test(m.image)) return null;
  const im = new Image();
  im.onload = () => { if (state.focus === "projects") drawMonitor(); };
  im.src = m.image;
  return im;
});

function drawMonitorCode(){
  const g = monCanvas.getContext("2d"), W = MON_W, H = MON_H;
  g.fillStyle = "#0c0e18"; g.fillRect(0,0,W,H);
  g.fillStyle = "#171a2a"; g.fillRect(0,0,W,52); g.fillRect(0,52,200,H-52);
  ["#ff5f57","#febc2e","#28c840"].forEach((c,i)=>{ g.fillStyle = c; g.beginPath(); g.arc(30+i*26,26,8,0,7); g.fill(); });
  g.font = `600 22px ${F.body}`;
  ["src","pages","projects","skills.ts","turgut.ts"].forEach((f,i)=>{ g.fillStyle = i===4?"#ffffff":"#8a90a8"; g.fillText((i>1?"   ":"")+f, 24, 100+i*38); });
  const lines = [
    [["const ","#8b95ff"],["turgut ","#ffffff"],["= {","#8a90a8"]],
    [["  role: ","#8a90a8"],["\"full-stack developer\"","#ffd28a"],[",","#8a90a8"]],
    [["  stack: ","#8a90a8"],["[\"React\", \"Next.js\", \"Node.js\"]","#ffd28a"],[",","#8a90a8"]],
    [["  available: ","#8a90a8"],["true","#8b95ff"],[",","#8a90a8"]],
    [["};","#8a90a8"]],
    [["",""]],
    [["// click the monitor to see my projects","#5c637d"]]
  ];
  g.font = "600 30px ui-monospace, Menlo, Consolas, monospace";
  lines.forEach((ln,i) => {
    let x = 250; g.fillStyle = "#3b4058"; g.fillText(String(i+1), 222 - g.measureText(String(i+1)).width, 120+i*52);
    ln.forEach(([str,c]) => { g.fillStyle = c || "#fff"; g.fillText(str, x, 120+i*52); x += g.measureText(str).width; });
  });
  monTex.needsUpdate = true;
}
function drawMonitorProject(k){
  const g = monCanvas.getContext("2d"), W = MON_W, H = MON_H;
  const m = META[k], p = PJ[state.lang][k], img = shots[k];
  const url = (m.link||m.repo).replace(/^https?:\/\//,"").replace(/\?.*$/,"");
  if (img && img.complete && img.naturalWidth){
    // browser chrome + real screenshot
    g.fillStyle = "#16171d"; g.fillRect(0,0,W,H);
    ["#ff5f57","#febc2e","#28c840"].forEach((c,i)=>{ g.fillStyle = c; g.beginPath(); g.arc(30+i*26,30,8,0,7); g.fill(); });
    g.fillStyle = "#26283a"; rr(g,120,14,W-240,32,16); g.fill();
    g.fillStyle = "#c9cde0"; g.font = `600 18px ${F.body}`; g.textAlign = "center"; g.fillText(url, W/2, 36); g.textAlign = "start";
    const top = 60, bw = W, bh = H - top, s = Math.max(bw/img.naturalWidth, bh/img.naturalHeight);
    const dw = img.naturalWidth*s, dh = img.naturalHeight*s;
    g.save(); g.beginPath(); g.rect(0,top,bw,bh); g.clip();
    g.drawImage(img, (bw-dw)/2, top, dw, dh); g.restore();
    monTex.needsUpdate = true; return;
  }
  // drawn mockup fallback
  const pal = [["#0c0e18","#ffffff"],["#2b3bff","#ffffff"],["#f4f5f8","#0c0e18"]][k%3];
  const [bg,fg] = pal;
  let seed = k*977+13; const r = () => (seed = (seed*9301+49297)%233280)/233280;
  g.fillStyle = bg; g.fillRect(0,0,W,H);
  g.strokeStyle = fg; g.fillStyle = fg; g.globalAlpha = .55; g.lineWidth = 3;
  [36,62,88].forEach(x => { g.beginPath(); g.arc(x,36,8,0,7); g.stroke(); });
  g.font = `600 21px ${F.body}`; g.fillText(url, 120, 43);
  g.globalAlpha = .15; g.fillRect(0,72,W,2); g.globalAlpha = 1;
  let size = 88; g.font = `800 ${size}px ${F.display}`;
  while (g.measureText(p[0]).width > 930 && size > 40){ size -= 4; g.font = `800 ${size}px ${F.display}`; }
  g.fillText(p[0], 46, 180);
  g.globalAlpha = .7; g.font = `600 28px ${F.body}`; g.fillText(p[1], 48, 228);
  const cw = 298;
  for (let i=0;i<3;i++){
    const x = 46+i*(cw+18), y = 270;
    g.globalAlpha = .1; rr(g,x,y,cw,160,16); g.fill(); g.globalAlpha = .38;
    if (i===0){ g.lineWidth = 4; g.beginPath(); for (let s2=0;s2<=8;s2++){ const px = x+18+s2*(cw-36)/8, py = y+125-r()*85; s2?g.lineTo(px,py):g.moveTo(px,py);} g.stroke(); }
    else for (let l=0;l<4;l++){ rr(g,x+18,y+22+l*32,(cw-36)*(.45+r()*.55),13,6); g.fill(); }
  }
  g.font = `700 21px ${F.body}`; let tx = 46;
  m.tags.forEach(t => { const w = g.measureText(t).width+34; g.globalAlpha = .45; g.lineWidth = 2; rr(g,tx,470,w,46,23); g.stroke(); g.globalAlpha = .9; g.fillText(t,tx+17,500); tx += w+10; });
  g.globalAlpha = 1; monTex.needsUpdate = true;
}
function drawMonitor(){ state.focus === "projects" ? drawMonitorProject(state.proj) : drawMonitorCode(); }
function drawPhone(){
  const g = phoneCanvas.getContext("2d"), W = 360, H = 720, t = I[state.lang];
  const grd = g.createLinearGradient(0,0,0,H); grd.addColorStop(0,"#2b3bff"); grd.addColorStop(1,"#0a0d2e");
  g.fillStyle = grd; g.fillRect(0,0,W,H);
  const d = new Date(); g.fillStyle = "#fff"; g.textAlign = "center";
  g.font = `700 96px ${F.body}`; g.fillText(String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"), W/2, 200);
  g.globalAlpha = .95; rr(g,22,300,W-44,190,26); g.fill();
  g.fillStyle = "#0c0e18"; g.textAlign = "left";
  g.font = `800 24px ${F.body}`; g.fillText(t.phone[0], 46, 346);
  g.font = `600 24px ${F.body}`;
  let line = "", y = 392;
  t.phone[1].split(" ").forEach(w => { if (g.measureText(line+w).width > W-100){ g.fillText(line, 46, y); line = ""; y += 32; } line += w+" "; });
  g.fillText(line, 46, y); g.globalAlpha = 1; g.textAlign = "start";
  phoneTex.needsUpdate = true;
}
function drawPoster(){
  const g = posterCanvas.getContext("2d"), W = 512, H = 704;
  g.fillStyle = "#2b3bff"; g.fillRect(0,0,W,H);
  g.strokeStyle = "rgba(255,255,255,.25)"; g.lineWidth = 2;
  for (let i=0;i<9;i++){ g.beginPath(); g.arc(W/2,H*.4,40+i*28,0,7); g.stroke(); }
  g.fillStyle = "#fff"; g.textAlign = "center";
  g.font = `800 200px ${F.display}`; g.fillText("TM", W/2, H*.47);
  g.font = `700 30px ${F.body}`; g.fillText("Turgut Muradlı", W/2, H*.78);
  g.globalAlpha = .7; g.font = `600 22px ${F.body}`; g.fillText("full-stack developer", W/2, H*.84);
  g.globalAlpha = 1; g.textAlign = "start"; posterTex.needsUpdate = true;
}
function drawPixel(){
  const g = pxCanvas.getContext("2d"), cell = 192/12;
  const rows = ["...b..b.....","..b..b......","...b..b.....","............",".XXXXXXXX...",".XoooooXXXX.",".XoooooX..X.",".XoooooXXXX.",".XoooooX....","..XoooX.....","...XXX......","XXXXXXXXXX.."];
  g.fillStyle = "#f4f5f8"; g.fillRect(0,0,192,192);
  rows.forEach((row,y) => [...row].forEach((c,x) => {
    if (c === ".") return; g.fillStyle = c === "X" ? "#16171d" : c === "o" ? "#2b3bff" : "#8d95ad";
    g.fillRect(x*cell, y*cell, cell, cell);
  }));
  pxTex.needsUpdate = true;
}
function drawSky(){
  const g = skyCanvas.getContext("2d"), W = 512, H = 460, day = state.mode === "day";
  const grd = g.createLinearGradient(0,0,0,H);
  if (day){ grd.addColorStop(0,"#6f8dff"); grd.addColorStop(1,"#cfe0ff"); } else { grd.addColorStop(0,"#05071a"); grd.addColorStop(1,"#1d2350"); }
  g.fillStyle = grd; g.fillRect(0,0,W,H);
  if (day){
    g.fillStyle = "#fff6d8"; g.beginPath(); g.arc(380,110,46,0,7); g.fill();
    g.fillStyle = "rgba(255,255,255,.9)";
    [[120,170],[300,260],[90,330]].forEach(([x,y]) => { g.beginPath(); g.arc(x,y,30,0,7); g.arc(x+34,y-12,36,0,7); g.arc(x+72,y,28,0,7); g.fill(); g.fillRect(x,y,72,28); });
  } else {
    let q = 7; const r = () => (q = (q*9301+49297)%233280)/233280;
    for (let i=0;i<70;i++){ g.fillStyle = `rgba(255,255,255,${.3+r()*.7})`; g.fillRect(r()*W, r()*H*.85, 2+r()*2, 2+r()*2); }
    g.fillStyle = "#f4f1ff"; g.beginPath(); g.arc(370,120,40,0,7); g.fill();
    g.fillStyle = "#0b0e26"; g.beginPath(); g.arc(388,108,36,0,7); g.fill();
  }
  g.fillStyle = day ? "#9aa8d6" : "#0a0c1e";
  let x = 0, k = 3; const r2 = () => (k = (k*9301+49297)%233280)/233280;
  while (x < W){ const w = 40+r2()*60, h = 60+r2()*120; g.fillRect(x, H-h, w-6, h); x += w; }
  if (!day){ g.fillStyle = "#ffd28a"; let q2 = 11; const r3 = () => (q2 = (q2*9301+49297)%233280)/233280;
    for (let i=0;i<40;i++) g.fillRect(r3()*W, H-20-r3()*110, 5, 7); }
  skyTex.needsUpdate = true;
}
function drawAll(){ drawMonitor(); drawPhone(); drawPoster(); drawPixel(); drawSky(); }
drawAll();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!disposed) drawAll(); });

/* ================= day / night ================= */
function updateLamp(){
  lampLight.intensity = lampOn ? (state.mode === "night" ? 1.7 : .5) : 0;
  lampLight.distance = state.mode === "night" ? 6.5 : 5;
  bulb.material.color.set(lampOn ? "#fff1d6" : "#6a6e7c");
}
function applyMode(){
  const night = state.mode !== "day";
  hemi.intensity = night ? .08 : .12; hemi.color.set(night ? "#7d88d8" : "#ffffff"); hemi.groundColor.set(night ? "#141833" : "#8f97b0");
  sun.intensity = night ? .1 : .75; sun.color.set(night ? "#8f9cff" : "#fff4e6");
  MATS.forEach(mm => mm.envMapIntensity = night ? .05 : .42);
  renderer.toneMappingExposure = .9;
  updateLamp(); drawSky();
}
applyMode();

/* ================= camera ================= */
const VIEWS = {
  null:     {t:[0,2.1,-.3], s:null, yaw:Math.PI/4, el:.6},
  projects: {t:[.6,3.05,-4.45], s:1.3, yaw:.18, el:.32},
  skills:   {t:[-4.5,2.4,-2.0], s:2.3, yaw:1.25, el:.38},
  contact:  {t:[-.75,2.0,-3.55], s:.95, yaw:.35, el:1.05},
  about:    {t:[-4.95,3.3,1.9], s:1.75, yaw:1.3, el:.3}
};
const PANEL_W = 460;
let W = 1, H = 1, baseH = 7.4;
const cur = { t:new THREE.Vector3(0,2.1,-.3), yaw:Math.PI/4, el:.6, zoom:1, ox:0, oy:0 };
const tgt = { t:new THREE.Vector3(0,2.1,-.3), yaw:Math.PI/4, el:.6, zoom:1, ox:0, oy:0 };
let dragYaw = 0, dragEl = 0;
function fitZoom(s){
  const aspect = W/H, halfH = baseH, halfW = baseH*aspect;
  const usableW = W >= 900 ? halfW * (1 - PANEL_W/W) : halfW, usableH = W >= 900 ? halfH : halfH*.44;
  return Math.min(usableH / s, usableW / (s*1.5));
}
function computeTarget(){
  const v = VIEWS[state.focus] || VIEWS.null;
  tgt.t.set(...v.t); tgt.yaw = v.yaw; tgt.el = v.el;
  tgt.zoom = v.s ? fitZoom(v.s) : 1;
  tgt.ox = W >= 900 ? (state.focus ? PANEL_W/2 : -W*.07) : 0;
  tgt.oy = W < 900 ? (state.focus ? H*.26 : -H*.04) : (state.focus ? 0 : -H*.03);
}
function resize(){
  W = canvas.clientWidth || window.innerWidth; H = canvas.clientHeight || window.innerHeight;
  renderer.setSize(W, H, false);
  const aspect = W/H;
  baseH = W < 900 ? Math.max(8, 8.4/aspect) : Math.max(7.4, 8.4/aspect);
  camera.left = -baseH*aspect; camera.right = baseH*aspect; camera.top = baseH; camera.bottom = -baseH;
  computeTarget();
}
const ro = new ResizeObserver(resize); ro.observe(canvas); resize();

/* ================= pointer ================= */
const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
let down = null, hovered = null;
const pickables = Object.values(groups);
function pick(e){
  const r = canvas.getBoundingClientRect();
  ptr.set((e.clientX - r.left)/W*2-1, -((e.clientY - r.top)/H)*2+1); ray.setFromCamera(ptr, camera);
  const hit = ray.intersectObjects(pickables, true)[0];
  if (!hit) return null;
  let o = hit.object; while (o && !o.userData.key) o = o.parent;
  return o ? { key:o.userData.key, obj:hit.object } : null;
}
function onDown(e){ down = {x:e.clientX, y:e.clientY, yaw:dragYaw, el:dragEl, moved:false}; canvas.setPointerCapture(e.pointerId); }
function onMove(e){
  if (down){
    const dx = e.clientX - down.x, dy = e.clientY - down.y;
    if (Math.abs(dx)+Math.abs(dy) > 6) down.moved = true;
    if (down.moved && !state.focus){
      dragYaw = Math.max(-.55, Math.min(.55, down.yaw - dx*.004));
      dragEl = Math.max(-.25, Math.min(.3, down.el + dy*.003));
    }
  }
  const p = (down && down.moved) ? null : pick(e);
  hovered = p ? p.key : null;
  if (p && p.key === "skills" && state.focus === "skills" && p.obj.userData.book !== undefined) hovered = "book:" + p.obj.userData.book;
  canvas.style.cursor = hovered ? "pointer" : "grab";
  const tip = opts.tip;
  if (tip){
    if (hovered && !(state.focus && hovered === state.focus)){
      tip.textContent = opts.label(hovered); tip.style.opacity = 1;
      tip.style.transform = `translate(${e.clientX+16}px,${e.clientY+14}px)`;
    } else tip.style.opacity = 0;
  }
}
function onUp(e){
  if (down && !down.moved){
    const p = pick(e);
    if (p){
      if (p.key === "skills" && p.obj.userData.book !== undefined) opts.onBook(p.obj.userData.book);
      else if (p.key === "lamp") toggleLamp();
      else if (p.key !== state.focus) opts.onActivate(p.key);
    } else if (state.focus) opts.onActivate(null);
  }
  down = null;
}
function onLeave(){ if (opts.tip) opts.tip.style.opacity = 0; hovered = null; }
canvas.addEventListener("pointerdown", onDown);
canvas.addEventListener("pointermove", onMove);
canvas.addEventListener("pointerup", onUp);
canvas.addEventListener("pointerleave", onLeave);
function toggleLamp(){ lampOn = !lampOn; updateLamp(); }

/* hotspot anchors (world space) */
const ANCHOR = { about:[-4.9,4.75,1.9], skills:[-4.5,4.5,-2.0], projects:[.6,4.0,-4.4], contact:[-.75,2.25,-3.55], pixel:[-2.55,4.98,-4.9], lamp:[-1.38,3.5,-4.0] };
const v3 = new THREE.Vector3();

/* ================= loop ================= */
let last = performance.now(), first = true, raf = 0, disposed = false, phoneMin = -1;
function frame(now){
  if (disposed) return;
  const dt = Math.min(.05, (now-last)/1000); last = now; const t = now/1000;
  const e = reduce ? 1 : Math.min(1, dt*3.6);
  cur.t.lerp(tgt.t, e);
  cur.yaw += (tgt.yaw + (state.focus?0:dragYaw) + (state.focus||reduce?0:Math.sin(t*.25)*.04) - cur.yaw) * e;
  cur.el += (tgt.el + (state.focus?0:dragEl) - cur.el) * e;
  cur.zoom += (tgt.zoom - cur.zoom) * e;
  cur.ox += (tgt.ox - cur.ox) * e; cur.oy += (tgt.oy - cur.oy) * e;
  const ce = Math.cos(cur.el);
  camera.position.set(cur.t.x + Math.sin(cur.yaw)*ce*40, cur.t.y + Math.sin(cur.el)*40, cur.t.z + Math.cos(cur.yaw)*ce*40);
  camera.lookAt(cur.t);
  camera.zoom = cur.zoom;
  camera.setViewOffset(W, H, cur.ox, cur.oy, W, H);
  camera.updateProjectionMatrix();

  for (const g of pickables){
    const k = g.userData.key;
    const want = (hovered === k || (hovered && hovered.startsWith("book:") && k === "skills")) && state.focus !== k ? 1 : 0;
    g.userData.hl += (want - g.userData.hl) * Math.min(1, dt*8);
    const h = g.userData.hl;
    g.traverse(o => { if (!o.material) return; (Array.isArray(o.material) ? o.material : [o.material]).forEach(mm => { if (mm.emissive) mm.emissive.setRGB(.03*h,.05*h,.35*h); }); });
  }
  books.forEach(b => {
    const i = b.userData.book;
    const out = (state.focus === "skills" && i === state.skill) ? .38 : (hovered === "book:"+i ? .18 : 0);
    b.position.x += (b.userData.bx + out - b.position.x) * Math.min(1, dt*8);
  });
  if (!reduce && state.focus !== "contact"){ const ph = t % 4; phone.rotation.z = ph < .5 ? Math.sin(ph*80)*.05 : 0; } else phone.rotation.z = 0;
  steam.forEach(s => { const p = reduce ? .3 : ((t*.35 + s.userData.o) % 1);
    s.position.set(2.35 + Math.sin(p*9 + s.userData.o*6)*.06, 2.35 + p*.8, -3.7); s.scale.setScalar(.6 + p*1.4); s.material.opacity = .45*(1-p); });
  trophy.rotation.y += reduce ? 0 : dt*.25;
  const d = new Date(), sec = d.getSeconds() + d.getMilliseconds()/1000, mi = d.getMinutes() + sec/60, hr = (d.getHours()%12) + mi/60;
  hS.rotation.z = -sec/60*Math.PI*2; hM.rotation.z = -mi/60*Math.PI*2; hH.rotation.z = -hr/12*Math.PI*2;
  if (d.getMinutes() !== phoneMin){ phoneMin = d.getMinutes(); drawPhone(); }

  renderer.render(scene, camera);

  const hot = opts.hotEls();
  for (const k in hot){
    const el = hot[k]; if (!el || !ANCHOR[k]) continue;
    v3.set(...ANCHOR[k]); room.localToWorld(v3); v3.project(camera);
    el.style.left = ((v3.x+1)/2*W) + "px"; el.style.top = ((1-v3.y)/2*H) + "px";
    el.dataset.lit = hovered === k ? "1" : "";
  }
  if (first){ first = false; setTimeout(() => !disposed && opts.onReady(), 250); }
  raf = requestAnimationFrame(frame);
}
raf = requestAnimationFrame(frame);

/* ================= API for React ================= */
return {
  setFocus(k){ state.focus = k; dragYaw = 0; dragEl = 0; computeTarget(); drawMonitor(); },
  setProject(i){ state.proj = i; drawMonitor(); },
  setSkill(i){ state.skill = i; },
  setLang(l){ state.lang = l; drawMonitor(); drawPhone(); },
  setMode(m){ state.mode = m; applyMode(); },
  toggleLamp,
  dispose(){
    disposed = true; cancelAnimationFrame(raf); ro.disconnect();
    canvas.removeEventListener("pointerdown", onDown); canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerup", onUp); canvas.removeEventListener("pointerleave", onLeave);
    scene.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      const ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
      ms.forEach(mm => { if (mm.map) mm.map.dispose(); mm.dispose(); });
    });
    if (scene.environment) scene.environment.dispose();
    if (pmremRef) pmremRef.dispose();
    renderer.dispose();
  }
};
}
