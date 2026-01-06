import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  CheckCircle
} from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SAME DUMMY SUBMIT — NO BACKEND
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  // 🌍 GOOGLE MAP COORDINATES
  const locationCoords = {
    lat: 28.9845,
    lng: 77.7064
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
    }
  ];

  const socialLinks = [
    { icon: <Github className="social-icon-svg" />, url: 'https://github.com/Vansh7679' },
    { icon: <Linkedin className="social-icon-svg" />, url: 'https://www.linkedin.com/in/vansh-tyagi-aa3a15251/' },
    { icon: <Twitter className="social-icon-svg" />, url: 'https://twitter.com/' }
  ];

  return (
    <div className="contact-page section section-lg">
      <div className="container">

        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Have a project in mind or want to collaborate? Feel free to reach out!</p>
        </div>

        <div className="contact-grid">

          {/* ---------- LEFT SIDE ---------- */}
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
                      <a href={info.link} className="contact-value">
                        {info.value}
                      </a>
                    ) : (
                      <p className="contact-value">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* 🌍 GOOGLE MAP CARD */}
              <div className="contact-info-card location-card card">
                <div className="map-container">
                  <iframe
                    title="Location Map"
                    src={`https://www.google.com/maps?q=${locationCoords.lat},${locationCoords.lng}&z=15&output=embed`}
                    loading="lazy"
                  />

                  <div className="map-overlay">
                    <div className="map-info">
                      <div className="contact-icon-wrapper">
                        <MapPin className="contact-info-icon" />
                      </div>

                      <h4 className="contact-title">Location</h4>
                      <p className="contact-value">Meerut, Uttar Pradesh, India</p>

                      <a
                        href={`https://maps.google.com/?q=${locationCoords.lat},${locationCoords.lng}`}
                        className="map-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open in Google Maps →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="social-links-card card">
              <div className="card-content">
                <h4 className="social-title">Connect With Me</h4>

                <div className="social-links-grid">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.url} className="social-link-btn">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- RIGHT SIDE ---------- */}
          <div className="contact-form-section">
            <div className="contact-form card">
              <div className="card-content">

                {isSubmitted ? (
                  <div className="success-message">
                    <CheckCircle className="success-icon" />
                    <h3 className="success-title">Message Sent!</h3>
                    <p>Thank you for reaching out. I’ll get back to you soon.</p>

                    <button className="btn btn-outline" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="form-title">Send Message</h3>

                    <form onSubmit={handleSubmit} className="contact-form-fields">
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your Email" />
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Subject" />
                      <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required placeholder="Your Message" />

                      <button className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : <>Send Message <Send className="btn-icon-right" /></>}
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
