import React, { useState } from 'react';
import { PAv, Spinner } from '../components/Shared';
import { Smartphone, Send, ArrowRight, MessageSquare, ShieldCheck, Lock } from 'lucide-react';

export default function LoginPage({ onLogin, onBack, brand, onBootstrap, type = 'client', ...props }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(type === 'admin');

  const ac = brand.color || '#C8A96E';

  const handleRequestOTP = async () => {
    if (!phone) return setErr('Please enter your WhatsApp number');
    setLoading(true);
    setErr('');
    try {
      await props.sendOTP(phone);
      setStep(2);
    } catch (e) {
      setErr(e.message || 'Verification failed. Contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) return setErr('Please enter the 6-digit code');
    setLoading(true);
    setErr('');
    try {
      await props.verifyOTP(phone, otp);
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
      await onLogin(email, pw);
    } catch (e) {
      setErr('Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lxf" style={{ minHeight: '100vh', background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, '--ac': ac }}>
      <div className="p-card" style={{ width: '100%', maxWidth: 440, padding: 48, borderRadius: 24, boxShadow: '0 24px 48px -12px rgba(26,20,16,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
           {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 32, marginBottom: 24 }} />
             : <div className="lxfh" style={{ fontSize: 24, fontWeight: 700, color: '#1A1410', marginBottom: 24 }}>{brand.name}</div>}
           
           {!isAdminLogin ? (
             <>
               <h1 className="lxfh" style={{ fontSize: 32, fontWeight: 300, color: '#1A1410', marginBottom: 8 }}>{step === 1 ? 'Client Access' : 'Verify Identity'}</h1>
               <p className="lxf" style={{ fontSize: 14, color: '#B5AFA9' }}>
                 {step === 1 ? 'Enter your registered WhatsApp number to receive a magic link.' : `We've sent a 6-digit code to ${phone}`}
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
          <div className="fade-in" style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 12, color: '#DC2626', fontSize: 13, marginBottom: 24, display: 'flex', gap: 10 }}>
            <ShieldCheck size={16} /> {err}
          </div>
        )}

        {/* LOGIN FORMS */}
        {!isAdminLogin ? (
          <div className="fade-in">
             {step === 1 ? (
               <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: ac }}><Smartphone size={18} /></div>
                    <input 
                      className="p-inp" 
                      placeholder="+233 20 000 0000" 
                      style={{ paddingLeft: 48, fontSize: 16, height: 56 }} 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                  <button onClick={handleRequestOTP} disabled={loading} className="p-btn-gold" style={{ height: 56, fontSize: 15, fontWeight: 600, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    {loading ? <Spinner /> : <><Send size={18} /> Send WhatsApp OTP</>}
                  </button>
               </div>
             ) : (
               <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    <input 
                      className="p-inp" 
                      placeholder="Enter 6-digit code" 
                      style={{ textAlign: 'center', fontSize: 24, letterSpacing: '8px', height: 64, fontWeight: 700 }} 
                      maxLength="6"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                    />
                  </div>
                  <button onClick={handleVerifyOTP} disabled={loading} className="p-btn-dark" style={{ height: 56, fontSize: 15, fontWeight: 600, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#1A1410' }}>
                    {loading ? <Spinner /> : <><ArrowRight size={18} /> Verify & Enter Portal</>}
                  </button>
                  <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: ac, fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Try another number</button>
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
            {isAdminLogin ? <><MessageSquare size={16} /> Switch to Client OTP</> : <><Lock size={16} /> Management Terminal</>}
          </button>
        </div>
      </div>

      {onBootstrap && !isAdminLogin && (
        <button onClick={onBootstrap} style={{ position: 'fixed', bottom: 24, right: 24, background: 'none', border: `1px solid ${ac}40`, color: ac, borderRadius: 8, padding: '8px 16px', fontSize: 11, cursor: 'pointer', opacity: .5 }}>Initialize Data Ecosystem</button>
      )}
    </div>
  );
}
