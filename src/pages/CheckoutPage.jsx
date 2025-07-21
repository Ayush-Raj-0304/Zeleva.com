import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartTotal, clearCart } from '../redux/cartSlice';
import Notification from '../components/Notification';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const total = useSelector(selectCartTotal);
  const [showNotification, setShowNotification] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Show notification first
    setShowNotification(true);
    
    // Clear cart and redirect after notification has been visible for a while
    setTimeout(() => {
      dispatch(clearCart());
      setTimeout(() => {
        navigate('/');
      }, 1000); // Additional delay after cart clear
    }, 4000); // Wait 4 seconds before clearing cart
  };

  if (cartItems.length === 0 && !showNotification) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen">
      {showNotification && (
        <Notification
          message="🎉 Order placed successfully! Payment integration with Razorpay coming soon. Redirecting you to home page..."
          type="success"
          duration={7000}
          onClose={() => setShowNotification(false)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 animate-fade-in-up">Checkout</h1>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* Order Summary */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8 lg:mb-0 hover:bg-white/15 transition-all duration-500 animate-slide-in-left">
            <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex items-center space-x-4 animate-fade-in-up hover:bg-white/5 p-3 rounded-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-xl group">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium hover:text-violet-300 transition-colors duration-300">{item.name}</h3>
                    <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-violet-400 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 pt-4 space-y-2">
              <div className="flex justify-between text-white/70 hover:text-white transition-colors duration-300">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70 hover:text-white transition-colors duration-300">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-white font-semibold text-lg border-t border-white/20 pt-2 animate-pulse-gentle">
                <span>Total</span>
                <span className="text-violet-400">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 animate-slide-in-right">
            <h2 className="text-xl font-semibold text-white mb-6">Shipping Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white/10 transition-all duration-300 hover:bg-white/10 disabled:opacity-50"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white/10 transition-all duration-300 hover:bg-white/10 disabled:opacity-50"
                  placeholder="Enter your email"
                />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="address" className="block text-sm font-medium text-white/80 mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white/10 transition-all duration-300 hover:bg-white/10 disabled:opacity-50"
                  placeholder="Enter your address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <label htmlFor="city" className="block text-sm font-medium text-white/80 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    disabled={isProcessing}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white/10 transition-all duration-300 hover:bg-white/10 disabled:opacity-50"
                    placeholder="City"
                  />
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-white/80 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleChange}
                    disabled={isProcessing}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white/10 transition-all duration-300 hover:bg-white/10 disabled:opacity-50"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white/10 transition-all duration-300 hover:bg-white/10 disabled:opacity-50"
                  placeholder="Enter your phone number"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full font-medium py-4 px-4 rounded-2xl transition-all duration-300 shadow-lg transform animate-fade-in-up ${
                  isProcessing 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white hover:shadow-violet-500/50 hover:scale-105 active:scale-95'
                }`}
                style={{ animationDelay: '0.7s' }}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Order...
                  </div>
                ) : (
                  `Place Order - $${total.toFixed(2)}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 