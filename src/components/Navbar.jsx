import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../redux/cartSlice';

const Navbar = () => {
  const cartItemsCount = useSelector(selectCartItemsCount);

  return (
    <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg animate-slide-in-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-violet-400 hover:text-violet-300 transition-all duration-300 hover:scale-110 tap-effect"
          >
            Zeleva
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link 
              to="/" 
              className="text-white/80 hover:text-violet-300 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm hover:scale-105 tap-effect glow-violet"
            >
              Home
            </Link>
            
            <Link 
              to="/cart" 
              className="relative text-white/80 hover:text-violet-300 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm hover:scale-105 tap-effect glow-violet"
            >
              Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-scale-in animate-pulse-gentle">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 