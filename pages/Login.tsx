
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Fix: Use type assertion to access signUp on SupabaseAuthClient
        const { error } = await (supabase.auth as any).signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        // Fix: Use type assertion to access signInWithPassword on SupabaseAuthClient
        const { error } = await (supabase.auth as any).signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg shadow-indigo-200">S</div>
          <h1 className="text-3xl font-black text-slate-900">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
          <p className="text-slate-400">{isSignUp ? 'Join ShopncarT today' : 'Log in to your ShopncarT account'}</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 text-rose-600 text-sm rounded-xl border border-rose-100">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
            />
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-600" />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 font-bold hover:underline">Forgot password?</a>
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="relative h-px bg-slate-100 my-10">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-slate-300 uppercase tracking-widest">or</span>
        </div>

        <p className="text-center text-slate-500 text-sm">
          {isSignUp ? 'Already have an account?' : 'New to ShopncarT?'} 
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-1 text-indigo-600 font-bold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Create an account'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
