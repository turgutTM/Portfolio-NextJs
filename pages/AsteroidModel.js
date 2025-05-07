import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const AsteroidModel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // We'll use a square aspect ratio for the container
      0.1,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(300, 300); // Fixed size for the asteroid container
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff9900, 1);
    pointLight1.position.set(5, 3, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4d76ff, 1);
    pointLight2.position.set(-5, -3, 2);
    scene.add(pointLight2);

    // Create a more detailed asteroid using noise for realistic terrain
    const createDetailedAsteroid = () => {
      // Create a base icosahedron with higher detail
      const geometry = new THREE.IcosahedronGeometry(1.2, 5);
      
      // Apply noise to vertices for terrain-like effect
      const positionAttribute = geometry.getAttribute('position');
      const colors = new Float32Array(positionAttribute.count * 3);
      const colorArray = new THREE.Color();
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);
        
        // Get the vertex
        const vertex = new THREE.Vector3(x, y, z);
        
        // Calculate the length (radius) of this vertex
        const length = vertex.length();
        
        // More complex noise calculation
        const frequency = 5.0;
        const noise = 0.2 * (
          Math.sin(frequency * x) * 
          Math.sin(frequency * y) * 
          Math.sin(frequency * z) +
          0.1 * Math.sin(frequency * 2 * x + 0.5) * 
          Math.sin(frequency * 2 * y + 0.3) * 
          Math.sin(frequency * 2 * z + 0.7)
        );
        
        // Apply noise to radius
        const newLength = length + noise;
        
        // Scale the vertex
        vertex.normalize().multiplyScalar(newLength);
        
        // Update the position
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        
        // Generate color based on height (more blue in valleys, more gray/brown on peaks)
        if (newLength > length + 0.05) {
          // Peaks - gray/brown tones
          colorArray.setRGB(0.6 + Math.random() * 0.1, 0.55 + Math.random() * 0.1, 0.5 + Math.random() * 0.1);
        } else if (newLength < length - 0.05) {
          // Valleys - blue/dark gray tones
          colorArray.setRGB(0.3 + Math.random() * 0.1, 0.3 + Math.random() * 0.1, 0.4 + Math.random() * 0.1);
        } else {
          // Mid regions - medium gray
          colorArray.setRGB(0.45 + Math.random() * 0.1, 0.45 + Math.random() * 0.1, 0.45 + Math.random() * 0.1);
        }
        
        colors[i * 3] = colorArray.r;
        colors[i * 3 + 1] = colorArray.g;
        colors[i * 3 + 2] = colorArray.b;
      }
      
      // Add colors to geometry
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      geometry.computeVertexNormals();
      
      // Create material with vertex colors, bumps and rough texture
      const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.9,
        metalness: 0.4,
        flatShading: true,
        emissive: 0x0a0a3a,
        emissiveIntensity: 0.1,
      });
      
      // Create craters
      const createCraters = (asteroidGeometry) => {
        const craterCount = 8;
        
        for (let i = 0; i < craterCount; i++) {
          // Random position on sphere
          const phi = Math.random() * Math.PI * 2;
          const theta = Math.random() * Math.PI;
          
          const x = Math.sin(theta) * Math.cos(phi);
          const y = Math.sin(theta) * Math.sin(phi);
          const z = Math.cos(theta);
          
          const craterPosition = new THREE.Vector3(x, y, z).normalize().multiplyScalar(1.2);
          
          const craterSize = 0.1 + Math.random() * 0.3;
          const craterDepth = 0.1 + Math.random() * 0.1;
          
          // Modify vertices near this position to create a crater
          const positionAttribute = asteroidGeometry.getAttribute('position');
          
          for (let j = 0; j < positionAttribute.count; j++) {
            const vertexX = positionAttribute.getX(j);
            const vertexY = positionAttribute.getY(j);
            const vertexZ = positionAttribute.getZ(j);
            
            const vertex = new THREE.Vector3(vertexX, vertexY, vertexZ);
            const distance = vertex.distanceTo(craterPosition);
            
            if (distance < craterSize) {
              // Calculate crater effect (deeper in center, raised rim)
              let craterEffect;
              
              if (distance < craterSize * 0.8) {
                // Inside crater - push inward
                craterEffect = (craterSize - distance) / craterSize * craterDepth;
                vertex.normalize().multiplyScalar(vertex.length() - craterEffect);
              } else {
                // Rim - push outward slightly
                craterEffect = (distance - craterSize * 0.8) / (craterSize * 0.2) * (craterDepth * 0.5);
                vertex.normalize().multiplyScalar(vertex.length() + craterEffect);
              }
              
              positionAttribute.setXYZ(j, vertex.x, vertex.y, vertex.z);
            }
          }
        }
        
        asteroidGeometry.computeVertexNormals();
        return asteroidGeometry;
      };
      
      // Apply craters
      createCraters(geometry);
      
      const asteroid = new THREE.Mesh(geometry, material);
      scene.add(asteroid);
      
      return asteroid;
    };

    const asteroid = createDetailedAsteroid();

    // Controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls
      controls.update();
      
      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      asteroid.geometry.dispose();
      asteroid.material.dispose();
      scene.remove(asteroid);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="relative w-72 h-72 flex items-center justify-center"
    />
  );
};

export default AsteroidModel;