import React, { useState } from 'react';
import { 
  LogOut, Check, Calendar, Clock, User, 
  Briefcase, Activity, Mail, Phone, MapPin
} from 'lucide-react';
import { 
  PAv, PSBadge, NotificationBell
} from '../components/Shared';

export default function AccountManagerPortal({ user, brand, onLogout, ...props }) {
  const ac = brand.color || '#C8A96E';
  const { clients, bookings, tasks, updateTask } = props;
  const [tab, setTab] = useState('tasks');
  const [fStage, setFStage] = useState('all');
  const [fStatus, setFStatus] = useState('all');
  
  const member = user || {};
  const myClients = (clients || []).filter(c => c?.managerId === user?.id);
  const myBookings = (bookings || []).filter(b => b?.pm_id === user?.id || (b?.date && b.date.startsWith('2026-03')));
  const myTasks = (tasks || []).filter(t => {
    const isMe = (t?.assignedTo || t?.assigned_to) === user?.id;
    const isStage = fStage === 'all' || String(t?.stage) === fStage;
    const isStatus = fStatus === 'all' || t?.status === fStatus;
    return isMe && isStage && isStatus;
  });

  const renderContent = () => {
    switch (tab) {
      case 'projects':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h1 className="lxfh" style={{ fontSize: 44, fontWeight: 300 }}>Active Installations</h1>
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
        );
      case 'tasks':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
              <h1 className="lxfh" style={{ fontSize: 44, fontWeight: 300 }}>My Tasks</h1>
              
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                 <select className="p-inp" style={{ fontSize: 11, padding: '6px 12px' }} value={fStage} onChange={e => setFStage(e.target.value)}>
                    <option value="all">All Stages</option>
                    {[1,2,3,4,5,6,7].map(s => <option key={s} value={s}>Stage {s}</option>)}
                 </select>
                 <select className="p-inp" style={{ fontSize: 11, padding: '6px 12px' }} value={fStatus} onChange={e => setFStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                 </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {myTasks.length === 0 && <div className="p-card lxf" style={{ padding: 40, textAlign: 'center', gridColumn: 'span 2', color: '#B5AFA9' }}>No matching tasks found.</div>}
              {myTasks.map(t => (
                <div key={t.id} className="p-card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span className="eyebrow lxf" style={{ fontSize: 9 }}>Stage {t.stage} · {t.project_title}</span>
                    <PSBadge s={t.status} />
                  </div>
                  <h3 className="lxfh" style={{ fontSize: 18, fontWeight: 500, marginBottom: 6 }}>{t.title}</h3>
                  <p className="lxf" style={{ fontSize: 13, color: '#7A6E62', marginBottom: 16 }}>{t.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> Due: {t.dueDate || t.due_date}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {t.status === 'pending' && <button onClick={() => updateTask(t.id, { status: 'in_progress' }, t.parentId)} className="lxf" style={{ background: 'none', border: 'none', color: ac, fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>Start Task</button>}
                      {t.status === 'in_progress' && <button onClick={() => updateTask(t.id, { status: 'completed' }, t.parentId)} className="lxf" style={{ background: 'none', border: 'none', color: '#16A34A', fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>Complete</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
            <div className="p-card" style={{ padding: 24, textAlign: 'center' }}>
              <PAv i={member.av} s={120} c={ac} />
              <h2 className="lxfh" style={{ fontSize: 24, marginTop: 16 }}>{member.name}</h2>
              <div className="lxf" style={{ fontSize: 14, color: ac, fontWeight: 600 }}>{member.role}</div>
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 13, color: '#7A6E62', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}><Mail size={14} /> {member.email}</div>
              </div>
            </div>
            <div className="p-card" style={{ padding: 24 }}>
              <h3 className="eyebrow lxf" style={{ marginBottom: 16 }}>Bio</h3>
              <p className="lxf" style={{ fontSize: 14, color: '#7A6E62', lineHeight: 1.8 }}>{member.bio || 'Premium designer focused on creating exceptional spaces.'}</p>
            </div>
          </div>
        );
      default:
        return <div style={{ padding: 40, textAlign: 'center', color: '#B5AFA9' }}>Coming soon.</div>;
    }
  };

  return (
    <div className="lxf lx-scroll" style={{ minHeight: '100vh', background: '#F9F7F4', '--ac': ac }}>
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 28 }} /> : <div className="lxfh" style={{ fontSize: 22 }}>{brand.name}</div>}
          <div style={{ height: 18, width: 1, background: 'rgba(0,0,0,.1)' }} />
          <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', letterSpacing: '.16em', textTransform: 'uppercase' }}>Operations Team Portal</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <NotificationBell notifications={props.userNotifications || props.notifications} onMarkRead={props.markNotificationRead} />
          <PAv i={member?.av} s={32} c={ac} />
          <div><div className="lxf" style={{ fontSize: 13, fontWeight: 500 }}>{member?.name || 'User'}</div><div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{member?.role}</div></div>
          <button onClick={onLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B5AFA9', marginLeft: 16 }}><LogOut size={16} /></button>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 32px', display: 'flex', gap: 0 }}>
        {[['tasks', 'My Tasks'], ['projects', 'Projects'], ['schedule', 'Schedule'], ['profile', 'Profile']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`p-tab lxf${tab === id ? ' active' : ''}`}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 32px' }}>
        {renderContent()}
      </div>
    </div>
  );
}
