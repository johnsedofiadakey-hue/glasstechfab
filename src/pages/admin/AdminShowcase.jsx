import React, { useState, useEffect } from 'react';
import { db, storage } from '../../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Trash2, Plus, Image as ImageIcon, MapPin, Type, Save, X, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminShowcase({ brand, notify }) {
  const [scenes, setScenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newScene, setNewScene] = useState({ title: '', location: '', description: '', img: '', hotspots: [] });
  const [uploading, setUploading] = useState(false);

  const ac = brand?.color || '#C8A96E';

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, 'showcase'), (snap) => {
      setScenes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !storage) return;
    setUploading(true);
    try {
      const sRef = ref(storage, `showcase/${Date.now()}_${file.name}`);
      await uploadBytes(sRef, file);
      const url = await getDownloadURL(sRef);
      setNewScene(prev => ({ ...prev, img: url }));
      notify('success', 'Image uploaded successfully');
    } catch (err) {
      console.error(err);
      notify('error', 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const saveScene = async () => {
    if (!newScene.img || !newScene.title) return notify('error', 'Title and Image required');
    try {
      await addDoc(collection(db, 'showcase'), { ...newScene, createdAt: serverTimestamp() });
      setShowAdd(false);
      setNewScene({ title: '', location: '', description: '', img: '', hotspots: [] });
      notify('success', 'Scene added to showroom');
    } catch (err) {
      notify('error', 'Save failed');
    }
  };

  const deleteScene = async (scene) => {
    if (!window.confirm("Delete this scene from the showroom?")) return;
    try {
      await deleteDoc(doc(db, 'showcase', scene.id));
      // Optionally delete from storage if we have the path, but URL is enough for now
      notify('success', 'Scene removed');
    } catch (err) {
      notify('error', 'Delete failed');
    }
  };

  const addHotspot = (e, sceneId = null) => {
    // In a real editor we'd click the image, for now just push a dummy
    const h = { x: 50, y: 50, title: 'New Hotspot', desc: 'Description here' };
    setNewScene(prev => ({ ...prev, hotspots: [...prev.hotspots, h] }));
  };

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>Showroom Manager</h1>
          <p style={{ color: '#888' }}>Upload and manage immersive scenes for the client showcase.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)} 
          className="p-btn-gold" 
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px' }}
        >
          <PlusCircle size={20} /> Add New Scene
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 100, color: '#888' }}>Loading showroom data...</div>
      ) : scenes.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
          {scenes.map(s => (
            <div key={s.id} className="p-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 200, position: 'relative' }}>
                <img src={s.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={s.title} />
                <button 
                  onClick={() => deleteScene(s)}
                  style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ color: ac, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', marginBottom: 4 }}>{s.location}</div>
                <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 800 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: '#666', lineHeight: 1.5, marginBottom: 16 }}>{s.description}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {s.hotspots?.map((h, i) => (
                    <span key={i} style={{ background: '#F5F5F5', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700 }}>{h.title}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#F9F7F4', borderRadius: 24, border: '1px dashed #DCD7D1' }}>
          <ImageIcon size={48} style={{ color: '#ccc', marginBottom: 16 }} />
          <h3 className="lxfh" style={{ fontSize: 20, marginBottom: 8 }}>No Showroom Scenes Yet</h3>
          <p style={{ color: '#888', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>Add your first immersive cinematic scene to showcase your technical excellence to clients.</p>
          <button onClick={() => setShowAdd(true)} className="p-btn-gold" style={{ padding: '12px 24px' }}>Add First Scene</button>
        </div>
      )}


      {/* ADD MODAL */}
      <AnimatePresence>
        {showAdd && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ background: '#fff', width: '100%', maxWidth: 600, borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '24px 32px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Create Showroom Scene</h2>
                <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
              </div>
              
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20, maxHeight: '70vh', overflowY: 'auto' }}>
                <div style={{ height: 200, background: '#f9f9f9', borderRadius: 16, border: '2px dashed #ddd', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden' }} onClick={() => document.getElementById('scene-up').click()}>
                  {newScene.img ? (
                    <img src={newScene.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <>
                      <ImageIcon size={40} style={{ color: '#ccc', marginBottom: 12 }} />
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#888' }}>{uploading ? 'Uploading...' : 'Click to Upload Scene Image'}</div>
                    </>
                  )}
                  <input id="scene-up" type="file" hidden onChange={handleFileUpload} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>Scene Title</label>
                  <input value={newScene.title} onChange={e => setNewScene({...newScene, title: e.target.value})} placeholder="e.g. The Presidential Suite" className="p-inp" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>Location</label>
                  <input value={newScene.location} onChange={e => setNewScene({...newScene, location: e.target.value})} placeholder="e.g. East Legon" className="p-inp" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>Narrative / Description</label>
                  <textarea value={newScene.description} onChange={e => setNewScene({...newScene, description: e.target.value})} rows={3} className="p-inp" placeholder="Describe the architectural intent..." />
                </div>

                <div style={{ padding: 20, background: '#F9F7F4', borderRadius: 16 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <h4 style={{ margin: 0, fontSize: 13, fontWeight: 800 }}>Hotspots ({newScene.hotspots.length})</h4>
                      <button onClick={addHotspot} style={{ background: ac, color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>+ Add Hotspot</button>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {newScene.hotspots.map((h, i) => (
                        <div key={i} style={{ padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #eee', display: 'flex', gap: 10 }}>
                           <input value={h.title} onChange={e => {
                             const updated = [...newScene.hotspots];
                             updated[i].title = e.target.value;
                             setNewScene({...newScene, hotspots: updated});
                           }} style={{ flex: 1, border: 'none', fontSize: 12, fontWeight: 700 }} placeholder="Item Name" />
                           <button onClick={() => {
                              const updated = [...newScene.hotspots];
                              updated.splice(i, 1);
                              setNewScene({...newScene, hotspots: updated});
                           }} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              <div style={{ padding: 32, borderTop: '1px solid #eee', display: 'flex', gap: 12 }}>
                <button onClick={() => setShowAdd(false)} className="p-btn-dark" style={{ flex: 1, background: '#eee', color: '#333' }}>Cancel</button>
                <button onClick={saveScene} className="p-btn-gold" style={{ flex: 2 }}>Publish to Showroom</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
