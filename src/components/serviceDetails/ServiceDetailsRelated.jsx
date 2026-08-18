import React, { memo } from 'react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import ServiceDetailsRelatedCard from './ServiceDetailsRelatedCard';

const ServiceDetailsRelated = memo(({ services, onAdd }) => (
  <section aria-label={SERVICE_DETAILS_CONTENT.related.title} className="mt-16">
    <h2 className="text-3xl font-semibold text-brand-ink">
      {SERVICE_DETAILS_CONTENT.related.title}
    </h2>
    <div className="mt-8 grid gap-5 lg:grid-cols-2">
      {services.map((service) => (
        <ServiceDetailsRelatedCard key={service.id} service={service} onAdd={onAdd} />
      ))}
    </div>
  </section>
));

ServiceDetailsRelated.displayName = 'ServiceDetailsRelated';

export default ServiceDetailsRelated;
