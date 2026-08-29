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
  clampPage,
  getPaginationItems,
  getTotalPages,
  PAGINATION_ELLIPSIS_TOKEN,
  paginateItems as paginateServices,
  shouldShowPagination as shouldShowServicesPagination,
} from '../shared/adminPaginationUtils';
