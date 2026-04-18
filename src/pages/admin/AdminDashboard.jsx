import React from 'react';
import { 
  DollarSign, Receipt, Clock, CheckCircle, Plus, Users, FileText, Truck, AlertTriangle, Target, Activity, Sparkles, TrendingUp
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { REV } from '../../data';

export default function AdminDashboard({ clients, invoices, proposals, brand, getSLA, stats, ...props }) {
  const ac = brand.color || '#C8A96E';
  const isMobile = window.innerWidth <= 768;
  
  const totalRev = (invoices || []).filter(i => i?.status === 'Paid').reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
  const pendingInvs = (invoices || []).filter(i => i?.status === 'Pending');
  const totalUnpaid = pendingInvs.reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
  const pendingApprovals = (props.approvals || []).filter(a => a.status === 'pending').length;
  const delayedProjects = (clients || []).filter(c => getSLA && c ? getSLA(c).delayed : false).length;

  const dashboardStats = [
    { label: 'Settled Revenue', value: `$${(totalRev / 1000).toFixed(1)}k`, target: 100, icon: <DollarSign size={22} />, sub: 'Validated liquidity', color: '#16A34A', trend: 18 },
    { label: 'Awaiting Capital', value: `$${(totalUnpaid / 1000).toFixed(1)}k`, target: 10, icon: <Receipt size={22} />, sub: `${pendingInvs.length} active invoices`, color: '#B45309', trend: 2 },
    { label: 'Risk Exposure', value: delayedProjects, target: 0, icon: <AlertTriangle size={22} />, sub: 'SLA priority alerts', color: '#EF4444', trend: -5 },
    { label: 'Client Approvals', value: pendingApprovals, target: 0, icon: <CheckCircle size={22} />, sub: 'Pending terminal sign-offs', color: ac, trend: 12 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 24 : 32 }}>
      
      {/* 1. OPERATIONS COMMAND CONTROL */}
      {!isMobile && (
        <div className="glass-matrix" style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1A1410', color: '#fff', borderRadius: 24, border: 'none' }}>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <div>
              <div className="lxf eyebrow" style={{ fontSize: 10, letterSpacing: '.2em', color: ac, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>Command System</div>
              <div className="lxfh" style={{ fontSize: 24, fontWeight: 300 }}>Operations Control</div>
            </div>
            <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                onClick={() => typeof props.setMod === 'function' && props.setMod('AddProject')} 
                className="p-btn-gold lxf" 
                style={{ padding: '12px 24px', borderRadius: 12, fontSize: 13, fontWeight: 700 }}
              >
                <Plus size={18} /> Deploy Project
              </button>
              <button 
                onClick={() => typeof props.setAI === 'function' && props.setAI()} 
                style={{ height: 48, width: 48, borderRadius: 12, border: `1.5px solid ${ac}`, background: 'none', color: ac, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Sparkles size={20} />
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 40 }}>
             <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800 }}>System Integrity</div>
                <div style={{ fontSize: 18, color: '#16A34A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}><TrendingUp size={16} /> 99.9%</div>
             </div>
             <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800 }}>Daily Throughput</div>
                <div style={{ fontSize: 18, color: '#fff', fontWeight: 400 }}>+4,280 sqm</div>
             </div>
          </div>
        </div>
      )}

      {/* 2. CORE METRICS OVERVIEW (Scrollable on Mobile) */}
      <div className={isMobile ? "mob-swipe" : "kpi-grid"}>
        {dashboardStats.map((s, i) => (
          <div key={i} className="p-card" style={{ padding: 24, background: '#fff', borderRadius: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, border: `1px solid ${s.color}20`, background: `${s.color}08`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                {s.icon}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 800, color: s.trend > 0 ? '#16A34A' : '#EF4444' }}>
                 {s.trend > 0 ? <TrendingUp size={14} /> : <AlertTriangle size={14} />} {Math.abs(s.trend)}%
              </div>
            </div>
            <div className="lxf eyebrow" style={{ fontSize: 9, color: '#B5AFA9', marginBottom: 4 }}>{s.label}</div>
            <div className="lxfh" style={{ fontSize: 32, fontWeight: 300, color: '#121212' }}>{s.value}</div>
            <p className="lxf" style={{ fontSize: 12, color: '#B5AFA9', marginTop: 12 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* 3. PERFORMANCE ARCHITECTURE */}
      <div className="hub-grid">
        {/* REVENUE MOMENTUM */}
        <div className="p-card" style={{ padding: 32, background: '#fff', borderRadius: 24 }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
              <div>
                <h3 className="lxfh" style={{ fontSize: 22 }}>Financial Velocity</h3>
                <p className="lxf" style={{ fontSize: 13, color: '#B5AFA9' }}>Trailing revenue against production targets.</p>
              </div>
              {!isMobile && <button className="p-btn-light" style={{ padding: '10px 20px', fontSize: 11, borderRadius: 10, border: '1px solid #F0EBE5' }}>Audit Statements</button>}
           </div>
           
            <div style={{ height: 320, width: '100%', minHeight: 320, background: 'var(--bg-alt)', borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
             <ResponsiveContainer width="100%" height={320} minHeight={320}>
               <AreaChart data={REV} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,.03)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: '#B5AFA9', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B5AFA9', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', background: '#1A1410', color: '#fff' }} 
                  itemStyle={{ fontSize: 12, fontWeight: 800, color: ac }}
                />
                <Area type="monotone" dataKey="v" stroke={ac} fill="url(#dashColor)" strokeWidth={3} />
                <defs>
                   <linearGradient id="dashColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ac} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={ac} stopOpacity={0}/>
                   </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* OPERATIONS FEED */}
        <div className="p-card" style={{ padding: 32, background: '#fff', borderRadius: 24 }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <h3 className="lxfh" style={{ fontSize: 20 }}>Live Throughput</h3>
              <div className="luxe-pulse" style={{ background: '#16A34A', width: 8, height: 8, borderRadius: '50%' }}></div>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(props.logs || []).slice(0, 5).map(l => (
                <div key={l.id} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px', borderRadius: 16, border: '1px solid #F9F7F4' }}>
                   <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Activity size={18} color={ac} />
                   </div>
                   <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 800 }}>{l.action}</div>
                      <div style={{ fontSize: 11, color: '#B5AFA9' }}>{l.project_title || 'System Core'} • {new Date(l.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                   </div>
                </div>
              ))}
              {(!props.logs || props.logs.length === 0) && (
                <div style={{ textAlign: 'center', padding: 40, border: '1px dashed #F0EBE5', borderRadius: 20, color: '#B5AFA9', fontSize: 13 }}>
                   No recent telemetry data available.
                </div>
              )}
           </div>
           
            <button 
              onClick={() => typeof props.setMod === 'function' && props.setMod('AuditLog')}
              style={{ width: '100%', marginTop: 24, padding: 14, borderRadius: 12, background: '#F9F7F4', border: '1px solid #F0EBE5', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
            >
              Full Operations Audit
            </button>
        </div>
      </div>
    </div>
  );
}

