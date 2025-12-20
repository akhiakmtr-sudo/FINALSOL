
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, q: number) => void;
  removeItem: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, removeItem, onCheckout }) => {
  const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 499;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="text-center py-24 space-y-6">
        <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-400">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="text-slate-500 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Go back and discover some amazing deals!</p>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <h1 className="text-3xl font-bold mb-10 text-slate-900">Your Shopping Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex gap-6 items-center shadow-sm">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
                <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="flex-grow space-y-1">
                <div className="text-xs font-bold text-indigo-600 uppercase">{item.category}</div>
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                <div className="text-xl font-black text-slate-900">₹{item.price.toLocaleString('en-IN')}</div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-3 py-1 text-slate-500 hover:text-slate-900">-</button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-slate-500 hover:text-slate-900">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-rose-500 text-sm font-semibold hover:underline flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-xl font-black text-slate-900 hidden sm:block">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="font-bold text-emerald-600">{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>GST (Incl.)</span>
                <span className="font-bold text-slate-900">₹0</span>
              </div>
              <div className="h-px bg-slate-100"></div>
              <div className="flex justify-between text-xl font-black text-slate-900">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
            >
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;