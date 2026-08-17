import React, { memo } from 'react';
import FlooringContent from '../components/flooring/FlooringContent';
import { FLOORING_CONTENT } from '../components/flooring/flooringCopy';
import { useSEO } from '../hooks/useSEO';

const Flooring = memo(() => {
  useSEO(FLOORING_CONTENT.seo);

  return <FlooringContent />;
});

Flooring.displayName = 'Flooring';

export default Flooring;
