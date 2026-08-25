import { memo } from 'react';
import {
  ADMIN_SERVICE_FORM_CONTROL_CLASS,
  ADMIN_SERVICE_FORM_CONTROL_ERROR_CLASS,
  ADMIN_SERVICE_FORM_ERROR_TEXT_CLASS,
  ADMIN_SERVICE_FORM_FIELD_CLASS,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_LABEL_CLASS,
  ADMIN_SERVICE_FORM_PAIR_CLASS,
  ADMIN_SERVICE_FORM_ROW_CLASS,
  ADMIN_SERVICE_FORM_SELECT_CLASS,
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

const SelectField = memo(({ id, label, value, placeholder, options, error, onChange }) => (
  <div className={ADMIN_SERVICE_FORM_FIELD_CLASS}>
    <label htmlFor={id} className={ADMIN_SERVICE_FORM_LABEL_CLASS}>
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`${ADMIN_SERVICE_FORM_SELECT_CLASS} ${
        error ? ADMIN_SERVICE_FORM_CONTROL_ERROR_CLASS : ''
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
    <FieldError error={error} />
  </div>
));

SelectField.displayName = 'SelectField';

const AdminServiceFormFields = memo(
  ({ copy, values, errors, categoryOptions, onFieldChange }) => {
    const subcategoryOptions = getAdminServiceFormSubcategoryOptions(
      values[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID],
    );

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
          placeholder={copy.placeholders.description}
          value={values[ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION]}
          error={errors[ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION]}
          onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION)}
        />

        <TextAreaField
          id="service-form-long-description"
          label={copy.fields.longDescription}
          placeholder={copy.placeholders.description}
          value={values[ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION]}
          error={errors[ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION]}
          onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION)}
          long
        />

        <TextAreaField
          id="service-form-included"
          label={copy.fields.included}
          placeholder={copy.placeholders.description}
          value={values[ADMIN_SERVICE_FORM_FIELDS.INCLUDED]}
          error={errors[ADMIN_SERVICE_FORM_FIELDS.INCLUDED]}
          onChange={onFieldChange(ADMIN_SERVICE_FORM_FIELDS.INCLUDED)}
          long
        />

        <TextAreaField
          id="service-form-not-included"
          label={copy.fields.notIncluded}
          placeholder={copy.placeholders.description}
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
