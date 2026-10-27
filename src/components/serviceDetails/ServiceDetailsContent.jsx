import React, { memo, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CATALOG_ALL_CATEGORY, SERVICE_DETAILS_CATEGORY_PARAM } from '../../config';
import useLandingSearch from '../../hooks/useLandingSearch';
import usePostedMediaHydration from '../../hooks/usePostedMediaHydration';
import useScrollToTop from '../../hooks/useScrollToTop';
import { useSEO } from '../../hooks/useSEO';
import { ALL_CATALOG_SERVICES, getPromotionalServices } from '../catalog/catalogRegistry';
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
  const [searchParams] = useSearchParams();
  const mediaVersion = usePostedMediaHydration();
  const selectedCategory =
    searchParams.get(SERVICE_DETAILS_CATEGORY_PARAM) ?? CATALOG_ALL_CATEGORY;
  const {
    service,
    packages,
    overview,
    includedItems,
    excludedItems,
    additionalFeatures,
    sizes,
    options,
    galleryImages,
  } = useMemo(() => getCatalogServiceDetails(serviceId), [mediaVersion, serviceId]);
  const relatedServices = useMemo(
    () => (service ? getPromotionalServices(service, selectedCategory) : []),
    [selectedCategory, service],
  );
  const { searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(ALL_CATALOG_SERVICES);

  useScrollToTop();
  useSEO(buildServiceSeo(service, overview));

  return (
    <div className="min-h-screen overflow-x-clip bg-white font-inter text-brand-ink">
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      {service ? (
        <ServiceDetailsView
          key={`${service.id}-${selectedCategory}`}
          service={service}
          relatedServices={relatedServices}
          selectedCategory={selectedCategory}
          packages={packages}
          overview={overview}
          includedItems={includedItems}
          excludedItems={excludedItems}
          additionalFeatures={additionalFeatures}
          sizes={sizes}
          options={options}
          galleryImages={galleryImages}
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
