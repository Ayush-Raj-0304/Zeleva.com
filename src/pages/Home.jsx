import { useSelector } from 'react-redux';
import { selectFilteredProducts } from '../redux/productsSlice';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const products = useSelector(selectFilteredProducts);
  const view = useSelector(state => state.products.view);
  const searchTerm = useSelector(state => state.products.search);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-scale-in">
            Welcome to{' '}
            <span className="text-violet-400 animate-float">
              Zeleva
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover premium quality products carefully curated for modern living
          </p>
        </div>

        {/* Search and View Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
          <div className="w-full md:w-auto md:flex-1 md:max-w-lg">
            <SearchBar />
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            <ViewToggle />
          </div>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-white/60">
              Showing results for:{' '}
              <span className="text-violet-400 font-semibold bg-white/5 px-2 py-1 rounded-lg backdrop-blur-sm animate-pulse-gentle shimmer">
                "{searchTerm}"
              </span>
            </p>
          </div>
        )}

        {/* Products Grid/List */}
        <div className="mb-8">
          {products.length > 0 ? (
            <div 
              className={
                view === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-6'
              }
            >
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${0.6 + (index * 0.1)}s` }}
                >
                  <ProductCard product={product} view={view} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover-lift glow-violet">
                <div className="text-white/60 text-lg mb-2 animate-fade-in-up">No products found</div>
                <p className="text-white/40 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  Try adjusting your search or browse our full collection
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 