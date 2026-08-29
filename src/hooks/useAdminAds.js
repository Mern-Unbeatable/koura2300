import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { ADS_COPY } from '../components/admin/ads/adsCopy';
import {
  ADS_ALL_FILTER_ID,
  ADS_CATEGORY_OPTIONS,
  ADS_FIRST_PAGE,
  ADS_PAGE_SIZE,
  ADS_SEED,
} from '../components/admin/ads/adsData';
import {
  clampPage,
  deleteAdById,
  filterAds,
  getPaginationItems,
  getSubcategoryOptionsForCategory,
  getTotalPages,
  paginateAds,
  shouldShowAdsPagination,
} from '../components/admin/ads/adsUtils';

const useAdminAds = () => {
  const [ads, setAds] = useState(ADS_SEED);
  const [selectedCategoryId, setSelectedCategoryId] = useState(ADS_ALL_FILTER_ID);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(ADS_ALL_FILTER_ID);
  const [currentPage, setCurrentPage] = useState(ADS_FIRST_PAGE);
  const [pendingDeleteAdId, setPendingDeleteAdId] = useState(null);

  const filteredAds = useMemo(
    () => filterAds(ads, selectedCategoryId, selectedSubcategoryId),
    [ads, selectedCategoryId, selectedSubcategoryId],
  );

  const totalPages = useMemo(
    () => getTotalPages(filteredAds.length, ADS_PAGE_SIZE),
    [filteredAds.length],
  );

  const activePage = useMemo(
    () => clampPage(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const paginatedAds = useMemo(
    () => paginateAds(filteredAds, activePage, ADS_PAGE_SIZE),
    [activePage, filteredAds],
  );

  const subcategoryOptions = useMemo(
    () => getSubcategoryOptionsForCategory(selectedCategoryId),
    [selectedCategoryId],
  );

  const pendingDeleteAd = useMemo(
    () => ads.find((ad) => ad.id === pendingDeleteAdId) ?? null,
    [ads, pendingDeleteAdId],
  );

  const pagination = useMemo(
    () => ({
      isVisible: shouldShowAdsPagination(filteredAds.length, ADS_PAGE_SIZE),
      currentPage: activePage,
      totalPages,
      pageItems: getPaginationItems(activePage, totalPages),
      canGoPrevious: activePage > ADS_FIRST_PAGE,
      canGoNext: activePage < totalPages,
      onPrevious: () => setCurrentPage((page) => clampPage(page - 1, totalPages)),
      onNext: () => setCurrentPage((page) => clampPage(page + 1, totalPages)),
      onPageChange: (page) => setCurrentPage(clampPage(page, totalPages)),
    }),
    [activePage, filteredAds.length, totalPages],
  );

  const handleCategoryFilterChange = useCallback((event) => {
    setSelectedCategoryId(event.target.value);
    setSelectedSubcategoryId(ADS_ALL_FILTER_ID);
    setCurrentPage(ADS_FIRST_PAGE);
  }, []);

  const handleSubcategoryFilterChange = useCallback((event) => {
    setSelectedSubcategoryId(event.target.value);
    setCurrentPage(ADS_FIRST_PAGE);
  }, []);

  const handleAddNewAd = useCallback(() => {
    toast.success(ADS_COPY.toasts.addAd);
  }, []);

  const handleEditAd = useCallback(() => {
    toast.success(ADS_COPY.toasts.editAd);
  }, []);

  const handleDeleteAd = useCallback((adId) => {
    setPendingDeleteAdId(adId);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setPendingDeleteAdId(null);
  }, []);

  const handleConfirmDeleteAd = useCallback(() => {
    if (!pendingDeleteAdId) {
      return;
    }

    setAds((currentAds) => deleteAdById(currentAds, pendingDeleteAdId));
    setPendingDeleteAdId(null);
    toast.success(ADS_COPY.toasts.deleted);
  }, [pendingDeleteAdId]);

  return {
    copy: ADS_COPY,
    ads: paginatedAds,
    categoryOptions: ADS_CATEGORY_OPTIONS,
    subcategoryOptions,
    selectedCategoryId,
    selectedSubcategoryId,
    pagination,
    deleteAdTitle: pendingDeleteAd?.title ?? '',
    isDeleteModalOpen: Boolean(pendingDeleteAdId),
    onCategoryFilterChange: handleCategoryFilterChange,
    onSubcategoryFilterChange: handleSubcategoryFilterChange,
    onAddNewAd: handleAddNewAd,
    onEditAd: handleEditAd,
    onDeleteAd: handleDeleteAd,
    onCloseDeleteModal: handleCloseDeleteModal,
    onConfirmDeleteAd: handleConfirmDeleteAd,
  };
};

export default useAdminAds;
