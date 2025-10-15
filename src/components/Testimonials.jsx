import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'ShadowCraft_Pro',
    role: 'Server Owner',
    avatar: '🎮',
    rating: 5,
    text: 'CursedBuild plugins transformed my server. The custom enchantment system is mind-blowing. Players are addicted!',
    color: 'purple'
  },
  {
    id: 2,
    name: 'EnderQueen',
    role: 'Modpack Developer',
    avatar: '👑',
    rating: 5,
    text: 'Their modpacks are perfectly balanced. The tech-magic integration is seamless. Best purchases I\'ve made!',
    color: 'green'
  },
  {
    id: 3,
    name: 'NetherKing_88',
    role: 'Server Admin',
    avatar: '🔥',
    rating: 5,
    text: 'Outstanding support and stability. Zero bugs, zero lag. CursedBuild sets the standard for quality.',
    color: 'purple'
  },
  {
    id: 4,
    name: 'CrystalMage',
    role: 'Content Creator',
    avatar: '💎',
    rating: 5,
    text: 'The custom plugin creation service exceeded expectations. They brought my wildest ideas to life!',
    color: 'green'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? -45 : 45
    })
  };

  return (
    <section className="testimonials-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="glow-text">Voices from the Cursed Realm</h2>
        <p className="section-subtitle">What our community says</p>
      </motion.div>

      <div className="testimonials-container">
        <button className="testimonial-nav prev" onClick={handlePrev}>
          ‹
        </button>

        <div className="testimonial-wrapper">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotateY: { duration: 0.6 }
              }}
              className={`testimonial-card ${testimonials[currentIndex].color}`}
            >
              {/* Particle Glow Background */}
              <div className="particle-glow"></div>

              {/* Avatar */}
              <motion.div 
                className="testimonial-avatar"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <div className="avatar-icon">{testimonials[currentIndex].avatar}</div>
                <div className="avatar-ring"></div>
                <div className="avatar-ring-2"></div>
              </motion.div>

              {/* Rating Stars */}
              <motion.div 
                className="rating-stars"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                  >
                    <FaStar className="star" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Testimonial Text */}
              <motion.p 
                className="testimonial-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                "{testimonials[currentIndex].text}"
              </motion.p>

              {/* Author Info */}
              <motion.div 
                className="testimonial-author"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h4>{testimonials[currentIndex].name}</h4>
                <p>{testimonials[currentIndex].role}</p>
              </motion.div>

              {/* Decorative Elements */}
              <div className="deco-line top-left"></div>
              <div className="deco-line top-right"></div>
              <div className="deco-line bottom-left"></div>
              <div className="deco-line bottom-right"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="testimonial-nav next" onClick={handleNext}>
          ›
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="testimonial-indicators">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>

      <div className="glow-divider"></div>
    </section>
  );
};

export default Testimonials;
