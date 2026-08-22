import React, { memo } from 'react';
import AccountSettingCard from './AccountSettingCard';
import ChangePasswordCard from './ChangePasswordCard';
import { ACCOUNT_GRID_CLASS } from './accountData';

const AccountView = memo(
  ({
    profile,
    profileCopy,
    profileFields,
    avatarInputRef,
    isSaveDisabled,
    onProfileChange,
    onSaveProfile,
    onAvatarButtonClick,
    onAvatarChange,
    passwordCopy,
    passwordFields,
    passwordVisibility,
    passwordFieldNames,
    isPasswordSubmitDisabled,
    onPasswordChange,
    onPasswordSubmit,
    onTogglePasswordVisibility,
  }) => (
    <div className={ACCOUNT_GRID_CLASS}>
      <AccountSettingCard
        copy={profileCopy}
        profile={profile}
        profileFields={profileFields}
        avatarInputRef={avatarInputRef}
        isSaveDisabled={isSaveDisabled}
        onProfileChange={onProfileChange}
        onSaveProfile={onSaveProfile}
        onAvatarButtonClick={onAvatarButtonClick}
        onAvatarChange={onAvatarChange}
      />
      <ChangePasswordCard
        copy={passwordCopy}
        passwordFields={passwordFields}
        passwordVisibility={passwordVisibility}
        passwordFieldNames={passwordFieldNames}
        isPasswordSubmitDisabled={isPasswordSubmitDisabled}
        onPasswordChange={onPasswordChange}
        onPasswordSubmit={onPasswordSubmit}
        onTogglePasswordVisibility={onTogglePasswordVisibility}
      />
    </div>
  ),
);

AccountView.displayName = 'AccountView';

export default AccountView;
