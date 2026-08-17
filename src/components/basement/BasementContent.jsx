import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { BASEMENT_CONTENT } from './basementCopy';
import {
  BASEMENT_ALL_CATEGORY,
  BASEMENT_FILTER_TABS,
  BASEMENT_PAGE_SIZE,
  BASEMENT_PRICE_RANGES,
  BASEMENT_SERVICES,
} from './basementData';

const BasementContent = memo(() => (
  <ServiceCatalogContent
    services={BASEMENT_SERVICES}
    categories={BASEMENT_FILTER_TABS}
    priceRanges={BASEMENT_PRICE_RANGES}
    allCategory={BASEMENT_ALL_CATEGORY}
    pageSize={BASEMENT_PAGE_SIZE}
    content={BASEMENT_CONTENT}
  />
));

BasementContent.displayName = 'BasementContent';

export default BasementContent;
