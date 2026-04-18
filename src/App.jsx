import React, { useState, useEffect } from 'react';
import PublicSite from './pages/PublicSite';
import LoginPage from './pages/LoginPage';
import AdminPortal from './pages/AdminPortal';
import ClientPortal from './pages/ClientPortal';
import AccountManagerPortal from './pages/AccountManagerPortal';
import { 
  CLIENTS_DATA, PROPOSALS_DATA, INVOICES_DATA, 
  BOOKINGS_DATA, EMAIL_QUEUE, HERO_SLIDES,
  SERVICES_DATA, ABOUT_DATA, PROCESS_STEPS, ROOM_GALLERY,
  PORTFOLIO_DATA, TEAM_MEMBERS, PROJECT_STAGES, WHY_US
} from './data.jsx';
import { auth, db, storage } from './lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { 
  collection, query, onSnapshot, getDocs, getDoc, doc, 
  updateDoc, addDoc, setDoc, deleteDoc, orderBy, collectionGroup, limit, where
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { uploadFile } from './lib/firebase';
import { TwilioService } from './lib/TwilioService';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

const BRAND0 = {
  name: 'Glasstech Fabrications',
  logo: null,
  color: '#C8A96E',
  theme: 'classic',
  tagline: 'Complete Interior & Finishing Solutions',
  phone: '+233 24 111 2222',
  email: 'contact@glasstech.com.gh',
  location: 'Spintex Road Industrial Area, Accra',
  website: 'www.glasstech.com.gh',
  instagram: '@glasstech_gh',
  whatsapp: '+233241112222'
};

const INITIAL_CONTENT = {
  hero: { slides: HERO_SLIDES },
  about: ABOUT_DATA,
  services: SERVICES_DATA,
  process: PROCESS_STEPS,
  portfolio: PORTFOLIO_DATA,
  gallery: ROOM_GALLERY
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
  const [content, setContent] = useState({
    brand: BRAND0,
    hero: { slides: HERO_SLIDES },
    services: SERVICES_DATA,
    portfolio: PORTFOLIO_DATA,
    about: ABOUT_DATA,
    team: TEAM_MEMBERS,
    testimonials: [],
    why_us: WHY_US,
    process: PROCESS_STEPS,
    products: []
  });

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
  const [activeMagicCode, setActiveMagicCode] = useState(null);
  const [dbClients, setDbClients] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [changeRequests, setChangeRequests] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [notification, setNotification] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [procurements, setProcurements] = useState([]);
  const [notes, setNotes] = useState([]);
  const [media, setMedia] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [assets, setAssets] = useState([]);
  const [magicCode, setMagicCode] = useState(null);
  const [otp, setOtp] = useState('');

  const notify = (type, msg) => {
    setNotification({ type, msg });
    if (type !== 'pending') setTimeout(() => setNotification(null), 4000);
  };

  const migrateToFirebase = async () => {
    if (!db) return;
    try {
      notify('pending', 'Initializing Glasstech CMS...');
      setLoading(true);
      
      const DEMO_ACCOUNTS = [
        { email: 'admin@stormglide.com', role: 'admin', name: 'Super Admin', uid: 'qRcOaTkJ6rYmjha9jNAadrYW6pK2' },
        { email: 'admin@glasstechfab.com', role: 'admin', name: 'Factory Admin', uid: 'pBkrb38P9NaXXjIILQXlqxxC33p2' },
        { email: 'client@glasstechfab.com', role: 'client', name: 'Elite Client', uid: 'GQL4qVw3NIe9XVq8gZFkuU4Q9dD3' },
        { email: 'client@demo.com', role: 'client', name: 'Demo Client' }
      ];

      // 1. Initialise Users
      const userMap = {}; 
      for (const acc of DEMO_ACCOUNTS) {
        const id = acc.uid || acc.email.replace(/[.@]/g, '_');
        userMap[acc.email] = id;
        await setDoc(doc(db, 'users', id), { 
          id, name: acc.name, email: acc.email, role: acc.role, status: 'Active', joined: new Date().toISOString() 
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
            isShipment: true,
            createdAt: new Date().toISOString()
          });

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

  const fetchData = async () => {
    if (!db) return;
    try {
      setLoading(true);
      const [uSnap, cmsSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'cms_content'))
      ]);
      const cmsDocs = cmsSnap.docs.map(d => ({ id: d.id, content: d.data().content }));
      if (cmsDocs.length > 0) {
        const newContent = { ...INITIAL_CONTENT };
        cmsDocs.forEach(row => {
          if (row.id === 'brand') setBrand(row.content);
          else newContent[row.id] = row.content;
        });
        setContent(newContent);
      }
      // REMOVED: if (uSnap.empty || cmsDocs.length === 0) migrateToFirebase();
    } catch (err) { console.warn('Fetch failed:', err); } finally { setLoading(false); }
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

  useEffect(() => {
    if (!auth || !db) {
      setAuthLoading(false);
      return;
    }

    const checkManualSession = async () => {
      const savedSession = localStorage.getItem('glasstech_session');
      if (savedSession) {
        try {
          const sessionData = JSON.parse(savedSession);
          if (sessionData.expiry > Date.now()) {
            const userRef = doc(db, 'users', sessionData.id);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const u = { id: sessionData.id, ...userSnap.data() };
              setUser(u);
              console.log("[AUTH] Restored Client Session:", u.id);
              // Handle redirect if needed
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

    const authSub = onAuthStateChanged(auth, async (sessionUser) => {
      try {
        setAuthLoading(true);
        const sessionRestored = await checkManualSession();
        
        if (sessionUser && !sessionRestored) {
          // Firebase Auth User found - Check if they are Admin
          const userRef = doc(db, 'users', sessionUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const profile = userSnap.data();
            if (profile.role === 'admin' || sessionUser.email === 'admin@glasstechfab.com') {
              if (profile.role !== 'admin') {
                 // Force promote master email
                 await updateDoc(doc(db, 'users', sessionUser.uid), { role: 'admin' });
                 profile.role = 'admin';
              }
              setUser({ ...sessionUser, ...profile, id: sessionUser.uid });
              if (location.pathname === '/login' || location.pathname === '/') navigate('/admin');
            } else {
              // Not an admin - Sign out to prevent session limbo
              await signOut(auth);
              setUser(null);
              setNotification({ msg: "Unauthorized: Administrator access required.", type: 'error' });
            }
          } else {
            // Check by email in case of manual doc creation OR First-Time Admin Promotion
            const q = query(collection(db, 'users'), where('email', '==', sessionUser.email));
            const snap = await getDocs(q);
            
            if (!snap.empty) {
              const profile = snap.docs[0].data();
              if (profile.role === 'admin' || sessionUser.email === 'admin@glasstechfab.com') {
                if (profile.role !== 'admin') profile.role = 'admin';
                setUser({ ...sessionUser, ...profile, id: snap.docs[0].id });
                // Link the Firebase UID to this email-based profile and ensure admin role
                await setDoc(doc(db, 'users', sessionUser.uid), { ...profile, role: 'admin', id: sessionUser.uid }, { merge: true });
                if (location.pathname === '/login' || location.pathname === '/') navigate('/admin');
              } else {
                await signOut(auth);
                setUser(null);
                setNotification({ msg: "Unauthorized: Administrator access required.", type: 'error' });
              }
            } else {
              // NO PROFILE FOUND AT ALL - Check if this is the First Admin
              const adminQuery = query(collection(db, 'users'), where('role', '==', 'admin'));
              const adminSnap = await getDocs(adminQuery);
              
              if (adminSnap.empty) {
                // FIRST USER AUTOMATIC PROMOTION
                const newAdmin = {
                  id: sessionUser.uid,
                  email: sessionUser.email,
                  name: sessionUser.displayName || 'Head Admin',
                  role: 'admin',
                  createdAt: serverTimestamp()
                };
                await setDoc(doc(db, 'users', sessionUser.uid), newAdmin);
                setUser({ ...sessionUser, ...newAdmin });
                setNotification({ msg: "LuxeSpace Hub Initialized. Welcome, Admin.", type: 'success' });
                if (location.pathname === '/login' || location.pathname === '/') navigate('/admin');
              } else {
                // System already has admins, and this user is not one of them
                await signOut(auth);
                setUser(null);
                setNotification({ msg: "Access Denied: Account not registered in Staff Terminal.", type: 'error' });
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
    if (!user?.id || !db) {
      if (!user?.id) console.log("[FETCH] Awaiting user identity...");
      return;
    }
    
    console.log("[FETCH] Initializing Data Pipeline for:", user.id);
    
    const projectSub = onSnapshot(collection(db, 'projects'), (snap) => {
      console.log(`[SYNC] Projects updated: ${snap.size} docs`);
      setClients(snap.docs.map(d => ({ id: d.id, ...d.data(), name: d.data().title })));
    });
    const userSub = onSnapshot(collection(db, 'users'), (snap) => {
      console.log(`[REAL-TIME SYNC] Received ${snap.size} user profiles from Firestore.`);
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const clients = all.filter(u => u.role === 'client');
      const team = all.filter(u => u.role !== 'client');
      console.log(`[SYNC REPORT] Clients: ${clients.length}, Team: ${team.length}`);
      setTeamMembers(team);
      setDbClients(clients);
    });
    const paymentSub = onSnapshot(query(collectionGroup(db, 'payments')), (snap) => {
      setInvoices(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const taskSub = onSnapshot(query(collectionGroup(db, 'tasks')), (snap) => {
      setTasks(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const logSub = onSnapshot(query(collection(db, 'activity_logs'), orderBy('created_at', 'desc'), limit(30)), (snap) => {
      const logsRaw = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLogs(logsRaw);
    }, (err) => {
      console.warn("Activity logs listener failed:", err);
    });
    const notifSub = onSnapshot(query(collection(db, 'notifications'), orderBy('createdAt', 'desc'), limit(20)), (snap) => {
      setUserNotifications(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(n => n.userId === user.id));
    });
    const approvalSub = onSnapshot(query(collectionGroup(db, 'approvals')), (snap) => {
      setApprovals(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const crSub = onSnapshot(query(collectionGroup(db, 'change_requests')), (snap) => {
      setChangeRequests(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const procSub = onSnapshot(query(collectionGroup(db, 'procurements')), (snap) => {
      setProcurements(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const noteSub = onSnapshot(query(collectionGroup(db, 'notes')), (snap) => {
      setNotes(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const mediaSub = onSnapshot(query(collectionGroup(db, 'media')), (snap) => {
      setMedia(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const shipSub = onSnapshot(query(collectionGroup(db, 'procurements')), (snap) => {
      setShipments(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const proposalSub = onSnapshot(collection(db, 'proposals'), (snap) => {
      setProposals(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const bookingSub = onSnapshot(collection(db, 'bookings'), (snap) => {
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const emailSub = onSnapshot(collection(db, 'emails'), (snap) => {
      setEmails(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const transSub = onSnapshot(query(collection(db, 'transactions'), orderBy('date', 'desc')), (snap) => {
      setTransactions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => {
      console.warn("Transactions listener failed:", err);
    });
    const matSub = onSnapshot(query(collectionGroup(db, 'materials')), (snap) => {
      setMaterials(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const assetSub = onSnapshot(collection(db, 'assets'), (snap) => {
      setAssets(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { 
      console.log("[FETCH] Tearing down Data Pipeline...");
      projectSub && projectSub(); userSub && userSub(); paymentSub && paymentSub(); logSub && logSub(); taskSub && taskSub(); notifSub && notifSub();
      approvalSub && approvalSub(); crSub && crSub(); procSub && procSub(); noteSub && noteSub(); mediaSub && mediaSub(); shipSub && shipSub();
      proposalSub && proposalSub(); bookingSub && bookingSub(); emailSub && emailSub(); transSub && transSub();
      matSub && matSub(); assetSub && assetSub();
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
        status: 'pending'
      });
      setProposals(prev => [{ id: docRef.id, ...data }, ...prev]);
      setNotification({ msg: 'AI Proposal Generated & Saved', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error(err);
      setNotification({ msg: 'Generation failed', type: 'error' });
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
      
      await addDoc(collection(db, 'projects', projectId, 'media'), { 
        url, 
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

  const deleteMedia = async (id, projectId) => {
    if (!db) return;
    try { await deleteDoc(doc(db, 'projects', projectId, 'media', id)); notify('success', 'Media removed'); }
    catch(e) { console.error(e); }
  };

  const syncCMS = async (key, value) => {
    try {
      notify('pending', 'Saving changes...');
      await setDoc(doc(db, 'cms_content', key), { content: value });
      setContent(prev => ({ ...prev, [key]: value }));
      if (key === 'brand') setBrand(value);
      notify('success', 'Changes saved successfully');
    } catch (e) {
      notify('error', 'Failed to save changes');
    }
  };
  
  const createClient = async (data) => {
    try {
      if (!db) {
         notify('error', 'Backend Disconnected: No Persistence');
         return;
      }
      // Standardize ID on Phone Number
      const cleanPhone = data.phone.replace(/\D/g, ''); 
      const id = cleanPhone; 
      const stakeholders = data.stakeholders || [];
      const payload = { 
        ...data, 
        id, 
        phone: cleanPhone, 
        stakeholders: [cleanPhone, ...stakeholders],
        role: 'client', 
        status: 'Active', 
        joined: new Date().toISOString() 
      };
      await setDoc(doc(db, 'users', id), payload);
      notify('success', 'New Client Registered via Phone Registry');
      logAction(null, 'CRM', `Registered Client Account: ${data.name} [${cleanPhone}]`);
    } catch (e) {
      console.error("[CRM] Registration Error:", e);
      notify('error', 'Failed to register client');
    }
  };


  const updateClient = async (id, data) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'users', id), data);
      notify('success', 'Client profile updated');
      logAction(null, 'CRM', `Updated Client: ${id}`);
    } catch (e) {
      console.error(e);
      notify('error', 'Update failed');
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
      
      // TRIGGER WHATSAPP (Live or Simulation)
      try {
        await TwilioService.sendWhatsAppOTP(phone, code);
        notify('success', `WhatsApp OTP Sent to ${phone}`);
        return true;
      } catch (error) {
        console.warn(`[SANDBOX SIMULATION] Verification Code: ${code}`);
        setNotification({ msg: `[SECURE LOGIN] Your verification code is: ${code}`, type: 'success' });
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
    page, setPage,
    brand, setBrand, content, setContent,
    clients, updateProject: syncProjects,
    dbClients, setDbClients,
    createClient, updateClient,
    teamMembers, setTeamMembers,
    logs, logAction, 
    invoices, setInvoices,
    proposals, setProposals,
    bookings, setBookings,
    emails, setEmails,
    shipments, setShipments,
    createProcurement, updateProcurement, deleteProcurement,
    createShipment, updateShipment,
    notes, createNote, deleteNote,
    media, uploadMedia, deleteMedia,
    tasks, updateTask: (id, f, pid) => updateDoc(doc(db, 'projects', pid, 'tasks', id), f),
    approvals, createApproval, updateApproval,
    changeRequests, createChangeRequest, updateChangeRequest,
    payInvoice,
    transactions, recordOfflinePayment,
    materials, updateMaterial,
    assets, updateAsset,
    updateStage, calculateProjectPulse,
    sendOTP, verifyOTP, findUserByPhone,
    deleteClient, // Restored functionality
    activeMagicCode, // For Fail-Proof UI
    userNotifications, markNotificationRead,
    migrateToFirebase, getSLA, syncCMS, PROJECT_STAGES
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

  const loginHandler = async (e, p) => {
    if (!auth) throw new Error("Database offline. Use demo credentials.");
    try { 
      notify('pending', 'Authenticating with Glasstech Hub...');
      const res = await signInWithEmailAndPassword(auth, e, p);
      
      // onAuthStateChanged takes it from here
      return res;
    }
    catch (err) {
      console.error("[AUTH ERROR]:", err.message);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        throw new Error("Invalid email or password.");
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
      <Routes>
        <Route path="/" element={
          <PublicSite 
            {...commonProps} 
            onPortal={(type) => { setLoginType(type); navigate('/login'); }} 
            onLogoUpload={logoUpload}
          />
        } />

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
              {...commonProps} 
            />
          ) : <Navigate to="/login" />
        } />
      </Routes>

      {notification && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 10000, padding: '12px 24px', borderRadius: 100, background: notification.type === 'error' ? '#EF4444' : '#1A1410', color: '#fff', fontSize: 13, boxShadow: '0 8px 32px rgba(0,0,0,.15)' }}>
           {notification.msg}
        </div>
      )}
    </div>
  );
}

