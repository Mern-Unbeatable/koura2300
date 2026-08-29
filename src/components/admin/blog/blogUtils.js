const PAGINATION_COMPACT_LIMIT = 5;
const PAGINATION_ELLIPSIS = 'ellipsis';
const PAGINATION_EDGE_WINDOW = 3;

export const PAGINATION_ELLIPSIS_TOKEN = PAGINATION_ELLIPSIS;

export const formatBlogPostsCount = (count) =>
  count === 1 ? '1 post' : `${count} posts`;

export const formatReadMinutesLabel = (minutes) => `${minutes} Minutes`;

export const formatArticleReadingMeta = (readTimeLabel, author) =>
  `${readTimeLabel} · ${author}`;

export const getTotalPages = (totalItems, pageSize) =>
  Math.max(1, Math.ceil(totalItems / pageSize));

export const paginatePosts = (posts, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return posts.slice(startIndex, startIndex + pageSize);
};

export const clampPage = (page, totalPages) =>
  Math.min(Math.max(page, 1), Math.max(totalPages, 1));

/**
 * Figma Pagination: Prev · 1 · 2 · 3 · … · last · Next
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

export const shouldShowBlogPagination = (totalItems, pageSize) => totalItems > pageSize;

export const removePostById = (posts, postId) => posts.filter((post) => post.id !== postId);
