import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  const activeSection = location.pathname;

 
  const lastScrollYRef = useRef(0);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 20);
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`navbar-header 
        ${isVisible ? 'navbar-visible' : 'navbar-hidden'} 
        ${isScrolled ? 'navbar-scrolled' : 'navbar-top'} 
        ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}
    >
      <div className="navbar-3d-card">
        <div className="navbar-container">
         
          <div className="navbar-brand-wrapper">
            <Link to="/" className="navbar-brand">
              <span className="navbar-logo-text">Vansh Tyagi</span>
            </Link>
          </div>

         
          <nav className="navbar-menu-desktop">
            {navLinks.map((link, i) => (
              <div
                key={link.path}
                className="navbar-item-wrapper"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <Link
                  to={link.path}
                  className={`navbar-link variable-font ${
                    activeSection === link.path ? 'navbar-link-active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          
          <div className="navbar-theme-wrapper">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        
        {isMobileMenuOpen && (
          <nav className="navbar-menu-mobile">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link-mobile ${
                  activeSection === link.path ? 'navbar-link-active' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
