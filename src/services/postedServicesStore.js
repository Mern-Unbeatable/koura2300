/**
 * Frontend JSON persistence for admin-posted services.
 * Swap the storage adapters for real API calls later without changing callers.
 *
 * localStorage keeps metadata only. Image bytes live in postedMediaStore (IndexedDB).
 */

import {
  buildPostedMediaKey,
  clearPostedMediaCache,
  deletePostedMediaForService,
  isHeavyImageUrl,
  isPostedMediaKey,
  POSTED_MEDIA_DEFAULT_IMAGE,
  putPostedMedia,
  resolvePostedMediaUrl,
} from './postedMediaStore';

export const POSTED_SERVICES_STORAGE_KEY = 'koura2300.postedServices.v1';
export const POSTED_SERVICES_DEFAULT_IMAGE = POSTED_MEDIA_DEFAULT_IMAGE;

const canUseStorage = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const toStorageImageRef = (url) => {
  if (!url || isHeavyImageUrl(url)) {
    return POSTED_SERVICES_DEFAULT_IMAGE;
  }

  return url;
};

const toStorageOtherImages = (otherImages) =>
  (Array.isArray(otherImages) ? otherImages : [])
    .map((image) => {
      if (!image) {
        return null;
      }

      if (isPostedMediaKey(image.mediaKey)) {
        return {
          id: image.id,
          mediaKey: image.mediaKey,
          name: image.name ?? '',
        };
      }

      if (image.previewUrl && !isHeavyImageUrl(image.previewUrl)) {
        return {
          id: image.id,
          mediaKey: image.previewUrl,
          name: image.name ?? '',
        };
      }

      return null;
    })
    .filter(Boolean);

export const sanitizePostedServiceForStorage = (service) => {
  if (!service) {
    return service;
  }

  const details = service.details ?? {};

  return {
    ...service,
    image: toStorageImageRef(service.image),
    details: {
      ...details,
      otherImages: toStorageOtherImages(details.otherImages),
    },
  };
};

const persistServiceMedia = async (service) => {
  if (!service?.id) {
    return sanitizePostedServiceForStorage(service);
  }

  let imageRef = service.image;
  if (isHeavyImageUrl(service.image)) {
    imageRef = buildPostedMediaKey(service.id, 'banner');
    await putPostedMedia(imageRef, service.image);
  } else if (!imageRef) {
    imageRef = POSTED_SERVICES_DEFAULT_IMAGE;
  }

  const sourceOthers = Array.isArray(service.details?.otherImages)
    ? service.details.otherImages
    : [];
  const otherImages = [];

  for (const image of sourceOthers) {
    if (!image) {
      continue;
    }

    if (isHeavyImageUrl(image.previewUrl)) {
      const mediaKey = buildPostedMediaKey(service.id, 'other', image.id || otherImages.length);
      await putPostedMedia(mediaKey, image.previewUrl);
      otherImages.push({
        id: image.id,
        mediaKey,
        name: image.name ?? '',
      });
      continue;
    }

    if (isPostedMediaKey(image.mediaKey)) {
      otherImages.push({
        id: image.id,
        mediaKey: image.mediaKey,
        name: image.name ?? '',
      });
      continue;
    }

    if (image.previewUrl && !isHeavyImageUrl(image.previewUrl)) {
      otherImages.push({
        id: image.id,
        mediaKey: image.previewUrl,
        name: image.name ?? '',
      });
    }
  }

  return {
    ...service,
    image: imageRef,
    details: {
      ...(service.details ?? {}),
      otherImages,
    },
  };
};

export const resolvePostedServiceMedia = (service) => {
  if (!service) {
    return service;
  }

  const details = service.details ?? {};
  const otherImages = (Array.isArray(details.otherImages) ? details.otherImages : []).map(
    (image) => ({
      ...image,
      previewUrl: resolvePostedMediaUrl(image.mediaKey || image.previewUrl),
    }),
  );

  return {
    ...service,
    image: resolvePostedMediaUrl(service.image),
    details: {
      ...details,
      otherImages,
    },
  };
};

const readStorageJson = () => {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(POSTED_SERVICES_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStorageJson = (services) => {
  if (!canUseStorage()) {
    return { ok: true };
  }

  const payload = JSON.stringify(services);

  try {
    window.localStorage.setItem(POSTED_SERVICES_STORAGE_KEY, payload);
    return { ok: true };
  } catch (error) {
    const isQuotaError =
      error?.name === 'QuotaExceededError' ||
      error?.code === 22 ||
      error?.code === 1014;

    if (!isQuotaError) {
      throw error;
    }

    const sanitized = services.map(sanitizePostedServiceForStorage);
    try {
      window.localStorage.setItem(POSTED_SERVICES_STORAGE_KEY, JSON.stringify(sanitized));
      return { ok: true, recoveredFromQuota: true };
    } catch {
      window.localStorage.removeItem(POSTED_SERVICES_STORAGE_KEY);
      window.localStorage.setItem(
        POSTED_SERVICES_STORAGE_KEY,
        JSON.stringify(sanitized.slice(0, 1)),
      );
      return { ok: true, recoveredFromQuota: true, trimmed: true };
    }
  }
};

export const listPostedServicesRaw = () => readStorageJson();

export const listPostedServices = () =>
  readStorageJson().map(resolvePostedServiceMedia);

export const getPostedServiceById = (serviceId) =>
  listPostedServices().find((service) => service.id === serviceId) ?? null;

export const upsertPostedService = async (service) => {
  const persisted = await persistServiceMedia(service);
  const storageRecord = sanitizePostedServiceForStorage(persisted);
  const current = readStorageJson().map(sanitizePostedServiceForStorage);
  const index = current.findIndex((item) => item.id === storageRecord.id);
  const next =
    index >= 0
      ? current.map((item, itemIndex) =>
          itemIndex === index ? storageRecord : item,
        )
      : [storageRecord, ...current];

  writeStorageJson(next);
  return resolvePostedServiceMedia(storageRecord);
};

export const deletePostedServiceById = async (serviceId) => {
  await deletePostedMediaForService(serviceId);
  const next = readStorageJson().filter((service) => service.id !== serviceId);
  writeStorageJson(next);
  return next.map(resolvePostedServiceMedia);
};

export const clearPostedServices = async () => {
  await clearPostedMediaCache();

  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(POSTED_SERVICES_STORAGE_KEY);
};
