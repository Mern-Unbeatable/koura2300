import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import {
  SERVICES_EDIT_ACTIONS_CLASS,
  SERVICES_EDIT_BODY_CLASS,
  SERVICES_EDIT_CANCEL_CLASS,
  SERVICES_EDIT_CLOSE_CLASS,
  SERVICES_EDIT_CLOSE_ICON_SIZE_PX,
  SERVICES_EDIT_DIALOG_CLASS,
  SERVICES_EDIT_ERROR_TEXT_CLASS,
  SERVICES_EDIT_FIELD_CLASS,
  SERVICES_EDIT_FIELDS_PAIR_CLASS,
  SERVICES_EDIT_FIELDS_ROW_CLASS,
  SERVICES_EDIT_FILE_BUTTON_CLASS,
  SERVICES_EDIT_HEADER_CLASS,
  SERVICES_EDIT_IMAGE_HINT_CLASS,
  SERVICES_EDIT_IMAGE_PREVIEW_CLASS,
  SERVICES_EDIT_INPUT_CLASS,
  SERVICES_EDIT_INPUT_ERROR_CLASS,
  SERVICES_EDIT_LABEL_CLASS,
  SERVICES_EDIT_OVERLAY_CLASS,
  SERVICES_EDIT_SUBMIT_CLASS,
  SERVICES_EDIT_SUBTITLE_CLASS,
  SERVICES_EDIT_TEXTAREA_CLASS,
  SERVICES_EDIT_TITLE_CLASS,
} from './servicesEditData';
import useServicesEditForm from './useServicesEditForm';

const SERVICES_EDIT_IMAGE_INPUT_ID = 'services-edit-image';

const ServicesEditField = ({
  id,
  label,
  error,
  children,
}) => (
  <div className={SERVICES_EDIT_FIELD_CLASS}>
    <label htmlFor={id} className={SERVICES_EDIT_LABEL_CLASS}>
      {label}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} role="alert" className={SERVICES_EDIT_ERROR_TEXT_CLASS}>
        {error}
      </p>
    ) : null}
  </div>
);

const getInputClassName = (hasError, baseClassName = SERVICES_EDIT_INPUT_CLASS) =>
  hasError ? `${baseClassName} ${SERVICES_EDIT_INPUT_ERROR_CLASS}` : baseClassName;

const ServicesEditModal = ({ service, onClose, onSave }) => {
  const {
    copy,
    formValues,
    errors,
    categoryOptions,
    subcategoryOptions,
    onFieldChange,
    onImageChange,
    onSubmit,
  } = useServicesEditForm({ service, onSave });

  if (!service) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={SERVICES_EDIT_OVERLAY_CLASS}
      data-testid="services-edit-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.regionLabel}
        className={SERVICES_EDIT_DIALOG_CLASS}
      >
        <div className={SERVICES_EDIT_HEADER_CLASS}>
          <div className="min-w-0">
            <h2 className={SERVICES_EDIT_TITLE_CLASS}>{copy.title}</h2>
            <p className={SERVICES_EDIT_SUBTITLE_CLASS}>{copy.subtitle}</p>
          </div>
          <button
            type="button"
            aria-label={copy.closeLabel}
            onClick={onClose}
            className={SERVICES_EDIT_CLOSE_CLASS}
          >
            <X size={SERVICES_EDIT_CLOSE_ICON_SIZE_PX} aria-hidden="true" />
          </button>
        </div>

        <form className="flex min-h-0 flex-1 flex-col" onSubmit={onSubmit} noValidate>
          <div className={SERVICES_EDIT_BODY_CLASS}>
          <div className={SERVICES_EDIT_FIELDS_ROW_CLASS}>
            <ServicesEditField
              id="services-edit-category"
              label={copy.categoryLabel}
              error={errors.categoryId}
            >
              <select
                id="services-edit-category"
                name="categoryId"
                value={formValues.categoryId}
                onChange={onFieldChange('categoryId')}
                aria-invalid={Boolean(errors.categoryId)}
                aria-describedby={errors.categoryId ? 'services-edit-category-error' : undefined}
                className={getInputClassName(Boolean(errors.categoryId))}
              >
                <option value="">{copy.placeholders.category}</option>
                {categoryOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </ServicesEditField>

            <ServicesEditField
              id="services-edit-subcategory"
              label={copy.subcategoryLabel}
              error={errors.subcategoryId}
            >
              <select
                id="services-edit-subcategory"
                name="subcategoryId"
                value={formValues.subcategoryId}
                onChange={onFieldChange('subcategoryId')}
                aria-invalid={Boolean(errors.subcategoryId)}
                aria-describedby={
                  errors.subcategoryId ? 'services-edit-subcategory-error' : undefined
                }
                className={getInputClassName(Boolean(errors.subcategoryId))}
              >
                <option value="">{copy.placeholders.subcategory}</option>
                {subcategoryOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </ServicesEditField>

            <ServicesEditField
              id="services-edit-duration"
              label={copy.durationLabel}
              error={errors.duration}
            >
              <input
                id="services-edit-duration"
                name="duration"
                type="text"
                value={formValues.duration}
                onChange={onFieldChange('duration')}
                placeholder={copy.placeholders.duration}
                aria-invalid={Boolean(errors.duration)}
                aria-describedby={errors.duration ? 'services-edit-duration-error' : undefined}
                className={getInputClassName(Boolean(errors.duration))}
              />
            </ServicesEditField>
          </div>

          <div className={SERVICES_EDIT_FIELDS_PAIR_CLASS}>
            <ServicesEditField
              id="services-edit-price"
              label={copy.priceLabel}
              error={errors.price}
            >
              <input
                id="services-edit-price"
                name="price"
                type="text"
                inputMode="decimal"
                value={formValues.price}
                onChange={onFieldChange('price')}
                placeholder={copy.placeholders.price}
                aria-invalid={Boolean(errors.price)}
                aria-describedby={errors.price ? 'services-edit-price-error' : undefined}
                className={getInputClassName(Boolean(errors.price))}
              />
            </ServicesEditField>

            <ServicesEditField id="services-edit-rating" label={copy.ratingLabel}>
              <input
                id="services-edit-rating"
                name="rating"
                type="text"
                value={formValues.rating}
                onChange={onFieldChange('rating')}
                placeholder={copy.placeholders.rating}
                className={SERVICES_EDIT_INPUT_CLASS}
              />
            </ServicesEditField>
          </div>

          <ServicesEditField
            id="services-edit-title"
            label={copy.titleLabel}
            error={errors.title}
          >
            <input
              id="services-edit-title"
              name="title"
              type="text"
              value={formValues.title}
              onChange={onFieldChange('title')}
              placeholder={copy.placeholders.title}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'services-edit-title-error' : undefined}
              className={getInputClassName(Boolean(errors.title))}
            />
          </ServicesEditField>

          <ServicesEditField
            id="services-edit-description"
            label={copy.descriptionLabel}
            error={errors.description}
          >
            <textarea
              id="services-edit-description"
              name="description"
              value={formValues.description}
              onChange={onFieldChange('description')}
              placeholder={copy.placeholders.description}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? 'services-edit-description-error' : undefined
              }
              className={getInputClassName(
                Boolean(errors.description),
                SERVICES_EDIT_TEXTAREA_CLASS,
              )}
            />
          </ServicesEditField>

          <div className={SERVICES_EDIT_FIELD_CLASS}>
            <span className={SERVICES_EDIT_LABEL_CLASS}>{copy.imageLabel}</span>
            {formValues.image ? (
              <img
                src={formValues.image}
                alt={formValues.imageAlt || formValues.title}
                className={SERVICES_EDIT_IMAGE_PREVIEW_CLASS}
              />
            ) : null}
            <p className={SERVICES_EDIT_IMAGE_HINT_CLASS}>{copy.imageHint}</p>
            <label htmlFor={SERVICES_EDIT_IMAGE_INPUT_ID} className={SERVICES_EDIT_FILE_BUTTON_CLASS}>
              {copy.imageChangeLabel}
              <input
                id={SERVICES_EDIT_IMAGE_INPUT_ID}
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={onImageChange}
                className="sr-only"
              />
            </label>
          </div>
          </div>

          <div className={SERVICES_EDIT_ACTIONS_CLASS}>
            <button type="button" className={SERVICES_EDIT_CANCEL_CLASS} onClick={onClose}>
              {copy.cancel}
            </button>
            <button type="submit" className={SERVICES_EDIT_SUBMIT_CLASS}>
              {copy.submit}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default ServicesEditModal;
