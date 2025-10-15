import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaSignOutAlt, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';
import './Header.css';

const Header = ({ onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'products', label: 'Plugins' },
    { id: 'products', label: 'Modpacks' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const openAuthModal = (mode) => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setIsUserDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <>
      <motion.header 
        className={`site-header ${isScrolled ? 'scrolled' : ''}`}
        style={{ opacity: headerOpacity }}
      >
      <div className="header-content">
        {/* Animated Logo */}
        <motion.div 
          className="header-logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          onClick={() => scrollToSection('hero')}
        >
          <h1 className="logo-text">
            {'CursedBuild'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="logo-char"
                initial={{ opacity: 0, y: -20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7 + i * 0.05,
                  type: 'spring',
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.2, 
                  color: '#14f195',
                  textShadow: '0 0 20px #14f195',
                  transition: { duration: 0.2 }
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
          <div className="logo-underline"></div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              className="nav-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <span className="nav-glow"></span>
            </motion.button>
          ))}
        </nav>

        {/* Auth & Cart Actions */}
        <div className="header-actions">
          {/* Cart Button */}
          <motion.button
            className="cart-btn"
            onClick={onCartClick}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaShoppingCart />
            {getCartCount() > 0 && (
              <motion.span
                className="cart-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                {getCartCount()}
              </motion.span>
            )}
          </motion.button>

          {/* User Account Dropdown */}
          <div className="user-dropdown-container" ref={dropdownRef}>
            <motion.button
              className="user-account-btn"
              onClick={toggleUserDropdown}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.9, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserCircle className="user-icon-lg" />
              {isAuthenticated && <span className="user-name-short">{user?.name}</span>}
              <FaChevronDown className={`dropdown-arrow ${isUserDropdownOpen ? 'open' : ''}`} />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  className="user-dropdown-menu"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="dropdown-user-info">
                        <FaUser className="dropdown-user-icon" />
                        <div>
                          <div className="dropdown-user-name">{user?.name}</div>
                          <div className="dropdown-user-email">{user?.email}</div>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <motion.button
                        className="dropdown-item logout-item"
                        onClick={handleLogout}
                        whileHover={{ x: 5, backgroundColor: 'rgba(255, 0, 0, 0.2)' }}
                      >
                        <FaSignOutAlt /> Logout
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        className="dropdown-item"
                        onClick={() => openAuthModal('login')}
                        whileHover={{ x: 5, backgroundColor: 'rgba(143, 0, 255, 0.2)' }}
                      >
                        🔑 Login
                      </motion.button>
                      <motion.button
                        className="dropdown-item"
                        onClick={() => openAuthModal('register')}
                        whileHover={{ x: 5, backgroundColor: 'rgba(20, 241, 149, 0.2)' }}
                      >
                        ✍️ Sign Up
                      </motion.button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className="mobile-nav">
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              className="mobile-nav-item"
              onClick={() => scrollToSection(item.id)}
              initial={{ x: -100, opacity: 0 }}
              animate={{ 
                x: isMobileMenuOpen ? 0 : -100,
                opacity: isMobileMenuOpen ? 1 : 0
              }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 10, color: '#14f195' }}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Header Glow Effects */}
      <div className="header-glow-top"></div>
      <div className="header-glow-bottom"></div>
    </motion.header>

    {/* Auth Modal - Rendered outside header for proper overlay */}
    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      initialMode={authModalMode}
    />
  </>
  );
};

export default Header;
