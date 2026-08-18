import { useCallback, useMemo, useState } from 'react';
import { FIRST_PAGE_INDEX, paginateItems } from '../components/catalog/catalogData';

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
  const pagination = useMemo(
    () => paginateItems(filteredServices, pageIndex, pageSize),
    [filteredServices, pageIndex, pageSize],
  );

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
    visibleServices: pagination.items,
    pageIndex: pagination.pageIndex,
    pageCount: pagination.pageCount,
    handleCategoryChange,
    handlePriceRangeChange,
    showPage,
    showPreviousPage,
    showNextPage,
  };
};

export default useServiceCatalog;
