
import React from 'react';

const Tracking: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900">Thank You For Your Order!</h1>
        <p className="text-slate-500 text-lg">Order #ORD-82741 is confirmed and being prepared.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="space-y-8">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Live Tracking Status
          </h2>

          <div className="relative pl-10 space-y-12">
            <div className="absolute left-[19px] top-0 bottom-0 w-1 bg-indigo-100 rounded-full"></div>
            
            <div className="relative">
              <div className="absolute left-[-24px] top-0 w-6 h-6 bg-indigo-600 rounded-full ring-4 ring-indigo-50 flex items-center justify-center">
                 <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900">Order Confirmed</h3>
                <p className="text-sm text-slate-500">Dec 20, 2024 - 10:30 AM</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[-24px] top-0 w-6 h-6 bg-indigo-600 rounded-full ring-4 ring-indigo-50 flex items-center justify-center animate-pulse">
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900">Processing At Hub</h3>
                <p className="text-sm text-slate-500">Expected completion by tomorrow</p>
              </div>
            </div>

            <div className="relative opacity-30">
              <div className="absolute left-[-24px] top-0 w-6 h-6 bg-slate-200 rounded-full"></div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900">Shipped</h3>
                <p className="text-sm text-slate-500">Tracking ID will be shared soon</p>
              </div>
            </div>

            <div className="relative opacity-30">
              <div className="absolute left-[-24px] top-0 w-6 h-6 bg-slate-200 rounded-full"></div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900">Delivered</h3>
                <p className="text-sm text-slate-500">Est. delivery Dec 24, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button className="text-indigo-600 font-bold hover:underline">Continue Shopping</button>
      </div>
    </div>
  );
};

export default Tracking;
