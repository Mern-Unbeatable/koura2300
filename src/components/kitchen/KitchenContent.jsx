import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { KITCHEN_CONTENT } from './kitchenCopy';
import {
  KITCHEN_ALL_CATEGORY,
  KITCHEN_FILTER_TABS,
  KITCHEN_PAGE_SIZE,
  KITCHEN_PRICE_RANGES,
  KITCHEN_SERVICES,
} from './kitchenData';

const KitchenContent = memo(() => (
  <ServiceCatalogContent
    services={KITCHEN_SERVICES}
    categories={KITCHEN_FILTER_TABS}
    priceRanges={KITCHEN_PRICE_RANGES}
    allCategory={KITCHEN_ALL_CATEGORY}
    pageSize={KITCHEN_PAGE_SIZE}
    content={KITCHEN_CONTENT}
  />
));

KitchenContent.displayName = 'KitchenContent';

export default KitchenContent;
