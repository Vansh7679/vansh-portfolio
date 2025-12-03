import React from 'react';
import { experienceData } from '../data/experience';
import { Briefcase, Calendar } from 'lucide-react';
import '../styles/Experience.css';

export const Experience = () => {
  return (
    <div className="experience-page section section-lg">
      <div className="container">
        {/* Section Title */}
        <div className="section-title">
          <h2>Work Experience</h2>
          <p>My professional journey and key achievements</p>
        </div>

        {/* Timeline */}
        <div className="timeline-wrapper">
          <div className="timeline">
            {experienceData.map((exp, index) => (
              <div 
                key={index} 
                className="timeline-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content card">
                  <div className="card-header">
                    <div className="experience-meta">
                      <div>
                        <h3 className="experience-role">{exp.role}</h3>
                        <div className="experience-company">
                          <Briefcase className="meta-icon" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="experience-duration">
                        <Calendar className="meta-icon" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-content">
                    <p className="experience-description">{exp.description}</p>

                    {/* Technologies */}
                    <div className="experience-tech-section">
                      <h4>Technologies Used:</h4>
                      <div className="tech-badges">
                        {exp.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="badge badge-secondary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="experience-achievements-section">
                        <h4>Key Achievements:</h4>
                        <ul className="achievements-list">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
