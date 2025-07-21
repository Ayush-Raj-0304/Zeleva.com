import { useSelector, useDispatch } from 'react-redux';
import { removeItemCompletely, updateQuantity, selectCartTotal } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const total = useSelector(selectCartTotal);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItemCompletely(id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-fade-in-up">
        <div className="text-center animate-scale-in">
          <div className="mb-8 animate-float">
            <div className="bg-white/10 backdrop-blur-lg rounded-full p-8 inline-block border border-white/20 glow-violet">
              <svg className="h-24 w-24 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l4.5-6m0 0h7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Your Cart is Empty
          </h1>
          <p className="text-white/60 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Start shopping to add items to your cart
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-medium rounded-2xl transition-all duration-300 shadow-lg hover:shadow-violet-500/25 transform hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 animate-fade-in-up">Shopping Cart</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart Items */}
          <div className="lg:col-span-7 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in-up hover-lift glow-violet"
                  style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
                >
                  <div className="flex items-center">
                    <div className="relative overflow-hidden rounded-xl group">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover flex-shrink-0 group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-semibold text-white hover:text-violet-300 transition-colors duration-300">{item.name}</h3>
                      <p className="text-violet-400 mt-1 font-medium">${item.price}</p>
                    </div>
                    <div className="ml-6 flex items-center space-x-4">
                      <div className="flex items-center">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">
                          Quantity
                        </label>
                        <select
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          className="bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1} className="bg-gray-800">
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-400 hover:text-red-300 font-medium transition-all duration-300 hover:bg-red-500/10 px-3 py-1 rounded-lg hover:scale-105"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-white/60">
                      ${item.price} × {item.quantity}
                    </span>
                    <span className="text-lg font-semibold text-violet-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 sticky top-20 hover-lift glow-violet">
              <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-white/70 hover:text-white transition-colors duration-300">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70 hover:text-white transition-colors duration-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-white animate-pulse-gentle">
                    <span>Total</span>
                    <span className="text-violet-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  to="/checkout"
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-medium py-4 px-4 rounded-2xl transition-all duration-300 text-center block shadow-lg hover:shadow-violet-500/25 transform hover:scale-105 glow-violet"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/"
                  className="w-full bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white font-medium py-4 px-4 rounded-2xl transition-all duration-300 text-center block border border-white/20 hover:scale-105"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 