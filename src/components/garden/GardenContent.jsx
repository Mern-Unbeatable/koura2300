import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { GARDEN_CONTENT } from './gardenCopy';
import {
  GARDEN_ALL_CATEGORY,
  GARDEN_FILTER_TABS,
  GARDEN_PAGE_SIZE,
  GARDEN_PRICE_RANGES,
  GARDEN_SERVICES,
} from './gardenData';

const GardenContent = memo(() => (
  <ServiceCatalogContent
    services={GARDEN_SERVICES}
    categories={GARDEN_FILTER_TABS}
    priceRanges={GARDEN_PRICE_RANGES}
    allCategory={GARDEN_ALL_CATEGORY}
    pageSize={GARDEN_PAGE_SIZE}
    content={GARDEN_CONTENT}
  />
));

GardenContent.displayName = 'GardenContent';

export default GardenContent;
