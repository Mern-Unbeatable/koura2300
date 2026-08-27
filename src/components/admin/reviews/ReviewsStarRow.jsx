import { memo } from 'react';
import { REVIEWS_ASSETS, REVIEWS_STAR_COUNT } from './reviewsData';

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

const ReviewsStar = memo(({ variant, size }) => (
  <img
    src={REVIEWS_ASSETS.stars[variant]}
    alt=""
    width={size}
    height={size}
    className="shrink-0"
    aria-hidden="true"
  />
));

ReviewsStar.displayName = 'ReviewsStar';

const ReviewsStarRow = memo(({ filledCount, size, hasHalfStar = false }) => (
  <span className="flex shrink-0 items-start gap-0.5" aria-hidden="true">
    {Array.from({ length: REVIEWS_STAR_COUNT }, (_, starIndex) => (
      <ReviewsStar
        key={starIndex}
        size={size}
        variant={getStarVariant({ starIndex, filledCount, hasHalfStar })}
      />
    ))}
  </span>
));

ReviewsStarRow.displayName = 'ReviewsStarRow';

export default ReviewsStarRow;
