import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  Check, 
  Play, 
  X, 
  ArrowLeft, 
  Star, 
  SplitSquareHorizontal,
  Layout, 
  Home, 
  Layers, 
  Droplet, 
  Zap, 
  Settings, 
  Hammer,
  Palette,
  Package,
  Mail,
  Truck,
  CreditCard,
  Building,
  CheckCircle,
  Send
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const Av = ({ i, s = 40, c }) => (
  <div style={{
    width: s, height: s, borderRadius: '50%', background: `${c}20`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: s * 0.4, fontWeight: 700, color: c, border: `1px solid ${c}40`
  }}>{i}</div>
);

const BA = ({ before, after, h = 300 }) => {
  const [p, setP] = useState(50);
  return (
    <div style={{ position: 'relative', height: h, width: '100%', overflow: 'hidden', borderRadius: 2 }}>
      <img src={after} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="After" />
      <div style={{ position: 'absolute', inset: 0, width: `${p}%`, overflow: 'hidden', borderRight: '2px solid #fff' }}>
        <img src={before} style={{ width: '100vw', height: h, objectFit: 'cover' }} alt="Before" />
      </div>
      <input type="range" min="0" max="100" value={p} onChange={e => setP(e.target.value)}
        style={{ position: 'absolute', top: '50%', left: 0, width: '100%', transform: 'translateY(-50%)', opacity: 0, cursor: 'ew-resize', zIndex: 10 }} />
      <div style={{ position: 'absolute', top: '50%', left: `${p}%`, transform: 'translate(calc(-50% - 1px), -50%)', width: 36, height: 36, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', pointerEvents: 'none' }}>
        <SplitSquareHorizontal size={18} color="#121212" />
      </div>
    </div>
  );
};

export function PubNav({ brand, setPage, activePage, onPortal, user, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const ac = brand.color || '#B08D57';

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { n: 'Home', id: 'home' },
    { n: 'Services', id: 'services' },
    { n: 'Portfolio', id: 'portfolio' },
    { n: 'Marketplace', id: 'marketplace' },
    { n: 'About', id: 'about' },
    { n: 'Contact', id: 'contact' }
  ];

  // FORCE SOLID NAV ON SUBPAGES
  const forceSolid = activePage !== 'home';
  const isDarkText = scrolled || menuOpen || forceSolid;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: isDarkText ? 'rgba(255,255,255,0.8)' : 'transparent',
      backdropFilter: isDarkText ? 'blur(24px) saturate(180%)' : 'none',
      WebkitBackdropFilter: isDarkText ? 'blur(24px) saturate(180%)' : 'none',
      borderBottom: scrolled || forceSolid ? '1px solid rgba(0,0,0,0.05)' : 'none',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      height: scrolled ? 80 : 100, display: 'flex', alignItems: 'center',
      padding: '0 5vw'
    }}>
      <div style={{ maxWidth: 1800, width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div onClick={() => { setPage('home'); setMenuOpen(false); }} style={{ cursor: 'pointer', zIndex: 1001 }}>
          {brand.logo ? (
             <img src={brand.logo} alt={brand.name} style={{ height: 36, objectFit: 'contain', filter: isDarkText ? 'invert(1)' : 'none' }} />
          ) : (
            <div className="lxfh" style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.04em', color: isDarkText ? '#1A1410' : '#ffffff' }}>
              {brand.name || 'GLASSTECH'}<span style={{ color: ac }}>.</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 64 }} className="dt-flex">
          <div style={{ display: 'flex', gap: 40 }}>
            {links.map(l => (
              <button key={l.id} onClick={() => setPage(l.id)} className="lxf" style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700,
                color: activePage === l.id ? ac : (isDarkText ? '#1A1410' : '#ffffff'),
                textTransform: 'uppercase', letterSpacing: '0.25em', transition: 'all 0.3s',
                opacity: activePage === l.id ? 1 : 0.7
              }}>{l.n}</button>
            ))}
          </div>
          {onPortal && (
            <button onClick={() => onPortal('client')} className="lxf p-btn-dark" style={{ 
              padding: '14px 32px', fontSize: 11, fontWeight: 800, 
              background: (isDarkText ? '#1A1410' : '#ffffff'), 
              color: (isDarkText ? '#ffffff' : '#1A1410'), 
              borderRadius: 14, 
              textTransform: 'uppercase', letterSpacing: '0.15em'
            }}>Partner Portal</button>
          )}
        </div>

        {/* Simplified Mobile Header Actions */}
        <div className="mob-only" style={{ display: 'flex', alignItems: 'center', gap: 20, zIndex: 1001 }}>
          <button onClick={() => { setMenuOpen(false); onPortal('client'); }} className="lxf" style={{ 
            padding: '8px 16px', fontSize: 9, fontWeight: 800, background: (isDarkText ? '#1A1410' : '#ffffff'), 
            color: (isDarkText ? '#ffffff' : '#121212'), border: 'none', borderRadius: 100, 
            textTransform: 'uppercase', letterSpacing: '0.1em'
          }}>Portal</button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 24, height: 1.5, background: isDarkText ? '#121212' : '#ffffff', transition: '0.3s', transform: menuOpen ? 'rotate(45deg)' : 'none' }}>
              <div style={{ position: 'absolute', top: menuOpen ? 0 : -8, left: 0, width: 24, height: 1.5, background: 'inherit', transition: '0.3s', opacity: menuOpen ? 0 : 1 }} />
              <div style={{ position: 'absolute', top: menuOpen ? 0 : 8, left: 0, width: 24, height: 1.5, background: 'inherit', transition: '0.3s', transform: menuOpen ? 'rotate(-90deg)' : 'none' }} />
            </div>
          </button>
        </div>

        {/* Full-Screen Iron-Clad Frosted Glass Overlay */}
        <div 
          className="pub-drawer"
          style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, left: 0,
            width: '100vw', height: '100vh', minHeight: '100vh',
            background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.92) 100%)',
            backdropFilter: 'blur(80px) saturate(210%) brightness(1.05)',
            WebkitBackdropFilter: 'blur(80px) saturate(210%) brightness(1.05)',
            zIndex: 5000, 
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          <div style={{ position: 'absolute', top: 44, right: 40 }} onClick={() => setMenuOpen(false)}>
            <div style={{ padding: 12, borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={32} style={{ color: '#121212', cursor: 'pointer' }} />
            </div>
          </div>
          
          <div className="lxf eyebrow" style={{ color: ac, marginBottom: 48, fontSize: 10, letterSpacing: '.3em', fontWeight: 800 }}>MAPPING THE HUB</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {links.map((l, i) => {
              const isActive = activePage === l.id;
              return (
                <button 
                  key={l.id} 
                  onClick={() => { setPage(l.id); setMenuOpen(false); }} 
                  className="lxfh fade-in" 
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', 
                    fontSize: 36, letterSpacing: '-0.02em',
                    color: isActive ? ac : '#121212', 
                    fontWeight: isActive ? 700 : 300, 
                    textAlign: 'left', padding: 0,
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'none' : 'translateY(20px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.05}s`
                  }}
                >
                  {l.n}
                  {isActive && <div style={{ width: 44, height: 4, background: ac, marginTop: 8, borderRadius: 2 }} />}
                </button>
              );
            })}
          </div>
          
          <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: 48 }}>
            <div className="lxf" style={{ fontSize: 9, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '.2em', marginBottom: 16, fontWeight: 700 }}>Direct Terminal Access</div>
            <div className="lxfh" style={{ fontSize: 24, color: '#121212', fontWeight: 300, marginBottom: 32 }}>{brand.phone}</div>
            <button 
              onClick={() => { setMenuOpen(false); onPortal('client'); }} 
              className="p-btn-dark"
              style={{ width: '100%', padding: '18px', borderRadius: 14, fontSize: 13, fontWeight: 800, background: '#1A1410' }}
            >
              Enter Partner Portal
            </button>
          </div>
        </div>

        {/* Backdrop (High-Contrast for glass isolation) */}
        {menuOpen && (
          <div 
            onClick={() => setMenuOpen(false)} 
            className="fade-in"
            style={{ 
              position: 'fixed', inset: 0, 
              background: 'rgba(18, 18, 18, 0.25)', 
              backdropFilter: 'blur(15px)', 
              zIndex: 4999 
            }} 
          />
        )}
      </div>
    </nav>
  );
}

export function PubBottomNav({ activePage, setPage, brand }) {
  const ac = brand.color || '#B08D57';
  const items = [
    { n: 'Home', id: 'home', i: <Home size={20} /> },
    { n: 'Services', id: 'services', i: <Layout size={20} /> },
    { n: 'Portfolio', id: 'portfolio', i: <Layers size={20} /> },
    { n: 'Marketplace', id: 'marketplace', i: <Package size={20} /> },
    { n: 'Contact', id: 'contact', i: <Mail size={20} /> }
  ];

  return (
    <div className="pub-bottom-nav mob-only" style={{ overflowX: 'auto', flexWrap: 'nowrap', justifyContent: 'flex-start', WebkitOverflowScrolling: 'touch', paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}>
      {items.map(m => (
        <button 
          key={m.id} 
          onClick={() => setPage(m.id)} 
          className={`pub-bottom-item ${activePage === m.id ? 'active' : ''}`}
          style={{ minWidth: 80, flexShrink: 0 }}
        >
          <div className="pub-bottom-indicator" />
          {m.i}
          <span>{m.n}</span>
        </button>
      ))}
    </div>
  );
}

export function Footer({ brand, setPage, onPortal }) {
  const ac = brand.color || '#B08D57';
  return (
    <footer style={{ background: '#121212', color: '#ffffff', padding: '100px 24px 60px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 60, marginBottom: 80 }}>
          <div>
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} style={{ height: 40, objectFit: 'contain', marginBottom: 20 }} />
            ) : (
              <div className="lxfh" style={{ fontSize: 32, fontWeight: 700, marginBottom: 20 }}>{brand.name || 'GLASSTECH'}<span style={{ color: ac }}>.</span></div>
            )}
            <p className="lxf" style={{ color: '#999', lineHeight: 1.8, fontSize: 15 }}>Complete Interior & Finishing solutions for high-end residential and commercial developments. Industrial precision meets architectural luxury.</p>
          </div>
          <div>
            <div className="eyebrow lxf" style={{ color: '#fff', marginBottom: 24 }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Home', 'Services', 'Portfolio', 'Marketplace', 'About', 'Contact'].map(n => (
                <button key={n} onClick={() => setPage(n.toLowerCase())} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>{n}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow lxf" style={{ color: '#fff', marginBottom: 24 }}>Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Interior Design', 'Kitchen Installations', 'Wardrobes', 'Tiling & Flooring', 'Technical Systems', 'Glass & Aluminum'].map(n => (
                <div key={n} style={{ color: '#999', fontSize: 14 }}>{n}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow lxf" style={{ color: '#fff', marginBottom: 24 }}>Contact</div>
            <div style={{ color: '#999', fontSize: 14, lineHeight: 1.8 }}>
              Towers of Africa, Suite 402<br />Accra, Ghana<br /><br />
              +233 24 555 0000<br />
              hello@glasstech.com
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div className="lxf" style={{ fontSize: 12, color: '#666' }}>© 2026 Glasstech Fabrications Ltd. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {['Instagram', 'LinkedIn', 'Behance'].map(s => <div key={s} style={{ fontSize: 12, color: '#666', cursor: 'pointer' }}>{s}</div>)}
            {onPortal && <button onClick={() => onPortal('admin')} style={{ background: 'none', border: 'none', color: '#1A1410', opacity: 0.1, fontSize: 10, cursor: 'pointer', marginLeft: 20 }} className="lxf">Staff Terminal Entry</button>}
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- SUB PAGES ---

export function Hero({ slides, brand, setPage }) {
  const [active, setActive] = useState(0);
  const ac = brand.color || '#C8A96E';

  useEffect(() => {
    const int = setInterval(() => setActive(s => (s + 1) % (slides.length || 1)), 10000);
    return () => clearInterval(int);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <section style={{ height: '100vh', minHeight: 700, position: 'relative', background: '#0D0B09', overflow: 'hidden' }}>
      {slides.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0, transition: 'opacity 2s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: active === i ? 1 : 0, zIndex: active === i ? 1 : 0
        }}>
          <img src={s.img} alt="" style={{ 
            width: '100%', height: '100%', objectFit: 'cover', 
            opacity: 0.85, 
            transform: active === i ? 'scale(1.1)' : 'scale(1)', 
            transition: 'transform 10s ease-out' 
          }} />
          <div style={{
            position: 'absolute', inset: 0, 
            background: 'linear-gradient(to bottom, rgba(13,11,9,0.1) 0%, rgba(13,11,9,0.6) 100%)',
            display: 'flex', alignItems: 'center', padding: '0 5vw'
          }}>
            <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto' }}>
              <div className="eyebrow lxf afu d1" style={{ color: ac, marginBottom: 24, fontSize: 12, letterSpacing: '0.4em', fontWeight: 800 }}>ESTABLISHED PRECISION</div>
              <h1 className="lxfh afu d2" style={{ 
                fontSize: 'clamp(48px, 10vw, 120px)', 
                color: '#fff', 
                fontWeight: 300, 
                lineHeight: 0.9, 
                marginBottom: 48, 
                maxWidth: 1100,
                letterSpacing: '-0.04em'
              }}>
                {s.title.split(' ').map((w, j) => (
                  <span key={j} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                    {j === 1 ? <em style={{ fontStyle: 'italic', color: ac, fontWeight: 400 }}>{w}</em> : w}
                  </span>
                ))}
              </h1>
              <div className="afu d3" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <button onClick={() => setPage('marketplace')} className="p-btn-dark lxf" style={{ padding: '20px 48px', fontSize: 13, background: '#fff', color: '#0D0B09', borderRadius: 16 }}>Explore Marketplace</button>
                <button onClick={() => setPage('contact')} className="lxf glass-panel" style={{ padding: '20px 48px', color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Project Consultation</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Decorative Slide Progress Indicators */}
      <div style={{ position: 'absolute', bottom: 60, left: '5vw', display: 'flex', gap: 16, zIndex: 10 }}>
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setActive(i)} 
            style={{ 
              width: 60, height: 4, 
              background: active === i ? ac : 'rgba(255,255,255,0.2)', 
              border: 'none', borderRadius: 10, cursor: 'pointer', 
              transition: 'all 0.6s' 
            }} 
          />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 60, right: '5vw', zIndex: 10 }} className="dt-only">
         <div style={{ display: 'flex', gap: 20 }}>
            <button onClick={() => setActive(s => (s - 1 + slides.length) % slides.length)} className="glass-panel" style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
               <ChevronLeft size={24} />
            </button>
            <button onClick={() => setActive(s => (s + 1) % slides.length)} className="glass-panel" style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
               <ChevronRight size={24} />
            </button>
         </div>
      </div>
    </section>
  );
}

export function ServicesPreview({ brand, setPage }) {
  const ac = brand.color || '#C8A96E';
  const services = [
    { n: 'Interior Design', i: <Palette size={32} />, d: 'Full space planning and aesthetic curation.' },
    { n: 'Kitchen Setup', i: <Layout size={32} />, d: 'Custom cabinetry and high-end installations.' },
    { n: 'Wardrobes', i: <Home size={32} />, d: 'Bespoke storage solutions for modern living.' },
    { n: 'Finishings', i: <Layers size={32} />, d: 'Expert tiling, flooring, and ceiling works.' },
    { n: 'Technical', i: <Zap size={32} />, d: 'Professional plumbing and electrical systems.' },
    { n: 'Glass Systems', i: <Droplet size={32} />, d: 'Structural glass and aluminum engineering.' }
  ];
  return (
    <section style={{ padding: '160px 5vw', background: 'transparent', position: 'relative' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'left', marginBottom: 100 }}>
          <div className="eyebrow lxf afu d1" style={{ marginBottom: 24 }}>CORE CAPABILITIES</div>
          <h2 className="lxfh afu d2" style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: '#1A1410', lineHeight: 1, letterSpacing: '-0.04em' }}>
            Comprehensive <em style={{ fontStyle: 'italic', color: ac, fontWeight: 400 }}>Interior</em> Finishing.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 32 }}>
          {services.map((s, i) => (
            <div key={i} className="p-card rev d1" style={{ padding: '80px 48px', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.6)' }}>
              <div style={{ color: ac, marginBottom: 40, width: 64, height: 64, borderRadius: 20, background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.i}</div>
              <h3 className="lxfh" style={{ fontSize: 28, marginBottom: 20, letterSpacing: '-0.02em' }}>{s.n}</h3>
              <p className="lxf" style={{ fontSize: 16, color: '#6A635C', lineHeight: 1.8, marginBottom: 40 }}>{s.d}</p>
              <button onClick={() => setPage('services')} style={{ border: 'none', background: 'none', color: ac, fontWeight: 800, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                Learn more <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage({ brand, setPage, content }) {
  const slides = content.hero.slides || [];
  
  useEffect(() => {
    const ob = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in', e.isIntersecting)), { threshold: .08 });
    setTimeout(() => document.querySelectorAll('.rev').forEach(el => ob.observe(el)), 200);
    return () => ob.disconnect();
  }, []);

  return (
    <div className="pub-page" style={{ background: 'transparent' }}>
      <Hero slides={slides} brand={brand} setPage={setPage} />
      
      <section style={{ background: '#0D0B09', padding: '0 5vw' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {[['250+', 'Projects Delivered'], ['8', 'Years Experience'], ['15', 'Finishing Specialists'], ['$12M+', 'Ecosystem Value']].map(([n, l], i) => (
            <div key={l} style={{ flex: 1, minWidth: 200, textAlign: 'left', padding: '80px 40px', borderRight: (i < 3) ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div className="lxfh" style={{ fontSize: 64, color: brand.color || '#C8A96E', fontWeight: 300, letterSpacing: '-0.04em' }}>{n}</div>
              <div className="lxf" style={{ fontSize: 12, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(249,247,244,0.4)', marginTop: 12, fontWeight: 700 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <ServicesPreview brand={brand} setPage={setPage} />

      <section style={{ padding: '160px 5vw', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'left' }}>
          <div className="eyebrow lxf afu d1" style={{ marginBottom: 32 }}>ABOUT THE HUB</div>
          <h2 className="lxfh afu d2" style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: '#1A1410', lineHeight: 1, marginBottom: 48, letterSpacing: '-0.04em' }}>
            From Structural Glass to <em style={{ fontStyle: 'italic', color: brand.color || '#C8A96E', fontWeight: 400 }}>Full Interior</em> Finishing.
          </h2>
          <p className="lxf afu d3" style={{ fontSize: 20, color: '#6A635C', maxWidth: 900, margin: '0 0 64px', lineHeight: 1.8 }}>
            Our evolution from structural specialists to a full-service interior finishing powerhouse means we handle every technical and aesthetic detail of your project. We bring industrial precision to every kitchen, washroom, and retail fit-out we curate.
          </p>
          <button onClick={() => setPage('about')} className="p-btn-dark lxf afu d4" style={{ padding: '24px 64px', borderRadius: 16, fontSize: 14 }}>Explore Our Full Story</button>
        </div>
      </section>

      {/* NEW: TECHNICAL EXCELLENCE SECTION */}
      <section style={{ padding: '160px 5vw', background: '#0D0B09', color: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
            <div>
              <div className="eyebrow lxf" style={{ color: brand.color || '#C8A96E', marginBottom: 24 }}>TECHNICAL EXCELLENCE</div>
              <h2 className="lxfh" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1.1, marginBottom: 40, letterSpacing: '-0.04em' }}>
                Engineering <em style={{ fontStyle: 'italic', color: brand.color || '#C8A96E', fontWeight: 400 }}>Precision</em> in Every Detail.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {[
                  { t: 'High-Performance Glazing', d: 'Our structural glass systems meet global safety standards with superior thermal and acoustic insulation.' },
                  { t: 'Robotic Fabrication', d: 'Precision CNC cutting and automated assembly ensure sub-millimeter accuracy for every aluminum profile.' },
                  { t: 'Architectural Integration', d: 'We work closely with leading architects to integrate complex systems into seamless design visions.' }
                ].map((f, i) => (
                  <div key={i} className="rev in d1" style={{ display: 'flex', gap: 20 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={20} color={brand.color || '#C8A96E'} />
                    </div>
                    <div>
                      <div className="lxfh" style={{ fontSize: 20, marginBottom: 8 }}>{f.t}</div>
                      <p className="lxf" style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rev in d3" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -40, background: brand.color || '#C8A96E', opacity: 0.1, borderRadius: '50%', filter: 'blur(100px)' }} />
              <img src="https://images.unsplash.com/photo-1581094380920-0966f38fe841?w=1200&q=80" style={{ width: '100%', height: 600, objectFit: 'cover', borderRadius: 32, position: 'relative', zIndex: 1 }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ServicesPage({ brand, setPage, content }) {
  const ac = brand.color || '#C8A96E';
  const services = [
    { title: 'Interior Design & Planning', icon: <Palette size={40} />, desc: 'Concept development, spatial planning, and aesthetic curation for luxury interiors.', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
    { title: 'Kitchen Installation', icon: <Layout size={40} />, desc: 'Bespoke cabinetry, smart appliances, and premium ergonomic designs.', img: 'https://images.unsplash.com/photo-1556911223-e1534ff6f755?w=800&q=80' },
    { title: 'Wardrobes & Storage', icon: <Home size={40} />, desc: 'Custom walk-in closets and integrated storage solutions for optimized living.', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80' },
    { title: 'Washroom Finishing', icon: <Droplet size={40} />, desc: 'Luxury sanitary installations, expert waterproofing, and premium tiling.', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80' },
    { title: 'Tiling & Flooring', icon: <Layers size={40} />, desc: 'Precision porcelain, marble, and hardwood installations for high-traffic zones.', img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80' },
    { title: 'Ceiling & Lighting', icon: <Zap size={40} />, desc: 'Suspended ceilings, recessed lighting, and integrated home automation.', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80' },
    { title: 'Plumbing & Electrical', icon: <Settings size={40} />, desc: 'Industrial-grade MEP engineering for reliable residential and commercial infrastructure.', img: 'https://images.unsplash.com/photo-1581094380920-0966f38fe841?w=800&q=80' },
    { title: 'Glass & Aluminum Works', icon: <Hammer size={40} />, desc: 'Curtain walls, minimalist windows, and structural glass partitions.', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' }
  ];

  return (
    <div className="pub-page" style={{ background: 'transparent', paddingTop: 100 }}>
      <section style={{ padding: '120px 5vw', background: '#0D0B09' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="eyebrow lxf afu d1" style={{ color: ac, marginBottom: 24, fontWeight: 800 }}>OUR CAPABILITIES</div>
          <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(48px, 8vw, 100px)', color: '#fff', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
            Complete Interior <em style={{ fontStyle: 'italic', color: ac, fontWeight: 400 }}>Solutions</em>
          </h1>
        </div>
      </section>

      <section style={{ padding: '100px 5vw' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: 48 }}>
            {services.map((s, i) => (
              <div key={i} className="p-card magnetic-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 32, overflow: 'hidden' }}>
                <div style={{ height: '100%', minHeight: 450 }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ color: ac, marginBottom: 32, width: 64, height: 64, borderRadius: 20, background: '#F9F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                  <h3 className="lxfh" style={{ fontSize: 32, marginBottom: 20, letterSpacing: '-0.02em' }}>{s.title}</h3>
                  <p className="lxf" style={{ fontSize: 16, color: '#6A635C', lineHeight: 1.8, marginBottom: 40 }}>{s.desc}</p>
                  <button onClick={() => setPage('contact')} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '16px 32px', borderRadius: 14 }}>Request Consultation</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function PortfolioPage({ brand, setPage, content }) {
  const ac = brand.color || '#C8A96E';
  const portfolio = content.portfolio || [];
  const cats = ['All', ...new Set(portfolio.map(p => p.cat).filter(Boolean))];
  const [filter, setFilter] = useState('All');

  const shown = filter === 'All' ? portfolio : portfolio.filter(p => p.cat === filter);

  return (
    <div className="pub-page" style={{ background: 'transparent', paddingTop: 100 }}>
      <section style={{ padding: '120px 5vw', background: '#0D0B09' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="eyebrow lxf afu d1" style={{ color: ac, marginBottom: 24, fontWeight: 800 }}>CRAFTED LEGACY</div>
          <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(48px, 8vw, 100px)', color: '#fff', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
            Explore Our <em style={{ fontStyle: 'italic', color: ac, fontWeight: 400 }}>Works</em>
          </h1>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 56 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} className="lxf glass-panel" style={{
                padding: '12px 24px', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase',
                background: filter === c ? ac : 'rgba(255,255,255,0.05)',
                color: filter === c ? '#1A1410' : '#fff', border: 'none', cursor: 'pointer',
                transition: '0.4s', fontWeight: 800, borderRadius: 12
              }}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 5vw' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <div className="pub-project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: 48 }}>
            {shown.map((p, i) => (
              <div key={p.id} className="magnetic-card rev d1" onClick={() => setPage(`project-${p.id}`)} style={{ cursor: 'pointer' }}>
                <div style={{ height: 540, overflow: 'hidden', marginBottom: 32, borderRadius: 32, position: 'relative' }} className="hover-img">
                  <img src={p.after} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="hover-scale" />
                  <div style={{ position: 'absolute', top: 32, left: 32, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', color: '#1A1410', padding: '10px 20px', fontSize: 10, fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', borderRadius: 100 }}>{p.cat}</div>
                </div>
                <h3 className="lxfh" style={{ fontSize: 32, marginBottom: 12, letterSpacing: '-0.02em' }}>{p.title}</h3>
                <div className="lxf" style={{ color: '#7A6E62', fontSize: 15, fontWeight: 600 }}>{p.loc} · {p.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProjectDetailPage({ projectId, brand, setPage, content }) {
  const ac = brand.color || '#B08D57';
  const portfolio = content.portfolio || [];
  const p = portfolio.find(x => x.id === parseInt(projectId));
  if (!p) return <div style={{ color: '#888', padding: 80, textAlign: 'center', paddingTop: 180 }}>Project not found</div>;

  return (
    <div className="pub-page" style={{ background: '#FDFCFB', paddingTop: 90 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 24px' }}>
        <button onClick={() => setPage('portfolio')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, padding: 0 }} className="hover-ac">
          <ArrowLeft size={16} /> Back to Portfolio
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: 12 }}>
              {p.hasBA ? <BA before={p.before} after={p.after} h={600} /> : <div style={{ height: 600, overflow: 'hidden', borderRadius: 2 }}><img src={p.after} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
              {p.imgs && p.imgs.map((img, i) => (
                <div key={i} style={{ height: 160, overflow: 'hidden', borderRadius: 2 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'sticky', top: 120 }}>
            <div className="eyebrow lxf" style={{ color: ac, marginBottom: 12 }}>{p.cat} · {p.year}</div>
            <h1 className="lxfh" style={{ fontSize: 'clamp(40px, 4vw, 64px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 32 }}>{p.title}</h1>
            <p className="lxf" style={{ fontSize: 17, color: '#4A4A4A', lineHeight: 1.85, marginBottom: 48 }}>{p.desc}</p>
            <div style={{ marginBottom: 48 }}>
              {[['Location', p.loc], ['Type', p.type], ['Scope', p.scope], ['Status', 'Completed']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="lxf" style={{ color: '#999', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 11, fontWeight: 600 }}>{k}</span>
                  <span className="lxf" style={{ fontWeight: 500, color: '#121212', fontSize: 14 }}>{v}</span>
                </div>
              ))}
            </div>
            <button className="pub-btn-dark lxf" onClick={() => setPage('contact')} style={{ width: '100%', padding: '20px' }}>Inquire for Similar Project</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketplaceInquiryModal({ product, onClose, onSubmit, brand }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ quantity: 1, destination: '', timeline: 'Standard', name: '', email: '', phone: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const ac = brand.color || '#C8A96E';

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit({ ...data, productId: product.id, productName: product.name });
    setLoading(false);
    setStep(4);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,11,9,0.8)', backdropFilter: 'blur(8px)' }} onClick={onClose} />
      <div className="fade-in" style={{ position: 'relative', width: '100%', maxWidth: 600, background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 32px 64px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '32px 40px', background: '#F9F7F4', borderBottom: '1px solid #F0EBE5', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="lxf" style={{ fontSize: 10, color: ac, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 8 }}>{product.status === 'Pre-order' ? 'Pre-order Request' : 'Availability Inquiry'}</div>
            <h3 className="lxfh" style={{ fontSize: 24, color: '#1A1410', marginBottom: 8 }}>{product.name}</h3>
            <div className="lxf" style={{ fontSize: 13, color: '#666' }}>FOB: {product.fobPrice} | Landed: {product.landedCost}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B5AFA9', padding: 4 }}><X size={20} /></button>
        </div>

        {/* Body */}
        <div style={{ padding: 40 }}>
          {step === 1 && (
            <div className="fade-in">
              <h4 className="lxfh" style={{ fontSize: 18, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}><Package size={18} color={ac} /> 1. Configuration</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label className="lxf" style={{ fontSize: 12, fontWeight: 600, color: '#1A1410', marginBottom: 8, display: 'block' }}>Required Quantity</label>
                  <input type="number" min="1" className="pub-inp" style={{ width: '100%', padding: 16, borderRadius: 12, background: '#FDFCFB' }} value={data.quantity} onChange={e => setData({...data, quantity: e.target.value})} />
                </div>
                <div>
                  <label className="lxf" style={{ fontSize: 12, fontWeight: 600, color: '#1A1410', marginBottom: 8, display: 'block' }}>Special Specifications or Notes</label>
                  <textarea className="pub-inp" rows={3} style={{ width: '100%', padding: 16, borderRadius: 12, background: '#FDFCFB' }} placeholder="e.g. Specific dimensions, tint color..." value={data.notes} onChange={e => setData({...data, notes: e.target.value})} />
                </div>
                <button onClick={() => setStep(2)} className="pub-btn-dark lxf" style={{ width: '100%', padding: 18, borderRadius: 12, marginTop: 12 }}>Continue to Logistics</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in">
              <h4 className="lxfh" style={{ fontSize: 18, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}><Truck size={18} color={ac} /> 2. Logistics</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label className="lxf" style={{ fontSize: 12, fontWeight: 600, color: '#1A1410', marginBottom: 8, display: 'block' }}>Shipping Destination (Port or Site)</label>
                  <input type="text" placeholder="e.g. Tema Port, Ghana" className="pub-inp" style={{ width: '100%', padding: 16, borderRadius: 12, background: '#FDFCFB' }} value={data.destination} onChange={e => setData({...data, destination: e.target.value})} />
                </div>
                <div>
                  <label className="lxf" style={{ fontSize: 12, fontWeight: 600, color: '#1A1410', marginBottom: 8, display: 'block' }}>Required Timeline</label>
                  <select className="pub-inp" style={{ width: '100%', padding: 16, borderRadius: 12, background: '#FDFCFB' }} value={data.timeline} onChange={e => setData({...data, timeline: e.target.value})}>
                    <option value="Standard">Standard (8-12 weeks)</option>
                    <option value="Expedited">Expedited (4-6 weeks) - Requires Premium</option>
                    <option value="Flexible">Flexible / Stocking Order</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                  <button onClick={() => setStep(1)} className="pub-btn-outline lxf" style={{ flex: 1, padding: 18, borderRadius: 12, border: '1px solid #E5E5E5', color: '#1A1410' }}>Back</button>
                  <button onClick={() => setStep(3)} className="pub-btn-dark lxf" style={{ flex: 2, padding: 18, borderRadius: 12 }} disabled={!data.destination}>Continue to Contact</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in">
              <h4 className="lxfh" style={{ fontSize: 18, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}><Building size={18} color={ac} /> 3. Contact Details</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <input type="text" placeholder="Full Name / Company" className="pub-inp" style={{ width: '100%', padding: 16, borderRadius: 12, background: '#FDFCFB' }} value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                <input type="email" placeholder="Business Email" className="pub-inp" style={{ width: '100%', padding: 16, borderRadius: 12, background: '#FDFCFB' }} value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                <input type="tel" placeholder="Phone Number" className="pub-inp" style={{ width: '100%', padding: 16, borderRadius: 12, background: '#FDFCFB' }} value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
                
                <div style={{ padding: 16, background: '#F9F7F4', borderRadius: 8, fontSize: 11, color: '#6A635C', lineHeight: 1.6, marginTop: 8 }}>
                  <strong>Note:</strong> Due to fluctuating international freight and material costs, you are not committing to a purchase. A dedicated account manager will follow up with a finalized proforma invoice factoring in current rates.
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                  <button onClick={() => setStep(2)} className="pub-btn-outline lxf" style={{ flex: 1, padding: 18, borderRadius: 12, border: '1px solid #E5E5E5', color: '#1A1410' }}>Back</button>
                  <button onClick={handleSubmit} className="pub-btn-dark lxf" style={{ flex: 2, padding: 18, borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }} disabled={!data.name || !data.email || loading}>
                    {loading ? <Spinner /> : <><Send size={16} /> Submit Inquiry</>}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#059669', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <CheckCircle size={32} />
              </div>
              <h4 className="lxfh" style={{ fontSize: 24, marginBottom: 12 }}>Inquiry Received</h4>
              <p className="lxf" style={{ fontSize: 15, color: '#6A635C', lineHeight: 1.6, marginBottom: 32 }}>Your request has been routed to our procurement desk. An account manager will contact you within 24 hours with a finalized quote.</p>
              <button onClick={onClose} className="pub-btn-dark lxf" style={{ width: '100%', padding: 18, borderRadius: 12 }}>Close Window</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CatalogPage({ brand, setPage, content, submitMarketplaceInquiry }) {
  const ac = brand.color || '#C8A96E';
  const products = content.products || [];
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cats = ['All', ...new Set(products.map(p => p.cat).filter(Boolean))];
  const shown = filter === 'All' ? products : products.filter(p => p.cat === filter);

  return (
    <div className="pub-page" style={{ background: '#F9F7F4', paddingTop: 90, minHeight: '100vh' }}>
      <section style={{ padding: '100px 5vw', background: '#0D0B09', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '50vw', height: '50vw', background: `radial-gradient(circle, ${ac}20 0%, transparent 70%)`, filter: 'blur(80px)' }} />
        <div style={{ maxWidth: 1600, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="eyebrow lxf afu d1" style={{ color: ac, marginBottom: 24, letterSpacing: '0.4em' }}>EXCLUSIVE MARKETPLACE</div>
          <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(48px, 8vw, 120px)', color: '#fff', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
            Industrial & <em style={{ fontStyle: 'italic', color: ac, fontWeight: 400 }}>Structural</em> Assets
          </h1>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 64 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} className="lxf glass-panel" style={{
                padding: '12px 24px', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase',
                background: filter === c ? ac : 'rgba(255,255,255,0.05)',
                color: filter === c ? '#1A1410' : '#fff', border: 'none', cursor: 'pointer',
                transition: 'all 0.4s ease', fontWeight: 800, borderRadius: 12
              }}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 5vw' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 48 }}>
            {shown.map((p, i) => (
              <div key={p.id} className="magnetic-card rev d1" style={{ 
                background: '#fff', 
                borderRadius: 24, 
                overflow: 'hidden',
                boxShadow: '0 24px 48px -12px rgba(26,20,16,0.05)',
                display: 'flex', 
                flexDirection: 'column',
                border: '1px solid rgba(0,0,0,0.03)'
              }}>
                <div style={{ height: 320, background: '#F5F2EE', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                  {p.img ? <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} className="hover-scale" /> : <Package size={64} color="#DCD7D1" />}
                  
                  {/* Availability Badge */}
                  <div style={{ 
                    position: 'absolute', top: 24, right: 24, 
                    background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
                    padding: '8px 16px', borderRadius: 100,
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ 
                      width: 8, height: 8, borderRadius: '50%', 
                      background: p.status === 'Pre-order' ? '#D97706' : '#059669',
                      boxShadow: `0 0 8px ${p.status === 'Pre-order' ? '#D97706' : '#059669'}`
                    }} className={p.status === 'Pre-order' ? '' : 'pulse'} />
                    {p.status || 'Available'}
                  </div>
                  
                  {/* Category Label */}
                  <div style={{ position: 'absolute', top: 24, left: 24, color: '#1A1410', fontSize: 10, fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', opacity: 0.5 }}>
                    {p.cat}
                  </div>
                </div>
                
                <div style={{ padding: 40, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 className="lxfh" style={{ fontSize: 28, marginBottom: 12, letterSpacing: '-0.02em', color: '#1A1410' }}>{p.name}</h3>
                  <p className="lxf" style={{ fontSize: 15, color: '#6A635C', lineHeight: 1.7, marginBottom: 32 }}>{p.desc}</p>
                  
                  {/* Pricing Matrix */}
                  <div style={{ 
                    background: '#F9F7F4', borderRadius: 16, padding: 24, marginBottom: 32,
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, border: '1px solid #F0EBE5'
                  }}>
                    <div>
                      <div className="lxf" style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: 4 }}>FOB Price</div>
                      <div className="lxfh" style={{ fontSize: 24, color: '#1A1410' }}>{p.fobPrice || 'POA'}</div>
                    </div>
                    <div>
                      <div className="lxf" style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: 4 }}>Landed Cost</div>
                      <div className="lxfh" style={{ fontSize: 24, color: ac }}>{p.landedCost || 'POA'}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: 12 }}>
                    <button onClick={() => setSelectedProduct(p)} className="pub-btn-dark lxf" style={{ flex: 2, padding: '18px', fontSize: 13, borderRadius: 12 }}>
                      {p.status === 'Pre-order' ? 'Request Pre-order' : 'Inquire Availability'}
                    </button>
                    <button onClick={() => alert(`Downloading Technical Specs for ${p.name}`)} className="lxf" style={{ flex: 1, padding: '18px', fontSize: 13, borderRadius: 12, border: '1px solid #E5E5E5', background: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                      Specs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {shown.length === 0 && <div style={{ textAlign: 'center', padding: 120, color: '#B5AFA9', fontSize: 16, letterSpacing: '.1em', textTransform: 'uppercase' }}>No assets found in this category.</div>}
        </div>
      </section>
      
      {selectedProduct && (
        <MarketplaceInquiryModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onSubmit={submitMarketplaceInquiry}
          brand={brand}
        />
      )}
    </div>
  );
}

export function AboutPage({ brand, content }) {
  const ac = brand.color || '#B08D57';
  const about = content.about || {};
  return (
    <div className="pub-page" style={{ background: '#FDFCFB', paddingTop: 90 }}>
      <section style={{ padding: '80px 24px', background: '#121212' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="eyebrow lxf afu d1" style={{ color: ac, marginBottom: 20 }}>About Us</div>
          <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(48px, 6vw, 96px)', color: '#fff', fontWeight: 300, lineHeight: 1.1 }}>{about.storyTitle || 'Our Story'}</h1>
        </div>
      </section>
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 80, alignItems: 'center' }} className="pub-service-grid">
          <div>
            <h2 className="lxfh" style={{ fontSize: 48, marginBottom: 32 }}>Industrial Precision meets Architectural Luxury.</h2>
            <p className="lxf" style={{ fontSize: 18, color: '#4A4A4A', lineHeight: 1.8, marginBottom: 24 }}>{about.story}</p>
            <p className="lxf" style={{ fontSize: 18, color: '#4A4A4A', lineHeight: 1.8 }}>{about.bio}</p>
            <div style={{ marginTop: 40, borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 40, display: 'flex', gap: 24, alignItems: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: ac, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 'bold' }}>{about.founder?.[0] || 'A'}</div>
              <div>
                <div className="lxfh" style={{ fontSize: 24 }}>{about.founder}</div>
                <div className="lxf" style={{ color: '#666' }}>{about.role}</div>
              </div>
            </div>
          </div>
          <div><img src={about.image} alt="About Us" style={{ width: '100%', height: 'auto', borderRadius: 4 }} /></div>
        </div>
      </section>
    </div>
  );
}

export function ContactPage({ brand }) {
  const ac = brand.color || '#B08D57';
  return (
    <div className="pub-page" style={{ background: '#FDFCFB', paddingTop: 90 }}>
      <section style={{ padding: '80px 24px', background: '#121212' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="eyebrow lxf afu d1" style={{ color: ac, marginBottom: 20 }}>Contact Us</div>
          <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(48px, 6vw, 96px)', color: '#fff', fontWeight: 300, lineHeight: 1.1 }}>Let's talk about your <em style={{ fontStyle: 'italic', color: ac }}>Project</em>.</h1>
        </div>
      </section>
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 80 }}>
          <div>
            <h2 className="lxfh" style={{ fontSize: 40, marginBottom: 40 }}>Get in Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <div className="eyebrow lxf" style={{ color: '#666', marginBottom: 8 }}>Ghana Office</div>
                <div className="lxf" style={{ fontSize: 18, color: '#121212' }}>{brand.location}</div>
              </div>
              <div>
                <div className="eyebrow lxf" style={{ color: '#666', marginBottom: 8 }}>Phone</div>
                <div className="lxf" style={{ fontSize: 18, color: '#121212' }}>{brand.phone}</div>
              </div>
              <div>
                <div className="eyebrow lxf" style={{ color: '#666', marginBottom: 8 }}>Email</div>
                <div className="lxf" style={{ fontSize: 18, color: '#121212' }}>{brand.email}</div>
              </div>
            </div>
          </div>
          <div style={{ background: '#fff', padding: 48, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 4 }}>
            <h3 className="lxfh" style={{ fontSize: 24, marginBottom: 32 }}>Send a Message</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <input type="text" placeholder="Your Name" className="pub-inp" style={{ padding: '16px', borderRadius: 4 }} />
              <input type="email" placeholder="Email Address" className="pub-inp" style={{ padding: '16px', borderRadius: 4 }} />
              <textarea placeholder="Tell us about your project" className="pub-inp" rows={5} style={{ padding: '16px', borderRadius: 4, resize: 'vertical' }}></textarea>
              <button className="pub-btn-dark lxf" style={{ padding: '18px', fontSize: 14 }}>Send Inquiry</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PublicSite({ brand, setPage, page, onPortal, user, content, ...props }) {
  const p = page || 'home';
  const [menuOpen, setMenuOpen] = useState(false);
  const ac = brand.color || '#B08D57';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [p]);

  const render = () => {
    if (p === 'home') return <HomePage brand={brand} setPage={setPage} content={content} />;
    if (p === 'services') return <ServicesPage brand={brand} setPage={setPage} content={content} />;
    if (p === 'portfolio') return <PortfolioPage brand={brand} setPage={setPage} content={content} />;
    if (p === 'catalog' || p === 'marketplace') return <CatalogPage brand={brand} setPage={setPage} content={content} submitMarketplaceInquiry={props.submitMarketplaceInquiry} />;
    if (p === 'about') return <AboutPage brand={brand} content={content} />;
    if (p === 'contact') return <ContactPage brand={brand} />;
    if (p.startsWith('project-')) return <ProjectDetailPage projectId={p.split('-')[1]} brand={brand} setPage={setPage} content={content} />;
    return <div style={{ paddingTop: 200, textAlign: 'center' }}>Coming Soon: {p}</div>;
  };

  return (
    <div style={{ background: '#FDFCFB' }}>
      <PubNav brand={brand} setPage={setPage} activePage={p} onPortal={onPortal} user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {render()}
      {!menuOpen && <PubBottomNav brand={brand} setPage={setPage} activePage={p} />}
      <Footer brand={brand} setPage={setPage} onPortal={onPortal} />
    </div>
  );
}
