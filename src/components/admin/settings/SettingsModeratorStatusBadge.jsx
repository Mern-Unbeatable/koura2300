import { memo } from 'react';
import { SquarePen } from 'lucide-react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_MODERATOR_EDIT_ICON_SIZE_PX,
  SETTINGS_MODERATOR_STATUS_ACTIVE,
  SETTINGS_MODERATORS_EDIT_BUTTON_CLASS,
  SETTINGS_MODERATORS_STATUS_ACTIVE_CLASS,
  SETTINGS_MODERATORS_STATUS_DISABLED_CLASS,
  getModeratorStatusLabel,
} from './settingsData';

const SettingsModeratorStatusBadge = memo(({ status, copy = SETTINGS_COPY }) => (
  <span
    className={
      status === SETTINGS_MODERATOR_STATUS_ACTIVE
        ? SETTINGS_MODERATORS_STATUS_ACTIVE_CLASS
        : SETTINGS_MODERATORS_STATUS_DISABLED_CLASS
    }
  >
    {getModeratorStatusLabel(status, copy)}
  </span>
));

SettingsModeratorStatusBadge.displayName = 'SettingsModeratorStatusBadge';

const SettingsModeratorEditButton = memo(({ moderator, copy = SETTINGS_COPY, onEditModerator }) => (
  <button
    type="button"
    onClick={() => onEditModerator(moderator.id)}
    aria-label={copy.moderators.editLabel(moderator.name)}
    className={SETTINGS_MODERATORS_EDIT_BUTTON_CLASS}
  >
    <SquarePen size={SETTINGS_MODERATOR_EDIT_ICON_SIZE_PX} aria-hidden="true" />
  </button>
));

SettingsModeratorEditButton.displayName = 'SettingsModeratorEditButton';

export { SettingsModeratorStatusBadge, SettingsModeratorEditButton };
