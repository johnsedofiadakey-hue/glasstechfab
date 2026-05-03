import React from 'react';
import { DollarSign, Eye, MessageSquare, CheckCircle, Users, Factory, Truck } from 'lucide-react';

export const PROJECT_STAGES = [
  { id: 1, name: 'Choosing Materials', statusLabel: 'Selecting items', days: 7, color: '#C8A96E' },
  { id: 2, name: 'Quote & Approval', statusLabel: 'Awaiting your OK', days: 3, color: '#2196F3', requiresApproval: true },
  { id: 3, name: 'Deposit & Funding', statusLabel: 'Funds transferring', days: 2, color: '#4CAF50', requiresPayment: true, paymentPct: 50 },
  { id: 4, name: 'Production', statusLabel: 'Factory is working', days: 21, color: '#1A1410' },
  { id: 5, name: 'Shipping & Delivery', statusLabel: 'In transit to Ghana', days: 30, color: '#607D8B' },
  { id: 6, name: 'On-Site Work', statusLabel: 'Active installation', days: 5, color: '#16A34A' },
  { id: 7, name: 'Completed', statusLabel: 'Project Handover', days: 1, color: '#E5C387' }
];

export const LIFE_RIBBON = [
  { id: 'onboard', label: 'Start', icon: <Users size={24} />, stages: [1], color: '#C8A96E', text: 'We are setting up your project and checking all the details.' },
  { id: 'design', label: 'Design', icon: <Eye size={24} />, stages: [2], color: '#2196F3', text: 'Our engineers are drawing the technical plans for your space.' },
  { id: 'deposit', label: 'Secure', icon: <DollarSign size={24} />, stages: [3], color: '#4CAF50', text: 'We are securing the high-quality materials for your build.' },
  { id: 'factory', label: 'Build', icon: <Factory size={24} />, stages: [4], color: '#1A1410', text: 'Your items are being carefully built in our factory.' },
  { id: 'shipping', label: 'Move', icon: <Truck size={24} />, stages: [5], color: '#607D8B', text: 'Your order is packed and moving toward your location.' },
  { id: 'delivered', label: 'Finish', icon: <CheckCircle size={24} />, stages: [6], color: '#16A34A', text: 'Everything is installed and ready for you to enjoy.' }
];

export const PROCUREMENT_STAGES = [
  { id: 'to-buy', name: 'To Buy', icon: '🛒', color: '#DFD9D1' },
  { id: 'ordered', name: 'Order Placed', icon: '📝', color: '#FF9800' },
  { id: 'production', name: 'In Production', icon: '🏭', color: '#1A1410' },
  { id: 'warehouse', name: 'At Warehouse', icon: '📦', color: '#3F51B5' },
  { id: 'transit', name: 'In Transit', icon: '🚢', color: '#9C27B0' },
  { id: 'site', name: 'At Site', icon: '🏠', color: '#16A34A' }
];

export const ABOUT_DATA = {
  founder: 'John Dakey',
  role: 'Managing Director',
  storyTitle: 'Crafting the Future of Structural Glass & Interiors',
  story: 'Under the leadership of John Dakey, Managing Director, Glasstech Fabrications has evolved from a structural glass specialist into Ghana’s premier hub for complete interior finishing. Our mission is to bridge the gap between industrial engineering and luxury design.',
  bio: 'John Dakey leads Glasstech with a commitment to sub-millimeter precision and aesthetic excellence. From Spintex to the most exclusive developments in Accra, his vision is to provide a "million-dollar finish" for every project, leveraging global sourcing and local technical expertise.',
  image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop'
};

export const BRAND0 = {
  name: 'Glasstech Fabrications',
  tagline: 'Complete Interior & Finishing Solutions',
  logo: '/logo.png',
  color: '#C8A96E',
  phone: '+233 59 845 5012',
  email: 'contact@glasstech.com.gh',
  location: 'Spintex Road Industrial Area, Accra',
  instagram: '@glasstech_gh',
  facebook: 'GlasstechFabrications',
  twitter: '@glasstech_gh',
  linkedin: 'glasstech-fabrications',
  whatsapp: '+233598455012',
  website: 'www.glasstech.com.gh'
};

export const TEAM_MEMBERS = [
  {id:1,name:'John Dakey',role:'Managing Director',bio:'Visionary leader with a focus on structural glass and interior finishing engineering.',img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',av:'JD',email:'john@glasstechfab.com',phone:'+233 59 845 5012',status:'Online'},
  {id:2,name:'Kwame Osei',role:'Technical Lead',bio:'Expert in curtain wall systems and high-pressure glazing.',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',av:'KO',email:'kwame@glasstechfab.com',phone:'+233 24 111 0002',status:'Online'},
  {id:3,name:'Abena Darko',role:'admin',bio:'Ensures on-site precision and safety across all glass installations.',img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',av:'AD',email:'admin@glasstechfab.com',phone:'+233 24 111 0003',status:'Idle'},
  {id:4,name:'Nana Boateng',role:'CAD Engineer',bio:'Specializes in precision technical drawings and fabrication specs.',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',av:'NB',email:'nana@glasstechfab.com',phone:'+233 24 111 0004',status:'Idle'},
];

export const PORTFOLIO_DATA = [
  {id:1,title:'The Volta Suite',cat:'Full Interior',after:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',before:'',year:'2024',loc:'East Legon, Accra',area:'4,200 sq ft',duration:'5 months',budget:'$195,000',style:'Modern Industrial',hasBA:false,desc:'Total interior finishing including kitchens, tiling, and lighting.',imgs:['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80']},
  {id:2,title:'Airport Hills Kitchen',cat:'Kitchen Installation',after:'https://images.unsplash.com/photo-1556911223-e1534ff6f755?w=1600&q=80',before:'',year:'2024',loc:'Airport Hills',area:'1,100 sq ft',duration:'2 months',budget:'$72,000',style:'Minimalist',hasBA:false,desc:'Bespoke smart kitchen installation with high-gloss finish.',imgs:['https://images.unsplash.com/photo-1556911223-e1534ff6f755?w=1600&q=80']},
];

export const HERO_SLIDES = [
  { img: 'https://images.unsplash.com/photo-1519302959554-a75be0afc82a?q=80&w=2084&auto=format&fit=crop', title: 'Complete Interior\nSolutions.', sub: 'Total finishing for luxury developments.' },
  { img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop', title: 'Precision\nFabrication.', sub: 'Advanced glass processing.' }
];

export const SERVICES_DATA = [
  {id:'glass',icon:'🏢',name:'Glass & Aluminum',short:'Structural glazing and facades.',catLabel:'Specialist',desc:'High-performance panes.'}
];

export const PROCESS_STEPS = [
  {n:'01',title:'Technical Survey',body:'Measurements.',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'}
];

export const ROOM_GALLERY = {
  'Living Room':['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80']
};

export const WHY_US = [
  {n:'01',title:'Precision',desc:'CNC cutting.'}
];

export const BOOKING_SLOTS = ['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM'];
export const BOOKINGS_DATA = [];
export const EMAIL_QUEUE = [];
export const CLIENTS_DATA = [];
export const PROPOSALS_DATA = [];
export const INVOICES_DATA = [];
export const REV = [
  { month: 'Jan', revenue: 45000, target: 40000 },
  { month: 'Feb', revenue: 52000, target: 40000 },
  { month: 'Mar', revenue: 48000, target: 45000 },
  { month: 'Apr', revenue: 61000, target: 50000 },
  { month: 'May', revenue: 55000, target: 50000 },
  { month: 'Jun', revenue: 67000, target: 60000 }
];

export const PIE_D = [
  { name: 'Residential', value: 45, color: '#C8A96E' },
  { name: 'Commercial', value: 35, color: '#1A1410' },
  { name: 'Industrial', value: 20, color: '#607D8B' }
];

export const PIE_C = [
  { name: 'Ghana', value: 70, color: '#C8A96E' },
  { name: 'Togo', value: 15, color: '#1A1410' },
  { name: 'Nigeria', value: 15, color: '#607D8B' }
];

export const NOTIFS_DATA = [
  { id: 1, title: 'New Project Request', body: 'The Volta Suite requires technical survey.', time: '2h ago', type: 'project' },
  { id: 2, title: 'Payment Verified', body: 'Airport Hills Kitchen deposit confirmed.', time: '5h ago', type: 'payment' }
];

export const CLIENT_NAMES = ['LuxeSpace Ghana', 'AFCFTA Secretariat', 'Airport Hills Dev'];
export const AWARDS = [
  { id: 1, name: 'Excellence in Structural Glass', year: '2023', body: 'Ghana Property Awards' }
];

export const WORKSPACES_DATA = [
  { id: 'all', name: 'Global Hub', status: 'Active' }
];

export const PRODUCTS_DATA = [];
export const GLASS_CATALOG_DATA = [];
export const GLASS_CATALOG_CATEGORIES = [];
export const DEFAULT_SCENES = [];
