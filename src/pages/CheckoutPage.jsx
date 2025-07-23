import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartTotal, clearCart } from '../redux/cartSlice';
import { saveOrderToFirebase } from '../redux/ordersSlice';
import { selectUser, selectIsAuthenticated } from '../redux/authSlice';
import Notification from '../components/Notification';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const total = useSelector(selectCartTotal);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    saveAddress: false,
  });

  // Auto-fill user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
      }));
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s|-|\(|\)/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatINR = (amount) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  const generatePDFReceipt = async (orderData) => {
    try {
      const pdf = new jsPDF();
      const leftX = 20;
      let yPos = 30;
  
      // Title
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Zeleva - Order Receipt', leftX, yPos);
      yPos += 15;
  
      // Order Details
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Order ID: ${orderData.id}`, leftX, yPos);
      yPos += 8;
      pdf.text(`Date: ${new Date(orderData.orderDate).toLocaleDateString()}`, leftX, yPos);
      yPos += 8;
      pdf.text(`Customer: ${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`, leftX, yPos);
      yPos += 8;
      pdf.text(`Email: ${orderData.shippingAddress.email}`, leftX, yPos);
      yPos += 8;
      pdf.text(`Phone: ${orderData.shippingAddress.phone}`, leftX, yPos);
      yPos += 12;
  
      // Shipping Address
      pdf.setFont('helvetica', 'bold');
      pdf.text('Shipping Address:', leftX, yPos);
      yPos += 8;
      pdf.setFont('helvetica', 'normal');
      pdf.text(orderData.shippingAddress.address, leftX, yPos);
      yPos += 8;
      if (orderData.shippingAddress.address2) {
        pdf.text(orderData.shippingAddress.address2, leftX, yPos);
        yPos += 8;
      }
      pdf.text(`${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zipCode}`, leftX, yPos);
      yPos += 8;
      pdf.text(`${orderData.shippingAddress.country}`, leftX, yPos);
      yPos += 12;
  
      // Items Header
      pdf.setFont('helvetica', 'bold');
      pdf.text('Items:', leftX, yPos);
      yPos += 10;
  
      // Items List
      pdf.setFont('helvetica', 'normal');
      orderData.items.forEach((item, index) => {
        const itemName = item.name || item.title || 'Unnamed Product';
        pdf.text(`${index + 1}. ${itemName}`, leftX, yPos);
        pdf.text(`Qty: ${item.quantity}`, leftX + 110, yPos);
        pdf.text(formatINR(item.price * item.quantity), leftX + 150, yPos);
        yPos += 7;
        if (item.size) {
          pdf.setFontSize(10);
          pdf.text(`Size: ${item.size}`, leftX + 10, yPos);
          yPos += 5;
          pdf.setFontSize(12);
        }
      });
  
      yPos += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Total: ${formatINR(orderData.total)}`, leftX, yPos);
  
      return pdf;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return null;
    }
  };
  

  const sendEmailReceipt = async (orderData, pdfBlob) => {
    try {
      console.log('📧 Email Receipt Details:');
      console.log('- Recipient:', orderData.shippingAddress.email);
      console.log('- Customer:', `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`);
      console.log('- Order ID:', orderData.id);
      console.log('- Total:', `₹${orderData.total.toFixed(2)}`);
      console.log('- Date:', new Date(orderData.orderDate).toLocaleDateString());
      
      // Check if EmailJS is configured
      const emailJSServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const emailJSTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const emailJSUserId = import.meta.env.VITE_EMAILJS_USER_ID;
      
      if (emailJSServiceId && emailJSTemplateId && emailJSUserId) {
        console.log('📧 Sending email via EmailJS...');
        
        const templateParams = {
          to_email: orderData.shippingAddress.email,
          to_name: `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`,
          order_id: orderData.id.slice(-8),
          order_total: `₹${orderData.total.toFixed(2)}`,
          order_date: new Date(orderData.orderDate).toLocaleDateString(),
          customer_name: `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`,
          items_list: orderData.items.map(item => 
            `${item.name || item.title} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`
          ).join('\n'),
        };
        
        await emailjs.send(
          emailJSServiceId,
          emailJSTemplateId,
          templateParams,
          emailJSUserId
        );
        
        console.log('✅ Email sent successfully via EmailJS');
        return { success: true };
      } else {
        console.log('⚠️ EmailJS not configured. Set these environment variables:');
        console.log('- VITE_EMAILJS_SERVICE_ID');
        console.log('- VITE_EMAILJS_TEMPLATE_ID');
        console.log('- VITE_EMAILJS_USER_ID');
        console.log('📧 Email would be sent to:', orderData.shippingAddress.email);
        console.log('📄 Receipt content:', {
          customer: `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`,
          email: orderData.shippingAddress.email,
          orderId: orderData.id,
          total: `₹${orderData.total.toFixed(2)}`,
          items: orderData.items.length,
          date: new Date(orderData.orderDate).toLocaleDateString()
        });
        return { success: false, reason: 'EmailJS not configured' };
      }
    } catch (error) {
      console.error('❌ Error sending email:', error);
      console.log('Email details that failed to send:', {
        recipient: orderData.shippingAddress.email,
        orderId: orderData.id,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (orderData) => {
    const res = await initializeRazorpay();
    
    if (!res) {
      setNotificationMessage('Payment gateway failed to load');
      setNotificationType('error');
      setShowNotification(true);
      return false;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_9999999999', // Test key - replace with actual test key
      amount: total * 100, // Amount in paise
      currency: 'INR',
      name: 'Zeleva',
      description: `Order #${orderData.id}`,
      image: '/favicon.svg',
      handler: async function (response) {
        try {
          // Payment successful
          const updatedOrderData = {
            ...orderData,
            paymentId: response.razorpay_payment_id,
            paymentStatus: 'completed',
            status: 'confirmed'
          };
          
          // Update order in Firebase
          await dispatch(saveOrderToFirebase(updatedOrderData));
          
          // Generate PDF receipt
          const pdf = await generatePDFReceipt(updatedOrderData);
          if (pdf) {
            pdf.save(`Zeleva-Receipt-${updatedOrderData.id}.pdf`);
          }
          
          // Send email receipt
          const emailResult = await sendEmailReceipt(updatedOrderData, pdf);
          
          setOrderDetails(updatedOrderData);
          setOrderComplete(true);
          
          // Customize success message based on email status
          let successMessage = '🎉 Payment successful! Your order has been confirmed.';
          if (emailResult.success) {
            successMessage += ' Receipt downloaded and emailed to you.';
          } else if (emailResult.reason === 'EmailJS not configured') {
            successMessage += ' Receipt downloaded. Email functionality is not configured.';
          } else {
            successMessage += ' Receipt downloaded. Email delivery failed - please check browser console.';
          }
          
          setNotificationMessage(successMessage);
          setNotificationType('success');
          setShowNotification(true);
          
          // Clear cart
          dispatch(clearCart());
          
        } catch (error) {
          console.error('Error processing payment:', error);
          setNotificationMessage('Payment successful but there was an error processing your order. Please contact support.');
          setNotificationType('error');
          setShowNotification(true);
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: `${formData.address}, ${formData.city}, ${formData.state}`,
      },
      theme: {
        color: '#1f2937',
      },
      modal: {
        ondismiss: function () {
          // Save failed payment order
          const failedOrderData = {
            ...orderData,
            paymentStatus: 'failed',
            status: 'cancelled',
            paymentFailureReason: 'Payment cancelled by user'
          };
          dispatch(saveOrderToFirebase(failedOrderData));
          
          setIsProcessing(false);
          setNotificationMessage('Payment cancelled');
          setNotificationType('error');
          setShowNotification(true);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setNotificationMessage('Please fix the errors below');
      setNotificationType('error');
      setShowNotification(true);
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create initial order
      const orderData = {
        items: cartItems,
        total: total,
        shippingAddress: formData,
        paymentMethod: 'razorpay',
        paymentStatus: 'pending',
        status: 'pending'
      };
      
      const savedOrder = await dispatch(saveOrderToFirebase(orderData));
      
      // Process payment
      await handlePayment(savedOrder.payload || orderData);
      
    } catch (error) {
      console.error('Error during checkout:', error);
      setNotificationMessage('An error occurred during checkout. Please try again.');
      setNotificationType('error');
      setShowNotification(true);
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-gray-200/50">
          <h1 className="text-3xl font-medium text-gray-900 mb-4 font-display">Please sign in</h1>
          <p className="text-gray-600">You need to be signed in to checkout.</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderComplete) {
    navigate('/');
    return null;
  }

  if (orderComplete && orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-10 text-center border border-green-200/50">
            <div className="w-24 h-24 rounded-full bg-green-100 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-medium text-gray-900 mb-4 font-display">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order <span className="font-medium">#{orderDetails.id.slice(-8)}</span> has been confirmed.
            </p>
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-600">Total: <span className="font-medium text-gray-900">₹{orderDetails.total.toFixed(2)}</span></p>
              <p className="text-sm text-gray-600">Payment ID: <span className="font-medium text-gray-900">{orderDetails.paymentId}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/orders')}
                className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                View Orders
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          duration={7000}
          onClose={() => setShowNotification(false)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-medium text-gray-900 mb-2 text-center font-display">
            Secure Checkout
          </h1>
          <p className="text-gray-600 text-center">Complete your order with our secure payment system</p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Checkout Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50 mb-8 lg:mb-0">
            <h2 className="text-2xl font-medium text-gray-900 mb-6 font-display">
              Shipping Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      validationErrors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {validationErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      validationErrors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {validationErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      validationErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      validationErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                    validationErrors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your street address"
                />
                {validationErrors.address && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  placeholder="Apartment, suite, unit, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      validationErrors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="City"
                  />
                  {validationErrors.city && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.city}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      validationErrors.state ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="State"
                  />
                  {validationErrors.state && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.state}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                      validationErrors.zipCode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="ZIP"
                  />
                  {validationErrors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.zipCode}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="saveAddress"
                  checked={formData.saveAddress}
                  onChange={handleChange}
                  className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Save this address for future orders
                </label>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-medium text-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                                     `Pay ₹${total.toFixed(2)} with Razorpay`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50 h-fit">
            <h2 className="text-2xl font-medium text-gray-900 mb-6 font-display">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.size || 'no-size'}-${index}`} className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-xl">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Qty: {item.quantity}</span>
                      {item.size && <span>• Size: {item.size}</span>}
                    </div>
                  </div>
                                     <p className="font-medium text-gray-900">
                     ₹{(item.price * item.quantity).toFixed(2)}
                   </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Subtotal</span>
                                 <span className="text-gray-900">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">$0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-xl font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Secure Payment</h4>
                  <p className="text-sm text-blue-700">Your payment information is encrypted and secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 