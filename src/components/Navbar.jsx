import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(location.pathname);

  // ✅ UPDATED: Added Blog to navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' }, // ✅ NEW BLOG LINK
    { path: '/contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Update scroll state for backdrop effects
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    // Set initial state
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Update active section based on current route
  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location.pathname]);

  return (
    <header 
      className={`navbar-header ${isVisible ? 'navbar-visible' : 'navbar-hidden'} ${isScrolled ? 'navbar-scrolled' : 'navbar-top'} ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}
    >
      <div className="navbar-3d-card">
        <div className="navbar-container">
          {/* Logo - Left aligned with fixed width */}
          <div className="navbar-brand-wrapper">
            <Link to="/" className="navbar-brand">
              <span className="navbar-logo-text">Vansh Tyagi</span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="navbar-menu-desktop">
            {navLinks.map((link, i) => (
              <div
                key={link.path}
                className="navbar-item-wrapper"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <Link
                  to={link.path}
                  className={`navbar-link variable-font ${activeSection === link.path ? 'navbar-link-active' : ''}`}
                  onClick={() => setActiveSection(link.path)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Theme Toggle - Right aligned with fixed width */}
          <div className="navbar-theme-wrapper">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;