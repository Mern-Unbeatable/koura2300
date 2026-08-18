import React, { memo } from 'react';
import WallsCeilingsContent from '../components/wallsCeilings/WallsCeilingsContent';
import { WALLS_CEILINGS_CONTENT } from '../components/wallsCeilings/wallsCeilingsCopy';
import { useSEO } from '../hooks/useSEO';

const WallsCeilings = memo(() => {
  useSEO(WALLS_CEILINGS_CONTENT.seo);

  return <WallsCeilingsContent />;
});

WallsCeilings.displayName = 'WallsCeilings';

export default WallsCeilings;
