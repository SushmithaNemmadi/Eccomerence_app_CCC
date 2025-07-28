// src/pages/AddressPage.js

import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../styles/FormStyles.css';

function AddressPage() {
  const location = useLocation();
  const product = location.state?.product;
  console.log("Address Page loaded with product:", product); // ✅ DEBUG LOG

  const [address, setAddress] = useState({
    houseno: '',
    street: '',
    village: '',
    landmark: '',
    city: '',
    district: ''
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("❌ You must be logged in to place an order.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/buy',
        { address, product },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || "✅ Order is successful!");
      setAddress({
        houseno: '',
        street: '',
        village: '',
        landmark: '',
        city: '',
        district: ''
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error: " + (err.response?.data?.message || "Something went wrong."));
    }
  };

  return (
    <div className="page-background">
      <div className="auth-form">
        <h2>Delivery Address</h2>

        {product && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Buying: {product?.name || product?.title || "Unknown Product"}</h3>
            <p>Price: ₹{product.price}</p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            name="houseno"
            placeholder="House No"
            value={address.houseno}
            onChange={handleChange}
            required
          />
          <input
            name="street"
            placeholder="Street"
            value={address.street}
            onChange={handleChange}
            required
          />
          <input
            name="village"
            placeholder="Village"
            value={address.village}
            onChange={handleChange}
            required
          />
          <input
            name="landmark"
            placeholder="Landmark"
            value={address.landmark}
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            required
          />
          <input
            name="district"
            placeholder="District"
            value={address.district}
            onChange={handleChange}
            required
          />
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default AddressPage;
