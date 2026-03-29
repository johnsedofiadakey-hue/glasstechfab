# LuxeSpace Platform — Technical Setup & Refactoring Manual

This manual documents the architectural transition and provides a guide for future development and maintenance of the LuxeSpace platform.

---

## 1. 🏗️ Architectural Transition
**Objective**: Transition from a monolithic `LuxeSpace_V6_Complete.jsx` file to a production-ready, modular React hierarchy.

### 🔩 Major Refactoring Points
1. **Global Styles**: Extracted all CSS (global, design system, and print logic) into `src/index.css`.
2. **Data Decoupling**: Centralised all mock datasets (clients, proposals, invoices, team, analytics) into `src/data.js`.
3. **Component Extraction**:
   - `src/components/Shared.jsx`: Reusable UI primitives (Modals, Form Fields, Progress Bars, User Avatars).
   - `src/components/BA.jsx`: Standalone Before/After slider logic.
4. **Page Modules**:
   - `src/pages/PublicSite.jsx`: Entire public-facing experience (Hero, Portfolio, Details, Contact).
   - `src/pages/AdminPortal.jsx`: Complex studio management dashboards, CRM, and analytics.
   - `src/pages/ClientPortal.jsx`: Secure area for client interaction and payment simulation.
   - `src/pages/AccountManagerPortal.jsx`: Design team task management.
   - `src/pages/LoginPage.jsx`: Multi-role login logic with demo credentials.

---

## 2. 🔐 Environment & Credentials
The platform uses role-based access control (RBAC) to serve content to different users.

### 🔑 Demo Credentials
Role | Email | Password
--- | --- | ---
**Super Admin** | `admin@stormglide.com` | `admin123`
**Studio Admin** | `admin@luxespace.com` | `admin123`
**Design Team** | `sarah@luxespace.com` | `team123`
**Client Portal** | `client@luxespace.com` | `client123`

### ⚙️ Environment Variables (`.env`)
Create a `.env` file in the root directory if you integrate real services:
```env
VITE_CLAUDE_API_KEY=your_key_here
VITE_STRIPE_PUBLIC_KEY=your_key_here
```

---

## 3. 🛠️ Future Upgrades (Roadmap)
This version establishes a "V6-ready" structure. Here’s what we’ve prepared for you to upgrade:

- **🔐 Real Authentication**: Substitute the current simulated `login` logic in `App.jsx` with Firebase Auth or Clerk.
- **💾 Real Database**: Replace `src/data.js` imports with API calls to a Supabase or MongoDB backend.
- **💳 Stripe Integration**: Use the `StripePayModal.jsx` markup to integrate real Stripe Elements via the `stripe-js` SDK.
- **🤖 AI Integration**: Connect the `AdminEmailCenter` and `AIGenerator` to an LLM provider (Claude/OpenAI) for real-time document drafting.

---

## 4. 🚀 Deployment Guide
The codebase is currently in sync with the repository: `https://github.com/johnsedofiadakey-hue/glasstechfab`.

### ☁️ Recommended Hosting
- **Vercel**: Simply connect the repo. The `vite.config.js` is already configured for easy deployment.
- **Netlify**: Auto-detects Vite and deploys in seconds.

---

## 📂 Project Structure Map
```text
LuxeSpace/
├── src/
│   ├── assets/        # Media assets
│   ├── components/    # Reusable fragments
│   ├── pages/         # Full page views
│   ├── App.jsx        # View-state router
│   ├── data.js        # Data source of truth
│   ├── index.css      # Design system
│   └── main.jsx       # Entry point
```

---
*Manual Generated on: 2026-03-29*
