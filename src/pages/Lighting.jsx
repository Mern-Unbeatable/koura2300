import React, { memo } from 'react';
import LightingContent from '../components/lighting/LightingContent';
import { LIGHTING_CONTENT } from '../components/lighting/lightingCopy';
import { useSEO } from '../hooks/useSEO';

const Lighting = memo(() => {
  useSEO(LIGHTING_CONTENT.seo);

  return <LightingContent />;
});

Lighting.displayName = 'Lighting';

export default Lighting;
