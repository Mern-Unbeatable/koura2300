export const formatBlogPostsCount = (count) =>
  count === 1 ? '1 post' : `${count} posts`;

export const formatReadMinutesLabel = (minutes) => `${minutes} Minutes`;

export const removePostById = (posts, postId) => posts.filter((post) => post.id !== postId);

export {
  clampPage,
  getPaginationItems,
  getTotalPages,
  PAGINATION_ELLIPSIS_TOKEN,
  paginateItems as paginatePosts,
  shouldShowPagination as shouldShowBlogPagination,
} from '../shared/adminPaginationUtils';
