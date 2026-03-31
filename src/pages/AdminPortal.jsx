import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Users, FileText, Receipt, Image as ImgIcon, Settings,
  LogOut, Plus, Search, Trash2, Calendar, Clock, CheckCircle, Check, ArrowLeft,
  Activity, DollarSign, TrendingUp, Target, Mail, Send, Eye, Download,
  Sparkles, FolderOpen, ThumbsUp, ThumbsDown, Edit2, Camera, Upload, Link2, X,
  Globe, Layout, Truck, Bell, AlertTriangle, Smartphone
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Bar, ComposedChart
} from 'recharts';
import { 
  Av, SBadge, Modal, FF as PFormField, PAv, PSBadge,
  Spinner, NotificationBell
} from '../components/Shared';
import PulseTargetCard from '../components/PulseTargetCard';
import { uploadFile } from '../lib/firebase';
import { compressImage } from '../lib/image-utils';
import BA from '../components/BA';
import { 
  CLIENTS_DATA, PROPOSALS_DATA, INVOICES_DATA, 
  PORTFOLIO_DATA, WORKSPACES_DATA, NOTIFS_DATA, 
  TEAM_MEMBERS, BOOKINGS_DATA, EMAIL_QUEUE,
  BOOKING_SLOTS, ANALYTICS_MONTHLY, PIPELINE, TOP_SERVICES,
  REV, PIE_D, PIE_C, PROJECT_STAGES
} from '../data';

// --- HELPERS ---
function PModal({ open, onClose, title, children, w = 520 }) {
  if (!open) return null;
  return (
    <div className="overlay-modal" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box lxf" style={{ maxWidth: w }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <span className="lxfh" style={{ fontSize: 20, fontWeight: 400, color: '#1A1410' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B5AFA9', padding: 4, display: 'flex' }}><X size={16} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

// --- MODULES ---

function AdminDash({ clients, invoices, proposals, brand, getSLA, ...props }) {
  const ac = brand.color || '#C8A96E';
  const totalRev = (invoices || []).filter(i => i?.status === 'Paid').reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
  const dashboardStats = [
    { label: 'Revenue', value: `$${(totalRev / 1000).toFixed(0)}k`, target: 100, icon: <DollarSign size={20} />, sub: 'On track to hit $100k', color: ac, trend: 18 },
    { label: 'Active Clients', value: (clients || []).filter(c => c?.status === 'Active').length, target: 20, icon: <Users size={20} />, sub: 'Steady growth', color: '#16A34A', trend: 12 },
    { label: 'Delayed Projects', value: (clients || []).filter(c => (getSLA || props.getSLA) && c ? (getSLA || props.getSLA)(c).delayed : false).length, target: 2, icon: <Clock size={20} />, sub: 'High risk alerts', color: '#ff4444', trend: -5 },
    { label: 'Unpaid Invoices', value: (invoices || []).filter(i => i?.status === 'Pending').length, target: 5, icon: <Receipt size={20} />, sub: 'Awaiting clearance', color: '#B45309', trend: 2 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {dashboardStats.map(s => (
          <PulseTargetCard 
            key={s.label}
            label={s.label}
            value={s.value}
            target={s.target}
            icon={s.icon}
            sub={s.sub}
            color={s.color}
            trend={s.trend}
          />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: 20 }}>
        <div className="p-card" style={{ padding: 24 }}>
          <div className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#1A1410', marginBottom: 20 }}>Revenue (Last 6 Months)</div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={REV}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: '#B5AFA9', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#B5AFA9', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}k`} />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke={ac} fill={`${ac}12`} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-card" style={{ padding: 24 }}>
          <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(props.logs || []).slice(0, 7).map(l => (
              <div key={l.id} style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.type === 'Stage' ? ac : '#7E22CE', marginTop: 4 }} />
                <div>
                  <div className="lxf" style={{ fontSize: 13, fontWeight: 500 }}>{l.action}</div>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{l.created_at ? new Date(l.created_at).toLocaleDateString() : 'Just now'} • {l.user_name}</div>
                </div>
              </div>
            ))}
            {(!props.logs || props.logs.length === 0) && <div className="lxf" style={{ color: '#B5AFA9', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No recent activity.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminClients({ dbClients, createClient, updateClient, brand, ...props }) {
  const ac = brand.color || '#C8A96E';
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [newC, setNewC] = useState({ name: '', email: '', phone: '', company: '', notes: '', status: 'Active' });

  const filtered = (dbClients || []).filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.company?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    if (editing) await updateClient(editing.id, newC);
    else await createClient(newC);
    setShowAdd(false);
    setEditing(null);
    setNewC({ name: '', email: '', phone: '', company: '', notes: '', status: 'Active' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400 }}>Client Directory</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#B5AFA9' }} />
            <input className="p-inp" placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34, width: 240 }} />
          </div>
          <button onClick={() => setShowAdd(true)} className="p-btn-dark lxf" style={{ padding: '10px 20px' }}><Plus size={16} /> New Client</button>
        </div>
      </div>

      <div className="p-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Client', 'Company', 'Contact', 'Status', 'Joined', 'Actions'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="t-row">
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <PAv i={c.name.split(' ').map(n=>n[0]).join('')} s={36} c={ac} />
                    <div className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}><span className="lxf" style={{ fontSize: 13 }}>{c.company || 'Private'}</span></td>
                <td style={{ padding: '14px 16px' }}>
                  <div className="lxf" style={{ fontSize: 12 }}>{c.email}</div>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{c.phone}</div>
                </td>
                <td style={{ padding: '14px 16px' }}><PSBadge s={c.status} /></td>
                <td style={{ padding: '14px 16px' }}><span className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{new Date(c.joined).toLocaleDateString()}</span></td>
                <td style={{ padding: '14px 16px' }}>
                  <button onClick={() => { setEditing(c); setNewC(c); setShowAdd(true); }} className="lxf" style={{ background: 'none', border: 'none', color: ac, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PModal open={showAdd} onClose={() => { setShowAdd(false); setEditing(null); }} title={editing ? 'Edit Client' : 'Add New Client'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <PFormField label="Full Name"><input className="p-inp" value={newC.name} onChange={e => setNewC({...newC, name: e.target.value})} /></PFormField>
          <PFormField label="Email Address"><input className="p-inp" value={newC.email} onChange={e => setNewC({...newC, email: e.target.value})} /></PFormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <PFormField label="Phone Number"><input className="p-inp" value={newC.phone} onChange={e => setNewC({...newC, phone: e.target.value})} /></PFormField>
            <PFormField label="Company Name"><input className="p-inp" value={newC.company} onChange={e => setNewC({...newC, company: e.target.value})} /></PFormField>
          </div>
          <PFormField label="Internal Notes"><textarea className="p-inp" value={newC.notes} onChange={e => setNewC({...newC, notes: e.target.value})} rows={3} /></PFormField>
          <button onClick={handleSave} className="p-btn-dark lxf" style={{ marginTop: 8, padding: '12px' }}>{editing ? 'Update Profile' : 'Register Client'}</button>
        </div>
      </PModal>
    </div>
  );
}

function AdminInstallations({ clients, updateProject, dbClients, brand, ...props }) {
  const ac = brand.color || '#C8A96E';
  const [search, setSearch] = useState('');
  const [sel, setSel] = useState(null);
  const filtered = (clients || []).filter(c => (c.project || '').toLowerCase().includes(search.toLowerCase()));

  if (sel) {
    const proj = clients.find(x => x.id === sel);
    const paidAmount = (props.invoices || []).filter(i => i.parentId === sel && i.status === 'Paid').reduce((a, b) => a + parseFloat(b.amount?.replace(/[$,]/g, '') || 0), 0);
    const totalBudget = parseFloat(proj.budget?.replace(/[$,]/g, '') || 0);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => setSel(null)} className="p-btn-light" style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowLeft size={18} /></button>
            <div>
              <h2 className="lxfh" style={{ fontSize: 24, fontWeight: 400 }}>{proj.project}</h2>
              <div className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>{proj.cat || 'Full Interior Finishing'} • {proj.name}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase', letterSpacing: '.1em' }}>Project Progress</div>
            <div className="lxfh" style={{ fontSize: 20, color: ac }}>{proj.progress || 0}%</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 32, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            
            {/* TIMELINE EDITOR */}
            <div className="p-card" style={{ padding: 24 }}>
              <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 24 }}>Project Journey</h3>
              <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 15, top: 0, bottom: 0, width: 2, background: '#F0EBE5' }} />
                
                {PROJECT_STAGES.map((s, idx) => {
                  const isCurrent = (proj.stage || 1) === s.id;
                  const isPast = (proj.stage || 1) > s.id;
                  const isLast = idx === PROJECT_STAGES.length - 1;
                  
                  return (
                    <div key={s.id} style={{ display: 'flex', gap: 20, marginBottom: isLast ? 0 : 32, position: 'relative' }}>
                      <div 
                        onClick={() => props.updateStage(proj.id, s.id)}
                        style={{ 
                          width: 32, height: 32, borderRadius: '50%', 
                          background: isPast ? s.color : isCurrent ? '#fff' : '#fff',
                          border: isPast ? `2px solid ${s.color}` : isCurrent ? `2px solid ${s.color}` : '2px solid #DFD9D1',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          zIndex: 2, cursor: 'pointer', transition: 'all .3s'
                        }}
                      >
                        {isPast ? <Check size={16} color="#fff" strokeWidth={3} /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: isCurrent ? s.color : '#DFD9D1' }} />}
                      </div>

                      <div style={{ flex: 1, paddingTop: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div className="lxf" style={{ fontSize: 15, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#1A1410' : isPast ? '#7A6E62' : '#B5AFA9' }}>{s.name}</div>
                            {isCurrent && <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', marginTop: 4 }}>Active stage • Estimated {s.days} days remaining</div>}
                          </div>
                          {isCurrent && (
                            <div style={{ display: 'flex', gap: 8 }}>
                               <button onClick={() => props.updateStage(proj.id, s.id + 1)} className="p-btn-gold" style={{ padding: '6px 12px', fontSize: 11 }}>Next Stage</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TASKS & PROCUREMENT (SIMPLIFIED) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
               <AdminTasks projectId={sel} projectTitle={proj.project} {...props} brand={brand} />
               <AdminProcurement projectId={sel} procurements={props.procurements} createProcurement={props.createProcurement} updateProcurement={props.updateProcurement} deleteProcurement={props.deleteProcurement} brand={brand} />
            </div>

            <AdminGovernance projectId={sel} {...props} brand={brand} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* PAYMENTS MILESTONES */}
            <div className="p-card" style={{ padding: 24 }}>
               <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Payment Milestones</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { label: 'Deposit (40%)', amount: totalBudget * 0.4, status: paidAmount >= totalBudget * 0.4 ? 'Paid' : 'Pending' },
                    { label: 'Production (40%)', amount: totalBudget * 0.4, status: paidAmount >= totalBudget * 0.8 ? 'Paid' : 'Pending' },
                    { label: 'Final Payment (20%)', amount: totalBudget * 0.2, status: paidAmount >= totalBudget ? 'Paid' : 'Pending' }
                  ].map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F9F7F4', borderRadius: 8 }}>
                       <div>
                          <div className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                          <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>${m.amount.toLocaleString()}</div>
                       </div>
                       <SBadge s={m.status === 'Paid' ? 'PAID' : 'DUE'} />
                    </div>
                  ))}
               </div>
               <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(0,0,0,.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>Total Paid</span>
                    <span className="lxf" style={{ fontSize: 14, fontWeight: 700, color: '#16A34A' }}>${paidAmount.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>Outstanding</span>
                    <span className="lxf" style={{ fontSize: 14, fontWeight: 700, color: '#ff4444' }}>${(totalBudget - paidAmount).toLocaleString()}</span>
                  </div>
               </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="p-card" style={{ padding: 24, background: ac, color: '#fff' }}>
               <h3 className="lxfh" style={{ fontSize: 16, marginBottom: 16, color: '#fff' }}>Quick Actions</h3>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <button className="glass-btn" style={{ fontSize: 11, padding: '10px 0', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}><Plus size={14} /> Task</button>
                  <button className="glass-btn" style={{ fontSize: 11, padding: '10px 0', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}><Camera size={14} /> Photo</button>
                  <button className="glass-btn" style={{ fontSize: 11, padding: '10px 0', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}><FileText size={14} /> Approval</button>
                  <button className="glass-btn" style={{ fontSize: 11, padding: '10px 0', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}><DollarSign size={14} /> Invoice</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400 }}>Fabrication & Installations</h2>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#B5AFA9' }} />
          <input className="p-inp" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34, width: 240 }} />
        </div>
      </div>
      <div className="p-card overflow-hidden">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Installation', 'Category', 'Client(s)', 'Current Stage', 'Progress', 'Actions'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="t-row">
                <td style={{ padding: '14px 16px' }}><div className="lxf" style={{ fontSize: 14, fontWeight: 600 }}>{c.project}</div></td>
                <td style={{ padding: '14px 16px' }}><span className="lxf" style={{ fontSize: 12, color: ac, fontWeight: 600 }}>{c.cat || 'Full Interior'}</span></td>
                <td style={{ padding: '14px 16px' }}><div className="lxf" style={{ fontSize: 13, color: '#7A6E62' }}>{c.name}</div></td>
                <td style={{ padding: '14px 16px' }}><PSBadge s={PROJECT_STAGES.find(s=>s.id === (c.stage || 1))?.name || 'Order Confirmed'} /></td>
                <td style={{ padding: '14px 16px' }}><div className="prog" style={{ width: 80 }}><div className="prog-f" style={{ width: `${c.progress || 0}%`, background: ac }} /></div></td>
                <td style={{ padding: '14px 16px' }}><button onClick={() => setSel(c.id)} className="lxf" style={{ background: 'none', border: 'none', color: ac, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Manage Operations</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminProcurement({ projectId, procurements = [], createProcurement, updateProcurement, deleteProcurement, brand }) {
  const ac = brand.color || '#C8A96E';
  const myProcs = procurements.filter(p => p.parentId === projectId);
  
  const [showAdd, setShowAdd] = useState(false);
  const [na, setNa] = useState({ itemName: '', source: '', estimatedCost: '', actualCost: '', status: 'To Buy' });

  const totalEst = myProcs.reduce((acc, p) => acc + (parseFloat(p.estimatedCost) || 0), 0);
  const totalAct = myProcs.reduce((acc, p) => acc + (parseFloat(p.actualCost) || 0), 0);

  const handleAdd = async () => {
    if (!na.itemName || !na.estimatedCost) return alert('Name and Estimated Cost required');
    if (createProcurement) {
      await createProcurement(projectId, {
        itemName: na.itemName, source: na.source, estimatedCost: na.estimatedCost, 
        actualCost: na.actualCost, status: na.status, createdAt: new Date().toISOString()
      });
      setNa({ itemName: '', source: '', estimatedCost: '', actualCost: '', status: 'To Buy' });
      setShowAdd(false);
    }
  };

  return (
    <div className="p-card" style={{ padding: 24 }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
         <h3 className="lxfh" style={{ fontSize: 18 }}>Procurement Tracker</h3>
         <button onClick={() => setShowAdd(!showAdd)} className="lxf" style={{ fontSize: 13, background: 'none', border: 'none', color: ac, fontWeight: 600, cursor: 'pointer' }}>+ Add Item</button>
       </div>
       
       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{ pading: 12, background: '#F9F7F4', borderRadius: 8, padding: 12 }}>
             <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase' }}>Total Estimated</div>
             <div className="lxf" style={{ fontSize: 18, fontWeight: 700 }}>${totalEst.toLocaleString()}</div>
          </div>
          <div style={{ pading: 12, background: '#F9F7F4', borderRadius: 8, padding: 12 }}>
             <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase' }}>Actual Spent</div>
             <div className="lxf" style={{ fontSize: 18, fontWeight: 700, color: totalAct > totalEst ? '#ff4444' : '#16A34A' }}>${totalAct.toLocaleString()}</div>
          </div>
       </div>

       {showAdd && (
         <div style={{ padding: 16, border: '1px solid rgba(0,0,0,.05)', borderRadius: 8, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
             <PFormField label="Item Name"><input className="p-inp" placeholder="e.g. Dining Chairs (x6)" value={na.itemName} onChange={e => setNa({...na, itemName: e.target.value})} /></PFormField>
             <PFormField label="Source/Vendor"><input className="p-inp" placeholder="e.g. Foshan, China" value={na.source} onChange={e => setNa({...na, source: e.target.value})} /></PFormField>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
             <PFormField label="Est. Cost ($)"><input type="number" className="p-inp" value={na.estimatedCost} onChange={e => setNa({...na, estimatedCost: e.target.value})} /></PFormField>
             <PFormField label="Actual Cost ($)"><input type="number" className="p-inp" value={na.actualCost} onChange={e => setNa({...na, actualCost: e.target.value})} /></PFormField>
             <PFormField label="Status">
               <select className="p-inp" value={na.status} onChange={e => setNa({...na, status: e.target.value})}>
                 <option>To Buy</option><option>Ordered</option><option>Received</option>
               </select>
             </PFormField>
           </div>
           <button onClick={handleAdd} className="p-btn-dark lxf" style={{ marginTop: 8 }}>Save Item</button>
         </div>
       )}

       <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
         {myProcs.map(p => (
           <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, border: '1px solid rgba(0,0,0,.05)', borderRadius: 8 }}>
             <div>
               <div className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>{p.itemName}</div>
               <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{p.source} · {p.status}</div>
             </div>
             <div style={{ textAlign: 'right' }}>
                <div className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>${parseFloat(p.actualCost || p.estimatedCost).toLocaleString()}</div>
                <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9' }}>{p.actualCost ? 'Actual' : 'Estimated'}</div>
             </div>
           </div>
         ))}
         {myProcs.length === 0 && <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', fontStyle: 'italic' }}>No procurement items tracked yet.</div>}
       </div>
    </div>
  );
}

function AdminGovernance({ projectId, approvals, createApproval, updateApproval, changeRequests, updateChangeRequest, brand }) {
  const ac = brand.color || '#C8A96E';
  const [showAdd, setShowAdd] = useState(false);
  const [na, setNa] = useState({ itemName: '', description: '', specifications: '', imageUrl: '' });
  const [evaluating, setEvaluating] = useState(null); // CR ID
  const [evalData, setEvalData] = useState({ costImpact: '', timelineImpact: '' });

  const myApprovals = (approvals || []).filter(a => a.parentId === projectId);
  const myCRs = (changeRequests || []).filter(c => c.parentId === projectId);

  const handleEvaluate = async (id) => {
    await updateChangeRequest(id, { ...evalData, status: 'evaluated' }, projectId);
    setEvaluating(null);
    setEvalData({ costImpact: '', timelineImpact: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="p-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 className="lxfh" style={{ fontSize: 18 }}>Approvals Pipeline</h3>
          <button onClick={() => setShowAdd(!showAdd)} className="lxf" style={{ fontSize: 13, background: 'none', border: 'none', color: ac, fontWeight: 600, cursor: 'pointer' }}>+ Request Approval</button>
        </div>

        {showAdd && (
          <div style={{ padding: 16, background: '#F9F7F4', borderRadius: 8, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <PFormField label="Item/Material Name"><input className="p-inp" value={na.itemName} onChange={e => setNa({...na, itemName: e.target.value})} /></PFormField>
              <PFormField label="Specifications"><input className="p-inp" value={na.specifications} onChange={e => setNa({...na, specifications: e.target.value})} /></PFormField>
              <PFormField label="Image URL"><input className="p-inp" value={na.imageUrl} onChange={e => setNa({...na, imageUrl: e.target.value})} /></PFormField>
              <PFormField label="Description"><textarea className="p-inp" rows={2} value={na.description} onChange={e => setNa({...na, description: e.target.value})} /></PFormField>
              <button onClick={() => { createApproval(projectId, na); setShowAdd(false); setNa({itemName:'', description:'', specifications:'', imageUrl:''}); }} className="p-btn-dark lxf">Send to Client</button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {myApprovals.map(a => (
              <div key={a.id} style={{ padding: 12, border: '1px solid rgba(0,0,0,.05)', borderRadius: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
                {a.imageUrl && <img src={a.imageUrl} style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }} alt="" />}
                <div style={{ flex: 1 }}>
                    <div className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>{a.itemName}</div>
                    <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9' }}>{a.status.toUpperCase()}</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.status === 'approved' ? '#16A34A' : a.status === 'rejected' ? '#ff4444' : '#FF9800' }} />
              </div>
            ))}
            {myApprovals.length === 0 && <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', fontStyle: 'italic', gridColumn: 'span 2' }}>No items in approval pipeline.</div>}
        </div>
      </div>

      <div className="p-card" style={{ padding: 24 }}>
         <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Change Requests</h3>
         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myCRs.map(r => (
              <div key={r.id} style={{ padding: 16, border: '1px solid rgba(0,0,0,.05)', borderRadius: 8 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div className="lxf" style={{ fontSize: 14, fontWeight: 600 }}>{r.description}</div>
                    <SBadge s={r.status} />
                 </div>
                 {r.status === 'pending' && !evaluating && (
                   <button onClick={() => setEvaluating(r.id)} className="p-btn-gold" style={{ fontSize: 11, padding: '4px 12px' }}>Evaluate Impact</button>
                 )}
                 {evaluating === r.id && (
                   <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(0,0,0,.03)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                         <input className="p-inp" placeholder="Cost Impact (e.g. +$500)" value={evalData.costImpact} onChange={e => setEvalData({...evalData, costImpact: e.target.value})} style={{ fontSize: 12 }} />
                         <input className="p-inp" placeholder="Timeline Impact (e.g. +2 days)" value={evalData.timelineImpact} onChange={e => setEvalData({...evalData, timelineImpact: e.target.value})} style={{ fontSize: 12 }} />
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                         <button onClick={() => handleEvaluate(r.id)} className="p-btn-dark" style={{ flex: 1, fontSize: 11, padding: '8px' }}>Send Evaluation</button>
                         <button onClick={() => setEvaluating(null)} className="p-btn-light" style={{ flex: 1, fontSize: 11, padding: '8px' }}>Cancel</button>
                      </div>
                   </div>
                 )}
                 {r.status === 'evaluated' && (
                   <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>Evaluated: {r.costImpact} | {r.timelineImpact}</div>
                 )}
              </div>
            ))}
            {myCRs.length === 0 && <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', fontStyle: 'italic' }}>No change requests to manage.</div>}
         </div>
      </div>
    </div>
  );
}

function AdminTasks({ projectId, projectTitle, tasks, createTask, deleteTask, updateTask, teamMembers, brand }) {
  const ac = brand.color || '#C8A96E';
  const [showAdd, setShowAdd] = useState(false);
  const [nt, setNt] = useState({ title: '', desc: '', assignedTo: '', stage: 1, dueDate: '' });
  
  const [fStage, setFStage] = useState('all');
  const [fUser, setFUser] = useState('all');
  const [fStatus, setFStatus] = useState('all');

  const projectTasks = (tasks || []).filter(t => {
    const isProj = t.parentId === projectId;
    const isStage = fStage === 'all' || String(t.stage) === fStage;
    const isUser = fUser === 'all' || t.assignedTo === fUser;
    const isStatus = fStatus === 'all' || t.status === fStatus;
    return isProj && isStage && isUser && isStatus;
  });

  const handleAdd = async () => {
    if (!nt.title || !nt.assignedTo) return alert('Title and Assignee required');
    await createTask({
      project_id: projectId,
      project_title: projectTitle,
      title: nt.title,
      description: nt.desc,
      assignedTo: nt.assignedTo,
      stage: parseInt(nt.stage),
      status: 'pending',
      dueDate: nt.dueDate
    });
    setNt({ title: '', desc: '', assignedTo: '', stage: 1, dueDate: '' });
    setShowAdd(false);
  };

  return (
    <div className="p-card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 className="lxfh" style={{ fontSize: 18 }}>Tasks</h3>
        <button onClick={() => setShowAdd(!showAdd)} className="lxf" style={{ fontSize: 13, background: 'none', border: 'none', color: ac, fontWeight: 600, cursor: 'pointer' }}>+ New Task</button>
      </div>

      {showAdd && (
        <div style={{ background: '#F9F7F4', padding: 16, borderRadius: 8, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <PFormField label="Task Title"><input className="p-inp" value={nt.title} onChange={e => setNt({...nt, title: e.target.value})} /></PFormField>
            <PFormField label="Assign To">
              <select className="p-inp" value={nt.assignedTo} onChange={e => setNt({...nt, assignedTo: e.target.value})}>
                <option value="">Select Staff</option>
                {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </PFormField>
            <PFormField label="Stage">
              <select className="p-inp" value={nt.stage} onChange={e => setNt({...nt, stage: e.target.value})}>
                {PROJECT_STAGES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </PFormField>
            <button onClick={handleAdd} className="p-btn-dark lxf">Create Task</button>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <select className="p-inp" style={{ fontSize: 10, padding: '4px 8px' }} value={fStage} onChange={e => setFStage(e.target.value)}>
          <option value="all">All Stages</option>
          {PROJECT_STAGES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select className="p-inp" style={{ fontSize: 10, padding: '4px 8px' }} value={fStatus} onChange={e => setFStatus(e.target.value)}>
          <option value="all">Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Done</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projectTasks.length === 0 && <div className="lxf" style={{ color: '#B5AFA9', fontSize: 12, textAlign: 'center', padding: '10px 0' }}>No tasks found</div>}
        {projectTasks.map(t => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', background: '#F9F7F4', borderRadius: 8 }}>
             <button onClick={() => updateTask(t.id, { status: t.status === 'completed' ? 'pending' : 'completed' }, projectId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.status === 'completed' ? '#16A34A' : '#DFD9D1' }}>
                <CheckCircle size={18} />
             </button>
             <div style={{ flex: 1 }}>
                <div className="lxf" style={{ fontSize: 13, fontWeight: 500, textDecoration: t.status === 'completed' ? 'line-through' : 'none', color: t.status === 'completed' ? '#B5AFA9' : '#1A1410' }}>{t.title}</div>
                <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9' }}>{teamMembers.find(m=>m.id === t.assignedTo)?.name || 'Unassigned'} • Stage {t.stage}</div>
             </div>
             <button onClick={() => deleteTask && deleteTask(t.id, projectId)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', opacity: 0.4 }}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminBookings({ bookings, setBookings, clients, brand }) {
  const ac = brand.color || '#C8A96E';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Bookings</h2>
      <div className="p-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['ID', 'Client', 'Type', 'Date', 'Time', 'Status'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="t-row">
                <td style={{ padding: '12px 16px' }}><span style={{ fontFamily: 'monospace', color: ac }}>{b.id}</span></td>
                <td style={{ padding: '12px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><PAv i={b.av} s={28} c={ac} /><span className="lxf" style={{ fontSize: 13 }}>{b.client}</span></div></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13 }}>{b.type}</span></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13 }}>{b.date}</span></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13 }}>{b.time}</span></td>
                <td style={{ padding: '12px 16px' }}><PSBadge s={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



function AdminLogistics({ shipments, clients, createShipment, updateShipment, brand }) {
  const ac = brand.color || '#C8A96E';
  const [showAdd, setShowAdd] = useState(false);
  const [newS, setNewS] = useState({ projectId: '', item: '', supplier: '', status: 'Order Placed', eta: '', container: '' });

  const addShipment = async () => {
    if (!newS.projectId || !newS.item) return alert('Project and Item required');
    await createShipment(newS);
    setNewS({ projectId: '', item: '', supplier: '', status: 'Order Placed', eta: '', container: '' });
    setShowAdd(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Logistics & Procurement</h2>
        <button onClick={() => setShowAdd(!showAdd)} className="p-btn-dark lxf" style={{ padding: '10px 20px', fontSize: 13, gap: 8, display: 'flex', alignItems: 'center' }}><Plus size={16} /> Track Shipment</button>
      </div>

      {showAdd && (
        <div className="p-card" style={{ padding: 24, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <PFormField label="Select Project">
                <select className="p-inp" value={newS.projectId} onChange={e => setNewS({...newS, projectId: e.target.value})}>
                  <option value="">Select a project...</option>
                  {clients.map(p => <option key={p.id} value={p.id}>{p.project || p.title}</option>)}
                </select>
              </PFormField>
              <PFormField label="Item/Details"><input className="p-inp" value={newS.item} onChange={e => setNewS({...newS, item: e.target.value})} placeholder="e.g. Structural Glass Panels" /></PFormField>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <PFormField label="Supplier"><input className="p-inp" value={newS.supplier} onChange={e => setNewS({...newS, supplier: e.target.value})} /></PFormField>
              <PFormField label="ETA"><input className="p-inp" type="date" value={newS.eta} onChange={e => setNewS({...newS, eta: e.target.value})} /></PFormField>
              <PFormField label="Container ID"><input className="p-inp" value={newS.container} onChange={e => setNewS({...newS, container: e.target.value})} /></PFormField>
           </div>
           <button onClick={addShipment} className="p-btn-gold lxf" style={{ padding: '12px' }}>Initialize Tracking</button>
        </div>
      )}

      <div className="p-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Shipment ID', 'Project', 'Item/Details', 'Supplier', 'Status', 'ETA'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {(shipments || []).filter(s => s.isShipment || s.status === 'Shipped').map(s => (
              <tr key={s.id} className="t-row">
                <td style={{ padding: '16px' }}><span style={{ fontFamily: 'monospace', color: ac, fontWeight: 600 }}>{s.id.slice(-6).toUpperCase()}</span></td>
                <td style={{ padding: '16px' }}><div className="lxf" style={{ fontSize: 13, fontWeight: 500 }}>{clients.find(p => p.id === s.parentId)?.project || 'Project'}</div></td>
                <td style={{ padding: '16px' }}>
                  <div className="lxf" style={{ fontSize: 13 }}>{s.item || s.itemName}</div>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>Container: {s.container || 'TBD'}</div>
                </td>
                <td style={{ padding: '16px' }}><span className="lxf" style={{ fontSize: 12 }}>{s.supplier || s.source}</span></td>
                <td style={{ padding: '16px' }}>
                  <select className="lxf" style={{ fontSize: 12, padding: '4px 8px', borderRadius: 4, background: '#F9F7F4', border: 'none', color: '#1A1410' }} value={s.status} onChange={e => updateShipment(s.id, { status: e.target.value })}>
                    {['Order Placed', 'Shipped', 'At Customs', 'In Transit', 'Delivered'].map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </td>
                <td style={{ padding: '16px' }}><span className="lxf" style={{ fontSize: 12, color: '#7A6E62' }}>{s.eta}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminStaff({ team, setTeam, brand }) {
  const ac = brand.color || '#C8A96E';
  
  const addMember = () => {
    // Note: Ideally triggers Supabase Auth Invite
    alert('Invite new staff via Supabase Dashboard to enable login.');
  };

  const updateM = (id, fields) => {
    props.updateMember(id, fields);
  };

  const deleteM = (id) => {
    if (window.confirm('Remove this staff member?')) {
      props.deleteMember(id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Staff Management</h2>
        <button onClick={addMember} className="p-btn-dark lxf" style={{ padding: '10px 20px', fontSize: 13, gap: 8, display: 'flex', alignItems: 'center' }}><Plus size={16} /> Add Staff</button>
      </div>

      <div className="p-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Staff', 'Role', 'Status', 'Joined', 'Actions'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {team.map(m => (
              <tr key={m.id} className="t-row">
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <PAv i={m.av} s={34} c={ac} />
                    <div>
                      <input className="lxf" style={{ fontSize: 13, background: 'none', border: 'none', color: '#1A1410', fontWeight: 500, width: '100%' }} value={m.name} onChange={e => updateM(m.id, { name: e.target.value })} />
                      <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{m.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <select className="lxf" style={{ fontSize: 13, border: 'none', background: 'none', color: '#1A1410', cursor: 'pointer' }} value={m.role} onChange={e => updateM(m.id, { role: e.target.value })}>
                    {['Admin', 'Manager', 'Designer', 'Stager'].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => updateM(m.id, { status: m.status === 'Active' ? 'Inactive' : 'Active' })} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <PSBadge s={m.status} />
                  </button>
                </td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{m.joined_at ? new Date(m.joined_at).toLocaleDateString() : ''}</span></td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => deleteM(m.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: 8 }}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminAnalyticsPage({ clients, invoices, brand, getSLA }) {
  const ac = brand.color || '#C8A96E';
  const totalRev = (invoices || []).filter(i => i.status === 'Paid').reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
  const outstanding = (invoices || []).filter(i => i.status === 'Pending').reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
  const delayed = (clients || []).filter(c => getSLA && c ? getSLA(c).delayed : false).length;

  const exportCSV = () => {
    const headers = ['Project', 'Client', 'Stage', 'Deadline', 'Status'];
    const rows = clients.map(c => [c.project, c.name, `Stage ${c.stage || 1}`, getSLA(c).date, getSLA(c).delayed ? 'DELAYED' : 'On Track']);
    const content = [headers, ...rows].map(r => r.join(',')).join('\n');
    console.log('Exporting CSV:\n', content);
    alert('Project Report exported to console (Simulated CSV Download)');
  };

  const perfData = [
    { name: 'Completed', value: 12, fill: '#16A34A' },
    { name: 'On Track', value: 8, fill: ac },
    { name: 'Delayed', value: delayed, fill: '#ff4444' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Platform Analytics</h2>
        <button onClick={exportCSV} className="p-btn-dark lxf" style={{ padding: '10px 20px', fontSize: 13, gap: 8, display: 'flex', alignItems: 'center' }}><Download size={16} /> Export CSV Report</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <PulseTargetCard 
          label="TOTAL REVENUE" 
          value={`$${(totalRev / 1000).toFixed(1)}k`} 
          target={500} 
          icon={<DollarSign size={20} />} 
          color="#16A34A" 
          trend={22}
          sub="Exceeding Q1 forecasts"
        />
        <PulseTargetCard 
          label="OUTSTANDING" 
          value={`$${(outstanding / 1000).toFixed(1)}k`} 
          target={50} 
          icon={<Receipt size={20} />} 
          color="#ff4444" 
          trend={-12}
          sub="Requires follow-up"
        />
        <PulseTargetCard 
          label="AVG. PROJECT DELAY" 
          value={`${delayed} Projects`} 
          target={0} 
          icon={<AlertTriangle size={20} />} 
          color="#1A1410" 
          trend={5}
          sub="System pressure high"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        <div className="p-card" style={{ padding: 24 }}>
          <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Revenue Growth (Projected)</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart data={ANALYTICS_MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#B5AFA9' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#B5AFA9' }} />
                <Tooltip />
                <Area type="monotone" dataKey="rev" fill={`${ac}15`} stroke={ac} strokeWidth={2} />
                <Bar dataKey="proj" barSize={20} fill="#16A34A30" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-card" style={{ padding: 24 }}>
          <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Project Health Distribution</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={perfData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {perfData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            {perfData.map(d => (
              <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: d.fill }} /><span className="lxf" style={{ fontSize: 12 }}>{d.name}</span></div>
                <span className="lxf" style={{ fontSize: 12, fontWeight: 600 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminEmailCenter({ emails, setEmails, brand }) {
  const ac = brand.color || '#C8A96E';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Email Center</h2>
      <div className="p-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['ID', 'To', 'Subject', 'Status', 'Sent At'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {emails.map(e => (
              <tr key={e.id} className="t-row">
                <td style={{ padding: '12px 16px' }}><span style={{ fontFamily: 'monospace', color: ac }}>{e.id}</span></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13 }}>{e.toName}</span></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13 }}>{e.subject}</span></td>
                <td style={{ padding: '12px 16px' }}><PSBadge s={e.status} /></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{e.sentAt}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function AdminPortfolio({ content, setContent, brand }) {
  const ac = brand.color || '#C8A96E';
  const portfolio = content.portfolio || [];
  
  const addProject = () => {
    const newProj = {
      id: Date.now(),
      title: 'New Luxury Project',
      cat: 'Residential',
      after: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80',
      before: '',
      year: new Date().getFullYear().toString(),
      loc: 'Accra, Ghana',
      area: 'TBD',
      duration: 'TBD',
      budget: 'TBD',
      style: 'Modern Luxury',
      hasBA: false,
      desc: 'Describe the transformation here...',
      imgs: []
    };
    setContent('portfolio', [newProj, ...portfolio]);
  };

  const updateProj = (idx, fields) => {
    const newP = [...portfolio];
    newP[idx] = { ...newP[idx], ...fields };
    setContent('portfolio', newP);
  };

  const deleteProj = (idx) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const newP = portfolio.filter((_, i) => i !== idx);
      setContent('portfolio', newP);
    }
  };

  const onFile = async (idx, field, file) => {
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1600, quality: 0.7 });
        const url = await uploadFile('assets', `portfolio/${Date.now()}_${field}_${file.name}`, compressed);
        updateProj(idx, { [field]: url, hasBA: field === 'before' ? true : portfolio[idx].hasBA });
      } catch (err) { alert('Upload failed: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Portfolio Manager</h2>
        <button onClick={addProject} className="p-btn-dark lxf" style={{ padding: '10px 20px', fontSize: 13, gap: 8, display: 'flex', alignItems: 'center' }}><Plus size={16} /> Add New Project</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {portfolio.map((p, i) => (
          <div key={p.id} className="p-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 100, height: 60, borderRadius: 6, overflow: 'hidden', background: '#F9F7F4' }}>
                  <img src={p.after} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div className="lxfh" style={{ fontSize: 18 }}>{p.title}</div>
                  <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{p.cat} • {p.year}</div>
                </div>
              </div>
              <button onClick={() => deleteProj(i)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: 8 }}><Trash2 size={18} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <PFormField label="Project Title"><input className="p-inp" value={p.title} onChange={e => updateProj(i, { title: e.target.value })} /></PFormField>
              <PFormField label="Category">
                <select className="p-inp" value={p.cat} onChange={e => updateProj(i, { cat: e.target.value })}>
                  {['Full Interior', 'Kitchen Installation', 'Washroom Setup', 'Office Fit-out', 'Residential Finishing', 'Glass & Aluminum'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </PFormField>
              <PFormField label="After Image (Local Upload)">
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <button className="p-btn-light lxf" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}><Upload size={14} /> {p.after.startsWith('data:') ? 'Local Asset' : 'Static Asset'}</button>
                  <input type="file" accept="image/*" onChange={e => onFile(i, 'after', e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </div>
              </PFormField>
              <PFormField label="Before Image (Optional)">
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <button className="p-btn-light lxf" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}><Upload size={14} /> {p.before?.startsWith('data:') ? 'Local Asset' : p.before ? 'Static Asset' : 'No Before Image'}</button>
                  <input type="file" accept="image/*" onChange={e => onFile(i, 'before', e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </div>
              </PFormField>
              <PFormField label="Location"><input className="p-inp" value={p.loc} onChange={e => updateProj(i, { loc: e.target.value })} /></PFormField>
              <PFormField label="Style"><input className="p-inp" value={p.style} onChange={e => updateProj(i, { style: e.target.value })} /></PFormField>
            </div>
            
            <div style={{ marginTop: 16 }}>
              <PFormField label="Detailed Description">
                <textarea className="p-inp" rows={2} style={{ resize: 'vertical' }} value={p.desc} onChange={e => updateProj(i, { desc: e.target.value })} />
              </PFormField>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- CMS MODULE ---

function AdminCMS({ content, syncCMS, brand, onPreview, ...props }) {
  const [sub, setSub] = useState('branding');
  const ac = brand.color || '#C8A96E';
  
  const tabs = [
    { id: 'branding', label: 'Branding', icon: <Sparkles size={16} /> },
    { id: 'homepage', label: 'Homepage', icon: <Layout size={16} /> },
    { id: 'services', label: 'Services', icon: <Activity size={16} /> },
    { id: 'products', label: 'Products', icon: <Smartphone size={16} /> },
    { id: 'gallery', label: 'Gallery', icon: <ImgIcon size={16} /> },
    { id: 'about', label: 'About', icon: <Users size={16} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <ThumbsUp size={16} /> },
    { id: 'footer', label: 'Footer', icon: <Link2 size={16} /> },
  ];

  const renderCMS = () => {
    switch(sub) {
      case 'branding': return <CMSBranding brand={content.brand} onSave={val => syncCMS('brand', val)} ac={ac} />;
      case 'homepage': return <CMSHomepage hero={content.hero} onSave={val => syncCMS('hero', val)} ac={ac} />;
      case 'services': return <CMSServices services={content.services} onSave={val => syncCMS('services', val)} ac={ac} />;
      case 'products': return <CMSProducts products={content.products} onSave={val => syncCMS('products', val)} ac={ac} />;
      case 'gallery': return <CMSGallery portfolio={content.portfolio} onSave={val => syncCMS('portfolio', val)} ac={ac} />;
      case 'about': return <CMSAbout about={content.about} onSave={val => syncCMS('about', val)} ac={ac} />;
      case 'testimonials': return <CMSTestimonials list={content.testimonials} onSave={val => syncCMS('testimonials', val)} ac={ac} />;
      case 'footer': return <CMSFooter data={content.footer} onSave={val => syncCMS('footer', val)} ac={ac} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400 }}>Website CMS</h2>
        <button onClick={onPreview} className="p-btn-gold lxf" style={{ padding: '8px 16px' }}>View Live Site</button>
      </div>

      <div style={{ display: 'flex', gap: 10, background: '#F9F7F4', padding: 4, borderRadius: 10, alignSelf: 'flex-start' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setSub(t.id)} 
            className="lxf"
            style={{ 
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, border: 'none', 
              background: sub === t.id ? '#fff' : 'transparent', color: sub === t.id ? ac : '#7A6E62', 
              fontSize: 12, fontWeight: sub === t.id ? 600 : 400, cursor: 'pointer', transition: 'all .2s',
              boxShadow: sub === t.id ? '0 2px 8px rgba(0,0,0,.04)' : 'none'
            }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="p-card" style={{ padding: 28 }}>
        {renderCMS()}
      </div>
    </div>
  );
}

function CMSBranding({ brand, onSave, ac }) {
  const [f, setF] = useState(brand || {});

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1000, quality: 0.8 });
        const url = await uploadFile('assets', `branding/${Date.now()}_${field}_${file.name}`, compressed);
        setF(prev => ({ ...prev, [field]: url }));
      } catch (err) { alert('Upload failed. Please ensure Firebase Storage is enabled in your Google Cloud Console. Error: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 className="lxfh" style={{ fontSize: 20 }}>Identity & Colors</h3>
        <PFormField label="Company Name"><input className="p-inp" value={f.name || ''} onChange={e => setF({...f, name: e.target.value})} /></PFormField>
        <PFormField label="Tagline"><input className="p-inp" value={f.tagline || ''} onChange={e => setF({...f, tagline: e.target.value})} /></PFormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <PFormField label="Primary Background"><input type="color" className="p-inp" style={{ height: 44, padding: 4 }} value={f.bgPrimary || '#FDFCFB'} onChange={e => setF({...f, bgPrimary: e.target.value})} /></PFormField>
          <PFormField label="Secondary Surface"><input type="color" className="p-inp" style={{ height: 44, padding: 4 }} value={f.bgSecondary || '#FFFFFF'} onChange={e => setF({...f, bgSecondary: e.target.value})} /></PFormField>
          <PFormField label="Accent Color"><input type="color" className="p-inp" style={{ height: 44, padding: 4 }} value={f.color || '#C8A96E'} onChange={e => setF({...f, color: e.target.value})} /></PFormField>
          <PFormField label="Global Text Color"><input type="color" className="p-inp" style={{ height: 44, padding: 4 }} value={f.textColor || '#121212'} onChange={e => setF({...f, textColor: e.target.value})} /></PFormField>
        </div>
        <PFormField label="Typography Style">
          <select className="p-inp" value={f.fontFamily || 'Inter, sans-serif'} onChange={e => setF({...f, fontFamily: e.target.value})}>
             <option value="'Inter', sans-serif">Modern Sans (Inter)</option>
             <option value="'Playfair Display', serif">Elegant Serif (Playfair)</option>
             <option value="'Space Mono', monospace">Technical Mono (Space Mono)</option>
          </select>
        </PFormField>
        <button onClick={() => onSave(f)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save Changes</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 className="lxfh" style={{ fontSize: 20 }}>Logo & Contact</h3>
        <PFormField label="Company Logo">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
             <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'logo')} />
             <input className="p-inp" placeholder="Or paste Image URL" style={{ flex: 1 }} value={f.logo || ''} onChange={e => setF({...f, logo: e.target.value})} />
          </div>
        </PFormField>
        <PFormField label="Official Phone"><input className="p-inp" value={f.phone || ''} onChange={e => setF({...f, phone: e.target.value})} /></PFormField>
        <PFormField label="Official Email"><input className="p-inp" value={f.email || ''} onChange={e => setF({...f, email: e.target.value})} /></PFormField>
        <PFormField label="Physical Location"><input className="p-inp" value={f.location || ''} onChange={e => setF({...f, location: e.target.value})} /></PFormField>
      </div>
    </div>
  );
}


function CMSHomepage({ hero, onSave, ac }) {
  const [slides, setSlides] = useState(hero.slides || []);

  const onFile = async (idx, file) => {
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1600, quality: 0.8 });
        const url = await uploadFile('assets', `homepage/${Date.now()}_slide_${idx}_${file.name}`, compressed);
        const ns = [...slides];
        ns[idx].img = url;
        setSlides(ns);
      } catch (err) { alert('Upload failed: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
       <h3 className="lxfh" style={{ fontSize: 20 }}>Hero Carousel</h3>
       {slides.map((s, i) => (
         <div key={i} className="p-card" style={{ padding: 20, background: '#F9F7F4', border: '1px solid rgba(0,0,0,.04)' }}>
           <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                 <div style={{ height: 100, borderRadius: 6, overflow: 'hidden', background: '#eee' }}>
                    <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <button className="p-btn-light lxf" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0', fontSize: 10 }}><Upload size={12} /> Change Image</button>
                    <input type="file" accept="image/*" onChange={e => onFile(i, e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                 </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input className="p-inp" placeholder="Headline" value={s.title} onChange={e => {
                  const ns = [...slides]; ns[i].title = e.target.value; setSlides(ns);
                }} />
                <textarea className="p-inp" placeholder="Sub-text" rows={2} value={s.sub} onChange={e => {
                  const ns = [...slides]; ns[i].sub = e.target.value; setSlides(ns);
                }} />
              </div>
           </div>
         </div>
       ))}
       <button onClick={() => onSave({ slides })} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Update Homepage</button>
    </div>
  );
}

function CMSServices({ services, onSave, ac }) {
  const [list, setList] = useState(services || []);

  const onFile = async (idx, file) => {
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1000, quality: 0.8 });
        const url = await uploadFile('assets', `services/${Date.now()}_img_${idx}_${file.name}`, compressed);
        const nl = [...list];
        nl[idx].img = url;
        setList(nl);
      } catch (err) { alert('Upload failed: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <h3 className="lxfh" style={{ fontSize: 20 }}>Service Offerings</h3>
         <button onClick={() => setList([...list, { id: Date.now(), name: 'New Service', short: '', desc: '', packages: [], gallery: [], img: '' }])} className="p-btn-gold lxf" style={{ padding: '6px 14px', fontSize: 11 }}>Add Service</button>
       </div>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
         {list.map((s, i) => (
           <div key={s.id} className="p-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
             <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 80, height: 80, borderRadius: 8, background: '#F9F7F4', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                   {s.img ? <img src={s.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B5AFA9' }}><ImgIcon size={24} /></div>}
                   <input type="file" accept="image/*" onChange={e => onFile(i, e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                   <PFormField label="Service Name" nomargin><input className="p-inp" style={{ padding: '6px 10px' }} value={s.name} onChange={e => { const nl = [...list]; nl[i].name = e.target.value; setList(nl); }} /></PFormField>
                </div>
             </div>
             <PFormField label="Description" nomargin><textarea className="p-inp" value={s.desc} rows={3} onChange={e => { const nl = [...list]; nl[i].desc = e.target.value; setList(nl); }} /></PFormField>
             <button onClick={() => setList(list.filter((_, idx) => idx !== i))} style={{ color: '#ff4444', fontSize: 11, background: 'none', border: 'none', padding: 0, marginTop: 'auto', alignSelf: 'flex-start', cursor: 'pointer' }}>Delete Service</button>
           </div>
         ))}
       </div>
       <button onClick={() => onSave(list)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save Services</button>
    </div>
  );
}

function CMSProducts({ products, onSave, ac }) {
  const [list, setList] = useState(products || []);
  const [newItem, setNewItem] = useState({ name: '', desc: '', img: '', cat: 'Glass' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <h3 className="lxfh" style={{ fontSize: 20 }}>Industrial Product Catalog</h3>
       <div style={{ background: '#F9F7F4', padding: 24, borderRadius: 12 }}>
          <div className="lxf" style={{ fontSize: 12, fontWeight: 600, marginBottom: 16 }}>Add New Product</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
            <input className="p-inp" placeholder="Product Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
            <input className="p-inp" placeholder="Category" value={newItem.cat} onChange={e => setNewItem({...newItem, cat: e.target.value})} />
            <input className="p-inp" placeholder="Image URL" value={newItem.img} onChange={e => setNewItem({...newItem, img: e.target.value})} />
          </div>
          <textarea className="p-inp" placeholder="Technical Description" rows={2} value={newItem.desc} onChange={e => setNewItem({...newItem, desc: e.target.value})} />
          <button onClick={() => { setList([...list, { ...newItem, id: Date.now() }]); setNewItem({ name:'', desc:'', img:'', cat:'Glass' }); }} className="p-btn-gold lxf" style={{ marginTop: 12, padding: '8px 20px' }}>Add to Catalog</button>
       </div>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
         {list.map(p => (
           <div key={p.id} className="p-card" style={{ padding: 16 }}>
              <img src={p.img} alt="" style={{ width: '100%', height: 120, objectFit: 'contain', marginBottom: 12, background: '#fff', borderRadius: 6 }} />
              <div className="lxf" style={{ fontSize: 10, color: ac, fontWeight: 600 }}>{p.cat}</div>
              <div className="lxfh" style={{ fontSize: 16, marginBottom: 4 }}>{p.name}</div>
              <p className="lxf" style={{ fontSize: 12, color: '#7A6E62', lineHeight: 1.6 }}>{p.desc}</p>
              <button onClick={() => setList(list.filter(x => x.id !== p.id))} style={{ color: '#ff4444', fontSize: 11, background: 'none', border: 'none', padding: 0, marginTop: 12, cursor: 'pointer' }}>Remove</button>
           </div>
         ))}
       </div>
       <button onClick={() => onSave(list)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Update Catalog</button>
    </div>
  );
}

function CMSAbout({ about, onSave, ac }) {
  const [f, setF] = useState(about || {});

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1200, quality: 0.8 });
        const url = await uploadFile('assets', `about/${Date.now()}_${file.name}`, compressed);
        setF(prev => ({ ...prev, image: url }));
      } catch (err) { alert('Upload failed. Error: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 className="lxfh" style={{ fontSize: 20 }}>Company Story</h3>
        <PFormField label="Founder Name"><input className="p-inp" value={f.founder || ''} onChange={e => setF({...f, founder: e.target.value})} /></PFormField>
        <PFormField label="Story Headline"><input className="p-inp" value={f.storyTitle || ''} onChange={e => setF({...f, storyTitle: e.target.value})} /></PFormField>
        <PFormField label="Mission Summary"><textarea className="p-inp" rows={4} value={f.story || ''} onChange={e => setF({...f, story: e.target.value})} /></PFormField>
        <PFormField label="Full Vision Statement"><textarea className="p-inp" rows={4} value={f.bio || ''} onChange={e => setF({...f, bio: e.target.value})} /></PFormField>
        <button onClick={() => onSave(f)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save About Page</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 className="lxfh" style={{ fontSize: 20 }}>About Page Image</h3>
        <div style={{ height: 300, background: '#F9F7F4', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
          {f.image ? <img src={f.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>}
          <div style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}>
             <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: '100%', height: '100%', cursor: 'pointer' }} />
          </div>
        </div>
        <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textAlign: 'center' }}>Click the container above to change image</div>
      </div>
    </div>
  );
}

function CMSFooter({ data, onSave, ac }) {
  const [links, setLinks] = useState(data?.links || []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <h3 className="lxfh" style={{ fontSize: 20 }}>Footer Information</h3>
       <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
         <div className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>Policy Links</div>
         {links.map((l, i) => (
           <div key={i} style={{ display: 'flex', gap: 12 }}>
             <input className="p-inp" placeholder="Label" value={l.label} onChange={e => { const nl = [...links]; nl[i].label = e.target.value; setLinks(nl); }} />
             <input className="p-inp" placeholder="URL" value={l.url} onChange={e => { const nl = [...links]; nl[i].url = e.target.value; setLinks(nl); }} />
             <button onClick={() => setLinks(links.filter((_, idx) => idx !== i))} style={{ color: '#ff4444', border: 'none', background: 'none', cursor: 'pointer' }}><X size={16} /></button>
           </div>
         ))}
         <button onClick={() => setLinks([...links, { label: '', url: '#' }])} className="lxf" style={{ fontSize: 11, color: ac, background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>+ Add Link</button>
       </div>
       <button onClick={() => onSave({ links })} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save Footer</button>
    </div>
  );
}

function CMSGallery({ portfolio, onSave, ac }) {
  const [list, setList] = useState(portfolio || []);

  const onFile = async (idx, field, file) => {
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1600, quality: 0.8 });
        const url = await uploadFile('assets', `portfolio/${Date.now()}_${field}_${file.name}`, compressed);
        const nl = [...list];
        nl[idx][field] = url;
        setList(nl);
      } catch (err) { alert('Upload failed: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <h3 className="lxfh" style={{ fontSize: 20 }}>Project Portfolio Settings</h3>
       <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', marginBottom: -10 }}>You can also manage these projects comprehensively in the main Portfolio tab on the left menu.</div>
       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
         {list.map((p, i) => (
           <div key={p.id} className="p-card" style={{ padding: 20 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
               <div className="lxfh" style={{ fontSize: 18 }}>{p.title || 'Untitled Project'}</div>
               <button onClick={() => setList(list.filter((_, idx) => idx !== i))} style={{ color: '#ff4444', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}><Trash2 size={18} /></button>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
               <PFormField label="Project Title"><input className="p-inp" value={p.title || ''} onChange={e => { const nl = [...list]; nl[i].title = e.target.value; setList(nl); }} /></PFormField>
               <PFormField label="Category">
                 <select className="p-inp" value={p.cat || 'Full Interior'} onChange={e => { const nl = [...list]; nl[i].cat = e.target.value; setList(nl); }}>
                   <option>Full Interior</option><option>Kitchen Installation</option><option>Washroom Setup</option>
                   <option>Office Fit-out</option><option>Residential Finishing</option><option>Glass & Aluminum</option>
                 </select>
               </PFormField>
               <PFormField label="After Image (Main)">
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <button className="p-btn-light lxf" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}><Upload size={14} /> {p.after?.startsWith('https') ? 'Uploaded Asset' : p.after?.startsWith('data:') ? 'Local Asset' : 'Select Image'}</button>
                    <input type="file" accept="image/*" onChange={e => onFile(i, 'after', e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  </div>
               </PFormField>
               <PFormField label="Before Image (Optional)">
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <button className="p-btn-light lxf" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}><Upload size={14} /> {p.before?.startsWith('https') ? 'Uploaded Asset' : p.before?.startsWith('data:') ? 'Local Asset' : 'Select Image'}</button>
                    <input type="file" accept="image/*" onChange={e => onFile(i, 'before', e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  </div>
               </PFormField>
               <PFormField label="Location"><input className="p-inp" value={p.loc || ''} onChange={e => { const nl = [...list]; nl[i].loc = e.target.value; setList(nl); }} /></PFormField>
             </div>
           </div>
         ))}
         <button onClick={() => setList([...list, { id: Date.now(), title: 'New Project', cat: 'Full Interior', year: new Date().getFullYear().toString(), loc: '', desc: '', before: '', after: '' }])} className="p-btn-gold lxf" style={{ alignSelf: 'flex-start', padding: '8px 24px', borderRadius: 8 }}>+ Add Project</button>
       </div>
       <button onClick={() => onSave(list)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save Portfolio</button>
    </div>
  );
}

function CMSTestimonials({ list, onSave, ac }) {
  const [items, setItems] = useState(list || []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <h3 className="lxfh" style={{ fontSize: 20 }}>Client Testimonials</h3>
       <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
         {items.map((t, i) => (
           <div key={i} className="p-card" style={{ padding: 20, display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: ac, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{t.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                  <input className="p-inp" placeholder="Name" value={t.name} style={{ width: 200 }} onChange={e => { const ni = [...items]; ni[i].name = e.target.value; setItems(ni); }} />
                  <input className="p-inp" placeholder="Role" value={t.role} style={{ width: 200 }} onChange={e => { const ni = [...items]; ni[i].role = e.target.value; setItems(ni); }} />
                </div>
                <textarea className="p-inp" value={t.text} rows={2} onChange={e => { const ni = [...items]; ni[i].text = e.target.value; setItems(ni); }} />
              </div>
              <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} style={{ color: '#ff4444', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
           </div>
         ))}
       </div>
       <button onClick={() => setItems([...items, { name: 'New Client', role: 'Developer', text: '', rating: 5 }])} className="p-btn-gold lxf" style={{ alignSelf: 'flex-start', padding: '8px 20px' }}>Add Testimonial</button>
       <button onClick={() => onSave(items)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save Testimonials</button>
    </div>
  );
}



// --- MAIN PORTAL SHELL ---
export default function AdminPortal({ user, onLogout, onPreview, content, setContent, ...props }) {
  const [view, setView] = useState('dash');
  const { brand } = props;
  const ac = brand.color || '#C8A96E';

  const menu = [
    { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'clients', label: 'Client Directory', icon: <Users size={18} /> },
    { id: 'crm', label: 'Installations', icon: <Truck size={18} /> },
    { id: 'logistics', label: 'Logistics', icon: <Globe size={18} /> },
    { id: 'cms', label: 'Website CMS', icon: <Settings size={18} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <ImgIcon size={18} /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <Activity size={18} /> },
    { id: 'email', label: 'Email Center', icon: <Mail size={18} /> },
    { id: 'staff', label: 'Staff Management', icon: <Users size={18} /> },
  ];

  const renderView = () => {
    const common = { user, brand, content, setContent, ...props };
    switch (view) {
      case 'dash': return <AdminDash {...common} />;
      case 'clients': return <AdminClients {...common} />;
      case 'cms': return <AdminCMS {...common} onPreview={onPreview} />;
      case 'crm': return <AdminInstallations {...common} />;
      case 'logistics': return <AdminLogistics shipments={props.shipments} setShipments={props.setShipments} {...common} />;
      case 'portfolio': return <AdminPortfolio {...common} />;
      case 'bookings': return <AdminBookings {...common} />;
      case 'analytics': return <AdminAnalyticsPage {...common} />;
      case 'email': return <AdminEmailCenter {...common} />;
      case 'staff': return <AdminStaff team={props.teamMembers} setTeam={props.setTeamMembers} {...common} />;
      default: return <AdminDash {...common} />;
    }
  };

  return (
    <div className="lx-admin" style={{ display: 'flex', minHeight: '100vh', background: '#F9F7F4', '--ac': ac }}>
      <aside style={{ width: 260, background: '#1A1410', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '32px 24px' }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 28, maxWidth: '100%', objectFit: 'contain' }} /> : <div className="lxfh" style={{ fontSize: 22, color: '#F9F7F4' }}>{brand.name}</div>}
        </div>
        <nav style={{ flex: 1, padding: '0 16px' }}>
          {menu.map(m => (
            <button key={m.id} onClick={() => setView(m.id)} className={`p-nav-item lxf${view === m.id ? ' active' : ''}`} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'none', border: 'none', borderRadius: 8, cursor: 'pointer', color: view === m.id ? ac : 'rgba(249,247,244,.45)', transition: 'all .3s', marginBottom: 4 }}>
              {m.icon} <span style={{ fontSize: 13, fontWeight: view === m.id ? 600 : 400 }}>{m.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <button onClick={onLogout} className="lxf" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'none', border: 'none', color: 'rgba(249,247,244,.4)', cursor: 'pointer' }}><LogOut size={16} /> Logout</button>
        </div>
      </aside>
      <main style={{ flex: 1, marginLeft: 260, padding: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <div>
              <div className="lxf" style={{ fontSize: 11, letterSpacing: '.12em', color: ac, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Operations Control</div>
              <h1 className="lxfh" style={{ fontSize: 26 }}>Glasstech Control Center</h1>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <NotificationBell notifications={props.userNotifications || props.notifications} onMarkRead={props.markNotificationRead} />
              <button onClick={onPreview} className="p-btn-light lxf" style={{ padding: '9px 18px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Eye size={14} /> Preview Site</button>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${ac}22`, border: `1.5px solid ${ac}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: ac }}>{user?.name?.slice(0, 2).toUpperCase() || 'AD'}</div>
            </div>
          </header>
          {renderView()}
        </div>
      </main>
    </div>
  );
}
