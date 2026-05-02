import React, { useState, useEffect } from 'react';
import { 
  LogOut, CheckCircle, Download, CreditCard, Send, Mic,
  Calendar, FolderOpen, Check, Lock, X, Printer, Camera,
  Eye, MessageSquare, Image, ThumbsUp, ThumbsDown, Plus, 
  AlertTriangle, FileText, Target, Moon, Sun, ShoppingCart, 
  Truck, Sparkles, Globe, CheckSquare, ShieldCheck, User,
  Map, DollarSign, PackageCheck, Package, Ship, Home, Factory,
  ChevronRight, AlertCircle
} from 'lucide-react';
import { 
  Av, SBadge, Modal, FF as PFormField, PAv, PSBadge,
  Modal as PModal, Spinner, NotificationBell
} from '../components/Shared';

import BeforeAfterSlider from '../components/BeforeAfterSlider';

const LIFE_RIBBON = [
  { id: 'factory', label: 'Factory', icon: <Factory size={24} />, stages: [1,2,3,4,5,6], color: '#3B82F6', text: 'Items are being sourced and manufactured in China.' },
  { id: 'logistics', label: 'Logistics', icon: <Ship size={24} />, stages: [7,8,9], color: '#8B5CF6', text: 'Your container is moving across the Atlantic.' },
  { id: 'site', label: 'On Site', icon: <Home size={24} />, stages: [10,11,12], color: '#F59E0B', text: 'Installation and finishing are underway at your site.' }
];

export default function ClientPortal({ client, brand, onLogout, calculateProjectPulse, updateClientProfile, ...props }) {
  const [tab, setTab] = useState('feed'); // 'feed' | 'finance' | 'help' | 'docs' | 'evolution'
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const ac = brand.color || '#C8A96E';
  const { proposals, invoices, workOrders, containers, lang, t } = props;
  
  const myProjects = (props.clients || []).filter(c => c.clientIds?.includes(client.id) || c.id === client.id);
  const activeProject = myProjects.find(p => p.id === selectedProjectId) || myProjects[0];
  
  useEffect(() => {
    if (myProjects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(myProjects[0].id);
    }
  }, [myProjects, selectedProjectId]);

  const isLocked = props.isPortalLocked();
  const currentStage = activeProject?.stage || 1;
  const activeRibbon = LIFE_RIBBON.find(r => r.stages.includes(currentStage)) || LIFE_RIBBON[0];
  
  const myMedia = (props.media || []).filter(m => m.parentId === selectedProjectId).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  const myInvs = (invoices || []).filter(i => i?.clientId === client.id || i?.clientEmail === client.email);
  const totalPaid = myInvs.filter(i => i.status === 'Paid').reduce((acc, i) => acc + parseFloat(String(i.amount).replace(/[^0-9.]/g, '') || 0), 0);
  const totalOwed = myInvs.filter(i => i.status === 'Pending').reduce((acc, i) => acc + parseFloat(String(i.amount).replace(/[^0-9.]/g, '') || 0), 0);

  if (isLocked && tab !== 'finance') setTab('finance');

  return (
    <div style={{ minHeight: '100vh', background: '#F9F7F4', color: '#1A1410', paddingBottom: 100 }}>
       {/* 1. VISUAL LIFE-RIBBON */}
       <div style={{ background: '#fff', padding: '32px 0', borderBottom: '1px solid #F0EBE5', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
             <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 24 }}>
                {LIFE_RIBBON.map(r => {
                   const isPast = r.stages[r.stages.length-1] < currentStage;
                   const isCurrent = r.stages.includes(currentStage);
                   return (
                     <div key={r.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: isCurrent || isPast ? 1 : 0.2 }}>
                        <div style={{ 
                           width: 64, height: 64, borderRadius: 24, background: isCurrent ? r.color : isPast ? '#1A1410' : '#F0EBE5', 
                           color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                           boxShadow: isCurrent ? `0 0 30px ${r.color}66` : 'none',
                           transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}>
                           {r.icon}
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, color: isCurrent ? r.color : '#1A1410' }}>{r.label}</span>
                     </div>
                   );
                })}
             </div>
             <div className="fade-in" key={activeRibbon.id} style={{ fontSize: 13, fontWeight: 500, color: '#625C54', padding: '0 40px' }}>
                {activeRibbon.text}
             </div>
          </div>
       </div>

       {/* 2. DYNAMIC CONTENT VIEW */}
       <div style={{ maxWidth: 500, margin: '40px auto', padding: '0 20px' }}>
          
          {/* PAYMENT SHIELD OVERLAY (If Locked) */}
          {isLocked && (
             <div style={{ background: '#1A1410', color: '#fff', padding: 24, borderRadius: 24, marginBottom: 32, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
                   <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AlertCircle size={24} />
                   </div>
                   <div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>Financial Action Required</div>
                      <div style={{ fontSize: 12, opacity: 0.7 }}>A payment is overdue. Access to production updates is currently restricted.</div>
                   </div>
                </div>
                <button onClick={() => setTab('finance')} className="p-btn-gold" style={{ width: '100%', padding: 14 }}>Resolve Now</button>
             </div>
          )}

          {tab === 'feed' && (
             <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {myMedia.length > 0 ? myMedia.map(m => (
                  <div key={m.id} className="p-card" style={{ padding: 0, overflow: 'hidden', border: 'none', background: '#fff' }}>
                     <img src={m.url} alt="Site update" style={{ width: '100%', height: 400, objectFit: 'cover' }} />
                     <div style={{ padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                           <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                              <PAv i="JD" s={32} c={ac} />
                              <div style={{ fontSize: 13, fontWeight: 700 }}>John Dakey <span style={{ fontWeight: 400, opacity: 0.5 }}>• Admin</span></div>
                           </div>
                           <div style={{ fontSize: 11, color: '#B5AFA9' }}>{new Date(m.createdAt).toLocaleDateString()}</div>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: '#1A1410' }}>{m.caption || "Latest update from the site. Progress is moving according to schedule."}</p>
                     </div>
                  </div>
                )) : (
                  <div style={{ padding: 60, textAlign: 'center', color: '#B5AFA9' }}>
                     <Camera size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                     <div style={{ fontSize: 14 }}>Your project feed will appear here as soon as we start on site.</div>
                  </div>
                )}
          </div>
          )}

          {tab === 'evolution' && (
             <div className="fade-in">
                <div style={{ marginBottom: 32 }}>
                   <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Project Evolution</div>
                   <div style={{ fontSize: 13, color: '#B5AFA9' }}>Interact with the slider to see the transformation of your space.</div>
                </div>
                <BeforeAfterSlider 
                  before="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1000" 
                  after="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000"
                />
                <div style={{ marginTop: 24, padding: 24, background: '#fff', borderRadius: 24 }}>
                   <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>From Raw Site to Refined Space</div>
                   <p style={{ fontSize: 13, color: '#625C54', margin: 0 }}>This view captures the transition from initial structural state to the million-dollar finish delivered by Glasstech.</p>
                </div>
             </div>
          )}

          {tab === 'finance' && (
             <div className="fade-in">
                <div className="p-card" style={{ padding: 32, background: '#1A1410', color: '#fff', marginBottom: 24 }}>
                   <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>Account Summary</div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
                      <div>
                         <div style={{ fontSize: 24, fontWeight: 700 }}>{props.formatPrice(totalPaid)}</div>
                         <div style={{ fontSize: 10, opacity: 0.5 }}>Total Paid</div>
                      </div>
                      <div>
                         <div style={{ fontSize: 24, fontWeight: 700, color: totalOwed > 0 ? '#EF4444' : '#16A34A' }}>{props.formatPrice(totalOwed)}</div>
                         <div style={{ fontSize: 10, opacity: 0.5 }}>Outstanding</div>
                      </div>
                   </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                   {myInvs.map(i => (
                     <div key={i.id} className="p-card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                           <div style={{ fontSize: 14, fontWeight: 700 }}>{i.title}</div>
                           <div style={{ fontSize: 11, color: '#B5AFA9' }}>{i.id} • Due {i.due}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                           <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{props.formatPrice(i.amount)}</div>
                           <PSBadge s={i.status} c={ac} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          )}

          {tab === 'help' && (
             <div className="fade-in" style={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
                <div className="p-card" style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
                   {/* Chat bubbles go here */}
                   <div style={{ textAlign: 'center', padding: 40, color: '#B5AFA9', fontSize: 13 }}>
                      Need clarification? Send us a voice note.
                   </div>
                </div>
                <div style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
                   <button style={{ width: 64, height: 64, borderRadius: '50%', background: ac, color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 20px ${ac}44`, cursor: 'pointer' }}>
                      <Mic size={28} />
                   </button>
                   <input className="p-inp" placeholder="Type a message..." style={{ flex: 1, height: 50, borderRadius: 25 }} />
                </div>
             </div>
          )}

          {tab === 'docs' && (
             <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {(proposals || []).filter(p => p.clientId === client.id).map(p => (
                  <div key={p.id} className="p-card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ac }}>
                           <FileText size={20} />
                        </div>
                        <div>
                           <div style={{ fontSize: 14, fontWeight: 700 }}>{p.title}</div>
                           <div style={{ fontSize: 11, color: '#B5AFA9' }}>{p.id}</div>
                        </div>
                     </div>
                     <button className="p-btn-light" style={{ padding: 8 }}><Download size={16} /></button>
                  </div>
                ))}
             </div>
          )}
       </div>

       {/* 3. ZERO-FRICTION DOCK */}
       <nav style={{ 
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', 
          background: 'rgba(26, 20, 16, 0.95)', backdropFilter: 'blur(10px)', 
          padding: '12px 24px', borderRadius: 40, display: 'flex', gap: 32,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
       }}>
          {[
             { id: 'feed', icon: <Image size={20} /> },
             { id: 'evolution', icon: <Sparkles size={20} /> },
             { id: 'finance', icon: <DollarSign size={20} /> },
             { id: 'help', icon: <MessageSquare size={20} /> },
             { id: 'docs', icon: <FileText size={20} /> }
          ].map(i => (
             <button 
               key={i.id} 
               onClick={() => setTab(i.id)}
               style={{ 
                 background: 'none', border: 'none', color: tab === i.id ? ac : '#fff', 
                 opacity: tab === i.id ? 1 : 0.4, cursor: 'pointer', transition: 'all 0.2s'
               }}
             >
                {i.icon}
             </button>
          ))}
          <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#EF4444', opacity: 0.6 }}><LogOut size={20} /></button>
       </nav>
    </div>
  );
}
