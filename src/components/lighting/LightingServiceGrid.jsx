import React, { memo } from 'react';
import ServiceCard, { SERVICE_CARD_VARIANTS } from '../home/ServiceCard';
import { LIGHTING_CONTENT } from './lightingCopy';

const LightingServiceGrid = memo(({ services, onAddService }) => {
  if (services.length === 0) {
    return (
      <p role="status" className="rounded-2xl bg-gray-50 p-10 text-center text-gray-500">
        {LIGHTING_CONTENT.emptyState}
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
        />
      ))}
    </div>
  );
});

LightingServiceGrid.displayName = 'LightingServiceGrid';

export default LightingServiceGrid;
