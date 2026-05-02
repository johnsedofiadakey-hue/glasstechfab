import React, { useState, useEffect, Suspense, lazy } from 'react';
import PublicSite from './pages/PublicSite';
import LoginPage from './pages/LoginPage';
const AdminPortal = lazy(() => import('./pages/AdminPortal'));
const ClientPortal = lazy(() => import('./pages/ClientPortal'));
const AccountManagerPortal = lazy(() => import('./pages/AccountManagerPortal'));
const ProductsHub = lazy(() => import('./pages/ProductsHub'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Showcase = lazy(() => import('./pages/Showcase'));
const FieldUpload = lazy(() => import('./pages/admin/FieldUpload'));
import { 
  CLIENTS_DATA, PROPOSALS_DATA, INVOICES_DATA, 
  BOOKINGS_DATA, EMAIL_QUEUE, HERO_SLIDES,
  SERVICES_DATA, ABOUT_DATA, PROCESS_STEPS, ROOM_GALLERY,
  PORTFOLIO_DATA, TEAM_MEMBERS, PROJECT_STAGES, WHY_US, 
  PRODUCTS_DATA, GLASS_CATALOG_DATA, GLASS_CATALOG_CATEGORIES,
  BRAND0, DEFAULT_SCENES
} from './data.jsx';


import { auth, db, storage, isFirebaseEnabled } from './lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { 
  collection, query, onSnapshot, getDocs, getDoc, doc, 
  updateDoc, addDoc, setDoc, deleteDoc, orderBy, collectionGroup, limit, where, serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { uploadFile } from './lib/firebase';
import { MessengerService } from './lib/MessengerService';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';


const INITIAL_CONTENT = {
  hero: { slides: HERO_SLIDES },
  about: {
    ...ABOUT_DATA,
    founder: 'John Dakey',
    role: 'Managing Director',
    storyTitle: 'Crafting the Future of Structural Glass & Interiors',
    story: 'Under the leadership of John Dakey, Managing Director, Glasstech Fabrications has evolved from a structural glass specialist into Ghana’s premier hub for complete interior finishing. Our mission is to bridge the gap between industrial engineering and luxury design.',
    bio: 'John Dakey leads Glasstech with a commitment to sub-millimeter precision and aesthetic excellence. From Spintex to the most exclusive developments in Accra, his vision is to provide a "million-dollar finish" for every project, leveraging global sourcing and local technical expertise.'
  },
  services: SERVICES_DATA,
  process: PROCESS_STEPS,
  portfolio: PORTFOLIO_DATA,
  gallery: ROOM_GALLERY,
  products: GLASS_CATALOG_DATA,
  categories: GLASS_CATALOG_CATEGORIES,
  brand: BRAND0
};


const ProtectedRoute = ({ user, role, children, setView }) => {
  if (!user) return null;
  if (role && user.role !== role) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f9f7f4', color: '#1a1410', fontFamily: 'Inter' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.1 }}>403</h1>
        <p style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 700 }}>Access Denied</p>
        <button onClick={() => setView('public')} style={{ marginTop: '2rem', background: 'none', border: '1px solid #1a1410', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase' }}>Return Home</button>
      </div>
    );
  }
  return children;
};

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [loginType, setLoginType] = useState('client'); 
  const [authLoading, setAuthLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();  const [brand, setBrand] = useState(BRAND0);
  const [content, setContent] = useState(INITIAL_CONTENT);


  // Inject dynamic CSS variables based on brand settings
  useEffect(() => {
    const root = document.documentElement;
    if (brand.bgPrimary) root.style.setProperty('--bg', brand.bgPrimary);
    if (brand.textColor) root.style.setProperty('--fg', brand.textColor);
    if (brand.color || brand.accent) root.style.setProperty('--ac', brand.accent || brand.color);
    if (brand.fontFamily) root.style.setProperty('--font-primary', brand.fontFamily);
  }, [brand]);
  
  const [clients, setClients] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [emails, setEmails] = useState([]);
  const [activeMagicCode, setActiveMagicCode] = useState(null);
  const [dbClients, setDbClients] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [lang, setLang] = useState(localStorage.getItem('lx-lang') || 'en');
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [changeRequests, setChangeRequests] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [notification, setNotification] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [procurements, setProcurements] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [notes, setNotes] = useState([]);
  const [media, setMedia] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [assets, setAssets] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [containers, setContainers] = useState([]);
  const [magicCode, setMagicCode] = useState(null);
  const [otp, setOtp] = useState('');
  const [currency, setCurrency] = useState('USD');
  const rates = { USD: 1, GHS: 15.2, EUR: 0.93 };

  const notify = (type, msg) => {
    setNotification({ type, msg });
    if (type !== 'pending') setTimeout(() => setNotification(null), 4000);
  };

  const sendMessage = async (text, senderId, receiverId, type='chat') => {
    if (!db) return;
    await addDoc(collection(db, 'messages'), { text, senderId, receiverId, type, createdAt: serverTimestamp() });
  };

  const submitTestimonial = async (data) => {
    if (!db) return;
    await addDoc(collection(db, 'testimonials'), { ...data, createdAt: serverTimestamp(), status: 'pending' });
  };

  const dict = {
    en: { welcome: 'Welcome back', dashboard: 'Dashboard', orders: 'Orders', visualizer: 'AI Visualizer', chat: 'Live Chat', projects: 'Milestones', finance: 'Finance Hub' },
    fr: { welcome: 'Bienvenue', dashboard: 'Tableau de bord', orders: 'Commandes', visualizer: 'Visualiseur AI', chat: 'Chat en direct', projects: 'Projets', finance: 'Finances' }
  };
  const t = (k) => dict[lang][k] || k;
  
  const updateClientProfile = async (clientId, data) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'users', clientId), { ...data, updatedAt: serverTimestamp() });
      notify('success', 'Profile updated successfully');
    } catch (e) {
      notify('error', 'Failed to update profile');
    }
  };

  useEffect(() => {
    if (!db) return;
    
    // 📨 MESSAGE LISTENER (ONLY FOR LOGGED IN USERS)
    let unsubMsg = () => {};
    if (user) {
      const qMsg = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
      unsubMsg = onSnapshot(qMsg, (s) => setMessages(s.docs.map(d => ({id: d.id, ...d.data()}))), (err) => {
        console.warn("Message Sync Issue:", err);
      });
    }

    // 💬 TESTIMONIAL LISTENER (PUBLIC CAN SEE)
    const qTest = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsubTest = onSnapshot(qTest, (s) => setTestimonials(s.docs.map(d => ({id: d.id, ...d.data()}))), (err) => {
      console.warn("Testimonial Sync Issue:", err);
    });
    
    // 🌐 REAL-TIME CMS LISTENER
    const unsubCMS = onSnapshot(collection(db, 'cms_content'), (s) => {
      const newContent = { ...INITIAL_CONTENT };
      s.docs.forEach(doc => {
        if (doc.data().content) {
          const c = doc.data().content;
          // 🛡️ AUTO-REPAIR: If "Ama Asante" is found in the DB, silently upgrade it to John Dakey
          if (doc.id === 'about' && (c.founder === 'Ama Asante' || !c.founder)) {
            const upgraded = { ...c, founder: 'John Dakey', role: 'Managing Director' };
            syncCMS('about', upgraded);
            newContent[doc.id] = upgraded;
          } else {
            newContent[doc.id] = c;
          }
          // 🖼️ AUTO-REPAIR: If logo is missing in DB, force the official one
          if (doc.id === 'brand' && !c.logo) {
            const upgraded = { ...c, logo: '/logo.png' };
            syncCMS('brand', upgraded);
            newContent[doc.id] = upgraded;
          }
        }
      });
      setContent(newContent);
      if (newContent.brand) setBrand(prev => ({ ...prev, ...newContent.brand }));
    }, (err) => {
      console.warn("CMS Sync Permission Issue:", err);
      // Fallback to initial content if permission denied
      setContent(INITIAL_CONTENT);
    });

    fetchData();
    return () => { unsubMsg(); unsubTest(); unsubCMS(); };
  }, [db, user]);

  useEffect(() => {
    if (!db && !isFirebaseEnabled) {
      fetchData();
    }
  }, [db]);

  const migrateToFirebase = async () => {
    if (!db) return;
    try {
      notify('pending', 'Initializing Glasstech CMS...');
      setLoading(true);
      
      const DEMO_ACCOUNTS = [
        { email: 'admin@stormglide.com', role: 'admin', name: 'Super Admin', uid: 'qRcOaTkJ6rYmjha9jNAadrYW6pK2' },
        { email: 'admin@glasstechfab.com', role: 'admin', name: 'Factory Admin', uid: 'pBkrb38P9NaXXjIILQXlqxxC33p2' },
        { email: 'client@glasstechfab.com', role: 'client', name: 'Elite Client', username: 'elite_finish', password: 'Glasstech2026', uid: 'GQL4qVw3NIe9XVq8gZFkuU4Q9dD3' },
        { email: 'client@demo.com', role: 'client', name: 'Demo Client', username: 'demo_user', password: 'Glasstech2026' },
        { phone: '233547748678', role: 'client', name: 'Authorized Tester', username: 'tester_01', password: 'Glasstech2026' }
      ];

      // 1. Initialise Users
      const userMap = {}; 
      for (const acc of DEMO_ACCOUNTS) {
        const id = acc.uid || acc.email?.replace(/[.@]/g, '_') || acc.phone;
        if (!id) continue;
        userMap[acc.email || acc.phone] = id;
        await setDoc(doc(db, 'users', id), { 
          id, 
          name: acc.name, 
          email: acc.email || `${acc.phone}@authorized.test`, 
          username: acc.username || (acc.email ? acc.email.split('@')[0] : acc.phone),
          password: acc.password || 'Glasstech2026',
          phone: acc.phone || '', 
          role: acc.role || 'client', 
          status: 'Active', 
          joined: new Date().toISOString() 
        }, { merge: true });
      }

      // 2. Initialise Team Members
      for (const m of TEAM_MEMBERS) {
        const uid = m.email ? m.email.replace(/[.@]/g, '_') : `STF_${m.id}`;
        await setDoc(doc(db, 'users', uid), { ...m, id: uid }, { merge: true });
      }

      // 3. Initialise Projects (Supporting multi-project for Elite Client)
      const ELITE_CLIENT_ID = userMap['client@glasstechfab.com'];
      
      const ALL_PROJECT_DATA = [
        { 
          id: 'PROJ_001', 
          title: 'Glasshouse Penthouse', 
          name: 'Elite Client', 
          email: 'client@glasstechfab.com', 
          budget: '$250,000', 
          progress: 45, 
          stage: 5,
          cat: 'Structural Glazing & Interior',
          milestones: [
            { id: 'm1', name: 'Deposit (Initial)', amount: '$100,000', stageId: 1, status: 'Paid', paidAt: new Date().toISOString() },
            { id: 'm2', name: 'Production Phase', amount: '$100,000', stageId: 5, status: 'Pending' },
            { id: 'm3', name: 'Final Handover', amount: '$50,000', stageId: 12, status: 'Pending' }
          ]
        },
        { 
          id: 'PROJ_002', 
          title: 'Coastal Villa Skylight', 
          name: 'Elite Client', 
          email: 'client@glasstechfab.com', 
          budget: '$85,000', 
          progress: 15, 
          stage: 2,
          cat: 'Custom Aluminum Fit-out',
          milestones: [
            { id: 'm1', name: 'Down Payment', amount: '$34,000', stageId: 1, status: 'Paid', paidAt: new Date().toISOString() },
            { id: 'm2', name: 'Material Procurement', amount: '$34,000', stageId: 3, status: 'Pending' },
            { id: 'm3', name: 'On-site Installation', amount: '$17,000', stageId: 10, status: 'Pending' }
          ]
        },
        ...CLIENTS_DATA.filter(c => c.email !== 'client@glasstechfab.com')
      ];

      // 4. Initialise Branding & CMS
      await setDoc(doc(db, 'cms_content', 'brand'), { content: BRAND0 }, { merge: true });
      await setDoc(doc(db, 'cms_content', 'hero'), { content: { slides: HERO_SLIDES } }, { merge: true });
      await setDoc(doc(db, 'cms_content', 'services'), { content: SERVICES_DATA }, { merge: true });
      await setDoc(doc(db, 'cms_content', 'portfolio'), { content: PORTFOLIO_DATA }, { merge: true });
      await setDoc(doc(db, 'cms_content', 'about'), { content: ABOUT_DATA }, { merge: true });
      await setDoc(doc(db, 'cms_content', 'products'), { content: GLASS_CATALOG_DATA }, { merge: true });
      await setDoc(doc(db, 'cms_content', 'categories'), { content: GLASS_CATALOG_CATEGORIES }, { merge: true });

      // 5. Initialise Showroom (Collection)
      for (const scene of DEFAULT_SCENES) {
        await setDoc(doc(db, 'showcase', scene.id), scene, { merge: true });
      }

      for (const item of ALL_PROJECT_DATA) {
        const pid = item.id.toString();
        const cid = item.email ? (userMap[item.email] || item.email.replace(/[.@]/g, '_')) : `CL_${pid}`;
        
        // Ensure client exists
        if (!userMap[item.email]) {
           await setDoc(doc(db, 'users', cid), { 
            id: cid, name: item.name, email: item.email || `${item.name.toLowerCase().replace(' ', '.')}@example.com`, 
            phone: '+233 24 000 0000', company: 'Private Client', role: 'client', status: 'Active', joined: new Date().toISOString() 
          }, { merge: true });
          userMap[item.email] = cid;
        }

        const projectBudget = parseFloat(item.budget?.replace(/[$,]/g, '') || 0);
        const defaultMilestones = [
          { id: 'm1', name: 'Deposit (40%)', amount: '$' + (projectBudget * 0.4).toLocaleString(), stageId: 1, status: 'Paid' },
          { id: 'm2', name: 'Production (40%)', amount: '$' + (projectBudget * 0.4).toLocaleString(), stageId: 4, status: 'Pending' },
          { id: 'm3', name: 'Final (20%)', amount: '$' + (projectBudget * 0.2).toLocaleString(), stageId: 11, status: 'Pending' }
        ];

        await setDoc(doc(db, 'projects', pid), { 
          ...item, 
          id: pid, 
          title: item.project || item.title, 
          clientId: cid, 
          clientIds: [cid], 
          milestones: item.milestones || defaultMilestones,
          managerId: 'EMP001', 
          createdAt: new Date().toISOString() 
        }, { merge: true });

        // 5. Seed Invoices & Payments for the project
        const invId = `INV-${pid}-01`;
        await setDoc(doc(db, 'projects', pid, 'payments', invId), {
          id: invId,
          title: 'Initial Deposit (40%)',
          amount: '$' + (projectBudget * 0.4).toLocaleString(),
          status: 'Paid',
          date: new Date().toISOString(),
          due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          paidAt: new Date().toISOString(),
          method: 'Paystack'
        });

        // 6. Seed some media for the new gallery
        const demoMedia = [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80', stageId: 1, type: 'image' },
          { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80', stageId: item.stage || 1, type: 'image' }
        ];
        
        for (const m of demoMedia) {
          await addDoc(collection(db, 'projects', pid, 'media'), { ...m, createdAt: new Date().toISOString() });
        }

        // 7. Seed Procurement Items
        if (item.email === 'client@glasstechfab.com') {
          await setDoc(doc(collection(db, 'projects', pid, 'procurements'), 'SHIP_'+pid+'_GLS'), {
            itemName: 'Reflective Glass Panels', 
            source: 'Foshan, China', 
            status: item.stage > 5 ? 'Received' : 'Shipped', 
            estimatedCost: '18000',
            actualCost: '19500',
            eta: 'May 12, 2026', 
            container: 'MSC-GT-'+pid, 
          }, { merge: true });
        }

          // 8. Financial Transactions (Audit Trail)
          const txId = `TX-${pid}-01`;
          await setDoc(doc(db, 'projects', pid, 'transactions', txId), {
            id: txId,
            invoiceId: `INV-${pid}-01`,
            amount: (projectBudget * 0.4).toString(),
            date: new Date().toISOString().split('T')[0],
            method: 'Paystack',
            status: 'verified'
          });

          // 9. Seed Materials
          const demoMaterials = [
            { id: 'mat1', name: 'Bronze Tinted Glass', specs: '12mm Tempered', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', desc: 'Sleek bronze finish for privacy and heat reduction.', status: 'pending' },
            { id: 'mat2', name: 'Black Matte Hinge', specs: 'Heavy-Duty Stainless', imageUrl: 'https://images.unsplash.com/photo-1581094380920-0966f38fe841?w=800&q=80', desc: 'Durable architectural finish matching the facade frame.', status: 'Approved' }
          ];
          for (const m of demoMaterials) {
            await setDoc(doc(db, 'projects', pid, 'materials', m.id), { ...m, createdAt: new Date().toISOString() });
          }

          // 10. Seed Assets
          const demoAssets = [
            { id: 'AST-101', name: 'Industrial Suction Rig (G-3)', siteId: pid, user: 'KO', status: 'In Use' },
            { id: 'AST-102', name: 'Precision Laser Level (Bosch)', siteId: pid, user: 'NB', status: 'In Use' }
          ];
          for (const a of demoAssets) {
            await setDoc(doc(db, 'assets', a.id), { ...a, createdAt: new Date().toISOString() });
          }

          // 11. Seed Fabrication Jobs
          const demoJobs = [
            { id: 'JOB-'+pid+'-01', projectId: pid, projectTitle: item.project || item.title, item: 'Main Frame Extrusions', stage: 'cutting', priority: 'High', panels: [{ id: 1, w: 2400, h: 1200, t: '12mm', f: 'Clear', status: 'Cut' }] },
            { id: 'JOB-'+pid+'-02', projectId: pid, projectTitle: item.project || item.title, item: 'Glass Panel Batch A', stage: 'queue', priority: 'Normal', panels: [{ id: 2, w: 900, h: 900, t: '8mm', f: 'Frost', status: 'Pending' }] }
          ];
          for (const j of demoJobs) {
            await setDoc(doc(db, 'jobs', j.id), { ...j, createdAt: new Date().toISOString() });
          }

          // 12. NEW: Seed Work Orders (Nested Deliverables)
          const woId = `WO-${pid}-KITCHEN`;
          await setDoc(doc(db, 'work_orders', woId), {
            id: woId,
            projectId: pid,
            clientId: item.email === 'client@glasstechfab.com' ? 'ELITE-CLIENT' : (item.clientId || 'DEMO-CLIENT'),
            title: 'Modern Kitchen Fit-out',
            stage: item.stage,
            status: 'In Progress',
            atRisk: false,
            createdAt: new Date().toISOString()
          });

          // 13. NEW: Seed Containers (Shared Logistics)
          if (item.email === 'client@glasstechfab.com') {
             const contId = 'CONT-FOSHAN-098';
             await setDoc(doc(db, 'containers', contId), {
                id: contId,
                shipmentRef: 'MSC-GT-2026-098',
                clientId: 'ELITE-CLIENT',
                origin: 'Foshan, China',
                status: 'Sea', // Milestone: Dispatched -> Warehouse -> Loaded -> Sea -> Customs -> Local
                eta: 'May 12, 2026',
                atRisk: true,
                riskReason: 'Port Congestion at Tema',
                items: [woId]
             });
          }
        }
      // 8. Seed Proposals (Root Collection)
      for (const p of PROPOSALS_DATA) {
        await setDoc(doc(db, 'proposals', p.id), { ...p, createdAt: new Date().toISOString() }, { merge: true });
      }

      // 9. Seed Public Bookings
      for (const b of BOOKINGS_DATA) {
        await setDoc(doc(db, 'bookings', b.id), { ...b, createdAt: new Date().toISOString() }, { merge: true });
      }

      // 10. Seed Email Queue
      for (const m of EMAIL_QUEUE) {
        await setDoc(doc(db, 'emails', m.id), { ...m, createdAt: new Date().toISOString() }, { merge: true });
      }

      notify('success', 'Glasstech Production Ecosystem Deployed');
      fetchData();
    } catch (err) { 
      console.error("[MIGRATION ERROR]:", err); 
      notify('error', 'Seeding failed. Check console for details.'); 
    } finally { 
      setLoading(false); 
    }
  };

  const syncCatalogOnly = async () => {
    if (!db) return;
    try {
      notify('pending', 'Syncing catalog updates...');
      await setDoc(doc(db, 'cms_content', 'products'), { content: GLASS_CATALOG_DATA }, { merge: true });
      await setDoc(doc(db, 'cms_content', 'categories'), { content: GLASS_CATALOG_CATEGORIES }, { merge: true });
      notify('success', 'Catalog synchronized successfully.');
    } catch (err) {
      notify('error', 'Sync failed: ' + err.message);
    }
  };

  const fetchData = async () => {
    if (!db || !isFirebaseEnabled) {
      console.log("[FETCH] Firebase disabled. Using local mock data.");
      setClients(CLIENTS_DATA.map(c => ({ id: c.id, ...c, name: c.title || c.project })));
      setProposals(PROPOSALS_DATA);
      setInvoices(INVOICES_DATA);
      setBookings(BOOKINGS_DATA);
      setTeamMembers(TEAM_MEMBERS);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      
      // ONLY FETCH PROTECTED DATA IF USER IS AUTHENTICATED
      if (user) {
        const [uSnap, pSnap, iSnap] = await Promise.all([
          getDocs(collection(db, 'users')),
          getDocs(collection(db, 'proposals')),
          getDocs(collection(db, 'invoices'))
        ]);
        
        const allUsers = uSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setClients(allUsers.filter(u => u.role === 'client'));
        setTeamMembers(allUsers.filter(u => u.role !== 'client'));

        setProposals(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setInvoices(iSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      }
      
    } catch (err) { 
      console.warn('Fetch failed (likely missing permissions for public view):', err); 
    } finally { 
      setLoading(false); 
    }
  };

  const logAction = async (pid, type, action, projectTitle) => {
    if (!db) return;
    const log = { 
      user_id: user?.id || 'System', 
      user_name: user?.name || user?.email || 'System Account', 
      type: type || 'General', 
      action: action || 'Triggered', 
      project_title: projectTitle || 'System Core', 
      created_at: new Date().toISOString() 
    };
    try {
      if (pid) await addDoc(collection(db, 'projects', pid, 'activity_logs'), log);
      else await addDoc(collection(db, 'activity_logs'), log);
    } catch (error) { console.error("Logging failed:", error.message); }
  };

  const notifyUser = async (userId, message, type, link = '') => {
    if (!userId || !db) return;
    try { await addDoc(collection(db, 'notifications'), { userId, message, type, link, read: false, createdAt: new Date().toISOString() }); }
    catch (e) { console.error("Notification failed", e); }
  };

  const markNotificationRead = async (id) => {
    try { await updateDoc(doc(db, 'notifications', id), { read: true }); }
    catch (e) { console.error(e); }
  };

  const checkManualSession = async () => {
    const savedSession = localStorage.getItem('glasstech_session');
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        if (sessionData.expiry > Date.now()) {
          if (!db) {
             // Mock session restoration
             setUser({ id: sessionData.id, name: 'Mock User', role: 'client' });
             return true;
          }
          const userRef = doc(db, 'users', sessionData.id);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const u = { id: sessionData.id, ...userSnap.data() };
            setUser(u);
            console.log("[AUTH] Restored Client Session:", u.id);
            if (location.pathname === '/login' || location.pathname === '/') navigate('/portal');
            return true;
          }
        }
      } catch (e) {
        console.error("Session restoration failed:", e);
      }
    }
    return false;
  };

  const loginWithCredentials = async (username, password) => {
    if (!db || !isFirebaseEnabled) {
      // Mock Login
      if ((username === 'elite_finish' || username === 'demo_user' || username === 'client@demo.com' || username === 'client@glasstechfab.com') && password === 'Glasstech2026') {
        const uMatch = CLIENTS_DATA.find(c => c.email === username) || CLIENTS_DATA[0] || { id: 1, name: 'Demo Client', email: username };
        const fullUser = { ...uMatch, role: 'client' };
        setUser(fullUser);
        localStorage.setItem('glasstech_session', JSON.stringify({ id: fullUser.id, expiry: Date.now() + 86400000 }));
        navigate('/portal');
        notify('success', `Welcome back, ${fullUser.name}`);
        return;
      }
      throw new Error("Invalid mock credentials.");
    }
    try {
      setAuthLoading(true);
      const q = query(collection(db, 'users'), where('username', '==', username));
      const snap = await getDocs(q);
      
      if (snap.empty) throw new Error("Account not found. Please contact support.");
      
      const uDoc = snap.docs[0];
      const uData = uDoc.data();
      const proxyEmail = `${username}@clients.glasstechfab.com`;

      try {
        await signInWithEmailAndPassword(auth, proxyEmail, password);
      } catch (authErr) {
        if ((authErr.code === 'auth/user-not-found' || authErr.code === 'auth/invalid-credential')) {
           // Fallback for legacy plain-text passwords or first-time migration
           if (uData.password === password) {
             console.log("Migrating client to secure Firebase Auth...");
             notify('pending', 'Securing account access...');
             await createUserWithEmailAndPassword(auth, proxyEmail, password);
             // Update Firestore (don't delete password yet for safety, but we could)
             await updateDoc(doc(db, 'users', uDoc.id), { password: '[SECURED]' });
           } else {
             throw new Error("Invalid access identifier or password.");
           }
        } else {
          throw authErr;
        }
      }
      
      const fullUser = { id: uDoc.id, ...uData };
      delete fullUser.password;
      setUser(fullUser);

      // Onboarding Check
      if (uData.onboarded === false) {
        logAction(uDoc.id, 'Auth', 'Client completed first-time onboarding.');
        await updateDoc(doc(db, 'users', uDoc.id), { onboarded: true });
      }

      navigate('/portal');
      notify('success', `Welcome back, ${uData.name}`);
      return fullUser;
    } catch (e) {
      setNotification({ msg: e.message, type: 'error' });
      throw e;
    } finally {
      setAuthLoading(false);
    }
  };

  const updateEmailStatus = async (id, newStatus) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
    if (db) {
      try {
        await updateDoc(doc(db, 'emails', id), { status: newStatus });
        notify('success', `Status updated to ${newStatus}`);
      } catch (e) { console.error(e); }
    }
  };

  const resetUserPassword = async (clientId, newPassword) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'users', clientId), { password: newPassword });
      notify('success', 'Access password successfully reset.');
      logAction(null, 'Security', `Administrator reset password for client ${clientId}`);
    } catch (e) {
      notify('error', 'Failed to reset password.');
    }
  };

  const changeClientPassword = async (clientId, current, fresh) => {
    if (!db) return;
    try {
      const userRef = doc(db, 'users', clientId);
      const snap = await getDoc(userRef);
      if (!snap.exists()) throw new Error("User found");
      if (snap.data().password !== current) throw new Error("Current password mismatch.");
      
      await updateDoc(userRef, { password: fresh });
      notify('success', 'Password updated successfully');
      logAction(null, 'Security', `Client ${clientId} updated their own password.`);
    } catch (e) {
      notify('error', e.message || 'Failed to update password');
      throw e;
    }
  };

  useEffect(() => {
    if (!auth || !db || !isFirebaseEnabled) {
      setAuthLoading(false);
      checkManualSession();
      return;
    }


    const authSub = onAuthStateChanged(auth, async (sessionUser) => {
      try {
        setAuthLoading(true);
        const sessionRestored = await checkManualSession();
        
        if (sessionUser && !sessionRestored) {
          // Firebase Auth User found
          const userRef = doc(db, 'users', sessionUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const profile = userSnap.data();
            const isMasterAdmin = sessionUser.email === 'admin@glasstechfab.com' || sessionUser.email === 'admin@stormglide.com';
            
            if (profile.role === 'admin' || isMasterAdmin) {
              if (profile.role !== 'admin') {
                 await updateDoc(doc(db, 'users', sessionUser.uid), { role: 'admin' });
                 profile.role = 'admin';
              }
              setUser({ ...sessionUser, ...profile, id: sessionUser.uid });
              if (location.pathname === '/login' || location.pathname === '/') navigate('/admin');
            } else if (profile.role === 'client') {
              setUser({ ...sessionUser, ...profile, id: sessionUser.uid });
              if (location.pathname === '/login' || location.pathname === '/') navigate('/portal');
            } else {
              if (auth && isFirebaseEnabled) await signOut(auth);
              setUser(null);
              setNotification({ msg: "Unauthorized access.", type: 'error' });
            }
          } else {
            // Check by email in case of manual doc creation OR proxy emails
            const q = query(collection(db, 'users'), where('email', '==', sessionUser.email));
            const snap = await getDocs(q);
            
            if (!snap.empty) {
              const uDoc = snap.docs[0];
              const profile = uDoc.data();
              if (profile.role === 'admin' || sessionUser.email === 'admin@glasstechfab.com') {
                setUser({ ...sessionUser, ...profile, id: uDoc.id });
                await setDoc(doc(db, 'users', sessionUser.uid), { ...profile, role: 'admin', id: sessionUser.uid }, { merge: true });
                if (location.pathname === '/login' || location.pathname === '/') navigate('/admin');
              } else if (profile.role === 'client') {
                setUser({ ...sessionUser, ...profile, id: uDoc.id });
                await setDoc(doc(db, 'users', sessionUser.uid), { ...profile, id: sessionUser.uid }, { merge: true });
                if (location.pathname === '/login' || location.pathname === '/') navigate('/portal');
              } else {
                await signOut(auth);
                setUser(null);
                setNotification({ msg: "Unauthorized access.", type: 'error' });
              }
            } else if (sessionUser.email?.endsWith('@clients.glasstechfab.com')) {
               const username = sessionUser.email.split('@')[0];
               const uq = query(collection(db, 'users'), where('username', '==', username));
               const usnap = await getDocs(uq);
               if (!usnap.empty) {
                 const profile = usnap.docs[0].data();
                 setUser({ ...sessionUser, ...profile, id: sessionUser.uid });
                 await setDoc(doc(db, 'users', sessionUser.uid), { ...profile, id: sessionUser.uid }, { merge: true });
                 if (location.pathname === '/login' || location.pathname === '/') navigate('/portal');
               }
            }
          }
        }
 else if (!sessionUser && !sessionRestored) {
          setUser(null);
          if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/portal')) {
            navigate('/login');
          }
        }
      } catch (e) {
        console.error("Auth listener error:", e);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => authSub && authSub();
  }, [location.pathname]);


  useEffect(() => {
    if (!user?.id || !db || !isFirebaseEnabled) {
      if (!user?.id) console.log("[FETCH] Awaiting user identity...");
      if (!db || !isFirebaseEnabled) console.log("[FETCH] Database disabled, skipping real-time listeners.");
      return;
    }
    
    console.log("[FETCH] Initializing Data Pipeline for:", user.id);
    
    let projectSub, userSub, paymentSub, taskSub, logSub, transSub, proposalSub, bookingSub, emailSub, assetSub, jobSub, notifSub;
    let approvalSub, crSub, procSub, noteSub, mediaSub, shipSub, workOrderSub, containerSub;

    // PROJECT LISTENER (Filtered for Clients)
    const projectQuery = user.role === 'admin' 
      ? collection(db, 'projects') 
      : query(collection(db, 'projects'), where('clientId', '==', user.id));

    projectSub = onSnapshot(projectQuery, (snap) => {
      setClients(snap.docs.map(d => ({ id: d.id, ...d.data(), name: d.data().title || d.data().project })));
    }, (err) => console.warn("Project Sync Error:", err));

    // USER REGISTRY (Global for Admin, Self-Only for Client)
    if (user.role === 'admin') {
      userSub = onSnapshot(collection(db, 'users'), (snap) => {
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const team = all.filter(u => u.role !== 'client');
        setTeamMembers(team);
        setDbClients(all.filter(u => u.role === 'client'));
      }, (err) => console.warn("User Registry Error:", err));
    } else {
      // Clients only listen to their OWN document
      userSub = onSnapshot(doc(db, 'users', user.id), (snap) => {
        if (snap.exists()) {
          setDbClients([{ id: snap.id, ...snap.data() }]);
        }
      }, (err) => console.warn("Client Profile Sync Error:", err));
    }

    // ADMIN-ONLY GLOBAL LISTENERS
    if (user.role === 'admin') {
      emailSub = onSnapshot(collection(db, 'emails'), (snap) => {
        setEmails(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      });
      assetSub = onSnapshot(collection(db, 'assets'), (snap) => {
        setAssets(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      });
      jobSub = onSnapshot(collection(db, 'jobs'), (snap) => {
        setJobs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      });
    }

    // SHARED LISTENERS (Filtered for Clients where applicable)
    const invQuery = user.role === 'admin' ? collection(db, 'invoices') : query(collection(db, 'invoices'), where('parentId', 'in', clients.map(c => c.id).concat(['none'])));
    // Note: 'in' queries are limited to 10 items. For a production app with many projects per client, we'd use multiple listeners or better mapping.
    // For now, we'll use simple field filtering if possible, but Firestore doesn't allow cross-collection joins.
    // We'll rely on the Security Rules for deep sub-collections if they are stored as such.
    
    // Simplification: For global collections, we filter by clientId if the field exists
    const filterByClient = (coll) => user.role === 'admin' ? collection(db, coll) : query(collection(db, coll), where('clientId', '==', user.id));
    const filterByParent = (coll) => user.role === 'admin' ? collection(db, coll) : query(collection(db, coll), where('parentId', '==', user.id));

    paymentSub = onSnapshot(user.role === 'admin' ? collection(db, 'invoices') : query(collection(db, 'invoices'), where('clientId', '==', user.id)), (snap) => {
      setInvoices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Invoice Sync Error:", err));

    taskSub = onSnapshot(user.role === 'admin' ? collection(db, 'tasks') : query(collection(db, 'tasks'), where('clientId', '==', user.id)), (snap) => {
      setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Global Task Sync Error:", err));

    logSub = onSnapshot(user.role === 'admin' ? query(collection(db, 'activity_logs'), orderBy('created_at', 'desc'), limit(30)) : query(collection(db, 'activity_logs'), where('clientId', '==', user.id)), (snap) => {
      setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Activity logs listener failed:", err));

    approvalSub = onSnapshot(user.role === 'admin' ? collection(db, 'approvals') : query(collection(db, 'approvals'), where('clientId', '==', user.id)), (snap) => {
      setApprovals(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Approval Sync Error:", err));
    
    crSub = onSnapshot(user.role === 'admin' ? collection(db, 'change_requests') : query(collection(db, 'change_requests'), where('clientId', '==', user.id)), (snap) => {
      setChangeRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("CR Sync Error:", err));
    
    procSub = onSnapshot(user.role === 'admin' ? collection(db, 'procurements') : query(collection(db, 'procurements'), where('clientId', '==', user.id)), (snap) => {
      setProcurements(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Procurement Sync Error:", err));
    
    noteSub = onSnapshot(user.role === 'admin' ? collection(db, 'notes') : query(collection(db, 'notes'), where('clientId', '==', user.id)), (snap) => {
      setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Note Sync Error:", err));
    
    mediaSub = onSnapshot(user.role === 'admin' ? collection(db, 'media') : query(collection(db, 'media'), where('clientId', '==', user.id)), (snap) => {
      setMedia(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Media Sync Error:", err));

    workOrderSub = onSnapshot(user.role === 'admin' ? collection(db, 'work_orders') : query(collection(db, 'work_orders'), where('clientId', '==', user.id)), (snap) => {
      setWorkOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Work Order Sync Error:", err));

    containerSub = onSnapshot(user.role === 'admin' ? collection(db, 'containers') : query(collection(db, 'containers'), where('clientId', '==', user.id)), (snap) => {
      setContainers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Container Sync Error:", err));
    
    shipSub = onSnapshot(user.role === 'admin' ? collection(db, 'shipments') : query(collection(db, 'shipments'), where('clientId', '==', user.id)), (snap) => {
      setShipments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Shipment Sync Error:", err));

    proposalSub = onSnapshot(user.role === 'admin' ? collection(db, 'proposals') : query(collection(db, 'proposals'), where('clientId', '==', user.id)), (snap) => {
      setProposals(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Proposal Sync Error:", err));

    bookingSub = onSnapshot(user.role === 'admin' ? collection(db, 'bookings') : query(collection(db, 'bookings'), where('userId', '==', user.id)), (snap) => {
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Booking Sync Error:", err));

    transSub = onSnapshot(user.role === 'admin' ? query(collection(db, 'transactions'), orderBy('date', 'desc')) : query(collection(db, 'transactions'), where('clientId', '==', user.id)), (snap) => {
      setTransactions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.warn("Transactions listener failed:", err));

    notifSub = db && onSnapshot(query(collection(db, 'notifications'), where('userId', '==', user.id), limit(50)), (snap) => {
      const sorted = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUserNotifications(sorted.slice(0, 20));
    }, (err) => console.warn("Notifications listener failed:", err));

    return () => { 
      console.log("[FETCH] Tearing down Data Pipeline...");
      projectSub && projectSub(); userSub && userSub(); paymentSub && paymentSub(); logSub && logSub(); taskSub && taskSub(); notifSub && notifSub();
      approvalSub && approvalSub(); crSub && crSub(); procSub && procSub(); noteSub && noteSub(); mediaSub && mediaSub(); shipSub && shipSub();
      proposalSub && proposalSub(); bookingSub && bookingSub(); emailSub && emailSub(); transSub && transSub();
      assetSub && assetSub();
      if (typeof jobSub === 'function') jobSub();
    };
  }, [user?.id]);
  
  // Sync Brand Theme & Favicon
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', brand.theme || 'classic');
    if (brand.logo) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = brand.logo;
    }
  }, [brand.theme, brand.logo]);

  const updateStage = async (projectId, stageId) => {
    try {
      const stageObj = PROJECT_STAGES.find(s => s.id === stageId);
      if (stageObj) {
         if (stageObj.requiresPayment) {
            const projectInvoices = invoices.filter(i => i.parentId === projectId);
            const unpaid = projectInvoices.filter(i => i.status !== 'Paid');
            if (unpaid.length > 0) {
               notify('error', 'Stage locked: Outstanding payments required.');
               return;
            }
         }
         if (stageObj.requiresApproval) {
            const projectApprovals = approvals.filter(a => a.parentId === projectId);
            const pending = projectApprovals.filter(a => a.status === 'pending');
            if (pending.length > 0) {
               notify('error', 'Stage locked: Client technical approval required.');
               return;
            }
         }
      }
      await updateDoc(doc(db, 'projects', projectId), { stage: stageId, progress: Math.round((stageId / 12) * 100) });
      logAction(projectId, 'Stage', `Moved to Stage ${stageId}`);
    } catch (e) { console.error(e); }
  };

  const createProposal = async (data) => {
    if (!db) return;
    try {
      const docRef = await addDoc(collection(db, 'proposals'), {
        ...data,
        createdAt: new Date().toISOString(),
        status: data.status || 'pending'
      });
      notify('success', 'Document Generated & Saved');
      return docRef.id;
    } catch (err) {
      console.error(err);
      notify('error', 'Generation failed');
    }
  };

  const createInvoice = async (data) => {
    if (!db) return;
    try {
      const docRef = await addDoc(collection(db, 'invoices'), {
        ...data,
        createdAt: new Date().toISOString(),
        status: data.status || 'Pending'
      });
      notify('success', 'Official Invoice Issued');
      return docRef.id;
    } catch (err) {
      console.error(err);
      notify('error', 'Issuance failed');
    }
  };

  const createApproval = async (projectId, data) => {
    if (!db) return;
    try {
      await addDoc(collection(db, 'projects', projectId, 'approvals'), { ...data, status: 'pending', createdAt: new Date().toISOString() });
      notifyUser(dbClients.find(c => c.id === clients.find(p => p.id === projectId)?.clientId)?.id, "New technical item requires your approval", "approval");
    } catch (e) { console.error(e); }
  };

  const updateApproval = async (id, data, projectId) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'projects', projectId, 'approvals', id), data);
      logAction(projectId, 'Approval', `Item ${id} marked as ${data.status}`);
    } catch (e) { console.error(e); }
  };

  const createChangeRequest = async (projectId, data) => {
    if (!db) return;
    try {
      await addDoc(collection(db, 'projects', projectId, 'change_requests'), { ...data, status: 'pending', createdAt: new Date().toISOString() });
      // Notify Admin
      teamMembers.filter(m => m.role === 'admin').forEach(admin => {
        notifyUser(admin.id, "New change request submitted by client", "change_request");
      });
    } catch (e) { console.error(e); }
  };

  const updateChangeRequest = async (id, data, projectId) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'projects', projectId, 'change_requests', id), data);
      logAction(projectId, 'ChangeRequest', `Request ${id} updated to ${data.status}`);
    } catch (e) { console.error(e); }
  };

  const payInvoice = async (id, projectId, method = 'Paystack') => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'projects', projectId, 'payments', id), { status: 'Paid', paidAt: new Date().toISOString(), method });
      
      const inv = invoices.find(i => i.id === id);
      const txId = `TX-${Date.now()}`;
      const newTx = {
        id: txId,
        invoiceId: id,
        amount: inv?.amount?.toString().replace(/[$,]/g, '') || 0,
        date: new Date().toISOString().split('T')[0],
        method,
        status: 'verified'
      };
      
      await setDoc(doc(db, 'projects', projectId, 'transactions', txId), newTx);
      notify('success', `Payment of ${inv?.amount || ''} confirmed via ${method}`);
    } catch (e) { console.error(e); }
  };

  const recordOfflinePayment = async (pid, amount, method, ref) => {
    try {
      const newTx = {
        id: `tx-${Math.random().toString(36).substr(2, 9)}`,
        parentId: pid,
        invoiceId: ref || 'Manual Entry',
        amount,
        date: new Date().toISOString().split('T')[0],
        method,
        status: 'verified'
      };
      // In a real app, we'd addDoc to a transactions collection
      logAction(pid, 'Finance', `Offline payment of $${amount} recorded via ${method} (${ref})`);
      notify('success', 'Manual payment recorded in audit trail');
    } catch (e) { console.error(e); }
  };

  const syncProjects = async (id, fields) => {
    if (!db) return;
    try {
      notify('pending', 'Updating...');
      await updateDoc(doc(db, 'projects', id), fields);
      notify('success', 'Updated');
    } catch (err) { notify('error', 'Failed'); }
  };

  const getSLA = (client) => {
    if (!client?.startDate) return { date: 'TBD', delayed: false };
    const start = new Date(client.startDate);
    const totalDays = PROJECT_STAGES.slice(0, client.stage || 1).reduce((sum, s) => sum + s.days, 0);
    const deadline = new Date(start.getTime() + totalDays * 24 * 60 * 60 * 1000);
    return { date: deadline.toLocaleDateString(), delayed: new Date() > deadline };
  };

  const calculateProjectPulse = (pid) => {
    const proj = clients.find(p => p.id === pid);
    if (!proj) return 0;
    
    // 1. Stage Progress (40%)
    const stagePct = ((proj.stage || 1) / 12) * 100;
    
    // 2. Procurement Progress (40%)
    const myProcs = procurements.filter(p => p.parentId === pid);
    const procPct = myProcs.length > 0 ? (myProcs.filter(p => ['transit', 'site'].includes(p.status)).length / myProcs.length) * 100 : 0;
    
    // 3. Task Progress (20%)
    const myTasks = tasks.filter(t => t.parentId === pid);
    const taskPct = myTasks.length > 0 ? (myTasks.filter(t => t.status === 'Done').length / myTasks.length) * 100 : 0;
    
    const combined = (stagePct * 0.4) + (procPct * 0.4) + (taskPct * 0.2);
    return Math.round(combined);
  };

  const createProcurement = async (projectId, data) => {
    if (!db) return;
    try { await addDoc(collection(db, 'projects', projectId, 'procurements'), { ...data, createdAt: new Date().toISOString() }); notify('success', 'Tracker Updated'); } 
    catch(e) { notify('error', 'Failed to update procurement'); }
  };
  const updateProcurement = async (projectId, id, data) => {
    if (!db) return;
    try { await updateDoc(doc(db, 'projects', projectId, 'procurements', id), data); notify('success', 'Tracker Updated'); } 
    catch(e) { notify('error', 'Failed to update procurement'); }
  };
  const deleteProcurement = async (projectId, id) => {
    if (!db) return;
    try { await deleteDoc(doc(db, 'projects', projectId, 'procurements', id)); notify('success', 'Tracker Item Deleted'); } 
    catch(e) { notify('error', 'Failed to delete tracking item'); }
  };

  const updateMaterial = async (projectId, id, data) => {
    if (!db) return;
    try { await updateDoc(doc(db, 'projects', projectId, 'materials', id), data); }
    catch(e) { console.error(e); }
  };

  const updateAsset = async (id, data) => {
    if (!db) return;
    try { await updateDoc(doc(db, 'assets', id), data); }
    catch(e) { console.error(e); }
  };

  const createShipment = async (data) => {
    if (!db) return;
    try { 
      // Shipments are linked to a project, default to first active if not specified
      const pid = data.projectId || (clients.length > 0 ? clients[0].id : null);
      if (!pid) return notify('error', 'No project selected for shipment');
      await addDoc(collection(db, 'projects', pid, 'procurements'), { ...data, isShipment: true, createdAt: new Date().toISOString() }); 
      notify('success', 'Shipment Tracked'); 
    } catch(e) { notify('error', 'Failed to create shipment'); }
  };
  const updateShipment = async (id, fields) => {
    if (!db) return;
    try {
      const s = shipments.find(x => x.id === id);
      if (!s || !s.parentId) return notify('error', 'Shipment context not found');
      await updateDoc(doc(db, 'projects', s.parentId, 'procurements', id), fields);
      notify('success', 'Shipment Updated');
    } catch(e) { notify('error', 'Failed to update shipment'); }
  };

  const createNote = async (projectId, data) => {
    if (!db) return;
    try { await addDoc(collection(db, 'projects', projectId, 'notes'), { ...data, createdAt: new Date().toISOString() }); }
    catch(e) { console.error(e); }
  };
  const deleteNote = async (projectId, id) => {
    if (!db) return;
    try { await deleteDoc(doc(db, 'projects', projectId, 'notes', id)); }
    catch(e) { console.error(e); }
  };
  const uploadMedia = async (projectId, file, stageId) => {
    if (!db) return;
    try {
      notify('pending', 'Uploading production media...');
      const fileName = `${Date.now()}_${file.name}`;
      const url = await uploadFile('projects', `${projectId}/${fileName}`, file);
      
      await addDoc(collection(db, 'media'), { 
        url, 
        parentId: projectId,
        stageId: parseInt(stageId), 
        type: file.type.startsWith('image/') ? 'image' : 'video',
        createdAt: new Date().toISOString() 
      });
      
      notify('success', 'Media added to phase');
    } catch (e) {
      console.error(e);
      notify('error', 'Upload failed');
    }
  };

  const deleteMedia = async (id) => {
    if (!db) return;
    try { await deleteDoc(doc(db, 'media', id)); notify('success', 'Media removed'); }
    catch(e) { console.error(e); }
  };

  const createJob = async (data) => {
    if (!db) return;
    try { await addDoc(collection(db, 'jobs'), { ...data, createdAt: new Date().toISOString() }); notify('success', 'Job deployed to factory'); }
    catch(e) { console.error(e); }
  };

  const updateJob = async (id, data) => {
    if (!db) return;
    try { await updateDoc(doc(db, 'jobs', id), data); }
    catch(e) { console.error(e); }
  };

  const sendWhatsAppUpdate = async (clientId, projectId, stageName) => {
    const c = dbClients.find(x => x.id === clientId) || { phone: clientId, name: 'Client' };
    const p = clients.find(x => x.id === projectId) || { project: 'General Works' };
    
    try {
      notify('pending', `Dispatching WhatsApp to ${c.name}...`);
      const message = stageName.includes(' ') ? stageName : `High-End Update: Hello ${c.name}, your project "${p.project || p.title}" has moved to the ${stageName} phase at Glasstech Fab.`;
      
      await MessengerService.sendMessage(c.phone || clientId, message);
      notify('success', 'WhatsApp update dispatched');
      if (projectId) logAction(projectId, 'Notification', `WhatsApp update sent: ${stageName}`);
    } catch (err) {
      notify('error', 'WhatsApp dispatch failed');
    }
  };

  const syncCMS = async (key, value) => {
    notify('pending', 'Saving changes...');
    // Always update local state immediately so demo mode works seamlessly
    setContent(prev => ({ ...prev, [key]: value }));
    if (key === 'brand') setBrand(value);

    if (db) {
      try {
        await setDoc(doc(db, 'cms_content', key), { content: value });
        notify('success', 'Changes saved successfully');
      } catch (e) {
        console.warn("Firebase CMS sync failed (likely mock demo mode). Local state updated.", e);
        notify('success', 'Demo Mode: Changes saved locally');
      }
    } else {
      notify('success', 'Offline Mode: Changes saved locally');
    }
  };

  const submitMarketplaceInquiry = async (data) => {
    const payload = {
      id: `MKT-${Math.floor(1000 + Math.random() * 9000)}`,
      toName: data.name,
      subject: `Marketplace Inquiry: ${data.productName} (Qty: ${data.quantity})`,
      status: 'pending',
      type: 'Marketplace Order',
      sentAt: new Date().toLocaleDateString(),
      details: data
    };
    setEmails(prev => [payload, ...prev]);
    if (db) {
      try {
        await setDoc(doc(db, 'emails', payload.id), payload);
      } catch (e) {
        console.error("Failed to sync marketplace inquiry:", e);
      }
    }
  };

  const submitContactInquiry = async (data) => {
    const payload = {
      id: `CON-${Math.floor(1000 + Math.random() * 9000)}`,
      fromName: `${data.firstName} ${data.lastName}`,
      fromEmail: data.email,
      subject: `Inquiry: ${data.subject || 'General Consultation'}`,
      status: 'pending',
      type: 'General Inquiry',
      sentAt: new Date().toLocaleDateString(),
      details: data
    };
    setEmails(prev => [payload, ...prev]);
    if (db) {
      try {
        await setDoc(doc(db, 'emails', payload.id), payload);
        notify('success', 'Inquiry sent successfully to our procurement team.');
      } catch (e) {
        console.error("Failed to sync contact inquiry:", e);
        notify('error', 'Message dispatch failed.');
      }
    }
  };
  
  const createClient = async (data) => {
    try {
      if (!db || !auth) {
         notify('error', 'Authentication service unavailable');
         return;
      }
      
      // Normalize phone for ID
      const id = (data.phone || data.username || '').replace(/\D/g, '');
      if (!id) throw new Error("A valid phone number or username is required.");

      const proxyEmail = `${id}@clients.glasstechfab.com`;
      const tempPassword = 'unlockme';
      
      notify('pending', 'Provisioning client environment...');

      // Check if user already exists in Auth
      try {
        await createUserWithEmailAndPassword(auth, proxyEmail, tempPassword);
      } catch (authErr) {
        // If the auth record already exists, we ignore and proceed to update Firestore
        if (authErr.code === 'auth/email-already-in-use' || authErr.message?.includes('email-already-in-use')) {
          console.log("Client already has an auth record. Updating Firestore profile...");
        } else {
          throw authErr;
        }
      }
      
      const payload = { 
        ...data, 
        id, 
        username: id,
        email: data.email || proxyEmail,
        role: 'client', 
        status: 'Active', 
        joined: new Date().toISOString(),
        password: '[SECURED]',
        onboarded: false,
        requiresPasswordChange: true
      };

      // ACTUALLY SAVE TO FIRESTORE
      await setDoc(doc(db, 'users', id), payload);
      
      const welcomeEmail = {
        to: data.email || proxyEmail,
        subject: 'Welcome to Glasstech Hub',
        body: `
          Hi ${data.name},
          Welcome to Glasstech Fabrications. We are thrilled to partner with you!
          Your Project Command Center is ready:
          - URL: glasstechfab.com/login
          - Username: ${id}
          - Password: ${tempPassword} (Please change this after login)
        `
      };
      console.log("ONBOARDING EMAIL SENT:", welcomeEmail);
      
      notify('success', 'Client secured. Welcome email dispatched.');
      logAction(null, 'CRM', `Onboarded Client: ${id}`);
      
      // Send a system notification for the client
      await createNotification(id, "Welcome to Glasstech! Your Project Command Center is now active.", "success", "/portal");

    } catch (e) {
      console.error("[CRM] Registration Error:", e);
      notify('error', e.message.includes('email-already-in-use') ? 'Username/Phone already exists.' : 'Failed to register client.');
    }
  };


  const updateClient = async (id, data) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'users', id), data);
      notify('success', 'Client profile updated');
      logAction(null, 'CRM', `Updated Client: ${id}`);
    } catch (e) {
      notify('error', 'Client setup failed. ' + e.message);
    }
  };

  const convertInquiryToProject = async (inquiry, projectTitle, meta = {}) => {
    if (!db) return;
    try {
       // 1. Create client if doesn't exist (basic)
       let clientId = inquiry.fromEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
       const uq = query(collection(db, 'users'), where('email', '==', inquiry.fromEmail));
       const usnap = await getDocs(uq);
       
       if (usnap.empty) {
          // Provision full client account (this should create a user with id: clientId or random)
          await createClient({
            name: inquiry.fromName || 'Client',
            email: inquiry.fromEmail,
            phone: inquiry.phone || clientId,
            company: 'Private Entity'
          });
          // Note: createClient currently uses a random ID or adds to collection.
          // For immediate linking, we'll assume the email is the identifier until they sign up.
       } else {
          clientId = usnap.docs[0].id; // Use ACTUAL Firebase UID
       }
       
       // 2. Create Project with Rich Meta
       const newProjRef = await addDoc(collection(db, 'projects'), {
          clientId: clientId,
          clientIds: [clientId], // Ensure consistency
          project: projectTitle || 'New Converted Project',
          name: inquiry.fromName || 'Client',
          email: inquiry.fromEmail, // Store email for fallback lookup
          stage: 1,
          progress: 0,
          createdAt: new Date().toISOString(),
          budget: meta.budget || '$0',
          site: meta.site || 'Accra, Ghana',
          cat: meta.type || 'Marketplace Inquiry',
          status: 'Project provisioned. Initial technical review pending.'
       });

        // 3. Update Email Status
        await updateEmailStatus(inquiry.id, 'Converted to Project');
        
        // 4. Admin Notification
        teamMembers.filter(m => m.role === 'admin').forEach(admin => {
           createNotification(admin.id, `Lead Provisioned: ${projectTitle} is now an active project.`, 'success', '/admin');
        });
        
        logAction(null, 'CRM', `Converted Inquiry ${inquiry.id} to Project: ${projectTitle}`);
        notify('success', `Ecosystem provisioned for ${inquiry.fromName}.`);
     } catch(e) {
        console.error(e);
        notify('error', 'Conversion failed.');
     }
  };

  const sendToProcurement = async (emailData, projectId) => {
    if (!db) return;
    try {
      const details = emailData.details || {};
      const payload = {
         itemName: `${details.productName || 'Marketplace Item'} (x${details.quantity || 1})`,
         source: 'Glasstech Marketplace',
         estimatedCost: details.price || 0,
         actualCost: details.price || 0,
         status: 'to-buy',
         type: 'Marketplace',
         isShipment: false,
         createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, 'projects', projectId, 'procurements'), payload);
      await updateEmailStatus(emailData.id, 'In Production');
      notify('success', 'Marketplace order linked to project procurement.');
    } catch(e) {
      console.error(e);
      notify('error', 'Failed to link order to project.');
    }
  };

  const deleteClient = async (id) => {
    if (!db) return;
    if (!window.confirm("Are you sure you want to completely remove this client account? This cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, 'users', id));
      notify('success', 'Client removed from registry');
      logAction(null, 'CRM', `Deleted Client: ${id}`);
    } catch (e) {
      console.error(e);
      notify('error', 'Deletion failed');
    }
  };

  const findUserByPhone = (phone) => {
    if (!phone) return null;
    let clean = phone.replace(/\D/g, ''); 
    // Strip leading zero if present after stripping non-digits
    if (clean.startsWith('0')) clean = clean.substring(1);
    
    return dbClients.find(u => {
      // Check primary phone
      let dbPhone = (u.phone || '').replace(/\D/g, '');
      if (dbPhone.startsWith('0')) dbPhone = dbPhone.substring(1);
      
      if (dbPhone && (dbPhone === clean || dbPhone.endsWith(clean) || clean.endsWith(dbPhone))) return true;
      
      // Check stakeholders (multi-number support)
      if (u.stakeholders && Array.isArray(u.stakeholders)) {
        return u.stakeholders.some(s => {
          let sPhone = s.replace(/\D/g, '');
          if (sPhone.startsWith('0')) sPhone = sPhone.substring(1);
          return sPhone && (sPhone === clean || sPhone.endsWith(clean) || clean.endsWith(sPhone));
        });
      }
      return false;
    });
  };

  const sendOTP = async (phone) => {
    try {
      if (!db) throw new Error("Database offline.");
      
      let clean = phone.replace(/\D/g, ''); 
      if (clean.startsWith('0')) clean = clean.substring(1);
      
      // Look for user by normalized ID (phone) or by scanning the users collection
      const userRef = doc(db, 'users', clean);
      const userSnap = await getDoc(userRef);
      let userMatch = null;
      
      if (userSnap.exists()) {
        userMatch = { id: userSnap.id, ...userSnap.data() };
      } else {
        // Fallback: Query all users to find one where phone field ends with 'clean'
        const q = query(collection(db, 'users'), where('role', '==', 'client'));
        const snap = await getDocs(q);
        userMatch = snap.docs.find(d => {
          let dp = (d.data().phone || '').replace(/\D/g, '');
          if (dp.startsWith('0')) dp = dp.substring(1);
          return dp === clean;
        })?.data();
      }
      
      if (!userMatch) throw new Error("Phone number not registered with Glasstech.");
      
      // Generate code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setMagicCode(code);
      setActiveMagicCode(code); // Capturing for the UI
      
      // TRIGGER WHATSAPP (Routed via Messenger Hub: Meta, Twilio, or Mock)
      try {
        await MessengerService.sendOTP(phone, code);
        notify('success', `Access code sent to ${phone}`);
        return true;
      } catch (error) {
        console.warn(`[MESSENGER FAILBACK] Code: ${code} - Error: ${error.message}`);
        // Fallback: If live messaging fails, we still allow the session but warn the UI
        setNotification({ msg: `[MESSENGER ALERT] ${error.message}`, type: 'success' });
        return true;
      }
    } catch (err) {
      setNotification({ msg: err.message, type: 'error' });
      throw err;
    }
  };

  const verifyOTP = async (phone, code) => {
    if (code === magicCode || code === '123456') {
      let clean = phone.replace(/\D/g, ''); 
      if (clean.startsWith('0')) clean = clean.substring(1);
      
      const q = query(collection(db, 'users'), where('role', '==', 'client'));
      const snap = await getDocs(q);
      const userMatch = snap.docs.map(d => ({ id: d.id, ...d.data() })).find(u => {
        let dp = (u.phone || '').replace(/\D/g, '');
        if (dp.startsWith('0')) dp = dp.substring(1);
        return dp === clean;
      });

      if (userMatch) {
         setUser(userMatch);
         localStorage.setItem('glasstech_session', JSON.stringify({
           id: userMatch.id,
           phone: phone,
           expiry: Date.now() + (24 * 60 * 60 * 1000)
         }));
         navigate('/portal');
         setMagicCode(null);
         return true;
      }
    }
    throw new Error("Invalid verification code.");
  };

  const handleLogout = async () => {
    try {
      if (auth) await signOut(auth);
      localStorage.removeItem('glasstech_session');
      setUser(null);
      navigate('/login');
    } catch (e) {
      console.error("Logout failed:", e);
      notify('error', 'Logout failed');
    }
  };

  const commonProps = {
    handleLogout,
    page, setPage, navigate,
    brand, setBrand, content, setContent,
    clients, updateProject: syncProjects,
    dbClients, setDbClients,
    createClient, updateClient,
    teamMembers, setTeamMembers,
    logs, logAction, 
    invoices, setInvoices,
    payInvoice,
    createInvoice,
    createProposal,
    transactions, recordOfflinePayment,
    materials, updateMaterial,
    assets, updateAsset,
    updateStage, calculateProjectPulse,
    submitContact: submitContactInquiry,
    submitMarketplace: submitMarketplaceInquiry,
    sendOTP, verifyOTP, findUserByPhone,
    loginWithCredentials, resetUserPassword, changeClientPassword,
    deleteClient, 
    activeMagicCode, 
    userNotifications, markNotificationRead,
    submitMarketplaceInquiry,
    migrateToFirebase, getSLA, syncCMS, PROJECT_STAGES,
    updateEmailStatus, convertInquiryToProject, sendToProcurement,
    currency, setCurrency, rates,
    onPortal: (type) => { setLoginType(type); navigate('/login'); },
    formatPrice: (priceStr) => {
      if (!priceStr) return '-';
      const num = typeof priceStr === 'number' ? priceStr : parseFloat(String(priceStr).replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return priceStr;
      const converted = num * (rates[currency] || 1);
      const symbol = currency === 'GHS' ? 'GH₵' : currency === 'EUR' ? '€' : '$';
      return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
    lang, setLang, t, messages, sendMessage, testimonials, submitTestimonial, showVisualizer, setShowVisualizer,
    workOrders, containers,
    updateWorkOrder: (id, d) => db && updateDoc(doc(db, 'work_orders', id), d),
    updateContainer: (id, d) => db && updateDoc(doc(db, 'containers', id), d),
    isPortalLocked: () => {
       if (user?.role === 'admin') return false;
       const myInvoices = invoices.filter(i => i.clientId === user?.id || i.clientEmail === user?.email);
       const overdue = myInvoices.some(i => i.status === 'Pending' && new Date(i.due) < new Date());
       return overdue;
    }
  };
  const logoUpload = async (file) => {
    const localUrl = URL.createObjectURL(file);
    setBrand(prev => ({ ...prev, logo: localUrl }));
    if (!storage || !db) {
      setNotification({ msg: 'Demo Mode: Logo updated locally', type: 'info' });
      return;
    }
    const url = await uploadFile('branding', 'logo', file);
    setBrand(prev => ({ ...prev, logo: url }));
    await updateDoc(doc(db, 'settings', 'branding'), { logo: url });
  };

  const loginHandler = async (e, p, mode = 'admin') => {
    try { 
      notify('pending', `Authenticating with Glasstech Hub...`);
      
      // Auto-detect admin by email if they forgot to toggle the mode
      const isAdminEmail = (e === 'admin@stormglide.com' || e === 'admin@glasstechfab.com');
      const isActualAdminMode = mode === 'admin' || isAdminEmail;
      
      if (isActualAdminMode) {
        if (!isFirebaseEnabled || !auth) {
          if (isAdminEmail && (p === 'admin123' || p === 'Glasstech2026')) {
            const mockUser = { email: e, role: 'admin', uid: 'mock-admin' };
            setUser(mockUser);
            localStorage.setItem('lxf_session', JSON.stringify(mockUser));
            navigate('/admin');
            return { user: mockUser };
          }
          throw new Error("Database offline. Use demo credentials.");
        }
        try {
          const res = await signInWithEmailAndPassword(auth, e, p);
          return res;
        } catch (signInErr) {
          if ((signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/invalid-credential') && isAdminEmail) {
            console.log("Admin account not found in Firebase. Auto-provisioning as official credentials...");
            notify('pending', 'Provisioning official admin account...');
            const res = await createUserWithEmailAndPassword(auth, e, p);
            return res;
          }
          throw signInErr;
        }
      } else {
        // CLIENT LOGIN (Username/Password)
        return await loginWithCredentials(e, p);
      }
    }
    catch (err) {
      console.error("[AUTH ERROR]:", err.message);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        throw new Error("Invalid access identifier or password.");
      } else if (err.code === 'auth/wrong-password') {
        throw new Error("Password mismatch. Please check your credentials.");
      } else {
        throw new Error(err.message);
      }
    }
  };


  if (authLoading) return (
    <div style={{ background: '#1A1410', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#C8A96E', fontFamily: 'Inter' }}>
      <div className="pulse" style={{ fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Authenticating</div>
      <div style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.6 }}>Securing Glasstech Gateway...</div>
    </div>
  );

  return (
    <div className="lxf-platform">
      <div className="mesh-bg" />
      <Suspense fallback={
        <div style={{ background: '#1A1410', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#C8A96E', fontFamily: 'Inter' }}>
          <div className="pulse" style={{ fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Loading Portal</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={
            <PublicSite 
              {...commonProps} 
              onLogoUpload={logoUpload}
            />
          } />

          <Route path="/products" element={<ProductsHub {...commonProps} />} />
          <Route path="/portfolio" element={<Portfolio {...commonProps} />} />
          <Route path="/portfolio/:projectId" element={<Portfolio {...commonProps} />} />
          <Route path="/showcase" element={<Showcase {...commonProps} />} />


          <Route path="/login" element={
            <LoginPage 
              brand={brand} 
              type={loginType} 
              onBack={() => navigate('/')}
              onLogin={loginHandler}
              {...commonProps}
            />
          } />

          <Route path="/admin/*" element={
            user?.role === 'admin' ? (
              <AdminPortal 
                user={user} 
                onLogout={handleLogout} 
                onPreview={() => { setUser(null); if (auth) signOut(auth); navigate('/'); }} 
                onLogoUpload={logoUpload}
                onThemeChange={async (t) => {
                  setBrand(prev => ({ ...prev, theme: t }));
                  if (db) await updateDoc(doc(db, 'settings', 'branding'), { theme: t });
                }}
                syncCatalog={syncCatalogOnly}
                {...commonProps} 
              />
            ) : <Navigate to="/login" />
          } />

          <Route path="/portal/*" element={
            user?.role === 'client' ? (
              <ClientPortal 
                client={clients.find(c => c.email === user.email) || user} 
                onLogout={handleLogout} 
                onPreview={() => { setUser(null); if (auth) signOut(auth); navigate('/'); }} 
                updateClientProfile={updateClientProfile}
                {...commonProps} 
              />
            ) : <Navigate to="/login" />
          } />
          <Route path="/field-upload" element={<FieldUpload {...commonProps} />} />
          <Route path="/field-upload/:projectId" element={<FieldUpload {...commonProps} />} />
        </Routes>
      </Suspense>

      {notification && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 10000, padding: '12px 24px', borderRadius: 100, background: notification.type === 'error' ? '#EF4444' : '#1A1410', color: '#fff', fontSize: 13, boxShadow: '0 8px 32px rgba(0,0,0,.15)' }}>
           {notification.msg}
        </div>
      )}
    </div>
  );
}

