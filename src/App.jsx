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

const BRAND0 = {
  name: 'Glasstech Fabrications',
  logo: null,
  color: '#1A1410',
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
  const [approvals, setApprovals] = useState([]);
  const [changeRequests, setChangeRequests] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [notification, setNotification] = useState(null); 
  const [loading, setLoading] = useState(true);

  const notify = (type, msg) => {
    setNotification({ type, msg });
    if (type !== 'pending') setTimeout(() => setNotification(null), 4000);
  };

  const migrateToFirebase = async () => {
    try {
      notify('pending', 'Initializing Glasstech CMS...');
      setLoading(true);
      
      const DEMO_ACCOUNTS = [
        { email: 'admin@stormglide.com', role: 'admin', name: 'Super Admin', uid: 'qRcOaTkJ6rYmjha9jNAadrYW6pK2' },
        { email: 'admin@luxespace.com', role: 'admin', name: 'Studio Admin', uid: 'pBkrb38P9NaXXjIILQXlqxxC33p2' },
        { email: 'client@luxespace.com', role: 'client', name: 'Elite Client', uid: 'GQL4qVw3NIe9XVq8gZFkuU4Q9dD3' },
        { email: 'client@demo.com', role: 'client', name: 'Demo Client' }
      ];

      for (const acc of DEMO_ACCOUNTS) {
        const id = acc.uid || acc.email.replace(/[.@]/g, '_');
        await setDoc(doc(db, 'users', id), { 
          id, name: acc.name, email: acc.email, role: acc.role, status: 'Active', joined: new Date().toISOString() 
        });
      }

      for (const m of TEAM_MEMBERS) {
        const uid = m.email ? m.email.replace(/[.@]/g, '_') : `STF_${m.id}`;
        await setDoc(doc(db, 'users', uid), { ...m, id: uid });
      }
      for (const item of CLIENTS_DATA) {
        const pid = `PROJ_${item.id || Math.random().toString(36).substr(2, 5)}`;
        const cid = item.email ? item.email.replace(/[.@]/g, '_') : `CL_${pid}`;
        await setDoc(doc(db, 'users', cid), { 
          id: cid, name: item.name, email: item.email || `${item.name.toLowerCase().replace(' ', '.')}@example.com`, 
          phone: '+233 24 000 0000', company: item.project.split(' ')[0] + ' Ltd', role: 'client', status: 'Active', joined: new Date().toISOString() 
        });
        const milestones = [
          { id: 'm1', name: 'Deposit (40%)', amount: '$' + (parseFloat(item.budget.replace(/[$,]/g, '')) * 0.4).toLocaleString(), stageId: 1, paid: true },
          { id: 'm2', name: 'Fabrication Commencement (30%)', amount: '$' + (parseFloat(item.budget.replace(/[$,]/g, '')) * 0.3).toLocaleString(), stageId: 4, paid: false },
          { id: 'm3', name: 'Final Handover (30%)', amount: '$' + (parseFloat(item.budget.replace(/[$,]/g, '')) * 0.3).toLocaleString(), stageId: 7, paid: false }
        ];
        await setDoc(doc(db, 'projects', pid), { 
          ...item, id: pid, title: item.project, clientIds: [cid], milestones, managerId: 'EMP001', createdAt: new Date().toISOString() 
        });
      }
      notify('success', 'Full Interior CMS Initialized');
      fetchData();
    } catch (err) { console.error(err); notify('error', 'Initialization failed'); } finally { setLoading(false); }
  };

  const fetchData = async () => {
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
    return () => authSub();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
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
    const logSub = onSnapshot(query(collectionGroup(db, 'activity_logs'), orderBy('created_at', 'desc'), limit(30)), (snap) => {
      setLogs(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const taskSub = onSnapshot(query(collectionGroup(db, 'tasks')), (snap) => {
      setTasks(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });
    const notifSub = onSnapshot(query(collection(db, 'notifications'), orderBy('createdAt', 'desc'), limit(20)), (snap) => {
      setUserNotifications(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(n => n.userId === user.id));
    });
    return () => { projectSub(); userSub(); paymentSub(); logSub(); taskSub(); notifSub(); };
  }, [user?.id]);

  const syncProjects = async (id, fields) => {
    try {
      notify('pending', 'Updating...');
      await updateDoc(doc(db, 'projects', id), fields);
      notify('success', 'Updated');
    } catch (err) { notify('error', 'Failed'); }
  };

  const getSLA = (client) => {
    if (!client.startDate) return { date: 'TBD', delayed: false };
    const start = new Date(client.startDate);
    const totalDays = PROJECT_STAGES.slice(0, client.stage || 1).reduce((sum, s) => sum + s.days, 0);
    const deadline = new Date(start.getTime() + totalDays * 24 * 60 * 60 * 1000);
    return { date: deadline.toLocaleDateString(), delayed: new Date() > deadline };
  };

  const commonProps = {
    page, setPage,
    brand, setBrand, content, setContent,
    clients, updateProject: syncProjects,
    dbClients, teamMembers,
    logs, logAction, invoices, shipments,
    tasks, updateTask: (id, f, pid) => updateDoc(doc(db, 'projects', pid, 'tasks', id), f),
    approvals: [], changeRequests: [],
    userNotifications, markNotificationRead,
    migrateToFirebase, getSLA
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
      return <PublicSite {...commonProps} onPortal={(type) => { setLoginType(type); setView('login'); }} />;
    }

    // Role-based rendering
    if (user.role === 'admin') return <AdminPortal user={user} onLogout={() => signOut(auth)} onPreview={() => { setUser(null); signOut(auth); setView('public'); }} {...commonProps} />;
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
