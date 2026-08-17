import React, { memo } from 'react';
import useAddLightingService from '../../hooks/useAddLightingService';
import useLandingSearch from '../../hooks/useLandingSearch';
import useLightingCatalog from '../../hooks/useLightingCatalog';
import useScrollToTop from '../../hooks/useScrollToTop';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import LightingFilters from './LightingFilters';
import LightingPagination from './LightingPagination';
import LightingServiceGrid from './LightingServiceGrid';
import { LIGHTING_CONTENT } from './lightingCopy';
import { LIGHTING_SERVICES } from './lightingData';

const LightingContent = memo(() => {
  useScrollToTop();

  const { filteredServices, searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(LIGHTING_SERVICES);
  const {
    selectedCategory,
    selectedPriceRange,
    visibleServices,
    pageIndex,
    pageCount,
    handleCategoryChange,
    handlePriceRangeChange,
    showPage,
    showPreviousPage,
    showNextPage,
  } = useLightingCatalog(filteredServices);
  const handleAddService = useAddLightingService();

  return (
    <div className="min-h-screen bg-white font-inter text-brand-ink">
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="mx-auto max-w-screen-2xl px-4 pb-24 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pb-28">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-brand-ink sm:text-4xl">
            {LIGHTING_CONTENT.hero.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
            {LIGHTING_CONTENT.hero.description}
          </p>
        </div>

        <section aria-label={LIGHTING_CONTENT.hero.title} className="mt-8">
          <LightingFilters
            selectedCategory={selectedCategory}
            selectedPriceRange={selectedPriceRange}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
          />

          <div className="mt-10">
            <LightingServiceGrid services={visibleServices} onAddService={handleAddService} />
          </div>

          {pageCount > 1 && (
            <div className="mt-16">
              <LightingPagination
                pageIndex={pageIndex}
                pageCount={pageCount}
                onPrevious={showPreviousPage}
                onNext={showNextPage}
                onSelectPage={showPage}
              />
            </div>
          )}
        </section>
      </main>

      <LandingFooter />
    </div>
  );
});

LightingContent.displayName = 'LightingContent';

export default LightingContent;
