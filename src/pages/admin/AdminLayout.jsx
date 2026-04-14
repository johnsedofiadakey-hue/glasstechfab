import React from 'react';
import { 
  LayoutDashboard, Users, Settings, LogOut, 
  Eye, Calendar, Activity, Globe
} from 'lucide-react';
import { NotificationBell } from '../../components/Shared';

export default function AdminLayout({ user, onLogout, onPreview, brand, view, setView, userNotifications, markNotificationRead, children }) {
  const ac = brand.color || '#C8A96E';

  const menu = [
    { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'operations', label: 'Global Ops', icon: <Globe size={18} /> },
    { id: 'cms', label: 'Settings', icon: <Settings size={18} /> },
    { id: 'analytics', label: 'Activity', icon: <Activity size={18} /> },
    { id: 'bookings', label: 'Reservations', icon: <Calendar size={18} /> },
  ];

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="lx-admin" style={{ display: 'flex', minHeight: '100vh', background: '#F9F7F4', '--ac': ac }}>
      {/* NARROW SIDEBAR (Desktop Only) */}
      {!isMobile && (
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
            <button onClick={() => setView('system')} className={`lxf${view === 'system' ? ' active' : ''}`} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'none', border: 'none', borderRadius: 12, cursor: 'pointer', color: view === 'system' ? ac : 'rgba(249,247,244,.45)', transition: 'all .3s', marginBottom: 8, overflow: 'hidden' }}>
              <div style={{ flexShrink: 0 }}><Settings size={18} /></div>
              <span className="n-label">System Hub</span>
            </button>
          </nav>
          <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,.05)' }}>
            <button onClick={onLogout} className="lxf" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'none', border: 'none', color: 'rgba(249,247,244,.4)', cursor: 'pointer', overflow: 'hidden' }}>
              <LogOut size={16} /><span className="n-label">Logout</span>
            </button>
          </div>
        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="lx-main-admin" style={{ flex: 1, marginLeft: !isMobile ? 80 : 0 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* RESPONSIVE HEADER */}
          <header className={`p-nav-float ${isMobile ? 'mobile-header' : ''}`}>
            <div className="header-inner" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'flex-start' : 'center', 
              padding: isMobile ? '0 16px' : '0 20px',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 12 : 0
            }}>
              <div className="header-title">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <div className="lxf eyebrow" style={{ fontSize: 10, letterSpacing: '.2em', color: ac, fontWeight: 800, textTransform: 'uppercase' }}>Operations Control</div>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: !!brand.id ? '#16A34A' : '#EF4444', boxShadow: !!brand.id ? '0 0 10px #16A34A' : 'none' }} title={!!brand.id ? 'Connected to Firestore' : 'Mock Mode (No Persistence)'} />
                </div>
                <h1 className="lxfh" style={{ fontSize: isMobile ? 20 : 22, letterSpacing: '-0.02em' }}>Management Console</h1>
              </div>
              
              <div className="header-actions" style={{ display: 'flex', gap: 16, alignItems: 'center', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
                <div className="dt-flex header-stats" style={{ gap: 24, paddingRight: 24, borderRight: '1px solid rgba(0,0,0,0.06)' }}>
                   <div>
                      <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Factory Load</div>
                      <div className="lxf" style={{ fontSize: 13, fontWeight: 700 }}>82% Capacity</div>
                   </div>
                   <div>
                      <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Live Logistics</div>
                      <div className="lxf" style={{ fontSize: 13, fontWeight: 700 }}>4 In-Transit</div>
                   </div>
                </div>
                
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button 
                    onClick={() => setView('system')} 
                    className="p-btn-gold lxf dt-only" 
                    style={{ padding: '8px 16px', fontSize: 11, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6, background: '#1A1410', color: ac }}
                  >
                    <Settings size={14} /> Reset Platform
                  </button>
                  <NotificationBell notifications={userNotifications} onMarkRead={markNotificationRead} />
                  <button onClick={onPreview} className="p-btn-light lxf" style={{ padding: '8px 12px', fontSize: 11, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Eye size={14} /> <span className="dt-only">Preview Site</span></button>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${ac}22`, border: `1.5px solid ${ac}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: ac, fontSize: 12 }}>{user?.name?.slice(0, 2).toUpperCase() || 'AD'}</div>
                  <button onClick={onLogout} className="mb-only" style={{ background: 'none', border: 'none', color: '#B5AFA9', padding: 8 }}><LogOut size={18} /></button>
                </div>
              </div>
            </div>
          </header>

          <div className="fade-in admin-content-wrap">
            {children}
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION (App-like feel) */}
      <nav className="p-mobile-nav mb-only">
        {menu.map(m => (
          <button key={m.id} onClick={() => setView(m.id)} className={`nav-item${view === m.id ? ' active' : ''}`} style={{ color: view === m.id ? ac : '#B5AFA9' }}>
            <div className="icon-wrap">{m.icon}</div>
            <span style={{ fontSize: 10, fontWeight: view === m.id ? 700 : 400, marginTop: 4 }}>{m.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
