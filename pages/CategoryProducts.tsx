
import React from 'react';
import { Product, AppState } from '../types';
import ProductCard from '../components/ProductCard';

interface CategoryProductsProps {
  categoryName: string;
  products: Product[];
  navigate: (page: AppState, data?: any) => void;
  onAddToCart: (product: Product) => void;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ categoryName, products, navigate, onAddToCart }) => {
  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex text-sm text-slate-400 mb-2">
            <button onClick={() => navigate('HOME')} className="hover:text-indigo-600">Home</button>
            <span className="mx-2">/</span>
            <span className="text-slate-600 font-medium">{categoryName}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">{categoryName}</h1>
          <p className="text-slate-500 mt-1">{products.length} Products Found</p>
        </div>
        
        <div className="flex gap-4">
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Sort by: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Popularity</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-slate-800">No products in this category yet</h3>
          <p className="text-slate-500 mt-2">Check back soon for new arrivals!</p>
          <button 
            onClick={() => navigate('HOME')}
            className="mt-6 text-indigo-600 font-bold hover:underline"
          >
            Back to Home
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default CategoryProducts;