
import React from 'react';
import { User, Order, AppState } from '../types';

interface ProfileProps {
  user: User | null;
  orders: Order[];
  logout: () => void;
  navigate: (page: AppState) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, orders, logout, navigate }) => {
  if (!user) {
    navigate('LOGIN');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      {/* Profile Hero */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-50 shadow-lg">
          <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
        </div>
        <div className="flex-grow text-center md:text-left space-y-2">
          <h1 className="text-3xl font-black text-slate-900">{user.name}</h1>
          <p className="text-slate-500 font-medium">{user.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
             <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">{user.role}</span>
             <span className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-full text-xs font-bold uppercase tracking-widest">Verified Member</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Edit Profile</button>
          <button onClick={logout} className="px-6 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-all">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation / Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm">
            {[
              { label: 'Order History', icon: '📦', active: true },
              { label: 'Wishlist', icon: '❤️', active: false },
              { label: 'Addresses', icon: '📍', active: false },
              { label: 'Payment Methods', icon: '💳', active: false },
              { label: 'Notification Settings', icon: '🔔', active: false },
              { label: 'Help & Support', icon: '💬', active: false }
            ].map((item, i) => (
              <button 
                key={i}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${item.active ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Recent Orders</h2>
          {orders.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center space-y-4 shadow-sm">
              <div className="text-5xl">🛍️</div>
              <h3 className="text-xl font-bold text-slate-800">No orders yet</h3>
              <p className="text-slate-400">Time to treat yourself to something special!</p>
              <button onClick={() => navigate('HOME')} className="text-indigo-600 font-bold hover:underline">Start Shopping</button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-black text-slate-900">ID: {order.id.split('-')[0].toUpperCase()}</div>
                      <div className="text-sm text-slate-400 font-medium">{new Date(order.date).toLocaleDateString()}</div>
                    </div>
                    <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                  </div>
                  <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                        <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <div className="text-slate-500 text-sm">{order.items.length} items</div>
                    <div className="font-black text-xl text-slate-900">₹{order.total.toLocaleString('en-IN')}</div>
                  </div>
                  <button 
                    onClick={() => navigate('TRACKING')}
                    className="w-full mt-6 bg-slate-50 text-slate-700 py-3 rounded-xl font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                  >
                    Track Order
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
