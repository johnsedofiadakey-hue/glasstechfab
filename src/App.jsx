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
  const [view, setView] = useState('public'); 
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [loginType, setLoginType] = useState('client'); 
  const [authLoading, setAuthLoading] = useState(true); 
  const [brand, setBrand] = useState(BRAND0);
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
  const [proposals, setProposals] = useState(PROPOSALS_DATA);
  const [invoices, setInvoices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [emails, setEmails] = useState(EMAIL_QUEUE);
  const [dbClients, setDbClients] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [transactions, setTransactions] = useState([
    { id: 'tx1', parentId: 'p1', invoiceId: 'inv-101', amount: 5000, date: '2026-03-25', method: 'Paystack', status: 'verified' },
    { id: 'tx2', parentId: 'p2', invoiceId: 'inv-102', amount: 2000, date: '2026-03-28', method: 'Bank Transfer', status: 'verified' }
  ]);
  const [changeRequests, setChangeRequests] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [notification, setNotification] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [procurements, setProcurements] = useState([]);
  const [notes, setNotes] = useState([]);
  const [media, setMedia] = useState([]);
  const [approvals, setApprovals] = useState([]);

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
        { email: 'admin@luxespace.com', role: 'admin', name: 'Studio Admin', uid: 'pBkrb38P9NaXXjIILQXlqxxC33p2' },
        { email: 'client@luxespace.com', role: 'client', name: 'Elite Client', uid: 'GQL4qVw3NIe9XVq8gZFkuU4Q9dD3' },
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
      const ELITE_CLIENT_ID = userMap['client@luxespace.com'];
      
      const ALL_PROJECT_DATA = [
        { 
          id: 'PROJ_001', 
          title: 'Glasshouse Penthouse', 
          name: 'Elite Client', 
          email: 'client@luxespace.com', 
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
          email: 'client@luxespace.com', 
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
        ...CLIENTS_DATA.filter(c => c.email !== 'client@luxespace.com')
      ];

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

        // Seed some media for the new gallery
        const demoMedia = [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6199f7a096?auto=format&fit=crop&q=80', stageId: 1, type: 'image' },
          { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80', stageId: item.stage || 1, type: 'image' },
          { url: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80', stageId: item.stage || 1, type: 'image' }
        ];
        
        for (const m of demoMedia) {
          await addDoc(collection(db, 'projects', pid, 'media'), { ...m, createdAt: new Date().toISOString() });
        }

        // Add a sample procurement tracking (The "China Simulation")
        if (item.email === 'client@luxespace.com') {
          // 1. Shipment from China
          await setDoc(doc(collection(db, 'projects', pid, 'procurements'), 'SHIP_'+pid+'_GLS'), {
            itemName: 'Luxe Reflective Glass Panels', 
            source: 'Foshan, China', 
            status: item.stage > 5 ? 'Received' : 'Shipped', 
            estimatedCost: '18000',
            actualCost: '19500',
            eta: 'May 12, 2026', 
            container: 'MSC-LX-992'+pid, 
            isShipment: true,
            createdAt: new Date().toISOString()
          });
          
          // 2. Hardware procurement
          await setDoc(doc(collection(db, 'projects', pid, 'procurements'), 'PROC_'+pid+'_HW'), {
            itemName: 'Stainless Steel Fasteners', 
            source: 'Local Supplier', 
            status: 'Ordered', 
            estimatedCost: '4500',
            actualCost: '',
            createdAt: new Date().toISOString()
          });
        }
      }
      notify('success', 'Glasstech Multi-Project Architecture Deployed');
      fetchData();
    } catch (err) { console.error(err); notify('error', 'Seeding failed'); } finally { setLoading(false); }
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
      if (uSnap.empty || cmsDocs.length === 0) migrateToFirebase();
    } catch (err) { console.warn('Fetch failed:', err); } finally { setLoading(false); }
  };

  const logAction = async (pid, type, action, projectTitle) => {
    const log = { user_id: user?.id, user_name: user?.name || user?.email || 'System', type, action, project_title: projectTitle, created_at: new Date().toISOString() };
    try {
      if (pid) await addDoc(collection(db, 'projects', pid, 'activity_logs'), log);
      else await addDoc(collection(db, 'activity_logs'), log);
    } catch (error) { console.error("Logging failed:", error.message); }
  };

  const notifyUser = async (userId, message, type, link = '') => {
    if (!userId) return;
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
    const authSub = onAuthStateChanged(auth, async (sessionUser) => {
      try {
        setAuthLoading(true);
        if (sessionUser) {
          console.log("Auth session detected:", sessionUser.email);
          let profile = null;
          let profileId = null;

          const userRef = doc(db, 'users', sessionUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            profile = userSnap.data();
            profileId = userSnap.id;
          } else {
            // FALLBACK: Search by email (Case-insensitive-ish)
            const q = query(collection(db, 'users'), where('email', '==', sessionUser.email.trim()));
            const snap = await getDocs(q);
            if (!snap.empty) {
              profile = snap.docs[0].data();
              profileId = snap.docs[0].id;
              // Map the Auth UID to this profile for faster future lookups
              await setDoc(doc(db, 'users', sessionUser.uid), { ...profile, id: sessionUser.uid }, { merge: true });
            }
          }
          
          if (profile) {
            setUser({ ...sessionUser, ...profile, id: profileId });
            const targetedRole = profile.role || 'client';
            
            // Explicit view switching based on role
            if (targetedRole === 'admin') setView('admin');
            else if (targetedRole === 'manager') setView('manager');
            else if (targetedRole === 'client') {
              setLoginType('client');
              setView('portal');
            }
          } else {
            console.error("No profile found for email:", sessionUser.email);
            // AUTO-INIT FOR KNOWN DEMO ACCOUNTS
            if (['admin@stormglide.com', 'admin@luxespace.com', 'client@luxespace.com'].includes(sessionUser.email)) {
              notify('pending', 'Auto-initializing demo profile...');
              await migrateToFirebase();
              return; // The auth listener will re-fire or migrateToFirebase will handle it
            }
            // If we are on the login page, show an error instead of a direct redirect
            if (view === 'login') {
              notify('error', 'Authentication successful, but no account record found.');
            }
            setUser(null); 
            setView('public');
          }
        } else {
          setUser(null);
          setView('public');
        }
      } catch (e) {
        console.error("Auth listener error:", e);
        notify('error', 'Login verification failed.');
      } finally {
        setAuthLoading(false);
      }
    });
    return () => authSub && authSub();
  }, []);

  useEffect(() => {
    if (!user?.id || !db) return;
    const projectSub = onSnapshot(collection(db, 'projects'), (snap) => {
      setClients(snap.docs.map(d => ({ id: d.id, ...d.data(), name: d.data().title })));
    });
    const userSub = onSnapshot(collection(db, 'users'), (snap) => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setTeamMembers(all.filter(u => u.role !== 'client'));
      setDbClients(all.filter(u => u.role === 'client'));
    });
    const paymentSub = onSnapshot(query(collectionGroup(db, 'payments')), (snap) => {
      setInvoices(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const taskSub = onSnapshot(query(collectionGroup(db, 'tasks')), (snap) => {
      setTasks(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const logSub = onSnapshot(query(collectionGroup(db, 'activity_logs'), orderBy('created_at', 'desc'), limit(30)), (snap) => {
      const logsRaw = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLogs(logsRaw);
    }, (err) => {
      console.warn("Activity logs listener failed (likely missing index):", err);
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
    return () => { 
      projectSub && projectSub(); userSub && userSub(); paymentSub && paymentSub(); logSub && logSub(); taskSub && taskSub(); notifSub && notifSub();
      approvalSub && approvalSub(); crSub && crSub(); procSub && procSub(); noteSub && noteSub(); mediaSub && mediaSub(); shipSub && shipSub();
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
    try {
      await addDoc(collection(db, 'projects', projectId, 'approvals'), { ...data, status: 'pending', createdAt: new Date().toISOString() });
      notifyUser(dbClients.find(c => c.id === clients.find(p => p.id === projectId)?.clientId)?.id, "New technical item requires your approval", "approval");
    } catch (e) { console.error(e); }
  };

  const updateApproval = async (id, data, projectId) => {
    try {
      await updateDoc(doc(db, 'projects', projectId, 'approvals', id), data);
      logAction(projectId, 'Approval', `Item ${id} marked as ${data.status}`);
    } catch (e) { console.error(e); }
  };

  const createChangeRequest = async (projectId, data) => {
    try {
      await addDoc(collection(db, 'projects', projectId, 'change_requests'), { ...data, status: 'pending', createdAt: new Date().toISOString() });
      // Notify Admin
      teamMembers.filter(m => m.role === 'admin').forEach(admin => {
        notifyUser(admin.id, "New change request submitted by client", "change_request");
      });
    } catch (e) { console.error(e); }
  };

  const updateChangeRequest = async (id, data, projectId) => {
    try {
      await updateDoc(doc(db, 'projects', projectId, 'change_requests', id), data);
      logAction(projectId, 'ChangeRequest', `Request ${id} updated to ${data.status}`);
    } catch (e) { console.error(e); }
  };

  const payInvoice = async (id, projectId, method = 'Paystack') => {
    try {
      await updateDoc(doc(db, 'projects', projectId, 'payments', id), { status: 'Paid', paidAt: new Date().toISOString(), method });
      
      const inv = invoices.find(i => i.id === id);
      const newTx = {
        id: `tx-${Math.random().toString(36).substr(2, 9)}`,
        parentId: projectId,
        invoiceId: id,
        amount: inv?.amount?.toString().replace(/[$,]/g, '') || 0,
        date: new Date().toISOString().split('T')[0],
        method,
        status: 'verified'
      };
      // We don't have a transactions collection yet, so we'll just update state for now
      // console.log("Transaction Logged:", newTx);
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
    try { await addDoc(collection(db, 'projects', projectId, 'procurements'), { ...data, createdAt: new Date().toISOString() }); notify('success', 'Tracker Updated'); } 
    catch(e) { notify('error', 'Failed to update procurement'); }
  };
  const updateProcurement = async (projectId, id, data) => {
    try { await updateDoc(doc(db, 'projects', projectId, 'procurements', id), data); notify('success', 'Tracker Updated'); } 
    catch(e) { notify('error', 'Failed to update procurement'); }
  };
  const deleteProcurement = async (projectId, id) => {
    try { await deleteDoc(doc(db, 'projects', projectId, 'procurements', id)); notify('success', 'Tracker Item Deleted'); } 
    catch(e) { notify('error', 'Failed to delete tracking item'); }
  };

  const createShipment = async (data) => {
    try { 
      // Shipments are linked to a project, default to first active if not specified
      const pid = data.projectId || (clients.length > 0 ? clients[0].id : null);
      if (!pid) return notify('error', 'No project selected for shipment');
      await addDoc(collection(db, 'projects', pid, 'procurements'), { ...data, isShipment: true, createdAt: new Date().toISOString() }); 
      notify('success', 'Shipment Tracked'); 
    } catch(e) { notify('error', 'Failed to create shipment'); }
  };
  const updateShipment = async (id, fields) => {
    try {
      const s = shipments.find(x => x.id === id);
      if (!s || !s.parentId) return notify('error', 'Shipment context not found');
      await updateDoc(doc(db, 'projects', s.parentId, 'procurements', id), fields);
      notify('success', 'Shipment Updated');
    } catch(e) { notify('error', 'Failed to update shipment'); }
  };

  const createNote = async (projectId, data) => {
    try { await addDoc(collection(db, 'projects', projectId, 'notes'), { ...data, createdAt: new Date().toISOString() }); }
    catch(e) { console.error(e); }
  };
  const deleteNote = async (projectId, id) => {
    try { await deleteDoc(doc(db, 'projects', projectId, 'notes', id)); }
    catch(e) { console.error(e); }
  };
  const uploadMedia = async (projectId, file, stageId) => {
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

  const commonProps = {
    page, setPage,
    brand, setBrand, content, setContent,
    clients, updateProject: syncProjects,
    dbClients, setDbClients,
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
    updateStage, calculateProjectPulse,
    userNotifications, markNotificationRead,
    migrateToFirebase, getSLA, syncCMS
  };

  if (authLoading) return (
    <div style={{ background: '#1A1410', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#C8A96E', fontFamily: 'Inter' }}>
      <div className="pulse" style={{ fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Authenticating</div>
      <div style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.6 }}>Securing Glasstech Gateway...</div>
    </div>
  );

  const renderCurrentView = () => {
    // If no user is logged in, show Public Site or Login Page
    if (!user) {
      if (view === 'login') return (
        <LoginPage 
          brand={brand} 
          type={loginType} 
          onBootstrap={migrateToFirebase} 
          onBack={() => setView('public')}
          onLogin={async (e, p) => {
            if (!auth) {
              // Mock Login for Demo Mode
              const DEMO_ACCOUNTS = [
                { email: 'admin@stormglide.com', role: 'admin', name: 'Super Admin', pw: 'admin123' },
                { email: 'admin@luxespace.com', role: 'admin', name: 'Studio Admin', pw: 'admin123' },
                { email: 'client@luxespace.com', role: 'client', name: 'Elite Client', pw: 'client123' }
              ];
              const match = DEMO_ACCOUNTS.find(acc => acc.email === e && acc.pw === p);
              if (match) {
                const profile = { ...match, id: match.email.replace(/[.@]/g, '_'), status: 'Active', joined: new Date().toISOString() };
                setUser(profile);
                if (match.role === 'admin') setView('admin');
                else if (match.role === 'client') { setLoginType('client'); setView('portal'); }
                return;
              } else {
                throw new Error("Invalid credentials for Demo Mode.");
              }
            }
            try { await signInWithEmailAndPassword(auth, e, p); }
            catch (err) {
              if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                const { createUserWithEmailAndPassword } = await import('firebase/auth');
                await createUserWithEmailAndPassword(auth, e, p);
              } else throw err;
            }
          }} 
        />
      );
      return <PublicSite 
        {...commonProps} 
        onPortal={(type) => { setLoginType(type); setView('login'); }} 
        onLogoUpload={async (file) => {
          const localUrl = URL.createObjectURL(file);
          setBrand(prev => ({ ...prev, logo: localUrl }));
          if (!storage || !db) {
            setNotification({ msg: 'Demo Mode: Logo updated locally', type: 'info' });
            setTimeout(() => setNotification(null), 3000);
            return;
          }
          const url = await uploadFile('branding', 'logo', file);
          setBrand(prev => ({ ...prev, logo: url }));
          await updateDoc(doc(db, 'settings', 'branding'), { logo: url });
        }}
      />;
    }

    // Role-based rendering
    if (user.role === 'admin') return (
      <AdminPortal 
        user={user} 
        onLogout={() => signOut(auth)} 
        onPreview={() => { setUser(null); if (auth) signOut(auth); setView('public'); }} 
        onLogoUpload={async (file) => {
          const localUrl = URL.createObjectURL(file);
          setBrand(prev => ({ ...prev, logo: localUrl }));
          if (!storage || !db) {
            setNotification({ msg: 'Demo Mode: Logo updated locally', type: 'info' });
            setTimeout(() => setNotification(null), 3000);
            return;
          }
          const url = await uploadFile('branding', 'logo', file);
          setBrand(prev => ({ ...prev, logo: url }));
          await updateDoc(doc(db, 'settings', 'branding'), { logo: url });
        }}
        onThemeChange={async (t) => {
          setBrand(prev => ({ ...prev, theme: t }));
          if (!db) {
             setNotification({ msg: `Theme: ${t} applied (Demo Mode)`, type: 'info' });
             setTimeout(() => setNotification(null), 3000);
             return;
          }
          await updateDoc(doc(db, 'settings', 'branding'), { theme: t });
        }}
        {...commonProps} 
      />
    );
    if (user.role === 'manager') return <AccountManagerPortal user={user} onLogout={() => signOut(auth)} onPreview={() => { setUser(null); signOut(auth); setView('public'); }} {...commonProps} />;
    if (user.role === 'client') return <ClientPortal client={clients.find(c => c.email === user.email) || user} onLogout={() => signOut(auth)} onPreview={() => { setUser(null); signOut(auth); setView('public'); }} {...commonProps} />;

    // Fallback
    return <PublicSite {...commonProps} onPortal={(type) => { setLoginType(type); setView('login'); }} />;
  };

  return (
    <div className="lxf-platform">
      {renderCurrentView()}
      {notification && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, padding: '12px 24px', borderRadius: 100, background: notification.type === 'error' ? '#EF4444' : '#1A1410', color: '#fff', fontSize: 13, boxShadow: '0 8px 32px rgba(0,0,0,.15)' }}>
           {notification.msg}
        </div>
      )}
    </div>
  );
}
