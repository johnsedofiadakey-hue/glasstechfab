import React from 'react';
import { 
  LayoutDashboard, Users, Settings, LogOut, 
  Eye, Calendar, Activity, Globe, Truck, Package, Mail
} from 'lucide-react';
import { NotificationBell } from '../../components/Shared';

export default function AdminLayout({ user, onLogout, onPreview, brand, view, setView, userNotifications, markNotificationRead, children }) {
  const ac = brand.color || '#C8A96E';

  const menu = [
    { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'operations', label: 'Operations', icon: <Globe size={20} /> },
    { id: 'logistics', label: 'Logistics', icon: <Truck size={20} /> },
    { id: 'cms', label: 'CMS Hub', icon: <Settings size={20} /> },
  ];

  const fullMenu = [
    ...menu,
    { id: 'analytics', label: 'Activity', icon: <Activity size={18} /> },
    { id: 'bookings', label: 'Reservations', icon: <Calendar size={18} /> },
    { id: 'email', label: 'Email Center', icon: <Mail size={18} /> },
    { id: 'system', label: 'Maintenance', icon: <Settings size={18} /> },
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
            {fullMenu.map(m => (
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
      )}

      {/* MAIN CONTENT AREA */}
      <main className="lx-main-admin" style={{ flex: 1, marginLeft: !isMobile ? 80 : 0 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* RESPONSIVE HEADER */}
          <header className={`p-nav-float ${isMobile ? 'mobile-header' : ''}`}>
            <div className="header-inner" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'center' : 'center', 
              padding: isMobile ? '0 16px' : '0 20px',
              flexDirection: 'row',
              height: isMobile ? 60 : 'auto'
            }}>
              <div className="header-title">
                {isMobile ? (
                  <div className="lxfh" style={{ fontSize: 18, fontWeight: 700 }}>Admin Console</div>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <div className="lxf eyebrow" style={{ fontSize: 10, letterSpacing: '.2em', color: ac, fontWeight: 800, textTransform: 'uppercase' }}>Operations Control</div>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A', boxShadow: '0 0 10px #16A34A' }} />
                    </div>
                    <h1 className="lxfh" style={{ fontSize: 22, letterSpacing: '-0.02em' }}>Management Console</h1>
                  </>
                )}
              </div>
              
              <div className="header-actions" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                {!isMobile && (
                  <div className="header-stats" style={{ display: 'flex', gap: 24, paddingRight: 24, borderRight: '1px solid rgba(0,0,0,0.06)' }}>
                     <div>
                        <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Factory Load</div>
                        <div className="lxf" style={{ fontSize: 13, fontWeight: 700 }}>82% Capacity</div>
                     </div>
                     <div>
                        <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Live Logistics</div>
                        <div className="lxf" style={{ fontSize: 13, fontWeight: 700 }}>4 In-Transit</div>
                     </div>
                  </div>
                )}
                
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <NotificationBell notifications={userNotifications} onMarkRead={markNotificationRead} />
                  <button onClick={onPreview} className="p-btn-light" style={{ padding: '8px 12px', fontSize: 11, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #F0EBE5' }}>
                    <Eye size={14} /> <span className="dt-only">Site Preview</span>
                  </button>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${ac}22`, border: `1.5px solid ${ac}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: ac, fontSize: 11 }}>
                    {user?.email?.slice(0, 1).toUpperCase() || 'A'}
                  </div>
                  {!isMobile && (
                    <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#B5AFA9', padding: 8, cursor: 'pointer' }}><LogOut size={18} /></button>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="fade-in admin-content-wrap" style={{ paddingBottom: isMobile ? 120 : 40 }}>
            {children}
          </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION (App-like feel) */}
      {isMobile && (
        <nav className="p-mobile-nav" style={{ 
          position: 'fixed', bottom: 0, left: 0, right: 0, height: 80, 
          background: '#fff', borderTop: '1px solid #F0EBE5', 
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          paddingBottom: 'env(safe-area-inset-bottom)', zIndex: 3000,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.05)'
        }}>
          {menu.map(m => (
            <button 
              key={m.id} 
              onClick={() => setView(m.id)} 
              style={{ 
                background: 'none', border: 'none', display: 'flex', flexDirection: 'column', 
                alignItems: 'center', gap: 4, color: view === m.id ? ac : '#B5AFA9',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ 
                width: 44, height: 44, borderRadius: 12, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: view === m.id ? `${ac}15` : 'transparent'
              }}>
                {m.icon}
              </div>
              <span style={{ fontSize: 10, fontWeight: view === m.id ? 700 : 500 }}>{m.label}</span>
            </button>
          ))}
          <button 
            onClick={onLogout} 
            style={{ 
              background: 'none', border: 'none', display: 'flex', flexDirection: 'column', 
              alignItems: 'center', gap: 4, color: '#EF4444'
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LogOut size={20} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 500 }}>Logout</span>
          </button>
        </nav>
      )}
    </div>
  );
}

