const PAGINATION_COMPACT_LIMIT = 5;
const PAGINATION_ELLIPSIS = 'ellipsis';
const PAGINATION_EDGE_WINDOW = 3;

export const PAGINATION_ELLIPSIS_TOKEN = PAGINATION_ELLIPSIS;

/**
 * Figma Pagination (Service Management): Prev · 1 · 2 · 3 · … · last · Next
 */
export const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= PAGINATION_COMPACT_LIMIT) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= PAGINATION_EDGE_WINDOW) {
    return [1, 2, 3, PAGINATION_ELLIPSIS, totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, PAGINATION_ELLIPSIS, totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    PAGINATION_ELLIPSIS,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    PAGINATION_ELLIPSIS,
    totalPages,
  ];
};

export const getTotalPages = (totalItems, pageSize) =>
  Math.max(1, Math.ceil(totalItems / pageSize));

export const paginateItems = (items, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export const clampPage = (page, totalPages) =>
  Math.min(Math.max(page, 1), Math.max(totalPages, 1));

export const shouldShowPagination = (totalItems, pageSize) => totalItems > pageSize;
