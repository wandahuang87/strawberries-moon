/* ─────────────────────────────────────────────────────────────
   strawberries.moon — catalog store
   Single-user, browser-local. Persists to localStorage.
   Use Catalog.load() / save() / addProduct() / etc from any page.
   ───────────────────────────────────────────────────────────── */
window.Catalog = (() => {
  const KEY = 'sm_catalog_v1';
  const BASKET_KEY = 'sm_basket_v1';

  const SEED_CAMERA_PHOTO = "data:image/jpeg;base64,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";

  // ── seed catalog (used on first load) ────────────────────────
  const SEED = {
    products: [
      {
        id: 'p_camera_taipei',
        title: 'Taipei disposable · half-frame',
        price: 1280,
        currency: 'NT$',
        tag: 'new',
        description:
          'A pre-loaded 35mm half-frame camera, 72 exposures of soft afternoons. ' +
          'Hand-assembled in our Taipei darkroom. Use it on a long walk, send it back, ' +
          'we develop and scan and ship the negatives home.',
photos: [SEED_CAMERA_PHOTO],
        variants: [
          { id: 'v_36', label: '36 exposures', stock: 12 },
          { id: 'v_72', label: '72 exposures (half-frame)', stock: 8 },
        ],
        buyLink: '', // paste your 7-11 賣貨便 order link here
      },
      {
        id: 'p_film_pinkcloud',
        title: 'film · pink cloud · 400 ISO',
        price: 280,
        currency: 'NT$',
        tag: '',
        description:
          'A warm-leaning 35mm color film. Soft pinks, dreamy highlights, ' +
          'made for golden hour and the kind of memories you almost forget.',
        photos: [],
        variants: [
          { id: 'v_1roll', label: '1 roll', stock: 40 },
          { id: 'v_3pack', label: '3-pack', stock: 22 },
          { id: 'v_5pack', label: '5-pack', stock: 9 },
        ],
        buyLink: '',
      },
    ],
    banners: [
      { id: 'b_1', tag: 'spring · 2026 · 36 exposures', headline: 'a roll of soft afternoons.', photo: '', link: '#products' },
      { id: 'b_2', tag: 'new · the moon edition', headline: 'she shoots moonlight.', photo: '', link: '#products' },
      { id: 'b_3', tag: 'half-frame · 72 frames per roll', headline: 'double the memories.', photo: '', link: '#products' },
      { id: 'b_4', tag: 'gift sets · 送給自己或別人', headline: 'memories, wrapped.', photo: '', link: '#products' },
      { id: 'b_5', tag: 'archive · made in tw', headline: 'since the moon, twenty twenty-four.', photo: '', link: '#products' },
    ],
  };

  // ── published catalog (products.json that ships with the site) ───
  // Loaded synchronously so every page's load() stays synchronous.
  // This is what ALL customers see. Your admin edits live in localStorage
  // until you click "Publish", which downloads a fresh products.json to deploy.
  let PUBLISHED = { products: [] };
  (function loadPublished() {
    try {
      const base = (document.currentScript && document.currentScript.src) || location.href;
      const url = new URL('products.json', base).href;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, false); // sync — tiny same-origin file
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        const parsed = JSON.parse(xhr.responseText);
        if (parsed && Array.isArray(parsed.products)) PUBLISHED = parsed;
      }
    } catch (e) {
      console.warn('products.json not found — using built-in defaults', e);
    }
  })();

  // ── persistent store: IndexedDB (huge quota) with in-memory mirror ──
  // localStorage caps at ~5MB and fills after a few photos. IndexedDB holds
  // hundreds of MB. We keep an in-memory copy (_mem) so the rest of the app
  // can call load() synchronously exactly as before.
  const IDB_NAME = 'sm_shop';
  const IDB_STORE = 'kv';
  const IDB_CAT_KEY = 'catalog';

  function idbOpen() {
    return new Promise((res, rej) => {
      const r = indexedDB.open(IDB_NAME, 1);
      r.onupgradeneeded = () => { r.result.createObjectStore(IDB_STORE); };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  async function idbGet(k) {
    const db = await idbOpen();
    return new Promise((res, rej) => {
      const t = db.transaction(IDB_STORE, 'readonly').objectStore(IDB_STORE).get(k);
      t.onsuccess = () => res(t.result);
      t.onerror = () => rej(t.error);
    });
  }
  async function idbSet(k, v) {
    const db = await idbOpen();
    return new Promise((res, rej) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(v, k);
      tx.oncomplete = () => res(true);
      tx.onerror = () => rej(tx.error);
    });
  }

  // initial in-memory catalog (sync) — legacy localStorage → published → seed
  let _mem;
  (function initMem() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { _mem = JSON.parse(raw); return; }
    } catch (e) { /* ignore */ }
    if (PUBLISHED && Array.isArray(PUBLISHED.products) && PUBLISHED.products.length) {
      _mem = JSON.parse(JSON.stringify(PUBLISHED));
      return;
    }
    _mem = JSON.parse(JSON.stringify(SEED));
  })();

  // hydrate from IndexedDB (async) + migrate legacy localStorage catalog
  let _resolveReady;
  const ready = new Promise((r) => { _resolveReady = r; });
  (async function hydrate() {
    try {
      const stored = await idbGet(IDB_CAT_KEY);
      if (stored && Array.isArray(stored.products)) {
        _mem = stored;
      } else {
        // migrate an old localStorage catalog into IndexedDB once
        try {
          const raw = localStorage.getItem(KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.products)) {
              _mem = parsed;
              await idbSet(IDB_CAT_KEY, parsed);
            }
          }
        } catch (e) { /* ignore */ }
      }
      // free the big localStorage entry so it can never block saves again
      try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    } catch (e) {
      console.warn('IndexedDB unavailable — staying in memory', e);
    }
    _resolveReady(true);
    window.dispatchEvent(new CustomEvent('catalog:changed'));
  })();

  function load() {
    return _mem;
  }
  function save(data) {
    try {
      _mem = data;
      idbSet(IDB_CAT_KEY, data).catch((e) => console.warn('idb save failed', e));
      window.dispatchEvent(new CustomEvent('catalog:changed'));
      return true;
    } catch (e) {
      console.error('catalog save failed', e);
      return false;
    }
  }

  function uid(prefix = 'p') {
    return prefix + '_' + Math.random().toString(36).slice(2, 9);
  }

  // ── product CRUD ─────────────────────────────────────────────
  function getProduct(id) {
    return load().products.find(p => p.id === id);
  }
  function upsertProduct(product) {
    const data = load();
    const idx = data.products.findIndex(p => p.id === product.id);
    if (idx >= 0) data.products[idx] = product;
    else data.products.push(product);
    return save(data);
  }
  function removeProduct(id) {
    const data = load();
    data.products = data.products.filter(p => p.id !== id);
    return save(data);
  }
  function newProduct() {
    return {
      id: uid('p'),
      title: 'Untitled product',
      price: 0,
      currency: 'NT$',
      tag: '',
      description: '',
      photos: [],
      variants: [],
      buyLink: '',
    };
  }

  // ── banner (hero slide) CRUD ────────────────────────────
  function loadBanners() {
    const data = load();
    // Explicit array (even empty) = owner's choice, respect it.
    if (Array.isArray(data.banners)) return data.banners;
    // Field absent (older saved catalog) → fall back to published/seed defaults.
    if (PUBLISHED && Array.isArray(PUBLISHED.banners) && PUBLISHED.banners.length) return PUBLISHED.banners;
    return SEED.banners || [];
  }
  function newBanner() {
    return { id: uid('b'), tag: '', headline: 'new headline', photo: '', link: '#products' };
  }
  function upsertBanner(banner) {
    const data = load();
    if (!Array.isArray(data.banners)) data.banners = [];
    const idx = data.banners.findIndex(b => b.id === banner.id);
    if (idx >= 0) data.banners[idx] = banner;
    else data.banners.push(banner);
    return save(data);
  }
  function removeBanner(id) {
    const data = load();
    data.banners = (data.banners || []).filter(b => b.id !== id);
    return save(data);
  }
  function moveBanner(id, dir) {
    const data = load();
    const arr = data.banners || [];
    const i = arr.findIndex(b => b.id === id);
    if (i < 0) return false;
    const j = i + dir;
    if (j < 0 || j >= arr.length) return false;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return save(data);
  }

  // ── photo handling ───────────────────────────────────────────
  // Compress an image File to base64 data URI, max edge 1200px, JPEG q 0.85
  async function compressImage(file, maxEdge = 1100, quality = 0.74) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let { width, height } = img;
        if (width > maxEdge || height > maxEdge) {
          const scale = maxEdge / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  function storageUsed() {
    // rough — each char of localStorage is ~1 byte (in practice 2 in UTF-16)
    let total = 0;
    for (const k of Object.keys(localStorage)) {
      total += (localStorage.getItem(k) || '').length + k.length;
    }
    return total;
  }
  function storageQuota() { return 5 * 1024 * 1024; } // assume 5MB

  // ── import/export ────────────────────────────────────────────
  // "Publish" — download the current catalog as products.json, the exact
  // filename the site reads. Replace products.json on your host with this
  // file and re-deploy, and every customer sees the update.
  function publish() {
    const blob = new Blob([JSON.stringify(load(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function exportJson() {
    const blob = new Blob([JSON.stringify(load(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `strawberries-moon-catalog-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function importJson(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        try {
          const data = JSON.parse(r.result);
          if (!data.products || !Array.isArray(data.products)) throw new Error('Not a catalog file');
          save(data);
          resolve(data);
        } catch (e) { reject(e); }
      };
      r.onerror = reject;
      r.readAsText(file);
    });
  }

  // ── basket ───────────────────────────────────────────────────
  function loadBasket() {
    try { return JSON.parse(localStorage.getItem(BASKET_KEY)) || { items: [] }; }
    catch { return { items: [] }; }
  }
  function saveBasket(b) {
    localStorage.setItem(BASKET_KEY, JSON.stringify(b));
    window.dispatchEvent(new CustomEvent('basket:changed'));
  }
  function addToBasket(productId, variantId = null, qty = 1) {
    const b = loadBasket();
    const existing = b.items.find(i => i.productId === productId && i.variantId === variantId);
    if (existing) existing.qty += qty;
    else b.items.push({ productId, variantId, qty });
    saveBasket(b);
  }
  function updateBasketQty(productId, variantId, qty) {
    const b = loadBasket();
    const item = b.items.find(i => i.productId === productId && i.variantId === variantId);
    if (item) {
      item.qty = qty;
      if (item.qty <= 0) b.items = b.items.filter(i => i !== item);
    }
    saveBasket(b);
  }
  function removeFromBasket(productId, variantId) {
    const b = loadBasket();
    b.items = b.items.filter(i => !(i.productId === productId && i.variantId === variantId));
    saveBasket(b);
  }
  function basketCount() {
    return loadBasket().items.reduce((s, i) => s + i.qty, 0);
  }
  function basketTotal() {
    const data = load();
    return loadBasket().items.reduce((s, i) => {
      const p = data.products.find(x => x.id === i.productId);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
  }
  function clearBasket() { saveBasket({ items: [] }); }

  return {
    load, save, ready,
    getProduct, upsertProduct, removeProduct, newProduct,
    loadBanners, newBanner, upsertBanner, removeBanner, moveBanner,
    compressImage, storageUsed, storageQuota,
    exportJson, importJson, publish,
    loadBasket, addToBasket, updateBasketQty, removeFromBasket,
    basketCount, basketTotal, clearBasket,
    uid,
  };
})();
