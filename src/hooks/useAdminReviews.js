import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { REVIEWS_COPY } from '../components/admin/reviews/reviewsCopy';
import {
  REVIEWS_PAGE_SIZE,
  REVIEWS_RATING_DISTRIBUTION,
  REVIEWS_RATING_SUMMARY,
  REVIEWS_SEED,
} from '../components/admin/reviews/reviewsData';
import {
  clampPage,
  countAwaitingModeration,
  getModerationSubtitle,
  getPaginationItems,
  getTotalPages,
  paginateReviews,
  removeReviewById,
  shouldShowReviewsPagination,
} from '../components/admin/reviews/reviewsUtils';

const useAdminReviews = () => {
  const [reviews, setReviews] = useState(REVIEWS_SEED);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingDeleteReviewId, setPendingDeleteReviewId] = useState(null);

  const moderationSubtitle = useMemo(
    () => getModerationSubtitle(countAwaitingModeration(reviews)),
    [reviews],
  );

  const totalPages = useMemo(
    () => getTotalPages(reviews.length, REVIEWS_PAGE_SIZE),
    [reviews.length],
  );

  const activePage = useMemo(
    () => clampPage(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const paginatedReviews = useMemo(
    () => paginateReviews(reviews, activePage, REVIEWS_PAGE_SIZE),
    [activePage, reviews],
  );

  const pendingDeleteReview = useMemo(
    () => reviews.find((review) => review.id === pendingDeleteReviewId) ?? null,
    [pendingDeleteReviewId, reviews],
  );

  const pagination = useMemo(
    () => ({
      isVisible: shouldShowReviewsPagination(reviews.length, REVIEWS_PAGE_SIZE),
      currentPage: activePage,
      totalPages,
      pageItems: getPaginationItems(activePage, totalPages),
      canGoPrevious: activePage > 1,
      canGoNext: activePage < totalPages,
      onPrevious: () => setCurrentPage((page) => clampPage(page - 1, totalPages)),
      onNext: () => setCurrentPage((page) => clampPage(page + 1, totalPages)),
      onPageChange: (page) => setCurrentPage(clampPage(page, totalPages)),
    }),
    [activePage, reviews.length, totalPages],
  );

  const handleDeleteReview = useCallback((reviewId) => {
    setPendingDeleteReviewId(reviewId);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setPendingDeleteReviewId(null);
  }, []);

  const handleConfirmDeleteReview = useCallback(() => {
    if (!pendingDeleteReviewId) {
      return;
    }

    setReviews((current) => removeReviewById(current, pendingDeleteReviewId));
    setPendingDeleteReviewId(null);
    toast.success(REVIEWS_COPY.toasts.deleted);
  }, [pendingDeleteReviewId]);

  return {
    copy: REVIEWS_COPY,
    moderationSubtitle,
    ratingSummary: REVIEWS_RATING_SUMMARY,
    ratingDistribution: REVIEWS_RATING_DISTRIBUTION,
    reviews: paginatedReviews,
    pagination,
    deleteReviewerName: pendingDeleteReview?.name ?? '',
    isDeleteModalOpen: Boolean(pendingDeleteReviewId),
    onDeleteReview: handleDeleteReview,
    onCloseDeleteModal: handleCloseDeleteModal,
    onConfirmDeleteReview: handleConfirmDeleteReview,
  };
};

export default useAdminReviews;
