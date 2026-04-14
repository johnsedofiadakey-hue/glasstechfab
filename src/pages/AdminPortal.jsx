import React, { useState } from 'react';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminClients from './admin/AdminClients';
import AdminInstallations from './admin/AdminInstallations';
import AdminLogistics from './admin/AdminLogistics';
import AdminCMS from './admin/AdminCMS';
import AdminPortfolio from './admin/AdminPortfolio';
import AdminBookings from './admin/AdminBookings';
import AdminAnalytics from './admin/AdminAnalytics';
import AdminEmailCenter from './admin/AdminEmailCenter';
import AdminStaff from './admin/AdminStaff';
import AdminSystem from './admin/AdminSystem';
import AIProposalGenerator from '../components/AIProposalGenerator';
import ClientHub from './admin/ClientHub';
import FabricationKanban from './admin/FabricationKanban';
import ProjectProcurement from './admin/ProjectProcurement';
import { PROJECT_STAGES } from '../data';

export default function AdminPortal({ user, onLogout, onPreview, content, setContent, ...props }) {
  const [view, setView] = useState('dash');
  const [showAI, setShowAI] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [mod, setMod] = useState(null); // 'AddClient', 'AddProject', etc.
  const [aiContext, setAiContext] = useState({});
  const { brand } = props;

  const handleSelectClient = (id) => {
    setSelectedClientId(id);
    setView('client-hub');
  };

  const renderView = () => {
    const common = { 
      user, brand, content, setContent, 
      setAI: (ctx = {}) => { setAiContext(ctx); setShowAI(true); }, 
      setMod,
      onSelectClient: handleSelectClient,
      PROJECT_STAGES,
      ...props 
    };
    switch (view) {
      case 'dash': return <AdminDashboard {...common} />;
      case 'operations': return <AdminClients {...common} />;
      case 'client-hub': return <ClientHub clientId={selectedClientId} onBack={() => setView('operations')} {...common} />;
      case 'cms': return <AdminCMS {...common} onPreview={onPreview} />;
      case 'portfolio': return <AdminPortfolio {...common} />;
      case 'bookings': return <AdminBookings {...common} />;
      case 'analytics': return <AdminAnalytics {...common} />;
      case 'email': return <AdminEmailCenter {...common} />;
      case 'staff': return <AdminStaff team={props.teamMembers} setTeam={props.setTeamMembers} {...common} />;
      case 'system': return <AdminSystem onReset={props.migrateToFirebase} {...common} />;
      default: return <AdminDashboard {...common} />;
    }
  };

  return (
    <AdminLayout 
      user={user} 
      onLogout={onLogout} 
      onPreview={onPreview} 
      brand={brand} 
      view={view} 
      setView={setView}
      userNotifications={props.userNotifications || props.notifications}
      markNotificationRead={props.markNotificationRead}
    >
      {renderView()}
      <AIProposalGenerator 
        open={showAI} 
        onClose={() => setShowAI(false)} 
        onSubmit={(data) => {
          // If we have a project context, we can automatically link it
          const submission = aiContext.projectId ? { ...data, projectId: aiContext.projectId } : data;
          props.createProposal(submission);
        }} 
        brand={brand} 
        initialData={aiContext}
      />
      
      {/* GLOBAL MODALS */}
      {mod === 'AddClient' && view !== 'operations' && (
        <AdminClients 
          {...props} 
          brand={brand} 
          dbClients={props.dbClients} 
          createClient={props.createClient}
          updateClient={props.updateClient}
          autoOpen={true} 
          onClose={() => setMod(null)} 
        />
      )}
    </AdminLayout>
  );
}
