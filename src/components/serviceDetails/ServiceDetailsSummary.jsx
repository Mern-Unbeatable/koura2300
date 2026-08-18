import React, { memo } from 'react';
import { Clock3 } from 'lucide-react';
import ServiceRatingStars from './ServiceRatingStars';
import { CLOCK_ICON_SIZE, SUMMARY_TITLE_CLASS } from './serviceDetailsData';

const ServiceDetailsSummary = memo(({ title, overview, duration, rating }) => (
  <div>
    <h1 className={SUMMARY_TITLE_CLASS}>{title}</h1>
    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
      <span className="flex items-center gap-1">
        <ServiceRatingStars />
        {rating}
      </span>
      <span className="flex items-center gap-1">
        <Clock3 size={CLOCK_ICON_SIZE} aria-hidden="true" />
        {duration}
      </span>
    </div>
    <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">{overview}</p>
  </div>
));

ServiceDetailsSummary.displayName = 'ServiceDetailsSummary';

export default ServiceDetailsSummary;
