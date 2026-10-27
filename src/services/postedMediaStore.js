/**
 * Image payloads for posted services live here (memory + IndexedDB).
 * localStorage only stores lightweight media keys — never base64/blob URLs.
 */

export const POSTED_MEDIA_DB_NAME = 'koura2300.postedMedia';
export const POSTED_MEDIA_STORE_NAME = 'media';
export const POSTED_MEDIA_DB_VERSION = 1;
export const POSTED_MEDIA_KEY_PREFIX = 'koura-media:';
export const POSTED_MEDIA_DEFAULT_IMAGE = '/assets/landing/service-plumbing.png';

const memoryCache = new Map();
const listeners = new Set();

const canUseIndexedDb = () =>
  typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';

export const isPostedMediaKey = (value) =>
  String(value ?? '').startsWith(POSTED_MEDIA_KEY_PREFIX);

export const isHeavyImageUrl = (url) => {
  const value = String(url ?? '');
  return value.startsWith('data:') || value.startsWith('blob:');
};

export const buildPostedMediaKey = (serviceId, slot, imageId = '') => {
  const safeServiceId = String(serviceId ?? 'service');
  const safeSlot = String(slot ?? 'banner');
  const safeImageId = String(imageId ?? '');
  return safeImageId
    ? `${POSTED_MEDIA_KEY_PREFIX}${safeServiceId}:${safeSlot}:${safeImageId}`
    : `${POSTED_MEDIA_KEY_PREFIX}${safeServiceId}:${safeSlot}`;
};

export const subscribePostedMedia = (listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyPostedMediaListeners = () => {
  listeners.forEach((listener) => {
    listener();
  });
};

const openMediaDatabase = () =>
  new Promise((resolve, reject) => {
    if (!canUseIndexedDb()) {
      resolve(null);
      return;
    }

    const request = window.indexedDB.open(POSTED_MEDIA_DB_NAME, POSTED_MEDIA_DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(POSTED_MEDIA_STORE_NAME)) {
        database.createObjectStore(POSTED_MEDIA_STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const withMediaStore = async (mode, run) => {
  const database = await openMediaDatabase();
  if (!database) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(POSTED_MEDIA_STORE_NAME, mode);
    const store = transaction.objectStore(POSTED_MEDIA_STORE_NAME);
    let result;

    try {
      result = run(store);
    } catch (error) {
      reject(error);
      return;
    }

    transaction.oncomplete = () => {
      database.close();
      resolve(result);
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error);
    };
  });
};

export const getPostedMediaSync = (mediaKey) => {
  if (!isPostedMediaKey(mediaKey)) {
    return null;
  }

  return memoryCache.get(mediaKey) ?? null;
};

export const resolvePostedMediaUrl = (urlOrKey) => {
  if (!urlOrKey) {
    return POSTED_MEDIA_DEFAULT_IMAGE;
  }

  if (isPostedMediaKey(urlOrKey)) {
    return getPostedMediaSync(urlOrKey) ?? POSTED_MEDIA_DEFAULT_IMAGE;
  }

  return urlOrKey;
};

export const putPostedMedia = async (mediaKey, dataUrl) => {
  if (!mediaKey || !dataUrl) {
    return;
  }

  memoryCache.set(mediaKey, dataUrl);
  notifyPostedMediaListeners();

  if (!canUseIndexedDb()) {
    return;
  }

  await withMediaStore('readwrite', (store) => {
    store.put(dataUrl, mediaKey);
  });
};

export const deletePostedMedia = async (mediaKey) => {
  if (!mediaKey) {
    return;
  }

  memoryCache.delete(mediaKey);
  notifyPostedMediaListeners();

  if (!canUseIndexedDb()) {
    return;
  }

  await withMediaStore('readwrite', (store) => {
    store.delete(mediaKey);
  });
};

export const deletePostedMediaForService = async (serviceId) => {
  const prefix = `${POSTED_MEDIA_KEY_PREFIX}${String(serviceId ?? '')}:`;
  const keysToDelete = [...memoryCache.keys()].filter((key) => key.startsWith(prefix));

  await Promise.all(keysToDelete.map((key) => deletePostedMedia(key)));

  if (!canUseIndexedDb()) {
    return;
  }

  const database = await openMediaDatabase();
  if (!database) {
    return;
  }

  await new Promise((resolve, reject) => {
    const transaction = database.transaction(POSTED_MEDIA_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(POSTED_MEDIA_STORE_NAME);
    const request = store.openCursor();

    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        return;
      }

      if (String(cursor.key).startsWith(prefix)) {
        cursor.delete();
      }
      cursor.continue();
    };

    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });
};

export const hydratePostedMediaCache = async () => {
  if (!canUseIndexedDb()) {
    return memoryCache.size;
  }

  const database = await openMediaDatabase();
  if (!database) {
    return memoryCache.size;
  }

  await new Promise((resolve, reject) => {
    const transaction = database.transaction(POSTED_MEDIA_STORE_NAME, 'readonly');
    const store = transaction.objectStore(POSTED_MEDIA_STORE_NAME);
    const request = store.openCursor();

    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        return;
      }

      memoryCache.set(String(cursor.key), cursor.value);
      cursor.continue();
    };

    transaction.oncomplete = () => {
      database.close();
      notifyPostedMediaListeners();
      resolve();
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });

  return memoryCache.size;
};

export const clearPostedMediaCache = async () => {
  memoryCache.clear();
  notifyPostedMediaListeners();

  if (!canUseIndexedDb()) {
    return;
  }

  await withMediaStore('readwrite', (store) => {
    store.clear();
  });
};

export const __resetPostedMediaStoreForTests = () => {
  memoryCache.clear();
  listeners.clear();
};
