import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './CartModal.css';

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="cart-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="cart-modal-content"
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="cart-header">
            <h2 className="cart-title">
              <FaShoppingBag /> Shopping Cart
            </h2>
            <motion.button
              className="cart-close-btn"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
          </div>

          {/* Cart Items */}
          <div className="cart-items-container">
            {cartItems.length === 0 ? (
              <motion.div
                className="empty-cart"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="empty-icon">🛒</div>
                <h3>Your Cart is Empty</h3>
                <p>Add some products to get started!</p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="cart-item"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <div className="item-icon">{item.image}</div>
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-category">{item.category}</p>
                      <p className="item-price">{item.price}</p>
                    </div>

                    <div className="item-actions">
                      <div className="quantity-controls">
                        <motion.button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaMinus />
                        </motion.button>
                        <span className="quantity">{item.quantity}</span>
                        <motion.button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaPlus />
                        </motion.button>
                      </div>

                      <motion.button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTrash />
                      </motion.button>
                    </div>

                    <div className="item-total">
                      ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <motion.div
              className="cart-footer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span className="subtotal">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%):</span>
                  <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span className="total-amount">${(getCartTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <motion.button
                  className="clear-cart-btn"
                  onClick={clearCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear Cart
                </motion.button>
                <motion.button
                  className="checkout-btn"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(20, 241, 149, 0.6)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Corner Decorations */}
          <div className="cart-corner tl"></div>
          <div className="cart-corner tr"></div>
          <div className="cart-corner bl"></div>
          <div className="cart-corner br"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;
