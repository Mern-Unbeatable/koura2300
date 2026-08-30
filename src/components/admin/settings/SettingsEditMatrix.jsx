import { memo, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_DELETE_BUTTON_CLASS,
  SETTINGS_DELETE_ICON_SIZE_PX,
  SETTINGS_MATRIX_ACTION_CELL_CLASS,
  SETTINGS_MATRIX_HEADER_BAR_CLASS,
  SETTINGS_MATRIX_MODERATOR_CELL_CLASS,
  SETTINGS_MATRIX_MODULE_CELL_CLASS,
  SETTINGS_MATRIX_PANEL_CLASS,
  SETTINGS_MATRIX_ROW_CLASS,
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
    <section className={SETTINGS_MATRIX_PANEL_CLASS} aria-labelledby="settings-edit-matrix-title">
      <div className="flex items-center justify-between px-4 pb-2 pt-5 sm:px-5 sm:pt-5">
        <h2
          id="settings-edit-matrix-title"
          className="text-xl font-bold text-[#161d24] sm:text-2xl"
        >
          {copy.editMatrix.title}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <div className={SETTINGS_MATRIX_HEADER_BAR_CLASS} role="row">
          <div className={`${SETTINGS_MATRIX_MODULE_CELL_CLASS} py-3 font-normal text-[#697076]`}>
            {copy.editMatrix.moduleColumn}
          </div>
          <div
            className={`${SETTINGS_MATRIX_MODERATOR_CELL_CLASS} py-3 text-sm text-[#697076] sm:text-base`}
          >
            {copy.editMatrix.moderatorColumn}
          </div>
          <div
            className={`${SETTINGS_MATRIX_ACTION_CELL_CLASS} py-3 text-sm text-[#697076] sm:text-base`}
          >
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
