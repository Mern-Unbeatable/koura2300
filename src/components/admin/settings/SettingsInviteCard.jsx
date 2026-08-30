import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_INVITE_BUTTON_CLASS,
  SETTINGS_INVITE_CARD_CLASS,
  SETTINGS_INVITE_DESCRIPTION_CLASS,
  SETTINGS_INVITE_FIELD_CLASS,
  SETTINGS_INVITE_FORM_CLASS,
  SETTINGS_INVITE_SELECT_CLASS,
  SETTINGS_INVITE_TITLE_CLASS,
  SETTINGS_ROLE_OPTIONS,
} from './settingsData';

const SettingsInviteCard = memo(
  ({
    copy = SETTINGS_COPY,
    inviteEmail,
    inviteRole,
    inviteEmailError,
    roleOptions = SETTINGS_ROLE_OPTIONS,
    onInviteEmailChange,
    onInviteRoleChange,
    onSendInvite,
  }) => (
    <section className={SETTINGS_INVITE_CARD_CLASS} aria-labelledby="settings-invite-title">
      <h2 id="settings-invite-title" className={SETTINGS_INVITE_TITLE_CLASS}>
        {copy.invite.title}
      </h2>

      <div className={SETTINGS_INVITE_DESCRIPTION_CLASS}>
        <p className="mb-0 leading-6">{copy.invite.descriptionLineOne}</p>
        <p className="leading-6">{copy.invite.descriptionLineTwo}</p>
      </div>

      <form className={SETTINGS_INVITE_FORM_CLASS} onSubmit={onSendInvite} noValidate>
        <div className="flex max-w-full flex-col gap-1">
          <label className="sr-only" htmlFor="settings-invite-email">
            {copy.invite.emailLabel}
          </label>
          <input
            id="settings-invite-email"
            type="email"
            name="email"
            autoComplete="email"
            value={inviteEmail}
            onChange={onInviteEmailChange}
            placeholder={copy.invite.emailPlaceholder}
            aria-invalid={Boolean(inviteEmailError)}
            aria-describedby={inviteEmailError ? 'settings-invite-email-error' : undefined}
            className={SETTINGS_INVITE_FIELD_CLASS}
          />
          {inviteEmailError ? (
            <p id="settings-invite-email-error" className="text-sm text-red-600" role="alert">
              {inviteEmailError}
            </p>
          ) : null}
        </div>

        <label className="sr-only" htmlFor="settings-invite-role">
          {copy.invite.roleLabel}
        </label>
        <select
          id="settings-invite-role"
          name="role"
          value={inviteRole}
          onChange={onInviteRoleChange}
          className={SETTINGS_INVITE_SELECT_CLASS}
        >
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button type="submit" className={SETTINGS_INVITE_BUTTON_CLASS}>
          {copy.invite.sendLabel}
        </button>
      </form>
    </section>
  ),
);

SettingsInviteCard.displayName = 'SettingsInviteCard';

export default SettingsInviteCard;
