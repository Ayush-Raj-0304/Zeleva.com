# 🛍️ Zeleva.com - Modern E-Commerce Store

A full-featured, responsive e-commerce web application built with React, Redux, and Firebase. Experience seamless online shopping with modern UI/UX, secure authentication, and integrated payment processing.

![E-Commerce Store](https://img.shields.io/badge/React-19.1.0-blue.svg)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-purple.svg)
![Firebase](https://img.shields.io/badge/Firebase-12.0.0-orange.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-cyan.svg)
![Vite](https://img.shields.io/badge/Vite-7.0.4-green.svg)

## ✨ Features

### 🛒 Core E-Commerce Functionality
- **Product Catalog**: Browse 70+ products across 6 categories
- **Advanced Search & Filtering**: Find products by name, brand, category, or description
- **Shopping Cart**: Add, remove, and manage items with persistent storage
- **Wishlist**: Save favorite products for later
- **Product Details**: Comprehensive product pages with images, descriptions, and reviews
- **Order Management**: Complete order history and tracking

### 🔐 Authentication & User Management
- **Firebase Authentication**: Secure user registration and login
- **User Profiles**: Manage personal information and preferences
- **Password Reset**: Email-based password recovery
- **Protected Routes**: Secure checkout and profile pages

### 💳 Payment & Checkout
- **Razorpay Integration**: Secure payment processing
- **Order Confirmation**: Email notifications and PDF receipts
- **Multiple Payment Methods**: Credit cards, debit cards, and more

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Framer Motion Animations**: Smooth, engaging user interactions
- **Search Bar**: Real-time product search with suggestions
- **View Toggle**: Grid and list view options for products

### 🏗️ Technical Features
- **Redux State Management**: Centralized application state
- **Firebase Firestore**: Real-time database for orders and user data
- **Client-Side Routing**: Fast navigation with React Router
- **Performance Optimized**: Code splitting and lazy loading
- **PWA Ready**: Optimized for mobile app-like experience

## 📱 Product Categories

1. **Electronics** - Smartphones, laptops, accessories
2. **Fashion** - Clothing, shoes, accessories
3. **Furniture** - Home and office furniture
4. **Home** - Home decor and essentials
5. **Kitchen** - Appliances and cookware
6. **Fitness** - Exercise equipment and accessories

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Firebase account (for backend services)
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayush-Raj-0304/Zeleva.com.git
   cd Zeleva.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   
   # Payment Gateway (Razorpay)
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   
   # Email Service (EmailJS)
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_USER_ID=your_user_id
   ```

4. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Add your domain to authorized domains

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
e-commerce-store/
├── public/                 # Static assets
│   ├── favicon.svg
│   ├── vite.svg
│   └── zeleva.svg
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Authentication modals
│   │   ├── Navbar.jsx     # Navigation component
│   │   ├── Footer.jsx     # Footer component
│   │   ├── ProductCard.jsx # Product display card
│   │   └── ...
│   ├── pages/             # Application pages
│   │   ├── Home.jsx       # Landing page
│   │   ├── CartPage.jsx   # Shopping cart
│   │   ├── CheckoutPage.jsx # Checkout process
│   │   ├── ProductPage.jsx # Product details
│   │   └── ...
│   ├── redux/             # State management
│   │   ├── store.js       # Redux store configuration
│   │   ├── cartSlice.js   # Cart state management
│   │   ├── authSlice.js   # Authentication state
│   │   └── ...
│   ├── data/              # Product data and categories
│   │   ├── categories/    # Category-specific products
│   │   ├── index.js       # Data aggregation
│   │   └── products.js    # Product utilities
│   ├── config/            # Configuration files
│   │   └── firebase.js    # Firebase setup
│   └── utils/             # Utility functions
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🔧 Technologies Used

### Frontend
- **React 19.1.0** - UI library with latest features
- **Redux Toolkit 2.8.2** - State management
- **React Router Dom 6.30.1** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Framer Motion 12.23.6** - Animation library

### Backend & Services
- **Firebase 12.0.0** - Authentication and database
- **Razorpay 2.9.6** - Payment processing
- **EmailJS 3.2.0** - Email notifications

### Development Tools
- **Vite 7.0.4** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **HTML2Canvas & jsPDF** - Receipt generation

## 🎨 Design System

### Color Palette
- **Primary**: Gray-900 (text) with gradient backgrounds
- **Background**: Gradient from gray-50 to gray-100
- **Accent**: Dynamic colors based on categories
- **Selection**: Gray-900 background with white text

### Typography
- Clean, modern typography with excellent readability
- Responsive font sizes and spacing
- Consistent heading hierarchy

### Components
- Reusable, modular component architecture
- Consistent spacing and styling
- Accessible design principles

## 🔐 Security Features

- **Firebase Authentication** - Secure user management
- **Environment Variables** - Sensitive data protection
- **Input Validation** - XSS and injection prevention
- **HTTPS Enforcement** - Secure data transmission
- **Protected Routes** - Access control for sensitive pages

## 📱 Responsive Design

- **Mobile-First Approach** - Optimized for all screen sizes
- **Touch-Friendly Interface** - Easy navigation on mobile devices
- **Fast Loading** - Optimized images and code splitting
- **PWA Features** - App-like experience on mobile

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 🙏 Acknowledgments

- React team for the amazing framework
- Firebase for backend services
- Tailwind CSS for the utility-first approach


---

**Made with ❤️ for the modern web by - Ayush Raj**