import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import categoriesData from '../data/categoriesData'; // original object-based format
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductFromCategory } from '../data/MultipleProductData';
import '../pages/CategoriesPage.css'; // optional, style accordingly

function CategoriesPage() {
  const navigate = useNavigate();
  const { category } = useParams(); // category param from URL
  const [categories, setCategories] = useState([]);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Load all categories (for overview page)
  useEffect(() => {
    const data = Object.keys(categoriesData).map((key) => ({
      name: key,
      image: categoriesData[key][0]?.image || '',
    }));
    setCategories(data);
  }, []);

  // ✅ Updated handleBuy function with error check
  const handleBuy = (product) => {
    console.log("✅ Buy Now clicked for product:", product);
    if (!product) {
      alert("❌ Product is undefined!");
      return;
    }
    navigate('/address', { state: { product } });
  };

  // Handle view product
  const handleView = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // If a category is selected, show product cards
  if (category) {
    const products = getProductFromCategory(category);

    return (
      <div style={{ padding: '20px' }}>
        <h1 style={{ textTransform: 'capitalize', marginBottom: '20px' }}>
          {category.replace('-', ' ')} Products
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
              onBuy={handleBuy}
              onView={handleView}
            />
          ))}
        </div>
      </div>
    );
  }

  // If no category is selected, show category list
  return (
    <div className="categories-container">
      <h1 className="categories-title">Explore Our Categories</h1>
      <div className="categories-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <img src={cat.image} alt={cat.name} className="category-image" />
            <h2 className="category-name">{cat.name.replace('-', ' ')}</h2>
            <button
              className="category-button"
              onClick={() => navigate(`/products/${cat.name}`)}
            >
              View Products
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
