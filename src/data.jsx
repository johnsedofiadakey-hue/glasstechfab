import React from 'react';
import { DollarSign, Eye, MessageSquare, CheckCircle, Users } from 'lucide-react';

export const PROJECT_STAGES = [
  { id: 1, name: 'Order Confirmed', days: 1, color: '#4CAF50' },
  { id: 2, name: 'Materials Selection', days: 7, color: '#FF9800' },
  { id: 3, name: 'Client Approval', days: 3, color: '#2196F3' },
  { id: 4, name: 'Payment (Deposit / Partial)', days: 2, color: '#00BCD4' },
  { id: 5, name: 'Procurement (Local / China)', days: 14, color: '#9C27B0' },
  { id: 6, name: 'Production', days: 21, color: '#1A1410' },
  { id: 7, name: 'Inspection', days: 3, color: '#3F51B5' },
  { id: 8, name: 'Shipping', days: 30, color: '#607D8B' },
  { id: 9, name: 'Arrival in Ghana', days: 5, color: '#795548' },
  { id: 10, name: 'Delivery to Site', days: 2, color: '#FF5722' },
  { id: 11, name: 'Installation', days: 10, color: '#C8A96E' },
  { id: 12, name: 'Handover', days: 2, color: '#16A34A' }
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
  founder: 'Ama Asante',
  role: 'Managing Director',
  storyTitle: 'Complete Interior & Finishing Solutions.',
  story: 'Glasstech Fabrications has evolved into a premier full-service interior finishing partner. Based in Accra, we provide end-to-end solutions for luxury residential and large-scale commercial developments — from design to total handover.',
  bio: 'Our mission is to deliver world-class interior engineering that combines technical precision with exquisite aesthetic design — managing every trade from plumbing to the final glass finishing.',
  image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80'
};

export const BOOKING_SLOTS = ['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM'];

export const BOOKINGS_DATA = [
  {id:'BK-001',client:'Abena Mensah',clientEmail:'client@luxespace.com',type:'On-Site Measurement',date:'2026-03-15',time:'10:00 AM',duration:60,status:'Confirmed',notes:'Facade measurement for East Legon project',av:'AM'},
  {id:'BK-002',client:'Kofi Asante',clientEmail:'kofi@asante.com',type:'Technical Review',date:'2026-03-18',time:'2:00 PM',duration:45,status:'Confirmed',notes:'Office glazing technical specifications',av:'KA'},
  {id:'BK-003',client:'Akua Boateng',clientEmail:'akua@boutique.com',type:'Component Selection',date:'2026-03-22',time:'11:00 AM',duration:90,status:'Pending',notes:'Aluminum frame profile selection',av:'AB'},
];

export const EMAIL_QUEUE = [
  {id:'EM-001',type:'proposal_sent',to:'client@luxespace.com',toName:'Abena Mensah',subject:'Your Installation Quote is Ready — Glasstech',status:'Sent',sentAt:'Mar 14, 10:32 AM',proposalId:'PRO-001'},
  {id:'EM-002',type:'invoice_due',to:'akua@boutique.com',toName:'Akua Boateng',subject:'Invoice INV-003 Due in 3 Days',status:'Sent',sentAt:'Mar 15, 9:00 AM',invoiceId:'INV-003'},
  {id:'EM-003',type:'booking_confirmed',to:'client@luxespace.com',toName:'Abena Mensah',subject:'Measurement Confirmed — March 15 at 10:00 AM',status:'Sent',sentAt:'Mar 10, 2:15 PM',bookingId:'BK-001'},
];

export const ANALYTICS_MONTHLY = [
  {m:'Oct',revenue:28000,proposals:4,conversions:2,bookings:3},
  {m:'Nov',revenue:34000,proposals:6,conversions:3,bookings:5},
  {m:'Dec',revenue:42000,proposals:8,conversions:5,bookings:7},
  {m:'Jan',revenue:38000,proposals:5,conversions:4,bookings:6},
  {m:'Feb',revenue:51000,proposals:9,conversions:6,bookings:8},
  {m:'Mar',revenue:61000,proposals:11,conversions:7,bookings:9},
];

export const PIPELINE = [
  {stage:'Inquiries',count:14,value:'$84,000'},
  {stage:'Quotes Sent',count:11,value:'$197,500'},
  {stage:'Approved',count:7,value:'$155,000'},
  {stage:'Fabrication',count:5,value:'$112,000'},
  {stage:'Installed',count:4,value:'$89,500'},
];

export const TOP_SERVICES = [
  {name:'Structural Glazing',revenue:180000,projects:8,pct:47},
  {name:'Aluminum Facades',revenue:120000,projects:3,pct:31},
  {name:'Interior Partitions',revenue:52000,projects:11,pct:14},
  {name:'Maintenance',revenue:30000,projects:22,pct:8},
];

export const BRAND0 = {
  name: 'Glasstech Fabrications',
  tagline: 'Complete Interior & Finishing Solutions',
  logo:null,
  color:'#1A1410',
  phone:'+233 24 111 2222',
  email:'contact@glasstech.com.gh',
  location:'Spintex Road Industrial Area, Accra',
  instagram:'@glasstech_gh',
  facebook:'GlasstechFabrications',
  twitter:'@glasstech_gh',
  linkedin:'glasstech-fabrications',
  whatsapp:'+233241112222',
  website:'www.glasstech.com.gh'
};

export const TEAM_MEMBERS = [
  {id:1,name:'Ama Asante',role:'admin',bio:'15 years in industrial fabrication and glass engineering.',img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',av:'AA',email:'ama@glasstechfab.com',phone:'+233 24 111 0001',status:'Online'},
  {id:2,name:'Kwame Osei',role:'Technical Lead',bio:'Expert in curtain wall systems and high-pressure glazing.',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',av:'KO',email:'kwame@glasstechfab.com',phone:'+233 24 111 0002',status:'Online'},
  {id:3,name:'Abena Darko',role:'admin',bio:'Ensures on-site precision and safety across all glass installations.',img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',av:'AD',email:'admin@glasstechfab.com',phone:'+233 24 111 0003',status:'Idle'},
  {id:4,name:'Nana Boateng',role:'CAD Engineer',bio:'Specializes in precision technical drawings and fabrication specs.',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',av:'NB',email:'nana@glasstechfab.com',phone:'+233 24 111 0004',status:'Idle'},
];

export const PORTFOLIO_DATA = [
  {id:1,title:'The Volta Suite',cat:'Full Interior',after:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',before:'',year:'2024',loc:'East Legon, Accra',area:'4,200 sq ft',duration:'5 months',budget:'$195,000',style:'Modern Industrial',hasBA:false,desc:'Total interior finishing including kitchens, tiling, and lighting.',imgs:['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80']},
  {id:2,title:'Airport Hills Kitchen',cat:'Kitchen Installation',after:'https://images.unsplash.com/photo-1556911223-e1534ff6f755?w=1600&q=80',before:'',year:'2024',loc:'Airport Hills',area:'1,100 sq ft',duration:'2 months',budget:'$72,000',style:'Minimalist',hasBA:false,desc:'Bespoke smart kitchen installation with high-gloss finish.',imgs:['https://images.unsplash.com/photo-1556911223-e1534ff6f755?w=1600&q=80']},
  {id:3,title:'Corporate HQ Fit-out',cat:'Office Fit-out',after:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80',before:'',year:'2025',loc:'Ridge, Accra',area:'8,500 sq ft',duration:'8 months',budget:'$450,000',style:'Contemporary',hasBA:false,desc:'Full office interior finishing with structural glass partitions.',imgs:['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80']},
];

export const SERVICES_DATA = [
  {id:'design',icon:'🎨',name:'Interior Design',short:'Concept development and spatial planning.',catLabel:'Creative',desc:'We curate aesthetic experiences that balance form and function.',packages:[{name:'Basic',price:'$2,000',includes:['Moodboards','Layouts'],popular:false}],gallery:['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80']},
  {id:'kitchen',icon:'🍳',name:'Kitchen Installation',short:'Custom cabinetry and smart installations.',catLabel:'Finishings',desc:'Bespoke culinary spaces tailored to your lifestyle.',packages:[{name:'Executive',price:'$15,000',includes:['Smart tech','Marble tops'],popular:true}],gallery:['https://images.unsplash.com/photo-1556911223-e1534ff6f755?w=800&q=80']},
  {id:'wardrobes',icon:'👔',name:'Wardrobes & Storage',short:'Custom walk-in closets and smart storage.',catLabel:'Joinery',desc:'Optimized storage solutions with high-end finishes.',packages:[],gallery:['https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80']},
  {id:'washrooms',icon:'🚿',name:'Washroom Finishing',short:'Luxury sanitary and expert tiling.',catLabel:'Technical',desc:'Turn your bathroom into a private sanctuary.',packages:[],gallery:['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80']},
  {id:'flooring',icon:'📐',name:'Tiling & Flooring',short:'Precision marble and hardwood installations.',catLabel:'Finishings',desc:'Expert masonry and layering for high-traffic zones.',packages:[],gallery:['https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80']},
  {id:'lighting',icon:'💡',name:'Ceiling & Lighting',short:'Suspended ceilings and automation.',catLabel:'MEP',desc:'Integrated lighting systems and drop ceilings.',packages:[],gallery:['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80']},
  {id:'mep',icon:'🔧',name:'Plumbing & Electrical',short:'Industrial MEP engineering.',catLabel:'Technical',desc:'Ensuring your infrastructure is reliable and safe.',packages:[],gallery:['https://images.unsplash.com/photo-1581094380920-0966f38fe841?w=800&q=80']},
  {id:'glass',icon:'🏢',name:'Glass & Aluminum',short:'Structural glazing and facades.',catLabel:'Specialist',desc:'High-performance panes and structural aluminum frames.',packages:[],gallery:['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80']},
];

export const AWARDS = [
  {year:'2024',name:'Excellence in Structural Glazing',org:'Ghana Industrial Awards'},
];

export const CLIENTS_DATA = [
  {id:1,name:'Abena Mensah',email:'client@demo.com',phone:'+233 24 111 2222',loc:'East Legon',status:'Active',project:'Facade Installation',budget:'$45,000',joined:'2024-01-15',av:'AM',progress:65,milestones:[{label:'Measurement',done:true,date:'Jan 15'},{label:'Design Sign-off',done:true,date:'Jan 28'},{label:'Fabrication',done:true,date:'Feb 10'},{label:'Site Ready',done:false,date:'Mar 05'},{label:'Installation',done:false,date:'Mar 20'}],tasks:[{id:1,title:'Finalise glass thickness',priority:'High',status:'Pending',assignee:'KO',due:'2025-03-28'}],files:[],moodboards:[],messages:[]},
];
export const PROPOSALS_DATA = [
  {id:'PRO-001',client:'Abena Mensah',clientEmail:'client@demo.com',title:'Facade Installation — East Legon',amount:'$45,000',status:'Accepted',date:'2024-01-20',valid:'2024-02-20',items:[{desc:'On-Site Measurement & CAD',qty:1,rate:'$5,000',total:'$5,000'},{desc:'Structural Glazing System',qty:1,rate:'$25,000',total:'$25,000'},{desc:'Aluminum Frame Fabrication',qty:1,rate:'$10,000',total:'$10,000'},{desc:'Installation & Sealing',qty:1,rate:'$5,000',total:'$5,000'}],notes:'50% deposit required to commence fabrication.'},
];

export const INVOICES_DATA = [
  {id:'INV-001',client:'Abena Mensah',clientEmail:'client@demo.com',title:'Facade Installation — 50% Deposit',amount:'$22,500',status:'Paid',date:'2024-01-25',due:'2024-02-25'},
];

export const WORKSPACES_DATA = [
  {id:'ws1',name:'LuxeSpace Interiors',owner:'admin@glasstechfab.com',plan:'Pro',status:'Active',since:'Jan 2024',clients:28,revenue:'$245,000',color:'#C8A96E'},
  {id:'ws2',name:'Volta Interiors',owner:'hello@volta.gh',plan:'Starter',status:'Active',since:'Jun 2024',clients:11,revenue:'$89,000',color:'#7B9E87'},
  {id:'ws3',name:'Accra Design Co.',owner:'info@accradesign.com',plan:'Pro',status:'Active',since:'Jan 2025',clients:6,revenue:'$41,000',color:'#C85A5A'},
];

export const NOTIFS_DATA = [
  {id:1,type:'invoice',title:'Invoice INV-003 paid',desc:'Akua Boateng paid $8,400',time:'2 min ago',unread:true,icon:<DollarSign size={14}/>},
  {id:2,type:'proposal',title:'Proposal PRO-004 viewed',desc:'Yaw Darko opened the proposal',time:'1 hr ago',unread:true,icon:<Eye size={14}/>},
  {id:3,type:'message',title:'New message from Abena Mensah',desc:'"Thursday works perfectly!"',time:'3 hr ago',unread:true,icon:<MessageSquare size={14}/>},
  {id:4,type:'project',title:'Task completed',desc:'Kwame marked task as done',time:'Yesterday',unread:false,icon:<CheckCircle size={14}/>},
  {id:5,type:'client',title:'New inquiry received',desc:'Kofi Mensah submitted a contact form',time:'2 days ago',unread:false,icon:<Users size={14}/>},
];

export const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',
    title: 'Complete Interior\nSolutions.',
    sub: 'Total finishing for luxury residential and commercial developments.'
  },
  {
    img: 'https://images.unsplash.com/photo-1556911223-e1534ff6f755?w=1600&q=80',
    title: 'Bespoke Kitchen\nEngineering.',
    sub: 'Crafting culinary spaces with industrial precision and aesthetic luxury.'
  },
  {
    img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80',
    title: 'Structural\nLuxe.',
    sub: 'Where advanced glass engineering meets full-scale interior transformation.'
  }
];

export const ROOM_GALLERY = {
  'Living Room':['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80','https://images.unsplash.com/photo-1616137466211-f939a420be84?w=700&q=80'],
  'Kitchen':['https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=700&q=80','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80'],
  'Master Bedroom':['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=700&q=80','https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=80'],
  'Bathroom':['https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=700&q=80','https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=80'],
};

export const CLIENT_NAMES = ['Genesis Apartments', 'Minerals Dev. Fund', 'Qatar Airways Lounge', 'AfCFTA Secretariat', 'The Ivy Boutique', 'Ecobank Ghana', 'Hubtel Technologies', 'Exim Bank GH'];

export const REV = [
  { m: 'Oct', v: 28 },
  { m: 'Nov', v: 34 },
  { m: 'Dec', v: 42 },
  { m: 'Jan', v: 38 },
  { m: 'Feb', v: 51 },
  { m: 'Mar', v: 61 }
];

export const PIE_D = [
  { name: 'Residential', value: 45 },
  { name: 'Commercial', value: 30 },
  { name: 'Hospitality', value: 15 },
  { name: 'Other', value: 10 }
];

export const PIE_C = ['#C8A96E', '#7B9E87', '#9E7B7B', '#555'];

export const WHY_US = [
  {n:'01',title:'Precision Engineering',desc:'We utilize high-precision CNC cutting and industrial-grade finishing to ensure every component meets structural tolerances.'},
  {n:'02',title:'Latest Fabrication Tech',desc:'Our facility utilizes the latest architectural software and robotic fabrication to deliver complexity without compromise.'},
  {n:'03',title:'SGS Certified Quality',desc:'Every pane of glass and structural aluminum profile is subjected to rigorous stress and safety testing.'},
  {n:'04',title:'Industrial Durability',desc:'We provide high-performance systems designed to withstand harsh coastal environments and structural loads.'},
  {n:'05',title:'Site-to-Site Logistics',desc:'We manage the entire supply chain—from global sourcing of raw materials to specialized delivery and installation.'},
];

export const PROCESS_STEPS = [
  {n:'01',title:'Technical Survey',body:'Our site supervisors perform high-precision measurements and structural site audits to define the fabrication scope.',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'},
  {n:'02',title:'Engineering Design',body:'Our CAD engineers develop detailed shop drawings and structural specifications for client and architect approval.',img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80'},
  {n:'03',title:'Precision Fabrication',body:'In our state-of-the-most facility, we process glass and aluminum components using advanced industrial automation.',img:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=80'},
  {n:'04',title:'System Handover',body:'After professional installation by our specialist teams, we perform a final safety audit and formal handover.',img:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80'},
];
