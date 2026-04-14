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
    { id: 'system', label: 'System Hub', icon: <Settings size={18} /> },
  ];

  return (
    <div className="lx-admin" style={{ display: 'flex', minHeight: '100vh', background: '#F9F7F4', '--ac': ac }}>
      {/* NARROW SIDEBAR */}
      <aside className="p-sidebar-narrow">
        <div style={{ padding: '32px 24px', display: 'flex', justifyContent: 'center' }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 24, width: 24, objectFit: 'contain' }} /> : <div className="lxfh" style={{ fontSize: 20, color: ac }}>G</div>}
        </div>
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {menu.map(m => (
            <button key={m.id} onClick={() => setView(m.id)} className={`lxf${view === m.id ? ' active' : ''}`} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'none', border: 'none', borderRadius: 12, cursor: 'pointer', color: view === m.id ? ac : 'rgba(249,247,244,.45)', transition: 'all .3s', marginBottom: 8, overflow: 'hidden' }}>
              <div style={{ flexShrink: 0 }}>{m.icon}</div>
              <span className="n-label" style={{ fontWeight: view === m.id ? 700 : 400 }}>{m.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <button onClick={onLogout} className="lxf" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'none', border: 'none', color: 'rgba(249,247,244,.4)', cursor: 'pointer', overflow: 'hidden' }}>
            <LogOut size={16} /><span className="n-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, marginLeft: 80, padding: '0 40px 40px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* FLOATING HEADER */}
          <header className="p-nav-float">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
              <div>
                <div className="lxf" style={{ fontSize: 10, letterSpacing: '.2em', color: ac, fontWeight: 800, textTransform: 'uppercase', marginBottom: 2 }}>Operations Control</div>
                <h1 className="lxfh" style={{ fontSize: 22, letterSpacing: '-0.02em' }}>Management Console</h1>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div className="dt-flex" style={{ gap: 24, marginRight: 24, paddingRight: 24, borderRight: '1px solid rgba(0,0,0,0.06)' }}>
                   <div>
                      <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Factory Load</div>
                      <div className="lxf" style={{ fontSize: 13, fontWeight: 700 }}>82% Capacity</div>
                   </div>
                   <div>
                      <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Live Logistics</div>
                      <div className="lxf" style={{ fontSize: 13, fontWeight: 700 }}>4 In-Transit</div>
                   </div>
                </div>
                <button 
                  onClick={() => setView('system')} 
                  className="p-btn-gold lxf" 
                  style={{ padding: '8px 16px', fontSize: 11, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6, background: '#1A1410', color: ac }}
                >
                  <Settings size={14} /> Reset Platform Data
                </button>
                <NotificationBell notifications={userNotifications} onMarkRead={markNotificationRead} />
                <button onClick={onPreview} className="p-btn-light lxf" style={{ padding: '8px 16px', fontSize: 11, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Eye size={14} /> Preview Site</button>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${ac}22`, border: `1.5px solid ${ac}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: ac, fontSize: 12 }}>{user?.name?.slice(0, 2).toUpperCase() || 'AD'}</div>
              </div>
            </div>
          </header>

          <div className="fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
