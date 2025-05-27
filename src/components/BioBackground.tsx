import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BioBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    
    // Camera setup
    const aspect = window.innerWidth / window.innerHeight;
    cameraRef.current = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    cameraRef.current.position.z = 5;

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setClearColor(0x000000, 0);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create DNA helix
    const dnaGeometry = new THREE.BufferGeometry();
    const dnaPoints = [];
    const numPoints = 1000;
    
    for (let i = 0; i < numPoints; i++) {
      const t = i / numPoints * Math.PI * 10;
      const x = Math.cos(t) * 2;
      const y = t - Math.PI * 5;
      const z = Math.sin(t) * 2;
      dnaPoints.push(x, y, z);
    }

    dnaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dnaPoints, 3));
    
    const dnaMaterial = new THREE.LineBasicMaterial({ 
      color: 0xFF0000,
      transparent: true,
      opacity: 0.15
    });

    const dnaHelix = new THREE.Line(dnaGeometry, dnaMaterial);
    sceneRef.current.add(dnaHelix);

    // Animation
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      requestAnimationFrame(animate);
      
      dnaHelix.rotation.y += 0.002;
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Cleanup
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 opacity-15" />;
};

export default BioBackground;