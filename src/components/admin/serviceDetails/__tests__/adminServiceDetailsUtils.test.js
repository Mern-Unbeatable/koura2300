import {
  ADMIN_SERVICE_DETAILS_ASSETS,
  ADMIN_SERVICE_DETAILS_GALLERY_THUMB_COUNT,
  ADMIN_SERVICE_DETAILS_RATING_DISTRIBUTION,
  ADMIN_SERVICE_DETAILS_REVIEWS,
} from '../adminServiceDetailsData';
import {
  buildAdminServiceGalleryImages,
  getAdminServiceDetailsById,
  parseServiceRatingLabel,
} from '../adminServiceDetailsUtils';
import { SERVICES_SEED } from '../../services/servicesData';

describe('adminServiceDetailsUtils', () => {
  const lightingService = SERVICES_SEED.find(
    (service) => service.catalogTitle === 'Lighting',
  );
  const fenceService = SERVICES_SEED.find((service) => service.catalogTitle === 'Fence');

  it('parses the Figma rating score and count labels', () => {
    expect(parseServiceRatingLabel('4.9 (312)')).toEqual({
      scoreLabel: '4.9',
      countLabel: '(312)',
    });
  });

  it('builds lighting gallery assets from the Figma service details set', () => {
    const gallery = buildAdminServiceGalleryImages(lightingService);

    expect(gallery.hero).toBe(ADMIN_SERVICE_DETAILS_ASSETS.hero);
    expect(gallery.thumbnails).toHaveLength(ADMIN_SERVICE_DETAILS_GALLERY_THUMB_COUNT);
    expect(gallery.thumbnails).toEqual(ADMIN_SERVICE_DETAILS_ASSETS.thumbs);
  });

  it('falls back to the service image for non-lighting galleries', () => {
    const gallery = buildAdminServiceGalleryImages(fenceService);

    expect(gallery.hero).toBe(fenceService.image);
    expect(gallery.thumbnails).toEqual(
      Array.from({ length: ADMIN_SERVICE_DETAILS_GALLERY_THUMB_COUNT }, () => fenceService.image),
    );
  });

  it('returns full admin service details with packages inclusions and reviews', () => {
    const details = getAdminServiceDetailsById(lightingService.id);

    expect(details.service.id).toBe(lightingService.id);
    expect(details.packages).toHaveLength(2);
    expect(details.includedItems.length).toBeGreaterThan(0);
    expect(details.excludedItems.length).toBeGreaterThan(0);
    expect(details.ratingDistribution).toEqual(ADMIN_SERVICE_DETAILS_RATING_DISTRIBUTION);
    expect(details.reviews).toEqual(ADMIN_SERVICE_DETAILS_REVIEWS);
    expect(details.gallery.hero).toBe(ADMIN_SERVICE_DETAILS_ASSETS.hero);
  });

  it('returns null when the service id is missing', () => {
    expect(getAdminServiceDetailsById('missing-service')).toBeNull();
  });
});
