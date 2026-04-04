import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ShoppingCart, Truck, LayoutDashboard, 
  MessageSquare, FileText, CheckCircle, Clock, 
  ChevronDown, ExternalLink, Printer, Plus, Download,
  Globe, Package, Camera, Info, Sparkles, DollarSign
} from 'lucide-react';
import { PAv, PSBadge, SBadge, FF as PFormField } from '../../components/Shared';
import { PROJECT_STAGES } from '../../data';
import AdminTasks from './AdminTasks';
import AdminProcurement from './AdminProcurement';
import AdminProjectGallery from './AdminProjectGallery';
import MaterialSelector from '../../components/MaterialSelector';

export default function ClientHub({ clientId, dbClients = [], clients = [], onBack, ...props }) {
  const brand = props.brand || {};
  const ac = brand.color || '#C8A96E';
  
  const client = dbClients.find(c => c.id === clientId) || dbClients.find(c => c.email === clientId);
  const myProjects = clients.filter(p => p.clientIds?.includes(clientId) || p.clientId === clientId || p.id === clientId);
  
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [tab, setTab] = useState('buying');
  const [showPrint, setShowPrint] = useState(null); // 'quote' or 'invoice'

  // Mock materials for the project
  const [myMaterials, setMyMaterials] = useState([
    { id: 'mat1', name: 'Bronze Tinted Glass', specs: '12mm Tempered', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', desc: 'Sleek bronze finish for privacy and heat reduction.', status: 'pending' },
    { id: 'mat2', name: 'Black Matte Hinge', specs: 'Heavy-Duty Stainless', imageUrl: 'https://images.unsplash.com/photo-1581094380920-0966f38fe841?w=800&q=80', desc: 'Durable architectural finish matching the facade frame.', status: 'Approved' }
  ]);

  useEffect(() => {
    if (myProjects.length > 0 && !activeProjectId) {
      setActiveProjectId(myProjects[0].id);
    }
  }, [myProjects, activeProjectId]);

  const activeProject = myProjects.find(p => p.id === activeProjectId) || myProjects[0];

  if (!client) return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <div className="lxf" style={{ color: '#B5AFA9' }}>Client not found</div>
      <button onClick={onBack} className="p-btn-light" style={{ marginTop: 20 }}>Back to Directory</button>
    </div>
  );

  const renderPrintView = () => {
    if (!showPrint) return null;
    const isInv = showPrint === 'invoice';
    return (
      <div className="overlay-modal" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setShowPrint(null)}>
        <div className="modal-box" style={{ maxWidth: 800, padding: 0, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
           <div style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="lxf" style={{ fontWeight: 700 }}>Generated {isInv ? 'Invoice' : 'Quote'}</span>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => window.print()} className="p-btn-dark" style={{ minHeight: 36, padding: '0 16px', fontSize: 12 }}><Printer size={14} /> Print / Save PDF</button>
                <button onClick={() => setShowPrint(null)} className="p-btn-light" style={{ minHeight: 36, padding: '0 16px', fontSize: 12 }}>Close</button>
              </div>
           </div>
           <div id="printable-doc" style={{ padding: 60, background: '#fff', color: '#000', minHeight: 800, fontFamily: 'serif' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 60 }}>
                 <div>
                    <h1 style={{ fontSize: 32, marginBottom: 8 }}>{brand.name}</h1>
                    <p style={{ fontSize: 13, opacity: 0.6 }}>{brand.location}<br/>{brand.phone} • {brand.email}</p>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: 24, textTransform: 'uppercase', letterSpacing: 2 }}>{isInv ? 'Invoice' : 'Quote'}</h2>
                    <p style={{ fontSize: 13, opacity: 0.6 }}>Date: {new Date().toLocaleDateString()}<br/>Ref: GT-{Math.floor(Math.random()*9000)+1000}</p>
                 </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 60 }}>
                 <div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', marginBottom: 8, borderBottom: '1px solid #eee' }}>Bill To</div>
                    <p style={{ fontSize: 16, fontWeight: 700 }}>{client.name}</p>
                    <p style={{ fontSize: 13 }}>{client.company || 'Private Residence'}<br/>{client.email}</p>
                 </div>
                 <div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', marginBottom: 8, borderBottom: '1px solid #eee' }}>Project</div>
                    <p style={{ fontSize: 16, fontWeight: 700 }}>{activeProject?.project || 'General Works'}</p>
                 </div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 40 }}>
                 <thead style={{ background: '#f9f9f9' }}>
                    <tr>
                       <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #000' }}>Description</th>
                       <th style={{ padding: 12, textAlign: 'right', borderBottom: '2px solid #000' }}>Total</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr>
                       <td style={{ padding: 12, borderBottom: '1px solid #eee' }}>{isInv ? 'Balance payment for' : 'Proposed works for'} {activeProject?.project}</td>
                       <td style={{ padding: 12, textAlign: 'right', borderBottom: '1px solid #eee' }}>{activeProject?.budget || '$0.00'}</td>
                    </tr>
                 </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <div style={{ width: 240 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '2px solid #000' }}>
                       <span style={{ fontWeight: 700 }}>Grand Total</span>
                       <span style={{ fontWeight: 700 }}>{activeProject?.budget || '$0.00'}</span>
                    </div>
                 </div>
              </div>
              <div style={{ marginTop: 100, fontSize: 12, opacity: 0.5, lineHeight: 1.6 }}>
                 <p style={{ fontWeight: 700, marginBottom: 4 }}>Terms & Conditions</p>
                 <p>All items remain property of {brand.name} until fully paid. Standard guarantees apply for 12 months post-installation.</p>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {renderPrintView()}
      
      {/* HEADER: CLIENT IDENTITY & CONTEXT SELECTOR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', background: '#fff', padding: '24px 32px', borderRadius: 24, border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={onBack} className="p-btn-light" style={{ width: 44, height: 44, borderRadius: '50%', padding: 0 }}><ArrowLeft size={18} /></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <PAv i={client.name[0]} s={64} c={ac} />
            <div>
              <h2 className="lxfh" style={{ fontSize: 28, fontWeight: 400 }}>{client.name}</h2>
              <div className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>{client.company || 'Private Client'} • {client.email}</div>
            </div>
          </div>
        </div>

        {myProjects.length > 0 && (
           <div className="glass-panel" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase', letterSpacing: '.1em' }}>Project Context</div>
              <select 
                value={activeProjectId} 
                onChange={e => setActiveProjectId(e.target.value)}
                style={{ background: 'none', border: 'none', fontSize: 15, fontWeight: 700, color: ac, outline: 'none', cursor: 'pointer' }}
              >
                {myProjects.map(p => <option key={p.id} value={p.id}>{p.project || p.title}</option>)}
              </select>
           </div>
        )}
      </div>

      {/* HUB NAVIGATION */}
      <div style={{ display: 'flex', gap: 12 }}>
         {[
           { id: 'buying', label: 'Procurement (Buying)', icon: <ShoppingCart size={16} /> },
           { id: 'logistics', label: 'Logistics Tracker', icon: <Truck size={16} /> },
           { id: 'materials', label: 'Material Selections', icon: <Sparkles size={16} /> },
           { id: 'ops', label: 'Project Operations', icon: <LayoutDashboard size={16} /> },
           { id: 'docs', label: 'Financial Docs', icon: <FileText size={16} /> },
           { id: 'chat', label: 'Communications', icon: <MessageSquare size={16} /> },
         ].map(t => (
           <button 
            key={t.id} 
            onClick={() => setTab(t.id)}
            className={`lxf ${tab === t.id ? 'p-btn-dark' : 'p-btn-light'}`}
            style={{ flex: 1, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 16 }}
           >{t.icon} {t.label}</button>
         ))}
      </div>

      <div className="fade-in">
        {tab === 'buying' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div className="p-card" style={{ padding: 24 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h3 className="lxfh" style={{ fontSize: 18 }}>Buying Strategy</h3>
                      <div className="lxf" style={{ fontSize: 11, padding: '4px 8px', borderRadius: 100, background: '#1A1410', color: '#fff' }}>PROJECT: {activeProject?.project}</div>
                   </div>
                   <AdminProcurement 
                      projectId={activeProjectId} 
                      procurements={props.procurements} 
                      createProcurement={props.createProcurement} 
                      updateProcurement={props.updateProcurement} 
                      deleteProcurement={props.deleteProcurement} 
                      brand={brand} 
                   />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                   <div className="p-card" style={{ padding: 24, background: '#1A1410', color: '#fff' }}>
                      <h4 className="lxfh" style={{ fontSize: 16, color: ac, marginBottom: 12 }}>Financial Generation</h4>
                      <p className="lxf" style={{ fontSize: 13, opacity: 0.7, marginBottom: 20 }}>Generate polished PDFs for the current procurement phase to share with {client.name}.</p>
                      <div style={{ display: 'flex', gap: 10 }}>
                         <button onClick={() => setShowPrint('quote')} className="p-btn-gold" style={{ flex: 1, height: 44, fontSize: 12 }}><Sparkles size={14} /> Generate Quote</button>
                         <button onClick={() => setShowPrint('invoice')} className="p-btn-light" style={{ flex: 1, height: 44, fontSize: 12, background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}><DollarSign size={14} /> Final Invoice</button>
                      </div>
                   </div>
                   <div className="p-card" style={{ padding: 24 }}>
                      <h4 className="lxfh" style={{ fontSize: 16, marginBottom: 16 }}>Inventory Alerts</h4>
                      <div style={{ padding: 16, borderRadius: 12, background: '#FFF7ED', border: '1px solid #FFEDD5', color: '#9A3412', display: 'flex', gap: 12 }}>
                         <Info size={20} />
                         <div style={{ fontSize: 13 }}>3/5 materials for this project phase require <b>International Procurement</b> via logistics gateway.</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {tab === 'materials' && (
          <MaterialSelector 
            materials={myMaterials} 
            onApprove={(id) => setMyMaterials(myMaterials.map(m => m.id === id ? { ...m, status: 'Approved' } : m))}
            onReject={(id) => setMyMaterials(myMaterials.map(m => m.id === id ? { ...m, status: 'Rejected' } : m))}
            ac={ac}
          />
        )}

        {tab === 'logistics' && (
          <div className="p-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <div>
                <h3 className="lxfh" style={{ fontSize: 24 }}>Logistics Tracker</h3>
                <p className="lxf" style={{ color: '#B5AFA9', fontSize: 13 }}>Tracking status of international and local component arrivals.</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="p-btn-light" style={{ padding: '8px 16px', fontSize: 11 }}><Globe size={14} /> Int'l Hub</button>
                <button className="p-btn-light" style={{ padding: '8px 16px', fontSize: 11 }}><Plus size={14} /> New Tracker</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               {(props.procurements || []).filter(p => p.parentId === activeProjectId && (p.isShipment || p.status === 'Shipped')).map(s => (
                 <div key={s.id} className="glass-panel" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                       <div style={{ display: 'flex', gap: 16 }}>
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ac}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ac }}><Package size={20} /></div>
                          <div>
                             <div className="lxf" style={{ fontSize: 16, fontWeight: 700 }}>{s.item}</div>
                             <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>Tracking: {s.trackingId || 'GT-LOG-772'} • Origin: {s.origin || 'International'}</div>
                          </div>
                       </div>
                       <div style={{ textAlign: 'right' }}>
                          <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase' }}>Current ETA</div>
                          <div className="lxf" style={{ fontSize: 18, fontWeight: 700, color: ac }}>{s.eta || 'Calculating...'}</div>
                       </div>
                    </div>
                    <div className="prog" style={{ height: 6, background: '#F0EBE5', marginBottom: 12 }}>
                       <div className="prog-f" style={{ width: '65%', background: ac }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#B5AFA9' }}>
                       <span>Origin (Port of Exit)</span>
                       <span style={{ color: '#16A34A', fontWeight: 700 }}>In Transit - Atlantic Region</span>
                       <span>Final Delivery (Accra)</span>
                    </div>
                 </div>
               ))}
               {(props.procurements || []).filter(p => p.parentId === activeProjectId && (p.isShipment || p.status === 'Shipped')).length === 0 && (
                 <div style={{ textAlign: 'center', padding: '40px', background: '#F9F7F4', borderRadius: 16 }}>
                   <Truck size={32} color="#B5AFA9" style={{ marginBottom: 12 }} />
                   <div className="lxf" style={{ color: '#B5AFA9' }}>No active international logstics trackers for this project phase.</div>
                 </div>
               )}
            </div>
          </div>
        )}

        {tab === 'ops' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 24, alignItems: 'start' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="p-card" style={{ padding: 24 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <h3 className="lxfh" style={{ fontSize: 20 }}>Project Operational Timeline</h3>
                      <button className="p-btn-gold" style={{ padding: '8px 16px', fontSize: 11 }}>Update Stage</button>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: 30 }}>
                      <div style={{ position: 'absolute', left: 9, top: 0, bottom: 0, width: 2, background: '#F0EBE5' }} />
                      {PROJECT_STAGES.map(s => {
                        const isDone = (activeProject?.stage || 1) > s.id;
                        const isCurrent = (activeProject?.stage || 1) === s.id;
                        return (
                          <div key={s.id} style={{ position: 'relative', paddingBottom: 32, opacity: isDone || isCurrent ? 1 : 0.4 }}>
                             <div style={{ position: 'absolute', left: -26, width: 14, height: 14, borderRadius: '50%', background: isDone ? '#16A34A' : isCurrent ? ac : '#F0EBE5', border: '3px solid #fff', zIndex: 2 }} />
                             <div className="lxf" style={{ fontSize: 15, fontWeight: isCurrent ? 700 : 500 }}>{s.name}</div>
                             <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{isDone ? 'Completed' : isCurrent ? 'In Progress • Our team is currently active on this phase.' : 'Upcoming'}</div>
                          </div>
                        );
                      })}
                   </div>
                </div>
                <AdminProjectGallery projectId={activeProjectId} media={props.media} uploadMedia={props.uploadMedia} deleteMedia={props.deleteMedia} ac={ac} />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <AdminTasks projectId={activeProjectId} projectTitle={activeProject?.project} {...props} brand={brand} />
                <div className="p-card luxe-pulse" style={{ padding: 20, background: '#1A1410', color: '#fff' }}>
                   <h4 className="lxf" style={{ fontSize: 13, textTransform: 'uppercase', color: ac, marginBottom: 8 }}>Genesis Suggestion</h4>
                   <p className="lxf" style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.8 }}>Based on current {activeProject?.cat} progress, we recommend initiating <b>Material Approval for Stage {(activeProject?.stage || 1) + 1}</b> now to avoid logistics delays.</p>
                </div>
             </div>
          </div>
        )}

        {tab === 'docs' && (
           <div className="p-card" style={{ padding: 32 }}>
             <h3 className="lxfh" style={{ fontSize: 24, marginBottom: 32 }}>Document Center</h3>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {(props.invoices || []).filter(i => i.parentId === activeProjectId).map(i => (
                  <div key={i.id} className="p-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ac}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ac }}><FileText size={20} /></div>
                    <div style={{ flex: 1 }}>
                       <div className="lxf" style={{ fontSize: 14, fontWeight: 700 }}>{i.title || `Invoice ${i.id}`}</div>
                       <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>Finalized: {i.due || 'Recently'}</div>
                    </div>
                    <button onClick={() => setShowPrint('invoice')} className="p-btn-light" style={{ width: 36, height: 36, padding: 0 }}><Download size={16} /></button>
                  </div>
                ))}
                <div onClick={() => setShowPrint('quote')} className="p-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16, border: `1.5px dashed ${ac}40`, cursor: 'pointer' }}>
                   <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ac}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ac }}><Plus size={20} /></div>
                   <div className="lxf" style={{ fontSize: 14, color: ac }}>Generate New Proposal</div>
                </div>
             </div>
           </div>
        )}

        {tab === 'chat' && (
          <div className="p-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
               <h3 className="lxfh" style={{ fontSize: 24 }}>Activity & Comms</h3>
               <button className="p-btn-gold" style={{ padding: '8px 20px' }}>Post New Update</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               {(props.notes || []).filter(n => n.parentId === activeProjectId).map(n => (
                 <div key={n.id} style={{ display: 'flex', gap: 16 }}>
                    <PAv i={n.author?.[0] || 'A'} s={40} c={ac} />
                    <div className="glass-panel" style={{ flex: 1, padding: 16 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span className="lxf" style={{ fontWeight: 700, fontSize: 13 }}>{n.author || 'Admin'}</span>
                          <span className="lxf" style={{ fontSize: 10, color: '#B5AFA9' }}>{new Date(n.createdAt).toLocaleString()}</span>
                       </div>
                       <div className="lxf" style={{ fontSize: 14, lineHeight: 1.6 }}>{n.text}</div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
