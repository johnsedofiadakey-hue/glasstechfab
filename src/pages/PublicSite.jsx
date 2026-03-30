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
  Palette
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

export function PubNav({ brand, setPage, activePage, onPortal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    { n: 'About', id: 'about' },
    { n: 'Contact', id: 'contact' }
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled || menuOpen ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 20, 16, 0.35)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderBottom: scrolled || menuOpen ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      height: scrolled ? 72 : 90, display: 'flex', alignItems: 'center',
      padding: '0 24px'
    }}>
      <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div onClick={() => setPage('home')} style={{ cursor: 'pointer', zIndex: 1001 }}>
          <div className="lxfh" style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: scrolled || menuOpen ? '#121212' : '#ffffff' }}>
            GLASSTECH<span style={{ color: ac }}>.</span>
          </div>
          <div className="lxf" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: scrolled || menuOpen ? '#666' : 'rgba(255,255,255,0.7)', transform: 'translateY(-2px)' }}>Interior Finishing</div>
        </div>

        {/* Desktop Nav */}
        <div style={{ gap: 40, alignItems: 'center' }} className="dt-flex">
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} className="lxf" style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
              color: activePage === l.id ? ac : (scrolled ? '#121212' : '#ffffff'),
              textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>{l.n}</button>
          ))}
          {onPortal && (
            <button onClick={onPortal} className="pub-btn-gold lxf" style={{ padding: '10px 20px', fontSize: 11, borderRadius: 4 }}>Client Portal</button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, zIndex: 1001
        }}>
          <div style={{ width: 24, height: 2, background: menuOpen || scrolled ? '#121212' : '#ffffff', transition: '0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <div style={{ width: 24, height: 2, background: menuOpen || scrolled ? '#121212' : '#ffffff', transition: '0.3s', opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 24, height: 2, background: menuOpen || scrolled ? '#121212' : '#ffffff', transition: '0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>

        {/* Mobile menu overlay */}
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', zIndex: 1000,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.5s cubic-bezier(0.85, 0, 0.15, 1)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32
        }}>
          {links.map(l => (
            <button key={l.id} onClick={() => { setPage(l.id); setMenuOpen(false); }} className="lxfh" style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: 42,
              color: activePage === l.id ? ac : '#121212', fontWeight: 300
            }}>{l.n}</button>
          ))}
          {onPortal && (
            <button onClick={() => { setMenuOpen(false); onPortal(); }} className="pub-btn-gold lxf" style={{ padding: '16px 40px', fontSize: 14, width: '100%', maxWidth: 280, borderRadius: 4, marginTop: 24 }}>Client Login</button>
          )}
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <div className="lxf" style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Ready to start a project?</div>
            <div className="lxfh" style={{ fontSize: 20, color: ac }}>+233 24 555 0000</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Footer({ brand, setPage, onPortal }) {
  const ac = brand.color || '#B08D57';
  return (
    <footer style={{ background: '#121212', color: '#ffffff', padding: '100px 24px 60px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 60, marginBottom: 80 }}>
          <div>
            <div className="lxfh" style={{ fontSize: 32, fontWeight: 700, marginBottom: 20 }}>GLASSTECH<span style={{ color: ac }}>.</span></div>
            <p className="lxf" style={{ color: '#999', lineHeight: 1.8, fontSize: 15 }}>Complete Interior & Finishing solutions for high-end residential and commercial developments. Industrial precision meets architectural luxury.</p>
          </div>
          <div>
            <div className="eyebrow lxf" style={{ color: '#fff', marginBottom: 24 }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map(n => (
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
            {onPortal && <button onClick={onPortal} style={{ background: 'none', border: 'none', color: '#333', fontSize: 10, cursor: 'pointer', marginLeft: 20 }} className="lxf">Admin</button>}
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- SUB PAGES ---

export function Hero({ slides, brand, setPage }) {
  const [active, setActive] = useState(0);
  const ac = brand.color || '#B08D57';

  useEffect(() => {
    const int = setInterval(() => setActive(s => (s + 1) % (slides.length || 1)), 8000);
    return () => clearInterval(int);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <section style={{ height: '100vh', position: 'relative', background: '#121212', overflow: 'hidden' }}>
      {slides.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0, transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: active === i ? 1 : 0, zIndex: active === i ? 1 : 0
        }}>
          <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, transform: active === i ? 'scale(1.05)' : 'scale(1)', transition: 'transform 8s linear' }} />
          <div style={{
            position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(18,18,18,0.2), rgba(18,18,18,0.75))',
            display: 'flex', alignItems: 'center', padding: '0 24px'
          }}>
            <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto' }}>
              <div className="eyebrow lxf afu d1" style={{ color: ac, marginBottom: 24, fontSize: 13 }}>Complete Interior & Finishing Solutions</div>
              <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(44px, 8vw, 110px)', color: '#fff', fontWeight: 300, lineHeight: 1.1, marginBottom: 40, maxWidth: 950 }}>
                {s.title.split(' ').map((w, j) => j === 1 ? <em key={j} style={{ fontStyle: 'italic', color: ac }}>{w} </em> : w + ' ')}
              </h1>
              <div className="afu d3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button onClick={() => setPage('portfolio')} className="pub-btn-gold lxf" style={{ padding: '16px 40px', fontSize: 13 }}>Explore Projects</button>
                <button onClick={() => setPage('contact')} className="pub-btn-outline lxf" style={{ padding: '16px 40px', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>Project Consultation</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 12, zIndex: 10 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className={`slider-dot${active === i ? ' active' : ''}`} />
        ))}
      </div>
    </section>
  );
}

export function ServicesPreview({ brand, setPage }) {
  const ac = brand.color || '#B08D57';
  const services = [
    { n: 'Interior Design', i: <Palette size={32} />, d: 'Full space planning and aesthetic curation.' },
    { n: 'Kitchen Setup', i: <Layout size={32} />, d: 'Custom cabinetry and high-end installations.' },
    { n: 'Wardrobes', i: <Home size={32} />, d: 'Bespoke storage solutions for modern living.' },
    { n: 'Finishings', i: <Layers size={32} />, d: 'Expert tiling, flooring, and ceiling works.' },
    { n: 'Technical', i: <Zap size={32} />, d: 'Professional plumbing and electrical systems.' },
    { n: 'Glass Systems', i: <Droplet size={32} />, d: 'Structural glass and aluminum engineering.' }
  ];
  return (
    <section style={{ padding: '120px 24px', background: '#FDFCFB' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="eyebrow lxf" style={{ marginBottom: 16 }}>Our Capabilities</div>
          <h2 className="lxfh" style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: '#121212', lineHeight: 1.1 }}>Comprehensive <em style={{ fontStyle: 'italic', color: ac }}>Interior</em> Finishing.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {services.map((s, i) => (
            <div key={i} style={{ padding: '60px 40px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 2, transition: 'all .3s' }}>
              <div style={{ color: ac, marginBottom: 32 }}>{s.i}</div>
              <h3 className="lxfh" style={{ fontSize: 26, marginBottom: 16 }}>{s.n}</h3>
              <p className="lxf" style={{ fontSize: 16, color: '#4A4A4A', lineHeight: 1.8, marginBottom: 32 }}>{s.d}</p>
              <button onClick={() => setPage('services')} style={{ border: 'none', background: 'none', color: ac, fontWeight: 700, fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer', padding: 0 }}>Learn more <ChevronRight size={14} style={{ transform: 'translateY(2px)' }} /></button>
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
    <div className="pub-page" style={{ background: '#FDFCFB' }}>
      <Hero slides={slides} brand={brand} setPage={setPage} />
      
      <section style={{ background: '#121212', padding: '0 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {[['250+', 'Projects Delivered'], ['8', 'Years'], ['15', 'Specialists'], ['$5M+', 'Project Value']].map(([n, l], i) => (
            <div key={l} style={{ flex: 1, minWidth: 200, textAlign: 'center', padding: '56px 20px', borderRight: (i < 3) ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div className="lxfh" style={{ fontSize: 48, color: brand.color || '#B08D57', fontWeight: 300 }}>{n}</div>
              <div className="lxf" style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(249,247,244,0.3)', marginTop: 8 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <ServicesPreview brand={brand} setPage={setPage} />

      <section style={{ padding: '120px 24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow lxf" style={{ marginBottom: 24 }}>About Glasstech</div>
          <h2 className="lxfh" style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: '#121212', lineHeight: 1.1, marginBottom: 40 }}>From Structural Glass to <em style={{ fontStyle: 'italic', color: brand.color || '#B08D57' }}>Full Interior</em> Finishing.</h2>
          <p className="lxf" style={{ fontSize: 18, color: '#4A4A4A', maxWidth: 850, margin: '0 auto 64px', lineHeight: 1.9 }}>
            Our evolution from structural specialists to a full-service interior finishing company means we handle every technical and aesthetic detail of your project. We bring industrial precision to every kitchen, washroom, and retail fit-out we curate.
          </p>
          <button onClick={() => setPage('about')} className="pub-btn-dark lxf" style={{ padding: '18px 48px' }}>Our Full Story</button>
        </div>
      </section>
    </div>
  );
}

export function ServicesPage({ brand, setPage, content }) {
  const ac = brand.color || '#B08D57';
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
    <div className="pub-page" style={{ background: '#FDFCFB', paddingTop: 90 }}>
      <section style={{ padding: '80px 24px', background: '#121212' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="eyebrow lxf afu d1" style={{ color: ac, marginBottom: 20 }}>Our Services</div>
          <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(48px, 6vw, 96px)', color: '#fff', fontWeight: 300, lineHeight: 1.1 }}>Complete Interior <em style={{ fontStyle: 'italic', color: ac }}>Solutions</em></h1>
        </div>
      </section>

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: 40 }}>
            {services.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 0, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <div style={{ height: '100%', minHeight: 400 }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ color: ac, marginBottom: 24 }}>{s.icon}</div>
                  <h3 className="lxfh" style={{ fontSize: 32, marginBottom: 16 }}>{s.title}</h3>
                  <p className="lxf" style={{ fontSize: 16, color: '#666', lineHeight: 1.8, marginBottom: 32 }}>{s.desc}</p>
                  <button onClick={() => setPage('contact')} className="pub-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '14px 28px' }}>Request Quote</button>
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
  const ac = brand.color || '#B08D57';
  const portfolio = content.portfolio || [];
  const cats = ['All', 'Full Interior', 'Kitchen Installation', 'Office Fit-out', 'Residential Finishing', 'Glass & Aluminum'];
  const [filter, setFilter] = useState('All');

  const shown = filter === 'All' ? portfolio : portfolio.filter(p => p.cat === filter);

  return (
    <div className="pub-page" style={{ background: '#FDFCFB', paddingTop: 90 }}>
      <section style={{ padding: '80px 24px', background: '#121212' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="eyebrow lxf afu d1" style={{ color: ac, marginBottom: 20 }}>Portfolio</div>
          <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(48px, 6vw, 96px)', color: '#fff', fontWeight: 300, lineHeight: 1.1 }}>Explore Our <em style={{ fontStyle: 'italic', color: ac }}>Work</em></h1>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 48 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} className="lxf" style={{
                padding: '10px 20px', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
                background: filter === c ? ac : 'rgba(255,255,255,0.05)',
                color: filter === c ? '#121212' : '#fff', borderRadius: 2, border: 'none', cursor: 'pointer',
                transition: '0.3s', fontWeight: 600
              }}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 40 }}>
            {shown.map((p, i) => (
              <div key={p.id} onClick={() => setPage(`project-${p.id}`)} style={{ cursor: 'pointer' }}>
                <div style={{ height: 480, overflow: 'hidden', marginBottom: 24, borderRadius: 2, position: 'relative' }} className="hover-img">
                  <img src={p.after} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="hover-scale" />
                  <div style={{ position: 'absolute', top: 20, left: 20, background: ac, color: '#121212', padding: '6px 12px', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>{p.cat}</div>
                </div>
                <h3 className="lxfh" style={{ fontSize: 24, marginBottom: 8 }}>{p.title}</h3>
                <div className="lxf" style={{ color: '#666', fontSize: 14 }}>{p.loc} · {p.year}</div>
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

export default function PublicSite({ page, setPage, brand, content, onPortal }) {
  const p = page || 'home';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [p]);

  const render = () => {
    if (p === 'home') return <HomePage brand={brand} setPage={setPage} content={content} />;
    if (p === 'services') return <ServicesPage brand={brand} setPage={setPage} content={content} />;
    if (p === 'portfolio') return <PortfolioPage brand={brand} setPage={setPage} content={content} />;
    if (p.startsWith('project-')) return <ProjectDetailPage projectId={p.split('-')[1]} brand={brand} setPage={setPage} content={content} />;
    return <div style={{ paddingTop: 200, textAlign: 'center' }}>Coming Soon: {p}</div>;
  };

  return (
    <div style={{ background: '#FDFCFB' }}>
      <PubNav brand={brand} setPage={setPage} activePage={p} onPortal={onPortal} />
      {render()}
      <Footer brand={brand} setPage={setPage} onPortal={onPortal} />
    </div>
  );
}
