import React, { useState } from 'react';
import { 
  Plus, MoreVertical, Clock, CheckCircle, 
  AlertCircle, ArrowRight, Maximize2, Layers,
  Activity, Hammer, FileText
} from 'lucide-react';
import { PAv, SBadge } from '../../components/Shared';

const STAGES = [
  { id: 'queue', label: 'In Queue', color: '#B5AFA9' },
  { id: 'cutting', label: 'Cutting & Sizing', color: '#2196F3' },
  { id: 'processing', label: 'Processing (Edges/Holes)', color: '#9C27B0' },
  { id: 'tempering', label: 'Tempering Furnace', color: '#FF9800' },
  { id: 'qc', label: 'Quality Control', color: '#16A34A' },
  { id: 'ready', label: 'Ready for Dispatch', color: '#1A1410' }
];

export default function FabricationKanban({ clients = [], brand, ...props }) {
  const ac = brand.color || '#C8A96E';
  
  // Mock data for fabrication jobs
  const [jobs, setJobs] = useState([
    { 
      id: 'JOB-101', 
      projectId: clients[0]?.id, 
      projectTitle: 'The Volta Suite',
      item: 'Structural Balustrades', 
      stage: 'cutting',
      priority: 'High',
      panels: [
        { id: 1, w: 1200, h: 900, t: '12mm', f: 'Clear Toughened', status: 'Cut' },
        { id: 2, w: 1200, h: 900, t: '12mm', f: 'Clear Toughened', status: 'Pending' }
      ]
    },
    { 
      id: 'JOB-102', 
      projectId: clients[0]?.id, 
      projectTitle: 'Airport Hills Kitchen',
      item: 'Backsplash - Bronze Mirror', 
      stage: 'queue',
      priority: 'Normal',
      panels: [
        { id: 3, w: 2400, h: 600, t: '6mm', f: 'Bronze Mirror', status: 'Pending' }
      ]
    }
  ]);

  const moveJob = (jobId, nextStage) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, stage: nextStage } : j));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!props.isSubView && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
             <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400 }}>Factory Floor</h2>
             <p className="lxf" style={{ color: '#B5AFA9', fontSize: 13 }}>Real-time fabrication queue and workshop throughput.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
             <div className="p-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Activity size={16} color={ac} />
                <span className="lxf" style={{ fontSize: 12, fontWeight: 700 }}>8 Active Jobs</span>
             </div>
             <button className="p-btn-dark lxf" style={{ padding: '10px 20px' }}><Plus size={16} /> New Job</button>
          </div>
        </div>
      )}

      <div className="lx-scroll" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 20, minHeight: 'calc(100vh - 250px)' }}>
        {STAGES.map(s => (
          <div key={s.id} style={{ minWidth: 300, flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 4px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                  <span className="lxfh" style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</span>
                  <span style={{ fontSize: 11, background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 10, color: '#B5AFA9' }}>{jobs.filter(j => j.stage === s.id).length}</span>
               </div>
               <button style={{ background: 'none', border: 'none', color: '#B5AFA9' }}><Plus size={14} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
               {jobs.filter(j => j.stage === s.id).map(j => (
                 <div key={j.id} className="p-card fade-in" style={{ padding: 16, cursor: 'grab', borderLeft: j.priority === 'High' ? `3px solid #ff4444` : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                       <span style={{ fontSize: 10, color: '#B5AFA9', fontWeight: 600 }}>{j.id} • {j.projectTitle}</span>
                       <button style={{ background: 'none', border: 'none', color: '#B5AFA9' }}><MoreVertical size={14} /></button>
                    </div>
                    <div className="lxf" style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{j.item}</div>
                    
                    {/* PANEL SPECS */}
                    <div style={{ background: '#F9F7F4', borderRadius: 8, padding: 10, marginBottom: 12 }}>
                       <div className="lxf" style={{ fontSize: 10, color: '#B5AFA9', textTransform: 'uppercase', marginBottom: 6 }}>Dimensions & Specs</div>
                       {j.panels.map(p => (
                         <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                            <span>{p.w}x{p.h}mm • {p.t}</span>
                            <span style={{ color: p.status === 'Cut' ? '#16A34A' : '#B5AFA9', fontWeight: 600 }}>{p.status}</span>
                         </div>
                       ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div style={{ display: 'flex' }}>
                          <PAv i="NB" s={24} c={ac} />
                       </div>
                       <div style={{ display: 'flex', gap: 4 }}>
                          {STAGES.indexOf(s) < STAGES.length - 1 && (
                            <button 
                              onClick={() => moveJob(j.id, STAGES[STAGES.indexOf(s) + 1].id)}
                              style={{ background: 'none', border: 'none', color: ac, cursor: 'pointer', padding: 4 }}
                            >
                              <ArrowRight size={16} />
                            </button>
                          )}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
