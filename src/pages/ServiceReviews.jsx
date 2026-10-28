import React, { memo } from 'react';
import ServiceReviewsContent from '../components/serviceReviews/ServiceReviewsContent';
import { SERVICE_REVIEWS_CONTENT } from '../components/serviceReviews/serviceReviewsCopy';
import { useSEO } from '../hooks/useSEO';

const ServiceReviews = memo(() => {
  useSEO(SERVICE_REVIEWS_CONTENT.seo);

  return <ServiceReviewsContent />;
});

ServiceReviews.displayName = 'ServiceReviews';

export default ServiceReviews;
