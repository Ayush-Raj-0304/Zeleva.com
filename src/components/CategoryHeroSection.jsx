import { useEffect, useState } from 'react';

const CategoryHeroSection = ({ category }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [category]);

  const handleShopCategory = () => {
    // Scroll to products section
    const productsSection = document.querySelector('[data-products-section]');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryInfo = (category) => {
    const categoryData = {
      'Electronics': {
        title: 'Electronics & Tech',
        subtitle: 'Cutting-edge technology for modern living',
        description: 'Discover the latest gadgets, smart devices, and electronics that enhance your daily life.',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        gradient: 'from-blue-900 via-purple-900 to-black'
      },
      'Fashion': {
        title: 'Fashion & Style',
        subtitle: 'Express your unique style',
        description: 'Trendy clothing and accessories that make you stand out from the crowd.',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        gradient: 'from-pink-900 via-rose-900 to-black'
      },
      'Furniture': {
        title: 'Furniture & Decor',
        subtitle: 'Create your perfect space',
        description: 'Premium furniture and home decor to transform your living spaces.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80',
        gradient: 'from-amber-900 via-orange-900 to-black'
      },
      'Home': {
        title: 'Home Essentials',
        subtitle: 'Everything for your home',
        description: 'Quality home products that make everyday living more comfortable and efficient.',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        gradient: 'from-green-900 via-emerald-900 to-black'
      },
      'Kitchen': {
        title: 'Kitchen & Dining',
        subtitle: 'Culinary excellence awaits',
        description: 'Professional-grade kitchen equipment and dining essentials for every chef.',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        gradient: 'from-red-900 via-orange-900 to-black'
      },
      'Fitness': {
        title: 'Fitness & Wellness',
        subtitle: 'Achieve your fitness goals',
        description: 'Premium fitness equipment and wellness products for a healthier lifestyle.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        gradient: 'from-teal-900 via-cyan-900 to-black'
      }
    };
    return categoryData[category] || categoryData['Electronics'];
  };

  const categoryInfo = getCategoryInfo(category);

  return (
    <section className={`relative h-[60vh] min-h-[400px] bg-gradient-to-br ${categoryInfo.gradient} text-white overflow-hidden`}>
      {/* Background Image with Overlay */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
        }`}
        style={{
          backgroundImage: `url(${categoryInfo.image})`,
          filter: 'brightness(0.3) blur(0.5px)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative h-full w-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className={`max-w-3xl ${isVisible ? 'hero-enter' : 'opacity-0'}`}>
          <div className="mb-4 animate-slideInTop stagger-1">
            <span className="inline-block px-4 py-2 bg-white/10 text-white text-sm font-normal rounded-full uppercase tracking-wide backdrop-blur-md">
              {category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight font-display animate-slideInLeft stagger-2">
            {categoryInfo.title}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-6 font-medium animate-slideInLeft stagger-3">
            {categoryInfo.subtitle}
          </p>

          <p className="text-lg text-white/80 mb-8 max-w-2xl leading-relaxed animate-slideInLeft stagger-4">
            {categoryInfo.description}
          </p>

          <div className="flex justify-start animate-slideInLeft stagger-5">
            <button 
              onClick={handleShopCategory}
              className="px-8 py-4 bg-white text-gray-900 text-lg font-medium rounded-full hover:bg-gray-100 shadow-md hover:shadow-lg transition duration-300 btn-animate"
            >
              Shop {category}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full backdrop-blur-md opacity-60 animate-slideInRight stagger-6" />
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-white/10 rounded-full backdrop-blur-md opacity-40 animate-slideInRight stagger-6" style={{ animationDelay: '0.8s' }} />
      
      {/* Stats Overlay */}
      <div className={`absolute bottom-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-sm animate-slideInRight stagger-6 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-all duration-1000 delay-500`}>
        <h3 className="text-lg font-semibold mb-2">Category Highlights</h3>
        <div className="space-y-2 text-sm text-white/80">
          <div className="flex justify-between">
            <span>Premium Quality</span>
            <span className="text-green-400">✓</span>
          </div>
          <div className="flex justify-between">
            <span>Fast Delivery</span>
            <span className="text-green-400">✓</span>
          </div>
          <div className="flex justify-between">
            <span>Best Prices</span>
            <span className="text-green-400">✓</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHeroSection; 