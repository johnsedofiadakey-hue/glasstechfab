import React from 'react';
import { ArrowUpRight, Droplets, Layers3, Wrench } from 'lucide-react';
import './WaterproofingHome.css';

export default function WaterproofingAbout({ navigate }) {
  return <main className="wp-home wp-info-page">
    <section className="wp-solutions-hero"><p className="wp-eyebrow">ABOUT GLASSTECH FABRICATIONS</p><h1>From fabrication to<br /><span>building protection.</span></h1><p>Glasstech Fabrications works across building finishes and is expanding its focus on waterproofing materials and solutions. Our website brings product discovery and project enquiries together so customers can find materials or discuss work that needs a specialist.</p></section>
    <section className="wp-section"><div className="wp-section-head"><div><p className="wp-eyebrow">WHAT WE OFFER</p><h2>Materials and the work behind them.</h2></div></div><div className="wp-about-grid">
      <div><Droplets size={30} /><h3>Waterproofing materials</h3><p>Browse manufacturer-listed material types for roofs, wet areas, foundations and concrete work. Glasstech confirms supply, price and availability before an order.</p></div>
      <div><Wrench size={30} /><h3>Waterproofing solutions</h3><p>Explain the leak, surface and project location. We can discuss an assessment and a suitable supply-and-install approach.</p></div>
      <div><Layers3 size={30} /><h3>Building finishing</h3><p>Glasstech's existing work includes glass, aluminium and interior finishing. These remain part of the company as the waterproofing range grows.</p></div>
    </div></section>
    <section className="wp-service-band wp-info-cta"><div><p className="wp-eyebrow">START HERE</p><h2>What does your project need?</h2><p>Browse the material references or tell us about the area you need to protect.</p></div><button className="wp-button wp-button-light" onClick={() => navigate('/products?group=waterproofing')}>Explore products <ArrowUpRight size={18} /></button><button className="wp-button wp-button-outline" onClick={() => navigate('/?page=solutions')}>Discuss a solution <ArrowUpRight size={18} /></button></section>
  </main>;
}
