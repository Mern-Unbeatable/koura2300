import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import useLandingSearch from '../../hooks/useLandingSearch';
import FeaturedCategories from './FeaturedCategories';
import LandingFooter from './LandingFooter';
import LandingHeader from './LandingHeader';
import LearningSection from './LearningSection';
import ServiceOverview from './ServiceOverview';
import TopServices from './TopServices';
import TrustSection from './TrustSection';
import { SERVICE_ITEMS } from './landingData';

const HomeContent = memo(() => {
  const { t } = useTranslation();
  const { filteredServices, searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(SERVICE_ITEMS, t);

  return (
    <div className="min-h-screen bg-white font-inter text-brand-ink">
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main>
        <h1 className="sr-only">{t('landing.seo.pageHeading')}</h1>
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
