import React, { memo } from 'react';
import useAddService from '../../hooks/useAddService';
import useLandingSearch from '../../hooks/useLandingSearch';
import useScrollToTop from '../../hooks/useScrollToTop';
import useTopRatedServices from '../../hooks/useTopRatedServices';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import TopRatedServicesView from './TopRatedServicesView';
import { TOP_RATED_SERVICES_CONTENT } from './topRatedServicesCopy';
import {
  TOP_RATED_MAIN_CLASS,
  TOP_RATED_PAGE_CLASS,
  TOP_RATED_PAGE_SIZE,
  TOP_RATED_SERVICES,
} from './topRatedServicesData';

const TopRatedServicesContent = memo(() => {
  useScrollToTop();

  const { filteredServices, searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(TOP_RATED_SERVICES);
  const catalog = useTopRatedServices(filteredServices, TOP_RATED_PAGE_SIZE);
  const handleAddService = useAddService();

  return (
    <div className={TOP_RATED_PAGE_CLASS}>
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main className={TOP_RATED_MAIN_CLASS}>
        <TopRatedServicesView
          copy={TOP_RATED_SERVICES_CONTENT}
          services={catalog.visibleServices}
          pageIndex={catalog.pageIndex}
          pageCount={catalog.pageCount}
          onAddService={handleAddService}
          onPreviousPage={catalog.showPreviousPage}
          onNextPage={catalog.showNextPage}
          onSelectPage={catalog.showPage}
        />
      </main>
      <LandingFooter />
    </div>
  );
});

TopRatedServicesContent.displayName = 'TopRatedServicesContent';

export default TopRatedServicesContent;
