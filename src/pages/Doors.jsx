import React, { memo } from 'react';
import DoorsContent from '../components/doors/DoorsContent';
import { DOORS_CONTENT } from '../components/doors/doorsCopy';
import { useSEO } from '../hooks/useSEO';

const Doors = memo(() => {
  useSEO(DOORS_CONTENT.seo);

  return <DoorsContent />;
});

Doors.displayName = 'Doors';

export default Doors;
