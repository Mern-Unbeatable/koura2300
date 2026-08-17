import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const DECK_ALL_CATEGORY = 'All';
export const DECK_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const DECK_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const DECK_CATEGORIES = [
  'Deck Repair',
  'Deck Staining & Sealing',
  'Deck Railing Services',
  'Deck Maintenance',
  'Deck Upgrades',
];

export const DECK_FILTER_TABS = [DECK_ALL_CATEGORY, ...DECK_CATEGORIES];

const CATEGORY_TITLES = {
  'Deck Repair': [
    'Board Replacement',
    'Structural Repairs',
    'Step Repairs',
    'Deck Reinforcement',
  ],
  'Deck Staining & Sealing': ['Staining', 'Sealing', 'Cleaning', 'Power Washing'],
  'Deck Railing Services': [
    'Railing Installation',
    'Railing Repair',
    'Baluster Replacement',
    'Handrail Installation',
  ],
  'Deck Maintenance': [
    'Inspection',
    'Fastener Tightening',
    'Surface Cleaning',
    'Seasonal Maintenance',
  ],
  'Deck Upgrades': [
    'Bench Installation',
    'Privacy Screens',
    'Deck Lighting',
    'Decorative Features',
  ],
};

const SERVICE_DESCRIPTIONS = {
  'Deck Repair':
    'Professional deck repair that restores boards, steps, and structure for safe everyday use.',
  'Deck Staining & Sealing':
    'Protective staining, sealing, cleaning, and washing that refresh and preserve deck surfaces.',
  'Deck Railing Services':
    'Secure railing installation and repair for safer, better-finished outdoor living spaces.',
  'Deck Maintenance':
    'Seasonal deck maintenance that keeps fasteners tight, surfaces clean, and problems caught early.',
  'Deck Upgrades':
    'Practical deck upgrades that add seating, privacy, lighting, and decorative finishing details.',
};

export const DECK_SERVICES = createServiceCatalog({
  categories: DECK_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/article-maintenance.png',
  imageAlt: 'Professional deck maintenance and outdoor surface work',
});
