import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function App() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  // const [freeGiftAdded, setFreeGiftAdded] = useState(false);

  const calculateSubtotal = useCallback(() => {
    // Calculate subtotal excluding the free gift
    const total = cart.reduce((sum, item) => {
      if (item.id !== FREE_GIFT.id) {
        return sum + (item.price * item.quantity);
      }
      return sum;
    }, 0);
    setSubtotal(total);
  }, [cart]);

  useEffect(() => {
    calculateSubtotal();
    
    // Handle free gift logic
    const hasGift = cart.some(item => item.id === FREE_GIFT.id);
    
    if (subtotal >= THRESHOLD && !hasGift) {
      // Add free gift
      setCart(prev => [...prev, { ...FREE_GIFT, quantity: 1 }]);
      // setFreeGiftAdded(true);
    } else if (subtotal < THRESHOLD && hasGift) {
      // Remove free gift if subtotal drops below threshold
      setCart(prev => prev.filter(item => item.id !== FREE_GIFT.id));
      // setFreeGiftAdded(false);
    }
  }, [subtotal, calculateSubtotal,cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, change) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId) => {
    // Don't allow removing the free gift manually
    if (productId === FREE_GIFT.id) return;
    
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const progressPercentage = Math.min((subtotal / THRESHOLD) * 100, 100);

  return (
    <div className="app">
      <h1>Shopping Cart</h1>
      
      <div className="products-section">
        <h2>Products</h2>
        <div className="products-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <h2>Cart Summary</h2>
        <div className="cart-content">
          <div className="subtotal-row">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          
          {subtotal < THRESHOLD ? (
            <div className="gift-progress">
              <p>Add ₹{THRESHOLD - subtotal} more to get a FREE Wireless Mouse!</p>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="gift-progress gift-added">
              <p>🎉 Congratulations! Free gift added to your cart</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '100%' }}></div>
              </div>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <p>Add some products to see them here!</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <span>{item.name}</span>
                    {item.id === FREE_GIFT.id && (
                      <span className="free-gift-badge">Free Gift</span>
                    )}
                  </div>
                  
                  {item.id === FREE_GIFT.id ? (
                    <div className="free-gift-qty">
                      <span>₹{item.price}</span>
                      <span className="qty-text">Qty: {item.quantity}</span>
                    </div>
                  ) : (
                    <div className="item-controls">
                      <span className="item-price">₹{item.price}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;