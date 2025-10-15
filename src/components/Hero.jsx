import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import QuoteSection from './QuoteSection';
import './Hero.css';

const Hero = () => {
  const logoRef = useRef(null);
  const lightningRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Animate logo particles
    const particles = logoRef.current.querySelectorAll('.rune-particle');
    
    gsap.fromTo(particles, 
      {
        opacity: 0,
        scale: 0,
        x: () => Math.random() * 200 - 100,
        y: () => Math.random() * 200 - 100,
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 2,
        stagger: 0.05,
        ease: 'power3.out',
        onComplete: () => {
          setLoaded(true);
          // Trigger lightning
          gsap.to(lightningRef.current, {
            opacity: 1,
            duration: 0.1,
            yoyo: true,
            repeat: 3,
            onComplete: () => {
              gsap.to(lightningRef.current, { opacity: 0, duration: 0.3 });
            }
          });
        }
      }
    );

    // Floating blocks animation (optimized)
    const blocks = document.querySelectorAll('.floating-block');
    blocks.forEach((block, i) => {
      gsap.to(block, {
        y: '+=30',
        rotation: '+=180', // Reduced rotation
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true // GPU acceleration
      });
    });
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        {/* Animated Logo */}
        <div className="logo-container" ref={logoRef}>
          <h1 className="cursed-logo">
            {'CursedBuild'.split('').map((char, i) => (
              <span key={i} className="rune-particle">
                {char}
              </span>
            ))}
          </h1>
          <div className="lightning-crack" ref={lightningRef}></div>
        </div>

        {/* Quote Section */}
        <QuoteSection />

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          Power your world with the Cursed touch.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <button 
            className="neon-button neon-button-primary"
            onClick={() => {
              const element = document.getElementById('products');
              if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
          >
            Explore Plugins
          </button>
          <button 
            className="neon-button"
            onClick={() => {
              const element = document.getElementById('products');
              if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
          >
            View Modpacks
          </button>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <div className="scroll-arrow"></div>
        </motion.div>
      </div>

      {/* Floating Minecraft blocks - Reduced count */}
      <div className="floating-blocks">
        <div className="floating-block block-1"></div>
        <div className="floating-block block-2"></div>
        <div className="floating-block block-3"></div>
      </div>

      {/* Glowing orbs */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
    </section>
  );
};

export default Hero;
