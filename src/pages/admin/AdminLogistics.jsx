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
        <div>
           <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Logistics & Assets</h2>
           <p className="lxf" style={{ color: '#B5AFA9', fontSize: 13 }}>Global transit tracking and asset allocation pulses.</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="p-btn-dark lxf" style={{ padding: '10px 20px', fontSize: 13, gap: 8, display: 'flex', alignItems: 'center' }}><Plus size={16} /> Track Shipment</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 1024 ? '1fr 340px' : '1fr', gap: 32 }}>
         {/* LEFT: SHIPMENTS */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {showAdd && (
              <div className="p-card fade-in" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                 <button onClick={addShipment} className="p-btn-gold lxf" style={{ padding: '12px', borderRadius: 12 }}>Initialize Tracking</button>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
               {(shipments || []).filter(s => s.isShipment || s.status === 'Shipped' || s.container).map(s => {
                 const manifestItems = (procurements || []).filter(p => p.containerId === s.container);
                 const isEx = expanded === s.id;
                 return (
                   <div key={s.id} className="p-card fade-in" style={{ padding: 24, background: '#fff', borderRadius: 24, border: isEx ? `1px solid ${ac}40` : '1px solid transparent' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                         <div style={{ width: 48, height: 48, borderRadius: 16, background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ac }}>
                            <Truck size={24} />
                         </div>
                         <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 9, color: '#B5AFA9', fontWeight: 800, textTransform: 'uppercase' }}>Shipment ID</div>
                            <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace' }}>{s.id.slice(-6).toUpperCase()}</div>
                         </div>
                      </div>

                      <div className="lxfh" style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{s.item || s.itemName}</div>
                      <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', marginBottom: 20 }}>{clients.find(p => p.id === s.parentId)?.project || 'Global Batch'}</div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 24 }}>
                         <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 4 }}>Status</div>
                            <select className="p-inp" style={{ fontSize: 11, padding: '8px' }} value={s.status} onChange={e => updateShipment(s.id, { status: e.target.value })}>
                               {['Order Placed', 'Shipped', 'At Customs', 'In Transit', 'Delivered'].map(st => <option key={st} value={st}>{st}</option>)}
                            </select>
                         </div>
                         <div style={{ width: 100 }}>
                            <div style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 4 }}>ETA</div>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>{s.eta || 'TBD'}</div>
                         </div>
                      </div>

                      <div style={{ borderTop: '1px solid #F9F7F4', paddingTop: 16 }}>
                         <button onClick={() => setExpanded(isEx ? null : s.id)} style={{ width: '100%', background: 'none', border: 'none', color: '#1A1410', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            {isEx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            {isEx ? 'Hide Manifest' : `View Manifest (${manifestItems.length} items)`}
                         </button>
                      </div>

                      {isEx && (
                        <div className="fade-in" style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: 10, color: ac, fontWeight: 800 }}>CONTAINER: {s.container}</span>
                              <button onClick={() => syncManifest(s)} style={{ background: 'none', border: 'none', color: ac, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>Sync Status</button>
                           </div>
                           {manifestItems.map(m => (
                             <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#F9F7F4', padding: '10px 14px', borderRadius: 12, fontSize: 11 }}>
                                <span style={{ fontWeight: 600 }}>{m.item || m.itemName}</span>
                                <span style={{ fontWeight: 700, color: m.status === s.status ? '#16A34A' : '#B5AFA9' }}>{m.status.toUpperCase()}</span>
                             </div>
                           ))}
                        </div>
                      )}
                   </div>
                 );
               })}
            </div>
         </div>

         {/* RIGHT: ASSET ALLOCATION */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="p-card" style={{ padding: 24, background: '#1A1410', color: '#fff', borderRadius: 32 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h3 className="lxfh" style={{ fontSize: 18, color: '#fff' }}>Asset Pulse</h3>
                  <Scan size={20} color={ac} />
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {assets.map(a => (
                    <div key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,.05)', paddingBottom: 16 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</span>
                          <span style={{ fontSize: 9, color: ac, fontWeight: 800 }}>{a.id}</span>
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,.4)', marginBottom: 12 }}>
                          <MapPin size={12} /> {clients.find(p => p.id === a.siteId)?.project || 'Global Site'}
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                             <div style={{ width: 24, height: 24, borderRadius: '50%', background: ac, color: '#1A1410', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{a.user}</div>
                             <span style={{ fontSize: 11, color: 'rgba(255,255,255,.7)' }}>Lead Allocation</span>
                          </div>
                          <PSBadge s={a.status} />
                       </div>
                    </div>
                  ))}
               </div>
               <button className="glass-btn" style={{ width: '100%', marginTop: 20, padding: 12 }}><Wrench size={14} /> Global Inventory Audit</button>
            </div>

            <div className="p-card" style={{ padding: 24, textAlign: 'center', border: `1px dashed ${ac}`, borderRadius: 24 }}>
               <Box size={32} color={ac} style={{ marginBottom: 12, opacity: 0.5 }} />
               <div className="lxfh" style={{ fontSize: 16, marginBottom: 4 }}>Warehouse Pulse</div>
               <p style={{ fontSize: 12, color: '#B5AFA9', lineHeight: 1.6 }}>12 major items currently in central warehouse awaiting site deployment.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
