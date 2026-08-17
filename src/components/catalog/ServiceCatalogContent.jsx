import React, { memo } from 'react';
import useAddService from '../../hooks/useAddService';
import useLandingSearch from '../../hooks/useLandingSearch';
import useScrollToTop from '../../hooks/useScrollToTop';
import useServiceCatalog from '../../hooks/useServiceCatalog';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import ServiceCatalogFilters from './ServiceCatalogFilters';
import ServiceCatalogGrid from './ServiceCatalogGrid';
import ServiceCatalogPagination from './ServiceCatalogPagination';

const ServiceCatalogContent = memo(
  ({ services, categories, priceRanges, allCategory, pageSize, content }) => {
    useScrollToTop();

    const { filteredServices, searchValue, handleSearchChange, handleSearchSubmit } =
      useLandingSearch(services);
    const catalog = useServiceCatalog({
      services: filteredServices,
      allCategory,
      priceRanges,
      pageSize,
    });
    const handleAddService = useAddService();

    return (
      <div className="min-h-screen bg-white font-inter text-brand-ink">
        <LandingHeader
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />

        <main className="animate-page-enter mx-auto max-w-screen-2xl px-4 pb-24 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pb-28">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-brand-ink sm:text-4xl">
              {content.hero.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
              {content.hero.description}
            </p>
          </div>

          <section aria-label={content.hero.title} className="mt-8">
            <ServiceCatalogFilters
              categories={categories}
              priceRanges={priceRanges}
              selectedCategory={catalog.selectedCategory}
              selectedPriceRange={catalog.selectedPriceRange}
              groupLabel={content.filters.groupLabel}
              priceLabel={content.filters.priceLabel}
              onCategoryChange={catalog.handleCategoryChange}
              onPriceRangeChange={catalog.handlePriceRangeChange}
            />

            <div className="mt-10">
              <ServiceCatalogGrid
                services={catalog.visibleServices}
                emptyState={content.emptyState}
                onAddService={handleAddService}
              />
            </div>

            {catalog.pageCount > 1 && (
              <div className="mt-16">
                <ServiceCatalogPagination
                  pageIndex={catalog.pageIndex}
                  pageCount={catalog.pageCount}
                  labels={content.pagination}
                  onPrevious={catalog.showPreviousPage}
                  onNext={catalog.showNextPage}
                  onSelectPage={catalog.showPage}
                />
              </div>
            )}
          </section>
        </main>

        <LandingFooter />
      </div>
    );
  },
);

ServiceCatalogContent.displayName = 'ServiceCatalogContent';

export default ServiceCatalogContent;
