
import React from 'react';
import { Product, AppState } from '../types';
import { CATEGORIES } from '../constants';

interface HomeProps {
  products: Product[];
  navigate: (page: AppState, data?: any) => void;
}

const Home: React.FC<HomeProps> = ({ products, navigate }) => {
  const featured = products.filter(p => p.isFeatured);

  return (
    <div className="space-y-12">
      {/* Hero / Ads Banner */}
      <section className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://picsum.photos/seed/shophero/1920/1080" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Hero Banner" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center p-8 md:p-16">
          <div className="max-w-xl space-y-6">
            <span className="inline-block px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
              New Season Arrival
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Reinvent Your <br /> <span className="text-indigo-400">Digital Lifestyle</span>
            </h1>
            <p className="text-slate-200 text-lg md:text-xl font-medium">
              Discover the latest in premium fashion and cutting-edge electronics with exclusive early-bird discounts.
            </p>
            <button 
              onClick={() => navigate('HOME')}
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-500 hover:text-white transition-all shadow-lg active:scale-95"
            >
              Shop Featured Collection
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Shop by Category</h2>
          <button className="text-indigo-600 font-semibold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
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
            <ProductCard key={product.id} product={product} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* Mid-Banner Ad */}
      <section className="bg-indigo-900 rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Unlock 20% Off Your First Purchase</h2>
            <p className="text-indigo-200 text-lg">Subscribe to our newsletter and stay updated with the latest trends and exclusive drops.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input type="email" placeholder="Enter your email" className="flex-grow px-6 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/20" />
              <button className="bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-400 transition-all">Subscribe</button>
            </div>
          </div>
          <div className="flex-1">
             <img src="https://picsum.photos/seed/ad1/500/300" className="rounded-2xl shadow-xl transform rotate-3" alt="Ad" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-700/50 blur-3xl -mr-32 -mt-32 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/30 blur-3xl -ml-24 -mb-24 rounded-full"></div>
      </section>

      {/* All Products */}
      <section className="pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">All Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} navigate={navigate} />
          ))}
        </div>
      </section>
    </div>
  );
};

// Internal ProductCard for reusability
const ProductCard: React.FC<{ product: Product; navigate: (page: AppState, data?: any) => void }> = ({ product, navigate }) => {
  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
      onClick={() => navigate('PRODUCT_DETAIL', product)}
    >
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-rose-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
      </div>
      <div className="p-5 flex flex-col flex-grow space-y-3">
        <div className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">{product.category}</div>
        <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          ))}
          <span className="text-xs text-slate-400 font-medium ml-1">({product.rating})</span>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
          <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
          <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
