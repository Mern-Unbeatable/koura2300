import React, { memo } from 'react';
import {
  DEFAULT_SUBCATEGORY_COPY,
  SUBCATEGORY_GRID_CLASS,
} from './subcategoryData';
import ServiceCatalogSubcategoryCard from './ServiceCatalogSubcategoryCard';

const ServiceCatalogSubcategoryGrid = memo(
  ({ cards, gridLabel = DEFAULT_SUBCATEGORY_COPY.gridLabel, startingAtLabel, onSelect }) => (
    <div
      role="region"
      aria-label={gridLabel}
      className={SUBCATEGORY_GRID_CLASS}
      data-testid="subcategory-cards-grid"
    >
      {cards.map((card) => (
        <ServiceCatalogSubcategoryCard
          key={card.id}
          card={card}
          startingAtLabel={startingAtLabel}
          onSelect={onSelect}
        />
      ))}
    </div>
  ),
);

ServiceCatalogSubcategoryGrid.displayName = 'ServiceCatalogSubcategoryGrid';

export default ServiceCatalogSubcategoryGrid;
