export const LIGHTING_ASSET_PATH = '/assets/lighting';
export const LIGHTING_PAGE_SIZE = 20;

export const LIGHTING_CATEGORIES = [
  'Indoor Lighting',
  'Outdoor Lighting',
  'Light Fixture Services',
  'Outlet & Switch Services',
  'Smart Lighting',
  'Lighting Repairs',
];

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
    'Under Cabinet Lighting',
    'Vanity Light Installation',
    'Cove Lighting',
    'Task Lighting',
    'Accent Lighting',
    'Staircase Lighting',
    'Closet Lighting',
    'Kitchen Lighting',
    'Bathroom Lighting',
    'Bedroom Lighting',
    'Living Room Lighting',
    'Dining Room Lighting',
    'Reading Light Installation',
    'Ceiling Fan Light Kits',
    'Dimmer-Compatible Fixtures',
    'Picture Lights',
    'Mirror Lighting',
    'Laundry Room Lighting',
    'Home Office Lighting',
    'Nursery Lighting',
    'Hallway Lighting',
    'Entryway Lighting',
    'Basement Lighting',
    'Attic Lighting',
    'Workshop Lighting',
    'Utility Room Lighting',
    'Cabinet Display Lighting',
    'Shelf Lighting',
    'Decorative Lighting',
    'Energy-Efficient Lighting',
    'Light Fixture Replacement',
    'Room Lighting Consultation',
  ],
  'Outdoor Lighting': [
    'Flood Light Installation',
    'Landscape Lighting',
    'Pathway Lights',
    'Deck Lighting',
    'Garage Exterior Lights',
  ],
  'Light Fixture Services': [
    'Fixture Installation',
    'Fixture Replacement',
    'Fixture Assembly',
    'Fixture Relocation',
    'Fixture Safety Inspection',
  ],
  'Outlet & Switch Services': [
    'Light Switch Replacement',
    'Dimmer Switch Installation',
    'Lighting Outlet Installation',
    'Three-Way Switch Installation',
    'Faulty Switch Repair',
  ],
  'Smart Lighting': [
    'Smart Bulb Setup',
    'Smart Switch Installation',
    'Voice-Controlled Lighting',
    'Automated Lighting Scenes',
    'Smart Lighting Consultation',
  ],
  'Lighting Repairs': [
    'Flickering Light Repair',
    'Faulty Fixture Repair',
    'Lighting Circuit Diagnosis',
    'Loose Connection Repair',
    'Lighting Safety Check',
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

const normalizeServiceId = (title) => title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');

const getServicePrice = (serviceIndex) =>
  BASE_PRICE + (serviceIndex % PRICE_TIER_COUNT) * PRICE_STEP;

const createLightingService = (category, title, serviceIndex) => ({
  id: normalizeServiceId(title),
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
