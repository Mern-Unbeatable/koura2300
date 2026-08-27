import { memo } from 'react';
import { Trash2 } from 'lucide-react';
import {
  REVIEWS_AVATAR_SIZE_PX,
  REVIEWS_DELETE_BUTTON_CLASS,
  REVIEWS_DELETE_ICON_SIZE_PX,
  REVIEWS_FEEDBACK_COMMENT_CLASS,
  REVIEWS_FEEDBACK_HEADER_CLASS,
  REVIEWS_FEEDBACK_ITEM_CLASS,
  REVIEWS_FEEDBACK_META_ROW_CLASS,
  REVIEWS_FEEDBACK_META_TEXT_CLASS,
  REVIEWS_FEEDBACK_NAME_CLASS,
  REVIEWS_FEEDBACK_SERVICE_ROW_CLASS,
  REVIEWS_FEEDBACK_STAR_SIZE_PX,
  REVIEWS_FEEDBACK_USER_CLASS,
} from './reviewsData';
import ReviewsStarRow from './ReviewsStarRow';

const ReviewsFeedbackItem = memo(({ review, copy, onDeleteReview }) => (
  <article className={REVIEWS_FEEDBACK_ITEM_CLASS} data-testid={`review-item-${review.id}`}>
    <div className={REVIEWS_FEEDBACK_HEADER_CLASS}>
      <div className={REVIEWS_FEEDBACK_USER_CLASS}>
        <img
          src={review.avatar}
          alt=""
          width={REVIEWS_AVATAR_SIZE_PX}
          height={REVIEWS_AVATAR_SIZE_PX}
          className="size-12 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className={REVIEWS_FEEDBACK_META_ROW_CLASS}>
            <span className={REVIEWS_FEEDBACK_NAME_CLASS}>{review.name}</span>
            <ReviewsStarRow filledCount={review.rating} size={REVIEWS_FEEDBACK_STAR_SIZE_PX} />
            <span className={REVIEWS_FEEDBACK_META_TEXT_CLASS}>{copy.feedback.metaSeparator}</span>
            <span className={REVIEWS_FEEDBACK_META_TEXT_CLASS}>{review.dateLabel}</span>
          </div>
          <p className={REVIEWS_FEEDBACK_SERVICE_ROW_CLASS}>
            <span>{copy.feedback.metaSeparator}</span>
            <span>{review.serviceName}</span>
          </p>
        </div>
      </div>

      <button
        type="button"
        className={REVIEWS_DELETE_BUTTON_CLASS}
        aria-label={copy.feedback.deleteLabel(review.name)}
        onClick={() => onDeleteReview(review.id)}
      >
        <Trash2 size={REVIEWS_DELETE_ICON_SIZE_PX} aria-hidden="true" />
        <span>Delete</span>
      </button>
    </div>

    <p className={REVIEWS_FEEDBACK_COMMENT_CLASS}>{review.comment}</p>
  </article>
));

ReviewsFeedbackItem.displayName = 'ReviewsFeedbackItem';

export default ReviewsFeedbackItem;
