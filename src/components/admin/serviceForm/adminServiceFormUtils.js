import {
  getCatalogServiceDetails,
  SERVICE_PACKAGES,
} from '../../serviceDetails/serviceDetailsData';
import { ADMIN_SERVICE_FORM_COPY } from './adminServiceFormCopy';
import {
  ADMIN_SERVICE_FORM_BANNER_MAX_FILES,
  ADMIN_SERVICE_FORM_EMPTY_VALUES,
  ADMIN_SERVICE_FORM_FIELDS,
  ADMIN_SERVICE_FORM_MODE,
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
    return { ...ADMIN_SERVICE_FORM_EMPTY_VALUES };
  }

  const { service, packages = [], overview = '', includedItems = [], excludedItems = [] } =
    details;
  const standardPackage = getPackageById(packages, SERVICE_PACKAGES.STANDARD);
  const premiumPackage = getPackageById(packages, SERVICE_PACKAGES.PREMIUM);

  return {
    ...ADMIN_SERVICE_FORM_EMPTY_VALUES,
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
    [ADMIN_SERVICE_FORM_FIELDS.INCLUDED]: joinListItems(includedItems),
    [ADMIN_SERVICE_FORM_FIELDS.NOT_INCLUDED]: joinListItems(excludedItems),
    [ADMIN_SERVICE_FORM_FIELDS.BANNER_IMAGE]: service.image
      ? { name: 'banner', previewUrl: service.image, isExisting: true }
      : null,
    [ADMIN_SERVICE_FORM_FIELDS.OTHER_IMAGES]: [],
  };
};

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

export const validateAdminServiceForm = (formValues, { requireBanner }) => {
  const errors = {};
  const { errors: copyErrors } = ADMIN_SERVICE_FORM_COPY;

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

  if (isBlank(formValues[ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION])) {
    errors[ADMIN_SERVICE_FORM_FIELDS.LONG_DESCRIPTION] = copyErrors.longDescriptionRequired;
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

export const createBannerImageFromFile = (file) => {
  if (!file) {
    return null;
  }

  return {
    name: file.name,
    previewUrl: URL.createObjectURL(file),
    file,
    isExisting: false,
  };
};

export const createOtherImagesFromFiles = (files) =>
  Array.from(files ?? []).map((file) => ({
    name: file.name,
    previewUrl: URL.createObjectURL(file),
    file,
    isExisting: false,
  }));

export const assertBannerFileLimit = (files) => {
  if ((files?.length ?? 0) > ADMIN_SERVICE_FORM_BANNER_MAX_FILES) {
    return ADMIN_SERVICE_FORM_COPY.errors.bannerTooMany;
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
