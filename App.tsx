
import React, { useState, useEffect, useMemo } from 'react';
import { AppState, User, Product, CartItem, Order, UserRole } from './types';
import { CATEGORIES, INITIAL_PRODUCTS, MOCK_USERS } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Tracking from './pages/Tracking';
import HelpAssistant from './components/HelpAssistant';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart logic
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  // Auth logic
  const login = (email: string) => {
    const found = MOCK_USERS.find(u => u.email === email);
    if (found) {
      setUser(found);
      setCurrentPage('HOME');
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('HOME');
  };

  // Navigation with loading
  const navigate = (page: AppState, data?: any) => {
    setIsLoading(true);
    setTimeout(() => {
      if (page === 'PRODUCT_DETAIL') setSelectedProduct(data);
      setCurrentPage(page);
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 600);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user} 
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)} 
        navigate={navigate} 
        onSearch={setSearchQuery}
      />
      
      <main className="flex-grow pt-20">
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-indigo-700 font-semibold text-lg">ShopncarT is preparing your experience...</p>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          {currentPage === 'HOME' && <Home products={filteredProducts} navigate={navigate} />}
          {currentPage === 'PRODUCT_DETAIL' && selectedProduct && (
            <ProductDetail product={selectedProduct} onAddToCart={addToCart} onBuyNow={(p) => { addToCart(p); navigate('CHECKOUT'); }} />
          )}
          {currentPage === 'CART' && <Cart cart={cart} updateQuantity={updateCartQuantity} removeItem={removeFromCart} onCheckout={() => navigate('CHECKOUT')} />}
          {currentPage === 'CHECKOUT' && (
            <Checkout 
              cart={cart} 
              user={user} 
              onComplete={(order) => { 
                setOrders([order, ...orders]); 
                setCart([]); 
                navigate('TRACKING', order); 
              }} 
            />
          )}
          {currentPage === 'PROFILE' && <Profile user={user} orders={orders} logout={logout} navigate={navigate} />}
          {currentPage === 'ADMIN' && user?.role === UserRole.ADMIN && (
            <AdminDashboard 
              products={products} 
              setProducts={setProducts} 
              orders={orders} 
              setOrders={setOrders}
            />
          )}
          {currentPage === 'LOGIN' && <Login onLogin={login} />}
          {currentPage === 'TRACKING' && <Tracking />}
        </div>
      </main>

      <Footer navigate={navigate} />
      <HelpAssistant />
    </div>
  );
};

export default App;
