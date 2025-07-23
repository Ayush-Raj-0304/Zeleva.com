// Centralized product data index
// This file imports all category-specific product files and combines them into a single array
// Benefits: Better organization, easier maintenance, faster loading, modular structure

import electronics from './categories/electronics.js';
import fashion from './categories/fashion.js';
import furniture from './categories/furniture.js';
import home from './categories/home.js';
import kitchen from './categories/kitchen.js';
import fitness from './categories/fitness.js';

// Combine all products from different categories
const allProducts = [
  ...electronics,   // 15 products
  ...fashion,       // 15 products  
  ...furniture,     // 10 products
  ...home,          // 10 products
  ...kitchen,       // 10 products
  ...fitness,       // 10 products
  // Total: 70 products
];

// Product statistics
export const productStats = {
  total: allProducts.length,
  byCategory: {
    Electronics: electronics.length,
    Fashion: fashion.length,
    Furniture: furniture.length,
    Home: home.length,
    Kitchen: kitchen.length,
    Fitness: fitness.length,
  },
  categories: ['Electronics', 'Fashion', 'Furniture', 'Home', 'Kitchen', 'Fitness']
};

// Helper functions for product management
export const getProductsByCategory = (category) => {
  return allProducts.filter(product => product.category === category);
};

export const getProductById = (id) => {
  return allProducts.find(product => product.id === id);
};

export const getFeaturedProducts = (limit = 6) => {
  return allProducts
    .filter(product => product.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getDiscountedProducts = (limit = 10) => {
  return allProducts
    .filter(product => product.originalPrice && product.originalPrice > product.price)
    .sort((a, b) => {
      const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
      const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
      return discountB - discountA;
    })
    .slice(0, limit);
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Export individual category arrays for specific use cases
export {
  electronics,
  fashion,
  furniture,
  home,
  kitchen,
  fitness
};

// Default export: all products
export default allProducts; 