import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// ShootingStar class outside component
class ShootingStar {
  constructor(scene) {
    this.scene = scene;
    this.reset();
  }
  
  reset() {
    this.position = new THREE.Vector3(
      (Math.random() - 0.5) * 40,
      Math.random() * 20 + 10,
      -20
    );
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.3,
      -Math.random() * 0.5 - 0.3,
      Math.random() * 0.2
    );
    this.length = Math.random() * 3 + 2;
    this.speed = Math.random() * 0.5 + 0.5;
    this.active = Math.random() > 0.5;
    this.opacity = 1;
    
    // Create trail
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(6);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color().setHSL(0.15 + Math.random() * 0.1, 1, 0.7),
      transparent: true,
      opacity: 1,
      linewidth: 2
    });
    
    if (this.line) {
      this.scene.remove(this.line);
      this.line.geometry.dispose();
      this.line.material.dispose();
    }
    
    this.line = new THREE.Line(geometry, material);
    this.scene.add(this.line);
  }
  
  update() {
    if (!this.active) {
      if (Math.random() < 0.01) {
        this.active = true;
        this.reset();
      }
      this.line.visible = false;
      return;
    }
    
    this.position.add(this.velocity.clone().multiplyScalar(this.speed));
    
    // Update trail
    const positions = this.line.geometry.attributes.position.array;
    positions[0] = this.position.x;
    positions[1] = this.position.y;
    positions[2] = this.position.z;
    
    const tailPos = this.position.clone().sub(
      this.velocity.clone().normalize().multiplyScalar(this.length)
    );
    positions[3] = tailPos.x;
    positions[4] = tailPos.y;
    positions[5] = tailPos.z;
    
    this.line.geometry.attributes.position.needsUpdate = true;
    this.line.visible = true;
    
    // Fade out
    if (this.position.y < -15) {
      this.opacity -= 0.02;
      this.line.material.opacity = this.opacity;
      
      if (this.opacity <= 0) {
        this.active = false;
      }
    }
  }
  
  dispose() {
    this.scene.remove(this.line);
    this.line.geometry.dispose();
    this.line.material.dispose();
  }
}

const BoxLoader = ({ onComplete }) => {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // Starfield background
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 800;
    const starsPositions = [];
    
    for (let i = 0; i < starCount; i++) {
      starsPositions.push(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsPositions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Shooting stars
    const shootingStars = [];
    const shootingStarCount = 8;
    
    for (let i = 0; i < shootingStarCount; i++) {
      shootingStars.push(new ShootingStar(scene));
    }

    // Planets/Orbs
    const orbs = [];
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.SphereGeometry(0.5 + Math.random() * 0.5, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
        transparent: true,
        opacity: 0.3
      });
      const orb = new THREE.Mesh(geometry, material);
      orb.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        -10 - Math.random() * 10
      );
      scene.add(orb);
      orbs.push({
        mesh: orb,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    // Particle field
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const particlePositions = [];
    const particleVelocities = [];
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions.push(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }
    
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x88ccff,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleField);

    // Animation
    let time = 0;
    let animationFrameId;
    const duration = 1.5;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.016;

      const p = Math.min(time / duration, 1);
      setProgress(p * 100);

      // Rotate starfield
      stars.rotation.y += 0.0002;
      stars.rotation.x += 0.0001;

      // Update shooting stars
      shootingStars.forEach(star => star.update());

      // Animate orbs
      orbs.forEach(orb => {
        orb.mesh.rotation.x += orb.rotationSpeed;
        orb.mesh.rotation.y += orb.rotationSpeed * 0.5;
      });

      // Update particles
      const positions = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += particleVelocities[i].x;
        positions[i3 + 1] += particleVelocities[i].y;
        positions[i3 + 2] += particleVelocities[i].z;

        // Wrap around
        if (Math.abs(positions[i3]) > 25) positions[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > 25) positions[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 25) positions[i3 + 2] *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Camera movement
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.y = Math.cos(time * 0.15) * 1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (p >= 1 && onComplete) {
        setTimeout(() => onComplete(), 300);
      }
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      shootingStars.forEach(star => star.dispose());
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      
      {/* Loading text with bike */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        fontFamily: "'Segoe UI', sans-serif",
        zIndex: 10,
        pointerEvents: 'none',
        width: '400px'
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: '300',
          marginBottom: '20px',
          letterSpacing: '8px',
          textShadow: '0 0 20px rgba(136, 204, 255, 0.5)',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          LOADING
        </div>
        
        {/* Progress bar with bike */}
        <div style={{
          width: '350px',
          height: '8px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          overflow: 'visible',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Progress fill with gradient trail */}
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, transparent, #4a9fff, #88ccff)',
            borderRadius: '4px',
            boxShadow: '0 0 15px rgba(136, 204, 255, 0.8)',
            transition: 'width 0.1s ease',
            position: 'relative'
          }}>
            {/* Bike at the end of progress */}
            <div style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%) scaleX(-1)',
              fontSize: '32px',
              filter: 'drop-shadow(0 0 10px rgba(136, 204, 255, 0.8))',
              animation: 'bikeVibrate 0.1s infinite'
            }}>
              🏍️
            </div>
          </div>
        </div>
        
        <div style={{
          marginTop: '20px',
          fontSize: '14px',
          opacity: 0.7,
          letterSpacing: '2px'
        }}>
          {Math.round(progress)}%
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes bikeVibrate {
          0%, 100% { transform: translateY(-50%) scaleX(-1) translateX(0px); }
          25% { transform: translateY(-50%) scaleX(-1) translateX(-0.5px) rotate(-1deg); }
          75% { transform: translateY(-50%) scaleX(-1) translateX(0.5px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default BoxLoader;