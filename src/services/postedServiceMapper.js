import { ROUTES } from '../config';
import { resolvePostedMediaUrl } from './postedMediaStore';

const SERVICE_PACKAGES = {
  STANDARD: 'standard',
  PREMIUM: 'premium',
};

const FORM_FIELDS = {
  CATEGORY_ID: 'categoryId',
  SUBCATEGORY_ID: 'subcategoryId',
  DURATION: 'duration',
  STANDARD_PRICE: 'standardPrice',
  STANDARD_FEATURED: 'standardFeatured',
  PREMIUM_PRICE: 'premiumPrice',
  PREMIUM_FEATURED: 'premiumFeatured',
  TITLE: 'title',
  SHORT_DESCRIPTION: 'shortDescription',
  LONG_DESCRIPTION: 'longDescription',
  ADDITIONAL_FEATURES: 'additionalFeatures',
  SIZES: 'sizes',
  OPTIONS: 'options',
  INCLUDED: 'included',
  NOT_INCLUDED: 'notIncluded',
  BANNER_IMAGE: 'bannerImage',
  OTHER_IMAGES: 'otherImages',
};

const DEFAULT_RATING = '4.9 (312)';
const DEFAULT_IMAGE = '/assets/landing/service-plumbing.png';
const DEFAULT_IMAGE_ALT = 'Service image';

const CATALOG_PATH_BY_TITLE = {
  Lighting: ROUTES.LIGHTING,
  Security: ROUTES.SECURITY,
  Closets: ROUTES.CLOSETS,
  Fence: ROUTES.FENCE,
  Deck: ROUTES.DECK,
  Basement: ROUTES.BASEMENT,
  Appliances: ROUTES.APPLIANCES,
  Garage: ROUTES.GARAGE,
  Garden: ROUTES.GARDEN,
  Flooring: ROUTES.FLOORING,
  Windows: ROUTES.WINDOWS,
  Doors: ROUTES.DOORS,
  Kitchen: ROUTES.KITCHEN,
  Bathroom: ROUTES.BATHROOM,
  'Walls & Ceilings': ROUTES.WALLS_CEILINGS,
};

const toSlug = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/(^-|-$)/g, '');

const isBlank = (value) => !String(value ?? '').trim();

const parsePriceInputValue = (priceText) => {
  const cleaned = String(priceText ?? '')
    .trim()
    .replace(/[^0-9.]/g, '');

  if (!cleaned) {
    return NaN;
  }

  return Number(cleaned);
};

const splitMultilineItems = (value) =>
  String(value ?? '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

const hasFilledFeatureRow = (row) =>
  !isBlank(row?.name) ||
  !isBlank(row?.measurementUnit) ||
  !isBlank(row?.note1) ||
  !isBlank(row?.note2) ||
  !isBlank(row?.standardPrice) ||
  !isBlank(row?.premiumPrice) ||
  !isBlank(row?.quantity);

const hasFilledSizeRow = (row) =>
  !isBlank(row?.size) ||
  !isBlank(row?.measurementUnit) ||
  !isBlank(row?.standardPrice) ||
  !isBlank(row?.premiumPrice);

const hasFilledOptionRow = (row) =>
  !isBlank(row?.name) || !isBlank(row?.standardPrice) || !isBlank(row?.premiumPrice);

export const filterFilledAdditionalFeatures = (rows) =>
  (Array.isArray(rows) ? rows : []).filter(hasFilledFeatureRow);

export const filterFilledSizes = (rows) =>
  (Array.isArray(rows) ? rows : []).filter(hasFilledSizeRow);

export const filterFilledOptions = (rows) =>
  (Array.isArray(rows) ? rows : []).filter(hasFilledOptionRow);

export const resolveCatalogPathByTitle = (catalogTitle) =>
  CATALOG_PATH_BY_TITLE[catalogTitle] ?? ROUTES.HOME;

export const createPostedServiceId = (title, existingId) => {
  if (existingId) {
    return existingId;
  }

  const slug = toSlug(title) || 'service';
  return `posted-${slug}-${Date.now()}`;
};

const resolveBannerImage = (bannerImage) => {
  const previewUrl = bannerImage?.previewUrl;
  if (previewUrl) {
    return previewUrl;
  }

  return DEFAULT_IMAGE;
};

const mapOtherImagesForPost = (otherImages) =>
  (Array.isArray(otherImages) ? otherImages : [])
    .filter((image) => Boolean(image?.previewUrl))
    .map((image) => ({
      id: image.id,
      previewUrl: image.previewUrl,
      name: image.name ?? '',
    }));

export const mapAdminFormValuesToPostedService = (formValues, { existingId } = {}) => {
  const catalogTitle = String(formValues[FORM_FIELDS.CATEGORY_ID] ?? '').trim();
  const subcategory = String(formValues[FORM_FIELDS.SUBCATEGORY_ID] ?? '').trim();
  const title = String(formValues[FORM_FIELDS.TITLE] ?? '').trim();
  const standardPrice = parsePriceInputValue(formValues[FORM_FIELDS.STANDARD_PRICE]);
  const premiumPrice = parsePriceInputValue(formValues[FORM_FIELDS.PREMIUM_PRICE]);
  const id = createPostedServiceId(title, existingId);
  const image = resolveBannerImage(formValues[FORM_FIELDS.BANNER_IMAGE]);

  return {
    id,
    title,
    description: String(formValues[FORM_FIELDS.SHORT_DESCRIPTION] ?? '').trim(),
    category: subcategory,
    catalogTitle,
    catalogPath: resolveCatalogPathByTitle(catalogTitle),
    duration: String(formValues[FORM_FIELDS.DURATION] ?? '').trim(),
    price: Number.isFinite(standardPrice) ? standardPrice : 0,
    rating: DEFAULT_RATING,
    image,
    imageAlt: title || DEFAULT_IMAGE_ALT,
    isPosted: true,
    details: {
      overview: String(formValues[FORM_FIELDS.LONG_DESCRIPTION] ?? '').trim(),
      includedItems: splitMultilineItems(formValues[FORM_FIELDS.INCLUDED]),
      excludedItems: splitMultilineItems(formValues[FORM_FIELDS.NOT_INCLUDED]),
      packages: [
        {
          id: SERVICE_PACKAGES.STANDARD,
          title: 'Standard',
          price: Number.isFinite(standardPrice) ? standardPrice : 0,
          features: splitMultilineItems(formValues[FORM_FIELDS.STANDARD_FEATURED]),
        },
        {
          id: SERVICE_PACKAGES.PREMIUM,
          title: 'Premium',
          price: Number.isFinite(premiumPrice) ? premiumPrice : 0,
          features: splitMultilineItems(formValues[FORM_FIELDS.PREMIUM_FEATURED]),
        },
      ],
      additionalFeatures: filterFilledAdditionalFeatures(
        formValues[FORM_FIELDS.ADDITIONAL_FEATURES],
      ),
      sizes: filterFilledSizes(formValues[FORM_FIELDS.SIZES]),
      options: filterFilledOptions(formValues[FORM_FIELDS.OPTIONS]),
      // Heavy data URLs are moved to IndexedDB by postedServicesStore on upsert.
      otherImages: mapOtherImagesForPost(formValues[FORM_FIELDS.OTHER_IMAGES]),
    },
  };
};

export const toCatalogServiceFromPosted = (postedService) => {
  if (!postedService) {
    return null;
  }

  return {
    id: postedService.id,
    title: postedService.title,
    description: postedService.description,
    category: postedService.category,
    catalogTitle: postedService.catalogTitle,
    catalogPath: postedService.catalogPath,
    duration: postedService.duration,
    price: postedService.price,
    rating: postedService.rating,
    image: resolvePostedMediaUrl(postedService.image),
    imageAlt: postedService.imageAlt,
    isPosted: true,
  };
};

export const mergePostedServicesWithSeed = (seedServices, postedServices) => {
  const posted = Array.isArray(postedServices) ? postedServices : [];
  const postedIds = new Set(posted.map((service) => service.id));
  const seedWithoutOverrides = (Array.isArray(seedServices) ? seedServices : []).filter(
    (service) => !postedIds.has(service.id),
  );

  return [...posted.map(toCatalogServiceFromPosted), ...seedWithoutOverrides];
};
