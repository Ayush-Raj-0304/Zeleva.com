// Product data management - now using optimized category-based structure
// This file imports from the centralized index for backward compatibility
// For better performance and organization, import directly from './index.js'

import products from './index.js';

// Re-export for backward compatibility
export default products;

/* 
OPTIMIZED STRUCTURE OVERVIEW:
├── src/data/
│   ├── index.js              // Main entry point (70+ products)
│   ├── products.js           // This file (backward compatibility)
│   └── categories/
│       ├── electronics.js    // 15 products
│       ├── fashion.js        // 15 products
│       ├── furniture.js      // 10 products
│       ├── home.js           // 10 products
│       ├── kitchen.js        // 10 products
│       └── fitness.js        // 10 products

BENEFITS:
✅ Better organization by category
✅ Easier maintenance and updates
✅ Faster loading (load only needed categories)
✅ Scalable structure for hundreds of products
✅ Helper functions for common operations
✅ Product statistics and analytics

USAGE EXAMPLES:
import products from './data/products.js';              // All products (this file)
import products, { productStats } from './data/index.js';  // All products + utilities
import { electronics } from './data/index.js';          // Electronics only
import { getProductsByCategory } from './data/index.js'; // Helper functions
*/ 