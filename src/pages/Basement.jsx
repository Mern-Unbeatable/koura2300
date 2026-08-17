import React, { memo } from 'react';
import BasementContent from '../components/basement/BasementContent';
import { BASEMENT_CONTENT } from '../components/basement/basementCopy';
import { useSEO } from '../hooks/useSEO';

const Basement = memo(() => {
  useSEO(BASEMENT_CONTENT.seo);

  return <BasementContent />;
});

Basement.displayName = 'Basement';

export default Basement;
