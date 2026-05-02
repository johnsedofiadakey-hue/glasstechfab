import { Mail, Briefcase, User, MapPin, DollarSign, ShieldCheck, ChevronRight, X, Package, Search } from 'lucide-react';
import { PSBadge, Modal, FF as PFormField } from '../../components/Shared';

export default function AdminEmailCenter({ emails = [], projects = [], brand, ...props }) {
  const [convertTarget, setConvertTarget] = React.useState(null);
  const [conversionData, setConversionData] = React.useState({ title: '', site: '', budget: '', type: 'Commercial' });
  const ac = brand.color || '#C8A96E';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Email Center</h2>
      <div className="p-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['ID', 'Type', 'To/From', 'Subject', 'Status', 'Sent At', 'Actions'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {(emails || []).map(e => (
              <tr key={e.id} className="t-row" style={e.type === 'Marketplace Order' ? { background: 'rgba(200, 169, 110, 0.05)' } : {}}>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontFamily: 'monospace', color: ac, fontWeight: e.type === 'Marketplace Order' ? 800 : 400 }}>{e.id}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  {e.type === 'Marketplace Order' 
                    ? <span style={{ fontSize: 10, background: ac, color: '#fff', padding: '4px 8px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }}>Pre-order</span>
                    : <span className="lxf" style={{ fontSize: 12, color: '#888' }}>{e.type || 'Contact'}</span>
                  }
                </td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13 }}>{e.toName}</span></td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="lxf" style={{ fontSize: 13, fontWeight: e.type === 'Marketplace Order' ? 600 : 400, color: e.type === 'Marketplace Order' ? '#1A1410' : 'inherit' }}>{e.subject}</span>
                    {e.type === 'Marketplace Order' && (
                      <select 
                        value={e.status} 
                        onChange={(val) => props.updateEmailStatus(e.id, val.target.value)}
                        style={{ marginTop: 8, padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 11, background: '#fff' }}
                        className="lxf"
                      >
                        {['pending', 'Quote Provided', 'Payment Verified', 'In Production', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}><PSBadge s={e.status} /></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 12, color: '#B5AFA9' }}>{e.sentAt}</span></td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                   {e.type !== 'Marketplace Order' && e.status !== 'Converted to Project' && (
                      <button 
                         onClick={() => {
                            setConvertTarget(e);
                            setConversionData({...conversionData, title: `${e.fromName}'s New Project`});
                         }}
                         className="p-btn-gold" style={{ fontSize: 11, padding: '6px 12px' }}
                      >
                         Convert to Project
                      </button>
                   )}
                   {e.type === 'Marketplace Order' && e.status !== 'In Production' && e.status !== 'Shipped' && e.status !== 'Delivered' && (
                      <button 
                         onClick={() => {
                            const pId = prompt("Enter Target Project ID to track this item:");
                            if (pId && props.sendToProcurement) props.sendToProcurement(e, pId);
                         }}
                         className="p-btn-gold" style={{ fontSize: 11, padding: '6px 12px', background: '#1A1410' }}
                      >
                         Add to Procurement
                      </button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {convertTarget && (
        <Modal title="Industrial Lead Provisioning" onClose={() => setConvertTarget(null)}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                 <div style={{ background: '#F9F7F4', padding: 24, borderRadius: 20, border: '1px solid #E0DDD8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                       <div style={{ width: 44, height: 44, borderRadius: 12, background: '#1A1410', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20}/></div>
                       <div>
                          <div style={{ fontSize: 10, color: ac, fontWeight: 900, textTransform: 'uppercase' }}>Inquiry Lead</div>
                          <div style={{ fontSize: 18, fontWeight: 700 }}>{convertTarget.fromName}</div>
                       </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                       <div style={{ fontSize: 13, color: '#666' }}><Mail size={14} style={{ marginRight: 8 }}/> {convertTarget.fromEmail}</div>
                       <div style={{ fontSize: 13, color: '#666' }}><Package size={14} style={{ marginRight: 8 }}/> {convertTarget.subject}</div>
                    </div>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <PFormField label="Internal Project Title">
                       <input className="p-inp" value={conversionData.title} onChange={e => setConversionData({...conversionData, title: e.target.value})} />
                    </PFormField>
                    <PFormField label="Project Type">
                       <select className="p-inp" value={conversionData.type} onChange={e => setConversionData({...conversionData, type: e.target.value})}>
                          <option value="Commercial">Commercial Facade</option>
                          <option value="Residential">Residential Luxury</option>
                          <option value="Industrial">Industrial Warehousing</option>
                          <option value="Interior">Interior / Fit-out</option>
                       </select>
                    </PFormField>
                 </div>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <PFormField label="Site Location (City/Region)">
                       <input className="p-inp" placeholder="e.g. East Legon, Accra" value={conversionData.site} onChange={e => setConversionData({...conversionData, site: e.target.value})} />
                    </PFormField>
                    <PFormField label="Estimated Initial Budget">
                       <input className="p-inp" placeholder="e.g. $45,000" value={conversionData.budget} onChange={e => setConversionData({...conversionData, budget: e.target.value})} />
                    </PFormField>
                 </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                 <div className="p-card" style={{ padding: 24, background: '#1A1410', color: '#fff', borderRadius: 24 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, color: ac }}>AUTOMATION TRIGGER</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                       <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <ShieldCheck size={18} color="#16A34A" />
                          <div style={{ fontSize: 11, opacity: 0.7 }}>Secure B2B Client Portal will be provisioned instantly.</div>
                       </div>
                       <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <Mail size={18} color={ac} />
                          <div style={{ fontSize: 11, opacity: 0.7 }}>Onboarding email with login credentials will be dispatched.</div>
                       </div>
                       <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <Briefcase size={18} color={ac} />
                          <div style={{ fontSize: 11, opacity: 0.7 }}>Project folder & initial procurement pipeline created.</div>
                       </div>
                    </div>
                    <button 
                       onClick={async () => {
                          await props.convertInquiry(convertTarget, conversionData.title, conversionData);
                          setConvertTarget(null);
                       }}
                       className="p-btn-gold" style={{ width: '100%', marginTop: 24, padding: 14, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                    >
                       Initialize Ecosystem <ChevronRight size={18} />
                    </button>
                 </div>
              </div>
           </div>
        </Modal>
      )}
    </div>
  );
}
