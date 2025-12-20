
import { Category, Product, UserRole } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Gents Fashion', icon: '👔', subcategories: ['Shirts', 'Pants', 'Shoes', 'Watches'] },
  { id: '2', name: 'Ladies Fashion', icon: '👗', subcategories: ['Dresses', 'Handbags', 'Jewelry', 'Footwear'] },
  { id: '3', name: 'Kids Fashion', icon: '👶', subcategories: ['Infant', 'Toddler', 'School Wear'] },
  { id: '4', name: 'Mobiles & Accessories', icon: '📱', subcategories: ['Smartphones', 'Tablets', 'Cases', 'Chargers'] },
  { id: '5', name: 'Electronics', icon: '💻', subcategories: ['Laptops', 'Audio', 'Cameras', 'Gaming'] },
  { id: '6', name: 'Beauty', icon: '💄', subcategories: ['Skincare', 'Makeup', 'Fragrances'] },
  { id: '7', name: 'Sports', icon: '⚽', subcategories: ['Fitness', 'Outdoor', 'Team Sports'] },
  { id: '8', name: 'Toys & Baby Products', icon: '🧸', subcategories: ['Educational', 'Action Figures', 'Nursery'] },
  { id: '9', name: 'Books', icon: '📚', subcategories: ['Fiction', 'Academic', 'Comics'] },
  { id: '10', name: 'Herbals', icon: '🌿', subcategories: ['Supplements', 'Teas', 'Oils'] },
  { id: '11', name: 'Automobiles', icon: '🚗', subcategories: ['Car Parts', 'Accessories', 'Cleaning'] },
  { id: '12', name: 'Home Appliances', icon: '🏠', subcategories: ['Kitchen', 'Cleaning', 'Heating'] },
  { id: '13', name: 'Deserts', icon: '🍰', subcategories: ['Cakes', 'Pastries', 'Ice Cream'] },
  { id: '14', name: 'Groceries', icon: '🛒', subcategories: ['Fresh Produce', 'Dairy', 'Beverages'] }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Classic Leather Jacket',
    description: 'Premium Italian leather jacket with a vintage finish. Durable and stylish for all seasons.',
    price: 15999,
    category: 'Gents Fashion',
    subcategory: 'Pants',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
      'https://picsum.photos/seed/leather2/800/800',
      'https://picsum.photos/seed/leather3/800/800',
      'https://picsum.photos/seed/leather4/800/800',
      'https://picsum.photos/seed/leather5/800/800'
    ],
    rating: 4.8,
    stock: 25,
    isFeatured: true
  },
  {
    id: 'p2',
    name: 'Smart OLED 4K Watch',
    description: 'The latest in wearable tech. Monitor your health and stay connected with a 1.9" OLED display.',
    price: 27999,
    category: 'Mobiles & Accessories',
    subcategory: 'Watches',
    images: [
      'https://images.unsplash.com/photo-1544117518-30dd0575cfae?auto=format&fit=crop&q=80&w=800',
      'https://picsum.photos/seed/watch2/800/800',
      'https://picsum.photos/seed/watch3/800/800',
      'https://picsum.photos/seed/watch4/800/800',
      'https://picsum.photos/seed/watch5/800/800'
    ],
    rating: 4.9,
    stock: 50,
    isFeatured: true
  },
  {
    id: 'p3',
    name: 'Velvet Evening Gown',
    description: 'Elegant deep red velvet gown. Perfect for formal events and gala dinners.',
    price: 9999,
    category: 'Ladies Fashion',
    subcategory: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
      'https://picsum.photos/seed/dress2/800/800',
      'https://picsum.photos/seed/dress3/800/800',
      'https://picsum.photos/seed/dress4/800/800',
      'https://picsum.photos/seed/dress5/800/800'
    ],
    rating: 4.7,
    stock: 12,
    isFeatured: true
  },
  {
    id: 'p4',
    name: 'Ultra Pro Laptop',
    description: 'The fastest laptop for creators. M3 chip, 32GB RAM, 1TB SSD.',
    price: 199999,
    category: 'Electronics',
    subcategory: 'Laptops',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
      'https://picsum.photos/seed/laptop2/800/800',
      'https://picsum.photos/seed/laptop3/800/800',
      'https://picsum.photos/seed/laptop4/800/800',
      'https://picsum.photos/seed/laptop5/800/800'
    ],
    rating: 5.0,
    stock: 8,
    isFeatured: true
  },
  {
    id: 'p5',
    name: 'Wireless Noise Canceling Buds',
    description: 'Immerse yourself in high-fidelity audio. 30h battery life with case.',
    price: 12999,
    category: 'Electronics',
    subcategory: 'Audio',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
      'https://picsum.photos/seed/audio2/800/800',
      'https://picsum.photos/seed/audio3/800/800',
      'https://picsum.photos/seed/audio4/800/800',
      'https://picsum.photos/seed/audio5/800/800'
    ],
    rating: 4.5,
    stock: 100,
    isFeatured: false
  }
];

export const MOCK_USERS = [
  { id: 'u1', name: 'John Doe', email: 'john@example.com', role: UserRole.USER, avatar: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u2', name: 'Jane Admin', email: 'admin@shopncart.com', role: UserRole.ADMIN, avatar: 'https://i.pravatar.cc/150?u=u2' }
];