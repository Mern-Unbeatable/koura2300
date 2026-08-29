import { useCallback, useMemo, useState } from 'react';
import { FIRST_PAGE_INDEX, paginateItems } from '../components/catalog/catalogData';
import { buildSubcategoryCards } from '../components/catalog/subcategoryData';

const findPriceRange = (priceRanges, selectedValue) =>
  priceRanges.find(({ value }) => value === selectedValue) ?? priceRanges[0];

const filterServices = ({
  services,
  selectedCategory,
  selectedPriceRange,
  priceRanges,
}) => {
  if (!selectedCategory) {
    return [];
  }

  const priceRange = findPriceRange(priceRanges, selectedPriceRange);

  return services.filter(
    (service) =>
      service.category === selectedCategory &&
      service.price >= priceRange.minimum &&
      service.price <= priceRange.maximum,
  );
};

const useServiceCatalog = ({ services, allCategory, priceRanges, pageSize }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0].value);
  const [pageIndex, setPageIndex] = useState(FIRST_PAGE_INDEX);

  const subcategoryCards = useMemo(
    () => buildSubcategoryCards(services, allCategory),
    [allCategory, services],
  );

  const isBrowsingServices = Boolean(selectedCategory);

  const filteredServices = useMemo(
    () =>
      filterServices({
        services,
        selectedCategory,
        selectedPriceRange,
        priceRanges,
      }),
    [priceRanges, selectedCategory, selectedPriceRange, services],
  );

  const pagination = useMemo(
    () => paginateItems(filteredServices, pageIndex, pageSize),
    [filteredServices, pageIndex, pageSize],
  );

  const handleSubcategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    setPageIndex(FIRST_PAGE_INDEX);
  }, []);

  const handleBackToSubcategories = useCallback(() => {
    setSelectedCategory(null);
    setSelectedPriceRange(priceRanges[0].value);
    setPageIndex(FIRST_PAGE_INDEX);
  }, [priceRanges]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setPageIndex(FIRST_PAGE_INDEX);
  }, []);

  const handlePriceRangeChange = useCallback((priceRange) => {
    setSelectedPriceRange(priceRange);
    setPageIndex(FIRST_PAGE_INDEX);
  }, []);

  const showPage = useCallback((nextPageIndex) => {
    setPageIndex(nextPageIndex);
  }, []);

  const showPreviousPage = useCallback(() => {
    setPageIndex((currentPageIndex) => Math.max(currentPageIndex - 1, FIRST_PAGE_INDEX));
  }, []);

  const showNextPage = useCallback(() => {
    setPageIndex((currentPageIndex) => currentPageIndex + 1);
  }, []);

  return {
    selectedCategory,
    selectedPriceRange,
    subcategoryCards,
    isBrowsingServices,
    visibleServices: pagination.items,
    pageIndex: pagination.pageIndex,
    pageCount: isBrowsingServices ? pagination.pageCount : 0,
    handleSubcategorySelect,
    handleBackToSubcategories,
    handleCategoryChange,
    handlePriceRangeChange,
    showPage,
    showPreviousPage,
    showNextPage,
  };
};

export default useServiceCatalog;
