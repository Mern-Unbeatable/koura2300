import React, { memo } from 'react';
import ServiceCatalogContent from '../catalog/ServiceCatalogContent';
import { DECK_CONTENT } from './deckCopy';
import {
  DECK_ALL_CATEGORY,
  DECK_FILTER_TABS,
  DECK_PAGE_SIZE,
  DECK_PRICE_RANGES,
  DECK_SERVICES,
} from './deckData';

const DeckContent = memo(() => (
  <ServiceCatalogContent
    services={DECK_SERVICES}
    categories={DECK_FILTER_TABS}
    priceRanges={DECK_PRICE_RANGES}
    allCategory={DECK_ALL_CATEGORY}
    pageSize={DECK_PAGE_SIZE}
    content={DECK_CONTENT}
  />
));

DeckContent.displayName = 'DeckContent';

export default DeckContent;
