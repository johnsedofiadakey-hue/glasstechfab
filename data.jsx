import React from 'react';
import { DollarSign, Eye, MessageSquare, CheckCircle, Users } from 'lucide-react';

export const PROJECT_STAGES = [
  { id: 1, name: 'Order Confirmed', days: 1, color: '#4CAF50' },
  { id: 2, name: 'Materials Selection', days: 7, color: '#FF9800', requiresApproval: true },
  { id: 3, name: 'Technical Drawings', days: 3, color: '#2196F3', requiresApproval: true },
  { id: 4, name: 'Payment (Initial Deposit)', days: 2, color: '#00BCD4', requiresPayment: true, paymentPct: 50 },
  { id: 5, name: 'Procurement (Local / China)', days: 14, color: '#9C27B0' },
  { id: 6, name: 'Production', days: 21, color: '#1A1410', requiresPayment: true, paymentPct: 20 },
  { id: 7, name: 'Inspection', days: 3, color: '#3F51B5', requiresApproval: true },
  { id: 8, name: 'Shipping', days: 30, color: '#607D8B' },
  { id: 9, name: 'Arrival in Ghana', days: 5, color: '#795548', requiresPayment: true, paymentPct: 20 },
  { id: 10, name: 'Delivery to Site', days: 2, color: '#FF5722' },
  { id: 11, name: 'Installation', days: 10, color: '#C8A96E' },
  { id: 12, name: 'Final Handover', days: 2, color: '#16A34A', requiresPayment: true, paymentPct: 10 }
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
  image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80'
};

export const BOOKING_SLOTS = ['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM'];

export const BOOKINGS_DATA = [
  {id:'BK-001',client:'Abena Mensah',clientEmail:'client@glasstechfab.com',type:'On-Site Measurement',date:'2026-03-15',time:'10:00 AM',duration:60,status:'Confirmed',notes:'Facade measurement for East Legon project',av:'AM'},
  {id:'BK-002',client:'Kofi Asante',clientEmail:'kofi@asante.com',type:'Technical Review',date:'2026-03-18',time:'2:00 PM',duration:45,status:'Confirmed',notes:'Office glazing technical specifications',av:'KA'},
  {id:'BK-003',client:'Akua Boateng',clientEmail:'akua@boutique.com',type:'Component Selection',date:'2026-03-22',time:'11:00 AM',duration:90,status:'Pending',notes:'Aluminum frame profile selection',av:'AB'},
];

export const EMAIL_QUEUE = [
  {id:'EM-001',type:'proposal_sent',to:'client@glasstechfab.com',toName:'Abena Mensah',subject:'Your Installation Quote is Ready — Glasstech',status:'Sent',sentAt:'Mar 14, 10:32 AM',proposalId:'PRO-001'},
  {id:'EM-002',type:'invoice_due',to:'akua@boutique.com',toName:'Akua Boateng',subject:'Invoice INV-003 Due in 3 Days',status:'Sent',sentAt:'Mar 15, 9:00 AM',invoiceId:'INV-003'},
  {id:'EM-003',type:'booking_confirmed',to:'client@glasstechfab.com',toName:'Abena Mensah',subject:'Measurement Confirmed — March 15 at 10:00 AM',status:'Sent',sentAt:'Mar 10, 2:15 PM',bookingId:'BK-001'},
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
  {id:3,title:'Corporate HQ Fit-out',cat:'Office Fit-out',after:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80',before:'',year:'2025',loc:'Ridge, Accra',area:'8,500 sq ft',duration:'8 months',budget:'$450,000',style:'Contemporary',hasBA:false,desc:'Full office interior finishing with structural glass partitions.',imgs:['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80']},
  {id:4,title:'Marina Bay Skylight',cat:'Glass & Aluminum',after:'https://images.unsplash.com/photo-1600585154340-be6199f7a096?w=1600&q=80',before:'',year:'2025',loc:'Tema Waterfront',area:'2,400 sq ft',duration:'3 months',budget:'$120,000',style:'Structural',hasBA:false,desc:'High-performance reflective glass skylight with structural aluminum support.',imgs:['https://images.unsplash.com/photo-1600585154340-be6199f7a096?w=1600&q=80']},
];

export const PRODUCTS_DATA = [
  {id:'P1',name:'Reflective Low-E Glass',cat:'Glass Systems',desc:'High-performance glass that reduces heat gain while maximizing natural light.',img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',specs:'12mm Tempered, Bronze Tinted', fobPrice:'$120/sqm', landedCost:'$165/sqm', status:'Available'},
  {id:'P2',name:'Minimalist Sliding Door',cat:'Aluminum Systems',desc:'Ultra-slim profiles for unobstructed views and smooth silent operation.',img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',specs:'Black Powder Coated, Heavy Duty', fobPrice:'$850/unit', landedCost:'$1,100/unit', status:'Available'},
  {id:'P3',name:'Structural Curtain Wall',cat:'Facades',desc:'Advanced aluminum framing for commercial facades and glass towers.',img:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',specs:'Pressure Equalized, Thermal Break', fobPrice:'$450/profile', landedCost:'$600/profile', status:'Pre-order'},
  {id:'P4',name:'Smart Privacy Glass',cat:'Glass Systems',desc:'Switchable opacity glass for instant privacy in offices and washrooms.',img:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',specs:'PDLC Film, Remote Controlled', fobPrice:'$800/sqm', landedCost:'$950/sqm', status:'Pre-order'},
  {id:'P5',name:'Matte Architectural Hinge',cat:'Hardware',desc:'Industrial-grade stainless steel hinges with architectural matte finish.',img:'https://images.unsplash.com/photo-1581094380920-0966f38fe841?w=800&q=80',specs:'316 Grade SS, 150kg Load', fobPrice:'$45/unit', landedCost:'$60/unit', status:'Available'},
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
  {id:'ws1',name:'Glasstech Fabrications',owner:'admin@glasstechfab.com',plan:'Pro',status:'Active',since:'Jan 2024',clients:28,revenue:'$245,000',color:'#C8A96E'},
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


// ─────────────────────────────────────────────────────────────────────────────
// GLASS & ALUMINUM CATALOG — Sourced from our China manufacturing partner
// Categories: Casement Windows | Inward Opening | Sliding Windows | Specialty
//             Sliding Doors | Swing & Pivot Doors | Folding Doors
//             Sunroom & Skylight | Shower Enclosures
// ─────────────────────────────────────────────────────────────────────────────

export const GLASS_CATALOG_CATEGORIES = [
  { id: 'casement',   label: 'Casement Windows',      icon: '🪟', desc: 'Outward-opening thermalbreak aluminum windows. Maximum ventilation, superior weatherproofing.' },
  { id: 'inward',     label: 'Tilt & Turn Windows',   icon: '↩️', desc: 'Inward-opening with tilt function. European-style safety, ideal for high-rise residential.' },
  { id: 'sliding-win',label: 'Sliding Windows',       icon: '⬅️', desc: 'Space-saving horizontal sliding panels. Ultra-narrow frames for panoramic views.' },
  { id: 'specialty-win',label:'Specialty Windows',    icon: '⚡', desc: 'Parallel opening, pull-up, and motorized electric lift windows for premium applications.' },
  { id: 'sliding-door',label:'Sliding Doors',         icon: '🚪', desc: 'Ultra-slim profile sliding door systems. Single, double, and multi-track configurations.' },
  { id: 'swing-door', label: 'Swing & Pivot Doors',   icon: '🔄', desc: 'Architect-grade swing, hanging, interior, and pivot entry door systems.' },
  { id: 'folding-door',label:'Folding Doors',         icon: '📐', desc: 'Thermal break bi-fold and multi-panel folding door systems for wide openings.' },
  { id: 'sunroom',    label: 'Sunroom & Skylight',    icon: '☀️', desc: 'Enclosed aluminium sunroom structures and overhead glazed skylight systems.' },
  { id: 'shower',     label: 'Shower Enclosures',     icon: '🚿', desc: 'Stainless steel and tempered glass shower room series. All configurations available.' },
];

export const GLASS_CATALOG_DATA = [
  // ── CASEMENT WINDOWS ──────────────────────────────────────────────────────
  {
    id: 'w-63', sku: '63', cat: 'casement',
    name: '63 Series Casement Window',
    tagline: 'Classic Thermalbreak Outward Opening',
    img: '/glass/thumbs/63_casement.jpg',
    fullImg: '/glass/63_casement.jpg',
    specs: { profile: '1.6mm', opening: 'Outward / Awning', glass: 'Double Tempered with Argon', thickness: '5mm+20A+5mm (PVDF strip between)', handle: 'HOPPE in Black & Silver', hinge: 'GU Hinge', lock: 'Black Two Point Lock', safety: 'Anti-fall rope (150kg)' },
    performance: { waterTightness: 'Level 6 / 700pa', airTightness: 'Level 8 / 1.2m³/(m·h)', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 7 / 1.8 W/(m²·K)' },
    options: ['Laminated glass', 'Triple glass', 'Low-E glass', 'Reflective glass', 'Tinted glass', 'Bullet-proof glass', 'Fingerprint/Password handle', 'Insulation Cotton'],
    colors: ['Huanghua Pear', 'Black Skin', 'Deep Coffee', 'Pearl White', 'Deep Sea Blue', 'Caramel Coffee', 'Quartz Gray', 'Starry Sky Black', 'Black Walnut', 'Black Crystal Stone'],
    status: 'Available',
  },
  {
    id: 'w-S6', sku: 'S6', cat: 'casement',
    name: 'S6 Series Casement Window',
    tagline: 'WEHAG Six-Point Lock Precision',
    img: '/glass/thumbs/S6_casement.jpg',
    fullImg: '/glass/S6_casement.jpg',
    specs: { profile: '1.8mm', opening: 'Outward / Awning', glass: 'Double Tempered with Argon', thickness: '5mm+27A+5mm (PVDF strip)', handle: 'WEHAG Handle in Black & Silver', hinge: 'WEHAG Hinge', lock: 'WEHAG Six Point Lock (patent)', safety: 'Anti-fall rope (150kg)' },
    performance: { waterTightness: 'Level 6 / 700pa', airTightness: 'Level 8 / 1.2m³/(m·h)', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 7 / 1.8 W/(m²·K)' },
    options: ['26A Magnet Blinds', '27A Electric/Light Blinds', 'Hidden Awning Accessories', 'Insulation Cotton', 'Hidden folding screens', 'Fingerprint/Password handle', 'Custom glass options'],
    colors: ['Huanghua Pear', 'Black Skin', 'Deep Coffee', 'Pearl White', 'Deep Sea Blue', 'Caramel Coffee', 'Quartz Gray', 'Starry Sky Black', 'Black Walnut'],
    status: 'Available',
  },
  {
    id: 'w-S9', sku: 'S9', cat: 'casement',
    name: 'S9 Series Casement Window',
    tagline: 'Heavy-Gauge High-Performance Frame',
    img: '/glass/thumbs/S9_casement.jpg',
    fullImg: '/glass/S9_casement.jpg',
    specs: { profile: '2.0mm', opening: 'Outward / Awning', glass: 'Double Tempered with Argon', thickness: '5mm+27A+5mm', handle: 'WEHAG Handle', hinge: 'WEHAG Hinge', lock: 'WEHAG Six Point Lock' },
    performance: { waterTightness: 'Level 6 / 700pa', airTightness: 'Level 8 / 1.2m³/(m·h)', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 7 / 1.8 W/(m²·K)' },
    options: ['Electric blinds', 'Triple glass upgrade', 'Fingerprint handle', 'Custom colors'],
    status: 'Available',
  },
  {
    id: 'w-E0', sku: 'E0', cat: 'casement',
    name: 'E0 Series Casement Window',
    tagline: 'Slim Profile Elegant Design',
    img: '/glass/thumbs/E0_casement.jpg',
    fullImg: '/glass/E0_casement.jpg',
    specs: { profile: '1.8mm', opening: 'Outward / Awning', glass: 'Double Tempered with Argon', thickness: '5mm+27A+5mm', handle: 'WEHAG Handle' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 7 / 1.8 W/(m²·K)' },
    options: ['Hidden screens', 'Magnet blinds', 'Triple glass'],
    status: 'Available',
  },
  {
    id: 'w-R8Y', sku: 'R8Y', cat: 'casement',
    name: 'R8Y Series Casement Window',
    tagline: 'Narrow Sightline Luxury Finish',
    img: '/glass/thumbs/R8Y_casement.jpg',
    fullImg: '/glass/R8Y_casement.jpg',
    specs: { profile: '1.8mm', opening: 'Outward / Awning', glass: 'Double Tempered with Argon', thickness: '5mm+27A+5mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 7 / 1.8 W/(m²·K)' },
    options: ['Custom glass', 'Electric blinds', 'WEHAG hardware'],
    status: 'Available',
  },
  {
    id: 'w-K8Y', sku: 'K8Y', cat: 'casement',
    name: 'K8Y Series Casement Window',
    tagline: 'Ultra-Slim Frame Maximizes Views',
    img: '/glass/thumbs/K8Y_casement.jpg',
    fullImg: '/glass/K8Y_casement.jpg',
    specs: { profile: '1.8mm', opening: 'Outward / Awning', glass: 'Double Tempered with Argon', thickness: '5mm+27A+5mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB' },
    options: ['Hidden screens', 'Custom glass options'],
    status: 'Available',
  },
  {
    id: 'w-K9Y', sku: 'K9Y', cat: 'casement',
    name: 'K9Y Series Casement Window',
    tagline: 'Premium Residential Standard',
    img: '/glass/thumbs/K9Y_casement.jpg',
    fullImg: '/glass/K9Y_casement.jpg',
    specs: { profile: '2.0mm', opening: 'Outward / Awning', glass: 'Double Tempered with Argon', thickness: '5mm+27A+5mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB' },
    options: ['Fingerprint handle', 'Magnet blinds', 'Custom glass'],
    status: 'Available',
  },
  {
    id: 'w-Y148', sku: 'Y148', cat: 'casement',
    name: 'Y148 Series Casement Window',
    tagline: 'Flagship Thermalbreak Performance',
    img: '/glass/thumbs/Y148_casement.jpg',
    fullImg: '/glass/Y148_casement.jpg',
    specs: { profile: '2.0mm+', opening: 'Outward / Awning', glass: 'Double Tempered with Argon', thickness: '5mm+27A+5mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 7 / 1.8 W/(m²·K)' },
    options: ['Triple glass', 'Electric blinds', 'Custom colors', 'WEHAG hardware'],
    status: 'Available',
  },

  // ── TILT & TURN / INWARD OPENING ─────────────────────────────────────────
  {
    id: 'w-P9T', sku: 'P9T', cat: 'inward',
    name: 'P9T Parallel Opening Window',
    tagline: 'Controlled Ventilation Without Wind Blowback',
    img: '/glass/thumbs/P9T_parallel.jpg',
    fullImg: '/glass/P9T_parallel.jpg',
    specs: { profile: '1.8mm', opening: 'Parallel (simultaneous full-frame gap)', glass: 'Double Tempered with Argon', thickness: '5mm+27A+5mm', hardware: 'WEHAG' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB' },
    options: ['Hidden screens', 'Magnet blinds', 'Custom glass'],
    status: 'Available',
  },
  {
    id: 'w-E5N', sku: 'E5N', cat: 'inward',
    name: 'E5N Inward Opening Window',
    tagline: 'Tilt-and-Turn European System',
    img: '/glass/thumbs/E5N_inward.jpg',
    fullImg: '/glass/E5N_inward.jpg',
    specs: { profile: '1.6mm', opening: 'Inward / Tilt and Turn', glass: 'Double Tempered with Argon', thickness: '5mm+27A+5mm', hardware: 'WEHAG 180° internal reversing' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 6 / 2.0 W/(m²·K)' },
    options: ['26A Magnet Blinds', '5mm+12A+5mm+12A glass', 'Glass railing', 'Casement stopper', 'Custom glass options'],
    status: 'Available',
  },
  {
    id: 'w-E4N', sku: 'E4N', cat: 'inward',
    name: 'E4N Inward Opening Window',
    tagline: 'Enhanced Profile Tilt-and-Turn',
    img: '/glass/thumbs/E4N_inward.jpg',
    fullImg: '/glass/E4N_inward.jpg',
    specs: { profile: '2.0mm', opening: 'Inward / Tilt and Turn', glass: 'Double Tempered Argon Gas', thickness: '5mm+27A+5mm', hardware: 'WEHAG 180° reversing' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 6 / 2.0 W/(m²·K)' },
    options: ['Magnet blinds', 'Triple glass', 'Glass railing', 'Casement stopper'],
    status: 'Available',
  },
  {
    id: 'w-E3N', sku: 'E3N', cat: 'inward',
    name: 'E3N Inward Opening Window',
    tagline: 'Superior Thermal Tilt-and-Turn',
    img: '/glass/thumbs/E3N_inward.jpg',
    fullImg: '/glass/E3N_inward.jpg',
    specs: { profile: '2.0mm', opening: 'Inward / Tilt and Turn', glass: 'Double Tempered Argon Gas', thickness: '5mm+27A+5mm', hardware: 'WEHAG 180° reversing' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 6 / 2.0 W/(m²·K)' },
    options: ['Magnet blinds', 'Triple glass', 'Casement stopper', 'Glass railing'],
    status: 'Available',
  },
  {
    id: 'w-E6N', sku: 'E6N', cat: 'inward',
    name: 'E6N Inward Opening Window',
    tagline: 'Heavy-Duty Inward System',
    img: '/glass/thumbs/E6N_inward.jpg',
    fullImg: '/glass/E6N_inward.jpg',
    specs: { profile: '2.0mm+', opening: 'Inward / Tilt and Turn', glass: 'Double Tempered Argon Gas', thickness: '5mm+27A+5mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB' },
    options: ['Custom glass', 'Triple glass', 'Magnet blinds'],
    status: 'Available',
  },

  // ── SLIDING WINDOWS ───────────────────────────────────────────────────────
  {
    id: 'w-E2T', sku: 'E2T', cat: 'sliding-win',
    name: 'E2T Sliding Window',
    tagline: 'Smooth-Glide Horizontal Sliding',
    img: '/glass/thumbs/E2T_sliding.jpg',
    fullImg: '/glass/E2T_sliding.jpg',
    specs: { profile: '1.4mm', opening: 'Horizontal Sliding', glass: 'Double Tempered', thickness: '5mm+12A+5mm' },
    performance: { waterTightness: 'Level 4 / 350pa', windResistance: 'Level 5 / 2K pa', soundInsulation: 'Level 3 / 30 dB' },
    options: ['Hidden screens', 'Anti-theft locks', 'Custom glass'],
    status: 'Available',
  },
  {
    id: 'w-E5T', sku: 'E5T', cat: 'sliding-win',
    name: 'E5T Sliding Window',
    tagline: 'Panoramic View Ultra-Slim Rail',
    img: '/glass/thumbs/E5T_sliding.jpg',
    fullImg: '/glass/E5T_sliding.jpg',
    specs: { profile: '1.4mm', opening: 'Horizontal Sliding', glass: 'Double Tempered', thickness: '5mm+12A+5mm' },
    performance: { waterTightness: 'Level 4 / 350pa', windResistance: 'Level 5 / 2K pa', soundInsulation: 'Level 3 / 30 dB' },
    options: ['Custom glass', 'Anti-theft lock bar'],
    status: 'Available',
  },
  {
    id: 'w-G41', sku: 'G41', cat: 'sliding-win',
    name: 'G41 Sliding Sealing Window',
    tagline: 'Enhanced Weatherseal Sliding System',
    img: '/glass/thumbs/G41_sliding.jpg',
    fullImg: '/glass/G41_sliding.jpg',
    specs: { profile: '1.4mm', opening: 'Horizontal Sliding (brush-seal)', glass: 'Double Tempered', thickness: '5mm+12A+5mm' },
    performance: { waterTightness: 'Level 5 / 500pa', windResistance: 'Level 6 / 2.5K pa', soundInsulation: 'Level 3 / 30 dB' },
    options: ['Custom glass', 'Mosquito net screen'],
    status: 'Available',
  },

  // ── SPECIALTY WINDOWS ─────────────────────────────────────────────────────
  {
    id: 'w-T1', sku: 'T1', cat: 'specialty-win',
    name: 'T1 Pull-Up Window',
    tagline: 'Vertical Rising Sash — Space-Saving Design',
    img: '/glass/thumbs/T1_pullup.jpg',
    fullImg: '/glass/T1_pullup.jpg',
    specs: { opening: 'Vertical Pull-Up Sash', glass: 'Double Tempered', thickness: '5mm+12A+5mm' },
    performance: { waterTightness: 'Level 4 / 350pa', windResistance: 'Level 5 / 2K pa' },
    options: ['Counterweight system', 'Custom glass'],
    status: 'Available',
  },
  {
    id: 'w-ELEC', sku: 'Electric Lift', cat: 'specialty-win',
    name: 'Electric Lift Window',
    tagline: 'Motorized Auto-Lift Smart Window',
    img: '/glass/thumbs/electric_lift.jpg',
    fullImg: '/glass/electric_lift.jpg',
    specs: { opening: 'Motorized Vertical Lift', glass: 'Double Tempered', control: 'Remote / Smart Home Compatible' },
    performance: { windResistance: 'Level 6 / 2.5K pa', soundInsulation: 'Level 3 / 30 dB' },
    options: ['Smart home integration', 'Remote control', 'Custom glass', 'Fingerprint/App activation'],
    status: 'Pre-order',
  },

  // ── SLIDING DOORS ─────────────────────────────────────────────────────────
  {
    id: 'd-Q3', sku: 'Q3', cat: 'sliding-door',
    name: 'Q3 Narrow-Profile Sliding Door',
    tagline: 'Middle Narrow Stile — Unobstructed Panoramic View',
    img: '/glass/thumbs/Q3_sliding_door.jpg',
    fullImg: '/glass/Q3_sliding_door.jpg',
    specs: { profile: '1.4mm', opening: 'Sliding (2–4 panels)', glass: 'Double Tempered', thickness: '8mm Single or Double', handle: 'Narrow Aluminum Handle in Black', hinge: 'Mute Dual Wheels', size: 'W:580–1000 / H:2000–2800mm' },
    performance: { waterTightness: 'Level 6 / 700pa', airTightness: 'Level 8 / 1.2m³/(m·h)', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 6 / 2.0 W/(m²·K)' },
    options: ['Narrow aluminum handle', 'Buffer', 'Low rail with copper bar', 'Three-linkage accessories'],
    status: 'Available',
  },
  {
    id: 'd-Q5', sku: 'Q5', cat: 'sliding-door',
    name: 'Q5 Sliding Door',
    tagline: 'Classic Multi-Track Sliding System',
    img: '/glass/thumbs/Q5_sliding_door.jpg',
    fullImg: '/glass/Q5_sliding_door.jpg',
    specs: { profile: '1.4mm', opening: 'Sliding (2/3/4 tracks)', glass: 'Double Tempered', thickness: '8mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 6 / 2.0 W/(m²·K)' },
    options: ['Custom glass', 'Multiple track configurations'],
    status: 'Available',
  },
  {
    id: 'd-135F', sku: '135F', cat: 'sliding-door',
    name: '135F Sliding Door',
    tagline: 'Flush-Track Minimal Sightline',
    img: '/glass/thumbs/135F_sliding_door.jpg',
    fullImg: '/glass/135F_sliding_door.jpg',
    specs: { profile: '1.4mm', opening: 'Sliding (2 panels)', glass: 'Double Tempered', thickness: '8–12mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB' },
    options: ['Custom glass', 'Hidden handle'],
    status: 'Available',
  },
  {
    id: 'd-143', sku: '143', cat: 'sliding-door',
    name: '143 Series Sliding Door',
    tagline: 'Heavy-Duty Commercial Grade',
    img: '/glass/thumbs/143_sliding_door.jpg',
    fullImg: '/glass/143_sliding_door.jpg',
    specs: { profile: '1.6mm', opening: 'Sliding (2/3 panels)', glass: 'Double or Triple Tempered', thickness: '12mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB' },
    options: ['Triple glass', 'Custom track count', 'Corner door'],
    status: 'Available',
  },
  {
    id: 'd-Q9', sku: 'Q9', cat: 'sliding-door',
    name: 'Q9 Thermal Break Sliding Door',
    tagline: 'Climate-Controlled Sliding System',
    img: '/glass/thumbs/Q9_thermal_sliding.jpg',
    fullImg: '/glass/Q9_thermal_sliding.jpg',
    specs: { profile: '1.6mm', opening: 'Sliding (thermal break frame)', glass: 'Double Low-E Tempered Argon', thickness: '5mm+27A+5mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 7 / 1.8 W/(m²·K)' },
    options: ['Electric blinds', 'Triple glass', 'Custom handle colors'],
    status: 'Available',
  },
  {
    id: 'd-103F', sku: '103 XNF', cat: 'sliding-door',
    name: '103 Extremely Narrow Frame Sliding Door',
    tagline: 'Near-Invisible Frame for Full-Glass Effect',
    img: '/glass/thumbs/103F_xn_sliding.jpg',
    fullImg: '/glass/103F_xn_sliding.jpg',
    specs: { profile: '1.3mm', opening: 'Sliding (ultra-narrow frame)', glass: 'Tempered Glass', thickness: '8mm Single Glass' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB' },
    options: ['Narrow handle', 'Buffer system', 'Low-rail option'],
    status: 'Available',
  },

  // ── SWING & PIVOT DOORS ───────────────────────────────────────────────────
  {
    id: 'd-103H', sku: '103 Hang', cat: 'swing-door',
    name: '103 Extremely Narrow Hanging Door',
    tagline: 'Frameless Look Sliding-Hang Hybrid',
    img: '/glass/thumbs/103_hanging_door.jpg',
    fullImg: '/glass/103_hanging_door.jpg',
    specs: { profile: '1.3mm', opening: 'Two or Three Tracks', glass: 'Tempered Glass', thickness: '8mm Single', handle: 'Narrow aluminum in Black', hinge: 'Mute Two Wheels', size: 'W:580–1000 / H:800–2500mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 6 / 2.0 W/(m²·K)' },
    options: ['Buffer', 'Low rail with copper bar', 'Three-linkage accessories'],
    status: 'Available',
  },
  {
    id: 'd-54', sku: '54', cat: 'swing-door',
    name: '54 Extremely Narrow Swing Door',
    tagline: 'Invisible Frame Interior & Exterior Swing',
    img: '/glass/thumbs/54_swing_door.jpg',
    fullImg: '/glass/54_swing_door.jpg',
    specs: { profile: '1.4mm', opening: 'Outward or Inward Swing', glass: 'Tempered Glass', thickness: '8mm Single', handle: 'Narrow Aluminum Handle', lock: 'Magnetic Lock', size: 'W:350–850 / H:400–2400mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 6 / 2.0 W/(m²·K)' },
    options: ['Custom glass', 'Fingerprint lock', 'Hidden closer'],
    status: 'Available',
  },
  {
    id: 'd-P103', sku: 'P103', cat: 'swing-door',
    name: 'P103 Interior Swing Door',
    tagline: 'Architectural Interior Statement Door',
    img: '/glass/thumbs/P103_interior.jpg',
    fullImg: '/glass/P103_interior.jpg',
    specs: { opening: 'Inward / Outward Swing', glass: 'Tempered Glass', thickness: '8mm', handle: 'Narrow Aluminum' },
    performance: { soundInsulation: 'Level 3 / 30 dB' },
    options: ['Frosted glass', 'Custom handle', 'Floor-to-ceiling option'],
    status: 'Available',
  },
  {
    id: 'd-Z3', sku: 'Z3', cat: 'swing-door',
    name: 'Z3 Pivot Door',
    tagline: 'Floor-to-Ceiling Statement Entry',
    img: '/glass/thumbs/Z3_pivot_door.jpg',
    fullImg: '/glass/Z3_pivot_door.jpg',
    specs: { opening: 'Center or Off-Center Pivot', glass: 'Double or Single Tempered', thickness: '10–12mm', hardware: 'Heavy-duty stainless pivot system' },
    performance: { soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 6 / 2.0 W/(m²·K)' },
    options: ['Oversized panel up to 3m+', 'Low-E glass', 'Custom panel finish', 'Smart lock integration'],
    status: 'Pre-order',
  },

  // ── FOLDING DOORS ─────────────────────────────────────────────────────────
  {
    id: 'd-78', sku: '78', cat: 'folding-door',
    name: '78 Series Thermal Break Folding Door',
    tagline: 'Energy-Efficient Bi-Fold System',
    img: '/glass/thumbs/78_folding_door.jpg',
    fullImg: '/glass/78_folding_door.jpg',
    specs: { profile: '1.6mm', opening: 'Bi-fold / Multi-fold', glass: 'Double Tempered Low-E Argon', thickness: '5mm+20A+5mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 7 / 1.8 W/(m²·K)' },
    options: ['2+2, 1+3, 0+4 configurations', 'Corner folding', 'Custom glass'],
    status: 'Available',
  },
  {
    id: 'd-93', sku: '93', cat: 'folding-door',
    name: '93 Series Thermal Break Folding Door',
    tagline: 'Premium Wide-Span Accordion Opening',
    img: '/glass/thumbs/93_folding_door.jpg',
    fullImg: '/glass/93_folding_door.jpg',
    specs: { profile: '1.8mm', opening: 'Multi-fold (up to 6 panels)', glass: 'Double Tempered Low-E Argon', thickness: '5mm+27A+5mm' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', soundInsulation: 'Level 4 / 35 dB', thermalInsulation: 'Level 7 / 1.8 W/(m²·K)' },
    options: ['4+4, 4+2, 0+2 configurations', 'Triple glass', 'Hidden threshold option'],
    status: 'Available',
  },

  // ── SUNROOM & SKYLIGHT ────────────────────────────────────────────────────
  {
    id: 's-120', sku: '120 Series', cat: 'sunroom',
    name: '120 Series Sunroom',
    tagline: 'Aluminum Glass Enclosed Outdoor Living Space',
    img: '/glass/thumbs/120_sunroom.jpg',
    fullImg: '/glass/120_sunroom.jpg',
    specs: { structure: 'Aluminum frame + tempered glass roof', glass: 'Double Tempered / Low-E', roofType: 'Sloped / Flat configurable', opening: 'Casement + Sliding ventilation panels' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', thermalInsulation: 'Level 6 / 2.0 W/(m²·K)' },
    options: ['Custom dimensions', 'Retractable sunshade', 'Louvre ventilation', 'Electric opening panels'],
    status: 'Available',
  },
  {
    id: 's-138', sku: '138 Series', cat: 'sunroom',
    name: '138 Series Sunroom',
    tagline: 'Luxury Glass Pavilion — Pool & Garden Living',
    img: '/glass/thumbs/138_sunroom.jpg',
    fullImg: '/glass/138_sunroom.jpg',
    specs: { structure: 'Aluminum frame + tempered glass roof & walls', glass: 'Double Tempered Low-E / Triple option', roofType: 'Fully glazed with thermal break', opening: 'Sliding, Swing, or Folding perimeter walls' },
    performance: { waterTightness: 'Level 6 / 700pa', windResistance: 'Level 9 / 5K pa', thermalInsulation: 'Level 7 / 1.8 W/(m²·K)' },
    options: ['Full custom design', 'Smart shading', 'AC integration-ready', 'Integrated drainage'],
    status: 'Available',
  },
  {
    id: 's-sky', sku: 'Skylight', cat: 'sunroom',
    name: 'Structural Skylight Series',
    tagline: 'Overhead Glazing for Atriums & Rooftops',
    img: '/glass/thumbs/skylight.jpg',
    fullImg: '/glass/skylight.jpg',
    specs: { structure: 'Structural aluminum + laminated safety glass', glass: 'Laminated Tempered (fall-safe)', profile: 'Sloped or flat', drainage: 'Built-in perimeter channel' },
    performance: { waterTightness: 'Level 8 / 1000pa', windResistance: 'Level 10', soundInsulation: 'Level 5 / 40 dB' },
    options: ['Solar control glass', 'Motorized opening vents', 'Custom RAL color frames', 'PVDF coating'],
    status: 'Available',
  },

  // ── SHOWER ENCLOSURES ─────────────────────────────────────────────────────
  {
    id: 'sh-series', sku: 'Shower Series', cat: 'shower',
    name: 'Shower Enclosure Series',
    tagline: 'Stainless Steel & Tempered Glass — Full Configuration Range',
    img: '/glass/thumbs/shower_room.jpg',
    fullImg: '/glass/shower_room.jpg',
    specs: { material: '304 Stainless Steel', colors: 'Mirror light / Dumb gray / Gun Ash', pulley: '304 fine-cast double balance wheel', glass: '8mm / 10mm Clear Tempered', height: '2000mm standard / Custom', finish: 'Matt black / Titanium wire drawing / Gun Ash / Mirror light' },
    performance: { waterRetention: 'PVC solid water retaining strip', structural: 'Full frame or frameless options' },
    options: ['D851 Double sliding', 'D853 One solid one live', 'D854 One solid two linkage', 'D856 One fixed open', 'D858 Two solid one live', 'D859 T-shaft rotating', 'D860 Diamond hinge', 'D861 Diamond room', 'D865 Sector room', 'D866 Dual purpose', 'D867 Fixed frame', 'Custom dimensions'],
    status: 'Available',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// KITCHEN CATALOG — Premium cabinetry collection
// Sourced from ISO9001, NSF, CARB-certified manufacturing
// Categories organised by door finish / material
// ─────────────────────────────────────────────────────────────────────────────

export const KITCHEN_CATALOG_CATEGORIES = [
  { id: 'kitchen-new',       label: '2023 New Arrivals',    icon: '✨', desc: 'Latest designs combining cutting-edge materials with timeless form.' },
  { id: 'kitchen-sintered',  label: 'Sintered Surface',     icon: '🪨', desc: 'Ultra-hard, heat-resistant sintered stone panels. Anti-scratch and stain-proof finish.' },
  { id: 'kitchen-wood',      label: 'Solid Wood',           icon: '🌳', desc: 'North American broadleaf hardwood — birch, cherry, alder, oak, ash, walnut.' },
  { id: 'kitchen-veneer',    label: 'Wood Veneer',          icon: '🪵', desc: 'Real wood grain veneer over engineered core. Warmth of timber, superior stability.' },
  { id: 'kitchen-pet',       label: 'PET Panel',            icon: '🔲', desc: 'High-gloss or matte PET surface. Scratch-resistant, moisture-resistant, vibrant colours.' },
  { id: 'kitchen-hpl',       label: 'HPL',                  icon: '⬛', desc: 'High Pressure Laminate. Outstanding scratch and heat resistance. Entry-level value.' },
  { id: 'kitchen-lacquer',   label: 'Lacquer',              icon: '🎨', desc: 'PPG & DAIHO eco-lacquer. Superior yellowing resistance. Matt or high-gloss options.' },
  { id: 'kitchen-spray',     label: 'Spray Lacquer',        icon: '💨', desc: 'Premium spray-applied lacquer finish. Eco-friendly, SGS-tested, no heavy metals.' },
  { id: 'kitchen-uv',        label: 'UV Lacquer',           icon: '💡', desc: 'UV-cured lacquer panel. No moisture absorption. Fast-cure eco-friendly process.' },
  { id: 'kitchen-melamine',  label: 'Melamine',             icon: '🔳', desc: 'German Schattdecor / Spain Lamigraf décor paper. Fine texture. Economical value.' },
  { id: 'kitchen-pvc',       label: 'PVC Foil',             icon: '🌊', desc: 'RIKEN & RENOLIT foil. Tough surface, beautiful wood-grain alternative. Economical.' },
  { id: 'kitchen-pp',        label: 'PP Foil',              icon: '🏠', desc: 'PP foil with astonishing wood grain texture. Classical look, outstanding price-performance.' },
];

// All categories that are "new arrivals"
const NEW_ARRIVAL_SKUS = new Set(['WALDEN','GREENBERG','SOMMAROY','MAESTRO','HOUMAS','GLENDURGAN','NITA','AURORA','BROCADE','FEICHE','SICILIAN HOLIDAY','MOYEN','SONG FOR YOU']);

export const KITCHEN_CATALOG_DATA = [
  // ── 2023 NEW ARRIVALS ─────────────────────────────────────────────────────
  { id:'k-walden', sku:'WALDEN', code:'PLCC23026', cat:['kitchen-new','kitchen-veneer'],
    name:'Walden', tagline:'Dark Veneer Drama — Marble Island & Brass Accents',
    img:'/kitchen/thumbs/walden.jpg', fullImg:'/kitchen/walden.jpg',
    finish:'Wood Veneer', layout:'Island + Wall Run',
    dims:{ width:'5022mm', depth:'3850mm', island:'560mm × 1000mm' },
    specs:{ doorStyle:'YMN079, YMN080, YMN081', doorFinish:'PWMN2001', countertop:'PWTE0086, PWTY2013' },
    description:'Dramatic dark veneer cabinets framed in brass, set against sweeping black marble. The blue stone island commands attention. Designed for the architecturally bold home.',
    features:['Brass-trimmed display columns','Blue stone island countertop','Glass-front wine display','Under-island LED plinth lighting'],
    status:'In Stock' },

  { id:'k-greenberg', sku:'GREENBERG', code:'PLCC23020', cat:['kitchen-new','kitchen-veneer'],
    name:'Greenberg', tagline:'Warm Amber Veneer — Cityscape Confidence',
    img:'/kitchen/thumbs/greenberg.jpg', fullImg:'/kitchen/greenberg.jpg',
    finish:'Wood Veneer', layout:'Island + Wall Run',
    dims:{ width:'5250mm', depth:'3657mm', island:'1060mm' },
    specs:{ doorStyle:'YMN082, YMN083, YMN001', doorFinish:'PWMN1001', countertop:'PWTE0005' },
    description:'Rich amber grain veneer with illuminated shelving alcoves. The curved island peninsula and city skyline backdrop create a kitchen that doubles as an entertainer\'s stage.',
    features:['Illuminated display shelving','Rounded island peninsula','Warm amber door finish','Open display alcoves with brass accents'],
    status:'In Stock' },

  { id:'k-sommaroy', sku:'SOMMAROY', code:'PLCC23028', cat:['kitchen-new','kitchen-pet'],
    name:'Sommaroy', tagline:'Light Grey PET — Nordic L-Shape with Display Tower',
    img:'/kitchen/thumbs/sommaroy.jpg', fullImg:'/kitchen/sommaroy.jpg',
    finish:'PET', layout:'L-Shape + Tall Unit',
    dims:{ width:'4270mm', depth:'2805mm', island:'560mm' },
    specs:{ doorStyle:'YMP053, YMP001P, YMA001P', doorFinish:'PWMP2033, PWMP2032, PWMA0545', countertop:'PWTY1048' },
    description:'Cloud-grey PET panels with contrasting bronze-toned display tower. Clean handlebar hardware and seamless integration of appliances give it a composed Nordic elegance.',
    features:['Integrated glass tower display','Bronze-toned open shelving','Handlebar hardware detail','Seamless appliance housing'],
    status:'In Stock' },

  { id:'k-maestro', sku:'MAESTRO', code:'PLCC23030', cat:['kitchen-new','kitchen-pet'],
    name:'Maestro', tagline:'Bronze PET Drama — Glass Display Towers & Dark Island',
    img:'/kitchen/thumbs/maestro.jpg', fullImg:'/kitchen/maestro.jpg',
    finish:'PET', layout:'G-Shape + Island',
    dims:{ width:'3868mm', depth:'2849mm', island:'949mm' },
    specs:{ doorStyle:'YMD077, YMG231', doorFinish:'PWMP2031, PWMP2030', countertop:'PWTE0048' },
    description:'Three floor-to-ceiling bronze-tinted glass display towers anchor this kitchen. The dark sintered island bench and warm sand tones create a chef\'s theatre with artistic presence.',
    features:['Triple floor-to-ceiling display towers','Dark sintered stone island','Integrated wine and appliance column','Pull-out drawer organisation system'],
    status:'In Stock' },

  { id:'k-houmas', sku:'HOUMAS', code:'PLCC23024', cat:['kitchen-new','kitchen-lacquer'],
    name:'Houmas', tagline:'Cool Grey Lacquer — Brass Handles & Marble Island',
    img:'/kitchen/thumbs/houmas.jpg', fullImg:'/kitchen/houmas.jpg',
    finish:'Lacquer', layout:'Wall Run + Island',
    dims:{ width:'5026mm', depth:'3090mm', island:'1138mm' },
    specs:{ doorStyle:'YMK001, YMK300', doorFinish:'PWMK2176', countertop:'PWTE0088' },
    description:'Cool cloud-grey lacquer with floor-to-ceiling handleless doors. Vertical brass pulls punctuate the facade. The exotic marble island with onyx display cabinet makes a bold statement.',
    features:['Vertical brass pull handles','Onyx stone display cabinet','Exotic marble island bench','Tall handleless door system'],
    status:'In Stock' },

  { id:'k-glendurgan', sku:'GLENDURGAN', code:'PLCC23022', cat:['kitchen-new','kitchen-spray'],
    name:'Glendurgan', tagline:'Warm Cream Spray Lacquer — Island with Dining Extension',
    img:'/kitchen/thumbs/glendurgan.jpg', fullImg:'/kitchen/glendurgan.jpg',
    finish:'Spray Lacquer', layout:'L-Shape + Island + Dining',
    dims:{ width:'4339mm', depth:'2953mm', seating:'1850mm × 1600mm' },
    specs:{ doorStyle:'YMH107, YMH108, YMH109, YMH001', doorFinish:'PWMH0070, PWMH0071', countertop:'PWTY1111' },
    description:'Warm ivory spray lacquer with frosted glass cabinets. The island extends seamlessly into a dining table — one continuous surface for cooking and hosting. Understated luxury.',
    features:['Island-to-dining table extension','Frosted glass wall cabinets','Concealed drawer organisers','Gold-tipped edge detail'],
    status:'In Stock' },

  { id:'k-nita', sku:'NITA', code:'PLCC23023', cat:['kitchen-new','kitchen-spray'],
    name:'Nita', tagline:'Ivory & Bronze Spray Lacquer — Folding Island Table',
    img:'/kitchen/thumbs/nita.jpg', fullImg:'/kitchen/nita.jpg',
    finish:'Spray Lacquer', layout:'L-Shape + Island Table',
    dims:{ width:'5592mm', depth:'2522mm', island:'2000mm × 1644mm' },
    specs:{ doorStyle:'YMH104, YMH105, YMP054', doorFinish:'PWMH0072, PWMH0066', countertop:'PWTY1111' },
    description:'Ivory above, soft bronze below — a sophisticated two-tone spray lacquer palette. The integrated folding island table seats four, making this kitchen perfect for family living without sacrificing space.',
    features:['Integrated fold-out island dining table','Two-tone spray lacquer palette','Translucent glass upper cabinets','Smart appliance integration zone'],
    status:'In Stock' },

  { id:'k-aurora', sku:'AURORA', code:'PLCC23040', cat:['kitchen-new','kitchen-melamine'],
    name:'Aurora', tagline:'Light Concrete Melamine — Warm Oak Open Shelving',
    img:'/kitchen/thumbs/aurora.jpg', fullImg:'/kitchen/aurora.jpg',
    finish:'Melamine', layout:'L-Shape + Tall Column',
    dims:{ width:'4016mm', depth:'2513mm' },
    specs:{ doorStyle:'YMA001P', doorFinish:'PWMA0537, PWMA0536, PWMA0237', countertop:'PWTY1107' },
    description:'Light concrete-toned lower cabinets contrast with warm illuminated oak open shelving above. A classic Scandi-industrial formula executed with precision. Clean, calm, functional.',
    features:['Warm oak illuminated open shelving','Light concrete door finish','Integrated range hood','Column appliance housing'],
    status:'In Stock' },

  { id:'k-brocade', sku:'BROCADE', code:'PLCC23039', cat:['kitchen-new','kitchen-melamine'],
    name:'Brocade', tagline:'Cream & Oak Melamine — Curved Island Feature',
    img:'/kitchen/thumbs/brocade.jpg', fullImg:'/kitchen/brocade.jpg',
    finish:'Melamine', layout:'L-Shape + Curved Island',
    dims:{ width:'5150mm', depth:'3009mm', island:'790mm × 1306mm' },
    specs:{ doorStyle:'YMA119, YMA120, YMA001P', doorFinish:'PWMA0539, PWMA0538', countertop:'PWTY1110' },
    description:'Ivory handleless base cabinets pair with honey-toned open shelving. The curved island edge adds sculptural softness. Open lattice display panels bring a crafted, artisanal quality.',
    features:['Sculpted curved island edge','Open lattice display panels','Honey oak open shelving','Marble-look countertop'],
    status:'In Stock' },

  { id:'k-feiche', sku:'FEICHE', code:'PLCC23003', cat:['kitchen-new','kitchen-pvc'],
    name:'Feiche', tagline:'Taupe PVC Foil — Industrial Wall Tower & Open Display',
    img:'/kitchen/thumbs/feiche.jpg', fullImg:'/kitchen/feiche.jpg',
    finish:'PVC Foil', layout:'Straight Run + Display Tower',
    dims:{ width:'4288mm', depth:'560mm' },
    specs:{ doorStyle:'YMG065, YMC003', doorFinish:'PWMG1383, PWMG1382, PWMC0160', countertop:'PWTE0048' },
    description:'Taupe and charcoal PVC foil with industrial-style metal-frame open display. An integrated wall tower conceals full appliance storage, keeping the main run clean and uninterrupted.',
    features:['Integrated floor-to-ceiling appliance tower','Metal-frame open display column','Taupe and charcoal two-tone','Under-cabinet lighting'],
    status:'In Stock' },

  { id:'k-sicilian', sku:'SICILIAN HOLIDAY', code:'PLCC23031', cat:['kitchen-new','kitchen-pvc'],
    name:'Sicilian Holiday', tagline:'Cream PVC Foil — Grand Display Cabinet & Open Shelving',
    img:'/kitchen/thumbs/sicilian_holiday.jpg', fullImg:'/kitchen/sicilian_holiday.jpg',
    finish:'PVC Foil', layout:'U-Shape + Display Column',
    dims:{ width:'6240mm', depth:'3050mm' },
    specs:{ doorStyle:'YMG227, YMG228, YMG229, YMG230', doorFinish:'PWMG1385', countertop:'PWTE0084' },
    description:'Soft cream PVC foil cabinets framed by dark warm-toned wall panels. A grand display column with ribbed glass inserts becomes the focal point. Warmth, elegance, and generous storage.',
    features:['Ribbed glass display column','Dark wood-tone upper wall','Gold bar handles','Integrated double oven column'],
    status:'In Stock' },

  { id:'k-moyen', sku:'MOYEN', code:'PLCC23033', cat:['kitchen-new','kitchen-uv'],
    name:'Moyen', tagline:'Ivory UV Lacquer — Warm Walnut Accents & Open Display',
    img:'/kitchen/thumbs/moyen.jpg', fullImg:'/kitchen/moyen.jpg',
    finish:'UV Lacquer', layout:'L-Shape + Island',
    dims:{ width:'4067mm', depth:'2849mm' },
    specs:{ doorStyle:'YMC048, YMC003P', doorFinish:'PWMC0161, PWMC0162, PWMC0164', countertop:'PWTE0022' },
    description:'Warm ivory UV lacquer with walnut-accented open shelving inserts. The pull-out appliance drawer and integrated lighting create a kitchen that feels curated rather than constructed.',
    features:['Walnut-accented open shelving','Appliance pull-out drawer','Under-shelf LED strip lighting','Integrated island sink'],
    status:'In Stock' },

  { id:'k-song', sku:'SONG FOR YOU', code:'PLCC23034', cat:['kitchen-new','kitchen-uv'],
    name:'Song For You', tagline:'White UV Lacquer — Warm Island with Organised Drawers',
    img:'/kitchen/thumbs/song_for_you.jpg', fullImg:'/kitchen/song_for_you.jpg',
    finish:'UV Lacquer', layout:'L-Shape + Island',
    dims:{ width:'3930mm', depth:'2150mm' },
    specs:{ doorStyle:'YMC003P, YMA001P', doorFinish:'PWMC0163, PWMA0237', countertop:'PWTY1048' },
    description:'Bright white UV lacquer upper cabinets with warm stone-toned lowers. The island features a complete interior organisation system — spice pull-outs, cutlery trays, and plate dividers built in.',
    features:['Complete drawer organisation system','Warm stone lower cabinets','Recessed bar pull handles','Open display shelf zone'],
    status:'In Stock' },

  // ── SINTERED SURFACE ──────────────────────────────────────────────────────
  { id:'k-rippon', sku:'RIPPON', code:'PLCC22212', cat:['kitchen-sintered'],
    name:'Rippon', tagline:'Navy Sintered + White Marble Island — Bold Contrast',
    img:'/kitchen/thumbs/rippon.jpg', fullImg:'/kitchen/rippon.jpg',
    finish:'Sintered Surface', layout:'Wall Run + Island',
    dims:{ width:'5270mm', depth:'3638mm' },
    specs:{ doorStyle:'YME004, YMK001', doorFinish:'PWME0008, PWMK5004, PWMK5005', countertop:'PWTE0041, PWTE0040' },
    description:'Deep navy sintered panels set against bronzed display shelving create a gallery-like atmosphere. The white marble veined island bench is a showpiece in its own right.',
    features:['Navy sintered surface doors','White marble veined island','Bronze-toned shelving display','Illuminated interior wine zone'],
    status:'In Stock' },

  { id:'k-goethe', sku:'GOETHE', code:'PLCC22001', cat:['kitchen-sintered'],
    name:'Goethe', tagline:'Dark Sintered — Red Accent Shelving & Curved Island',
    img:'/kitchen/thumbs/goethe.jpg', fullImg:'/kitchen/goethe.jpg',
    finish:'Sintered Surface', layout:'L-Shape + Curved Island',
    dims:{ width:'5098mm', depth:'2744mm', island:'3504mm × 940mm' },
    specs:{ doorStyle:'YME017, YME018, YMG153', doorFinish:'PWME0013, PWMG0258', countertop:'YTE001A, PWTE0030' },
    description:'Dramatic dark sintered surface with unexpected red open shelving inserts. The curved dining extension island blurs the line between kitchen and dining room.',
    features:['Dark sintered surface throughout','Red accent open shelving','Curved island dining extension','Vertical LED plinth strips'],
    status:'In Stock' },

  { id:'k-leyah', sku:'LEYAH', code:'PLCC22011', cat:['kitchen-sintered'],
    name:'Leyah', tagline:'White Sintered & Walnut — Exotic Island Countertop',
    img:'/kitchen/thumbs/leyah.jpg', fullImg:'/kitchen/leyah.jpg',
    finish:'Sintered Surface', layout:'L-Shape + Island',
    dims:{ width:'4248mm', depth:'4021mm' },
    specs:{ doorStyle:'YME015, YME016, YME019, YMN052', doorFinish:'PWME0020, PWMN3066', countertop:'YTS005A, PWTY2020' },
    description:'Clean white sintered with warm walnut veneer shelving towers. The exotic stone island countertop is the hero — bold movement and natural drama. Confident modern residential.',
    features:['White sintered door panels','Exotic stone island countertop','Walnut display towers','Glass-front illuminated cabinets'],
    status:'In Stock' },

  // ── SOLID WOOD ────────────────────────────────────────────────────────────
  { id:'k-scottish', sku:'SCOTTISH COUNTRYSIDE', code:'PLCC13344', cat:['kitchen-wood'],
    name:'Scottish Countryside', tagline:'Rich Mahogany Solid Wood — Classic Heritage Kitchen',
    img:'/kitchen/thumbs/scottish_countryside.jpg', fullImg:'/kitchen/scottish_countryside.jpg',
    finish:'Solid Wood', layout:'L-Shape + Island',
    dims:{ width:'4180mm', depth:'3260mm', island:'930mm' },
    specs:{ doorStyle:'YMM004', doorFinish:'PWMM2014', countertop:'YTS006B, PWTY2019' },
    description:'Rich mahogany solid wood with glass-insert upper cabinets and decorative cornice moulding. A traditionally styled kitchen of genuine warmth and heritage character.',
    features:['Genuine solid wood doors','Glass-front upper cabinets','Decorative cornice moulding','Antique-style hardware'],
    status:'In Stock' },

  { id:'k-annecy', sku:'ANNECY TOWN', code:'PLCC16120', cat:['kitchen-wood'],
    name:'Annecy Town', tagline:'Cherry Solid Wood — Grand Classical Kitchen',
    img:'/kitchen/thumbs/annecy_town.jpg', fullImg:'/kitchen/annecy_town.jpg',
    finish:'Solid Wood', layout:'U-Shape + Island',
    dims:{ width:'4593mm', depth:'2793mm', island:'600mm' },
    specs:{ doorStyle:'YMM035A, YMM035B', doorFinish:'PWMM2023', countertop:'YTS004B, PWTY2006' },
    description:'Grand European-style kitchen in cherry solid wood. Arched cabinet tops, intricate mouldings, and wine storage niches create an aristocratic atmosphere of European luxury.',
    features:['Arched door moulding detail','Integrated wine rack niches','Grand cornice crown moulding','Island breakfast seating'],
    status:'In Stock' },

  // ── WOOD VENEER ───────────────────────────────────────────────────────────
  { id:'k-nier', sku:'NIER', code:'PLCC22026', cat:['kitchen-veneer'],
    name:'Nier', tagline:'Dark Driftwood Veneer — Wine Bar Island',
    img:'/kitchen/thumbs/nier.jpg', fullImg:'/kitchen/nier.jpg',
    finish:'Wood Veneer', layout:'Island Only',
    dims:{ width:'4488mm', depth:'2650mm' },
    specs:{ doorStyle:'YMN001', doorFinish:'PWMN0005, PWMN0006', countertop:'PWTE0022' },
    description:'Dramatic dark driftwood veneer in an almost sculptural kitchen concept. Wall-mounted wine and stemware display towers in brass. A kitchen that functions as a wine bar.',
    features:['Brass-frame stemware towers','Dark driftwood veneer','Oval island bench','Built-in wine display wall'],
    status:'In Stock' },

  { id:'k-blossom', sku:'ELEGANT BLOSSOM', code:'PLCC20103', cat:['kitchen-veneer'],
    name:'Elegant Blossom', tagline:'Warm Mahogany Veneer — Asian-Inspired Island Kitchen',
    img:'/kitchen/thumbs/elegant_blossom.jpg', fullImg:'/kitchen/elegant_blossom.jpg',
    finish:'Wood Veneer', layout:'Island + Wall Run',
    dims:{ width:'4950mm', depth:'2450mm', island:'940mm' },
    specs:{ doorStyle:'YMM090', doorFinish:'PWMM2092', countertop:'YTE001D, PWTE0023' },
    description:'Warm mahogany veneer with brass inlay detail lines. The Japanese-inspired shelving panels and mountain backdrop evoke a sense of quiet refinement and natural connection.',
    features:['Brass inlay door detail','Japanese-inspired shelving','Integrated island breakfast bar','Marble-look countertop'],
    status:'In Stock' },

  { id:'k-rodin', sku:'RODIN', code:'PLCC22031', cat:['kitchen-veneer'],
    name:'Rodin', tagline:'Two-Tone Veneer — Ribbed Island & Brass Grid Display',
    img:'/kitchen/thumbs/rodin.jpg', fullImg:'/kitchen/rodin.jpg',
    finish:'Wood Veneer', layout:'Island + Wall Display',
    dims:{ width:'4500mm', depth:'3044mm', island:'660mm' },
    specs:{ doorStyle:'YMN053, YMN054', doorFinish:'PWMN0008, PWMN0009', countertop:'PWTE0005' },
    description:'Crisp white upper cabinets meet a richly ribbed dark veneer island. The brass-frame glass display wall brings gallery elegance. Sculptural and considered in every detail.',
    features:['Ribbed dark veneer island','Brass-frame glass display wall','Circular dining table complement','White lacquer upper cabinets'],
    status:'In Stock' },

  { id:'k-munch', sku:'MUNCH', code:'PLCC22025', cat:['kitchen-veneer'],
    name:'Munch', tagline:'Gold Burl Veneer — Fluted Columns & Curved Island',
    img:'/kitchen/thumbs/munch.jpg', fullImg:'/kitchen/munch.jpg',
    finish:'Wood Veneer', layout:'L-Shape + Curved Island',
    dims:{ width:'5260mm', depth:'3288mm', island:'940mm' },
    specs:{ doorStyle:'YMN055, YMN049, YMB067', doorFinish:'PWMM4007, PWMM4008', countertop:'YTE001D, PWTE0023' },
    description:'Extraordinary gold burl veneer panels with vertical fluted grey columns. The curved island with integrated seating is a piece of furniture as much as a kitchen feature.',
    features:['Gold burl veneer feature panels','Vertical fluted grey columns','Curved island with seating','Circular pendant lighting zone'],
    status:'In Stock' },

  // ── PET ───────────────────────────────────────────────────────────────────
  { id:'k-shadow', sku:'LIGHT AND SHADOW', code:'PLCC21406', cat:['kitchen-pet'],
    name:'Light and Shadow', tagline:'Slate Grey PET — Marble Island & Backlit Shelving',
    img:'/kitchen/thumbs/light_and_shadow.jpg', fullImg:'/kitchen/light_and_shadow.jpg',
    finish:'PET', layout:'G-Shape + Island',
    dims:{ width:'4117mm', depth:'2349mm', island:'900mm' },
    specs:{ doorStyle:'YMP001, YMP027', doorFinish:'PWMP2010', countertop:'PWTE0006' },
    description:'Deep slate grey PET doors with wood-toned backlit shelving alcoves. The marble-panel island is a clean contrast. Simple, powerful, and exactly right for the urban apartment.',
    features:['Backlit wood-tone shelving alcoves','Marble panel island','Integrated coffee station zone','Full-height pantry column'],
    status:'In Stock' },

  { id:'k-breezy', sku:'BREEZY', code:'PLCC22126', cat:['kitchen-pet'],
    name:'Breezy', tagline:'Warm Mocha PET — Dark Display Tower & Sintered Island',
    img:'/kitchen/thumbs/breezy.jpg', fullImg:'/kitchen/breezy.jpg',
    finish:'PET', layout:'L-Shape + Island',
    dims:{ width:'4550mm', depth:'2958mm' },
    specs:{ doorStyle:'YMP001, YMK001', doorFinish:'PWMP2024, PWMP2025', countertop:'PWTE0067' },
    description:'Warm mocha PET with a striking dark metal-frame display tower. The sintered stone island floats on slender legs. Architectural and airy.',
    features:['Metal-frame glass display tower','Sintered stone island bench','Warm mocha PET finish','LED pendant zone'],
    status:'In Stock' },

  // ── HPL ───────────────────────────────────────────────────────────────────
  { id:'k-odejoy', sku:'ODE TO JOY', code:'PLCC18082', cat:['kitchen-hpl'],
    name:'Ode To Joy', tagline:'Stone-Texture HPL — Industrial Open Framework',
    img:'/kitchen/thumbs/ode_to_joy.jpg', fullImg:'/kitchen/ode_to_joy.jpg',
    finish:'HPL', layout:'L-Shape + Open Framework',
    dims:{ width:'3790mm', depth:'2650mm' },
    specs:{ doorStyle:'YMF001', doorFinish:'PWMF0047, PWMF0017', countertop:'PWTY1008' },
    description:'Stone-texture HPL with black open metal shelving framework. Height differences and multiple levels create purposeful storage division. Industrial spirit, refined execution.',
    features:['Black metal open shelving framework','Multi-level storage design','Stone-texture HPL doors','Glass-front cabinet inserts'],
    status:'In Stock' },

  { id:'k-cloud', sku:'CLOUD RETREAT', code:'PLCC21411', cat:['kitchen-hpl'],
    name:'Cloud Retreat', tagline:'White HPL — Brass-Frame Display Tower & Warm Glow',
    img:'/kitchen/thumbs/cloud_retreat.jpg', fullImg:'/kitchen/cloud_retreat.jpg',
    finish:'HPL', layout:'L-Shape + Island',
    dims:{ width:'3640mm', depth:'2670mm' },
    specs:{ doorStyle:'YMF018, YMF001', doorFinish:'PWMF0072, PWMF0074', countertop:'YTE002A, PWTE0036' },
    description:'Pure white HPL with a glowing brass-frame display tower. Warm amber shelf lighting turns every shelf into a stage. A kitchen of tranquil beauty.',
    features:['Brass-frame illuminated display tower','Amber-lit open shelving','White HPL clean door panels','Integrated island seating'],
    status:'In Stock' },

  { id:'k-zeppelin', sku:'ZEPPELIN', code:'PLCC21113', cat:['kitchen-hpl'],
    name:'Zeppelin', tagline:'Wood & Stone HPL — Straight-Line Industrial Palette',
    img:'/kitchen/thumbs/zeppelin.jpg', fullImg:'/kitchen/zeppelin.jpg',
    finish:'HPL', layout:'Straight Run',
    dims:{ width:'4590mm', depth:'580mm' },
    specs:{ doorStyle:'YMF001', doorFinish:'PWMF0064, PWMF0065', countertop:'PWTE0034' },
    description:'Walnut-tone HPL lower cabinets paired with dark stone-texture upper panels. Black metal open tower unit and integrated wine rack. Exactly the kind of kitchen that belongs in a design magazine.',
    features:['Walnut HPL lower doors','Dark stone-texture upper panels','Black metal display tower','Integrated wine rack column'],
    status:'In Stock' },

  // ── LACQUER ───────────────────────────────────────────────────────────────
  { id:'k-garden', sku:'SECRET GARDEN', code:'PLCC21043', cat:['kitchen-lacquer'],
    name:'Secret Garden', tagline:'Bordeaux Red Lacquer — Fluted Panels & Botanical Display',
    img:'/kitchen/thumbs/secret_garden.jpg', fullImg:'/kitchen/secret_garden.jpg',
    finish:'Lacquer', layout:'Island + Display Wall',
    dims:{ width:'4838mm', depth:'3638mm' },
    specs:{ doorStyle:'YMK148A/B, YMK001, YMK150A/B', doorFinish:'PWMK5001, PWMK2112', countertop:'PWTE0008' },
    description:'Rich bordeaux red lacquer with vertical fluted panels. The showpiece botanical glass display cabinet and circular pendant lighting make this kitchen an artistic installation.',
    features:['Botanical glass display cabinet','Vertical fluted red lacquer panels','Circular pendant statement lighting','Integrated appliance concealment'],
    status:'In Stock' },

  { id:'k-dreams', sku:'ENCHANTED DREAMS', code:'PLCC21325', cat:['kitchen-lacquer'],
    name:'Enchanted Dreams', tagline:'White & Charcoal Lacquer — Floating Island',
    img:'/kitchen/thumbs/enchanted_dreams.jpg', fullImg:'/kitchen/enchanted_dreams.jpg',
    finish:'Lacquer', layout:'L-Shape + Floating Island',
    dims:{ width:'3504mm', depth:'2482mm', island:'3080mm × 1104mm' },
    specs:{ doorStyle:'YMK146A, YMK146B', doorFinish:'PWMK3022', countertop:'YTE004, PWTE0007' },
    description:'Pure white lacquer cabinets with charcoal stone countertop and a sculptural floating island base. Clean lines, minimal handles, and an asymmetric island pedestal make a contemporary statement.',
    features:['Sculptural floating island base','Minimalist handleless doors','Asymmetric island design','LED toe-kick illumination'],
    status:'In Stock' },

  { id:'k-elysees', sku:'ELYSEES', code:'PLCC20016', cat:['kitchen-lacquer'],
    name:'Elysees', tagline:'Champagne Lacquer — Champagne Aluminium Frame Cabinets',
    img:'/kitchen/thumbs/elysees.jpg', fullImg:'/kitchen/elysees.jpg',
    finish:'Lacquer', layout:'U-Shape + Island',
    dims:{ width:'3796mm', depth:'2579mm', island:'948mm' },
    specs:{ doorStyle:'YMK001, YMC004', doorFinish:'PWMK1053, PWMC0032', countertop:'PWTE0005' },
    description:'A champagne lacquer and skin-tone palette with ultra-narrow aluminium frame upper cabinets. Refined and graceful — the kitchen equivalent of a Parisian boulevard stroll.',
    features:['Ultra-narrow aluminium frame uppers','Champagne tone lower doors','Walk-in appliance pantry','Integrated wine and display zone'],
    status:'In Stock' },

  // ── SPRAY LACQUER ─────────────────────────────────────────────────────────
  { id:'k-titian', sku:'TITIAN', code:'PLCC22196', cat:['kitchen-spray'],
    name:'Titian', tagline:'Bold Burgundy Spray Lacquer — White Island & Open Shelving',
    img:'/kitchen/thumbs/titian.jpg', fullImg:'/kitchen/titian.jpg',
    finish:'Spray Lacquer', layout:'L-Shape + Island',
    dims:{ width:'4089mm', depth:'3371mm' },
    specs:{ doorStyle:'YMK185A/YMK186A, YMK001G', doorFinish:'PWMK7004, PWMK7021', countertop:'PWTE0031' },
    description:'Confident burgundy-red spray lacquer towers paired with crisp white island. Gold accent open shelving adds warmth. A kitchen that announces itself with colour-confident character.',
    features:['Burgundy spray lacquer tall units','White handleless island','Gold open shelving accents','Marble backsplash panel'],
    status:'In Stock' },

  { id:'k-anne', sku:'ANNE', code:'PLCC22104', cat:['kitchen-spray'],
    name:'Anne', tagline:'Silver-Grey Spray Lacquer — Fluted Island & Gold Pendant',
    img:'/kitchen/thumbs/anne.jpg', fullImg:'/kitchen/anne.jpg',
    finish:'Spray Lacquer', layout:'G-Shape + Island',
    dims:{ width:'4654mm', depth:'2584mm', island:'2432mm' },
    specs:{ doorStyle:'YMK192, YMK188B, YMG173, YMK188A', doorFinish:'PWMK7020, PWMG0260', countertop:'PWTE0067' },
    description:'Silver-grey spray lacquer with a fluted vertical island front. Tall brass-framed display columns flank the run. Gold pendant lighting ties it together into one considered composition.',
    features:['Fluted vertical island front','Brass-frame display columns','Gold statement pendant lighting','LED under-island toe kick'],
    status:'In Stock' },

  { id:'k-tangula', sku:'TANGULA', code:'PLCC20032', cat:['kitchen-spray'],
    name:'Tangula', tagline:'Forest Green Spray Lacquer — Scandi-Industrial',
    img:'/kitchen/thumbs/tangula.jpg', fullImg:'/kitchen/tangula.jpg',
    finish:'Spray Lacquer', layout:'L-Shape',
    dims:{ width:'4057mm', depth:'560mm' },
    specs:{ doorStyle:'YMK122A', doorFinish:'PWMK7005, PWMA0122', countertop:'PWTE0008' },
    description:'Deep forest green spray lacquer with concealed handles and curved door profiles. Black metal-frame glass display upper cabinets. Scandi-industrial style with depth and personality.',
    features:['Concealed handle curved doors','Forest green spray lacquer','Black metal glass upper cabinets','Eco-friendly lacquer formulation'],
    status:'In Stock' },

  // ── UV LACQUER ────────────────────────────────────────────────────────────
  { id:'k-swanlake', sku:'SWAN LAKE', code:'PLCC21128', cat:['kitchen-uv'],
    name:'Swan Lake', tagline:'White UV Lacquer — Black Stone & Warm Accents',
    img:'/kitchen/thumbs/swan_lake.jpg', fullImg:'/kitchen/swan_lake.jpg',
    finish:'UV Lacquer', layout:'U-Shape + Island',
    dims:{ width:'5400mm', depth:'2650mm', island:'950mm × 560mm' },
    specs:{ doorStyle:'YMC018, YMK001', doorFinish:'PWMC0061, BWMK2011, PWMA0127', countertop:'PWTY1031' },
    description:'Pure white UV lacquer with black stone countertop and brass-tipped copper accents. The glass display column glows warm against the contrast. Quiet drama and refined elegance.',
    features:['Black stone countertop','Glass display column','Brass copper accent detailing','Pull-out dining peninsula'],
    status:'In Stock' },

  { id:'k-beirut', sku:'BEIRUT', code:'PLCC22194', cat:['kitchen-uv'],
    name:'Beirut', tagline:'Grey UV Lacquer — Curved Display Column & Round Dining',
    img:'/kitchen/thumbs/beirut.jpg', fullImg:'/kitchen/beirut.jpg',
    finish:'UV Lacquer', layout:'L-Shape + Island',
    dims:{ width:'3951mm', depth:'3242mm' },
    specs:{ doorStyle:'YMC003, YMG002, YMA001', doorFinish:'PWMC0112', countertop:'PWTE0031, PWTE0049' },
    description:'Cool grey UV lacquer with a remarkable arched display column as the centrepiece. The round black island dining table brings an unexpected circular contrast. Sophisticated and original.',
    features:['Arched illuminated display column','Round black island dining table','Brass-frame glass upper cabinets','Integrated appliance tower'],
    status:'In Stock' },

  { id:'k-magic', sku:'MAGIC Q IV', code:'PLCC21405', cat:['kitchen-uv'],
    name:'Magic Q IV', tagline:'Dark Green & Brass UV Lacquer — Social Kitchen',
    img:'/kitchen/thumbs/magic_q_iv.jpg', fullImg:'/kitchen/magic_q_iv.jpg',
    finish:'UV Lacquer', layout:'L-Shape + Island Dining',
    dims:{ width:'4240mm', depth:'2440mm' },
    specs:{ doorStyle:'YMC020, YMC010, YMC003, YMF001, YMA001', doorFinish:'PWMC0081', countertop:'PWTE0008' },
    description:'Dark emerald UV lacquer with brass-frame display cabinet. Designed for young households — the island includes a pull-out dining table for flexible social entertaining.',
    features:['Pull-out island dining table','Brass-frame glass display column','Dark emerald UV lacquer','Complete drawer organisation'],
    status:'In Stock' },

  { id:'k-serenade', sku:'SERENADE', code:'PLCC21339', cat:['kitchen-uv'],
    name:'Serenade', tagline:'Grey UV Lacquer & Oak — Minimalist Structure',
    img:'/kitchen/thumbs/serenade.jpg', fullImg:'/kitchen/serenade.jpg',
    finish:'UV Lacquer', layout:'L-Shape',
    dims:{ width:'4370mm', depth:'2480mm' },
    specs:{ doorStyle:'YMC003/YMC017, YMA001', doorFinish:'PWMC0060, PWMA0119', countertop:'PWTE0034' },
    description:'Neutral grey UV lacquer paired with warm oak lower drawers. Thickened glass-door shelves create structural geometry. Minimalism as a philosophy, executed with precision.',
    features:['Thickened glass-door wall shelves','Warm oak lower drawers','Narrow wall cabinet system','Integrated handle design'],
    status:'In Stock' },

  { id:'k-starry', sku:'STARRY', code:'PLCC22195', cat:['kitchen-uv'],
    name:'Starry', tagline:'Blue & White UV Lacquer — Brass Trim & White Stone Island',
    img:'/kitchen/thumbs/starry.jpg', fullImg:'/kitchen/starry.jpg',
    finish:'UV Lacquer', layout:'L-Shape + Island',
    dims:{ width:'4179mm', depth:'3259mm' },
    specs:{ doorStyle:'YMC003, YMA001', doorFinish:'PWMC0110, PWMC0111, PWMA0356', countertop:'PWTE0067' },
    description:'Ocean-blue lower cabinets with white upper cabinets in UV lacquer. Brass frame accents define the display zone. White stone island countertop reflects light beautifully.',
    features:['Ocean-blue and white two-tone','Brass trim accent frames','White stone island','Glass-front display upper'],
    status:'In Stock' },

  { id:'k-caddo', sku:'CADDO', code:'PLCC21347', cat:['kitchen-uv'],
    name:'Caddo', tagline:'Forest Green UV Lacquer — Mirror Surfaces & White Counter',
    img:'/kitchen/thumbs/caddo.jpg', fullImg:'/kitchen/caddo.jpg',
    finish:'UV Lacquer', layout:'L-Shape',
    dims:{ width:'4446mm', depth:'2238mm' },
    specs:{ doorStyle:'YMC003', doorFinish:'PWMC0064, PWMC0029', countertop:'PWTY1008' },
    description:'Deep forest green and white UV lacquer. Mirror-like surfaces catch and scatter light. L-shape open design with integrated drawer and ebound door makes storage effortless.',
    features:['Mirror-like UV surface','Forest green and white palette','L-shape open storage section','Pull-out side organiser'],
    status:'In Stock' },

  // ── MELAMINE ──────────────────────────────────────────────────────────────
  { id:'k-sherwood', sku:'SHERWOOD', code:'PLCC21182', cat:['kitchen-melamine'],
    name:'Sherwood', tagline:'Grey Stone Melamine — Metal Shelf Frames & Minimal White',
    img:'/kitchen/thumbs/sherwood.jpg', fullImg:'/kitchen/sherwood.jpg',
    finish:'Melamine', layout:'L-Shape',
    dims:{ width:'3348mm', depth:'3198mm' },
    specs:{ doorStyle:'YMA009, YMA001', doorFinish:'PWMA0212, BWMA0025', countertop:'PWTY1078' },
    description:'Light grey stone melamine with open metal shelf frameworks framing the space. A pure white central unit brings brightness. Modern minimalism blended with utilitarian structure.',
    features:['Open metal shelf frameworks','White feature unit insert','Grey stone melamine doors','LED shelf lighting'],
    status:'In Stock' },

  { id:'k-medellin', sku:'MEDELLIN', code:'PLCC22054', cat:['kitchen-melamine'],
    name:'Medellin', tagline:'Warm Timber Melamine — Pull-Out Island Dining Table',
    img:'/kitchen/thumbs/medellin.jpg', fullImg:'/kitchen/medellin.jpg',
    finish:'Melamine', layout:'L-Shape + Island',
    dims:{ width:'3130mm', depth:'4230mm' },
    specs:{ doorStyle:'YMA001', doorFinish:'PWMA0353, PWMA0354', countertop:'PWTE0049' },
    description:'Warm timber-grain melamine with integrated pull-out island dining table. Generous open shelving at cornice height stores display items. A family kitchen of substance and warmth.',
    features:['Pull-out island dining table','Warm timber grain melamine','Open cornice-height shelving','Integrated appliance column'],
    status:'In Stock' },

  { id:'k-camon', sku:'CAMON', code:'PLCC22046', cat:['kitchen-melamine'],
    name:'Camon', tagline:'Warm Taupe Melamine — Stone-Texture Lower & Glass Tower',
    img:'/kitchen/thumbs/camon.jpg', fullImg:'/kitchen/camon.jpg',
    finish:'Melamine', layout:'L-Shape',
    dims:{ width:'4116mm', depth:'2598mm' },
    specs:{ doorStyle:'YMA001', doorFinish:'PWMA0350, PWMA0351, PWMA0215', countertop:'PWTY1092' },
    description:'Warm taupe upper cabinets with stone-texture lower doors in melamine. A tall amber-lit glass display tower adds drama on the right. Clean, calm, and liveable.',
    features:['Stone-texture lower doors','Amber-lit glass display tower','Warm taupe upper cabinets','Recessed bar handle system'],
    status:'In Stock' },

  { id:'k-bandari', sku:'BANDARI', code:'PLCC21413', cat:['kitchen-melamine'],
    name:'Bandari', tagline:'Blue & Oak Melamine — Industrial Contrast',
    img:'/kitchen/thumbs/bandari.jpg', fullImg:'/kitchen/bandari.jpg',
    finish:'Melamine', layout:'L-Shape',
    dims:{ width:'3108mm', depth:'3466mm' },
    specs:{ doorStyle:'YMA001', doorFinish:'PWMA0258, PWMA0259', countertop:'PWTE0034' },
    description:'Metallic blue-grey melamine upper cabinets contrasted with natural grained oak lowers. Tall pantry column and slab countertop complete the industrial-meets-natural composition.',
    features:['Metallic blue-grey upper doors','Natural oak lower cabinets','Tall pantry column unit','Stone slab countertop'],
    status:'In Stock' },

  { id:'k-ellis', sku:'ELLIS', code:'PLCC20093', cat:['kitchen-melamine'],
    name:'Ellis', tagline:'White & Warm Oak Melamine — Nordic Wall System',
    img:'/kitchen/thumbs/ellis.jpg', fullImg:'/kitchen/ellis.jpg',
    finish:'Melamine', layout:'L-Shape + Wall System',
    dims:{ width:'3830mm', depth:'1830mm' },
    specs:{ doorStyle:'YMA001', doorFinish:'PWMA0131, PWMA0113', countertop:'PWTY1018' },
    description:'Pure white melamine with warm oak-grain chests. Ribbed glass upper cabinets and a wall-mounted rail system optimise every centimetre of space. Calm Nordic confidence.',
    features:['Ribbed glass upper cabinets','Warm oak chest of drawers','Wall-mounted rail system','Round hardware knobs'],
    status:'In Stock' },

  { id:'k-starto', sku:'STARTO', code:'PLCC22037', cat:['kitchen-melamine'],
    name:'Starto', tagline:'Blue & Cream Melamine — Gold Accents & Dining Island',
    img:'/kitchen/thumbs/starto.jpg', fullImg:'/kitchen/starto.jpg',
    finish:'Melamine', layout:'L-Shape + Island',
    dims:{ width:'3914mm', depth:'2518mm' },
    specs:{ doorStyle:'YMA079, YMA001', doorFinish:'PWMA0360, PWMA0352', countertop:'PWTE0068' },
    description:'Steel blue upper melamine and soft cream lower cabinets, accented with gold. A dining island with dark stone countertop and blue velvet seating makes this a complete living kitchen.',
    features:['Steel blue and cream palette','Gold accent elements','Dark stone island countertop','Blue velvet bar seating'],
    status:'In Stock' },

  { id:'k-montblanc', sku:'MONT BLANC', code:'PLCC18021', cat:['kitchen-melamine'],
    name:'Mont Blanc', tagline:'White & Oak Melamine — Open Shelf Island Kitchen',
    img:'/kitchen/thumbs/mont_blanc.jpg', fullImg:'/kitchen/mont_blanc.jpg',
    finish:'Melamine', layout:'L-Shape',
    dims:{ width:'4470mm', depth:'1650mm' },
    specs:{ doorStyle:'YMA001', doorFinish:'PWMA0060, PWMA0103', countertop:'PWTY1032' },
    description:'Simple and elegant white melamine with warm oak-look open shelving. A relaxed, unpretentious kitchen concept where form follows function and natural light does the heavy lifting.',
    features:['White and oak melamine palette','Open shelf display zone','Integrated dining table','Colourful kitchen accessory styling'],
    status:'In Stock' },

  { id:'k-gluck', sku:'GLUCK', code:'PLCC21412', cat:['kitchen-melamine'],
    name:'Gluck', tagline:'Golden Oak Melamine — Stone Texture & Minimalist Form',
    img:'/kitchen/thumbs/gluck.jpg', fullImg:'/kitchen/gluck.jpg',
    finish:'Melamine', layout:'Straight + L Return',
    dims:{ width:'4390mm', depth:'1700mm', island:'750mm' },
    specs:{ doorStyle:'YMA001', doorFinish:'PWMA0256, PWMA0257', countertop:'PWTY1077' },
    description:'Golden oak grain paired with matte plain stone texture in melamine. Open overhead shelving and pull-out pantry column. A kitchen of genuine warmth and considered simplicity.',
    features:['Golden oak grain doors','Matte stone texture panels','Pull-out pantry column','Open overhead shelving display'],
    status:'In Stock' },

  // ── PVC FOIL ──────────────────────────────────────────────────────────────
  { id:'k-nottinghill', sku:'NOTTING HILL', code:'PLCC21409', cat:['kitchen-pvc'],
    name:'Notting Hill', tagline:'Titanium PVC Foil — Warm Industrial Luxury',
    img:'/kitchen/thumbs/notting_hill.jpg', fullImg:'/kitchen/notting_hill.jpg',
    finish:'PVC Foil', layout:'Straight Run',
    dims:{ width:'4528mm', depth:'2649mm' },
    specs:{ doorStyle:'YMG116, YMG002, YMA001, YMK001', doorFinish:'PWMG0210, PWMG0209', countertop:'PWTE0022' },
    description:'Polished titanium-gold PVC foil immediately brightens the room. Contrasting taupe-grey lower cabinets and open shelving. Warm yet industrial — broadly appealing without being generic.',
    features:['Titanium gold PVC foil finish','Taupe-grey lower cabinets','Open display shelving system','Gold-tone hardware'],
    status:'In Stock' },

  { id:'k-manzanillo', sku:'MANZANILLO', code:'PLCC20101', cat:['kitchen-pvc'],
    name:'Manzanillo', tagline:'Cream PVC Foil — Classic Frame Doors & Brass Accents',
    img:'/kitchen/thumbs/manzanillo.jpg', fullImg:'/kitchen/manzanillo.jpg',
    finish:'PVC Foil', layout:'L-Shape',
    dims:{ width:'4454mm', depth:'2449mm', island:'585mm' },
    specs:{ doorStyle:'YMG088', doorFinish:'PWMG0061', countertop:'PWTY1031' },
    description:'Light cream PVC foil with classic panelled frame doors and ribbed glass inserts. Brushed brass hardware ties the composition. Timeless heritage style at an accessible price point.',
    features:['Classic panelled frame doors','Ribbed glass upper inserts','Brushed brass hardware','Matt and soft texture finish'],
    status:'In Stock' },

  { id:'k-cezanne', sku:'CEZANNE', code:'PLCC22092', cat:['kitchen-pvc'],
    name:'Cezanne', tagline:'Charcoal & Bronze PVC Foil — Luxury Marble & Island',
    img:'/kitchen/thumbs/cezanne.jpg', fullImg:'/kitchen/cezanne.jpg',
    finish:'PVC Foil', layout:'L-Shape + Island',
    dims:{ width:'2949mm', depth:'3797mm', island:'2249mm' },
    specs:{ doorStyle:'YMG168, YMG167', doorFinish:'PWMG0254, PWMG0255, PWMA0269', countertop:'PWTE0048' },
    description:'Charcoal upper PVC foil with warm bronze-toned lower cabinets. Amber-lit open shelving extends the warmth. The white marble island countertop provides the perfect contrast.',
    features:['Charcoal upper and bronze lower','Amber-lit open shelving','White marble island countertop','Undermount sink with quartz'],
    status:'In Stock' },

  { id:'k-bernard', sku:'BERNARD', code:'PLCC22094', cat:['kitchen-pvc'],
    name:'Bernard', tagline:'Taupe PVC Foil — Floor-to-Ceiling Pantry & Curved Island',
    img:'/kitchen/thumbs/bernard.jpg', fullImg:'/kitchen/bernard.jpg',
    finish:'PVC Foil', layout:'L-Shape + Island',
    dims:{ width:'3524mm', depth:'2966mm', island:'2556mm' },
    specs:{ doorStyle:'YMG174, YMG175', doorFinish:'PWMG0260, PWMG0261', countertop:'PWTE0070' },
    description:'Warm taupe PVC foil with floor-to-ceiling refrigerator pantry column and curved oval island. LED inlay detailing in the horizontal run adds quiet luxury.',
    features:['Floor-to-ceiling pantry column','Oval curved island','LED horizontal inlay detail','Warm taupe tone throughout'],
    status:'In Stock' },

  { id:'k-dewroma', sku:'DEWROMA', code:'PLCC22101', cat:['kitchen-pvc'],
    name:'Dewroma', tagline:'Cream & Bronze PVC Foil — Fluted Panels & Folding Island',
    img:'/kitchen/thumbs/dewroma.jpg', fullImg:'/kitchen/dewroma.jpg',
    finish:'PVC Foil', layout:'L-Shape + Island',
    dims:{ width:'4735mm', depth:'2885mm', island:'2176mm × 834mm' },
    specs:{ doorStyle:'YMG170, YMG171, YMG172, YMG139', doorFinish:'PWMG0257, PWMG0266, PWMG0258', countertop:'YTE001G, PWTE0030' },
    description:'Cream PVC foil with distinctive vertical fluted bronze-tone upper panels. Gold coin hardware adds richness. The folding island extension transforms the layout from prep to hosting effortlessly.',
    features:['Vertical fluted bronze upper panels','Gold coin hardware detail','Folding island extension','Marble-veined worktop'],
    status:'In Stock' },

  // ── PP FOIL ───────────────────────────────────────────────────────────────
  { id:'k-nicaea', sku:'NICAEA', code:'PLCC14035', cat:['kitchen-pp'],
    name:'Nicaea', tagline:'PP Foil Wood-Grain — Traditional Country House Kitchen',
    img:'/kitchen/thumbs/nicaea.jpg', fullImg:'/kitchen/nicaea.jpg',
    finish:'PP Foil', layout:'U-Shape',
    dims:{ width:'3760mm', depth:'2970mm', island:'570mm' },
    specs:{ doorStyle:'YMD007', doorFinish:'PWMD0005', countertop:'PWTY1011' },
    description:'PP foil with astonishingly authentic wood grain texture. Lattice-insert doors, classic hardware, and traditional country-house mouldings make this the warmest kitchen in the collection.',
    features:['Authentic PP foil wood grain','Lattice insert door panels','Traditional hardware','Country moulding cornice'],
    status:'In Stock' },
];
