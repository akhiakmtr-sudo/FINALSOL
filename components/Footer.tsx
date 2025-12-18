
import React from 'react';
import { AppState } from '../types';

interface FooterProps {
  navigate: (page: AppState) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white text-lg mr-2">S</div>
              ShopncarT
            </h2>
            <p className="max-w-xs text-slate-400 mb-6">
              Your one-stop destination for premium fashion, cutting-edge electronics, and daily essentials. Elevating your shopping experience since 2024.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">Facebook</span>FB</a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">Twitter</span>TW</a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">Instagram</span>IG</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Categories</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Men's Fashion</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Women's Fashion</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Home & Living</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Order Tracking</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© 2024 ShopncarT Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
