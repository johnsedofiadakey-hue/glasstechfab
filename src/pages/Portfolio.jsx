import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, 
  Maximize2, X, Info, Calendar, MapPin, Layers, 
  SplitSquareHorizontal, CheckCircle, ArrowUpRight
} from 'lucide-react';
import { PubNav, Footer } from './PublicSite';
import { PORTFOLIO_DATA } from '../data.jsx';

const LIGHT_BG = '#FDFCFB';
const DARK_TEXT = '#1A1410';
const AC = '#C8A96E';

// --- COMPONENTS ---

// --- HELPERS ---
function useWindowWidth() {
  const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}
const isMob = (w) => w <= 1024;

const MasonryCard = ({ project, onClick, ac, mob }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={mob ? {} : { y: -10 }}
    onClick={onClick}
    style={{ 
      width: '100%', cursor: 'pointer',
      position: 'relative', borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
      border: '1px solid rgba(0,0,0,0.05)'
    }}

  >
    <img 
      src={project.after} 
      alt={project.title} 
      style={{ width: '100%', display: 'block', borderRadius: mob ? 0 : 24, transition: 'transform 0.5s' }} 
    />
    <div style={{ 
      position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))',
      opacity: mob ? 1 : 0, transition: 'opacity 0.3s', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: mob ? 20 : 32
    }} className="hover-reveal">
      <div style={{ color: ac, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 4 }}>{project.cat}</div>
      <h3 style={{ color: '#fff', fontSize: mob ? 18 : 24, fontWeight: 800, margin: 0 }}>{project.title}</h3>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: mob ? 11 : 13, marginTop: 4 }}>{project.loc}</p>
    </div>
    <style>{`.hover-reveal:hover { opacity: 1; }`}</style>
  </motion.div>
);

const ProjectDetail = ({ project, onClose, ac, navigate, mob }) => {
  const [activeImg, setActiveImg] = useState(project.after);
  const [compare, setCompare] = useState(false);
  const [p, setP] = useState(50);

  if (!project) return null;

  return (
    <motion.div 
      initial={mob ? { y: '100%' } : { opacity: 0 }}
      animate={mob ? { y: 0 } : { opacity: 1 }}
      exit={mob ? { y: '100%' } : { opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      style={{ position: 'fixed', inset: 0, zIndex: 10000, background: '#fff', overflowY: 'auto', padding: mob ? 0 : '0 0 100px' }}
    >
      {/* Header */}
      <nav style={{ padding: mob ? '16px 20px' : '24px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', zIndex: 100, borderBottom: '1px solid #eee' }}>
        <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', color: DARK_TEXT, fontWeight: 800, cursor: 'pointer', fontSize: mob ? 11 : 13 }}>
          <ArrowLeft size={mob ? 16 : 20} /> ALL PROJECTS
        </button>
        <div style={{ fontWeight: 900, fontSize: mob ? 12 : 16 }}>{project.title.toUpperCase()}</div>
        <button onClick={onClose} style={{ padding: 10, background: '#F5F5F5', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </nav>

      {/* Hero Section */}
      <div style={{ padding: mob ? '0' : '40px 5vw', display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(12, 1fr)', gap: mob ? 32 : 48 }}>
        
        {/* Left: Interactive Media */}
        <div style={{ gridColumn: mob ? 'auto' : 'span 8', minHeight: mob ? 300 : 600 }}>
           {project.before && compare ? (
             <div style={{ position: 'relative', height: mob ? 400 : '100%', width: '100%', overflow: 'hidden', borderRadius: mob ? 0 : 40 }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${project.after})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, width: `${p}%`, overflow: 'hidden', borderRight: '2px solid #fff', backgroundImage: `url(${project.before})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <input type="range" min="0" max="100" value={p} onChange={e => setP(e.target.value)}
                  style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '100%', opacity: 0, cursor: 'ew-resize', zIndex: 10, margin: 0 }} />
                <div style={{ position: 'absolute', top: '50%', left: `${p}%`, transform: 'translate(calc(-50% - 1px), -50%)', width: 44, height: 44, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', pointerEvents: 'none', zIndex: 5 }}>
                  <SplitSquareHorizontal size={20} color={ac} />
                </div>
             </div>
           ) : (
             <motion.img 
              key={activeImg}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              src={activeImg} 
              style={{ width: '100%', height: mob ? 400 : '100%', objectFit: 'cover', borderRadius: mob ? 0 : 40 }} 
             />
           )}

           <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24, padding: mob ? '0 20px' : '0' }}>
              {project.before && (
                <button 
                  onClick={() => setCompare(!compare)}
                  style={{ width: mob ? '100%' : 'auto', alignSelf: 'flex-start', padding: '16px 24px', background: compare ? ac : '#F5F5F5', color: compare ? '#fff' : DARK_TEXT, borderRadius: 16, border: 'none', fontWeight: 800, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                >
                   <SplitSquareHorizontal size={16} /> {compare ? 'EXIT COMPARISON' : 'VIEW BEFORE/AFTER'}
                </button>
              )}
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 10 }} className="no-scrollbar">
                 {(project.imgs || [project.after]).map(img => (
                   <img key={img} onClick={() => { setActiveImg(img); setCompare(false); }} src={img} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', cursor: 'pointer', border: activeImg === img && !compare ? `2px solid ${ac}` : '2px solid transparent' }} />
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Project Narrative */}
        <div style={{ gridColumn: mob ? 'auto' : 'span 4', display: 'flex', flexDirection: 'column', gap: 40, padding: mob ? '0 20px 100px' : '0' }}>
           <div>
              <span style={{ color: ac, fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Project Narrative</span>
              <h2 style={{ fontSize: mob ? 28 : 40, fontWeight: 800, margin: '16px 0', letterSpacing: '-0.04em' }}>The {project.title}</h2>
              <p style={{ fontSize: mob ? 14 : 16, color: 'rgba(26,20,16,0.6)', lineHeight: 1.6 }}>{project.desc || 'A comprehensive architectural overhaul featuring bespoke Glasstech solutions tailored for structural excellence and luxury aesthetic.'}</p>
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: mob ? 20 : 32 }}>
              <div>
                 <div style={{ color: 'rgba(0,0,0,0.3)', fontSize: 9, fontWeight: 900, textTransform: 'uppercase', marginBottom: 6 }}>Location</div>
                 <div style={{ fontSize: 13, fontWeight: 800 }}>{project.loc}</div>
              </div>
              <div>
                 <div style={{ color: 'rgba(0,0,0,0.3)', fontSize: 9, fontWeight: 900, textTransform: 'uppercase', marginBottom: 6 }}>Year</div>
                 <div style={{ fontSize: 13, fontWeight: 800 }}>{project.year || '2024'}</div>
              </div>
           </div>

           <div style={{ padding: 24, background: '#F9F7F4', borderRadius: 24, border: '1px solid rgba(0,0,0,0.05)' }}>
              <h4 style={{ margin: '0 0 16px', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: ac }}>Technical Scope</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                 {['Structural Glass Engineering', 'Thermal-Break Installations', 'Precision Finishing'].map(s => (
                   <li key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 600 }}>
                      <CheckCircle size={14} color={ac} /> {s}
                   </li>
                 ))}
              </ul>
              <button 
                onClick={() => navigate('/?page=contact')}

                style={{ width: '100%', marginTop: 24, padding: 18, background: DARK_TEXT, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, cursor: 'pointer', fontSize: 13 }}
              >
                 Request Quote
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Portfolio({ brand, user, onPortal, setPage, content }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const winW = useWindowWidth();
  const mob = isMob(winW);

  const ac = brand?.color || AC;

  const projects = useMemo(() => content?.portfolio || PORTFOLIO_DATA || [], [content?.portfolio]);

  const categories = useMemo(() => {
    return ['All', ...new Set(projects.map(p => p.cat))];
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => p.cat === filter);
  }, [filter, projects]);


  return (
    <div style={{ minHeight: '100vh', background: LIGHT_BG, color: DARK_TEXT, fontFamily: 'var(--font-p)' }}>
      
      <PubNav 
        brand={brand} 
        setPage={setPage} 
        activePage="portfolio" 
        onPortal={onPortal} 
        user={user} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        navigate={navigate} 
      />

      <main style={{ padding: mob ? '100px 20px 100px' : '160px 5vw 100px', maxWidth: 1400, margin: '0 auto' }}>
        
        {/* Intro */}
        <div style={{ marginBottom: mob ? 40 : 80 }}>
           <h1 style={{ fontSize: mob ? 40 : 96, fontWeight: 800, letterSpacing: '-0.05em', margin: '0 0 24px', lineHeight: 1 }}>Selected <br/><span style={{ color: ac }}>Masterpieces.</span></h1>
           <p style={{ fontSize: mob ? 16 : 20, color: 'rgba(26,20,16,0.5)', maxWidth: 600 }}>A collection of our most ambitious structural glass and interior finishing projects across Ghana.</p>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>

           {categories.map(c => (
             <button 
              key={c} 
              onClick={() => setFilter(c)}
              style={{ 
                padding: '12px 24px', borderRadius: 100, border: 'none', fontSize: 11, fontWeight: 800,
                background: filter === c ? DARK_TEXT : 'rgba(0,0,0,0.04)',
                color: filter === c ? '#fff' : 'rgba(0,0,0,0.4)',
                cursor: 'pointer', transition: 'all 0.3s'
              }}
             >
                {c.toUpperCase()}
             </button>
           ))}
        </div>

        {/* Masonry Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : winW > 1024 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', gap: mob ? 24 : 32 }}>
           {filtered.map(p => (
             <MasonryCard key={p.id} project={p} onClick={() => setSelected(p)} ac={ac} mob={mob} />
           ))}
        </div>

      </main>

      <Footer brand={brand} setPage={setPage} navigate={navigate} />


      <AnimatePresence>
        {selected && (
          <ProjectDetail 
            project={selected} 
            onClose={() => setSelected(null)} 
            ac={ac} 
            navigate={navigate} 
            mob={mob}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
