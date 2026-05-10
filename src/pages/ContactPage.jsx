import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWindowWidth, isMob, DARK_TEXT, AC } from './PublicSite';

export default function ContactPage({ brand, submitContact }) {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get('subject') || '';
  const winW = useWindowWidth();
  const mob = isMob(winW);
  const ac = brand.color || AC;
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', subject: initialSubject, message: '' });

  const handleSubmit = () => {
    if (!formData.firstName || !formData.email || !formData.message) return alert("Please fill all required fields.");
    submitContact(formData);
    setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ paddingTop: mob ? 80 : 120 }}>
       <section style={{ padding: '100px 5vw', background: '#F9F7F4', color: DARK_TEXT }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
             <h1 style={{ fontSize: mob ? 48 : 96, fontWeight: 800, letterSpacing: '-0.04em' }}>Let's <em style={{ fontStyle: 'italic', color: ac, fontWeight: 400 }}>Collaborate</em>.</h1>
             <p style={{ fontSize: 20, color: 'rgba(26,20,16,0.6)' }}>Speak to a technical lead about your finishing requirements.</p>
          </div>
       </section>
       <section style={{ padding: mob ? '60px 24px' : '100px 5vw', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: mob ? 40 : 64 }}>
             <div style={{ background: '#fff', padding: mob ? '32px 20px' : 48, borderRadius: 24, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 50px rgba(0,0,0,0.03)' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <input placeholder="First Name" style={{ padding: 16, borderRadius: 12, border: '1px solid #eee' }} value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                      <input placeholder="Last Name" style={{ padding: 16, borderRadius: 12, border: '1px solid #eee' }} value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                   </div>
                   <input placeholder="Email" style={{ padding: 16, borderRadius: 12, border: '1px solid #eee' }} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                   <input placeholder="Subject (Optional)" style={{ padding: 16, borderRadius: 12, border: '1px solid #eee' }} value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                   <textarea rows={5} placeholder="Project Description" style={{ padding: 16, borderRadius: 12, border: '1px solid #eee', resize: 'none' }} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                   <button onClick={handleSubmit} style={{ padding: 20, background: DARK_TEXT, color: '#fff', borderRadius: 12, border: 'none', fontWeight: 800, cursor: 'pointer' }}>Send Message</button>
                </div>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                <div>
                   <h4 style={{ fontSize: 11, fontWeight: 800, color: ac, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Direct Contact</h4>
                   <p style={{ fontSize: 24, fontWeight: 800, margin: 0, color: DARK_TEXT }}>{brand.phone}</p>
                   <p style={{ color: 'rgba(26,20,16,0.5)', margin: '8px 0 0' }}>{brand.email}</p>
                </div>
                <div>
                   <h4 style={{ fontSize: 11, fontWeight: 800, color: ac, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Regional Hubs</h4>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {['Accra', 'Kumasi', 'Takoradi', 'Koforidua'].map(c => (
                         <span key={c} style={{ padding: '6px 12px', background: '#F5F5F5', borderRadius: 6, fontSize: 11, fontWeight: 700, color: DARK_TEXT }}>{c.toUpperCase()}</span>
                      ))}
                   </div>
                </div>
             </div>
          </div>
       </section>
    </div>
  );
}
