import React, { useState, useEffect } from 'react';
import { 
  LogOut, CheckCircle, Download, CreditCard, Send, 
  Calendar, FolderOpen, Check, Lock, X, Printer, Camera,
  Eye, MessageSquare, Image, ThumbsUp, ThumbsDown, Plus, AlertTriangle, FileText
} from 'lucide-react';
import { 
  Av, SBadge, Modal, FF as PFormField, PAv, PSBadge,
  Modal as PModal, Spinner, NotificationBell
} from '../components/Shared';
import PulseTargetCard from '../components/PulseTargetCard';
import { 
  TEAM_MEMBERS, BOOKING_SLOTS, PROJECT_STAGES
} from '../data';

// --- STRIPE PAY MODAL ---
function StripePayModal({ invoice, brand, onClose, onSuccess }) {
  const ac = brand.color || '#C8A96E';
  const [step, setStep] = useState('form');
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvv: '' });

  const pay = () => {
    setStep('processing');
    setTimeout(() => {
        setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="overlay-modal" onClick={onClose}>
        <div className="modal-box lxf" style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(22,163,74,.1)', border: '2px solid #16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={36} color="#16A34A" />
          </div>
          <h2 className="lxfh">Payment Successful</h2>
          <p className="lxf" style={{ color: '#7A6E62', marginBottom: 24 }}>Thank you for your payment. Your invoice {invoice.id} is now marked as paid.</p>
          <button onClick={() => { onSuccess(invoice.id); onClose(); }} className="p-btn-gold lxf" style={{ width: '100%', padding: '12px' }}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay-modal" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box lxf" style={{ maxWidth: 480 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 className="lxfh" style={{ fontSize: 24 }}>Secure Payment</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B5AFA9' }}><X size={20} /></button>
        </div>
        <div style={{ background: '#F9F7F4', padding: 16, borderRadius: 10, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: '#B5AFA9', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>Amount Due</div>
          <div style={{ fontSize: 32, fontWeight: 300, color: '#1A1410' }}>{invoice.amount}</div>
        </div>
        <PFormField label="Cardholder Name"><input className="p-inp" placeholder="John Doe" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} /></PFormField>
        <PFormField label="Card Number"><input className="p-inp" placeholder="4242 4242 4242 4242" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} /></PFormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <PFormField label="Expiry"><input className="p-inp" placeholder="MM/YY" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} /></PFormField>
          <PFormField label="CVV"><input className="p-inp" placeholder="123" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} /></PFormField>
        </div>
        <button onClick={pay} disabled={step === 'processing'} className="p-btn-gold lxf" style={{ width: '100%', padding: '14px', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {step === 'processing' ? <><Spinner /> Processing...</> : <><Lock size={16} /> Pay {invoice.amount}</>}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, opacity: .5 }}>
          <CreditCard size={14} /> <span style={{ fontSize: 11 }}>Secure 256-bit SSL Encrypted Payment</span>
        </div>
      </div>
    </div>
  );
}

// --- CLIENT BOOKING VIEW ---
function ClientBookingView({ brand, bookings, clientEmail, clientName }) {
  const ac = brand.color || '#C8A96E';
  const myBookings = bookings.filter(b => b.clientEmail === clientEmail);
  const [step, setStep] = useState('calendar');
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [selDay, setSelDay] = useState(null);
  const [selTime, setSelTime] = useState('');
  const [selType, setSelType] = useState('Design Consultation');

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const types = ['Discovery Call', 'Design Consultation', 'Progress Review', 'Material Selection', 'Site Visit'];
  const today = new Date();

  if (step === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(22,163,74,.1)', border: '2px solid #16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><CheckCircle size={32} color="#16A34A" /></div>
        <h2 className="lxfh">Request Sent!</h2>
        <p className="lxf" style={{ color: '#7A6E62' }}>We'll confirm your {selType} on {monthNames[calMonth]} {selDay} shortly.</p>
        <button onClick={() => setStep('calendar')} className="p-btn-gold lxf" style={{ marginTop: 24, padding: '10px 24px' }}>Done</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="p-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <button onClick={() => setCalMonth(m => m === 0 ? 11 : m - 1)} style={{ background: 'none', border: '1px solid #efefef', borderRadius: 6, width: 32, height: 32 }}>‹</button>
          <div className="lxfh" style={{ fontSize: 20 }}>{monthNames[calMonth]} {calYear}</div>
          <button onClick={() => setCalMonth(m => m === 11 ? 0 : m + 1)} style={{ background: 'none', border: '1px solid #efefef', borderRadius: 6, width: 32, height: 32 }}>›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {Array(31).fill(0).map((_, i) => (
            <div key={i} onClick={() => setSelDay(i + 1)} style={{ padding: 10, textAlign: 'center', borderRadius: 8, cursor: 'pointer', background: selDay === i + 1 ? ac : 'transparent', color: selDay === i + 1 ? '#fff' : '#1A1410' }}>{i + 1}</div>
          ))}
        </div>
      </div>
      {selDay && (
        <div className="p-card" style={{ padding: 24 }}>
          <div className="eyebrow lxf" style={{ marginBottom: 16 }}>Available Times</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {BOOKING_SLOTS.slice(0, 6).map(t => (
              <button key={t} onClick={() => setSelTime(t)} style={{ padding: 12, borderRadius: 8, border: `1px solid ${selTime === t ? ac : '#efefef'}`, background: selTime === t ? `${ac}10` : 'white', cursor: 'pointer' }}>{t}</button>
            ))}
          </div>
          <button disabled={!selTime} onClick={() => setStep('success')} className="p-btn-gold lxf" style={{ width: '100%', marginTop: 24, padding: 14 }}>Request Booking</button>
        </div>
      )}
    </div>
  );
}

// --- MAIN CLIENT PORTAL ---
export default function ClientPortal({ client, brand, onLogout, ...props }) {
  const [tab, setTab] = useState('overview');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const ac = brand.color || '#C8A96E';
  const { proposals, invoices, bookings, procurements } = props;
  
  const myProjects = (props.clients || []).filter(c => c.clientIds?.includes(client.id) || c.id === client.id);
  
  useEffect(() => {
    if (myProjects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(myProjects[0].id);
    }
  }, [myProjects, selectedProjectId]);

  const activeProject = myProjects.find(p => p.id === selectedProjectId) || myProjects[0];

  const myProps = (proposals || []).filter(p => p?.projectId === selectedProjectId || p?.clientEmail === client?.email);
  const myInvs = (invoices || []).filter(i => i?.parentId === selectedProjectId || i?.projectId === selectedProjectId);
  const myProcurements = (procurements || []).filter(p => p.parentId === selectedProjectId);
  const myNotes = (props.notes || []).filter(n => n.parentId === selectedProjectId && n.is_client_visible);
  const myMedia = (props.media || []).filter(m => m.parentId === selectedProjectId);
  
  const [payModal, setPayModal] = useState(null);
  const [paidIds, setPaidIds] = useState([]);
  const [crModal, setCrModal] = useState(false);
  const [crData, setCrData] = useState({ description: '' });

  const handlePay = (id) => {
    props.payInvoice(id, selectedProjectId);
    setPaidIds(prev => [...prev, id]);
  };

  const tabs = [
    ['overview', 'Overview'], 
    ['project', 'Timeline'], 
    ['shipments', 'Shipments'],
    ['updates', 'Updates'],
    ['gallery', 'Gallery'],
    ['governance', 'Governance'],
    ['proposals', 'Proposals'], 
    ['invoices', 'Invoices'], 
    ['book', 'Book a Session']
  ];

  const handleBooking = async (details) => {
    await props.createBooking({ 
      ...details, 
      client_email: client.email, 
      client_name: client.name,
      status: 'Pending'
    });
  };

  const renderContent = () => {
    switch (tab) {
      case 'overview': {
        const myProj = activeProject;
        const totalBudget = parseFloat(myProj?.budget?.replace(/[$,]/g, '') || 0);
        const paidAmount = (myInvs || []).filter(i => i.status === 'Paid').reduce((a, b) => a + parseFloat(b.amount?.replace(/[$,]/g, '') || 0), 0);
        const currentStage = PROJECT_STAGES.find(s => s.id === (myProj?.stage || 1));
        const nextStage = PROJECT_STAGES.find(s => s.id === (myProj?.stage || 1) + 1);
        const pendingApprovals = (props.approvals || []).filter(a => a.parentId === myProj?.id && a.status === 'pending');
        const pendingInvoices = (myInvs || []).filter(i => i.status === 'Pending');

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* 1. TOP SECTION: CURRENT STAGE & PROGRESS */}
            <div className="p-card" style={{ padding: '32px 24px', background: '#1A1410', color: '#fff', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Target size={200} color={ac} /></div>
              <div className="pulse-inner">
                <div className="eyebrow" style={{ color: ac, marginBottom: 12 }}>Current Status</div>
                <h1 className="lxfh" style={{ fontSize: 'clamp(32px, 8vw, 48px)', color: '#fff', marginBottom: 16 }}>{currentStage?.name}</h1>
                
                <div className="prog" style={{ height: 10, background: 'rgba(255,255,255,0.1)', marginBottom: 12 }}>
                  <div className="prog-f" style={{ width: `${myProj?.progress || 0}%`, background: ac }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
                  <span>{myProj?.progress || 0}% Complete</span>
                  <span style={{ color: ac }}>Target: {props.getSLA(myProj).date}</span>
                </div>
              </div>
            </div>

            {/* 2. DYNAMIC STATUS SUMMARY */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
               <div className="p-card" style={{ padding: 20, borderLeft: `4px solid ${ac}` }}>
                  <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 4 }}>What’s happening now</div>
                  <div className="lxf" style={{ fontSize: 15, fontWeight: 500, color: '#1A1410' }}>Your project is currently in the <b>{currentStage?.name}</b> phase. Our team is finalizing technical requirements.</div>
               </div>
               <div className="p-card" style={{ padding: 20, borderLeft: `4px solid #1A1410` }}>
                  <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 4 }}>What you need to do next</div>
                  <div className="lxf" style={{ fontSize: 15, fontWeight: 500, color: '#1A1410' }}>
                    {pendingApprovals.length > 0 ? `Please approve ${pendingApprovals.length} pending materials.` : 
                     pendingInvoices.length > 0 ? `Awaiting payment for invoice ${pendingInvoices[0].id}.` : 
                     nextStage ? `Next step: ${nextStage.name}` : "Sit back and relax while we work."}
                  </div>
                  {(pendingApprovals.length > 0 || pendingInvoices.length > 0) && (
                    <button onClick={() => setTab(pendingApprovals.length > 0 ? 'governance' : 'invoices')} className="lxf" style={{ marginTop: 10, background: 'none', border: 'none', color: ac, fontWeight: 700, fontSize: 12, cursor: 'pointer', padding: 0 }}>Review Actions →</button>
                  )}
               </div>
            </div>

            {/* 3. PAYMENT VISIBILITY - DYNAMIC MILESTONES */}
            <div className="p-card" style={{ padding: 24 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 className="lxfh" style={{ fontSize: 20 }}>Payment Visibility</h3>
                  <div className="lxfh" style={{ fontSize: 18, color: ac }}>Total: ${totalBudget.toLocaleString()}</div>
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
                  {(activeProject?.milestones || [
                    { label: 'Deposit', amount: totalBudget * 0.4, status: paidAmount >= totalBudget * 0.4 ? 'Paid' : 'Pending' },
                    { label: 'Production', amount: totalBudget * 0.4, status: paidAmount >= totalBudget * 0.8 ? 'Paid' : 'Pending' },
                    { label: 'Final', amount: totalBudget * 0.2, status: paidAmount >= totalBudget ? 'Paid' : 'Pending' }
                  ]).map((m, i) => (
                    <div key={i} style={{ background: '#F9F7F4', padding: 16, borderRadius: 12, textAlign: 'center', border: m.status === 'Paid' ? `1px solid rgba(22,163,74,0.1)` : '1px solid transparent' }}>
                       <div style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 4 }}>{m.label}</div>
                       <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>${(parseFloat(m.amount) || 0).toLocaleString()}</div>
                       <div style={{ fontSize: 10, fontWeight: 800, color: m.status === 'Paid' ? '#16A34A' : '#B45309' }}>
                         {m.status?.toUpperCase() || 'PENDING'}
                       </div>
                    </div>
                  ))}
               </div>

               <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', background: '#1A1410', borderRadius: 12, color: '#fff' }}>
                  <div>
                    <div style={{ fontSize: 11, opacity: 0.6, textTransform: 'uppercase' }}>Total Paid</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#16A34A' }}>${paidAmount.toLocaleString()}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, opacity: 0.6, textTransform: 'uppercase' }}>Outstanding Balance</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: ac }}>${(totalBudget - paidAmount).toLocaleString()}</div>
                  </div>
               </div>
            </div>

            {/* 4. MEDIA GALLERY PREVIEW */}
            <div className="p-card" style={{ padding: 24 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 className="lxfh" style={{ fontSize: 20 }}>Project Media</h3>
                  <button onClick={() => setTab('gallery')} style={{ background: 'none', border: 'none', color: ac, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>View All Gallery</button>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {myMedia.slice(0, 4).map(m => (
                    <div key={m.id} style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '1', position: 'relative' }}>
                       <img src={m.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="progress" />
                       <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 8, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', color: '#fff', fontSize: 10 }}>{PROJECT_STAGES.find(s => s.id === m.stageId)?.name}</div>
                    </div>
                  ))}
                  {myMedia.length === 0 && Array(4).fill(0).map((_, i) => (
                    <div key={i} style={{ borderRadius: 12, background: '#F9F7F4', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Image size={24} color="#D0CCC6" /></div>
                  ))}
               </div>
            </div>
          </div>
        );
      }
      case 'project': 
        return (
          <div className="p-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
               <h3 className="lxfh" style={{ fontSize: 24 }}>Project Timeline</h3>
               <div style={{ fontSize: 14, color: ac, fontWeight: 600 }}>{activeProject?.title}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               {PROJECT_STAGES.map((s, idx) => {
                 const isCurrent = (activeProject?.stage || 1) === s.id;
                 const isPast = (activeProject?.stage || 1) > s.id;
                 return (
                   <div key={s.id} style={{ display: 'flex', gap: 20, opacity: isPast || isCurrent ? 1 : 0.4 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: isPast ? s.color : isCurrent ? '#fff' : '#f0f0f0', border: `2px solid ${isCurrent || isPast ? s.color : '#ddd'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {isPast && <Check size={16} color="#fff" />}
                         {isCurrent && <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                         <div style={{ fontSize: 16, fontWeight: isCurrent ? 700 : 500 }}>{s.name}</div>
                         <div style={{ fontSize: 12, color: '#666' }}>{s.desc || 'Standard procedure for this stage.'}</div>
                      </div>
                   </div>
                 );
               })}
            </div>
          </div>
        );
      case 'shipments':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="p-card" style={{ padding: 32 }}>
               <h3 className="lxfh" style={{ fontSize: 24, marginBottom: 8 }}>Logistics Tracking</h3>
               <p className="lxf" style={{ color: '#7A6E62', fontSize: 13, marginBottom: 32 }}>Real-time updates on your high-precision components and materials.</p>
               
               {myProcurements.length === 0 ? (
                 <div style={{ textAlign: 'center', padding: '60px 0', color: '#B5AFA9' }}>No shipment records found for this project.</div>
               ) : (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    {myProcurements.filter(p => p.isShipment || p.status === 'Shipped' || p.status === 'In Transit').map(p => {
                       const stages = ['Order Placed', 'Shipped', 'At Customs', 'In Transit', 'Delivered'];
                       const currentIdx = stages.indexOf(p.status);
                       
                       return (
                         <div key={p.id} style={{ paddingBottom: 32, borderBottom: '1px solid #F0EBE5' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                               <div>
                                  <div className="lxf" style={{ fontSize: 18, fontWeight: 700 }}>{p.item || p.itemName}</div>
                                  <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>Container: {p.container || 'TBD'} • Supplier: {p.supplier || p.source}</div>
                               </div>
                               <div style={{ textAlign: 'right' }}>
                                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase' }}>Estimated Arrival</div>
                                  <div className="lxf" style={{ fontSize: 14, fontWeight: 600, color: ac }}>{p.eta || 'TBD'}</div>
                               </div>
                            </div>
                            
                            <div style={{ position: 'relative', height: 40, marginTop: 40 }}>
                               <div style={{ position: 'absolute', top: 12, left: 0, right: 0, height: 2, background: '#F0EBE5' }} />
                               <div style={{ position: 'absolute', top: 12, left: 0, width: `${(currentIdx / (stages.length - 1)) * 100}%`, height: 2, background: ac, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                               
                               <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                                  {stages.map((s, idx) => (
                                    <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                                       <div style={{ 
                                          width: 26, height: 26, borderRadius: '50%', 
                                          background: idx <= currentIdx ? ac : '#fff',
                                          border: idx <= currentIdx ? `2px solid ${ac}` : '2px solid #DFD9D1',
                                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                                          transition: 'all .4s'
                                       }}>
                                          {idx <= currentIdx ? <Check size={14} color="#fff" /> : <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#DFD9D1' }} />}
                                       </div>
                                       <span style={{ fontSize: 10, fontWeight: idx === currentIdx ? 700 : 400, color: idx <= currentIdx ? '#1A1410' : '#B5AFA9', whiteSpace: 'nowrap' }}>{s}</span>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                       );
                    })}
                    {myProcurements.length > 0 && myProcurements.filter(p => !p.isShipment && p.status !== 'Shipped' && p.status !== 'In Transit').length > 0 && (
                      <div style={{ marginTop: 16 }}>
                         <h4 className="lxf" style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Other Procurement Items</h4>
                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            {myProcurements.filter(p => !p.isShipment && p.status !== 'Shipped' && p.status !== 'In Transit').map(p => (
                               <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#F9F7F4', borderRadius: 8 }}>
                                  <span style={{ fontSize: 13 }}>{p.item || p.itemName}</span>
                                  <SBadge s={p.status} />
                               </div>
                            ))}
                         </div>
                      </div>
                    )}
                 </div>
               )}
            </div>
          </div>
        );
      case 'updates':
        return (
          <div className="p-card" style={{ padding: 32 }}>
            <h3 className="lxfh" style={{ fontSize: 24, marginBottom: 24 }}>Project Updates</h3>
            {myNotes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#B5AFA9' }}>No official updates posted yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {myNotes.map(n => (
                  <div key={n.id} style={{ display: 'flex', gap: 20, paddingBottom: 20, borderBottom: '1px solid #F0EBE5' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, flexShrink: 0 }}>G</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Glasstech Team</div>
                      <div style={{ fontSize: 15, color: '#1A1410', lineHeight: 1.5, marginBottom: 8 }}>{n.text}</div>
                      <div style={{ fontSize: 11, color: '#B5AFA9' }}>{new Date(n.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'gallery': {
        const groupedMedia = myMedia.reduce((acc, m) => {
          const sId = m.stageId || 0;
          if (!acc[sId]) acc[sId] = [];
          acc[sId].push(m);
          return acc;
        }, {});

        // Sort stages
        const sortedStages = Object.keys(groupedMedia).sort((a, b) => parseInt(a) - parseInt(b));

        return (
          <div className="p-card" style={{ padding: 32 }}>
            <h3 className="lxfh" style={{ fontSize: 24, marginBottom: 32 }}>Stage-Based Gallery</h3>
            {myMedia.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#B5AFA9' }}>The gallery will be updated as work progresses.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                {sortedStages.map(sId => {
                  const stage = PROJECT_STAGES.find(s => s.id === parseInt(sId));
                  return (
                    <div key={sId}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                          <div style={{ width: 12, height: 12, borderRadius: '50%', background: stage?.color || ac }} />
                          <h4 className="lxfh" style={{ fontSize: 18 }}>{stage?.name || 'Initial Phase'}</h4>
                          <div style={{ height: 1, flex: 1, background: 'rgba(0,0,0,0.05)' }} />
                       </div>
                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                          {groupedMedia[sId].map(m => (
                            <div key={m.id} className="p-card" style={{ overflow: 'hidden', border: 'none', shadow: 'none', background: '#F9F7F4' }}>
                              <img src={m.url} style={{ width: '100%', aspectRatio: '1.4', objectFit: 'cover' }} alt="milestone" />
                              <div style={{ padding: 12 }}>
                                <div style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase' }}>{new Date(m.createdAt).toLocaleDateString()}</div>
                                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{m.label || 'Progress Photo'}</div>
                              </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      }
      case 'invoices':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
             {myInvs.map(inv => (
              <div key={inv.id} className="p-card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{inv.title}</div>
                  <div style={{ fontSize: 12, color: '#7A6E62' }}>Due: {inv.due}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, color: ac, fontWeight: 300 }}>{inv.amount}</div>
                  {!paidIds.includes(inv.id) && inv.status === 'Pending' && <button onClick={() => setPayModal(inv)} className="p-btn-gold" style={{ padding: '6px 16px', fontSize: 12, marginTop: 8 }}>Pay Now</button>}
                  {(paidIds.includes(inv.id) || inv.status === 'Paid') && <div style={{ color: '#16A34A', fontSize: 12, marginTop: 8, fontWeight: 600 }}>PAID ✓</div>}
                </div>
              </div>
            ))}
          </div>
        );
      case 'book':
        return <ClientBookingView brand={brand} bookings={bookings || []} clientEmail={client.email} clientName={client.name} />;
      case 'governance': {
        const myProject = activeProject;
        const myApprovals = (props.approvals || []).filter(a => a.parentId === myProject?.id);
        const myCRs = (props.changeRequests || []).filter(c => c.parentId === myProject?.id);
        
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
             {/* MATERIAL APPROVALS */}
             <section>
                <h2 className="lxfh" style={{ fontSize: 24, marginBottom: 20 }}>Material Approvals</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
                   {myApprovals.length === 0 && <div className="p-card" style={{ padding: 32, textAlign: 'center', color: '#B5AFA9' }}>No pending approvals</div>}
                   {myApprovals.map(a => (
                     <div key={a.id} className="p-card" style={{ overflow: 'hidden' }}>
                        {a.imageUrl && <img src={a.imageUrl} style={{ width: '100%', height: 180, objectFit: 'cover' }} alt="spec" />}
                        <div style={{ padding: 20 }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                              <span style={{ fontWeight: 600, fontSize: 16 }}>{a.itemName}</span>
                              <SBadge s={a.status} />
                           </div>
                           <p style={{ fontSize: 13, color: '#7A6E62', marginBottom: 16 }}>{a.description}</p>
                           {a.specifications && (
                             <div style={{ background: 'rgba(200,169,110,.05)', padding: 12, borderRadius: 8, marginBottom: 16 }}>
                                <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#C8A96E', marginBottom: 4 }}>Specifications</div>
                                <div style={{ fontSize: 12, color: '#444' }}>{a.specifications}</div>
                             </div>
                           )}
                           {a.status === 'pending' && (
                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                <button 
                                  onClick={() => props.updateApproval(a.id, { status: 'approved', approvedAt: new Date().toISOString() }, myProject.id)}
                                  className="p-btn-gold" style={{ padding: '10px' }}
                                ><ThumbsUp size={16} /> Approve</button>
                                <button className="glass-btn" style={{ padding: '10px' }}><ThumbsDown size={16} /> Reject</button>
                             </div>
                           )}
                        </div>
                     </div>
                   ))}
                </div>
             </section>

             {/* CHANGE REQUESTS */}
             <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                   <h2 className="lxfh" style={{ fontSize: 24 }}>Change Requests</h2>
                   <button onClick={() => setCrModal(true)} className="p-btn-gold" style={{ padding: '8px 16px', fontSize: 13 }}><Plus size={16} /> New Request</button>
                </div>
                <div className="p-card" style={{ overflow: 'hidden' }}>
                   <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead style={{ background: 'rgba(0,0,0,.02)' }}>
                         <tr>
                            <th style={{ padding: 12, textAlign: 'left', fontSize: 11, color: '#B5AFA9' }}>DATE</th>
                            <th style={{ padding: 12, textAlign: 'left', fontSize: 11, color: '#B5AFA9' }}>DESCRIPTION</th>
                            <th style={{ padding: 12, textAlign: 'left', fontSize: 11, color: '#B5AFA9' }}>IMPACT</th>
                            <th style={{ padding: 12, textAlign: 'left', fontSize: 11, color: '#B5AFA9' }}>STATUS</th>
                            <th style={{ padding: 12, textAlign: 'right', fontSize: 11, color: '#B5AFA9' }}>ACTION</th>
                         </tr>
                      </thead>
                      <tbody>
                         {myCRs.length === 0 && <tr><td colSpan={5} style={{ padding: 32, textAlign: 'center', color: '#B5AFA9' }}>No change requests submitted</td></tr>}
                         {myCRs.map(r => (
                           <tr key={r.id} style={{ borderTop: '1px solid rgba(0,0,0,.05)' }}>
                              <td style={{ padding: 12, fontSize: 13 }}>{new Date(r.createdAt || new Date()).toLocaleDateString()}</td>
                              <td style={{ padding: 12, fontSize: 13 }}>{r.description}</td>
                              <td style={{ padding: 12, fontSize: 13 }}>
                                 {r.costImpact ? <div>Cost: {r.costImpact}</div> : <span style={{ color: '#B5AFA9' }}>TBD</span>}
                                 {r.timelineImpact && <div style={{ fontSize: 11, color: '#B5AFA9' }}>Time: {r.timelineImpact}</div>}
                              </td>
                              <td style={{ padding: 12 }}><SBadge s={r.status} /></td>
                              <td style={{ padding: 12, textAlign: 'right' }}>
                                 {r.status === 'evaluated' && (
                                   <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                      <button 
                                        onClick={() => props.updateChangeRequest(r.id, { status: 'approved' }, myProject.id)}
                                        className="p-btn-gold" style={{ padding: '6px 12px', fontSize: 12 }}
                                      >Approve</button>
                                      <button onClick={() => props.updateChangeRequest(r.id, { status: 'rejected' }, myProject.id)} className="glass-btn" style={{ padding: '6px 12px', fontSize: 12 }}>Reject</button>
                                   </div>
                                 )}
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </section>

             {crModal && (
               <div className="overlay-modal" onClick={() => setCrModal(false)}>
                 <div className="modal-box lxf" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
                    <h3 className="lxfh" style={{ fontSize: 20, marginBottom: 20 }}>Request a Change</h3>
                    <p className="lxf" style={{ color: '#7A6E62', fontSize: 13, marginBottom: 20 }}>Need to modify a design or specification? Describe your request below and our team will evaluate the impact.</p>
                    <textarea 
                      className="p-inp" rows={4} placeholder="e.g. Change the glass tint to Bronze..." 
                      value={crData.description} 
                      onChange={e => setCrData({ ...crData, description: e.target.value })} 
                    />
                    <button 
                      onClick={() => { props.createChangeRequest(myProject.id, crData); setCrModal(false); setCrData({ description: '' }); }}
                      className="p-btn-gold" style={{ width: '100%', marginTop: 24, padding: 12 }}
                    >Submit Request</button>
                 </div>
               </div>
             )}
          </div>
        );
      }
      default:
        return <div className="p-card" style={{ padding: 40, textAlign: 'center', color: '#B5AFA9' }}>Feature coming soon.</div>;
    }
  };

  return (
    <div className="lxf lx-scroll" style={{ minHeight: '100vh', background: '#F9F7F4', '--ac': ac }}>
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 28 }} /> : <div className="lxfh" style={{ fontSize: 22 }}>{brand.name}</div>}
          <div style={{ height: 18, width: 1, background: 'rgba(0,0,0,.1)' }} />
          <div style={{ fontSize: 11, color: '#B5AFA9', letterSpacing: '.16em', textTransform: 'uppercase' }}>Client Portal</div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {myProjects.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F9F7F4', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(0,0,0,.04)' }}>
              <span style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase' }}>Selected Project:</span>
              <select 
                value={selectedProjectId || ''} 
                onChange={(e) => setSelectedProjectId(e.target.value)}
                style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: ac, cursor: 'pointer', outline: 'none' }}
              >
                {myProjects.map(p => <option key={p.id} value={p.id}>{p.title || p.project}</option>)}
              </select>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <NotificationBell notifications={props.userNotifications || props.notifications} onMarkRead={props.markNotificationRead} />
            {client ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <PAv i={client.av} s={32} c={ac} />
                <div style={{ display: 'none', md: 'block' }}><div style={{ fontSize: 13, fontWeight: 500 }}>{client.name || 'Client'}</div><div style={{ fontSize: 11, color: '#B5AFA9' }}>{client.email}</div></div>
              </div>
            ) : (
              <div style={{ fontSize: 11, color: '#B5AFA9' }}>Loading profile...</div>
            )}
            <button onClick={onLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B5AFA9', marginLeft: 8 }} title="Logout"><LogOut size={18} /></button>
          </div>
        </div>
      </div>

      <div className="p-nav-row" style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 32px', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {tabs.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`p-tab lxf${tab === id ? ' active' : ''}`} style={{ whiteSpace: 'nowrap' }}>{label}</button>)}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 32px' }}>
        {renderContent()}
      </div>

      {payModal && <StripePayModal invoice={payModal} brand={brand} onClose={() => setPayModal(null)} onSuccess={(id) => handlePay(id)} />}
    </div>
  );
}
