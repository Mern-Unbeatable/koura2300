import React, { memo } from 'react';
import GarageContent from '../components/garage/GarageContent';
import { GARAGE_CONTENT } from '../components/garage/garageCopy';
import { useSEO } from '../hooks/useSEO';

const Garage = memo(() => {
  useSEO(GARAGE_CONTENT.seo);

  return <GarageContent />;
});

Garage.displayName = 'Garage';

export default Garage;
