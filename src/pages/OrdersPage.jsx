import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, selectOrdersLoading, selectOrdersError, fetchOrdersFromFirebase } from '../redux/ordersSlice';
import { selectIsAuthenticated } from '../redux/authSlice';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrdersFromFirebase());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-gray-200/50">
          <h1 className="text-3xl font-medium text-gray-900 mb-4 font-display">Please sign in</h1>
          <p className="text-gray-600">You need to be signed in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-gray-200/50">
          <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-gray-200/50">
          <h1 className="text-3xl font-medium text-gray-900 mb-4 font-display">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-xl p-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6l-1-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-medium text-gray-900 mb-2 font-display">No orders yet</h1>
            <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet.</p>
            <Link to="/" className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 mt-2">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-medium text-gray-900 mb-8 font-display">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Order #{order.id.slice(-8)}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  {order.paymentId && (
                    <p className="text-xs text-gray-400">Payment ID: {order.paymentId}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">₹{order.total?.toFixed(2)}</p>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </span>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === 'completed' ? 'bg-green-100 text-green-700' :
                      order.paymentStatus === 'failed' ? 'bg-red-100 text-red-700' :
                      order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.paymentStatus === 'completed' ? 'Paid' :
                       order.paymentStatus === 'failed' ? 'Payment Failed' :
                       order.paymentStatus === 'pending' ? 'Payment Pending' :
                       'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
              
              {order.items && (
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 bg-gray-50/50 rounded-xl p-3">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                        </p>
                      </div>
                                             <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}

              {order.shippingAddress && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Shipping to:</span> {order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage; 