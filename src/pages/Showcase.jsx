import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, ChevronLeft, ChevronRight, X, Info, 
  ArrowRight, Search, Layout, Droplet, Zap, Eye,
  Home, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const LIGHT_BG = '#FDFCFB';
const DARK_TEXT = '#1A1410';
const AC = '#C8A96E';

const DEFAULT_SCENES = [
  {
    id: 'def-1',
    title: 'The Panoramic Penthouse',
    location: 'Airport Residential, Accra',
    img: 'file:///Users/truth/.gemini/antigravity/brain/adb28acf-05bb-4a06-add4-ff18df02d9db/modern_glass_facade_hero_1777731475517.png',
    description: 'A study in transparency and structural integrity. Our ultra-narrow sliding systems dissolve the boundary between interior luxury and the city skyline.',
    hotspots: [
      { x: 40, y: 50, title: '103 Extremely Narrow Sliding', desc: '1.3mm visible stile for maximum glass area.', specs: { thickness: '24mm DGU', rating: 'SLA Level 5', finish: 'Anodized Black' } },
      { x: 75, y: 30, title: 'Tempered Low-E Glazing', desc: 'Thermal break technology for heat reduction.', specs: { u_value: '1.1 W/m²K', solar_gain: '0.28', clarity: '92%' } }
    ]
  },
  {
    id: 'def-2',
    title: 'The Innovation Facility',
    location: 'Spintex Industrial Area',
    img: 'file:///Users/truth/.gemini/antigravity/brain/adb28acf-05bb-4a06-add4-ff18df02d9db/glass_fabrication_facility_1777731490604.png',
    description: 'Where precision meets scale. Our fabrication facility utilizes high-tech CNC processing to ensure sub-millimeter accuracy for every component.',
    hotspots: [
      { x: 50, y: 60, title: 'CNC Glass Processing', desc: 'Automated edge grinding and drilling for structural safety.', specs: { precision: '±0.2mm', speed: '45m/min', max_size: '3000x6000mm' } },
      { x: 20, y: 40, title: 'Toughening Line', desc: 'High-speed tempering for maximum mechanical strength.', specs: { temp: '700°C', stress: '>95 MPa', standard: 'EN 12150' } }
    ]
  },
  {
    id: 'def-3',
    title: 'Structural Luxe Interior',
    location: 'East Legon',
    img: 'file:///Users/truth/.gemini/antigravity/brain/adb28acf-05bb-4a06-add4-ff18df02d9db/luxury_interior_glass_partitions_1777731505732.png',
    description: 'Bespoke interior finishing where architectural glass partitions define luxury living and working spaces.',
    hotspots: [
      { x: 30, y: 50, title: 'Frameless Glass Wall', desc: 'Floor-to-ceiling glass systems with recessed aluminum tracks.', specs: { height: '3.2m', glass: '12mm Monolithic', finish: 'Satin Bronze' } },
      { x: 60, y: 40, title: 'Acoustic Laminated Glass', desc: 'High-performance sound reduction for private suites.', specs: { stc_rating: '42 dB', interlayer: '0.76mm PVB', thickness: '13.52mm' } }
    ]
  },
  {
    id: 'def-4',
    title: 'Reflective Facade Detail',
    location: 'Tema Waterfront',
    img: 'file:///Users/truth/.gemini/antigravity/brain/adb28acf-05bb-4a06-add4-ff18df02d9db/glass_skylight_facade_detail_1777731521501.png',
    description: 'High-performance curtain wall systems engineered for the harsh West African climate.',
    hotspots: [
      { x: 45, y: 55, title: 'Structural Silicone Glazing', desc: 'Frameless exterior appearance with mechanical fixings.', specs: { wind_load: '3.5 kPa', sealant: 'Dow Corning 993', movement: '±25%' } },
      { x: 70, y: 40, title: 'Solar Control Coating', desc: 'Reflective coating for energy efficiency and privacy.', specs: { shgc: '0.22', vlt: '18%', reflectance: '34%' } }
    ]
  }
];


const Hotspot = ({ h, ac, mob }) => {
  const [open, setOpen] = useState(false);
  return (
    <div 
      style={{ position: 'absolute', left: `${h.x}%`, top: `${h.y}%`, zIndex: 100 }}
      onMouseEnter={() => !mob && setOpen(true)}
      onMouseLeave={() => !mob && setOpen(false)}
      onClick={() => mob && setOpen(!open)}
    >
      <motion.div 
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ width: mob ? 28 : 24, height: mob ? 28 : 24, background: '#fff', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,0,0,0.4)' }}
      >
        <div style={{ width: mob ? 10 : 8, height: mob ? 10 : 8, background: ac, borderRadius: '50%' }} />
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={{ 
              position: 'absolute', bottom: mob ? 'auto' : 40, top: mob ? 40 : 'auto', left: '50%', transform: 'translateX(-50%)',
              width: mob ? 180 : 240, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
              padding: mob ? 12 : 20, borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              pointerEvents: 'none', border: '1px solid rgba(0,0,0,0.1)', zIndex: 1000
            }}
          >
            <h4 style={{ margin: '0 0 8px', fontSize: mob ? 11 : 13, fontWeight: 800, color: DARK_TEXT }}>{h.title}</h4>
            <p style={{ margin: '0 0 12px', fontSize: mob ? 9 : 11, color: 'rgba(0,0,0,0.6)', lineHeight: 1.4 }}>{h.desc}</p>
            {h.specs && (
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {Object.entries(h.specs).map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 7, fontWeight: 800, color: ac, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{k}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: DARK_TEXT }}>{v}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function LuxeShowcase({ brand }) {
  const [scenes, setScenes] = useState([]);
  const [active, setActive] = useState(0);
  const [winW, setWinW] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!db) {
      setScenes(DEFAULT_SCENES);
      return;
    }
    const q = query(collection(db, 'showcase'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setScenes(data.length > 0 ? data : DEFAULT_SCENES);
    }, (err) => {
      console.error(err);
      setScenes(DEFAULT_SCENES);
    });
    return unsub;
  }, []);

  const scene = scenes[active] || DEFAULT_SCENES[0];
  const ac = brand?.color || AC;
  const mob = winW <= 900;

  useEffect(() => {
    const h = () => setWinW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const next = () => setActive((active + 1) % scenes.length);
  const prev = () => setActive((active - 1 + scenes.length) % scenes.length);

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#000', overflow: 'hidden', position: 'relative', fontFamily: 'var(--font-p)' }}>
      
      {/* Cinematic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img src={scene.img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: mob ? 0.7 : 0.8 }} alt={scene.title} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.1), rgba(0,0,0,0.9))' }} />
          
          {/* Hotspots */}
          {scene.hotspots.map((h, i) => <Hotspot key={i} h={h} ac={ac} mob={mob} />)}
        </motion.div>
      </AnimatePresence>

      {/* Floating Interface */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', padding: mob ? '20px' : '40px 5vw' }}>
        
        {/* Top Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
           <button 
             onClick={() => navigate('/')} 
             style={{ 
               display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.1)', 
               backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', 
               color: '#fff', padding: '10px 20px', borderRadius: 100, cursor: 'pointer',
               fontSize: mob ? 10 : 12, fontWeight: 700 
             }}
           >
              <ArrowLeft size={mob ? 16 : 20} /> Exit Immersive View
           </button>
           
           {!mob && (
             <button onClick={() => navigate('/products')} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 100, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '0.1em' }}>View Product Catalog</button>
           )}
        </div>

        {/* Center: Controls */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
           <button onClick={prev} style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: mob ? 12 : 20, borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(10px)' }}><ChevronLeft size={mob ? 24 : 32} /></button>
           <button onClick={next} style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: mob ? 12 : 20, borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(10px)' }}><ChevronRight size={mob ? 24 : 32} /></button>
        </div>

        {/* Bottom Info Overlay */}
        <div style={{ pointerEvents: 'auto', maxWidth: mob ? '100%' : 600, marginTop: 'auto' }}>
          <motion.div
            key={scene.id + 'text'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span style={{ color: ac, fontSize: mob ? 8 : 10, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>{scene.location}</span>
            <h1 style={{ fontSize: mob ? 28 : 56, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', margin: '0 0 16px', lineHeight: 1.1 }}>{scene.title}</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: mob ? 13 : 16, lineHeight: 1.6, marginBottom: mob ? 24 : 40 }}>{scene.description}</p>
            
            <div style={{ display: 'flex', gap: 12 }}>
               <button onClick={() => navigate('/#contact')} style={{ flex: mob ? 1 : 'none', padding: mob ? '14px 20px' : '20px 40px', background: ac, color: '#fff', border: 'none', borderRadius: 16, fontWeight: 800, fontSize: mob ? 11 : 14, cursor: 'pointer', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>Inquire Project</button>
               {!mob && (
                 <button onClick={() => navigate('/portfolio')} style={{ padding: '20px 40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: 16, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>View Case Studies</button>
               )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div style={{ position: 'absolute', bottom: mob ? 20 : 40, right: mob ? '50%' : '5vw', transform: mob ? 'translateX(50%)' : 'none', display: 'flex', gap: 8 }}>
         {scenes.map((_, i) => (
           <div key={i} style={{ width: i === active ? (mob ? 24 : 40) : 8, height: 6, background: i === active ? ac : 'rgba(255,255,255,0.2)', borderRadius: 4, transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }} />
         ))}
      </div>

      {/* Progress Bar */}
      <motion.div 
        key={active}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 12, ease: 'linear' }}
        style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: ac }}
      />
    </div>
  );
}