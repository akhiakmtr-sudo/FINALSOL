
import React from 'react';
import { Product, AppState } from '../types';

interface ProductCardProps {
  product: Product;
  navigate: (page: AppState, data?: any) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, navigate, onAddToCart }) => {
  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
    >
      <div 
        className="relative aspect-square overflow-hidden bg-slate-50"
        onClick={() => navigate('PRODUCT_DETAIL', product)}
      >
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      <div className="p-5 flex flex-col flex-grow space-y-2">
        <div 
          className="text-xs font-semibold text-indigo-600 tracking-wider uppercase"
          onClick={() => navigate('CATEGORY_VIEW', product.category)}
        >
          {product.category}
        </div>
        <h3 
          className="font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors"
          onClick={() => navigate('PRODUCT_DETAIL', product)}
        >
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 text-amber-500 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
          <span className="text-xl font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-95 flex items-center gap-2"
            title="Add to Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs font-bold hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;