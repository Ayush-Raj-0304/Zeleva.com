import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center animate-fade-in-up">
      <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 hover-lift glow-violet animate-scale-in">
        <div className="mb-8 animate-float">
          <h1 className="text-9xl font-bold text-violet-400">
            404
          </h1>
        </div>
        <h2 className="text-3xl font-semibold text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Page Not Found
        </h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-medium rounded-2xl transition-all duration-300 shadow-lg hover:shadow-violet-500/50 transform hover:scale-110 active:scale-95 tap-effect glow-violet animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 