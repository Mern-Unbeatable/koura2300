import React, { memo } from 'react';
import { ArrowLeft } from 'lucide-react';
import useAddService from '../../hooks/useAddService';
import useLandingSearch from '../../hooks/useLandingSearch';
import usePostedCatalogServices from '../../hooks/usePostedCatalogServices';
import useScrollToTop from '../../hooks/useScrollToTop';
import useServiceCatalog from '../../hooks/useServiceCatalog';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import {
  DEFAULT_SUBCATEGORY_COPY,
  SUBCATEGORY_BACK_BUTTON_CLASS,
  SUBCATEGORY_BACK_ICON_SIZE_PX,
} from './subcategoryData';
import ServiceCatalogFilters from './ServiceCatalogFilters';
import ServiceCatalogGrid from './ServiceCatalogGrid';
import ServiceCatalogPagination from './ServiceCatalogPagination';
import ServiceCatalogSubcategoryGrid from './ServiceCatalogSubcategoryGrid';

const ServiceCatalogContent = memo(
  ({ services, categories, priceRanges, allCategory, pageSize, content }) => {
    useScrollToTop();
    const servicesWithPosted = usePostedCatalogServices(services);

    const { filteredServices, searchValue, handleSearchChange, handleSearchSubmit } =
      useLandingSearch(servicesWithPosted);
    const catalog = useServiceCatalog({
      services: filteredServices,
      allCategory,
      priceRanges,
      pageSize,
    });
    const handleAddService = useAddService();

    const subcategoryCopy = {
      ...DEFAULT_SUBCATEGORY_COPY,
      ...content.subcategories,
    };

    return (
      <div className="min-h-screen overflow-x-clip bg-white font-inter text-brand-ink">
        <LandingHeader
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />

        <main className="animate-page-enter mx-auto max-w-screen-2xl px-4 pb-24 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pb-28">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-brand-ink sm:text-4xl">{content.hero.title}</h1>
            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
              {content.hero.description}
            </p>
          </div>

          <section aria-label={content.hero.title} className="mt-8">
            {catalog.isBrowsingServices ? (
              <>
                <div className="flex flex-col gap-4 min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between">
                  <button
                    type="button"
                    className={SUBCATEGORY_BACK_BUTTON_CLASS}
                    onClick={catalog.handleBackToSubcategories}
                  >
                    <ArrowLeft size={SUBCATEGORY_BACK_ICON_SIZE_PX} aria-hidden="true" />
                    {subcategoryCopy.backLabel}
                  </button>

                  <ServiceCatalogFilters
                    priceRanges={priceRanges}
                    selectedPriceRange={catalog.selectedPriceRange}
                    priceLabel={content.filters.priceLabel}
                    showCategoryTabs={false}
                    onPriceRangeChange={catalog.handlePriceRangeChange}
                  />
                </div>

                <div className="mt-10">
                  <ServiceCatalogGrid
                    services={catalog.visibleServices}
                    emptyState={content.emptyState}
                    onAddService={handleAddService}
                    selectedCategory={catalog.selectedCategory}
                  />
                </div>

                {catalog.pageCount > 1 ? (
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
                ) : null}
              </>
            ) : (
              <ServiceCatalogSubcategoryGrid
                cards={catalog.subcategoryCards}
                gridLabel={subcategoryCopy.gridLabel}
                startingAtLabel={subcategoryCopy.startingAt}
                onSelect={catalog.handleSubcategorySelect}
              />
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
