import {
  SERVICES_ALL_FILTER_ID,
  SERVICES_SUBCATEGORY_OPTIONS,
} from './servicesData';

export const filterServices = (services, categoryId, subcategoryId) => {
  const matchesCategory =
    !categoryId || categoryId === SERVICES_ALL_FILTER_ID
      ? () => true
      : (service) => service.catalogTitle === categoryId;

  const matchesSubcategory =
    !subcategoryId || subcategoryId === SERVICES_ALL_FILTER_ID
      ? () => true
      : (service) => service.category === subcategoryId;

  return services.filter(
    (service) => matchesCategory(service) && matchesSubcategory(service),
  );
};

export const getTotalPages = (totalItems, pageSize) =>
  Math.max(1, Math.ceil(totalItems / pageSize));

export const paginateServices = (services, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;

  return services.slice(startIndex, startIndex + pageSize);
};

export const getServicesSummary = (services) => ({
  totalServices: services.length,
  subtitle: `${services.length} services`,
});

export const getSubcategoryOptionsForCategory = (categoryId) => {
  if (!categoryId || categoryId === SERVICES_ALL_FILTER_ID) {
    return SERVICES_SUBCATEGORY_OPTIONS;
  }

  return SERVICES_SUBCATEGORY_OPTIONS.filter(
    (option) =>
      option.id === SERVICES_ALL_FILTER_ID || option.categoryId === categoryId,
  );
};

export const deleteServiceById = (services, serviceId) =>
  services.filter((service) => service.id !== serviceId);

export {
  findServiceById,
  updateServiceById,
} from './servicesEditUtils';

const PAGINATION_COMPACT_LIMIT = 5;
const PAGINATION_ELLIPSIS = 'ellipsis';
const PAGINATION_EDGE_WINDOW = 3;

/**
 * Figma Pagination (V3): Prev · 1 · 2 · 3 · … · last · Next
 * Window shifts when the active page moves toward the end.
 */
export const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= PAGINATION_COMPACT_LIMIT) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= PAGINATION_EDGE_WINDOW) {
    return [1, 2, 3, PAGINATION_ELLIPSIS, totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, PAGINATION_ELLIPSIS, totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    PAGINATION_ELLIPSIS,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    PAGINATION_ELLIPSIS,
    totalPages,
  ];
};

export const PAGINATION_ELLIPSIS_TOKEN = PAGINATION_ELLIPSIS;

export const clampPage = (page, totalPages) =>
  Math.min(Math.max(page, 1), totalPages);

/** Pagination only when filtered results exceed one page of cards. */
export const shouldShowServicesPagination = (totalItems, pageSize) =>
  totalItems > pageSize;
