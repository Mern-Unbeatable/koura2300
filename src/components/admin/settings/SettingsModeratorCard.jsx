import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_MODERATORS_CARD_BODY_CLASS,
  SETTINGS_MODERATORS_CARD_CLASS,
  SETTINGS_MODERATORS_CARD_HEADER_CLASS,
  SETTINGS_MODERATORS_CARD_LABEL_CLASS,
  SETTINGS_MODERATORS_CARD_NAME_CLASS,
  SETTINGS_MODERATORS_CARD_ROW_CLASS,
  SETTINGS_MODERATORS_CARD_VALUE_CLASS,
} from './settingsData';
import {
  SettingsModeratorEditButton,
  SettingsModeratorStatusBadge,
} from './SettingsModeratorStatusBadge';

const SettingsModeratorCardField = ({ label, children }) => (
  <div className={SETTINGS_MODERATORS_CARD_ROW_CLASS}>
    <span className={SETTINGS_MODERATORS_CARD_LABEL_CLASS}>{label}</span>
    <span className={SETTINGS_MODERATORS_CARD_VALUE_CLASS}>{children}</span>
  </div>
);

const SettingsModeratorCard = memo(({ moderator, copy = SETTINGS_COPY, onEditModerator }) => (
  <article
    className={SETTINGS_MODERATORS_CARD_CLASS}
    aria-label={copy.moderators.columns.name}
    data-testid={`settings-moderator-card-${moderator.id}`}
  >
    <div className={SETTINGS_MODERATORS_CARD_HEADER_CLASS}>
      <p className={SETTINGS_MODERATORS_CARD_NAME_CLASS}>{moderator.name}</p>
      <SettingsModeratorEditButton
        moderator={moderator}
        copy={copy}
        onEditModerator={onEditModerator}
      />
    </div>

    <div className={SETTINGS_MODERATORS_CARD_BODY_CLASS}>
      <SettingsModeratorCardField label={copy.moderators.columns.phone}>
        {moderator.phone}
      </SettingsModeratorCardField>
      <SettingsModeratorCardField label={copy.moderators.columns.email}>
        {moderator.email}
      </SettingsModeratorCardField>
      <SettingsModeratorCardField label={copy.moderators.columns.access}>
        {moderator.access}
      </SettingsModeratorCardField>
      <SettingsModeratorCardField label={copy.moderators.columns.status}>
        <SettingsModeratorStatusBadge status={moderator.status} copy={copy} />
      </SettingsModeratorCardField>
    </div>
  </article>
));

SettingsModeratorCard.displayName = 'SettingsModeratorCard';

export default SettingsModeratorCard;
