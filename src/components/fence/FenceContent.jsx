import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { FENCE_CONTENT } from './fenceCopy';
import {
  FENCE_ALL_CATEGORY,
  FENCE_FILTER_TABS,
  FENCE_PAGE_SIZE,
  FENCE_PRICE_RANGES,
  FENCE_SERVICES,
} from './fenceData';

const FenceContent = memo(() => (
  <ServiceCatalogContent
    services={FENCE_SERVICES}
    categories={FENCE_FILTER_TABS}
    priceRanges={FENCE_PRICE_RANGES}
    allCategory={FENCE_ALL_CATEGORY}
    pageSize={FENCE_PAGE_SIZE}
    content={FENCE_CONTENT}
  />
));

FenceContent.displayName = 'FenceContent';

export default FenceContent;
