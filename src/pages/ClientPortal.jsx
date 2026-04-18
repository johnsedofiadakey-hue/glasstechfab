import React, { useState, useEffect } from 'react';
import { 
  LogOut, CheckCircle, Download, CreditCard, Send, 
  Calendar, FolderOpen, Check, Lock, X, Printer, Camera,
  Eye, MessageSquare, Image, ThumbsUp, ThumbsDown, Plus, 
  AlertTriangle, FileText, Target, Moon, Sun, ShoppingCart, 
  Truck, Sparkles, Globe, CheckSquare, ShieldCheck
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



// --- CLIENT BOOKING VIEW ---
function ClientBookingView({ brand, bookings, clientEmail }) {
  const ac = brand.color || '#C8A96E';
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [calMonth] = useState(new Date().getMonth());
  const [selDay, setSelDay] = useState(null);
  const [selTime, setSelTime] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="p-card" style={{ padding: 24 }}>
        <h3 className="lxfh" style={{ fontSize: 20, marginBottom: 20 }}>Schedule a Technical Survey</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div className="lxfh" style={{ fontSize: 18 }}>{monthNames[calMonth]} 2026</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {Array(28).fill(0).map((_, i) => (
            <button key={i} onClick={() => setSelDay(i + 1)} style={{ padding: 12, textAlign: 'center', borderRadius: 12, border: 'none', cursor: 'pointer', background: selDay === i + 1 ? ac : 'var(--bg)', color: selDay === i + 1 ? '#fff' : 'var(--fg)', fontWeight: 600 }}>{i + 1}</button>
          ))}
        </div>
      </div>
      {selDay && (
        <div className="p-card fade-in" style={{ padding: 24 }}>
          <div className="lxf" style={{ marginBottom: 16, fontWeight: 700 }}>Choose Time Slot</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {BOOKING_SLOTS.map(t => (
              <button key={t} onClick={() => setSelTime(t)} style={{ padding: 12, borderRadius: 10, border: `2px solid ${selTime === t ? ac : 'var(--border)'}`, background: 'none', color: 'var(--fg)', cursor: 'pointer' }}>{t}</button>
            ))}
          </div>
          <button disabled={!selTime} className="p-btn-gold lxf" style={{ width: '100%', marginTop: 24, padding: 14 }}>Confirm Consultation Appointment</button>
        </div>
      )}
    </div>
  );
}

// --- MAIN CLIENT PORTAL ---
export default function ClientPortal({ client, brand, onLogout, calculateProjectPulse, ...props }) {
  const [theme, setTheme] = useState(localStorage.getItem('lx-theme') || 'light');
  const [tab, setTab] = useState('hub');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const ac = brand.color || '#C8A96E';
  const { proposals, invoices, procurements } = props;
  
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

  const tabs = [
    { id: 'hub', label: 'Dashboard', icon: <Target size={18} /> }, 
    { id: 'timeline', label: 'Milestones', icon: <Calendar size={18} /> }, 
    { id: 'documents', label: 'Document Safe', icon: <FileText size={18} /> },
    { id: 'materials', label: 'Material Center', icon: <Sparkles size={18} /> },
    { id: 'shipments', label: 'Global Tracker', icon: <Truck size={18} /> },
    { id: 'gallery', label: 'Site Media', icon: <Image size={18} /> },
    { id: 'financials', label: 'Finance Hub', icon: <CreditCard size={18} /> }, 
    { id: 'book', label: 'Support', icon: <MessageSquare size={18} /> },
    { id: 'security', label: 'Security', icon: <ShieldCheck size={18} /> }
  ];

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const renderContent = () => {
    switch (tab) {
      case 'hub': {
        const myProj = activeProject;
        const pendingMat = (myMaterials || []).filter(m => m.status === 'pending');
        const activeShip = (myProcurements || []).filter(p => p.isShipment || p.status === 'Shipped').slice(0, 1);
        const nextInv = (myInvs || []).filter(i => i.status !== 'Paid' && !paidIds.includes(i.id))[0];
        const pulse = calculateProjectPulse(selectedProjectId || myProj?.id);

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* KPI GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
               <div className="p-card pulse-card" style={{ padding: 32, background: '#fff', border: '1px solid #F0EBE5' }}>
                  <div className="lxf eyebrow" style={{ fontSize: 10, letterSpacing: '.2em', marginBottom: 12 }}>Production Velocity</div>
                  <div className="lxfh" style={{ fontSize: 44, fontWeight: 300, color: '#121212' }}>{pulse}% <span style={{ fontSize: 14, color: '#B5AFA9', fontWeight: 500 }}>COMPLETE</span></div>
                  <div style={{ height: 4, background: '#F9F7F4', borderRadius: 10, marginTop: 24, overflow: 'hidden' }}>
                     <div style={{ width: `${pulse}%`, height: '100%', background: ac, borderRadius: 10 }} />
                  </div>
               </div>
               <div className="p-card" style={{ padding: 32, background: '#fff', border: '1px solid #F0EBE5' }}>
                  <div className="lxf eyebrow" style={{ fontSize: 10, letterSpacing: '.2em', marginBottom: 12 }}>Current Phase</div>
                  <div className="lxfh" style={{ fontSize: 24, fontWeight: 400, color: '#121212' }}>{PROJECT_STAGES.find(s => s.id === (myProj?.stage || 1))?.name}</div>
                  <p className="lxf" style={{ fontSize: 13, color: '#B5AFA9', marginTop: 12 }}>Handover: <span style={{ color: ac, fontWeight: 700 }}>{props.getSLA?.(myProj).date || 'TBD'}</span></p>
               </div>
               <div className="p-card" style={{ padding: 32, background: '#121212', border: 'none' }}>
                  <div className="lxf eyebrow" style={{ fontSize: 10, letterSpacing: '.2em', marginBottom: 12, color: ac }}>Account Summary</div>
                  <div className="lxfh" style={{ fontSize: 24, color: '#fff', fontWeight: 300 }}>{nextInv ? 'Payment Due' : 'All Settled'}</div>
                  <div className="lxf" style={{ fontSize: 13, color: nextInv ? ac : '#16A34A', fontWeight: 700, marginTop: 12 }}>{nextInv ? nextInv.amount : 'No balance due'}</div>
               </div>
            </div>

            <div className="hub-grid">
               {/* MAIN COLUMN */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {/* LIVE OPERATIONS STATUS */}
                  <div className="p-card" style={{ padding: 24 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 className="lxfh" style={{ fontSize: 18, display: 'flex', alignItems: 'center', gap: 10 }}><Truck size={18} color={ac} /> Operations & Logistics</h3>
                        <button onClick={() => setTab('shipments')} className="lxf" style={{ fontSize: 12, background: 'none', border: 'none', color: ac, cursor: 'pointer', fontWeight: 700 }}>Tracker Hub →</button>
                     </div>
                     {activeShip.length > 0 ? (
                        <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 16, border: '1px solid var(--border)' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                              <div style={{ fontWeight: 700 }}>{activeShip[0].itemName || activeShip[0].item}</div>
                              <div style={{ fontSize: 11, background: ac+'20', color: ac, padding: '4px 8px', borderRadius: 4, fontWeight: 700 }}>{activeShip[0].status.toUpperCase()}</div>
                           </div>
                           <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--dim)' }}>
                              <Globe size={14} /> Origin: {activeShip[0].source}
                              <span style={{ opacity: 0.3 }}>|</span>
                              <Calendar size={14} /> Est: {activeShip[0].eta || 'Pending'}
                           </div>
                        </div>
                     ) : (
                        <div style={{ background: 'var(--bg)', padding: 32, borderRadius: 16, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
                           No active shipments currently in transit.
                        </div>
                     )}
                  </div>

                  {/* ACTION PENDING */}
                  <div className="p-card" style={{ padding: 24 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 className="lxfh" style={{ fontSize: 18, display: 'flex', alignItems: 'center', gap: 10 }}><CheckSquare size={18} color={ac} /> Action Required</h3>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {pendingMat.length > 0 ? pendingMat.map(m => (
                           <div key={m.id} className="glass-matrix" style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                 <div style={{ width: 48, height: 48, borderRadius: 8, background: 'var(--bg)', overflow: 'hidden' }}>
                                    <img src={m.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                 </div>
                                 <div>
                                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.name} Approval</div>
                                    <div style={{ fontSize: 11, color: 'var(--dim)' }}>Technical specification review required</div>
                                 </div>
                              </div>
                              <button onClick={() => setTab('materials')} className="p-btn-gold" style={{ padding: '8px 16px', fontSize: 12, borderRadius: 8 }}>Review Specs</button>
                           </div>
                        )) : (
                           <div style={{ background: 'var(--bg)', padding: 32, borderRadius: 16, textAlign: 'center', color: '#16A34A', fontSize: 14 }}>
                              <CheckCircle size={24} style={{ marginBottom: 8 }} />
                              <div>All item specifications are currently approved.</div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               {/* SIDE COLUMN */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {/* RECENT ACTIVITY FEED */}
                  <div className="p-card" style={{ padding: 24, background: 'var(--bg-alt)' }}>
                     <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <MessageSquare size={18} color={ac} /> Recent Site Activity
                     </h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {(props.notes || []).filter(n => n.parentId === (selectedProjectId || myProj?.id)).slice(0, 5).map(note => (
                           <div key={note.id} style={{ display: 'flex', gap: 12 }}>
                              <div style={{ flexShrink: 0 }}><PAv i={note.author?.[0] || 'A'} s={32} c={ac} /></div>
                              <div>
                                 <div style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--fg)' }}>{note.text}</div>
                                 <div style={{ fontSize: 10, color: 'var(--dim)', marginTop: 4 }}>{new Date(note.createdAt).toLocaleDateString()} • {note.author || 'Project Lead'}</div>
                              </div>
                           </div>
                        ))}
                        {(props.notes || []).filter(n => n.parentId === (selectedProjectId || myProj?.id)).length === 0 && (
                           <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 12 }}>
                              No recent updates posted.
                           </div>
                        )}
                     </div>
                  </div>

                  {/* FINANCIAL PULSE */}
                  <div className="p-card" style={{ padding: 24 }}>
                     <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Account Summary</h3>
                     {nextInv ? (
                        <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: 24, borderRadius: 16, textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                           <div style={{ fontSize: 32, fontWeight: 300, marginBottom: 4, fontFamily: 'var(--font-h)' }}>{nextInv.amount}</div>
                           <div style={{ fontSize: 11, color: '#EF4444', fontWeight: 700, textTransform: 'uppercase', marginBottom: 20 }}>Payment Outstanding</div>
                           <button onClick={() => setPayModal(nextInv)} className="p-btn-dark lxf" style={{ width: '100%', padding: '14px', borderRadius: 10 }}>Complete Checkout</button>
                        </div>
                     ) : (
                        <div style={{ background: 'rgba(22, 163, 74, 0.05)', padding: 24, borderRadius: 16, textAlign: 'center', border: '1px solid rgba(22, 163, 74, 0.1)' }}>
                           <CheckCircle size={32} color="#16A34A" style={{ marginBottom: 12 }} />
                           <div style={{ fontSize: 15, fontWeight: 700, color: '#16A34A' }}>Account Up to Date</div>
                        </div>
                     )}
                     <button onClick={() => setTab('financials')} className="lxf" style={{ width: '100%', marginTop: 16, background: 'none', border: 'none', fontSize: 12, color: ac, fontWeight: 700, cursor: 'pointer' }}>View Transaction History →</button>
                  </div>

                  {/* PROJECT TEAM */}
                  <div className="p-card" style={{ padding: 24, background: '#1A1410', color: '#fff' }}>
                     <h3 className="lxfh" style={{ fontSize: 16, marginBottom: 20, color: ac }}>Assigned Expert</h3>
                     <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                        <PAv i={TEAM_MEMBERS[0].av} s={52} c={ac} />
                        <div>
                           <div style={{ fontWeight: 800, fontSize: 15 }}>{TEAM_MEMBERS[0].name}</div>
                           <div style={{ fontSize: 12, opacity: 0.6 }}>Project Architect</div>
                        </div>
                     </div>
                     <button className="p-btn-dark" style={{ width: '100%', padding: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 13 }}>Send Message</button>
                  </div>
               </div>
            </div>
          </div>
        );
      }
      case 'documents': {
        const myProjProposals = proposals.filter(p => p.projectId === selectedProjectId || p.id === activeProject?.id);
        const myProjInvoices = myInvs;

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div className="p-card" style={{ padding: 32 }}>
               <h2 className="lxfh" style={{ fontSize: 24, marginBottom: 8 }}>Document Safe</h2>
               <p style={{ color: 'var(--dim)', marginBottom: 32 }}>Secure access to all project proposals, contracts, and financial receipts.</p>

               <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="eyebrow" style={{ color: ac, fontSize: 11, fontWeight: 800 }}>PROPOSALS & CONTRACTS</div>
                  {myProjProposals.length > 0 ? myProjProposals.map(p => (
                    <div key={p.id} className="doc-card">
                       <div className="doc-icon"><FileText size={20} /></div>
                       <div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{p.title || 'Project Proposal'}</div>
                          <div style={{ fontSize: 12, color: 'var(--dim)' }}>Issued: {p.date || 'TBD'} • Status: <SBadge s={p.status} /></div>
                       </div>
                       <button className="glass-btn" style={{ padding: '8px 16px', fontSize: 12 }}>View Document</button>
                    </div>
                  )) : <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>No proposals found for this project.</div>}

                  <div className="eyebrow" style={{ color: ac, fontSize: 11, fontWeight: 800, marginTop: 24 }}>FINANCIAL INVOICES</div>
                  {myProjInvoices.length > 0 ? myProjInvoices.map(i => (
                    <div key={i.id} className="doc-card">
                       <div className="doc-icon"><CreditCard size={20} /></div>
                       <div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{i.title}</div>
                          <div style={{ fontSize: 12, color: 'var(--dim)' }}>Due: {i.due} • Amount: {i.amount}</div>
                       </div>
                       <div style={{ display: 'flex', gap: 8 }}>
                          <PAv i={<Download size={14} />} s={32} />
                          {i.status !== 'Paid' && <button onClick={() => setPayModal(i)} className="p-btn-gold" style={{ padding: '4px 12px', fontSize: 11 }}>Pay Now</button>}
                       </div>
                    </div>
                  )) : <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>No invoices issued yet.</div>}
               </div>
            </div>
          </div>
        );
      }

      case 'materials':
        return (
          <MaterialSelector 
            materials={myMaterials} 
            onApprove={(id) => props.updateMaterial(selectedProjectId, id, { status: 'Approved' })}
            onReject={(id) => props.updateMaterial(selectedProjectId, id, { status: 'Rejected' })}
            ac={ac}
          />
        );
      case 'shipments':
        return (
          <div className="p-card" style={{ padding: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
               <div>
                  <h3 className="lxfh" style={{ fontSize: 28, margin: 0 }}>Global Logistics Tracker</h3>
                  <p style={{ color: 'var(--dim)', margin: '8px 0 0' }}>Real-time oversight of your architectural imports and local procurement.</p>
               </div>
               <div style={{ background: ac+'10', color: ac, padding: '12px 20px', borderRadius: 12, border: '1px solid '+ac+'20', textAlign: 'right' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em' }}>Active Shipments</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{myProcurements.filter(p => (p.isShipment || p.status === 'Shipped') && p.status !== 'Received').length}</div>
               </div>
            </div>

            {myProcurements.filter(p => p.isShipment || p.status === 'Shipped' || p.status === 'Received').map(p => (
              <div key={p.id} className="glass-matrix" style={{ padding: 32, marginBottom: 24, border: '1px solid var(--border)' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                       <div style={{ width: 56, height: 56, background: '#1A1410', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Truck size={24} color={ac} />
                       </div>
                       <div>
                          <div style={{ fontSize: 20, fontWeight: 800 }}>{p.item || p.itemName}</div>
                          <div style={{ fontSize: 12, color: 'var(--dim)' }}>Ref: {p.id} • Container: {p.container || 'Internal'}</div>
                       </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 800 }}>ESTIMATED HANDOVER</div>
                       <div style={{ fontSize: 18, fontWeight: 700, color: ac }}>{p.eta || 'Calculating...'}</div>
                    </div>
                 </div>

                 {/* VISUAL TRACKER */}
                 <div style={{ position: 'relative', height: 40, marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'absolute', top: '50%', left: 24, right: 24, height: 2, background: 'var(--border)', zIndex: 1 }} />
                    <div style={{ position: 'absolute', top: '50%', left: 24, right: 24, height: 2, background: ac, width: p.status === 'Received' ? '100%' : (p.status === 'Transit' ? '75%' : (p.status === 'Shipped' ? '50%' : '25%')), zIndex: 2, transition: 'width 1s ease' }} />
                    
                    {['Ordered', 'Shipped', 'Customs', 'Transit', 'Ready'].map((st) => {
                       const isDone = (p.status === 'Received' || st === p.status || (p.status === 'Transit' && (st === 'Ordered' || st === 'Shipped' || st === 'Customs')) || (p.status === 'Shipped' && (st === 'Ordered')));
                       return (
                        <div key={st} style={{ position: 'relative', zIndex: 3, background: 'var(--bg)', padding: '0 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                           <div style={{ width: 14, height: 14, borderRadius: '50%', background: isDone ? ac : 'var(--bg)', border: `3px solid ${isDone ? ac : 'var(--border)'}`, boxShdow: isDone ? `0 0 10px ${ac}60` : 'none' }} />
                           <span style={{ fontSize: 10, fontWeight: isDone ? 700 : 500, color: isDone ? 'var(--fg)' : 'var(--muted)', textTransform: 'uppercase' }}>{st}</span>
                        </div>
                       );
                    })}
                 </div>

                 {p.signature && (
                    <div style={{ background: 'rgba(22,163,74,0.05)', padding: 20, borderRadius: 12, border: '1px solid rgba(22,163,74,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                          <CheckCircle size={20} color="#16A34A" />
                          <div>
                             <div style={{ fontSize: 13, fontWeight: 700 }}>Confirmed Site Delivery</div>
                             <div style={{ fontSize: 11, color: 'var(--dim)' }}>Handed over to client agent at site coordinates.</div>
                          </div>
                       </div>
                       <img src={p.signature} style={{ height: 48, filter: theme === 'dark' ? 'invert(1)' : 'none' }} alt="sig" />
                    </div>
                 )}

                 {p.factoryPhoto && p.status === 'production' && (
                    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 200, marginTop: 12 }}>
                       <img src={p.factoryPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', alignItems: 'flex-end', padding: 20 }}>
                          <div>
                             <div style={{ fontSize: 10, fontWeight: 800, color: ac, textTransform: 'uppercase' }}>Factory Insight</div>
                             <div style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>Manufacturing verification photo logged</div>
                          </div>
                       </div>
                    </div>
                 )}
              </div>
            ))}
            {myProcurements.length === 0 && <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 80 }}>Secure procurement systems are active. No shipments currently tracked.</div>}
          </div>
        );
      case 'timeline':
        return (
          <div className="p-card" style={{ padding: 32 }}>
            <h3 className="lxfh" style={{ fontSize: 24, marginBottom: 32 }}>Project Roadmap</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               {PROJECT_STAGES.map(s => {
                 const isDone = (activeProject?.stage || 1) > s.id;
                 const isCur = (activeProject?.stage || 1) === s.id;
                 return (
                   <div key={s.id} style={{ display: 'flex', gap: 20, opacity: isDone || isCur ? 1 : 0.4 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: isDone ? s.color : 'none', border: `2px solid ${isDone || isCur ? s.color : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {isDone ? <Check size={16} color="#fff" /> : isCur ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} /> : null}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: isCur ? 700 : 500 }}>{s.name}</div>
                   </div>
                 );
               })}
            </div>
          </div>
        );
      case 'financials':
        return (
          <div className="p-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
             <div className="eyebrow" style={{ color: ac, opacity: 0.8 }}>Pending Invoices</div>
             {myInvs.filter(inv => inv.status !== 'Paid' && !paidIds.includes(inv.id)).map(inv => (
               <div key={inv.id} className="p-card" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{inv.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>Due Date: {inv.due}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 24, fontWeight: 300 }}>{inv.amount}</div>
                    <button onClick={() => setPayModal(inv)} className="p-btn-gold" style={{ padding: '6px 20px', fontSize: 12, marginTop: 8 }}>Secure Checkout</button>
                  </div>
               </div>
             ))}
             
             {myInvs.filter(i => i.status !== 'Paid').length === 0 && <div className="lxf" style={{ padding: 20, color: 'var(--dim)', textAlign: 'center' }}>No outstanding invoices.</div>}

             <div className="eyebrow" style={{ color: ac, opacity: 0.8, marginTop: 24 }}>Payment History & Audit Trail</div>
             <div className="p-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                   <thead style={{ background: 'var(--bg)' }}>
                      <tr>{['Date', 'Reference', 'Method', 'Amount'].map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>{h}</th>)}</tr>
                   </thead>
                   <tbody>
                      {myTxs.map(tx => (
                        <tr key={tx.id} style={{ borderTop: '1px solid var(--border)' }}>
                           <td style={{ padding: '14px 16px', fontSize: 13 }}>{tx.date}</td>
                           <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--dim)' }}>{tx.invoiceId || 'Offline'}</td>
                           <td style={{ padding: '14px 16px' }}><SBadge s={tx.method.toUpperCase()} /></td>
                           <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: '#16A34A' }}>${parseFloat(tx.amount).toLocaleString()}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
                {myTxs.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>No payment history recorded yet.</div>}
             </div>
          </div>
        );
      case 'gallery':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
             {myMedia.map(m => (
               <div key={m.id} className="p-card" style={{ padding: 0 }}>
                  <img src={m.url} style={{ width: '100%', aspectRatio: '1.2', objectFit: 'cover' }} alt="prop" />
               </div>
             ))}
             {myMedia.length === 0 && <div style={{ gridColumn: '1 / -1', padding: 100, textAlign: 'center', color: 'var(--muted)' }}>Photos will appear here as site work begins.</div>}
          </div>
        );
      case 'book':
        return <ClientBookingView brand={brand} clientEmail={client.email} />;
      case 'security':
        return (
          <div className="p-card fade-in" style={{ padding: 48, maxWidth: 600, margin: '0 auto' }}>
             <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: `${ac}15`, color: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                   <ShieldCheck size={32} />
                </div>
                <h2 className="lxfh" style={{ fontSize: 24, fontWeight: 700, color: '#1A1410' }}>Account Security</h2>
                <p className="lxf" style={{ fontSize: 14, color: '#B5AFA9', marginTop: 8 }}>Manage your access credentials and primary contact</p>
             </div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ padding: 24, background: 'var(--bg-alt)', borderRadius: 16, border: `1px solid var(--border)` }}>
                   <div className="lxf" style={{ fontSize: 11, fontWeight: 700, color: ac, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Verified WhatsApp Key</div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="lxfh" style={{ fontSize: 18 }}>{client.phone || 'Not Verified'}</div>
                      <div className="lxf" style={{ fontSize: 11, background: '#16A34A15', color: '#16A34A', padding: '4px 10px', borderRadius: 4, fontWeight: 700 }}>VERIFIED</div>
                   </div>
                   <p className="lxf" style={{ fontSize: 12, color: 'var(--dim)', marginTop: 12 }}>This number is used for all one-time password (OTP) authorizations.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                   <PFormField label="Login Email (Alias)"><input className="p-inp" value={client.email} disabled /></PFormField>
                   <PFormField label="Change Backup Password"><input className="p-inp" type="password" placeholder="Enter new password" /></PFormField>
                   <button className="p-btn-gold" style={{ padding: '14px', marginTop: 12 }}>Update Security Profile</button>
                </div>
             </div>
          </div>
        );
      default: return null;
    }
  };

  const isMobile = window.innerWidth <= 768;
  const mobileTabs = [
    { id: 'hub', label: 'Home', icon: <Target size={20} /> },
    { id: 'timeline', label: 'Roadmap', icon: <Calendar size={20} /> },
    { id: 'financials', label: 'Finance', icon: <CreditCard size={20} /> },
    { id: 'book', label: 'Support', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className={`portal-layout lxf ${theme === 'dark' ? 'dark-theme' : ''}`} style={{ transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)', background: 'var(--bg)' }}>
      {/* SIDEBAR (Desktop) */}
      {!isMobile && (
        <div className="portal-sidebar">
          <div style={{ padding: '32px 24px', marginBottom: 20 }}>
             {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 28 }} /> : <div className="lxfh" style={{ fontSize: 24, fontWeight: 700 }}>{brand.name}</div>}
          </div>

          <nav style={{ flex: 1 }}>
            {tabs.map(t => (
              <button 
                key={t.id} 
                onClick={() => setTab(t.id)} 
                className={`portal-sidebar-item ${tab === t.id ? 'active' : ''}`}
              >
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
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'center' : 'center', 
          marginBottom: isMobile ? 24 : 40,
          background: isMobile ? 'var(--bg)' : 'transparent',
          position: isMobile ? 'sticky' : 'static',
          top: 0,
          zIndex: 100,
          padding: isMobile ? '12px 0' : 0
        }}>
          <div>
            <h1 className="lxfh" style={{ fontSize: isMobile ? 24 : 32, margin: 0 }}>Project Hub</h1>
            {!isMobile && <p style={{ color: 'var(--dim)', margin: 0 }}>Welcome back, {client?.name}</p>}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20 }}>
            {myProjects.length > 1 && !isMobile && (
              <select className="p-inp" style={{ width: 220, background: 'var(--card-bg)' }} value={selectedProjectId} onChange={e => setSelectedProjectId(e.target.value)}>
                {myProjects.map(p => <option key={p.id} value={p.id}>{p.title || p.project}</option>)}
              </select>
            )}
            <NotificationBell notifications={props.notifications} onMarkRead={props.markNotificationRead} />
            <div onClick={() => setTab('security')} style={{ cursor: 'pointer' }}>
               <PAv i={client?.av} s={isMobile ? 32 : 40} c={ac} />
            </div>
            {isMobile && <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#EF4444' }}><LogOut size={20} /></button>}
          </div>
        </header>

        <div className="fade-in">
          {renderContent()}
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      {isMobile && (
        <nav className="p-mobile-nav" style={{ 
          position: 'fixed', bottom: 0, left: 0, right: 0, height: 80, 
          background: 'var(--bg)', borderTop: '1px solid var(--border)', 
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          paddingBottom: 'env(safe-area-inset-bottom)', zIndex: 3000,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.05)'
        }}>
          {mobileTabs.map(m => (
            <button 
              key={m.id} 
              onClick={() => setTab(m.id)} 
              style={{ 
                background: 'none', border: 'none', display: 'flex', flexDirection: 'column', 
                alignItems: 'center', gap: 4, color: tab === m.id ? ac : 'var(--muted)',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ 
                width: 44, height: 44, borderRadius: 12, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: tab === m.id ? `${ac}15` : 'transparent'
              }}>
                {m.icon}
              </div>
              <span style={{ fontSize: 10, fontWeight: tab === m.id ? 700 : 500 }}>{m.label}</span>
            </button>
          ))}
        </nav>
      )}

      {payModal && <PaystackPayModal invoice={payModal} brand={brand} onClose={() => setPayModal(null)} onSuccess={(id) => { setPaidIds([...paidIds, id]); props.payInvoice(id, selectedProjectId, 'Paystack'); }} />}
    </div>
  );
}


