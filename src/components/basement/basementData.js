import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const BASEMENT_ALL_CATEGORY = 'All';
export const BASEMENT_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const BASEMENT_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const BASEMENT_CATEGORIES = [
  'Sump Pump Services',
  'Basement Plumbing',
  'Waterproofing',
  'Weatherproofing',
  'Pest Proofing',
  'General Basement Repairs',
];

export const BASEMENT_FILTER_TABS = [BASEMENT_ALL_CATEGORY, ...BASEMENT_CATEGORIES];

const CATEGORY_TITLES = {
  'Sump Pump Services': [
    'Installation',
    'Replacement',
    'Maintenance',
    'Battery Backup Installation',
  ],
  'Basement Plumbing': [
    'Pipe Repairs',
    'Leak Repairs',
    'Utility Sink Installation',
    'Drain Repairs',
  ],
  Waterproofing: ['Crack Sealing', 'Moisture Protection', 'Waterproof Coating'],
  Weatherproofing: ['Draft Sealing', 'Window Sealing', 'Door Sealing'],
  'Pest Proofing': ['Entry Point Sealing', 'Vent Covers', 'Foundation Gap Sealing'],
  'General Basement Repairs': [
    'Wall Repairs',
    'Ceiling Repairs',
    'Storage Installation',
    'Miscellaneous Repairs',
  ],
};

const SERVICE_DESCRIPTIONS = {
  'Sump Pump Services':
    'Reliable sump pump installation, replacement, and maintenance to keep basements dry.',
  'Basement Plumbing':
    'Professional basement plumbing repairs for pipes, drains, leaks, and utility sinks.',
  Waterproofing: 'Targeted waterproofing that seals cracks and protects against moisture intrusion.',
  Weatherproofing:
    'Effective weatherproofing that seals drafts around basement windows and doors.',
  'Pest Proofing':
    'Careful sealing of entry points, vents, and foundation gaps to keep pests out.',
  'General Basement Repairs':
    'Practical basement repairs for walls, ceilings, storage, and everyday structural needs.',
};

export const BASEMENT_SERVICES = createServiceCatalog({
  categories: BASEMENT_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/article-winter.png',
  imageAlt: 'Professional basement inspection and utility space work',
});
