import { getCatalogServiceById } from '../catalog/catalogRegistry';
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
export const STAR_COUNT = 5;
export const STAR_ICON_SIZE = 12;
export const CLOCK_ICON_SIZE = 13;
export const INCLUSION_CHECK_ICON_SIZE = 12;
export const INCLUSION_ALERT_ICON_SIZE = 20;
export const FEATURE_ICON_SIZE = 22;
export const RADIO_ICON_SIZE = 20;
export const RECYCLE_ICON_SIZE = 20;
export const CLOSE_ICON_SIZE = 20;
export const CONTACT_METHODS = {
  PHONE: 'phone',
  EMAIL: 'email',
  CHAT: 'chat',
};

export const UNSELECTED_CONTACT_METHOD = '';
export const CONTACT_METHOD_ICON_SIZE = 22;
export const CONTACT_METHOD_ICON_WRAP_CLASS = 'flex size-12 items-center justify-center rounded-2xl';
export const CONTACT_METHOD_OPTION_PADDING_CLASS = 'p-[26px]';
export const CONTACT_METHOD_HEADER_MAX_WIDTH_CLASS = 'max-w-[409px]';
export const CONTACT_METHOD_OPTIONS_MAX_WIDTH_CLASS = 'max-w-[823px]';
export const CONTACT_METHOD_SECTION_SHADOW_CLASS =
  'shadow-[0px_-6px_68.6px_0px_rgba(125,125,125,0.16)]';
export const MOUNT_ENTER_OFFSET = 16;
export const MOUNT_ENTER_DURATION = 0.45;

export const DETAILS_SPLIT_GRID_CLASS =
  'mt-6 grid min-w-0 items-stretch gap-x-5 gap-y-4 lg:grid-cols-2';
export const ZIP_PANEL_GRID_CELL_CLASS = 'min-w-0 lg:col-start-2';
export const HERO_IMAGE_CLASS =
  'h-64 w-full min-w-0 max-w-full rounded-xl object-cover sm:h-80 lg:h-auto lg:min-h-0 lg:flex-1';
export const PACKAGE_CARD_MIN_HEIGHT_CLASS = 'min-h-[310px]';
export const THUMBNAIL_IMAGE_CLASS =
  'h-16 w-full min-w-0 max-w-full object-cover sm:h-24 lg:h-[136px]';
export const GALLERY_THUMBNAIL_GRID_CLASS = 'min-w-0 grid-cols-4';
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

export const ZIP_PANEL_IDS = {
  TITLE: 'service-zip-title',
  FIELD: 'service-zip-code',
};

export const CONTACT_METHOD_IDS = {
  TITLE: 'service-contact-method-title',
};

export const SERVICE_CHAT_IDS = {
  TITLE: 'service-chat-title',
};

export const SERVICE_CHAT_HEADER_HEIGHT_CLASS = 'h-20';
export const SERVICE_CHAT_PRO_AVATAR_SIZE = 38;
export const SERVICE_CHAT_PRO_ONLINE_DOT_SIZE = 8;
export const SERVICE_CHAT_MESSAGE_AVATAR_SIZE = 56;
export const SERVICE_CHAT_CLOSE_ICON_SIZE = 24;
export const SERVICE_CHAT_SEND_ICON_SIZE = 18;
export const SERVICE_CHAT_OFFER_ICON_SIZE = 20;
export const SERVICE_CHAT_PAY_ICON_SIZE = 18;
export const SERVICE_CHAT_PANEL_MIN_HEIGHT_CLASS = 'min-h-[600px] lg:min-h-[854px]';
export const SERVICE_CHAT_PANEL_SHADOW_CLASS =
  'shadow-[0px_40px_42.4px_0px_rgba(255,255,255,0.25)]';

export const SERVICE_CHAT_PRO = {
  name: 'Ope',
  avatarAlt: 'Service professional Ope',
};

export const SERVICE_CHAT_SEED_MESSAGES = [
  { id: 'seed-1', type: 'received', text: 'Yo mandem', position: 'first' },
  { id: 'seed-2', type: 'received', text: 'Cho dey house?', position: 'last' },
  { id: 'seed-3', type: 'sent', text: 'Kwasia 😂😂', position: 'first' },
  {
    id: 'seed-4',
    type: 'sent',
    text: 'You dey hung dier you kai say house dey',
    position: 'last',
  },
];

export const SERVICE_CHAT_OFFER_LINE_ITEMS = [
  { id: 'panel', item: '200A Main Breaker Panel', quantity: '1 unit', cost: 85 },
  { id: 'breakers', item: 'Circuit Breakers 15A', quantity: '6 pcs', cost: 30 },
  { id: 'wire', item: 'AWG Wire 10/2', quantity: '50 ft', cost: 40 },
];

export const buildServiceChatOffer = ({ service, selectedPackage }) => {
  const lineItems = SERVICE_CHAT_OFFER_LINE_ITEMS.map((lineItem) => ({
    ...lineItem,
    costLabel: `$${lineItem.cost}`,
  }));
  const materialsTotal = SERVICE_CHAT_OFFER_LINE_ITEMS.reduce(
    (total, lineItem) => total + lineItem.cost,
    0,
  );

  return {
    bookingId: `BK-${service.id.slice(0, 3).toUpperCase()}`,
    lineItems,
    totalLabel: `$${materialsTotal}`,
    serviceTitle: service.title,
    packagePrice: selectedPackage.price,
  };
};

export const formatServiceChatTimestamp = () => {
  const now = new Date();
  const dateLabel = now.toLocaleDateString([], {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  const timeLabel = now.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return { dateLabel, timeLabel };
};

const STANDARD_PRICE_OFFSET = 70;
const PREMIUM_PRICE_OFFSET = 125;

export const EMPTY_CATALOG_SERVICE_DETAILS = {
  service: undefined,
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
