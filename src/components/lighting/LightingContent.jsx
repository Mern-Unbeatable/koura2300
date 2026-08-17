import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { LIGHTING_CONTENT } from './lightingCopy';
import {
  LIGHTING_ALL_CATEGORY,
  LIGHTING_FILTER_TABS,
  LIGHTING_PAGE_SIZE,
  LIGHTING_PRICE_RANGES,
  LIGHTING_SERVICES,
} from './lightingData';

const LightingContent = memo(() => (
  <ServiceCatalogContent
    services={LIGHTING_SERVICES}
    categories={LIGHTING_FILTER_TABS}
    priceRanges={LIGHTING_PRICE_RANGES}
    allCategory={LIGHTING_ALL_CATEGORY}
    pageSize={LIGHTING_PAGE_SIZE}
    content={LIGHTING_CONTENT}
  />
));

LightingContent.displayName = 'LightingContent';

export default LightingContent;
