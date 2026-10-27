import {
  __resetPostedMediaStoreForTests,
  buildPostedMediaKey,
  getPostedMediaSync,
} from '../postedMediaStore';
import {
  clearPostedServices,
  deletePostedServiceById,
  getPostedServiceById,
  listPostedServices,
  listPostedServicesRaw,
  POSTED_SERVICES_DEFAULT_IMAGE,
  POSTED_SERVICES_STORAGE_KEY,
  sanitizePostedServiceForStorage,
  upsertPostedService,
} from '../postedServicesStore';

describe('postedServicesStore', () => {
  beforeEach(async () => {
    await clearPostedServices();
    __resetPostedMediaStoreForTests();
  });

  it('persists posted services as JSON in localStorage', async () => {
    const service = {
      id: 'posted-demo-1',
      title: 'Demo Service',
      image: '/assets/landing/service-faucet.png',
      details: { additionalFeatures: [], sizes: [], options: [], otherImages: [] },
    };

    await upsertPostedService(service);

    expect(getPostedServiceById('posted-demo-1')).toEqual(service);
    expect(listPostedServices()).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem(POSTED_SERVICES_STORAGE_KEY))).toHaveLength(1);
  });

  it('stores uploaded images in media cache and keeps keys in localStorage', async () => {
    const bannerDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB';
    const otherDataUrl = 'data:image/png;base64,AAAA';

    const saved = await upsertPostedService({
      id: 'posted-heavy',
      title: 'Heavy Image',
      image: bannerDataUrl,
      details: {
        otherImages: [{ id: '1', previewUrl: otherDataUrl, name: 'a.png' }],
      },
    });

    const bannerKey = buildPostedMediaKey('posted-heavy', 'banner');
    const otherKey = buildPostedMediaKey('posted-heavy', 'other', '1');

    expect(saved.image).toBe(bannerDataUrl);
    expect(saved.details.otherImages[0].previewUrl).toBe(otherDataUrl);
    expect(getPostedMediaSync(bannerKey)).toBe(bannerDataUrl);
    expect(getPostedMediaSync(otherKey)).toBe(otherDataUrl);

    const raw = listPostedServicesRaw()[0];
    expect(raw.image).toBe(bannerKey);
    expect(raw.details.otherImages[0].mediaKey).toBe(otherKey);
    expect(localStorage.getItem(POSTED_SERVICES_STORAGE_KEY)).not.toContain('data:image');
  });

  it('recovers when localStorage quota is exceeded', async () => {
    const originalSetItem = Storage.prototype.setItem;
    let callCount = 0;

    Storage.prototype.setItem = function setItemMock(key, value) {
      callCount += 1;
      if (callCount === 1 && key === POSTED_SERVICES_STORAGE_KEY) {
        const quotaError = new Error('QuotaExceededError');
        quotaError.name = 'QuotaExceededError';
        throw quotaError;
      }

      return originalSetItem.call(this, key, value);
    };

    try {
      const saved = await upsertPostedService({
        id: 'posted-quota',
        title: 'Quota Service',
        image: 'data:image/png;base64,AAAA',
        details: { otherImages: [{ id: 'x', previewUrl: 'blob:http://localhost/1' }] },
      });

      expect(saved.image).toBe('data:image/png;base64,AAAA');
      expect(getPostedServiceById('posted-quota')).toBeTruthy();
    } finally {
      Storage.prototype.setItem = originalSetItem;
    }
  });

  it('updates and deletes posted services by id', async () => {
    await upsertPostedService({
      id: 'posted-1',
      title: 'One',
      image: POSTED_SERVICES_DEFAULT_IMAGE,
    });
    await upsertPostedService({
      id: 'posted-1',
      title: 'Updated',
      image: POSTED_SERVICES_DEFAULT_IMAGE,
    });

    expect(listPostedServices()).toHaveLength(1);
    expect(getPostedServiceById('posted-1').title).toBe('Updated');

    await deletePostedServiceById('posted-1');
    expect(getPostedServiceById('posted-1')).toBeNull();
  });

  it('sanitizes heavy image payloads for localStorage records', () => {
    expect(
      sanitizePostedServiceForStorage({
        id: '1',
        image: 'blob:http://localhost/file',
        details: { otherImages: [{ previewUrl: 'data:image/png;base64,AA' }] },
      }).image,
    ).toBe(POSTED_SERVICES_DEFAULT_IMAGE);
  });
});
