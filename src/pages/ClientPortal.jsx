import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, MessageSquare, FileText, Download, 
  ChevronRight, ArrowLeft, Send, Package, DollarSign, 
  Activity, Info, ShieldCheck, Image as ImageIcon, Camera,
  CheckCircle2, AlertCircle, Briefcase, Settings, LogOut,
  Sparkles, Zap, Clock, Globe, BookOpen, Star, Truck
} from 'lucide-react';
import { PAv, PSBadge } from '../components/Shared';
import { PROJECT_STAGES } from '../data';

export default function ClientPortal({ user, dbClients = [], clients = [], ...props }) {
  const [mob, setMob] = useState(window.innerWidth < 1000);
  const [tab, setTab] = useState('overview');
  const [activeProject, setActiveProject] = useState(null);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const handleResize = () => setMob(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const client = dbClients.find(c => c.id === user?.id) || dbClients[0] || {};
  
  // 🛡️ Identity Hardening: Filter using both explicit ID and phone reference
  const uId = user?.id;
  const uPhone = user?.phone;
  
  const myProjects = clients.filter(p => p.clientId === uId || p.clientIds?.includes(uId) || p.clientId === uPhone);
  const myInvoices = (props.invoices || []).filter(i => i.clientId === uId || i.clientId === uPhone);
  const myTasks = (props.tasks || []).filter(t => t.clientId === uId || t.clientId === uPhone);
  const myMessages = (props.messages || []).filter(m => m.senderId === uId || m.receiverId === uId || m.senderId === uPhone || m.receiverId === uPhone);

  const ac = props.brand?.color || '#C8A96E';

  useEffect(() => {
    if (myProjects.length > 0 && !activeProject) {
      setActiveProject(myProjects[0]);
    }
  }, [myProjects, activeProject]);

  const simulateAiAudit = () => {
    setAiAnalyzing(true);
    setTimeout(() => {
      setAiAnalyzing(false);
      props.notify('success', 'AI AUDIT COMPLETE: Installation alignment verified (98% precision).');
    }, 3000);
  };

  const navItems = [
    { id: 'status', label: 'My Projects', icon: <LayoutDashboard size={mob ? 20 : 18} /> },
    { id: 'sourcing', label: 'Marketplace', icon: <Package size={mob ? 20 : 18} /> },
    { id: 'logistics', label: 'Track My Order', icon: <Truck size={mob ? 20 : 18} /> },
    { id: 'vault', label: 'Documents', icon: <BookOpen size={mob ? 20 : 18} /> },
    { id: 'finance', label: 'Payments', icon: <DollarSign size={mob ? 20 : 18} /> },
    { id: 'support', label: 'Chat Support', icon: <MessageSquare size={mob ? 20 : 18} /> },
  ];

  const renderTimeline = (proj) => {
    const currentStage = proj.stage || 0;
    return (
      <div className="p-card" style={{ padding: mob ? 24 : 40, border: '1px solid #F0EBE5', overflowX: 'auto' }}>
        <h3 className="lxfh" style={{ fontSize: mob ? 16 : 20, marginBottom: mob ? 24 : 40 }}>Project Evolution</h3>
        <div style={{ display: 'flex', gap: 16, minWidth: mob ? 600 : 800 }}>
          {PROJECT_STAGES.slice(0, 8).map((s, i) => {
            const isActive = i + 1 <= currentStage;
            const isCurrent = i + 1 === currentStage;
            return (
              <div key={i} style={{ flex: 1, position: 'relative', textAlign: 'center' }}>
                <div style={{ 
                  width: mob ? 36 : 48, height: mob ? 36 : 48, borderRadius: '50%', background: isActive ? ac : '#F9F7F4', 
                  color: isActive ? '#1A1410' : '#B5AFA9', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', margin: '0 auto 12px', border: isCurrent ? `2px solid ${ac}` : 'none',
                  boxShadow: isCurrent ? `0 0 15px ${ac}44` : 'none', transition: 'all 0.5s ease',
                  fontSize: mob ? 12 : 14
                }}>
                  {isActive ? <CheckCircle2 size={mob ? 18 : 24} /> : <span>{i + 1}</span>}
                </div>
                <div style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, color: isActive ? '#1A1410' : '#B5AFA9' }}>{s.name}</div>
                {i < 7 && <div style={{ position: 'absolute', top: mob ? 18 : 24, left: 'calc(50% + 24px)', width: 'calc(100% - 48px)', height: 2, background: i + 2 <= currentStage ? ac : '#F9F7F4' }} />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="client-portal-layout fade-in" style={{ background: '#FDFCFB', minHeight: '100vh', padding: mob ? '20px 20px 100px' : '40px 60px' }}>
      
      {/* 1. BRAND HEADER - Mobile Optimized */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mob ? 32 : 60, position: mob ? 'sticky' : 'relative', top: 0, zIndex: 100, background: '#FDFCFB', padding: mob ? '10px 0' : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: mob ? 12 : 20 }}>
           <div style={{ width: mob ? 36 : 48, height: mob ? 36 : 48, background: '#1A1410', borderRadius: mob ? 12 : 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ac }}>
              <Sparkles size={mob ? 18 : 24} />
           </div>
           <div>
              <h1 className="lxfh" style={{ fontSize: mob ? 18 : 26, margin: 0, lineHeight: 1 }}>My Account</h1>
              <p className="lxf" style={{ color: '#B5AFA9', fontSize: 10 }}>Glasstech Portal</p>
           </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
           <select 
             value={props.currency} 
             onChange={e => props.setCurrency(e.target.value)}
             style={{ height: mob ? 40 : 48, padding: '0 12px', borderRadius: 12, border: '1px solid #F0EBE5', background: '#fff', fontSize: 11, fontWeight: 700 }}
           >
             <option value="GHS">{mob ? 'GHS' : 'GHS (₵)'}</option>
             <option value="USD">{mob ? 'USD' : 'USD ($)'}</option>
           </select>
           {!mob && <button onClick={props.handleLogout} className="p-btn-light" style={{ height: 48, borderRadius: 14 }}><LogOut size={18} /></button>}
        </div>
      </div>

      <div style={{ display: mob ? 'block' : 'grid', gridTemplateColumns: '280px 1fr', gap: 60 }}>
        
        {/* SIDEBAR NAVIGATION - Desktop Only */}
        {!mob && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setTab(item.id)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', 
                  borderRadius: 16, background: tab === item.id ? '#1A1410' : 'transparent',
                  color: tab === item.id ? '#fff' : '#6A635C', border: 'none',
                  textAlign: 'left', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                  {item.icon} {item.label}
              </button>
            ))}

            <div className="p-card" style={{ marginTop: 40, padding: 24, background: '#F9F7F4', border: 'none' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                  <Zap size={16} color={ac} fill={ac} />
                  <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Quality Check</span>
                </div>
                <p style={{ fontSize: 12, color: '#B5AFA9', marginBottom: 20 }}>Verify your installation progress with our automated precision tool.</p>
                <button 
                  onClick={simulateAiAudit}
                  disabled={aiAnalyzing}
                  className="p-btn-dark" 
                  style={{ width: '100%', height: 40, fontSize: 11, background: ac, color: '#1A1410', border: 'none' }}
                >
                  {aiAnalyzing ? 'Checking Alignment...' : 'Verify Installation'}
                </button>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div style={{ minWidth: 0 }}>
           
           {tab === 'overview' && (
              <div className="fade-in">
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mob ? 24 : 32 }}>
                    <h2 className="lxfh" style={{ fontSize: mob ? 24 : 32 }}>Active Projects</h2>
                    <PSBadge s="Live" />
                 </div>

                 {activeProject ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: mob ? 24 : 40 }}>
                       <div className="p-card" style={{ padding: mob ? 24 : 40, border: '1px solid #F0EBE5', background: '#fff' }}>
                          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: mob ? 'flex-start' : 'flex-start', gap: mob ? 16 : 0, marginBottom: 32 }}>
                             <div>
                                <h3 className="lxfh" style={{ fontSize: mob ? 20 : 24, marginBottom: 4 }}>{activeProject.project}</h3>
                                <div className="lxf" style={{ color: '#B5AFA9', fontSize: 12 }}>Ref: {activeProject.id.toUpperCase()} • {activeProject.cat}</div>
                             </div>
                             <div style={{ textAlign: mob ? 'left' : 'right' }}>
                                <div style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', color: '#B5AFA9', marginBottom: 6 }}>Current Status</div>
                                <PSBadge s={PROJECT_STAGES[activeProject.stage - 1]?.name || 'Initialization'} c={ac} />
                             </div>
                          </div>
                          
                          <div style={{ height: 10, background: '#F9F7F4', borderRadius: 5, overflow: 'hidden', marginBottom: 16 }}>
                             <div style={{ width: `${(activeProject.stage / 12) * 100}%`, height: '100%', background: ac, transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <span className="lxf" style={{ fontSize: 11, fontWeight: 700 }}>{Math.round((activeProject.stage / 12) * 100)}% Complete</span>
                             <span className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{mob ? '' : 'Next: '}{PROJECT_STAGES[activeProject.stage]?.name || 'Final Delivery'}</span>
                          </div>
                       </div>

                       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr 1fr', gap: mob ? 16 : 24 }}>
                          <div className="p-card" style={{ padding: mob ? 20 : 32, border: '1px solid #F0EBE5' }}>
                             <Package size={mob ? 20 : 24} color={ac} style={{ marginBottom: 12 }} />
                             <div className="lxfh" style={{ fontSize: mob ? 16 : 18 }}>{activeProject.components || 'Standard'}</div>
                             <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>Site Components</div>
                          </div>
                          <div className="p-card" style={{ padding: mob ? 20 : 32, border: '1px solid #F0EBE5' }}>
                             <Activity size={mob ? 20 : 24} color={ac} style={{ marginBottom: 12 }} />
                             <div className="lxfh" style={{ fontSize: mob ? 16 : 18 }}>{PROJECT_STAGES[activeProject.stage - 1]?.name}</div>
                             <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>Operational Phase</div>
                          </div>
                          <div className="p-card" style={{ padding: mob ? 20 : 32, border: '1px solid #F0EBE5', background: '#1A1410', color: '#fff' }}>
                             <DollarSign size={mob ? 20 : 24} color={ac} style={{ marginBottom: 12 }} />
                             <div className="lxfh" style={{ fontSize: mob ? 16 : 18 }}>{props.formatPrice(activeProject.budget)}</div>
                             <div className="lxf" style={{ fontSize: 11, opacity: 0.6 }}>Project Valuation</div>
                          </div>
                       </div>
                       
                       {mob && (
                          <div className="p-card" style={{ padding: 24, background: '#F9F7F4', border: 'none' }}>
                              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                                <Zap size={16} color={ac} fill={ac} />
                                <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>AI Site Inspector</span>
                              </div>
                              <button 
                                onClick={simulateAiAudit}
                                disabled={aiAnalyzing}
                                className="p-btn-dark" 
                                style={{ width: '100%', height: 44, fontSize: 11, background: ac, color: '#1A1410', border: 'none', borderRadius: 12 }}
                              >
                                {aiAnalyzing ? 'Analyzing Alignment...' : 'Verify Installation Now'}
                              </button>
                          </div>
                       )}
                    </div>
                 ) : (
                    <div style={{ padding: mob ? 60 : 100, textAlign: 'center', background: '#fff', borderRadius: mob ? 24 : 40, border: '1px dashed #F0EBE5' }}>
                       <Briefcase size={mob ? 48 : 64} color="#F0EBE5" style={{ marginBottom: 24 }} />
                       <h3 className="lxfh" style={{ fontSize: mob ? 20 : 24 }}>System Initialization</h3>
                       <p className="lxf" style={{ color: '#B5AFA9', maxWidth: 400, margin: '16px auto', fontSize: 13 }}>Your dashboard is ready. We will populate your project data as soon as engineering confirms the site survey.</p>
                    </div>
                 )}
              </div>
           )}

           {tab === 'timeline' && activeProject && (
              <div className="fade-in">
                 <h2 className="lxfh" style={{ fontSize: mob ? 24 : 32, marginBottom: mob ? 24 : 40 }}>Project Evolution</h2>
                 {renderTimeline(activeProject)}
                 <div style={{ marginTop: mob ? 24 : 40, display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 16 : 40 }}>
                    <div className="p-card" style={{ padding: mob ? 24 : 40, border: '1px solid #F0EBE5' }}>
                       <h4 className="lxfh" style={{ fontSize: 16, marginBottom: 20 }}>Milestones Achieved</h4>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                          {PROJECT_STAGES.slice(0, activeProject.stage).map((s, i) => (
                             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <CheckCircle2 size={16} color="#16A34A" />
                                <span className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                    <div className="p-card" style={{ padding: mob ? 24 : 40, background: '#F9F7F4', border: 'none' }}>
                       <h4 className="lxfh" style={{ fontSize: 16, marginBottom: 20 }}>Upcoming Phase</h4>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                          {PROJECT_STAGES.slice(activeProject.stage, activeProject.stage + 3).map((s, i) => (
                             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: 0.4 }}>
                                <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #B5AFA9' }} />
                                <span className="lxf" style={{ fontSize: 13 }}>{s.name}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {tab === 'vault' && (
              <div className="fade-in">
                 <h2 className="lxfh" style={{ fontSize: mob ? 24 : 32, marginBottom: mob ? 24 : 40 }}>Technical Vault</h2>
                 <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 16 : 32 }}>
                    <div className="p-card" style={{ padding: mob ? 24 : 40, border: '1px solid #F0EBE5' }}>
                       <ShieldCheck size={mob ? 24 : 32} color={ac} style={{ marginBottom: 16 }} />
                       <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 8 }}>Material Grades</h3>
                       <p className="lxf" style={{ color: '#B5AFA9', fontSize: 13, marginBottom: 24 }}>Official technical specifications for your site materials.</p>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          {[
                            { l: 'Glass Type', v: '12mm Tempered' },
                            { l: 'Coating', v: 'Solar Control' },
                            { l: 'Safety', v: 'BS EN Certified' }
                          ].map(x => (
                            <div key={x.l} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F9F7F4', paddingBottom: 10 }}>
                               <span className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{x.l}</span>
                               <span className="lxf" style={{ fontSize: 12, fontWeight: 700 }}>{x.v}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="p-card" style={{ padding: mob ? 24 : 40, border: '1px solid #F0EBE5' }}>
                       <Settings size={mob ? 24 : 32} color={ac} style={{ marginBottom: 16 }} />
                       <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 8 }}>Care Protocol</h3>
                       <p className="lxf" style={{ color: '#B5AFA9', fontSize: 13, marginBottom: 24 }}>Maintenance guidelines for longevity.</p>
                       <button className="p-btn-dark" style={{ width: '100%', height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 12 }}>
                          <Download size={16} /> DOWNLOAD GUIDES
                       </button>
                    </div>
                 </div>
              </div>
           )}

            {tab === 'sourcing' && (
               <div className="fade-in">
                  <h2 className="lxfh" style={{ fontSize: mob ? 24 : 32, marginBottom: mob ? 24 : 40 }}>Material Sourcing</h2>
                  <div className="p-card" style={{ padding: mob ? 24 : 40, border: '1px solid #F0EBE5' }}>
                     <p className="lxf" style={{ color: '#B5AFA9', marginBottom: 32 }}>Review the high-precision materials sourced for your project from our global factory partners.</p>
                     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 24 }}>
                        {(props.procurements || []).filter(p => p.clientId === user?.id).map(p => (
                           <div key={p.id} style={{ border: '1px solid #F0EBE5', borderRadius: 20, overflow: 'hidden' }}>
                              <img src={p.img || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800"} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                              <div style={{ padding: 20 }}>
                                 <h4 className="lxfh" style={{ fontSize: 16, marginBottom: 4 }}>{p.name}</h4>
                                 <p className="lxf" style={{ fontSize: 12, color: '#B5AFA9', marginBottom: 16 }}>{p.specs}</p>
                                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <PSBadge s={p.status} />
                                    <button onClick={() => props.notify('success', 'Selection Confirmed.')} className="p-btn-dark" style={{ height: 32, fontSize: 10, padding: '0 16px' }}>Approve Choice</button>
                                 </div>
                              </div>
                           </div>
                        ))}
                        {(props.procurements || []).filter(p => p.clientId === user?.id).length === 0 && (
                           <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 60, background: '#F9F7F4', borderRadius: 20 }}>
                              <Package size={48} color="#F0EBE5" style={{ marginBottom: 16 }} />
                              <p style={{ color: '#B5AFA9', fontSize: 13 }}>Sourcing documents are being prepared by the procurement team.</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            )}

            {tab === 'logistics' && activeProject && (
               <div className="fade-in">
                  <h2 className="lxfh" style={{ fontSize: mob ? 24 : 32, marginBottom: mob ? 24 : 40 }}>Logistics Tracker</h2>
                  <div className="p-card" style={{ padding: mob ? 24 : 40, border: '1px solid #F0EBE5' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        {[
                          { id: 4, name: 'China Production', desc: 'Items being built at the factory.' },
                          { id: 5, name: 'Global Shipping', desc: 'Cargo moving via ocean freight to Tema Port.' },
                          { id: 6, name: 'Ghana Site Delivery', desc: 'Materials dispatched to your physical location.' }
                        ].map((s, i) => (
                           <div key={i} style={{ display: 'flex', gap: 24, position: 'relative' }}>
                              <div style={{ 
                                 width: 40, height: 40, borderRadius: 12, 
                                 background: activeProject.stage >= s.id ? ac : '#F9F7F4',
                                 color: activeProject.stage >= s.id ? '#1A1410' : '#B5AFA9',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1
                              }}>
                                 {activeProject.stage >= s.id ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                              </div>
                              <div style={{ flex: 1 }}>
                                 <h4 className="lxfh" style={{ fontSize: 16, color: activeProject.stage >= s.id ? '#1A1410' : '#B5AFA9' }}>{s.name}</h4>
                                 <p className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{s.desc}</p>
                              </div>
                              {i < 2 && <div style={{ position: 'absolute', top: 40, left: 20, width: 2, height: 32, background: activeProject.stage > s.id ? ac : '#F9F7F4' }} />}
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

           {tab === 'finance' && (
              <div className="fade-in">
                 <h2 className="lxfh" style={{ fontSize: mob ? 24 : 32, marginBottom: mob ? 24 : 40 }}>Financial Ledger</h2>
                 <div className="p-card" style={{ padding: 0, border: '1px solid #F0EBE5', overflowX: mob ? 'auto' : 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: mob ? 500 : 'auto' }}>
                       <thead style={{ background: '#F9F7F4', borderBottom: '1px solid #F0EBE5' }}>
                          <tr>
                             <th style={{ padding: mob ? '16px 20px' : '20px 32px', textAlign: 'left', fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Invoice</th>
                             <th style={{ padding: mob ? '16px 20px' : '20px 32px', textAlign: 'left', fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Description</th>
                             <th style={{ padding: mob ? '16px 20px' : '20px 32px', textAlign: 'left', fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Status</th>
                             <th style={{ padding: mob ? '16px 20px' : '20px 32px', textAlign: 'right', fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Amount</th>
                          </tr>
                       </thead>
                       <tbody>
                          {myInvoices.map(inv => (
                             <tr key={inv.id} style={{ borderBottom: '1px solid #F9F7F4' }}>
                                <td style={{ padding: mob ? '16px 20px' : '24px 32px' }}>
                                   <div style={{ fontSize: 13, fontWeight: 900 }}>REF-{inv.id.slice(-4).toUpperCase()}</div>
                                   <div style={{ fontSize: 10, color: '#B5AFA9' }}>{inv.date}</div>
                                </td>
                                <td style={{ padding: mob ? '16px 20px' : '24px 32px' }}>
                                   <div style={{ fontSize: 12, fontWeight: 600 }}>{inv.title || 'Installation'}</div>
                                </td>
                                <td style={{ padding: mob ? '16px 20px' : '24px 32px' }}>
                                   <PSBadge s={inv.status} />
                                </td>
                                <td style={{ padding: mob ? '16px 20px' : '24px 32px', textAlign: 'right' }}>
                                   <div style={{ fontSize: 14, fontWeight: 900 }}>{props.formatPrice(inv.amount)}</div>
                                </td>
                             </tr>
                          ))}
                          {myInvoices.length === 0 && (
                             <tr>
                                <td colSpan={4} style={{ padding: 60, textAlign: 'center', color: '#B5AFA9', fontSize: 13 }}>No financial transactions to display.</td>
                             </tr>
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}

           {tab === 'support' && (
              <div className="fade-in">
                 <h2 className="lxfh" style={{ fontSize: mob ? 24 : 32, marginBottom: mob ? 24 : 40 }}>Project Concierge</h2>
                 <div className="p-card" style={{ height: mob ? 'calc(100vh - 280px)' : 600, display: 'flex', flexDirection: 'column', border: '1px solid #F0EBE5', overflow: 'hidden' }}>
                    <div style={{ padding: mob ? '16px 20px' : '24px 32px', borderBottom: '1px solid #F0EBE5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div>
                          <h4 className="lxfh" style={{ fontSize: mob ? 14 : 18, margin: 0 }}>Direct Support</h4>
                          <p className="lxf" style={{ fontSize: 9, color: '#16A34A', fontWeight: 800 }}>AGENT ONLINE</p>
                       </div>
                       <PSBadge s="Secured" />
                    </div>
                    <div style={{ flex: 1, padding: mob ? 20 : 32, overflowY: 'auto', background: '#F9F7F4', display: 'flex', flexDirection: 'column', gap: 16 }}>
                       {myMessages.length > 0 ? myMessages.map((m, i) => {
                          const isMe = m.senderId === user?.id;
                          return (
                             <div key={i} style={{ 
                                alignSelf: isMe ? 'flex-end' : 'flex-start',
                                background: isMe ? '#1A1410' : '#fff',
                                color: isMe ? '#fff' : '#1A1410',
                                padding: mob ? '12px 16px' : '16px 20px', borderRadius: 16,
                                maxWidth: '85%', fontSize: 13,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                border: isMe ? 'none' : '1px solid #F0EBE5'
                             }}>
                                {m.text}
                             </div>
                          );
                       }) : (
                          <div style={{ textAlign: 'center', padding: 60, color: '#B5AFA9', fontSize: 13 }} className="lxf">Awaiting your first inquiry.</div>
                       )}
                    </div>
                    <div style={{ padding: mob ? 16 : 24, borderTop: '1px solid #F0EBE5', display: 'flex', gap: 8 }}>
                       <input 
                         id="clientMsgInp" 
                         className="p-inp" 
                         placeholder="Type here..." 
                         style={{ flex: 1, height: mob ? 48 : 56, borderRadius: 12, fontSize: 13 }}
                         onKeyDown={e => { if (e.key === 'Enter' && e.target.value) { props.sendMessage(e.target.value, user?.id, 'admin'); e.target.value = ''; } }}
                       />
                       <button onClick={() => { const inp = document.getElementById('clientMsgInp'); if (inp.value) { props.sendMessage(inp.value, user?.id, 'admin'); inp.value = ''; } }} className="p-btn-dark" style={{ width: mob ? 48 : 56, height: mob ? 48 : 56, borderRadius: 12, background: ac, color: '#1A1410', border: 'none' }}>
                          <Send size={18} />
                       </button>
                    </div>
                 </div>
              </div>
           )}

        </div>

      </div>

      {/* MOBILE BOTTOM DOCK NAVIGATION */}
      {mob && (
        <div style={{ 
          position: 'fixed', bottom: 0, left: 0, right: 0, 
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid #F0EBE5', display: 'flex', justifyContent: 'space-around', 
          padding: '12px 10px 30px', zIndex: 1000 
        }}>
           {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setTab(item.id)}
                style={{ 
                  background: 'none', border: 'none', display: 'flex', flexDirection: 'column', 
                  alignItems: 'center', gap: 6, color: tab === item.id ? '#1A1410' : '#B5AFA9',
                  transition: 'color 0.3s', cursor: 'pointer'
                }}
              >
                 <div style={{ 
                   width: 40, height: 40, borderRadius: 12, 
                   background: tab === item.id ? '#1A1410' : 'transparent', 
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   color: tab === item.id ? ac : 'inherit'
                 }}>
                    {item.icon}
                 </div>
                 <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase' }}>{item.label}</span>
              </button>
           ))}
        </div>
      )}

      {/* FEEDBACK LOOP MODAL */}
      {showFeedback && (
        <div className="overlay-modal" style={{ background: 'rgba(26,20,16,0.95)', zIndex: 6000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
           <div className="modal-box" style={{ maxWidth: 500, padding: mob ? 32 : 48, textAlign: 'center', borderRadius: mob ? 24 : 40 }}>
              <Star size={mob ? 48 : 64} color={ac} fill={ac} style={{ marginBottom: 24 }} />
              <h2 className="lxfh" style={{ fontSize: mob ? 24 : 28, marginBottom: 12 }}>Rate the Craftsmanship</h2>
              <p className="lxf" style={{ color: '#B5AFA9', marginBottom: 32, fontSize: 14 }}>Your structural project is now complete. Please share your feedback to help us maintain our industrial excellence.</p>
              <textarea className="p-inp" style={{ height: 100, borderRadius: 16, marginBottom: 24, padding: 16, fontSize: 13 }} placeholder="Message..." />
              <div style={{ display: 'flex', gap: 12 }}>
                 <button onClick={() => setShowFeedback(false)} className="p-btn-light" style={{ flex: 1, height: 48, borderRadius: 12, fontSize: 12 }}>Skip</button>
                 <button onClick={() => { props.notify('success', 'Feedback recorded.'); setShowFeedback(false); }} className="p-btn-dark" style={{ flex: 1, height: 48, borderRadius: 12, background: ac, color: '#1A1410', border: 'none', fontSize: 12 }}>Submit</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
