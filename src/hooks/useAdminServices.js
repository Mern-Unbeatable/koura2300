import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  buildAdminServiceEditRoute,
  buildAdminServiceNewRoute,
} from '../config';
import { SERVICES_COPY } from '../components/admin/services/servicesCopy';
import {
  SERVICES_ALL_FILTER_ID,
  SERVICES_CATEGORY_OPTIONS,
  SERVICES_PAGE_SIZE,
  SERVICES_SEED,
} from '../components/admin/services/servicesData';
import {
  clampPage,
  deleteServiceById,
  filterServices,
  getPaginationItems,
  getServicesSummary,
  getSubcategoryOptionsForCategory,
  getTotalPages,
  paginateServices,
  shouldShowServicesPagination,
} from '../components/admin/services/servicesUtils';
import { mergePostedServicesWithSeed } from '../services/postedServiceMapper';
import {
  deletePostedServiceById,
  listPostedServices,
} from '../services/postedServicesStore';
import usePostedMediaHydration from './usePostedMediaHydration';

const getAdminServicesList = () =>
  mergePostedServicesWithSeed(SERVICES_SEED, listPostedServices());

const useAdminServices = () => {
  const navigate = useNavigate();
  const mediaVersion = usePostedMediaHydration();
  const [services, setServices] = useState(getAdminServicesList);
  const [selectedCategoryId, setSelectedCategoryId] = useState(SERVICES_ALL_FILTER_ID);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(SERVICES_ALL_FILTER_ID);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setServices(getAdminServicesList());
  }, [mediaVersion]);

  const filteredServices = useMemo(
    () => filterServices(services, selectedCategoryId, selectedSubcategoryId),
    [selectedCategoryId, selectedSubcategoryId, services],
  );

  const totalPages = useMemo(
    () => getTotalPages(filteredServices.length, SERVICES_PAGE_SIZE),
    [filteredServices.length],
  );

  const activePage = useMemo(
    () => clampPage(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const paginatedServices = useMemo(
    () => paginateServices(filteredServices, activePage, SERVICES_PAGE_SIZE),
    [activePage, filteredServices],
  );

  const summarySubtitle = useMemo(
    () => getServicesSummary(filteredServices).subtitle,
    [filteredServices],
  );

  const subcategoryOptions = useMemo(
    () => getSubcategoryOptionsForCategory(selectedCategoryId),
    [selectedCategoryId],
  );

  const pagination = useMemo(
    () => ({
      isVisible: shouldShowServicesPagination(filteredServices.length, SERVICES_PAGE_SIZE),
      currentPage: activePage,
      totalPages,
      pageItems: getPaginationItems(activePage, totalPages),
      canGoPrevious: activePage > 1,
      canGoNext: activePage < totalPages,
      onPrevious: () => setCurrentPage((page) => clampPage(page - 1, totalPages)),
      onNext: () => setCurrentPage((page) => clampPage(page + 1, totalPages)),
      onPageChange: (page) => setCurrentPage(clampPage(page, totalPages)),
    }),
    [activePage, filteredServices.length, totalPages],
  );

  const handleCategoryFilterChange = useCallback((event) => {
    setSelectedCategoryId(event.target.value);
    setSelectedSubcategoryId(SERVICES_ALL_FILTER_ID);
    setCurrentPage(1);
  }, []);

  const handleSubcategoryFilterChange = useCallback((event) => {
    setSelectedSubcategoryId(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleAddNewService = useCallback(() => {
    navigate(buildAdminServiceNewRoute());
  }, [navigate]);

  const handleEditService = useCallback(
    (serviceId) => {
      navigate(buildAdminServiceEditRoute(serviceId));
    },
    [navigate],
  );

  const handleDeleteService = useCallback(async (serviceId) => {
    await deletePostedServiceById(serviceId);
    setServices((currentServices) => deleteServiceById(currentServices, serviceId));
    toast.success(SERVICES_COPY.toasts.deleteService);
  }, []);

  return {
    copy: SERVICES_COPY,
    services: paginatedServices,
    summarySubtitle,
    categoryOptions: SERVICES_CATEGORY_OPTIONS,
    subcategoryOptions,
    selectedCategoryId,
    selectedSubcategoryId,
    onCategoryFilterChange: handleCategoryFilterChange,
    onSubcategoryFilterChange: handleSubcategoryFilterChange,
    onAddNewService: handleAddNewService,
    onEditService: handleEditService,
    onDeleteService: handleDeleteService,
    pagination,
  };
};

export default useAdminServices;
