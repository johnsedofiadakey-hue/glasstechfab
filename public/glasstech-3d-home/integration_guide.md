# Glasstech 3D Home Tour - Developer Integration Guide

This guide is prepared specifically for **Claude** (or any developer) to integrate this interactive 3D Home Tour web application seamlessly into the main **Glasstech** website.

---

## 📂 Project Structure Overview
Ensure the following files are copied onto your web server or repository:
```text
glasstech-3d-home/
├── index.html       # Structural layout & SVG Floor Plan
├── style.css        # Premium Glassmorphic styles & responsiveness
├── app.js           # Three.js 3D Spherical Engine & Interaction Logic
└── assets/          # High-resolution photorealistic panoramic room assets
    ├── living_after.png
    ├── living_before.png
    ├── kitchen_after.png
    ├── bedroom_after.png
    ├── washroom_after.png
    └── closet_after.png
```

---

## ⚡ Option A: The IFrame Method (Recommended & Safest)
*Why choose this?* 
It keeps all the Three.js canvas calculations, custom CSS design tokens, global resets, and glassmorphic overlays strictly isolated. It prevents styling conflicts with your existing website's CSS and runs beautifully.

### Step 1: Upload the Folder
Upload the entire `glasstech-3d-home` directory to your web server (e.g., into public files, a subdirectory, or a CDN bucket).

### Step 2: Embed the IFrame
In your main website's HTML page (or React/WordPress component), insert the following responsive iframe element:

```html
<!-- Glasstech 3D Luxury Home Tour Embed -->
<div class="tour-embed-wrapper" style="width: 100%; max-width: 1200px; margin: 30px auto; padding: 0 15px;">
  <iframe 
    src="/glasstech-3d-home/index.html" 
    title="Glasstech 3D Luxury Ghanaian Home Tour"
    style="width: 100%; height: 80vh; min-height: 550px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); overflow: hidden;"
    allow="fullscreen; autoplay;"
    loading="lazy">
  </iframe>
</div>
```

---

## 🛠️ Option B: Direct Page Integration (HTML/CSS/JS Merger)
*Why choose this?* 
If you want the 3D viewport to be a native element of the existing page template without frame borders, and you want to use the main site header/footer.

### Step 1: Include CDN Scripts
Add the required dependencies in the `<head>` of your website:
```html
<!-- Font Awesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<!-- Three.js 3D WebGL Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

### Step 2: Migrate the Main Elements
Copy the `<main>` element and `<aside>` element from `index.html` into your target page body:
```html
<!-- Viewport container and right sidebar specs -->
<div class="app-container" style="display: grid; grid-template-rows: 1fr; grid-template-columns: 1fr 380px; height: 100vh; position: relative;">
  <main class="viewport-area" id="viewport-area">
    <!-- ... (All elements under <main class="viewport-area"> in index.html) ... -->
  </main>
  <aside class="spec-panel">
    <!-- ... (All elements under <aside class="spec-panel"> in index.html) ... -->
  </aside>
</div>
```

### Step 3: Append CSS Tokens
Merge the variables and styling rules from `style.css` into your main stylesheet. To avoid global conflicts:
- Keep the custom `:root` color tokens.
- Scope container-specific styles (e.g., prefix classes or place everything under `.app-container` namespace).
- Exclude `body` reset rules if you already have body styling.

### Step 4: Hook JavaScript
Copy `app.js` into your public scripts directory and link it at the bottom of the page:
```html
<script src="path/to/app.js"></script>
```
*Note:* If you are serving the page from a different route, ensure the image paths in the `roomData` object inside `app.js` are updated to match your uploaded asset paths:
```javascript
const roomData = {
  living: {
    image: "public/assets/living_after.png", // Adjust paths here if needed
    // ...
```

---

## 📋 Customizations Checklist for Claude:
1. **Form Destination**: Currently, the form onsubmit calls `handleLeadSubmit()`, which prints a beautiful toast alert in JS. Claude can easily update this in `app.js` to send a POST request to your backend or CRM (e.g. HubSpot, sheetDB, custom email API):
   ```javascript
   // In app.js (handleLeadSubmit)
   fetch('/api/consultation', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ name, email, phone })
   });
   ```
2. **Contact Details**: Replace the phone number `+233 24 000 0000` in the header or sidebar with your actual business lines.
