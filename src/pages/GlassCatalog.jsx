import React, { useState, useMemo } from 'react';
import { GLASS_CATALOG_DATA, GLASS_CATALOG_CATEGORIES } from '../data.jsx';
import { X, ChevronRight, Check, ArrowLeft, Search, SlidersHorizontal, Maximize2 } from 'lucide-react';

const AC = '#C8A96E';
const DARK = '#1A1410';

// ─── PERFORMANCE BADGE ───────────────────────────────────────────────────────
const PerfBadge = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(26,20,16,0.06)' }}>
    <span style={{ fontSize: 11, color: '#666', fontWeight: 500, letterSpacing: '0.04em' }}>{label}</span>
    <span style={{ fontSize: 11, color: DARK, fontWeight: 700, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
  </div>
);

// ─── PRODUCT DETAIL MODAL ────────────────────────────────────────────────────
const ProductModal = ({ product, onClose }) => {
  if (!product) return null;
  const cat = GLASS_CATALOG_CATEGORIES.find(c => c.id === product.cat);

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(10,8,6,0.85)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
      }}
    >
      <div style={{
        background: '#FDFCFB', borderRadius: 24, overflow: 'hidden',
        maxWidth: 900, width: '100%', maxHeight: '90vh', display: 'flex',
        flexDirection: 'column', boxShadow: '0 40px 100px rgba(0,0,0,0.4)'
      }}>
        {/* Image Header */}
        <div style={{ position: 'relative', height: 320, overflow: 'hidden', flexShrink: 0 }}>
          <img src={product.fullImg} alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,20,16,0.7) 0%, transparent 50%)' }} />
          <button onClick={onClose} style={{
            position: 'absolute', top: 16, right: 16, width: 40, height: 40,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
          }}><X size={16} /></button>
          <div style={{ position: 'absolute', bottom: 24, left: 28 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: AC, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>
              {cat?.label} · {product.sku}
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>{product.name}</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: '4px 0 0' }}>{product.tagline}</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ overflowY: 'auto', padding: '28px 28px 32px', flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            
            {/* Specifications */}
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: AC, marginBottom: 12, margin: '0 0 12px' }}>Specifications</h3>
              {Object.entries(product.specs).map(([k, v]) => (
                <PerfBadge key={k}
                  label={k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                  value={v} />
              ))}
            </div>

            {/* Performance + Options */}
            <div>
              {product.performance && Object.keys(product.performance).length > 0 && (
                <>
                  <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: AC, margin: '0 0 12px' }}>Performance</h3>
                  {Object.entries(product.performance).map(([k, v]) => (
                    <PerfBadge key={k}
                      label={k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                      value={v} />
                  ))}
                  <div style={{ height: 20 }} />
                </>
              )}
              {product.options?.length > 0 && (
                <>
                  <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: AC, margin: '0 0 12px' }}>Available Options</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {product.options.map((o, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: `${AC}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <Check size={9} color={AC} />
                        </div>
                        <span style={{ fontSize: 12, color: '#555', lineHeight: 1.4 }}>{o}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(26,20,16,0.06)' }}>
              <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: AC, margin: '0 0 12px' }}>Frame Colors Available</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.colors.map((c, i) => (
                  <span key={i} style={{ fontSize: 11, padding: '5px 12px', background: 'rgba(26,20,16,0.05)', borderRadius: 100, color: DARK, fontWeight: 600 }}>{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
            <button
              onClick={() => { onClose(); }}
              style={{
                flex: 1, padding: '14px 24px', background: DARK, color: '#fff',
                border: 'none', borderRadius: 12, fontSize: 12, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer'
              }}>
              Request a Quote
            </button>
            <div style={{
              padding: '14px 20px', borderRadius: 12, border: `1px solid ${AC}40`,
              display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer'
            }}>
              <span style={{ fontSize: 11, color: AC, fontWeight: 700 }}>{product.status === 'Pre-order' ? '⏳ Pre-Order' : '✓ In Stock'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, onOpen }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(product)}
      style={{
        borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
        background: '#fff', border: '1px solid rgba(26,20,16,0.07)',
        boxShadow: hovered ? '0 20px 50px rgba(26,20,16,0.12)' : '0 4px 20px rgba(26,20,16,0.05)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Image */}
      <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        <img src={product.img} alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
            transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease'
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(26,20,16,0.5) 100%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s'
        }} />
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: product.status === 'Pre-order' ? '#FF9800' : '#16A34A',
          color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 8px',
          borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.1em'
        }}>{product.status}</div>
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          width: 32, height: 32, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', color: '#fff'
        }}>
          <Maximize2 size={13} />
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: AC, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 5 }}>
          {product.sku}
        </div>
        <h3 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 800, color: DARK, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
          {product.name}
        </h3>
        <p style={{ margin: '0 0 14px', fontSize: 12, color: '#888', lineHeight: 1.4 }}>{product.tagline}</p>

        {/* Top 2 specs preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {Object.entries(product.specs).slice(0, 2).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#999' }}>
              <span style={{ textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</span>
              <span style={{ fontWeight: 700, color: DARK, maxWidth: '55%', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4, color: AC }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>View Details</span>
          <ChevronRight size={12} />
        </div>
      </div>
    </div>
  );
};

// ─── MAIN GLASS CATALOG PAGE ─────────────────────────────────────────────────
export default function GlassCatalog({ brand, setPage }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return GLASS_CATALOG_DATA.filter(p => {
      const matchesCat = activeCategory === 'all' || p.cat === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const ac = brand?.color || AC;

  return (
    <div style={{ minHeight: '100vh', background: '#F8F6F3', fontFamily: 'inherit' }}>
      {/* ── PAGE HEADER ── */}
      <div style={{
        background: DARK, paddingTop: 120, paddingBottom: 64,
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative bg pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'repeating-linear-gradient(45deg, #C8A96E 0, #C8A96E 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px'
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw', position: 'relative' }}>
          <button onClick={() => setPage && setPage('home')}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 32, padding: 0 }}>
            <ArrowLeft size={12} /> Back to Home
          </button>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: ac, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 12 }}>
                Glass & Aluminum Systems
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                Window &amp; Door<br />
                <span style={{ color: ac }}>Catalog</span>
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
                Premium aluminum thermalbreak windows, sliding systems, folding doors, pivot entries, sunrooms, and shower enclosures. 
                ISO9001 certified. Available in 10+ frame colors. Fully customizable to specification.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              {[['35+', 'Products'], ['10+', 'Frame Colors'], ['ISO9001', 'Certified'], ['Custom', 'Sizes']].map(([v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: ac }}>{v}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(26,20,16,0.06)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>
          {/* Search + Filter Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(26,20,16,0.04)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: '#F5F3F0', borderRadius: 10, padding: '10px 16px' }}>
              <Search size={14} color="#999" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, series, or type…"
                style={{ flex: 1, border: 'none', background: 'none', fontSize: 13, color: DARK, outline: 'none' }}
              />
              {searchQuery && <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0 }}><X size={12} /></button>}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 16px', borderRadius: 10,
                background: showFilters ? DARK : '#F5F3F0',
                color: showFilters ? '#fff' : DARK,
                border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700
              }}>
              <SlidersHorizontal size={13} /> Filters
            </button>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', padding: '12px 0', scrollbarWidth: 'none' }}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                flexShrink: 0, padding: '7px 16px', borderRadius: 100, border: 'none',
                background: activeCategory === 'all' ? DARK : 'transparent',
                color: activeCategory === 'all' ? '#fff' : '#888',
                fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em',
                transition: 'all 0.2s'
              }}>All ({GLASS_CATALOG_DATA.length})</button>
            {GLASS_CATALOG_CATEGORIES.map(cat => {
              const count = GLASS_CATALOG_DATA.filter(p => p.cat === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                  flexShrink: 0, padding: '7px 16px', borderRadius: 100, border: 'none',
                  background: isActive ? DARK : 'transparent',
                  color: isActive ? '#fff' : '#888',
                  fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em',
                  transition: 'all 0.2s', whiteSpace: 'nowrap'
                }}>{cat.icon} {cat.label} ({count})</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CATEGORY DESCRIPTION (when filtered) ── */}
      {activeCategory !== 'all' && (() => {
        const cat = GLASS_CATALOG_CATEGORIES.find(c => c.id === activeCategory);
        return cat ? (
          <div style={{ background: `${ac}08`, borderBottom: `1px solid ${ac}20`, padding: '16px 5vw' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>{cat.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: DARK }}>{cat.label}</div>
                <div style={{ fontSize: 12, color: '#777', marginTop: 2 }}>{cat.desc}</div>
              </div>
            </div>
          </div>
        ) : null;
      })()}

      {/* ── PRODUCT GRID ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 5vw 80px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#aaa' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>No products found</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Try adjusting your search or filter</div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 12, color: '#888' }}>
                Showing <strong style={{ color: DARK }}>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'all' && <span> in <strong style={{ color: ac }}>{GLASS_CATALOG_CATEGORIES.find(c => c.id === activeCategory)?.label}</strong></span>}
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24
            }}>
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onOpen={setSelectedProduct} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── COLOR STANDARDS BAR ── */}
      <div style={{ background: DARK, padding: '48px 5vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: ac, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 20 }}>Standard Frame Finishes</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {[
              { name: 'Huanghua Pear', hex: '#8B6B3D' }, { name: 'Black Skin', hex: '#2C2C2C' },
              { name: 'Deep Coffee', hex: '#4A2C1A' }, { name: 'Black Crystal Stone', hex: '#1A1A2E' },
              { name: 'Pearl White', hex: '#F5F0E8' }, { name: 'Deep Sea Blue', hex: '#1B3A5C' },
              { name: 'Caramel Coffee', hex: '#8B5E3C' }, { name: 'Quartz Gray', hex: '#7A7A82' },
              { name: 'Starry Sky Black', hex: '#0D0D15' }, { name: 'Black Walnut', hex: '#3D2B1F' },
            ].map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: c.hex, border: c.hex === '#F5F0E8' ? '1px solid rgba(255,255,255,0.2)' : 'none' }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{c.name}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 20, lineHeight: 1.6 }}>
            Surface treatment options: Powder coated · Electrophoresis · PVDF · Anodizing · Wood grain · Custom RAL colors available on request.
            All products customizable — send your drawings and we fabricate to your spec.
          </p>
        </div>
      </div>

      {/* ── PRODUCT DETAIL MODAL ── */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
