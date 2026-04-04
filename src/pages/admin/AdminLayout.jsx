import React from 'react';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, 
  Eye, Calendar, Activity, Mail, Truck, Globe, Image as ImgIcon,
  Package, Wrench, ShoppingCart
} from 'lucide-react';
import { NotificationBell } from '../../components/Shared';

export default function AdminLayout({ user, onLogout, onPreview, brand, view, setView, userNotifications, markNotificationRead, children }) {
  const ac = brand.color || '#C8A96E';

  const menu = [
    { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'operations', label: 'Global Operations', icon: <Globe size={18} /> },
    { id: 'cms', label: 'Website CMS', icon: <Settings size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <Activity size={18} /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar size={18} /> },
    { id: 'email', label: 'Email Center', icon: <Mail size={18} /> },
    { id: 'staff', label: 'Staff Management', icon: <Users size={18} /> },
  ];

  return (
    <div className="lx-admin" style={{ display: 'flex', minHeight: '100vh', background: '#F9F7F4', '--ac': ac }}>
      <aside style={{ width: 260, background: '#1A1410', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '32px 24px' }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 28, maxWidth: '100%', objectFit: 'contain' }} /> : <div className="lxfh" style={{ fontSize: 22, color: '#F9F7F4' }}>{brand.name}</div>}
        </div>
        <nav style={{ flex: 1, padding: '0 16px' }}>
          {menu.map(m => (
            <button key={m.id} onClick={() => setView(m.id)} className={`p-nav-item lxf${view === m.id ? ' active' : ''}`} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'none', border: 'none', borderRadius: 8, cursor: 'pointer', color: view === m.id ? ac : 'rgba(249,247,244,.45)', transition: 'all .3s', marginBottom: 4 }}>
              {m.icon} <span style={{ fontSize: 13, fontWeight: view === m.id ? 600 : 400 }}>{m.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <button onClick={onLogout} className="lxf" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'none', border: 'none', color: 'rgba(249,247,244,.4)', cursor: 'pointer' }}><LogOut size={16} /> Logout</button>
        </div>
      </aside>
      <main style={{ flex: 1, marginLeft: 260, padding: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <div>
              <div className="lxf" style={{ fontSize: 11, letterSpacing: '.12em', color: ac, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Operations Control</div>
              <h1 className="lxfh" style={{ fontSize: 26 }}>{brand.name} Control Center</h1>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <NotificationBell notifications={userNotifications} onMarkRead={markNotificationRead} />
              <button onClick={onPreview} className="p-btn-light lxf" style={{ padding: '9px 18px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Eye size={14} /> Preview Site</button>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${ac}22`, border: `1.5px solid ${ac}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: ac }}>{user?.name?.slice(0, 2).toUpperCase() || 'AD'}</div>
            </div>
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}
