import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="experience" element={<Experience />} />
        <Route path="projects" element={<Projects />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
