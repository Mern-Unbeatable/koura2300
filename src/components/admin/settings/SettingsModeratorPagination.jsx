import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_MODERATORS_FOOTER_CLASS,
  SETTINGS_MODERATORS_PAGINATION_BUTTON_CLASS,
  SETTINGS_MODERATORS_PAGINATION_CLASS,
  SETTINGS_MODERATORS_RESULTS_CLASS,
} from './settingsData';

const SettingsModeratorPagination = memo(
  ({ copy = SETTINGS_COPY, rangeLabel, canGoPrevious, canGoNext, onPrevious, onNext }) => (
    <footer
      className={SETTINGS_MODERATORS_FOOTER_CLASS}
      aria-label={copy.moderators.pagination.regionLabel}
      data-testid="settings-moderator-pagination"
    >
      <p className={SETTINGS_MODERATORS_RESULTS_CLASS}>{rangeLabel}</p>
      <div className={SETTINGS_MODERATORS_PAGINATION_CLASS}>
        <button
          type="button"
          className={SETTINGS_MODERATORS_PAGINATION_BUTTON_CLASS}
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          {copy.moderators.pagination.previous}
        </button>
        <button
          type="button"
          className={SETTINGS_MODERATORS_PAGINATION_BUTTON_CLASS}
          onClick={onNext}
          disabled={!canGoNext}
        >
          {copy.moderators.pagination.next}
        </button>
      </div>
    </footer>
  ),
);

SettingsModeratorPagination.displayName = 'SettingsModeratorPagination';

export default SettingsModeratorPagination;
