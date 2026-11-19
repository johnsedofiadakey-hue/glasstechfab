# Glasstech Fabrications — website rebrand concept

Status: first local implementation in progress, 19 November 2026. Target domain confirmed as `glasstechfabrications.com`. No live deployment or product publication is implied.

## Positioning

**Glasstech supplies the materials and delivers the finishing work.** Keep the established Glasstech name and glass fabrication credibility, while making building finishing and waterproofing a visible part of the offer.

Suggested homepage message: **Materials for the build. Specialists for the finish.**

Supporting line: **Shop building finishing and waterproofing materials, or bring Glasstech in to specify, supply, and install the complete solution.**

## Customer routes

1. **Buy materials:** Browse a real catalogue, compare pack sizes and uses, see confirmed prices and availability, and order stocked products.
2. **Get a project quote:** Send dimensions, location, photos, and the problem or desired finish. Glasstech returns a supply-only or supply-and-install quote.
3. **Get technical help:** Select an application such as roof, bathroom, balcony, wall, or foundation waterproofing, then request the appropriate system and installation advice.

Products with fixed specification, verified stock, pricing, delivery, and payment rules can use checkout. Custom fabricated items and installation remain quote-led. The product detail page should offer both **Buy materials** (when enabled for that SKU) and **Request installation quote**.

## Proposed navigation

- **Products**: Waterproofing; Tiles & Flooring; Glass & Aluminium; Bathrooms; Kitchens & Joinery; Doors; other confirmed ranges.
- **Services**: Waterproofing installation; glass and aluminium fabrication; bathrooms; kitchens; tiling and other verified finishing work.
- **Projects**: Real completed projects with location, scope, materials used, and outcome.
- **How it works**: Supply-only versus supply-and-install, delivery, site visits, and quotation process.
- **About** and **Contact**.

## Homepage sequence

1. Hero with the two clear actions: **Shop materials** and **Get a project quote**.
2. Product categories with waterproofing prominent, using real product photography.
3. Application guide: roofs, bathrooms, balconies, walls, foundations; each links to relevant products and service enquiry.
4. Featured products with name, brand, pack size, key use, confirmed price/availability, and appropriate buying action.
5. Supply-and-install explanation with a simple three-step process.
6. Evidence: real project photos, product data sheets, brands actually stocked, and verified customer reviews.
7. Contact and WhatsApp enquiry.

## Product information needed

For each waterproofing material: exact brand and product name, SKU, product type, intended applications, pack size, coverage/consumption guidance from the manufacturer, available colours, technical data sheet, safety data sheet where applicable, price, stock status, photos, and delivery constraints. Do not publish performance claims or coverage estimates without the manufacturer's document.

## Visual direction

Use an architectural, practical identity: deep charcoal/navy, crisp white, and one restrained water-blue accent. Large, clear product and project imagery should carry the design. Product cards should feel like a dependable trade catalogue, while project pages show the quality of Glasstech's installation work. Use supplied photography and brand assets before considering generated concept imagery.

## Current source observations

- The linked repository `johnsedofiadakey-hue/glasstechfab` is a React/Vite and Firebase project with a public catalogue, admin/CMS code, and WhatsApp product enquiries.
- The catalogue's current fixed groups cover aluminium/glass, bathrooms, kitchens, wardrobes, tiles, doors, interiors, electrical, and plumbing. Building waterproofing is not a dedicated range.
- The product page is quote-led; the Paystack integration in the repo serves invoice/project payments, not a confirmed retail checkout.
- The source metadata points to `glasstech.com.gh`, while the website requested for review is `glasstechfabrications.com`. Confirm the intended canonical domain before deployment.
- Existing marketing claims, portfolio entries, stock labels, and product specifications require verification against Glasstech records before reuse in the rebrand.

## Implementation order

1. Confirm product and service facts, domain, photos, and first saleable SKUs.
2. Approve the homepage and product-detail visual direction.
3. Rework public navigation, homepage, catalogue taxonomy, waterproofing category, service enquiry, and product detail pages.
4. Connect confirmed stock/pricing and order handling, then verify payment, delivery, notifications, and a complete test order before enabling checkout.
5. Check mobile behaviour, accessibility, SEO redirects, analytics, and existing client/admin flows; deploy only after review.

## First local implementation

The public homepage now leads with waterproofing, the catalogue has a waterproofing group with manufacturer reference products, and visitors can send a multi-item enquiry basket via WhatsApp. A solution guide asks for the affected area, location and problem description. The first references are MC-Proof DF8, MC-Proof 500, MC-Hydro 1 Plus, Sikalastic®-152 BH, SikaCem®-520 Waterproofer GH and Sika® Igasol®. Product source links and technical data sheets are recorded in `src/waterproofingCatalog.js`.

Direct payment remains dependent on Glasstech's confirmed supplier terms, stock, prices, delivery rules and product imagery. This is a catalogue and order-enquiry experience until those facts are supplied.
