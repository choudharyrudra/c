import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import WhyChoose from './components/WhyChoose';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CartModal from './components/CartModal';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  useEffect(() => {
    // Add cursor glow effect (throttled for performance)
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    let rafId;
    const moveCursor = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      if (rafId) cancelAnimationFrame(rafId);
      cursor.remove();
    };
  }, []);

  return (
    <div className="App">
      <ParticleBackground />
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <FeaturedProducts />
      <About />
      <WhyChoose />
      <Testimonials />
      <Footer />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
