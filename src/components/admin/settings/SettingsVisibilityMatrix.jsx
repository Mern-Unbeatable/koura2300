import { memo } from 'react';
import { Download } from 'lucide-react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_DOWNLOAD_BUTTON_CLASS,
  SETTINGS_DOWNLOAD_ICON_SIZE_PX,
  SETTINGS_MATRIX_HEADER_BAR_CLASS,
  SETTINGS_MATRIX_MODERATOR_CELL_CLASS,
  SETTINGS_MATRIX_MODULE_CELL_CLASS,
  SETTINGS_MATRIX_PANEL_CLASS,
  SETTINGS_MATRIX_ROW_CLASS,
  getVisibilityLabel,
} from './settingsData';

const VisibilityMatrixRow = memo(({ row, copy }) => (
  <div className={SETTINGS_MATRIX_ROW_CLASS}>
    <div className={`${SETTINGS_MATRIX_MODULE_CELL_CLASS} text-[#1f2933]`}>{row.name}</div>
    <div
      className={`${SETTINGS_MATRIX_MODERATOR_CELL_CLASS} text-sm font-normal leading-6 text-[#1f2933] sm:text-base`}
    >
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
    >
      <div className="flex flex-col gap-3 px-4 pb-2 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:pt-5 lg:px-7">
        <h2
          id="settings-visibility-matrix-title"
          className="text-xl font-bold text-[#1f2933] sm:text-2xl"
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

      <div className="overflow-x-auto">
        <div className={SETTINGS_MATRIX_HEADER_BAR_CLASS} role="row">
          <div className={`${SETTINGS_MATRIX_MODULE_CELL_CLASS} py-3 font-normal text-[#697076]`}>
            {copy.visibilityMatrix.moduleColumn}
          </div>
          <div
            className={`${SETTINGS_MATRIX_MODERATOR_CELL_CLASS} py-3 text-sm text-[#697076] sm:text-base`}
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
