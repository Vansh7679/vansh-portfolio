import React, { useState } from "react";
import { skillsData } from "../data/skills";
import { educationData } from "../data/education";
import "../styles/About.css";

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const skillCategories = ["all", ...new Set(skillsData.map(s => s.category).filter(Boolean))];

  const filteredSkills =
    selectedCategory === "all" ? skillsData : skillsData.filter(s => s.category === selectedCategory);

  return (
    <div className="about-page section section-lg">
      <div className="container">

        {/* TITLE */}
        <div className="section-title about-header">
          <h2>About Me</h2>
          <p className="about-subtitle">Get to know more about my background, skills, and education</p>
        </div>

        {/* ABOUT CARD */}
        <div className="about-intro-section">
          <div className="card about-card">

            {/* PROFILE IMAGE */}
            <div className="about-image-block">
              <img
                src={`${import.meta.env.BASE_URL}images/vansh.png`}
                alt="Vansh Tyagii"
                className="about-profile-image"
              />
            </div>

            <div className="card-content">
              <p className="about-text">
                My name is <strong>Vansh Tyagii</strong>. I am in my <strong>7th semester</strong> with a
                <strong> CGPA of 7.7</strong>, pursuing <strong>B.Tech in CSE</strong> from
                <strong> MIET College, Meerut</strong>.
              </p>

              <p className="about-text">
                Skilled in <strong>Java, Spring Boot, MySQL, ReactJS</strong> and
                <strong> AWS Cloud Practitioner certified</strong>.
              </p>

              <p className="about-text">
                I have built multiple full-stack applications including a
                <strong> carpooling app</strong> and a complete
                <strong> hall ticket and inventory system</strong> for an Indian Army unit.
              </p>

              <p className="about-text">
                I am adaptable, quick to learn new technologies, and passionate about applying my skills to real projects.
              </p>

              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download="Vansh_Tyagi_Resume.pdf"
                className="resume-download-btn"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* SKILLS */}
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
                  className={`skill-tab ${selectedCategory === category ? "active" : ""}`}
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

        {/* EDUCATION */}
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
