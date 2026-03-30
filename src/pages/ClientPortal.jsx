import React, { useState, useEffect } from 'react';
import { 
  LogOut, CheckCircle, Download, CreditCard, Send, 
  Calendar, FolderOpen, Check, Lock, X, Printer,
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
  const ac = brand.color || '#C8A96E';
  const { proposals, invoices, bookings } = props;
  
  const myProps = (proposals || []).filter(p => p?.clientEmail === client?.email || p?.client === client?.name);
  const myInvs = (invoices || []).filter(i => i?.clientEmail === client?.email || i?.client === client?.name);
  
  const [payModal, setPayModal] = useState(null);
  const [paidIds, setPaidIds] = useState([]);
  const [crModal, setCrModal] = useState(false);
  const [crData, setCrData] = useState({ description: '' });

  const tabs = [
    ['overview', 'Overview'], 
    ['project', 'My Project'], 
    ['governance', 'Governance'],
    ['proposals', 'Proposals'], 
    ['invoices', 'Invoices'], 
    ['book', 'Book a Session']
  ];

  const handlePay = (id) => {
    props.payInvoice(id);
    setPaidIds(prev => [...prev, id]);
  };

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
        const myProj = props.clients.find(c => c.clientIds?.includes(client.id) || c.id === client.id);
        const totalBudget = parseFloat(myProj?.budget?.replace(/[$,]/g, '') || 0);
        const paidAmount = (myInvs || []).filter(i => i.status === 'Paid').reduce((a, b) => a + parseFloat(b.amount?.replace(/[$,]/g, '') || 0), 0);
        const remaining = totalBudget - paidAmount;
        
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* PROJECT HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
               <div>
                  <h1 className="lxfh" style={{ fontSize: 48, fontWeight: 300, marginBottom: 8, color: '#1A1410' }}>Hello, {client.name.split(' ')[0]}</h1>
                  <div className="lxf" style={{ fontSize: 14, color: ac, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>{myProj?.project || 'Your Project'} Story</div>
               </div>
               <div style={{ textAlign: 'right' }}>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase', letterSpacing: '.1em' }}>Consistency Score</div>
                  <div className="lxfh" style={{ fontSize: 24, color: '#16A34A' }}>Excellent</div>
               </div>
            </div>

            {/* QUICK STATS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
               <div className="p-card" style={{ padding: 20 }}>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 8 }}>Overall Progress</div>
                  <div className="lxfh" style={{ fontSize: 24 }}>{myProj?.progress || 0}%</div>
                  <div className="prog" style={{ height: 4, marginTop: 12 }}><div className="prog-f" style={{ width: `${myProj?.progress || 0}%`, background: ac }} /></div>
               </div>
               <div className="p-card" style={{ padding: 20 }}>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 8 }}>Project Value</div>
                  <div className="lxfh" style={{ fontSize: 24 }}>${totalBudget.toLocaleString()}</div>
               </div>
               <div className="p-card" style={{ padding: 20 }}>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 8 }}>Confirmed Paid</div>
                  <div className="lxfh" style={{ fontSize: 24, color: '#16A34A' }}>${paidAmount.toLocaleString()}</div>
               </div>
               <div className="p-card" style={{ padding: 20, background: ac, color: '#fff' }}>
                  <div className="lxf" style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', textTransform: 'uppercase', marginBottom: 8 }}>Active Stage</div>
                  <div className="lxfh" style={{ fontSize: 18, color: '#fff' }}>{PROJECT_STAGES.find(s => s.id === (myProj?.stage || 1))?.name}</div>
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 32, alignItems: 'start' }}>
               {/* VERTICAL TIMELINE STORY */}
               <div className="p-card" style={{ padding: 32 }}>
                  <h3 className="lxfh" style={{ fontSize: 22, marginBottom: 32 }}>The Project Story</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 2, background: '#F0EBE5' }} />
                    
                    {PROJECT_STAGES.map((s, idx) => {
                      const isCurrent = (myProj?.stage || 1) === s.id;
                      const isPast = (myProj?.stage || 1) > s.id;
                      const isLast = idx === PROJECT_STAGES.length - 1;
                      
                      return (
                        <div key={s.id} style={{ display: 'flex', gap: 24, marginBottom: isLast ? 0 : 40, position: 'relative' }}>
                          <div style={{ 
                            width: 40, height: 40, borderRadius: '50%', 
                            background: isPast ? s.color : isCurrent ? '#fff' : '#fff',
                            border: isPast ? `2.5px solid ${s.color}` : isCurrent ? `2.5px solid ${s.color}` : '2.5px solid #DFD9D1',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 2, transition: 'all .4s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}>
                            {isPast ? <Check size={20} color="#fff" strokeWidth={3} /> : <div style={{ width: 10, height: 10, borderRadius: '50%', background: isCurrent ? s.color : '#DFD9D1' }} />}
                          </div>

                          <div style={{ flex: 1, paddingTop: 6 }}>
                             <div className="lxf" style={{ fontSize: 18, fontWeight: isCurrent ? 700 : 400, color: isCurrent ? '#1A1410' : isPast ? '#7A6E62' : '#B5AFA9' }}>{s.name}</div>
                             {isCurrent && (
                               <div style={{ marginTop: 12, padding: 20, background: '#F9F7F4', borderRadius: 12, border: '1px solid rgba(0,0,0,.04)' }}>
                                  <div className="lxf" style={{ fontSize: 13, lineHeight: 1.6, color: '#473C2C' }}>We are currently processing this stage. Our team is working on the deliverables to ensure everything meets Glasstech standards.</div>
                                  <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                                     <button onClick={() => setTab('governance')} className="p-btn-gold" style={{ padding: '8px 16px', fontSize: 12 }}>Check Approvals</button>
                                     <button className="p-btn-light" style={{ padding: '8px 16px', fontSize: 12 }}>Message Team</button>
                                  </div>
                               </div>
                             )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {/* FINANCIAL HEALTH */}
                  <div className="p-card" style={{ padding: 24 }}>
                     <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Financial Milestone</h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {[
                          { label: 'Deposit (40%)', val: totalBudget * 0.4, status: paidAmount >= totalBudget * 0.4 ? 'PAID' : 'DUE' },
                          { label: 'Production (40%)', val: totalBudget * 0.4, status: paidAmount >= totalBudget * 0.8 ? 'PAID' : 'DUE' },
                          { label: 'Final (20%)', val: totalBudget * 0.2, status: paidAmount >= totalBudget ? 'PAID' : 'DUE' }
                        ].map((m, i) => (
                           <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                 <div className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                                 <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>${m.val.toLocaleString()}</div>
                              </div>
                              <SBadge s={m.status} />
                           </div>
                        ))}
                     </div>
                     <button onClick={() => setTab('invoices')} className="p-btn-dark lxf" style={{ width: '100%', marginTop: 24 }}>View Invoices</button>
                  </div>

                  {/* RECENT ACTIVITY */}
                  <div className="p-card" style={{ padding: 24 }}>
                     <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Recent Photos</h3>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div style={{ aspectRatio: '1', background: '#eee', borderRadius: 8 }} />
                        <div style={{ aspectRatio: '1', background: '#eee', borderRadius: 8 }} />
                     </div>
                     <button className="lxf" style={{ width: '100%', background: 'none', border: 'none', color: ac, fontSize: 12, fontWeight: 700, marginTop: 16, cursor: 'pointer' }}>View Gallery</button>
                  </div>
               </div>
            </div>
          </div>
        );
      }
      case 'project': 
        return <div className="lxf" style={{ padding: 40, textAlign: 'center', opacity: .5 }}>Consolidated into Dashboard Overview.</div>;
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
      case 'governance':
        const myProject = props.clients.find(c => c.clientId === client.id || c.id === client.id);
        const myApprovals = props.approvals.filter(a => a.parentId === myProject?.id);
        const myCRs = props.changeRequests.filter(r => r.parentId === myProject?.id);
        
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
      default:
        return <div className="p-card" style={{ padding: 40, textAlign: 'center', color: '#B5AFA9' }}>Feature coming soon.</div>;
    }
  };

  return (
    <div className="lxf lx-scroll" style={{ minHeight: '100vh', background: '#F9F7F4', '--ac': ac }}>
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 28 }} /> : <div className="lxfh" style={{ fontSize: 22 }}>{brand.name}</div>}
          <div style={{ height: 18, width: 1, background: 'rgba(0,0,0,.1)' }} />
          <div style={{ fontSize: 11, color: '#B5AFA9', letterSpacing: '.16em', textTransform: 'uppercase' }}>Client Portal</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <NotificationBell notifications={props.userNotifications || props.notifications} onMarkRead={props.markNotificationRead} />
          {client ? (
            <>
              <PAv i={client.av} s={32} c={ac} />
              <div><div style={{ fontSize: 13, fontWeight: 500 }}>{client.name || 'Client'}</div><div style={{ fontSize: 11, color: '#B5AFA9' }}>{client.email}</div></div>
            </>
          ) : (
            <div style={{ fontSize: 11, color: '#B5AFA9' }}>Loading profile...</div>
          )}
          <button onClick={onLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B5AFA9', marginLeft: 16 }}><LogOut size={18} /></button>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 32px', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {tabs.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`p-tab lxf${tab === id ? ' active' : ''}`} style={{ whiteSpace: 'nowrap' }}>{label}</button>)}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 32px' }}>
        {renderContent()}
      </div>

      {payModal && <StripePayModal invoice={payModal} brand={brand} onClose={() => setPayModal(null)} onSuccess={handlePay} />}
    </div>
  );
}
