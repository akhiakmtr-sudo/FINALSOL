
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBuyNow }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'spec' | 'rev'>('desc');

  return (
    <div className="space-y-12 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-inner group">
            <img 
              src={product.images[selectedImg]} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt={product.name} 
            />
          </div>
          <div className="grid grid-cols-5 gap-3">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImg(idx)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImg === idx ? 'border-indigo-600 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest rounded-full">
                {product.category}
              </span>
              <span className="text-slate-400 font-medium text-sm">• {product.subcategory}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
                <span className="ml-2 text-slate-500 font-semibold">{product.rating} (120 Reviews)</span>
              </div>
              <div className="h-4 w-[1px] bg-slate-200"></div>
              <span className={`font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="text-5xl font-black text-slate-900">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-slate-500 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-3 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-12 text-center font-bold text-slate-800 border-x border-slate-100 outline-none" 
              />
              <button 
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="px-4 py-3 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </button>
            </div>
            <button 
              onClick={() => onAddToCart(product, quantity)}
              className="flex-grow bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Add to Cart
            </button>
          </div>

          <button 
            onClick={() => onBuyNow(product)}
            className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            Buy Now
          </button>

          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-sm font-medium text-slate-600">Free Express Shipping</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
              </div>
              <span className="text-sm font-medium text-slate-600">30-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex gap-8 border-b border-slate-100 mb-8 overflow-x-auto">
          {['desc', 'spec', 'rev'].map((t) => (
            <button 
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`pb-4 text-lg font-bold transition-all relative whitespace-nowrap ${activeTab === t ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {t === 'desc' ? 'Description' : t === 'spec' ? 'Specifications' : 'Reviews'}
              {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full"></div>}
            </button>
          ))}
        </div>
        
        <div className="min-h-[200px]">
          {activeTab === 'desc' && (
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed text-lg">
                This {product.name} is designed with the modern user in mind. Crafted from premium materials and featuring top-of-the-line technology, it delivers performance and style in equal measure.
              </p>
              <ul className="mt-6 space-y-3 text-slate-600">
                <li>• Highly durable and resilient architecture</li>
                <li>• Optimized for comfort and daily use</li>
                <li>• Ethically sourced and manufactured</li>
                <li>• Includes 2-year manufacturer warranty</li>
              </ul>
            </div>
          )}
          {activeTab === 'spec' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {[
                { l: 'Material', v: 'Industrial Grade' },
                { l: 'Dimensions', v: '20 x 15 x 5 cm' },
                { l: 'Weight', v: '450g' },
                { l: 'Origin', v: 'Imported' },
                { l: 'Model', v: 'SC-2024-X' },
                { l: 'Certification', v: 'Eco-Standard Certified' }
              ].map((s, i) => (
                <div key={i} className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-slate-400">{s.l}</span>
                  <span className="font-bold text-slate-700">{s.v}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'rev' && (
            <div className="text-center py-12 space-y-4">
              <div className="text-4xl font-black text-slate-800">4.8</div>
              <div className="flex justify-center text-amber-500">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
              <p className="text-slate-500">100% of customers recommend this product.</p>
              <button className="mt-4 px-8 py-3 bg-white border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all">Write a Review</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
