import { memo } from 'react';
import {
  REVIEWS_DISTRIBUTION_FILL_CLASS,
  REVIEWS_DISTRIBUTION_LABEL_CLASS,
  REVIEWS_DISTRIBUTION_LIST_CLASS,
  REVIEWS_DISTRIBUTION_ROW_CLASS,
  REVIEWS_DISTRIBUTION_STAR_SIZE_PX,
  REVIEWS_DISTRIBUTION_TRACK_CLASS,
  REVIEWS_RATING_LABEL_CLASS,
  REVIEWS_RATING_SCORE_CLASS,
  REVIEWS_RATING_SECTION_CLASS,
  REVIEWS_RATING_SUMMARY_CLASS,
  REVIEWS_SUMMARY_STAR_SIZE_PX,
} from './reviewsData';
import ReviewsStarRow from './ReviewsStarRow';

const ReviewsDistributionRow = memo(({ row }) => (
  <div className={REVIEWS_DISTRIBUTION_ROW_CLASS}>
    <ReviewsStarRow filledCount={row.stars} size={REVIEWS_DISTRIBUTION_STAR_SIZE_PX} />
    <div className={REVIEWS_DISTRIBUTION_TRACK_CLASS}>
      <div className={`${REVIEWS_DISTRIBUTION_FILL_CLASS} ${row.fillClassName}`} />
    </div>
    <p className={REVIEWS_DISTRIBUTION_LABEL_CLASS}>
      <span className="font-medium text-[#191c1f]">{row.percent}%</span>
      <span className="font-normal text-[#77878f]"> {row.countLabel}</span>
    </p>
  </div>
));

ReviewsDistributionRow.displayName = 'ReviewsDistributionRow';

const ReviewsRatingSummary = memo(({ copy, ratingSummary, ratingDistribution }) => (
  <section
    role="region"
    aria-label={copy.rating.regionLabel}
    className={REVIEWS_RATING_SECTION_CLASS}
  >
    <div className={REVIEWS_RATING_SUMMARY_CLASS}>
      <p className={REVIEWS_RATING_SCORE_CLASS}>{ratingSummary.score}</p>
      <ReviewsStarRow
        filledCount={ratingSummary.filledStars}
        size={REVIEWS_SUMMARY_STAR_SIZE_PX}
        hasHalfStar={ratingSummary.hasHalfStar}
      />
      <p className={REVIEWS_RATING_LABEL_CLASS}>
        <span className="font-medium text-[#191c1f]">{copy.rating.customerRatingLabel} </span>
        <span className="font-normal text-[#475156]">{ratingSummary.totalLabel}</span>
      </p>
    </div>

    <div
      role="list"
      aria-label={copy.rating.distributionLabel}
      className={REVIEWS_DISTRIBUTION_LIST_CLASS}
    >
      {ratingDistribution.map((row) => (
        <div key={row.id} role="listitem">
          <ReviewsDistributionRow row={row} />
        </div>
      ))}
    </div>
  </section>
));

ReviewsRatingSummary.displayName = 'ReviewsRatingSummary';

export default ReviewsRatingSummary;
