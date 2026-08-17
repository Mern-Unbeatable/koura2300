import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { CLOSETS_CONTENT } from './closetsCopy';
import {
  CLOSETS_ALL_CATEGORY,
  CLOSETS_FILTER_TABS,
  CLOSETS_PAGE_SIZE,
  CLOSETS_PRICE_RANGES,
  CLOSETS_SERVICES,
} from './closetsData';

const ClosetsContent = memo(() => (
  <ServiceCatalogContent
    services={CLOSETS_SERVICES}
    categories={CLOSETS_FILTER_TABS}
    priceRanges={CLOSETS_PRICE_RANGES}
    allCategory={CLOSETS_ALL_CATEGORY}
    pageSize={CLOSETS_PAGE_SIZE}
    content={CLOSETS_CONTENT}
  />
));

ClosetsContent.displayName = 'ClosetsContent';

export default ClosetsContent;
