# Glasstech Fabrications

React/Vite website and existing Firebase-backed project portals for Glasstech Fabrications. The public storefront is being repositioned around waterproofing materials, building finishing products, and installation enquiries.

## Local development

```bash
npm ci --legacy-peer-deps
npm run dev
```

The legacy peer flag is currently required because `react-paystack@6` declares support through React 18 while this repository uses React 19. Build with `npm run build`; output goes to the repository's `dist/` directory, as configured for Firebase Hosting.

## Public routes

- `/` — waterproofing-led homepage
- `/products?group=waterproofing` — waterproofing product references and enquiry basket
- `/?page=solutions` — guided waterproofing enquiry
- `/?page=services` — installation and other services
- `/portfolio` — existing projects area

## Product catalogue status

`src/waterproofingCatalog.js` contains manufacturer-published reference products from MC-Bauchemie Ghana and Sika Ghana. These entries are **not confirmed Glasstech stock**. Prices, availability, delivery, licensed product photos, and supplier arrangements must be verified before direct checkout is enabled. Each reference entry links to the manufacturer's page or data sheet. The current basket sends a combined order enquiry to Glasstech via WhatsApp.

The existing glass and finishing catalogue remains in `src/catalog.jsx`. Firebase CMS entries can override static entries by product ID. Do not run the admin catalog sync command as a means of publishing the new reference products; those are currently read by the public catalogue directly.

See [REBRAND_CONCEPT.md](REBRAND_CONCEPT.md) for the proposed site structure and commercial inputs needed for the next phase.
