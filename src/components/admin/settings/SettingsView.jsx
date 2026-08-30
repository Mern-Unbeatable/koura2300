import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import { SETTINGS_PAGE_CLASS, SETTINGS_ROLE_OPTIONS } from './settingsData';
import SettingsEditMatrix from './SettingsEditMatrix';
import SettingsHeader from './SettingsHeader';
import SettingsInviteCard from './SettingsInviteCard';
import SettingsVisibilityMatrix from './SettingsVisibilityMatrix';

const SettingsView = memo(
  ({
    copy = SETTINGS_COPY,
    inviteEmail,
    inviteRole,
    inviteEmailError,
    roleOptions = SETTINGS_ROLE_OPTIONS,
    editModules,
    visibilityRows,
    onInviteEmailChange,
    onInviteRoleChange,
    onSendInvite,
    onToggleEditPermission,
    onRemoveEditModule,
    onDownloadVisibility,
  }) => (
    <div className={`${SETTINGS_PAGE_CLASS} h-auto`} role="region" aria-label={copy.regionLabel}>
      <SettingsHeader copy={copy} />
      <SettingsInviteCard
        copy={copy}
        inviteEmail={inviteEmail}
        inviteRole={inviteRole}
        inviteEmailError={inviteEmailError}
        roleOptions={roleOptions}
        onInviteEmailChange={onInviteEmailChange}
        onInviteRoleChange={onInviteRoleChange}
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
