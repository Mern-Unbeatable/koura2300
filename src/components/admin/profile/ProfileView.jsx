import { memo } from 'react';
import { PROFILE_COPY } from './profileCopy';
import { PROFILE_CARD_CLASS, PROFILE_PAGE_CLASS, PROFILE_TOP_STACK_CLASS } from './profileData';
import ProfileAccountForm from './ProfileAccountForm';
import ProfileHeader from './ProfileHeader';
import ProfileIdentity from './ProfileIdentity';
import ProfilePasswordForm from './ProfilePasswordForm';

const ProfileView = memo(
  ({
    copy = PROFILE_COPY,
    displayName,
    displayEmail,
    avatarPreviewUrl,
    name,
    email,
    currentPassword,
    newPassword,
    confirmPassword,
    accountErrors,
    passwordErrors,
    passwordVisibility,
    onNameChange,
    onEmailChange,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onTogglePasswordVisibility,
    onAvatarChange,
    onUpdateProfile,
    onChangePassword,
  }) => (
    <div className={PROFILE_PAGE_CLASS} role="region" aria-label={copy.regionLabel}>
      <ProfileHeader copy={copy} />

      <section className={PROFILE_CARD_CLASS} data-testid="admin-profile-card">
        <div className={PROFILE_TOP_STACK_CLASS}>
          <ProfileIdentity
            copy={copy}
            displayName={displayName}
            displayEmail={displayEmail}
            avatarPreviewUrl={avatarPreviewUrl}
            onAvatarChange={onAvatarChange}
          />
          <ProfileAccountForm
            copy={copy}
            name={name}
            email={email}
            accountErrors={accountErrors}
            onNameChange={onNameChange}
            onEmailChange={onEmailChange}
            onUpdateProfile={onUpdateProfile}
          />
        </div>

        <ProfilePasswordForm
          copy={copy}
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          passwordErrors={passwordErrors}
          passwordVisibility={passwordVisibility}
          onCurrentPasswordChange={onCurrentPasswordChange}
          onNewPasswordChange={onNewPasswordChange}
          onConfirmPasswordChange={onConfirmPasswordChange}
          onTogglePasswordVisibility={onTogglePasswordVisibility}
          onChangePassword={onChangePassword}
        />
      </section>
    </div>
  ),
);

ProfileView.displayName = 'ProfileView';

export default ProfileView;
