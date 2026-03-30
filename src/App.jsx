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
  updateDoc, addDoc, setDoc, deleteDoc, orderBy, collectionGroup, limit
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

export default function App() {
  const [view, setView] = useState('public'); 
  const [user, setUser] = useState(null);
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pSnap, sSnap, lSnap, uSnap, paySnap, bookSnap, cmsSnap, tSnap, aSnap, crSnap] = await Promise.all([
        getDocs(collection(db, 'projects')),
        getDocs(query(collectionGroup(db, 'shipments'))),
        getDocs(query(collectionGroup(db, 'activity_logs'), orderBy('created_at', 'desc'), limit(50))),
        getDocs(collection(db, 'users')),
        getDocs(query(collectionGroup(db, 'payments'))),
        getDocs(collection(db, 'bookings')),
        getDocs(collection(db, 'cms_content')),
        getDocs(query(collectionGroup(db, 'tasks')))
      ]);
      
      // Wait, I missed two getDocs in Promise.all earlier? Correcting now.
      const a_Snap = await getDocs(query(collectionGroup(db, 'approvals')));
      const cr_Snap = await getDocs(query(collectionGroup(db, 'change_requests')));
      const n_Snap = user ? await getDocs(query(collection(db, 'notifications'), orderBy('createdAt', 'desc'), limit(20))) : { docs: [] };

      const mapSnap = (snap) => snap.docs.map(d => ({ id: d.id, ...d.data() }));

      setClients(mapSnap(pSnap).map(p => ({ ...p, name: p.title })));
      setShipments(mapSnap(sSnap));
      setLogs(mapSnap(lSnap));
      setTeamMembers(mapSnap(uSnap).filter(p => p.role !== 'client'));
      setInvoices(mapSnap(paySnap));
      setBookings(mapSnap(bookSnap));
      setTasks(mapSnap(tSnap));
      setApprovals(mapSnap(a_Snap));
      setChangeRequests(mapSnap(cr_Snap));
      
      const allUsers = mapSnap(uSnap);
      setTeamMembers(allUsers.filter(u => u.role !== 'client'));
      setDbClients(allUsers.filter(u => u.role === 'client'));

      if (user) {
        const myNotifs = mapSnap(n_Snap).filter(n => n.userId === user.id);
        setUserNotifications(myNotifs);
      }
      
      const cmsDocs = mapSnap(cmsSnap);
      if (cmsDocs.length > 0) {
        const newContent = { ...INITIAL_CONTENT };
        cmsDocs.forEach(row => {
          if (row.id === 'brand') setBrand(row.content);
          else newContent[row.id] = row.content;
        });
        setContent(newContent);
      }
    } catch (err) {
      console.warn('Firebase fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const logAction = async (pid, type, action, projectTitle, oldValue = null, newValue = null) => {
    const log = {
      user_id: user?.id,
      user_name: user?.name || user?.email || 'System',
      type,
      action,
      project_title: projectTitle,
      created_at: new Date().toISOString()
    };
    try {
      if (pid) await addDoc(collection(db, 'projects', pid, 'activity_logs'), log);
      else await addDoc(collection(db, 'activity_logs'), log);
    } catch (error) { console.error("Logging failed:", error.message); }
  };

  const notifyUser = async (userId, message, type, link = '') => {
    if (!userId) return;
    try {
      await addDoc(collection(db, 'notifications'), {
        userId, message, type, link, read: false, createdAt: new Date().toISOString()
      });
    } catch (e) { console.error("Notification failed", e); }
  };

  const markNotificationRead = async (id) => {
    try { await updateDoc(doc(db, 'notifications', id), { read: true }); }
    catch (e) { console.error(e); }
  };

  useEffect(() => {
    const q = collection(db, 'cms_content');
    const unsub = onSnapshot(q, (snapshot) => {
      const cms = {};
      snapshot.docs.forEach(d => {
        cms[d.id] = d.data().content;
      });
      if (Object.keys(cms).length > 0) {
        setContent(prev => ({ ...prev, ...cms }));
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const authSub = onAuthStateChanged(auth, async (sessionUser) => {
      if (sessionUser) {
        const userRef = doc(db, 'users', sessionUser.uid);
        const userSnap = await getDoc(userRef);
        const profile = userSnap.exists() ? userSnap.data() : { role: 'client' };
        
        setUser({ ...sessionUser, ...profile, id: sessionUser.uid });
        if (profile?.role === 'client') setView('portal');
        else if (profile?.role === 'manager') setView('team');
        else if (profile?.role === 'admin') setView('admin');
        fetchData();
      } else {
        setUser(null);
        setView('public');
      }
    });

    const projectSub = onSnapshot(collection(db, 'projects'), (snap) => {
      setClients(snap.docs.map(d => ({ id: d.id, ...d.data(), name: d.data().title })));
    });

    const paymentSub = onSnapshot(query(collectionGroup(db, 'payments')), (snap) => {
      setInvoices(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });

    const logSub = onSnapshot(query(collectionGroup(db, 'activity_logs'), orderBy('created_at', 'desc'), limit(50)), (snap) => {
      setLogs(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });

    const userSub = onSnapshot(collection(db, 'users'), (snap) => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setTeamMembers(all.filter(u => u.role !== 'client'));
      setDbClients(all.filter(u => u.role === 'client'));
    });

    const taskSub = onSnapshot(query(collectionGroup(db, 'tasks')), (snap) => {
      setTasks(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });

    const apprSub = onSnapshot(query(collectionGroup(db, 'approvals')), (snap) => {
      setApprovals(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });

    const crSub = onSnapshot(query(collectionGroup(db, 'change_requests')), (snap) => {
      setChangeRequests(snap.docs.map(d => ({ id: d.id, parentId: d.ref.parent.parent.id, ...d.data() })));
    });

    let notifSub = () => {};
    if (user) {
      notifSub = onSnapshot(query(collection(db, 'notifications'), orderBy('createdAt', 'desc'), limit(50)), (snap) => {
        setUserNotifications(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(n => n.userId === user.id));
      });
    }

    return () => {
      authSub();
      projectSub();
      paymentSub();
      logSub();
      userSub();
      taskSub();
      apprSub();
      crSub();
      notifSub();
    };
  }, [user?.id]);

  const syncProjects = async (id, fields) => {
    try {
      notify('pending', 'Updating installation...');
      const oldProj = clients.find(c => c.id === id);
      await updateDoc(doc(db, 'projects', id), fields);
      if (fields.stage && oldProj.stage !== fields.stage) {
        logAction(id, 'Stage', `Updated stage to: ${fields.stage}`, oldProj.title);
      }
      notify('success', 'Installation updated');
      if (fields.stage && oldProj.stage !== fields.stage) {
        notifyUser(oldProj.clientId, `Installation stage updated to: ${fields.stage}`, 'stage');
        notifyUser(oldProj.managerId, `Installation stage updated to: ${fields.stage}`, 'stage');
      }
    } catch (err) {
      notify('error', 'Update failed');
    }
  };

  const syncShipments = async (id, fields, projectId) => {
    try {
      notify('pending', 'Updating shipment...');
      const pid = projectId || shipments.find(s => s.id === id)?.parentId;
      await updateDoc(doc(db, 'projects', pid, 'shipments', id), fields);
      notify('success', 'Shipment updated');
    } catch (err) {
      notify('error', 'Update failed');
    }
  };

  const syncTask = async (id, fields, projectId) => {
    try {
      notify('pending', 'Updating task...');
      const pid = projectId || tasks.find(t => t.id === id)?.parentId;
      await updateDoc(doc(db, 'projects', pid, 'tasks', id), fields);
      const task = tasks.find(t => t.id === id);
      if (fields.status) logAction(pid, 'Task', `Updated task status: ${fields.status}`, task?.title);
      notify('success', 'Task updated');
      if (fields.status) {
        const proj = clients.find(c => c.id === pid);
        notifyUser(proj?.managerId, `Task "${task?.title}" marked as ${fields.status}`, 'task');
      }
    } catch (err) {
      notify('error', 'Update failed');
    }
  };

  const syncApproval = async (id, fields, projectId) => {
    try {
      notify('pending', 'Syncing component sign-off...');
      const pid = projectId || approvals.find(a => a.id === id)?.parentId;
      const appr = approvals.find(a => a.id === id);
      await updateDoc(doc(db, 'projects', pid, 'approvals', id), fields);
      logAction(pid, 'Approval', `Status update: ${fields.status || 'Updated'} - ${appr.itemName}`, appr.projectTitle);
      if (fields.status === 'approved') {
        const proj = clients.find(c => c.id === pid);
        notifyUser(proj?.managerId, `Component approved: ${appr.itemName}`, 'approval');
      }
      notify('success', 'Sign-off updated');
    } catch (err) { notify('error', 'Sync failed'); }
  };

  const createApproval = async (a) => {
     try {
       notify('pending', 'Requesting component sign-off...');
       const docRef = await addDoc(collection(db, 'projects', a.projectId, 'approvals'), {
         ...a, status: 'pending', createdAt: new Date().toISOString()
       });
       logAction(a.projectId, 'Approval', `New component sign-off request: ${a.itemName}`, a.projectTitle);
       const proj = clients.find(c => c.id === a.projectId);
       notifyUser(proj?.clientId, `New technical sign-off required: ${a.itemName}`, 'approval');
       notify('success', 'Sign-off requested');
       return docRef.id;
     } catch (err) { notify('error', 'Failed'); }
  };

  const syncChangeRequest = async (id, fields, projectId) => {
    try {
      notify('pending', 'Syncing request...');
      const pid = projectId || changeRequests.find(r => r.id === id)?.parentId;
      const req = changeRequests.find(r => r.id === id);
      await updateDoc(doc(db, 'projects', pid, 'change_requests', id), fields);
      logAction(pid, 'Change', `Status update: ${fields.status}`, req.projectTitle);
      const proj = clients.find(c => c.id === pid);
      if (fields.status === 'evaluated') notifyUser(proj?.clientId, `Change request evaluated. Please review impact.`, 'change');
      if (fields.status === 'approved') notifyUser(proj?.managerId, `Change request approved by client.`, 'change');
      notify('success', 'Modification updated');
    } catch (err) { notify('error', 'Sync failed'); }
  };

  const createChangeRequest = async (r) => {
     try {
       notify('pending', 'Submitting request...');
       const docRef = await addDoc(collection(db, 'projects', r.projectId, 'change_requests'), {
         ...r, status: 'pending', createdAt: new Date().toISOString()
       });
       logAction(r.projectId, 'Change', 'New change request submitted', r.projectTitle);
       const proj = clients.find(c => c.id === r.projectId);
       notifyUser(proj?.managerId, `New change request from client: ${r.description}`, 'change');
       notify('success', 'Request submitted');
       return docRef.id;
     } catch (err) { notify('error', 'Failed'); }
  };

  const createTask = async (t) => {
    try {
      notify('pending', 'Creating task...');
      const { assignedTo, dueDate, ...rest } = t;
      const docRef = await addDoc(collection(db, 'projects', t.project_id, 'tasks'), { 
        ...rest, 
        assignedTo: assignedTo || t.assigned_to,
        dueDate: dueDate || t.due_date,
        createdAt: new Date().toISOString() 
      });
      logAction(t.project_id, 'Task', `Created new task: ${t.title}`, t.project_title);
      notifyUser(assignedTo || t.assigned_to, `New task assigned: ${t.title}`, 'task');
      notify('success', 'Task created');
      return docRef.id;
    } catch (err) {
      notify('error', 'Creation failed');
    }
  };

  const deleteTask = async (id, projectId) => {
    try {
      notify('pending', 'Deleting task...');
      const pid = projectId || tasks.find(t => t.id === id)?.parentId;
      const task = tasks.find(t => t.id === id);
      await deleteDoc(doc(db, 'projects', pid, 'tasks', id));
      logAction(pid, 'Task', `Deleted task: ${task?.title}`, task?.project_title);
      notify('success', 'Task deleted');
    } catch (err) {
      notify('error', 'Deletion failed');
    }
  };

  const syncBrand = async (b) => {
    try {
      await setDoc(doc(db, 'cms_content', 'brand'), { content: b });
      setBrand(b);
      notify('success', 'Brand updated');
    } catch (err) {
      notify('error', 'Save failed');
    }
  };

  const syncCMS = async (k, c) => {
    try {
      await setDoc(doc(db, 'cms_content', k), { content: c });
      setContent(prev => ({ ...prev, [k]: c }));
      notify('success', 'Content updated');
    } catch (err) {
      notify('error', 'Save failed');
    }
  };

  const payInvoice = async (id, projectId) => {
    try {
      notify('pending', 'Processing payment...');
      const pid = projectId || invoices.find(i => i.id === id)?.parentId;
      await updateDoc(doc(db, 'projects', pid, 'payments', id), { status: 'paid', paid_at: new Date().toISOString() });
      notify('success', 'Payment successful');
    } catch (err) {
      notify('error', 'Payment failed');
    }
  };

  const createBooking = async (b) => {
    try {
      notify('pending', 'Booking schedule...');
      await addDoc(collection(db, 'bookings'), { ...b, created_at: new Date().toISOString() });
      notify('success', 'Booking confirmed');
    } catch (err) {
      notify('error', 'Booking failed');
    }
  };

  const updateProject = async (pid, fields) => {
    try {
      await updateDoc(doc(db, 'projects', pid), fields);
      notify('success', 'Project updated successfully');
    } catch (e) { notify('error', e.message); }
  };

  const createClient = async (data) => {
    try {
      const id = data.email.replace(/[^a-zA-Z0-9]/g, '_');
      await setDoc(doc(db, 'users', id), { ...data, role: 'client', joined: new Date().toISOString() });
      notify('success', 'Client created successfully');
      logAction(null, 'Client', `Created new client: ${data.name}`);
    } catch (e) { notify('error', e.message); }
  };

  const updateClient = async (id, data) => {
    try {
      await updateDoc(doc(db, 'users', id), data);
      notify('success', 'Client updated');
    } catch (e) { notify('error', e.message); }
  };

  const updateMember = async (id, f) => {
    try {
      await updateDoc(doc(db, 'users', id), f);
      notify('success', 'Staff updated');
    } catch (err) {
      notify('error', 'Update failed');
    }
  };

  const deleteMember = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      notify('success', 'Staff removed');
    } catch (err) {
      notify('error', 'Delete failed');
    }
  };

  const createShipment = async (s) => {
    try {
      notify('pending', 'Creating shipment...');
      await addDoc(collection(db, 'projects', s.project_id, 'shipments'), { ...s, created_at: new Date().toISOString() });
      notify('success', 'Shipment created');
    } catch (err) {
      notify('error', 'Creation failed');
    }
  };

  const getSLA = (client) => {
    if (!client.startDate) return { date: 'TBD', delayed: false };
    const start = new Date(client.startDate);
    const totalDays = PROJECT_STAGES.slice(0, client.stage || 1).reduce((sum, s) => sum + s.days, 0);
    const deadline = new Date(start.getTime() + totalDays * 24 * 60 * 60 * 1000);
    const isDelayed = new Date() > deadline;
    return { date: deadline.toLocaleDateString(), delayed: isDelayed };
  };

  const commonProps = {
    brand, setBrand: syncBrand, content, setContent: syncCMS,
    clients, updateProject: syncProjects,
    dbClients, createClient, updateClient,
    createProject: async (p) => {
      try {
        notify('pending', 'Creating installation...');
        const docRef = await addDoc(collection(db, 'projects'), { ...p, createdAt: new Date().toISOString() });
        notify('success', 'Installation created');
        return { data: { id: docRef.id, ...p }, error: null };
      } catch (err) {
        notify('error', 'Failed');
        return { error: err };
      }
    },
    proposals, setProposals, invoices, payInvoice,
    bookings, createBooking, emails, setEmails,
    teamMembers, updateMember, deleteMember,
    logs, logAction, shipments, updateShipment: syncShipments, createShipment,
    tasks, updateTask: syncTask, createTask, deleteTask,
    approvals, updateApproval: syncApproval, createApproval,
    changeRequests, updateChangeRequest: syncChangeRequest, createChangeRequest,
    userNotifications, markNotificationRead,
    getSLA,
    content, syncCMS,
    brand: content.brand,
    migrateToFirebase: async () => {
      try {
        notify('pending', 'Initializing Glasstech CMS...');
        setLoading(true);
        // USERS
        for (const m of TEAM_MEMBERS) await setDoc(doc(db, 'users', m.id), m);
        
        // CLIENTS & PROJECTS
        for (const item of CLIENTS_DATA) {
          const pid = item.id || `PROJ_${Math.random().toString(36).substr(2, 5)}`;
          const cid = `CL_${pid}`;
          
          // Register Client User
          await setDoc(doc(db, 'users', cid), { 
            id: cid, name: item.name, email: item.email || `${item.name.toLowerCase().replace(' ', '.')}@example.com`, 
            phone: '+233 24 000 0000', company: item.project.split(' ')[0] + ' Ltd', role: 'client', status: 'Active', joined: new Date().toISOString() 
          });

          // Define Milestones
          const milestones = [
            { id: 'm1', name: 'Deposit (40%)', amount: '$' + (parseFloat(item.budget.replace(/[$,]/g, '')) * 0.4).toLocaleString(), stageId: 1, paid: true },
            { id: 'm2', name: 'Fabrication Commencement (30%)', amount: '$' + (parseFloat(item.budget.replace(/[$,]/g, '')) * 0.3).toLocaleString(), stageId: 4, paid: false },
            { id: 'm3', name: 'Final Handover (30%)', amount: '$' + (parseFloat(item.budget.replace(/[$,]/g, '')) * 0.3).toLocaleString(), stageId: 7, paid: false }
          ];

          await setDoc(doc(db, 'projects', pid), { 
            ...item, 
            title: item.project, 
            clientIds: [cid], 
            milestones,
            managerId: 'EMP001', 
            createdAt: new Date().toISOString() 
          });

          // Create initial Invoices for the Paid milestones
          for (const m of milestones.filter(x => x.paid)) {
            await addDoc(collection(db, 'projects', pid, 'payments'), {
              title: m.name, amount: m.amount, status: 'Paid', date: new Date().toLocaleDateString(), type: 'Milestone', milestoneId: m.id
            });
          }

          const initialTasks = [{ title: 'Site Survey & Dimensioning', stage: 1, status: 'completed', assignedTo: 'EMP001' }];
          for (const t of initialTasks) await addDoc(collection(db, 'projects', pid, 'tasks'), { ...t, createdAt: new Date().toISOString() });
          await addDoc(collection(db, 'projects', pid, 'activity_logs'), { action: 'Project Initiated: ' + item.project, type: 'System', created_at: new Date().toISOString() });
        }

        // CMS CONTENT
        const CMS_SHEET = {
          brand: BRAND0,
          hero: { slides: HERO_SLIDES },
          services: SERVICES_DATA,
          portfolio: PORTFOLIO_DATA,
          about: ABOUT_DATA,
          team: TEAM_MEMBERS,
          why_us: WHY_US,
          process: PROCESS_STEPS,
          testimonials: [
            { name: 'Abena Mensah', role: 'Developer', text: 'Glasstech transformed our development beyond expectation. The structural glazing is precise.', rating: 5 },
            { name: 'Kofi Asante', role: 'CEO', text: 'Our new headquarters facade is world-class glass engineering.', rating: 5 }
          ],
          products: [
            { id: 'p1', name: 'Low-E Toughened Glass', desc: 'High thermal efficiency panes for facades.', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&q=80', cat: 'Glass' },
            { id: 'p2', name: 'Structural Aluminum Profiles', desc: 'Heavy-duty frames for commercial glazing.', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80', cat: 'Structural' }
          ],
          footer: {
            links: [
              { label: 'Privacy Policy', url: '#' },
              { label: 'Terms of Service', url: '#' },
              { label: 'Quality Policy', url: '#' }
            ]
          }
        };

        for (const [k, v] of Object.entries(CMS_SHEET)) {
          await setDoc(doc(db, 'cms_content', k), { content: v });
        }

        notify('success', 'Full Interior CMS Initialized');
        fetchData();
      } catch (err) { console.error(err); notify('error', 'Initialization failed'); } finally { setLoading(false); }
    }
  };

  if (view === 'public') return <PublicSite {...commonProps} onPortal={() => setView('login')} />;
  if (view === 'login') return <LoginPage brand={brand} onLogin={(e, p) => signInWithEmailAndPassword(auth, e, p)} onBack={() => setView('public')} />;

  const ac = brand.color || '#C8A96E';
  
  return (
    <>
      <div className="lxf-platform">
        {view === 'admin' && user && <AdminPortal user={user} onLogout={() => signOut(auth)} onPreview={() => setView('public')} {...commonProps} />}
        {view === 'portal' && user && <ClientPortal client={clients.find(c => c.email === user.email) || clients[0]} onLogout={() => signOut(auth)} {...commonProps} />}
        {view === 'team' && user && <AccountManagerPortal user={user} onLogout={() => signOut(auth)} {...commonProps} />}
      </div>
      
      {notification && (
        <div className={`lxf-toast ${notification.type}`} style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, padding: '12px 24px', borderRadius: 100, background: notification.type === 'error' ? '#EF4444' : notification.type === 'pending' ? ac : '#10B981', color: '#fff', fontSize: 13, fontWeight: 500, boxShadow: '0 8px 32px rgba(0,0,0,.15)', display: 'flex', alignItems: 'center', gap: 10 }}>
           <span className="lxf">{notification.msg}</span>
        </div>
      )}
    </>
  );
}
