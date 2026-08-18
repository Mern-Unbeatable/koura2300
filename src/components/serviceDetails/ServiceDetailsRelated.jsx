import React, { memo } from 'react';
import usePaginatedItems from '../../hooks/usePaginatedItems';
import ServiceCatalogPagination from '../catalog/ServiceCatalogPagination';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import ServiceDetailsRelatedCard from './ServiceDetailsRelatedCard';
import { RELATED_GRID_CLASS } from './serviceDetailsData';

const { related } = SERVICE_DETAILS_CONTENT;

const ServiceDetailsRelated = memo(({ services, selectedCategory, onAdd }) => {
  const pagination = usePaginatedItems(services);

  if (services.length === 0) {
    return null;
  }

  return (
    <section aria-label={related.title} className="mt-16 min-w-0">
      <h2 className="text-3xl font-semibold break-words text-brand-ink">{related.title}</h2>
      <div className={RELATED_GRID_CLASS}>
        {pagination.items.map((service) => (
          <ServiceDetailsRelatedCard
            key={service.id}
            service={service}
            selectedCategory={selectedCategory}
            onAdd={onAdd}
          />
        ))}
      </div>
      {pagination.pageCount > 1 && (
        <div className="mt-10">
          <ServiceCatalogPagination
            pageIndex={pagination.pageIndex}
            pageCount={pagination.pageCount}
            labels={related.pagination}
            onPrevious={pagination.showPreviousPage}
            onNext={pagination.showNextPage}
            onSelectPage={pagination.showPage}
          />
        </div>
      )}
    </section>
  );
});

ServiceDetailsRelated.displayName = 'ServiceDetailsRelated';

export default ServiceDetailsRelated;
