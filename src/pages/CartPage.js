// src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate('/address', { state: { product } });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price || 0), 0);

  return (
    <div style={{ padding: '20px', paddingTop: '80px' }}>
      <h2 style={{ marginBottom: '20px' }}>🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Product List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cartItems.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                {/* ✅ Add onBuy handler */}
                <ProductCard product={product} onBuy={handleBuyNow} showRemove={false} />

                {/* External Buttons */}
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => removeFromCart(product.id)}>
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price and Checkout */}
          <div style={{ marginTop: '30px', fontSize: '18px' }}>
            <strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}
          </div>

          <button
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => alert('Proceeding to checkout...')}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
