import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Star, Play, X, Menu, Phone, Mail, MapPin, 
  MessageCircle, Instagram, Facebook, Twitter, Linkedin, Award, SplitSquareHorizontal, 
  ArrowLeft, Check, CheckCircle, Calendar, Send, Upload, DollarSign, Eye, MessageSquare, Briefcase, Sparkles, TrendingUp
} from 'lucide-react';
import BA from '../components/BA';
import { Av } from '../components/Shared';
import { 
  HERO_SLIDES, ROOM_GALLERY, PORTFOLIO_DATA, SERVICES_DATA, PROCESS_STEPS, 
  WHY_US, CLIENT_NAMES, AWARDS, TEAM_MEMBERS 
} from '../data';

// --- SHARED PUBLIC COMPONENTS ---

export function PubNav({ brand, page, setPage, onPortal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const ac = brand.color || '#C8A96E';
  const isHome = page === 'home';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const solid = scrolled || !isHome;
  const links = [['home', 'Home'], ['portfolio', 'Portfolio'], ['services', 'Services'], ['about', 'About Us'], ['contact', 'Contact Us']];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, transition: 'all .4s',
      background: solid ? 'rgba(249,247,244,.97)' : 'transparent',
      borderBottom: solid ? '1px solid rgba(0,0,0,.07)' : '1px solid transparent',
      backdropFilter: solid ? 'blur(20px)' : 'none',
      padding: '0 56px', '--ac': ac
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <div onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          {brand.logo ? <img src={brand.logo} alt="logo" style={{ height: 32, objectFit: 'contain' }} />
            : <div className="lxfh" style={{ fontSize: 22, fontWeight: 500, color: solid ? '#1A1410' : '#F9F7F4', letterSpacing: '.02em', transition: 'color .4s' }}>{brand.name}</div>}
        </div>
        <div className="hide-mob" style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => setPage(id)}
              className="pub-nav-link lxf"
              style={{ color: page === id ? ac : solid ? '#3A3020' : 'rgba(249,247,244,.65)', transition: 'color .3s', fontWeight: page === id ? 600 : 400 }}>
              {label}
            </button>
          ))}
          <button className="pub-btn-gold lxf" onClick={onPortal} style={{ padding: '9px 22px', borderRadius: 3 }}>{solid ? 'Client Portal' : 'Book Consult'}</button>
        </div>
        <button onClick={() => setMob(!mob)} style={{ display: 'none', background: 'none', border: 'none', color: solid ? '#1A1410' : '#F9F7F4', cursor: 'pointer' }} className="hide-mob">{mob ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </nav>
  );
}

export function PubFooter({ brand, setPage }) {
  const ac = brand.color || '#C8A96E';
  return (
    <footer style={{ background: '#1A1410', padding: '72px 80px 32px', '--ac': ac }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 52, flexWrap: 'wrap', gap: 40 }}>
          <div style={{ maxWidth: 280 }}>
            {brand.logo ? <img src={brand.logo} alt="" style={{ height: 28, objectFit: 'contain', marginBottom: 18 }} /> : <div className="lxfh" style={{ fontSize: 24, fontWeight: 400, color: '#F9F7F4', marginBottom: 18 }}>{brand.name}</div>}
            <p className="lxf" style={{ fontSize: 13, color: 'rgba(249,247,244,.32)', lineHeight: 1.8 }}>Creating extraordinary interiors across Ghana and beyond since 2016.</p>
            <div style={{ display: 'flex', gap: 14, marginTop: 20 }}>
              {[[Instagram, brand.instagram], [Facebook, brand.facebook], [Twitter, brand.twitter], [Linkedin, brand.linkedin]].filter(([, h]) => h).map(([Icon], i) => (
                <div key={i} style={{ color: 'rgba(249,247,244,.22)', cursor: 'pointer', transition: 'color .25s' }} onMouseOver={e => e.currentTarget.style.color = ac} onMouseOut={e => e.currentTarget.style.color = 'rgba(249,247,244,.22)'}><Icon size={16} /></div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 72, flexWrap: 'wrap' }}>
            {[['Navigation', [['home', 'Home'], ['portfolio', 'Portfolio'], ['services', 'Services'], ['about', 'About Us'], ['contact', 'Contact Us']]], ['Services', [['service-residential', 'Residential Design'], ['service-commercial', 'Commercial Spaces'], ['service-consultation', 'Design Consultation'], ['service-styling', 'Styling & Staging']]]].map(([title, links]) => (
              <div key={title}>
                <div className="lxf" style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: ac, marginBottom: 18, fontWeight: 600 }}>{title}</div>
                {links.map(([id, label]) => (
                  <div key={id} onClick={() => setPage(id)} className="lxf" style={{ fontSize: 13, color: 'rgba(249,247,244,.32)', marginBottom: 10, cursor: 'pointer', transition: 'color .25s' }} onMouseOver={e => e.target.style.color = 'rgba(249,247,244,.75)'} onMouseOut={e => e.target.style.color = 'rgba(249,247,244,.32)'}>{label}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,.06)', marginBottom: 24 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div className="lxf" style={{ fontSize: 12, color: 'rgba(249,247,244,.2)' }}>© 2025 {brand.name}. All Rights Reserved.</div>
          <div className="lxf" style={{ fontSize: 12, color: 'rgba(249,247,244,.2)' }}>{brand.location || 'Accra, Ghana'}</div>
        </div>
      </div>
    </footer>
  );
}

// --- PUBLIC PAGES ---

export function HomePage({ brand, setPage }) {
  const ac = brand.color || '#C8A96E';
  const [slide, setSlide] = useState(0);
  const [roomTab, setRoomTab] = useState('Living Room');
  const [videoOpen, setVideoOpen] = useState(false);
  const roomKeys = Object.keys(ROOM_GALLERY);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ob = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in', e.isIntersecting)), { threshold: .08 });
    setTimeout(() => document.querySelectorAll('.rev').forEach(el => ob.observe(el)), 200);
    return () => ob.disconnect();
  }, []);

  const S = HERO_SLIDES[slide];

  return (
    <div className="pub-page" style={{ background: '#F9F7F4', '--ac': ac, color: '#1A1410' }}>
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        {HERO_SLIDES.map((s, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, transition: 'opacity .9s ease', opacity: i === slide ? 1 : 0 }}>
            <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: i === slide ? 'scale(1.04)' : 'scale(1)', transition: 'transform 6s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,12,8,.72) 40%, rgba(15,12,8,.3))' }} />
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 80px', zIndex: 2 }}>
          <div style={{ maxWidth: 640 }}>
            <div className="afu d1 eyebrow lxf" style={{ color: ac, marginBottom: 24 }}>Interior Design Studio · Accra, Ghana</div>
            <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(52px,7.5vw,104px)', fontWeight: 300, lineHeight: 1.04, color: '#F9F7F4', whiteSpace: 'pre-line', marginBottom: 28 }}>
              {S.headline}
            </h1>
            <p className="lxf afu d3" style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(249,247,244,.58)', maxWidth: 460, marginBottom: 52, fontWeight: 300 }}>{S.sub}</p>
            <div className="afu d4" style={{ display: 'flex', gap: 14 }}>
              <button className="pub-btn-gold lxf" onClick={() => setPage('contact')} style={{ padding: '15px 36px', borderRadius: 3 }}>Book Consult</button>
              <button className="pub-btn-outline lxf" onClick={() => setPage('portfolio')} style={{ padding: '15px 36px', borderRadius: 3, border: '1.5px solid rgba(249,247,244,.4)', color: '#F9F7F4' }} onMouseOver={e => { e.currentTarget.style.background = ac; e.currentTarget.style.borderColor = ac; e.currentTarget.style.color = '#1A1410'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(249,247,244,.4)'; e.currentTarget.style.color = '#F9F7F4'; }}>View Our Work</button>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 3 }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`slider-dot${slide === i ? ' active' : ''}`} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 36, right: 80, zIndex: 3, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="lxf" style={{ fontSize: 13, color: 'rgba(249,247,244,.5)', fontWeight: 600 }}>{String(slide + 1).padStart(2, '0')}</span>
          <div style={{ width: 32, height: 1, background: 'rgba(249,247,244,.25)' }} />
          <span className="lxf" style={{ fontSize: 13, color: 'rgba(249,247,244,.3)' }}>{String(HERO_SLIDES.length).padStart(2, '0')}</span>
        </div>
        <button onClick={() => setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} style={{ position: 'absolute', left: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)', color: '#F9F7F4', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifySelf: 'center', transition: 'all .25s' }} onMouseOver={e => e.currentTarget.style.background = ac} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}><ChevronLeft size={18} /></button>
        <button onClick={() => setSlide(s => (s + 1) % HERO_SLIDES.length)} style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)', color: '#F9F7F4', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifySelf: 'center', transition: 'all .25s' }} onMouseOver={e => e.currentTarget.style.background = ac} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}><ChevronRight size={18} /></button>
      </section>

      <section style={{ background: '#1A1410', padding: '0 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[['120+', 'Projects Delivered'], ['8', 'Years of Excellence'], ['98%', 'Client Satisfaction'], ['$2M+', 'Value Transformed']].map(([n, l], i) => (
            <div key={l} style={{ textAlign: 'center', padding: '32px 20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
              <div className="lxfh" style={{ fontSize: 48, fontWeight: 300, color: ac, lineHeight: 1 }}>{n}</div>
              <div className="lxf" style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(249,247,244,.28)', marginTop: 8 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start', marginBottom: 72 }}>
            <div>
              <div className="rev eyebrow lxf" style={{ marginBottom: 20 }}>What We Do</div>
              <h2 className="lxfh rev" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 300, lineHeight: 1.1, color: '#1A1410' }}>Transforming Spaces Into <em style={{ fontStyle: 'italic', color: ac }}>Masterpieces</em></h2>
            </div>
            <div>
              <p className="lxf rev" style={{ fontSize: 15, lineHeight: 1.9, color: '#7A6E62', marginBottom: 28 }}>At LuxeSpace, we specialise in transforming spaces into worthy masterpieces. Our design team combines creativity and functionality to curate stunning environments that not only reflect your unique style but also captivate and inspire.</p>
              <p className="lxf rev" style={{ fontSize: 15, lineHeight: 1.9, color: '#7A6E62' }}>From concept to completion, we focus on every detail — ensuring that each room tells a story and enhances your lifestyle. Let us turn your vision into a breathtaking reality.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(0,0,0,.08)', marginBottom: 40, overflowX: 'auto' }} className="lx-scroll">
            {['Commercial', 'Residential', 'Hospitality', 'Styling'].map(cat => (
              <button key={cat} onClick={() => setRoomTab(cat)} className={`room-tab${roomTab === cat ? ' active' : ''}`}>{cat}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
            {(PORTFOLIO_DATA.filter(p => {
              if (roomTab === 'Commercial') return p.cat === 'Commercial';
              if (roomTab === 'Residential') return p.cat === 'Residential';
              if (roomTab === 'Hospitality') return p.id <= 2;
              return true;
            }).slice(0, 3)).map((p, i) => (
              <div key={p.id} className="hover-img rev" style={{ height: i === 0 ? 380 : 280, overflow: 'hidden', cursor: 'pointer', position: 'relative' }} onClick={() => setPage(`project-${p.id}`)}>
                <img src={p.after} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,20,16,0)', transition: 'background .4s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(26,20,16,.55)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(26,20,16,0)'}>
                  <div style={{ position: 'absolute', bottom: 18, left: 18, opacity: 0, transform: 'translateY(8px)', transition: 'all .35s' }}
                    onMouseOver={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div className="eyebrow lxf" style={{ color: ac, marginBottom: 5 }}>{p.cat}</div>
                    <div className="lxfh" style={{ fontSize: 20, color: '#F9F7F4', fontWeight: 400 }}>{p.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 80px 100px', background: '#F9F7F4' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="rev eyebrow lxf" style={{ marginBottom: 16 }}>We Provide</div>
              <h2 className="lxfh rev" style={{ fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 300, lineHeight: 1.1, color: '#1A1410' }}>What We Offer <em style={{ fontStyle: 'italic', color: ac }}>For You</em></h2>
            </div>
            <button className="pub-btn-dark lxf rev" onClick={() => setPage('services')} style={{ padding: '12px 28px', borderRadius: 3 }}>All Services</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {SERVICES_DATA.map(s => (
              <div key={s.id} className="service-lx-card rev" onClick={() => setPage(`service-${s.id}`)}
                style={{ background: '#fff', border: '1px solid rgba(0,0,0,.06)' }}>
                <div style={{ height: 200, overflow: 'hidden' }}>
                  <img src={s.gallery[0]} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s ease' }} onMouseOver={e => e.target.style.transform = 'scale(1.07)'} onMouseOut={e => e.target.style.transform = 'scale(1)'} />
                </div>
                <div style={{ padding: '22px 20px' }}>
                  <div className="lxf" style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: ac, marginBottom: 8, fontWeight: 600 }}>{s.catLabel}</div>
                  <h3 className="lxfh" style={{ fontSize: 22, fontWeight: 400, color: '#1A1410', marginBottom: 10, lineHeight: 1.2 }}>{s.name}</h3>
                  <p className="lxf" style={{ fontSize: 13, color: '#7A6E62', lineHeight: 1.7, marginBottom: 16 }}>{s.short}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: ac, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Learn more <ChevronRight size={13} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 80px', background: '#1A1410' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="rev eyebrow lxf" style={{ marginBottom: 16, color: ac }}>Simple Steps</div>
            <h2 className="lxfh rev" style={{ fontSize: 'clamp(36px, 4.5vw, 58px)', fontWeight: 300, lineHeight: 1.1, color: '#F9F7F4' }}>Get Amazing Results in <em style={{ fontStyle: 'italic', color: ac }}>4 Simple Steps</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="rev" style={{ animationDelay: `${i * .1}s` }}>
                <div style={{ height: 240, overflow: 'hidden', marginBottom: 20, position: 'relative' }}>
                  <img src={step.img} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s ease' }} onMouseOver={e => e.target.style.transform = 'scale(1.06)'} onMouseOut={e => e.target.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', top: 14, left: 14, background: ac, color: '#1A1410', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 2, fontFamily: "'DM Sans', sans-serif" }}>{step.n}</div>
                </div>
                <h3 className="lxfh" style={{ fontSize: 20, fontWeight: 400, color: '#F9F7F4', marginBottom: 10, lineHeight: 1.2 }}>{step.title}</h3>
                <p className="lxf" style={{ fontSize: 13, color: 'rgba(249,247,244,.45)', lineHeight: 1.75 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 80px', background: '#F9F7F4' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="rev eyebrow lxf" style={{ marginBottom: 16 }}>Best Gallery</div>
              <h2 className="lxfh rev" style={{ fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 300, color: '#1A1410' }}>See Our <em style={{ fontStyle: 'italic', color: ac }}>Recent Work</em></h2>
            </div>
            <button className="pub-btn-outline lxf rev" onClick={() => setPage('portfolio')} style={{ padding: '11px 26px', borderRadius: 3 }}>Full Portfolio</button>
          </div>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(0,0,0,.08)', marginBottom: 36 }}>
            {roomKeys.map(k => (
              <button key={k} onClick={() => setRoomTab(k)} className={`room-tab${roomTab === k ? ' active' : ''}`}>{k}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, minHeight: 280 }}>
            {(ROOM_GALLERY[roomTab] || []).map((img, i) => (
              <div key={i} className="hover-img rev" style={{ height: i === 0 ? 360 : 240, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setPage('portfolio')}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div className="rev eyebrow lxf" style={{ marginBottom: 20 }}>Why Choose Us?</div>
            <h2 className="lxfh rev" style={{ fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 300, lineHeight: 1.1, color: '#1A1410', marginBottom: 48 }}>Design Without Limits,<br />Creativity <em style={{ fontStyle: 'italic', color: ac }}>Guaranteed.</em></h2>
            {WHY_US.map((w, i) => (
              <div key={i} className="why-item rev" style={{ animationDelay: `${i * .08}s` }}>
                <div className="why-num">{w.n}</div>
                <div>
                  <div className="lxfh" style={{ fontSize: 20, fontWeight: 500, color: '#1A1410', marginBottom: 6, lineHeight: 1.2 }}>{w.title}</div>
                  <div className="lxf" style={{ fontSize: 13, color: '#7A6E62', lineHeight: 1.75 }}>{w.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: 'sticky', top: 100 }}>
            <div className="rev" style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" alt="interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, background: 'rgba(249,247,244,.96)', padding: '20px 24px', backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>{Array(5).fill(0).map((_, j) => <Star key={j} size={13} fill={ac} color={ac} />)}</div>
                <div className="lxfh" style={{ fontSize: 16, fontWeight: 400, color: '#1A1410', lineHeight: 1.5, marginBottom: 8 }}>"LuxeSpace completely transformed our home. Every corner reflects our family perfectly."</div>
                <div className="lxf" style={{ fontSize: 12, color: '#7A6E62' }}>Abena Mensah · East Legon, Accra</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,20,16,.62)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 2 }}>
          <div className="rev eyebrow lxf" style={{ marginBottom: 20, color: ac }}>Watch Our Story</div>
          <h2 className="lxfh rev" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#F9F7F4', marginBottom: 36, lineHeight: 1.1 }}>See How We <em style={{ fontStyle: 'italic', color: ac }}>Transform Spaces</em></h2>
          <div className="video-play rev" onClick={() => setVideoOpen(true)}>
            <Play size={26} fill="#1A1410" color="#1A1410" style={{ marginLeft: 4 }} />
          </div>
        </div>
        {videoOpen && (
          <div onClick={() => setVideoOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.9)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 800, padding: '0 20px' }}>
              <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000', borderRadius: 6 }}>
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', borderRadius: 6 }} allow="autoplay" title="LuxeSpace Studio" />
              </div>
              <button onClick={() => setVideoOpen(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.12)', border: 'none', color: '#fff', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifySelf: 'center' }}><X size={18} /></button>
            </div>
          </div>
        )}
      </section>

      <section style={{ padding: '100px 80px', background: '#F9F7F4' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
            <div>
              <div className="rev eyebrow lxf" style={{ marginBottom: 20 }}>Client Feedback</div>
              <h2 className="lxfh rev" style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300, lineHeight: 1.1, color: '#1A1410', marginBottom: 36 }}>What Our Satisfied Clients Are <em style={{ fontStyle: 'italic', color: ac }}>Saying</em></h2>
              <div className="rev" style={{ padding: '28px', background: '#fff', border: '1px solid rgba(0,0,0,.07)' }}>
                <div className="lxfh" style={{ fontSize: 72, fontWeight: 300, color: '#1A1410', lineHeight: 1 }}>4.9</div>
                <div style={{ display: 'flex', gap: 4, margin: '10px 0' }}>{Array(5).fill(0).map((_, j) => <Star key={j} size={17} fill={ac} color={ac} />)}</div>
                <div className="lxf" style={{ fontSize: 13, color: '#7A6E62' }}>Based on 120+ clients</div>
                <div style={{ height: 1, background: 'rgba(0,0,0,.07)', margin: '16px 0' }} />
                <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>Average Rating</div>
                {[['Creativity', 5], ['Communication', 5], ['Timeliness', 4.8], ['Value', 4.9]].map(([label, score]) => (
                  <div key={label} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span className="lxf" style={{ fontSize: 12, color: '#7A6E62' }}>{label}</span>
                      <span className="lxf" style={{ fontSize: 12, color: ac, fontWeight: 600 }}>{score}</span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(0,0,0,.06)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(score / 5) * 100}%`, background: ac, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[{ name: 'Abena Mensah', role: 'Homeowner · East Legon', text: 'LuxeSpace transformed our home beyond imagination. Every corner reflects our family perfectly. I get compliments every single time someone visits.', av: 'AM' }, { name: 'Kofi Asante', role: 'CEO · Asante Holdings', text: 'Our boardroom is now our most powerful business asset. Clients comment on it before anything else.', av: 'KA' }, { name: 'Akua Boateng', role: 'Boutique Owner · Osu', text: 'Sales increased 40% after the redesign. The space communicates our brand without a single word.', av: 'AB' }].map(t => (
                <div key={t.name} className="rev pub-card" style={{ padding: '28px 24px' }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>{Array(5).fill(0).map((_, j) => <Star key={j} size={13} fill={ac} color={ac} />)}</div>
                  <p className="lxfh" style={{ fontSize: 18, lineHeight: 1.7, color: '#3A3020', marginBottom: 20, fontStyle: 'italic', fontWeight: 400 }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Av i={t.av} s={38} c={ac} /><div><div className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#1A1410' }}>{t.name}</div><div className="lxf" style={{ fontSize: 12, color: '#7A6E62' }}>{t.role}</div></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 80px', background: '#1A1410' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div className="rev eyebrow lxf" style={{ marginBottom: 20, color: ac }}>Ready to Begin?</div>
          <h2 className="lxfh rev" style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 300, lineHeight: 1.06, color: '#F9F7F4', marginBottom: 20 }}>Got a Project<br />in <em style={{ fontStyle: 'italic', color: ac }}>Mind?</em></h2>
          <div className="rev" style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <button className="pub-btn-gold lxf" onClick={() => setPage('contact')} style={{ padding: '15px 40px', borderRadius: 3 }}>Book a Consultation</button>
            <button className="pub-btn-outline lxf" onClick={() => setPage('portfolio')} style={{ padding: '15px 40px', borderRadius: 3, border: '1.5px solid rgba(249,247,244,.2)', color: 'rgba(249,247,244,.6)' }}>View Portfolio</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PortfolioPage({ brand, setPage }) {
  const ac = brand.color || '#C8A96E';
  const [filter, setFilter] = useState('All');
  const cats = ['All', 'Residential', 'Commercial', 'Kitchen', 'Bathroom', 'Dining'];
  const shown = filter === 'All' ? PORTFOLIO_DATA : PORTFOLIO_DATA.filter(p => p.cat === filter);

  useEffect(() => {
    const ob = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in', e.isIntersecting)), { threshold: .06 });
    setTimeout(() => document.querySelectorAll('.rev').forEach(el => ob.observe(el)), 100);
    return () => ob.disconnect();
  }, [filter]);

  return (
    <div className="pub-page" style={{ background: '#F9F7F4', color: '#1A1410', paddingTop: 68, '--ac': ac }}>
      <section style={{ padding: '80px 80px 60px', background: '#1A1410' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="afu d1 eyebrow lxf" style={{ marginBottom: 20, color: ac }}>Our Portfolio</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
            <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(44px,6.5vw,88px)', fontWeight: 300, lineHeight: 1.04, color: '#F9F7F4' }}>See Our Latest <em style={{ fontStyle: 'italic', color: ac }}>Projects</em></h1>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} className="lxf"
                style={{ padding: '8px 18px', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', border: `1px solid ${filter === c ? ac : 'rgba(255,255,255,.15)'}`, background: filter === c ? ac : 'transparent', color: filter === c ? '#1A1410' : 'rgba(249,247,244,.55)', borderRadius: 3, cursor: 'pointer', transition: 'all .3s', fontWeight: filter === c ? 600 : 400 }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '48px 80px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
            {shown.map((p, i) => (
              <div key={p.id} className="rev">
                {p.hasBA
                  ? <div>
                    <BA before={p.before} after={p.after} h={i % 3 === 0 ? 400 : 280} />
                    <div onClick={() => setPage(`project-${p.id}`)} style={{ padding: '12px 0 4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div><div className="eyebrow lxf" style={{ fontSize: 10, letterSpacing: '.14em', marginBottom: 3 }}>{p.cat} · {p.year}</div><div className="lxfh" style={{ fontSize: 18, fontWeight: 400, color: '#1A1410' }}>{p.title}</div></div>
                      <span className="lxf" style={{ fontSize: 11, color: '#B5AFA9', display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}><SplitSquareHorizontal size={11} />Drag</span>
                    </div>
                  </div>
                  : <div onClick={() => setPage(`project-${p.id}`)} className="hover-img" style={{ height: i % 3 === 0 ? 400 : 280, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                    <img src={p.after} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,20,16,0)', transition: 'background .4s', display: 'flex', alignItems: 'flex-end', padding: 20 }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(26,20,16,.65)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(26,20,16,0)'}>
                      <div style={{ opacity: 0, transform: 'translateY(8px)', transition: 'all .35s' }}>
                        <div className="eyebrow lxf" style={{ color: ac, marginBottom: 5 }}>{p.cat} · {p.year}</div>
                        <div className="lxfh" style={{ fontSize: 22, fontWeight: 400, color: '#F9F7F4', lineHeight: 1.2 }}>{p.title}</div>
                        <div className="lxf" style={{ fontSize: 12, color: 'rgba(249,247,244,.55)', marginTop: 4 }}>{p.loc}</div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProjectDetailPage({ projectId, brand, setPage }) {
  const ac = brand.color || '#C8A96E';
  const p = PORTFOLIO_DATA.find(x => x.id === parseInt(projectId));
  const [imgIdx, setImgIdx] = useState(0);
  if (!p) return <div style={{ color: '#888', padding: 80, textAlign: 'center', paddingTop: 180 }}>Project not found</div>;
  return (
    <div className="pub-page" style={{ background: '#F9F7F4', color: '#1A1410', paddingTop: 68, '--ac': ac }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 80px' }}>
        <button onClick={() => setPage('portfolio')} className="lxf" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B5AFA9', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 40, transition: 'color .25s', padding: 0 }} onMouseOver={e => e.currentTarget.style.color = '#1A1410'} onMouseOut={e => e.currentTarget.style.color = '#B5AFA9'}>
          <ArrowLeft size={14} /> Back to Portfolio
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: 12 }}>
              {p.hasBA ? <BA before={p.before} after={p.after} h={500} /> : <div style={{ height: 500, overflow: 'hidden' }}><img src={p.imgs[imgIdx] || p.after} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
            </div>
            {p.imgs.length > 1 && <div style={{ display: 'grid', gridTemplateColumns: `repeat(${p.imgs.length},1fr)`, gap: 4 }}>
              {p.imgs.map((img, i) => (
                <div key={i} onClick={() => setImgIdx(i)} style={{ height: 88, overflow: 'hidden', cursor: 'pointer', border: `2.5px solid ${imgIdx === i ? ac : 'transparent'}`, transition: 'border-color .2s' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>}
          </div>
          <div style={{ position: 'sticky', top: 88 }}>
            <div className="eyebrow lxf" style={{ marginBottom: 12 }}>{p.cat} · {p.year}</div>
            <h1 className="lxfh" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, lineHeight: 1.08, marginBottom: 24, color: '#1A1410' }}>{p.title}</h1>
            <p className="lxf" style={{ fontSize: 14, color: '#7A6E62', lineHeight: 1.85, marginBottom: 36 }}>{p.desc}</p>
            <div style={{ marginBottom: 36 }}>
              {[['Location', p.loc], ['Area', p.area], ['Duration', p.duration], ['Budget', p.budget], ['Style', p.style]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifySelf: 'space-between', padding: '11px 0', borderBottom: '1px solid rgba(0,0,0,.06)', fontSize: 13 }}>
                  <span className="lxf" style={{ color: '#B5AFA9', textTransform: 'uppercase', letterSpacing: '.1em', fontSize: 11 }}>{k}</span>
                  <span className="lxf" style={{ fontWeight: 500, color: '#1A1410' }}>{v}</span>
                </div>
              ))}
            </div>
            <button className="pub-btn-dark lxf" onClick={() => setPage('contact')} style={{ width: '100%', padding: '14px', borderRadius: 3 }}>Start a Similar Project</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactPage({ brand }) {
  const ac = brand.color || '#C8A96E';
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [calDate, setCalDate] = useState(null);
  const [calTime, setCalTime] = useState(null);
  const [booked, setBooked] = useState(false);
  const now = new Date();
  const [calMonth] = useState(now.getMonth());
  const [calYear] = useState(now.getFullYear());
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const monthName = new Date(calYear, calMonth).toLocaleString('default', { month: 'long' });
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
  const busyDays = [4, 8, 13, 18, 22];

  useEffect(() => {
    const ob = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in', e.isIntersecting)), { threshold: .06 });
    setTimeout(() => document.querySelectorAll('.rev').forEach(el => ob.observe(el)), 100);
    return () => ob.disconnect();
  }, []);

  return (
    <div className="pub-page" style={{ background: '#F9F7F4', color: '#1A1410', paddingTop: 68, '--ac': ac }}>
      <section style={{ padding: '80px 80px 60px', background: '#1A1410' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="afu d1 eyebrow lxf" style={{ marginBottom: 20, color: ac }}>Get In Touch</div>
          <h1 className="lxfh afu d2" style={{ fontSize: 'clamp(44px,6.5vw,88px)', fontWeight: 300, lineHeight: 1.04, color: '#F9F7F4', maxWidth: 700 }}>Let's Create Something <em style={{ fontStyle: 'italic', color: ac }}>Great Together.</em></h1>
        </div>
      </section>

      <section style={{ padding: '80px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <div>
            <div className="rev lxfh" style={{ fontSize: 28, fontWeight: 400, color: '#1A1410', marginBottom: 32 }}>Send a Message</div>
            {sent ? (
              <div className="rev" style={{ textAlign: 'center', padding: '60px 24px', background: '#fff', border: '1px solid rgba(0,0,0,.07)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${ac}14`, border: `1.5px solid ${ac}35`, display: 'flex', alignItems: 'center', justifySelf: 'center', margin: '0 auto 20px' }}><Check size={24} color={ac} /></div>
                <h3 className="lxfh" style={{ fontSize: 28, fontWeight: 300, marginBottom: 12, color: '#1A1410' }}>Message Sent</h3>
                <p className="lxf" style={{ color: '#7A6E62', fontSize: 14 }}>We'll respond within 24 hours.</p>
                <button onClick={() => setSent(false)} className="pub-btn-outline lxf" style={{ marginTop: 24, padding: '10px 24px', borderRadius: 3 }}>Send Another</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input className="pub-inp lxf" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: '13px 15px', fontSize: 13 }} />
                  <input className="pub-inp lxf" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: '13px 15px', fontSize: 13 }} />
                </div>
                <input className="pub-inp lxf" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ padding: '13px 15px', fontSize: 13 }} />
                <select className="pub-inp lxf" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ padding: '13px 15px', fontSize: 13 }}>
                  <option value="">Select a Service</option>
                  {SERVICES_DATA.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
                <textarea className="pub-inp lxf" rows={5} placeholder="Tell us about your project..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ padding: '13px 15px', fontSize: 13, resize: 'vertical' }} />
                <button className="pub-btn-dark lxf" onClick={() => form.name && form.email && setSent(true)} style={{ padding: '14px', borderRadius: 3 }}>Send Message</button>
              </div>
            )}
          </div>
          <div>
            <div className="rev lxfh" style={{ fontSize: 28, fontWeight: 400, color: '#1A1410', marginBottom: 32 }}>Book a Consultation</div>
            {booked ? (
              <div className="rev" style={{ textAlign: 'center', padding: '60px 24px', background: '#fff', border: '1px solid rgba(0,0,0,.07)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${ac}14`, border: `1.5px solid ${ac}35`, display: 'flex', alignItems: 'center', justifySelf: 'center', margin: '0 auto 20px' }}><Calendar size={24} color={ac} /></div>
                <h3 className="lxfh" style={{ fontSize: 28, fontWeight: 300, marginBottom: 12, color: '#1A1410' }}>Consultation Booked</h3>
                <p className="lxf" style={{ color: ac, fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{monthName} {calDate}, {calYear}</p>
                <p className="lxf" style={{ color: '#7A6E62', fontSize: 14 }}>{calTime} · In-person or Video Call</p>
                <button onClick={() => { setBooked(false); setCalDate(null); setCalTime(null); }} className="pub-btn-outline lxf" style={{ marginTop: 24, padding: '10px 24px', borderRadius: 3 }}>Book Another</button>
              </div>
            ) : (
              <div className="rev">
                <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,.07)', padding: '24px', marginBottom: 14 }}>
                  <div className="lxf" style={{ fontSize: 13, fontWeight: 600, color: '#1A1410', marginBottom: 16, textAlign: 'center' }}>{monthName} {calYear}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3, marginBottom: 8 }}>
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="lxf" style={{ textAlign: 'center', fontSize: 11, color: '#B5AFA9', padding: '4px 0', letterSpacing: '.05em' }}>{d}</div>)}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3 }}>
                    {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
                    {Array(daysInMonth).fill(null).map((_, i) => {
                      const d = i + 1; const busy = busyDays.includes(d); const past = d < now.getDate();
                      return (
                        <button key={d} onClick={() => !busy && !past && setCalDate(d)}
                          className={`cal-day lxf${calDate === d ? ' selected' : ''}${(busy || past) ? ' disabled' : ''}`}
                          disabled={busy || past}
                          style={{ border: 'none', background: calDate === d ? ac : 'transparent', color: calDate === d ? '#1A1410' : busy || past ? '#D0CCC6' : '#7A6E62', cursor: busy || past ? 'default' : 'pointer' }}>
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {calDate && (
                  <div style={{ marginBottom: 14 }}>
                    <div className="eyebrow lxf" style={{ marginBottom: 10, fontSize: 10 }}>{monthName} {calDate} — Available Times</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                      {times.map(t => (
                        <button key={t} onClick={() => setCalTime(t)} className="lxf"
                          style={{ padding: '9px', fontSize: 12, border: `1.5px solid ${calTime === t ? ac : 'rgba(0,0,0,.1)'}`, background: calTime === t ? `${ac}12` : '#fff', color: calTime === t ? ac : '#7A6E62', cursor: 'pointer', transition: 'all .2s', fontFamily: "'DM Sans', sans-serif" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <button className="pub-btn-dark lxf" onClick={() => calDate && calTime && setBooked(true)} disabled={!calDate || !calTime}
                  style={{ width: '100%', padding: '13px', borderRadius: 3, opacity: calDate && calTime ? 1 : .4 }}>
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// --- PUBLIC SITE SHELL ---

export default function PublicSite({ brand, onPortal }) {
  const [page, setPageInner] = useState('home');
  const setPage = p => { setPageInner(p); window.scrollTo(0, 0); };
  const ac = brand.color || '#C8A96E';
  
  const renderPage = () => {
    if (page === 'home') return <HomePage brand={brand} setPage={setPage} />;
    if (page === 'portfolio') return <PortfolioPage brand={brand} setPage={setPage} />;
    if (page === 'contact') return <ContactPage brand={brand} />;
    if (page.startsWith('project-')) return <ProjectDetailPage projectId={page.replace('project-', '')} brand={brand} setPage={setPage} />;
    return <HomePage brand={brand} setPage={setPage} />;
  };

  return (
    <div style={{ '--ac': ac }} className="lx-scroll">
      <PubNav brand={brand} page={page} setPage={setPage} onPortal={onPortal} />
      {renderPage()}
      <PubFooter brand={brand} setPage={setPage} />
      {brand.whatsapp && page !== 'home' && <a href={`https://wa.me/${brand.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="wa-btn"><MessageCircle size={23} color="#fff" fill="#fff" /></a>}
    </div>
  );
}
