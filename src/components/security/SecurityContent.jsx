import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { SECURITY_CONTENT } from './securityCopy';
import {
  SECURITY_ALL_CATEGORY,
  SECURITY_FILTER_TABS,
  SECURITY_PAGE_SIZE,
  SECURITY_PRICE_RANGES,
  SECURITY_SERVICES,
} from './securityData';

const SecurityContent = memo(() => (
  <ServiceCatalogContent
    services={SECURITY_SERVICES}
    categories={SECURITY_FILTER_TABS}
    priceRanges={SECURITY_PRICE_RANGES}
    allCategory={SECURITY_ALL_CATEGORY}
    pageSize={SECURITY_PAGE_SIZE}
    content={SECURITY_CONTENT}
  />
));

SecurityContent.displayName = 'SecurityContent';

export default SecurityContent;
