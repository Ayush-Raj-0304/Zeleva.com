import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemsCount } from '../redux/cartSlice';
import { selectWishlistCount } from '../redux/wishlistSlice';
import { setSearch, setCategory } from '../redux/productsSlice';
import { selectUser, selectIsAuthenticated, logout } from '../redux/authSlice';
import { useState, useEffect } from 'react';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import PasswordResetModal from './auth/PasswordResetModal';

const Navbar = () => {
  const cartItemsCount = useSelector(selectCartItemsCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const searchTerm = useSelector(state => state.products.search);
  const selectedCategory = useSelector(state => state.products.category);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const categories = [
    'Electronics',
    'Furniture', 
    'Fashion',
    'Home',
    'Kitchen',
    'Fitness'
  ];

  const isActiveRoute = (path) => location.pathname === path;

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    navigate('/');
  };

  const clearSearch = () => {
    dispatch(setSearch(''));
    setIsSearchExpanded(false);
  };

  const handleLogoClick = () => {
    dispatch(setCategory(''));
    dispatch(setSearch(''));
    setIsSearchExpanded(false);
  };

  const handleAllClick = () => {
    dispatch(setCategory(''));
    dispatch(setSearch(''));
    setIsSearchExpanded(false);
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate('/');
  };

  const handleAuthModal = (modalType) => {
    setShowLoginModal(modalType === 'login');
    setShowRegisterModal(modalType === 'register');
    setShowResetModal(modalType === 'reset');
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  return (
    <>
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className="text-3xl font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 tracking-tight flex-shrink-0 font-display"
          >
            Zeleva
          </Link>

          {/* Center Section - Categories and Search */}
          <div className="flex-1 flex items-center justify-center max-w-4xl mx-8">
            {!isSearchExpanded ? (
              /* Categories Navigation */
              <nav className="hidden lg:flex items-center justify-center space-x-8">
                <button
                  onClick={handleAllClick}
                  className={`px-3 py-2 text-md font-medium transition-all duration-300 border-b-2 border-transparent hover:border-black hover:text-black ${
                    !selectedCategory ? 'text-black font-semibold border-black' : 'text-gray-500'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-3 py-2 text-md font-medium transition-all duration-300 border-b-2 border-transparent hover:border-black hover:text-black ${
                      selectedCategory === category ? 'text-black font-semibold border-black' : 'text-gray-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>

            ) : (
              /* Expanded Search */
              <div className="w-full max-w-2xl">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg 
                      className="h-5 w-5 text-gray-400"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  
                  <input
                    type="text"
                    placeholder={selectedCategory ? `Search in ${selectedCategory}...` : "Search for products..."}
                    value={searchTerm}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    className="block w-full pl-12 pr-12 py-3 bg-gray-100/50 backdrop-blur-lg border border-gray-200/50 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900/30 transition-all duration-300 hover:bg-gray-100/70 focus:bg-white/80"
                    autoFocus
                  />
                  
                  <button
                    onClick={() => setIsSearchExpanded(false)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Search Icon - only show when not expanded */}
            {!isSearchExpanded && (
              <button 
                onClick={() => setIsSearchExpanded(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}

            {/* Favorites */}
            <Link 
              to="/wishlist"
              className={`relative p-2 rounded-lg transition-all duration-300 group ${
                isActiveRoute('/wishlist') 
                  ? 'text-red-500 bg-gray-100/70' 
                  : 'text-gray-600 hover:text-red-500 hover:bg-gray-100/50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link 
              to="/cart" 
              className={`relative p-2 mt-1 rounded-lg transition-all duration-300 group ${
                isActiveRoute('/cart') 
                  ? 'text-gray-900 bg-gray-100/70' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6l-1-7z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-lg transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.displayName || user?.firstName || 'Account'}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.displayName || `${user?.firstName} ${user?.lastName}`}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/profile');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/orders');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Orders
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAuthModal('login')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleAuthModal('register')}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-lg transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Categories */}
      <div className="lg:hidden border-t border-gray-200/50 bg-white/90 backdrop-blur-xl">
        <div className="w-full px-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAllClick}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                !selectedCategory ? 'text-gray-900 bg-gray-100/70' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category ? 'text-gray-900 bg-gray-100/70' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>

    {/* Authentication Modals */}
    <LoginModal
      isOpen={showLoginModal}
      onClose={() => setShowLoginModal(false)}
      onSwitchToRegister={() => handleAuthModal('register')}
      onSwitchToReset={() => handleAuthModal('reset')}
    />

    <RegisterModal
      isOpen={showRegisterModal}
      onClose={() => setShowRegisterModal(false)}
      onSwitchToLogin={() => handleAuthModal('login')}
    />

    <PasswordResetModal
      isOpen={showResetModal}
      onClose={() => setShowResetModal(false)}
      onSwitchToLogin={() => handleAuthModal('login')}
    />
  </>
  );
};

export default Navbar; 