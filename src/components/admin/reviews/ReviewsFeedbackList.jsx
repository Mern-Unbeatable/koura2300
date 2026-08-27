import { memo } from 'react';
import {
  REVIEWS_FEEDBACK_DIVIDER_CLASS,
  REVIEWS_FEEDBACK_LIST_CLASS,
  REVIEWS_FEEDBACK_SECTION_CLASS,
  REVIEWS_FEEDBACK_TITLE_CLASS,
} from './reviewsData';
import ReviewsFeedbackItem from './ReviewsFeedbackItem';

const ReviewsFeedbackList = memo(({ copy, reviews, onDeleteReview }) => (
  <section className={REVIEWS_FEEDBACK_SECTION_CLASS}>
    <h2 className={REVIEWS_FEEDBACK_TITLE_CLASS}>{copy.feedback.title}</h2>
    <div className={REVIEWS_FEEDBACK_LIST_CLASS}>
      {reviews.map((review, reviewIndex) => (
        <div key={review.id} className="min-w-0">
          <ReviewsFeedbackItem
            review={review}
            copy={copy}
            onDeleteReview={onDeleteReview}
          />
          {reviewIndex < reviews.length - 1 ? (
            <hr className={`${REVIEWS_FEEDBACK_DIVIDER_CLASS} mt-5`} />
          ) : null}
        </div>
      ))}
    </div>
  </section>
));

ReviewsFeedbackList.displayName = 'ReviewsFeedbackList';

export default ReviewsFeedbackList;
