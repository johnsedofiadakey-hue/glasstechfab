import React, { useState, useEffect } from 'react';
import { Spinner } from '../components/Shared';
import { 
  Smartphone, Send, ArrowRight, MessageSquare, 
  ShieldCheck, Lock, ChevronLeft, Globe, Shield,
  Mail, KeyRound, Fingerprint, Command
} from 'lucide-react';

const COUNTRIES = [
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
];

export default function LoginPage({ onLogin, onBack, brand, type = 'client', ...props }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(type === 'admin');

  const ac = brand.color || '#C8A96E';

  useEffect(() => {
    setIsAdminLogin(type === 'admin');
  }, [type]);

  const handleLoginSubmit = async () => {
    const loginPath = isAdminLogin ? 'admin' : 'client';
    const identifier = isAdminLogin ? email : username;
    const cred = isAdminLogin ? pw : password;

    if (!identifier || !cred) return setErr('Identification and access password required.');
    
    setLoading(true);
    setErr('');
    try {
      await onLogin(identifier.trim(), cred.trim(), loginPath);
    } catch (e) {
      setErr(e.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="lxf" style={{ 
      minHeight: '100vh', 
      background: isAdminLogin ? '#0D0B09' : '#F9F7F4', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 24, 
      transition: 'background 0.8s'
    }}>
      
      {/* Navigation Top */}
      <div style={{ width: '100%', maxWidth: 440, marginBottom: 24 }}>
        <button 
          onClick={onBack} 
          style={{ background: 'none', border: 'none', color: isAdminLogin ? '#625C54' : '#B5AFA9', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}
        >
          <ChevronLeft size={16} /> Return to Public Site
        </button>
      </div>

      <div className={`p-card ${isAdminLogin ? 'dark-theme' : ''}`} style={{ 
        width: '100%', 
        maxWidth: 440, 
        padding: '56px 48px', 
        borderRadius: 24, 
        boxShadow: isAdminLogin ? '0 32px 64px rgba(0,0,0,0.5)' : '0 24px 48px -12px rgba(26,20,16,0.08)',
        background: isAdminLogin ? '#1A1410' : '#ffffff',
        border: `1px solid ${isAdminLogin ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Visual Decoration */}
        <div style={{ 
          position: 'absolute', top: -20, right: -20, width: 120, height: 120, 
          background: isAdminLogin ? `${ac}15` : `${ac}10`, 
          borderRadius: '50%', filter: 'blur(30px)' 
        }}></div>

        <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }}>
           {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 60, marginBottom: 24, filter: isAdminLogin && 'brightness(0) invert(1)' }} />
             : <div className="lxfh" style={{ fontSize: 24, fontWeight: 700, color: isAdminLogin ? '#fff' : '#1A1410', marginBottom: 24 }}>{brand.name}</div>}
           
          <h1 className="lxfh" style={{ fontSize: isAdminLogin ? 28 : 32, fontWeight: 300, color: isAdminLogin ? '#fff' : '#1A1410', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            {isAdminLogin ? 'Staff Entry' : 'Partner Portal'} {isAdminLogin ? <Lock size={20} color={ac} /> : <ShieldCheck size={24} color={ac} />}
          </h1>
          <p style={{ fontSize: 13, color: isAdminLogin ? '#625C54' : '#6A635C', textTransform: isAdminLogin ? 'uppercase' : 'none', letterSpacing: isAdminLogin ? '.1em' : 'normal' }}>
            {isAdminLogin ? 'Secured Terminal Environment' : 'Enter your designated credentials to access your dashboard.'}
          </p>
        </div>

        {/* ERROR DISPLAY */}
        {err && (
          <div className="fade-in" style={{ 
            padding: '14px 18px', background: isAdminLogin ? 'rgba(239, 68, 68, 0.1)' : '#FEF2F2', border: `1px solid ${isAdminLogin ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2'}`, 
            borderRadius: 12, color: '#DC2626', fontSize: 13, marginBottom: 32, 
            display: 'flex', gap: 10, alignItems: 'center' 
          }}>
            <Fingerprint size={16} /> {err}
          </div>
        )}

        {/* CORE FORM LOGIC */}
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ position: 'relative' }}>
            {isAdminLogin ? <Mail size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: ac }} /> : <Command size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: ac }} />}
            <input 
              placeholder={isAdminLogin ? "Staff ID (Email)" : "Username"} 
              style={{ width: '100%', height: 56, paddingLeft: 48, background: isAdminLogin ? 'rgba(255,255,255,0.03)' : '#F9F7F4', border: isAdminLogin ? '1px solid rgba(255,255,255,0.1)' : '1px solid #F0EBE5', color: isAdminLogin ? '#fff' : '#121212', borderRadius: 12, outline: 'none' }}
              value={isAdminLogin ? email : username} 
              onChange={e => isAdminLogin ? setEmail(e.target.value) : setUsername(e.target.value)} 
            />
          </div>
          <div style={{ position: 'relative' }}>
            <KeyRound size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: ac }} />
            <input 
              type="password" 
              placeholder="Access Password" 
              style={{ width: '100%', height: 56, paddingLeft: 48, background: isAdminLogin ? 'rgba(255,255,255,0.03)' : '#F9F7F4', border: isAdminLogin ? '1px solid rgba(255,255,255,0.1)' : '1px solid #F0EBE5', color: isAdminLogin ? '#fff' : '#121212', borderRadius: 12, outline: 'none' }}
              value={isAdminLogin ? pw : password} 
              onChange={e => isAdminLogin ? setPw(e.target.value) : setPassword(e.target.value)} 
              onKeyPress={e => e.key === 'Enter' && handleLoginSubmit()}
            />
          </div>
          <button onClick={handleLoginSubmit} disabled={loading} style={{ height: 60, marginTop: 12, background: isAdminLogin ? 'linear-gradient(135deg, #E5C387, #C8A96E)' : '#1A1410', color: isAdminLogin ? '#121212' : '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            {loading ? <Spinner /> : isAdminLogin ? <><Shield size={18} /> Authorize Terminal</> : <><ArrowRight size={18} /> Enter Portal</>}
          </button>
        </div>

        {/* SECURITY INFO FOOTER */}
        <div style={{ marginTop: 48, borderTop: `1px solid ${isAdminLogin ? 'rgba(255,255,255,0.05)' : '#F0EBE5'}`, paddingTop: 32, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 16 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#B5AFA9', fontSize: 11 }}>
                <Shield size={14} /> End-to-End Encrypted
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#B5AFA9', fontSize: 11 }}>
                <Globe size={14} /> Global Availability
             </div>
          </div>
          {!isAdminLogin && (
            <p style={{ fontSize: 12, color: '#B5AFA9', lineHeight: 1.6 }}>
              Lost your credentials? Your project manager can reset your access password anytime.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

