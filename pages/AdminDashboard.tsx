
import React, { useState } from 'react';
// Fix: Import Product and Order from types, and CATEGORIES from constants where they are defined.
import { Product, Order } from '../types';
import { CATEGORIES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, setProducts, orders }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders'>('stats');
  
  const statsData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  return (
    <div className="pb-24">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Admin Command Center</h1>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          {(['stats', 'products', 'orders'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all capitalize ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'stats' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Total Revenue</div>
              <div className="text-3xl font-black text-slate-900">$124,500.00</div>
              <div className="mt-2 text-emerald-600 text-sm font-bold flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                +12% from last week
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Active Orders</div>
              <div className="text-3xl font-black text-slate-900">{orders.length + 142}</div>
              <div className="mt-2 text-slate-500 text-sm font-medium">Processing & Shipping</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Total Products</div>
              <div className="text-3xl font-black text-slate-900">{products.length}</div>
              {/* Fix: Use dynamic CATEGORIES.length from imported constants instead of hardcoded 14 */}
              <div className="mt-2 text-indigo-600 text-sm font-medium">Across {CATEGORIES.length} categories</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Customer Rating</div>
              <div className="text-3xl font-black text-slate-900">4.8 / 5.0</div>
              <div className="mt-2 text-amber-500 text-sm font-medium flex items-center gap-1">
                Excellent Satisfaction
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Growth</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={statsData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Sales by Day</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="sales" fill="#818cf8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Product Inventory</h3>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700">Add New Product</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{p.category}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">${p.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.stock > 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {p.stock} Units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                        <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length > 0 ? orders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-indigo-600">{o.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">User_{o.userId}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">${o.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest">{o.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 font-bold text-sm hover:underline">View Details</button>
                    </td>
                  </tr>
                )) : (
                   <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">No orders recorded in current session.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
