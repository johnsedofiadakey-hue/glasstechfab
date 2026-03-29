import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Image as ImgIcon, FileText, Receipt, 
  Layers, Calendar, TrendingUp, Mail, Bell, Settings, 
  Eye, LogOut, Menu, Search, Plus, Download, Trash2, 
  Upload, Camera, Check, Activity, Target, DollarSign, 
  Clock, CheckCircle, Lock, X, Printer, Send, CreditCard,
  Building2, Edit2, FolderOpen
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, ComposedChart, Line,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Av, SBadge, Modal, FF as PFormField, PAv, PSBadge,
  Modal as PModal, Spinner
} from '../components/Shared';
import BA from '../components/BA';
import { 
  CLIENTS_DATA, PROPOSALS_DATA, INVOICES_DATA, 
  PORTFOLIO_DATA, WORKSPACES_DATA, NOTIFS_DATA, 
  TEAM_MEMBERS, BOOKINGS_DATA, EMAIL_QUEUE,
  BOOKING_SLOTS, ANALYTICS_MONTHLY, PIPELINE, TOP_SERVICES
} from '../data';

// --- HELPER FOR PRINTING ---
const printDocLight = (doc, type, brand) => {
  window.print();
};

// --- ADMIN DASHBOARD ---
function AdminDash({ clients, invoices, proposals, brand }) {
  const ac = brand.color || '#C8A96E';
  const stats = [
    { label: 'Active Clients', value: clients.filter(c => c.status === 'Active').length, delta: '+12%', icon: <Users size={18} /> },
    { label: 'Total Revenue', value: '$128.4k', delta: '+8%', icon: <TrendingUp size={18} /> },
    { label: 'Pending Proposals', value: proposals.filter(p => p.status === 'Sent').length, delta: '-3%', icon: <FileText size={18} /> },
    { label: 'Project Progress', value: '74%', delta: '+5%', icon: <Activity size={18} /> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {stats.map(s => (
          <div key={s.label} className="p-stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div className="lxf" style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#B5AFA9' }}>{s.label}</div>
              <div style={{ color: ac, opacity: .7 }}>{s.icon}</div>
            </div>
            <div className="lxfh" style={{ fontSize: 38, fontWeight: 300, color: '#1A1410', lineHeight: 1 }}>{s.value}</div>
            <div className="lxf" style={{ fontSize: 11, color: s.delta.startsWith('+') ? '#16A34A' : '#DC2626', marginTop: 4 }}>{s.delta} <span style={{ color: '#B5AFA9' }}>vs last month</span></div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div className="p-card" style={{ padding: 24 }}>
          <div className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#1A1410', marginBottom: 20 }}>Revenue Growth</div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={ANALYTICS_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.04)" vertical={false} />
              <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#B5AFA9' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#B5AFA9' }} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke={ac} fillOpacity={1} fill={`url(#colorRev)`} strokeWidth={2.5} />
              <defs><linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={ac} stopOpacity={0.15} /><stop offset="95%" stopColor={ac} stopOpacity={0} /></linearGradient></defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="p-card" style={{ padding: 24 }}>
          <div className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#1A1410', marginBottom: 20 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {NOTIFS_DATA.slice(0, 5).map(n => (
              <div key={n.id} style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: ac }}>{n.icon}</div>
                <div>
                  <div className="lxf" style={{ fontSize: 12, fontWeight: 500, color: '#1A1410' }}>{n.title}</div>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ADMIN CRM ---
function AdminCRM({ clients, setClients, brand }) {
  const ac = brand.color || '#C8A96E';
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', project: '', status: 'Lead', budget: '' });

  const add = () => {
    if (!form.name || !form.email) return;
    setClients([...clients, { ...form, id: `c${Date.now()}`, progress: 0, joined: 'Mar 2026', av: form.name.slice(0, 2).toUpperCase() }]);
    setModal(false);
    setForm({ name: '', email: '', project: '', status: 'Lead', budget: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Clients</h2><p className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>{clients.length} total relationships</p></div>
        <button onClick={() => setModal(true)} className="p-btn-gold lxf" style={{ padding: '9px 18px', display: 'flex', alignItems: 'center', gap: 6 }}><Plus size={14} />Add Client</button>
      </div>
      <div className="p-card" style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
          <thead><tr>{['Client', 'Project', 'Status', 'Budget', 'Progress', 'Joined', ''].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {clients.map(c => (
              <tr key={c.id} className="t-row">
                <td style={{ padding: '12px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><PAv i={c.av} s={32} c={ac} /><div><div className="lxf" style={{ fontSize: 13, fontWeight: 500, color: '#1A1410' }}>{c.name}</div><div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{c.email}</div></div></div></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13, color: '#7A6E62' }}>{c.project}</span></td>
                <td style={{ padding: '12px 16px' }}><PSBadge s={c.status} /></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13, color: '#1A1410', fontWeight: 600 }}>{c.budget}</span></td>
                <td style={{ padding: '12px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div className="prog" style={{ width: 60 }}><div className="prog-f" style={{ width: `${c.progress}%`, background: ac }} /></div><span style={{ fontSize: 11, color: '#B5AFA9' }}>{c.progress}%</span></div></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{c.joined}</span></td>
                <td style={{ padding: '12px 16px' }}><button onClick={() => setClients(clients.filter(x => x.id !== c.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D0CCC8', padding: 4, display: 'flex' }}><Trash2 size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PModal open={modal} onClose={() => setModal(false)} title="New Client">
        <PFormField label="Client Name"><input className="p-inp" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Abena Mensah" /></PFormField>
        <PFormField label="Email Address"><input className="p-inp" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="abena@example.com" /></PFormField>
        <PFormField label="Project Scope"><input className="p-inp" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} placeholder="Residential Interior Design" /></PFormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <PFormField label="Status"><select className="p-inp" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option>Lead</option><option>Active</option><option>Completed</option></select></PFormField>
          <PFormField label="Budget"><input className="p-inp" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} placeholder="$15,000" /></PFormField>
        </div>
        <button onClick={add} className="p-btn-gold lxf" style={{ width: '100%', padding: '12px', fontSize: 13, marginTop: 4 }}>Save Client</button>
      </PModal>
    </div>
  );
}

// --- ADMIN PORTFOLIO ---
function AdminPortfolio({ items, setItems, brand }) {
  const ac = brand.color || '#C8A96E';
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: '', cat: 'Residential', loc: '', year: '', after: '' });
  const fileRef = useRef();
  
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => setForm({ ...form, after: ev.target.result });
    r.readAsDataURL(f);
  };

  const add = () => {
    if (!form.title) return;
    setItems([{ ...form, id: Date.now(), img: form.after }, ...items]);
    setModal(false);
    setForm({ title: '', cat: 'Residential', loc: '', year: '', after: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Portfolio</h2><p className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>{items.length} projects published</p></div>
        <button onClick={() => setModal(true)} className="p-btn-gold lxf" style={{ padding: '9px 18px', display: 'flex', alignItems: 'center', gap: 6 }}><Plus size={14} />Add Project</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {items.map(p => (
          <div key={p.id} className="p-card" style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
              {p.hasBA && p.before ? <BA before={p.before} after={p.after || p.img} h={200} /> : <img src={p.after || p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              <button onClick={() => setItems(items.filter(x => x.id !== p.id))} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,.9)', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#DC2626', display: 'flex', alignItems: 'center', gap: 3, fontSize: 11 }}><Trash2 size={12} />Remove</button>
            </div>
            <div style={{ padding: '14px 16px' }}><div className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#1A1410', marginBottom: 3 }}>{p.title}</div><div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{p.loc} · {p.year}</div></div>
          </div>
        ))}
      </div>
      <PModal open={modal} onClose={() => setModal(false)} title="Add Portfolio Project" w={560}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <PFormField label="Title"><input className="p-inp" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="The Volta Residence" /></PFormField>
          <PFormField label="Category"><select className="p-inp" value={form.cat} onChange={e => setForm({ ...form, cat: e.target.value })}>{['Residential', 'Commercial', 'Kitchen', 'Bathroom', 'Dining', 'Living', 'Office'].map(c => <option key={c}>{c}</option>)}</select></PFormField>
          <PFormField label="Location"><input className="p-inp" value={form.loc} onChange={e => setForm({ ...form, loc: e.target.value })} placeholder="East Legon, Accra" /></PFormField>
          <PFormField label="Year"><input className="p-inp" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="2025" /></PFormField>
        </div>
        <PFormField label="Image URL"><input className="p-inp" value={form.after} onChange={e => setForm({ ...form, after: e.target.value })} placeholder="https://images.unsplash.com/..." /></PFormField>
        <input type="file" accept="image/*" ref={fileRef} onChange={handleFile} style={{ display: 'none' }} />
        <button onClick={() => fileRef.current.click()} className="p-btn-light lxf" style={{ width: '100%', padding: '9px', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Upload size={13} />Upload Image</button>
        <button onClick={add} className="p-btn-gold lxf" style={{ width: '100%', padding: '12px', fontSize: 13 }}>Add to Portfolio</button>
      </PModal>
    </div>
  );
}

// --- ADMIN PROPOSALS ---
function AdminProposals({ proposals, setProposals, clients, brand }) {
  const ac = brand.color || '#C8A96E';
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ client: '', title: '', amount: '', valid: '', notes: '' });
  
  const add = () => {
    if (!form.client || !form.title) return;
    setProposals([...proposals, { ...form, id: `PRO-${String(proposals.length + 1).padStart(3, '0')}`, status: 'Draft', date: new Date().toISOString().split('T')[0], clientEmail: clients.find(c => c.name === form.client)?.email || '' }]);
    setModal(false);
    setForm({ client: '', title: '', amount: '', valid: '', notes: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Proposals</h2><p className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>{proposals.length} total proposals</p></div>
        <button onClick={() => setModal(true)} className="p-btn-gold lxf" style={{ padding: '9px 18px', display: 'flex', alignItems: 'center', gap: 6 }}><Plus size={14} />New Proposal</button>
      </div>
      <div className="p-card" style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
          <thead><tr>{['ID', 'Client', 'Proposal', 'Amount', 'Status', 'Date', ''].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {proposals.map(p => (
              <tr key={p.id} className="t-row">
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 12, color: ac, fontFamily: 'monospace', fontWeight: 600 }}>{p.id}</span></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13, color: '#1A1410' }}>{p.client}</span></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13, color: '#7A6E62' }}>{p.title}</span></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13, color: '#1A1410', fontWeight: 600 }}>{p.amount}</span></td>
                <td style={{ padding: '12px 16px' }}><PSBadge s={p.status} /></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{p.date}</span></td>
                <td style={{ padding: '12px 16px' }}><button onClick={() => printDocLight(p, 'proposal', brand)} style={{ background: '#F9F7F4', border: '1px solid rgba(0,0,0,.08)', color: '#7A6E62', padding: '5px 8px', borderRadius: 5, cursor: 'pointer' }}><Download size={12} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PModal open={modal} onClose={() => setModal(false)} title="New Proposal">
         <PFormField label="Client"><select className="p-inp" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })}><option value="">Select...</option>{clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select></PFormField>
         <PFormField label="Proposal Title"><input className="p-inp" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></PFormField>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
           <PFormField label="Amount"><input className="p-inp" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} /></PFormField>
           <PFormField label="Valid Until"><input className="p-inp" type="date" value={form.valid} onChange={e => setForm({ ...form, valid: e.target.value })} /></PFormField>
         </div>
         <button onClick={add} className="p-btn-gold lxf" style={{ width: '100%', padding: '12px', fontSize: 13, marginTop: 4 }}>Create Proposal</button>
      </PModal>
    </div>
  );
}

// --- ADMIN INVOICES ---
function AdminInvoices({ invoices, setInvoices, clients, brand }) {
  const ac = brand.color || '#C8A96E';
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ client: '', title: '', amount: '', due: '' });

  const add = () => {
    if (!form.client || !form.title) return;
    setInvoices([...invoices, { ...form, id: `INV-${String(invoices.length + 1).padStart(3, '0')}`, status: 'Draft', date: new Date().toISOString().split('T')[0] }]);
    setModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifySelf: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400 }}>Invoices</h2>
        <button onClick={() => setModal(true)} className="p-btn-gold lxf" style={{ padding: '9px 18px' }}><Plus size={14} />New Invoice</button>
      </div>
      <div className="p-card" style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['ID', 'Client', 'Amount', 'Status', 'Due', ''].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="t-row">
                <td style={{ padding: '12px 16px' }}>{inv.id}</td>
                <td style={{ padding: '12px 16px' }}>{inv.client}</td>
                <td style={{ padding: '12px 16px' }}>{inv.amount}</td>
                <td style={{ padding: '12px 16px' }}><PSBadge s={inv.status} /></td>
                <td style={{ padding: '12px 16px' }}>{inv.due}</td>
                <td style={{ padding: '12px 16px' }}><button onClick={() => printDocLight(inv, 'invoice', brand)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Download size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PModal open={modal} onClose={() => setModal(false)} title="New Invoice">
         <button onClick={add} className="p-btn-gold lxf" style={{ width: '100%', padding: '12px' }}>Create Invoice</button>
      </PModal>
    </div>
  );
}

// --- ADMIN NOTIFICATIONS ---
function AdminNotifications({ notifs, setNotifs, brand }) {
  const ac = brand.color || '#C8A96E';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400 }}>Notifications</h2>
      <div className="p-card">
        {notifs.map(n => (
          <div key={n.id} style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,.05)', display: 'flex', gap: 14 }}>
            <div style={{ color: ac }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
               <div style={{ fontWeight: 600, fontSize: 13 }}>{n.title}</div>
               <div style={{ fontSize: 12, color: '#7A6E62' }}>{n.desc}</div>
            </div>
            <div style={{ fontSize: 11, color: '#B5AFA9' }}>{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- ADMIN SETTINGS ---
function AdminSettings({ brand, setBrand, team, setTeam }) {
  const ac = brand.color || '#C8A96E';
  const [tab, setTab] = useState('brand');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400 }}>Settings</h2>
      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid rgba(0,0,0,.07)' }}>
        {['brand', 'contact', 'team', 'billing'].map(t => <button key={t} onClick={() => setTab(t)} className={`p-tab lxf${tab === t ? ' active' : ''}`}>{t}</button>)}
      </div>
      {tab === 'brand' && (
        <div className="p-card" style={{ padding: 24 }}>
          <PFormField label="Company Name"><input className="p-inp" value={brand.name} onChange={e => setBrand({ ...brand, name: e.target.value })} /></PFormField>
          <PFormField label="Brand Colour"><input type="color" value={ac} onChange={e => setBrand({ ...brand, color: e.target.value })} /></PFormField>
        </div>
      )}
    </div>
  );
}

// --- EXPORTED COMPONENT ---
export default function AdminPortal({ user, brand, setBrand, onLogout, onPreview }) {
  const [section, setSection] = useState('dashboard');
  const [sideOpen, setSideOpen] = useState(true);
  
  const [clients, setClients] = useState(CLIENTS_DATA);
  const [proposals, setProposals] = useState(PROPOSALS_DATA);
  const [invoices, setInvoices] = useState(INVOICES_DATA);
  const [portItems, setPortItems] = useState(PORTFOLIO_DATA);
  const [notifs, setNotifs] = useState(NOTIFS_DATA);
  const [team, setTeam] = useState(TEAM_MEMBERS);
  const [workspaces, setWorkspaces] = useState(WORKSPACES_DATA);
  const [bookings, setBookings] = useState(BOOKINGS_DATA);
  const [emails, setEmails] = useState(EMAIL_QUEUE);
  
  const ac = brand.color || '#C8A96E';
  const unreadCount = notifs.filter(n => n.unread).length;

  const nav = [
    { id: 'dashboard', icon: <LayoutDashboard size={15} />, label: 'Dashboard' },
    { id: 'crm', icon: <Users size={15} />, label: 'Clients' },
    { id: 'portfolio', icon: <ImgIcon size={15} />, label: 'Portfolio' },
    { id: 'proposals', icon: <FileText size={15} />, label: 'Proposals' },
    { id: 'invoices', icon: <Receipt size={15} />, label: 'Invoices' },
    ...(user.role === 'super' ? [{ id: 'workspaces', icon: <Layers size={15} />, label: 'Workspaces' }] : []),
    { id: 'bookings', icon: <Calendar size={15} />, label: 'Bookings' },
    { id: 'analytics', icon: <TrendingUp size={15} />, label: 'Analytics' },
    { id: 'emails', icon: <Mail size={15} />, label: 'Email Center' },
    { id: 'notifications', icon: <Bell size={15} />, label: 'Notifications' },
    { id: 'settings', icon: <Settings size={15} />, label: 'Settings' },
  ];

  const render = () => {
    switch (section) {
      case 'dashboard': return <AdminDash clients={clients} invoices={invoices} proposals={proposals} brand={brand} />;
      case 'crm': return <AdminCRM clients={clients} setClients={setClients} brand={brand} />;
      case 'portfolio': return <AdminPortfolio items={portItems} setItems={setPortItems} brand={brand} />;
      case 'proposals': return <AdminProposals proposals={proposals} setProposals={setProposals} clients={clients} brand={brand} />;
      case 'invoices': return <AdminInvoices invoices={invoices} setInvoices={setInvoices} clients={clients} brand={brand} />;
      case 'notifications': return <AdminNotifications notifs={notifs} setNotifs={setNotifs} brand={brand} />;
      case 'settings': return <AdminSettings brand={brand} setBrand={setBrand} team={team} setTeam={setTeam} />;
      default: return <div style={{ padding: 40, textAlign: 'center', color: '#B5AFA9' }}>Component for {section} coming soon in this modular build.</div>;
    }
  };

  return (
    <div className="lxf p-scroll" style={{ minHeight: '100vh', background: '#F9F7F4', display: 'flex', '--ac': ac }}>
      <div className="p-sidebar" style={{ width: sideOpen ? 240 : 0, minWidth: sideOpen ? 240 : 0 }}>
        <div style={{ padding: '22px 18px 18px', borderBottom: '1px solid rgba(0,0,0,.07)', flexShrink: 0 }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 28, objectFit: 'contain', marginBottom: 6 }} />
            : <div className="lxfh" style={{ fontSize: 20, color: '#1A1410', fontWeight: 400, whiteSpace: 'nowrap', marginBottom: 2 }}>{brand.name}</div>}
          <div className="lxf" style={{ fontSize: 10, color: ac, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>{user.role === 'super' ? 'Super Admin' : 'Studio Admin'}</div>
        </div>
        <div style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }} className="lx-scroll">
          {nav.map(n => (
            <div key={n.id} className={`p-nav lxf${section === n.id ? ' on' : ''}`} onClick={() => setSection(n.id)} style={{ whiteSpace: 'nowrap' }}>
              <span style={{ flexShrink: 0, color: section === n.id ? ac : '#C0B9B0' }}>{n.icon}</span>
              <span>{n.label}</span>
              {n.id === 'notifications' && unreadCount > 0 && <span style={{ marginLeft: 'auto', background: ac, color: '#1A1410', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10 }}>{unreadCount}</span>}
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 10px', borderTop: '1px solid rgba(0,0,0,.07)', flexShrink: 0 }}>
          <button onClick={onPreview} className="lxf" style={{ width: '100%', background: `${ac}10`, border: `1px solid ${ac}25`, color: ac, padding: '9px', fontSize: 12, borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 6, fontWeight: 500, whiteSpace: 'nowrap' }}><Eye size={13} />Preview Public Site</button>
          <div className="p-nav lxf" onClick={onLogout}><LogOut size={14} style={{ color: '#D0CCC8', flexShrink: 0 }} /><span>Sign Out</span></div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div className="p-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setSideOpen(!sideOpen)} style={{ background: 'none', border: 'none', color: '#C0B9B0', cursor: 'pointer', padding: 4, display: 'flex' }}><Menu size={18} /></button>
            <div className="lxf" style={{ fontSize: 13, color: '#B5AFA9', fontWeight: 500, textTransform: 'capitalize', letterSpacing: '.02em' }}>{section}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#16A34A' }} />
            <PAv i={user.email.slice(0, 2).toUpperCase()} s={32} c={ac} />
          </div>
        </div>
        <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }} className="lx-scroll">
          {render()}
        </div>
      </div>
    </div>
  );
}
