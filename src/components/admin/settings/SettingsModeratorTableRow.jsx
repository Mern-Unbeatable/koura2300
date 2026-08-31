import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_MODERATORS_ACCESS_CELL_CLASS,
  SETTINGS_MODERATORS_ACTION_CELL_CLASS,
  SETTINGS_MODERATORS_EMAIL_CELL_CLASS,
  SETTINGS_MODERATORS_NAME_CELL_CLASS,
  SETTINGS_MODERATORS_PHONE_CELL_CLASS,
  SETTINGS_MODERATORS_STATUS_CELL_CLASS,
  SETTINGS_MODERATORS_TABLE_ROW_CLASS,
} from './settingsData';
import {
  SettingsModeratorEditButton,
  SettingsModeratorStatusBadge,
} from './SettingsModeratorStatusBadge';

const SettingsModeratorTableRow = memo(({ moderator, copy = SETTINGS_COPY, onEditModerator }) => (
  <tr className={SETTINGS_MODERATORS_TABLE_ROW_CLASS}>
    <td className={SETTINGS_MODERATORS_NAME_CELL_CLASS}>{moderator.name}</td>
    <td className={SETTINGS_MODERATORS_PHONE_CELL_CLASS}>{moderator.phone}</td>
    <td className={SETTINGS_MODERATORS_EMAIL_CELL_CLASS}>{moderator.email}</td>
    <td className={SETTINGS_MODERATORS_ACCESS_CELL_CLASS}>{moderator.access}</td>
    <td className={SETTINGS_MODERATORS_STATUS_CELL_CLASS}>
      <SettingsModeratorStatusBadge status={moderator.status} copy={copy} />
    </td>
    <td className={SETTINGS_MODERATORS_ACTION_CELL_CLASS}>
      <SettingsModeratorEditButton
        moderator={moderator}
        copy={copy}
        onEditModerator={onEditModerator}
      />
    </td>
  </tr>
));

SettingsModeratorTableRow.displayName = 'SettingsModeratorTableRow';

export default SettingsModeratorTableRow;
