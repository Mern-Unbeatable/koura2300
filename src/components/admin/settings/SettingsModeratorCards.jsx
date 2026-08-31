import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import { SETTINGS_MODERATORS_CARDS_CLASS } from './settingsData';
import SettingsModeratorCard from './SettingsModeratorCard';

const SettingsModeratorCards = memo(({ copy = SETTINGS_COPY, moderators, onEditModerator }) => (
  <div className={SETTINGS_MODERATORS_CARDS_CLASS} data-testid="settings-moderator-cards">
    {moderators.map((moderator) => (
      <SettingsModeratorCard
        key={moderator.id}
        moderator={moderator}
        copy={copy}
        onEditModerator={onEditModerator}
      />
    ))}
  </div>
));

SettingsModeratorCards.displayName = 'SettingsModeratorCards';

export default SettingsModeratorCards;
