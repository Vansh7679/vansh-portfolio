import React from 'react';
import { motion as Motion } from 'framer-motion';

const BoxLoader = ({ onComplete }) => {

  const videoSrc = `${import.meta.env.BASE_URL}videos/prelanding10.mp4`;

  // Detect Mobile Width
  const isMobile = window.innerWidth < 600;

  return (
    <Motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        overflow: 'hidden'
      }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 1500);
      }}
    >

      {/* 🔥 Responsive Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(15, 20, 40, 0.75) 0%, rgba(26, 31, 58, 0.75) 50%, rgba(15, 20, 40, 0.75) 100%)',
          zIndex: 1
        }}
      />

      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isMobile ? '22px' : '40px'   // 📱 Smaller gap on mobile
      }}>

        {/* 🔷 Box Animation (Responsive Size) */}
        <Motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ 
            width: isMobile ? 55 : 80,
            height: isMobile ? 55 : 80
          }}
        >
          <Motion.div
            style={{
              position: 'absolute',
              inset: 0,
              border: '3px solid rgba(100, 180, 255, 0.3)',
              borderRadius: 12
            }}
          />

          <Motion.div
            animate={{
              rotate: [0, -90, -180, -270, -360],
              scale: [1, 0.8, 1, 0.8, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: isMobile ? 10 : 15,
              background:
                'linear-gradient(135deg, rgba(100, 180, 255, 0.2), rgba(80, 140, 255, 0.3))',
              borderRadius: 8
            }}
          />
        </Motion.div>

        {/* Loading Text */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '10px'
        }}>
          <Motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: isMobile ? '0.95rem' : '1.125rem',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: isMobile ? '0.1em' : '0.15em',
              textTransform: 'uppercase'
            }}
          >
            Loading
          </Motion.span>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {[0, 1, 2].map((i) => (
              <Motion.span
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                style={{
                  width: isMobile ? '5px' : '6px',
                  height: isMobile ? '5px' : '6px',
                  borderRadius: '50%',
                  background: 'rgb(100, 180, 255)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <Motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            width: isMobile ? '150px' : '200px',
            height: '2px',
            background: 'rgba(100, 180, 255, 0.2)',
            borderRadius: '1px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Motion.div
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '50%',
              background: 'linear-gradient(90deg, transparent, rgba(100, 180, 255, 0.8), transparent)'
            }}
          />
        </Motion.div>

      </div>
    </Motion.div>
  );
};

export default BoxLoader;
