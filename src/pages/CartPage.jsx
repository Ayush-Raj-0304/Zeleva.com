import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal, updateQuantityFirebase, removeItemCompletelyFirebase } from '../redux/cartSlice';
import { selectIsAuthenticated } from '../redux/authSlice';
import { setCategory, setSearch } from '../redux/productsSlice';
import { useState, useEffect } from 'react';

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger page entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeItemCompletelyFirebase({ id, size }));
    } else {
      dispatch(updateQuantityFirebase({ id, size, quantity: newQuantity }));
    }
  };

  const handleRemove = (id, size) => {
    dispatch(removeItemCompletelyFirebase({ id, size }));
  };

  const handleContinueShopping = () => {
    dispatch(setCategory(''));
    dispatch(setSearch(''));
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center py-12 ${isVisible ? 'page-enter' : 'opacity-0'}`}>
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-sm border border-gray-200/50 text-center animate-scaleIn">
            <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center animate-fadeIn stagger-1">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
            </div>
            <h1 className="text-4xl font-medium text-gray-900 mb-4 font-display animate-slideInBottom stagger-2">
              Please sign in
            </h1>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed animate-slideInBottom stagger-3">
              You need to be signed in to view your cart.
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

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center py-12 ${isVisible ? 'page-enter' : 'opacity-0'}`}>
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-sm border border-gray-200/50 text-center animate-scaleIn">
            <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center animate-fadeIn stagger-1">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
            </div>
            <h1 className="text-4xl font-medium text-gray-900 mb-4 font-display animate-slideInBottom stagger-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed animate-slideInBottom stagger-3">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={handleContinueShopping}
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-200 btn-animate animate-slideInBottom stagger-4"
            >
              Start Shopping
            </button>
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
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8 animate-slideInLeft stagger-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-200/50 overflow-hidden">
              <div className="divide-y divide-gray-200/50">
                {cartItems.map((item, index) => (
                  <div 
                    key={`${item.id}-${item.size}`} 
                    className="p-6 hover:bg-gray-50/50 transition-colors duration-300 animate-slideInLeft"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-xl overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                        <p className="text-lg font-medium text-gray-900 mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200 btn-animate"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="text-lg font-medium text-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200 btn-animate"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id, item.size)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors duration-200 btn-animate"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0 animate-slideInRight stagger-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-200/50 sticky top-24">
              <h2 className="text-xl font-medium text-gray-900 mb-6 font-display">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200/50 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-medium text-center block hover:bg-gray-800 transition-colors duration-200 mb-4 btn-animate"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={handleContinueShopping}
                className="w-full border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200 btn-animate"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 