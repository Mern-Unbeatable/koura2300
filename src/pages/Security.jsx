import React, { memo } from 'react';
import SecurityContent from '../components/security/SecurityContent';
import { SECURITY_CONTENT } from '../components/security/securityCopy';
import { useSEO } from '../hooks/useSEO';

const Security = memo(() => {
  useSEO(SECURITY_CONTENT.seo);

  return <SecurityContent />;
});

Security.displayName = 'Security';

export default Security;
