import { useCallback, useMemo, useState } from 'react';

const FORWARD = 1;
const BACKWARD = -1;

const usePagination = (items, pageSize) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(FORWARD);
  const pageCount = Math.ceil(items.length / pageSize);

  const visibleItems = useMemo(() => {
    const startIndex = pageIndex * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }, [items, pageIndex, pageSize]);

  const showPreviousPage = useCallback(() => {
    setDirection(BACKWARD);
    setPageIndex((currentPage) => Math.max(currentPage - 1, 0));
  }, []);

  const showNextPage = useCallback(() => {
    setDirection(FORWARD);
    setPageIndex((currentPage) => Math.min(currentPage + 1, pageCount - 1));
  }, [pageCount]);

  return {
    visibleItems,
    pageIndex,
    direction,
    canShowPrevious: pageIndex > 0,
    canShowNext: pageIndex < pageCount - 1,
    showPreviousPage,
    showNextPage,
  };
};

export default usePagination;
