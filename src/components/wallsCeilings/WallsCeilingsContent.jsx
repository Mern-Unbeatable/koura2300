import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { WALLS_CEILINGS_CONTENT } from './wallsCeilingsCopy';
import {
  WALLS_CEILINGS_ALL_CATEGORY,
  WALLS_CEILINGS_FILTER_TABS,
  WALLS_CEILINGS_PAGE_SIZE,
  WALLS_CEILINGS_PRICE_RANGES,
  WALLS_CEILINGS_SERVICES,
} from './wallsCeilingsData';

const WallsCeilingsContent = memo(() => (
  <ServiceCatalogContent
    services={WALLS_CEILINGS_SERVICES}
    categories={WALLS_CEILINGS_FILTER_TABS}
    priceRanges={WALLS_CEILINGS_PRICE_RANGES}
    allCategory={WALLS_CEILINGS_ALL_CATEGORY}
    pageSize={WALLS_CEILINGS_PAGE_SIZE}
    content={WALLS_CEILINGS_CONTENT}
  />
));

WallsCeilingsContent.displayName = 'WallsCeilingsContent';

export default WallsCeilingsContent;
