import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, LayoutDashboard, MessageSquare, FileText, 
  Printer, Plus, Download, Image, Hammer, Sparkles, 
  DollarSign, Truck, PackageCheck, Send, Camera, Info, Trash2,
  Calendar, CheckCircle2, AlertCircle
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
  
  // Find client data from registry
  const client = dbClients.find(c => c.id === clientId) || dbClients.find(c => c.email === clientId);
  
  // NEW: Find Work Orders linked to this client
  const myWorkOrders = (props.workOrders || []).filter(wo => wo.clientId === clientId || wo.clientId === client?.id);
  
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeWorkOrderId, setActiveWorkOrderId] = useState(null);
  const [tab, setTab] = useState('status');
  const [showPrint, setShowPrint] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (myWorkOrders.length > 0 && !activeWorkOrderId) {
      setActiveWorkOrderId(myWorkOrders[0].id);
    }
  }, [myWorkOrders, activeWorkOrderId]);

  const activeWorkOrder = myWorkOrders.find(wo => wo.id === activeWorkOrderId) || myWorkOrders[0];
  const activeProject = (props.clients || []).find(p => p.id === activeWorkOrder?.projectId);
  
  const myMaterials = (props.materials || []).filter(m => m.parentId === activeWorkOrder?.id);
  const myInvoices = (props.invoices || []).filter(i => i.clientId === clientId || i.clientEmail === client?.email);

  if (!client) return (
    <div style={{ padding: 60, textAlign: 'center', background: '#F9F7F4', borderRadius: 24 }}>
      <AlertCircle size={48} color="#B5AFA9" style={{ marginBottom: 16 }} />
      <div className="lxfh" style={{ fontSize: 20, color: '#1A1410' }}>Client Context Missing</div>
      <p className="lxf" style={{ color: '#B5AFA9', marginBottom: 24 }}>The requested client identifier could not be located in the secure registry.</p>
      <button onClick={onBack} className="p-btn-dark" style={{ padding: '12px 32px' }}>Return to Directory</button>
    </div>
  );

  // Match Client Side Labels: Status, Pay, Docs, Photos, Help
  const hubTabs = [
    { id: 'status', label: 'Status', icon: <LayoutDashboard size={16} /> },
    { id: 'finance', label: 'Payments', icon: <DollarSign size={16} /> },
    { id: 'prod', label: 'Production', icon: <Hammer size={16} /> },
    { id: 'photos', label: 'Gallery', icon: <Image size={16} /> },
    { id: 'support', label: 'Support', icon: <MessageSquare size={16} /> },
  ];

  const renderPrintView = () => {
    if (!showPrint) return null;
    const isInv = showPrint === 'invoice';
    return (
      <div className="overlay-modal" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setShowPrint(null)}>
        <div className="modal-box" style={{ maxWidth: 800, padding: 0, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
           <div style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="lxf" style={{ fontWeight: 700 }}>{isInv ? 'Invoice' : 'Quotation'} Terminal</span>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => window.print()} className="p-btn-dark" style={{ height: 36, padding: '0 16px', fontSize: 12 }}><Printer size={14} /> Print / Save</button>
                <button onClick={() => setShowPrint(null)} className="p-btn-light" style={{ height: 36, padding: '0 16px', fontSize: 12 }}>Close</button>
              </div>
           </div>
           <div id="printable-doc" style={{ padding: 60, background: '#fff', color: '#000', minHeight: 800, fontFamily: 'serif' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 60 }}>
                 <div>
                    <h1 style={{ fontSize: 32, marginBottom: 8 }}>{brand.name}</h1>
                    <p style={{ fontSize: 13, opacity: 0.6 }}>{brand.location}<br/>{brand.phone}</p>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: 24, textTransform: 'uppercase', letterSpacing: 2 }}>{isInv ? 'Invoice' : 'Quote'}</h2>
                    <p style={{ fontSize: 13, opacity: 0.6 }}>Ref: GT-{(Math.random()*9999).toFixed(0)}</p>
                 </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 60 }}>
                 <div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', marginBottom: 8, borderBottom: '1px solid #eee' }}>Recipient</div>
                    <p style={{ fontSize: 16, fontWeight: 700 }}>{client.name}</p>
                    <p style={{ fontSize: 13 }}>{client.email}</p>
                 </div>
                 <div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', marginBottom: 8, borderBottom: '1px solid #eee' }}>Project Context</div>
                    <p style={{ fontSize: 16, fontWeight: 700 }}>{activeProject?.project || 'Bespoke Fabrication'}</p>
                 </div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 40 }}>
                 <thead style={{ background: '#f9f9f9' }}>
                    <tr>
                       <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #000' }}>Deliverable Description</th>
                       <th style={{ padding: 12, textAlign: 'right', borderBottom: '2px solid #000' }}>Amount</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr>
                       <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{isInv ? 'Scheduled payment' : 'Initial cost estimation'} for {activeProject?.project}</td>
                       <td style={{ padding: 12, textAlign: 'right', borderBottom: '1px solid #eee' }}>{activeProject?.budget || '$0.00'}</td>
                    </tr>
                 </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <div style={{ width: 240 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '2px solid #000' }}>
                       <span style={{ fontWeight: 700 }}>Total Value</span>
                       <span style={{ fontWeight: 700 }}>{activeProject?.budget || '$0.00'}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {renderPrintView()}
      
      {/* 1. COMPRESSED ADMIN HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '16px 24px', borderRadius: 20, border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={onBack} className="p-btn-light" style={{ width: 36, height: 36, borderRadius: '50%', padding: 0 }}><ArrowLeft size={16} /></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <PAv i={client.name[0]} s={40} c={ac} />
            <div>
              <h2 className="lxfh" style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{client.name}</h2>
              <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{client.email}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, background: '#F9F7F4', padding: 4, borderRadius: 12 }}>
          {hubTabs.map(t => (
            <button 
              key={t.id} 
              onClick={() => setTab(t.id)}
              className={`lxf ${tab === t.id ? 'p-btn-dark' : ''}`}
              style={{ 
                padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6, 
                borderRadius: 10, fontSize: 11, fontWeight: 600,
                background: tab === t.id ? '#1A1410' : 'none', 
                border: 'none', color: tab === t.id ? '#fff' : '#625C54', 
                cursor: 'pointer', transition: 'all 0.2s' 
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MINIFIED CONTEXT STRIP */}
      {myProjects.length > 0 && (
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F9F7F4', padding: '10px 24px', borderRadius: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
               <span className="lxf" style={{ fontSize: 9, fontWeight: 800, color: '#B5AFA9', textTransform: 'uppercase' }}>Project:</span>
               <select 
                 value={activeProjectId} 
                 onChange={e => setActiveProjectId(e.target.value)}
                 style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 700, color: ac, outline: 'none', cursor: 'pointer' }}
               >
                 {myProjects.map(p => <option key={p.id} value={p.id}>{p.project || p.title}</option>)}
               </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
               <PSBadge s={activeProject?.status || 'Active'} c={ac} />
               <div className="lxf" style={{ fontSize: 11, fontWeight: 600, color: '#1A1410' }}>{(activeProject?.progress || 0)}%</div>
            </div>
         </div>
      )}

      {/* 3. DYNAMIC CONTENT AREA */}
      <div className="fade-in">
        {/* STATUS TAB: TIMELINE & ACTIONS */}
        {tab === 'status' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
             <div className="p-card" style={{ padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                   <h3 className="lxfh" style={{ fontSize: 20 }}>Operational Journey</h3>
                   <button 
                     disabled={updating}
                     onClick={async () => {
                       setUpdating(true);
                       const nextStage = Math.min((activeProject?.stage || 1) + 1, 12);
                       await props.updateProject(activeProjectId, { stage: nextStage });
                       setUpdating(false);
                     }} 
                     className="p-btn-gold" style={{ padding: '10px 20px', fontSize: 12 }}
                   >
                     {updating ? 'Syncing...' : `Advance to Stage ${Math.min((activeProject?.stage || 1) + 1, 12)}`}
                   </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: 30 }}>
                   <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 1, background: '#F0EBE5' }} />
                   {PROJECT_STAGES.map(s => {
                     const isDone = (activeProject?.stage || 1) > s.id;
                     const isCurrent = (activeProject?.stage || 1) === s.id;
                     return (
                       <div key={s.id} style={{ position: 'relative', paddingBottom: 20, opacity: isDone || isCurrent ? 1 : 0.4 }}>
                          <div style={{ position: 'absolute', left: -26, width: 12, height: 12, borderRadius: '50%', background: isDone ? '#16A34A' : isCurrent ? ac : '#F0EBE5', border: '3px solid #fff', zIndex: 2 }} />
                          <div className="lxf" style={{ fontSize: 14, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? ac : '#1A1410' }}>{s.name}</div>
                       </div>
                     );
                   })}
                </div>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <AdminTasks projectId={activeProjectId} projectTitle={activeProject?.project} {...props} brand={brand} />
                <div className="p-card luxe-pulse" style={{ padding: 24, background: '#1A1410', color: '#fff', textAlign: 'center' }}>
                   <Sparkles size={24} color={ac} style={{ margin: '0 auto 16px' }} />
                   <h4 className="lxfh" style={{ fontSize: 15, marginBottom: 8 }}>Project Insight</h4>
                   <p className="lxf" style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.7 }}>Stage {(activeProject?.stage || 1)} usually requires structural signing. Ensure QC audit is finalized today.</p>
                </div>
             </div>
          </div>
        )}

        {/* PAYMENTS TAB: INVOICING & LEDGER */}
        {tab === 'finance' && (
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
              <div className="p-card" style={{ padding: 32 }}>
                 <h3 className="lxfh" style={{ fontSize: 20, marginBottom: 24 }}>Financial Ledger</h3>
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {myInvoices.length > 0 ? myInvoices.map(i => (
                      <div key={i.id} className="p-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16, background: '#F9F7F4' }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ac, border: '1px solid #F0EBE5' }}><FileText size={20} /></div>
                        <div style={{ flex: 1 }}>
                           <div className="lxf" style={{ fontSize: 14, fontWeight: 700 }}>{i.title || `INV-${i.id.slice(-4).toUpperCase()}`}</div>
                           <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{i.amount} • <span style={{ color: i.status === 'Paid' ? '#16A34A' : '#EF4444' }}>{i.status}</span></div>
                        </div>
                        <button onClick={() => setShowPrint('invoice')} className="p-btn-light" style={{ width: 36, height: 36, padding: 0 }}><Download size={14} /></button>
                      </div>
                    )) : (
                      <div className="lxf" style={{ padding: 40, textAlign: 'center', color: '#B5AFA9', gridColumn: '1/-1' }}>No financial documents found.</div>
                    )}
                    <div 
                      onClick={() => props.setAI({ clientName: client.name, projectTitle: activeProject?.project, projectId: activeProjectId })} 
                      className="p-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16, border: `1.5px dashed ${ac}40`, cursor: 'pointer', background: 'none' }}
                    >
                       <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ac}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ac }}><Sparkles size={20} /></div>
                       <div className="lxf" style={{ fontSize: 14, fontWeight: 700, color: ac }}>AI Quote Builder</div>
                    </div>
                 </div>
              </div>
              <div className="p-card" style={{ padding: 24, background: '#1A1410', color: '#fff' }}>
                  <h4 className="lxfh" style={{ fontSize: 16, color: ac, marginBottom: 20 }}>Revenue Actions</h4>
                  <button onClick={() => setShowPrint('quote')} className="p-btn-gold" style={{ width: '100%', marginBottom: 12 }}><FileText size={16} /> View Master Quote</button>
                  <button onClick={() => setShowPrint('invoice')} className="p-btn-light" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}><DollarSign size={16} /> New Installment INV</button>
              </div>
           </div>
        )}

        {/* PRODUCTION TAB: RESTRUCTURED DASHBOARD */}
        {tab === 'prod' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, maxWidth: '100%' }}>
             {/* Main Column: Kanban */}
             <div className="p-card" style={{ padding: 24, minWidth: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                   <Hammer size={18} color={ac} />
                   <h3 className="lxfh" style={{ fontSize: 18 }}>Factory Pipeline</h3>
                </div>
                <div style={{ flex: 1, overflowX: 'auto' }}>
                   <div style={{ minWidth: 600 }}>
                      <FabricationKanban clients={myProjects} brand={brand} {...props} isSubView={true} />
                   </div>
                </div>
             </div>

             {/* Side Column: Approvals & Procurement */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="p-card" style={{ padding: 20 }}>
                   <h4 className="lxfh" style={{ fontSize: 14, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}><PackageCheck size={16} color={ac} /> Approvals</h4>
                   <div style={{ maxHeight: 240, overflowY: 'auto' }}>
                      <MaterialSelector 
                        materials={myMaterials} 
                        onApprove={(id) => props.updateMaterial(activeProjectId, id, { status: 'Approved' })}
                        onReject={(id) => props.updateMaterial(activeProjectId, id, { status: 'Rejected' })}
                        ac={ac}
                      />
                   </div>
                </div>
                <div className="p-card" style={{ padding: 20 }}>
                   <h4 className="lxfh" style={{ fontSize: 14, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}><Truck size={16} color={ac} /> Procurement</h4>
                   <div style={{ maxHeight: 240, overflowY: 'auto' }}>
                      <ProjectProcurement projectId={activeProjectId} {...props} brand={brand} />
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* GALLERY TAB: PHOTOS & MEDIA */}
        {tab === 'photos' && (
           <AdminProjectGallery projectId={activeProjectId} media={props.media} uploadMedia={props.uploadMedia} deleteMedia={props.deleteMedia} ac={ac} />
        )}

        {/* SUPPORT TAB: COMMUNICATION */}
        {tab === 'support' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
            <div className="p-card" style={{ padding: 32 }}>
              <h3 className="lxfh" style={{ fontSize: 20, marginBottom: 24 }}>Client Direct Messenger</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                 <div style={{ padding: 24, border: '1px solid #F0EBE5', borderRadius: 20, background: '#F9F7F4' }}>
                    <textarea 
                      className="lxf" 
                      placeholder={`Send an official project update to ${client.name}...`} 
                      style={{ background: 'none', border: 'none', width: '100%', height: 80, fontSize: 14, outline: 'none', resize: 'none', color: '#1A1410' }}
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                       <button 
                        disabled={!newNote.trim() || updating}
                        onClick={async () => {
                          setUpdating(true);
                          await props.createNote(activeProjectId, {
                            text: newNote,
                            author: props.user?.name || 'Glasstech Admin',
                            type: 'update',
                            createdAt: new Date().toISOString()
                          });
                          setNewNote('');
                          setUpdating(false);
                        }}
                        className="p-btn-dark" style={{ padding: '10px 24px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 8 }}
                       > <Send size={14} /> Update Client</button>
                    </div>
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                   {(props.notes || []).filter(n => n.parentId === activeProjectId).length > 0 ? (
                     (props.notes || []).filter(n => n.parentId === activeProjectId).reverse().map(n => (
                       <div key={n.id} style={{ display: 'flex', gap: 12 }}>
                          <PAv i={n.author?.[0] || 'A'} s={36} c={ac} />
                          <div style={{ flex: 1, padding: 16, background: '#fff', border: '1px solid #F0EBE5', borderRadius: 16 }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span className="lxf" style={{ fontWeight: 800, fontSize: 12 }}>{n.author}</span>
                                <span className="lxf" style={{ fontSize: 10, color: '#B5AFA9' }}>{new Date(n.createdAt).toLocaleDateString()}</span>
                             </div>
                             <div className="lxf" style={{ fontSize: 14, color: '#625C54', lineHeight: 1.5 }}>{n.text}</div>
                          </div>
                       </div>
                     ))
                   ) : (
                     <div className="lxf" style={{ textAlign: 'center', color: '#B5AFA9', padding: 40 }}>No communication history yet.</div>
                   )}
                 </div>
              </div>
            </div>
            <div className="p-card" style={{ padding: 24 }}>
               <h4 className="lxfh" style={{ fontSize: 15, marginBottom: 16 }}>Client Management</h4>
               <button className="p-btn-light" style={{ width: '100%', marginBottom: 12, justifyContent: 'flex-start', fontSize: 12 }}><Calendar size={14} /> Schedule Site Meeting</button>
               <button className="p-btn-light" style={{ width: '100%', marginBottom: 12, justifyContent: 'flex-start', fontSize: 12 }}><CheckCircle2 size={14} /> Mark as Completed</button>
               <div style={{ height: 1, background: '#F0EBE5', margin: '16px 0' }} />
               <button className="p-btn-light" style={{ width: '100%', color: '#EF4444', borderColor: '#EF444420', justifyContent: 'flex-start', fontSize: 12 }}><Trash2 size={14} /> Archive Customer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
