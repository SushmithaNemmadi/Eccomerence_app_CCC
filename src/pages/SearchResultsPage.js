import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import categoriesData from "../data/categoriesData";
import { products } from "../data/MultipleProductData";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

// ✅ Define sizes for specific categories
const sizeMap = {
  men: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  women: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  'men-footwear': ['34', '35', '36', '37', '38', '39', '40'],
  'women-footwear': ['34', '35', '36', '37', '38', '39', '40'],
};

const useQuery = () => new URLSearchParams(useLocation().search);

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const searchTerm = query.get("query")?.toLowerCase() || "";

  const { addToCart: contextAddToCart } = useCart();

  const getSizeIfNeeded = (product) => {
    const category = product.category?.toLowerCase();
    const availableSizes = sizeMap[category];
    if (availableSizes) {
      const size = prompt(`Select size (${availableSizes.join(", ")})`);
      if (!size || !availableSizes.includes(size)) {
        alert("Invalid or no size selected. Product not added.");
        return null;
      }
      return size;
    }
    return null; // No size required
  };

  const addToCart = (product) => {
    console.log("Adding to cart:", product);  // ✅ Debug log
    const size = getSizeIfNeeded(product);
    if (size === null && sizeMap[product.category?.toLowerCase()]) return;
    contextAddToCart(size ? { ...product, selectedSize: size } : product);
  };

  const addToWishlist = (product) => {
    const size = getSizeIfNeeded(product);
    if (size === null && sizeMap[product.category?.toLowerCase()]) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    wishlist.push(size ? { ...product, selectedSize: size } : product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist!");
  };

  const handleView = (product) => {
    navigate("/view-image", { state: { product } });
  };

  const searchResultsFromState = location.state?.results;

  const categoryProducts = Object.values(categoriesData).flat();
  const multipleProducts = Object.values(products).flat();
  const allProducts = [...categoryProducts, ...multipleProducts];

  const finalResults = searchResultsFromState && searchResultsFromState.length > 0
    ? searchResultsFromState
    : allProducts.filter((product) =>
        (product.title && product.title.toLowerCase().includes(searchTerm)) ||
        (product.name && product.name.toLowerCase().includes(searchTerm)) ||
        (product.description && product.description.toLowerCase().includes(searchTerm)) ||
        (product.category && product.category.toLowerCase().includes(searchTerm))
      );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results for "{searchTerm}"</h2>
      {finalResults.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {finalResults.map((product, index) => (
            <div key={index}>
              <ProductCard
                product={product}
                onView={() => handleView(product)}
                onAddToCart={() => addToCart(product)}
                onAddToWishlist={() => addToWishlist(product)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No matching products found.
        </p>
      )}
    </div>
  );
}

export default SearchResultsPage;
