import React, { memo } from 'react';
import GardenContent from '../components/garden/GardenContent';
import { GARDEN_CONTENT } from '../components/garden/gardenCopy';
import { useSEO } from '../hooks/useSEO';

const Garden = memo(() => {
  useSEO(GARDEN_CONTENT.seo);

  return <GardenContent />;
});

Garden.displayName = 'Garden';

export default Garden;
