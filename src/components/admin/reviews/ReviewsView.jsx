import { REVIEWS_COPY } from './reviewsCopy';
import { REVIEWS_PAGE_CLASS } from './reviewsData';
import ReviewsDeleteModal from './ReviewsDeleteModal';
import ReviewsFeedbackList from './ReviewsFeedbackList';
import ReviewsHeader from './ReviewsHeader';
import ReviewsRatingSummary from './ReviewsRatingSummary';

const ReviewsView = ({
  copy = REVIEWS_COPY,
  moderationSubtitle,
  ratingSummary,
  ratingDistribution,
  reviews,
  deleteReviewerName = '',
  isDeleteModalOpen = false,
  onDeleteReview,
  onCloseDeleteModal,
  onConfirmDeleteReview,
}) => (
  <div className={REVIEWS_PAGE_CLASS}>
    <ReviewsHeader title={copy.title} subtitle={moderationSubtitle} />
    <ReviewsRatingSummary
      copy={copy}
      ratingSummary={ratingSummary}
      ratingDistribution={ratingDistribution}
    />
    <ReviewsFeedbackList copy={copy} reviews={reviews} onDeleteReview={onDeleteReview} />

    {isDeleteModalOpen ? (
      <ReviewsDeleteModal
        copy={copy}
        reviewerName={deleteReviewerName}
        onClose={onCloseDeleteModal}
        onConfirm={onConfirmDeleteReview}
      />
    ) : null}
  </div>
);

export default ReviewsView;
