import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { BATHROOM_CONTENT } from './bathroomCopy';
import {
  BATHROOM_ALL_CATEGORY,
  BATHROOM_FILTER_TABS,
  BATHROOM_PAGE_SIZE,
  BATHROOM_PRICE_RANGES,
  BATHROOM_SERVICES,
} from './bathroomData';

const BathroomContent = memo(() => (
  <ServiceCatalogContent
    services={BATHROOM_SERVICES}
    categories={BATHROOM_FILTER_TABS}
    priceRanges={BATHROOM_PRICE_RANGES}
    allCategory={BATHROOM_ALL_CATEGORY}
    pageSize={BATHROOM_PAGE_SIZE}
    content={BATHROOM_CONTENT}
  />
));

BathroomContent.displayName = 'BathroomContent';

export default BathroomContent;
