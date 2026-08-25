import ServiceCard, { SERVICE_CARD_VARIANTS } from '../../home/ServiceCard';
import { SERVICES_EMPTY_CLASS, SERVICES_GRID_CLASS } from './servicesData';

const ServicesGrid = ({
  copy,
  services,
  onEditService,
  onDeleteService,
}) => {
  if (services.length === 0) {
    return <p className={SERVICES_EMPTY_CLASS}>{copy.emptyResults}</p>;
  }

  return (
    <div
      role="region"
      aria-label={copy.gridLabel}
      className={SERVICES_GRID_CLASS}
    >
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          variant={SERVICE_CARD_VARIANTS.ADMIN}
          onEdit={onEditService}
          onDelete={onDeleteService}
          editLabel={copy.edit}
          deleteLabel={copy.delete}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
