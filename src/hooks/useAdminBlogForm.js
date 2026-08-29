import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../config';
import { ADMIN_BLOG_FORM_COPY } from '../components/admin/blogForm/blogFormCopy';
import {
  ADMIN_BLOG_FORM_EMPTY_VALUES,
  ADMIN_BLOG_FORM_FIELDS,
  ADMIN_BLOG_FORM_MODE,
} from '../components/admin/blogForm/blogFormData';
import {
  assertBlogBannerFileLimit,
  createBlogBannerImageFromFile,
  createBlogFormValues,
  getAdminBlogFormPostById,
  getAdminBlogFormSeo,
  getAdminBlogFormTitle,
  isBlogFormReady,
  resolveAdminBlogFormMode,
  revokeBlogBannerPreview,
  validateBlogForm,
} from '../components/admin/blogForm/blogFormUtils';
import { filterAcceptedImageFiles, toFileArray } from '../components/admin/serviceForm/adminServiceFormUtils';

const useAdminBlogForm = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const mode = resolveAdminBlogFormMode(blogId);
  const isEditMode = mode === ADMIN_BLOG_FORM_MODE.EDIT;

  const post = useMemo(
    () => (isEditMode ? getAdminBlogFormPostById(blogId) : null),
    [blogId, isEditMode],
  );

  const isNotFound = isEditMode && !post;

  const [values, setValues] = useState(() =>
    isEditMode && post ? createBlogFormValues(post) : createBlogFormValues(),
  );
  const [errors, setErrors] = useState({});
  const valuesRef = useRef(values);
  valuesRef.current = values;

  useEffect(() => {
    if (!isEditMode || !post) {
      return undefined;
    }

    setValues(createBlogFormValues(post));
    setErrors({});
    return undefined;
  }, [blogId, isEditMode, post]);

  useEffect(
    () => () => {
      revokeBlogBannerPreview(valuesRef.current[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]);
    },
    [],
  );

  const isSubmitDisabled = useMemo(() => !isBlogFormReady(values), [values]);

  const handleFieldChange = useCallback(
    (fieldName) => (event) => {
      const nextValue = event.target.value;

      setValues((current) => ({
        ...current,
        [fieldName]: nextValue,
      }));

      setErrors((current) => {
        if (!current[fieldName]) {
          return current;
        }

        const nextErrors = { ...current };
        delete nextErrors[fieldName];
        return nextErrors;
      });
    },
    [],
  );

  const handleBannerFilesSelected = useCallback(async (fileList) => {
    const files = filterAcceptedImageFiles(toFileArray(fileList));
    const limitError = assertBlogBannerFileLimit(files.length);

    if (limitError) {
      setErrors((current) => ({
        ...current,
        [ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]: limitError,
      }));
      return;
    }

    if (files.length === 0) {
      return;
    }

    const bannerImage = await createBlogBannerImageFromFile(files[0]);

    setValues((current) => {
      revokeBlogBannerPreview(current[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]);
      return {
        ...current,
        [ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]: bannerImage,
      };
    });

    setErrors((current) => {
      if (!current[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE];
      return nextErrors;
    });
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const nextErrors = validateBlogForm(values);
      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        return;
      }

      toast.success(
        isEditMode
          ? ADMIN_BLOG_FORM_COPY.toasts.updated
          : ADMIN_BLOG_FORM_COPY.toasts.created,
      );
      revokeBlogBannerPreview(values[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]);
      setValues({ ...ADMIN_BLOG_FORM_EMPTY_VALUES });
      navigate(ROUTES.ADMIN_BLOG, { replace: true });
    },
    [isEditMode, navigate, values],
  );

  return {
    copy: ADMIN_BLOG_FORM_COPY,
    seo: getAdminBlogFormSeo(mode),
    pageTitle: getAdminBlogFormTitle(mode),
    mode,
    values,
    errors,
    isNotFound,
    isSubmitDisabled,
    onFieldChange: handleFieldChange,
    onBannerFilesSelected: handleBannerFilesSelected,
    onSubmit: handleSubmit,
  };
};

export default useAdminBlogForm;
