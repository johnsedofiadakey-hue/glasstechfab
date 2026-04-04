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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* 1. OPERATIONS QUICK-ACCESS BRIDGE */}
      <div className="glass-matrix pulse-card" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div className="lxf" style={{ fontSize: 10, fontWeight: 800, color: ac, textTransform: 'uppercase', letterSpacing: '.15em' }}>Control Bridge</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => props.setMod && props.setMod('AddProject')} className="p-btn-dark lxf" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 11 }}><Plus size={14} /> Project</button>
            <button onClick={() => props.setMod && props.setMod('AddClient')} className="p-btn-dark lxf" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 11 }}><Users size={14} /> Client</button>
            <button onClick={() => props.setAI && props.setAI()} className="p-btn-gold lxf" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 11, background: ac }}><Sparkles size={14} /> Genesis AI</button>
          </div>
        </div>
        <div className="dt-flex" style={{ gap: 24 }}>
           <div style={{ textAlign: 'right' }}>
              <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Active Invoices</div>
              <div className="lxf" style={{ fontSize: 13, fontWeight: 700 }}>{pendingInvs.length} Pending</div>
           </div>
           <div style={{ textAlign: 'right' }}>
              <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', textTransform: 'uppercase' }}>Unpaid Volume</div>
              <div className="lxf" style={{ fontSize: 13, fontWeight: 700, color: totalUnpaid > 50000 ? '#ff4444' : 'inherit' }}>${(totalUnpaid/1000).toFixed(1)}k</div>
           </div>
        </div>
      </div>

      {/* 2. CORE METRICS MATRIX */}
      <div className="admin-matrix">
        {dashboardStats.map((s, i) => (
          <div key={i} className="glass-matrix" style={{ padding: 24, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ padding: 10, background: `${s.color}15`, borderRadius: 12, color: s.color }}>{s.icon}</div>
              <span style={{ fontSize: 11, fontWeight: 700, color: s.trend > 0 ? '#16A34A' : '#B5AFA9', background: s.trend > 0 ? 'rgba(22,163,74,0.1)' : 'rgba(0,0,0,0.04)', padding: '4px 8px', borderRadius: 100 }}>{s.trend > 0 ? `+${s.trend}%` : s.trend === 0 ? 'Stable' : `${s.trend}%`}</span>
            </div>
            <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>{s.label}</div>
            <div className="lxfh" style={{ fontSize: 26 }}>{s.value}</div>
            <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: 32 }}>
        {/* 3. REVENUE MOMENTUM MATRIX */}
        <div className="glass-matrix" style={{ padding: 32 }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <div>
                <h3 className="lxfh" style={{ fontSize: 20 }}>Revenue Momentum</h3>
                <p className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>Live financial throughput analysis.</p>
              </div>
              <button className="p-btn-light lxf" style={{ padding: '8px 16px', fontSize: 11, borderRadius: 10 }}>Export Analytics</button>
           </div>
           <div style={{ height: 260, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REV}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.04)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: '#B5AFA9', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B5AFA9', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }} 
                  itemStyle={{ fontSize: 12, fontWeight: 700 }}
                />
                <Area type="monotone" dataKey="v" stroke={ac} fill="url(#colorRev)" strokeWidth={3} />
                <defs>
                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ac} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={ac} stopOpacity={0}/>
                   </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. LIVE SYSTEM FEED */}
        <div className="glass-matrix" style={{ padding: 32, display: 'flex', flexDirection: 'column' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 className="lxfh" style={{ fontSize: 18 }}>System Activity</h3>
              <Activity size={16} color={ac} />
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
              {(props.logs || []).slice(0, 5).map(l => (
                <div key={l.id} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                   <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: l.type === 'Stage' ? ac : '#16A34A' }} />
                   </div>
                   <div style={{ flex: 1 }}>
                      <div className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#1A1410' }}>{l.action}</div>
                      <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9' }}>{l.project_title || 'General'} · {l.user_name}</div>
                   </div>
                </div>
              ))}
              {(!props.logs || props.logs.length === 0) && (
                <div className="lxf" style={{ color: '#B5AFA9', fontSize: 13, textAlign: 'center', padding: '40px 0', border: '1px dashed rgba(0,0,0,0.05)', borderRadius: 16 }}>No recent operations logged.</div>
              )}
           </div>
           <button className="lxf" style={{ background: 'none', border: 'none', color: ac, fontWeight: 700, fontSize: 12, marginTop: 24, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 6 }}>Full Activity Log <Target size={14} /></button>
        </div>
      </div>
    </div>
  );
}
