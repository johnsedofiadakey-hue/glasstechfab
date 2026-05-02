import React, { useState, useEffect } from 'react';
import { 
  LogOut, CheckCircle, Download, CreditCard, Send, 
  Calendar, FolderOpen, Check, Lock, X, Printer, Camera,
  Eye, MessageSquare, Image, ThumbsUp, ThumbsDown, Plus, 
  AlertTriangle, FileText, Target, Moon, Sun, ShoppingCart, 
  Truck, Sparkles, Globe, CheckSquare, ShieldCheck, User,
  Map, DollarSign, PackageCheck
} from 'lucide-react';
import { 
  Av, SBadge, Modal, FF as PFormField, PAv, PSBadge,
  Modal as PModal, Spinner, NotificationBell
} from '../components/Shared';
import PulseTargetCard from '../components/PulseTargetCard';
import MaterialSelector from '../components/MaterialSelector';
import { 
  TEAM_MEMBERS, BOOKING_SLOTS, PROJECT_STAGES
} from '../data.jsx';
import PaystackPayModal from '../components/PaystackPayModal';

export default function ClientPortal({ client, brand, onLogout, calculateProjectPulse, updateClientProfile, ...props }) {
  const [showPasswordChange, setShowPasswordChange] = useState(client?.requiresPasswordChange);
  const [newPassword, setNewPassword] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('lx-theme') || 'light');
  const [tab, setTab] = useState('hub');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const ac = brand.color || '#C8A96E';
  const { proposals, invoices, procurements, lang, t } = props;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ text: '', rating: 5, projectTitle: '' });
  
  const myProjects = (props.clients || []).filter(c => c.clientIds?.includes(client.id) || c.id === client.id);
  
  useEffect(() => {
    if (myProjects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(myProjects[0].id);
    }
    localStorage.setItem('lx-theme', theme);
  }, [myProjects, selectedProjectId, theme]);

  const activeProject = myProjects.find(p => p.id === selectedProjectId) || myProjects[0];
  const myInvs = (invoices || []).filter(i => i?.parentId === selectedProjectId || i?.projectId === selectedProjectId);
  const myTxs = (props.transactions || []).filter(t => t.parentId === selectedProjectId);
  const myProcurements = (props.procurements || []).filter(p => p.parentId === selectedProjectId);
  const myMedia = (props.media || []).filter(m => m.parentId === selectedProjectId);
  const myMaterials = (props.materials || []).filter(m => m.parentId === selectedProjectId);

  const [payModal, setPayModal] = useState(null);
  const [paidIds, setPaidIds] = useState([]);

  // SIMPLIFIED TABS FOR EASY NAVIGATION
  const tabs = [
    { id: 'hub', label: 'My Journey', icon: <Map size={18} /> }, 
    { id: 'financials', label: 'Payments', icon: <DollarSign size={18} /> }, 
    { id: 'documents', label: 'Documents', icon: <FileText size={18} /> },
    { id: 'gallery', label: 'Site Photos', icon: <Image size={18} /> },
    { id: 'chat', label: 'Help Chat', icon: <MessageSquare size={18} /> },
    { id: 'profile', label: 'My Profile', icon: <User size={18} /> }
  ];

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const renderContent = () => {
    switch (tab) {
      case 'hub': {
        const pulse = calculateProjectPulse(selectedProjectId || activeProject?.id);
        const stages = [
          { id: 1, name: 'ORDER PLACED', icon: '📝', stages: [1,2] },
          { id: 2, name: 'MANUFACTURING', icon: '🏭', stages: [3,4,5,6] },
          { id: 3, name: 'SHIPPING', icon: '🚢', stages: [7,8,9] },
          { id: 4, name: 'INSTALLATION', icon: '✅', stages: [10,11,12] }
        ];
        
        const currentMajorStage = stages.find(s => s.stages.includes(activeProject?.stage || 1)) || stages[0];

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* THE JOURNEY MAP */}
            <div className="p-card" style={{ padding: 32, textAlign: 'center' }}>
               <h2 className="lxfh" style={{ fontSize: 24, marginBottom: 32 }}>Your Project Journey</h2>
               <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
                  <div style={{ position: 'absolute', top: 30, left: 60, right: 60, height: 4, background: 'var(--border)', zIndex: 1 }} />
                  <div style={{ position: 'absolute', top: 30, left: 60, height: 4, background: ac, width: `${((currentMajorStage.id - 1) / 3) * 100}%`, zIndex: 1, transition: 'all 1s ease' }} />
                  
                  {stages.map(s => (
                    <div key={s.id} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                       <div style={{ 
                         width: 60, height: 60, borderRadius: '50%', background: s.id <= currentMajorStage.id ? ac : 'var(--bg)', 
                         border: `4px solid ${s.id <= currentMajorStage.id ? ac : 'var(--border)'}`,
                         display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                         boxShadow: s.id === currentMajorStage.id ? `0 0 20px ${ac}40` : 'none',
                         transition: 'all 0.5s ease'
                       }}>
                         {s.id < currentMajorStage.id ? <Check size={28} color="#fff" /> : s.icon}
                       </div>
                       <div style={{ fontSize: 11, fontWeight: 800, color: s.id <= currentMajorStage.id ? 'var(--fg)' : 'var(--dim)', letterSpacing: '1px' }}>{s.name}</div>
                    </div>
                  ))}
               </div>
               <div style={{ marginTop: 40, padding: 20, background: 'var(--bg-alt)', borderRadius: 16, display: 'inline-block' }}>
                  <span style={{ fontWeight: 800, color: ac }}>STATUS:</span> {activeProject?.status || 'Processing your luxury order...'}
               </div>

               {/* PENDING APPROVALS GATE */}
               {(props.approvals || []).filter(a => a.parentId === activeProject?.id && a.status === 'pending').length > 0 && (
                 <div style={{ marginTop: 32, padding: 24, background: `${ac}10`, border: `1px dashed ${ac}`, borderRadius: 20, textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                       <Sparkles size={20} color={ac} />
                       <div style={{ fontSize: 14, fontWeight: 800 }}>Technical Approval Required</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                       {(props.approvals || []).filter(a => a.parentId === activeProject?.id && a.status === 'pending').map(a => (
                         <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', padding: 16, borderRadius: 12 }}>
                            <div>
                               <div style={{ fontSize: 13, fontWeight: 700 }}>{a.title}</div>
                               <div style={{ fontSize: 11, color: 'var(--dim)' }}>Submitted: {new Date(a.createdAt).toLocaleDateString()}</div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                               <button onClick={() => props.handleApproval(a.id, 'approved')} style={{ background: '#16A34A', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>Approve</button>
                               <button onClick={() => props.handleApproval(a.id, 'rejected')} style={{ background: '#EF4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>Feedback</button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 900 ? '1fr' : '1.5fr 1fr', gap: 24 }}>
                {/* SHOPPING LIST (PROCUREMENT) */}
                <div className="p-card" style={{ padding: 24 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h3 className="lxfh" style={{ fontSize: 18, display: 'flex', alignItems: 'center', gap: 10 }}><PackageCheck size={20} color={ac} /> Material Checklist</h3>
                      <div style={{ fontSize: 11, fontWeight: 800, color: ac }}>{myProcurements.filter(p => p.status === 'Received').length} / {myProcurements.length} ITEMS READY</div>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {myProcurements.length > 0 ? myProcurements.map(p => (
                        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: 'var(--bg)', borderRadius: 12 }}>
                           <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                              <div style={{ width: 40, height: 40, borderRadius: '50%', background: p.status === 'Received' ? '#16A34A20' : '#EAB30820', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                 {p.status === 'Received' ? <CheckCircle size={20} color="#16A34A" /> : <Truck size={20} color="#EAB308" />}
                              </div>
                              <div>
                                 <div style={{ fontSize: 14, fontWeight: 700 }}>{p.itemName || p.item}</div>
                                 <div style={{ fontSize: 11, color: 'var(--dim)' }}>{p.status === 'Received' ? 'Arrived & Verified' : 'In Transit'}</div>
                              </div>
                           </div>
                           <div style={{ fontSize: 12, fontWeight: 800, color: p.status === 'Received' ? '#16A34A' : '#EAB308' }}>{p.status.toUpperCase()}</div>
                        </div>
                      )) : (
                        <div style={{ padding: 40, textAlign: 'center', color: 'var(--dim)', fontSize: 14 }}>Initializing your custom material list...</div>
                      )}
                   </div>
                </div>

                {/* MONEY GAUGE */}
                <div className="p-card" style={{ padding: 24 }}>
                   <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Payment Status</h3>
                   <div style={{ textAlign: 'center', marginBottom: 24 }}>
                      <div style={{ fontSize: 40, fontWeight: 300, color: 'var(--fg)' }}>
                         {invoices.filter(i => (i.parentId === activeProject?.id) && i.status !== 'Paid').length > 0 ? 'Balance Due' : 'Fully Paid'}
                      </div>
                      <div style={{ fontSize: 14, color: ac, fontWeight: 700, marginTop: 4 }}>
                         {invoices.filter(i => (i.parentId === activeProject?.id) && i.status !== 'Paid').reduce((acc, curr) => acc + parseFloat(curr.amount.replace(/[^0-9.]/g, '')), 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} Remaining
                      </div>
                   </div>
                   <div style={{ height: 12, background: 'var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
                      <div style={{ width: '60%', height: '100%', background: '#16A34A' }} />
                   </div>
                   <button onClick={() => setTab('financials')} className="p-btn-gold" style={{ width: '100%', padding: 16 }}>Make a Payment</button>
                </div>
            </div>
          </div>
        );
      }
      case 'financials':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
             <h2 className="lxfh" style={{ fontSize: 24 }}>Payments & Receipts</h2>
             <div className="p-card" style={{ padding: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 16, color: ac }}>UNPAID INVOICES</div>
                {myInvs.filter(i => i.status !== 'Paid' && !paidIds.includes(i.id)).map(inv => (
                  <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottom: '1px solid var(--border)' }}>
                     <div>
                        <div style={{ fontWeight: 700 }}>{inv.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--dim)' }}>Due: {inv.due}</div>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 18, fontWeight: 700 }}>{inv.amount}</div>
                        <button onClick={() => setPayModal(inv)} className="p-btn-gold" style={{ padding: '6px 16px', fontSize: 12, marginTop: 8 }}>Pay Now</button>
                     </div>
                  </div>
                ))}
                {myInvs.filter(i => i.status !== 'Paid').length === 0 && <div style={{ padding: 20, color: '#16A34A', fontWeight: 700 }}>All invoices are paid! Thank you.</div>}
             </div>
          </div>
        );
      case 'profile': {
        const [profileData, setProfileData] = useState({ 
          name: client?.name || '', 
          username: client?.username || '',
          phone: client?.phone || ''
        });
        const [pLoading, setPLoading] = useState(false);

        const handleUpdate = async () => {
          setPLoading(true);
          await updateClientProfile(client.id, profileData);
          setPLoading(false);
        };

        return (
          <div className="p-card" style={{ padding: 32, maxWidth: 600, margin: '0 auto' }}>
             <h2 className="lxfh" style={{ fontSize: 24, marginBottom: 32 }}>My Information</h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="p-form-group">
                   <label style={{ display: 'block', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>FULL NAME</label>
                   <input className="p-inp" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} />
                </div>
                <div className="p-form-group">
                   <label style={{ display: 'block', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>USER ID (USERNAME)</label>
                   <input className="p-inp" value={profileData.username} onChange={e => setProfileData({...profileData, username: e.target.value})} />
                </div>
                <div className="p-form-group">
                   <label style={{ display: 'block', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>PHONE NUMBER</label>
                   <input className="p-inp" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} />
                </div>
                <button onClick={handleUpdate} disabled={pLoading} className="p-btn-gold" style={{ padding: 16, marginTop: 12 }}>
                   {pLoading ? <Spinner /> : 'Save Profile Changes'}
                </button>
             </div>
          </div>
        );
      }
      case 'chat':
        return (
          <div className="p-card" style={{ height: 'calc(100vh - 250px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 20, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
               <PAv i={TEAM_MEMBERS[0].av} s={40} c={ac} />
               <div>
                  <div style={{ fontWeight: 800 }}>{TEAM_MEMBERS[0].name}</div>
                  <div style={{ fontSize: 10, color: '#16A34A' }}>● ONLINE - Project Support</div>
               </div>
            </div>
            <div style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
               {(props.messages || []).filter(m => m.senderId === client.id || m.receiverId === client.id).map((m, i) => (
                 <div key={i} style={{ 
                   alignSelf: m.senderId === client.id ? 'flex-end' : 'flex-start',
                   background: m.senderId === client.id ? ac : 'var(--bg-alt)',
                   color: m.senderId === client.id ? '#fff' : 'var(--fg)',
                   padding: '12px 16px', borderRadius: 16, maxWidth: '80%', fontSize: 14
                 }}>
                   {m.text}
                 </div>
               ))}
            </div>
            <div style={{ padding: 20, borderTop: '1px solid var(--border)', display: 'flex', gap: 12 }}>
               <input id="msgInput" className="p-inp" placeholder="Type here..." style={{ flex: 1 }} onKeyDown={e => { if(e.key === 'Enter' && e.target.value) { props.sendMessage(e.target.value, client.id, 'admin'); e.target.value = ''; }}} />
               <button onClick={() => { const i = document.getElementById('msgInput'); if(i.value) { props.sendMessage(i.value, client.id, 'admin'); i.value = ''; }}} className="p-btn-gold"><Send size={18} /></button>
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
             {myMedia.map(m => (
               <div key={m.id} className="p-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src={m.url} style={{ width: '100%', aspectRatio: '1.2', objectFit: 'cover' }} />
                  <div style={{ padding: 12, fontSize: 11, color: 'var(--dim)' }}>{new Date(m.createdAt).toLocaleDateString()} • {m.stage || 'Site Update'}</div>
               </div>
             ))}
             {myMedia.length === 0 && <div style={{ gridColumn: '1 / -1', padding: 100, textAlign: 'center', color: 'var(--dim)' }}>No project photos uploaded yet.</div>}
          </div>
        );
      case 'documents':
        return (
          <div className="p-card" style={{ padding: 24 }}>
             <h2 className="lxfh" style={{ fontSize: 24, marginBottom: 24 }}>Important Documents</h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {proposals.filter(p => p.projectId === activeProject?.id || p.id === activeProject?.id).map(p => (
                  <div key={p.id} className="doc-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20, background: 'var(--bg)', borderRadius: 12 }}>
                     <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <FileText size={24} color={ac} />
                        <div>
                           <div style={{ fontWeight: 700 }}>{p.title || 'Project Proposal'}</div>
                           <div style={{ fontSize: 11, color: 'var(--dim)' }}>{p.date}</div>
                        </div>
                     </div>
                     <button 
                        onClick={() => {
                          const win = window.open('', '_blank');
                          win.document.write(`
                            <html>
                              <head><title>${p.title}</title></head>
                              <body style="font-family:sans-serif; padding: 40px;">
                                <div style="text-align:center; margin-bottom: 40px;">
                                  <h1 style="color:${ac}">${brand.name}</h1>
                                  <p>${p.type} - ${p.id}</p>
                                </div>
                                <div style="border:1px solid #eee; padding: 20px; border-radius:12px;">
                                  <h3>Project: ${p.title}</h3>
                                  <p>Date: ${p.date}</p>
                                  <p>Status: ${p.status.toUpperCase()}</p>
                                  <hr/>
                                  <div style="font-size: 24px; font-weight: 800; color:${ac}">Amount: ${p.amount}</div>
                                </div>
                                <div style="margin-top:40px; font-size: 10px; opacity:0.5; text-align:center;">
                                  This is an official system-generated document from Glasstech Hub.
                                </div>
                                <script>window.onload = () => { window.print(); window.close(); };</script>
                              </body>
                            </html>
                          `);
                        }} 
                        className="p-btn-light" 
                        style={{ padding: '8px 16px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        <Download size={14} /> View & Print
                      </button>
                  </div>
                ))}
             </div>
          </div>
        );
      default: return null;
    }
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div className={`portal-layout lxf ${theme === 'dark' ? 'dark-theme' : ''}`} style={{ background: 'var(--bg)' }}>
      {/* SIDEBAR (Desktop) */}
      {!isMobile && (
        <div className="portal-sidebar">
          <div style={{ padding: '32px 24px', marginBottom: 20 }}>
             {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 44, objectFit: 'contain' }} /> : <div className="lxfh" style={{ fontSize: 24, fontWeight: 700 }}>GLASSTECH</div>}
          </div>
          <nav style={{ flex: 1 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`portal-sidebar-item ${tab === t.id ? 'active' : ''}`}>
                {t.icon} <span className="n-label">{t.label}</span>
              </button>
            ))}
          </nav>
          <div style={{ padding: 24, borderTop: '1px solid var(--border)' }}>
             <button onClick={toggleTheme} className="portal-sidebar-item" style={{ padding: '12px 0' }}>
               {theme === 'light' ? <><Moon size={18} /> Dark Mode</> : <><Sun size={18} /> Light Mode</>}
             </button>
             <button onClick={onLogout} className="portal-sidebar-item" style={{ padding: '12px 0', color: '#EF4444' }}>
               <LogOut size={18} /> Logout
             </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="portal-content lx-scroll" style={{ paddingBottom: isMobile ? 120 : 40 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 className="lxfh" style={{ fontSize: isMobile ? 24 : 32, margin: 0 }}>{activeProject?.title || 'Project Hub'}</h1>
            <p style={{ color: 'var(--dim)', margin: 0 }}>Welcome back, {client?.name}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
             {myProjects.length > 1 && (
               <select className="p-inp" style={{ width: 180 }} value={selectedProjectId} onChange={e => setSelectedProjectId(e.target.value)}>
                 {myProjects.map(p => <option key={p.id} value={p.id}>{p.title || p.project}</option>)}
               </select>
             )}
             <NotificationBell notifications={props.notifications} onMarkRead={props.markNotificationRead} />
             <PAv i={client?.av} s={40} c={ac} onClick={() => setTab('profile')} />
             {isMobile && <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#EF4444' }}><LogOut size={20} /></button>}
          </div>
        </header>

        <div className="fade-in">
          {renderContent()}
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      {isMobile && (
        <nav className="glass-dock" style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0', background: 'var(--card-bg)', borderTop: '1px solid var(--border)', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
          {tabs.slice(0, 5).map(m => (
            <button key={m.id} onClick={() => setTab(m.id)} style={{ background: 'none', border: 'none', color: tab === m.id ? ac : 'var(--dim)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {m.icon}
              <span style={{ fontSize: 10, fontWeight: 700 }}>{m.label}</span>
            </button>
          ))}
        </nav>
      )}

      {payModal && <PaystackPayModal invoice={payModal} brand={brand} onClose={() => setPayModal(null)} onSuccess={(id) => { setPaidIds([...paidIds, id]); props.payInvoice(id, selectedProjectId, 'Paystack'); }} />}

      {showPasswordChange && (
        <Modal title="Security Initialization" noClose>
           <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Lock size={48} color={ac} style={{ marginBottom: 20 }} />
              <h3 className="lxfh" style={{ fontSize: 24, marginBottom: 12 }}>Securing Your Account</h3>
              <p style={{ color: 'var(--dim)', marginBottom: 32, fontSize: 14 }}>
                 For your security, please update your access password before proceeding to the command center.
              </p>
              <div style={{ textAlign: 'left', marginBottom: 32 }}>
                 <PFormField label="New Access Password">
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="p-inp" placeholder="Min. 8 characters" />
                 </PFormField>
              </div>
              <button 
                 onClick={async () => {
                    if (newPassword.length < 6) return alert("Password too short.");
                    await props.updateUserPassword(client.id, newPassword);
                    await updateClientProfile(client.id, { requiresPasswordChange: false });
                    setShowPasswordChange(false);
                 }} 
                 className="p-btn-gold" 
                 style={{ width: '100%', padding: 20, borderRadius: 16, fontWeight: 800 }}
              >
                 Confirm & Initialize Portal
              </button>
           </div>
        </Modal>
      )}
    </div>
  );
}
