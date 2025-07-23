import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-sm border border-gray-200/50">
          <div className="mb-8">
            <h1 className="text-6xl font-medium text-gray-900 mb-4 font-display">
              404
            </h1>
          </div>
          <h2 className="text-3xl font-medium text-gray-900 mb-6 font-display">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 hover:bg-gray-800"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 