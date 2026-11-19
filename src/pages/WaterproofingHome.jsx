import React from 'react';
import { ArrowUpRight, Check, Droplets, Layers3, Package, ShieldCheck, Wrench } from 'lucide-react';
import { WATERPROOFING_CATEGORIES, WATERPROOFING_PRODUCTS } from '../waterproofingCatalog';
import './WaterproofingHome.css';

const APPLICATIONS = [
  { title: 'Roof leaks', detail: 'Exposed slabs, terraces and roof details', category: 'roof-coatings', mark: '01' },
  { title: 'Wet rooms', detail: 'Bathrooms, showers and tiled areas', category: 'wet-areas', mark: '02' },
  { title: 'Below ground', detail: 'Foundations, basements and retaining walls', category: 'foundations', mark: '03' },
  { title: 'New concrete', detail: 'Water-resisting mortar and concrete mixes', category: 'concrete-additives', mark: '04' },
];

export default function WaterproofingHome({ brand, navigate }) {
  const whatsapp = String(brand?.whatsapp || '233598455012').replace(/\D/g, '');
  const helpLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi Glasstech, I need help with a waterproofing issue. The affected area is: ')}`;

  return (
    <main className="wp-home">
      <section className="wp-hero">
        <div className="wp-hero-copy">
          <p className="wp-eyebrow">GLASSTECH FABRICATIONS · MATERIALS & SOLUTIONS</p>
          <h1>Waterproofing materials.<br /><span>Real solutions for water problems.</span></h1>
          <p className="wp-lead">Find materials for roofs, bathrooms, foundations and concrete works. Need more than a product? Tell us what is happening and we can discuss a supply and installation solution.</p>
          <div className="wp-actions">
            <button className="wp-button wp-button-primary" onClick={() => navigate('/products?group=waterproofing')}>Explore waterproofing products <ArrowUpRight size={18} /></button>
            <button className="wp-button wp-button-outline" onClick={() => navigate('/?page=solutions')}>Solve a water problem <ArrowUpRight size={18} /></button>
          </div>
          <div className="wp-hero-note"><Check size={17} /> Materials, technical guidance and project enquiries in one place</div>
        </div>
        <div className="wp-hero-art" aria-hidden="true">
          <div className="wp-art-grid" />
          <div className="wp-art-water wp-art-water-one" />
          <div className="wp-art-water wp-art-water-two" />
          <div className="wp-art-slab wp-art-slab-top"><span>EXPOSED SURFACE</span></div>
          <div className="wp-art-slab wp-art-slab-mid"><span>PROTECTION LAYER</span></div>
          <div className="wp-art-slab wp-art-slab-base"><span>STRUCTURE</span></div>
          <div className="wp-art-tag">THE RIGHT SYSTEM STARTS WITH THE RIGHT SURFACE</div>
        </div>
      </section>

      <section className="wp-proof-strip" aria-label="Ways to work with Glasstech">
        <div><Package size={23} /><span><strong>Find materials</strong><small>Compare product types and applications</small></span></div>
        <div><Droplets size={23} /><span><strong>Describe the problem</strong><small>Share where water is entering</small></span></div>
        <div><Wrench size={23} /><span><strong>Discuss installation</strong><small>Request a project assessment</small></span></div>
      </section>

      <section className="wp-section" id="shop-by-type">
        <div className="wp-section-head">
          <div><p className="wp-eyebrow">SHOP BY MATERIAL TYPE</p><h2>Build the right waterproofing system.</h2></div>
          <button className="wp-text-link" onClick={() => navigate('/products?group=waterproofing')}>View all products <ArrowUpRight size={17} /></button>
        </div>
        <div className="wp-category-grid">
          {WATERPROOFING_CATEGORIES.map((category, index) => (
            <button className="wp-category-card" key={category.id} onClick={() => navigate(`/products?group=waterproofing&cat=${category.id}`)}>
              <span className="wp-category-index">0{index + 1}</span>
              <span className="wp-category-symbol"><Layers3 size={26} strokeWidth={1.5} /></span>
              <strong>{category.label}</strong>
              <small>{category.desc}</small>
              <span className="wp-category-arrow"><ArrowUpRight size={18} /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="wp-section wp-featured">
        <div className="wp-section-head">
          <div><p className="wp-eyebrow">MANUFACTURER PRODUCT REFERENCES</p><h2>Explore waterproofing materials.</h2></div>
          <p>Products published by MC-Bauchemie Ghana and Sika Ghana. Ask Glasstech to confirm supply, pack size, price and suitability for your project.</p>
        </div>
        <div className="wp-featured-grid">
          {WATERPROOFING_PRODUCTS.slice(0, 3).map((product) => (
            <button className="wp-featured-card" key={product.id} onClick={() => navigate(`/products?group=waterproofing&search=${encodeURIComponent(product.name)}`)}>
              <span className="wp-featured-brand">{product.brand}</span>
              <span className="wp-featured-pack"><Package size={42} strokeWidth={1.2} /></span>
              <strong>{product.name}</strong>
              <small>{product.tagline}</small>
              <span className="wp-featured-cta">View product <ArrowUpRight size={17} /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="wp-section wp-applications">
        <div className="wp-section-head">
          <div><p className="wp-eyebrow">START WITH THE PROBLEM</p><h2>Where is the water getting in?</h2></div>
          <p>The right material depends on the surface, exposure, detailing and condition. Browse by application, then ask us about a complete solution.</p>
        </div>
        <div className="wp-application-grid">
          {APPLICATIONS.map((item) => (
            <button key={item.title} onClick={() => navigate(`/products?group=waterproofing&cat=${item.category}`)}>
              <span>{item.mark}</span><strong>{item.title}</strong><small>{item.detail}</small><ArrowUpRight size={20} />
            </button>
          ))}
        </div>
      </section>

      <section className="wp-service-band">
        <div><p className="wp-eyebrow">MATERIALS + APPLICATION</p><h2>Need the work done too?</h2><p>Tell us about the site, the water issue and the finish you need. We can discuss a material-only order or a supply and installation project.</p></div>
        <div className="wp-service-steps"><span><ShieldCheck size={20} /> Share the issue and site</span><span><Layers3 size={20} /> Review a suitable system</span><span><Wrench size={20} /> Request a project quote</span></div>
        <a className="wp-button wp-button-light" href={helpLink} target="_blank" rel="noopener noreferrer">Discuss your project <ArrowUpRight size={18} /></a>
      </section>
    </main>
  );
}
