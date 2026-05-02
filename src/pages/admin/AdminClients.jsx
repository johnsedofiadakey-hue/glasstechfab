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
  Building,
  Shield,
  Command,
  Zap,
  Globe,
  Settings
} from 'lucide-react';
import { PAv } from '../../components/Shared';

export default function AdminClients({ dbClients, createClient, updateClient, deleteClient, resetUserPassword, brand, ...props }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [search, setSearch] = useState('');
  const [newC, setNewC] = useState({ name: '', email: '', phone: '', company: '', username: '', password: '' });

  const ac = brand.color || '#B08D57';

  const resetForm = () => {
    setNewC({ name: '', email: '', phone: '', company: '', username: '', password: '' });
    setEditingClient(null);
    setShowAdd(false);
  };

  const handleSubmit = async () => {
    if (!newC.name || !newC.phone) {
      return alert("Required: Full Name and Phone Number");
    }
    
    if (editingClient) {
      await updateClient(editingClient.id, newC);
    } else {
      await createClient(newC);
    }
    resetForm();
  };

  const handleResetPassword = () => {
    const fresh = prompt("Enter new access password for " + editingClient.name);
    if (fresh) {
      resetUserPassword(editingClient.id, fresh);
    }
  };

  const startEdit = (c) => {
    setEditingClient(c);
    setNewC({ 
      name: c.name || '', 
      email: c.email || '', 
      phone: c.phone || '', 
      company: c.company || '', 
      username: c.username || '',
      password: c.password || ''
    });
    setShowAdd(true);
  };

  const filtered = (dbClients || []).filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) || 
    c.company?.toLowerCase().includes(search.toLowerCase()) ||
    c.username?.toLowerCase().includes(search.toLowerCase()) ||
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

      <div className="p-card" style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
        <div style={{ padding: '24px 32px', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center' }}>
          <Search size={20} color={ac} style={{ marginRight: 20 }} />
          <input 
            type="text" 
            placeholder="Search Stakeholder Database..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', width: '100%', fontSize: 16, outline: 'none', color: '#1A1410' }}
            className="lxf"
          />
        </div>

        <div style={{ padding: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 32 }}>
            {filtered.map(client => (
              <div key={client.id} className="p-card" style={{ padding: 0, border: '1px solid rgba(0,0,0,0.04)', background: '#fff', borderRadius: 20, overflow: 'hidden', transition: 'transform 0.3s' }}>
                <div style={{ padding: 32, paddingBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                   <div style={{ width: 64, height: 64, borderRadius: 16, background: '#1A1410', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 300 }} className="lxfh">
                      {client.name?.[0]}
                   </div>
                   <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => startEdit(client)} style={{ background: '#F9F7F4', border: 'none', padding: 12, borderRadius: 12, color: '#1A1410', cursor: 'pointer' }}><Edit2 size={18} /></button>
                      <button onClick={() => deleteClient(client.id)} style={{ background: '#FFF1F1', border: 'none', padding: 12, borderRadius: 12, color: '#EF4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                   </div>
                </div>

                <div style={{ padding: 32 }}>
                  <div className="lxfh" style={{ fontSize: 24, marginBottom: 8, fontWeight: 400, color: '#1A1410' }}>{client.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: ac, marginBottom: 24, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <Building size={14} />
                    {client.company || 'Private Portfolio'}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#6A635C' }} className="lxf">
                        <Mail size={18} color="#B5AFA9" /> {client.email}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#6A635C' }} className="lxf">
                        <Zap size={18} color={ac} /> <span style={{ fontWeight: 700 }}>{client.username}</span>
                    </div>
                  </div>

                  <div style={{ background: '#F9F7F4', padding: 24, borderRadius: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9', fontWeight: 800, textTransform: 'uppercase' }}>Security Layer</div>
                      <ShieldCheck size={16} color="#16A34A" />
                    </div>
                    <div className="lxf" style={{ fontSize: 13, color: '#1A1410', lineHeight: 1.5 }}>
                      Authenticated via <b>WhatsApp/OTP</b> and Biometric credentials.
                    </div>
                  </div>
                </div>

                <div onClick={() => props.onSelectClient?.(client.id)} style={{ padding: '20px 32px', background: '#1A1410', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: '#fff' }}>
                  <span className="lxf" style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Access Command Center</span>
                  <ChevronRight size={18} color={ac} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAdd && (
        <div className="overlay-modal" style={{ background: 'rgba(18,18,18,0.8)', backdropFilter: 'blur(20px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-box" style={{ 
            maxWidth: 640, width: '90%', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', 
            background: '#ffffff', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.3)' 
          }}>
            <div style={{ padding: '32px 40px', background: '#121212', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="lxf eyebrow" style={{ color: ac, marginBottom: 8, fontSize: 10 }}>Secure Registration</div>
                <h2 className="lxfh" style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{editingClient ? 'Edit Profile' : 'Initialize Stakeholder'}</h2>
              </div>
              <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><X size={24} /></button>
            </div>

            <div style={{ padding: 40, maxHeight: '80vh', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
                
                <section>
                  <div className="lxf eyebrow" style={{ fontSize: 10, color: '#B5AFA9', marginBottom: 20 }}>1. Primary Identity</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
                    <div className="p-form-group">
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#121212', marginBottom: 8, textTransform: 'uppercase' }}>Full Legal Name / Entity</label>
                      <input className="p-inp" style={{ padding: '14px 16px', borderRadius: 8 }} value={newC.name} onChange={e => setNewC({ ...newC, name: e.target.value })} placeholder="e.g. John Doe / Global Tech Ltd" />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div className="p-form-group">
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#121212', marginBottom: 8, textTransform: 'uppercase' }}>Email Address</label>
                        <input type="email" className="p-inp" style={{ padding: '14px 16px', borderRadius: 8 }} value={newC.email} onChange={e => setNewC({ ...newC, email: e.target.value })} placeholder="email@domain.com" />
                      </div>
                      <div className="p-form-group">
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#121212', marginBottom: 8, textTransform: 'uppercase' }}>Phone Number</label>
                        <input className="p-inp" style={{ padding: '14px 16px', borderRadius: 8 }} value={newC.phone} onChange={e => setNewC({ ...newC, phone: e.target.value })} placeholder="+233..." />
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="lxf eyebrow" style={{ fontSize: 10, color: '#B5AFA9', marginBottom: 20 }}>2. Managed Credentials</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
                    <div style={{ background: '#F9F7F4', padding: 20, borderRadius: 12, border: '1px dashed #F0EBE5' }}>
                       <div style={{ fontSize: 13, fontWeight: 700, color: ac, marginBottom: 4 }}>AUTO-GENERATED PORTAL ACCESS</div>
                       <p style={{ fontSize: 12, color: '#666', margin: 0 }}>
                         The system will use the <b>Phone Number</b> as the Username. 
                         Initial password will be <b>unlockme</b>. 
                         The client will be prompted to change this on their first login.
                       </p>
                    </div>
                  </div>
                </section>

                <div style={{ paddingTop: 8, borderTop: '1px solid #eee', display: 'flex', gap: 16 }}>
                  <button onClick={resetForm} style={{ flex: 1, padding: '18px', borderRadius: 8, border: '1px solid #eee', background: '#fff', color: '#666', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                  <button onClick={handleSubmit} className="minimal-btn" style={{ flex: 2, padding: '18px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 14 }}>
                     <ShieldCheck size={20} /> {editingClient ? 'Finalize Updates' : 'Commit Registration'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
