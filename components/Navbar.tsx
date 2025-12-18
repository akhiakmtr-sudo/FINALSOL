
import React from 'react';
import { User, UserRole, AppState } from '../types';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  navigate: (page: AppState, data?: any) => void;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount, navigate, onSearch }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40 h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => navigate('HOME')}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-700 transition-colors">
            S
          </div>
          <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 hidden sm:block">
            ShopncarT
          </span>
        </div>

        {/* Search */}
        <div className="flex-grow max-w-2xl relative">
          <input 
            type="text" 
            placeholder="Search for fashion, electronics and more..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-100 rounded-full border-none focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-slate-700"
          />
          <svg className="absolute left-4 top-3 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-6">
          {user?.role === UserRole.ADMIN && (
            <button 
              onClick={() => navigate('ADMIN')}
              className="hidden lg:flex items-center text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="ml-1 font-medium">Admin</span>
            </button>
          )}

          <button 
            onClick={() => navigate('CART')}
            className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => user ? navigate('PROFILE') : navigate('LOGIN')}
            className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-full transition-all group"
          >
            {user?.avatar ? (
              <img src={user.avatar} className="w-8 h-8 rounded-full border-2 border-indigo-100" alt="Profile" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 group-hover:text-indigo-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <span className="hidden sm:inline font-medium text-slate-700">
              {user ? user.name : 'Login'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
