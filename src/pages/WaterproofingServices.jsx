import React from 'react';
import { ArrowUpRight, ClipboardList, Droplets, Package, Wrench } from 'lucide-react';
import './WaterproofingHome.css';

const OPTIONS = [
  { icon: Package, title: 'Materials supply', body: 'Tell us the material, pack size and quantity you need. We will confirm price, availability and delivery before an order.' },
  { icon: ClipboardList, title: 'Site assessment enquiry', body: 'Describe where water appears, when it happens and the existing surface. Photos and site details help us plan the next step.' },
  { icon: Wrench, title: 'Supply and installation', body: 'Request a project quote that considers the surface, detailing, material system and finishing work.' },
];

export default function WaterproofingServices({ brand, navigate }) {
  const whatsapp = String(brand?.whatsapp || '233598455012').replace(/\D/g, '');
  return <main className="wp-home wp-info-page">
    <section className="wp-solutions-hero"><p className="wp-eyebrow">GLASSTECH SERVICES</p><h1>Waterproofing help from<br /><span>material to finish.</span></h1><p>Some customers know exactly which product they need. Others need help finding the source of a leak or planning a full installation. Start with the route that fits your project.</p></section>
    <section className="wp-section"><div className="wp-section-head"><div><p className="wp-eyebrow">WAYS TO WORK WITH US</p><h2>Choose the right starting point.</h2></div></div><div className="wp-about-grid">{OPTIONS.map(({ icon, title, body }) => <div key={title}>{React.createElement(icon, { size: 30 })}<h3>{title}</h3><p>{body}</p></div>)}</div></section>
    <section className="wp-section wp-featured"><div className="wp-section-head"><div><p className="wp-eyebrow">BUILDING FINISHING</p><h2>More than waterproofing.</h2></div><p>Glasstech's existing catalogue also covers glass and aluminium systems, bathrooms, kitchens, tiles, doors and other finishing materials.</p></div><div className="wp-info-actions"><button className="wp-button wp-button-primary" onClick={() => navigate('/products?group=waterproofing')}>Browse waterproofing <ArrowUpRight size={18} /></button><button className="wp-button wp-button-outline" onClick={() => navigate('/products?group=aluminum')}>Explore other materials <ArrowUpRight size={18} /></button></div></section>
    <section className="wp-service-band wp-info-cta"><div><p className="wp-eyebrow">WATER PROBLEM?</p><h2>Tell us what is happening.</h2><p>A site-specific system needs review of the conditions and the manufacturer's guidance.</p></div><button className="wp-button wp-button-light" onClick={() => navigate('/?page=solutions')}>Use the solution guide <ArrowUpRight size={18} /></button><a className="wp-button wp-button-outline" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi Glasstech, I would like to discuss a waterproofing project.')}`} target="_blank" rel="noopener noreferrer">WhatsApp Glasstech <Droplets size={18} /></a></section>
  </main>;
}
