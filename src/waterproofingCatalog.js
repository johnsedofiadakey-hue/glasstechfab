// Reference products published by the manufacturers' Ghana sites.
// These are not Glasstech stock records. Add verified price, stock and images before checkout.
export const WATERPROOFING_CATEGORIES = [
  { id: 'roof-coatings', label: 'Roof & wall coatings', groupId: 'waterproofing', desc: 'Liquid-applied protection for suitable exposed surfaces.' },
  { id: 'wet-areas', label: 'Bathrooms & wet areas', groupId: 'waterproofing', desc: 'Systems used beneath tiles and other wet-area finishes.' },
  { id: 'foundations', label: 'Foundations & basements', groupId: 'waterproofing', desc: 'Protection for below-ground concrete and masonry.' },
  { id: 'concrete-additives', label: 'Concrete & mortar additives', groupId: 'waterproofing', desc: 'Water-resisting admixtures used during construction.' },
  { id: 'joints-repairs', label: 'Joints & repairs', groupId: 'waterproofing', desc: 'Details and repair materials for water entry points.' },
  { id: 'sheet-membranes', label: 'Sheet membranes', groupId: 'waterproofing', desc: 'Preformed membrane systems for suitable applications.' },
];

export const WATERPROOFING_PRODUCTS = [
  {
    id: 'wp-mc-proof-df8', cat: 'roof-coatings', name: 'MC-Proof DF8', brand: 'MC-Bauchemie Ghana',
    tagline: 'Acrylic liquid membrane for exposed roofs and facades', packSize: '12 kg',
    description: 'Manufacturer-listed, ready-to-use acrylic waterproofing coating for non-trafficked roofs and building facades.',
    specs: { type: 'Liquid-applied acrylic membrane', 'listed pack': '12 kg', application: 'Exposed roofs and facades' },
    sourceUrl: 'https://www.mc-bauchemie.com.gh/products/waterproofing/reactive-sealants/mc-proof-df8.html',
    datasheetUrl: 'https://www.mc-bauchemie.com.gh/assets/downloads/products/en-GH/technical_datasheet/MC_Proof_DF8_GH_EN_TDS.pdf',
  },
  {
    id: 'wp-mc-proof-500', cat: ['wet-areas', 'foundations'], name: 'MC-Proof 500', brand: 'MC-Bauchemie Ghana',
    tagline: 'Flexible two-component cementitious waterproofing',
    description: 'Manufacturer-listed waterproofing for wet areas under tiles and the exterior of below-ground structural elements.',
    specs: { type: 'Two-component cementitious', application: 'Wet areas and below-ground structures' },
    sourceUrl: 'https://www.mc-bauchemie.com.gh/products/waterproofing/reactive-sealants/mc-proof-500.html',
    datasheetUrl: 'https://www.mc-bauchemie.com.gh/assets/downloads/products/en-GH/technical_datasheet/MC_Proof_500_GH_EN_TDS.pdf',
  },
  {
    id: 'wp-mc-hydro-1-plus', cat: 'concrete-additives', name: 'MC-Hydro 1 Plus', brand: 'MC-Bauchemie Ghana',
    tagline: 'Integral water-repellent additive for mortar and concrete',
    description: 'Manufacturer-listed additive incorporated into mortar and concrete mixes.',
    specs: { type: 'Integral waterproofing additive', application: 'Mortar and concrete' },
    sourceUrl: 'https://www.mc-bauchemie.com.gh/products/waterproofing/additional-products-for-structural-waterproofing/mc-hydro-1-plus.html',
  },
  {
    id: 'wp-sikalastic-152-bh', cat: ['wet-areas', 'foundations'], name: 'Sikalastic®-152 BH', brand: 'Sika Ghana',
    tagline: 'Fibre-reinforced flexible cementitious mortar', packSize: '33 kg unit',
    description: 'Manufacturer-listed for waterproofing bathrooms, showers, terraces, balconies and selected buried walls.',
    specs: { type: 'Two-component cementitious mortar', 'listed pack': '33 kg unit', application: 'Wet areas and concrete protection' },
    sourceUrl: 'https://gha.sika.com/en/construction/waterproofing-systems/waterproofing-ofswimmingpoolswatertanks/sikalastic-152-bh.html',
    datasheetUrl: 'https://gha.sika.com/dam/dms/gh01/p/sikalastic-152-bh.pdf',
  },
  {
    id: 'wp-sikacem-520', cat: 'concrete-additives', name: 'SikaCem®-520 Waterproofer GH', brand: 'Sika Ghana',
    tagline: 'Liquid water-resisting admixture for mortar and concrete', packSize: '1 kg / 5 kg / 20 kg',
    description: 'Manufacturer-listed liquid admixture for waterproof mortar and concrete mixes.',
    specs: { type: 'Liquid admixture', 'listed packs': '1 kg, 5 kg and 20 kg', application: 'Mortar and concrete' },
    sourceUrl: 'https://gha.sika.com/en/documents-resources/pds.html',
    datasheetUrl: 'https://gha.sika.com/dms/getdocument.get/c94e7ebe-4634-4ddf-be32-cddf88f08631/sikacem-520-waterproofergh.pdf',
  },
  {
    id: 'wp-sika-igasol', cat: 'foundations', name: 'Sika® Igasol®', brand: 'Sika Ghana',
    tagline: 'Protective coating for structures in contact with soil',
    description: 'Manufacturer-listed coating for suitable below-ground building parts such as foundations and retaining walls.',
    specs: { type: 'Protective coating', application: 'Foundations and retaining walls' },
    sourceUrl: 'https://gha.sika.com/en/construction/waterproofing-systems/foundations-waterproofing/sika-igasol.html',
  },
];
