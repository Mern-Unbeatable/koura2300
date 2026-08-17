import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { APPLIANCES_CONTENT } from './appliancesCopy';
import {
  APPLIANCES_ALL_CATEGORY,
  APPLIANCES_FILTER_TABS,
  APPLIANCES_PAGE_SIZE,
  APPLIANCES_PRICE_RANGES,
  APPLIANCES_SERVICES,
} from './appliancesData';

const AppliancesContent = memo(() => (
  <ServiceCatalogContent
    services={APPLIANCES_SERVICES}
    categories={APPLIANCES_FILTER_TABS}
    priceRanges={APPLIANCES_PRICE_RANGES}
    allCategory={APPLIANCES_ALL_CATEGORY}
    pageSize={APPLIANCES_PAGE_SIZE}
    content={APPLIANCES_CONTENT}
  />
));

AppliancesContent.displayName = 'AppliancesContent';

export default AppliancesContent;
