import { useSelector } from 'react-redux';
import { selectWishlistItems } from '../redux/wishlistSlice';
import { selectIsAuthenticated } from '../redux/authSlice';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';

const WishlistPage = () => {
  const wishlistItems = useSelector(selectWishlistItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger page entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center py-12 ${isVisible ? 'page-enter' : 'opacity-0'}`}>
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-sm border border-gray-200/50 text-center animate-scaleIn">
            <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center animate-fadeIn stagger-1">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-medium text-gray-900 mb-4 font-display animate-slideInBottom stagger-2">
              Please sign in
            </h1>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed animate-slideInBottom stagger-3">
              You need to be signed in to view your wishlist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-200 btn-animate animate-slideInBottom stagger-4"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center py-12 ${isVisible ? 'page-enter' : 'opacity-0'}`}>
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-sm border border-gray-200/50 text-center animate-scaleIn">
            <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center animate-fadeIn stagger-1">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-medium text-gray-900 mb-4 font-display animate-slideInBottom stagger-2">
              Your wishlist is empty
            </h1>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed animate-slideInBottom stagger-3">
              Save items you love to view them later.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-200 btn-animate animate-slideInBottom stagger-4"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${isVisible ? 'page-enter' : 'opacity-0'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-slideInTop stagger-1">
          <h1 className="text-3xl font-medium text-gray-900 mb-6 font-display">
            Your Wishlist
          </h1>
          <p className="text-gray-600 mt-2">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn stagger-2">
          {wishlistItems.map((product, index) => (
            <div 
              key={product.id}
              className="product-enter"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <ProductCard product={product} view="grid" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage; 