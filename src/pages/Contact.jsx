import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, XCircle } from 'lucide-react';
import '../styles/Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // ----------------------------
  // Handle Input Change
  // ----------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ----------------------------
  // DUMMY FRONTEND SUBMIT (NO BACKEND)
  // ----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Simulate sending delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Hide success after 5 sec
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  const contactInfo = [
    {
      icon: <Mail className="contact-info-icon" />,
      title: 'Email',
      value: 'vanshtyagi073@gmail.com',
      link: 'mailto:vanshtyagi073@gmail.com'
    },
    {
      icon: <Phone className="contact-info-icon" />,
      title: 'Phone',
      value: '+91 9627784080',
      link: 'tel:+919627784080'
    },
    {
      icon: <MapPin className="contact-info-icon" />,
      title: 'Location',
      value: 'Meerut, Uttar Pradesh, India',
      link: null
    }
  ];

  const socialLinks = [
    { icon: <Github className="social-icon-svg" />, url: 'https://github.com/Vansh7679', label: 'GitHub' },
    { icon: <Linkedin className="social-icon-svg" />, url: 'https://www.linkedin.com/in/vansh-tyagi-aa3a15251/', label: 'LinkedIn' },
    { icon: <Twitter className="social-icon-svg" />, url: 'https://twitter.com/', label: 'Twitter' }
  ];

  return (
    <div className="contact-page section section-lg">
      <div className="container">

        {/* ===== Section Title ===== */}
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Have a project in mind or want to collaborate? Feel free to reach out!</p>
        </div>

        <div className="contact-grid">

          {/* ===== CONTACT INFO SECTION ===== */}
          <div className="contact-info-section">

            <div className="contact-info-cards">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="contact-info-card card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-content">
                    <div className="contact-icon-wrapper">{info.icon}</div>
                    <h4 className="contact-title">{info.title}</h4>

                    {info.link ? (
                      <a href={info.link} className="contact-value">{info.value}</a>
                    ) : (
                      <p className="contact-value">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links-card card">
              <div className="card-content">
                <h4 className="social-title">Connect With Me</h4>
                <div className="social-links-grid">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-btn"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===== CONTACT FORM SECTION ===== */}
          <div className="contact-form-section">
            <div className="contact-form card">
              <div className="card-content">

                {/* SUCCESS */}
                {isSubmitted && (
                  <div className="success-message">
                    <div className="success-icon-wrapper">
                      <CheckCircle className="success-icon" />
                    </div>
                    <h3 className="success-title">Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                    <button className="btn btn-outline" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </button>
                  </div>
                )}

                {/* ERROR (never triggered now, but kept for UI consistency) */}
                {errorMessage && (
                  <div className="error-message">
                    <XCircle className="error-icon" />
                    <p className="error-text">{errorMessage}</p>
                  </div>
                )}

                {/* FORM */}
                {!isSubmitted && (
                  <>
                    <h3 className="form-title">Send Message</h3>

                    <form onSubmit={handleSubmit} className="contact-form-fields">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Message</label>
                        <textarea
                          name="message"
                          rows="6"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="form-textarea"
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-primary w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span>Sending</span>
                            <span className="loading-spinner"></span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="btn-icon-right" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
