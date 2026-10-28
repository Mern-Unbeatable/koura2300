import React, { memo } from 'react';
import useLandingSearch from '../../hooks/useLandingSearch';
import useScrollToTop from '../../hooks/useScrollToTop';
import useServiceReviews from '../../hooks/useServiceReviews';
import { ALL_CATALOG_SERVICES } from '../catalog/catalogRegistry';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import ServiceReviewsView from './ServiceReviewsView';
import { SERVICE_REVIEWS_CONTENT } from './serviceReviewsCopy';
import {
  SERVICE_REVIEWS_MAIN_CLASS,
  SERVICE_REVIEWS_PAGE_CLASS,
} from './serviceReviewsData';

const ServiceReviewsContent = memo(() => {
  useScrollToTop();

  const { searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(ALL_CATALOG_SERVICES);
  const { payload, backPath } = useServiceReviews();

  return (
    <div className={SERVICE_REVIEWS_PAGE_CLASS}>
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main className={SERVICE_REVIEWS_MAIN_CLASS}>
        <ServiceReviewsView
          copy={SERVICE_REVIEWS_CONTENT}
          payload={payload}
          backPath={backPath}
        />
      </main>
      <LandingFooter />
    </div>
  );
});

ServiceReviewsContent.displayName = 'ServiceReviewsContent';

export default ServiceReviewsContent;
