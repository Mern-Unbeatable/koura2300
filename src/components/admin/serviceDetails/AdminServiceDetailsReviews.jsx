import { memo } from 'react';
import {
  ADMIN_SERVICE_DETAILS_ASSETS,
  ADMIN_SERVICE_DETAILS_AVATAR_SIZE,
  ADMIN_SERVICE_DETAILS_DISTRIBUTION_FILL_CLASS,
  ADMIN_SERVICE_DETAILS_DISTRIBUTION_LABEL_CLASS,
  ADMIN_SERVICE_DETAILS_DISTRIBUTION_LIST_CLASS,
  ADMIN_SERVICE_DETAILS_DISTRIBUTION_ROW_CLASS,
  ADMIN_SERVICE_DETAILS_DISTRIBUTION_STAR_SIZE,
  ADMIN_SERVICE_DETAILS_DISTRIBUTION_TRACK_CLASS,
  ADMIN_SERVICE_DETAILS_RATING_HEADER_CLASS,
  ADMIN_SERVICE_DETAILS_RATING_LABEL_CLASS,
  ADMIN_SERVICE_DETAILS_RATING_SCORE_CLASS,
  ADMIN_SERVICE_DETAILS_RATING_SUMMARY_CLASS,
  ADMIN_SERVICE_DETAILS_REVIEW_STAR_SIZE,
  ADMIN_SERVICE_DETAILS_REVIEWS_CARD_CLASS,
  ADMIN_SERVICE_DETAILS_STAR_COUNT,
  ADMIN_SERVICE_DETAILS_SUMMARY_STAR_SIZE,
} from './adminServiceDetailsData';

const STAR_VARIANT = {
  FILLED: 'filled',
  HALF: 'half',
  EMPTY: 'empty',
};

const getStarVariant = ({ starIndex, filledCount, hasHalfStar }) => {
  if (starIndex < filledCount) {
    return STAR_VARIANT.FILLED;
  }

  if (hasHalfStar && starIndex === filledCount) {
    return STAR_VARIANT.HALF;
  }

  return STAR_VARIANT.EMPTY;
};

const RatingStar = memo(({ variant, size }) => (
  <img
    src={ADMIN_SERVICE_DETAILS_ASSETS.stars[variant]}
    alt=""
    width={size}
    height={size}
    className="shrink-0"
    aria-hidden="true"
  />
));

RatingStar.displayName = 'RatingStar';

const StarRow = memo(({ filledCount, size, hasHalfStar = false }) => (
  <span className="flex shrink-0 items-start gap-0.5" aria-hidden="true">
    {Array.from({ length: ADMIN_SERVICE_DETAILS_STAR_COUNT }, (_, starIndex) => (
      <RatingStar
        key={starIndex}
        size={size}
        variant={getStarVariant({ starIndex, filledCount, hasHalfStar })}
      />
    ))}
  </span>
));

StarRow.displayName = 'StarRow';

const RatingDistributionRow = memo(({ row }) => (
  <div className={ADMIN_SERVICE_DETAILS_DISTRIBUTION_ROW_CLASS}>
    <StarRow filledCount={row.stars} size={ADMIN_SERVICE_DETAILS_DISTRIBUTION_STAR_SIZE} />
    <div className={ADMIN_SERVICE_DETAILS_DISTRIBUTION_TRACK_CLASS}>
      <div className={`${ADMIN_SERVICE_DETAILS_DISTRIBUTION_FILL_CLASS} ${row.fillClassName}`} />
    </div>
    <p className={ADMIN_SERVICE_DETAILS_DISTRIBUTION_LABEL_CLASS}>
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
      <div className={ADMIN_SERVICE_DETAILS_RATING_HEADER_CLASS}>
        <div className={ADMIN_SERVICE_DETAILS_RATING_SUMMARY_CLASS}>
          <p className={ADMIN_SERVICE_DETAILS_RATING_SCORE_CLASS}>{ratingSummary.score}</p>
          <StarRow
            filledCount={ratingSummary.filledStars}
            size={ADMIN_SERVICE_DETAILS_SUMMARY_STAR_SIZE}
            hasHalfStar={ratingSummary.hasHalfStar}
          />
          <p className={ADMIN_SERVICE_DETAILS_RATING_LABEL_CLASS}>
            <span className="font-medium text-[#191c1f]">
              {copy.reviews.customerRatingLabel}{' '}
            </span>
            <span className="font-normal text-[#475156]">{ratingSummary.totalLabel}</span>
          </p>
        </div>
        <div
          role="list"
          aria-label={copy.reviews.distributionLabel}
          className={ADMIN_SERVICE_DETAILS_DISTRIBUTION_LIST_CLASS}
        >
          {ratingDistribution.map((row) => (
            <div key={row.id} role="listitem">
              <RatingDistributionRow row={row} />
            </div>
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
