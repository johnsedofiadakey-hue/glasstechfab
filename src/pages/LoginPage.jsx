import React, { useState } from 'react';
import { PAv, Spinner } from '../components/Shared';
import { Smartphone, Send, ArrowRight, MessageSquare, ShieldCheck, Lock, ChevronLeft, Globe, Shield } from 'lucide-react';

const COUNTRIES = [
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'Togo', code: '+228', flag: '🇹🇬' },
  { name: 'Cote d\'Ivoire', code: '+225', flag: '🇨🇮' },
];

export default function LoginPage({ onLogin, onBack, brand, type = 'client', ...props }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(type === 'admin');

  const ac = brand.color || '#C8A96E';

  const getFullNumber = () => {
    let clean = phone.replace(/\s/g, '');
    if (clean.startsWith('0')) clean = clean.substring(1);
    return `${selectedCountry.code}${clean}`;
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
    setLoading(true);
    setErr('');
    try {
      console.log("[LOGIN] Attempting admin access for:", email.trim());
      await onLogin(email.trim(), pw.trim());
    } catch (e) {
      console.error("[LOGIN ERROR]:", e);
      setErr('Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lxf" style={{ minHeight: '100vh', background: '#F9F7F4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, '--ac': ac }}>
      
      {/* Navigation Top */}
      <div style={{ width: '100%', maxWidth: 440, marginBottom: 20 }}>
        <button 
          onClick={onBack} 
          className="lxf" 
          style={{ background: 'none', border: 'none', color: '#B5AFA9', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}
        >
          <ChevronLeft size={16} /> Back to Website
        </button>
      </div>

      <div className="p-card" style={{ width: '100%', maxWidth: 440, padding: 48, borderRadius: 24, boxShadow: '0 24px 48px -12px rgba(26,20,16,0.08)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Subtle decorative element */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `${ac}10`, borderRadius: '0 0 0 100%' }}></div>

        <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative', zIndex: 1 }}>
           {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 32, marginBottom: 24 }} />
             : <div className="lxfh" style={{ fontSize: 24, fontWeight: 700, color: '#1A1410', marginBottom: 24 }}>{brand.name}</div>}
           
           {!isAdminLogin ? (
             <>
               <h1 className="lxfh" style={{ fontSize: 32, fontWeight: 300, color: '#1A1410', marginBottom: 12 }}>{step === 1 ? 'Client Portal' : 'One-Time PIN'}</h1>
               <p className="lxf" style={{ fontSize: 15, color: '#6A635C', lineHeight: 1.6 }}>
                 {step === 1 
                   ? 'Experience premium craftsmanship. Securely access your Glasstech project hub.' 
                   : `To ensure your privacy, we've sent a 6-digit code to your WhatsApp.`}
               </p>
             </>
           ) : (
             <>
               <h1 className="lxfh" style={{ fontSize: 32, fontWeight: 300, color: '#1A1410', marginBottom: 8 }}>Console Entry</h1>
               <p className="lxf" style={{ fontSize: 14, color: '#B5AFA9' }}>Administrator terminal authentication</p>
             </>
           )}
        </div>

        {/* ERROR BOX */}
        {err && (
          <div className="fade-in" style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 12, color: '#DC2626', fontSize: 13, marginBottom: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
            <ShieldCheck size={16} /> {err}
          </div>
        )}

        {/* LOGIN FORMS */}
        {!isAdminLogin ? (
          <div className="fade-in">
             {step === 1 ? (
               <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ width: 100, position: 'relative' }}>
                      <select 
                        className="p-inp" 
                        style={{ height: 56, paddingRight: 8, textAlignLast: 'center', fontSize: 14 }}
                        value={selectedCountry.code}
                        onChange={e => {
                          const c = COUNTRIES.find(x => x.code === e.target.value);
                          if (c) setSelectedCountry(c);
                        }}
                      >
                        {COUNTRIES.map(c => (
                          <option key={`${c.name}-${c.code}`} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: ac }}><Smartphone size={18} /></div>
                      <input 
                        className="p-inp" 
                        placeholder="24 123 4567" 
                        style={{ paddingLeft: 48, fontSize: 16, height: 56 }} 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <button onClick={handleRequestOTP} disabled={loading} className="p-btn-gold" style={{ height: 56, fontSize: 15, fontWeight: 600, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    {loading ? <Spinner /> : <><Send size={18} /> Request Magic Link</>}
                  </button>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 10 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#B5AFA9', fontSize: 11 }}>
                        <Shield size={14} /> Encrypted
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#B5AFA9', fontSize: 11 }}>
                        <Globe size={14} /> Global Access
                     </div>
                  </div>
               </div>
             ) : (
               <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    <input 
                      className="p-inp" 
                      placeholder="••••••" 
                      style={{ textAlign: 'center', fontSize: 28, letterSpacing: '8px', height: 72, fontWeight: 700, borderRadius: 16 }} 
                      maxLength="6"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                    />
                  </div>
                  <button onClick={handleVerifyOTP} disabled={loading} className="p-btn-dark" style={{ height: 56, fontSize: 15, fontWeight: 600, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#1A1410' }}>
                    {loading ? <Spinner /> : <><ArrowRight size={18} /> Enter My Portal</>}
                  </button>
                  <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: ac, fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Not your number? Change it</button>
               </div>
             )}
          </div>
        ) : (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>Admin ID</label>
              <input className="p-inp" placeholder="admin@glasstechfab.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#B5AFA9', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>Password</label>
              <input className="p-inp" type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} />
            </div>
            <button onClick={handleAdminLogin} disabled={loading} className="p-btn-gold" style={{ height: 56, marginTop: 12 }}>
              {loading ? <Spinner /> : 'Secure Entry'}
            </button>
          </div>
        )}

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #F0EBE5', textAlign: 'center' }}>
          <button 
            onClick={() => { setIsAdminLogin(!isAdminLogin); setStep(1); setErr(''); }} 
            className="lxf" 
            style={{ background: 'none', border: 'none', color: '#B5AFA9', fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            {isAdminLogin ? <><MessageSquare size={16} /> Client Verification Hub</> : <><Lock size={16} /> Administrative Console</>}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 32, textAlign: 'center', maxWidth: 400 }}>
         <p style={{ fontSize: 12, color: '#B5AFA9', lineHeight: 1.6 }}>
            Verified Authentication powered by WhatsApp. Ensure your project manager has updated your contact records for immediate access.
         </p>
      </div>

    </div>
  );
}
