import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import { SETTINGS_PAGE_CLASS } from './settingsData';
import SettingsHeader from './SettingsHeader';
import SettingsInviteCard from './SettingsInviteCard';
import SettingsModeratorManagement from './SettingsModeratorManagement';

const SettingsView = memo(
  ({
    copy = SETTINGS_COPY,
    inviteEmail,
    inviteEmailError,
    moderators,
    moderatorCountLabel,
    pagination,
    onInviteEmailChange,
    onSendInvite,
    onEditModerator,
    onPreviousPage,
    onNextPage,
  }) => (
    <div className={SETTINGS_PAGE_CLASS} role="region" aria-label={copy.regionLabel}>
      <SettingsHeader copy={copy} />
      <SettingsInviteCard
        copy={copy}
        inviteEmail={inviteEmail}
        inviteEmailError={inviteEmailError}
        onInviteEmailChange={onInviteEmailChange}
        onSendInvite={onSendInvite}
      />
      <SettingsModeratorManagement
        copy={copy}
        moderators={moderators}
        moderatorCountLabel={moderatorCountLabel}
        pagination={pagination}
        onEditModerator={onEditModerator}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </div>
  ),
);

SettingsView.displayName = 'SettingsView';

export default SettingsView;
