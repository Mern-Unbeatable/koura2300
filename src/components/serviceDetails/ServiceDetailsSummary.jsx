import React, { memo } from 'react';
import { Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildServiceReviewsRoute } from '../../config';
import ServiceRatingStars from './ServiceRatingStars';
import {
  CLOCK_ICON_SIZE,
  SUMMARY_DURATION_META_CLASS,
  SUMMARY_META_CLASS,
  SUMMARY_RATING_META_CLASS,
  SUMMARY_TITLE_CLASS,
} from './serviceDetailsData';

const ServiceDetailsSummary = memo(({ serviceId, title, overview, duration, rating }) => {
  const reviewsPath = serviceId ? buildServiceReviewsRoute(serviceId) : null;

  return (
    <div>
      <h1 className={SUMMARY_TITLE_CLASS}>{title}</h1>
      <div className={SUMMARY_META_CLASS}>
        {reviewsPath ? (
          <Link
            to={reviewsPath}
            aria-label={`View reviews for ${title}`}
            className={`${SUMMARY_RATING_META_CLASS} transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange`}
          >
            <ServiceRatingStars />
            {rating}
          </Link>
        ) : (
          <span className={SUMMARY_RATING_META_CLASS}>
            <ServiceRatingStars />
            {rating}
          </span>
        )}
        <span className={SUMMARY_DURATION_META_CLASS}>
          <Clock3 size={CLOCK_ICON_SIZE} aria-hidden="true" />
          {duration}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-gray-600">{overview}</p>
    </div>
  );
});

ServiceDetailsSummary.displayName = 'ServiceDetailsSummary';

export default ServiceDetailsSummary;
