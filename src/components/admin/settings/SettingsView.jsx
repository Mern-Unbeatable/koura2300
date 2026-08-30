import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import { SETTINGS_PAGE_CLASS } from './settingsData';
import SettingsEditMatrix from './SettingsEditMatrix';
import SettingsHeader from './SettingsHeader';
import SettingsInviteCard from './SettingsInviteCard';
import SettingsVisibilityMatrix from './SettingsVisibilityMatrix';

const SettingsView = memo(
  ({
    copy = SETTINGS_COPY,
    inviteEmail,
    inviteEmailError,
    editModules,
    visibilityRows,
    onInviteEmailChange,
    onSendInvite,
    onToggleEditPermission,
    onRemoveEditModule,
    onDownloadVisibility,
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
      <SettingsEditMatrix
        copy={copy}
        editModules={editModules}
        onToggleEditPermission={onToggleEditPermission}
        onRemoveEditModule={onRemoveEditModule}
      />
      <SettingsVisibilityMatrix
        copy={copy}
        visibilityRows={visibilityRows}
        onDownloadVisibility={onDownloadVisibility}
      />
    </div>
  ),
);

SettingsView.displayName = 'SettingsView';

export default SettingsView;
