import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_MODERATORS_COUNT_CLASS,
  SETTINGS_MODERATORS_HEADER_CLASS,
  SETTINGS_MODERATORS_SECTION_CLASS,
  SETTINGS_MODERATORS_TABLE_CARD_CLASS,
  SETTINGS_MODERATORS_TABLE_SCROLL_CLASS,
  SETTINGS_MODERATORS_TITLE_CLASS,
} from './settingsData';
import SettingsModeratorCards from './SettingsModeratorCards';
import SettingsModeratorPagination from './SettingsModeratorPagination';
import SettingsModeratorTable from './SettingsModeratorTable';
import useSettingsModeratorCompactLayout from './useSettingsModeratorCompactLayout';

const SettingsModeratorManagement = memo(
  ({
    copy = SETTINGS_COPY,
    moderators,
    moderatorCountLabel,
    pagination,
    onEditModerator,
    onPreviousPage,
    onNextPage,
  }) => {
    const isCompactLayout = useSettingsModeratorCompactLayout();

    return (
    <section
      className={SETTINGS_MODERATORS_SECTION_CLASS}
      aria-labelledby="settings-moderator-management-title"
      data-testid="settings-moderator-management"
    >
      <div className={SETTINGS_MODERATORS_HEADER_CLASS}>
        <h2 id="settings-moderator-management-title" className={SETTINGS_MODERATORS_TITLE_CLASS}>
          {copy.moderators.title}
        </h2>
        <p className={SETTINGS_MODERATORS_COUNT_CLASS}>{moderatorCountLabel}</p>
      </div>

      <div className={SETTINGS_MODERATORS_TABLE_CARD_CLASS} data-testid="settings-moderator-table-card">
        {isCompactLayout ? (
          <SettingsModeratorCards
            copy={copy}
            moderators={moderators}
            onEditModerator={onEditModerator}
          />
        ) : (
          <div
            className={SETTINGS_MODERATORS_TABLE_SCROLL_CLASS}
            data-testid="settings-moderator-table-scroll"
            data-lenis-prevent
          >
            <SettingsModeratorTable
              copy={copy}
              moderators={moderators}
              onEditModerator={onEditModerator}
            />
          </div>
        )}

        <SettingsModeratorPagination
          copy={copy}
          rangeLabel={pagination.rangeLabel}
          canGoPrevious={pagination.canGoPrevious}
          canGoNext={pagination.canGoNext}
          onPrevious={onPreviousPage}
          onNext={onNextPage}
        />
      </div>
    </section>
    );
  },
);

SettingsModeratorManagement.displayName = 'SettingsModeratorManagement';

export default SettingsModeratorManagement;
