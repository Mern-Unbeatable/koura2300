import React, { memo } from 'react';
import ServiceCard from '../home/ServiceCard';
import TopRatedServicesPagination from './TopRatedServicesPagination';
import { TOP_RATED_SERVICES_CONTENT } from './topRatedServicesCopy';
import {
  TOP_RATED_EMPTY_CLASS,
  TOP_RATED_GRID_CLASS,
  TOP_RATED_HEADER_CLASS,
  TOP_RATED_PAGINATION_WRAP_CLASS,
  TOP_RATED_SUBTITLE_CLASS,
  TOP_RATED_TITLE_CLASS,
} from './topRatedServicesData';

const TopRatedServicesHeader = memo(({ copy }) => (
  <div className={TOP_RATED_HEADER_CLASS}>
    <div>
      <h1 className={TOP_RATED_TITLE_CLASS}>{copy.title}</h1>
      <p className={TOP_RATED_SUBTITLE_CLASS}>{copy.subtitle}</p>
    </div>
  </div>
));

TopRatedServicesHeader.displayName = 'TopRatedServicesHeader';

const TopRatedServicesGrid = memo(({ services, emptyState, onAddService }) => {
  if (services.length === 0) {
    return <p className={TOP_RATED_EMPTY_CLASS}>{emptyState}</p>;
  }

  return (
    <div className={TOP_RATED_GRID_CLASS}>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} onAdd={onAddService} />
      ))}
    </div>
  );
});

TopRatedServicesGrid.displayName = 'TopRatedServicesGrid';

const TopRatedServicesView = memo(
  ({
    copy = TOP_RATED_SERVICES_CONTENT,
    services,
    pageIndex,
    pageCount,
    onAddService,
    onPreviousPage,
    onNextPage,
    onSelectPage,
  }) => (
    <section aria-label={copy.title}>
      <TopRatedServicesHeader copy={copy} />
      <TopRatedServicesGrid
        services={services}
        emptyState={copy.noResults}
        onAddService={onAddService}
      />
      {pageCount > 1 ? (
        <div className={TOP_RATED_PAGINATION_WRAP_CLASS}>
          <TopRatedServicesPagination
            pageIndex={pageIndex}
            pageCount={pageCount}
            labels={copy.pagination}
            onPrevious={onPreviousPage}
            onNext={onNextPage}
            onSelectPage={onSelectPage}
          />
        </div>
      ) : null}
    </section>
  ),
);

TopRatedServicesView.displayName = 'TopRatedServicesView';

export default TopRatedServicesView;
