import React from 'react';
import { PSBadge } from '../../components/Shared';

export default function AdminEmailCenter({ emails = [], brand }) {
  const ac = brand.color || '#C8A96E';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Email Center</h2>
      <div className="p-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['ID', 'To', 'Subject', 'Status', 'Sent At'].map(h => <th key={h} className="t-head">{h}</th>)}</tr></thead>
          <tbody>
            {(emails || []).map(e => (
              <tr key={e.id} className="t-row">
                <td style={{ padding: '12px 16px' }}><span style={{ fontFamily: 'monospace', color: ac }}>{e.id}</span></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13 }}>{e.toName}</span></td>
                <td style={{ padding: '12px 16px' }}><span className="lxf" style={{ fontSize: 13 }}>{e.subject}</span></td>
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
