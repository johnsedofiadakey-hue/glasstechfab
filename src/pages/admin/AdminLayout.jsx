import { 
  LayoutDashboard, Users, Settings, LogOut, Folder, FileCode,
  Eye, Calendar, Activity, Globe, Truck, Package, Mail, MessageSquare, Sparkles,
  ChevronRight, ChevronDown, FolderOpen, FileText, Briefcase
} from 'lucide-react';
import { NotificationBell } from '../../components/Shared';

export default function AdminLayout({ user, onLogout, onPreview, brand, view, setView, userNotifications, markNotificationRead, children, ...props }) {
  const ac = brand.color || '#C8A96E';
  const [expandedFolders, setExpandedFolders] = React.useState({});

  const toggleFolder = (id) => {
    setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const menu = [
    { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'logistics', label: 'Logistics Hub', icon: <Truck size={18} /> },
    { id: 'cms', label: 'Catalog', icon: <Settings size={18} /> },
    { id: 'financials', label: 'Ledger', icon: <Package size={18} /> },
    { id: 'email', label: 'Inquiries', icon: <Mail size={18} /> },
    { id: 'chat', label: 'Threads', icon: <MessageSquare size={18} /> },
  ];

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="lx-admin" style={{ display: 'flex', minHeight: '100vh', background: 'transparent', '--ac': ac }}>
      {/* NARROW COMMAND EXPLORER (Desktop Only) */}
      {!isMobile && (
        <aside className="p-sidebar-narrow" style={{ 
          width: 280, 
          background: '#1A1410', 
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
            {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 32, objectFit: 'contain' }} /> : <div className="lxfh" style={{ fontSize: 20, color: ac }}>G</div>}
            <div className="lxfh" style={{ color: '#fff', fontSize: 16, letterSpacing: -0.5 }}>Command</div>
          </div>
          
          <nav style={{ flex: 1, padding: '0 12px', overflowY: 'auto' }}>
            <div className="lxf" style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 800, textTransform: 'uppercase', padding: '0 12px 12px', letterSpacing: 1 }}>Main Modules</div>
            {menu.map(m => (
              <button key={m.id} onClick={() => setView(m.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: view === m.id ? 'rgba(200, 169, 110, 0.1)' : 'none', border: 'none', borderRadius: 10, cursor: 'pointer', color: view === m.id ? ac : 'rgba(249,247,244,.6)', transition: 'all 0.2s', marginBottom: 4 }}>
                {m.icon}
                <span style={{ fontSize: 13, fontWeight: view === m.id ? 700 : 500 }}>{m.label}</span>
              </button>
            ))}

            <div className="lxf" style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 800, textTransform: 'uppercase', padding: '24px 12px 12px', letterSpacing: 1 }}>Project Registry</div>
            
            {props.clients?.map(client => {
               const clientProjects = props.dbClients?.filter(p => p.clientId === client.id) || [];
               const isExpanded = expandedFolders[client.id];
               
               return (
                 <div key={client.id} style={{ marginBottom: 4 }}>
                    <button 
                      onClick={() => toggleFolder(client.id)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'none', border: 'none', borderRadius: 8, cursor: 'pointer', color: 'rgba(249,247,244,.8)', textAlign: 'left' }}
                    >
                      {isExpanded ? <FolderOpen size={14} color={ac} /> : <Folder size={14} color="#B5AFA9" />}
                      <span style={{ fontSize: 12, fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.name}</span>
                      {isExpanded ? <ChevronDown size={12} opacity={0.3} /> : <ChevronRight size={12} opacity={0.3} />}
                    </button>
                    
                    {isExpanded && (
                       <div style={{ marginLeft: 24, paddingLeft: 12, borderLeft: '1px solid rgba(255,255,255,0.05)', marginTop: 4 }}>
                          {clientProjects.map(p => (
                             <button 
                               key={p.id}
                               onClick={() => {
                                 props.onSelectClient(client.id);
                                 // We'll add logic to jump to specific project in ClientHub later
                               }}
                               style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: 'none', border: 'none', borderRadius: 6, cursor: 'pointer', color: 'rgba(249,247,244,.5)', textAlign: 'left', marginBottom: 2 }}
                             >
                                <Briefcase size={12} />
                                <span style={{ fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.project || p.title}</span>
                             </button>
                          ))}
                          <button 
                            onClick={() => props.setMod('AddProject')}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: 'none', border: 'none', color: ac, fontSize: 10, fontWeight: 700, cursor: 'pointer', opacity: 0.7 }}
                          >
                             + Add Work Order
                          </button>
                       </div>
                    )}
                 </div>
               );
            })}
          </nav>

          <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,.05)' }}>
            <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'none', border: 'none', color: 'rgba(249,247,244,.4)', cursor: 'pointer' }}>
              <LogOut size={16} /> <span style={{ fontSize: 13 }}>Logout</span>
            </button>
          </div>
        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="lx-main-admin" style={{ flex: 1, marginLeft: !isMobile ? 280 : 0 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* RESPONSIVE HEADER */}
          <header className={`p-nav-float ${isMobile ? 'mobile-header' : ''}`} style={{ 
            marginTop: isMobile ? 0 : 24,
            borderRadius: isMobile ? 0 : 20,
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: 'var(--sh-md)'
          }}>
            <div className="header-inner" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: isMobile ? '0 16px' : '20px 32px',
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
                  <select 
                    value={props.lang} 
                    onChange={e => props.setLang(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #F0EBE5', background: '#fff', fontSize: 10, fontWeight: 800, cursor: 'pointer' }}
                  >
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                  </select>
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

      {/* MOBILE BOTTOM NAVIGATION (Premium Glass Dock) */}
      {isMobile && (
        <nav className="glass-dock">
          {menu.map(m => (
            <button 
              key={m.id} 
              onClick={() => setView(m.id)} 
              className={`glass-dock-item ${view === m.id ? 'active' : ''}`}
            >
              <div className="dot" />
              <div className="icon-box">
                {m.icon}
              </div>
              <span>{m.label}</span>
            </button>
          ))}
          <button 
            onClick={onLogout} 
            className="glass-dock-item"
            style={{ color: '#EF4444' }}
          >
            <div className="icon-box">
              <LogOut size={20} />
            </div>
            <span>Logout</span>
          </button>
        </nav>
      )}
    </div>
  );
}

