import { memo, useId, useRef } from 'react';
import { Check, CloudUpload } from 'lucide-react';
import {
  ADMIN_SERVICE_FORM_ACCEPT,
  ADMIN_SERVICE_FORM_META_ICON_SIZE,
  ADMIN_SERVICE_FORM_PREVIEW_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_HINT_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_ICON_SIZE,
  ADMIN_SERVICE_FORM_UPLOAD_ICON_WRAP_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_META_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_META_ITEM_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_SECTION_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_TITLE_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_ZONE_CLASS,
  ADMIN_SERVICE_FORM_ERROR_TEXT_CLASS,
  ADMIN_SERVICE_FORM_LABEL_CLASS,
} from './adminServiceFormData';

const UploadMetaItem = memo(({ label }) => (
  <span className={ADMIN_SERVICE_FORM_UPLOAD_META_ITEM_CLASS}>
    <Check size={ADMIN_SERVICE_FORM_META_ICON_SIZE} aria-hidden="true" />
    {label}
  </span>
));

UploadMetaItem.displayName = 'UploadMetaItem';

const AdminServiceFormUploadZone = memo(
  ({
    label,
    inputLabel,
    dropTitle,
    dropHint,
    metaLabels,
    multiple = false,
    error,
    previewUrls = [],
    onFilesSelected,
  }) => {
    const inputId = useId();
    const inputRef = useRef(null);

    const handleChange = (event) => {
      onFilesSelected(event.target.files);
      event.target.value = '';
    };

    return (
      <div className={ADMIN_SERVICE_FORM_UPLOAD_SECTION_CLASS}>
        <p className={ADMIN_SERVICE_FORM_LABEL_CLASS}>{label}</p>
        <label htmlFor={inputId} className={ADMIN_SERVICE_FORM_UPLOAD_ZONE_CLASS}>
          <span className={ADMIN_SERVICE_FORM_UPLOAD_ICON_WRAP_CLASS}>
            <CloudUpload size={ADMIN_SERVICE_FORM_UPLOAD_ICON_SIZE} className="text-[#0f172a]" />
          </span>
          <span className={ADMIN_SERVICE_FORM_UPLOAD_TITLE_CLASS}>{dropTitle}</span>
          <span className={ADMIN_SERVICE_FORM_UPLOAD_HINT_CLASS}>{dropHint}</span>
          <span className={ADMIN_SERVICE_FORM_UPLOAD_META_CLASS}>
            {metaLabels.map((metaLabel) => (
              <UploadMetaItem key={metaLabel} label={metaLabel} />
            ))}
          </span>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={ADMIN_SERVICE_FORM_ACCEPT}
            multiple={multiple}
            className="sr-only"
            aria-label={inputLabel}
            onChange={handleChange}
          />
        </label>
        {error ? <p className={ADMIN_SERVICE_FORM_ERROR_TEXT_CLASS}>{error}</p> : null}
        {previewUrls.map((url) => (
          <img key={url} src={url} alt="" className={ADMIN_SERVICE_FORM_PREVIEW_CLASS} />
        ))}
      </div>
    );
  },
);

AdminServiceFormUploadZone.displayName = 'AdminServiceFormUploadZone';

export default AdminServiceFormUploadZone;
