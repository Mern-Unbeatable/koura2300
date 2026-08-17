import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { GARAGE_CONTENT } from './garageCopy';
import {
  GARAGE_ALL_CATEGORY,
  GARAGE_FILTER_TABS,
  GARAGE_PAGE_SIZE,
  GARAGE_PRICE_RANGES,
  GARAGE_SERVICES,
} from './garageData';

const GarageContent = memo(() => (
  <ServiceCatalogContent
    services={GARAGE_SERVICES}
    categories={GARAGE_FILTER_TABS}
    priceRanges={GARAGE_PRICE_RANGES}
    allCategory={GARAGE_ALL_CATEGORY}
    pageSize={GARAGE_PAGE_SIZE}
    content={GARAGE_CONTENT}
  />
));

GarageContent.displayName = 'GarageContent';

export default GarageContent;
