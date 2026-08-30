import { memo } from 'react';
import { Download } from 'lucide-react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_DOWNLOAD_BUTTON_CLASS,
  SETTINGS_DOWNLOAD_ICON_SIZE_PX,
  SETTINGS_MATRIX_HEADER_BAR_CLASS,
  SETTINGS_MATRIX_HEADER_CELL_CLASS,
  SETTINGS_MATRIX_HEADER_MODERATOR_WIDTH_CLASS,
  SETTINGS_MATRIX_HEADER_MODULE_WIDTH_CLASS,
  SETTINGS_MATRIX_MODULE_CELL_VISIBILITY_CLASS,
  SETTINGS_MATRIX_PANEL_CLASS,
  SETTINGS_MATRIX_ROW_CLASS,
  SETTINGS_MATRIX_SCROLL_CLASS,
  SETTINGS_MATRIX_TITLE_ROW_CLASS,
  SETTINGS_MATRIX_TITLE_VISIBILITY_CLASS,
  SETTINGS_MATRIX_VISIBILITY_STATUS_CLASS,
  getVisibilityLabel,
} from './settingsData';

const VisibilityMatrixRow = memo(({ row, copy }) => (
  <div className={SETTINGS_MATRIX_ROW_CLASS}>
    <div className={SETTINGS_MATRIX_MODULE_CELL_VISIBILITY_CLASS}>{row.name}</div>
    <div className={SETTINGS_MATRIX_VISIBILITY_STATUS_CLASS}>
      {getVisibilityLabel(row.visibility, copy)}
    </div>
  </div>
));

VisibilityMatrixRow.displayName = 'VisibilityMatrixRow';

const SettingsVisibilityMatrix = memo(
  ({ copy = SETTINGS_COPY, visibilityRows, onDownloadVisibility }) => (
    <section
      className={SETTINGS_MATRIX_PANEL_CLASS}
      aria-labelledby="settings-visibility-matrix-title"
      aria-label={copy.visibilityMatrix.title}
      role="region"
      data-testid="settings-visibility-matrix"
    >
      <div className={SETTINGS_MATRIX_TITLE_ROW_CLASS}>
        <h2
          id="settings-visibility-matrix-title"
          className={SETTINGS_MATRIX_TITLE_VISIBILITY_CLASS}
        >
          {copy.visibilityMatrix.title}
        </h2>
        <button
          type="button"
          onClick={onDownloadVisibility}
          className={SETTINGS_DOWNLOAD_BUTTON_CLASS}
        >
          <Download size={SETTINGS_DOWNLOAD_ICON_SIZE_PX} aria-hidden="true" />
          {copy.visibilityMatrix.downloadLabel}
        </button>
      </div>

      <div className={SETTINGS_MATRIX_SCROLL_CLASS} data-lenis-prevent>
        <div className={SETTINGS_MATRIX_HEADER_BAR_CLASS} role="row">
          <div className={`${SETTINGS_MATRIX_HEADER_CELL_CLASS} ${SETTINGS_MATRIX_HEADER_MODULE_WIDTH_CLASS}`}>
            {copy.visibilityMatrix.moduleColumn}
          </div>
          <div
            className={`${SETTINGS_MATRIX_HEADER_CELL_CLASS} ${SETTINGS_MATRIX_HEADER_MODERATOR_WIDTH_CLASS}`}
          >
            {copy.visibilityMatrix.moderatorColumn}
          </div>
        </div>

        <div role="list" aria-label={copy.visibilityMatrix.title}>
          {visibilityRows.map((row) => (
            <VisibilityMatrixRow key={row.id} row={row} copy={copy} />
          ))}
        </div>
      </div>
    </section>
  ),
);

SettingsVisibilityMatrix.displayName = 'SettingsVisibilityMatrix';

export default SettingsVisibilityMatrix;
