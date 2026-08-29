import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../config';
import { ADMIN_AD_FORM_COPY } from '../components/admin/adsForm/adsFormCopy';
import {
  assertAdBannerFileLimit,
  createAdminAdFormValues,
  getAdminAdFormDetailsById,
  getAdminAdFormSeo,
  getAdminAdFormTitle,
  resolveAdminAdFormMode,
  validateAdminAdForm,
} from '../components/admin/adsForm/adsFormUtils';
import {
  ADMIN_SERVICE_FORM_CATEGORY_OPTIONS,
  ADMIN_SERVICE_FORM_EMPTY_VALUES,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_MODE,
} from '../components/admin/serviceForm/adminServiceFormData';
import {
  createBannerImageFromFile,
  createOtherImagesFromFiles,
  revokePreviewUrl,
  revokePreviewUrls,
} from '../components/admin/serviceForm/adminServiceFormUtils';

const useAdminAdForm = () => {
  const navigate = useNavigate();
  const { adId } = useParams();
  const mode = resolveAdminAdFormMode(adId);
  const isEditMode = mode === ADMIN_SERVICE_FORM_MODE.EDIT;

  const details = useMemo(
    () => (isEditMode ? getAdminAdFormDetailsById(adId) : null),
    [adId, isEditMode],
  );

  const isNotFound = isEditMode && !details;

  const [values, setValues] = useState(() =>
    isEditMode && details
      ? createAdminAdFormValues(details)
      : { ...ADMIN_SERVICE_FORM_EMPTY_VALUES },
  );
  const [errors, setErrors] = useState({});
  const valuesRef = useRef(values);
  valuesRef.current = values;

  useEffect(() => {
    if (!isEditMode || !details) {
      return undefined;
    }

    setValues(createAdminAdFormValues(details));
    setErrors({});
    return undefined;
  }, [details, isEditMode, adId]);

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
    const limitError = assertAdBannerFileLimit(selectedFiles);
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

      const nextErrors = validateAdminAdForm(values, {
        requireBanner: !values[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE],
      });

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }

      toast.success(
        isEditMode
          ? ADMIN_AD_FORM_COPY.toasts.updated
          : ADMIN_AD_FORM_COPY.toasts.created,
      );
      navigate(ROUTES.ADMIN_ADS);
    },
    [isEditMode, navigate, values],
  );

  return {
    copy: ADMIN_AD_FORM_COPY,
    seo: getAdminAdFormSeo(mode),
    pageTitle: getAdminAdFormTitle(mode),
    listRoute: ROUTES.ADMIN_ADS,
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

export default useAdminAdForm;
