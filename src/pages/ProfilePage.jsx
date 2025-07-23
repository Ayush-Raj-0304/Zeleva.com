import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated } from '../redux/authSlice';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger page entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center py-12 ${isVisible ? 'page-enter' : 'opacity-0'}`}>
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-sm border border-gray-200/50 text-center animate-scaleIn">
            <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center animate-fadeIn stagger-1">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-medium text-gray-900 mb-4 font-display animate-slideInBottom stagger-2">
              Please sign in
            </h1>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed animate-slideInBottom stagger-3">
              You need to be signed in to view your profile.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-200 btn-animate animate-slideInBottom stagger-4"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${isVisible ? 'page-enter' : 'opacity-0'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slideInTop stagger-1">
            <h1 className="text-3xl font-medium text-gray-900 mb-2 font-display">
              My Profile
            </h1>
            <p className="text-gray-600">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1 animate-slideInLeft stagger-2">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-200/50 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center animate-scaleIn stagger-1">
                  <span className="text-2xl font-bold text-white">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-2 animate-fadeIn stagger-2">
                  {user?.displayName || 'User'}
                </h2>
                <p className="text-gray-600 text-sm animate-fadeIn stagger-3">
                  {user?.email}
                </p>
                <div className="mt-6 animate-fadeIn stagger-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Active Member
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="lg:col-span-2 animate-slideInRight stagger-3">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-200/50 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-6 font-display animate-slideInTop stagger-1">
                    Account Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="animate-slideInLeft stagger-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                        <p className="text-gray-900">
                          {user?.displayName?.split(' ')[0] || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="animate-slideInRight stagger-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                        <p className="text-gray-900">
                          {user?.displayName?.split(' ').slice(1).join(' ') || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="animate-slideInLeft stagger-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                        <p className="text-gray-900">{user?.email}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="animate-slideInRight stagger-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                        <p className="text-gray-900">{user?.phoneNumber || 'Not provided'}</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2 animate-slideInBottom stagger-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                        <p className="text-gray-900">
                          {user?.address || 'No address provided'}
                        </p>
                      </div>
                    </div>

                    {/* Member Since */}
                    <div className="md:col-span-2 animate-slideInBottom stagger-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Member Since
                      </label>
                      <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                        <p className="text-gray-900">
                          {user?.metadata?.creationTime ? 
                            new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 
                            'Recently joined'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-8 py-6 bg-gray-50/30 border-t border-gray-200/50 animate-slideInBottom stagger-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 btn-animate">
                      Edit Profile
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200 btn-animate">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeInUp stagger-4">
            <Link
              to="/orders"
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 group card-hover"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">My Orders</h3>
                  <p className="text-sm text-gray-600">Track your orders</p>
                </div>
              </div>
            </Link>

            <Link
              to="/wishlist"
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 group card-hover"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Wishlist</h3>
                  <p className="text-sm text-gray-600">Saved items</p>
                </div>
              </div>
            </Link>

            <Link
              to="/cart"
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 group card-hover"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H3m4 8a2 2 0 104 0m5-2a2 2 0 104 0" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Shopping Cart</h3>
                  <p className="text-sm text-gray-600">View cart items</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 