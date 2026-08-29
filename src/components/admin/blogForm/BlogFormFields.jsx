import {
  ADMIN_BLOG_FORM_CONTROL_CLASS,
  ADMIN_BLOG_FORM_CONTROL_ERROR_CLASS,
  ADMIN_BLOG_FORM_ERROR_TEXT_CLASS,
  ADMIN_BLOG_FORM_FIELD_CLASS,
  ADMIN_BLOG_FORM_FIELDS,
  ADMIN_BLOG_FORM_LABEL_CLASS,
  ADMIN_BLOG_FORM_TEXTAREA_LONG_CLASS,
  ADMIN_BLOG_FORM_TEXTAREA_SHORT_CLASS,
} from './blogFormData';

const FieldError = ({ error }) =>
  error ? <p className={ADMIN_BLOG_FORM_ERROR_TEXT_CLASS}>{error}</p> : null;

const BlogFormTextField = ({ id, label, value, error, onChange, placeholder }) => (
  <div className={ADMIN_BLOG_FORM_FIELD_CLASS}>
    <label htmlFor={id} className={ADMIN_BLOG_FORM_LABEL_CLASS}>
      {label}
    </label>
    <input
      id={id}
      name={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${ADMIN_BLOG_FORM_CONTROL_CLASS} ${
        error ? ADMIN_BLOG_FORM_CONTROL_ERROR_CLASS : ''
      }`}
    />
    <FieldError error={error} />
  </div>
);

const BlogFormTextarea = ({ id, label, value, error, onChange, placeholder, long }) => (
  <div className={ADMIN_BLOG_FORM_FIELD_CLASS}>
    <label htmlFor={id} className={ADMIN_BLOG_FORM_LABEL_CLASS}>
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${long ? ADMIN_BLOG_FORM_TEXTAREA_LONG_CLASS : ADMIN_BLOG_FORM_TEXTAREA_SHORT_CLASS} ${
        error ? ADMIN_BLOG_FORM_CONTROL_ERROR_CLASS : ''
      }`}
    />
    <FieldError error={error} />
  </div>
);

const BlogFormFields = ({ copy, values, errors, onFieldChange }) => (
  <>
    <BlogFormTextField
      id="blog-form-title"
      label={copy.fields.title}
      value={values[ADMIN_BLOG_FORM_FIELDS.TITLE]}
      error={errors[ADMIN_BLOG_FORM_FIELDS.TITLE]}
      onChange={onFieldChange(ADMIN_BLOG_FORM_FIELDS.TITLE)}
      placeholder={copy.placeholders.title}
    />

    <BlogFormTextarea
      id="blog-form-short-description"
      label={copy.fields.shortDescription}
      value={values[ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION]}
      error={errors[ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION]}
      onChange={onFieldChange(ADMIN_BLOG_FORM_FIELDS.SHORT_DESCRIPTION)}
      placeholder={copy.placeholders.shortDescription}
    />

    <BlogFormTextarea
      id="blog-form-long-description"
      label={copy.fields.longDescription}
      value={values[ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION]}
      error={errors[ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION]}
      onChange={onFieldChange(ADMIN_BLOG_FORM_FIELDS.LONG_DESCRIPTION)}
      placeholder={copy.placeholders.longDescription}
      long
    />
  </>
);

export default BlogFormFields;
