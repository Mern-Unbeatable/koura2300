import React, { memo } from 'react';
import AccountContent from '../components/account/AccountContent';
import { ACCOUNT_CONTENT } from '../components/account/accountCopy';
import { useSEO } from '../hooks/useSEO';

const Account = memo(() => {
  useSEO(ACCOUNT_CONTENT.seo);

  return <AccountContent />;
});

Account.displayName = 'Account';

export default Account;
