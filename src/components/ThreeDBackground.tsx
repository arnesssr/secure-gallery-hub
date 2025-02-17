
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeDBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Check WebGL support
    if (!THREE.WEBGL.isWebGLAvailable()) {
      setError('WebGL is not supported in your browser');
      console.error('WebGL is not supported');
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      // Scene setup with error handling
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      // Create inflated objects
      const objects: THREE.Mesh[] = [];
      const geometries = [
        new THREE.TorusGeometry(1, 0.4, 16, 100),
        new THREE.SphereGeometry(0.8, 32, 32),
        new THREE.IcosahedronGeometry(0.9, 0),
      ];

      // Create multiple objects with different positions and rotations
      for (let i = 0; i < 5; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(Math.random() * 0.2 + 0.8, Math.random() * 0.2 + 0.8, 1),
          transparent: true,
          opacity: 0.6,
          shininess: 100,
        });
        
        const object = new THREE.Mesh(geometry, material);
        object.position.set(
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 5 - 10
        );
        object.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        objects.push(object);
        scene.add(object);
      }

      // Add lights
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0x9b87f5, 1);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);

      camera.position.z = 5;

      // Handle window resize
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      window.addEventListener('resize', handleResize);

      // Animation
      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);

        objects.forEach((obj, index) => {
          obj.rotation.x += 0.002 * (index + 1);
          obj.rotation.y += 0.003 * (index + 1);
          
          // Add floating motion
          obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        });

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup
      return () => {
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(frame);
        
        // Dispose of resources
        objects.forEach(obj => {
          obj.geometry.dispose();
          if (obj.material instanceof THREE.Material) {
            obj.material.dispose();
          }
        });
        
        // Dispose of renderer
        renderer.dispose();
        scene.clear();
      };
    } catch (err) {
      console.error('Error initializing WebGL:', err);
      setError('Failed to initialize 3D background');
      return () => {
        // Cleanup in case of error
        if (renderer) {
          renderer.dispose();
        }
      };
    }
  }, []);

  if (error) {
    // Return empty div if there's an error, the background image will still show
    return null;
  }

  return <div ref={mountRef} className="absolute inset-0 -z-20" />;
};

export default ThreeDBackground;
