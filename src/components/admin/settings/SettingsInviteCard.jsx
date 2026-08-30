import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_INVITE_BUTTON_CLASS,
  SETTINGS_INVITE_CARD_CLASS,
  SETTINGS_INVITE_FIELD_CLASS,
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
      <div className="text-sm leading-6 text-[#4c545c] sm:text-base">
        <p>{copy.invite.descriptionLineOne}</p>
        <p>{copy.invite.descriptionLineTwo}</p>
      </div>

      <form
        className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start"
        onSubmit={onSendInvite}
        noValidate
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-none">
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

        <div className="flex min-w-0 flex-col gap-1 sm:flex-none">
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
        </div>

        <button type="submit" className={SETTINGS_INVITE_BUTTON_CLASS}>
          {copy.invite.sendLabel}
        </button>
      </form>
    </section>
  ),
);

SettingsInviteCard.displayName = 'SettingsInviteCard';

export default SettingsInviteCard;
