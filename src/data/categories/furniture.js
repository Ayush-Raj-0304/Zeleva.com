const furniture = [
  {
    id: 'furn_001',
    name: 'Premium Ergonomic Office Chair',
    brand: 'FurniCo',
    description: 'A luxurious ergonomic office chair with premium materials and advanced lumbar support for ultimate comfort.',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=1200',
    ],
    colors: ['#E5E7EB', '#374151', '#F59E42'],
    sizes: ['S', 'M', 'L'],
    category: 'Furniture',
    stock: 12,
    rating: 4.5,
    reviews: [
      { user: 'Sarah Johnson', rating: 5, text: 'Absolutely love this chair! Perfect for my home office and super comfortable for long work sessions.', date: '2 days ago', verified: true },
      { user: 'Mike Chen', rating: 4, text: 'Great quality and looks exactly as pictured. Assembly was straightforward.', date: '1 week ago', verified: true },
      { user: 'Emma Wilson', rating: 5, text: 'Exceeded my expectations. The build quality is excellent and it fits perfectly in my living room.', date: '2 weeks ago', verified: true }
    ],
  },
  {
    id: 'furn_002',
    name: 'Designer Dining Table Set',
    brand: 'HomeLux',
    description: 'Elegant 6-seater dining table set with cushioned chairs, perfect for modern dining rooms.',
    price: 34999,
    originalPrice: 45999,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
    ],
    colors: ['#8B4513', '#654321', '#A0522D'],
    sizes: ['6 Seater'],
    category: 'Furniture',
    stock: 3,
    rating: 4.6,
    reviews: [
      { user: 'Interior Designer', rating: 5, text: 'Beautiful craftsmanship! Transforms the entire dining room.', date: '2 days ago', verified: true },
      { user: 'Home Owner', rating: 4, text: 'Solid wood construction and comfortable seating. Worth the investment.', date: '1 week ago', verified: true }
    ],
  },
  {
    id: 'furn_003',
    name: 'L-Shaped Sectional Sofa',
    brand: 'ComfortZone',
    description: 'Spacious L-shaped sofa with premium fabric upholstery and foam cushioning.',
    price: 45999,
    originalPrice: 59999,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1200',
    ],
    colors: ['#8B4513', '#374151', '#DC2626'],
    sizes: ['7 Seater', '8 Seater'],
    category: 'Furniture',
    stock: 5,
    rating: 4.4,
    reviews: [
      { user: 'Family Person', rating: 4, text: 'Perfect for our living room! Comfortable seating for the whole family.', date: '1 day ago', verified: true },
      { user: 'Home Decorator', rating: 5, text: 'Great quality sofa. Very comfortable and looks premium.', date: '3 days ago', verified: true }
    ],
  },
  {
    id: 'furn_004',
    name: 'Queen Size Platform Bed',
    brand: 'SleepWell',
    description: 'Modern platform bed frame with built-in headboard and under-bed storage.',
    price: 25999,
    originalPrice: 32999,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
    ],
    colors: ['#8B4513', '#374151', '#E5E7EB'],
    sizes: ['Queen', 'King'],
    category: 'Furniture',
    stock: 8,
    rating: 4.7,
    reviews: [
      { user: 'Bedroom Renovator', rating: 5, text: 'Excellent bed frame! Storage space is very useful and assembly was easy.', date: '2 days ago', verified: true },
      { user: 'Quality Seeker', rating: 4, text: 'Solid construction and looks great. Good value for money.', date: '1 week ago', verified: true }
    ],
  },
  {
    id: 'furn_005',
    name: 'Bookshelf with 5 Tiers',
    brand: 'StoragePro',
    description: 'Tall wooden bookshelf with 5 spacious tiers for books and decorative items.',
    price: 6999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200',
    ],
    colors: ['#8B4513', '#374151', '#E5E7EB'],
    sizes: ['Standard'],
    category: 'Furniture',
    stock: 15,
    rating: 4.3,
    reviews: [
      { user: 'Book Lover', rating: 4, text: 'Perfect size for my book collection. Sturdy and well-made.', date: '3 days ago', verified: true },
      { user: 'Home Organizer', rating: 4, text: 'Great storage solution. Easy to assemble and looks good.', date: '1 week ago', verified: true }
    ],
  },
  {
    id: 'furn_006',
    name: 'Coffee Table with Glass Top',
    brand: 'ModernLiving',
    description: 'Contemporary coffee table with tempered glass top and wooden base.',
    price: 12999,
    originalPrice: 16999,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    ],
    colors: ['#8B4513', '#374151'],
    sizes: ['Standard', 'Large'],
    category: 'Furniture',
    stock: 10,
    rating: 4.2,
    reviews: [
      { user: 'Modern Home Fan', rating: 4, text: 'Stylish coffee table that fits perfectly in our living room.', date: '1 day ago', verified: true },
      { user: 'Interior Enthusiast', rating: 4, text: 'Good quality and looks premium. Glass is thick and sturdy.', date: '4 days ago', verified: true }
    ],
  },
  {
    id: 'furn_007',
    name: 'Wardrobe with Mirror',
    brand: 'SpaceMax',
    description: '3-door wardrobe with mirror, hanging space, and multiple shelves for organized storage.',
    price: 29999,
    originalPrice: 39999,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=1200',
    ],
    colors: ['#8B4513', '#E5E7EB', '#374151'],
    sizes: ['3 Door', '4 Door'],
    category: 'Furniture',
    stock: 6,
    rating: 4.5,
    reviews: [
      { user: 'Organization Expert', rating: 5, text: 'Excellent storage space! Mirror is a great addition.', date: '2 days ago', verified: true },
      { user: 'Bedroom Organizer', rating: 4, text: 'Good quality wardrobe with ample space for clothes.', date: '1 week ago', verified: true }
    ],
  },
  {
    id: 'furn_008',
    name: 'Recliner Chair',
    brand: 'RelaxCo',
    description: 'Comfortable recliner chair with footrest and premium leather upholstery.',
    price: 18999,
    originalPrice: 24999,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1200',
    ],
    colors: ['#8B4513', '#111827', '#DC2626'],
    sizes: ['Standard'],
    category: 'Furniture',
    stock: 7,
    rating: 4.6,
    reviews: [
      { user: 'Comfort Seeker', rating: 5, text: 'Incredibly comfortable! Perfect for relaxing after work.', date: '1 day ago', verified: true },
      { user: 'Senior Citizen', rating: 5, text: 'Great recliner with smooth operation. Very satisfied.', date: '3 days ago', verified: true }
    ],
  },
  {
    id: 'furn_009',
    name: 'Study Desk with Drawers',
    brand: 'WorkStation',
    description: 'Spacious study desk with multiple drawers and cable management for home office.',
    price: 14999,
    originalPrice: 19999,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
    ],
    colors: ['#8B4513', '#374151', '#E5E7EB'],
    sizes: ['Standard', 'Large'],
    category: 'Furniture',
    stock: 12,
    rating: 4.4,
    reviews: [
      { user: 'Home Worker', rating: 4, text: 'Perfect desk for working from home. Good storage space.', date: '2 days ago', verified: true },
      { user: 'Student', rating: 5, text: 'Excellent study desk! Drawers are very useful for organization.', date: '1 week ago', verified: true }
    ],
  },
  {
    id: 'furn_010',
    name: 'Bar Stool Set',
    brand: 'BarLife',
    description: 'Set of 2 adjustable bar stools with modern design and comfortable seating.',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=1200',
    ],
    colors: ['#111827', '#E5E7EB', '#DC2626'],
    sizes: ['Set of 2', 'Set of 4'],
    category: 'Furniture',
    stock: 14,
    rating: 4.1,
    reviews: [
      { user: 'Bar Owner', rating: 4, text: 'Good quality bar stools. Height adjustment works smoothly.', date: '3 days ago', verified: true },
      { user: 'Kitchen Designer', rating: 4, text: 'Modern design that fits well in contemporary kitchens.', date: '1 week ago', verified: true }
    ],
  }
];

export default furniture; 