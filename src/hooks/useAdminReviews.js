import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { REVIEWS_COPY } from '../components/admin/reviews/reviewsCopy';
import {
  REVIEWS_RATING_DISTRIBUTION,
  REVIEWS_RATING_SUMMARY,
  REVIEWS_SEED,
} from '../components/admin/reviews/reviewsData';
import {
  countAwaitingModeration,
  getModerationSubtitle,
  removeReviewById,
} from '../components/admin/reviews/reviewsUtils';

const useAdminReviews = () => {
  const [reviews, setReviews] = useState(REVIEWS_SEED);
  const [pendingDeleteReviewId, setPendingDeleteReviewId] = useState(null);

  const moderationSubtitle = useMemo(
    () => getModerationSubtitle(countAwaitingModeration(reviews)),
    [reviews],
  );

  const pendingDeleteReview = useMemo(
    () => reviews.find((review) => review.id === pendingDeleteReviewId) ?? null,
    [pendingDeleteReviewId, reviews],
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
    reviews,
    deleteReviewerName: pendingDeleteReview?.name ?? '',
    isDeleteModalOpen: Boolean(pendingDeleteReviewId),
    onDeleteReview: handleDeleteReview,
    onCloseDeleteModal: handleCloseDeleteModal,
    onConfirmDeleteReview: handleConfirmDeleteReview,
  };
};

export default useAdminReviews;
