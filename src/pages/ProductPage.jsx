import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, addToCartFirebase } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsInWishlist } from '../redux/wishlistSlice';
import productsData from '../data/products';
import { useState } from 'react';
import { selectIsAuthenticated } from '../redux/authSlice';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';

const TABS = ['Details', 'Reviews', 'Discussion'];

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = productsData.find(p => p.id === id);
  const isInWishlist = useSelector(selectIsInWishlist(id));
  const cartItems = useSelector(state => state.cart.items);
  const existingItem = cartItems.find(item => item.id === product?.id);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [selectedTab, setSelectedTab] = useState('Reviews');
  const [selectedSize, setSelectedSize] = useState(existingItem?.size || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');

  const quantityInCart = cartItems.find(
    item => item.id === product?.id && item.size === selectedSize
  )?.quantity || 0;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-medium text-gray-900 mb-4 font-display">Product Not Found</h1>
          <Link to="/" className="text-gray-700 underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const gallery = [product.image, ...(product.gallery || [])];
  const colors = product.colors || ['#F3F4F6'];
  const sizes = product.sizes || [];

  const reviews = product.reviews || [
    { user: 'Helen M.', rating: 5, text: 'Excellent shoes.', date: 'Yesterday' },
    { user: 'Ann D.', rating: 4, text: 'Very comfortable.', date: '2 days ago' },
  ];
  const reviewStats = [28, 9, 4, 1, 1];
  const avgRating = 4.8;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (!selectedSize) return;
    dispatch(addToCartFirebase({ ...product, size: selectedSize, quantity: 1 }));
  };

  const handleRemoveFromCart = () => {
    if (!selectedSize) return;
    dispatch(removeFromCart({ id: product.id, size: selectedSize }));
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="page-enter min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-sm flex flex-col lg:flex-row gap-12 p-8">
          
          {/* LEFT SECTION */}
          <div className="flex-1 flex flex-col gap-8 min-w-0 animate-slideInLeft stagger-2">
            {/* Gallery */}
            <div className="flex flex-col items-center">
              <img src={selectedImage} alt={product.name} className="w-full max-w-md h-96 object-contain rounded-2xl mb-6" />
              <div className="flex gap-3">
                {gallery.map((img, idx) => (
                  <button
                    key={img + idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl border ${selectedImage === img ? 'border-gray-900' : 'border-gray-200'} overflow-hidden`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs Content */}
            {selectedTab === 'Reviews' && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                        {review.user[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{review.user}</span>
                          <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                          <span className="text-gray-400 text-xs">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mt-1">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedTab === 'Discussion' && (
              <div className="mt-8 text-gray-500 italic">No discussions yet.</div>
            )}
            {selectedTab === 'Details' && (
              <div className="mt-8 text-gray-700 leading-relaxed">
                <p>{product.description}</p>
              </div>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex-1 flex flex-col gap-8 min-w-0 animate-slideInRight stagger-3">
            {/* Product Info */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 text-sm">{product.brand || 'Brand'}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-yellow-400 text-sm">★★★★★</span>
                <span className="text-gray-500 text-sm">42 reviews</span>
              </div>
              <h1 className="text-4xl font-medium text-gray-900 mb-2 font-display">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-medium text-gray-900">₹{product.price}</div>
                {product.originalPrice && (
                  <>
                    <div className="text-xl text-gray-500 line-through">₹{product.originalPrice}</div>
                    <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                    </div>
                  </>
                )}
              </div>

              {/* Color Selector */}
              <div className="mb-4">
                <div className="text-sm text-gray-700 mb-1">Color</div>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-gray-900' : 'border-gray-200'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="text-sm text-gray-700 mb-1">Size</div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${selectedSize === size ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart Controls */}
              <div className="flex gap-3 mb-6">
                {quantityInCart > 0 ? (
                  <div className="inline-flex items-center justify-between gap-3 px-4 py-2 rounded-full bg-gray-900 text-white shadow-sm transition-all duration-300">
                    <button onClick={handleRemoveFromCart} className="text-lg font-bold px-2 hover:text-red-400">−</button>
                    <span className="text-base font-semibold px-1 min-w-[24px] text-center">{quantityInCart}</span>
                    <button onClick={handleAddToCart} disabled={product.stock === quantityInCart} className={`text-lg font-bold px-2 ${product.stock === quantityInCart ? 'text-gray-400 cursor-not-allowed' : 'hover:text-green-400'}`}>+</button>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className={`flex-1 py-4 px-6 rounded-full font-medium transition-all duration-300 transform shadow-sm hover:shadow-md ${selectedSize ? 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    Add to cart
                  </button>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`w-14 h-14 flex items-center justify-center rounded-full border-2 transition-all duration-300 text-2xl ${isInWishlist ? 'bg-red-500 border-red-500 text-white' : 'bg-white border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-500'}`}
                  aria-label="Like"
                >
                  <svg className="w-7 h-7" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Shipping Info */}
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m4 0a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2h.28" />
                </svg>
                Free delivery on orders over ₹1000
              </div>
            </div>

            {/* Ratings Summary */}
            <div className="bg-white/90 rounded-2xl border border-gray-200/50 shadow-sm p-6 mt-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">{avgRating}</span>
                <div className="flex flex-col gap-1">
                  {[5, 4, 3, 2, 1].map((star, i) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-yellow-400">{'★'.repeat(star)}</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${(reviewStats[i] / 43) * 100}%` }} />
                      </div>
                      <span className="text-gray-500 text-xs">{reviewStats[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-8 border-b border-gray-200/50 mb-2">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`pb-3 text-lg font-medium transition-all duration-200 ${selectedTab === tab ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
        onSwitchToReset={() => {}}
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

export default ProductPage;
