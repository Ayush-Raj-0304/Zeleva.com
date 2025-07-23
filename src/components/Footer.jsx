import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="text-3xl font-medium text-gray-900 hover:text-gray-700 transition-colors duration-300 font-display">
              Zeleva
            </Link>
            <p className="mt-4 text-gray-600 max-w-md leading-relaxed">
              Discover premium quality products carefully curated for modern living. Experience the future of e-commerce with our innovative platform.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.219 0 .418.162.418.418 0 .259-.166.659-.251.967-.219.937.219 1.697 1.142 1.697 1.367 0 2.283-1.697 2.283-3.439 0-1.382-.979-2.44-2.618-2.44-1.841 0-3.001 1.382-3.001 2.919 0 .537.199 .937.498 1.262.055.065.065.123.048.19-.055.219-.18.719-.205.823-.033.129-.111.158-.255.096-.897-.419-1.367-1.697-1.367-3.094 0-2.303 1.841-5.062 5.062-5.062 2.618 0 4.898 1.841 4.898 4.459 0 3.061-1.697 5.32-4.186 5.32-.838 0-1.627-.458-1.897-1.001l-.498 1.967c-.18.719-.659 1.578-1.001 2.135.774.239 1.627.359 2.501.359 6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.638.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Careers</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Press</Link></li>
              <li><Link to="/news" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">News</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200/50">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Zeleva. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 