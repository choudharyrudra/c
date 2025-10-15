import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './QuoteSection.css';

const quotes = [
  "Close the window that hurts you, no matter how beautiful is the view.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Where there is a will, there is a way.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones.",
  "Dream bigger. Do bigger.",
  "Don't watch the clock; do what it does. Keep going.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Hard work beats talent when talent doesn't work hard.",
  "What we think, we become."
];

const QuoteSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [displayedQuotes, setDisplayedQuotes] = useState([]);

  // Initialize with shuffled quotes
  useEffect(() => {
    const shuffled = [...quotes].sort(() => Math.random() - 0.5);
    setDisplayedQuotes(shuffled);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => {
        // Get next random quote that's different from current
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * quotes.length);
        } while (nextIndex === prev && quotes.length > 1);
        return nextIndex;
      });
    }, 6000); // Change quote every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quote-section">
      <motion.div
        className="quote-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="quote-box">
          {/* Decorative Quote Marks */}
          <div className="quote-mark left">"</div>
          <div className="quote-mark right">"</div>

          {/* Animated Quote Text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuote}
              className="quote-text"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {quotes[currentQuote]}
            </motion.p>
          </AnimatePresence>

          {/* Corner Decorations */}
          <div className="corner-deco top-left"></div>
          <div className="corner-deco top-right"></div>
          <div className="corner-deco bottom-left"></div>
          <div className="corner-deco bottom-right"></div>

          {/* Animated Border Glow */}
          <div className="border-glow"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuoteSection;
