import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

const About = () => {
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]);

  return (
    <section className="about-section" id="about">
      <motion.div
        className="about-content"
        style={{ opacity, scale }}
      >
        <motion.h2
          className="glow-text"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Born from the Chaos of Minecraft Innovation
        </motion.h2>

        <motion.p
          className="about-description"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          At CursedBuild, we don't just create plugins and modpacks—we forge experiences. 
          Every line of code is infused with passion, every feature crafted with precision. 
          We blend the mystical with the technical, bringing you tools that transform your 
          Minecraft world into something extraordinary.
        </motion.p>

        <motion.p
          className="about-description"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          From enchantment-inspired mechanics to cutting-edge optimization, we push the 
          boundaries of what's possible. Join thousands of players who have already 
          discovered the power of CursedBuild.
        </motion.p>

        <motion.div
          className="stats-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="stat-item">
            <div className="stat-number glow-text-green">500K+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number glow-text-green">200+</div>
            <div className="stat-label">Premium Plugins</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number glow-text-green">50+</div>
            <div className="stat-label">Modpacks</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number glow-text-green">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Background Effect */}
      <div className="shader-background">
        <div className="shader-layer layer-1"></div>
        <div className="shader-layer layer-2"></div>
        <div className="shader-layer layer-3"></div>
      </div>

      {/* Pixel Sparks - Reduced count */}
      <div className="pixel-sparks">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="spark" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}></div>
        ))}
      </div>

      <div className="glow-divider"></div>
    </section>
  );
};

export default About;
