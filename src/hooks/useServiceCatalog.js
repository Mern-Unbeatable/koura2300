import { useCallback, useMemo, useState } from 'react';

const FIRST_PAGE_INDEX = 0;

const findPriceRange = (priceRanges, selectedValue) =>
  priceRanges.find(({ value }) => value === selectedValue) ?? priceRanges[0];

const filterServices = ({
  services,
  selectedCategory,
  selectedPriceRange,
  allCategory,
  priceRanges,
}) => {
  const priceRange = findPriceRange(priceRanges, selectedPriceRange);

  return services.filter(
    (service) =>
      (selectedCategory === allCategory || service.category === selectedCategory) &&
      service.price >= priceRange.minimum &&
      service.price <= priceRange.maximum,
  );
};

const getVisibleServices = (services, pageIndex, pageSize) => {
  const firstServiceIndex = pageIndex * pageSize;
  return services.slice(firstServiceIndex, firstServiceIndex + pageSize);
};

const useServiceCatalog = ({ services, allCategory, priceRanges, pageSize }) => {
  const [selectedCategory, setSelectedCategory] = useState(allCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0].value);
  const [pageIndex, setPageIndex] = useState(FIRST_PAGE_INDEX);

  const filteredServices = useMemo(
    () =>
      filterServices({
        services,
        selectedCategory,
        selectedPriceRange,
        allCategory,
        priceRanges,
      }),
    [allCategory, priceRanges, selectedCategory, selectedPriceRange, services],
  );
  const pageCount = Math.max(Math.ceil(filteredServices.length / pageSize), 1);
  const safePageIndex = Math.min(pageIndex, pageCount - 1);
  const visibleServices = useMemo(
    () => getVisibleServices(filteredServices, safePageIndex, pageSize),
    [filteredServices, pageSize, safePageIndex],
  );

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setPageIndex(FIRST_PAGE_INDEX);
  }, []);

  const handlePriceRangeChange = useCallback((priceRange) => {
    setSelectedPriceRange(priceRange);
    setPageIndex(FIRST_PAGE_INDEX);
  }, []);

  const showPage = useCallback(
    (nextPageIndex) => {
      setPageIndex(Math.min(Math.max(nextPageIndex, FIRST_PAGE_INDEX), pageCount - 1));
    },
    [pageCount],
  );

  const showPreviousPage = useCallback(() => {
    setPageIndex((currentPageIndex) => Math.max(currentPageIndex - 1, FIRST_PAGE_INDEX));
  }, []);

  const showNextPage = useCallback(() => {
    setPageIndex((currentPageIndex) => Math.min(currentPageIndex + 1, pageCount - 1));
  }, [pageCount]);

  return {
    selectedCategory,
    selectedPriceRange,
    visibleServices,
    pageIndex: safePageIndex,
    pageCount,
    handleCategoryChange,
    handlePriceRangeChange,
    showPage,
    showPreviousPage,
    showNextPage,
  };
};

export default useServiceCatalog;
