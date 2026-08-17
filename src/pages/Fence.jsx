import React, { memo } from 'react';
import FenceContent from '../components/fence/FenceContent';
import { FENCE_CONTENT } from '../components/fence/fenceCopy';
import { useSEO } from '../hooks/useSEO';

const Fence = memo(() => {
  useSEO(FENCE_CONTENT.seo);

  return <FenceContent />;
});

Fence.displayName = 'Fence';

export default Fence;
