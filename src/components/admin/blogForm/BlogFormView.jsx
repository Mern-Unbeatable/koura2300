import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../../../config';
import AdminServiceFormUploadZone from '../serviceForm/AdminServiceFormUploadZone';
import {
  ADMIN_BLOG_FORM_BACK_ICON_SIZE,
  ADMIN_BLOG_FORM_BACK_LINK_CLASS,
  ADMIN_BLOG_FORM_BANNER_PREVIEW_CLASS,
  ADMIN_BLOG_FORM_BODY_CLASS,
  ADMIN_BLOG_FORM_FIELDS,
  ADMIN_BLOG_FORM_NOT_FOUND_CLASS,
  ADMIN_BLOG_FORM_PAGE_CLASS,
  ADMIN_BLOG_FORM_SUBMIT_CLASS,
  ADMIN_BLOG_FORM_SUBTITLE_CLASS,
  ADMIN_BLOG_FORM_TITLE_CLASS,
} from './blogFormData';
import BlogFormFields from './BlogFormFields';

const BlogFormNotFound = ({ copy }) => (
  <div className={ADMIN_BLOG_FORM_NOT_FOUND_CLASS}>
    <h1 className="text-2xl font-bold text-[#0f172b]">{copy.notFound.title}</h1>
    <p className="mt-2 text-sm text-[#62748e]">{copy.notFound.description}</p>
    <Link
      to={ROUTES.ADMIN_BLOG}
      className="mt-6 inline-flex rounded-xl bg-[#0f172b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e293b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
    >
      {copy.notFound.backLabel}
    </Link>
  </div>
);

const BlogFormView = ({
  copy,
  pageTitle,
  values,
  errors,
  isNotFound,
  isSubmitDisabled,
  onFieldChange,
  onBannerFilesSelected,
  onSubmit,
}) => {
  if (isNotFound) {
    return <BlogFormNotFound copy={copy} />;
  }

  const bannerPreview = values[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE];

  return (
    <div className={ADMIN_BLOG_FORM_PAGE_CLASS}>
      <Link to={ROUTES.ADMIN_BLOG} className={ADMIN_BLOG_FORM_BACK_LINK_CLASS}>
        <ArrowLeft size={ADMIN_BLOG_FORM_BACK_ICON_SIZE} aria-hidden="true" />
        {copy.actions.back}
      </Link>

      <header className="flex min-w-0 flex-col gap-1">
        <h1 className={ADMIN_BLOG_FORM_TITLE_CLASS}>{pageTitle}</h1>
        <p className={ADMIN_BLOG_FORM_SUBTITLE_CLASS}>{copy.subtitle}</p>
      </header>

      <form className={ADMIN_BLOG_FORM_BODY_CLASS} onSubmit={onSubmit} noValidate>
        <BlogFormFields
          copy={copy}
          values={values}
          errors={errors}
          onFieldChange={onFieldChange}
        />

        <AdminServiceFormUploadZone
          label={copy.fields.bannerImage}
          inputLabel={copy.upload.bannerInputLabel}
          dropTitle={copy.upload.dropTitle}
          dropHint={copy.upload.dropHint}
          metaLabels={[copy.upload.formats, copy.upload.maxBanner, copy.upload.resolution]}
          error={errors[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]}
          previews={bannerPreview ? [bannerPreview] : []}
          previewImageClassName={ADMIN_BLOG_FORM_BANNER_PREVIEW_CLASS}
          onFilesSelected={onBannerFilesSelected}
        />

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={ADMIN_BLOG_FORM_SUBMIT_CLASS}
        >
          {copy.actions.upload}
        </button>
      </form>
    </div>
  );
};

export default BlogFormView;
