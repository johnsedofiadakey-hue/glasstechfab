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
  const [showAdd, setShowAdd] = useState(props.autoOpen || false);
  const [editing, setEditing] = useState(null);
  const [newC, setNewC] = useState({ name: '', email: '', phone: '', company: '', password: '', notes: '', status: 'Active' });

  const handleClose = () => {
    setShowAdd(false);
    setEditing(null);
    if (props.onClose) props.onClose();
  };

  const filtered = (dbClients || []).filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.company?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    if (editing) {
      await updateClient(editing.id, newC);
    } else {
      await createClient(newC);
    }
    
    handleClose();
    setNewC({ name: '', email: '', phone: '', company: '', password: '', notes: '', status: 'Active' });
  };

  // If this is a standalone modal view (autoOpen), we can wrap the modal
  const modalContent = (
    <PModal open={showAdd} onClose={handleClose} title={editing ? 'Edit Client' : 'Add New Client'}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <PFormField label="Full Name"><input className="p-inp" value={newC.name} onChange={e => setNewC({...newC, name: e.target.value})} /></PFormField>
        <PFormField label="Email Address"><input className="p-inp" value={newC.email} onChange={e => setNewC({...newC, email: e.target.value})} /></PFormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <PFormField label="Phone Number"><input className="p-inp" value={newC.phone} onChange={e => setNewC({...newC, phone: e.target.value})} /></PFormField>
          <PFormField label="Initial Password"><input className="p-inp" type="password" placeholder="e.g. client123" value={newC.password} onChange={e => setNewC({...newC, password: e.target.value})} /></PFormField>
        </div>
        <PFormField label="Company Name"><input className="p-inp" value={newC.company} onChange={e => setNewC({...newC, company: e.target.value})} /></PFormField>
        <PFormField label="Internal Notes"><textarea className="p-inp" value={newC.notes} onChange={e => setNewC({...newC, notes: e.target.value})} rows={3} /></PFormField>
        <button onClick={handleSave} className="p-btn-dark lxf" style={{ marginTop: 8, padding: '12px' }}>{editing ? 'Update Profile' : 'Register Client'}</button>
      </div>
    </PModal>
  );

  if (props.autoOpen) return modalContent;

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

      {/* CLIENT OPERATIONS MATRIX */}
      <div className="admin-matrix">
        {filtered.map(c => {
          const myProjects = (props.clients || []).filter(p => p.clientIds?.includes(c.id) || p.clientId === c.id);
          const mainProj = myProjects[0];
          const pulse = mainProj ? props.calculateProjectPulse(mainProj.id) : 0;
          const stage = mainProj ? (props.PROJECT_STAGES || []).find(s => s.id === mainProj.stage)?.name : 'N/A';
          const logStatus = (props.procurements || []).find(p => p.parentId === mainProj?.id && (p.isShipment || p.status === 'Shipped')) ? 'In-Transit' : 'Idle';
          const myInvs = (props.invoices || []).filter(i => i.parentId === mainProj?.id);
          const totalDue = myInvs.reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
          const totalPaid = myInvs.filter(i => i.status === 'Paid').reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);

          return (
            <div key={c.id} className="glass-matrix" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                     <PAv i={c.name.split(' ').map(n=>n[0]).join('')} s={44} c={ac} />
                     <div>
                        <div className="lxfh" style={{ fontSize: 16 }}>{c.name}</div>
                        <div className="lxf" style={{ fontSize: 11, color: ac, fontWeight: 700 }}>{c.phone}</div>
                        <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{c.company || 'Private Client'}</div>
                     </div>
                  </div>
                  <button onClick={() => { setEditing(c); setNewC(c); setShowAdd(true); }} style={{ background: 'none', border: 'none', color: '#B5AFA9', cursor: 'pointer' }}><Plus size={16} style={{ transform: 'rotate(45deg)' }} /></button>
               </div>

               <div style={{ background: '#F9F7F4', borderRadius: 16, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                     <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Current Phase</div>
                     <PSBadge s={stage} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Completion</div>
                     <div className="lxf" style={{ fontSize: 13, fontWeight: 800 }}>{pulse}%</div>
                  </div>
                  <div className="prog" style={{ height: 6, background: '#eee', borderRadius: 10, marginTop: 8 }}>
                     <div className="prog-f" style={{ width: `${pulse}%`, background: ac, borderRadius: 10 }} />
                  </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="p-card" style={{ padding: 12, border: '1px solid rgba(0,0,0,0.03)', boxShadow: 'none' }}>
                     <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 4 }}>Logistics</div>
                     <div className="lxf" style={{ fontSize: 12, fontWeight: 700, color: logStatus === 'In-Transit' ? '#16A34A' : 'inherit' }}>{logStatus}</div>
                  </div>
                  <div className="p-card" style={{ padding: 12, border: '1px solid rgba(0,0,0,0.03)', boxShadow: 'none' }}>
                     <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 4 }}>Finances</div>
                     <div className="lxf" style={{ fontSize: 12, fontWeight: 700 }}>
                        {totalDue > 0 ? `${Math.round((totalPaid/totalDue)*100)}% Paid` : 'No Dues'}
                     </div>
                  </div>
               </div>

               <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                  <button onClick={() => props.onSelectClient(c.id)} className="p-btn-dark lxf" style={{ flex: 1, padding: '12px', fontSize: 12, borderRadius: 12 }}>Open Hub</button>
                  <button onClick={() => props.onSelectClient(c.id)} className="p-btn-light lxf" style={{ padding: '12px', borderRadius: 12 }} title="View Timeline"><Search size={16} /></button>
               </div>
            </div>
          );
        })}
      </div>

      <PModal open={showAdd} onClose={() => { setShowAdd(false); setEditing(null); }} title={editing ? 'Edit Client' : 'Add New Client'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <PFormField label="Full Name"><input className="p-inp" value={newC.name} onChange={e => setNewC({...newC, name: e.target.value})} /></PFormField>
          <PFormField label="Email Address (Notifications)"><input className="p-inp" value={newC.email} onChange={e => setNewC({...newC, email: e.target.value})} /></PFormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <PFormField label="WhatsApp Number (Login Key)"><input className="p-inp" placeholder="+233..." value={newC.phone} onChange={e => setNewC({...newC, phone: e.target.value})} /></PFormField>
            <PFormField label="Master Password (Backup)"><input className="p-inp" type="password" placeholder="e.g. client123" value={newC.password} onChange={e => setNewC({...newC, password: e.target.value})} /></PFormField>
          </div>
          <PFormField label="Company Name"><input className="p-inp" value={newC.company} onChange={e => setNewC({...newC, company: e.target.value})} /></PFormField>
          <PFormField label="Internal Notes"><textarea className="p-inp" value={newC.notes} onChange={e => setNewC({...newC, notes: e.target.value})} rows={3} /></PFormField>
          <button onClick={handleSave} className="p-btn-dark lxf" style={{ marginTop: 8, padding: '12px' }}>{editing ? 'Update Profile' : 'Register Client'}</button>
        </div>
      </PModal>
    </div>
  );
}
