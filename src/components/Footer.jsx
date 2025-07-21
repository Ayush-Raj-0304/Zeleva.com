import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-xl border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2 animate-fade-in-up">
            <Link to="/" className="text-2xl font-bold text-violet-400 hover:text-violet-300 transition-colors duration-300 animate-float">
              Zeleva
            </Link>
            <p className="mt-4 text-white/70 max-w-md">
              Discover premium quality products carefully curated for modern living. Experience the future of e-commerce with our innovative platform.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* Social Links */}
              <Link to="/404" className="text-white/60 hover:text-violet-400 transition-all duration-300 hover:scale-110 glow-violet">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>
              <Link to="/404" className="text-white/60 hover:text-violet-400 transition-all duration-300 hover:scale-110 glow-violet">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </Link>
              <Link to="/404" className="text-white/60 hover:text-violet-400 transition-all duration-300 hover:scale-110 glow-violet">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </Link>
              <Link to="/404" className="text-white/60 hover:text-violet-400 transition-all duration-300 hover:scale-110 glow-violet">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.224 0C5.477 0 .071 5.406.071 12.154c0 5.358 3.44 9.912 8.226 11.534.602-.11 1.026-.485 1.026-1.037 0-.513-.019-2.21-.028-4.003-3.34.726-4.043-1.421-4.043-1.421-.547-1.39-1.336-1.76-1.336-1.76-1.091-.747.083-.732.083-.732 1.207.085 1.841 1.24 1.841 1.24 1.073 1.838 2.816 1.307 3.503.999.108-.775.419-1.306.763-1.605-2.67-.303-5.467-1.334-5.467-5.932 0-1.31.468-2.382 1.237-3.221-.125-.303-.536-1.523.116-3.176 0 0 1.008-.322 3.302 1.23A11.513 11.513 0 0 1 12.224 6.135c1.02.005 2.047.138 3.005.404 2.291-1.552 3.298-1.23 3.298-1.23.653 1.653.242 2.873.118 3.176.771.839 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.476 5.921.43.372.814 1.102.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.825 1.026C20.565 22.092 24 17.592 24 12.297 24 5.406 18.627.071 12.224.071z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/404" className="text-white/70 hover:text-violet-400 transition-colors duration-300 hover:translate-x-2 transform">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/404" className="text-white/70 hover:text-violet-400 transition-colors duration-300 hover:translate-x-2 transform">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/404" className="text-white/70 hover:text-violet-400 transition-colors duration-300 hover:translate-x-2 transform">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/404" className="text-white/70 hover:text-violet-400 transition-colors duration-300 hover:translate-x-2 transform">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/404" className="text-white/70 hover:text-violet-400 transition-colors duration-300 hover:translate-x-2 transform">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/404" className="text-white/70 hover:text-violet-400 transition-colors duration-300 hover:translate-x-2 transform">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/404" className="text-white/70 hover:text-violet-400 transition-colors duration-300 hover:translate-x-2 transform">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link to="/404" className="text-white/70 hover:text-violet-400 transition-colors duration-300 hover:translate-x-2 transform">
                  Sports
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-white/60 text-sm">
              © 2025 Zeleva. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/404" className="text-white/60 hover:text-violet-400 text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/404" className="text-white/60 hover:text-violet-400 text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/404" className="text-white/60 hover:text-violet-400 text-sm transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-white/60 text-sm">Powered by</span>
            <span className="text-violet-400 font-semibold animate-pulse-gentle">React</span>
            <span className="text-white/60">+</span>
            <span className="text-violet-400 font-semibold animate-pulse-gentle">Redux</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 