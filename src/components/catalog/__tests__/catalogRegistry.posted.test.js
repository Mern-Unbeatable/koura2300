import {
  listCatalogServicesWithPosted,
  mergePostedIntoCatalogServices,
} from '../catalogRegistry';
import { LIGHTING_SERVICES } from '../../lighting/lightingData';
import { ROUTES } from '../../../config';
import {
  clearPostedServices,
  upsertPostedService,
} from '../../../services/postedServicesStore';
import { __resetPostedMediaStoreForTests } from '../../../services/postedMediaStore';

describe('catalogRegistry posted services', () => {
  beforeEach(async () => {
    await clearPostedServices();
    __resetPostedMediaStoreForTests();
  });

  it('merges admin-posted services into catalog lists until deleted', async () => {
    await upsertPostedService({
      id: 'posted-home-lighting-1',
      title: 'Posted Home Light',
      description: 'Admin uploaded service',
      category: 'Indoor Lighting',
      catalogTitle: 'Lighting',
      catalogPath: ROUTES.LIGHTING,
      duration: '1-2 hours',
      price: 120,
      rating: '4.9 (312)',
      image: '/assets/landing/service-plumbing.png',
      imageAlt: 'Posted Home Light',
      details: { otherImages: [] },
    });

    const lighting = mergePostedIntoCatalogServices(LIGHTING_SERVICES, {
      catalogPath: ROUTES.LIGHTING,
    });
    const homeLike = mergePostedIntoCatalogServices([]);
    const all = listCatalogServicesWithPosted();

    expect(lighting[0].id).toBe('posted-home-lighting-1');
    expect(lighting[0].isPosted).toBe(true);
    expect(homeLike.some((service) => service.id === 'posted-home-lighting-1')).toBe(true);
    expect(all.some((service) => service.id === 'posted-home-lighting-1')).toBe(true);
  });
});
