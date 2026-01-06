import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import '../styles/Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(projectsData.map(p => p.category))];

  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter(p => p.category === filter);

 
  const GITHUB_REDIRECT_URL =
    'https://github.com/Vansh7679?tab=repositories';

  return (
    <section className="projects-page section section-lg bg-muted">
      <div className="container">

        {/* Section Title */}
        <div className="section-title">
          <h2>Featured Projects</h2>
          <p>Check out some of my recent work</p>
        </div>

        {/* Project Filters */}
        <div className="project-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="project-card card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >

              {/* Project Image */}
              {project.image && (
                <div className="project-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />

                  <div className="project-overlay">
                    <div className="project-links">

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-btn"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="link-icon" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-btn"
                          aria-label="GitHub"
                        >
                          <Github className="link-icon" />
                        </a>
                      )}

                    </div>
                  </div>
                </div>
              )}

              {/* Project Content */}
              <div className="card-header">
                <span className="project-category badge badge-secondary">
                  {project.category}
                </span>

                <h3 className="card-title">{project.title}</h3>

                <p className="card-description">{project.description}</p>
              </div>

              <div className="card-content">

                {/* Technologies */}
                <div className="project-technologies">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span key={techIndex} className="badge badge-outline">
                      {tech}
                    </span>
                  ))}

                  {project.technologies.length > 4 && (
                    <span className="badge badge-outline">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Achievements */}
                {project.achievements && project.achievements.length > 0 && (
                  <ul className="project-achievements">
                    {project.achievements.slice(0, 2).map((achievement, i) => (
                      <li key={i} className="achievement-item">
                        <ArrowRight className="achievement-icon" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Project Footer */}
              <div className="card-footer">

                {/* SAME AS NEW */}
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    window.open(
                      GITHUB_REDIRECT_URL,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                >
                  View Details
                  <ArrowRight className="btn-icon-right" />
                </button>

                <div className="footer-spacer"></div>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-icon"
                    aria-label="GitHub"
                  >
                    <Github className="icon-svg" />
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-icon"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="icon-svg" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Projects Found */}
        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>No projects found in this category.</p>
          </div>
        )}

        {/* View All Projects */}
        <div className="view-all-section">
          <button
            type="button"
            className="btn btn-outline btn-lg view-all-btn-animated"
            onClick={() =>
              window.open(
                GITHUB_REDIRECT_URL,
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            View All Projects
            <ArrowRight className="btn-icon-right arrow-animate" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Projects;
