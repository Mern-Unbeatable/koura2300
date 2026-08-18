import { getCatalogServiceById, getRelatedCatalogServices } from '../catalog/catalogRegistry';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';

export const SERVICE_PACKAGES = {
  STANDARD: 'standard',
  PREMIUM: 'premium',
};

export const GALLERY_THUMBNAIL_COUNT = 4;
export const FIRST_PHOTO_NUMBER = 1;
export const INITIAL_IMAGE_INDEX = 0;
export const HERO_IMAGE_WIDTH = 758;
export const HERO_IMAGE_HEIGHT = 624;
export const THUMBNAIL_IMAGE_HEIGHT = 136;
export const RELATED_IMAGE_WIDTH = 378;
export const RELATED_IMAGE_HEIGHT = 230;
export const STAR_COUNT = 5;
export const STAR_ICON_SIZE = 12;
export const CLOCK_ICON_SIZE = 13;
export const INCLUSION_CHECK_ICON_SIZE = 12;
export const INCLUSION_ALERT_ICON_SIZE = 20;
export const FEATURE_ICON_SIZE = 22;
export const RADIO_ICON_SIZE = 20;
export const RECYCLE_ICON_SIZE = 20;
export const CLOSE_ICON_SIZE = 20;
export const ADD_ICON_SIZE = 14;

export const HERO_IMAGE_CLASS =
  'h-64 w-full min-w-0 max-w-full rounded-xl object-cover sm:h-80 lg:h-auto lg:min-h-0 lg:flex-1';
export const PACKAGE_CARD_MIN_HEIGHT_CLASS = 'min-h-[310px]';
export const THUMBNAIL_IMAGE_CLASS =
  'h-16 w-full min-w-0 max-w-full object-cover sm:h-24 lg:h-[136px]';
export const GALLERY_THUMBNAIL_GRID_CLASS = 'min-w-0 grid-cols-4';
export const RELATED_MEDIA_CLASS =
  'relative block min-w-0 w-full overflow-hidden sm:w-[42%] xl:w-[378px] xl:shrink-0';
export const RELATED_IMAGE_CLASS = 'h-48 w-full max-w-full object-cover sm:h-full';
export const RELATED_CARD_CLASS =
  'flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white sm:flex-row';
export const RELATED_GRID_CLASS = 'mt-8 grid min-w-0 gap-5 lg:grid-cols-2';
export const SUMMARY_TITLE_CLASS =
  'text-2xl font-semibold text-brand-ink sm:text-[32px] sm:leading-10';
export const LIGHTING_CATALOG_TITLE = 'Lighting';
export const INCLUSION_HEADING_CLASS = 'text-2xl font-bold text-gray-700';
export const INCLUSION_LIST_CARD_CLASS = 'mt-6 min-h-[248px] rounded-2xl bg-white p-8';
export const INCLUSION_LIST_CLASS = 'flex flex-col gap-4';
export const INCLUSION_ITEM_CLASS =
  'flex min-w-0 items-center gap-3 text-base leading-6 break-words text-gray-700';
export const INCLUSION_INCLUDED_BADGE_CLASS =
  'flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-orange-light';
export const INCLUSION_EXCLUDED_BADGE_CLASS =
  'flex size-5 shrink-0 items-center justify-center';
export const INCLUDED_ICON_CLASS = 'text-brand-orange';
export const EXCLUDED_ICON_CLASS = 'text-red-500';
export const RADIO_FILL_SELECTED = 'currentColor';
export const RADIO_FILL_IDLE = 'none';
export const BREADCRUMB_SEPARATOR = '>';

export const ZIP_MODAL_IDS = {
  TITLE: 'service-zip-title',
  FIELD: 'service-zip-code',
  ERROR: 'service-zip-error',
};

const STANDARD_PRICE_OFFSET = 70;
const PREMIUM_PRICE_OFFSET = 125;

export const US_ZIP_PATTERN = /^\d{5}(?:-\d{4})?$/;

export const EMPTY_CATALOG_SERVICE_DETAILS = {
  service: undefined,
  relatedServices: [],
  packages: [],
  overview: '',
  includedItems: [],
  excludedItems: [],
};

export const DEFAULT_INCLUDED_ITEMS = [
  'Qualified technician for the booked service',
  'Professional labor for the selected service',
  'Secure installation or repair as specified',
  'Full functionality testing',
  'Basic cleanup of the work area',
];

export const LIGHTING_INCLUDED_ITEMS = [
  'New ceiling light fixture (customer choice from catalog)',
  'Professional installation by certified electrician',
  'Wiring inspection and connector verification',
  'Cleanup of work area and debris removal',
  '30-day workmanship warranty',
];

const INCLUDED_ITEMS_BY_CATALOG = {
  [LIGHTING_CATALOG_TITLE]: LIGHTING_INCLUDED_ITEMS,
};

export const getIncludedItems = (catalogTitle) =>
  INCLUDED_ITEMS_BY_CATALOG[catalogTitle] ?? DEFAULT_INCLUDED_ITEMS;

export const DEFAULT_EXCLUDED_ITEMS = [
  'Cost of materials, fixtures, or replacement parts',
  'Additional wiring, framing, or structural upgrades',
  'Painting or drywall repairs',
  'Complex site conditions billed as an additional fee',
  'Permit fees if required by local code',
];

export const LIGHTING_EXCLUDED_ITEMS = [
  'Materials for recessed can retrofits',
  'Wall / ceiling drywall repair (if needed)',
  'Electrical panel upgrades',
  'Custom fixture orders beyond standard catalog',
  'Permit fees (if required by municipality)',
];

const EXCLUDED_ITEMS_BY_CATALOG = {
  [LIGHTING_CATALOG_TITLE]: LIGHTING_EXCLUDED_ITEMS,
};

export const getExcludedItems = (catalogTitle) =>
  EXCLUDED_ITEMS_BY_CATALOG[catalogTitle] ?? DEFAULT_EXCLUDED_ITEMS;

const STANDARD_FEATURES = [
  'Standard Light Installation',
  'Basic Wiring Connection',
  'Secure Fixture Mounting',
  'Functionality Testing',
  'Basic Cleanup',
];

const PREMIUM_FEATURES = [
  'Everything in Standard',
  'Premium Installation Service',
  'Advanced Wiring Check',
  'Fixture Alignment & Finishing',
  'Priority Scheduling',
  'Detailed Final Inspection',
];

export const buildServiceOverview = (title) =>
  `Our professional ${title} service ensures your project is completed safely, securely, and in compliance with applicable standards. Whether you're replacing an existing setup or installing something new, our experienced technicians provide reliable workmanship and attention to detail. We carefully inspect the current conditions, complete the work securely, test all connections, and ensure everything functions properly before finishing the job. Our goal is to improve both the appearance and functionality of your space while maintaining the highest safety standards.`;

export const getServicePackages = (service) => [
  {
    id: SERVICE_PACKAGES.STANDARD,
    title: SERVICE_DETAILS_CONTENT.packages.standardTitle,
    price: service.price + STANDARD_PRICE_OFFSET,
    features: STANDARD_FEATURES,
  },
  {
    id: SERVICE_PACKAGES.PREMIUM,
    title: SERVICE_DETAILS_CONTENT.packages.premiumTitle,
    price: service.price + PREMIUM_PRICE_OFFSET,
    features: PREMIUM_FEATURES,
  },
];

export const getCatalogServiceDetails = (serviceId) => {
  const service = getCatalogServiceById(serviceId);

  if (!service) {
    return EMPTY_CATALOG_SERVICE_DETAILS;
  }

  return {
    service,
    relatedServices: getRelatedCatalogServices(service),
    packages: getServicePackages(service),
    overview: buildServiceOverview(service.title),
    includedItems: getIncludedItems(service.catalogTitle),
    excludedItems: getExcludedItems(service.catalogTitle),
  };
};

export const createConfirmedCartItem = ({
  service,
  selectedPackage,
  needsMaterials,
  recycleOldMaterials,
}) => ({
  id: `${service.id}-${selectedPackage.id}`,
  price: selectedPackage.price,
  title: service.title,
  needsMaterials,
  recycleOldMaterials,
});

export const isValidUsZip = (zipCode) => US_ZIP_PATTERN.test(zipCode.trim());
