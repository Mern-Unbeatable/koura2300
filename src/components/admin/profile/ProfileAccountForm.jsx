import { memo } from 'react';
import { PROFILE_COPY } from './profileCopy';
import {
  PROFILE_ACCOUNT_FIELDS_CLASS,
  PROFILE_ACTIONS_CLASS,
  PROFILE_PRIMARY_BUTTON_CLASS,
  PROFILE_SECTION_CLASS,
  PROFILE_SECTION_TITLE_CLASS,
} from './profileData';
import ProfileTextField from './ProfileTextField';

const ProfileAccountForm = memo(
  ({
    copy = PROFILE_COPY,
    name,
    email,
    accountErrors,
    onNameChange,
    onEmailChange,
    onUpdateProfile,
  }) => (
    <form
      className={PROFILE_SECTION_CLASS}
      onSubmit={onUpdateProfile}
      noValidate
      aria-labelledby="admin-profile-account-title"
    >
      <h2 id="admin-profile-account-title" className={PROFILE_SECTION_TITLE_CLASS}>
        {copy.accountTitle}
      </h2>

      <div className={PROFILE_ACCOUNT_FIELDS_CLASS} data-testid="admin-profile-account-fields">
        <ProfileTextField
          id="admin-profile-name"
          label={copy.fields.name}
          value={name}
          onChange={onNameChange}
          error={accountErrors.name}
          autoComplete="name"
        />
        <ProfileTextField
          id="admin-profile-email"
          label={copy.fields.email}
          type="email"
          value={email}
          onChange={onEmailChange}
          error={accountErrors.email}
          autoComplete="email"
        />
      </div>

      <div className={PROFILE_ACTIONS_CLASS}>
        <button type="submit" className={PROFILE_PRIMARY_BUTTON_CLASS}>
          {copy.actions.updateProfile}
        </button>
      </div>
    </form>
  ),
);

ProfileAccountForm.displayName = 'ProfileAccountForm';

export default ProfileAccountForm;
