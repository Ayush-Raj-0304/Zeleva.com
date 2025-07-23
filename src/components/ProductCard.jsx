import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToWishlist, removeFromWishlist, addToWishlistFirebase, removeFromWishlistFirebase, selectIsInWishlist } from '../redux/wishlistSlice';
import { selectIsAuthenticated } from '../redux/authSlice';

const ProductCard = ({ product, view = 'grid', onAuthRequired }) => {
  const dispatch = useDispatch();
  // Always use string for product id in selector for consistency
  const isInWishlist = useSelector(state => selectIsInWishlist(String(product.id))(state));
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      if (onAuthRequired) {
        onAuthRequired('wishlist');
      }
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      dispatch(removeFromWishlistFirebase(product.id));
    } else {
      dispatch(addToWishlist(product));
      dispatch(addToWishlistFirebase(product));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }
    return (
      <div className="flex items-center space-x-1 mb-3">
        {stars}
        <span className="text-sm text-gray-600 ml-2">({rating})</span>
      </div>
    );
  };

  const AuthPrompt = () => (
    showAuthPrompt && (
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20 modal-enter">
        <div className="bg-white/95 backdrop-blur-xl rounded-xl p-6 text-center shadow-xl border border-white/20 animate-scaleIn">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in required</h3>
          <p className="text-gray-600 text-sm mb-4">Please sign in to add items to your wishlist</p>
          <button
            onClick={() => setShowAuthPrompt(false)}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors duration-200 btn-animate"
          >
            Got it
          </button>
        </div>
      </div>
    )
  );

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // List View Layout
  if (view === 'list') {
    return (
      <div
        ref={cardRef}
        className={`relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden card-hover ${
          isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'
        }`}
      >
        <AuthPrompt />
        
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative flex items-center justify-center sm:w-1/3 aspect-square sm:aspect-auto">
            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded-full z-10 animate-fadeIn">
                {discountPercentage}% OFF
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm border border-white/20 z-10 btn-animate ${
                isInWishlist 
                  ? 'bg-black text-white shadow-lg' 
                  : 'bg-white/80 text-gray-600 hover:text-black hover:bg-white'
              }`}
              aria-label="Toggle wishlist"
            >
              <svg 
                className="w-5 h-5" 
                fill={isInWishlist ? "currentColor" : "none"} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <div className="relative overflow-hidden bg-gray-100 h-full flex items-center justify-center">
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-32 rounded-xl transition-transform duration-500 hover:scale-110"
                />
              </Link>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Brand */}
              <p className="text-sm text-gray-500 font-medium">
                {product.brand}
              </p>

              {/* Product Name */}
              <Link to={`/product/${product.id}`}>
                <h3 className="text-xl font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              {renderStars(product.rating)}

              {/* Description */}
              <p className="text-gray-600 line-clamp-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4">
              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-medium text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Action Button */}
              <Link to={`/product/${product.id}`}>
                <button className="bg-gray-900 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 btn-animate group">
                  <span className="flex items-center space-x-2">
                    <span>View Product</span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout (default)
  return (
    <div
      ref={cardRef}
      className={`relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden card-hover ${
        isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'
      }`}
    >
      <AuthPrompt />
      
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded-full z-10 animate-fadeIn">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm border border-white/20 z-10 btn-animate ${
          isInWishlist 
            ? 'bg-black text-white shadow-lg' 
            : 'bg-white/80 text-gray-600 hover:text-black hover:bg-white'
        }`}
        aria-label="Toggle wishlist"
      >
        <svg 
          className="w-5 h-5" 
          fill={isInWishlist ? "currentColor" : "none"} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-2xl bg-gray-100 aspect-square">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </Link>
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <p className="text-sm text-gray-500 font-medium">
          {product.brand}
        </p>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {renderStars(product.rating)}

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-medium text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Action Button */}
        <Link to={`/product/${product.id}`}>
          <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 btn-animate group">
            <span className="flex items-center justify-center space-x-2">
              <span>View Product</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
