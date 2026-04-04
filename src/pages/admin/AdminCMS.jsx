import React, { useState } from 'react';
import { 
  Sparkles, Layout, Activity, Smartphone, Image as ImgIcon, 
  Users, ThumbsUp, Link2, Upload, X, Trash2, Trash
} from 'lucide-react';
import { FF as PFormField } from '../../components/Shared';
import { uploadFile } from '../../lib/firebase';
import { compressImage } from '../../lib/image-utils';

function CMSBranding({ brand, onSave, ac }) {
  const [f, setF] = useState(brand || {});

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1000, quality: 0.8 });
        const url = await uploadFile('assets', `branding/${Date.now()}_${field}_${file.name}`, compressed);
        setF(prev => ({ ...prev, [field]: url }));
      } catch (err) { alert('Upload failed. Error: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 className="lxfh" style={{ fontSize: 20 }}>Identity & Colors</h3>
        <PFormField label="Company Name"><input className="p-inp" value={f.name || ''} onChange={e => setF({...f, name: e.target.value})} /></PFormField>
        <PFormField label="Tagline"><input className="p-inp" value={f.tagline || ''} onChange={e => setF({...f, tagline: e.target.value})} /></PFormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <PFormField label="Primary Background"><input type="color" className="p-inp" style={{ height: 44, padding: 4 }} value={f.bgPrimary || '#FDFCFB'} onChange={e => setF({...f, bgPrimary: e.target.value})} /></PFormField>
          <PFormField label="Secondary Surface"><input type="color" className="p-inp" style={{ height: 44, padding: 4 }} value={f.bgSecondary || '#FFFFFF'} onChange={e => setF({...f, bgSecondary: e.target.value})} /></PFormField>
          <PFormField label="Accent Color"><input type="color" className="p-inp" style={{ height: 44, padding: 4 }} value={f.color || '#C8A96E'} onChange={e => setF({...f, color: e.target.value})} /></PFormField>
          <PFormField label="Global Text Color"><input type="color" className="p-inp" style={{ height: 44, padding: 4 }} value={f.textColor || '#121212'} onChange={e => setF({...f, textColor: e.target.value})} /></PFormField>
        </div>
        <PFormField label="Site Aesthetic / Theme">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { id: 'classic', n: 'Classic', desc: 'Premium serif & gold' },
              { id: 'minimal', n: 'Minimal', desc: 'Sharp edges & mono' },
              { id: 'avant-garde', n: 'Modern', desc: 'Rounded & vibrant' }
            ].map(t => (
              <button 
                key={t.id}
                onClick={() => setF({...f, theme: t.id})}
                style={{
                  padding: '12px 8px', borderRadius: 8, border: f.theme === t.id ? `2px solid ${ac}` : '1px solid rgba(0,0,0,0.1)',
                  background: f.theme === t.id ? `${ac}10` : '#fff', cursor: 'pointer', transition: 'all .2s', textAlign: 'center'
                }}
              >
                <div className="lxfh" style={{ fontSize: 13, fontWeight: 700, color: f.theme === t.id ? ac : '#1A1410' }}>{t.n}</div>
                <div className="lxf" style={{ fontSize: 9, color: '#B5AFA9', marginTop: 2 }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </PFormField>
        <button onClick={() => onSave(f)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '12px 32px', marginTop: 12 }}>Save Branding Identity</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 className="lxfh" style={{ fontSize: 20 }}>Logo & Contact</h3>
        <PFormField label="Company Logo">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
             <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'logo')} />
             <input className="p-inp" placeholder="Or paste Image URL" style={{ flex: 1 }} value={f.logo || ''} onChange={e => setF({...f, logo: e.target.value})} />
          </div>
        </PFormField>
        <PFormField label="Official Phone"><input className="p-inp" value={f.phone || ''} onChange={e => setF({...f, phone: e.target.value})} /></PFormField>
        <PFormField label="Official Email"><input className="p-inp" value={f.email || ''} onChange={e => setF({...f, email: e.target.value})} /></PFormField>
        <PFormField label="Physical Location"><input className="p-inp" value={f.location || ''} onChange={e => setF({...f, location: e.target.value})} /></PFormField>
      </div>
    </div>
  );
}

function CMSHomepage({ hero, onSave, ac }) {
  const [slides, setSlides] = useState(hero?.slides || []);

  const onFile = async (idx, file) => {
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1600, quality: 0.8 });
        const url = await uploadFile('assets', `homepage/${Date.now()}_slide_${idx}_${file.name}`, compressed);
        const ns = [...slides];
        ns[idx].img = url;
        setSlides(ns);
      } catch (err) { alert('Upload failed: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
       <h3 className="lxfh" style={{ fontSize: 20 }}>Hero Carousel</h3>
       {slides.map((s, i) => (
         <div key={i} className="p-card" style={{ padding: 20, background: '#F9F7F4', border: '1px solid rgba(0,0,0,.04)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 20 }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ height: 100, borderRadius: 6, overflow: 'hidden', background: '#eee' }}>
                     <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                     <button className="p-btn-light lxf" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0', fontSize: 10 }}><Upload size={12} /> Change Image</button>
                     <input type="file" accept="image/*" onChange={e => onFile(i, e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  </div>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                 <input className="p-inp" placeholder="Headline" value={s.title} onChange={e => {
                   const ns = [...slides]; ns[i].title = e.target.value; setSlides(ns);
                 }} />
                 <textarea className="p-inp" placeholder="Sub-text" rows={2} value={s.sub} onChange={e => {
                   const ns = [...slides]; ns[i].sub = e.target.value; setSlides(ns);
                 }} />
               </div>
            </div>
         </div>
       ))}
       <button onClick={() => onSave({ slides })} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Update Homepage</button>
    </div>
  );
}

function CMSServices({ services, onSave, ac }) {
  const [list, setList] = useState(services || []);

  const onFile = async (idx, file) => {
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1000, quality: 0.8 });
        const url = await uploadFile('assets', `services/${Date.now()}_img_${idx}_${file.name}`, compressed);
        const nl = [...list];
        nl[idx].img = url;
        setList(nl);
      } catch (err) { alert('Upload failed: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <h3 className="lxfh" style={{ fontSize: 20 }}>Service Offerings</h3>
         <button onClick={() => setList([...list, { id: Date.now(), name: 'New Service', short: '', desc: '', packages: [], gallery: [], img: '' }])} className="p-btn-gold lxf" style={{ padding: '6px 14px', fontSize: 11 }}>Add Service</button>
       </div>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
         {list.map((s, i) => (
           <div key={s.id} className="p-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
             <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 80, height: 80, borderRadius: 8, background: '#F9F7F4', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                   {s.img ? <img src={s.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B5AFA9' }}><ImgIcon size={24} /></div>}
                   <input type="file" accept="image/*" onChange={e => onFile(i, e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                   <PFormField label="Service Name" nomargin><input className="p-inp" style={{ padding: '6px 10px' }} value={s.name} onChange={e => { const nl = [...list]; nl[i].name = e.target.value; setList(nl); }} /></PFormField>
                </div>
             </div>
             <PFormField label="Description" nomargin><textarea className="p-inp" value={s.desc} rows={3} onChange={e => { const nl = [...list]; nl[i].desc = e.target.value; setList(nl); }} /></PFormField>
             <button onClick={() => setList(list.filter((_, idx) => idx !== i))} style={{ color: '#ff4444', fontSize: 11, background: 'none', border: 'none', padding: 0, marginTop: 'auto', alignSelf: 'flex-start', cursor: 'pointer' }}>Delete Service</button>
           </div>
         ))}
       </div>
       <button onClick={() => onSave(list)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save Services</button>
    </div>
  );
}

function CMSProducts({ products, onSave, ac }) {
  const [list, setList] = useState(products || []);
  const [newItem, setNewItem] = useState({ name: '', desc: '', img: '', cat: 'Glass' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <h3 className="lxfh" style={{ fontSize: 20 }}>Industrial Product Catalog</h3>
       <div style={{ background: '#F9F7F4', padding: 24, borderRadius: 12 }}>
          <div className="lxf" style={{ fontSize: 12, fontWeight: 600, marginBottom: 16 }}>Add New Product</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
            <input className="p-inp" placeholder="Product Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
            <input className="p-inp" placeholder="Category" value={newItem.cat} onChange={e => setNewItem({...newItem, cat: e.target.value})} />
            <input className="p-inp" placeholder="Image URL" value={newItem.img} onChange={e => setNewItem({...newItem, img: e.target.value})} />
          </div>
          <textarea className="p-inp" placeholder="Technical Description" rows={2} value={newItem.desc} onChange={e => setNewItem({...newItem, desc: e.target.value})} />
          <button onClick={() => { setList([...list, { ...newItem, id: Date.now() }]); setNewItem({ name:'', desc:'', img:'', cat:'Glass' }); }} className="p-btn-gold lxf" style={{ marginTop: 12, padding: '8px 20px' }}>Add to Catalog</button>
       </div>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
         {list.map(p => (
           <div key={p.id} className="p-card" style={{ padding: 16 }}>
              <img src={p.img} alt="" style={{ width: '100%', height: 120, objectFit: 'contain', marginBottom: 12, background: '#fff', borderRadius: 6 }} />
              <div className="lxf" style={{ fontSize: 10, color: ac, fontWeight: 600 }}>{p.cat}</div>
              <div className="lxfh" style={{ fontSize: 16, marginBottom: 4 }}>{p.name}</div>
              <p className="lxf" style={{ fontSize: 12, color: '#7A6E62', lineHeight: 1.6 }}>{p.desc}</p>
              <button onClick={() => setList(list.filter(x => x.id !== p.id))} style={{ color: '#ff4444', fontSize: 11, background: 'none', border: 'none', padding: 0, marginTop: 12, cursor: 'pointer' }}>Remove</button>
           </div>
         ))}
       </div>
       <button onClick={() => onSave(list)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Update Catalog</button>
    </div>
  );
}

function CMSAbout({ about, onSave, ac }) {
  const [f, setF] = useState(about || {});

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1200, quality: 0.8 });
        const url = await uploadFile('assets', `about/${Date.now()}_${file.name}`, compressed);
        setF(prev => ({ ...prev, image: url }));
      } catch (err) { alert('Upload failed. Error: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 className="lxfh" style={{ fontSize: 20 }}>Company Story</h3>
        <PFormField label="Founder Name"><input className="p-inp" value={f.founder || ''} onChange={e => setF({...f, founder: e.target.value})} /></PFormField>
        <PFormField label="Story Headline"><input className="p-inp" value={f.storyTitle || ''} onChange={e => setF({...f, storyTitle: e.target.value})} /></PFormField>
        <PFormField label="Mission Summary"><textarea className="p-inp" rows={4} value={f.story || ''} onChange={e => setF({...f, story: e.target.value})} /></PFormField>
        <PFormField label="Full Vision Statement"><textarea className="p-inp" rows={4} value={f.bio || ''} onChange={e => setF({...f, bio: e.target.value})} /></PFormField>
        <button onClick={() => onSave(f)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save About Page</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 className="lxfh" style={{ fontSize: 20 }}>About Page Image</h3>
        <div style={{ height: 300, background: '#F9F7F4', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
          {f.image ? <img src={f.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>}
          <div style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}>
             <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: '100%', height: '100%', cursor: 'pointer' }} />
          </div>
        </div>
        <div className="lxf" style={{ fontSize: 11, color: '#B5AFA9', textAlign: 'center' }}>Click the container above to change image</div>
      </div>
    </div>
  );
}

function CMSTestimonials({ list, onSave, ac }) {
  const [items, setItems] = useState(list || []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <h3 className="lxfh" style={{ fontSize: 20 }}>Client Testimonials</h3>
       <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
         {items.map((t, i) => (
           <div key={i} className="p-card" style={{ padding: 20, display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: ac, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{t.name?.[0] || 'C'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                  <input className="p-inp" placeholder="Name" value={t.name} style={{ width: 200 }} onChange={e => { const ni = [...items]; ni[i].name = e.target.value; setItems(ni); }} />
                  <input className="p-inp" placeholder="Role" value={t.role} style={{ width: 200 }} onChange={e => { const ni = [...items]; ni[i].role = e.target.value; setItems(ni); }} />
                </div>
                <textarea className="p-inp" value={t.text} rows={2} onChange={e => { const ni = [...items]; ni[i].text = e.target.value; setItems(ni); }} />
              </div>
              <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} style={{ color: '#ff4444', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
           </div>
         ))}
       </div>
       <button onClick={() => setItems([...items, { name: 'New Client', role: 'Developer', text: '', rating: 5 }])} className="p-btn-gold lxf" style={{ alignSelf: 'flex-start', padding: '8px 20px' }}>Add Testimonial</button>
       <button onClick={() => onSave(items)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save Testimonials</button>
    </div>
  );
}

function CMSFooter({ data, onSave, ac }) {
  const [links, setLinks] = useState(data?.links || []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <h3 className="lxfh" style={{ fontSize: 20 }}>Footer Information</h3>
       <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
         <div className="lxf" style={{ fontSize: 13, fontWeight: 600 }}>Policy Links</div>
         {links.map((l, i) => (
           <div key={i} style={{ display: 'flex', gap: 12 }}>
             <input className="p-inp" placeholder="Label" value={l.label} onChange={e => { const nl = [...links]; nl[i].label = e.target.value; setLinks(nl); }} />
             <input className="p-inp" placeholder="URL" value={l.url} onChange={e => { const nl = [...links]; nl[i].url = e.target.value; setLinks(nl); }} />
             <button onClick={() => setLinks(links.filter((_, idx) => idx !== i))} style={{ color: '#ff4444', border: 'none', background: 'none', cursor: 'pointer' }}><X size={16} /></button>
           </div>
         ))}
         <button onClick={() => setLinks([...links, { label: '', url: '#' }])} className="lxf" style={{ fontSize: 11, color: ac, background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>+ Add Link</button>
       </div>
       <button onClick={() => onSave({ links })} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save Footer</button>
    </div>
  );
}

function CMSGallery({ portfolio, onSave, ac }) {
  const [list, setList] = useState(portfolio || []);

  const onFile = async (idx, field, file) => {
    if (file) {
      try {
        const compressed = await compressImage(file, { maxWidth: 1600, quality: 0.8 });
        const url = await uploadFile('assets', `portfolio/${Date.now()}_${field}_${file.name}`, compressed);
        const nl = [...list];
        nl[idx][field] = url;
        setList(nl);
      } catch (err) { alert('Upload failed: ' + err.message); }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <h3 className="lxfh" style={{ fontSize: 20 }}>Project Portfolio Settings</h3>
       <div className="lxf" style={{ fontSize: 12, color: '#B5AFA9', marginBottom: -10 }}>You can also manage these projects comprehensively in the main Portfolio tab on the left menu.</div>
       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
         {list.map((p, i) => (
           <div key={p.id} className="p-card" style={{ padding: 20 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
               <div className="lxfh" style={{ fontSize: 18 }}>{p.title || 'Untitled Project'}</div>
               <button onClick={() => setList(list.filter((_, idx) => idx !== i))} style={{ color: '#ff4444', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}><Trash2 size={18} /></button>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
               <PFormField label="Project Title"><input className="p-inp" value={p.title || ''} onChange={e => { const nl = [...list]; nl[i].title = e.target.value; setList(nl); }} /></PFormField>
               <PFormField label="Category">
                 <select className="p-inp" value={p.cat || 'Full Interior'} onChange={e => { const nl = [...list]; nl[i].cat = e.target.value; setList(nl); }}>
                   <option>Full Interior</option><option>Kitchen Installation</option><option>Washroom Setup</option>
                   <option>Office Fit-out</option><option>Residential Finishing</option><option>Glass & Aluminum</option>
                 </select>
               </PFormField>
               <PFormField label="After Image (Main)">
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <button className="p-btn-light lxf" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}><Upload size={14} /> {p.after?.startsWith('https') ? 'Uploaded Asset' : 'Select Image'}</button>
                    <input type="file" accept="image/*" onChange={e => onFile(i, 'after', e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  </div>
               </PFormField>
               <PFormField label="Before Image (Optional)">
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <button className="p-btn-light lxf" style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}><Upload size={14} /> {p.before?.startsWith('https') ? 'Uploaded Asset' : 'Select Image'}</button>
                    <input type="file" accept="image/*" onChange={e => onFile(i, 'before', e.target.files[0])} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                  </div>
               </PFormField>
               <PFormField label="Location"><input className="p-inp" value={p.loc || ''} onChange={e => { const nl = [...list]; nl[i].loc = e.target.value; setList(nl); }} /></PFormField>
             </div>
           </div>
         ))}
         <button onClick={() => setList([...list, { id: Date.now(), title: 'New Project', cat: 'Full Interior', year: new Date().getFullYear().toString(), loc: '', desc: '', before: '', after: '' }])} className="p-btn-gold lxf" style={{ alignSelf: 'flex-start', padding: '8px 24px', borderRadius: 8 }}>+ Add Project</button>
       </div>
       <button onClick={() => onSave(list)} className="p-btn-dark lxf" style={{ alignSelf: 'flex-start', padding: '10px 24px' }}>Save Portfolio</button>
    </div>
  );
}

export default function AdminCMS({ content, syncCMS, brand, onPreview, ...props }) {
  const [sub, setSub] = useState('branding');
  const ac = brand.color || '#C8A96E';
  
  const tabs = [
    { id: 'branding', label: 'Branding', icon: <Sparkles size={16} /> },
    { id: 'homepage', label: 'Homepage', icon: <Layout size={16} /> },
    { id: 'services', label: 'Services', icon: <Activity size={16} /> },
    { id: 'products', label: 'Products', icon: <Smartphone size={16} /> },
    { id: 'gallery', label: 'Gallery', icon: <ImgIcon size={16} /> },
    { id: 'about', label: 'About', icon: <Users size={16} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <ThumbsUp size={16} /> },
    { id: 'footer', label: 'Footer', icon: <Link2 size={16} /> },
  ];

  const renderCMS = () => {
    const onSave = (key, val) => syncCMS(key, val);
    const common = { ac, onSave };
    switch(sub) {
      case 'branding': return <CMSBranding brand={content?.brand || brand} onSave={val => syncCMS('brand', val)} ac={ac} />;
      case 'homepage': return <CMSHomepage hero={content?.hero} onSave={val => syncCMS('hero', val)} ac={ac} />;
      case 'services': return <CMSServices services={content?.services} onSave={val => syncCMS('services', val)} ac={ac} />;
      case 'products': return <CMSProducts products={content?.products} onSave={val => syncCMS('products', val)} ac={ac} />;
      case 'gallery': return <CMSGallery portfolio={content?.portfolio} onSave={val => syncCMS('portfolio', val)} ac={ac} />;
      case 'about': return <CMSAbout about={content?.about} onSave={val => syncCMS('about', val)} ac={ac} />;
      case 'testimonials': return <CMSTestimonials list={content?.testimonials} onSave={val => syncCMS('testimonials', val)} ac={ac} />;
      case 'footer': return <CMSFooter data={content?.footer} onSave={val => syncCMS('footer', val)} ac={ac} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="lxfh" style={{ fontSize: 32, fontWeight: 400 }}>Website CMS</h2>
        <button onClick={onPreview} className="p-btn-gold lxf" style={{ padding: '8px 16px' }}>View Live Site</button>
      </div>

      <div style={{ display: 'flex', gap: 10, background: '#F9F7F4', padding: 4, borderRadius: 10, alignSelf: 'flex-start' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setSub(t.id)} 
            className="lxf"
            style={{ 
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, border: 'none', 
              background: sub === t.id ? '#fff' : 'transparent', color: sub === t.id ? ac : '#7A6E62', 
              fontSize: 12, fontWeight: sub === t.id ? 600 : 400, cursor: 'pointer', transition: 'all .2s',
              boxShadow: sub === t.id ? '0 2px 8px rgba(0,0,0,.04)' : 'none'
            }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="p-card" style={{ padding: 28 }}>
        {renderCMS()}
      </div>
    </div>
  );
}
