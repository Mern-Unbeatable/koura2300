import React, { memo } from 'react';
import ClosetsContent from '../components/closets/ClosetsContent';
import { CLOSETS_CONTENT } from '../components/closets/closetsCopy';
import { useSEO } from '../hooks/useSEO';

const Closets = memo(() => {
  useSEO(CLOSETS_CONTENT.seo);

  return <ClosetsContent />;
});

Closets.displayName = 'Closets';

export default Closets;
