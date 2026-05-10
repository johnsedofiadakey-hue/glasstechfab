import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function AdminAnalytics({ invoices = [], clients = [] }) {
  // Mock Data for Revenue (if real data is empty)
  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
  ];

  // Mock Data for Projects by Stage
  const stageData = [
    { name: 'Sourcing', value: 5 },
    { name: 'Production', value: 8 },
    { name: 'Shipping', value: 3 },
    { name: 'Installation', value: 6 },
  ];

  const COLORS = ['#C8A96E', '#1A1410', '#B5AFA9', '#7A6E62'];

  return (
    <div className="fade-in" style={{ padding: '20px 0' }}>
      <h2 className="lxfh" style={{ fontSize: 32, marginBottom: 32 }}>Business Analytics</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
        {/* REVENUE CHART */}
        <div className="p-card" style={{ padding: 24, border: '1px solid #F0EBE5', background: '#fff' }}>
          <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 16 }}>Revenue Growth</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8A96E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#C8A96E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE5" />
                <XAxis dataKey="month" stroke="#B5AFA9" fontSize={12} />
                <YAxis stroke="#B5AFA9" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#C8A96E" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PROJECTS BY STAGE */}
        <div className="p-card" style={{ padding: 24, border: '1px solid #F0EBE5', background: '#fff' }}>
          <h3 className="lxfh" style={{ fontSize: 18, marginBottom: 16 }}>Projects by Stage</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={stageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ADDITIONAL METRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <div className="p-card" style={{ padding: 20, border: '1px solid #F0EBE5', textAlign: 'center', background: '#fff' }}>
          <div style={{ fontSize: 12, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 8 }}>Total Projects</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1A1410' }}>22</div>
        </div>
        <div className="p-card" style={{ padding: 20, border: '1px solid #F0EBE5', textAlign: 'center', background: '#fff' }}>
          <div style={{ fontSize: 12, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 8 }}>Active Clients</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1A1410' }}>14</div>
        </div>
        <div className="p-card" style={{ padding: 20, border: '1px solid #F0EBE5', textAlign: 'center', background: '#1A1410', color: '#fff' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 8 }}>Conversion Rate</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#C8A96E' }}>68%</div>
        </div>
      </div>
    </div>
  );
}
