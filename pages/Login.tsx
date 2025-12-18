
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg shadow-indigo-200">S</div>
          <h1 className="text-3xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-slate-400">Log in to your ShopncarT account</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(email); }} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@shopncart.com or john@example.com"
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-600" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 font-bold hover:underline">Forgot password?</a>
          </div>

          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
            Sign In
          </button>
        </form>

        <div className="relative h-px bg-slate-100 my-10">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-slate-300 uppercase tracking-widest">or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
            <span className="text-sm font-bold text-slate-600">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all">
             <span className="text-sm font-bold text-slate-600">Apple ID</span>
          </button>
        </div>

        <p className="text-center text-slate-500 text-sm">
          New to ShopncarT? <a href="#" className="text-indigo-600 font-bold hover:underline">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
