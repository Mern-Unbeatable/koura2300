import React, { memo } from 'react';
import usePaginatedItems from '../../hooks/usePaginatedItems';
import ServiceCatalogGrid from '../catalog/ServiceCatalogGrid';
import ServiceCatalogPagination from '../catalog/ServiceCatalogPagination';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';

const { related } = SERVICE_DETAILS_CONTENT;

const ServiceDetailsRelated = memo(({ services, selectedCategory, onAdd }) => {
  const pagination = usePaginatedItems(services);

  if (services.length === 0) {
    return null;
  }

  return (
    <section aria-label={related.title} className="mt-16 min-w-0">
      <h2 className="text-3xl font-semibold wrap-break-word text-brand-ink">{related.title}</h2>
      <div className="mt-8">
        <ServiceCatalogGrid
          services={pagination.items}
          emptyState={related.emptyState}
          onAddService={onAdd}
          selectedCategory={selectedCategory}
        />
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
