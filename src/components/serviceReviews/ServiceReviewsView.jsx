import React, { memo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';
import ServiceReviewsList from './ServiceReviewsList';
import ServiceReviewsSummary from './ServiceReviewsSummary';
import { SERVICE_REVIEWS_CONTENT } from './serviceReviewsCopy';
import {
  SERVICE_REVIEWS_BACK_ICON_SIZE,
  SERVICE_REVIEWS_BACK_LINK_CLASS,
  SERVICE_REVIEWS_NOT_FOUND_CLASS,
  SERVICE_REVIEWS_PANEL_CLASS,
  SERVICE_REVIEWS_PANEL_INNER_CLASS,
} from './serviceReviewsData';

const ServiceReviewsBackLink = memo(({ to }) => (
  <Link to={to} className={SERVICE_REVIEWS_BACK_LINK_CLASS}>
    <ArrowLeft size={SERVICE_REVIEWS_BACK_ICON_SIZE} aria-hidden="true" />
    {SERVICE_REVIEWS_CONTENT.actions.back}
  </Link>
));

ServiceReviewsBackLink.displayName = 'ServiceReviewsBackLink';

const ServiceReviewsNotFound = memo(() => (
  <div className={SERVICE_REVIEWS_NOT_FOUND_CLASS}>
    <h1 className="text-2xl font-bold text-[#0f172b]">
      {SERVICE_REVIEWS_CONTENT.notFound.title}
    </h1>
    <p className="mt-2 text-sm text-[#62748e]">{SERVICE_REVIEWS_CONTENT.notFound.description}</p>
    <Link
      to={ROUTES.HOME}
      className="mt-6 inline-flex rounded-xl bg-[#0f172b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e293b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
    >
      {SERVICE_REVIEWS_CONTENT.notFound.backLabel}
    </Link>
  </div>
));

ServiceReviewsNotFound.displayName = 'ServiceReviewsNotFound';

const ServiceReviewsView = memo(({ copy, payload, backPath }) => {
  if (!payload) {
    return <ServiceReviewsNotFound />;
  }

  return (
    <div>
      <ServiceReviewsBackLink to={backPath} />
      <div className={SERVICE_REVIEWS_PANEL_CLASS}>
        <div className={SERVICE_REVIEWS_PANEL_INNER_CLASS}>
          <ServiceReviewsSummary
            copy={copy}
            summary={payload.summary}
            breakdown={payload.breakdown}
          />
          <ServiceReviewsList copy={copy} feedback={payload.feedback} />
        </div>
      </div>
    </div>
  );
});

ServiceReviewsView.displayName = 'ServiceReviewsView';

export default ServiceReviewsView;
