import React from 'react';
import { PSBadge } from '../../components/Shared';

export default function AdminEmailCenter({ emails = [], brand }) {
  const ac = brand.color || '#C8A96E';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Email Center</h2>
      <div className="p-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['ID', 'Type', 'To/From', 'Subject', 'Status', 'Sent At'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
