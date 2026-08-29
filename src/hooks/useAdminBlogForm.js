import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../config';
import { ADMIN_BLOG_FORM_COPY } from '../components/admin/blogForm/blogFormCopy';
import {
  ADMIN_BLOG_FORM_EMPTY_VALUES,
  ADMIN_BLOG_FORM_FIELDS,
} from '../components/admin/blogForm/blogFormData';
import {
  assertBlogBannerFileLimit,
  createBlogBannerImageFromFile,
  createBlogFormValues,
  isBlogFormReady,
  revokeBlogBannerPreview,
  validateBlogForm,
} from '../components/admin/blogForm/blogFormUtils';
import { filterAcceptedImageFiles, toFileArray } from '../components/admin/serviceForm/adminServiceFormUtils';

const useAdminBlogForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(createBlogFormValues);
  const [errors, setErrors] = useState({});
  const valuesRef = useRef(values);
  valuesRef.current = values;

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

  const handleBannerFilesSelected = useCallback((fileList) => {
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

    setValues((current) => {
      revokeBlogBannerPreview(current[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]);
      return {
        ...current,
        [ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]: createBlogBannerImageFromFile(files[0]),
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

      toast.success(ADMIN_BLOG_FORM_COPY.toasts.created);
      revokeBlogBannerPreview(values[ADMIN_BLOG_FORM_FIELDS.BANNER_IMAGE]);
      setValues({ ...ADMIN_BLOG_FORM_EMPTY_VALUES });
      navigate(ROUTES.ADMIN_BLOG, { replace: true });
    },
    [navigate, values],
  );

  return {
    copy: ADMIN_BLOG_FORM_COPY,
    seo: ADMIN_BLOG_FORM_COPY.seo,
    values,
    errors,
    isSubmitDisabled,
    onFieldChange: handleFieldChange,
    onBannerFilesSelected: handleBannerFilesSelected,
    onSubmit: handleSubmit,
  };
};

export default useAdminBlogForm;
