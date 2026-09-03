export const SECURITY_ALL_CATEGORY = 'All';
export const SECURITY_PAGE_SIZE = 20;

export const SECURITY_CATEGORIES = [
  'Security Camera Services',
  'Alarm System Services',
  'Smart Home Security',
  'Smoke & Carbon Monoxide Detectors',
  'Video Doorbells',
];

export const SECURITY_FILTER_TABS = [SECURITY_ALL_CATEGORY, ...SECURITY_CATEGORIES];

export const SECURITY_PRICE_RANGES = [
  { value: 'any', label: 'Any price', minimum: 0, maximum: Number.POSITIVE_INFINITY },
  { value: '0-99', label: 'Under $100', minimum: 0, maximum: 99 },
  { value: '100-200', label: '$100-$200', minimum: 100, maximum: 200 },
  { value: '201-300', label: '$201-$300', minimum: 201, maximum: 300 },
];

const SERVICE_IMAGE = '/assets/landing/category-security.png';
const SERVICE_IMAGE_ALT = 'Professional home security camera';
const BASE_PRICE = 75;
const PRICE_STEP = 25;
const PRICE_TIER_COUNT = 6;
const SERVICE_DURATION = '1-2 hrs';
const SERVICE_RATING = '4.9 (312)';

const CATEGORY_TITLES = {
  'Security Camera Services': [
    'Camera Installation',
    'Camera Replacement',
    'Camera Relocation',
    'Camera Mounting',
    'Camera Wiring',
  ],
  'Alarm System Services': [
    'Alarm Installation',
    'Alarm Replacement',
    'Keypad Installation',
    'Sensor Installation',
    'Alarm Removal',
  ],
  'Smart Home Security': [
    'Smart Locks',
    'Smart Doorbells',
    'Smart Sensors',
    'Smart Hub Installation',
  ],
  'Smoke & Carbon Monoxide Detectors': [
    'Smoke Detector Installation',
    'Smoke Detector Replacement',
    'Carbon Monoxide Detector Installation',
    'Battery Replacement',
    'Detector Testing',
  ],
  'Video Doorbells': [
    'Ring Doorbell Installation',
    'Nest Doorbell Installation',
    'Wired Doorbell Installation',
    'Wireless Doorbell Installation',
  ],
};

const SERVICE_DESCRIPTIONS = {
  'Security Camera Services':
    'Professional security camera service with secure mounting, reliable wiring, and a carefully tested view.',
  'Alarm System Services':
    'Dependable alarm system installation and replacement configured to protect your home.',
  'Smart Home Security':
    'Connected security devices installed and configured for convenient, reliable home protection.',
  'Smoke & Carbon Monoxide Detectors':
    'Safety detector installation, replacement, and testing for dependable early warning.',
  'Video Doorbells':
    'Video doorbell installation with secure mounting, power connection, and app configuration.',
};

const toSlug = (value) => value.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');
const getServicePrice = (serviceIndex) =>
  BASE_PRICE + (serviceIndex % PRICE_TIER_COUNT) * PRICE_STEP;

const createSecurityService = (category, title, serviceIndex) => ({
  id: `${toSlug(category)}-${toSlug(title)}`,
  title,
  description: SERVICE_DESCRIPTIONS[category],
  category,
  duration: SERVICE_DURATION,
  price: getServicePrice(serviceIndex),
  rating: SERVICE_RATING,
  image: SERVICE_IMAGE,
  imageAlt: SERVICE_IMAGE_ALT,
});

export const SECURITY_SERVICES = SECURITY_CATEGORIES.flatMap((category) =>
  CATEGORY_TITLES[category].map((title, serviceIndex) =>
    createSecurityService(category, title, serviceIndex),
  ),
);
