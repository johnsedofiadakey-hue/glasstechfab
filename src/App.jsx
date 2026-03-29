import React, { useState } from 'react';
import PublicSite from './pages/PublicSite';
import LoginPage from './pages/LoginPage';
import AdminPortal from './pages/AdminPortal';
import ClientPortal from './pages/ClientPortal';
import AccountManagerPortal from './pages/AccountManagerPortal';
import { CLIENTS_DATA, PROPOSALS_DATA, INVOICES_DATA } from './data';

const BRAND0 = {
  name: 'LuxeSpace Interiors',
  logo: null,
  color: '#C8A96E',
  tagline: 'Crafting Spaces That Tell Your Story',
  phone: '+233 24 412 3456',
  email: 'hello@luxespace.com',
  location: 'East Legon, Accra',
  website: 'www.luxespace.com',
  instagram: '@luxespace_gh',
  whatsapp: '+233244123456'
};

export default function App() {
  const [view, setView] = useState('public'); // public | login | admin | portal | team
  const [user, setUser] = useState(null);
  const [brand, setBrand] = useState(BRAND0);
  
  // These would ideally come from a central store/API in a real app, 
  // but for this modular version, we pass them down.
  const [clients] = useState(CLIENTS_DATA);
  const [proposals] = useState(PROPOSALS_DATA);
  const [invoices] = useState(INVOICES_DATA);

  const login = (u) => {
    setUser(u);
    if (u.role === 'client') setView('portal');
    else if (u.role === 'team') setView('team');
    else setView('admin');
  };

  const logout = () => {
    setUser(null);
    setView('public');
  };

  if (view === 'public') return <PublicSite brand={brand} onPortalClick={() => setView('login')} />;
  if (view === 'login') return <LoginPage brand={brand} onLogin={login} onBack={() => setView('public')} />;
  
  if (view === 'admin' && user) {
    return (
      <AdminPortal 
        user={user} 
        brand={brand} 
        setBrand={setBrand} 
        onLogout={logout} 
        onPreview={() => setView('public')} 
      />
    );
  }
  
  if (view === 'portal' && user) {
    const client = clients.find(c => c.email === user.email) || clients[0];
    return (
      <ClientPortal 
        client={client} 
        proposals={proposals} 
        invoices={invoices} 
        brand={brand} 
        onLogout={logout} 
      />
    );
  }
  
  if (view === 'team' && user) {
    return (
      <AccountManagerPortal 
        user={user} 
        brand={brand} 
        clients={clients} 
        onLogout={logout} 
      />
    );
  }

  return null;
}
