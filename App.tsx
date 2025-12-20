
import React, { useState, useEffect, useMemo } from 'react';
import { AppState, User, Product, CartItem, Order, UserRole, Category } from './types';
import { CATEGORIES, INITIAL_PRODUCTS } from './constants';
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
import CategoryProducts from './pages/CategoryProducts';
import HelpAssistant from './components/HelpAssistant';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 3000);

    const initApp = async () => {
      try {
        const { data: { session } } = await (supabase.auth as any).getSession();
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser({
              id: profile.id,
              name: profile.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email!,
              role: profile.role as UserRole,
              avatar: profile.avatar_url
            });
          }
        }

        const { data: dbProducts } = await supabase.from('products').select('*');
        if (dbProducts && dbProducts.length > 0) {
          setProducts(dbProducts);
        }
      } catch (err) {
        console.error("ShopncarT: Backend connection issue, using local data.");
      } finally {
        setIsLoading(false);
        clearTimeout(timeout);
      }
    };

    initApp();

    const { data: { subscription } } = (supabase.auth as any).onAuthStateChange(async (event: string, session: any) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        setUser({
          id: session.user.id,
          name: profile?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email!,
          role: (profile?.role as UserRole) || UserRole.USER,
          avatar: profile?.avatar_url
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const navigate = (page: AppState, data?: any) => {
    setIsLoading(true);
    setTimeout(() => {
      if (page === 'PRODUCT_DETAIL') setSelectedProduct(data);
      if (page === 'CATEGORY_VIEW') setSelectedCategory(data);
      setCurrentPage(page);
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 200);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q)
    );
  }, [searchQuery, products]);

  return (
    <div className="min-h-screen flex flex-col transition-opacity duration-500">
      <Navbar 
        user={user} 
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)} 
        navigate={navigate} 
        onSearch={setSearchQuery}
      />
      
      <main className="flex-grow pt-20">
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          {currentPage === 'HOME' && (
            <Home 
              products={filteredProducts} 
              navigate={navigate} 
              onAddToCart={addToCart} 
            />
          )}
          {currentPage === 'CATEGORY_VIEW' && selectedCategory && (
            <CategoryProducts 
              categoryName={selectedCategory} 
              products={products.filter(p => p.category === selectedCategory)} 
              navigate={navigate}
              onAddToCart={addToCart}
            />
          )}
          {currentPage === 'PRODUCT_DETAIL' && selectedProduct && (
            <ProductDetail product={selectedProduct} onAddToCart={addToCart} onBuyNow={(p) => { addToCart(p); navigate('CHECKOUT'); }} />
          )}
          {currentPage === 'CART' && (
            <Cart 
              cart={cart} 
              updateQuantity={(id, q) => setCart(prev => prev.map(i => i.id === id ? {...i, quantity: q} : i))} 
              removeItem={(id) => setCart(prev => prev.filter(i => i.id !== id))} 
              onCheckout={() => navigate('CHECKOUT')} 
            />
          )}
          {currentPage === 'CHECKOUT' && <Checkout cart={cart} user={user} onComplete={(o) => { setOrders([o, ...orders]); setCart([]); navigate('TRACKING'); }} />}
          {currentPage === 'PROFILE' && <Profile user={user} orders={orders} logout={() => (supabase.auth as any).signOut()} navigate={navigate} />}
          {currentPage === 'ADMIN' && user?.role === UserRole.ADMIN && <AdminDashboard products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />}
          {currentPage === 'LOGIN' && <Login />}
          {currentPage === 'TRACKING' && <Tracking />}
        </div>
      </main>

      <Footer navigate={navigate} />
      <HelpAssistant />
    </div>
  );
};

export default App;