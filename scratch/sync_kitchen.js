
import { db } from '../src/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { GLASS_CATALOG_DATA, GLASS_CATALOG_CATEGORIES } from '../src/data';

async function syncKitchen() {
  console.log('Syncing Kitchen Catalog...');
  
  // 1. Update Categories
  const catRef = doc(db, 'cms_content', 'categories');
  await setDoc(catRef, { content: GLASS_CATALOG_CATEGORIES }, { merge: true });
  console.log('Categories updated.');

  // 2. Update Products
  const prodRef = doc(db, 'cms_content', 'products');
  const snap = await getDoc(prodRef);
  let currentProducts = snap.exists() ? snap.data().content : [];
  
  // Add only if not exists
  const kitchenIds = ['k-nita', 'k-brocade', 'k-greenberg'];
  const newKitchen = GLASS_CATALOG_DATA.filter(p => kitchenIds.includes(p.id));
  
  // Merge
  const merged = [...currentProducts];
  for (const kp of newKitchen) {
    const idx = merged.findIndex(p => p.id === kp.id);
    if (idx >= 0) merged[idx] = kp;
    else merged.push(kp);
  }

  await setDoc(prodRef, { content: merged }, { merge: true });
  console.log('Products updated.');
  process.exit(0);
}

syncKitchen().catch(console.error);
