import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  UserPlus, 
  Trash2, 
  Edit2, 
  Mail, 
  Phone, 
  Info,
  ChevronRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { PAv } from '../../components/Shared';

export default function AdminClients({ dbClients, createClient, updateClient, deleteClient, brand, ...props }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [search, setSearch] = useState('');
  const [newC, setNewC] = useState({ name: '', email: '', phone: '', company: '', stakeholders: [] });
  const [newStakeholder, setNewStakeholder] = useState('');

  const ac = brand.color || '#B08D57';

  const handleAddStakeholder = () => {
    if (newStakeholder && !newC.stakeholders.includes(newStakeholder)) {
      setNewC({ ...newC, stakeholders: [...newC.stakeholders, newStakeholder] });
      setNewStakeholder('');
    }
  };

  const removeStakeholder = (val) => {
    setNewC({ ...newC, stakeholders: newC.stakeholders.filter(s => s !== val) });
  };

  const resetForm = () => {
    setNewC({ name: '', email: '', phone: '', company: '', stakeholders: [] });
    setEditingClient(null);
    setShowAdd(false);
  };

  const handleSubmit = async () => {
    if (!newC.name || !newC.email || !newC.phone) return alert("Required: Name, Email, Phone");
    if (editingClient) {
      await updateClient(editingClient.id, newC);
    } else {
      await createClient(newC);
    }
    resetForm();
  };

  const startEdit = (c) => {
    setEditingClient(c);
    setNewC({ 
      name: c.name || '', 
      email: c.email || '', 
      phone: c.phone || '', 
      company: c.company || '', 
      stakeholders: c.stakeholders || [] 
    });
    setShowAdd(true);
  };

  const filtered = (dbClients || []).filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) || 
    c.company?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-fade admin-clients-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h2 className="lxfh" style={{ fontSize: 32, marginBottom: 6, fontWeight: 300 }}>Stakeholder Registry</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: ac }}></div>
            <p className="lxf" style={{ color: '#666', fontSize: 13, letterSpacing: '0.02em' }}>Managing {dbClients?.length || 0} production entities</p>
          </div>
        </div>
        <button onClick={() => setShowAdd(true)} className="p-btn-gold lxf" style={{ padding: '14px 28px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
          <UserPlus size={18} /> Register Client
        </button>
      </div>

      <div className="p-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', background: '#fff', borderRadius: 4 }}>
        <div style={{ padding: '16px 24px', background: '#FDFCFB', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center' }}>
          <Search size={18} color="#B5AFA9" style={{ marginRight: 16 }} />
          <input 
            type="text" 
            placeholder="Search by name, company, or email identifier..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', width: '100%', fontSize: 14, outline: 'none', color: '#121212' }}
            className="lxf"
          />
        </div>

        <div style={{ padding: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
            {filtered.map(client => (
              <div key={client.id} className="p-card magnetic-card rev" style={{ padding: 0, border: '1px solid rgba(0,0,0,0.05)', background: '#fff', borderRadius: 4, overflow: 'hidden', transition: 'all 0.4s' }}>
                <div style={{ padding: 24, paddingBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                   <div style={{ width: 56, height: 56, borderRadius: 4, background: '#F9F7F4', border: '1px solid #F0EBE5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 300, color: ac }} className="lxfh">
                      {client.name?.[0]}
                   </div>
                   <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => startEdit(client)} style={{ background: '#F9F7F4', border: 'none', padding: 10, borderRadius: 4, color: '#666', cursor: 'pointer' }} className="hover-ac"><Edit2 size={16} /></button>
                      <button onClick={() => deleteClient(client.id)} style={{ background: '#FFF1F1', border: 'none', padding: 10, borderRadius: 4, color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                   </div>
                </div>

                <div style={{ padding: 24 }}>
                  <div className="lxfh" style={{ fontSize: 22, marginBottom: 4, fontWeight: 400 }}>{client.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: ac, marginBottom: 20 }}>
                    <Building size={14} />
                    <span className="lxf" style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{client.company || 'Private Portfolio'}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#666' }} className="lxf">
                        <Mail size={16} color="#B5AFA9" /> {client.email}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#666' }} className="lxf">
                        <Phone size={16} color="#B5AFA9" /> {client.phone}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em' }}>Access Registry</div>
                      <div style={{ fontSize: 10, background: '#F0F9FF', color: '#0369A1', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>{client.stakeholders?.length || 1} ACTIVE</div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {(client.stakeholders || [client.phone]).map(s => (
                          <div key={s} style={{ background: '#F9F7F4', border: '1px solid #F0EBE5', padding: '6px 12px', borderRadius: 2, fontSize: 12, color: '#121212', fontWeight: 500 }} className="lxf">
                            {s}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div onClick={() => props.onSelectClient?.(client.id)} style={{ padding: '16px 24px', background: '#FDFCFB', borderTop: '1px solid rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} className="hover-light">
                  <span className="lxf" style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>View Project Command Center</span>
                  <ChevronRight size={16} color={ac} />
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 32px', color: '#B5AFA9' }}>
               <Info size={48} strokeWidth={1} style={{ marginBottom: 20, opacity: 0.3 }} />
               <p className="lxfh" style={{ fontSize: 20, color: '#121212', marginBottom: 8 }}>No stakeholders found</p>
               <p className="lxf" style={{ fontSize: 14 }}>Try adjusting your search filters or register a new client.</p>
            </div>
          )}
        </div>
      </div>

      {showAdd && (
        <div className="overlay-modal" style={{ background: 'rgba(26,20,16,0.6)', backdropFilter: 'blur(10px)', zIndex: 3000 }}>
          <div className="modal-box lxf" style={{ maxWidth: 540, borderRadius: 4, border: 'none', background: '#fff', overflow: 'hidden' }}>
            <div style={{ padding: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
                <div>
                  <h2 className="lxfh" style={{ fontSize: 28, fontWeight: 300 }}>{editingClient ? 'Update Profile' : 'New Registration'}</h2>
                  <p className="lxf" style={{ color: '#666', fontSize: 14 }}>System-wide client profile & access control.</p>
                </div>
                <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B5AFA9' }}><X size={24} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="p-form-group">
                  <label className="lxf eyebrow" style={{ fontSize: 10, color: '#121212', marginBottom: 10 }}>Legal Name / Identifier</label>
                  <input type="text" className="p-inp" style={{ padding: 16, fontSize: 15 }} value={newC.name} onChange={e => setNewC({ ...newC, name: e.target.value })} placeholder="Full Name or Entity" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="p-form-group">
                    <label className="lxf eyebrow" style={{ fontSize: 10, color: '#121212', marginBottom: 10 }}>Primary Email</label>
                    <input type="email" className="p-inp" style={{ padding: 16, fontSize: 15 }} value={newC.email} onChange={e => setNewC({ ...newC, email: e.target.value })} placeholder="email@example.com" />
                  </div>
                  <div className="p-form-group">
                    <label className="lxf eyebrow" style={{ fontSize: 10, color: '#121212', marginBottom: 10 }}>Primary Phone</label>
                    <input type="tel" className="p-inp" style={{ padding: 16, fontSize: 15 }} value={newC.phone} onChange={e => setNewC({ ...newC, phone: e.target.value })} placeholder="+233..." />
                  </div>
                </div>

                <div className="p-form-group">
                  <label className="lxf eyebrow" style={{ fontSize: 10, color: '#121212', marginBottom: 10 }}>Organization (Business Unit)</label>
                  <div style={{ position: 'relative' }}>
                    <Building size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#B5AFA9' }} />
                    <input type="text" className="p-inp" style={{ padding: '16px 16px 16px 44px', fontSize: 15 }} value={newC.company} onChange={e => setNewC({ ...newC, company: e.target.value })} placeholder="Company Name (Leave blank for private)" />
                  </div>
                </div>

                <div className="p-form-group" style={{ padding: 24, background: '#FDFCFB', border: '1px solid #F0EBE5', borderRadius: 4 }}>
                  <label className="lxf eyebrow" style={{ fontSize: 10, color: ac, marginBottom: 12 }}>Authorized Stakeholder Registry</label>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                     <input 
                       type="tel" 
                       className="p-inp" 
                       style={{ background: '#fff', border: '1px solid #F0EBE5' }}
                       placeholder="Add another stakeholder phone..." 
                       value={newStakeholder} 
                       onChange={e => setNewStakeholder(e.target.value)} 
                       onKeyPress={e => e.key === 'Enter' && handleAddStakeholder()}
                     />
                     <button onClick={handleAddStakeholder} className="p-btn-dark lxf" style={{ padding: '0 20px', borderRadius: 4, height: 48, fontSize: 12 }}>Grant Access</button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                     {newC.stakeholders.length > 0 ? newC.stakeholders.map(s => (
                       <div key={s} style={{ background: '#fff', border: '1px solid #F0EBE5', padding: '8px 14px', borderRadius: 2, fontSize: 13, display: 'flex', alignItems: 'center', gap: 10, color: '#121212', fontWeight: 500 }}>
                          {s} <X size={14} style={{ cursor: 'pointer', color: '#EF4444' }} onClick={() => removeStakeholder(s)} />
                       </div>
                     )) : <div style={{ fontSize: 12, color: '#B5AFA9', fontStyle: 'italic' }}>No additional stakeholders registered.</div>}
                  </div>
                </div>

                <button onClick={handleSubmit} className="p-btn-gold lxf" style={{ width: '100%', padding: '20px', borderRadius: 4, marginTop: 10, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                   <ShieldCheck size={20} /> {editingClient ? 'Finalize Profile Update' : 'Initialize Client Identity'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
