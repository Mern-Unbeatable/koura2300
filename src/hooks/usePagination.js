import { useCallback, useMemo, useState } from 'react';

const usePagination = (items, pageSize) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = Math.ceil(items.length / pageSize);

  const visibleItems = useMemo(() => {
    const startIndex = pageIndex * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }, [items, pageIndex, pageSize]);

  const showPreviousPage = useCallback(() => {
    setPageIndex((currentPage) => Math.max(currentPage - 1, 0));
  }, []);

  const showNextPage = useCallback(() => {
    setPageIndex((currentPage) => Math.min(currentPage + 1, pageCount - 1));
  }, [pageCount]);

  return {
    visibleItems,
    canShowPrevious: pageIndex > 0,
    canShowNext: pageIndex < pageCount - 1,
    showPreviousPage,
    showNextPage,
  };
};

export default usePagination;
