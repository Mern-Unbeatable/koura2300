import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { DOORS_CONTENT } from './doorsCopy';
import {
  DOORS_ALL_CATEGORY,
  DOORS_FILTER_TABS,
  DOORS_PAGE_SIZE,
  DOORS_PRICE_RANGES,
  DOORS_SERVICES,
} from './doorsData';

const DoorsContent = memo(() => (
  <ServiceCatalogContent
    services={DOORS_SERVICES}
    categories={DOORS_FILTER_TABS}
    priceRanges={DOORS_PRICE_RANGES}
    allCategory={DOORS_ALL_CATEGORY}
    pageSize={DOORS_PAGE_SIZE}
    content={DOORS_CONTENT}
  />
));

DoorsContent.displayName = 'DoorsContent';

export default DoorsContent;
