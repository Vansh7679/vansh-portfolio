import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail, Phone } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import '../styles/Home.css';

const Home = () => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  const displayedSkills = [
    "Full Stack Java Developer",
    "Spring Boot & ReactJS Developer",
    "Cloud Practitioner (AWS)",
    "Backend & API Developer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex(prev => (prev + 1) % displayedSkills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ====================================
  // 🔥 REAL-TIME THEME DETECTION (works with body.light-theme / body.dark-theme)
  // ====================================
  const [isDark, setIsDark] = useState(() => {
    return document.body.classList.contains("dark-theme");
  });

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.body.classList.contains("dark-theme"));
    };

    // Run once immediately
    updateTheme();

    // Watch for changes on <body> class
    const observer = new MutationObserver(updateTheme);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"], // watch for theme changes
    });

    return () => observer.disconnect();
  }, []);

  // ====================================
  // SOCIAL LINKS
  // ====================================
  const socialLinks = [
    { icon: <Github className="social-icon-svg" />, url: 'https://github.com/Vansh7679', label: 'GitHub' },
    { icon: <Linkedin className="social-icon-svg" />, url: 'https://www.linkedin.com/in/vansh-tyagi-aa3a15251/', label: 'LinkedIn' },
    { icon: <Mail className="social-icon-svg" />, url: 'mailto:vanshtyagi073@gmail.com', label: 'Email' },
    { icon: <Phone className="social-icon-svg" />, url: 'tel:+919627784080', label: 'Phone' }
  ];

  return (
    <section className="home-page section section-lg">

      {/* Background */}
      <div className="hero-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>

      <div className="container">
        <div className="hero-grid">

          {/* LEFT SIDE */}
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Hi, I'm Vansh Tyagi</h1>

              <div className="hero-skills-container">
                <div className="hero-skills-wrapper">
                  {displayedSkills.map((skill, index) => (
                    <h2
                      key={skill}
                      className={`hero-skill ${index === currentSkillIndex ? 'active' : ''}`}
                    >
                      {skill}
                    </h2>
                  ))}
                </div>
              </div>

              <p className="hero-description">
                I am currently pursuing my B.Tech in Computer Science and Engineering 
                from MIET, Meerut (7th Semester, CGPA 7.7). I specialize in building 
                full-stack applications using Spring Boot and ReactJS, and I am also 
                AWS Cloud Practitioner certified.
              </p>
            </div>

            {/* Buttons */}
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary btn-lg hero-btn-animate">
                <span>View My Work</span>
                <ArrowRight className="btn-icon-right" />
              </Link>

              <a 
                href="/resume.pdf"
                download="Vansh_Tyagi_Resume.pdf"
                className="btn btn-outline btn-lg"
              >
                <Download className="btn-icon-left" />
                <span>Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-social">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT PROFILE IMAGE */}
          <div className="hero-image-section">
            <div className="profile-image-wrapper">
              <img
                src={isDark ? "images/profile-dark.jpg" : "images/profile-light.jpg"}
                alt="Vansh Tyagi"
                className="profile-image"
              />
            </div>
          </div>

        </div>

        {/* Stats Section */}
        <div className="hero-stats">
          <div className="stat-card">
            <h3 className="stat-value">7.7</h3>
            <p className="stat-label">CGPA</p>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-card">
            <h3 className="stat-value">6+</h3>
            <p className="stat-label">Projects</p>
          </div>
          <div className="stat-divider"></div>

          <div className="stat-card">
            <h3 className="stat-value">1+</h3>
            <p className="stat-label">Year Experience</p>
          </div>
        </div>
      </div>

      <ChatWidget />
    </section>
  );
};

export default Home;
