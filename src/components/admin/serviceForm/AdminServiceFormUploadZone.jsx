import { memo, useId, useRef, useState } from 'react';
import { Check, CloudUpload } from 'lucide-react';
import {
  ADMIN_SERVICE_FORM_ACCEPT,
  ADMIN_SERVICE_FORM_ERROR_TEXT_CLASS,
  ADMIN_SERVICE_FORM_LABEL_CLASS,
  ADMIN_SERVICE_FORM_META_ICON_SIZE,
  ADMIN_SERVICE_FORM_OTHER_PREVIEW_GRID_CLASS,
  ADMIN_SERVICE_FORM_OTHER_PREVIEW_IMAGE_CLASS,
  ADMIN_SERVICE_FORM_PREVIEW_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_HINT_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_ICON_SIZE,
  ADMIN_SERVICE_FORM_UPLOAD_ICON_WRAP_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_META_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_META_ITEM_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_SECTION_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_TITLE_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_ZONE_ACTIVE_CLASS,
  ADMIN_SERVICE_FORM_UPLOAD_ZONE_CLASS,
} from './adminServiceFormData';
import { filterAcceptedImageFiles, toFileArray } from './adminServiceFormUtils';

const PREVIEW_LAYOUT = {
  STACK: 'stack',
  GRID: 'grid',
};

const UploadMetaItem = memo(({ label }) => (
  <span className={ADMIN_SERVICE_FORM_UPLOAD_META_ITEM_CLASS}>
    <Check size={ADMIN_SERVICE_FORM_META_ICON_SIZE} aria-hidden="true" />
    {label}
  </span>
));

UploadMetaItem.displayName = 'UploadMetaItem';

const UploadPreviewList = memo(({ previews, layout, previewImageClassName }) => {
  if (previews.length === 0) {
    return null;
  }

  if (layout === PREVIEW_LAYOUT.GRID) {
    return (
      <div className={ADMIN_SERVICE_FORM_OTHER_PREVIEW_GRID_CLASS}>
        {previews.map((preview) => (
          <img
            key={preview.id}
            src={preview.previewUrl}
            alt=""
            className={ADMIN_SERVICE_FORM_OTHER_PREVIEW_IMAGE_CLASS}
          />
        ))}
      </div>
    );
  }

  return previews.map((preview) => (
    <img
      key={preview.id}
      src={preview.previewUrl}
      alt=""
      className={previewImageClassName}
    />
  ));
});

UploadPreviewList.displayName = 'UploadPreviewList';

const AdminServiceFormUploadZone = memo(
  ({
    label,
    inputLabel,
    dropTitle,
    dropHint,
    metaLabels,
    multiple = false,
    previewLayout = PREVIEW_LAYOUT.STACK,
    previewImageClassName = ADMIN_SERVICE_FORM_PREVIEW_CLASS,
    error,
    previews = [],
    onFilesSelected,
  }) => {
    const inputId = useId();
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const emitSelectedFiles = (fileList) => {
      const acceptedFiles = filterAcceptedImageFiles(fileList);
      if (acceptedFiles.length === 0) {
        return;
      }

      onFilesSelected(acceptedFiles);
    };

    const handleChange = (event) => {
      const selectedFiles = toFileArray(event.target.files);
      event.target.value = '';
      emitSelectedFiles(selectedFiles);
    };

    const handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      emitSelectedFiles(event.dataTransfer.files);
    };

    return (
      <div className={ADMIN_SERVICE_FORM_UPLOAD_SECTION_CLASS}>
        <p className={ADMIN_SERVICE_FORM_LABEL_CLASS}>{label}</p>
        <label
          htmlFor={inputId}
          className={`${ADMIN_SERVICE_FORM_UPLOAD_ZONE_CLASS} ${
            isDragging ? ADMIN_SERVICE_FORM_UPLOAD_ZONE_ACTIVE_CLASS : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
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
        <UploadPreviewList
          previews={previews}
          layout={previewLayout}
          previewImageClassName={previewImageClassName}
        />
      </div>
    );
  },
);

AdminServiceFormUploadZone.displayName = 'AdminServiceFormUploadZone';

export { PREVIEW_LAYOUT };
export default AdminServiceFormUploadZone;
