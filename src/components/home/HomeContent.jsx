import React, { memo, useMemo } from 'react';
import useLandingSearch from '../../hooks/useLandingSearch';
import usePostedCatalogServices from '../../hooks/usePostedCatalogServices';
import FeaturedCategories from './FeaturedCategories';
import LandingFooter from './LandingFooter';
import LandingHeader from './LandingHeader';
import LearningSection from './LearningSection';
import ServiceOverview from './ServiceOverview';
import TopServices from './TopServices';
import TrustSection from './TrustSection';
import { LANDING_CONTENT } from './landingContent';
import { SERVICE_ITEMS } from './landingData';

const HomeContent = memo(() => {
  const catalogServices = usePostedCatalogServices(SERVICE_ITEMS);
  const homeServices = useMemo(() => {
    const postedServices = catalogServices.filter((service) => service.isPosted);
    const postedIds = new Set(postedServices.map((service) => service.id));
    const featuredSeed = SERVICE_ITEMS.filter((service) => !postedIds.has(service.id));
    return [...postedServices, ...featuredSeed];
  }, [catalogServices]);

  const { filteredServices, searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(homeServices);

  return (
    <div className="min-h-screen overflow-x-clip bg-white font-inter text-brand-ink">
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main>
        <h1 className="sr-only">{LANDING_CONTENT.seo.pageHeading}</h1>
        <FeaturedCategories />
        <TopServices services={filteredServices} />
        <ServiceOverview />
        <TrustSection />
        <LearningSection />
      </main>
      <LandingFooter />
    </div>
  );
});

HomeContent.displayName = 'HomeContent';

export default HomeContent;
