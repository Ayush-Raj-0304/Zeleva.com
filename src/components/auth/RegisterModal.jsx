import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, selectAuthLoading, selectAuthError } from '../../redux/authSlice';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      return;
    }

    setValidationErrors({});
    const result = await dispatch(register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName
    }));
    
    if (result.success) {
      setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
      onClose();
    }
    // Error is handled by the auth slice and displayed via authError
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isVisible ? 'modal-backdrop' : 'opacity-0'}`}>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-hide ${
        isVisible ? 'modal-enter' : 'opacity-0 scale-95'
      } transition-all duration-300`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50 animate-slideInTop stagger-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium text-gray-900 font-display">Create Account</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100/50 transition-colors duration-200 btn-animate"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name & Last Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-slideInLeft stagger-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900/30 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="John"
                  required
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1 animate-slideInLeft">{validationErrors.firstName}</p>
                )}
              </div>

              <div className="animate-slideInRight stagger-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900/30 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Doe"
                  required
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1 animate-slideInRight">{validationErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="animate-slideInLeft stagger-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900/30 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="john@example.com"
                required
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1 animate-slideInLeft">{validationErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="animate-slideInLeft stagger-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900/30 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="At least 6 characters"
                required
              />
              {validationErrors.password && (
                <p className="text-red-500 text-sm mt-1 animate-slideInLeft">{validationErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="animate-slideInLeft stagger-5">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900/30 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="Confirm your password"
                required
              />
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 animate-slideInLeft">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Error */}
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl animate-fadeIn">
                <p className="text-red-700 text-sm">{authError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-animate animate-slideInBottom stagger-6"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200/50 text-center animate-slideInBottom stagger-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-gray-900 font-medium hover:underline transition-all duration-200"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal; 