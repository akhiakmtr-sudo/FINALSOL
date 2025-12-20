
import React from 'react';
import { Product, AppState } from '../types';
import { CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  navigate: (page: AppState, data?: any) => void;
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, navigate, onAddToCart }) => {
  const featured = products.filter(p => p.isFeatured);

  return (
    <div className="space-y-12">
      {/* Hero / Ads Banner */}
      <section className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover" 
          alt="Hero Banner" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center p-8 md:p-16">
           <div className="max-w-xl text-white space-y-4">
              <h1 className="text-3xl md:text-5xl font-black">Reinvent Your Style</h1>
              <p className="text-lg opacity-90">Discover the season's most wanted pieces.</p>
              <button 
                onClick={() => navigate('CATEGORY_VIEW', 'Gents Fashion')}
                className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all"
              >
                Shop Now
              </button>
           </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => navigate('CATEGORY_VIEW', cat.name)}
              className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-center"
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-sm text-slate-700 group-hover:text-indigo-600">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Featured Trends</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              navigate={navigate} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section className="pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">All Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              navigate={navigate} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;