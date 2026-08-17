import { useCallback, useMemo, useState } from 'react';
import {
  LIGHTING_ALL_CATEGORY,
  LIGHTING_PAGE_SIZE,
  LIGHTING_PRICE_RANGES,
} from '../components/lighting/lightingData';

const INITIAL_CATEGORY = LIGHTING_ALL_CATEGORY;
const INITIAL_PRICE_RANGE = LIGHTING_PRICE_RANGES[0].value;
const FIRST_PAGE_INDEX = 0;

const isInSelectedCategory = (service, selectedCategory) =>
  selectedCategory === LIGHTING_ALL_CATEGORY || service.category === selectedCategory;

const isInSelectedPriceRange = (service, selectedPriceRange) => {
  const priceRange =
    LIGHTING_PRICE_RANGES.find(({ value }) => value === selectedPriceRange) ??
    LIGHTING_PRICE_RANGES[0];

  return service.price >= priceRange.minimum && service.price <= priceRange.maximum;
};

const filterLightingServices = (services, selectedCategory, selectedPriceRange) =>
  services.filter(
    (service) =>
      isInSelectedCategory(service, selectedCategory) &&
      isInSelectedPriceRange(service, selectedPriceRange),
  );

const getVisibleServices = (services, pageIndex) => {
  const firstServiceIndex = pageIndex * LIGHTING_PAGE_SIZE;
  return services.slice(firstServiceIndex, firstServiceIndex + LIGHTING_PAGE_SIZE);
};

const useLightingCatalog = (services) => {
  const [selectedCategory, setSelectedCategory] = useState(INITIAL_CATEGORY);
  const [selectedPriceRange, setSelectedPriceRange] = useState(INITIAL_PRICE_RANGE);
  const [pageIndex, setPageIndex] = useState(FIRST_PAGE_INDEX);

  const filteredServices = useMemo(
    () => filterLightingServices(services, selectedCategory, selectedPriceRange),
    [services, selectedCategory, selectedPriceRange],
  );
  const pageCount = Math.max(Math.ceil(filteredServices.length / LIGHTING_PAGE_SIZE), 1);
  const safePageIndex = Math.min(pageIndex, pageCount - 1);
  const visibleServices = useMemo(
    () => getVisibleServices(filteredServices, safePageIndex),
    [filteredServices, safePageIndex],
  );

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setPageIndex(FIRST_PAGE_INDEX);
  }, []);

  const handlePriceRangeChange = useCallback((event) => {
    setSelectedPriceRange(event.target.value);
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

export default useLightingCatalog;
