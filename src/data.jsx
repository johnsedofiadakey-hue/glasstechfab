import React from 'react';
import { DollarSign, Eye, MessageSquare, CheckCircle, Users } from 'lucide-react';

export const PROJECT_STAGES = [
  { id: 1, name: 'Discovery & Consultation', days: 7, color: '#C8A96E' },
  { id: 2, name: 'Concept & Moodboard', days: 14, color: '#9D845E' },
  { id: 3, name: 'Technical Design/3D', days: 21, color: '#726045' },
  { id: 4, name: 'Procurement & Logistics', days: 30, color: '#473C2C' },
  { id: 5, name: 'On-Site Construction', days: 45, color: '#1A1410' },
  { id: 6, name: 'Styling & Furniture', days: 10, color: '#B5AFA9' },
  { id: 7, name: 'Handover & Final Reveal', days: 5, color: '#16A34A' }
];

export const ABOUT_DATA = {
  founder: 'Ama Asante',
  role: 'Founder & Creative Director',
  storyTitle: 'Founded in Accra.',
  story: 'LuxeSpace Interiors is a premier interior design company in Ghana, specialising in both interior and exterior design for commercial and residential projects. We believe that a space should not only be beautiful and inviting but also practical and user-friendly.',
  bio: 'Our mission is to create bespoke interiors that combine comfort, style, sophistication, and practicality — fully reflecting our clients\' needs and dreams.',
  image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80'
};

export const BOOKING_SLOTS = ['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM'];

export const BOOKINGS_DATA = [
  {id:'BK-001',client:'Abena Mensah',clientEmail:'client@luxespace.com',type:'Design Consultation',date:'2026-03-15',time:'10:00 AM',duration:60,status:'Confirmed',notes:'Initial walkthrough of East Legon property',av:'AM'},
  {id:'BK-002',client:'Kofi Asante',clientEmail:'kofi@asante.com',type:'Progress Review',date:'2026-03-18',time:'2:00 PM',duration:45,status:'Confirmed',notes:'Q1 office fit-out progress review',av:'KA'},
  {id:'BK-003',client:'Akua Boateng',clientEmail:'akua@boutique.com',type:'Material Selection',date:'2026-03-22',time:'11:00 AM',duration:90,status:'Pending',notes:'Fabric and fixture selection for boutique',av:'AB'},
  {id:'BK-004',client:'Yaw Darko',clientEmail:'yaw@darko.gh',type:'Discovery Call',date:'2026-03-28',time:'3:00 PM',duration:30,status:'Requested',notes:'Initial discussion for Airport Hills project',av:'YD'},
  {id:'BK-005',client:'Abena Mensah',clientEmail:'client@luxespace.com',type:'Final Reveal',date:'2026-04-05',time:'9:00 AM',duration:120,status:'Confirmed',notes:'Grand reveal of completed East Legon home',av:'AM'},
];

export const EMAIL_QUEUE = [
  {id:'EM-001',type:'proposal_sent',to:'client@luxespace.com',toName:'Abena Mensah',subject:'Your Design Proposal is Ready — LuxeSpace',status:'Sent',sentAt:'Mar 14, 10:32 AM',proposalId:'PRO-001'},
  {id:'EM-002',type:'invoice_due',to:'akua@boutique.com',toName:'Akua Boateng',subject:'Invoice INV-003 Due in 3 Days',status:'Sent',sentAt:'Mar 15, 9:00 AM',invoiceId:'INV-003'},
  {id:'EM-003',type:'booking_confirmed',to:'client@luxespace.com',toName:'Abena Mensah',subject:'Booking Confirmed — March 15 at 10:00 AM',status:'Sent',sentAt:'Mar 10, 2:15 PM',bookingId:'BK-001'},
  {id:'EM-004',type:'welcome',to:'yaw@darko.gh',toName:'Yaw Darko',subject:'Welcome to LuxeSpace — Your Project Journey Begins',status:'Sent',sentAt:'Mar 8, 11:00 AM'},
  {id:'EM-005',type:'invoice_due',to:'yaw@darko.gh',toName:'Yaw Darko',subject:'Invoice INV-004 — Payment Reminder',status:'Scheduled',sentAt:'Mar 29, 9:00 AM',invoiceId:'INV-004'},
  {id:'EM-006',type:'proposal_sent',to:'yaw@darko.gh',toName:'Yaw Darko',subject:'Your Design Proposal is Ready — LuxeSpace',status:'Draft',sentAt:'',proposalId:'PRO-004'},
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
  {stage:'Leads',count:14,value:'$84,000'},
  {stage:'Proposals Sent',count:11,value:'$197,500'},
  {stage:'Accepted',count:7,value:'$155,000'},
  {stage:'Invoiced',count:5,value:'$112,000'},
  {stage:'Collected',count:4,value:'$89,500'},
];

export const TOP_SERVICES = [
  {name:'Residential Design',revenue:180000,projects:8,pct:47},
  {name:'Commercial Spaces',revenue:120000,projects:3,pct:31},
  {name:'Styling & Staging',revenue:52000,projects:11,pct:14},
  {name:'Consultation',revenue:30000,projects:22,pct:8},
];

export const BRAND0 = {
  name:'LuxeSpace Interiors',
  tagline:'Crafting Spaces That Tell Your Story',
  logo:null,
  color:'#C8A96E',
  phone:'+233 24 000 0000',
  email:'hello@luxespace.com',
  location:'Airport City, Accra, Ghana',
  instagram:'@luxespace_interiors',
  facebook:'LuxeSpaceInteriors',
  twitter:'@luxespace',
  linkedin:'luxespace-interiors',
  whatsapp:'+233240000000',
  website:'www.luxespace.com'
};

export const TEAM_MEMBERS = [
  {id:1,name:'Ama Asante',role:'Founder & Creative Director',bio:'15 years shaping luxury interiors across West Africa. Trained at Central Saint Martins, London.',img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',av:'AA',email:'ama@luxespace.com',phone:'+233 24 111 0001',status:'Online'},
  {id:2,name:'Kwame Osei',role:'Senior Interior Designer',bio:'Specialises in commercial and hospitality spaces with a bold, contemporary Afro-modern vision.',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',av:'KO',email:'kwame@luxespace.com',phone:'+233 24 111 0002',status:'Online'},
  {id:3,name:'Abena Darko',role:'Project Manager',bio:'Keeps every project on time and within budget. Expert in procurement and contractor coordination.',img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',av:'AD',email:'abena@luxespace.com',phone:'+233 24 111 0003',status:'Idle'},
  {id:4,name:'Nana Boateng',role:'3D Visualisation Artist',bio:'Creates photo-realistic renders that help clients fall in love with their space before a single item is moved.',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',av:'NB',email:'nana@luxespace.com',phone:'+233 24 111 0004',status:'Idle'},
];

export const PORTFOLIO_DATA = [
  {id:1,title:'The Volta Residence',cat:'Residential',after:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80',before:'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80',year:'2024',loc:'East Legon, Accra',area:'4,200 sq ft',duration:'5 months',budget:'$95,000',style:'Contemporary Luxury',hasBA:true,desc:'A complete transformation of a 4-bedroom family home in East Legon. Warm Ghanaian heritage meets clean, modern luxury.',imgs:['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80','https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80']},
  {id:2,title:'Accra Heights Penthouse',cat:'Residential',after:'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80',before:'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80',year:'2024',loc:'Airport Hills',area:'3,100 sq ft',duration:'4 months',budget:'$72,000',style:'Minimalist',hasBA:true,desc:'A sky-high penthouse redesigned for a young executive.',imgs:['https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80','https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80']},
  {id:3,title:'Labone Kitchen Suite',cat:'Kitchen',after:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80',before:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',year:'2023',loc:'Labone',area:'580 sq ft',duration:'6 weeks',budget:'$38,000',style:'Contemporary',hasBA:false,desc:'A chef\'s kitchen with Calacatta marble and German appliances.',imgs:['https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80']},
  {id:4,title:'Cantonments Spa Retreat',cat:'Bathroom',after:'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900&q=80',before:'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80',year:'2024',loc:'Cantonments',area:'280 sq ft',duration:'4 weeks',budget:'$22,000',style:'Spa & Wellness',hasBA:false,desc:'A master bathroom transformed into a five-star spa.',imgs:['https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900&q=80']},
  {id:5,title:'The Ridge Dining Room',cat:'Dining',after:'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80',before:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',year:'2023',loc:'Ridge, Accra',area:'420 sq ft',duration:'5 weeks',budget:'$18,000',style:'Eclectic',hasBA:false,desc:'A dramatic dining room for entertaining.',imgs:['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80']},
  {id:6,title:'Airport Hills Lounge',cat:'Commercial',after:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80',before:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80',year:'2025',loc:'Airport Hills',area:'1,200 sq ft',duration:'8 weeks',budget:'$64,000',style:'Afro-Modern Corporate',hasBA:false,desc:'A corporate lounge that communicates confidence.',imgs:['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80']},
];

export const SERVICES_DATA = [
  {id:'residential',icon:'🏠',name:'Residential Design',short:'Full-home transformations tailored to your lifestyle.',catLabel:'Home Spaces',desc:'We believe your home should be the truest expression of who you are. Our residential design service takes you from bare walls to a fully realised, deeply personal living environment.',packages:[{name:'Essential',price:'$5,000',includes:['2 consultation sessions','Concept moodboard','Furniture & colour plan','Procurement guidance'],popular:false},{name:'Complete',price:'$18,000',includes:['Everything in Essential','Full 3D visualisation','Supplier management','Installation oversight','Styling & dressing'],popular:true},{name:'Signature',price:'From $40,000',includes:['Everything in Complete','Custom joinery design','Bespoke furniture commissioning','Art curation','White-glove installation'],popular:false}],process:['Discovery & Briefing','Concept Development','3D Visualisation','Procurement','Installation','Final Reveal'],gallery:['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80','https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80']},
  {id:'commercial',icon:'🏢',name:'Commercial Spaces',short:'Offices and hospitality environments that perform.',catLabel:'Commercial',desc:'Great commercial spaces do more than look good — they perform. We design offices, restaurants, retail stores, and hospitality environments that communicate your brand values.',packages:[{name:'Studio',price:'$15,000',includes:['Space planning','Concept design','Specification schedule','Contractor briefing pack'],popular:false},{name:'Business',price:'$45,000',includes:['Everything in Studio','Full 3D renders','Supplier coordination','Site supervision'],popular:true},{name:'Enterprise',price:'Custom',includes:['Everything in Business','Phased rollout','Multi-site consistency','Post-occupancy evaluation'],popular:false}],process:['Brand Discovery','Space Planning','Concept & Render','Procurement','Build Oversight','Evaluation'],gallery:['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80','https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80']},
  {id:'consultation',icon:'💡',name:'Design Consultation',short:'Expert creative direction when you need a second eye.',catLabel:'Advisory',desc:'Sometimes you just need a trusted expert in the room. Our consultation service gives you direct access to our senior designers for focused, practical guidance.',packages:[{name:'Single Session',price:'$500',includes:['2-hour in-person session','Written recommendations','Material & supplier shortlist'],popular:false},{name:'Design Sprint',price:'$1,800',includes:['4 sessions over 2 weeks','Moodboard & concept direction','Procurement list','Follow-up support'],popular:true},{name:'Ongoing Advisory',price:'$3,500/mo',includes:['Unlimited email access','Monthly 2-hour session','Priority scheduling','Supplier introductions'],popular:false}],process:['Questionnaire','Site Visit','Assessment','Action Plan','Follow-up'],gallery:['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80']},
  {id:'styling',icon:'✨',name:'Styling & Staging',short:'Curated finishing touches that transform a space instantly.',catLabel:'Finishing',desc:'The difference between a beautiful room and an extraordinary one often comes down to the final layer. Our styling service curates furniture, art, textiles, and accessories.',packages:[{name:'Refresh',price:'$2,000',includes:['Half-day styling session','Accessory & soft furnishing plan','Shopping list'],popular:false},{name:'Full Styling',price:'$6,000',includes:['Full-day session','Art & object sourcing','Furniture repositioning','Photography-ready dressing'],popular:true},{name:'Staging',price:'$4,500',includes:['Property staging','Full furniture supply','Professional photography brief','Post-shoot breakdown'],popular:false}],process:['Assessment','Style Direction','Sourcing','Installation','Photography'],gallery:['https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80','https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80']},
];

export const AWARDS = [
  {year:'2024',name:'Best Residential Interior — West Africa',org:'African Design Awards'},
  {year:'2023',name:'Luxury Interior Studio of the Year',org:'Ghana Property Awards'},
  {year:'2023',name:'Sustainable Design Excellence',org:'Green Building Council Ghana'},
  {year:'2022',name:'Outstanding Commercial Transformation',org:'Accra Business Design Forum'},
];

export const CLIENTS_DATA = [
  {id:1,name:'Abena Mensah',email:'client@luxespace.com',phone:'+233 24 111 2222',loc:'East Legon',status:'Active',project:'Full Home Redesign',budget:'$45,000',joined:'2024-01-15',av:'AM',progress:65,milestones:[{label:'Initial Consultation',done:true,date:'Jan 15'},{label:'Concept Approval',done:true,date:'Jan 28'},{label:'Procurement',done:true,date:'Feb 10'},{label:'Installation',done:false,date:'Mar 05'},{label:'Final Reveal',done:false,date:'Mar 20'}],tasks:[{id:1,title:'Finalise marble selection',priority:'High',status:'Pending',assignee:'KO',due:'2025-03-28'},{id:2,title:'Confirm delivery date for sofa',priority:'Medium',status:'In Progress',assignee:'AD',due:'2025-03-30'},{id:3,title:'Schedule electrician',priority:'High',status:'Pending',assignee:'AD',due:'2025-04-02'},{id:4,title:'Review 3D renders — bedroom 2',priority:'Low',status:'Done',assignee:'NB',due:'2025-03-20'}],files:[{name:'Signed Contract.pdf',type:'pdf',size:'1.2 MB',date:'Jan 15'},{name:'Concept Moodboard v2.pdf',type:'pdf',size:'8.4 MB',date:'Jan 28'},{name:'Floor Plan — Final.dwg',type:'dwg',size:'3.1 MB',date:'Feb 05'}],moodboards:[{id:1,title:'Living Room Concept A',img:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',status:'approved',note:'Love the warm palette'},{id:2,title:'Living Room Concept B',img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',status:'rejected',note:'Too dark for the space'},{id:3,title:'Master Bedroom Direction',img:'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=80',status:'pending',note:''}],messages:[{id:1,from:'team',sender:'Ama Asante',text:'Hi Abena! The marble samples have arrived. Can you come in Thursday?',time:'10:32 AM',date:'Today'},{id:2,from:'client',sender:'Abena',text:'Thursday works! I\'ll be there by 2pm.',time:'11:05 AM',date:'Today'},{id:3,from:'team',sender:'Kwame Osei',text:'Perfect! I\'ll have the full kitchen concept ready too.',time:'11:18 AM',date:'Today'}]},
  {id:2,name:'Kofi Asante',email:'kofi@asante.com',phone:'+233 20 333 4444',loc:'Cantonments',status:'Completed',project:'Office Fit-out',budget:'$120,000',joined:'2023-11-20',av:'KA',progress:100,milestones:[{label:'Initial Consultation',done:true,date:'Nov 20'},{label:'Concept Approval',done:true,date:'Dec 01'},{label:'Procurement',done:true,date:'Dec 15'},{label:'Installation',done:true,date:'Jan 10'},{label:'Final Reveal',done:true,date:'Jan 25'}],tasks:[],files:[],moodboards:[],messages:[]},
  {id:3,name:'Akua Boateng',email:'akua@boutique.com',phone:'+233 27 555 6666',loc:'Osu',status:'Active',project:'Boutique Redesign',budget:'$28,000',joined:'2024-03-05',av:'AB',progress:35,milestones:[{label:'Initial Consultation',done:true,date:'Mar 05'},{label:'Concept Approval',done:true,date:'Mar 18'},{label:'Procurement',done:false,date:'Apr 01'},{label:'Installation',done:false,date:'Apr 20'},{label:'Final Reveal',done:false,date:'May 05'}],tasks:[{id:5,title:'Confirm tile supplier',priority:'High',status:'Pending',assignee:'AD',due:'2025-04-01'}],files:[{name:'Boutique Brief.pdf',type:'pdf',size:'2.1 MB',date:'Mar 05'}],moodboards:[{id:4,title:'Boutique Concept',img:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',status:'pending',note:''}],messages:[]},
  {id:4,name:'Yaw Darko',email:'yaw@darko.gh',phone:'+233 24 777 8888',loc:'Airport Hills',status:'Lead',project:'Consultation',budget:'TBD',joined:'2025-01-10',av:'YD',progress:0,milestones:[{label:'Initial Consultation',done:false,date:'TBD'},{label:'Concept Approval',done:false,date:'TBD'},{label:'Procurement',done:false,date:'TBD'},{label:'Installation',done:false,date:'TBD'},{label:'Final Reveal',done:false,date:'TBD'}],tasks:[],files:[],moodboards:[],messages:[]},
];

export const PROPOSALS_DATA = [
  {id:'PRO-001',client:'Abena Mensah',clientEmail:'client@luxespace.com',title:'Full Home Redesign — East Legon',amount:'$45,000',status:'Accepted',date:'2024-01-20',valid:'2024-02-20',items:[{desc:'Design Consultation & Concept',qty:1,rate:'$5,000',total:'$5,000'},{desc:'Living Room Transformation',qty:1,rate:'$12,000',total:'$12,000'},{desc:'Master Suite Redesign',qty:1,rate:'$15,000',total:'$15,000'},{desc:'Kitchen & Dining Refresh',qty:1,rate:'$8,000',total:'$8,000'},{desc:'Styling & Accessories',qty:1,rate:'$5,000',total:'$5,000'}],notes:'50% deposit required to commence.'},
  {id:'PRO-002',client:'Kofi Asante',clientEmail:'kofi@asante.com',title:'Corporate Office Transformation',amount:'$120,000',status:'Completed',date:'2023-11-25',valid:'2023-12-25',items:[{desc:'Full Office Interior Design',qty:1,rate:'$120,000',total:'$120,000'}],notes:''},
  {id:'PRO-003',client:'Akua Boateng',clientEmail:'akua@boutique.com',title:'Boutique Interior Redesign',amount:'$28,000',status:'Accepted',date:'2024-03-10',valid:'2024-04-10',items:[{desc:'Boutique Full Redesign',qty:1,rate:'$28,000',total:'$28,000'}],notes:''},
  {id:'PRO-004',client:'Yaw Darko',clientEmail:'yaw@darko.gh',title:'Airport Hills Lounge Consultation',amount:'$2,500',status:'Sent',date:'2025-01-15',valid:'2025-02-15',items:[{desc:'Design Consultation (4 sessions)',qty:4,rate:'$625',total:'$2,500'}],notes:''},
];

export const INVOICES_DATA = [
  {id:'INV-001',client:'Abena Mensah',clientEmail:'client@luxespace.com',title:'Home Redesign — 50% Deposit',amount:'$22,500',status:'Paid',date:'2024-01-25',due:'2024-02-25'},
  {id:'INV-002',client:'Kofi Asante',clientEmail:'kofi@asante.com',title:'Office Fit-out — Final Payment',amount:'$60,000',status:'Paid',date:'2024-01-05',due:'2024-01-20'},
  {id:'INV-003',client:'Akua Boateng',clientEmail:'akua@boutique.com',title:'Boutique Redesign — Initial Deposit',amount:'$8,400',status:'Pending',date:'2024-03-15',due:'2024-04-01'},
  {id:'INV-004',client:'Yaw Darko',clientEmail:'yaw@darko.gh',title:'Design Consultation Fee',amount:'$2,500',status:'Draft',date:'2025-01-15',due:'2025-01-30'},
];

export const WORKSPACES_DATA = [
  {id:'ws1',name:'LuxeSpace Interiors',owner:'admin@luxespace.com',plan:'Pro',status:'Active',since:'Jan 2024',clients:28,revenue:'$245,000',color:'#C8A96E'},
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
  {img:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',headline:'Beautiful Living\nSolutions.',sub:'Transforming interiors into extraordinary environments tailored just for you.'},
  {img:'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1600&q=80',headline:'Beautiful Design\nInnovation.',sub:'A design firm that adds depth and dimension to every creation, crafted for you.'},
  {img:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80',headline:'Beautiful Spaces\nExtraordinary.',sub:'From residential homes to landmark commercial interiors across West Africa.'},
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
  {n:'01',title:'Tailored Designs for Unique Lifestyles',body:'We spend time truly understanding you — your lifestyle, your taste, your vision — before a single concept is drawn.'},
  {n:'02',title:'Latest Design Technology',body:'Utilizing the latest 3D visualisation software, we give you photo-realistic renders before a single item is moved.'},
  {n:'03',title:'Meticulous Attention to Detail',body:'From selecting materials to the final finishing touches, every element is chosen and placed with intention.'},
  {n:'04',title:'Commitment to Quality',body:'High-quality materials, trusted suppliers, and experienced artisans ensure your space lasts as beautifully as it begins.'},
  {n:'05',title:'End-to-End Project Management',body:'From concept to final reveal, we manage every detail — suppliers, contractors, timelines — so you don\'t have to.'},
];

export const PROCESS_STEPS = [
  {n:'01',title:'Book a Consultation',body:'Tell us about your space and vision. We meet in-person or virtually to understand your needs, budget, and style.',img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'},
  {n:'02',title:'Concept & Design',body:'We develop a full design concept — moodboards, layouts, material selections — and present it for your approval.',img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80'},
  {n:'03',title:'3D Visualisation',body:'Before anything is purchased or installed, we show you exactly what your space will look like in photo-realistic 3D.',img:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=80'},
  {n:'04',title:'Final Reveal',body:'We manage procurement, contractors, and installation. On reveal day, your extraordinary new space is ready.',img:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80'},
];
