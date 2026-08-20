import React, { memo } from 'react';
import TopRatedServicesContent from '../components/topRatedServices/TopRatedServicesContent';
import { TOP_RATED_SERVICES_CONTENT } from '../components/topRatedServices/topRatedServicesCopy';
import { useSEO } from '../hooks/useSEO';

const Services = memo(() => {
  useSEO(TOP_RATED_SERVICES_CONTENT.seo);

  return <TopRatedServicesContent />;
});

Services.displayName = 'Services';

export default Services;
