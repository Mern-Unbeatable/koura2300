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
  ADMIN_SERVICE_FORM_TEXT_LINE_KEYS,
  createEmptyAdditionalFeatureRow,
  createEmptyAdminServiceFormValues,
  createEmptyOptionRow,
  createEmptySizeRow,
  createEmptyTextLineRow,
} from '../components/admin/serviceForm/adminServiceFormData';
import {
  appendAdminServiceFormRow,
  assertBannerFileLimit,
  createAdminServiceFormRowId,
  createAdminServiceFormValues,
  createBannerImageFromFile,
  createOtherImagesFromFiles,
  createResetAdditionalFeatureRows,
  createResetOptionRows,
  getAdminServiceFormDetailsById,
  getAdminServiceFormSeo,
  getAdminServiceFormTitle,
  isAdditionalFeatureSectionInUse,
  isOptionsSectionInUse,
  removeAdminServiceFormRow,
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
  const getRowSequenceSeed = useCallback((formValues) => {
    const countRows = (fieldName) =>
      Math.max(1, (formValues?.[fieldName] ?? []).length);

    return {
      feature: countRows(ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES),
      size: countRows(ADMIN_SERVICE_FORM_FIELDS.SIZES),
      option: countRows(ADMIN_SERVICE_FORM_FIELDS.OPTIONS),
      standardFeatured: countRows(ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED),
      premiumFeatured: countRows(ADMIN_SERVICE_FORM_FIELDS.PREMIUM_FEATURED),
      included: countRows(ADMIN_SERVICE_FORM_FIELDS.INCLUDED),
      notIncluded: countRows(ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED),
    };
  }, []);
  const rowSequenceRef = useRef(getRowSequenceSeed(values));
  const valuesRef = useRef(values);
  valuesRef.current = values;

  useEffect(() => {
    if (!isEditMode || !details) {
      return undefined;
    }

    const nextValues = createAdminServiceFormValues(details);
    setValues(nextValues);
    rowSequenceRef.current = getRowSequenceSeed(nextValues);
    setErrors({});
    return undefined;
  }, [details, getRowSequenceSeed, isEditMode, serviceId]);

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
      setValues((current) => {
        const nextFeatures = updateAdminServiceFormRowField(
          current[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES],
          rowId,
          fieldKey,
          nextValue,
        );
        const next = {
          ...current,
          [ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]: nextFeatures,
        };

        if (
          isAdditionalFeatureSectionInUse(nextFeatures) &&
          isOptionsSectionInUse(current[ADMIN_SERVICE_FORM_FIELDS.OPTIONS])
        ) {
          next[ADMIN_SERVICE_FORM_FIELDS.OPTIONS] = createResetOptionRows();
        }

        return next;
      });
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
      setValues((current) => {
        const nextOptions = updateAdminServiceFormRowField(
          current[ADMIN_SERVICE_FORM_FIELDS.OPTIONS],
          rowId,
          fieldKey,
          nextValue,
        );
        const next = {
          ...current,
          [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: nextOptions,
        };

        if (
          isOptionsSectionInUse(nextOptions) &&
          isAdditionalFeatureSectionInUse(
            current[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES],
          )
        ) {
          next[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES] =
            createResetAdditionalFeatureRows();
        }

        return next;
      });
    },
    [],
  );

  const handleAddAdditionalFeature = useCallback(() => {
    rowSequenceRef.current.feature += 1;
    const nextId = createAdminServiceFormRowId(
      ADMIN_SERVICE_FORM_ROW_ID_PREFIX.FEATURE,
      rowSequenceRef.current.feature,
    );

    setValues((current) => {
      const nextFeatures = appendAdminServiceFormRow(
        current[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES],
        createEmptyAdditionalFeatureRow(nextId),
      );
      const next = {
        ...current,
        [ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]: nextFeatures,
      };

      if (isOptionsSectionInUse(current[ADMIN_SERVICE_FORM_FIELDS.OPTIONS])) {
        next[ADMIN_SERVICE_FORM_FIELDS.OPTIONS] = createResetOptionRows();
      }

      return next;
    });
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

    setValues((current) => {
      const nextOptions = appendAdminServiceFormRow(
        current[ADMIN_SERVICE_FORM_FIELDS.OPTIONS],
        createEmptyOptionRow(nextId),
      );
      const next = {
        ...current,
        [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: nextOptions,
      };

      if (
        isAdditionalFeatureSectionInUse(
          current[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES],
        )
      ) {
        next[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES] =
          createResetAdditionalFeatureRows();
      }

      return next;
    });
  }, []);

  const handleRemoveAdditionalFeature = useCallback((rowId) => {
    setValues((current) => ({
      ...current,
      [ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]: removeAdminServiceFormRow(
        current[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES],
        rowId,
      ),
    }));
  }, []);

  const handleRemoveSize = useCallback((rowId) => {
    setValues((current) => ({
      ...current,
      [ADMIN_SERVICE_FORM_FIELDS.SIZES]: removeAdminServiceFormRow(
        current[ADMIN_SERVICE_FORM_FIELDS.SIZES],
        rowId,
      ),
    }));
  }, []);

  const handleRemoveOption = useCallback((rowId) => {
    setValues((current) => ({
      ...current,
      [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: removeAdminServiceFormRow(
        current[ADMIN_SERVICE_FORM_FIELDS.OPTIONS],
        rowId,
      ),
    }));
  }, []);

  const textLineFieldConfig = useMemo(
    () => ({
      [ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED]: {
        sequenceKey: 'standardFeatured',
        prefix: ADMIN_SERVICE_FORM_ROW_ID_PREFIX.STANDARD_FEATURED,
      },
      [ADMIN_SERVICE_FORM_FIELDS.PREMIUM_FEATURED]: {
        sequenceKey: 'premiumFeatured',
        prefix: ADMIN_SERVICE_FORM_ROW_ID_PREFIX.PREMIUM_FEATURED,
      },
      [ADMIN_SERVICE_FORM_FIELDS.INCLUDED]: {
        sequenceKey: 'included',
        prefix: ADMIN_SERVICE_FORM_ROW_ID_PREFIX.INCLUDED,
      },
      [ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED]: {
        sequenceKey: 'notIncluded',
        prefix: ADMIN_SERVICE_FORM_ROW_ID_PREFIX.NOT_INCLUDED,
      },
    }),
    [],
  );

  const handleTextLineChange = useCallback(
    (fieldName) => (rowId) => (event) => {
      const nextValue = event.target.value;
      setValues((current) => ({
        ...current,
        [fieldName]: updateAdminServiceFormRowField(
          current[fieldName],
          rowId,
          ADMIN_SERVICE_FORM_TEXT_LINE_KEYS.VALUE,
          nextValue,
        ),
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

  const handleAddTextLine = useCallback(
    (fieldName) => () => {
      const config = textLineFieldConfig[fieldName];
      if (!config) {
        return;
      }

      rowSequenceRef.current[config.sequenceKey] += 1;
      const nextId = createAdminServiceFormRowId(
        config.prefix,
        rowSequenceRef.current[config.sequenceKey],
      );

      setValues((current) => ({
        ...current,
        [fieldName]: appendAdminServiceFormRow(
          current[fieldName],
          createEmptyTextLineRow(nextId),
        ),
      }));
    },
    [textLineFieldConfig],
  );

  const handleRemoveTextLine = useCallback(
    (fieldName) => (rowId) => {
      setValues((current) => ({
        ...current,
        [fieldName]: removeAdminServiceFormRow(current[fieldName], rowId),
      }));
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
    onTextLineChange: handleTextLineChange,
    onAddAdditionalFeature: handleAddAdditionalFeature,
    onAddSize: handleAddSize,
    onAddOption: handleAddOption,
    onRemoveAdditionalFeature: handleRemoveAdditionalFeature,
    onRemoveSize: handleRemoveSize,
    onRemoveOption: handleRemoveOption,
    onAddTextLine: handleAddTextLine,
    onRemoveTextLine: handleRemoveTextLine,
    onBannerFilesSelected: handleBannerFilesSelected,
    onOtherFilesSelected: handleOtherFilesSelected,
    onRemoveBannerImage: handleRemoveBannerImage,
    onRemoveOtherImage: handleRemoveOtherImage,
    onSubmit: handleSubmit,
  };
};

export default useAdminServiceForm;
