import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { buildServiceDetailsRoute, ROUTES } from '../config';
import { ADMIN_SERVICE_FORM_COPY } from '../components/admin/serviceForm/adminServiceFormCopy';
import {
  ADMIN_SERVICE_FORM_CATEGORY_OPTIONS,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_MODE,
  ADMIN_SERVICE_FORM_ROW_ID_PREFIX,
  createEmptyAdditionalFeatureRow,
  createEmptyAdminServiceFormValues,
  createEmptyOptionRow,
  createEmptySizeRow,
} from '../components/admin/serviceForm/adminServiceFormData';
import {
  appendAdminServiceFormRow,
  assertBannerFileLimit,
  createAdminServiceFormRowId,
  createAdminServiceFormValues,
  createBannerImageFromFile,
  createOtherImagesFromFiles,
  getAdminServiceFormDetailsById,
  getAdminServiceFormSeo,
  getAdminServiceFormTitle,
  resolveAdminServiceFormMode,
  revokePreviewUrl,
  revokePreviewUrls,
  updateAdminServiceFormRowField,
  validateAdminServiceForm,
} from '../components/admin/serviceForm/adminServiceFormUtils';
import { mapAdminFormValuesToPostedService } from '../services/postedServiceMapper';
import { upsertPostedService } from '../services/postedServicesStore';

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
      : createEmptyAdminServiceFormValues(),
  );
  const [errors, setErrors] = useState({});
  const rowSequenceRef = useRef({
    feature: 1,
    size: 1,
    option: 1,
  });
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

  const handleAdditionalFeatureChange = useCallback(
    (rowId, fieldKey) => (event) => {
      const nextValue = event.target.value;
      setValues((current) => ({
        ...current,
        [ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]: updateAdminServiceFormRowField(
          current[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES],
          rowId,
          fieldKey,
          nextValue,
        ),
      }));
    },
    [],
  );

  const handleSizeChange = useCallback(
    (rowId, fieldKey) => (event) => {
      const nextValue = event.target.value;
      setValues((current) => ({
        ...current,
        [ADMIN_SERVICE_FORM_FIELDS.SIZES]: updateAdminServiceFormRowField(
          current[ADMIN_SERVICE_FORM_FIELDS.SIZES],
          rowId,
          fieldKey,
          nextValue,
        ),
      }));
    },
    [],
  );

  const handleOptionChange = useCallback(
    (rowId, fieldKey) => (event) => {
      const nextValue = event.target.value;
      setValues((current) => ({
        ...current,
        [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: updateAdminServiceFormRowField(
          current[ADMIN_SERVICE_FORM_FIELDS.OPTIONS],
          rowId,
          fieldKey,
          nextValue,
        ),
      }));
    },
    [],
  );

  const handleAddAdditionalFeature = useCallback(() => {
    rowSequenceRef.current.feature += 1;
    const nextId = createAdminServiceFormRowId(
      ADMIN_SERVICE_FORM_ROW_ID_PREFIX.FEATURE,
      rowSequenceRef.current.feature,
    );

    setValues((current) => ({
      ...current,
      [ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]: appendAdminServiceFormRow(
        current[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES],
        createEmptyAdditionalFeatureRow(nextId),
      ),
    }));
  }, []);

  const handleAddSize = useCallback(() => {
    rowSequenceRef.current.size += 1;
    const nextId = createAdminServiceFormRowId(
      ADMIN_SERVICE_FORM_ROW_ID_PREFIX.SIZE,
      rowSequenceRef.current.size,
    );

    setValues((current) => ({
      ...current,
      [ADMIN_SERVICE_FORM_FIELDS.SIZES]: appendAdminServiceFormRow(
        current[ADMIN_SERVICE_FORM_FIELDS.SIZES],
        createEmptySizeRow(nextId),
      ),
    }));
  }, []);

  const handleAddOption = useCallback(() => {
    rowSequenceRef.current.option += 1;
    const nextId = createAdminServiceFormRowId(
      ADMIN_SERVICE_FORM_ROW_ID_PREFIX.OPTION,
      rowSequenceRef.current.option,
    );

    setValues((current) => ({
      ...current,
      [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: appendAdminServiceFormRow(
        current[ADMIN_SERVICE_FORM_FIELDS.OPTIONS],
        createEmptyOptionRow(nextId),
      ),
    }));
  }, []);

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

  const handleRemoveBannerImage = useCallback(() => {
    setValues((current) => {
      revokePreviewUrl(current[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]);
      return {
        ...current,
        [ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]: null,
      };
    });
  }, []);

  const handleRemoveOtherImage = useCallback((imageId) => {
    setValues((current) => {
      const currentImages = current[ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES] ?? [];
      const imageToRemove = currentImages.find((image) => image.id === imageId);
      revokePreviewUrl(imageToRemove);

      return {
        ...current,
        [ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES]: currentImages.filter(
          (image) => image.id !== imageId,
        ),
      };
    });
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const nextErrors = validateAdminServiceForm(values, {
        requireBanner: !values[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE],
      });

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }

      try {
        const postedService = mapAdminFormValuesToPostedService(values, {
          existingId: isEditMode ? serviceId : undefined,
        });
        const savedService = await upsertPostedService(postedService);

        toast.success(
          isEditMode
            ? ADMIN_SERVICE_FORM_COPY.toasts.updated
            : ADMIN_SERVICE_FORM_COPY.toasts.created,
        );
        navigate(buildServiceDetailsRoute(savedService.id));
      } catch (error) {
        toast.error(
          error?.message || 'Could not save service locally. Try again with fewer images.',
        );
      }
    },
    [isEditMode, navigate, serviceId, values],
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
    onAdditionalFeatureChange: handleAdditionalFeatureChange,
    onSizeChange: handleSizeChange,
    onOptionChange: handleOptionChange,
    onAddAdditionalFeature: handleAddAdditionalFeature,
    onAddSize: handleAddSize,
    onAddOption: handleAddOption,
    onBannerFilesSelected: handleBannerFilesSelected,
    onOtherFilesSelected: handleOtherFilesSelected,
    onRemoveBannerImage: handleRemoveBannerImage,
    onRemoveOtherImage: handleRemoveOtherImage,
    onSubmit: handleSubmit,
  };
};

export default useAdminServiceForm;
