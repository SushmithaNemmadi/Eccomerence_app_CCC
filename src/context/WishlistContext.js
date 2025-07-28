import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // Sample product as fallback
  const defaultSampleProduct = [
    {
      id: 101,
      name: "Vark Lilac Floral Design A-Line Ethnic Set",
      description: "Elegant lilac floral design...",
      price: 2599,
      imageUrl: "/assets/vark1.jpg", // Ensure this image exists in public/assets
    },
  ];

  // Load initial wishlist from localStorage or use default
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem("wishlistItems");
    return stored ? JSON.parse(stored) : defaultSampleProduct;
  });

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => [...prev, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
