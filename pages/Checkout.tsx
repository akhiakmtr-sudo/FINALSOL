
import React, { useState } from 'react';
import { CartItem, User, Order } from '../types';
import { supabase } from '../lib/supabase';

interface CheckoutProps {
  cart: CartItem[];
  user: User | null;
  onComplete: (order: Order) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (!user) {
        alert("Please log in to complete your purchase.");
        return;
      }
      
      setIsSubmitting(true);
      try {
        // 1. Create order
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            total,
            status: 'Pending',
            address
          })
          .select()
          .single();

        if (orderError) throw orderError;

        // 2. Create order items
        const orderItems = cart.map(item => ({
          order_id: orderData.id,
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) throw itemsError;

        // 3. Success
        const newOrder: Order = {
          id: orderData.id,
          userId: user.id,
          items: [...cart],
          total,
          status: 'Pending',
          date: orderData.created_at,
          address
        };
        onComplete(newOrder);
      } catch (err: any) {
        alert(`Error placing order: ${err.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-12">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex-1 flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= i ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
              {i}
            </div>
            {i < 3 && <div className={`flex-grow h-1 mx-4 rounded-full ${step > i ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-600">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="John Doe" required />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-600">Address Line</label>
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                    placeholder="123 Shopping St, Mall Road" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600">City</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="New York" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600">Zip Code</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="10001" required />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border-2 border-indigo-600 bg-indigo-50 cursor-pointer flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border-4 border-indigo-600"></div>
                  <div>
                    <div className="font-bold text-slate-900">Credit / Debit Card</div>
                    <div className="text-xs text-slate-500">Visa, Mastercard, Amex</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border-2 border-slate-100 bg-slate-50 cursor-pointer opacity-50 flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>
                  <div>
                    <div className="font-bold text-slate-900">PayPal</div>
                    <div className="text-xs text-slate-500">Fast and secure</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600">Card Number</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="0000 0000 0000 0000" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Expiry (MM/YY)</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="12/28" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">CVV</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="123" required />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold text-slate-900">Review & Confirm</h2>
              <div className="bg-slate-50 p-6 rounded-2xl text-left space-y-4">
                <div className="flex justify-between font-semibold">
                  <span>Shipping Address:</span>
                  <span>{address}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Payment:</span>
                  <span>Card ending in 4242</span>
                </div>
                <div className="h-px bg-slate-200"></div>
                <div className="flex justify-between text-xl font-black">
                  <span>Grand Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm">By confirming, you agree to our terms of service and refund policies.</p>
            </div>
          )}

          <div className="flex justify-between gap-4 pt-4">
            {step > 1 && (
              <button 
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-8 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all"
                disabled={isSubmitting}
              >
                Back
              </button>
            )}
            <button 
              type="submit"
              className="flex-grow bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Order...' : (step === 3 ? 'Confirm & Place Order' : 'Continue to Next Step')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
