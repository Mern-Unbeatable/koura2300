import { getModerationSubtitleText } from './reviewsCopy';

export const countAwaitingModeration = (reviews) =>
  reviews.filter((review) => review.awaitingModeration).length;

export const getModerationSubtitle = (count) => getModerationSubtitleText(count);

export const removeReviewById = (reviews, reviewId) =>
  reviews.filter((review) => review.id !== reviewId);

export {
  clampPage,
  getPaginationItems,
  getTotalPages,
  PAGINATION_ELLIPSIS_TOKEN,
  paginateItems as paginateReviews,
  shouldShowPagination as shouldShowReviewsPagination,
} from '../shared/adminPaginationUtils';
