import React, { memo } from 'react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import ServiceDetailsRelatedCard from './ServiceDetailsRelatedCard';
import { RELATED_GRID_CLASS } from './serviceDetailsData';

const ServiceDetailsRelated = memo(({ services, onAdd }) => (
  <section aria-label={SERVICE_DETAILS_CONTENT.related.title} className="mt-16 min-w-0">
    <h2 className="text-3xl font-semibold break-words text-brand-ink">
      {SERVICE_DETAILS_CONTENT.related.title}
    </h2>
    <div className={RELATED_GRID_CLASS}>
      {services.map((service) => (
        <ServiceDetailsRelatedCard key={service.id} service={service} onAdd={onAdd} />
      ))}
    </div>
  </section>
));

ServiceDetailsRelated.displayName = 'ServiceDetailsRelated';

export default ServiceDetailsRelated;
