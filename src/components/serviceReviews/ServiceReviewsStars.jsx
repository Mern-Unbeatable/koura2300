import React, { memo } from 'react';
import { Star, StarHalf } from 'lucide-react';
import {
  SERVICE_REVIEWS_STAR_COUNT,
  SERVICE_REVIEWS_STARS_CLASS,
} from './serviceReviewsData';

const ServiceReviewsStars = memo(
  ({
    rating = SERVICE_REVIEWS_STAR_COUNT,
    size,
    filledCount,
    showHalf = false,
    label,
  }) => {
    const fullStars = filledCount ?? Math.floor(rating);
    const emptyStars = Math.max(0, SERVICE_REVIEWS_STAR_COUNT - fullStars - (showHalf ? 1 : 0));

    return (
      <span className={SERVICE_REVIEWS_STARS_CLASS} aria-label={label} aria-hidden={!label}>
        {Array.from({ length: fullStars }, (_, index) => (
          <Star key={`full-${index}`} size={size} fill="currentColor" strokeWidth={0} />
        ))}
        {showHalf ? <StarHalf size={size} fill="currentColor" strokeWidth={0} /> : null}
        {Array.from({ length: emptyStars }, (_, index) => (
          <Star
            key={`empty-${index}`}
            size={size}
            className="text-[#adb7bc]"
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </span>
    );
  },
);

ServiceReviewsStars.displayName = 'ServiceReviewsStars';

export default ServiceReviewsStars;
