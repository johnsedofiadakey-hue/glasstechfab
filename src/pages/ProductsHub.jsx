import React, { useState, useMemo, useEffect } from 'react';
import { GLASS_CATALOG_DATA, GLASS_CATALOG_CATEGORIES } from '../data.jsx';
import {
  X, ChevronRight, Check, Search, Send, CheckCircle,
  ArrowRight, Maximize2, Phone, MessageSquare
} from 'lucide-react';

const AC = '#C8A96E';
const DARK = '#1A1410';
const WARM = '#F8F5F0';

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

// ─── QUOTE REQUEST MODAL ──────────────────────────────────────────────────────
function QuoteModal({ product, brand, onClose, onSubmit }) {
  const ac = brand?.color || AC;
  const [step, setStep] = useState(1); // 1=details, 2=contact, 3=done
  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '', location: '',
    qty: '', dimensions: '', notes: '',
    productName: product?.name || '',
    productSku: product?.sku || '',
    category: product?.cat || '',
  });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit({
      ...form,
      productName: form.productName,
      quantity: form.qty,
      destination: form.location,
    });
    setLoading(false);
    setStep(3);
  };

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 3000,
        background: 'rgba(10,8,6,0.8)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
    >
      <div style={{
        background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520,
        maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
      }}>
        {/* Header */}
        <div style={{ padding: '28px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: ac, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 4 }}>
              {step === 3 ? 'All done' : `Step ${step} of 2`}
            </div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: DARK, letterSpacing: '-0.02em' }}>
              {step === 1 ? 'Product Details' : step === 2 ? 'Your Contact Info' : 'Request Submitted'}
            </h3>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            color: '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}><X size={18} /></button>
        </div>

        {/* Progress bar */}
        {step < 3 && (
          <div style={{ margin: '16px 28px 0', height: 3, background: '#eee', borderRadius: 3, flexShrink: 0 }}>
            <div style={{ height: '100%', width: step === 1 ? '50%' : '100%', background: ac, borderRadius: 3, transition: 'width 0.4s ease' }} />
          </div>
        )}

        {/* Body */}
        <div style={{ padding: 28, overflowY: 'auto', flex: 1 }}>

          {/* Step 1 — Product Details */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {product && (
                <div style={{ padding: '14px 16px', background: WARM, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center', marginBottom: 4 }}>
                  <img src={product.img} alt={product.name}
                    style={{ width: 60, height: 44, objectFit: 'cover', objectPosition: 'center top', borderRadius: 8 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: DARK }}>{product.name}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>SKU: {product.sku}</div>
                  </div>
                </div>
              )}
              {!product && (
                <input placeholder="Product / System Name" value={form.productName}
                  onChange={e => set('productName', e.target.value)}
                  style={inp} />
              )}
              <input placeholder="Approximate Quantity (e.g. 12 units, 40 sqm)"
                value={form.qty} onChange={e => set('qty', e.target.value)} style={inp} />
              <input placeholder="Dimensions (W × H in mm, or 'will confirm')"
                value={form.dimensions} onChange={e => set('dimensions', e.target.value)} style={inp} />
              <input placeholder="Project Location (e.g. East Legon, Accra)"
                value={form.location} onChange={e => set('location', e.target.value)} style={inp} />
              <textarea placeholder="Additional notes — frame color, glass type, timeline…"
                value={form.notes} onChange={e => set('notes', e.target.value)}
                rows={3} style={{ ...inp, resize: 'vertical' }} />
              <button onClick={() => setStep(2)} disabled={!form.qty}
                style={{ ...btnPrimary(ac), opacity: form.qty ? 1 : 0.4 }}>
                Continue <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Step 2 — Contact */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input placeholder="Your Full Name *" value={form.name}
                onChange={e => set('name', e.target.value)} style={inp} />
              <input placeholder="Company / Project Name" value={form.company}
                onChange={e => set('company', e.target.value)} style={inp} />
              <input placeholder="Phone Number *" type="tel" value={form.phone}
                onChange={e => set('phone', e.target.value)} style={inp} />
              <input placeholder="Email Address" type="email" value={form.email}
                onChange={e => set('email', e.target.value)} style={inp} />
              <div style={{ padding: '12px 16px', background: '#F0F9F4', borderRadius: 10, fontSize: 11, color: '#555', lineHeight: 1.6 }}>
                <strong>No commitment required.</strong> We'll follow up within 24 hours with a proforma 
                quote based on current rates and your site requirements.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setStep(1)} style={btnOutline}>← Back</button>
                <button onClick={handleSubmit} disabled={!form.name || !form.phone || loading}
                  style={{ ...btnPrimary(ac), flex: 2, opacity: (!form.name || !form.phone) ? 0.4 : 1 }}>
                  {loading ? 'Sending…' : <><Send size={14} /> Submit Request</>}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Done */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '24px 0 12px' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle size={32} color="#fff" />
              </div>
              <h4 style={{ fontSize: 20, fontWeight: 800, color: DARK, marginBottom: 8 }}>Request Received</h4>
              <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7, marginBottom: 28 }}>
                Your quote request has been routed to our procurement desk. 
                An account manager will contact you within 24 hours with pricing and availability.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <a href="https://wa.me/233598455012" target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: '#25D366', color: '#fff', borderRadius: 10, fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>
                  <MessageSquare size={13} /> WhatsApp Us
                </a>
                <button onClick={onClose} style={btnOutline}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT DETAIL DRAWER ────────────────────────────────────────────────────
function ProductDrawer({ product, brand, onClose, onQuote }) {
  const ac = brand?.color || AC;
  if (!product) return null;
  const cat = GLASS_CATALOG_CATEGORIES.find(c => c.id === product.cat);

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(10,8,6,0.75)', backdropFilter: 'blur(10px)',
        display: 'flex', justifyContent: 'flex-end',
      }}
    >
      <div style={{
        width: '100%', maxWidth: 540, height: '100%', background: '#fff',
        overflowY: 'auto', display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.2)',
        animation: 'slideIn 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>

        {/* Image */}
        <div style={{ height: 280, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
          <img src={product.fullImg || product.img} alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,20,16,0.65) 0%, transparent 55%)' }} />
          <button onClick={onClose} style={{
            position: 'absolute', top: 16, right: 16, width: 38, height: 38,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.25)', borderRadius: '50%',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
          }}><X size={15} /></button>
          <div style={{ position: 'absolute', bottom: 20, left: 24 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: ac, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 5 }}>
              {cat?.label} · {product.sku}
            </div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{product.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 28px', flex: 1 }}>
          <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, margin: '0 0 24px' }}>{product.tagline}</p>

          {/* Status */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: product.status === 'Pre-order' ? '#FFF7ED' : '#F0FDF4', borderRadius: 100, marginBottom: 24 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: product.status === 'Pre-order' ? '#F97316' : '#16A34A' }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: product.status === 'Pre-order' ? '#F97316' : '#16A34A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{product.status}</span>
          </div>

          {/* Specs */}
          <div style={{ marginBottom: 24 }}>
            <div style={sectionLabel(ac)}>Specifications</div>
            <div style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
              {Object.entries(product.specs).map(([k, v], i, arr) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', borderBottom: i < arr.length - 1 ? '1px solid #f0f0f0' : 'none', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  <span style={{ fontSize: 11, color: '#888', fontWeight: 500 }}>{k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                  <span style={{ fontSize: 11, color: DARK, fontWeight: 700, textAlign: 'right', maxWidth: '55%' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          {product.performance && Object.keys(product.performance).length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={sectionLabel(ac)}>Performance Ratings</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {Object.entries(product.performance).map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 12px', background: WARM, borderRadius: 10 }}>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 3 }}>{k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: DARK }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Options */}
          {product.options?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={sectionLabel(ac)}>Available Options</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {product.options.map((o, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: `${ac}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <Check size={9} color={ac} />
                    </div>
                    <span style={{ fontSize: 12, color: '#555', lineHeight: 1.4 }}>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={sectionLabel(ac)}>Frame Colors</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {product.colors.map((c, i) => (
                  <span key={i} style={{ fontSize: 10, padding: '4px 10px', background: WARM, borderRadius: 100, color: DARK, fontWeight: 600 }}>{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky CTA */}
        <div style={{ padding: '16px 28px 28px', borderTop: '1px solid #eee', background: '#fff', flexShrink: 0 }}>
          <button onClick={() => onQuote(product)} style={{ ...btnPrimary(ac), width: '100%', justifyContent: 'center', fontSize: 13 }}>
            Request a Quote for This Product
          </button>
          <div style={{ textAlign: 'center', marginTop: 10, fontSize: 11, color: '#aaa' }}>
            No commitment. Response within 24 hours.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, brand, onOpen, onQuote }) {
  const [hovered, setHovered] = useState(false);
  const ac = brand?.color || AC;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16, overflow: 'hidden', background: '#fff',
        border: '1px solid rgba(26,20,16,0.07)',
        boxShadow: hovered ? '0 16px 40px rgba(26,20,16,0.1)' : '0 2px 12px rgba(26,20,16,0.05)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ height: 190, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
        onClick={() => onOpen(product)}>
        <img src={product.img} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
            transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(26,20,16,0.45) 100%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s'
        }} />
        {/* Status badge */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: product.status === 'Pre-order' ? '#F97316' : '#16A34A',
          color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 8px',
          borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.1em'
        }}>{product.status}</div>
        {/* View detail hint */}
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
          borderRadius: '50%', width: 30, height: 30,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', color: '#fff'
        }}>
          <Maximize2 size={12} />
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: ac, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 4 }}>{product.sku}</div>
        <h3 onClick={() => onOpen(product)} style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 800, color: DARK, lineHeight: 1.3, cursor: 'pointer' }}>
          {product.name}
        </h3>
        <p style={{ margin: '0 0 12px', fontSize: 11, color: '#999', lineHeight: 1.4, flex: 1 }}>{product.tagline}</p>

        {/* 1 key spec preview */}
        {Object.entries(product.specs).slice(0, 1).map(([k, v]) => (
          <div key={k} style={{ fontSize: 10, color: '#bbb', display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span>{k.replace(/([A-Z])/g, ' $1')}</span>
            <span style={{ fontWeight: 700, color: '#888' }}>{String(v).substring(0, 20)}</span>
          </div>
        ))}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => onOpen(product)} style={{
            flex: 1, padding: '8px 0', background: WARM, border: 'none', borderRadius: 8,
            fontSize: 10, fontWeight: 700, color: DARK, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
          }}>
            Details <ChevronRight size={11} />
          </button>
          <button onClick={() => onQuote(product)} style={{
            flex: 1, padding: '8px 0', background: DARK, border: 'none', borderRadius: 8,
            fontSize: 10, fontWeight: 700, color: '#fff', cursor: 'pointer',
          }}>
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── COMING SOON CATEGORY ─────────────────────────────────────────────────────
function ComingSoonGrid({ category, brand, onQuote }) {
  const ac = brand?.color || AC;
  const placeholders = {
    tiles: {
      icon: '🪟', title: 'Tiles & Flooring Catalog',
      desc: 'Large-format porcelain, marble, and hardwood flooring systems. Spanish and Italian collections. Precision installation available.',
      items: ['Porcelain Large Format', 'Marble & Natural Stone', 'Herringbone Hardwood', 'Anti-slip Outdoor', 'Epoxy Coatings', 'Mosaic & Feature Tiles'],
      coming: 'Q3 2026'
    },
    kitchen: {
      icon: '🍳', title: 'Kitchen Systems Catalog',
      desc: 'Bespoke cabinetry, worktops, smart appliance integration, and full kitchen fit-out packages sourced from top manufacturers.',
      items: ['High-Gloss Cabinet Sets', 'Handleless Kitchen Range', 'Stone Worktops', 'Smart Appliance Packages', 'Island Units', 'Open Shelf Systems'],
      coming: 'Q3 2026'
    },
    wardrobes: {
      icon: '👗', title: 'Wardrobes & Storage Catalog',
      desc: 'Custom walk-in closets, sliding wardrobe doors, and modular storage systems in a range of finishes.',
      items: ['Sliding Door Wardrobes', 'Walk-in Closet Systems', 'Open Wardrobe Frames', 'Bedside & Drawer Units', 'Mirror Door Panels', 'Shoe Cabinet Systems'],
      coming: 'Q4 2026'
    },
    hardware: {
      icon: '🔩', title: 'Hardware & Accessories',
      desc: 'Architectural handles, hinges, locks, frameless glass fittings, and structural hardware for glass and aluminum systems.',
      items: ['Architectural Handles', 'GU & WEHAG Hinges', 'Magnetic & Multi-point Locks', 'Glass Spider Fittings', 'Frameless Balustrade Clips', 'Pivot Door Hardware'],
      coming: 'Q4 2026'
    },
  };
  const data = placeholders[category?.id] || null;
  if (!data) return null;

  return (
    <div style={{ padding: '60px 0' }}>
      {/* Hero card */}
      <div style={{
        background: DARK, borderRadius: 20, padding: '48px 40px', marginBottom: 40,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, fontSize: 180, opacity: 0.06, lineHeight: 1 }}>{data.icon}</div>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: `${ac}25`, color: ac, borderRadius: 100, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>
            Coming {data.coming}
          </div>
          <h2 style={{ margin: '0 0 16px', fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>{data.title}</h2>
          <p style={{ margin: '0 0 28px', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 480 }}>{data.desc}</p>
          <button onClick={() => onQuote(null)} style={{ ...btnPrimary(ac), fontSize: 12 }}>
            Enquire Now — We Can Source This Today
          </button>
        </div>
      </div>

      {/* Preview items */}
      <div style={{ marginBottom: 12 }}>
        <div style={sectionLabel(ac)}>Products in this catalog</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {data.items.map((item, i) => (
          <div key={i} style={{
            padding: '18px 20px', background: '#fff', border: '1px solid #eee',
            borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10,
            cursor: 'pointer', transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = ac}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#eee'}
            onClick={() => onQuote({ name: item, sku: 'Custom', img: null, cat: category?.id })}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: ac, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: DARK }}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, padding: '16px 20px', background: '#FFF8EE', borderRadius: 12, fontSize: 12, color: '#92680A', lineHeight: 1.6 }}>
        <strong>💡 Can't wait?</strong> We source all of these directly from verified manufacturers in China and Europe. 
        Submit an enquiry and we'll send you options with pricing within 48 hours.
      </div>
    </div>
  );
}

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
const inp = {
  width: '100%', padding: '13px 16px', border: '1px solid #E8E4DE',
  borderRadius: 10, fontSize: 13, color: DARK, background: WARM, outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
};
const btnPrimary = (ac) => ({
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  padding: '14px 24px', background: DARK, color: '#fff',
  border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 800,
  textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer',
});
const btnOutline = {
  padding: '12px 20px', background: 'transparent', color: DARK,
  border: '1px solid #ddd', borderRadius: 10, fontSize: 12,
  fontWeight: 700, cursor: 'pointer',
};
const sectionLabel = (ac) => ({
  fontSize: 10, fontWeight: 800, color: ac, textTransform: 'uppercase',
  letterSpacing: '0.2em', marginBottom: 12,
});

// ─── MAIN PRODUCTS HUB ────────────────────────────────────────────────────────
const ALL_CATEGORIES = [
  ...GLASS_CATALOG_CATEGORIES,
  { id: 'tiles',     label: 'Tiles & Flooring',    icon: '🪟', desc: 'Large-format porcelain, marble, hardwood, and epoxy flooring systems.' },
  { id: 'kitchen',   label: 'Kitchen Systems',     icon: '🍳', desc: 'Bespoke cabinetry, smart appliances, and full kitchen fit-out packages.' },
  { id: 'wardrobes', label: 'Wardrobes & Storage', icon: '👗', desc: 'Custom walk-in closets, sliding wardrobes, and modular storage.' },
  { id: 'hardware',  label: 'Hardware & Accessories', icon: '🔩', desc: 'Architectural handles, hinges, locks, and glass fittings.' },
];

const GLASS_CATEGORY_IDS = new Set(GLASS_CATALOG_CATEGORIES.map(c => c.id));

export default function ProductsHub({ brand, setPage, submitInquiry, formatPrice }) {
  const winW = useWindowWidth();
  const mob = winW <= 900;
  const ac = brand?.color || AC;

  const [activeCat, setActiveCat] = useState('casement');   // default to first glass cat
  const [search, setSearch] = useState('');
  const [drawerProduct, setDrawerProduct] = useState(null);
  const [quoteProduct, setQuoteProduct] = useState(null);   // null = general quote
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isGlassCat = GLASS_CATEGORY_IDS.has(activeCat);

  const filteredProducts = useMemo(() => {
    if (!isGlassCat) return [];
    return GLASS_CATALOG_DATA.filter(p => {
      const matchesCat = p.cat === activeCat;
      const q = search.toLowerCase();
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCat, isGlassCat, search]);

  const activeCatData = ALL_CATEGORIES.find(c => c.id === activeCat);

  // Handle quote submission
  const handleSubmitQuote = async (data) => {
    if (submitInquiry) {
      await submitInquiry({
        ...data,
        type: 'Product Inquiry',
        subject: `Product Inquiry: ${data.productName || data.category}`,
      });
    }
  };

  const Sidebar = () => (
    <div style={{
      width: mob ? '100%' : 240, flexShrink: 0,
      ...(mob ? {} : { position: 'sticky', top: 80, maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' })
    }}>
      {/* General quote button */}
      <button onClick={() => setQuoteProduct({})} style={{
        width: '100%', padding: '12px 16px', marginBottom: 20,
        background: DARK, color: '#fff', border: 'none', borderRadius: 12,
        fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
      }}>
        <Send size={13} /> Request a Quote
      </button>

      {/* Category groups */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 4px 8px' }}>
          Glass &amp; Aluminum
        </div>
        {GLASS_CATALOG_CATEGORIES.map(cat => {
          const count = GLASS_CATALOG_DATA.filter(p => p.cat === cat.id).length;
          const isActive = activeCat === cat.id;
          return (
            <button key={cat.id} onClick={() => { setActiveCat(cat.id); setSidebarOpen(false); }} style={{
              width: '100%', textAlign: 'left', padding: '9px 12px', marginBottom: 2,
              background: isActive ? `${ac}15` : 'transparent',
              border: isActive ? `1px solid ${ac}40` : '1px solid transparent',
              borderRadius: 10, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              transition: 'all 0.2s'
            }}>
              <span style={{ fontSize: 12, fontWeight: isActive ? 800 : 600, color: isActive ? DARK : '#666' }}>
                {cat.icon} {cat.label}
              </span>
              <span style={{ fontSize: 10, color: isActive ? ac : '#bbb', fontWeight: 700 }}>{count}</span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 4px 8px' }}>
          Coming Soon
        </div>
        {ALL_CATEGORIES.filter(c => !GLASS_CATEGORY_IDS.has(c.id)).map(cat => {
          const isActive = activeCat === cat.id;
          return (
            <button key={cat.id} onClick={() => { setActiveCat(cat.id); setSidebarOpen(false); }} style={{
              width: '100%', textAlign: 'left', padding: '9px 12px', marginBottom: 2,
              background: isActive ? `${ac}10` : 'transparent',
              border: isActive ? `1px solid ${ac}30` : '1px solid transparent',
              borderRadius: 10, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 12, fontWeight: isActive ? 800 : 500, color: isActive ? DARK : '#aaa' }}>
                {cat.icon} {cat.label}
              </span>
              <span style={{ fontSize: 9, color: ac, fontWeight: 700, background: `${ac}15`, padding: '2px 6px', borderRadius: 100 }}>Soon</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: WARM, fontFamily: 'inherit' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ background: DARK, paddingTop: mob ? 80 : 120, paddingBottom: mob ? 40 : 56, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(45deg, #C8A96E 0, #C8A96E 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 5vw', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: ac, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 10 }}>
                Glasstech Fabrications
              </div>
              <h1 style={{ fontSize: mob ? 32 : 48, fontWeight: 900, color: '#fff', margin: '0 0 12px', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                Products &amp; Systems
              </h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', maxWidth: 520, lineHeight: 1.7, margin: 0 }}>
                Browse, specify, and request quotes for our full range of glass, aluminum, and interior finishing systems. 
                Sourced globally. Installed locally. Guaranteed.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              {[['35+', 'Products'], ['ISO 9001', 'Certified'], ['24h', 'Quote Response']].map(([v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: ac }}>{v}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: mob ? '24px 4vw' : '40px 5vw', display: mob ? 'block' : 'flex', gap: 40, alignItems: 'flex-start' }}>

        {/* Mobile: category pills row */}
        {mob && (
          <div style={{ overflowX: 'auto', display: 'flex', gap: 8, paddingBottom: 16, scrollbarWidth: 'none', marginBottom: 8 }}>
            {ALL_CATEGORIES.map(cat => {
              const isActive = activeCat === cat.id;
              const isGlass = GLASS_CATEGORY_IDS.has(cat.id);
              return (
                <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
                  flexShrink: 0, padding: '7px 14px', borderRadius: 100,
                  background: isActive ? DARK : '#fff',
                  color: isActive ? '#fff' : (isGlass ? '#555' : '#aaa'),
                  border: '1px solid', borderColor: isActive ? DARK : '#ddd',
                  fontSize: 11, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                }}>
                  {cat.icon} {cat.label} {!isGlass && <span style={{ fontSize: 9, opacity: 0.6 }}>Soon</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Desktop sidebar */}
        {!mob && <Sidebar />}

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Category title + search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 20 }}>{activeCatData?.icon}</span>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: DARK, letterSpacing: '-0.02em' }}>{activeCatData?.label}</h2>
                {!isGlassCat && (
                  <span style={{ fontSize: 10, fontWeight: 800, color: ac, background: `${ac}18`, padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Coming Soon</span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: 12, color: '#888' }}>{activeCatData?.desc}</p>
            </div>
            {isGlassCat && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #E0DAD4', borderRadius: 10, padding: '9px 14px', minWidth: 200 }}>
                <Search size={13} color="#bbb" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search products…"
                  style={{ border: 'none', background: 'none', outline: 'none', fontSize: 12, color: DARK, width: '100%' }} />
                {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', padding: 0 }}><X size={11} /></button>}
              </div>
            )}
          </div>

          {/* Products grid — glass categories */}
          {isGlassCat && (
            <>
              {filteredProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#ccc' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa' }}>No products found</div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
                  {filteredProducts.map(p => (
                    <ProductCard key={p.id} product={p} brand={brand}
                      onOpen={setDrawerProduct} onQuote={setQuoteProduct} />
                  ))}
                </div>
              )}

              {/* Color standards footer */}
              <div style={{ marginTop: 40, padding: '24px 28px', background: DARK, borderRadius: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: ac, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 14 }}>Standard Frame Finishes</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {[['Huanghua Pear','#8B6B3D'],['Black Skin','#2C2C2C'],['Deep Coffee','#4A2C1A'],['Pearl White','#F5F0E8'],['Deep Sea Blue','#1B3A5C'],['Caramel Coffee','#8B5E3C'],['Quartz Gray','#7A7A82'],['Starry Sky Black','#0D0D15'],['Black Walnut','#3D2B1F'],['Black Crystal Stone','#1A1A2E']].map(([n, h]) => (
                    <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 16, height: 16, borderRadius: 3, background: h, border: h === '#F5F0E8' ? '1px solid rgba(255,255,255,0.15)' : 'none' }} />
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{n}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', margin: '12px 0 0', lineHeight: 1.6 }}>
                  Powder coated · Electrophoresis · PVDF · Anodizing · Custom RAL on request
                </p>
              </div>
            </>
          )}

          {/* Coming soon categories */}
          {!isGlassCat && (
            <ComingSoonGrid category={activeCatData} brand={brand} onQuote={setQuoteProduct} />
          )}
        </div>
      </div>

      {/* ── MODALS ── */}
      {drawerProduct && (
        <ProductDrawer
          product={drawerProduct}
          brand={brand}
          onClose={() => setDrawerProduct(null)}
          onQuote={(p) => { setDrawerProduct(null); setQuoteProduct(p); }}
        />
      )}
      {quoteProduct !== null && (
        <QuoteModal
          product={quoteProduct?.sku ? quoteProduct : null}
          brand={brand}
          onClose={() => setQuoteProduct(null)}
          onSubmit={handleSubmitQuote}
        />
      )}
    </div>
  );
}
