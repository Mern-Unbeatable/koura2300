import {
  getCatalogServiceDetails,
  SERVICE_PACKAGES,
} from '../../serviceDetails/serviceDetailsData';
import { ADMIN_SERVICE_FORM_COPY } from './adminServiceFormCopy';
import {
  ADMIN_SERVICE_FORM_BANNER_MAX_FILES,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_MODE,
  createEmptyAdminServiceFormValues,
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

  return {
    ...emptyValues,
    [ADMIN_SERVICE_FORM_FIELDS.CATEGORY_ID]: service.catalogTitle ?? '',
    [ADMIN_SERVICE_FORM_FIELDS.SUBCATEGORY_ID]: service.category ?? '',
    [ADMIN_SERVICE_FORM_FIELDS.DURATION]: service.duration ?? '',
    [ADMIN_SERVICE_FORM_FIELDS.STANDARD_PRICE]: formatPriceInputValue(
      standardPackage?.price ?? service.price,
    ),
    [ADMIN_SERVICE_FORM_FIELDS.STANDARD_FEATURED]: joinListItems(
      standardPackage?.features?.slice(0, 1),
    ),
    [ADMIN_SERVICE_FORM_FIELDS.PREMIUM_PRICE]: formatPriceInputValue(premiumPackage?.price),
    [ADMIN_SERVICE_FORM_FIELDS.PREMIUM_FEATURED]: joinListItems(
      premiumPackage?.features?.slice(0, 1),
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
    [ADMIN_SERVICE_FORM_FIELDS.INCLUDED]: joinListItems(includedItems),
    [ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED]: joinListItems(excludedItems),
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
  };
};

export const appendAdminServiceFormRow = (rows, nextRow) => [...(rows ?? []), nextRow];

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

  if (isBlank(formValues[ADMIN_SERVICE_FORM_FIELDS.INCLUDED])) {
    errors[ADMIN_SERVICE_FORM_FIELDS.INCLUDED] = copyErrors.includedRequired;
  }

  if (isBlank(formValues[ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED])) {
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
