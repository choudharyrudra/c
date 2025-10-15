import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaTimes, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import './SearchFilter.css';

const SearchFilter = ({ products, onFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Plugin', 'Modpack'];

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sorting
    result.sort((a, b) => {
      let compareValue = 0;

      if (sortBy === 'name') {
        compareValue = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        compareValue = priceA - priceB;
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    onFilteredProducts(result);
    return result;
  }, [searchTerm, selectedCategory, sortBy, sortOrder, products, onFilteredProducts]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('name');
    setSortOrder('asc');
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const activeFiltersCount = (searchTerm ? 1 : 0) + (selectedCategory !== 'All' ? 1 : 0);

  return (
    <div className="search-filter-container">
      {/* Search Bar */}
      <motion.div 
        className="search-bar"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search plugins and modpacks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <motion.button
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <motion.button
          className="filter-toggle-btn"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaFilter />
          Filters
          {activeFiltersCount > 0 && (
            <span className="filter-badge">{activeFiltersCount}</span>
          )}
        </motion.button>
      </motion.div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className="filter-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-content">
              {/* Category Filter */}
              <div className="filter-group">
                <h4 className="filter-title">Category</h4>
                <div className="category-buttons">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                      {selectedCategory === category && (
                        <motion.div
                          className="category-glow"
                          layoutId="category-glow"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="filter-group">
                <h4 className="filter-title">Sort By</h4>
                <div className="sort-controls">
                  <div className="sort-buttons">
                    <motion.button
                      className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
                      onClick={() => setSortBy('name')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Name
                    </motion.button>
                    <motion.button
                      className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
                      onClick={() => setSortBy('price')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Price
                    </motion.button>
                  </div>

                  <motion.button
                    className="sort-order-btn"
                    onClick={toggleSortOrder}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                  </motion.button>
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <motion.button
                  className="clear-filters-btn"
                  onClick={clearFilters}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All Filters
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <motion.div
        className="results-count"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="count-text">
          Showing <span className="count-number">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
        </span>
      </motion.div>
    </div>
  );
};

export default SearchFilter;
