import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { PAv, PSBadge, FF as PFormField } from '../../components/Shared';

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

export default function AdminClients({ dbClients, createClient, updateClient, brand, ...props }) {
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
    else if (props.createClient) await props.createClient(newC);
    else if (props.onAddClient) await props.onAddClient(newC);
    
    setShowAdd(false);
    setEditing(null);
    setNewC({ name: '', email: '', phone: '', company: '', notes: '', status: 'Active' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
           <div className="eyebrow" style={{ color: ac, marginBottom: 4 }}>Control Center</div>
           <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400 }}>Global Operations Hub</h2>
        </div>
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
          <thead><tr>{['Client', 'Fabrication', 'Logistics', 'Financials', 'Completion', 'Actions'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(c => {
              const myProjects = (props.clients || []).filter(p => p.clientIds?.includes(c.id) || p.clientId === c.id);
              const mainProj = myProjects[0];
              const pulse = mainProj ? props.calculateProjectPulse(mainProj.id) : 0;
              const stage = mainProj ? (props.PROJECT_STAGES || []).find(s => s.id === mainProj.stage)?.name : 'N/A';
              const logStatus = (props.procurements || []).find(p => p.parentId === mainProj?.id && (p.isShipment || p.status === 'Shipped')) ? 'In-Transit' : 'Not Started';
              const myInvs = (props.invoices || []).filter(i => i.parentId === mainProj?.id);
              const totalDue = myInvs.reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
              const totalPaid = myInvs.filter(i => i.status === 'Paid').reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);

              return (
                <tr key={c.id} className="t-row">
                  <td style={{ padding: '14px 16px' }}>
                    <div 
                      onClick={() => props.onSelectClient && props.onSelectClient(c.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
                      className="p-hover-ac"
                    >
                      <PAv i={c.name.split(' ').map(n=>n[0]).join('')} s={40} c={ac} />
                      <div>
                        <div className="lxf" style={{ fontSize: 13, fontWeight: 700 }}>{c.name}</div>
                        <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{c.company || 'Private Portfolio'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {mainProj ? <PSBadge s={stage} /> : <span style={{ opacity: 0.2 }}>Not Assigned</span>}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {logStatus === 'In-Transit' ? <span style={{ color: '#16A34A', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}><span className="pulse-dot" style={{ background: '#16A34A' }} /> In-Transit</span> : <span style={{ opacity: 0.3, fontSize: 12 }}>Idle</span>}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {totalDue > 0 ? (
                      <div>
                        <div className="lxf" style={{ fontSize: 12, fontWeight: 700 }}>${totalPaid.toLocaleString()} / <span style={{ opacity: 0.5 }}>${totalDue.toLocaleString()}</span></div>
                        <div className="prog" style={{ height: 3, background: '#eee', marginTop: 4, width: 80 }}>
                          <div className="prog-f" style={{ width: `${(totalPaid/totalDue)*100}%`, background: '#16A34A' }} />
                        </div>
                      </div>
                    ) : <span style={{ opacity: 0.2 }}>-</span>}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                       <div className="prog" style={{ width: 60, height: 6, background: '#eee', borderRadius: 10 }}>
                          <div className="prog-f" style={{ width: `${pulse}%`, background: ac, borderRadius: 10 }} />
                       </div>
                       <span style={{ fontSize: 11, fontWeight: 900 }}>{pulse}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 14 }}>
                       <button onClick={() => props.onSelectClient(c.id)} className="p-btn-dark lxf" style={{ padding: '6px 12px', fontSize: 11, borderRadius: 6 }}>Manage Hub</button>
                       <button onClick={() => { setEditing(c); setNewC(c); setShowAdd(true); }} className="lxf" style={{ background: 'none', border: 'none', color: '#B5AFA9', fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>Profile</button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
