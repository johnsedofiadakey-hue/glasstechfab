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
