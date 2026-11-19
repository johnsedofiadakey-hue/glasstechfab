import React, { useState } from 'react';
import { ArrowUpRight, Camera, ClipboardList, Droplets, MapPin } from 'lucide-react';
import './WaterproofingHome.css';

const AREAS = [
  { id: 'roof', title: 'Roof or terrace', category: 'roof-coatings', context: 'Exposure, drainage, existing coating and surface condition all matter.' },
  { id: 'bathroom', title: 'Bathroom or shower', category: 'wet-areas', context: 'We need to understand the wet-area layers, joints, plumbing and tile condition.' },
  { id: 'foundation', title: 'Foundation or basement', category: 'foundations', context: 'Groundwater, access, wall construction and pressure need a site-specific assessment.' },
  { id: 'wall', title: 'External wall', category: 'roof-coatings', context: 'The source may involve cracks, openings, joints or the wall finish.' },
  { id: 'concrete', title: 'New concrete works', category: 'concrete-additives', context: 'The mix design, exposure and construction joints should be considered together.' },
  { id: 'joint', title: 'Joint or local leak', category: 'joints-repairs', context: 'A local repair depends on whether the joint moves and where water enters.' },
];

export default function WaterproofingSolutions({ brand, navigate }) {
  const [selected, setSelected] = useState(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const area = AREAS.find((item) => item.id === selected);
  const whatsapp = String(brand?.whatsapp || '233598455012').replace(/\D/g, '');
  const message = `Hi Glasstech, I need help with a waterproofing issue.\nArea: ${area?.title || 'Not selected'}\nLocation: ${location.trim() || 'Not provided'}\nIssue: ${description.trim() || 'I will describe it in chat.'}\nPlease advise on materials and whether a site assessment or installation is needed.`;

  return (
    <main className="wp-home wp-solutions-page">
      <section className="wp-solutions-hero">
        <p className="wp-eyebrow">WATERPROOFING SOLUTIONS</p>
        <h1>Start with the water problem.<br /><span>Then choose the right system.</span></h1>
        <p>Tell us where the water is appearing and what the surface is. We can help you identify the next step, discuss suitable materials, or quote for an assessment and installation.</p>
      </section>
      <section className="wp-section">
        <div className="wp-section-head"><div><p className="wp-eyebrow">STEP 1</p><h2>Where is the issue?</h2></div></div>
        <div className="wp-solution-area-grid">
          {AREAS.map((item) => (
            <button key={item.id} className={selected === item.id ? 'is-selected' : ''} onClick={() => setSelected(item.id)} aria-pressed={selected === item.id}>
              <Droplets size={22} /><strong>{item.title}</strong><small>{item.context}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="wp-section wp-solution-form-section">
        <div className="wp-solution-form-wrap">
          <div><p className="wp-eyebrow">STEP 2</p><h2>Tell us what you can see.</h2><p>Photos, the location and when the problem appears help us understand the situation. Please share photos in the WhatsApp chat after opening your enquiry.</p><div className="wp-solution-hints"><span><Camera size={18} /> Photos of the affected area</span><span><MapPin size={18} /> Site location</span><span><ClipboardList size={18} /> When the leak occurs</span></div></div>
          <form onSubmit={(event) => { event.preventDefault(); window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); }}>
            <label htmlFor="wp-site-location">Project location</label>
            <input id="wp-site-location" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="e.g. East Legon, Accra" />
            <label htmlFor="wp-issue-description">What is happening?</label>
            <textarea id="wp-issue-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="e.g. Water appears on the ceiling after heavy rain" rows={5} />
            <button className="wp-button wp-button-primary" type="submit">Send waterproofing enquiry <ArrowUpRight size={18} /></button>
            <small>A Glasstech specialist must review the site and manufacturer's guidance before a product or installation method is specified.</small>
          </form>
        </div>
      </section>
      <section className="wp-section">
        <div className="wp-section-head"><div><p className="wp-eyebrow">BROWSE MATERIALS</p><h2>Explore the relevant category.</h2></div></div>
        <div className="wp-solution-category-links">
          {AREAS.map((item) => <button key={item.id} onClick={() => navigate(`/products?group=waterproofing&cat=${item.category}`)}>{item.title}<ArrowUpRight size={18} /></button>)}
        </div>
      </section>
    </main>
  );
}
