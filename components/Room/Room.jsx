"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Syne, Manrope } from "next/font/google";
import s from "./Room.module.css";
import { I, SK, PJ, META, BOOK_COLORS } from "./content";

const syne = Syne({ subsets: ["latin", "latin-ext"], weight: ["700", "800"], variable: "--font-syne" });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "700", "800"], variable: "--font-manrope" });

const NP = META.length;
const HOTS = ["about", "skills", "projects", "contact", "pixel", "lamp"];
const pad = (n) => String(n).padStart(2, "0");

const Arrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M7 17L17 7M8 7h9v9" /></svg>);
const Left = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M15 18l-6-6 6-6" /></svg>);
const Right = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 18l6-6-6-6" /></svg>);
const Sun = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></svg>);
const Moon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" /></svg>);
const GitHub = () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z" /></svg>);

export default function Room() {
  const [lang, setLang] = useState("en");
  const [mode, setMode] = useState("day");
  const [focus, setFocus] = useState(null);
  const [proj, setProj] = useState(0);
  const [skill, setSkill] = useState(0);
  const [ready, setReady] = useState(false);
  const [sceneOn, setSceneOn] = useState(false);

  const canvasRef = useRef(null);
  const tipRef = useRef(null);
  const nameRef = useRef(null);
  const hotRefs = useRef({});
  const sceneRef = useRef(null);
  const langRef = useRef(lang);
  langRef.current = lang;

  const t = I[lang];

  const activate = useCallback((k) => {
    if (k === "lamp") return sceneRef.current?.toggleLamp();
    if (k === "pixel") { setProj(1); setFocus("projects"); return; }
    setFocus(k);
  }, []);

  /* day or night from the visitor's clock */
  useEffect(() => {
    const h = new Date().getHours();
    let m = h >= 7 && h < 19 ? "day" : "night";
    if (window.matchMedia("(prefers-color-scheme: dark)").matches && !(h >= 9 && h < 17)) m = "night";
    setMode(m);
  }, []);

  /* create the 3D scene on the client only */
  useEffect(() => {
    let api = null, cancelled = false;
    import("./RoomScene").then(({ createRoomScene }) => {
      if (cancelled || !canvasRef.current) return;
      api = createRoomScene(canvasRef.current, {
        fonts: { display: syne.style.fontFamily, body: manrope.style.fontFamily },
        hotEls: () => hotRefs.current,
        tip: tipRef.current,
        label: (k) => (k.startsWith("book:") ? SK[langRef.current][+k.slice(5)][0] : I[langRef.current].tips[k]),
        onActivate: (k) => activate(k),
        onBook: (i) => { setSkill(i); setFocus("skills"); },
        onReady: () => setReady(true),
      });
      if (!api) { setReady(true); return; } // no WebGL: the panels still work
      sceneRef.current = api;
      setSceneOn(true);
    });
    return () => { cancelled = true; api?.dispose(); sceneRef.current = null; };
  }, [activate]);

  /* keep the scene in sync with React state */
  useEffect(() => { sceneRef.current?.setProject(proj); }, [proj, sceneOn]);
  useEffect(() => { sceneRef.current?.setSkill(skill); }, [skill, sceneOn]);
  useEffect(() => { sceneRef.current?.setLang(lang); document.documentElement.lang = lang; }, [lang, sceneOn]);
  useEffect(() => { sceneRef.current?.setMode(mode); }, [mode, sceneOn]);
  useEffect(() => { sceneRef.current?.setFocus(focus); }, [focus, sceneOn]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setFocus(null);
      if (focus === "projects" && e.key === "ArrowRight") setProj((p) => (p + 1) % NP);
      if (focus === "projects" && e.key === "ArrowLeft") setProj((p) => (p - 1 + NP) % NP);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus]);

  /* 3D-looking extrusion on the name */
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const draw = () => {
      const fs = parseFloat(getComputedStyle(el).fontSize) || 80;
      const st = Math.max(0.6, fs * 0.008), d = mode === "night" ? "#3a46e8" : "#2b3bff";
      el.style.textShadow = Array.from({ length: 9 }, (_, i) => `${(st * (i + 1) * 0.8).toFixed(1)}px ${(st * (i + 1)).toFixed(1)}px 0 ${d}`).join(",");
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [mode]);

  /* ---------- panel content ---------- */
  const panel = () => {
    if (focus === "about") return (
      <>
        <span className={s.status}><i />{t.status}</span>
        <h2>{t.aboutTitle}</h2>
        <p className={s.sub}>{t.aboutText}</p>
        <p className={s.sub}>{t.aboutText2}</p>
        <div className={s.btns}>
          <button className={s.btn} onClick={() => setFocus("projects")}>{t.seeProjects}</button>
          <button className={`${s.btn} ${s.line}`} onClick={() => setFocus("contact")}>{t.getInTouch}</button>
        </div>
      </>
    );
    if (focus === "skills") return (
      <>
        <h2>{t.skillsTitle}</h2>
        <p className={s.sub}>{t.skillsSub}</p>
        <div className={s.sklist}>
          {SK[lang].map(([name], i) => (
            <button key={name} className={i === skill ? s.on : undefined} onClick={() => setSkill(i)}>
              {name}<b style={{ background: BOOK_COLORS[i] }} />
            </button>
          ))}
        </div>
        <p className={s.skdesc}>{SK[lang][skill][1]}</p>
      </>
    );
    if (focus === "projects") {
      const m = META[proj], p = PJ[lang][proj];
      const href = m.uc ? m.repo : m.link || m.repo;
      const label = m.uc ? t.ghInstead : m.link ? t.live : t.repo;
      return (
        <>
          <div className={s.pnav}>
            <span>{t.projectsLabel} {pad(proj + 1)} / {pad(NP)}</span>
            <div>
              <button className={s.arw} aria-label="Previous" onClick={() => setProj((proj - 1 + NP) % NP)}><Left /></button>
              <button className={s.arw} aria-label="Next" onClick={() => setProj((proj + 1) % NP)}><Right /></button>
            </div>
          </div>
          {m.uc && <span className={s.uc}>{t.uc}</span>}
          <h2>{p[0]}</h2>
          <div className={s.short}>{p[1]}</div>
          <p className={s.sub}>{p[2]}</p>
          <div className={s.tags}>{m.tags.map((x) => <span key={x}>{x}</span>)}</div>
          <div className={s.btns}><a className={s.btn} href={href} target="_blank" rel="noopener noreferrer">{label}<Arrow /></a></div>
          <div className={s.dots}>
            {META.map((_, i) => (
              <button key={i} className={i === proj ? s.on : undefined} aria-label={PJ[lang][i][0]} onClick={() => setProj(i)} />
            ))}
          </div>
        </>
      );
    }
    if (focus === "contact") return (
      <>
        <h2>{t.contactTitle}</h2>
        <p className={s.sub}>{t.contactText}</p>
        <a className={s.mail} href="mailto:turgutmuradli04@gmail.com">turgutmuradli04@gmail.com</a>
        <div className={s.socials}>
          <a href="https://www.linkedin.com/in/turgut-muradl%C4%B1-9714522b1/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/turgutTM" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </>
    );
    return null;
  };

  return (
    <div className={`${s.root} ${syne.variable} ${manrope.variable}`} data-mode={mode} data-focused={focus ? "true" : "false"}>
      <div className={`${s.loader} ${ready ? s.gone : ""}`}>TUGU.</div>
      <canvas ref={canvasRef} className={s.gl} aria-label="A 3D room. Use the buttons to explore." />
      <div ref={tipRef} className={s.tip} />

      <div className={s.ui}>
        <div className={s.brand}>
          <h1 ref={nameRef} aria-label="Turgut Muradlı"><span aria-hidden="true">Turgut</span><span aria-hidden="true">Muradlı</span></h1>
          <p><i />{t.role}</p>
        </div>

        <div className={s.nav}>
          <div className={s.pills}>
            {["about", "skills", "projects", "contact"].map((k) => (
              <button key={k} className={focus === k ? s.on : undefined} onClick={() => setFocus((f) => (f === k ? null : k))}>{t.nav[k]}</button>
            ))}
          </div>
          <button className={s.chip} aria-label="Switch day and night" onClick={() => setMode((m) => (m === "day" ? "night" : "day"))}>{mode === "day" ? <Moon /> : <Sun />}</button>
          <button className={s.chip} aria-label="Switch language" onClick={() => setLang((l) => (l === "en" ? "tr" : "en"))}>{lang === "en" ? "TR" : "EN"}</button>
          <a className={s.chip} href="https://github.com/turgutTM" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHub /></a>
        </div>

        {sceneOn && HOTS.map((k) => (
          <button key={k} ref={(el) => { hotRefs.current[k] = el; }} className={s.hot} onClick={() => activate(k)}>
            <span className={s.d} /><span className={s.l}>{t.tips[k]}</span>
          </button>
        ))}

        <div className={s.hint}>{t.hint}</div>

        <aside className={s.panel} aria-live="polite">
          <button className={s.back} onClick={() => setFocus(null)}><Left /><span>{t.back}</span></button>
          <div className={s.pc} key={`${focus}-${proj}-${lang}`}>{panel()}</div>
          <div className={s.foot}>© {new Date().getFullYear()} Turgut Muradlı. Built with Next.js &amp; Three.js.</div>
        </aside>
      </div>
    </div>
  );
}
