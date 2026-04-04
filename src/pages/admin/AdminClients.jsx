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
                  <div 
                    onClick={() => props.onSelectClient && props.onSelectClient(c.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                    className="p-hover-ac"
                  >
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
                <td style={{ padding: '14px 16px' }}><span className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{c.joined ? new Date(c.joined).toLocaleDateString() : 'N/A'}</span></td>
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
