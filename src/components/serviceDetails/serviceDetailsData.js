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
export const LIST_ICON_SIZE = 20;
export const FEATURE_ICON_SIZE = 22;
export const RADIO_ICON_SIZE = 20;
export const RECYCLE_ICON_SIZE = 20;
export const CLOSE_ICON_SIZE = 20;
export const ADD_ICON_SIZE = 14;

export const HERO_IMAGE_CLASS =
  'h-64 w-full rounded-xl object-cover sm:h-80 lg:h-auto lg:min-h-0 lg:flex-1';
export const PACKAGE_CARD_MIN_HEIGHT_CLASS = 'min-h-[310px]';
export const THUMBNAIL_IMAGE_CLASS = 'h-16 w-full object-cover sm:h-24 lg:h-[136px]';
export const GALLERY_THUMBNAIL_GRID_CLASS = 'grid-cols-4';
export const RELATED_MEDIA_CLASS = 'relative block shrink-0 sm:w-[378px]';
export const SUMMARY_TITLE_CLASS =
  'text-2xl font-semibold text-brand-ink sm:text-[32px] sm:leading-10';
export const INCLUDED_ICON_CLASS = 'text-green-600';
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
};

export const INCLUDED_ITEMS = [
  'Qualified technician for the booked service',
  'Professional labor for the selected service',
  'Secure installation or repair as specified',
  'Full functionality testing',
  'Basic cleanup of the work area',
];

export const EXCLUDED_ITEMS = [
  'Cost of materials, fixtures, or replacement parts',
  'Additional wiring, framing, or structural upgrades',
  'Painting or drywall repairs',
  'Complex site conditions billed as an additional fee',
  'Permit fees if required by local code',
];

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
