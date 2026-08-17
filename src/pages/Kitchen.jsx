import React, { memo } from 'react';
import KitchenContent from '../components/kitchen/KitchenContent';
import { KITCHEN_CONTENT } from '../components/kitchen/kitchenCopy';
import { useSEO } from '../hooks/useSEO';

const Kitchen = memo(() => {
  useSEO(KITCHEN_CONTENT.seo);

  return <KitchenContent />;
});

Kitchen.displayName = 'Kitchen';

export default Kitchen;
