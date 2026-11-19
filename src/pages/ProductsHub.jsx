import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, Info, Search,
  Download, Filter, ArrowRight, ShoppingCart, Zap, MessageCircle,
  Layers, AppWindow, ShowerHead, ChefHat, Shirt, LayoutGrid,
  DoorOpen, Droplets, Armchair
} from 'lucide-react';
import { PubNav, Footer } from './PublicSite';
import { WATERPROOFING_CATEGORIES, WATERPROOFING_PRODUCTS } from '../waterproofingCatalog';

const WA_ICON = () => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
// Removed static import of huge data file

const LIGHT_BG = '#FDFCFB';
const DARK_TEXT = '#1A1410';
const AC = '#C8A96E';

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
const isMob = (w) => w <= 900;

// --- COMPONENTS ---

const ProductCard = ({ product, onClick, ac, mob, onCompare, isComparing, waNumber, onAddToBasket }) => {
  const pCats = Array.isArray(product.cat) ? product.cat : [product.cat];
  const catLabel = WATERPROOFING_CATEGORIES.find((category) => category.id === pCats[0])?.label || pCats[0];
  const descText = product.description || product.desc || "";
  const waMsg = encodeURIComponent(`Hi Glasstech, I'd like to order or ask about ${product.name}${product.packSize ? ` (${product.packSize})` : ''}. Please confirm price and availability.`);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={mob ? {} : { y: -6 }}
      onClick={onClick}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        border: isComparing ? `2px solid ${ac}` : '1px solid rgba(0,0,0,0.05)',
        cursor: 'pointer',
        boxShadow: isComparing ? `0 20px 40px ${ac}15` : '0 8px 24px rgba(0,0,0,0.04)',
        display: 'flex', flexDirection: 'column',
        position: 'relative', transition: 'box-shadow 0.25s',
      }}
    >
      <div style={{ height: mob ? 220 : 260, background: '#F9F7F4', position: 'relative', overflow: 'hidden' }}>
        {product.img ? <img
          src={product.img}
          alt={product.name}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: mob ? 10 : 20 }}
        /> : <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: '#126e82', background: 'linear-gradient(140deg,#e2f0f0,#f8fbfa)' }}>
          <Droplets size={55} strokeWidth={1.15} />
          <span style={{ fontWeight: 800, letterSpacing: '0.12em', fontSize: 12 }}>{product.brand || 'GLASSTECH'}</span>
        </div>}
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onCompare(product.id); }}
            style={{
              padding: '5px 10px', background: isComparing ? ac : 'rgba(255,255,255,0.92)',
              color: isComparing ? '#fff' : DARK_TEXT, border: 'none', borderRadius: 100,
              fontSize: 11, fontWeight: 800, cursor: 'pointer', backdropFilter: 'blur(10px)'
            }}
          >
            {isComparing ? 'SELECTED' : '+ COMPARE'}
          </button>
          <div style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.92)', borderRadius: 100, fontSize: 10, fontWeight: 800, color: ac, backdropFilter: 'blur(10px)' }}>
            {catLabel.toUpperCase()}
          </div>
        </div>
      </div>
      <div style={{ padding: mob ? 16 : 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {product.brand && <span style={{ fontSize: 12, color: '#126e82', fontWeight: 800, marginBottom: 6 }}>{product.brand}</span>}
        <h3 style={{ fontSize: mob ? 17 : 19, fontWeight: 800, margin: '0 0 6px', color: DARK_TEXT }}>{product.name}</h3>
        <p style={{ fontSize: 14, color: '#58676a', lineHeight: 1.5, margin: '0 0 16px', flex: 1 }}>
          {product.tagline || (descText.length > 80 ? descText.substring(0, 80) + '...' : descText)}
        </p>
        {product.packSize && <div style={{ fontSize: 13, color: '#526970', marginBottom: 12 }}>Manufacturer pack: <strong>{product.packSize}</strong></div>}
        {product.sourceUrl && <div style={{ fontSize: 12, color: '#667b7e', marginBottom: 10 }}>Price and availability: confirm with Glasstech</div>}
        <div style={{ display: 'flex', gap: 8, borderTop: '1px solid #f5f5f5', paddingTop: 14 }}>
          <a
            href={`https://wa.me/${waNumber || '233598455012'}?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px 4px', background: '#25D366', color: '#fff', borderRadius: 10, fontSize: 12, fontWeight: 800, textDecoration: 'none' }}
          >
            <WA_ICON /> Ask to buy
          </a>
          <button onClick={(e) => { e.stopPropagation(); onAddToBasket(product.id); }} style={{ display: 'flex', alignItems: 'center', gap: 6, color: DARK_TEXT, fontSize: 12, fontWeight: 800, padding: '10px 12px', background: '#e8f2f2', border: 0, borderRadius: 10, cursor: 'pointer' }}><ShoppingCart size={15} /> Add</button>
        </div>
      </div>
    </motion.div>
  );
};

const DetailModal = ({ product, onClose, ac, mob, waNumber, onAddToBasket }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Default');
  const [selectedGlass, setSelectedGlass] = useState(product.options?.[0] || 'Standard');

  if (!product) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(26,20,16,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: mob ? 0 : 20 }}
      onClick={onClose}
    >
      <motion.div 
        initial={mob ? { y: '100%' } : { scale: 0.9, y: 20 }}
        animate={mob ? { y: 0 } : { scale: 1, y: 0 }}
        exit={mob ? { y: '100%' } : { scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{ 
          background: '#fff', width: '100%', maxWidth: 1000, 
          borderRadius: mob ? '24px 24px 0 0' : 32, 
          overflow: 'hidden', display: 'flex', flexDirection: 'column', 
          maxHeight: mob ? '95vh' : '90vh',
          marginTop: mob ? 'auto' : 0
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', height: '100%', overflowY: 'auto' }}>
          {/* Left: Image & Dynamic Finish Switcher */}
          <div style={{ flex: '1 1 500px', background: '#F9F7F4', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: mob ? 20 : 40, minHeight: mob ? 300 : 400 }}>
            {product.img ? <motion.img
              key={selectedColor}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              src={product.finishImages?.[selectedColor] || product.img} 
              alt={product.name} 
              onError={(e) => { e.target.src = '/kitchen/default.png'; }}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
            /> : <div style={{ color: '#126e82', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}><Droplets size={88} strokeWidth={1.1} /><strong>{product.brand}</strong></div>}
            <button onClick={onClose} style={{ position: 'absolute', top: 24, left: 24, background: '#fff', border: 'none', padding: 12, borderRadius: '50%', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <X size={20} />
            </button>

            {/* Selection HUD */}
            {(product.colors || product.options) && <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', gap: 8, justifyContent: 'center' }}>
               <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.9)', borderRadius: 100, fontSize: 10, fontWeight: 800, backdropFilter: 'blur(10px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: DARK_TEXT }}>
                 {selectedColor.toUpperCase()}
               </div>
               <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.9)', borderRadius: 100, fontSize: 10, fontWeight: 800, backdropFilter: 'blur(10px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: ac }}>
                 {selectedGlass.toUpperCase()}
               </div>
            </div>}
          </div>
          
          {/* Right: Info & Material Switcher */}
          <div style={{ flex: '1 1 400px', padding: mob ? '32px 24px 100px' : '40px 48px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'inline-block', alignSelf: 'flex-start', padding: '4px 12px', background: `${ac}15`, color: ac, fontSize: 10, fontWeight: 900, borderRadius: 100, marginBottom: 20 }}>
              {(Array.isArray(product.cat) ? product.cat[0] : product.cat).toUpperCase()}
            </div>
            <h2 style={{ fontSize: mob ? 24 : 32, fontWeight: 800, margin: '0 0 16px', color: DARK_TEXT }}>{product.name}</h2>
            {product.brand && <p style={{ margin: '-5px 0 18px', color: '#126e82', fontWeight: 700 }}>{product.brand} · manufacturer reference</p>}
            {product.description && <p style={{ fontSize: 15, lineHeight: 1.6, color: '#526970' }}>{product.description}</p>}
            
            {/* Dynamic Selectors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
               {product.colors && (
                 <div>
                    <h4 style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)', marginBottom: 12 }}>Finish Selection</h4>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                       {product.colors.slice(0, 8).map(c => (
                         <button 
                           key={c} 
                           onClick={() => setSelectedColor(c)}
                           style={{ 
                             padding: '8px 14px', borderRadius: 8, fontSize: 11, fontWeight: 800, border: 'none', cursor: 'pointer',
                             background: selectedColor === c ? DARK_TEXT : '#F5F5F5',
                             color: selectedColor === c ? '#fff' : DARK_TEXT,
                             transition: 'all 0.2s'
                           }}
                         >
                           {c}
                         </button>
                       ))}
                    </div>
                 </div>
               )}

               {product.options && (
                 <div>
                    <h4 style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)', marginBottom: 12 }}>Structural Glass Configuration</h4>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                       {product.options.slice(0, 4).map(o => (
                         <button 
                           key={o} 
                           onClick={() => setSelectedGlass(o)}
                           style={{ 
                             padding: '10px 16px', borderRadius: 12, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                             background: selectedGlass === o ? `${ac}15` : '#F9F9F9',
                             color: selectedGlass === o ? ac : 'rgba(0,0,0,0.5)',
                             border: selectedGlass === o ? `1px solid ${ac}` : '1px solid transparent'
                           }}
                         >
                           {o}
                         </button>
                       ))}
                    </div>
                 </div>
               )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
              <h4 style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)', margin: 0 }}>Specifications</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {Object.entries(product.specs || {}).map(([k, v]) => (
                  <div key={k}>
                    <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', margin: '0 0 4px', textTransform: 'capitalize' }}>{k}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {product.sourceUrl && <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24, fontSize: 13 }}>
              <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#126e82' }}>Manufacturer page</a>
              {product.datasheetUrl && <a href={product.datasheetUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#126e82' }}>Technical data sheet</a>}
            </div>}
            <div style={{ position: mob ? 'sticky' : 'static', bottom: 0, padding: mob ? '16px 0' : 0, background: '#fff', display: 'flex', gap: 10 }}>
              <button onClick={() => { onAddToBasket(product.id); onClose(); }} style={{ flex: 1, padding: 16, background: '#e8f2f2', color: DARK_TEXT, borderRadius: 10, border: 0, fontWeight: 800, cursor: 'pointer' }}>Add to enquiry basket</button>
              <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi Glasstech, please confirm price and availability for ${product.name}${product.packSize ? ` (${product.packSize})` : ''}.`)}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: 16, textAlign: 'center', background: DARK_TEXT, color: '#fff', borderRadius: 10, fontWeight: 800, textDecoration: 'none' }}>Ask to buy</a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};




export default function ProductsHub({ brand, user, onPortal, setPage, content }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeGroup, setActiveGroup] = useState(() => searchParams.get('group') || 'waterproofing');
  const [filter, setFilter] = useState(() => searchParams.get('cat') || 'All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState(() => searchParams.get('search') || '');
  const [catalogData, setCatalogData] = useState({ products: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('glasstech-enquiry-basket') || '[]');
      return Array.isArray(saved) ? saved : [];
    }
    catch { return []; }
  });
  const [showBasket, setShowBasket] = useState(false);
  
  const winW = useWindowWidth();
  const mob = isMob(winW);
  const ac = activeGroup === 'waterproofing' ? '#126e82' : (brand?.color || AC);

  useEffect(() => {
    setActiveGroup(searchParams.get('group') || 'waterproofing');
    setFilter(searchParams.get('cat') || 'All');
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => { localStorage.setItem('glasstech-enquiry-basket', JSON.stringify(basket)); }, [basket]);

  useEffect(() => {
    if (!showBasket) return undefined;
    const onEscape = (event) => { if (event.key === 'Escape') setShowBasket(false); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [showBasket]);

  useEffect(() => {
    import('../catalog.jsx').then(m => {
      setCatalogData({ products: m.GLASS_CATALOG_DATA, categories: m.GLASS_CATALOG_CATEGORIES });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // CMS products from Firestore are merged ON TOP of the static catalog so both sources are always visible
  const products = useMemo(() => {
    const base = [...WATERPROOFING_PRODUCTS, ...(catalogData.products || [])];
    const cms = Array.isArray(content?.products) ? content.products : [];
    const cmsIds = new Set(cms.map(p => p.id));
    return [...base.filter(p => !cmsIds.has(p.id)), ...cms];
  }, [content?.products, catalogData.products]);
  const categories = useMemo(() => {
    const base = [...WATERPROOFING_CATEGORIES, ...(catalogData.categories || [])];
    const cms = Array.isArray(content?.categories) ? content.categories : [];
    const cmsIds = new Set(cms.map(c => c.id));
    return [...base.filter(c => !cmsIds.has(c.id)), ...cms];
  }, [content?.categories, catalogData.categories]);

  const GROUPS = [
    { id: 'waterproofing', Icon: Droplets, label: 'Waterproofing' },
    { id: 'aluminum',   Icon: AppWindow,  label: 'Aluminium & Glass' },
    { id: 'washroom',   Icon: ShowerHead, label: 'Bathrooms' },
    { id: 'kitchen',    Icon: ChefHat,    label: 'Kitchens' },
    { id: 'wardrobe',   Icon: Shirt,      label: 'Wardrobes' },
    { id: 'tiles',      Icon: LayoutGrid, label: 'Tiles & Flooring' },
    { id: 'doors',      Icon: DoorOpen,   label: 'Doors' },
    { id: 'interior',   Icon: Armchair,   label: 'Interior' },
    { id: 'electrical', Icon: Zap,        label: 'Electrical' },
    { id: 'plumbing',   Icon: Droplets,   label: 'Plumbing' },
  ];
  const waNumber = String(brand?.whatsapp || '233598455012').replace(/\D/g, '');

  const groupCategories = useMemo(() => {
    return categories.filter(c => c.groupId === activeGroup);
  }, [categories, activeGroup]);

  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => {
      if (!p) return false;
      const pCats = Array.isArray(p.cat) ? p.cat : [p.cat];
      const matchGroup = pCats.some(cat => categories.find(c => c.id === cat)?.groupId === activeGroup);
      const matchCat = filter === 'All' || pCats.includes(filter);
      const nameMatch = (p.name || '').toLowerCase().includes((search || '').toLowerCase());
      const descMatch = (p.description || p.desc || '').toLowerCase().includes((search || '').toLowerCase());
      return matchGroup && matchCat && (nameMatch || descMatch);
    });
  }, [activeGroup, filter, search, products, categories]);

  const [comparing, setComparing] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleCompare = (id) => {
    setComparing(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id].slice(-3));
  };

  const compareProducts = useMemo(() => {
    return products.filter(p => comparing.includes(p.id));
  }, [comparing, products]);

  const addToBasket = (id) => setBasket((previous) => {
    const existing = previous.find((item) => item.id === id);
    return existing ? previous.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) : [...previous, { id, quantity: 1 }];
  });
  const updateBasket = (id, change) => setBasket((previous) => previous.map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0));
  const basketItems = basket.map((item) => ({ ...item, product: products.find((product) => product.id === item.id) })).filter((item) => item.product);
  const basketCount = basketItems.reduce((total, item) => total + item.quantity, 0);
  const basketMessage = `Hi Glasstech, I'd like to enquire about buying these materials:\n${basketItems.map((item) => `• ${item.product.name}${item.product.packSize ? ` (${item.product.packSize})` : ''} × ${item.quantity}`).join('\n')}\nPlease confirm prices, availability and delivery.`;

  return (
    <div style={{ minHeight: '100vh', background: LIGHT_BG, color: DARK_TEXT, fontFamily: 'var(--font-p)', position: 'relative' }}>
      <PubNav brand={brand} setPage={setPage} activePage="products" onPortal={onPortal} user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigate={navigate} />

      <main style={{ padding: mob ? '100px 20px 100px' : '160px 5vw 100px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ marginBottom: mob ? 32 : 48 }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: ac }}>SUPPLY & INSTALLATION</span>
          <h1 style={{ fontSize: mob ? 32 : 56, fontWeight: 800, letterSpacing: '-0.04em', margin: '12px 0 16px', lineHeight: 1.05 }}>
            {activeGroup === 'waterproofing' ? <>Waterproofing <span style={{ color: ac }}>Materials.</span></> : <>Products & <span style={{ color: ac }}>Materials.</span></>}
          </h1>
          <p style={{ color: 'rgba(26,20,16,0.5)', fontSize: mob ? 14 : 17, maxWidth: 700, lineHeight: 1.7 }}>
            {activeGroup === 'waterproofing' ? 'Browse manufacturer-listed waterproofing materials by application and product type. Ask Glasstech for confirmed supply, pricing and installation options.' : 'Explore building finishing materials and custom systems. Ask about supply or a complete installation quote.'}
          </p>
        </div>

        {/* Top CTA strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, padding: '16px 24px', background: '#1A1410', borderRadius: 16, marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Need help choosing a system?</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Tell us where the water is entering and what surface is affected.</div>
          </div>
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hi Glasstech, I need help choosing waterproofing materials for my project.')}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#25D366', color: '#fff', borderRadius: 12, fontWeight: 800, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            <WA_ICON /> Ask a specialist
          </a>
        </div>

        {loading && (
          <div style={{ padding: '100px 0', textAlign: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'inline-block' }}>
              <Zap size={40} color={ac} />
            </motion.div>
            <p className="lxf" style={{ marginTop: 20, color: '#B5AFA9' }}>Syncing Global Catalog...</p>
          </div>
        )}

        {!loading && (
          <>

        {/* Group Selector */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: 12, overflowX: 'auto' }} className="no-scrollbar">
          {GROUPS.map(g => (
            <button
              key={g.id}
              onClick={() => setSearchParams({ group: g.id })}
              style={{
                background: 'none', border: 'none', padding: '8px 14px', cursor: 'pointer',
                fontSize: 12, fontWeight: 700, color: activeGroup === g.id ? ac : 'rgba(0,0,0,0.38)',
                position: 'relative', transition: 'all 0.3s', whiteSpace: 'nowrap',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              <g.Icon size={14} strokeWidth={activeGroup === g.id ? 2.25 : 1.75} />
              {g.label}
              {activeGroup === g.id && (
                <motion.div layoutId="g-line" style={{ position: 'absolute', bottom: -12, left: 0, right: 0, height: 2, background: ac, borderRadius: 2 }} />
              )}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div style={{ marginBottom: mob ? 32 : 40, display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 20 }}>

          <div style={{ flex: 1, position: 'relative' }}>
            <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.3)' }} size={18} />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products and uses..."
              style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', background: '#fff', fontSize: 14 }} 
            />
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: mob ? 12 : 0, whiteSpace: 'nowrap' }} className="no-scrollbar">
            {['All', ...groupCategories.map(c => c.id)].map(c => (
              <button 
                key={String(c)} onClick={() => setSearchParams(c === 'All' ? { group: activeGroup } : { group: activeGroup, cat: c })}
                style={{ 
                  padding: '12px 20px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 800,
                  background: filter === c ? DARK_TEXT : '#fff',
                  color: filter === c ? '#fff' : 'rgba(0,0,0,0.4)',
                  boxShadow: filter === c ? 'none' : '0 4px 12px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s'
                }}
              >
                {c === 'All' ? 'All' : groupCategories.find(category => category.id === c)?.label || c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: mob ? 24 : 32 
        }}>
          {(filtered || []).length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '80px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: DARK_TEXT, marginBottom: 8 }}>No reference products listed here yet</div>
              <div style={{ fontSize: 14, color: '#65777a', marginBottom: 24 }}>Ask Glasstech about materials for this application and current availability.</div>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi Glasstech, I'm looking for materials in the ${filter} category. Can you help?`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#25D366', color: '#fff', borderRadius: 14, fontWeight: 800, fontSize: 14, textDecoration: 'none' }}
              >
                <WA_ICON /> Ask about materials
              </a>
            </div>
          )}
          {(filtered || []).map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => setSelectedProduct(p)}
              ac={ac}
              mob={mob}
              onCompare={toggleCompare}
              isComparing={comparing.includes(p.id)}
              waNumber={waNumber}
              onAddToBasket={addToBasket}
            />
          ))}
        </div>
        </>
        )}
      </main>

      <Footer brand={brand} setPage={setPage} navigate={navigate} />

      {basketCount > 0 && <button onClick={() => setShowBasket(true)} style={{ position: 'fixed', bottom: comparing.length > 0 && mob ? 100 : 22, right: 22, zIndex: 5200, display: 'flex', alignItems: 'center', gap: 10, background: '#102e37', color: '#fff', border: 0, borderRadius: 12, padding: '14px 18px', fontSize: 14, fontWeight: 800, cursor: 'pointer', boxShadow: '0 12px 30px #102e3740' }}><ShoppingCart size={19} /> Enquiry basket ({basketCount})</button>}
      {showBasket && <div role="dialog" aria-modal="true" aria-label="Enquiry basket" style={{ position: 'fixed', inset: 0, zIndex: 12000, background: '#10222ac0', display: 'flex', justifyContent: 'flex-end' }} onClick={() => setShowBasket(false)}>
        <div style={{ width: 'min(100%, 460px)', background: '#fff', minHeight: '100%', padding: 24, overflowY: 'auto', boxShadow: '-15px 0 35px #0002' }} onClick={(event) => event.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}><h2 style={{ margin: 0, fontSize: 25 }}>Enquiry basket</h2><button onClick={() => setShowBasket(false)} aria-label="Close basket" style={{ background: 'none', border: 0, cursor: 'pointer' }}><X size={24} /></button></div>
          <p style={{ color: '#587075', lineHeight: 1.5, fontSize: 14 }}>Send these items to Glasstech to confirm prices, availability and delivery.</p>
          {basketItems.map(({ product, quantity }) => <div key={product.id} style={{ borderBottom: '1px solid #e3eaea', padding: '18px 0', display: 'flex', justifyContent: 'space-between', gap: 12 }}><div><strong>{product.name}</strong><div style={{ color: '#64787c', fontSize: 13, marginTop: 4 }}>{product.packSize || product.brand || 'Product enquiry'}</div></div><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><button onClick={() => updateBasket(product.id, -1)} aria-label={`Remove one ${product.name}`} style={{ width: 30, height: 30, border: '1px solid #cbdcdd', background: '#fff', cursor: 'pointer' }}>−</button><span>{quantity}</span><button onClick={() => updateBasket(product.id, 1)} aria-label={`Add one ${product.name}`} style={{ width: 30, height: 30, border: '1px solid #cbdcdd', background: '#fff', cursor: 'pointer' }}>+</button></div></div>)}
          <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(basketMessage)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: 10, padding: 17, marginTop: 26, fontWeight: 800 }}><WA_ICON /> Send order enquiry</a>
        </div>
      </div>}

      {/* Comparison Tray */}
      <AnimatePresence>
        {comparing.length > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            style={{ 
              position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', 
              background: DARK_TEXT, padding: '12px 24px', borderRadius: 100, 
              display: 'flex', alignItems: 'center', gap: 24, zIndex: 5000,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
             <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ background: ac, color: '#fff', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900 }}>{comparing.length}</div>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items Selected</span>
             </div>
             <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)' }} />
             <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  onClick={() => setShowComparison(true)}
                  style={{ background: '#fff', color: DARK_TEXT, border: 'none', padding: '10px 20px', borderRadius: 100, fontSize: 11, fontWeight: 900, cursor: 'pointer' }}
                >
                   COMPARE NOW
                </button>
                <button 
                  onClick={() => setComparing([])}
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 100, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
                >
                   CLEAR
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 11000, background: '#fff', overflowY: 'auto', padding: mob ? '20px' : '60px 5vw' }}
          >
             <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
                   <h2 style={{ fontSize: 32, fontWeight: 800 }}>Technical Comparison</h2>
                   <button onClick={() => setShowComparison(false)} style={{ padding: 12, background: '#f5f5f5', border: 'none', borderRadius: '50%', cursor: 'pointer' }}><X /></button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${comparing.length}, 1fr)`, gap: 32 }}>
                   {compareProducts.map(p => (
                     <div key={p.id}>
                        {p.img ? <img src={p.img} alt={p.name} style={{ width: '100%', height: 200, objectFit: 'contain', background: '#F9F7F4', borderRadius: 16, marginBottom: 24 }} /> : <div style={{ width: '100%', height: 200, background: '#e8f2f2', borderRadius: 16, marginBottom: 24, display: 'grid', placeItems: 'center', color: '#126e82' }}><Droplets size={48} /></div>}
                        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>{p.name}</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                           <div>
                              <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: ac, marginBottom: 8 }}>Performance</div>
                              {Object.entries(p.performance || {}).map(([k,v]) => (
                                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: 12 }}>
                                   <span style={{ color: 'rgba(0,0,0,0.4)', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</span>
                                   <span style={{ fontWeight: 700 }}>{v}</span>
                                </div>
                              ))}
                           </div>
                           <div>
                              <div style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: ac, marginBottom: 8 }}>Specs</div>
                              {Object.entries(p.specs || {}).map(([k,v]) => (
                                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: 12 }}>
                                   <span style={{ color: 'rgba(0,0,0,0.4)', textTransform: 'capitalize' }}>{k}</span>
                                   <span style={{ fontWeight: 700 }}>{v}</span>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <DetailModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            ac={ac} 
            mob={mob}
            waNumber={waNumber}
            onAddToBasket={addToBasket}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

