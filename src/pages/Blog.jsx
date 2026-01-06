import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import '../styles/Blog.css';

const Blog = () => {

  const navigate = useNavigate();

  const staticBlogs = [
    {
      id: 1,
      title: "Building My First Full-Stack Project with React & Spring Boot",
      excerpt:
        "Here’s how I built a fully functional full-stack application using React for the frontend and Spring Boot for the backend...",
      imageUrl:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=900&q=60",
      createdAt: "2025-01-10",
      readTime: 4,
      tags: ["React", "Spring Boot", "Full Stack"],
    },
    {
      id: 2,
      title: "How I Developed a Carpooling App for College Students",
      excerpt:
        "A complete walkthrough on how I developed a ride-sharing platform for students using modern full-stack technologies...",
      imageUrl:
        "https://images.unsplash.com/photo-1528033978085-52f315289665?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: "2025-02-05",
      readTime: 5,
      tags: ["Java", "MySQL", "React", "Spring Boot"],
    },
    {
      id: 3,
      title: "My Internship Experience with the Indian Army Unit",
      excerpt:
        "Working with the Indian Army tech unit was a remarkable experience where I built a digital inventory & tracking system...",
      imageUrl:
        "https://images.unsplash.com/photo-1763656447412-cacd245bb3a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: "2025-01-20",
      readTime: 3,
      tags: ["Internship", "Army", "Web App"],
    },
  ];

  const [selectedTag, setSelectedTag] = useState("all");

  const allTags = [
    "all",
    ...new Set(staticBlogs.flatMap(b => b.tags || []))
  ];

  const filteredBlogs =
    selectedTag === "all"
      ? staticBlogs
      : staticBlogs.filter(b => b.tags.includes(selectedTag));

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });

  return (
    <section className="blog-page section section-lg">

      <div className="blog-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>

      <div className="container">

        <div className="blog-header">
          <h1 className="blog-title">Blog & Articles</h1>
          <p className="blog-subtitle">
            Thoughts, tutorials, and insights on full-stack development & real-world projects
          </p>
        </div>

        {allTags.length > 1 && (
          <div className="blog-filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`filter-tag ${selectedTag === tag ? "active" : ""}`}
              >
                {tag === "all" ? "All Posts" : tag}
              </button>
            ))}
          </div>
        )}

        <div className="blog-grid">
          {filteredBlogs.map((blog, index) => (
            <article
              key={blog.id}
              className="blog-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {blog.imageUrl && (
                <div className="blog-image">
                  <img src={blog.imageUrl} alt={blog.title} />
                  <div className="blog-image-overlay" />
                </div>
              )}

              <div className="blog-content">

                <div className="blog-meta">
                  <span><Calendar size={14}/> {formatDate(blog.createdAt)}</span>
                  <span><Clock size={14}/> {blog.readTime} min read</span>
                </div>

                <h2 className="blog-card-title">{blog.title}</h2>

                <p className="blog-excerpt">{blog.excerpt}</p>

                <div className="blog-tags">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="blog-tag">
                      <Tag size={12}/> {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="blog-read-more"
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  Read More <ArrowRight size={16}/>
                </button>

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
