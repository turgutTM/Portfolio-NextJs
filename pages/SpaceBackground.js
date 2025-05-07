import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const SpaceBackground = () => {
  const mountRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create star particles
    const createStars = () => {
      const geometry = new THREE.BufferGeometry();
      const count = 5000;
      
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      
      const color = new THREE.Color();
      
      for (let i = 0; i < count; i++) {
        // Position
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 100;
        positions[i3 + 1] = (Math.random() - 0.5) * 100;
        positions[i3 + 2] = (Math.random() - 0.5) * 100;
        
        // Color (vary between white, blue and purple)
        const mixRatio = Math.random();
        if (mixRatio < 0.3) {
          color.setHSL(0.6, 1, 0.9); // Blue
        } else if (mixRatio < 0.6) {
          color.setHSL(0.75, 1, 0.9); // Purple
        } else {
          color.setHSL(0, 0, 1); // White
        }
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Scale (size)
        scales[i] = Math.random() * 2.0;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
      
      // Material
      const material = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        transparent: true,
        alphaTest: 0.001,
        vertexColors: true
      });
      
      // Points
      const stars = new THREE.Points(geometry, material);
      scene.add(stars);
      
      return stars;
    };

    // Create a 3D galaxy effect
    const createGalaxy = () => {
      const parameters = {
        count: 10000,
        size: 0.01,
        radius: 10,
        branches: 5,
        spin: 1,
        randomness: 0.2,
        randomnessPower: 3,
        insideColor: '#ff6030',
        outsideColor: '#1b3984'
      };

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // Position
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color
        const mixColor = colorInside.clone();
        mixColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3] = mixColor.r;
        colors[i3 + 1] = mixColor.g;
        colors[i3 + 2] = mixColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
      });

      const galaxy = new THREE.Points(geometry, material);
      galaxy.position.set(-15, 5, -30);
      scene.add(galaxy);

      return galaxy;
    };

    // Interactive elements
    const createInteractiveElements = () => {
      // Mouse position for interaction
      const mouse = new THREE.Vector2();
      
      window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        
        // Move camera slightly based on mouse position for parallax effect
        camera.position.x = mouse.x * 2;
        camera.position.y = mouse.y * 2;
      });
    };

    const stars = createStars();
    const galaxy = createGalaxy();
    createInteractiveElements();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    
    // Create nebula effect
    const createNebula = () => {
      // Create a large sphere geometry
      const geometry = new THREE.SphereGeometry(30, 32, 32);
      
      // Custom shader material for nebula effect
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x3b1e79) },
          color2: { value: new THREE.Color(0x9b384f) }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          // Simplex noise function
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
          
          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            
            // First corner
            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            
            // Other corners
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
            vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
            
            // Permutations
            i = mod289(i);
            vec4 p = permute(permute(permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                   
            // Gradients: 7x7 points over a square, mapped onto an octahedron.
            float n_ = 0.142857142857; // 1.0/7.0
            vec3 ns = n_ * D.wyz - D.xzx;
            
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
            
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);    // mod(j,N)
            
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            
            // Normalise gradients
            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            
            // Mix final noise value
            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
          }
          
          void main() {
            // Create noise patterns at different scales and speeds
            float noise1 = snoise(vec3(vPosition.x * 0.05, vPosition.y * 0.05, vPosition.z * 0.05 + time * 0.1));
            float noise2 = snoise(vec3(vPosition.x * 0.1, vPosition.y * 0.1, vPosition.z * 0.1 + time * 0.05));
            
            // Combine noise patterns
            float combinedNoise = (noise1 + noise2) * 0.5;
            
            // Map noise to opacity
            float opacity = smoothstep(0.1, 0.4, combinedNoise) * 0.3;
            
            // Mix colors based on noise
            vec3 finalColor = mix(color1, color2, smoothstep(-0.4, 0.4, combinedNoise));
            
            gl_FragColor = vec4(finalColor, opacity);
          }
        `
      });
      
      const nebula = new THREE.Mesh(geometry, material);
      scene.add(nebula);
      
      return { nebula, material };
    };
    
    const { nebula, material: nebulaMaterial } = createNebula();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update nebula effect
      nebulaMaterial.uniforms.time.value = elapsedTime * 0.2;
      
      // Rotate stars slowly
      stars.rotation.y = elapsedTime * 0.05;
      
      // Rotate galaxy
      galaxy.rotation.y = elapsedTime * 0.1;
      
      // Subtle camera movement based on mouse position
      camera.position.x += (mousePosition.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (mousePosition.y * 3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      
      // Render
      renderer.render(scene, camera);
      
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      stars.geometry.dispose();
      stars.material.dispose();
      galaxy.geometry.dispose();
      galaxy.material.dispose();
      scene.remove(stars);
      scene.remove(galaxy);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default SpaceBackground;