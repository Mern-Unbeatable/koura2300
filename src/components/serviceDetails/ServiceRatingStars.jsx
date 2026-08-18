import React, { memo } from 'react';
import { Star } from 'lucide-react';
import { STAR_COUNT, STAR_ICON_SIZE } from './serviceDetailsData';

const ServiceRatingStars = memo(() => (
  <span className="flex text-brand-orange" aria-hidden="true">
    {Array.from({ length: STAR_COUNT }, (_, starIndex) => (
      <Star key={starIndex} size={STAR_ICON_SIZE} fill="currentColor" />
    ))}
  </span>
));

ServiceRatingStars.displayName = 'ServiceRatingStars';

export default ServiceRatingStars;
