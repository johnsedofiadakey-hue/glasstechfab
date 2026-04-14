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
      {/* 1. OPERATIONS COMMAND BAR */}
      <div className="glass-matrix pulse-card dashboard-hero" style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1A1410', color: '#fff' }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <div className="lxf" style={{ fontSize: 10, fontWeight: 800, color: ac, textTransform: 'uppercase', letterSpacing: '.2em' }}>Command Center</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => props.setMod && props.setMod('AddProject')} className="p-btn-gold lxf" style={{ padding: '10px 20px', borderRadius: 10, fontSize: 12 }}><Plus size={16} /> New Project</button>
            <button onClick={() => props.setMod && props.setMod('AddClient')} className="p-btn-light lxf dt-only" style={{ padding: '10px 20px', borderRadius: 10, fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}><Users size={16} /> Register Client</button>
            <button onClick={() => props.setAI && props.setAI()} className="p-btn-dark lxf" style={{ padding: '10px 20px', borderRadius: 10, fontSize: 12, background: 'transparent', border: `1px solid ${ac}`, color: ac }}><Sparkles size={16} /> AI Assistant</button>
          </div>
        </div>
        <div className="dt-flex" style={{ gap: 32 }}>
           <div style={{ textAlign: 'right' }}>
              <div className="lxf" style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Active Pipelines</div>
              <div className="lxfh" style={{ fontSize: 18 }}>{pendingInvs.length} Pending</div>
           </div>
           <div style={{ textAlign: 'right' }}>
              <div className="lxf" style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Unpaid Capital</div>
              <div className="lxfh" style={{ fontSize: 18, color: totalUnpaid > 50000 ? '#ff4444' : ac }}>${(totalUnpaid/1000).toFixed(1)}k</div>
           </div>
        </div>
      </div>

      {/* 2. CORE METRICS ENGINE */}
      <div className="kpi-grid">
        {dashboardStats.map((s, i) => (
          <div key={i} className="p-card kpi-card" style={{ padding: 24, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ padding: 10, background: `${s.color}10`, borderRadius: 12, color: s.color }}>{s.icon}</div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: s.trend > 0 ? '#16A34A' : '#B5AFA9', background: s.trend > 0 ? 'rgba(22,163,74,0.08)' : 'rgba(0,0,0,0.04)', padding: '4px 10px', borderRadius: 100 }}>{s.trend > 0 ? `+${s.trend}%` : s.trend === 0 ? 'Stable' : `${s.trend}%`}</span>
                <div style={{ fontSize: 9, color: '#B5AFA9', marginTop: 4, textTransform: 'uppercase' }}>v. Last Month</div>
              </div>
            </div>
            <div className="lxf kpi-label" style={{ marginBottom: 4 }}>{s.label}</div>
            <div className="lxfh kpi-value" style={{ fontSize: 32, lineHeight: 1 }}>{s.value}</div>
            <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
               <Activity size={10} /> {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* 3. PERFORMANCE SECTIONS */}
      <div className="hub-grid">
        {/* REVENUE MOMENTUM */}
        <div className="p-card" style={{ padding: 32, background: '#fff' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
              <div>
                <h3 className="lxfh" style={{ fontSize: 22, letterSpacing: '-0.01em' }}>Financial Velocity</h3>
                <p className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>Revenue throughput against production targets.</p>
              </div>
              <button className="p-btn-light lxf dt-only" style={{ padding: '10px 20px', fontSize: 11, borderRadius: 10, border: '1px solid var(--border)' }}>View Reports</button>
           </div>
           
           <div style={{ height: 320, width: '100%', marginLeft: -20 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REV}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.03)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: '#B5AFA9', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B5AFA9', fontSize: 10, fontFamily: 'Inter' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', background: '#1A1410', color: '#fff', padding: '12px 16px' }} 
                  itemStyle={{ fontSize: 12, fontWeight: 700, color: ac }}
                  cursor={{ stroke: ac, strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="v" stroke={ac} fill="url(#colorRevDashboard)" strokeWidth={3} />
                <defs>
                   <linearGradient id="colorRevDashboard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ac} stopOpacity={0.15}/>
                      <stop offset="95%" stopColor={ac} stopOpacity={0}/>
                   </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* OPERATION FEED */}
        <div className="p-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', background: '#fff' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <h3 className="lxfh" style={{ fontSize: 20 }}>Operations Feed</h3>
              <div className="luxe-pulse" style={{ background: `${ac}15`, color: ac, padding: '4px 12px', borderRadius: 100, fontSize: 9, fontWeight: 800, letterSpacing: '0.1em' }}>LIVE</div>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
              {(props.logs || []).slice(0, 6).map(l => (
                <div key={l.id} className="feed-item" style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px', borderRadius: 14, transition: 'all 0.3s' }}>
                   <div style={{ width: 44, height: 44, borderRadius: 14, background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
                      <Activity size={18} color={l.type === 'Stage' ? ac : '#B5AFA9'} />
                   </div>
                   <div style={{ flex: 1 }}>
                      <div className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#1A1410', marginBottom: 2 }}>{l.action}</div>
                      <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9', display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span>{l.project_title || 'General'}</span>
                        <span style={{ opacity: 0.3 }}>|</span>
                        <span>{l.user_name}</span>
                      </div>
                   </div>
                </div>
              ))}
              {(!props.logs || props.logs.length === 0) && (
                <div className="lxf" style={{ color: '#B5AFA9', fontSize: 13, textAlign: 'center', padding: '60px 0', border: '1px dashed var(--border)', borderRadius: 20 }}>Awaiting factory throughput...</div>
              )}
           </div>
           
           <button className="lxf p-btn-light" style={{ background: '#F9F7F4', border: '1px solid var(--border)', color: '#1A1410', fontWeight: 600, fontSize: 11, padding: '14px', borderRadius: 12, marginTop: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', transition: 'all 0.3s' }}>
             Operations Audit <Target size={14} />
           </button>
        </div>
      </div>
    </div>
  );
}
