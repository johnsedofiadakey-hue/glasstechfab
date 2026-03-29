import React, { useState, useEffect } from 'react';
import { 
  LogOut, CheckCircle, Download, CreditCard, Send, 
  Calendar, FolderOpen, Check, Lock, X, Printer
} from 'lucide-react';
import { 
  Av, SBadge, Modal, FF as PFormField, PAv, PSBadge,
  Modal as PModal
} from '../components/Shared';
import { 
  TEAM_MEMBERS, BOOKING_SLOTS 
} from '../data';

// --- STRIPE PAY MODAL (reused logic) ---
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
          <button onClick={() => { onSuccess(invoice.id); onClose(); }} className="p-btn-gold lxf" style={{ width: '100%', padding: '12px', marginTop: 20 }}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay-modal" onClick={onClose}>
      <div className="modal-box lxf" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
        <h2 className="lxfh" style={{ marginBottom: 20 }}>Pay {invoice.amount}</h2>
        <PFormField label="Card Number"><input className="p-inp" placeholder="4242 4242 4242 4242" /></PFormField>
        <button onClick={pay} className="p-btn-gold lxf" style={{ width: '100%', padding: '14px', marginTop: 10 }}>Pay Securely</button>
      </div>
    </div>
  );
}

// --- CLIENT BOOKING VIEW ---
function ClientBookingView({ brand, bookings, clientEmail, clientName }) {
  const ac = brand.color || '#C8A96E';
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <Calendar size={48} color={ac} style={{ marginBottom: 20 }} />
      <h2 className="lxfh">Book a Session</h2>
      <p className="lxf" style={{ color: '#7A6E62' }}>Calendar integration coming soon in modular build.</p>
    </div>
  );
}

// --- MAIN CLIENT PORTAL ---
export default function ClientPortal({ client, proposals, invoices, brand, onLogout }) {
  const [tab, setTab] = useState('overview');
  const ac = brand.color || '#C8A96E';
  const myProps = proposals.filter(p => p.clientEmail === client.email || p.client === client.name);
  const myInvs = invoices.filter(i => i.clientEmail === client.email || i.client === client.name);
  
  const [payModal, setPayModal] = useState(null);
  const [paidIds, setPaidIds] = useState([]);
  const [msgs, setMsgs] = useState(client.messages || []);
  const [msgText, setMsgText] = useState('');
  const [moodboards, setMoodboards] = useState(client.moodboards || []);

  const sendMsg = () => {
    if (!msgText.trim()) return;
    const m = { id: Date.now(), from: 'client', sender: client.name, text: msgText, time: 'Just now', date: 'Today' };
    setMsgs([...msgs, m]);
    setMsgText('');
  };

  const tabs = [['overview', 'Overview'], ['project', 'My Project'], ['approvals', 'Design Approvals'], ['documents', 'Documents'], ['messages', 'Messages'], ['proposals', 'Proposals'], ['invoices', 'Invoices'], ['book', 'Book a Session']];

  return (
    <div className="lxf lx-scroll" style={{ minHeight: '100vh', background: '#F9F7F4', '--ac': ac }}>
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 28, objectFit: 'contain' }} /> : <div className="lxfh" style={{ fontSize: 22, color: '#1A1410', fontWeight: 400 }}>{brand.name}</div>}
          <div style={{ height: 18, width: 1, background: 'rgba(0,0,0,.1)' }} />
          <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', letterSpacing: '.16em', textTransform: 'uppercase' }}>Client Portal</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <PAv i={client.av} s={32} c={ac} />
          <div><div className="lxf" style={{ fontSize: 13, color: '#1A1410', fontWeight: 500 }}>{client.name}</div><div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{client.email}</div></div>
          <button onClick={onLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0B9B0', padding: 4, display: 'flex', marginLeft: 8 }}><LogOut size={16} /></button>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 32px', display: 'flex', gap: 0, overflowX: 'auto' }} className="lx-scroll">
        {tabs.map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`p-tab lxf${tab === id ? ' active' : ''}`} style={{ whiteSpace: 'nowrap' }}>{label}</button>)}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 32px' }}>
        {tab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
             <h1 className="lxfh" style={{ fontSize: 44, fontWeight: 300 }}>Welcome, {client.name}</h1>
             <div className="p-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div className="lxf" style={{ fontSize: 14, fontWeight: 600 }}>Project Progress</div>
                  <div className="lxf" style={{ fontSize: 13, color: ac }}>{client.progress}%</div>
                </div>
                <div className="prog"><div className="prog-f" style={{ width: `${client.progress}%`, background: ac }} /></div>
             </div>
          </div>
        )}
        
        {tab === 'messages' && (
          <div className="p-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 400 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {msgs.map(m => (
                <div key={m.id} className={`chat-bubble-${m.from === 'client' ? 'me' : 'them'}`}>
                  <div style={{ fontSize: 12 }}>{m.text}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, paddingTop: 12, borderTop: '1px solid #efefef' }}>
              <input className="p-inp" value={msgText} onChange={e => setMsgText(e.target.value)} placeholder="Type a message..." style={{ flex: 1 }} />
              <button onClick={sendMsg} className="p-btn-gold">Send</button>
            </div>
          </div>
        )}
        
        {tab === 'invoices' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {myInvs.map(inv => (
              <div key={inv.id} className="p-card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{inv.title}</div>
                  <div style={{ fontSize: 12, color: '#7A6E62' }}>Due: {inv.due}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, color: ac }}>{inv.amount}</div>
                  {!paidIds.includes(inv.id) && inv.status === 'Pending' && <button onClick={() => setPayModal(inv)} className="p-btn-gold" style={{ padding: '5px 15px', fontSize: 12, marginTop: 5 }}>Pay Now</button>}
                  {paidIds.includes(inv.id) && <div style={{ color: '#16A34A', fontSize: 12 }}>Paid ✓</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'book' && <ClientBookingView brand={brand} bookings={[]} clientEmail={client.email} clientName={client.name} />}
      </div>

      {payModal && <StripePayModal invoice={payModal} brand={brand} onClose={() => setPayModal(null)} onSuccess={id => setPaidIds([...paidIds, id])} />}
    </div>
  );
}
