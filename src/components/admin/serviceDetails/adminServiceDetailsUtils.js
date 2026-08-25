import { getCatalogServiceDetails } from '../../serviceDetails/serviceDetailsData';
import {
  ADMIN_SERVICE_DETAILS_ASSETS,
  ADMIN_SERVICE_DETAILS_GALLERY_THUMB_COUNT,
  ADMIN_SERVICE_DETAILS_RATING_DISTRIBUTION,
  ADMIN_SERVICE_DETAILS_RATING_SUMMARY,
  ADMIN_SERVICE_DETAILS_REVIEWS,
} from './adminServiceDetailsData';

const LIGHTING_CATALOG_TITLE = 'Lighting';

export const buildAdminServiceGalleryImages = (service) => {
  if (!service) {
    return { hero: '', thumbnails: [] };
  }

  const useLightingGallery = service.catalogTitle === LIGHTING_CATALOG_TITLE;

  return {
    hero: useLightingGallery ? ADMIN_SERVICE_DETAILS_ASSETS.hero : service.image,
    thumbnails: useLightingGallery
      ? ADMIN_SERVICE_DETAILS_ASSETS.thumbs
      : Array.from(
          { length: ADMIN_SERVICE_DETAILS_GALLERY_THUMB_COUNT },
          () => service.image,
        ),
  };
};

export const getAdminServiceDetailsById = (serviceId) => {
  const catalogDetails = getCatalogServiceDetails(serviceId);

  if (!catalogDetails.service) {
    return null;
  }

  return {
    ...catalogDetails,
    gallery: buildAdminServiceGalleryImages(catalogDetails.service),
    ratingSummary: ADMIN_SERVICE_DETAILS_RATING_SUMMARY,
    ratingDistribution: ADMIN_SERVICE_DETAILS_RATING_DISTRIBUTION,
    reviews: ADMIN_SERVICE_DETAILS_REVIEWS,
  };
};
