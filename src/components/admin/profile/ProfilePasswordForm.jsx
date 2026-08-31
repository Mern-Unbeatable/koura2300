import { memo } from 'react';
import { PROFILE_COPY } from './profileCopy';
import {
  PROFILE_ACTIONS_CLASS,
  PROFILE_PASSWORD_FIELDS_CLASS,
  PROFILE_PRIMARY_BUTTON_CLASS,
  PROFILE_SECTION_CLASS,
  PROFILE_SECTION_TITLE_CLASS,
} from './profileData';
import ProfilePasswordField from './ProfilePasswordField';

const ProfilePasswordForm = memo(
  ({
    copy = PROFILE_COPY,
    currentPassword,
    newPassword,
    confirmPassword,
    passwordErrors,
    passwordVisibility,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onTogglePasswordVisibility,
    onChangePassword,
  }) => (
    <form
      className={PROFILE_SECTION_CLASS}
      onSubmit={onChangePassword}
      noValidate
      aria-labelledby="admin-profile-password-title"
    >
      <h2 id="admin-profile-password-title" className={PROFILE_SECTION_TITLE_CLASS}>
        {copy.passwordTitle}
      </h2>

      <div className={PROFILE_PASSWORD_FIELDS_CLASS} data-testid="admin-profile-password-fields">
        <ProfilePasswordField
          id="admin-profile-current-password"
          label={copy.fields.currentPassword}
          value={currentPassword}
          onChange={onCurrentPasswordChange}
          error={passwordErrors.currentPassword}
          isVisible={passwordVisibility.currentPassword}
          onToggleVisibility={() => onTogglePasswordVisibility('currentPassword')}
          autoComplete="current-password"
        />
        <ProfilePasswordField
          id="admin-profile-new-password"
          label={copy.fields.newPassword}
          value={newPassword}
          onChange={onNewPasswordChange}
          error={passwordErrors.newPassword}
          isVisible={passwordVisibility.newPassword}
          onToggleVisibility={() => onTogglePasswordVisibility('newPassword')}
          autoComplete="new-password"
        />
        <ProfilePasswordField
          id="admin-profile-confirm-password"
          label={copy.fields.confirmPassword}
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          error={passwordErrors.confirmPassword}
          isVisible={passwordVisibility.confirmPassword}
          onToggleVisibility={() => onTogglePasswordVisibility('confirmPassword')}
          autoComplete="new-password"
        />
      </div>

      <div className={PROFILE_ACTIONS_CLASS}>
        <button type="submit" className={PROFILE_PRIMARY_BUTTON_CLASS}>
          {copy.actions.changePassword}
        </button>
      </div>
    </form>
  ),
);

ProfilePasswordForm.displayName = 'ProfilePasswordForm';

export default ProfilePasswordForm;
