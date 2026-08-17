import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const GARDEN_ALL_CATEGORY = 'All';
export const GARDEN_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const GARDEN_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const GARDEN_CATEGORIES = [
  'Tree & Shrub Planting',
  'Garden Maintenance',
  'Mulching',
  'Landscape Improvements',
  'Walkway & Paver Repairs',
  'Playground Assembly',
];

export const GARDEN_FILTER_TABS = [GARDEN_ALL_CATEGORY, ...GARDEN_CATEGORIES];

const CATEGORY_TITLES = {
  'Tree & Shrub Planting': ['Tree Planting', 'Shrub Planting', 'Bush Removal'],
  'Garden Maintenance': ['Weeding', 'Trimming', 'Cleanup', 'Edging'],
  Mulching: ['Mulch Installation', 'Mulch Replacement'],
  'Landscape Improvements': ['Decorative Stone', 'Garden Borders', 'Raised Beds'],
  'Walkway & Paver Repairs': ['Paver Replacement', 'Leveling', 'Joint Sand', 'Brick Repair'],
  'Playground Assembly': ['Swing Sets', 'Playhouses', 'Slides', 'Outdoor Toys'],
};

const SERVICE_DESCRIPTIONS = {
  'Tree & Shrub Planting':
    'Careful tree and shrub planting or removal that keeps outdoor spaces healthy and balanced.',
  'Garden Maintenance':
    'Routine garden maintenance for weeding, trimming, cleanup, and clean finished edging.',
  Mulching: 'Fresh mulch installation and replacement that protects beds and improves curb appeal.',
  'Landscape Improvements':
    'Practical landscape upgrades with decorative stone, borders, and raised planting beds.',
  'Walkway & Paver Repairs':
    'Reliable walkway and paver repairs that restore level surfaces and secure joints.',
  'Playground Assembly':
    'Safe outdoor playground assembly for swing sets, playhouses, slides, and toys.',
};

export const GARDEN_SERVICES = createServiceCatalog({
  categories: GARDEN_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/article-maintenance.png',
  imageAlt: 'Professional garden and outdoor landscape maintenance',
});
