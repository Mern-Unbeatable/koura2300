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

  const moderationSubtitle = useMemo(
    () => getModerationSubtitle(countAwaitingModeration(reviews)),
    [reviews],
  );

  const handleDeleteReview = useCallback((reviewId) => {
    setReviews((current) => removeReviewById(current, reviewId));
    toast.success(REVIEWS_COPY.toasts.deleted);
  }, []);

  return {
    copy: REVIEWS_COPY,
    moderationSubtitle,
    ratingSummary: REVIEWS_RATING_SUMMARY,
    ratingDistribution: REVIEWS_RATING_DISTRIBUTION,
    reviews,
    onDeleteReview: handleDeleteReview,
  };
};

export default useAdminReviews;
