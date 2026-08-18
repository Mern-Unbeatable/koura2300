import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import useLandingSearch from '../../hooks/useLandingSearch';
import useScrollToTop from '../../hooks/useScrollToTop';
import { useSEO } from '../../hooks/useSEO';
import { ALL_CATALOG_SERVICES } from '../catalog/catalogRegistry';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import ServiceDetailsNotFound from './ServiceDetailsNotFound';
import ServiceDetailsView from './ServiceDetailsView';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import { getCatalogServiceDetails } from './serviceDetailsData';

const buildServiceSeo = (service, overview) => ({
  title: service?.title ?? SERVICE_DETAILS_CONTENT.notFound.title,
  description: overview || SERVICE_DETAILS_CONTENT.notFound.body,
  keywords: SERVICE_DETAILS_CONTENT.seo.keywords,
});

const ServiceDetailsContent = memo(() => {
  const { serviceId } = useParams();
  const { service, relatedServices, packages, overview, includedItems, excludedItems } =
    getCatalogServiceDetails(serviceId);
  const { searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(ALL_CATALOG_SERVICES);

  useScrollToTop();
  useSEO(buildServiceSeo(service, overview));

  return (
    <div className="min-h-screen bg-white font-inter text-brand-ink">
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      {service ? (
        <ServiceDetailsView
          key={service.id}
          service={service}
          relatedServices={relatedServices}
          packages={packages}
          overview={overview}
          includedItems={includedItems}
          excludedItems={excludedItems}
        />
      ) : (
        <ServiceDetailsNotFound />
      )}

      <LandingFooter />
    </div>
  );
});

ServiceDetailsContent.displayName = 'ServiceDetailsContent';

export default ServiceDetailsContent;
