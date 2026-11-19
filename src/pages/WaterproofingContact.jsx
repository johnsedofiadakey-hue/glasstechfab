import React from 'react';
import { ArrowUpRight, Mail, Phone, ShoppingCart, Wrench } from 'lucide-react';
import './WaterproofingHome.css';

export default function WaterproofingContact({ brand, navigate }) {
  const whatsapp = String(brand?.whatsapp || '233598455012').replace(/\D/g, '');
  const phone = brand?.phone || '+233 59 845 5012';
  const email = brand?.email;
  return <main className="wp-home wp-info-page">
    <section className="wp-solutions-hero"><p className="wp-eyebrow">CONTACT GLASSTECH</p><h1>Let's talk about<br /><span>your project.</span></h1><p>Ask about a material order, describe a waterproofing issue, or discuss supply and installation. Include your project location and any product names or site details you already have.</p></section>
    <section className="wp-section"><div className="wp-section-head"><div><p className="wp-eyebrow">GET IN TOUCH</p><h2>Choose what you need.</h2></div></div><div className="wp-contact-grid">
      <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi Glasstech, I would like to order waterproofing materials. Please confirm price and availability.')}`} target="_blank" rel="noopener noreferrer"><ShoppingCart size={32} /><h3>Order materials</h3><p>Send your product list or ask us to help find a suitable material.</p><span>Start an order enquiry <ArrowUpRight size={17} /></span></a>
      <button onClick={() => navigate('/?page=solutions')}><Wrench size={32} /><h3>Solve a water issue</h3><p>Tell us where water appears, describe the surface and request advice on the next step.</p><span>Use the solution guide <ArrowUpRight size={17} /></span></button>
      <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}><Phone size={32} /><h3>Call Glasstech</h3><p>Speak directly with the team about an order or site enquiry.</p><span>{phone} <ArrowUpRight size={17} /></span></a>
    </div>{email && <p className="wp-contact-email"><Mail size={17} /> Prefer email? <a href={`mailto:${email}`}>{email}</a></p>}</section>
  </main>;
}
