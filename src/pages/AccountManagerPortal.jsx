import React, { useState } from 'react';
import { 
  LogOut, Check, Calendar
} from 'lucide-react';
import { 
  PAv, PSBadge
} from '../components/Shared';
import { 
  TEAM_MEMBERS 
} from '../data';

export default function AccountManagerPortal({ user, brand, clients, onLogout }) {
  const ac = brand.color || '#C8A96E';
  const [tab, setTab] = useState('projects');
  const member = TEAM_MEMBERS.find(m => m.email === user.email) || TEAM_MEMBERS[0];
  const myClients = clients.filter(c => c.status === 'Active');

  return (
    <div className="lxf lx-scroll" style={{ minHeight: '100vh', background: '#F9F7F4', '--ac': ac }}>
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 28, objectFit: 'contain' }} /> : <div className="lxfh" style={{ fontSize: 22, color: '#1A1410', fontWeight: 400 }}>{brand.name}</div>}
          <div style={{ height: 18, width: 1, background: 'rgba(0,0,0,.1)' }} />
          <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', letterSpacing: '.16em', textTransform: 'uppercase' }}>Design Team</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <PAv i={member.av} s={32} c={ac} />
          <div><div className="lxf" style={{ fontSize: 13, color: '#1A1410', fontWeight: 500 }}>{member.name}</div><div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{member.role}</div></div>
          <button onClick={onLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0B9B0', padding: 4, display: 'flex', marginLeft: 8 }}><LogOut size={16} /></button>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 32px', display: 'flex', gap: 0 }}>
        {[['projects', 'Active Projects'], ['tasks', 'My Tasks'], ['schedule', 'Schedule'], ['profile', 'My Profile']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`p-tab lxf${tab === id ? ' active' : ''}`}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 32px' }}>
        {tab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h1 className="lxfh" style={{ fontSize: 44, fontWeight: 300 }}>Active Projects</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {myClients.map(c => (
                <div key={c.id} className="p-card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                    <PAv i={c.av} s={42} c={ac} />
                    <PSBadge s={c.status} />
                  </div>
                  <div className="lxfh" style={{ fontSize: 20, fontWeight: 400, color: '#1A1410', marginBottom: 4 }}>{c.name}</div>
                  <div className="lxf" style={{ fontSize: 12, color: '#7A6E62', marginBottom: 14 }}>{c.project}</div>
                  <div className="prog" style={{ marginBottom: 8 }}><div className="prog-f" style={{ width: `${c.progress}%`, background: ac }} /></div>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{c.progress}% complete</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {tab === 'tasks' && (
           <div style={{ padding: 40, textAlign: 'center', color: '#B5AFA9' }}>Task management coming soon.</div>
        )}
      </div>
    </div>
  );
}
