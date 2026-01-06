import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import blogDetails from "../data/blogDetails";
import "../styles/Blog.css";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogDetails.find(b => b.id.toString() === id);

  useEffect(() => window.scrollTo(0, 0), []);

  if (!blog) {
    return (
      <h2 style={{ paddingTop: "120px", textAlign: "center", color: "#fff" }}>
        Blog not found
      </h2>
    );
  }

  const renderSection = (section, index) => {
    return (
      <div key={index} className="blog-section">
        {section.heading && (
          <h2 className="blog-detail-heading">{section.heading}</h2>
        )}
        
        {section.content && (
          <div className="blog-detail-paragraph">
            {section.content.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        {section.list && (
          <ul className="blog-detail-list">
            {section.list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {section.features && (
          <div className="blog-features">
            {section.features.map((feature, i) => (
              <div key={i} className="feature-item">
                <h3 className="feature-title">✅ {feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                {feature.list && (
                  <ul className="feature-list">
                    {feature.list.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {section.techStack && (
          <div className="tech-stack">
            {section.techStack.map((tech, i) => (
              <div key={i} className="tech-item">
                <span className="tech-label">{tech.label}:</span>
                <span className="tech-value">{tech.value}</span>
              </div>
            ))}
          </div>
        )}

        {section.afterList && (
          <p className="blog-detail-paragraph">{section.afterList}</p>
        )}
      </div>
    );
  };

  return (
    <section className="blog-page section section-lg">
      <div className="blog-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>

      <div className="container">
        <div className="blog-detail-container">
          
          <Link to="/blog" className="blog-back-button">
            <ArrowLeft size={18} />
            <span>Back to Blog</span>
          </Link>

          <article className="blog-detail-card">
            
            <h1 className="blog-detail-title">{blog.title}</h1>

            <div className="blog-detail-meta">
              <span className="meta-item">
                <Calendar size={16} />
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </span>
              <span className="meta-item">
                <Clock size={16} />
                {blog.readTime}
              </span>
            </div>

            <div className="blog-detail-image-container">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="blog-detail-image"
              />
            </div>

            <div className="blog-detail-content">
              {blog.sections.map((section, index) => renderSection(section, index))}
            </div>

          </article>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;