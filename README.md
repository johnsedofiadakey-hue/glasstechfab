# LuxeSpace Platform — Modular Edition

A production-ready, white-label interior design studio platform built for scale. Refactored from the ground up for performance, maintainability, and visual excellence.

## 🚀 Overview
LuxeSpace is a comprehensive ERP/CRM and client portal solution specifically designed for high-end interior design firms. It manages everything from public-facing portfolio sites to background administrative workflows, proposals, invoicing, and real-time client communication.

## 🏗️ Architecture
The platform has been refactored from a monolithic codebase into a modular React/Vite architecture:

- **src/components/**: Shared UI elements (glassmorphic modals, spinners, sliders, etc.).
- **src/pages/**: High-level page modules (Public Site, Admin Portal, Client Portal, Account Manager Portal).
- **src/data.js**: Centralised source of truth for mock data, pricing, and services.
- **src/index.css**: Premium design system and print-safe global styles.

## ✨ Key Features
- **Public Site**: Elegant Home, Portfolio, and Contact pages with glassmorphic design.
- **Admin Command Centre**: Full studio management (CRM, Analytics, Proposals, Invoices).
- **Client Portal**: Dedicated secure area for project tracking, approvals, and payments.
- **Design Team Portal**: Task and schedule management for account managers.
- **Stripe-Style Payments**: Secure, multi-step payment flow simulation.
- **AI Proposal Generator**: (Logic ready for integration) Drafts high-end proposals automatically.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/johnsedofiadakey-hue/glasstechfab.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📦 Deployment
The project is configured for seamless deployment to Vercel, Netlify, or AWS Amplify. Simply connect your GitHub repository and build using `npm run build`.

## 📄 License
Commercial Use Only — LuxeSpace™
