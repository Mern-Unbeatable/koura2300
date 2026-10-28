import React, { memo } from 'react';
import { Clock3 } from 'lucide-react';
import ServiceRatingStars from './ServiceRatingStars';
import {
  CLOCK_ICON_SIZE,
  SUMMARY_DURATION_META_CLASS,
  SUMMARY_META_CLASS,
  SUMMARY_RATING_META_CLASS,
  SUMMARY_TITLE_CLASS,
} from './serviceDetailsData';

const ServiceDetailsSummary = memo(({ title, overview, duration, rating }) => (
  <div>
    <h1 className={SUMMARY_TITLE_CLASS}>{title}</h1>
    <div className={SUMMARY_META_CLASS}>
      <span className={SUMMARY_RATING_META_CLASS}>
        <ServiceRatingStars />
        {rating}
      </span>
      <span className={SUMMARY_DURATION_META_CLASS}>
        <Clock3 size={CLOCK_ICON_SIZE} aria-hidden="true" />
        {duration}
      </span>
    </div>
    <p className="mt-4 text-sm leading-6 text-gray-600">{overview}</p>
  </div>
));

ServiceDetailsSummary.displayName = 'ServiceDetailsSummary';

export default ServiceDetailsSummary;
