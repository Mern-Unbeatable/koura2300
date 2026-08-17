import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const FLOORING_ALL_CATEGORY = 'All';
export const FLOORING_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const FLOORING_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const FLOORING_CATEGORIES = [
  'Hardwood Flooring',
  'Laminate Flooring',
  'Vinyl Flooring',
  'Tile Flooring',
  'Carpet Flooring',
  'Floor Repairs',
  'Trim & Baseboards',
];

export const FLOORING_FILTER_TABS = [FLOORING_ALL_CATEGORY, ...FLOORING_CATEGORIES];

const CATEGORY_TITLES = {
  'Hardwood Flooring': ['Installation', 'Replacement', 'Repairs', 'Trim Installation'],
  'Laminate Flooring': ['Installation', 'Replacement', 'Repairs'],
  'Vinyl Flooring': ['Vinyl Plank', 'Vinyl Tile', 'Repairs'],
  'Tile Flooring': ['Installation', 'Repair', 'Grouting', 'Regrouting'],
  'Carpet Flooring': ['Installation', 'Replacement', 'Stretching', 'Repairs'],
  'Floor Repairs': ['Squeaky Floors', 'Water Damage', 'Subfloor', 'Transition Strips'],
  'Trim & Baseboards': ['Baseboards', 'Shoe Molding', 'Quarter Round', 'Trim Repairs'],
};

const SERVICE_DESCRIPTIONS = {
  'Hardwood Flooring':
    'Professional hardwood flooring installation, replacement, repair, and trim finishing.',
  'Laminate Flooring': 'Reliable laminate flooring installation, replacement, and repair services.',
  'Vinyl Flooring': 'Careful vinyl plank and tile flooring installation and repair.',
  'Tile Flooring': 'Professional tile flooring installation, repair, grouting, and regrouting.',
  'Carpet Flooring': 'Dependable carpet installation, replacement, stretching, and repair.',
  'Floor Repairs':
    'Targeted floor repairs for squeaks, water damage, subfloors, and transition strips.',
  'Trim & Baseboards':
    'Clean trim and baseboard installation or repair for a polished finished floor.',
};

export const FLOORING_SERVICES = createServiceCatalog({
  categories: FLOORING_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/article-maintenance.png',
  imageAlt: 'Professional flooring installation and maintenance work',
});
