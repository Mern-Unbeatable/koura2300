import { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import useServicesFilterMenu from '../services/useServicesFilterMenu';
import {
  ADMIN_SERVICE_FORM_ADD_ROW_BUTTON_CLASS,
  ADMIN_SERVICE_FORM_CONTROL_CLASS,
  ADMIN_SERVICE_FORM_CONTROL_ERROR_CLASS,
  ADMIN_SERVICE_FORM_DYNAMIC_ROWS_CLASS,
  ADMIN_SERVICE_FORM_DYNAMIC_SECTION_CLASS,
  ADMIN_SERVICE_FORM_DYNAMIC_SECTION_TITLE_CLASS,
  ADMIN_SERVICE_FORM_ERROR_TEXT_CLASS,
  ADMIN_SERVICE_FORM_FEATURE_KEYS,
  ADMIN_SERVICE_FORM_FEATURE_ROW_CLASS,
  ADMIN_SERVICE_FORM_FIELD_CLASS,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_LABEL_CLASS,
  ADMIN_SERVICE_FORM_MEASUREMENT_UNITS,
  ADMIN_SERVICE_FORM_OPTION_KEYS,
  ADMIN_SERVICE_FORM_PAIR_CLASS,
  ADMIN_SERVICE_FORM_ROW_CLASS,
  ADMIN_SERVICE_FORM_SELECT_CHEVRON_SIZE,
  ADMIN_SERVICE_FORM_SELECT_ICON_CLASS,
  ADMIN_SERVICE_FORM_SELECT_MENU_CLASS,
  ADMIN_SERVICE_FORM_SELECT_OPTION_ACTIVE_CLASS,
  ADMIN_SERVICE_FORM_SELECT_OPTION_CLASS,
  ADMIN_SERVICE_FORM_SELECT_PLACEHOLDER_CLASS,
  ADMIN_SERVICE_FORM_SELECT_TRIGGER_CLASS,
  ADMIN_SERVICE_FORM_SELECT_TRIGGER_LABEL_CLASS,
  ADMIN_SERVICE_FORM_SELECT_VALUE_CLASS,
  ADMIN_SERVICE_FORM_SELECT_WRAP_CLASS,
  ADMIN_SERVICE_FORM_SIZE_KEYS,
  ADMIN_SERVICE_FORM_SIZE_OPTION_ROW_CLASS,
  ADMIN_SERVICE_FORM_TEXTAREA_LONG_CLASS,
  ADMIN_SERVICE_FORM_TEXTAREA_SHORT_CLASS,
  getAdminServiceFormSubcategoryOptions,
} from './adminServiceFormData';

const FieldError = memo(({ error }) =>
  error ? <p className={ADMIN_SERVICE_FORM_ERROR_TEXT_CLASS}>{error}</p> : null,
);

FieldError.displayName = 'FieldError';

const TextField = memo(
  ({ id, label, value, placeholder, error, onChange, type = 'text' }) => (
    <div className={ADMIN_SERVICE_FORM_FIELD_CLASS}>
      <label htmlFor={id} className={ADMIN_SERVICE_FORM_LABEL_CLASS}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${ADMIN_SERVICE_FORM_CONTROL_CLASS} ${
          error ? ADMIN_SERVICE_FORM_CONTROL_ERROR_CLASS : ''
        }`}
      />
      <FieldError error={error} />
    </div>
  ),
);

TextField.displayName = 'TextField';

const TextAreaField = memo(({ id, label, value, placeholder, error, onChange, long = false }) => (
  <div className={ADMIN_SERVICE_FORM_FIELD_CLASS}>
    <label htmlFor={id} className={ADMIN_SERVICE_FORM_LABEL_CLASS}>
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`${long ? ADMIN_SERVICE_FORM_TEXTAREA_LONG_CLASS : ADMIN_SERVICE_FORM_TEXTAREA_SHORT_CLASS} ${
        error ? ADMIN_SERVICE_FORM_CONTROL_ERROR_CLASS : ''
      }`}
    />
    <FieldError error={error} />
  </div>
));

TextAreaField.displayName = 'TextAreaField';

const SelectField = memo(({ id, label, value, placeholder, options, error, onChange }) => {
  const { containerRef, isOpen, onToggle, onClose } = useServicesFilterMenu();
  const selectedOption = options.find((option) => option.id === value);
  const displayLabel = selectedOption?.label || placeholder;
  const labelClassName = selectedOption
    ? ADMIN_SERVICE_FORM_SELECT_VALUE_CLASS
    : ADMIN_SERVICE_FORM_SELECT_PLACEHOLDER_CLASS;

  const handleSelect = (nextValue) => {
    onChange({ target: { value: nextValue } });
    onClose();
  };

  return (
    <div className={ADMIN_SERVICE_FORM_FIELD_CLASS}>
      <span className={ADMIN_SERVICE_FORM_LABEL_CLASS} id={`${id}-label`}>
        {label}
      </span>
      <div ref={containerRef} className={ADMIN_SERVICE_FORM_SELECT_WRAP_CLASS}>
        <button
          id={id}
          type="button"
          aria-labelledby={`${id}-label`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`${ADMIN_SERVICE_FORM_SELECT_TRIGGER_CLASS} ${
            error ? ADMIN_SERVICE_FORM_CONTROL_ERROR_CLASS : ''
          }`}
          onClick={onToggle}
        >
          <span className={`${ADMIN_SERVICE_FORM_SELECT_TRIGGER_LABEL_CLASS} ${labelClassName}`}>
            {displayLabel}
          </span>
          <ChevronDown
            size={ADMIN_SERVICE_FORM_SELECT_CHEVRON_SIZE}
            className={ADMIN_SERVICE_FORM_SELECT_ICON_CLASS}
            aria-hidden="true"
          />
        </button>

        {isOpen ? (
          <ul
            role="listbox"
            aria-labelledby={`${id}-label`}
            className={ADMIN_SERVICE_FORM_SELECT_MENU_CLASS}
          >
            {options.map((option) => {
              const isActive = option.id === value;
              const optionClassName = isActive
                ? `${ADMIN_SERVICE_FORM_SELECT_OPTION_CLASS} ${ADMIN_SERVICE_FORM_SELECT_OPTION_ACTIVE_CLASS}`
                : ADMIN_SERVICE_FORM_SELECT_OPTION_CLASS;

              return (
                <li key={`${option.categoryId ?? 'root'}-${option.id}`} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    title={option.label}
                    className={optionClassName}
                    onClick={() => handleSelect(option.id)}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      <FieldError error={error} />
    </div>
  );
});

SelectField.displayName = 'SelectField';

const AdditionalFeatureRows = memo(
  ({ copy, rows, onAdditionalFeatureChange, onAddAdditionalFeature }) => (
    <section className={ADMIN_SERVICE_FORM_DYNAMIC_SECTION_CLASS} aria-label={copy.sections.additionalFeature}>
      <h2 className={ADMIN_SERVICE_FORM_DYNAMIC_SECTION_TITLE_CLASS}>
        {copy.sections.additionalFeature}
      </h2>
      <div className={ADMIN_SERVICE_FORM_DYNAMIC_ROWS_CLASS}>
        {rows.map((row) => (
          <div key={row.id} className={ADMIN_SERVICE_FORM_FEATURE_ROW_CLASS}>
            <TextField
              id={`service-form-feature-name-${row.id}`}
              label={copy.fields.featureName}
              placeholder={copy.placeholders.featureName}
              value={row[ADMIN_SERVICE_FORM_FEATURE_KEYS.NAME]}
              onChange={onAdditionalFeatureChange(
                row.id,
                ADMIN_SERVICE_FORM_FEATURE_KEYS.NAME,
              )}
            />
            <SelectField
              id={`service-form-feature-measurement-${row.id}`}
              label={copy.fields.featureMeasurementUnit}
              placeholder={copy.placeholders.featureMeasurementUnit}
              options={ADMIN_SERVICE_FORM_MEASUREMENT_UNITS}
              value={row[ADMIN_SERVICE_FORM_FEATURE_KEYS.MEASUREMENT_UNIT]}
              onChange={onAdditionalFeatureChange(
                row.id,
                ADMIN_SERVICE_FORM_FEATURE_KEYS.MEASUREMENT_UNIT,
              )}
            />
            <TextField
              id={`service-form-feature-quantity-${row.id}`}
              label={copy.fields.featureQuantity}
              placeholder={copy.placeholders.featureQuantity}
              value={row[ADMIN_SERVICE_FORM_FEATURE_KEYS.QUANTITY]}
              onChange={onAdditionalFeatureChange(
                row.id,
                ADMIN_SERVICE_FORM_FEATURE_KEYS.QUANTITY,
              )}
            />
            <TextField
              id={`service-form-feature-standard-price-${row.id}`}
              label={copy.fields.standardPrice}
              placeholder={copy.placeholders.featureStandardPrice}
              value={row[ADMIN_SERVICE_FORM_FEATURE_KEYS.STANDARD_PRICE]}
              onChange={onAdditionalFeatureChange(
                row.id,
                ADMIN_SERVICE_FORM_FEATURE_KEYS.STANDARD_PRICE,
              )}
            />
            <TextField
              id={`service-form-feature-premium-price-${row.id}`}
              label={copy.fields.premiumPrice}
              placeholder={copy.placeholders.featurePremiumPrice}
              value={row[ADMIN_SERVICE_FORM_FEATURE_KEYS.PREMIUM_PRICE]}
              onChange={onAdditionalFeatureChange(
                row.id,
                ADMIN_SERVICE_FORM_FEATURE_KEYS.PREMIUM_PRICE,
              )}
            />
            <TextField
              id={`service-form-feature-note-1-${row.id}`}
              label={copy.fields.featureNote1}
              placeholder={copy.placeholders.featureNote}
              value={row[ADMIN_SERVICE_FORM_FEATURE_KEYS.NOTE_1]}
              onChange={onAdditionalFeatureChange(
                row.id,
                ADMIN_SERVICE_FORM_FEATURE_KEYS.NOTE_1,
              )}
            />
            <TextField
              id={`service-form-feature-note-2-${row.id}`}
              label={copy.fields.featureNote2}
              placeholder={copy.placeholders.featureNote}
              value={row[ADMIN_SERVICE_FORM_FEATURE_KEYS.NOTE_2]}
              onChange={onAdditionalFeatureChange(
                row.id,
                ADMIN_SERVICE_FORM_FEATURE_KEYS.NOTE_2,
              )}
            />
          </div>
        ))}
        <button
          type="button"
          className={ADMIN_SERVICE_FORM_ADD_ROW_BUTTON_CLASS}
          onClick={onAddAdditionalFeature}
        >
          {copy.actions.addAdditionalFeature}
        </button>
      </div>
    </section>
  ),
);

AdditionalFeatureRows.displayName = 'AdditionalFeatureRows';

const SizeRows = memo(({ copy, rows, onSizeChange, onAddSize }) => (
  <section className={ADMIN_SERVICE_FORM_DYNAMIC_SECTION_CLASS} aria-label={copy.sections.sizes}>
    <h2 className={ADMIN_SERVICE_FORM_DYNAMIC_SECTION_TITLE_CLASS}>{copy.sections.sizes}</h2>
    <div className={ADMIN_SERVICE_FORM_DYNAMIC_ROWS_CLASS}>
      {rows.map((row) => (
        <div key={row.id} className={ADMIN_SERVICE_FORM_SIZE_OPTION_ROW_CLASS}>
          <TextField
            id={`service-form-size-${row.id}`}
            label={copy.fields.size}
            placeholder={copy.placeholders.size}
            value={row[ADMIN_SERVICE_FORM_SIZE_KEYS.SIZE]}
            onChange={onSizeChange(row.id, ADMIN_SERVICE_FORM_SIZE_KEYS.SIZE)}
          />
          <SelectField
            id={`service-form-size-measurement-${row.id}`}
            label={copy.fields.sizeMeasurementUnit}
            placeholder={copy.placeholders.sizeMeasurementUnit}
            options={ADMIN_SERVICE_FORM_MEASUREMENT_UNITS}
            value={row[ADMIN_SERVICE_FORM_SIZE_KEYS.MEASUREMENT_UNIT]}
            onChange={onSizeChange(row.id, ADMIN_SERVICE_FORM_SIZE_KEYS.MEASUREMENT_UNIT)}
          />
          <TextField
            id={`service-form-size-standard-price-${row.id}`}
            label={copy.fields.standardPrice}
            placeholder={copy.placeholders.price}
            value={row[ADMIN_SERVICE_FORM_SIZE_KEYS.STANDARD_PRICE]}
            onChange={onSizeChange(row.id, ADMIN_SERVICE_FORM_SIZE_KEYS.STANDARD_PRICE)}
          />
          <TextField
            id={`service-form-size-premium-price-${row.id}`}
            label={copy.fields.premiumPrice}
            placeholder={copy.placeholders.price}
            value={row[ADMIN_SERVICE_FORM_SIZE_KEYS.PREMIUM_PRICE]}
            onChange={onSizeChange(row.id, ADMIN_SERVICE_FORM_SIZE_KEYS.PREMIUM_PRICE)}
          />
        </div>
      ))}
      <button type="button" className={ADMIN_SERVICE_FORM_ADD_ROW_BUTTON_CLASS} onClick={onAddSize}>
        {copy.actions.addAnotherSize}
      </button>
    </div>
  </section>
));

SizeRows.displayName = 'SizeRows';

const OptionRows = memo(({ copy, rows, onOptionChange, onAddOption }) => (
  <section className={ADMIN_SERVICE_FORM_DYNAMIC_SECTION_CLASS} aria-label={copy.sections.options}>
    <h2 className={ADMIN_SERVICE_FORM_DYNAMIC_SECTION_TITLE_CLASS}>{copy.sections.options}</h2>
    <div className={ADMIN_SERVICE_FORM_DYNAMIC_ROWS_CLASS}>
      {rows.map((row) => (
        <div key={row.id} className={ADMIN_SERVICE_FORM_SIZE_OPTION_ROW_CLASS}>
          <TextField
            id={`service-form-option-name-${row.id}`}
            label={copy.fields.optionName}
            placeholder={copy.placeholders.optionName}
            value={row[ADMIN_SERVICE_FORM_OPTION_KEYS.NAME]}
            onChange={onOptionChange(row.id, ADMIN_SERVICE_FORM_OPTION_KEYS.NAME)}
          />
          <TextField
            id={`service-form-option-standard-price-${row.id}`}
            label={copy.fields.standardPrice}
            placeholder={copy.placeholders.price}
            value={row[ADMIN_SERVICE_FORM_OPTION_KEYS.STANDARD_PRICE]}
            onChange={onOptionChange(row.id, ADMIN_SERVICE_FORM_OPTION_KEYS.STANDARD_PRICE)}
          />
          <TextField
            id={`service-form-option-premium-price-${row.id}`}
            label={copy.fields.premiumPrice}
            placeholder={copy.placeholders.price}
            value={row[ADMIN_SERVICE_FORM_OPTION_KEYS.PREMIUM_PRICE]}
            onChange={onOptionChange(row.id, ADMIN_SERVICE_FORM_OPTION_KEYS.PREMIUM_PRICE)}
          />
        </div>
      ))}
      <button
        type="button"
        className={ADMIN_SERVICE_FORM_ADD_ROW_BUTTON_CLASS}
        onClick={onAddOption}
      >
        {copy.actions.addAnotherOption}
      </button>
    </div>
  </section>
));

OptionRows.displayName = 'OptionRows';

const CatalogDynamicSections = memo(
  ({
    copy,
    values,
    onAdditionalFeatureChange,
    onSizeChange,
    onOptionChange,
    onAddAdditionalFeature,
    onAddSize,
    onAddOption,
  }) => (
    <>
      <AdditionalFeatureRows
        copy={copy}
        rows={values[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES] ?? []}
        onAdditionalFeatureChange={onAdditionalFeatureChange}
        onAddAdditionalFeature={onAddAdditionalFeature}
      />
      <SizeRows
        copy={copy}
        rows={values[ADMIN_SERVICE_FORM_FIELDS.SIZES] ?? []}
        onSizeChange={onSizeChange}
        onAddSize={onAddSize}
      />
      <OptionRows
        copy={copy}
        rows={values[ADMIN_SERVICE_FORM_FIELDS.OPTIONS] ?? []}
        onOptionChange={onOptionChange}
        onAddOption={onAddOption}
      />
    </>
  ),
);

CatalogDynamicSections.displayName = 'CatalogDynamicSections';

const AdminServiceFormFields = memo(
  ({
    copy,
    values,
    errors,
    categoryOptions,
    onFieldChange,
    onAdditionalFeatureChange = () => () => {},
    onSizeChange = () => () => {},
    onOptionChange = () => () => {},
    onAddAdditionalFeature = () => {},
    onAddSize = () => {},
    onAddOption = () => {},
  }) => {
    const subcategoryOptions = getAdminServiceFormSubcategoryOptions(
      values[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID],
    );
    const showCatalogDynamicSections = Boolean(copy.sections?.additionalFeature);

    return (
      <>
        <div className={ADMIN_SERVICE_FORM_ROW_CLASS}>
          <SelectField
            id="service-form-category"
            label={copy.fields.category}
            placeholder={copy.placeholders.category}
            value={values[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]}
            options={categoryOptions}
            error={errors[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]}
            onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID)}
          />
          <SelectField
            id="service-form-subcategory"
            label={copy.fields.subcategory}
            placeholder={copy.placeholders.subcategory}
            value={values[ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID]}
            options={subcategoryOptions}
            error={errors[ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID]}
            onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID)}
          />
          <TextField
            id="service-form-duration"
            label={copy.fields.duration}
            placeholder={copy.placeholders.duration}
            value={values[ADMIN_SERVICE_FORM_FIELDS.DURATION]}
            error={errors[ADMIN_SERVICE_FORM_FIELDS.DURATION]}
            onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.DURATION)}
          />
        </div>

        <div className={ADMIN_SERVICE_FORM_PAIR_CLASS}>
          <TextField
            id="service-form-standard-price"
            label={copy.fields.standardPrice}
            placeholder={copy.placeholders.price}
            value={values[ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE]}
            error={errors[ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE]}
            onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE)}
          />
          <TextField
            id="service-form-standard-featured"
            label={copy.fields.featured}
            placeholder={copy.placeholders.featured}
            value={values[ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED]}
            error={errors[ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED]}
            onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED)}
          />
        </div>

        <div className={ADMIN_SERVICE_FORM_PAIR_CLASS}>
          <TextField
            id="service-form-premium-price"
            label={copy.fields.premiumPrice}
            placeholder={copy.placeholders.price}
            value={values[ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE]}
            error={errors[ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE]}
            onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE)}
          />
          <TextField
            id="service-form-premium-featured"
            label={copy.fields.featured}
            placeholder={copy.placeholders.featured}
            value={values[ADMIN_SERVICE_FORM_FIELDS.PREMIUM_FEATURED]}
            error={errors[ADMIN_SERVICE_FORM_FIELDS.PREMIUM_FEATURED]}
            onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.PREMIUM_FEATURED)}
          />
        </div>

        <TextField
          id="service-form-title"
          label={copy.fields.title}
          placeholder={copy.placeholders.title}
          value={values[ADMIN_SERVICE_FORM_FIELDS.TITLE]}
          error={errors[ADMIN_SERVICE_FORM_FIELDS.TITLE]}
          onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.TITLE)}
        />

        <TextAreaField
          id="service-form-short-description"
          label={copy.fields.shortDescription}
          placeholder={copy.placeholders.shortDescription}
          value={values[ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION]}
          error={errors[ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION]}
          onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION)}
        />

        {showCatalogDynamicSections ? (
          <CatalogDynamicSections
            copy={copy}
            values={values}
            onAdditionalFeatureChange={onAdditionalFeatureChange}
            onSizeChange={onSizeChange}
            onOptionChange={onOptionChange}
            onAddAdditionalFeature={onAddAdditionalFeature}
            onAddSize={onAddSize}
            onAddOption={onAddOption}
          />
        ) : (
          <TextAreaField
            id="service-form-long-description"
            label={copy.fields.longDescription}
            placeholder={copy.placeholders.longDescription}
            value={values[ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION]}
            error={errors[ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION]}
            onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION)}
            long
          />
        )}

        <TextAreaField
          id="service-form-included"
          label={copy.fields.included}
          placeholder={copy.placeholders.included}
          value={values[ADMIN_SERVICE_FORM_FIELDS.INCLUDED]}
          error={errors[ADMIN_SERVICE_FORM_FIELDS.INCLUDED]}
          onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.INCLUDED)}
          long
        />

        <TextAreaField
          id="service-form-not-included"
          label={copy.fields.notIncluded}
          placeholder={copy.placeholders.notIncluded}
          value={values[ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED]}
          error={errors[ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED]}
          onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED)}
          long
        />
      </>
    );
  },
);

AdminServiceFormFields.displayName = 'AdminServiceFormFields';

export default AdminServiceFormFields;
