import { useCallback, useEffect, useMemo, useState } from 'react';
import { FIRST_PAGE_INDEX, paginateItems } from '../components/catalog/catalogData';
import { TOP_RATED_PAGE_SIZE } from '../components/topRatedServices/topRatedServicesData';

const useTopRatedServices = (services, pageSize = TOP_RATED_PAGE_SIZE) => {
  const [pageIndex, setPageIndex] = useState(FIRST_PAGE_INDEX);

  useEffect(() => {
    setPageIndex(FIRST_PAGE_INDEX);
  }, [services]);

  const pagination = useMemo(
    () => paginateItems(services, pageIndex, pageSize),
    [pageIndex, pageSize, services],
  );

  const showPage = useCallback((nextPageIndex) => {
    setPageIndex(nextPageIndex);
  }, []);

  const showPreviousPage = useCallback(() => {
    setPageIndex((currentPageIndex) => Math.max(currentPageIndex - 1, FIRST_PAGE_INDEX));
  }, []);

  const showNextPage = useCallback(() => {
    setPageIndex((currentPageIndex) =>
      Math.min(currentPageIndex + 1, Math.max(pagination.pageCount - 1, FIRST_PAGE_INDEX)),
    );
  }, [pagination.pageCount]);

  return {
    visibleServices: pagination.items,
    pageIndex: pagination.pageIndex,
    pageCount: pagination.pageCount,
    showPage,
    showPreviousPage,
    showNextPage,
  };
};

export default useTopRatedServices;
