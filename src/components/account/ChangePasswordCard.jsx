import React, { memo } from 'react';
import AccountPasswordField from './AccountPasswordField';
import {
  ACCOUNT_CARD_BODY_CLASS,
  ACCOUNT_CARD_CLASS,
  ACCOUNT_FORM_FIELDS_CLASS,
  ACCOUNT_FORM_STACK_CLASS,
  ACCOUNT_PRIMARY_BUTTON_CLASS,
  ACCOUNT_SECTION_HEADER_CLASS,
  ACCOUNT_SECTION_TITLE_CLASS,
} from './accountData';

const ChangePasswordCard = memo(
  ({
    copy,
    passwordFields,
    passwordVisibility,
    passwordFieldNames,
    isPasswordSubmitDisabled,
    onPasswordChange,
    onPasswordSubmit,
    onTogglePasswordVisibility,
  }) => (
    <section
      role="region"
      aria-label={copy.regionLabel}
      className={ACCOUNT_CARD_CLASS}
    >
      <div className={ACCOUNT_SECTION_HEADER_CLASS}>
        <h2 className={ACCOUNT_SECTION_TITLE_CLASS}>{copy.title}</h2>
      </div>

      <form className={ACCOUNT_CARD_BODY_CLASS} onSubmit={onPasswordSubmit}>
        <div className={ACCOUNT_FORM_STACK_CLASS}>
          <div className={ACCOUNT_FORM_FIELDS_CLASS}>
            <AccountPasswordField
              id="account-current-password"
              label={copy.currentPasswordLabel}
              value={passwordFields[passwordFieldNames.CURRENT]}
              onChange={onPasswordChange(passwordFieldNames.CURRENT)}
              isVisible={passwordVisibility[passwordFieldNames.CURRENT]}
              onToggleVisibility={() => onTogglePasswordVisibility(passwordFieldNames.CURRENT)}
              toggleLabel={copy.toggleVisibilityLabel}
            />
            <AccountPasswordField
              id="account-new-password"
              label={copy.newPasswordLabel}
              value={passwordFields[passwordFieldNames.NEW]}
              onChange={onPasswordChange(passwordFieldNames.NEW)}
              isVisible={passwordVisibility[passwordFieldNames.NEW]}
              onToggleVisibility={() => onTogglePasswordVisibility(passwordFieldNames.NEW)}
              toggleLabel={copy.toggleVisibilityLabel}
              placeholder={copy.newPasswordPlaceholder}
            />
            <AccountPasswordField
              id="account-confirm-password"
              label={copy.confirmPasswordLabel}
              value={passwordFields[passwordFieldNames.CONFIRM]}
              onChange={onPasswordChange(passwordFieldNames.CONFIRM)}
              isVisible={passwordVisibility[passwordFieldNames.CONFIRM]}
              onToggleVisibility={() => onTogglePasswordVisibility(passwordFieldNames.CONFIRM)}
              toggleLabel={copy.toggleVisibilityLabel}
            />
          </div>

          <button
            type="submit"
            disabled={isPasswordSubmitDisabled}
            className={ACCOUNT_PRIMARY_BUTTON_CLASS}
          >
            {copy.submitButton}
          </button>
        </div>
      </form>
    </section>
  ),
);

ChangePasswordCard.displayName = 'ChangePasswordCard';

export default ChangePasswordCard;
