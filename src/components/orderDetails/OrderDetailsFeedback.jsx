import React, { memo, useCallback, useState } from 'react';
import { Star } from 'lucide-react';
import {
  ORDER_DETAILS_FEEDBACK_CARD_CLASS,
  ORDER_DETAILS_FEEDBACK_DONE_CLASS,
  ORDER_DETAILS_FEEDBACK_FIELD_CLASS,
  ORDER_DETAILS_FEEDBACK_LABEL_CLASS,
  ORDER_DETAILS_FEEDBACK_SECTION_CLASS,
  ORDER_DETAILS_FEEDBACK_STAR_ACTIVE_CLASS,
  ORDER_DETAILS_FEEDBACK_STAR_BUTTON_CLASS,
  ORDER_DETAILS_FEEDBACK_STAR_COUNT,
  ORDER_DETAILS_FEEDBACK_STAR_IDLE_CLASS,
  ORDER_DETAILS_FEEDBACK_STAR_SIZE,
  ORDER_DETAILS_FEEDBACK_STARS_CLASS,
  ORDER_DETAILS_FEEDBACK_SUBMIT_CLASS,
  ORDER_DETAILS_FEEDBACK_SUBTITLE_CLASS,
  ORDER_DETAILS_FEEDBACK_TEXTAREA_CLASS,
  ORDER_DETAILS_FEEDBACK_TITLE_CLASS,
} from './orderDetailsData';

const OrderDetailsFeedback = memo(({ orderId, copy, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const reviewFieldId = `order-details-feedback-review-${orderId}`;

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (isSubmitted) {
        return;
      }

      const didSubmit = onSubmit?.({ rating, review: review.trim() });
      if (didSubmit === false) {
        return;
      }

      setIsSubmitted(true);
    },
    [isSubmitted, onSubmit, rating, review],
  );

  if (isSubmitted) {
    return (
      <section className={ORDER_DETAILS_FEEDBACK_CARD_CLASS} aria-live="polite">
        <p className={ORDER_DETAILS_FEEDBACK_DONE_CLASS}>{copy.submitted}</p>
      </section>
    );
  }

  return (
    <section className={ORDER_DETAILS_FEEDBACK_CARD_CLASS} aria-label={copy.title}>
      <form className={ORDER_DETAILS_FEEDBACK_SECTION_CLASS} onSubmit={handleSubmit} noValidate>
        <div>
          <h2 className={ORDER_DETAILS_FEEDBACK_TITLE_CLASS}>{copy.title}</h2>
          <p className={ORDER_DETAILS_FEEDBACK_SUBTITLE_CLASS}>{copy.subtitle}</p>
        </div>

        <div className={ORDER_DETAILS_FEEDBACK_FIELD_CLASS}>
          <p className={ORDER_DETAILS_FEEDBACK_LABEL_CLASS}>{copy.rateLabel}</p>
          <div
            className={ORDER_DETAILS_FEEDBACK_STARS_CLASS}
            role="group"
            aria-label={copy.rateLabel}
          >
            {Array.from({ length: ORDER_DETAILS_FEEDBACK_STAR_COUNT }, (_, index) => {
              const value = index + 1;
              const isActive = value <= rating;

              return (
                <button
                  key={value}
                  type="button"
                  aria-label={copy.starLabel(value)}
                  aria-pressed={isActive}
                  className={`${ORDER_DETAILS_FEEDBACK_STAR_BUTTON_CLASS} ${
                    isActive
                      ? ORDER_DETAILS_FEEDBACK_STAR_ACTIVE_CLASS
                      : ORDER_DETAILS_FEEDBACK_STAR_IDLE_CLASS
                  }`}
                  onClick={() => setRating(value)}
                >
                  <Star
                    size={ORDER_DETAILS_FEEDBACK_STAR_SIZE}
                    fill="currentColor"
                    strokeWidth={isActive ? 0 : 1.5}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className={ORDER_DETAILS_FEEDBACK_FIELD_CLASS}>
          <label htmlFor={reviewFieldId} className={ORDER_DETAILS_FEEDBACK_LABEL_CLASS}>
            {copy.reviewLabel}
          </label>
          <textarea
            id={reviewFieldId}
            name="review"
            value={review}
            placeholder={copy.reviewPlaceholder}
            onChange={(event) => setReview(event.target.value)}
            className={ORDER_DETAILS_FEEDBACK_TEXTAREA_CLASS}
          />
        </div>

        <button type="submit" className={ORDER_DETAILS_FEEDBACK_SUBMIT_CLASS}>
          {copy.submit}
        </button>
      </form>
    </section>
  );
});

OrderDetailsFeedback.displayName = 'OrderDetailsFeedback';

export default OrderDetailsFeedback;
