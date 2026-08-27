import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { CATEGORIES_COPY } from './categoriesCopy';
import {
  CATEGORIES_MODAL_ACTIONS_CLASS,
  CATEGORIES_MODAL_CANCEL_CLASS,
  CATEGORIES_MODAL_CLOSE_CLASS,
  CATEGORIES_MODAL_CLOSE_ICON_SIZE_PX,
  CATEGORIES_MODAL_DIALOG_CLASS,
  CATEGORIES_MODAL_ERROR_CLASS,
  CATEGORIES_MODAL_HEADER_CLASS,
  CATEGORIES_MODAL_INPUT_CLASS,
  CATEGORIES_MODAL_INPUT_ERROR_CLASS,
  CATEGORIES_MODAL_LABEL_CLASS,
  CATEGORIES_MODAL_OVERLAY_CLASS,
  CATEGORIES_MODAL_SAVE_CLASS,
  CATEGORIES_MODAL_TITLE_CLASS,
  CATEGORIES_NAME_MAX_LENGTH,
} from './categoriesData';
import { getAddModalTitle } from './categoriesUtils';

const CATEGORIES_NAME_FIELD_ID = 'categories-add-name';
const CATEGORIES_NAME_ERROR_ID = 'categories-add-name-error';

const CategoriesAddModal = ({
  kind,
  draftName,
  draftError,
  onClose,
  onDraftNameChange,
  onSubmit,
}) => {
  const title = getAddModalTitle(kind);
  const inputClassName = draftError
    ? `${CATEGORIES_MODAL_INPUT_CLASS} ${CATEGORIES_MODAL_INPUT_ERROR_CLASS}`
    : CATEGORIES_MODAL_INPUT_CLASS;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={CATEGORIES_MODAL_OVERLAY_CLASS}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={CATEGORIES_MODAL_DIALOG_CLASS}
      >
        <div className={CATEGORIES_MODAL_HEADER_CLASS}>
          <h2 className={CATEGORIES_MODAL_TITLE_CLASS}>{title}</h2>
          <button
            type="button"
            aria-label={CATEGORIES_COPY.closeLabel}
            onClick={onClose}
            className={CATEGORIES_MODAL_CLOSE_CLASS}
          >
            <X size={CATEGORIES_MODAL_CLOSE_ICON_SIZE_PX} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={onSubmit} noValidate>
          <label htmlFor={CATEGORIES_NAME_FIELD_ID} className={CATEGORIES_MODAL_LABEL_CLASS}>
            {CATEGORIES_COPY.nameLabel}
          </label>
          <input
            id={CATEGORIES_NAME_FIELD_ID}
            name="name"
            type="text"
            value={draftName}
            onChange={onDraftNameChange}
            placeholder={CATEGORIES_COPY.namePlaceholder}
            maxLength={CATEGORIES_NAME_MAX_LENGTH}
            aria-invalid={Boolean(draftError)}
            aria-describedby={draftError ? CATEGORIES_NAME_ERROR_ID : undefined}
            className={inputClassName}
            autoFocus
          />
          {draftError ? (
            <p id={CATEGORIES_NAME_ERROR_ID} className={CATEGORIES_MODAL_ERROR_CLASS}>
              {draftError}
            </p>
          ) : null}

          <div className={CATEGORIES_MODAL_ACTIONS_CLASS}>
            <button
              type="button"
              onClick={onClose}
              className={CATEGORIES_MODAL_CANCEL_CLASS}
            >
              {CATEGORIES_COPY.cancelLabel}
            </button>
            <button type="submit" className={CATEGORIES_MODAL_SAVE_CLASS}>
              {CATEGORIES_COPY.saveLabel}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default CategoriesAddModal;
