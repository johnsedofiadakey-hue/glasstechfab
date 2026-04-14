import React from 'react';
import { Download, DollarSign, Receipt, AlertTriangle, TrendingUp, TrendingDown, PieChart as PieIcon, Wallet } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Bar, ComposedChart, Legend
} from 'recharts';
import PulseTargetCard from '../../components/PulseTargetCard';
import { ANALYTICS_MONTHLY } from '../../data';

export default function AdminAnalytics({ clients = [], invoices = [], brand, getSLA, procurements = [], transactions = [], ...props }) {
  const ac = brand.color || '#C8A96E';
  
  const totalRev = (invoices || []).filter(i => i.status === 'Paid').reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
  const outstanding = (invoices || []).filter(i => i.status === 'Pending').reduce((a, i) => a + parseFloat(i.amount?.replace(/[$,]/g, '') || 0), 0);
  
  // Real Cash Flow from Verified Transactions
  const cashInHand = (transactions || []).reduce((a, t) => a + parseFloat(t.amount || 0), 0);

  const delayed = (clients || []).filter(c => {
    try { return getSLA && c ? getSLA(c).delayed : false; } catch(e) { return false; }
  }).length;

  const exportCSV = () => {
    const headers = ['Project', 'Budget', 'Spent', 'Profit', 'Margin %'];
    const rows = (clients || []).map(c => {
      const budget = parseFloat(c.budget?.replace(/[$,]/g, '') || 0);
      const spent = (procurements || []).filter(p => p.parentId === c.id).reduce((a, b) => a + (parseFloat(b.actualCost || b.estimatedCost) || 0), 0);
      const profit = budget - spent;
      const margin = budget > 0 ? (profit / budget) * 100 : 0;
      return [c.project || c.title, budget, spent, profit, margin.toFixed(1) + '%'];
    });
    const content = [headers, ...rows].map(r => r.join(',')).join('\n');
    console.log('Profitability Report:\n', content);
    alert('Report exported to console.');
  };

  const perfData = [
    { name: 'Completed', value: 12, fill: '#16A34A' },
    { name: 'On Track', value: 8, fill: ac },
    { name: 'Delayed', value: delayed || 0, fill: '#ff4444' }
  ];

  const profitabilityData = (clients || []).map(c => {
    const budget = parseFloat(c.budget?.replace(/[$,]/g, '') || 0);
    const spent = (procurements || []).filter(p => p.parentId === c.id).reduce((a, b) => a + (parseFloat(b.actualCost || b.estimatedCost) || 0), 0);
    const profit = budget - spent;
    const margin = budget > 0 ? (profit / budget) * 100 : 0;
    return { name: c.project || c.title, budget, spent, profit, margin, id: c.id };
  }).filter(p => p.budget > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400, color: '#1A1410' }}>Business Intelligence</h2>
        <button onClick={exportCSV} className="p-btn-dark lxf" style={{ padding: '10px 20px', fontSize: 13, gap: 8, display: 'flex', alignItems: 'center' }}><Download size={16} /> Export P&L Report</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        <PulseTargetCard 
          label="REAL CASH-IN-HAND" 
          value={`$${(cashInHand / 1000).toFixed(1)}k`} 
          target={200} 
          icon={<Wallet size={20} />} 
          color="#16A34A" 
          trend={15}
          sub="Verified audit trail"
        />
        <PulseTargetCard 
          label="TOTAL REVENUE" 
          value={`$${(totalRev / 1000).toFixed(1)}k`} 
          target={500} 
          icon={<DollarSign size={20} />} 
          color={ac} 
          trend={22}
          sub="Booked billables"
        />
        <PulseTargetCard 
          label="OUTSTANDING DEBT" 
          value={`$${(outstanding / 1000).toFixed(1)}k`} 
          target={50} 
          icon={<Receipt size={20} />} 
          color="#ff4444" 
          trend={-12}
          sub="Invoice follow-up"
        />
        <PulseTargetCard 
          label="AVG PROJECT MARGIN" 
          value={`${Math.round(profitabilityData.reduce((a,b) => a + b.margin, 0) / (profitabilityData.length || 1))}%`} 
          target={30} 
          icon={<TrendingUp size={20} />} 
          color="#1A1410" 
          trend={3}
          sub="Target: 30%+"
        />
      </div>

      {/* PROFITABILITY ANALYSIS TABLE */}
      <div className="p-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
           <h3 className="lxfh" style={{ fontSize: 18 }}>Project Profitability Engine</h3>
           <div style={{ display: 'flex', gap: 12, fontSize: 11, fontWeight: 700 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#16A34A' }}><TrendingUp size={12} /> High Performance</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#ff4444' }}><AlertTriangle size={12} /> Low Margin (&lt;30%)</span>
           </div>
        </div>
        <div className="p-scroll" style={{ overflowX: 'auto' }}>
           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                 <tr style={{ borderBottom: '2px solid #F0EBE5' }}>
                    {['Project Name', 'Total Budget', 'Direct Costs', 'Net Profit', 'GM %'].map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 10px', fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase' }}>{h}</th>)}
                 </tr>
              </thead>
              <tbody>
                 {profitabilityData.map(p => (
                   <tr key={p.id} style={{ borderBottom: '1px solid #F9F7F4' }}>
                      <td style={{ padding: '16px 10px', fontSize: 14, fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: '16px 10px', fontSize: 14 }}>${p.budget.toLocaleString()}</td>
                      <td style={{ padding: '16px 10px', fontSize: 14 }}>${p.spent.toLocaleString()}</td>
                      <td style={{ padding: '16px 10px', fontSize: 14, fontWeight: 700, color: p.profit > 0 ? '#16A34A' : '#ff4444' }}>${p.profit.toLocaleString()}</td>
                      <td style={{ padding: '16px 10px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 60, height: 6, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
                               <div style={{ width: `${Math.min(p.margin, 100)}%`, height: '100%', background: p.margin < 30 ? '#ff4444' : '#16A34A' }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 800, color: p.margin < 30 ? '#ff4444' : '#16A34A' }}>{p.margin.toFixed(0)}%</span>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        <div className="p-card" style={{ padding: 24 }}>
          <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 20 }}>Revenue Growth (Projected)</h3>
          <div style={{ height: 300, width: '100%', minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%" debounce={100}>
              <ComposedChart data={ANALYTICS_MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#B5AFA9' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#B5AFA9' }} />
                <Tooltip />
                <Area type="monotone" dataKey="rev" fill={`${ac}15`} stroke={ac} strokeWidth={2} />
                <Bar dataKey="proj" barSize={20} fill="#16A34A30" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
             <h3 className="lxfh" style={{ fontSize: 18 }}>Portfolio Health</h3>
             <PieIcon size={18} color={ac} />
          </div>
          <div style={{ height: 260, width: '100%', minHeight: 260 }}>
            <ResponsiveContainer width="100%" height="100%" debounce={100}>
              <PieChart>
                <Pie data={perfData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {perfData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
