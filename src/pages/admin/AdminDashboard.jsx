import React from 'react';
import { 
  DollarSign, Receipt, Clock, CheckCircle, Plus, Users, FileText, Truck, AlertTriangle, Target, Activity, Sparkles
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import PulseTargetCard from '../../components/PulseTargetCard';
import { REV } from '../../data';

export default function AdminDashboard({ clients, invoices, proposals, brand, getSLA, stats, ...props }) {
  const ac = brand.color || '#C8A96E';
  
  const totalRev = (invoices || []).filter(i => i?.status === 'Paid').reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
  const pendingInvs = (invoices || []).filter(i => i?.status === 'Pending');
  const totalUnpaid = pendingInvs.reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
  const pendingApprovals = (props.approvals || []).filter(a => a.status === 'pending').length;
  const delayedProjects = (clients || []).filter(c => getSLA && c ? getSLA(c).delayed : false).length;

  const dashboardStats = [
    { label: 'Revenue (Paid)', value: `$${(totalRev / 1000).toFixed(1)}k`, target: 100, icon: <DollarSign size={20} />, sub: 'Total settled funds', color: '#16A34A', trend: 18 },
    { label: 'Unpaid Balance', value: `$${(totalUnpaid / 1000).toFixed(1)}k`, target: 10, icon: <Receipt size={20} />, sub: `${pendingInvs.length} invoices pending`, color: '#B45309', trend: 2 },
    { label: 'Delayed Projects', value: delayedProjects, target: 0, icon: <Clock size={20} />, sub: 'High risk alerts', color: '#ff4444', trend: -5 },
    { label: 'Pending Apps', value: pendingApprovals, target: 0, icon: <CheckCircle size={20} />, sub: 'Awaiting client sign-off', color: ac, trend: 12 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* 1. STICKY QUICK ACTION BAR */}
      <div className="p-card p-sticky-nav" style={{ padding: '12px 24px', display: 'flex', gap: 12, alignItems: 'center', borderRadius: 0, margin: '0 -32px', borderLeft: 'none', borderRight: 'none' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#B5AFA9', textTransform: 'uppercase', letterSpacing: '.1em', marginRight: 12 }}>Command Center</div>
        <button onClick={() => props.setMod('AddProject')} className="p-btn-dark lxf" style={{ padding: '8px 16px', borderRadius: 10, fontSize: 12, minHeight: 40, cursor: 'pointer' }}><Plus size={14} /> Project</button>
        <button onClick={() => props.setMod('AddClient')} className="p-btn-dark lxf" style={{ padding: '8px 16px', borderRadius: 10, fontSize: 12, minHeight: 40, cursor: 'pointer' }}><Users size={14} /> Client</button>
        <button onClick={() => props.setAI()} className="p-btn-gold lxf" style={{ padding: '8px 16px', borderRadius: 10, fontSize: 12, minHeight: 40, cursor: 'pointer', background: ac, color: '#fff', border: 'none' }}><Sparkles size={14} /> AI Genesis</button>
        <button onClick={() => props.setMod('SendInvoice')} className="p-btn-light lxf" style={{ padding: '8px 16px', borderRadius: 10, fontSize: 12, minHeight: 40, cursor: 'pointer' }}><FileText size={14} /> Invoice</button>
        <button onClick={() => props.setMod('TrackShipment')} className="p-btn-light lxf" style={{ padding: '8px 16px', borderRadius: 10, fontSize: 12, minHeight: 40, cursor: 'pointer' }}><Truck size={14} /> Shipment</button>
      </div>

      {/* 2. OPERATIONAL ALERTS (CRITICAL) */}
      {(totalUnpaid > 50000 || delayedProjects > 0) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="eyebrow" style={{ color: '#DC2626' }}>Operational Alerts</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {totalUnpaid > 50000 && (
              <div className="p-card" style={{ padding: 16, borderLeft: '4px solid #DC2626', background: 'rgba(220,38,38,0.02)', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(220,38,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}><AlertTriangle size={20} /></div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>High Unpaid Balance</div>
                  <div style={{ fontSize: 12, color: '#DC2626' }}>${totalUnpaid.toLocaleString()} across {pendingInvs.length} invoices. Action required.</div>
                </div>
              </div>
            )}
            {delayedProjects > 0 && (
              <div className="p-card" style={{ padding: 16, borderLeft: '4px solid #B45309', background: 'rgba(180,83,9,0.02)', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(180,83,9,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B45309' }}><Clock size={20} /></div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Delayed Projects Detected</div>
                  <div style={{ fontSize: 12, color: '#B45309' }}>{delayedProjects} sites are past their target milestones.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. REFACTORED METRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {dashboardStats.map(s => (
          <PulseTargetCard 
            key={s.label}
            label={s.label}
            value={s.value}
            target={s.target}
            icon={s.icon}
            sub={s.sub}
            color={s.color}
            trend={s.trend}
          />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: 20 }}>
        <div className="p-card" style={{ padding: 24, minHeight: 340 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
             <div className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#1A1410' }}>Revenue Momentum</div>
             <div style={{ fontSize: 11, color: '#16A34A', fontWeight: 700 }}>↑ +18% vs Last Month</div>
          </div>
          <div style={{ height: 240, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REV}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.06)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: '#B5AFA9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B5AFA9', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} 
                  itemStyle={{ fontSize: 12, fontWeight: 700 }}
                />
                <Area type="monotone" dataKey="v" stroke={ac} fill="url(#colorRev)" strokeWidth={3} />
                <defs>
                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ac} stopOpacity={0.15}/>
                      <stop offset="95%" stopColor={ac} stopOpacity={0}/>
                   </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 className="lxfh" style={{ fontSize: 18 }}>Activity Stream</h3>
            <Activity size={16} color="#B5AFA9" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(props.logs || []).slice(0, 6).map(l => (
              <div key={l.id} style={{ display: 'flex', gap: 14, alignItems: 'start' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                   {l.type === 'Stage' ? <Target size={14} color={ac} /> : <FileText size={14} color="#7E22CE" />}
                </div>
                <div>
                  <div className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#1A1410' }}>{l.action}</div>
                  <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', marginTop: 2 }}>{l.created_at ? new Date(l.created_at).toLocaleDateString() : 'Just now'} · {l.user_name}</div>
                </div>
              </div>
            ))}
            {(!props.logs || props.logs.length === 0) && <div className="lxf" style={{ color: '#B5AFA9', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>Listening for operational updates...</div>}
          </div>
          {props.logs?.length > 0 && (
             <button className="lxf" style={{ width: '100%', marginTop: 12, padding: '10px', background: '#F9F7F4', border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 600, color: '#7A6E62', cursor: 'pointer' }}>View Full Audit Trail</button>
          )}
        </div>
      </div>
    </div>
  );
}
