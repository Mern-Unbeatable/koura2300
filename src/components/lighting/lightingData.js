export const LIGHTING_ASSET_PATH = '/assets/lighting';
export const LIGHTING_PAGE_SIZE = 20;

export const LIGHTING_ALL_CATEGORY = 'All';

export const LIGHTING_CATEGORIES = [
  'Indoor Lighting',
  'Outdoor Lighting',
  'Light Fixture Services',
  'Outlet & Switch Services',
  'Smart Lighting',
  'Lighting Repairs',
];

export const LIGHTING_FILTER_TABS = [LIGHTING_ALL_CATEGORY, ...LIGHTING_CATEGORIES];

export const LIGHTING_PRICE_RANGES = [
  { value: 'any', label: 'Any price', minimum: 0, maximum: Number.POSITIVE_INFINITY },
  { value: '0-99', label: 'Under $100', minimum: 0, maximum: 99 },
  { value: '100-200', label: '$100-$200', minimum: 100, maximum: 200 },
  { value: '201-300', label: '$201-$300', minimum: 201, maximum: 300 },
];

const SERVICE_IMAGE = `${LIGHTING_ASSET_PATH}/lighting-service.png`;
const SERVICE_IMAGE_ALT = 'Chrome lighting fixture above a white sink';
const BASE_PRICE = 75;
const PRICE_STEP = 25;
const PRICE_TIER_COUNT = 6;
const SERVICE_DURATION = '1–2 hrs';
const SERVICE_RATING = '4.9 (312)';

const CATEGORY_TITLES = {
  'Indoor Lighting': [
    'Ceiling Light Installation',
    'Chandelier Installation',
    'Pendant Light Installation',
    'Recessed Lighting',
    'Flush Mount Lights',
    'Wall Sconces',
    'Track Lighting',
    'LED Light Upgrades',
  ],
  'Outdoor Lighting': [
    'Porch Lights',
    'Flood Lights',
    'Motion Sensor Lights',
    'Landscape Lighting',
    'Pathway Lights',
    'Deck Lighting',
    'Garage Exterior Lights',
  ],
  'Light Fixture Services': [
    'Fixture Installation',
    'Fixture Replacement',
    'Fixture Relocation',
    'Fixture Repair',
    'Ceiling Fan with Light Installation',
  ],
  'Outlet & Switch Services': [
    'Outlet Replacement',
    'New Outlet Installation',
    'GFCI Outlet Installation',
    'USB Outlet Installation',
    'Switch Replacement',
    'Dimmer Switch Installation',
    'Smart Switch Installation',
  ],
  'Smart Lighting': [
    'Smart Bulb Installation',
    'Smart Switch Installation',
    'Smart Lighting Setup',
    'Motion Sensors',
    'Timer Installation',
  ],
  'Lighting Repairs': [
    'Flickering Lights',
    'Non-Working Fixtures',
    'Loose Fixtures',
    'Bulb Socket Repair',
    'Wiring Repairs',
  ],
};

const SERVICE_DESCRIPTIONS = {
  'Indoor Lighting':
    'Professional indoor lighting installation and replacement with safe wiring and secure fixture mounting.',
  'Outdoor Lighting':
    'Weather-resistant outdoor lighting installed for dependable security, visibility, and curb appeal.',
  'Light Fixture Services':
    'Careful fixture service with secure mounting, tested connections, and a clean finished installation.',
  'Outlet & Switch Services':
    'Safe outlet and switch service that improves lighting control and resolves unreliable connections.',
  'Smart Lighting':
    'Connected lighting configured for convenient schedules, scenes, mobile access, and voice control.',
  'Lighting Repairs':
    'Thorough lighting diagnosis and repair to restore reliable operation and improve electrical safety.',
};

const toSlug = (value) => value.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');

// A few services are offered under more than one category, so the category is
// part of the id to keep cart entries and React keys unique.
const buildServiceId = (category, title) => `${toSlug(category)}-${toSlug(title)}`;

const getServicePrice = (serviceIndex) =>
  BASE_PRICE + (serviceIndex % PRICE_TIER_COUNT) * PRICE_STEP;

const createLightingService = (category, title, serviceIndex) => ({
  id: buildServiceId(category, title),
  title,
  description: SERVICE_DESCRIPTIONS[category],
  category,
  duration: SERVICE_DURATION,
  price: getServicePrice(serviceIndex),
  rating: SERVICE_RATING,
  image: SERVICE_IMAGE,
  imageAlt: SERVICE_IMAGE_ALT,
});

export const LIGHTING_SERVICES = LIGHTING_CATEGORIES.flatMap((category) =>
  CATEGORY_TITLES[category].map((title, serviceIndex) =>
    createLightingService(category, title, serviceIndex),
  ),
);
