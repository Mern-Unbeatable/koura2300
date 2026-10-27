import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../../../config';
import {
  ADMIN_SERVICE_FORM_BACK_ICON_SIZE,
  ADMIN_SERVICE_FORM_BACK_LINK_CLASS,
  ADMIN_SERVICE_FORM_BANNER_PREVIEW_CLASS,
  ADMIN_SERVICE_FORM_BODY_CLASS,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_NOT_FOUND_CLASS,
  ADMIN_SERVICE_FORM_PAGE_CLASS,
  ADMIN_SERVICE_FORM_SUBMIT_CLASS,
  ADMIN_SERVICE_FORM_SUBTITLE_CLASS,
  ADMIN_SERVICE_FORM_TITLE_CLASS,
} from './adminServiceFormData';
import AdminServiceFormFields from './AdminServiceFormFields';
import AdminServiceFormUploadZone, {
  PREVIEW_LAYOUT,
} from './AdminServiceFormUploadZone';

const AdminServiceFormNotFound = ({ copy, listRoute }) => (
  <div className={ADMIN_SERVICE_FORM_NOT_FOUND_CLASS}>
    <h1 className="text-2xl font-bold text-[#0f172b]">{copy.notFound.title}</h1>
    <p className="mt-2 text-sm text-[#62748e]">{copy.notFound.description}</p>
    <Link
      to={listRoute}
      className="mt-6 inline-flex rounded-xl bg-[#0f172b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e293b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
    >
      {copy.notFound.backLabel}
    </Link>
  </div>
);

const AdminServiceFormView = ({
  copy,
  pageTitle,
  listRoute = ROUTES.ADMIN_SERVICES,
  values,
  errors,
  categoryOptions,
  isNotFound,
  onFieldChange,
  onAdditionalFeatureChange,
  onSizeChange,
  onOptionChange,
  onTextLineChange,
  onAddAdditionalFeature,
  onAddSize,
  onAddOption,
  onAddTextLine,
  onRemoveTextLine,
  onBannerFilesSelected,
  onOtherFilesSelected,
  onRemoveBannerImage,
  onRemoveOtherImage,
  onSubmit,
}) => {
  if (isNotFound) {
    return <AdminServiceFormNotFound copy={copy} listRoute={listRoute} />;
  }

  const bannerPreview = values[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE];
  const otherPreviews = values[ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES] ?? [];

  return (
    <div className={ADMIN_SERVICE_FORM_PAGE_CLASS}>
      <Link to={listRoute} className={ADMIN_SERVICE_FORM_BACK_LINK_CLASS}>
        <ArrowLeft size={ADMIN_SERVICE_FORM_BACK_ICON_SIZE} aria-hidden="true" />
        {copy.actions.back}
      </Link>

      <header className="flex min-w-0 flex-col gap-1">
        <h1 className={ADMIN_SERVICE_FORM_TITLE_CLASS}>{pageTitle}</h1>
        <p className={ADMIN_SERVICE_FORM_SUBTITLE_CLASS}>{copy.subtitle}</p>
      </header>

      <form className={ADMIN_SERVICE_FORM_BODY_CLASS} onSubmit={onSubmit} noValidate>
        <AdminServiceFormFields
          copy={copy}
          values={values}
          errors={errors}
          categoryOptions={categoryOptions}
          onFieldChange={onFieldChange}
          onAdditionalFeatureChange={onAdditionalFeatureChange}
          onSizeChange={onSizeChange}
          onOptionChange={onOptionChange}
          onTextLineChange={onTextLineChange}
          onAddAdditionalFeature={onAddAdditionalFeature}
          onAddSize={onAddSize}
          onAddOption={onAddOption}
          onAddTextLine={onAddTextLine}
          onRemoveTextLine={onRemoveTextLine}
        />

        <AdminServiceFormUploadZone
          label={copy.fields.bannerImage}
          inputLabel={copy.upload.bannerInputLabel}
          dropTitle={copy.upload.dropTitle}
          dropHint={copy.upload.dropHint}
          metaLabels={[copy.upload.formats, copy.upload.maxBanner, copy.upload.resolution]}
          error={errors[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]}
          previews={bannerPreview ? [bannerPreview] : []}
          previewImageClassName={ADMIN_SERVICE_FORM_BANNER_PREVIEW_CLASS}
          removeLabel={copy.upload.removeImage || 'Remove image'}
          onFilesSelected={onBannerFilesSelected}
          onRemovePreview={onRemoveBannerImage ? () => onRemoveBannerImage() : undefined}
        />

        <AdminServiceFormUploadZone
          label={copy.fields.otherImages}
          inputLabel={copy.upload.otherInputLabel}
          dropTitle={copy.upload.dropTitle}
          dropHint={copy.upload.dropHint}
          metaLabels={[copy.upload.formats, copy.upload.resolution]}
          multiple
          previewLayout={PREVIEW_LAYOUT.GRID}
          previews={otherPreviews}
          removeLabel={copy.upload.removeImage || 'Remove image'}
          onFilesSelected={onOtherFilesSelected}
          onRemovePreview={onRemoveOtherImage}
        />

        <button type="submit" className={ADMIN_SERVICE_FORM_SUBMIT_CLASS}>
          {copy.actions.upload}
        </button>
      </form>
    </div>
  );
};

export default AdminServiceFormView;
