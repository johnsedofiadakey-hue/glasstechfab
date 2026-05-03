import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, LayoutDashboard, MessageSquare, FileText, 
  Printer, Plus, Download, Image, Hammer, Sparkles, 
  DollarSign, Truck, PackageCheck, Send, Camera, Info, Trash2,
  Calendar, CheckCircle2, AlertCircle, ShieldCheck, Briefcase, Package,
  ChevronRight, ArrowRight, User, Zap
} from 'lucide-react';
import { PAv, PSBadge, SBadge, FF as PFormField } from '../../components/Shared';
import { PROJECT_STAGES } from '../../data';
import AdminTasks from './AdminTasks';
import AdminProjectGallery from './AdminProjectGallery';
import MaterialSelector from '../../components/MaterialSelector';
import FabricationKanban from './FabricationKanban';
import ProjectProcurement from './ProjectProcurement';

export default function ClientHub({ clientId, dbClients = [], clients = [], onBack, ...props }) {
  const brand = props.brand || {};
  const ac = brand.color || '#C8A96E';
  
  const client = dbClients.find(c => c.id === clientId) || dbClients.find(c => c.phone === clientId) || dbClients.find(c => c.email === clientId);
  const myWorkOrders = (props.workOrders || []).filter(wo => wo.clientId === clientId || wo.clientId === client?.id);
  
  const [activeWorkOrderId, setActiveWorkOrderId] = useState(null);
  const [tab, setTab] = useState('status');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (myWorkOrders.length > 0 && !activeWorkOrderId) {
      setActiveWorkOrderId(myWorkOrders[0].id);
    }
  }, [myWorkOrders, activeWorkOrderId]);

  if (!client) return (
    <div style={{ padding: 60, textAlign: 'center', background: '#F9F7F4', borderRadius: 24 }}>
      <AlertCircle size={48} color="#B5AFA9" style={{ marginBottom: 16 }} />
      <div className="lxfh" style={{ fontSize: 20, color: '#1A1410' }}>Contextual Identifier Not Located</div>
      <p className="lxf" style={{ color: '#B5AFA9', marginBottom: 24 }}>Security Layer: The stakeholder identity {clientId} is not resolved.</p>
      <button onClick={onBack} className="p-btn-dark" style={{ padding: '12px 32px' }}>Return to Directory</button>
    </div>
  );

  const activeWorkOrder = myWorkOrders.find(wo => wo.id === activeWorkOrderId) || myWorkOrders[0];
  const myInvoices = (props.invoices || []).filter(i => i.clientId === clientId || i.clientId === client?.id || i.clientEmail === client?.email);
  const totalInvoiced = myInvoices.reduce((acc, i) => acc + (parseFloat(String(i.amount).replace(/[^0-9.]/g, '')) || 0), 0);
  const totalPaid = myInvoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + (parseFloat(String(i.amount).replace(/[^0-9.]/g, '')) || 0), 0);

  const hubTabs = [
    { id: 'status', label: 'Feed & Status', icon: <LayoutDashboard size={16} /> },
    { id: 'sourcing', label: 'Sourcing Hub', icon: <Package size={16} /> },
    { id: 'support', label: 'Secure Support', icon: <MessageSquare size={16} /> },
    { id: 'logistics', label: 'Logistics', icon: <Truck size={16} /> },
    { id: 'finance', label: 'Payments', icon: <DollarSign size={16} /> },
  ];

  return (
    <div className="client-hub-container fade-in" style={{ padding: '20px 0' }}>
      {/* 1. TOP ACTION BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={onBack} style={{ width: 44, height: 44, borderRadius: 14, background: '#F9F7F4', border: '1px solid #F0EBE5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
               <ArrowLeft size={18} />
            </button>
            <div>
               <div className="lxfh" style={{ fontSize: 24, fontWeight: 800 }}>{client.name}</div>
               <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
                  <span className="lxf" style={{ fontSize: 11, color: '#B5AFA9', fontWeight: 600 }}>ID: {client.id}</span>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#F0EBE5' }} />
                  <PSBadge s={client.status || 'Active'} />
               </div>
            </div>
         </div>
         <div style={{ display: 'flex', gap: 12 }}>
            {hubTabs.map(t => (
               <button 
                 key={t.id} 
                 onClick={() => setTab(t.id)}
                 className="lxf"
                 style={{ 
                   height: 48, padding: '0 20px', borderRadius: 14, 
                   background: tab === t.id ? '#1A1410' : '#F9F7F4', 
                   color: tab === t.id ? '#fff' : '#1A1410',
                   border: '1px solid #F0EBE5', display: 'flex', alignItems: 'center', gap: 10,
                   fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.3s ease'
                 }}
               >
                  {t.icon} {t.label}
               </button>
            ))}
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40 }}>
         
         {/* MAIN COLUMN */}
         <div>
            {tab === 'status' && (
               <div className="fade-in">
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <h3 className="lxfh" style={{ fontSize: 20 }}>Project Evolution</h3>
                      <button 
                        onClick={() => props.createProject({ clientId: client.id, project: 'Structural Installation', cat: 'Glass Fabrication', budget: '0', stage: 1 })}
                        className="p-btn-dark" style={{ height: 40, padding: '0 20px', fontSize: 12 }}
                      >
                        <Plus size={16} /> Start Project
                      </button>
                   </div>
                  
                  {myWorkOrders.length > 0 ? myWorkOrders.map(wo => (
                     <div key={wo.id} className="p-card" style={{ padding: 0, marginBottom: 24, overflow: 'hidden', border: '1px solid #F0EBE5' }}>
                        <div style={{ padding: 32 }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                              <div>
                                 <h4 className="lxfh" style={{ fontSize: 18, marginBottom: 4 }}>{wo.title}</h4>
                                 <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>Reference: {wo.id.toUpperCase()}</div>
                              </div>
                              <PSBadge s={PROJECT_STAGES[wo.stage]?.name || 'Planning'} c={ac} />
                           </div>
                           
                           {/* PROGRESS BAR */}
                           <div style={{ height: 6, background: '#F9F7F4', borderRadius: 3, overflow: 'hidden', marginBottom: 12 }}>
                              <div style={{ height: '100%', width: `${(wo.stage / 6) * 100}%`, background: ac, transition: 'width 1s ease' }} />
                           </div>
                           <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#B5AFA9', letterSpacing: 1 }}>
                              <span>Initialization</span>
                              <span>QC Verified</span>
                              <span>Final Delivery</span>
                           </div>
                        </div>
                        <div style={{ padding: '16px 32px', background: '#F9F7F4', borderTop: '1px solid #F0EBE5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div style={{ display: 'flex', gap: 16 }}>
                              <div className="lxf" style={{ fontSize: 11, color: '#6A635C' }}><Package size={14} style={{ marginBottom: -3, marginRight: 4 }} /> {wo.components || 'Standard'} Components</div>
                              <button 
                                onClick={() => { props.notify('pending', 'Initializing AI Vision Audit...'); setTimeout(() => props.notify('success', 'AI AUDIT: Structural alignment verified.'), 2000); }}
                                style={{ background: 'none', border: 'none', color: ac, fontSize: 11, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                              >
                                <Zap size={14} /> AI Audit
                              </button>
                           </div>
                           <div style={{ display: 'flex', gap: 12 }}>
                              <button 
                                onClick={() => props.updateProjectStage(wo.id, wo.stage)} 
                                style={{ background: '#fff', border: '1px solid #F0EBE5', borderRadius: 8, height: 32, padding: '0 12px', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}
                              >
                                Manual Invoice Trigger
                              </button>
                              <button onClick={() => setTab('logistics')} style={{ background: 'none', border: 'none', color: ac, fontSize: 11, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>Track Shipment <ChevronRight size={14} /></button>
                           </div>
                        </div>
                     </div>
                  )) : (
                     <div style={{ padding: 80, textAlign: 'center', background: '#fff', borderRadius: 32, border: '1px dashed #F0EBE5' }}>
                        <Briefcase size={48} color="#F0EBE5" style={{ marginBottom: 20 }} />
                        <p className="lxf" style={{ color: '#B5AFA9' }}>No active requirements deployed.</p>
                     </div>
                  )}
               </div>
            )}

            {tab === 'support' && (
               <div className="fade-in p-card" style={{ height: 600, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #F0EBE5' }}>
                  <div style={{ padding: '24px 32px', borderBottom: '1px solid #F0EBE5', background: '#fff' }}>
                     <h3 className="lxfh" style={{ fontSize: 18 }}>Secure Support Session</h3>
                     <p className="lxf" style={{ fontSize: 11, color: '#16A34A', fontWeight: 800, marginTop: 4 }}>ENC-256 LAYER ACTIVE</p>
                  </div>
                  <div style={{ flex: 1, padding: 32, overflowY: 'auto', background: '#FDFCFB', display: 'flex', flexDirection: 'column', gap: 16 }}>
                     {(props.messages || []).filter(m => m.senderId === client.id || m.receiverId === client.id).sort((a,b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0)).map((m, i) => {
                        const isMe = m.senderId === 'admin';
                        return (
                           <div key={i} style={{ 
                             alignSelf: isMe ? 'flex-end' : 'flex-start',
                             background: isMe ? '#1A1410' : '#fff',
                             color: isMe ? '#fff' : '#1A1410',
                             padding: '14px 20px', borderRadius: 20,
                             maxWidth: '70%', fontSize: 14,
                             boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                             border: isMe ? 'none' : '1px solid #F0EBE5'
                           }}>
                              {m.text}
                           </div>
                        );
                     })}
                  </div>
                  <div style={{ padding: 24, background: '#fff', borderTop: '1px solid #F0EBE5', display: 'flex', gap: 12 }}>
                     <input 
                       id="hubMsgInp" 
                       className="p-inp" 
                       placeholder="Send secure message..." 
                       style={{ flex: 1, background: '#F9F7F4' }}
                       onKeyDown={e => { if (e.key === 'Enter' && e.target.value) { props.sendMessage(e.target.value, 'admin', client.id); e.target.value = ''; } }}
                     />
                     <button onClick={() => { const inp = document.getElementById('hubMsgInp'); if (inp.value) { props.sendMessage(inp.value, 'admin', client.id); inp.value = ''; } }} className="p-btn-dark" style={{ width: 56, height: 56, borderRadius: 16, background: ac, color: '#1A1410', border: 'none' }}>
                        <Send size={20} />
                     </button>
                  </div>
               </div>
            )}

            {tab === 'sourcing' && (
               <div className="fade-in">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                     <h3 className="lxfh" style={{ fontSize: 20 }}>Sourcing & Procurement</h3>
                     <button 
                       onClick={() => props.addSourcingItem({ clientId: client.id, status: 'Pending', name: 'New Component' })}
                       className="p-btn-dark" style={{ height: 40, padding: '0 20px', fontSize: 12 }}
                     >
                       <Plus size={16} /> Add Sourcing Item
                     </button>
                  </div>
                  <div className="p-card" style={{ padding: 32, border: '1px solid #F0EBE5' }}>
                     <p className="lxf" style={{ color: '#B5AFA9', marginBottom: 32 }}>Manage factory orders, material selection, and China logistics here.</p>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {(props.procurements || []).filter(p => p.clientId === client.id).map(p => (
                           <div key={p.id} style={{ padding: 24, border: '1px solid #F0EBE5', borderRadius: 16, display: 'flex', justifyContent: 'space-between' }}>
                              <div>
                                 <div className="lxfh" style={{ fontSize: 16 }}>{p.name}</div>
                                 <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{p.specs}</div>
                                 <PSBadge s={p.status} />
                              </div>
                              <div style={{ display: 'flex', gap: 12 }}>
                                 {p.img && <img src={p.img} style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'cover' }} />}
                                 <button className="p-btn-light" style={{ height: 32, fontSize: 10 }}>Share with Client</button>
                              </div>
                           </div>
                        ))}
                        {(!props.procurements || props.procurements.filter(p => p.clientId === client.id).length === 0) && (
                           <div style={{ textAlign: 'center', padding: 40, border: '1px dashed #F0EBE5', borderRadius: 16 }}>
                              <Package size={32} color="#F0EBE5" style={{ marginBottom: 16 }} />
                              <p style={{ color: '#B5AFA9', fontSize: 13 }}>No items in procurement pipeline.</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            )}

            {tab === 'finance' && (
               <div className="fade-in">
                  <h3 className="lxfh" style={{ fontSize: 20, marginBottom: 24 }}>Payments & Invoices</h3>
                  <div className="p-card" style={{ padding: 0, border: '1px solid #F0EBE5' }}>
                     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#F9F7F4', borderBottom: '1px solid #F0EBE5' }}>
                           <tr>
                              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Reference</th>
                              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Status</th>
                              <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase' }}>Amount</th>
                           </tr>
                        </thead>
                        <tbody>
                           {myInvoices.map(inv => (
                              <tr key={inv.id} style={{ borderBottom: '1px solid #F9F7F4' }}>
                                 <td style={{ padding: '20px 24px' }}>
                                    <div style={{ fontSize: 14, fontWeight: 800 }}>INV-{inv.id.slice(-4).toUpperCase()}</div>
                                    <div style={{ fontSize: 11, color: '#B5AFA9' }}>{inv.date}</div>
                                 </td>
                                 <td style={{ padding: '20px 24px' }}>
                                    <PSBadge s={inv.status} />
                                 </td>
                                 <td style={{ padding: '20px 24px', textAlign: 'right', fontWeight: 900 }}>{props.formatPrice(inv.amount)}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}
         </div>

         {/* SIDEBAR */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div className="p-card" style={{ padding: 32, background: '#1A1410', color: '#fff', borderRadius: 32 }}>
               <h4 className="lxfh" style={{ fontSize: 18, marginBottom: 24, color: ac }}>Financial Summary</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span className="lxf" style={{ opacity: 0.6, fontSize: 13 }}>Total Invoiced</span>
                     <span className="lxfh" style={{ fontSize: 18 }}>{props.formatPrice(totalInvoiced)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span className="lxf" style={{ opacity: 0.6, fontSize: 13 }}>Total Paid</span>
                     <span className="lxfh" style={{ fontSize: 18, color: '#16A34A' }}>{props.formatPrice(totalPaid)}</span>
                  </div>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span className="lxf" style={{ opacity: 0.6, fontSize: 13, fontWeight: 800 }}>Outstanding</span>
                     <span className="lxfh" style={{ fontSize: 22, color: ac }}>{props.formatPrice(totalInvoiced - totalPaid)}</span>
                  </div>
               </div>
            </div>

            <div className="p-card" style={{ padding: 32, border: '1px solid #F0EBE5' }}>
               <h4 className="lxfh" style={{ fontSize: 18, marginBottom: 24 }}>System Credentials</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                     <span style={{ color: '#B5AFA9' }}>Portal Username</span>
                     <span style={{ fontWeight: 800 }}>{client.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                     <span style={{ color: '#B5AFA9' }}>Initial Key</span>
                     <span style={{ fontWeight: 800, color: ac }}>unlockme</span>
                  </div>
               </div>
               <button onClick={() => alert("Credentials sent.")} className="p-btn-dark" style={{ width: '100%', marginTop: 24, height: 44, fontSize: 11 }}>Resend Access Link</button>
            </div>
         </div>

      </div>
    </div>
  );
}
