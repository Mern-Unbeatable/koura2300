import { memo } from 'react';
import { Check, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { SETTINGS_MODERATOR_ACCESS_COPY } from './settingsAccessCopy';
import {
  SETTINGS_MODERATOR_ACCESS_ACTIONS_CLASS,
  SETTINGS_MODERATOR_ACCESS_BODY_CLASS,
  SETTINGS_MODERATOR_ACCESS_CHECK_ICON_SIZE_PX,
  SETTINGS_MODERATOR_ACCESS_CHECK_STROKE_WIDTH,
  SETTINGS_MODERATOR_ACCESS_CHECKBOX_CHECKED_CLASS,
  SETTINGS_MODERATOR_ACCESS_CHECKBOX_UNCHECKED_CLASS,
  SETTINGS_MODERATOR_ACCESS_CLOSE_CLASS,
  SETTINGS_MODERATOR_ACCESS_CLOSE_ICON_SIZE_PX,
  SETTINGS_MODERATOR_ACCESS_DIALOG_CLASS,
  SETTINGS_MODERATOR_ACCESS_HEADER_CLASS,
  SETTINGS_MODERATOR_ACCESS_OPTION_CLASS,
  SETTINGS_MODERATOR_ACCESS_OPTION_LABEL_CLASS,
  SETTINGS_MODERATOR_ACCESS_OVERLAY_CLASS,
  SETTINGS_MODERATOR_ACCESS_PERMISSIONS,
  SETTINGS_MODERATOR_ACCESS_SAVE_CLASS,
  SETTINGS_MODERATOR_ACCESS_STATUS_BUTTON_ACTIVE_CLASS,
  SETTINGS_MODERATOR_ACCESS_STATUS_BUTTON_CLASS,
  SETTINGS_MODERATOR_ACCESS_TITLE_CLASS,
  SETTINGS_MODERATOR_STATUS_ACTIVE,
  SETTINGS_MODERATOR_STATUS_DISABLED,
} from './settingsAccessData';
import useSettingsModeratorAccessForm from './useSettingsModeratorAccessForm';

const SettingsModeratorAccessCheckbox = memo(({ checked }) => (
  <span
    className={
      checked
        ? SETTINGS_MODERATOR_ACCESS_CHECKBOX_CHECKED_CLASS
        : SETTINGS_MODERATOR_ACCESS_CHECKBOX_UNCHECKED_CLASS
    }
    aria-hidden="true"
  >
    <Check
      size={SETTINGS_MODERATOR_ACCESS_CHECK_ICON_SIZE_PX}
      strokeWidth={SETTINGS_MODERATOR_ACCESS_CHECK_STROKE_WIDTH}
    />
  </span>
));

SettingsModeratorAccessCheckbox.displayName = 'SettingsModeratorAccessCheckbox';

const SettingsModeratorAccessModal = memo(({ moderator, onClose, onSave }) => {
  const { permissionIds, status, onTogglePermission, onSelectStatus, onSubmit } =
    useSettingsModeratorAccessForm({
      moderator,
      onSave,
    });

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const getStatusButtonClass = (buttonStatus) =>
    status === buttonStatus
      ? SETTINGS_MODERATOR_ACCESS_STATUS_BUTTON_ACTIVE_CLASS
      : SETTINGS_MODERATOR_ACCESS_STATUS_BUTTON_CLASS;

  return createPortal(
    <div
      className={SETTINGS_MODERATOR_ACCESS_OVERLAY_CLASS}
      data-testid="settings-moderator-access-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={SETTINGS_MODERATOR_ACCESS_COPY.regionLabel}
        className={SETTINGS_MODERATOR_ACCESS_DIALOG_CLASS}
      >
        <div className={SETTINGS_MODERATOR_ACCESS_HEADER_CLASS}>
          <h2 className={SETTINGS_MODERATOR_ACCESS_TITLE_CLASS}>
            {SETTINGS_MODERATOR_ACCESS_COPY.title}
          </h2>
          <button
            type="button"
            aria-label={SETTINGS_MODERATOR_ACCESS_COPY.closeLabel}
            onClick={onClose}
            className={SETTINGS_MODERATOR_ACCESS_CLOSE_CLASS}
          >
            <X size={SETTINGS_MODERATOR_ACCESS_CLOSE_ICON_SIZE_PX} aria-hidden="true" />
          </button>
        </div>

        <form className={SETTINGS_MODERATOR_ACCESS_BODY_CLASS} onSubmit={onSubmit} noValidate>
          {SETTINGS_MODERATOR_ACCESS_PERMISSIONS.map((permission) => {
            const isChecked = permissionIds.includes(permission.id);

            return (
              <label key={permission.id} className={SETTINGS_MODERATOR_ACCESS_OPTION_CLASS}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => onTogglePermission(permission.id)}
                />
                <SettingsModeratorAccessCheckbox checked={isChecked} />
                <span className={SETTINGS_MODERATOR_ACCESS_OPTION_LABEL_CLASS}>
                  {permission.label}
                </span>
              </label>
            );
          })}

          <div
            className={SETTINGS_MODERATOR_ACCESS_ACTIONS_CLASS}
            data-testid="settings-moderator-access-actions"
            role="group"
            aria-label={SETTINGS_MODERATOR_ACCESS_COPY.selectStatusLabel}
          >
            <button
              type="button"
              className={getStatusButtonClass(SETTINGS_MODERATOR_STATUS_ACTIVE)}
              onClick={() => onSelectStatus(SETTINGS_MODERATOR_STATUS_ACTIVE)}
              aria-pressed={status === SETTINGS_MODERATOR_STATUS_ACTIVE}
            >
              {SETTINGS_MODERATOR_ACCESS_COPY.active}
            </button>
            <button
              type="button"
              className={getStatusButtonClass(SETTINGS_MODERATOR_STATUS_DISABLED)}
              onClick={() => onSelectStatus(SETTINGS_MODERATOR_STATUS_DISABLED)}
              aria-pressed={status === SETTINGS_MODERATOR_STATUS_DISABLED}
            >
              {SETTINGS_MODERATOR_ACCESS_COPY.disabled}
            </button>
            <button type="submit" className={SETTINGS_MODERATOR_ACCESS_SAVE_CLASS}>
              {SETTINGS_MODERATOR_ACCESS_COPY.save}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
});

SettingsModeratorAccessModal.displayName = 'SettingsModeratorAccessModal';

export default SettingsModeratorAccessModal;
