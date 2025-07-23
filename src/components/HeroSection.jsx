import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/productsSlice';

const HeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const featuredProducts = products.filter(product => product.rating >= 4.5);
  const currentProduct = featuredProducts[currentSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
        setIsTransitioning(false);
      }, 250);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
      setIsTransitioning(false);
    }, 250);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(prev => (prev - 1 + featuredProducts.length) % featuredProducts.length);
      setIsTransitioning(false);
    }, 250);
  };

  const goToSlide = index => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 250);
  };

  const handleViewCollection = () => {
    dispatch(setCategory(currentProduct.category));
    // Scroll to products section
    setTimeout(() => {
      const productsSection = document.querySelector('[data-products-section]');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleViewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  if (featuredProducts.length === 0) return null;

  return (
    <section className="relative h-[70vh] min-h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          isTransitioning ? 'scale-110 opacity-70' : 'scale-100 opacity-100'
        }`}
        style={{
          backgroundImage: `url(${currentProduct.image})`,
          filter: 'brightness(0.4) blur(1px)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full w-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className={`max-w-2xl hero-enter ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
          <div className="mb-4 animate-slideInTop stagger-1">
            <span className="inline-block px-4 py-2 bg-white/10 text-white text-sm font-normal rounded-full uppercase tracking-wide backdrop-blur-md">
              {currentProduct.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 leading-tight font-display animate-slideInLeft stagger-2">
            {currentProduct.category === 'Fashion' ? 'Fashion Collection' :
              currentProduct.category === 'Electronics' ? 'Tech Essentials' :
              currentProduct.category === 'Furniture' ? 'Home & Office' :
              'Featured Products'}
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed animate-slideInLeft stagger-3">
            {currentProduct.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slideInLeft stagger-4">
            <button
              onClick={handleViewCollection}
              className="px-8 py-4 bg-white text-neutral-900 text-lg font-medium rounded-full hover:bg-gray-100 shadow-md hover:shadow-lg transition duration-300 btn-animate"
            >
              Shop {currentProduct.category}
            </button>
            <button
              onClick={() => handleViewProduct(currentProduct.id)}
              className="px-8 py-4 border border-white text-white text-lg font-medium rounded-full hover:bg-white hover:text-neutral-900 shadow-md hover:shadow-lg transition duration-300 btn-animate"
            >
              View Product - ₹{currentProduct.price.toLocaleString('en-IN')}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 btn-animate animate-slideInLeft stagger-5"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 btn-animate animate-slideInRight stagger-5"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 animate-slideInBottom stagger-6">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Product Info Overlay */}
      <div className={`absolute bottom-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-sm animate-slideInRight stagger-4 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-500`}>
        <h3 className="text-xl font-semibold mb-2">{currentProduct.name}</h3>
        <p className="text-white/80 text-sm mb-3 line-clamp-2">{currentProduct.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">₹{currentProduct.price.toLocaleString('en-IN')}</span>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm">{currentProduct.rating}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
