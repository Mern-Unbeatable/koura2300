import { ADS_ALL_FILTER_ID, ADS_SUBCATEGORY_OPTIONS } from './adsData';

export const filterAds = (ads, categoryId, subcategoryId) => {
  const matchesCategory =
    !categoryId || categoryId === ADS_ALL_FILTER_ID
      ? () => true
      : (ad) => ad.catalogTitle === categoryId;

  const matchesSubcategory =
    !subcategoryId || subcategoryId === ADS_ALL_FILTER_ID
      ? () => true
      : (ad) => ad.category === subcategoryId;

  return ads.filter((ad) => matchesCategory(ad) && matchesSubcategory(ad));
};

export const getSubcategoryOptionsForCategory = (categoryId) => {
  if (!categoryId || categoryId === ADS_ALL_FILTER_ID) {
    return ADS_SUBCATEGORY_OPTIONS;
  }

  return ADS_SUBCATEGORY_OPTIONS.filter(
    (option) =>
      option.id === ADS_ALL_FILTER_ID || option.categoryId === categoryId,
  );
};

export const deleteAdById = (ads, adId) => ads.filter((ad) => ad.id !== adId);

export {
  clampPage,
  getPaginationItems,
  getTotalPages,
  PAGINATION_ELLIPSIS_TOKEN,
  paginateItems as paginateAds,
  shouldShowPagination as shouldShowAdsPagination,
} from '../shared/adminPaginationUtils';
