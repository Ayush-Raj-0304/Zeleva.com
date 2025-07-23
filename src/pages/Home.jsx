import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredProducts, selectSearchTerm, selectSelectedCategory } from '../redux/productsSlice';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import CategoryHeroSection from '../components/CategoryHeroSection';
import ViewToggle from '../components/ViewToggle';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';

const Home = () => {
  const products = useSelector(selectFilteredProducts);
  const searchTerm = useSelector(selectSearchTerm);
  const selectedCategory = useSelector(selectSelectedCategory);
  const currentView = useSelector(state => state.products.view);
  const [showCategoryHero, setShowCategoryHero] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setShowCategoryHero(selectedCategory && !searchTerm);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    // Trigger page entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAuthRequired = (action) => {
    if (action === 'wishlist') {
      setShowLoginModal(true);
    }
  };

  const getGridCols = () => {
    if (currentView === 'list') return 'grid-cols-1';
    if (products.length === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (products.length === 2) return 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto';
    if (products.length === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isVisible ? 'page-enter' : 'opacity-0'}`}>
      {/* Dynamic Hero Section */}
      {!searchTerm && !selectedCategory && <HeroSection />}
      
      {/* Category Hero Section */}
      {showCategoryHero && <CategoryHeroSection category={selectedCategory} />}

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8" data-products-section>
        {/* Search/Category Header */}
        <div className="mb-8 animate-slideInTop stagger-1">
          {searchTerm ? (
            <div>
              <h2 className="text-3xl font-medium text-gray-900 mb-2 font-display">
                Search Results
              </h2>
              <p className="text-gray-600">
                {products.length} {products.length === 1 ? 'result' : 'results'} for "{searchTerm}"
                {selectedCategory ? ` in ${selectedCategory}` : ''}
              </p>
            </div>
          ) : selectedCategory ? (
            <div>
              <h2 className="text-3xl font-medium text-gray-900 mb-2 font-display">
                {selectedCategory}
              </h2>
              <p className="text-gray-600">
                {products.length} {products.length === 1 ? 'product' : 'products'} available in {selectedCategory}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-medium text-gray-900 mb-2 font-display">
                All Products
              </h2>
              <p className="text-gray-600">
                {products.length} {products.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
          )}
        </div>

        {/* View Toggle */}
        {products.length > 0 && (
          <div className="flex justify-end mb-6 animate-slideInRight stagger-2">
            <ViewToggle />
          </div>
        )}

        {/* Products Grid/List */}
        {products.length > 0 ? (
          <div className={`grid gap-6 ${getGridCols()} animate-fadeIn stagger-3`}>
            {products.map((product, index) => (
              <div 
                key={product.id}
                className={`product-enter`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <ProductCard 
                  product={product}
                  view={currentView}
                  onAuthRequired={handleAuthRequired}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fadeInUp stagger-4">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center animate-scaleIn">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-medium text-gray-900 mb-2 font-display">
              No products found
            </h3>
            
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `We couldn't find any products matching "${searchTerm}"${selectedCategory ? ` in ${selectedCategory}` : ''}.`
                : `No products available${selectedCategory ? ` in ${selectedCategory}` : ''}.`
              }
            </p>
            
            <p className="text-gray-500 text-sm">
              Try adjusting your search or browse different categories.
            </p>
          </div>
        )}
      </div>

      {/* Authentication Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

export default Home; 