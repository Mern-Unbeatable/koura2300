import React, { memo } from 'react';
import useAccountSettings from '../../hooks/useAccountSettings';
import useChangePassword from '../../hooks/useChangePassword';
import useLandingSearch from '../../hooks/useLandingSearch';
import useScrollToTop from '../../hooks/useScrollToTop';
import { ALL_CATALOG_SERVICES } from '../catalog/catalogRegistry';
import LandingFooter from '../home/LandingFooter';
import LandingHeader from '../home/LandingHeader';
import AccountView from './AccountView';
import { ACCOUNT_MAIN_CLASS, ACCOUNT_PAGE_CLASS } from './accountData';

const AccountContent = memo(() => {
  useScrollToTop();

  const { searchValue, handleSearchChange, handleSearchSubmit } =
    useLandingSearch(ALL_CATALOG_SERVICES);
  const accountSettings = useAccountSettings();
  const changePassword = useChangePassword();

  return (
    <div className={ACCOUNT_PAGE_CLASS}>
      <LandingHeader
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <main className={ACCOUNT_MAIN_CLASS}>
        <AccountView
          profile={accountSettings.profile}
          profileCopy={accountSettings.profileCopy}
          profileFields={accountSettings.profileFields}
          avatarInputRef={accountSettings.avatarInputRef}
          isSaveDisabled={accountSettings.isSaveDisabled}
          onProfileChange={accountSettings.handleProfileChange}
          onSaveProfile={accountSettings.handleSaveProfile}
          onAvatarButtonClick={accountSettings.handleAvatarButtonClick}
          onAvatarChange={accountSettings.handleAvatarChange}
          passwordCopy={changePassword.passwordCopy}
          passwordFields={changePassword.passwordFields}
          passwordVisibility={changePassword.passwordVisibility}
          passwordFieldNames={changePassword.passwordFieldNames}
          isPasswordSubmitDisabled={changePassword.isPasswordSubmitDisabled}
          onPasswordChange={changePassword.handlePasswordChange}
          onPasswordSubmit={changePassword.handlePasswordSubmit}
          onTogglePasswordVisibility={changePassword.handleTogglePasswordVisibility}
        />
      </main>
      <LandingFooter />
    </div>
  );
});

AccountContent.displayName = 'AccountContent';

export default AccountContent;
