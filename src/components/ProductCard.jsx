import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';

const ProductCard = ({ product, view }) => {
  const dispatch = useDispatch();
  const { id, name, price, description, image, rating, stock } = product;
  
  const cartItems = useSelector(state => state.cart.items);
  const quantityInCart = cartItems.find(item => item.id === id)?.quantity || 0;

  const handleAdd = () => dispatch(addToCart({ ...product, quantity: 1 }));
  const handleRemove = () => dispatch(removeFromCart({ id }));

  const renderStars = (rating) => (
    [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 transition-all duration-300 hover:scale-110 ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-white/30'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  );

  // ✅ Unibody Cart Button – Grid View
  const renderCartButtons = () => (
    <div className="inline-flex items-center justify-between gap-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 shadow-md backdrop-blur-md border border-white/20 text-white animate-fade-in-up">
      <button
        onClick={handleRemove}
        className="text-lg font-bold px-2 hover:text-red-300 transition-colors duration-200"
      >
        −
      </button>
      <span className="text-base font-semibold px-1 min-w-[24px] text-center">
        {quantityInCart}
      </span>
      <button
        onClick={handleAdd}
        disabled={stock === quantityInCart}
        className={`text-lg font-bold px-2 transition-colors duration-200 ${
          stock === quantityInCart
            ? 'text-white/40 cursor-not-allowed'
            : 'hover:text-green-300'
        }`}
      >
        +
      </button>
    </div>
  );

  // ✅ Unibody Cart Button – List View
  const renderListCartButtons = () => (
    <div className="inline-flex items-center justify-between gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 shadow-md backdrop-blur-md border border-white/20 text-white animate-fade-in-up">
      <button
        onClick={handleRemove}
        className="text-xl font-bold px-2 hover:text-red-300 transition-colors duration-200"
      >
        −
      </button>
      <span className="text-lg font-semibold px-1 min-w-[32px] text-center">
        {quantityInCart}
      </span>
      <button
        onClick={handleAdd}
        disabled={stock === quantityInCart}
        className={`text-xl font-bold px-2 transition-colors duration-200 ${
          stock === quantityInCart
            ? 'text-white/40 cursor-not-allowed'
            : 'hover:text-green-300'
        }`}
      >
        +
      </button>
    </div>
  );

  const renderAddButton = () => (
    <button
      onClick={handleAdd}
      disabled={stock === 0}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
        stock === 0
          ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/20'
          : 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white shadow-lg hover:shadow-violet-500/25 transform hover:scale-105 active:scale-98'
      }`}
    >
      {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
    </button>
  );

  const renderListAddButton = () => (
    <button
      onClick={handleAdd}
      disabled={stock === 0}
      className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
        stock === 0
          ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/20'
          : 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white shadow-lg hover:shadow-violet-500/25 transform hover:scale-105 active:scale-98'
      }`}
    >
      {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
    </button>
  );

  if (view === 'list') {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all duration-500 group animate-fade-in-up hover-lift glow-violet">
        <div className="flex flex-col sm:flex-row relative">
          <div className="w-full sm:w-80 h-48 sm:h-64 flex-shrink-0 overflow-hidden relative">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between relative">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3 animate-scale-in">
                <div className="flex">{renderStars(rating)}</div>
                <span className="text-white/60 text-sm">({rating})</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-violet-300 transition-colors duration-300 animate-fade-in-up">
                {name}
              </h3>
              <p className="text-white/70 mb-3 sm:mb-4 text-sm sm:text-base animate-fade-in-up line-clamp-2 sm:line-clamp-none" style={{ animationDelay: '0.1s' }}>
                {description}
              </p>
              {stock < 5 && stock > 0 && (
                <div className="text-orange-400 text-xs sm:text-sm mb-3 sm:mb-4 bg-orange-500/10 px-2 sm:px-3 py-1 rounded-lg backdrop-blur-sm border border-orange-500/20 animate-pulse-gentle shimmer">
                  Only {stock} left in stock
                </div>
              )}
              {stock === 0 && (
                <div className="text-red-400 text-xs sm:text-sm mb-3 sm:mb-4 bg-red-500/10 px-2 sm:px-3 py-1 rounded-lg backdrop-blur-sm border border-red-500/20 animate-pulse-gentle">
                  Out of stock
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <span className="text-xl sm:text-2xl font-bold text-violet-400">
                ${price}
              </span>
              {quantityInCart > 0 ? renderListCartButtons() : renderListAddButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all duration-500 group animate-scale-in hover-lift glow-violet">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {stock < 5 && stock > 0 && (
          <div className="absolute top-3 left-3 bg-orange-500/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg border border-orange-400/30 animate-pulse-gentle shimmer">
            Only {stock} left
          </div>
        )}
        {stock === 0 && (
          <div className="absolute top-3 left-3 bg-red-500/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg border border-red-400/30 animate-pulse-gentle">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-5 relative">
        <div className="flex items-center gap-2 mb-3 animate-fade-in-up">
          <div className="flex">{renderStars(rating)}</div>
          <span className="text-white/60 text-sm">({rating})</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {name}
        </h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {description}
        </p>
        <div className="flex items-center justify-between animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
          <span className="text-xl font-bold text-violet-400">${price}</span>
          {quantityInCart > 0 ? renderCartButtons() : renderAddButton()}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
