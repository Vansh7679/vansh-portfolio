import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import PreLandingPage from './components/PreLandingPage';

import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';   // 👈 ADD THIS
import Contact from './pages/Contact';

import './index.css';

function App() {

  const hasVisited = sessionStorage.getItem('hasVisited');

  const [showPreLanding, setShowPreLanding] = useState(!hasVisited);
  const [showMainContent, setShowMainContent] = useState(!!hasVisited);

  const handleEnterPortfolio = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setShowPreLanding(false);

    setTimeout(() => setShowMainContent(true), 100);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      
      <AnimatePresence mode="wait">
        {showPreLanding && (
          <PreLandingPage onEnter={handleEnterPortfolio} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showMainContent && (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route path="/" element={<Layout />}>

                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="experience" element={<Experience />} />
                <Route path="projects" element={<Projects />} />
                <Route path="testimonials" element={<Testimonials />} />

                {/* BLOG LIST */}
                <Route path="blog" element={<Blog />} />

                {/* BLOG DETAIL 🟢 */}
                <Route path="blog/:id" element={<BlogDetail />} />

                <Route path="contact" element={<Contact />} />

              </Route>
            </Routes>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
