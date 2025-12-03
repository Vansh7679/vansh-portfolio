import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import '../styles/Blog.css';

const Blog = () => {
  // 🔥 Static Sample Blogs (Frontend Only) with Random Online Images
  const staticBlogs = [
    {
      id: 1,
      title: "Building My First Full-Stack Project with React & Spring Boot",
      excerpt:
        "Here’s how I built a fully functional full-stack application using React for the frontend and Spring Boot for the backend...",
      content:
        "This was one of the most exciting projects I created. I worked with REST APIs, MySQL, authentication, role management, and deployment strategies...",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60",
      createdAt: "2025-01-10",
      readTime: 4,
      tags: ["React", "Spring Boot", "Full Stack"],
    },
    {
      id: 2,
      title: "How I Developed a Carpooling App for College Students",
      excerpt:
        "A complete walkthrough on how I developed a ride-sharing platform for students using modern full-stack technologies...",
      content:
        "Bro’s Ride was built to solve real-world travel issues for my college. With features like authentication, ride creation, passenger matching...",
      imageUrl:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=900&q=60",
      createdAt: "2025-02-05",
      readTime: 5,
      tags: ["Java", "MySQL", "React", "Spring Boot"],
    },
    {
      id: 3,
      title: "My Internship Experience with the Indian Army Unit",
      excerpt:
        "Working with the Indian Army tech unit was a remarkable experience where I built a digital inventory & tracking system...",
      content:
        "During the internship, I built a complete digital workflow system that replaced manual paperwork and improved accuracy by 60%...",
      imageUrl:
        "https://images.unsplash.com/photo-1549921296-3ecf9cde7abf?auto=format&fit=crop&w=900&q=60",
      createdAt: "2025-01-20",
      readTime: 3,
      tags: ["Internship", "Army", "Web App"],
    },
  ];

  const [selectedTag, setSelectedTag] = useState("all");

  // Extract tags
  const allTags = [
    "all",
    ...new Set(
      staticBlogs.flatMap((blog) =>
        Array.isArray(blog.tags) ? blog.tags : []
      )
    ),
  ];

  // Filter by tag
  const filteredBlogs =
    selectedTag === "all"
      ? staticBlogs
      : staticBlogs.filter((b) => b.tags.includes(selectedTag));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="blog-page section section-lg">
      {/* Background gradient blobs */}
      <div className="blog-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="blog-header">
          <h1 className="blog-title">Blog & Articles</h1>
          <p className="blog-subtitle">
            Thoughts, tutorials, and insights on development, full-stack
            engineering, and real-world projects
          </p>
        </div>

        {/* Tag Filter */}
        {allTags.length > 1 && (
          <div className="blog-filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`filter-tag ${
                  selectedTag === tag ? "active" : ""
                }`}
              >
                {tag === "all" ? "All Posts" : tag}
              </button>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        <div className="blog-grid">
          {filteredBlogs.map((blog, index) => (
            <article
              key={blog.id}
              className="blog-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              {blog.imageUrl && (
                <div className="blog-image">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div className="blog-image-overlay"></div>
                </div>
              )}

              {/* Content */}
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">
                    <Calendar size={14} />
                    {formatDate(blog.createdAt)}
                  </span>
                  <span className="blog-read-time">
                    <Clock size={14} />
                    {blog.readTime} min read
                  </span>
                </div>

                <h2 className="blog-card-title">{blog.title}</h2>

                <p className="blog-excerpt">{blog.excerpt}</p>

                <div className="blog-tags">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="blog-tag">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="blog-read-more">
                  Read More <ArrowRight size={16} />
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
