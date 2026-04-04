import React, { useState, useEffect } from 'react';
import { 
  LogOut, CheckCircle, Download, CreditCard, Send, 
  Calendar, FolderOpen, Check, Lock, X, Printer, Camera,
  Eye, MessageSquare, Image, ThumbsUp, ThumbsDown, Plus, 
  AlertTriangle, FileText, Target, Moon, Sun, ShoppingCart, 
  Truck, Sparkles, Globe
} from 'lucide-react';
import { 
  Av, SBadge, Modal, FF as PFormField, PAv, PSBadge,
  Modal as PModal, Spinner, NotificationBell
} from '../components/Shared';
import PulseTargetCard from '../components/PulseTargetCard';
import MaterialSelector from '../components/MaterialSelector';
import { 
  TEAM_MEMBERS, BOOKING_SLOTS, PROJECT_STAGES
} from '../data';

// --- PAYSTACK PAY MODAL ---
function PaystackPayModal({ invoice, brand, onClose, onSuccess }) {
  const ac = brand.color || '#C8A96E';
  const [step, setStep] = useState('form');
  const [email, setEmail] = useState('');

  const pay = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2500);
  };

  if (step === 'success') {
    return (
      <div className="overlay-modal" onClick={onClose}>
        <div className="modal-box lxf" style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(22,163,74,.1)', border: '2px solid #16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={36} color="#16A34A" />
          </div>
          <h2 className="lxfh">Payment Received</h2>
          <p className="lxf" style={{ color: 'var(--dim)', marginBottom: 24 }}>Transaction successfully processed via Paystack. Invoice {invoice.id} is now cleared.</p>
          <button onClick={() => { onSuccess(invoice.id); onClose(); }} className="p-btn-gold lxf" style={{ width: '100%', padding: '12px' }}>Return to Portal</button>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay-modal" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box lxf" style={{ maxWidth: 480, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
             <div style={{ background: '#09A5DB', width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 800 }}>P</div>
             <h2 className="lxfh" style={{ fontSize: 22 }}>Paystack Checkout</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}><X size={24} /></button>
        </div>

        <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 16, marginBottom: 24, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 6 }}>Payment for {invoice.title}</div>
          <div style={{ fontSize: 36, fontWeight: 300, color: 'var(--fg)' }}>{invoice.amount} <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 400 }}>USD</span></div>
        </div>

        <div style={{ marginBottom: 24 }}>
           <PFormField label="Email Address"><input className="p-inp" placeholder="client@example.com" value={email} onChange={e => setEmail(e.target.value)} /></PFormField>
           <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>Secure processing for Luxespace partners via Paystack.</p>
        </div>

        <button onClick={pay} disabled={step === 'processing'} className="p-btn-dark lxf" style={{ width: '100%', padding: '16px', background: '#000', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          {step === 'processing' ? <><Spinner /> Connecting...</> : <><Lock size={16} /> Pay {invoice.amount}</>}
        </button>
        
        <div style={{ textAlign: 'center', marginTop: 16, opacity: 0.5, fontSize: 11 }}>
           Verified by <b>Paystack</b>
        </div>
      </div>
    </div>
  );
}

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
  const [tab, setTab] = useState('overview');
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

  // Verification Mock (Synced with AdminGovernance.jsx logic)
  const myDeliverables = [
    { id: 'dev1', title: 'Curved Facade Glass', status: 'signed', outcomeStatus: 'pending' },
    { id: 'dev2', title: 'Smart Entry System', status: 'signed', outcomeStatus: 'verified', photoId: 'P101' }
  ];

  // Mock materials synced with Admin state
  const [myMaterials, setMyMaterials] = useState([
    { id: 'mat1', name: 'Bronze Tinted Glass', specs: '12mm Tempered', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', desc: 'Sleek bronze finish for privacy and heat reduction.', status: 'pending' },
    { id: 'mat2', name: 'Black Matte Hinge', specs: 'Heavy-Duty Stainless', imageUrl: 'https://images.unsplash.com/photo-1581094380920-0966f38fe841?w=800&q=80', desc: 'Durable architectural finish matching the facade frame.', status: 'Approved' }
  ]);

  const [payModal, setPayModal] = useState(null);
  const [paidIds, setPaidIds] = useState([]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Target size={16} /> }, 
    { id: 'timeline', label: 'Timeline', icon: <Calendar size={16} /> }, 
    { id: 'materials', label: 'Materials Approval', icon: <Sparkles size={16} /> },
    { id: 'shipments', label: 'Logistics Tracker', icon: <Truck size={16} /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={16} /> },
    { id: 'financials', label: 'Invoices', icon: <FileText size={16} /> }, 
    { id: 'book', label: 'Book a Session', icon: <Calendar size={16} /> }
  ];

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const renderContent = () => {
    switch (tab) {
      case 'overview': {
        const myProj = activeProject;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="p-card" style={{ padding: '40px 32px', background: 'var(--card-bg)', color: 'var(--fg)', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: `linear-gradient(90deg, transparent, ${ac}05)` }} />
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                  <div>
                    <div className="eyebrow" style={{ color: ac, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Target size={14} /> Overall Completion Pulse</div>
                    <div className="lxfh" style={{ fontSize: 64, margin: 0, lineHeight: 1 }}>{calculateProjectPulse(selectedProjectId)}%</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                     <div style={{ fontSize: 11, color: ac, fontWeight: 800 }}>FABRICATION STAGE</div>
                     <div className="lxfh" style={{ fontSize: 24, margin: 0 }}>{PROJECT_STAGES.find(s => s.id === (myProj?.stage || 1))?.name}</div>
                     <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 4 }}>Handover: {props.getSLA(myProj).date}</div>
                  </div>
               </div>

               <div className="prog" style={{ height: 12, background: 'var(--bg)', borderRadius: 10, margin: '24px 0 12px', position: 'relative', zIndex: 2 }}>
                  <div className="prog-f pulse" style={{ width: `${calculateProjectPulse(selectedProjectId)}%`, background: ac, borderRadius: 10 }} />
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24, fontSize: 11, fontWeight: 700, color: 'var(--dim)', position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                     <div style={{ width: 8, height: 8, borderRadius: '50%', background: ac }} /> Fabrication ({myProj.progress}%)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                     <div style={{ width: 8, height: 8, borderRadius: '50%', background: ac }} /> Supply Chain
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                     <div style={{ width: 8, height: 8, borderRadius: '50%', background: ac }} /> Site Readiness
                  </div>
               </div>
            </div>

            {/* PROJECT SCOPE & OUTCOMES */}
            <div className="p-card" style={{ padding: 24, borderLeft: `4px solid ${ac}` }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 className="lxfh" style={{ fontSize: 20 }}>Project Scope & Outcomes</h3>
                  <CheckSquare size={20} color={ac} />
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
                  {myDeliverables.map(d => (
                    <div key={d.id} className="fade-in" style={{ padding: 16, background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                             {d.outcomeStatus === 'verified' ? <CheckCircle size={18} color="#16A34A" /> : <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--border)' }} />}
                             <span style={{ fontSize: 14, fontWeight: 600 }}>{d.title}</span>
                          </div>
                          {d.outcomeStatus === 'verified' && (
                             <div title="Click to view site proof" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, background: `${ac}10`, color: ac, padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800 }}>
                                <Camera size={12} /> PROOF ATTACHED
                             </div>
                          )}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
               <div className="p-card" style={{ padding: 24 }}>
                  <h3 className="lxfh" style={{ fontSize: 20, marginBottom: 16 }}>Upcoming Actions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                     {myMaterials.filter(m => m.status === 'pending').map(m => (
                       <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: 'var(--bg)', borderRadius: 12 }}>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                             <Sparkles size={18} color={ac} />
                             <span style={{ fontSize: 14, fontWeight: 600 }}>Approval needed: {m.name}</span>
                          </div>
                          <button onClick={() => setTab('materials')} className="lxf" style={{ background: 'none', border: 'none', color: ac, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Review Now →</button>
                       </div>
                     ))}
                     {myMaterials.filter(m => m.status === 'pending').length === 0 && <div style={{ fontSize: 14, color: 'var(--dim)' }}>All materials are sorted. You're good to go!</div>}
                  </div>
               </div>
               <div className="p-card pulse-inner" style={{ padding: 24, background: ac, color: '#1A1410', textAlign: 'center' }}>
                  <MessageSquare size={32} style={{ marginBottom: 12 }} />
                  <h4 className="lxfh" style={{ fontSize: 18 }}>Direct Link</h4>
                  <p style={{ fontSize: 13, marginBottom: 16, opacity: 0.8 }}>Talk to your Project Manager instantly.</p>
                  <button className="p-btn-dark" style={{ width: '100%', padding: 12, background: '#1A1410' }}>WhatsApp Support</button>
               </div>
            </div>
          </div>
        );
      }
      case 'materials':
        return (
          <MaterialSelector 
            materials={myMaterials} 
            onApprove={(id) => setMyMaterials(myMaterials.map(m => m.id === id ? { ...m, status: 'Approved' } : m))}
            onReject={(id) => setMyMaterials(myMaterials.map(m => m.id === id ? { ...m, status: 'Rejected' } : m))}
            ac={ac}
          />
        );
      case 'shipments':
        return (
          <div className="p-card" style={{ padding: 32 }}>
            <h3 className="lxfh" style={{ fontSize: 24, marginBottom: 32 }}>Logistics Tracker</h3>
            {myProcurements.filter(p => p.isShipment || p.status === 'Shipped' || p.status === 'Received').map(p => (
              <div key={p.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 32, marginBottom: 32 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{p.item || p.itemName}</div>
                    <div style={{ textAlign: 'right' }}><div style={{ fontSize: 11, color: 'var(--muted)' }}>ETA</div><div style={{ fontWeight: 700, color: ac }}>{p.eta || 'TBD'}</div></div>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: p.signature ? 32 : 0 }}>
                    <div style={{ position: 'absolute', top: 12, left: 0, right: 0, height: 2, background: 'var(--border)' }} />
                    {['Ordered', 'Shipped', 'Customs', 'Transit', 'Ready'].map((st, i) => (
                      <div key={st} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative' }}>
                         <div style={{ width: 24, height: 24, borderRadius: '50%', background: p.status === st || (st === 'Ready' && p.status === 'Received') ? ac : 'var(--bg)', border: `2px solid ${p.status === st || (st === 'Ready' && p.status === 'Received') ? ac : 'var(--border)'}` }} />
                         <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>{st}</span>
                      </div>
                    ))}
                 </div>
                 {p.signature && (
                    <div className="fade-in" style={{ background: 'var(--bg)', padding: 16, borderRadius: 12, border: `1px solid ${ac}30`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div>
                          <div style={{ fontSize: 11, color: ac, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Proof of Site Delivery</div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>Handover Confirmed</div>
                          <div style={{ fontSize: 10, color: 'var(--dim)' }}>Signed on: {new Date(p.handoverAt).toLocaleString()}</div>
                       </div>
                       <div style={{ textAlign: 'right' }}>
                          <img src={p.signature} style={{ height: 64, opacity: 0.9, filter: theme === 'dark' ? 'invert(1) brightness(2)' : 'none' }} alt="signature" />
                          <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '.1em' }}>Digital Receipt</div>
                       </div>
                    </div>
                  )}
                  {p.factoryPhoto && p.status === 'production' && (
                    <div className="fade-in" style={{ marginTop: 16, background: '#1A1410', padding: 20, borderRadius: 16, display: 'flex', gap: 20, alignItems: 'center' }}>
                       <div style={{ width: 80, height: 80, borderRadius: 12, overflow: 'hidden' }}>
                          <img src={p.factoryPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="factory" />
                       </div>
                       <div>
                          <div style={{ fontSize: 10, color: ac, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>Factory Production Evidence</div>
                          <div style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>Manufacturing Process Logged</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 4 }}>Your item is currently being fabricated at our facility.</div>
                       </div>
                    </div>
                  )}
              </div>
            ))}
            {myProcurements.length === 0 && <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 40 }}>No global shipments currently tracked.</div>}
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
                    <button onClick={() => setPayModal(inv)} className="p-btn-gold" style={{ padding: '6px 20px', fontSize: 12, marginTop: 8 }}>Pay with Paystack</button>
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
      default: return null;
    }
  };

  return (
    <div className={`lxf lx-scroll ${theme === 'dark' ? 'dark-theme' : ''}`} style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)' }}>
      <div style={{ background: 'var(--card-bg)', borderBottom: '1px solid var(--border)', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 28 }} /> : <div className="lxfh" style={{ fontSize: 24 }}>{brand.name}</div>}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)', padding: 8 }}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <NotificationBell notifications={props.notifications} onMarkRead={props.markNotificationRead} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <PAv i={client?.av} s={36} c={ac} />
            <div style={{ display: 'none', md: 'block' }}>
               <div style={{ fontSize: 13, fontWeight: 700 }}>{client?.name}</div>
               <div style={{ fontSize: 11, color: 'var(--dim)' }}>{client?.email}</div>
            </div>
          </div>
          <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'var(--dim)', cursor: 'pointer' }}><LogOut size={20} /></button>
        </div>
      </div>

      <div style={{ height: 60, background: 'var(--card-bg)', borderBottom: '1px solid var(--border)', display: 'flex', padding: '0 32px', overflowX: 'auto', gap: 0 }}>
         {tabs.map(t => (
           <button key={t.id} onClick={() => setTab(t.id)} className={`p-tab lxf ${tab === t.id ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              {t.icon} {t.label}
           </button>
         ))}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px' }}>
        {myProjects.length > 1 && (
           <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--dim)' }}>Switch Project:</span>
              <select className="p-inp" style={{ width: 240, border: 'none', background: 'var(--card-bg)', fontSize: 14, fontWeight: 600, color: ac }} value={selectedProjectId} onChange={e => setSelectedProjectId(e.target.value)}>
                 {myProjects.map(p => <option key={p.id} value={p.id}>{p.title || p.project}</option>)}
              </select>
           </div>
        )}
        {renderContent()}
      </div>

      {payModal && <PaystackPayModal invoice={payModal} brand={brand} onClose={() => setPayModal(null)} onSuccess={(id) => { setPaidIds([...paidIds, id]); props.payInvoice(id, selectedProjectId); }} />}
    </div>
  );
}
