/* 
========================================================================
   GLASSTECH LUXURY 3D TOUR - APPLICATION ENGINE (VANILLA JS + THREE.JS)
========================================================================
*/

// --- 1. ROOM & ASSET SPECIFICATION DATA ---
const roomData = {
  living: {
    title: "Ultra-Luxury Living Room",
    category: "Lounge & Reception",
    image: "assets/living_after.png",
    beforeImage: "assets/living_before.png",
    description: "A breathtaking high-ceiling architectural masterpiece. We replaced standard unrenovated solid masonry with premium double-glazed folding glass facades, merging interior elegance with an unblocked view of the lush tropical pool courtyard.",
    features: [
      {
        id: "living-facade",
        title: "Floor-to-Ceiling Slimline Facade",
        badge: "Structural Glass",
        desc: "Custom structural double-glazed glass sliding panels. Features supreme wind-load resistance, complete heat insulation, and sound dampening to block external noise.",
        image: "assets/living_after.png"
      },
      {
        id: "living-railing",
        title: "Frameless Mezzanine Glass Balustrade",
        badge: "Tempered Glass",
        desc: "15mm extra-clear toughened laminated glass with hidden bottom-channel fixtures. Provides robust safety with a floating, seamless visual aesthetic.",
        image: "assets/living_after.png"
      },
      {
        id: "living-partition",
        title: "Switchable Smart-Glass Partition",
        badge: "Smart Home Tech",
        desc: "Electronic privacy partition that transitions from crystal clear to frosted white at the touch of a button, separating the foyer from the central lounge.",
        image: "assets/living_after.png"
      }
    ],
    hotspots: [
      { x: -450, y: 50, z: -200, title: "Slimline Glass Facade", featureId: "living-facade" },
      { x: -150, y: 280, z: 250, title: "Mezzanine Glass Balustrade", featureId: "living-railing" },
      { x: 300, y: 80, z: -350, title: "Smart Glass Partition", featureId: "living-partition" }
    ],
    defaultYaw: Math.PI * 0.9,
    defaultPitch: 0
  },
  kitchen: {
    title: "Gourmet Chef's Kitchen",
    category: "Culinary Suite",
    image: "assets/kitchen_after.png",
    description: "A professional-grade culinary sanctuary highlighting premium dark marble features, warm mahogany detailing, and exquisite, glass-front display overhead cabinetry.",
    features: [
      {
        id: "kitchen-cabinets",
        title: "Warm-Lit Glass Front Cabinets",
        badge: "Interior Glass",
        desc: "Bronze reflection glass cabinet doors with ultra-slim black anodized aluminium profiles. Integrated 2700K warm LED strip illumination beautifully showcases glassware.",
        image: "assets/kitchen_after.png"
      },
      {
        id: "kitchen-partition",
        title: "Tempered Smart Glass Divider",
        badge: "Smart Partition",
        desc: "A custom acoustic glass divider separating the kitchen cooking area from the dining room, blocking cooking fumes and noise while maintaining absolute transparency.",
        image: "assets/kitchen_after.png"
      }
    ],
    hotspots: [
      { x: 420, y: 150, z: 200, title: "Illuminated Glass Cabinets", featureId: "kitchen-cabinets" },
      { x: -350, y: 100, z: 200, title: "Smart Glass Divider", featureId: "kitchen-partition" }
    ],
    defaultYaw: Math.PI * 0.5,
    defaultPitch: 0
  },
  bedroom: {
    title: "Master Sanctuary Bedroom",
    category: "Private Suite",
    image: "assets/bedroom_after.png",
    description: "An oasis of absolute comfort and luxury. Huge wrap-around floor-to-ceiling glass sliding doors invite the golden colors of the sunset inside, opening onto a private balcony.",
    features: [
      {
        id: "bedroom-facade",
        title: "Panoramic Balcony Glass Sliding Doors",
        badge: "Soundproof Double-Glazing",
        desc: "12mm acoustic double-glazed panels with multi-point heavy-duty locks. Blocks outside noise by up to 45dB, creating a serene, peaceful sleep sanctuary.",
        image: "assets/bedroom_after.png"
      },
      {
        id: "bedroom-wardrobe",
        title: "Smoked-Glass Walk-In Entryway",
        badge: "Glass Wardrobe",
        desc: "Custom wardrobes with smoked tempered glass doors. Accented with warm interior strip lighting, projecting a high-fashion boutique showroom feel.",
        image: "assets/bedroom_after.png"
      }
    ],
    hotspots: [
      { x: -450, y: 50, z: -180, title: "Double-Glazed Sliding Doors", featureId: "bedroom-facade" },
      { x: 420, y: 50, z: -150, title: "Smoked Glass Wardrobe Doors", featureId: "bedroom-wardrobe" }
    ],
    defaultYaw: Math.PI * 0.95,
    defaultPitch: 0
  },
  washroom: {
    title: "Spa Bathroom Retreat",
    category: "Wellness Oasis",
    image: "assets/washroom_after.png",
    description: "A luxury wet-room detailing natural organic textures, gold hardware, a freestanding marble tub, and a giant picture window looking onto a private tropical rock wall.",
    features: [
      {
        id: "washroom-shower",
        title: "Frameless Walk-in Shower Enclosure",
        badge: "Shower Screen",
        desc: "10mm extra-clear tempered glass treated with EnduroShield hydrophobic nanotechnology to resist water stains and lime scale, paired with elegant brass-gold hardware.",
        image: "assets/washroom_after.png"
      },
      {
        id: "washroom-smart",
        title: "Landscape Privacy Smart Glass Panel",
        badge: "Electronic Switchable",
        desc: "A massive panoramic window overlooking the tropical courtyard. Instantly switches from fully transparent to complete frosted privacy for secure bathing comfort.",
        image: "assets/washroom_after.png"
      }
    ],
    hotspots: [
      { x: -350, y: 80, z: -250, title: "Frameless Shower Glass", featureId: "washroom-shower" },
      { x: 380, y: 20, z: 250, title: "Courtyard Smart Window", featureId: "washroom-smart" }
    ],
    defaultYaw: Math.PI * 0.45,
    defaultPitch: 0
  },
  closet: {
    title: "Bespoke Walk-in Closet",
    category: "Dressing Suite",
    image: "assets/closet_after.png",
    description: "Designed for premium storage. Glass wardrobing provides perfect clothes organization, paired with a central jewelry display cabinet illuminated like a boutique.",
    features: [
      {
        id: "closet-wardrobes",
        title: "Illuminated Smoked Glass Wardrobes",
        badge: "Custom Cabinetry",
        desc: "Custom full-height cabinet systems with dark-tinted smoked glass panels. Displays curated designer clothing, suits, and rich kente patterns under warm lighting.",
        image: "assets/closet_after.png"
      },
      {
        id: "closet-island",
        title: "Glass Display Jewelry Central Island",
        badge: "Toughened Countertop",
        desc: "Central vanity drawer station topped with an extra-durable, scratch-resistant toughened glass countertop, revealing custom slots for watches and jewelry.",
        image: "assets/closet_after.png"
      }
    ],
    hotspots: [
      { x: -450, y: 20, z: 120, title: "Smoked Glass Wardrobes", featureId: "closet-wardrobes" },
      { x: 50, y: -200, z: 350, title: "Jewelry Glass Display Island", featureId: "closet-island" }
    ],
    defaultYaw: Math.PI * 1.5,
    defaultPitch: -Math.PI * 0.1
  }
};

// --- 2. THREE.JS 3D ENGINE STATE ---
let scene, camera, renderer;
let sphereMesh;
let activeRoom = "living";
let isBeforeState = false; // Toggle state for before/after view

// Interaction parameters
let isUserInteracting = false;
let onPointerDownMouseX = 0, onPointerDownMouseY = 0;
let lon = 0, onPointerDownLon = 0;
let lat = 0, onPointerDownLat = 0;
let phi = 0, theta = 0;

// Settings / Auto-Rotate
let isAutoRotating = true;
let autoRotateSpeed = 0.04;
const fovMin = 30, fovMax = 85;

// Loaders
const textureLoader = new THREE.TextureLoader();
const cachedTextures = {};

// Canvas container dimensions
let canvasWidth, canvasHeight;

// Audio Synth Object
let audioCtx = null;
let audioOscillator = null;
let audioGainNode = null;
let isAudioPlaying = false;

// Initialize app when window loads
window.addEventListener("load", init3DEngine);

// --- 3. INITIALIZE THREE.JS TOUR ENGINE ---
function init3DEngine() {
  const container = document.getElementById("canvas-container");
  canvasWidth = container.clientWidth;
  canvasHeight = container.clientHeight;

  // 1. Scene & Camera Creation
  scene = new THREE.Scene();
  
  // Perspective camera (FOV, Aspect, Near, Far)
  camera = new THREE.PerspectiveCamera(70, canvasWidth / canvasHeight, 1, 1100);
  camera.target = new THREE.Vector3(0, 0, 0);

  // 2. 3D Panorama Sphere Geometry
  // We use a large sphere of radius 500, with inverted normals so texture renders inside
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1); // Invert sphere

  // Placeholder flat dark material before textures load
  const material = new THREE.MeshBasicMaterial({
    color: 0x070a13,
    transparent: true,
    opacity: 1
  });

  sphereMesh = new THREE.Mesh(geometry, material);
  scene.add(sphereMesh);

  // 3. WebGL Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasWidth, canvasHeight);
  container.appendChild(renderer.domElement);

  // 4. Register Event Listeners
  container.addEventListener("mousedown", onPointerDown, { passive: false });
  container.addEventListener("touchstart", onPointerDown, { passive: false });
  window.addEventListener("resize", onWindowResize);
  
  // Set initial drag coordinates
  const room = roomData[activeRoom];
  lon = THREE.MathUtils.radToDeg(room.defaultYaw);
  lat = THREE.MathUtils.radToDeg(room.defaultPitch);

  // Load first room textures (both Before and After for smooth transition)
  preloadRoomTextures(activeRoom, () => {
    applyRoomTexture(activeRoom);
    buildHotspots();
    updateSidebarContent();
  });

  // Start Animation Loop
  animate();

  // Initialize UI Controls Bindings
  initUIControls();
}

// --- 4. TEXTURE PRELOADING & CACHING ---
function preloadRoomTextures(roomKey, callback) {
  const room = roomData[roomKey];
  let loadedCount = 0;
  const targets = [room.image];
  if (room.beforeImage) targets.push(room.beforeImage);

  targets.forEach(path => {
    if (cachedTextures[path]) {
      loadedCount++;
      if (loadedCount === targets.length && callback) callback();
      return;
    }

    textureLoader.load(
      path,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false; // Save VRAM
        cachedTextures[path] = texture;
        
        loadedCount++;
        if (loadedCount === targets.length && callback) callback();
      },
      undefined,
      (err) => {
        console.error("Failed to load panorama image:", path, err);
        // Load fallback flat color texture so app doesn't break
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0,0,128,128);
        ctx.fillStyle = '#c6a052';
        ctx.font = '14px Arial';
        ctx.fillText('Glasstech 3D', 20, 60);
        
        const fallbackTex = new THREE.CanvasTexture(canvas);
        cachedTextures[path] = fallbackTex;
        
        loadedCount++;
        if (loadedCount === targets.length && callback) callback();
      }
    );
  });
}

// --- 5. RENDER & ANIMATION LOOP ---
function animate() {
  requestAnimationFrame(animate);
  updatePhysics();
}

function updatePhysics() {
  if (isAutoRotating && !isUserInteracting) {
    lon += autoRotateSpeed;
  }

  // Calculate Camera Orientation Vectors based on lon/lat angles
  lat = Math.max(-85, Math.min(85, lat)); // Clamp vertical looking angle
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);

  // Update camera target looking coordinate
  const target = new THREE.Vector3();
  target.x = 500 * Math.sin(phi) * Math.cos(theta);
  target.y = 500 * Math.cos(phi);
  target.z = 500 * Math.sin(phi) * Math.sin(theta);
  
  camera.lookAt(target);
  renderer.render(scene, camera);

  // Reposition HTML hotspots onto screen space
  renderHotspots();
}

// --- 6. DRAG & TOUCH NAVIGATION INTERACTION ---
function onPointerDown(event) {
  isUserInteracting = true;
  isAutoRotating = false;

  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;

  onPointerDownMouseX = clientX;
  onPointerDownMouseY = clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  document.addEventListener("mousemove", onPointerMove, { passive: false });
  document.addEventListener("mouseup", onPointerUp);
  document.addEventListener("touchmove", onPointerMove, { passive: false });
  document.addEventListener("touchend", onPointerUp);
}

function onPointerMove(event) {
  const clientX = event.clientX || (event.touches ? event.touches[0].clientX : 0);
  const clientY = event.clientY || (event.touches ? event.touches[0].clientY : 0);

  // Drag sensitivity scaling (higher factor = faster rotation)
  const factor = 0.15;
  lon = (onPointerDownMouseX - clientX) * factor + onPointerDownLon;
  lat = (clientY - onPointerDownMouseY) * factor + onPointerDownLat;
}

function onPointerUp() {
  isUserInteracting = false;
  
  document.removeEventListener("mousemove", onPointerMove);
  document.removeEventListener("mouseup", onPointerUp);
  document.removeEventListener("touchmove", onPointerMove);
  document.removeEventListener("touchend", onPointerUp);
}

// Handle browser resize
function onWindowResize() {
  const container = document.getElementById("canvas-container");
  canvasWidth = container.clientWidth;
  canvasHeight = container.clientHeight;

  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(canvasWidth, canvasHeight);
}

// --- 7. ROOM NAVIGATION LOGIC ---
function selectRoom(roomKey) {
  if (roomKey === activeRoom) return;

  const container = document.getElementById("canvas-container");
  
  // 1. Trigger Glassmorphic fade transition
  container.style.transition = "opacity 0.35s ease-in-out";
  container.style.opacity = "0.05";
  
  // Fade active hotspots out
  document.getElementById("hotspot-overlay-container").style.opacity = "0";

  // Preload and switch textures
  preloadRoomTextures(roomKey, () => {
    activeRoom = roomKey;
    isBeforeState = false; // Reset to modern "After" state

    // Reset rotation to room's default heading
    const room = roomData[activeRoom];
    lon = THREE.MathUtils.radToDeg(room.defaultYaw);
    lat = THREE.MathUtils.radToDeg(room.defaultPitch);

    applyRoomTexture(activeRoom);
    
    // Build hotspots and update UI
    buildHotspots();
    updateSidebarContent();
    updateUIElements();

    // 2. Fade container back in
    setTimeout(() => {
      container.style.opacity = "1";
      document.getElementById("hotspot-overlay-container").style.opacity = "1";
    }, 100);
  });
}

function applyRoomTexture(roomKey) {
  const room = roomData[roomKey];
  const activePath = isBeforeState ? room.beforeImage : room.image;
  const texture = cachedTextures[activePath];

  if (texture && sphereMesh) {
    sphereMesh.material.map = texture;
    sphereMesh.material.needsUpdate = true;
  }
}

// --- 8. DYNAMIC HOTSPOTS PROJECTED ONTO 3D SCREEN-SPACE ---
function buildHotspots() {
  const container = document.getElementById("hotspot-overlay-container");
  container.innerHTML = ""; // Clear existing

  const room = roomData[activeRoom];
  if (isBeforeState || !room.hotspots) return; // No hotspots in unrenovated "Before" state

  room.hotspots.forEach((h, index) => {
    const el = document.createElement("div");
    el.className = "hotspot-element";
    el.id = `hotspot-${index}`;
    
    // Outer and Inner Rings
    const ringOuter = document.createElement("div");
    ringOuter.className = "hotspot-ring-outer";
    const ringInner = document.createElement("div");
    ringInner.className = "hotspot-ring-inner";

    // Glassmorphic Tooltip
    const tooltip = document.createElement("div");
    tooltip.className = "hotspot-tooltip";
    tooltip.innerText = h.title;

    el.appendChild(ringOuter);
    el.appendChild(ringInner);
    el.appendChild(tooltip);

    // Click behavior - Open product spec details modal
    el.addEventListener("click", () => {
      isAutoRotating = false;
      document.getElementById("rotate-toggle-btn").classList.remove("active");
      openProductModal(h.featureId);
    });

    container.appendChild(el);
  });
}

function renderHotspots() {
  const room = roomData[activeRoom];
  if (isBeforeState || !room.hotspots) return;

  const container = document.getElementById("canvas-container");
  const halfWidth = canvasWidth / 2;
  const halfHeight = canvasHeight / 2;

  room.hotspots.forEach((h, index) => {
    const el = document.getElementById(`hotspot-${index}`);
    if (!el) return;

    // Vector representing 3D coordinates on the sphere
    const vector = new THREE.Vector3(h.x, h.y, h.z);
    
    // Project 3D vector coordinates onto screen space (NDC: Normalised Device Coordinates)
    vector.project(camera);

    // Check if the coordinate is in front of the camera (behind camera: vector.z > 1)
    const isBehindCamera = vector.z > 1;

    if (!isBehindCamera && Math.abs(vector.x) < 1 && Math.abs(vector.y) < 1) {
      // Scale coordinates to fit current canvas size
      const x = (vector.x * halfWidth) + halfWidth;
      const y = -(vector.y * halfHeight) + halfHeight;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.display = "flex";
      el.style.transform = "translate(-50%, -50%) scale(1)";
    } else {
      el.style.display = "none";
    }
  });
}

// --- 9. DYNAMIC UI INTERACTIVITY AND SIDEBAR ---
function updateSidebarContent() {
  const room = roomData[activeRoom];
  
  // Update texts
  document.getElementById("spec-title").innerText = room.title;
  document.getElementById("spec-meta").innerText = room.category;
  document.getElementById("spec-description").innerText = room.description;
  document.getElementById("spec-img-header").src = room.image;

  // Build installed feature list cards in sidebar
  const list = document.getElementById("glass-features-list");
  list.innerHTML = ""; // Clear existing

  if (room.features) {
    room.features.forEach(f => {
      const card = document.createElement("div");
      card.className = "feature-item-card";
      card.innerHTML = `
        <div class="feature-icon-bullet"></div>
        <div class="feature-item-info">
          <h4>${f.title}</h4>
          <p>${f.badge}</p>
        </div>
      `;
      card.addEventListener("click", () => openProductModal(f.id));
      list.appendChild(card);
    });
  }
}

function updateUIElements() {
  // Update Active tag floating label
  const room = roomData[activeRoom];
  document.getElementById("current-room-title").innerText = room.title;
  document.getElementById("current-room-category").innerText = room.category;
  document.getElementById("active-floor-label").innerText = room.title;

  // Toggle Before & After Slider panel visibility (only for Living Room)
  const baPanel = document.getElementById("before-after-panel");
  if (activeRoom === "living") {
    baPanel.style.display = "flex";
  } else {
    baPanel.style.display = "none";
  }

  // Update Floor Plan Active highlights
  document.querySelectorAll(".floor-plan-room").forEach(r => {
    r.classList.remove("active");
  });
  const activeMapRoom = document.getElementById(`map-${activeRoom}`);
  if (activeMapRoom) activeMapRoom.classList.add("active");

  // Update Carousel Cards Highlight
  document.querySelectorAll(".carousel-card").forEach(c => {
    c.classList.remove("active");
  });
  const activeCard = document.getElementById(`card-${activeRoom}`);
  if (activeCard) activeCard.classList.add("active");
}

// --- 10. PRODUCT SPECIFICATION MODAL & SPEC OVERLAYS ---
function openProductModal(featureId) {
  const room = roomData[activeRoom];
  const feature = room.features.find(f => f.id === featureId);
  if (!feature) return;

  document.getElementById("modal-product-title").innerText = feature.title;
  document.getElementById("modal-product-badge").innerText = feature.badge;
  document.getElementById("modal-product-desc").innerText = feature.desc;
  document.getElementById("modal-product-img").src = feature.image;

  document.getElementById("product-modal").classList.add("open");
}

function closeModal() {
  document.getElementById("product-modal").classList.remove("open");
}

// Close modal when clicking outside contents
document.getElementById("product-modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("product-modal")) {
    closeModal();
  }
});

// Enquire from Modal
function requestFeatureDetails() {
  const title = document.getElementById("modal-product-title").innerText;
  closeModal();
  openConsultationModal(`Enquiry: ${title}`);
}

function openConsultationModal(subject = "") {
  // Pre-fill email or focus name in consultation lead form
  const nameInput = document.querySelector(".consultation-form input[name='clientName']");
  if (nameInput) {
    nameInput.focus();
    nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Highlight sidebar consultation box temporarily
    const box = document.querySelector(".consultation-box");
    box.style.transition = "all 0.3s ease";
    box.style.borderColor = "var(--accent-gold)";
    box.style.boxShadow = "var(--shadow-glow)";
    setTimeout(() => {
      box.style.borderColor = "var(--accent-gold-dark)";
      box.style.boxShadow = "none";
    }, 1500);
  }
}

// Handle consultation booking submission
function handleLeadSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name    = form.clientName.value.trim();
  const email   = form.clientEmail.value.trim();
  const phone   = form.clientPhone.value.trim();
  const room    = roomData[activeRoom] ? roomData[activeRoom].title : 'Showroom';

  // 1. Show toast immediately
  const toast = document.getElementById("success-toast");
  toast.querySelector("span").innerText = `Thank you, ${name}! Connecting you on WhatsApp now…`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);

  // 2. Open WhatsApp with lead details pre-filled
  const msg = `Hi Glasstech! I just explored your 3D Showroom and I'd like a free consultation.\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Interested in:* ${room}`;
  const waUrl = `https://wa.me/233598455012?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');

  // 3. Reset form
  form.reset();
}

// --- 11. BIND STATIC UI BUTTONS AND TOGGLES ---
function initUIControls() {
  // 1. Auto Rotation button
  const rotateBtn = document.getElementById("rotate-toggle-btn");
  if (isAutoRotating) rotateBtn.classList.add("active");
  rotateBtn.addEventListener("click", () => {
    isAutoRotating = !isAutoRotating;
    rotateBtn.classList.toggle("active", isAutoRotating);
  });

  // 2. Fullscreen Toggle
  const fsBtn = document.getElementById("fullscreen-btn");
  fsBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Error attempting fullscreen:", err);
      });
      fsBtn.querySelector("i").className = "fa-solid fa-compress";
    } else {
      document.exitFullscreen();
      fsBtn.querySelector("i").className = "fa-solid fa-expand";
    }
  });

  // 3. Before & After Swapper Buttons (Only inside Living Room)
  const beforeBtn = document.getElementById("before-toggle-btn");
  const afterBtn = document.getElementById("after-toggle-btn");

  beforeBtn.addEventListener("click", () => {
    if (!isBeforeState) {
      isBeforeState = true;
      beforeBtn.classList.add("active");
      afterBtn.classList.remove("active");
      
      // Swap textures on sphere
      applyRoomTexture(activeRoom);
      
      // Hide hotspots in unrenovated state
      buildHotspots();
    }
  });

  afterBtn.addEventListener("click", () => {
    if (isBeforeState) {
      isBeforeState = false;
      afterBtn.classList.add("active");
      beforeBtn.classList.remove("active");
      
      // Swap textures on sphere
      applyRoomTexture(activeRoom);
      
      // Redraw hotspots in renovated state
      buildHotspots();
    }
  });

  // 4. Web Audio Synthesized Ambient lounge music generator
  const musicBtn = document.getElementById("music-toggle-btn");
  musicBtn.addEventListener("click", () => {
    if (!isAudioPlaying) {
      startAmbientMusic();
      musicBtn.classList.add("active");
    } else {
      stopAmbientMusic();
      musicBtn.classList.remove("active");
    }
  });
}

// --- 12. NATIVE WEB AUDIO LOUNGE SYNTHESIZER ---
// Generates beautiful ambient chord sound waves dynamically so there are no massive audio assets to download
function startAmbientMusic() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    audioGainNode = audioCtx.createGain();
    audioGainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); // Low volume background hum
    audioGainNode.connect(audioCtx.destination);

    // Warm chord: Major 7th hum
    const freqs = [110, 165, 220, 293.66, 330]; // A2, E3, A3, D4, E4 chords
    audioOscillator = [];

    freqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      osc.type = idx % 2 === 0 ? "sine" : "triangle"; // Blended waves
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      // Soft filter to make it smooth and velvety
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, audioCtx.currentTime);
      
      // Low frequency oscillator for warm sweeping filter effect
      const lfo = audioCtx.createOscillator();
      lfo.frequency.value = 0.05 + (idx * 0.01);
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = 100;
      
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      
      osc.connect(filter);
      filter.connect(audioGainNode);

      osc.start();
      lfo.start();
      
      audioOscillator.push({ osc, lfo });
    });

    isAudioPlaying = true;
  } catch (err) {
    console.error("Web Audio API not supported or blocked by browser security.", err);
  }
}

function stopAmbientMusic() {
  if (audioOscillator) {
    audioOscillator.forEach(nodes => {
      try {
        nodes.osc.stop();
        nodes.lfo.stop();
      } catch (e) {}
    });
    audioOscillator = null;
  }
  isAudioPlaying = false;
}
