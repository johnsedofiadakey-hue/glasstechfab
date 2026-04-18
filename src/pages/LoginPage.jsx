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
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [step, setStep] = useState(1); 
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(type === 'admin');

  const ac = brand.color || '#C8A96E';

  // Detection of entry mode from props
  useEffect(() => {
    setIsAdminLogin(type === 'admin');
  }, [type]);

  const getFullNumber = () => {
    let clean = phone.replace(/\D/g, ''); // Standardizing to digits only for Firestore ID
    if (clean.startsWith('0')) clean = clean.substring(1);
    return `${selectedCountry.code.replace('+', '')}${clean}`;
  };

  const handleRequestOTP = async () => {
    if (!phone) return setErr('Please enter your WhatsApp number');
    const fullNumber = getFullNumber();
    setLoading(true);
    setErr('');
    try {
      await props.sendOTP(fullNumber);
      setStep(2);
    } catch (e) {
      setErr(e.message || 'Verification failed. Contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) return setErr('Please enter the 6-digit code');
    const fullNumber = getFullNumber();
    setLoading(true);
    setErr('');
    try {
      await props.verifyOTP(fullNumber, otp);
    } catch (e) {
      setErr(e.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    if (!email || !pw) return setErr('Credentials required');
    setLoading(true);
    setErr('');
    try {
      await onLogin(email.trim(), pw.trim());
    } catch (e) {
      setErr('Invalid administrative credentials.');
    } finally {
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
           {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 32, marginBottom: 24, filter: isAdminLogin && 'brightness(0) invert(1)' }} />
             : <div className="lxfh" style={{ fontSize: 24, fontWeight: 700, color: isAdminLogin ? '#fff' : '#1A1410', marginBottom: 24 }}>{brand.name}</div>}
           
           {!isAdminLogin ? (
             <>
               <h1 className="lxfh" style={{ fontSize: 32, fontWeight: 300, color: '#1A1410', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                 Partner Portal <ShieldCheck size={24} color={ac} />
               </h1>
               <p style={{ fontSize: 15, color: '#6A635C', lineHeight: 1.6 }}>
                 {step === 1 
                   ? 'Enter your registered WhatsApp number to access your project dashboard.' 
                   : 'Check your WhatsApp for the 6-digit verification code.'}
               </p>
             </>
           ) : (
             <>
               <h1 className="lxfh" style={{ fontSize: 28, fontWeight: 300, color: '#fff', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                 Staff Entry <Lock size={20} color={ac} />
               </h1>
               <p style={{ fontSize: 13, color: '#625C54', textTransform: 'uppercase', letterSpacing: '.1em' }}>Secured Terminal Environment</p>
             </>
           )}
        </div>

        {/* ERROR DISPLAY */}
        {err && (
          <div className="fade-in" style={{ 
            padding: '14px 18px', background: '#FEF2F2', border: '1px solid #FEE2E2', 
            borderRadius: 12, color: '#DC2626', fontSize: 13, marginBottom: 32, 
            display: 'flex', gap: 10, alignItems: 'center' 
          }}>
            <Fingerprint size={16} /> {err}
          </div>
        )}

        {/* CORE FORM LOGIC */}
        {!isAdminLogin ? (
          <div className="fade-in">
             {step === 1 ? (
               <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 110, position: 'relative' }}>
                      <select 
                        style={{ width: '100%', height: 56, borderRadius: 12, border: '1px solid #F0EBE5', background: '#FDFCFB', textAlign: 'center', fontSize: 14, fontWeight: 600, outline: 'none' }}
                        value={selectedCountry.code}
                        onChange={e => setSelectedCountry(COUNTRIES.find(x => x.code === e.target.value))}
                      >
                        {COUNTRIES.map(c => (
                          <option key={c.name} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <Smartphone size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: ac }} />
                      <input 
                        placeholder="24 000 0000" 
                        style={{ width: '100%', height: 56, borderRadius: 12, border: '1px solid #F0EBE5', paddingLeft: 48, fontSize: 16, outline: 'none', background: '#FDFCFB' }} 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <button onClick={handleRequestOTP} disabled={loading} className="luxe-pulse" style={{ height: 60, background: '#1A1410', color: '#fff', borderRadius: 14, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                    {loading ? <Spinner /> : <><Send size={18} /> Request Access Code</>}
                  </button>
               </div>
             ) : (
               <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <input 
                      placeholder="••••••" 
                      style={{ width: '100%', textAlign: 'center', fontSize: 32, letterSpacing: '12px', height: 80, fontWeight: 800, borderRadius: 16, border: '2px solid #F0EBE5', outline: 'none', color: '#1A1410' }} 
                      maxLength="6"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                    />
                  </div>
                  <button onClick={handleVerifyOTP} disabled={loading} style={{ height: 60, background: ac, color: '#121212', borderRadius: 14, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                    {loading ? <Spinner /> : <><ArrowRight size={18} /> Verify & Enter Hub</>}
                  </button>
                  <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#B5AFA9', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Back to phone entry</button>
               </div>
             )}
          </div>
        ) : (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: ac }} />
              <input 
                placeholder="Staff Identity (Email)" 
                style={{ width: '100%', height: 56, paddingLeft: 48, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 12, outline: 'none' }}
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>
            <div style={{ position: 'relative' }}>
              <KeyRound size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: ac }} />
              <input 
                type="password" 
                placeholder="Access Password" 
                style={{ width: '100%', height: 56, paddingLeft: 48, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 12, outline: 'none' }}
                value={pw} 
                onChange={e => setPw(e.target.value)} 
              />
            </div>
            <button onClick={handleAdminLogin} disabled={loading} style={{ height: 60, marginTop: 12, background: 'linear-gradient(135deg, #E5C387, #C8A96E)', color: '#121212', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              {loading ? <Spinner /> : <><Command size={18} /> Authorize Terminal</>}
            </button>
          </div>
        )}

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
              Can't sign in? Your project manager handles authorization. Contact support at <span style={{ color: ac }}>{brand.phone}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

