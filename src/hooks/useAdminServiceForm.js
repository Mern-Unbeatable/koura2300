import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../config';
import { ADMIN_SERVICE_FORM_COPY } from '../components/admin/serviceForm/adminServiceFormCopy';
import {
  ADMIN_SERVICE_FORM_CATEGORY_OPTIONS,
  ADMIN_SERVICE_FORM_EMPTY_VALUES,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_MODE,
} from '../components/admin/serviceForm/adminServiceFormData';
import {
  assertBannerFileLimit,
  createAdminServiceFormValues,
  createBannerImageFromFile,
  createOtherImagesFromFiles,
  getAdminServiceFormDetailsById,
  getAdminServiceFormSeo,
  getAdminServiceFormTitle,
  resolveAdminServiceFormMode,
  revokePreviewUrl,
  revokePreviewUrls,
  validateAdminServiceForm,
} from '../components/admin/serviceForm/adminServiceFormUtils';

const useAdminServiceForm = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const mode = resolveAdminServiceFormMode(serviceId);
  const isEditMode = mode === ADMIN_SERVICE_FORM_MODE.EDIT;

  const details = useMemo(
    () => (isEditMode ? getAdminServiceFormDetailsById(serviceId) : null),
    [isEditMode, serviceId],
  );

  const isNotFound = isEditMode && !details;

  const [values, setValues] = useState(() =>
    isEditMode && details
      ? createAdminServiceFormValues(details)
      : { ...ADMIN_SERVICE_FORM_EMPTY_VALUES },
  );
  const [errors, setErrors] = useState({});
  const valuesRef = useRef(values);
  valuesRef.current = values;

  useEffect(() => {
    if (!isEditMode || !details) {
      return undefined;
    }

    setValues(createAdminServiceFormValues(details));
    setErrors({});
    return undefined;
  }, [details, isEditMode, serviceId]);

  useEffect(
    () => () => {
      revokePreviewUrl(valuesRef.current[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]);
      revokePreviewUrls(valuesRef.current[ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES]);
    },
    [],
  );

  const handleFieldChange = useCallback(
    (fieldName) => (event) => {
      const nextValue = event.target.value;

      setValues((current) => {
        if (fieldName === ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID) {
          return {
            ...current,
            [ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]: nextValue,
            [ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID]: '',
          };
        }

        return {
          ...current,
          [fieldName]: nextValue,
        };
      });

      setErrors((current) => {
        if (!current[fieldName] && fieldName !== ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID) {
          return current;
        }

        const nextErrors = { ...current };
        delete nextErrors[fieldName];
        if (fieldName === ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID) {
          delete nextErrors[ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID];
        }
        return nextErrors;
      });
    },
    [],
  );

  const handleBannerFilesSelected = useCallback(async (files) => {
    const selectedFiles = Array.isArray(files) ? files : Array.from(files ?? []);
    const limitError = assertBannerFileLimit(selectedFiles);
    if (limitError) {
      setErrors((current) => ({
        ...current,
        [ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]: limitError,
      }));
      return;
    }

    const file = selectedFiles[0];
    if (!file) {
      return;
    }

    const bannerImage = await createBannerImageFromFile(file);

    setValues((current) => {
      revokePreviewUrl(current[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]);
      return {
        ...current,
        [ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]: bannerImage,
      };
    });
    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE];
      return nextErrors;
    });
  }, []);

  const handleOtherFilesSelected = useCallback(async (files) => {
    const selectedFiles = Array.isArray(files) ? files : Array.from(files ?? []);
    if (selectedFiles.length === 0) {
      return;
    }

    const nextImages = await createOtherImagesFromFiles(selectedFiles);

    setValues((current) => ({
      ...current,
      [ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES]: [
        ...(current[ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES] ?? []),
        ...nextImages,
      ],
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const nextErrors = validateAdminServiceForm(values, {
        requireBanner: !values[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE],
      });

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }

      toast.success(
        isEditMode
          ? ADMIN_SERVICE_FORM_COPY.toasts.updated
          : ADMIN_SERVICE_FORM_COPY.toasts.created,
      );
      navigate(ROUTES.ADMIN_SERVICES);
    },
    [isEditMode, navigate, values],
  );

  return {
    copy: ADMIN_SERVICE_FORM_COPY,
    seo: getAdminServiceFormSeo(mode),
    pageTitle: getAdminServiceFormTitle(mode),
    mode,
    values,
    errors,
    categoryOptions: ADMIN_SERVICE_FORM_CATEGORY_OPTIONS,
    isNotFound,
    onFieldChange: handleFieldChange,
    onBannerFilesSelected: handleBannerFilesSelected,
    onOtherFilesSelected: handleOtherFilesSelected,
    onSubmit: handleSubmit,
  };
};

export default useAdminServiceForm;
