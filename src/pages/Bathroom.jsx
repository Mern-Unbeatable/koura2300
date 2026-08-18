import React, { memo } from 'react';
import BathroomContent from '../components/bathroom/BathroomContent';
import { BATHROOM_CONTENT } from '../components/bathroom/bathroomCopy';
import { useSEO } from '../hooks/useSEO';

const Bathroom = memo(() => {
  useSEO(BATHROOM_CONTENT.seo);

  return <BathroomContent />;
});

Bathroom.displayName = 'Bathroom';

export default Bathroom;
