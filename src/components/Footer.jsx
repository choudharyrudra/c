import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaTwitter, FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const copyrightRef = useRef(null);

  useEffect(() => {
    // Animated copyright text
    const text = copyrightRef.current;
    const chars = text.textContent.split('');
    text.innerHTML = '';
    
    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animationDelay = `${i * 0.05}s`;
      text.appendChild(span);
    });
  }, []);

  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        {/* Logo Section */}
        <motion.div
          className="footer-logo-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="footer-logo glow-text">CursedBuild</h2>
          <p className="footer-tagline">Forge. Create. Dominate.</p>
          
          <div className="social-icons">
            <motion.a 
              href="#" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.4 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a 
              href="#" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.4 }}
            >
              <FaDiscord />
            </motion.a>
            <motion.a 
              href="#" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.4 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href="#" 
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.4 }}
            >
              <FaYoutube />
            </motion.a>
          </div>
        </motion.div>

        {/* Links Sections */}
        <div className="footer-links-grid">
          <motion.div
            className="footer-links-column"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4>Products</h4>
            <a href="#">Plugins</a>
            <a href="#">Modpacks</a>
            <a href="#">Custom Development</a>
            <a href="#">Bundles</a>
          </motion.div>

          <motion.div
            className="footer-links-column"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Resources</h4>
            <a href="#">Documentation</a>
            <a href="#">Tutorials</a>
            <a href="#">API Reference</a>
            <a href="#">Community Forum</a>
          </motion.div>

          <motion.div
            className="footer-links-column"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
            <a href="#">Discord Server</a>
            <a href="#">Report Bug</a>
          </motion.div>

          <motion.div
            className="footer-links-column"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h4>Legal</h4>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund Policy</a>
            <a href="#">License</a>
          </motion.div>
        </div>
      </div>

      {/* Glowing Divider */}
      <div className="footer-divider"></div>

      {/* Copyright */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="copyright" ref={copyrightRef}>
          © 2025 CursedBuild | Forged in Code and Chaos
        </p>
      </motion.div>

      {/* Floating Energy Particles - Reduced count */}
      <div className="footer-particles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="footer-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Background Glow */}
      <div className="footer-glow"></div>
    </footer>
  );
};

export default Footer;
