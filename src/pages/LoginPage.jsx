import React, { useState } from 'react';
import { TEAM_MEMBERS, CLIENTS_DATA } from '../data';

export default function LoginPage({ onLogin, onBack, brand }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const ac = brand.color || '#C8A96E';

  const [loading, setLoading] = useState(false);

  const tryLogin = async () => {
    setLoading(true);
    setErr('');
    try {
      await onLogin(email, pw);
    } catch (e) {
      setErr(e.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lxf" style={{ minHeight: '100vh', background: '#F9F7F4', display: 'grid', gridTemplateColumns: '1fr 1fr', '--ac': ac }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 72px', background: '#fff', borderRight: '1px solid rgba(0,0,0,.07)' }}>
        <button onClick={onBack} className="lxf" style={{ background: 'none', border: 'none', color: '#B5AFA9', cursor: 'pointer', fontSize: 12, marginBottom: 56, display: 'flex', alignItems: 'center', gap: 6, padding: 0, letterSpacing: '.1em', textTransform: 'uppercase' }}>
          ← Back to Site
        </button>
        {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 36, objectFit: 'contain', marginBottom: 36, objectPosition: 'left' }} />
          : <div className="lxfh" style={{ fontSize: 28, fontWeight: 400, color: '#1A1410', marginBottom: 36 }}>{brand.name}</div>}
        <div className="eyebrow lxf" style={{ marginBottom: 10 }}>Secure Access</div>
        <h1 className="lxfh" style={{ fontSize: 44, fontWeight: 300, color: '#1A1410', lineHeight: 1.1, marginBottom: 8 }}>Welcome<br />Back</h1>
        <p className="lxf" style={{ fontSize: 14, color: '#B5AFA9', marginBottom: 36 }}>Sign in to your workspace or portal</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 10, color: '#484848', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 5 }}>Email Address</label>
            <input className="p-inp lxf" placeholder="hello@company.com" value={email} onChange={e => setEmail(e.target.value)} style={{ fontSize: 14, padding: '12px 16px', width: '100%', border: '1px solid rgba(0,0,0,.1)', borderRadius: 8 }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 10, color: '#484848', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 5 }}>Password</label>
            <input className="p-inp lxf" placeholder="••••••••" type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && tryLogin()} style={{ fontSize: 14, padding: '12px 16px', width: '100%', border: '1px solid rgba(0,0,0,.1)', borderRadius: 8 }} />
          </div>
          {err && <div className="lxf" style={{ fontSize: 13, color: '#DC2626', padding: '10px 14px', background: 'rgba(220,38,38,.05)', borderRadius: 7, border: '1px solid rgba(220,38,38,.15)' }}>{err}</div>}
          <button onClick={tryLogin} className="p-btn-gold lxf" style={{ padding: '14px', fontSize: 14, marginTop: 4, width: '100%', borderRadius: 8 }}>Sign In</button>
        </div>
        <div style={{ marginTop: 32, padding: '18px', background: '#F9F7F4', borderRadius: 10, border: '1px solid rgba(0,0,0,.07)' }}>
          <div className="eyebrow lxf" style={{ marginBottom: 10, fontSize: 9 }}>Demo Credentials</div>
          {[['Site Supervisor', 'admin@glasstechfab.com', 'admin123'], ['Operations Manager', 'manager@glasstechfab.com', 'admin123'], ['Fabrication Team', 'lead@glasstechfab.com', 'team123'], ['Client Access', 'client@demo.com', 'client123']].map(([r, e, p]) => (
            <div key={r} style={{ marginBottom: 7, cursor: 'pointer' }} onClick={() => { setEmail(e); setPw(p); }}>
              <span className="lxf" style={{ fontSize: 10, color: '#B5AFA9', marginRight: 8, letterSpacing: '.08em' }}>{r}:</span>
              <span className="lxf" style={{ fontSize: 11, color: '#7A6E62', fontFamily: 'monospace' }}>{e} / {p}</span>
            </div>
          ))}
          <div className="lxf" style={{ fontSize: 10, color: '#C0B9B0', marginTop: 6, fontStyle: 'italic' }}>Click any row to auto-fill credentials</div>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(26,20,16,.65) 0%,rgba(26,20,16,.3) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 52, left: 52, right: 52 }}>
          <div className="eyebrow lxf" style={{ color: `${ac}`, marginBottom: 14 }}>Trusted by industrial developers</div>
          <p className="lxfh" style={{ fontSize: 36, fontWeight: 300, color: '#F9F7F4', lineHeight: 1.3, marginBottom: 24 }}>"The platform that finally brings together every fabrication phase — with precision."</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: `${ac}22`, border: `1.5px solid ${ac}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 600, color: ac, fontFamily: "'DM Sans',sans-serif" }}>KA</div>
            <div><div className="lxf" style={{ fontSize: 13, fontWeight: 500, color: '#F9F7F4' }}>Kofi Asante</div><div className="lxf" style={{ fontSize: 12, color: 'rgba(249,247,244,.5)' }}>Operations Lead, Glasstech Fabrications</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
