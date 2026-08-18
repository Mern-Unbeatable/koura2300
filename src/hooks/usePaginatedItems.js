import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_CATALOG_PAGE_SIZE, FIRST_PAGE_INDEX, paginateItems } from '../components/catalog/catalogData';

const usePaginatedItems = (items, pageSize = DEFAULT_CATALOG_PAGE_SIZE) => {
  const [pageIndex, setPageIndex] = useState(FIRST_PAGE_INDEX);
  const pagination = useMemo(
    () => paginateItems(items, pageIndex, pageSize),
    [items, pageIndex, pageSize],
  );

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
    items: pagination.items,
    pageIndex: pagination.pageIndex,
    pageCount: pagination.pageCount,
    showPage,
    showPreviousPage,
    showNextPage,
  };
};

export default usePaginatedItems;
