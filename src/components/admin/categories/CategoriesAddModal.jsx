import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { CATEGORIES_COPY } from './categoriesCopy';
import {
  CATEGORIES_ADD_KIND,
  CATEGORIES_MODAL_CLOSE_CLASS,
  CATEGORIES_MODAL_CLOSE_ICON_SIZE_PX,
  CATEGORIES_MODAL_DIALOG_CLASS,
  CATEGORIES_MODAL_ERROR_CLASS,
  CATEGORIES_MODAL_FIELD_CLASS,
  CATEGORIES_MODAL_FORM_CLASS,
  CATEGORIES_MODAL_INPUT_CLASS,
  CATEGORIES_MODAL_INPUT_ERROR_CLASS,
  CATEGORIES_MODAL_LABEL_CLASS,
  CATEGORIES_MODAL_OVERLAY_CLASS,
  CATEGORIES_MODAL_SAVE_CLASS,
  CATEGORIES_NAME_MAX_LENGTH,
} from './categoriesData';
import CategoriesCategorySelect from './CategoriesCategorySelect';
import { getAddModalTitle } from './categoriesUtils';

const CATEGORIES_CATEGORY_NAME_FIELD_ID = 'categories-add-category-name';
const CATEGORIES_CATEGORY_SELECT_FIELD_ID = 'categories-add-category-select';
const CATEGORIES_CATEGORY_SELECT_LABEL_ID = 'categories-add-category-select-label';
const CATEGORIES_SUBCATEGORY_NAME_FIELD_ID = 'categories-add-subcategory-name';
const CATEGORIES_CATEGORY_NAME_ERROR_ID = 'categories-add-category-name-error';
const CATEGORIES_CATEGORY_SELECT_ERROR_ID = 'categories-add-category-select-error';
const CATEGORIES_SUBCATEGORY_NAME_ERROR_ID = 'categories-add-subcategory-name-error';

const CategoriesAddModal = ({
  kind,
  draftName,
  draftError,
  draftCategoryId,
  draftCategoryError,
  categoryOptions,
  onClose,
  onDraftNameChange,
  onDraftCategoryChange,
  onSubmit,
}) => {
  const title = getAddModalTitle(kind);
  const isCategoryModal = kind === CATEGORIES_ADD_KIND.CATEGORY;
  const nameFieldId = isCategoryModal
    ? CATEGORIES_CATEGORY_NAME_FIELD_ID
    : CATEGORIES_SUBCATEGORY_NAME_FIELD_ID;
  const nameErrorId = isCategoryModal
    ? CATEGORIES_CATEGORY_NAME_ERROR_ID
    : CATEGORIES_SUBCATEGORY_NAME_ERROR_ID;
  const nameLabel = isCategoryModal
    ? CATEGORIES_COPY.categoryNameLabel
    : CATEGORIES_COPY.subcategoryNameLabel;
  const namePlaceholder = isCategoryModal
    ? CATEGORIES_COPY.categoryNamePlaceholder
    : CATEGORIES_COPY.subcategoryNamePlaceholder;
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
      data-testid="categories-add-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={CATEGORIES_MODAL_DIALOG_CLASS}
      >
        <button
          type="button"
          aria-label={CATEGORIES_COPY.closeLabel}
          onClick={onClose}
          className={CATEGORIES_MODAL_CLOSE_CLASS}
        >
          <X size={CATEGORIES_MODAL_CLOSE_ICON_SIZE_PX} aria-hidden="true" />
        </button>

        <form className={CATEGORIES_MODAL_FORM_CLASS} onSubmit={onSubmit} noValidate>
          {isCategoryModal ? (
            <div className={CATEGORIES_MODAL_FIELD_CLASS}>
              <label htmlFor={nameFieldId} className={CATEGORIES_MODAL_LABEL_CLASS}>
                {nameLabel}
              </label>
              <input
                id={nameFieldId}
                name="name"
                type="text"
                value={draftName}
                onChange={onDraftNameChange}
                placeholder={namePlaceholder}
                maxLength={CATEGORIES_NAME_MAX_LENGTH}
                aria-invalid={Boolean(draftError)}
                aria-describedby={draftError ? nameErrorId : undefined}
                className={inputClassName}
                autoFocus
              />
              {draftError ? (
                <p id={nameErrorId} role="alert" className={CATEGORIES_MODAL_ERROR_CLASS}>
                  {draftError}
                </p>
              ) : null}
            </div>
          ) : (
            <>
              <div className={CATEGORIES_MODAL_FIELD_CLASS}>
                <span
                  id={CATEGORIES_CATEGORY_SELECT_LABEL_ID}
                  className={CATEGORIES_MODAL_LABEL_CLASS}
                >
                  {CATEGORIES_COPY.categorySelectLabel}
                </span>
                <CategoriesCategorySelect
                  id={CATEGORIES_CATEGORY_SELECT_FIELD_ID}
                  labelId={CATEGORIES_CATEGORY_SELECT_LABEL_ID}
                  value={draftCategoryId}
                  placeholder={CATEGORIES_COPY.categorySelectPlaceholder}
                  options={categoryOptions}
                  error={draftCategoryError}
                  onChange={onDraftCategoryChange}
                />
                {draftCategoryError ? (
                  <p
                    id={CATEGORIES_CATEGORY_SELECT_ERROR_ID}
                    role="alert"
                    className={CATEGORIES_MODAL_ERROR_CLASS}
                  >
                    {draftCategoryError}
                  </p>
                ) : null}
              </div>

              <div className={CATEGORIES_MODAL_FIELD_CLASS}>
                <label htmlFor={nameFieldId} className={CATEGORIES_MODAL_LABEL_CLASS}>
                  {nameLabel}
                </label>
                <input
                  id={nameFieldId}
                  name="name"
                  type="text"
                  value={draftName}
                  onChange={onDraftNameChange}
                  placeholder={namePlaceholder}
                  maxLength={CATEGORIES_NAME_MAX_LENGTH}
                  aria-invalid={Boolean(draftError)}
                  aria-describedby={draftError ? nameErrorId : undefined}
                  className={inputClassName}
                  autoFocus
                />
                {draftError ? (
                  <p id={nameErrorId} role="alert" className={CATEGORIES_MODAL_ERROR_CLASS}>
                    {draftError}
                  </p>
                ) : null}
              </div>
            </>
          )}

          <button type="submit" className={CATEGORIES_MODAL_SAVE_CLASS}>
            {CATEGORIES_COPY.saveLabel}
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default CategoriesAddModal;
