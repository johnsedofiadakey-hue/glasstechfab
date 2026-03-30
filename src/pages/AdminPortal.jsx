import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Users, FileText, Receipt, Image as ImgIcon, Settings,
  LogOut, Plus, Search, Trash2, Calendar, Clock, CheckCircle, ArrowLeft,
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

function AdminDash({ clients, invoices, proposals, brand, ...props }) {
  const ac = brand.color || '#C8A96E';
  const totalRev = invoices.filter(i => i.status === 'Paid').reduce((a, i) => a + parseFloat(i.amount.replace(/[$,]/g, '')), 0);
  const stats = [
    { label: 'Revenue', value: `$${(totalRev / 1000).toFixed(0)}k`, icon: <DollarSign size={18} />, sub: '+18% this month', color: ac },
    { label: 'Active Clients', value: clients.filter(c => c.status === 'Active').length, icon: <Users size={18} />, color: '#16A34A' },
    { label: 'Delayed Projects', value: clients.filter(c => props.getSLA(c).delayed).length, icon: <Clock size={18} />, color: '#ff4444' },
    { label: 'Unpaid Invoices', value: invoices.filter(i => i.status === 'Pending').length, icon: <Receipt size={18} />, color: '#B45309' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {stats.map(s => (
          <div key={s.label} className="p-stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div className="lxf" style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#B5AFA9' }}>{s.label}</div>
              <div style={{ color: s.color }}>{s.icon}</div>
            </div>
            <div className="lxfh" style={{ fontSize: 24, marginBottom: 4 }}>{s.value}</div>
            <div className="lxf" style={{ fontSize: 11, color: '#16A34A' }}>{s.sub || 'Target achievement: 94%'}</div>
          </div>
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

function AdminCRM({ clients, setClients, brand, ...props }) {
  const ac = brand.color || '#C8A96E';
  const [search, setSearch] = useState('');
  const [sel, setSel] = useState(null);
  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  

  if (sel) {
    const c = clients.find(x => x.id === sel);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setSel(null)} className="p-btn-light lxf" style={{ padding: '8px 12px' }}><ArrowLeft size={16} /></button>
          <h2 className="lxfh" style={{ fontSize: 28, fontWeight: 400 }}>Project Control: {c.project}</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="p-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 className="lxfh" style={{ fontSize: 18 }}>Lifecycle Stages (1–7)</h3>
                <PSBadge s={`Stage ${c.stage || 1}`} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PROJECT_STAGES.map(s => {
                  const isCurrent = (c.stage || 1) === s.id;
                  const isPast = (c.stage || 1) > s.id;
                  return (
                    <div key={s.id} onClick={() => {
                        props.updateProject(c.id, { stage: s.id });
                        props.logAction(props.user.name ?? props.user.email, 'Stage', `Updated project stage to: ${s.name}`, c.project);
                    }} 
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: isCurrent ? `${s.color}15` : '#F9F7F4', border: isCurrent ? `1px solid ${s.color}40` : '1px solid transparent', borderRadius: 8, cursor: 'pointer', transition: 'all .2s' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: isPast ? s.color : isCurrent ? s.color : '#eee', color: isPast || isCurrent ? '#fff' : '#B5AFA9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>
                        {isPast ? <CheckCircle size={14} /> : s.id}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="lxf" style={{ fontSize: 13, fontWeight: isCurrent ? 600 : 400, color: isCurrent ? '#1A1410' : isPast ? '#B5AFA9' : '#1A1410' }}>{s.name}</div>
                        <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9' }}>SLA: {s.days} Days</div>
                      </div>
                      {isCurrent && <div style={{ fontSize: 10, color: s.color, fontWeight: 700 }}>ACTIVE</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-card" style={{ padding: 24 }}>
               <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Internal Notes & Visibility</h3>
               <textarea className="p-inp" placeholder="Add an internal note..." rows={3} style={{ resize: 'none' }} />
               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                  <label className="lxf" style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: '#B5AFA9' }}><input type="checkbox" /> Client Visible</label>
                  <button className="p-btn-dark lxf" style={{ padding: '6px 12px', fontSize: 11 }}>Post Note</button>
               </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="p-card" style={{ padding: 24 }}>
              <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Project Metadata</h3>
              <PFormField label="Assigned Project Manager">
                <select className="p-inp" value={c.pmId || ''} onChange={e => {
                    const tid = parseInt(e.target.value);
                    props.updateProject(c.id, { pmId: tid });
                    const pm = props.teamMembers.find(t => t.id === tid);
                    props.logAction(props.user.name ?? props.user.email, 'Staff', `Assigned ${pm?.name} as PM for ${c.project}`);
                  }}>
                  <option value="">Select Manager</option>
                  {props.teamMembers.filter(t => t.role === 'Admin' || t.role === 'Manager').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </PFormField>
              <div style={{ marginTop: 20 }}>
                <PFormField label="Project Start Date"><input type="date" className="p-inp" value={c.startDate || ''} onChange={e => {
                    props.updateProject(c.id, { startDate: e.target.value });
                    props.logAction(props.user.name ?? props.user.email, 'Project', `Updated start date for ${c.project}`);
                  }} /></PFormField>
              </div>
              <div style={{ marginTop: 20 }}>
                <PFormField label="SLA Deadline">
                  {(() => {
                    const sla = props.getSLA(c);
                    return (
                      <div className="lxf" style={{ fontSize: 13, color: sla.delayed ? '#ff4444' : '#16A34A', fontWeight: 600 }}>
                        <Clock size={14} style={{ marginRight: 6 }} /> 
                        {sla.date} {sla.delayed ? '(Delayed)' : '(On Track)'}
                      </div>
                    );
                  })()}
                </PFormField>
              </div>
            </div>

            <div className="p-card" style={{ padding: 24 }}>
              <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Associated Clients</h3>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                <PAv i={c.av} s={32} c={ac} />
                <div className="lxf" style={{ fontSize: 13, fontWeight: 500 }}>{c.name} (Primary)</div>
              </div>
              <button className="p-btn-light lxf" style={{ width: '100%', borderStyle: 'dashed' }}><Plus size={14} style={{ marginRight: 6 }} /> Add Partner/Client</button>
            </div>

            <div className="p-card" style={{ padding: 24 }}>
               <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 16 }}>Financial Overview</h3>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>Contract Value</span><span className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>{c.budget}</span></div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>Paid to Date</span><span className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#16A34A' }}>$12,500</span></div>
               <div style={{ height: 1, background: '#eee', margin: '8px 0' }} />
               <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>Outstanding Balance</span><span className="lxf" style={{ fontSize: 13, fontWeight: 700, color: '#ff4444' }}>$3,500</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Clients</h2></div>
        <div style={{ position: 'relative' }}>
          <Search size={13} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#B5AFA9' }} />
          <input className="p-inp lxf" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ paddingLeft: 32, width: 220 }} />
        </div>
      </div>
      <div className="p-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Client', 'Project', 'Progress', 'Status', 'Joined', 'Actions'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="t-row">
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <PAv i={c.av} s={34} c={ac} />
                    <div>
                      <div className="lxf" style={{ fontSize: 13, color: '#1A1410', fontWeight: 500 }}>{c.name}</div>
                      <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13 }}>{c.project}</span></td>
                <td style={{ padding: '12px 16px' }}><div className="prog" style={{ width: 80 }}><div className="prog-f" style={{ width: `${c.progress}%`, background: ac }} /></div></td>
                <td style={{ padding: '12px 16px' }}><PSBadge s={c.status} /></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{c.joined}</span></td>
                <td style={{ padding: '12px 16px' }}><button onClick={() => setSel(c.id)} className="lxf" style={{ background: 'none', border: 'none', color: ac, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Manage</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sel && (
        <div className="lxf-overlay" onClick={() => setSel(null)}>
          <div className="lxf-modal lx-scroll" onClick={e => e.stopPropagation()} style={{ maxWidth: 1000, maxHeght: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 className="lxfh" style={{ fontSize: 24 }}>Manage Project: {clients.find(c => c.id === sel)?.project}</h2>
              <button onClick={() => setSel(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B5AFA9' }}><X size={20} /></button>
            </div>
             <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                   <AdminCRMDetail c={clients.find(c => c.id === sel)} brand={brand} {...props} />
                   <AdminGovernance projectId={sel} {...props} brand={brand} />
                   <AdminTasks projectId={sel} projectTitle={clients.find(c => c.id === sel)?.project} {...props} brand={brand} />
                </div>
                <div>
                   <AdminCRMStatus c={clients.find(c => c.id === sel)} brand={brand} {...props} />
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminGovernance({ projectId, approvals, changeRequests, createApproval, updateChangeRequest, brand }) {
  const ac = brand.color || '#C8A96E';
  const [showAddApp, setShowAddApp] = useState(false);
  const [na, setNa] = useState({ itemName: '', desc: '', specs: '', imageUrl: '' });
  
  const [evalModal, setEvalModal] = useState(null);
  const [evalData, setEvalData] = useState({ costImpact: '', timelineImpact: '' });

  const myApprovals = (approvals || []).filter(a => a.parentId === projectId);
  const myCRs = (changeRequests || []).filter(r => r.parentId === projectId);

  const handleAddApp = async () => {
    if (!na.itemName || !na.desc) return alert('Name and Description required');
    await createApproval(projectId, {
      itemName: na.itemName,
      description: na.desc,
      specifications: na.specs,
      imageUrl: na.imageUrl,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    setNa({ itemName: '', desc: '', specs: '', imageUrl: '' });
    setShowAddApp(false);
  };

  const handleEvaluate = async () => {
    await updateChangeRequest(evalModal.id, { 
      ...evalData, 
      status: 'evaluated' 
    }, projectId);
    setEvalModal(null);
    setEvalData({ costImpact: '', timelineImpact: '' });
  };

  return (
    <div className="p-card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 className="lxfh" style={{ fontSize: 18 }}>Project Governance</h3>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setShowAddApp(!showAddApp)} className="p-btn-gold lxf" style={{ padding: '6px 14px', fontSize: 11 }}>
            {showAddApp ? 'Cancel' : <><Plus size={14} style={{ marginRight: 6 }} /> Add Technical Item</>}
          </button>
        </div>
      </div>

      {showAddApp && (
        <div style={{ background: '#F9F7F4', padding: 16, borderRadius: 8, marginBottom: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="lxf" style={{ fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Item Name</label>
            <input className="p-inp" value={na.itemName} onChange={e => setNa({...na, itemName: e.target.value})} placeholder="e.g. Low-E Insulated Glass" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="lxf" style={{ fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Technical Specs / JSON</label>
            <input className="p-inp" value={na.specs} onChange={e => setNa({...na, specs: e.target.value})} placeholder="e.g. 12mm thick, Charcoal Tint" />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="lxf" style={{ fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Image URL</label>
            <input className="p-inp" value={na.imageUrl} onChange={e => setNa({...na, imageUrl: e.target.value})} placeholder="https://..." />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="lxf" style={{ fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Description</label>
            <textarea className="p-inp" value={na.desc} onChange={e => setNa({...na, desc: e.target.value})} placeholder="Compliance details..." rows={2} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
             <button onClick={handleAddApp} className="p-btn-dark lxf" style={{ width: '100%', marginTop: 8 }}>Add to Approval Pipeline</button>
          </div>
        </div>
      )}

      {/* APPROVALS LIST */}
      <div style={{ marginBottom: 24 }}>
        <div className="lxf" style={{ fontSize: 12, fontWeight: 600, color: '#B5AFA9', marginBottom: 12 }}>Technical Sign-offs ({myApprovals.length})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {myApprovals.map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, border: '1px solid rgba(0,0,0,.04)', borderRadius: 8 }}>
              {a.imageUrl && <img src={a.imageUrl} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} alt="spec" />}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{a.itemName}</div>
                <div style={{ fontSize: 11, color: '#B5AFA9' }}>Created: {new Date(a.createdAt).toLocaleDateString()}</div>
              </div>
              <SBadge s={a.status} />
            </div>
          ))}
          {myApprovals.length === 0 && <div style={{ fontSize: 12, color: '#B5AFA9', textAlign: 'center', py: 8 }}>No technical items created</div>}
        </div>
      </div>

      {/* CHANGE REQUESTS LIST */}
      <div>
        <div className="lxf" style={{ fontSize: 12, fontWeight: 600, color: '#B5AFA9', marginBottom: 12 }}>Change Requests ({myCRs.length})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {myCRs.map(r => (
            <div key={r.id} style={{ padding: 12, border: '1px solid rgba(0,0,0,.04)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.description}</div>
                <SBadge s={r.status} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 11, color: '#B5AFA9' }}>{new Date(r.createdAt).toLocaleDateString()}</div>
                {r.status === 'pending' && (
                  <button 
                    onClick={() => setEvalModal(r)}
                    className="p-btn-light" style={{ padding: '4px 8px', fontSize: 10 }}
                  >Evaluate Impact</button>
                )}
                {r.status === 'evaluated' && <div style={{ fontSize: 10, color: ac, fontWeight: 600 }}>Awaiting Client Approval</div>}
              </div>
            </div>
          ))}
          {myCRs.length === 0 && <div style={{ fontSize: 12, color: '#B5AFA9', textAlign: 'center', py: 8 }}>No change requests</div>}
        </div>
      </div>

      {evalModal && (
        <div className="overlay-modal" onClick={() => setEvalModal(null)}>
          <div className="modal-box lxf" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <h3 className="lxfh" style={{ fontSize: 20, marginBottom: 20 }}>Impact Evaluation</h3>
            <PFormField label="Cost Impact ($)">
              <input className="p-inp" placeholder="e.g. +$2,500" value={evalData.costImpact} onChange={e => setEvalData({...evalData, costImpact: e.target.value})} />
            </PFormField>
            <div style={{ marginTop: 12 }}>
              <PFormField label="Timeline Impact (Days)">
                <input className="p-inp" placeholder="e.g. +7 Days" value={evalData.timelineImpact} onChange={e => setEvalData({...evalData, timelineImpact: e.target.value})} />
              </PFormField>
            </div>
            <button onClick={handleEvaluate} className="p-btn-gold" style={{ width: '100%', marginTop: 24, padding: 12 }}>Send to Client</button>
          </div>
        </div>
      )}
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
        <h3 className="lxfh" style={{ fontSize: 18 }}>Project Tasks</h3>
        <button onClick={() => setShowAdd(!showAdd)} className="p-btn-gold lxf" style={{ padding: '6px 14px', fontSize: 11 }}>
          {showAdd ? 'Cancel' : <><Plus size={14} style={{ marginRight: 6 }} /> Add Task</>}
        </button>
      </div>

      {showAdd && (
        <div style={{ background: '#F9F7F4', padding: 16, borderRadius: 8, marginBottom: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="lxf" style={{ fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Task Title</label>
            <input className="p-inp" value={nt.title} onChange={e => setNt({...nt, title: e.target.value})} placeholder="e.g. Design Kitchen Layout" />
          </div>
          <div>
            <label className="lxf" style={{ fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Assign To</label>
            <select className="p-inp" value={nt.assignedTo} onChange={e => setNt({...nt, assignedTo: e.target.value})}>
              <option value="">Select Staff</option>
              {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label className="lxf" style={{ fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Project Stage</label>
            <select className="p-inp" value={nt.stage} onChange={e => setNt({...nt, stage: e.target.value})}>
              {[1,2,3,4,5,6,7].map(s => <option key={s} value={s}>Stage {s}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
             <button onClick={handleAdd} className="p-btn-dark lxf" style={{ width: '100%', marginTop: 8 }}>Create Task</button>
          </div>
        </div>
      )}

      {/* Filters Row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <select className="p-inp" style={{ flex: 1, minWidth: 100, fontSize: 11 }} value={fStage} onChange={e => setFStage(e.target.value)}>
          <option value="all">All Stages</option>
          {[1,2,3,4,5,6,7].map(s => <option key={s} value={s}>Stage {s}</option>)}
        </select>
        <select className="p-inp" style={{ flex: 1, minWidth: 100, fontSize: 11 }} value={fUser} onChange={e => setFUser(e.target.value)}>
          <option value="all">All Users</option>
          {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <select className="p-inp" style={{ flex: 1, minWidth: 100, fontSize: 11 }} value={fStatus} onChange={e => setFStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {projectTasks.length === 0 && <div className="lxf" style={{ color: '#B5AFA9', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No matching tasks found.</div>}
        {projectTasks.map(t => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid rgba(0,0,0,.05)', borderRadius: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span className="lxf" style={{ fontSize: 13, fontWeight: 500 }}>{t.title}</span>
                <span className="lxf" style={{ fontSize: 10, color: '#B5AFA9', padding: '2px 6px', background: '#F3F4F6', borderRadius: 4 }}>Stage {t.stage}</span>
              </div>
              <div className="lxf" style={{ fontSize: 11, color: '#7A6E62' }}>Assigned to: {teamMembers.find(m => m.id === t.assignedTo)?.name || 'Unknown'}</div>
            </div>
            <select 
              value={t.status} 
              onChange={e => updateTask(t.id, { status: e.target.value }, projectId)}
              className="lxf"
              style={{ padding: '4px 8px', borderRadius: 6, fontSize: 10, border: '1px solid rgba(0,0,0,.1)', background: '#fff', cursor: 'pointer', outline: 'none' }}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={() => deleteTask(t.id, projectId)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: 4 }}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminCRMDetail({ c, brand, ...props }) {
  const ac = brand.color || '#C8A96E';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="p-card" style={{ padding: 24 }}>
        <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 24 }}>Project Timeline & Stages</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {PROJECT_STAGES.map(s => {
            const isCurrent = c.stage === s.id;
            const isPast = c.stage > s.id;
            return (
              <div key={s.id} onClick={() => props.updateProject(c.id, { stage: s.id })} 
                   style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', padding: '10px 14px', borderRadius: 8, background: isCurrent ? `${ac}08` : 'transparent', border: isCurrent ? `1px solid ${ac}30` : '1px solid transparent' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: isCurrent ? ac : isPast ? `${ac}22` : '#eee', color: isCurrent || isPast ? (isCurrent ? '#fff' : ac) : '#B5AFA9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                  {isPast ? <CheckCircle size={14} /> : s.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="lxf" style={{ fontSize: 13, fontWeight: isCurrent ? 600 : 400, color: isCurrent ? '#1A1410' : isPast ? '#B5AFA9' : '#1A1410' }}>{s.name}</div>
                  <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9' }}>SLA: {s.days} Days</div>
                </div>
                {isCurrent && <div style={{ fontSize: 10, color: ac, fontWeight: 700 }}>ACTIVE</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-card" style={{ padding: 24 }}>
         <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Internal Notes</h3>
         <textarea className="p-inp" placeholder="Add an internal note..." rows={3} style={{ resize: 'none' }} />
         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
            <label className="lxf" style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: '#B5AFA9' }}><input type="checkbox" /> Client Visible</label>
            <button className="p-btn-dark lxf" style={{ padding: '6px 12px', fontSize: 11 }}>Post Note</button>
         </div>
      </div>
    </div>
  );
}

function AdminCRMStatus({ c, brand, ...props }) {
  const ac = brand.color || '#C8A96E';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="p-card" style={{ padding: 24 }}>
        <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Project Management</h3>
        <PFormField label="Assigned Manager">
          <select className="p-inp" value={c.managerId || ''} onChange={e => {
              const tid = e.target.value;
              props.updateProject(c.id, { managerId: tid });
              const pm = props.teamMembers.find(t => String(t.id) === tid);
              props.logAction(c.id, 'Staff', `Assigned ${pm?.name || pm?.email} as PM`, c.project);
            }}>
            <option value="">Select Manager</option>
            {props.teamMembers.filter(t => t.role === 'Admin' || t.role === 'Manager').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </PFormField>
        <div style={{ marginTop: 20 }}>
          <PFormField label="Start Date">
            <input type="date" className="p-inp" value={c.startDate || ''} onChange={e => props.updateProject(c.id, { startDate: e.target.value })} />
          </PFormField>
        </div>
        <div style={{ marginTop: 20 }}>
          <PFormField label="SLA Status">
            {(() => {
              const sla = props.getSLA(c);
              return <div className="lxf" style={{ fontSize: 13, color: sla.delayed ? '#ff4444' : '#16A34A', fontWeight: 600 }}>{sla.date} {sla.delayed && '(Delayed)'}</div>;
            })()}
          </PFormField>
        </div>
      </div>

      <div className="p-card" style={{ padding: 24 }}>
        <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 16 }}>Financials</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>Contract</span><span className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>{c.budget}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>Paid</span><span className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#16A34A' }}>$12,500</span></div>
        <div style={{ height: 1, background: '#eee', margin: '8px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="lxf" style={{ fontSize: 13, fontWeight: 700, color: '#ff4444' }}>Balance: $3,500</span></div>
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



function AdminLogistics({ shipments, setShipments, brand }) {
  const ac = brand.color || '#C8A96E';

  const addShipment = () => {
    const newS = {
      project: 'New Project',
      item: 'New Item',
      supplier: 'Generic Supplier',
      status: 'Order Placed',
      eta: 'TBD',
      container_id: 'TBD'
    };
    props.createShipment(newS);
  };

  const updateS = (id, fields) => {
    props.updateShipment(id, fields);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Logistics & Procurement</h2>
        <button onClick={addShipment} className="p-btn-dark lxf" style={{ padding: '10px 20px', fontSize: 13, gap: 8, display: 'flex', alignItems: 'center' }}><Plus size={16} /> Track Shipment</button>
      </div>

      <div className="p-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Shipment ID', 'Project', 'Item/Details', 'Supplier', 'Status', 'ETA'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {shipments.map(s => (
              <tr key={s.id} className="t-row">
                <td style={{ padding: '16px' }}><span style={{ fontFamily: 'monospace', color: ac, fontWeight: 600 }}>{s.id}</span></td>
                <td style={{ padding: '16px' }}><div className="lxf" style={{ fontSize: 13, fontWeight: 500 }}>{s.project}</div></td>
                <td style={{ padding: '16px' }}>
                  <div className="lxf" style={{ fontSize: 13 }}>{s.item}</div>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>Container: {s.container}</div>
                </td>
                <td style={{ padding: '16px' }}><span className="lxf" style={{ fontSize: 12 }}>{s.supplier}</span></td>
                <td style={{ padding: '16px' }}>
                  <select className="lxf" style={{ fontSize: 12, padding: '4px 8px', borderRadius: 4, background: '#F9F7F4', border: 'none', color: '#1A1410' }} value={s.status} onChange={e => updateS(s.id, { status: e.target.value })}>
                    {['Order Placed', 'Shipped', 'At Customs', 'Delivered'].map(st => <option key={st} value={st}>{st}</option>)}
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
  const totalRev = invoices.filter(i => i.status === 'Paid').reduce((a, i) => a + parseFloat(i.amount.replace(/[$,]/g, '')), 0);
  const outstanding = invoices.filter(i => i.status === 'Pending').reduce((a, i) => a + parseFloat(i.amount.replace(/[$,]/g, '')), 0);
  const delayed = clients.filter(c => getSLA(c).delayed).length;

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
        <div className="p-stat-card">
          <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', marginBottom: 8 }}>TOTAL REVENUE</div>
          <div className="lxfh" style={{ fontSize: 28, color: '#16A34A' }}>${(totalRev / 1000).toFixed(1)}k</div>
        </div>
        <div className="p-stat-card">
          <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', marginBottom: 8 }}>OUTSTANDING</div>
          <div className="lxfh" style={{ fontSize: 28, color: '#ff4444' }}>${(outstanding / 1000).toFixed(1)}k</div>
        </div>
        <div className="p-stat-card">
          <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', marginBottom: 8 }}>AVG. PROJECT DELAY</div>
          <div className="lxfh" style={{ fontSize: 28, color: '#1A1410' }}>{delayed} Projects</div>
        </div>
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

function AdminCMS({ brand, setBrand, content, setContent }) {
  const [sub, setSub] = useState('identity');
  const ac = brand.color || '#C8A96E';
  
  const onLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 500, quality: 0.8 });
        const url = await uploadFile('assets', `logos/${Date.now()}_${file.name}`, compressed);
        setBrand({ ...brand, logo: url });
      } catch (err) { alert('Upload failed: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Content Manager</h2>
        <div style={{ fontSize: 12, color: '#B5AFA9' }}>Changes are saved automatically to your workspace.</div>
      </div>

      <div style={{ display: 'flex', gap: 32, borderBottom: '1px solid rgba(0,0,0,.07)', marginBottom: 8 }}>
        {[['identity', 'Brand Identity'], ['hero', 'Hero Section'], ['about', 'About Page'], ['services', 'Services'], ['portfolio', 'Portfolio']].map(([id, label]) => (
          <button key={id} onClick={() => setSub(id)} className={`lxf`} style={{ paddingBottom: 14, background: 'none', border: 'none', borderBottom: sub === id ? `2px solid ${ac}` : '2px solid transparent', color: sub === id ? '#1A1410' : '#B5AFA9', fontWeight: sub === id ? 600 : 400, cursor: 'pointer', transition: 'all .3s' }}>{label}</button>
        ))}
      </div>

      <div className="p-card" style={{ padding: 28 }}>
        {sub === 'identity' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <PFormField label="Company Name"><input className="p-inp" value={brand.name} onChange={e => setBrand({ ...brand, name: e.target.value })} /></PFormField>
            <PFormField label="Brand Color"><input type="color" value={brand.color} onChange={e => setBrand({ ...brand, color: e.target.value })} style={{ width: 60, height: 40, border: 'none', background: 'none' }} /></PFormField>
            <PFormField label="Company Logo">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 40, maxWidth: 200, objectFit: 'contain' }} /> : <div style={{ height: 40, width: 120, background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#B5AFA9', border: '1px dashed #C0B9B0' }}>No Logo Uploaded</div>}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <button className="p-btn-light lxf" style={{ padding: '8px 16px', fontSize: 12 }}><Upload size={14} style={{ marginRight: 6 }} /> Upload Logo</button>
                  <input type="file" accept="image/*" onChange={onLogoChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </div>
              </div>
            </PFormField>
          </div>
        )}

        {sub === 'hero' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {content.hero.slides.map((s, i) => (
              <div key={i} style={{ padding: 20, border: '1px solid #efefef', borderRadius: 10, background: '#F9F7F4' }}>
                <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}><ImgIcon size={16} /> Hero Slide {i + 1}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <PFormField label="Large Title">
                        <input className="p-inp" value={s.title} onChange={e => {
                          const newSlides = [...content.hero.slides];
                          newSlides[i].title = e.target.value;
                          setContent('hero', { ...content.hero, slides: newSlides });
                        }} />
                      </PFormField>
                      <PFormField label="Slide Image">
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <img src={s.img} style={{ width: 60, height: 40, borderRadius: 4, objectFit: 'cover' }} />
                          <div style={{ position: 'relative', overflow: 'hidden' }}>
                            <button className="p-btn-light lxf" style={{ padding: '6px 12px', fontSize: 11 }}>Replace Image</button>
                            <input type="file" accept="image/*" onChange={e => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const newSlides = [...content.hero.slides];
                                  newSlides[i].img = reader.result;
                                  setContent('hero', { ...content.hero, slides: newSlides });
                                };
                                reader.readAsDataURL(file);
                              }
                            }} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                          </div>
                        </div>
                      </PFormField>
                </div>
              </div>
            ))}
          </div>
        )}

        {sub === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <PFormField label="Founder Name"><input className="p-inp" value={content.about.founder} onChange={e => setContent('about', { ...content.about, founder: e.target.value })} /></PFormField>
              <PFormField label="Role Name"><input className="p-inp" value={content.about.role} onChange={e => setContent('about', { ...content.about, role: e.target.value })} /></PFormField>
            </div>
            <PFormField label="Our Story Title"><input className="p-inp" value={content.about.storyTitle || 'Founded in Accra.'} onChange={e => setContent('about', { ...content.about, storyTitle: e.target.value })} /></PFormField>
            <PFormField label="Full Story Text"><textarea className="p-inp" style={{ height: 120, resize: 'none' }} value={content.about.story} onChange={e => setContent('about', { ...content.about, story: e.target.value })} /></PFormField>
            <PFormField label="Mission / Bio Statement"><textarea className="p-inp" style={{ height: 80, resize: 'none' }} value={content.about.bio} onChange={e => setContent('about', { ...content.about, bio: e.target.value })} /></PFormField>
          </div>
        )}

        {sub === 'services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {content.services.map((s, i) => (
              <div key={i} style={{ padding: 16, border: '1px solid #efefef', borderRadius: 8 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                  <PFormField label="Title"><input className="p-inp" value={s.title} onChange={e => {
                    const newS = [...content.services];
                    newS[i].title = e.target.value;
                    setContent('services', newS);
                  }} /></PFormField>
                  <PFormField label="Subtitle"><input className="p-inp" value={s.sub} onChange={e => {
                    const newS = [...content.services];
                    newS[i].sub = e.target.value;
                    setContent('services', newS);
                  }} /></PFormField>
                </div>
              </div>
            ))}
          </div>
        )}
        {sub === 'portfolio' && <AdminPortfolio content={content} setContent={setContent} brand={brand} />}
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
                  {['Residential', 'Commercial', 'Kitchen', 'Bathroom', 'Dining'].map(c => <option key={c} value={c}>{c}</option>)}
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

// (Duplicates removed)


// --- MAIN PORTAL SHELL ---
export default function AdminPortal({ user, onLogout, onPreview, content, setContent, ...props }) {
  const [view, setView] = useState('dash');
  const { brand } = props;
  const ac = brand.color || '#C8A96E';

  const menu = [
    { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'cms', label: 'Site CMS', icon: <Layout size={18} /> },
    { id: 'clients', label: 'Clients', icon: <Users size={18} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <ImgIcon size={18} /> },
    { id: 'bookings', label: 'Bookings', icon: <Calendar size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <Activity size={18} /> },
    { id: 'email', label: 'Email Center', icon: <Mail size={18} /> },
    { id: 'staff', label: 'Staff Management', icon: <Users size={18} /> },
    { id: 'logistics', label: 'Logistics', icon: <Truck size={18} /> }
  ];

  const renderView = () => {
    const common = { user, brand, content, setContent, ...props };
    switch (view) {
      case 'dash': return <AdminDash {...common} />;
      case 'cms': return <AdminCMS {...common} />;
      case 'clients': return <AdminCRM {...common} />;
      case 'portfolio': return <AdminPortfolio {...common} />;
      case 'bookings': return <AdminBookings {...common} />;
      case 'analytics': return <AdminAnalyticsPage {...common} />;
      case 'email': return <AdminEmailCenter {...common} />;
      case 'staff': return <AdminStaff team={props.teamMembers} setTeam={props.setTeamMembers} {...common} />;
      case 'logistics': return <AdminLogistics shipments={props.shipments} setShipments={props.setShipments} {...common} />;
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
              <div className="lxf" style={{ fontSize: 11, letterSpacing: '.12em', color: ac, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Global CMS Administrator</div>
              <h1 className="lxfh" style={{ fontSize: 26 }}>LuxeSpace Control Center</h1>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <NotificationBell notifications={props.userNotifications} onMarkRead={props.markNotificationRead} />
              <button onClick={onPreview} className="p-btn-light lxf" style={{ padding: '9px 18px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Eye size={14} /> Preview Site</button>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${ac}22`, border: `1.5px solid ${ac}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: ac }}>{user.name.slice(0, 2).toUpperCase()}</div>
            </div>
          </header>
          {renderView()}
        </div>
      </main>
    </div>
  );
}
