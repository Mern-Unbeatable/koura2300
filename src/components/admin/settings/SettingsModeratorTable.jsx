import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_MODERATORS_TABLE_CLASS,
  SETTINGS_MODERATORS_TABLE_COLUMN_WIDTHS,
  SETTINGS_MODERATORS_TABLE_HEAD_CELL_CLASS,
  SETTINGS_MODERATORS_TABLE_HEAD_CLASS,
} from './settingsData';
import SettingsModeratorTableRow from './SettingsModeratorTableRow';

const SettingsModeratorTable = memo(({ copy = SETTINGS_COPY, moderators, onEditModerator }) => (
  <table
    className={SETTINGS_MODERATORS_TABLE_CLASS}
    aria-label={copy.moderators.title}
  >
    <colgroup>
      {SETTINGS_MODERATORS_TABLE_COLUMN_WIDTHS.map((width, columnIndex) => (
        <col key={`moderator-column-${columnIndex}`} style={{ width }} />
      ))}
    </colgroup>
    <thead className={SETTINGS_MODERATORS_TABLE_HEAD_CLASS}>
      <tr>
        <th scope="col" className={SETTINGS_MODERATORS_TABLE_HEAD_CELL_CLASS}>
          {copy.moderators.columns.name}
        </th>
        <th scope="col" className={SETTINGS_MODERATORS_TABLE_HEAD_CELL_CLASS}>
          {copy.moderators.columns.phone}
        </th>
        <th scope="col" className={SETTINGS_MODERATORS_TABLE_HEAD_CELL_CLASS}>
          {copy.moderators.columns.email}
        </th>
        <th scope="col" className={SETTINGS_MODERATORS_TABLE_HEAD_CELL_CLASS}>
          {copy.moderators.columns.access}
        </th>
        <th scope="col" className={SETTINGS_MODERATORS_TABLE_HEAD_CELL_CLASS}>
          {copy.moderators.columns.status}
        </th>
        <th scope="col" className={SETTINGS_MODERATORS_TABLE_HEAD_CELL_CLASS}>
          {copy.moderators.columns.action}
        </th>
      </tr>
    </thead>
    <tbody>
      {moderators.map((moderator) => (
        <SettingsModeratorTableRow
          key={moderator.id}
          moderator={moderator}
          copy={copy}
          onEditModerator={onEditModerator}
        />
      ))}
    </tbody>
  </table>
));

SettingsModeratorTable.displayName = 'SettingsModeratorTable';

export default SettingsModeratorTable;
