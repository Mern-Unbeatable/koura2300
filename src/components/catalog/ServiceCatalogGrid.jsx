import React, { memo } from 'react';
import { buildServiceDetailsRoute } from '../../config';
import ServiceCard, { SERVICE_CARD_VARIANTS } from '../home/ServiceCard';

const ServiceCatalogGrid = memo(({ services, emptyState, onAddService }) => {
  if (services.length === 0) {
    return (
      <p role="status" className="rounded-2xl bg-gray-50 p-10 text-center text-gray-500">
        {emptyState}
      </p>
    );
  }

  return (
    <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onAdd={onAddService}
          variant={SERVICE_CARD_VARIANTS.CATALOG}
          detailsPath={buildServiceDetailsRoute(service.id)}
        />
      ))}
    </div>
  );
});

ServiceCatalogGrid.displayName = 'ServiceCatalogGrid';

export default ServiceCatalogGrid;
