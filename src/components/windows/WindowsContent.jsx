import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { WINDOWS_CONTENT } from './windowsCopy';
import {
  WINDOWS_ALL_CATEGORY,
  WINDOWS_FILTER_TABS,
  WINDOWS_PAGE_SIZE,
  WINDOWS_PRICE_RANGES,
  WINDOWS_SERVICES,
} from './windowsData';

const WindowsContent = memo(() => (
  <ServiceCatalogContent
    services={WINDOWS_SERVICES}
    categories={WINDOWS_FILTER_TABS}
    priceRanges={WINDOWS_PRICE_RANGES}
    allCategory={WINDOWS_ALL_CATEGORY}
    pageSize={WINDOWS_PAGE_SIZE}
    content={WINDOWS_CONTENT}
  />
));

WindowsContent.displayName = 'WindowsContent';

export default WindowsContent;
