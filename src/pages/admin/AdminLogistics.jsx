import React, { useState } from 'react';
import { 
  Plus, Truck, Package, RefreshCw, ChevronDown, ChevronUp, 
  Wrench, Scan, MapPin, Hammer, Navigation, Box 
} from 'lucide-react';
import { FF as PFormField, PSBadge } from '../../components/Shared';

export default function AdminLogistics({ shipments = [], clients = [], procurements = [], assets = [], createShipment, updateShipment, updateProcurement, brand }) {
  const ac = brand.color || '#C8A96E';
  const [showAdd, setShowAdd] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [newS, setNewS] = useState({ projectId: '', item: '', supplier: '', status: 'Order Placed', eta: '', container: '' });

  // Simulation Assets (High-value site tools) pulled from props
  // props.assets contains the live list from Firestore

  const syncManifest = (shipment) => {
    const items = (procurements || []).filter(p => p.containerId === shipment.container);
    items.forEach(async item => {
       await updateProcurement(item.id, { status: shipment.status }, item.parentId);
    });
    alert(`Synced ${items.length} items to status: ${shipment.status}`);
  };

  const addShipment = async () => {
    if (!newS.projectId || !newS.item) return alert('Project and Item required');
    await createShipment({ ...newS, isShipment: true });
    setNewS({ projectId: '', item: '', supplier: '', status: 'Order Placed', eta: '', container: '' });
    setShowAdd(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Logistics & Assets</h2>
        <button onClick={() => setShowAdd(!showAdd)} className="p-btn-dark lxf" style={{ padding: '10px 20px', fontSize: 13, gap: 8, display: 'flex', alignItems: 'center' }}><Plus size={16} /> Track Shipment</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
         {/* LEFT: SHIPMENTS */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {showAdd && (
              <div className="p-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                <thead><tr>{['Shipment ID', 'Project', 'Status', 'ETA'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
                <tbody>
                  {(shipments || []).filter(s => s.isShipment || s.status === 'Shipped' || s.container).map(s => {
                    const manifestItems = (procurements || []).filter(p => p.containerId === s.container);
                    const isEx = expanded === s.id;
                    return (
                      <React.Fragment key={s.id}>
                        <tr className="t-row" style={{ background: isEx ? '#F9F7F4' : 'none' }}>
                          <td style={{ padding: '16px' }}>
                            <button onClick={() => setExpanded(isEx ? null : s.id)} style={{ background: 'none', border: 'none', color: ac, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                              {isEx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{s.id.slice(-6).toUpperCase()}</span>
                            </button>
                          </td>
                          <td style={{ padding: '16px' }}>
                             <div className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>{s.item || s.itemName}</div>
                             <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{clients.find(p => p.id === s.parentId)?.project || 'Global Batch'}</div>
                          </td>
                          <td style={{ padding: '16px' }}>
                             <select className="lxf" style={{ fontSize: 11, padding: '4px 8px', borderRadius: 4, background: '#fff', border: '1px solid var(--border)', fontWeight: 600 }} value={s.status} onChange={e => updateShipment(s.id, { status: e.target.value })}>
                                {['Order Placed', 'Shipped', 'At Customs', 'In Transit', 'Delivered'].map(st => <option key={st} value={st}>{st}</option>)}
                             </select>
                          </td>
                          <td style={{ padding: '16px' }}><span className="lxf" style={{ fontSize: 12, color: '#7A6E62' }}>{s.eta}</span></td>
                        </tr>
                        {isEx && (
                          <tr style={{ background: '#F9F7F4' }}>
                             <td colSpan={4} style={{ padding: '0 16px 24px 40px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderLeft: `2px solid ${ac}`, paddingLeft: 20 }}>
                                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                      <div className="lxf" style={{ fontSize: 10, color: ac, fontWeight: 800, textTransform: 'uppercase' }}>Container Manifest ({manifestItems.length} items)</div>
                                      <button onClick={() => syncManifest(s)} style={{ fontSize: 10, background: 'none', border: 'none', color: ac, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><RefreshCw size={10} /> Sync All</button>
                                   </div>
                                   {manifestItems.map(m => (
                                     <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, background: '#fff', padding: '10px 14px', borderRadius: 8, border: '1px solid #F0EBE5' }}>
                                        <span style={{ fontWeight: 600 }}>{m.item || m.itemName}</span>
                                        <span style={{ fontWeight: 700, color: m.status === s.status ? '#16A34A' : '#B5AFA9' }}>{m.status.toUpperCase()}</span>
                                     </div>
                                   ))}
                                   {manifestItems.length === 0 && <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>No items linked to {s.container}.</div>}
                                </div>
                             </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
         </div>

         {/* RIGHT: ASSET ALLOCATION */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="p-card" style={{ padding: 24, background: '#1A1410', color: '#fff' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 className="lxfh" style={{ fontSize: 18, color: '#fff' }}>Asset Allocation</h3>
                  <Scan size={20} color={ac} />
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {assets.map(a => (
                    <div key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,.1)', paddingBottom: 16 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>{a.name}</span>
                          <span style={{ fontSize: 10, color: ac, fontWeight: 800 }}>{a.id}</span>
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,.5)' }}>
                          <MapPin size={12} /> {clients.find(p => p.id === a.siteId)?.project || 'Site'}
                       </div>
                       <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                             <div style={{ width: 20, height: 20, borderRadius: '50%', background: ac, color: '#1A1410', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{a.user}</div>
                             <span style={{ fontSize: 11 }}>Signed to Lead</span>
                          </div>
                          <PSBadge s={a.status} />
                       </div>
                    </div>
                  ))}
               </div>
               <button className="glass-btn" style={{ width: '100%', marginTop: 20, padding: 10, fontSize: 11 }}><Wrench size={14} /> Inventory Audit</button>
            </div>

            <div className="p-card" style={{ padding: 20, textAlign: 'center', border: `1px dashed ${ac}` }}>
               <Box size={32} color={ac} style={{ marginBottom: 12, opacity: 0.5 }} />
               <div className="lxfh" style={{ fontSize: 16, marginBottom: 4 }}>Warehouse Status</div>
               <p style={{ fontSize: 12, color: '#B5AFA9', lineHeight: 1.6 }}>14 items currently in local warehouse awaiting site dispatch.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
