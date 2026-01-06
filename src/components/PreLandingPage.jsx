import React, { useState, useEffect, useRef } from "react";
import ThreeJSPortal from "../components/ThreeJSPortal";
import BoxLoader from "../components/BoxLoader";
import "../styles/PreLanding.css";

const PreLandingPage = ({ onEnter }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [startLamp, setStartLamp] = useState(false); 
  const [showName, setShowName] = useState(false);
  const triggeredRef = useRef(false);

  
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const t = setTimeout(() => {
        setStartLamp(true); 
      }, 100); 
      return () => clearTimeout(t);
    }
  }, [isLoading]);

 
  useEffect(() => {
    if (startLamp) {
      
      const t = setTimeout(() => setShowName(true), 1600);
      return () => clearTimeout(t);
    }
  }, [startLamp]);

  
  useEffect(() => {
    if (isLoading) return;

    const handleWheel = (e) => {
      if (triggeredRef.current) return;
      if (e.deltaY > 25 || e.deltaY < -25) {
        triggeredRef.current = true;
        onEnter();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLoading, onEnter]);

  if (isLoading) {
    return <BoxLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="prelanding-container">
      
      <div className="prelanding-background">
        <div className="bg-layer-1" />
        <div className="bg-layer-2" />
        <div className="bg-layer-3" />
        <div className="distortion-overlay" />
      </div>

     
      <ThreeJSPortal />

      
      <div className="prelanding-center">
        <div className={`lamp-group ${startLamp ? "lamp-start" : ""}`}>
          
          
          <div className="lamp-line" />
          <div className="lamp-soft-glow" />

          
          <h1
            className={`prelanding-title lamp-title ${
              showName ? "name-show" : "name-hidden"
            }`}
          >
            Vansh Tyagi
          </h1>

          <p className="prelanding-subtitle">
            Full Stack • Cloud • IoT
          </p>
        </div>
      </div>

      
      <div className="scroll-indicator" onClick={onEnter}>
        <span className="scroll-text">Scroll to explore</span>
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 16l-6-6h12z" />
        </svg>
      </div>
    </div>
  );
};

export default PreLandingPage;
