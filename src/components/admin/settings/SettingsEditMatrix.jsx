import { memo, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_DELETE_BUTTON_CLASS,
  SETTINGS_DELETE_ICON_SIZE_PX,
  SETTINGS_MATRIX_ACTION_CELL_CLASS,
  SETTINGS_MATRIX_HEADER_BAR_CLASS,
  SETTINGS_MATRIX_HEADER_CELL_CLASS,
  SETTINGS_MATRIX_MODERATOR_CELL_CLASS,
  SETTINGS_MATRIX_MODULE_CELL_CLASS,
  SETTINGS_MATRIX_PANEL_CLASS,
  SETTINGS_MATRIX_ROW_CLASS,
  SETTINGS_MATRIX_SCROLL_CLASS,
  SETTINGS_MATRIX_TITLE_CLASS,
  SETTINGS_MATRIX_TITLE_ROW_CLASS,
} from './settingsData';
import SettingsToggle from './SettingsToggle';

const EditMatrixRow = memo(({ module, copy, onToggleEditPermission, onRemoveEditModule }) => {
  const handleToggle = useCallback(() => {
    onToggleEditPermission(module.id);
  }, [module.id, onToggleEditPermission]);

  const handleRemove = useCallback(() => {
    onRemoveEditModule(module.id);
  }, [module.id, onRemoveEditModule]);

  return (
    <div className={SETTINGS_MATRIX_ROW_CLASS}>
      <div className={SETTINGS_MATRIX_MODULE_CELL_CLASS}>{module.name}</div>
      <div className={SETTINGS_MATRIX_MODERATOR_CELL_CLASS}>
        <SettingsToggle
          checked={module.canEdit}
          label={copy.editMatrix.toggleLabel(module.name, module.canEdit)}
          onToggle={handleToggle}
        />
      </div>
      <div className={SETTINGS_MATRIX_ACTION_CELL_CLASS}>
        <button
          type="button"
          onClick={handleRemove}
          aria-label={copy.editMatrix.deleteLabel(module.name)}
          className={SETTINGS_DELETE_BUTTON_CLASS}
        >
          <Trash2 size={SETTINGS_DELETE_ICON_SIZE_PX} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

EditMatrixRow.displayName = 'EditMatrixRow';

const SettingsEditMatrix = memo(
  ({
    copy = SETTINGS_COPY,
    editModules,
    onToggleEditPermission,
    onRemoveEditModule,
  }) => (
    <section
      className={`${SETTINGS_MATRIX_PANEL_CLASS} pb-[64px]`}
      aria-labelledby="settings-edit-matrix-title"
      data-testid="settings-edit-matrix"
    >
      <div className={SETTINGS_MATRIX_TITLE_ROW_CLASS}>
        <h2 id="settings-edit-matrix-title" className={SETTINGS_MATRIX_TITLE_CLASS}>
          {copy.editMatrix.title}
        </h2>
      </div>

      <div className={SETTINGS_MATRIX_SCROLL_CLASS}>
        <div className={SETTINGS_MATRIX_HEADER_BAR_CLASS} role="row">
          <div className={`${SETTINGS_MATRIX_HEADER_CELL_CLASS} w-[221px]`}>
            {copy.editMatrix.moduleColumn}
          </div>
          <div className={`${SETTINGS_MATRIX_HEADER_CELL_CLASS} w-[180px]`}>
            {copy.editMatrix.moderatorColumn}
          </div>
          <div className={`${SETTINGS_MATRIX_HEADER_CELL_CLASS} w-[160px]`}>
            {copy.editMatrix.actionColumn}
          </div>
        </div>

        <div role="list" aria-label={copy.editMatrix.title}>
          {editModules.map((module) => (
            <EditMatrixRow
              key={module.id}
              module={module}
              copy={copy}
              onToggleEditPermission={onToggleEditPermission}
              onRemoveEditModule={onRemoveEditModule}
            />
          ))}
        </div>
      </div>
    </section>
  ),
);

SettingsEditMatrix.displayName = 'SettingsEditMatrix';

export default SettingsEditMatrix;
