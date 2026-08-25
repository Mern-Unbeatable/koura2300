import { memo } from 'react';
import { Star } from 'lucide-react';
import {
  ADMIN_SERVICE_DETAILS_AVATAR_SIZE,
  ADMIN_SERVICE_DETAILS_DISTRIBUTION_FILL_CLASS,
  ADMIN_SERVICE_DETAILS_DISTRIBUTION_STAR_SIZE,
  ADMIN_SERVICE_DETAILS_DISTRIBUTION_TRACK_CLASS,
  ADMIN_SERVICE_DETAILS_RATING_SCORE_CLASS,
  ADMIN_SERVICE_DETAILS_RATING_SUMMARY_CLASS,
  ADMIN_SERVICE_DETAILS_REVIEW_STAR_SIZE,
  ADMIN_SERVICE_DETAILS_REVIEWS_CARD_CLASS,
  ADMIN_SERVICE_DETAILS_STAR_COUNT,
  ADMIN_SERVICE_DETAILS_SUMMARY_STAR_SIZE,
} from './adminServiceDetailsData';

const StarRow = memo(({ filledCount, size, hasHalfStar = false }) => (
  <span className="flex items-start gap-0.5 text-brand-orange" aria-hidden="true">
    {Array.from({ length: ADMIN_SERVICE_DETAILS_STAR_COUNT }, (_, starIndex) => {
      const isFilled = starIndex < filledCount;
      const isHalf = hasHalfStar && starIndex === filledCount;

      return (
        <Star
          key={starIndex}
          size={size}
          fill={isFilled || isHalf ? 'currentColor' : 'none'}
          className={isFilled || isHalf ? 'text-brand-orange' : 'text-[#e4e7e9]'}
        />
      );
    })}
  </span>
));

StarRow.displayName = 'StarRow';

const RatingDistributionRow = memo(({ row }) => (
  <div className="flex min-w-0 flex-wrap items-center gap-3 min-[768px]:gap-4">
    <StarRow filledCount={row.stars} size={ADMIN_SERVICE_DETAILS_DISTRIBUTION_STAR_SIZE} />
    <div className={`${ADMIN_SERVICE_DETAILS_DISTRIBUTION_TRACK_CLASS} min-w-[120px] flex-1`}>
      <div className={`${ADMIN_SERVICE_DETAILS_DISTRIBUTION_FILL_CLASS} ${row.fillClassName}`} />
    </div>
    <p className="shrink-0 text-sm leading-5 whitespace-nowrap">
      <span className="font-medium text-[#191c1f]">{row.percent}%</span>
      <span className="font-normal text-[#77878f]"> {row.countLabel}</span>
    </p>
  </div>
));

RatingDistributionRow.displayName = 'RatingDistributionRow';

const ReviewItem = memo(({ review, copy }) => (
  <article className="flex min-w-0 flex-col gap-3">
    <div className="flex items-center gap-3">
      <img
        src={review.avatar}
        alt=""
        width={ADMIN_SERVICE_DETAILS_AVATAR_SIZE}
        height={ADMIN_SERVICE_DETAILS_AVATAR_SIZE}
        className="size-12 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-1.5 text-sm leading-5">
          <span className="font-medium text-[#191c1f]">{review.name}</span>
          <span className="text-[#5f6c72]">{copy.reviews.metaSeparator}</span>
          <span className="text-[#5f6c72]">{review.timeLabel}</span>
        </p>
        <div className="mt-1.5">
          <StarRow
            filledCount={review.rating}
            size={ADMIN_SERVICE_DETAILS_REVIEW_STAR_SIZE}
          />
        </div>
      </div>
    </div>
    <p className="text-sm leading-5 text-[#475156]">{review.comment}</p>
  </article>
));

ReviewItem.displayName = 'ReviewItem';

const AdminServiceDetailsReviews = memo(
  ({ copy, ratingSummary, ratingDistribution, reviews }) => (
    <section
      role="region"
      aria-label={copy.reviews.regionLabel}
      className={ADMIN_SERVICE_DETAILS_REVIEWS_CARD_CLASS}
    >
      <div className="flex min-w-0 flex-col gap-6 px-4 pt-6 min-[426px]:px-6 min-[768px]:flex-row min-[768px]:items-center min-[768px]:gap-8 min-[768px]:px-10">
        <div className={ADMIN_SERVICE_DETAILS_RATING_SUMMARY_CLASS}>
          <p className={ADMIN_SERVICE_DETAILS_RATING_SCORE_CLASS}>{ratingSummary.score}</p>
          <StarRow
            filledCount={ratingSummary.filledStars}
            size={ADMIN_SERVICE_DETAILS_SUMMARY_STAR_SIZE}
            hasHalfStar={ratingSummary.hasHalfStar}
          />
          <p className="text-center text-base leading-6 text-[#191c1f]">
            <span className="font-medium">{copy.reviews.customerRatingLabel} </span>
            <span className="font-normal text-[#475156]">{ratingSummary.totalLabel}</span>
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {ratingDistribution.map((row) => (
            <RatingDistributionRow key={row.id} row={row} />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-5 px-4 min-[426px]:px-6 min-[768px]:px-10">
        <h2 className="text-base font-semibold leading-6 text-[#191c1f]">
          {copy.reviews.feedbackTitle}
        </h2>
        <div className="flex min-w-0 flex-col gap-5">
          {reviews.map((review, reviewIndex) => (
            <div key={review.id} className="min-w-0">
              <ReviewItem review={review} copy={copy} />
              {reviewIndex < reviews.length - 1 ? (
                <hr className="mt-5 border-0 border-t border-[#e4e7e9]" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
);

AdminServiceDetailsReviews.displayName = 'AdminServiceDetailsReviews';

export default AdminServiceDetailsReviews;
