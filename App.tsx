
import React, { useState, useEffect, useMemo } from 'react';
import { AppState, User, Product, CartItem, Order, UserRole } from './types';
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
import HelpAssistant from './components/HelpAssistant';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const initApp = async () => {
      try {
        // 1. Check current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (!sessionError && session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser({
              id: profile.id,
              name: profile.full_name || session.user.email?.split('@')[0],
              email: session.user.email!,
              role: profile.role as UserRole,
              avatar: profile.avatar_url
            });
          }
        }

        // 2. Fetch products
        const { data: dbProducts, error: prodError } = await supabase
          .from('products')
          .select('*');
        
        if (dbProducts && !prodError && dbProducts.length > 0) {
          setProducts(dbProducts);
        }
      } catch (err) {
        console.error("Initialization failed, falling back to mock data", err);
      } finally {
        setIsLoading(false);
      }
    };

    initApp();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setUser({
            id: session.user.id,
            name: profile?.full_name || session.user.email?.split('@')[0],
            email: session.user.email!,
            role: profile?.role as UserRole || UserRole.USER,
            avatar: profile?.avatar_url
          });
        } catch (e) {
          console.error("Profile fetch error", e);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setCurrentPage('HOME');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const { data, error } = await supabase
            .from('orders')
            .select('*, order_items(*, products(*))')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
          
          if (data && !error) {
            const mappedOrders: Order[] = data.map(o => ({
              id: o.id,
              userId: o.user_id,
              total: o.total,
              status: o.status,
              date: o.created_at,
              address: o.address,
              items: (o.order_items || []).map((oi: any) => ({
                ...(oi.products || {}),
                quantity: oi.quantity
              }))
            }));
            setOrders(mappedOrders);
          }
        } catch (e) {
          console.error("Orders fetch error", e);
        }
      };
      fetchOrders();
    }
  }, [user]);

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

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const navigate = (page: AppState, data?: any) => {
    setIsLoading(true);
    setTimeout(() => {
      if (page === 'PRODUCT_DETAIL') setSelectedProduct(data);
      setCurrentPage(page);
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 400);
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-indigo-700 font-semibold text-lg">ShopncarT is connecting...</p>
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
