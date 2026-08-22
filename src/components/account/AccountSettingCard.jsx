import React, { memo } from 'react';
import AccountAvatarField from './AccountAvatarField';
import AccountFormField from './AccountFormField';
import {
  ACCOUNT_CARD_BODY_CLASS,
  ACCOUNT_CARD_CLASS,
  ACCOUNT_FORM_FIELDS_CLASS,
  ACCOUNT_FORM_ROW_CLASS,
  ACCOUNT_FORM_STACK_CLASS,
  ACCOUNT_PRIMARY_BUTTON_CLASS,
  ACCOUNT_SECTION_HEADER_CLASS,
  ACCOUNT_SECTION_TITLE_CLASS,
  ACCOUNT_SETTING_LAYOUT_CLASS,
} from './accountData';

const AccountSettingCard = memo(
  ({
    copy,
    profile,
    profileFields,
    avatarInputRef,
    isSaveDisabled,
    onProfileChange,
    onSaveProfile,
    onAvatarButtonClick,
    onAvatarChange,
  }) => (
    <section
      role="region"
      aria-label={copy.regionLabel}
      className={ACCOUNT_CARD_CLASS}
    >
      <div className={ACCOUNT_SECTION_HEADER_CLASS}>
        <h2 className={ACCOUNT_SECTION_TITLE_CLASS}>{copy.title}</h2>
      </div>

      <form className={ACCOUNT_CARD_BODY_CLASS} onSubmit={onSaveProfile}>
        <div className={ACCOUNT_SETTING_LAYOUT_CLASS}>
          <AccountAvatarField
            avatarUrl={profile.avatarUrl}
            avatarAlt={profile.avatarAlt}
            inputRef={avatarInputRef}
            buttonLabel={copy.changePhotoLabel}
            onButtonClick={onAvatarButtonClick}
            onFileChange={onAvatarChange}
          />

          <div className={ACCOUNT_FORM_STACK_CLASS}>
            <div className={ACCOUNT_FORM_FIELDS_CLASS}>
              <div className={ACCOUNT_FORM_ROW_CLASS}>
                <AccountFormField
                  id="account-first-name"
                  label={copy.firstNameLabel}
                  value={profile.firstName}
                  onChange={onProfileChange(profileFields.FIRST_NAME)}
                />
                <AccountFormField
                  id="account-last-name"
                  label={copy.lastNameLabel}
                  value={profile.lastName}
                  onChange={onProfileChange(profileFields.LAST_NAME)}
                />
              </div>

              <div className={ACCOUNT_FORM_ROW_CLASS}>
                <AccountFormField
                  id="account-email"
                  label={copy.emailLabel}
                  type="email"
                  value={profile.email}
                  onChange={onProfileChange(profileFields.EMAIL)}
                />
                <AccountFormField
                  id="account-phone"
                  label={copy.phoneLabel}
                  type="tel"
                  value={profile.phone}
                  onChange={onProfileChange(profileFields.PHONE)}
                />
              </div>

              <AccountFormField
                id="account-address"
                label={copy.addressLabel}
                value={profile.address}
                onChange={onProfileChange(profileFields.ADDRESS)}
              />
            </div>

            <button
              type="submit"
              disabled={isSaveDisabled}
              className={ACCOUNT_PRIMARY_BUTTON_CLASS}
            >
              {copy.saveButton}
            </button>
          </div>
        </div>
      </form>
    </section>
  ),
);

AccountSettingCard.displayName = 'AccountSettingCard';

export default AccountSettingCard;
