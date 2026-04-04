import { SBadge, FF as PFormField } from '../../components/Shared';
import { CheckCircle, AlertCircle, Camera, CheckSquare, List } from 'lucide-react';

export default function AdminGovernance({ projectId, approvals, createApproval, updateApproval, changeRequests, updateChangeRequest, teamMembers, dbClients, clients, brand, ...props }) {
  const ac = brand.color || '#C8A96E';
  const [showAdd, setShowAdd] = useState(false);
  const [na, setNa] = useState({ itemName: '', description: '', specifications: '', imageUrl: '' });
  const [evaluating, setEvaluating] = useState(null); // CR ID
  const [evalData, setEvalData] = useState({ costImpact: '', timelineImpact: '' });

  const [deliverables, setDeliverables] = useState([
    { id: 'dev1', title: 'Curved Facade Glass', status: 'signed', outcomeStatus: 'pending' },
    { id: 'dev2', title: 'Smart Entry System', status: 'signed', outcomeStatus: 'verified', photoId: 'P101' }
  ]);

  const myApprovals = (approvals || []).filter(a => a.parentId === projectId);
  const myCRs = (changeRequests || []).filter(c => c.parentId === projectId);

  const handleEvaluate = async (id) => {
    await updateChangeRequest(id, { ...evalData, status: 'evaluated' }, projectId);
    setEvaluating(null);
    setEvalData({ costImpact: '', timelineImpact: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 1. SCOPE GOVERNANCE */}
      <div className="p-card" style={{ padding: 24, borderLeft: `4px solid ${ac}` }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
               <h3 className="lxfh" style={{ fontSize: 18 }}>Project Scope Sign-off</h3>
               <p className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>Verified deliverables the client expects to see on-site.</p>
            </div>
            <CheckSquare size={20} color={ac} />
         </div>
         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {deliverables.map(d => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#F9F7F4', borderRadius: 10 }}>
                 <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: d.status === 'signed' ? ac : '#DFD9D1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       {d.status === 'signed' && <CheckCircle size={12} color="#fff" />}
                    </div>
                    <span className="lxf" style={{ fontSize: 13, fontWeight: 700 }}>{d.title}</span>
                 </div>
                 <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    {d.outcomeStatus === 'verified' ? (
                       <span style={{ fontSize: 10, color: '#16A34A', fontWeight: 800, display: 'flex', gap: 4, alignItems: 'center' }}>
                          <CheckCircle size={10} /> OUTCOME VERIFIED
                       </span>
                    ) : (
                       <span style={{ fontSize: 10, color: '#B5AFA9' }}>PENDING VERIFICATION</span>
                    )}
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div className="p-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 className="lxfh" style={{ fontSize: 18 }}>Approvals Pipeline</h3>
          <button onClick={() => setShowAdd(!showAdd)} className="lxf" style={{ fontSize: 13, background: 'none', border: 'none', color: ac, fontWeight: 600, cursor: 'pointer' }}>+ Request Approval</button>
        </div>

        {showAdd && (
          <div style={{ padding: 16, background: '#F9F7F4', borderRadius: 8, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <PFormField label="Item/Material Name"><input className="p-inp" value={na.itemName} onChange={e => setNa({...na, itemName: e.target.value})} /></PFormField>
              <PFormField label="Specifications"><input className="p-inp" value={na.specifications} onChange={e => setNa({...na, specifications: e.target.value})} /></PFormField>
              <PFormField label="Image URL"><input className="p-inp" value={na.imageUrl} onChange={e => setNa({...na, imageUrl: e.target.value})} /></PFormField>
              <PFormField label="Description"><textarea className="p-inp" rows={2} value={na.description} onChange={e => setNa({...na, description: e.target.value})} /></PFormField>
              <button onClick={() => { createApproval(projectId, na); setShowAdd(false); setNa({itemName:'', description:'', specifications:'', imageUrl:''}); }} className="p-btn-dark lxf">Send to Client</button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {myApprovals.map(a => (
              <div key={a.id} style={{ padding: 12, border: '1px solid rgba(0,0,0,.05)', borderRadius: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
                {a.imageUrl && <img src={a.imageUrl} style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }} alt="" />}
                <div style={{ flex: 1 }}>
                    <div className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>{a.itemName}</div>
                    <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9' }}>{a.status.toUpperCase()}</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.status === 'approved' ? '#16A34A' : a.status === 'rejected' ? '#ff4444' : '#FF9800' }} />
              </div>
            ))}
            {myApprovals.length === 0 && <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', fontStyle: 'italic', gridColumn: 'span 2' }}>No items in approval pipeline.</div>}
        </div>
      </div>

      <div className="p-card" style={{ padding: 24 }}>
         <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Change Requests</h3>
         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myCRs.map(r => (
              <div key={r.id} style={{ padding: 16, border: '1px solid rgba(0,0,0,.05)', borderRadius: 8 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div className="lxf" style={{ fontSize: 14, fontWeight: 600 }}>{r.description}</div>
                    <SBadge s={r.status} />
                 </div>
                 {r.status === 'pending' && !evaluating && (
                   <button onClick={() => setEvaluating(r.id)} className="p-btn-gold" style={{ fontSize: 11, padding: '4px 12px' }}>Evaluate Impact</button>
                 )}
                 {evaluating === r.id && (
                   <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(0,0,0,.03)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                         <input className="p-inp" placeholder="Cost Impact (e.g. +$500)" value={evalData.costImpact} onChange={e => setEvalData({...evalData, costImpact: e.target.value})} style={{ fontSize: 12 }} />
                         <input className="p-inp" placeholder="Timeline Impact (e.g. +2 days)" value={evalData.timelineImpact} onChange={e => setEvalData({...evalData, timelineImpact: e.target.value})} style={{ fontSize: 12 }} />
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                         <button onClick={() => handleEvaluate(r.id)} className="p-btn-dark" style={{ flex: 1, fontSize: 11, padding: '8px' }}>Send Evaluation</button>
                         <button onClick={() => setEvaluating(null)} className="p-btn-light" style={{ flex: 1, fontSize: 11, padding: '8px' }}>Cancel</button>
                      </div>
                   </div>
                 )}
                 {r.status === 'evaluated' && (
                   <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>Evaluated: {r.costImpact} | {r.timelineImpact}</div>
                 )}
              </div>
            ))}
            {myCRs.length === 0 && <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', fontStyle: 'italic' }}>No change requests to manage.</div>}
         </div>
      </div>
      <div className="p-card" style={{ padding: 24 }}>
         <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Post-Installation Audit</h3>
         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {deliverables.filter(d => d.status === 'signed').map(d => (
              <div key={d.id} style={{ padding: 16, border: '1px solid rgba(0,0,0,.05)', borderRadius: 12 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="lxf" style={{ fontSize: 14, fontWeight: 600 }}>{d.title}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                       {d.outcomeStatus === 'verified' ? (
                          <div style={{ fontSize: 11, color: '#16A34A', display: 'flex', alignItems: 'center', gap: 4 }}>
                             <Camera size={14} /> ID: {d.photoId} Verified
                          </div>
                       ) : (
                          <button onClick={() => setDeliverables(deliverables.map(x => x.id === d.id ? {...x, outcomeStatus: 'verified', photoId: 'P-' + Math.floor(Math.random()*1000)} : x))} className="p-btn-gold" style={{ fontSize: 11, padding: '4px 12px' }}>Verify Outcome</button>
                       )}
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
