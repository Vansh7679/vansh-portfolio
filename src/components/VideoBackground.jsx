import React, { useState, useEffect } from 'react';
import '../styles/VideoBackground.css';

const VideoBackground = ({ theme }) => {
  const [currentVideo, setCurrentVideo] = useState(theme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (currentVideo !== theme) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setCurrentVideo(theme);
        setIsTransitioning(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [theme, currentVideo]);

  const videoSrc = theme === 'dark' ? '/moon.mp4' : '/sun.mp4';

  return (
    <div className="video-background">
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className={`video-bg ${isTransitioning ? 'fade-out' : 'fade-in'}`}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
    </div>
  );
};

export default VideoBackground;