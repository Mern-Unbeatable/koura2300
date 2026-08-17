import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { FLOORING_CONTENT } from './flooringCopy';
import {
  FLOORING_ALL_CATEGORY,
  FLOORING_FILTER_TABS,
  FLOORING_PAGE_SIZE,
  FLOORING_PRICE_RANGES,
  FLOORING_SERVICES,
} from './flooringData';

const FlooringContent = memo(() => (
  <ServiceCatalogContent
    services={FLOORING_SERVICES}
    categories={FLOORING_FILTER_TABS}
    priceRanges={FLOORING_PRICE_RANGES}
    allCategory={FLOORING_ALL_CATEGORY}
    pageSize={FLOORING_PAGE_SIZE}
    content={FLOORING_CONTENT}
  />
));

FlooringContent.displayName = 'FlooringContent';

export default FlooringContent;
