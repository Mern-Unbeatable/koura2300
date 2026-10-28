import {
  getCatalogServiceDetails,
  SERVICE_PACKAGES,
} from '../../serviceDetails/serviceDetailsData';
import { ADMIN_SERVICE_FORM_COPY } from './adminServiceFormCopy';
import {
  ADMIN_SERVICE_FORM_BANNER_MAX_FILES,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_INITIAL_FEATURE_ROW_ID,
  ADMIN_SERVICE_FORM_INITIAL_OPTION_ROW_ID,
  ADMIN_SERVICE_FORM_INITIAL_SIZE_ROW_ID,
  ADMIN_SERVICE_FORM_MODE,
  createEmptyAdditionalFeatureRow,
  createEmptyAdminServiceFormValues,
  createEmptyOptionRow,
  createEmptySizeRow,
} from './adminServiceFormData';

const PRICE_PREFIX = '$';

export const resolveAdminServiceFormMode = (serviceId) =>
  serviceId ? ADMIN_SERVICE_FORM_MODE.EDIT : ADMIN_SERVICE_FORM_MODE.CREATE;

export const getAdminServiceFormTitle = (mode) =>
  mode === ADMIN_SERVICE_FORM_MODE.EDIT
    ? ADMIN_SERVICE_FORM_COPY.titles.edit
    : ADMIN_SERVICE_FORM_COPY.titles.create;

export const getAdminServiceFormSeo = (mode) =>
  mode === ADMIN_SERVICE_FORM_MODE.EDIT
    ? ADMIN_SERVICE_FORM_COPY.seo.edit
    : ADMIN_SERVICE_FORM_COPY.seo.create;

export const formatPriceInputValue = (price) => {
  if (price == null || price === '') {
    return '';
  }

  const numeric = Number(price);
  if (!Number.isFinite(numeric)) {
    return String(price);
  }

  return `${PRICE_PREFIX}${numeric.toFixed(2)}`;
};

export const parsePriceInputValue = (priceText) => {
  const cleaned = String(priceText ?? '')
    .trim()
    .replace(/[^0-9.]/g, '');

  if (!cleaned) {
    return NaN;
  }

  return Number(cleaned);
};

const joinListItems = (items) =>
  Array.isArray(items) ? items.filter(Boolean).join('\n') : '';

export const joinTextLineRows = (rows) =>
  (Array.isArray(rows) ? rows : [])
    .map((row) => String(row?.value ?? '').trim())
    .filter(Boolean)
    .join('\n');

export const createTextLineRowsFromItems = (items, idPrefix) => {
  const lines = Array.isArray(items)
    ? items.map((item) => String(item ?? '').trim()).filter(Boolean)
    : String(items ?? '')
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);

  if (lines.length === 0) {
    return [{ id: `${idPrefix}-1`, value: '' }];
  }

  return lines.map((value, index) => ({
    id: `${idPrefix}-${index + 1}`,
    value,
  }));
};

export const hasFilledTextLineRows = (rows) =>
  (Array.isArray(rows) ? rows : []).some((row) => String(row?.value ?? '').trim());

const hasFilledAdditionalFeatureRow = (row) =>
  Boolean(
    String(row?.name ?? '').trim() ||
      String(row?.measurementUnit ?? '').trim() ||
      String(row?.note1 ?? '').trim() ||
      String(row?.note2 ?? '').trim() ||
      String(row?.standardPrice ?? '').trim() ||
      String(row?.premiumPrice ?? '').trim() ||
      String(row?.quantity ?? '').trim(),
  );

const hasFilledOptionRow = (row) =>
  Boolean(
    String(row?.name ?? '').trim() ||
      String(row?.standardPrice ?? '').trim() ||
      String(row?.premiumPrice ?? '').trim(),
  );

const hasFilledSizeRow = (row) =>
  Boolean(
    String(row?.size ?? '').trim() ||
      String(row?.measurementUnit ?? '').trim() ||
      String(row?.standardPrice ?? '').trim() ||
      String(row?.premiumPrice ?? '').trim(),
  );

export const isAdditionalFeatureSectionInUse = (rows) => {
  const list = Array.isArray(rows) ? rows : [];
  return list.length > 1 || list.some(hasFilledAdditionalFeatureRow);
};

export const isOptionsSectionInUse = (rows) => {
  const list = Array.isArray(rows) ? rows : [];
  return list.length > 1 || list.some(hasFilledOptionRow);
};

export const isSizesSectionInUse = (rows) => {
  const list = Array.isArray(rows) ? rows : [];
  return list.length > 1 || list.some(hasFilledSizeRow);
};

export const createResetAdditionalFeatureRows = () => [
  createEmptyAdditionalFeatureRow(ADMIN_SERVICE_FORM_INITIAL_FEATURE_ROW_ID),
];

export const createResetOptionRows = () => [
  createEmptyOptionRow(ADMIN_SERVICE_FORM_INITIAL_OPTION_ROW_ID),
];

export const createResetSizeRows = () => [
  createEmptySizeRow(ADMIN_SERVICE_FORM_INITIAL_SIZE_ROW_ID),
];

/**
 * Catalog UIs are exclusive:
 * - Additional Feature and Options cannot both be active
 * - Sizes and Options cannot both be active (prefer Sizes when both exist)
 */
export const reconcileExclusiveCatalogSections = (formValues) => {
  let next = formValues;
  const features = next?.[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES];
  const options = next?.[ADMIN_SERVICE_FORM_FIELDS.OPTIONS];
  const sizes = next?.[ADMIN_SERVICE_FORM_FIELDS.SIZES];

  if (isAdditionalFeatureSectionInUse(features) && isOptionsSectionInUse(options)) {
    next = {
      ...next,
      [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: createResetOptionRows(),
    };
  }

  const nextOptions = next?.[ADMIN_SERVICE_FORM_FIELDS.OPTIONS];
  if (isSizesSectionInUse(sizes) && isOptionsSectionInUse(nextOptions)) {
    next = {
      ...next,
      [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]: createResetOptionRows(),
    };
  }

  return next;
};

const getPackageById = (packages, packageId) =>
  packages.find((item) => item.id === packageId) ?? null;

export const createAdminServiceFormValues = (details) => {
  if (!details?.service) {
    return createEmptyAdminServiceFormValues();
  }

  const {
    service,
    packages = [],
    overview = '',
    includedItems = [],
    excludedItems = [],
    additionalFeatures,
    sizes,
    options,
    otherImages = [],
  } = details;
  const standardPackage = getPackageById(packages, SERVICE_PACKAGES.STANDARD);
  const premiumPackage = getPackageById(packages, SERVICE_PACKAGES.PREMIUM);
  const emptyValues = createEmptyAdminServiceFormValues();

  return reconcileExclusiveCatalogSections({
    ...emptyValues,
    [ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]: service.catalogTitle ?? '',
    [ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID]: service.category ?? '',
    [ADMIN_SERVICE_FORM_FIELDS.DURATION]: service.duration ?? '',
    [ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE]: formatPriceInputValue(
      standardPackage?.price ?? service.price,
    ),
    [ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED]: createTextLineRowsFromItems(
      standardPackage?.features,
      'standard-featured',
    ),
    [ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE]: formatPriceInputValue(premiumPackage?.price),
    [ADMIN_SERVICE_FORM_FIELDS.PREMIUM_FEATURED]: createTextLineRowsFromItems(
      premiumPackage?.features,
      'premium-featured',
    ),
    [ADMIN_SERVICE_FORM_FIELDS.TITLE]: service.title ?? '',
    [ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION]: service.description ?? '',
    [ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION]: overview,
    [ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES]:
      Array.isArray(additionalFeatures) && additionalFeatures.length > 0
        ? additionalFeatures
        : emptyValues[ADMIN_SERVICE_FORM_FIELDS.ADDITIONAL_FEATURES],
    [ADMIN_SERVICE_FORM_FIELDS.SIZES]:
      Array.isArray(sizes) && sizes.length > 0
        ? sizes
        : emptyValues[ADMIN_SERVICE_FORM_FIELDS.SIZES],
    [ADMIN_SERVICE_FORM_FIELDS.OPTIONS]:
      Array.isArray(options) && options.length > 0
        ? options
        : emptyValues[ADMIN_SERVICE_FORM_FIELDS.OPTIONS],
    [ADMIN_SERVICE_FORM_FIELDS.INCLUDED]: createTextLineRowsFromItems(
      includedItems,
      'included',
    ),
    [ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED]: createTextLineRowsFromItems(
      excludedItems,
      'not-included',
    ),
    [ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]: service.image
      ? {
          id: `existing-banner-${service.id}`,
          name: 'banner',
          previewUrl: service.image,
          isExisting: true,
        }
      : null,
    [ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES]: (Array.isArray(otherImages) ? otherImages : [])
      .filter((image) => Boolean(image?.previewUrl))
      .map((image, index) => ({
        id: image.id || `existing-other-${service.id}-${index}`,
        name: image.name || `image-${index + 1}`,
        previewUrl: image.previewUrl,
        isExisting: true,
      })),
  });
};

export const appendAdminServiceFormRow = (rows, nextRow) => [...(rows ?? []), nextRow];

export const removeAdminServiceFormRow = (rows, rowId) => {
  const currentRows = Array.isArray(rows) ? rows : [];
  if (currentRows.length <= 1) {
    return currentRows;
  }

  return currentRows.filter((row) => row.id !== rowId);
};

export const updateAdminServiceFormRowField = (rows, rowId, fieldKey, nextValue) =>
  (rows ?? []).map((row) =>
    row.id === rowId
      ? {
          ...row,
          [fieldKey]: nextValue,
        }
      : row,
  );

export const createAdminServiceFormRowId = (prefix, sequence) => `${prefix}-${sequence}`;

export const getAdminServiceFormDetailsById = (serviceId) => {
  const details = getCatalogServiceDetails(serviceId);

  if (!details.service) {
    return null;
  }

  return details;
};

const isBlank = (value) => !String(value ?? '').trim();

const validatePriceField = (value, requiredMessage, invalidMessage) => {
  if (isBlank(value)) {
    return requiredMessage;
  }

  const numeric = parsePriceInputValue(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return invalidMessage;
  }

  return null;
};

export const validateAdminServiceForm = (
  formValues,
  { requireBanner, errorCopy = ADMIN_SERVICE_FORM_COPY.errors },
) => {
  const errors = {};
  const copyErrors = errorCopy;

  if (isBlank(formValues[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID])) {
    errors[ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID] = copyErrors.categoryRequired;
  }

  if (isBlank(formValues[ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID])) {
    errors[ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID] = copyErrors.subcategoryRequired;
  }

  if (isBlank(formValues[ADMIN_SERVICE_FORM_FIELDS.DURATION])) {
    errors[ADMIN_SERVICE_FORM_FIELDS.DURATION] = copyErrors.durationRequired;
  }

  const standardPriceError = validatePriceField(
    formValues[ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE],
    copyErrors.standardPriceRequired,
    copyErrors.standardPriceInvalid,
  );
  if (standardPriceError) {
    errors[ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE] = standardPriceError;
  }

  const premiumPriceError = validatePriceField(
    formValues[ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE],
    copyErrors.premiumPriceRequired,
    copyErrors.premiumPriceInvalid,
  );
  if (premiumPriceError) {
    errors[ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE] = premiumPriceError;
  }

  if (isBlank(formValues[ADMIN_SERVICE_FORM_FIELDS.TITLE])) {
    errors[ADMIN_SERVICE_FORM_FIELDS.TITLE] = copyErrors.titleRequired;
  }

  if (isBlank(formValues[ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION])) {
    errors[ADMIN_SERVICE_FORM_FIELDS.SHORT_DESCRIPTION] = copyErrors.shortDescriptionRequired;
  }

  if (!hasFilledTextLineRows(formValues[ADMIN_SERVICE_FORM_FIELDS.INCLUDED])) {
    errors[ADMIN_SERVICE_FORM_FIELDS.INCLUDED] = copyErrors.includedRequired;
  }

  if (!hasFilledTextLineRows(formValues[ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED])) {
    errors[ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED] = copyErrors.notIncludedRequired;
  }

  if (requireBanner && !formValues[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]) {
    errors[ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE] = copyErrors.bannerRequired;
  }

  return errors;
};

export const toFileArray = (files) => Array.from(files ?? []).filter(Boolean);

export const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });

const isAcceptedImageFile = (file) => {
  const type = String(file.type || '').toLowerCase();
  if (type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png') {
    return true;
  }

  const name = String(file.name || '').toLowerCase();
  return name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png');
};

export const filterAcceptedImageFiles = (files) => toFileArray(files).filter(isAcceptedImageFile);

export const createBannerImageFromFile = async (file) => {
  if (!file) {
    return null;
  }

  const previewUrl = await readFileAsDataUrl(file);

  return {
    id: `banner-${file.name}-${file.lastModified}-${previewUrl.length}`,
    name: file.name,
    previewUrl,
    file,
    isExisting: false,
  };
};

export const createOtherImagesFromFiles = async (files) => {
  const acceptedFiles = toFileArray(files);
  const previews = await Promise.all(
    acceptedFiles.map(async (file, index) => {
      const previewUrl = await readFileAsDataUrl(file);

      return {
        id: `other-${file.name}-${file.lastModified}-${index}-${previewUrl.length}`,
        name: file.name,
        previewUrl,
        file,
        isExisting: false,
      };
    }),
  );

  return previews;
};

export const assertBannerFileLimit = (
  files,
  tooManyMessage = ADMIN_SERVICE_FORM_COPY.errors.bannerTooMany,
) => {
  if (toFileArray(files).length > ADMIN_SERVICE_FORM_BANNER_MAX_FILES) {
    return tooManyMessage;
  }

  return null;
};

export const revokePreviewUrl = (image) => {
  if (image?.previewUrl && !image.isExisting && image.previewUrl.startsWith('blob:')) {
    URL.revokeObjectURL(image.previewUrl);
  }
};

export const revokePreviewUrls = (images) => {
  (images ?? []).forEach(revokePreviewUrl);
};
