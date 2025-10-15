import React from 'react';
import { motion } from 'framer-motion';
import { FaCog, FaGem, FaMagic, FaPuzzlePiece } from 'react-icons/fa';
import './WhyChoose.css';

const features = [
  {
    icon: <FaCog />,
    title: 'Optimized & Stable',
    description: 'Every plugin is rigorously tested for performance. Zero lag, maximum efficiency.',
    color: 'purple'
  },
  {
    icon: <FaGem />,
    title: 'Exclusive Modpacks',
    description: 'Handcrafted modpack collections you won\'t find anywhere else. Unique experiences await.',
    color: 'green'
  },
  {
    icon: <FaMagic />,
    title: 'Custom Plugin Creation',
    description: 'Need something special? Our team crafts bespoke plugins tailored to your vision.',
    color: 'purple'
  },
  {
    icon: <FaPuzzlePiece />,
    title: 'Seamless Integration',
    description: 'Plug and play compatibility. Works perfectly with your existing setup.',
    color: 'green'
  }
];

const WhyChoose = () => {
  return (
    <section className="why-choose-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="glow-text">Why Choose CursedBuild?</h2>
        <p className="section-subtitle">Power, Innovation, and Reliability</p>
      </motion.div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`feature-card-3d ${feature.color}`}
            initial={{ opacity: 0, y: 100, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              type: 'spring',
              stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -20, 
              rotateY: 10,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <div className="card-glow"></div>
            
            <motion.div 
              className="feature-icon"
              whileHover={{ 
                rotate: 360,
                scale: 1.2,
                transition: { duration: 0.6 }
              }}
            >
              {feature.icon}
            </motion.div>

            <h3>{feature.title}</h3>
            <p>{feature.description}</p>

            <div className="corner-ornament tl"></div>
            <div className="corner-ornament tr"></div>
            <div className="corner-ornament bl"></div>
            <div className="corner-ornament br"></div>

            <div className="hover-shine"></div>
          </motion.div>
        ))}
      </div>

      {/* Floating Energy Rings */}
      <div className="energy-rings">
        <div className="energy-ring ring-1"></div>
        <div className="energy-ring ring-2"></div>
        <div className="energy-ring ring-3"></div>
      </div>

      <div className="glow-divider"></div>
    </section>
  );
};

export default WhyChoose;
