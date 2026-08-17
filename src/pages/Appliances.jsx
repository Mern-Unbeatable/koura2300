import React, { memo } from 'react';
import AppliancesContent from '../components/appliances/AppliancesContent';
import { APPLIANCES_CONTENT } from '../components/appliances/appliancesCopy';
import { useSEO } from '../hooks/useSEO';

const Appliances = memo(() => {
  useSEO(APPLIANCES_CONTENT.seo);

  return <AppliancesContent />;
});

Appliances.displayName = 'Appliances';

export default Appliances;
