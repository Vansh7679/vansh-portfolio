import React, { useState } from 'react';
import { skillsData } from '../data/skills';
import { educationData } from '../data/education';
import '../styles/About.css';

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Group skills by category
  const skillCategories = ['all', ...new Set(skillsData.map(s => s.category).filter(Boolean))];

  const filteredSkills =
    selectedCategory === 'all'
      ? skillsData
      : skillsData.filter(s => s.category === selectedCategory);

  return (
    <div className="about-page section section-lg">
      <div className="container">
        
        {/* Section Title */}
        <div className="section-title about-header">
          <h2>About Me</h2>
          <p className="about-subtitle">
            Get to know more about my background, skills, and education
          </p>
        </div>

        {/* About Content */}
        <div className="about-intro-section">
          <div className="card about-card">

            {/* Profile Image Block */}
            <div className="about-image-block">
              <img
                src="images/vansh.png"
                alt="Vansh Tyagii"
                className="about-profile-image"
              />
            </div>

            <div className="card-content">
              <p className="about-text">
                My name is <strong>Vansh Tyagii</strong>, and I am currently in my
                <strong> seventh semester</strong> with a <strong>CGPA of 7.7</strong>, pursuing my
                <strong> B.Tech in Computer Science and Engineering</strong> from
                <strong> MIET College, Meerut</strong>.
              </p>

              <p className="about-text">
                I have hands-on experience in <strong>Java, Spring Boot, MySQL, and ReactJS</strong>,
                and I am also <strong>AWS Cloud Practitioner Certified</strong>.
              </p>

              <p className="about-text">
                I have worked on multiple full-stack applications including a
                <strong> carpooling app for college students</strong> and a
                <strong> digital hall ticket & inventory tracking system</strong>
                developed during my internship with an <strong>Indian Army unit</strong>.
              </p>

              <p className="about-text">
                I am highly adaptable, quick to learn new technologies, and always eager
                to apply my skills to real-world applications.
              </p>

              {/* Resume Button */}
              <a 
                href="resume.pdf" 
                download="Vansh_Tyagi_Resume.pdf" 
                className="resume-download-btn"
              >
                Download Resume
              </a>

            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="skills-section">
          <div className="section-title">
            <h2>Technical Skills</h2>
            <p>My expertise across various technologies and tools</p>
          </div>

          {skillCategories.length > 1 && (
            <div className="skill-tabs">
              {skillCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`skill-tab ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          )}

          <div className="skills-grid">
            {filteredSkills.map((skill, index) => (
              <div
                key={index}
                className="skill-card card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="card-content">
                  <div className="skill-header">
                    <h4 className="skill-name">{skill.name}</h4>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <p className="skill-description">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="education-section">
          <div className="section-title">
            <h2>Education</h2>
            <p>My academic background and achievements</p>
          </div>

          <div className="education-grid">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="education-card card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-content">
                  <div className="education-header">
                    <div>
                      <h4 className="education-degree">{edu.degree}</h4>
                      <p className="education-institution">{edu.institution}</p>
                    </div>
                    <div className="education-meta">
                      <p className="education-year">{edu.year}</p>
                      <p className="education-grade">{edu.grade}</p>
                    </div>
                  </div>
                  <p className="education-description">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
