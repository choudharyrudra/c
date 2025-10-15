import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import SearchFilter from './SearchFilter';
import './FeaturedProducts.css';

const products = [
  {
    id: 1,
    name: 'Enchanted Core',
    category: 'Plugin',
    description: 'Advanced RPG mechanics with custom enchantments and magical abilities.',
    price: '$29.99',
    image: '🔮',
    color: 'purple'
  },
  {
    id: 2,
    name: 'Nether Dimension Pack',
    category: 'Modpack',
    description: 'Complete overhaul of the Nether with new biomes, mobs, and challenges.',
    price: '$39.99',
    image: '🔥',
    color: 'green'
  },
  {
    id: 3,
    name: 'Economy Master',
    category: 'Plugin',
    description: 'Full-featured economy system with shops, trading, and currencies.',
    price: '$24.99',
    image: '💎',
    color: 'purple'
  },
  {
    id: 4,
    name: 'Tech & Magic',
    category: 'Modpack',
    description: 'Blend technology and magic with 200+ mods for endless possibilities.',
    price: '$44.99',
    image: '⚡',
    color: 'green'
  },
  {
    id: 5,
    name: 'PvP Arena System',
    category: 'Plugin',
    description: 'Competitive arena battles with matchmaking and ranking systems.',
    price: '$34.99',
    image: '⚔️',
    color: 'purple'
  },
  {
    id: 6,
    name: 'Skyblock Evolved',
    category: 'Modpack',
    description: 'Next-generation skyblock with custom quests and progression.',
    price: '$27.99',
    image: '🏝️',
    color: 'green'
  }
];

const FeaturedProducts = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart } = useCart();

  const handleFilteredProducts = useCallback((filtered) => {
    setFilteredProducts(filtered);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Optional: Show a success message or animation
  };

  return (
    <section className="featured-products" id="products">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="glow-text">Featured Products</h2>
        <p className="section-subtitle">Discover our most powerful creations</p>
      </motion.div>

      {/* Search and Filter System */}
      <SearchFilter products={products} onFilteredProducts={handleFilteredProducts} />

      <div className="products-container">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className={`product-card ${flippedCard === product.id ? 'flipped' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setFlippedCard(product.id)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div className="card-inner">
                  {/* Front */}
                  <div className={`card-front ${product.color}`}>
                    <div className="product-icon">{product.image}</div>
                    <h3>{product.name}</h3>
                    <span className="product-category">{product.category}</span>
                    <div className="price-tag">{product.price}</div>
                    <div className="neon-edge"></div>
                  </div>

                  {/* Back */}
                  <div className={`card-back ${product.color}`}>
                    <p className="product-description">{product.description}</p>
                    <div className="card-actions">
                      <button 
                        className="action-btn cart-btn"
                        onClick={() => handleAddToCart(product)}
                        aria-label="Add to Cart"
                      >
                        <span className="cart-emoji">🛒</span>
                      </button>
                      <button className="action-btn info-btn">
                        <FaInfoCircle /> Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="no-results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="no-results-icon">🔮</div>
            <h3>No Products Found</h3>
            <p>Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      <div className="glow-divider"></div>
    </section>
  );
};

export default FeaturedProducts;
