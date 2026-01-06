import React from "react";
import "../styles/VideoBackground.css";

const VideoBackground = ({ theme }) => {

  const videoSrc =
    theme === "dark"
      ? `${import.meta.env.BASE_URL}videos/moon.mp4`
      : `${import.meta.env.BASE_URL}videos/sun.mp4`;

  return (
    <div className="video-background">
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="video-bg fade-in"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="video-overlay"></div>
    </div>
  );
};

export default VideoBackground;
