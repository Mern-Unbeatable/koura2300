import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const WALLS_CEILINGS_ALL_CATEGORY = 'All';
export const WALLS_CEILINGS_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const WALLS_CEILINGS_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const WALLS_CEILINGS_CATEGORIES = [
  'Painting',
  'Drywall Services',
  'Insulation',
  'Framing',
  'Trim & Molding',
  'Ceiling Repairs',
  'Wall Repairs',
];

export const WALLS_CEILINGS_FILTER_TABS = [
  WALLS_CEILINGS_ALL_CATEGORY,
  ...WALLS_CEILINGS_CATEGORIES,
];

const CATEGORY_TITLES = {
  Painting: ['Interior', 'Accent Walls', 'Touch-Ups', 'Trim', 'Ceiling'],
  'Drywall Services': ['Installation', 'Hole Repair', 'Crack Repair', 'Patching', 'Finishing'],
  Insulation: ['Wall', 'Attic Access', 'Garage'],
  Framing: ['Non-Load-Bearing Walls', 'Door', 'Window', 'Blocking'],
  'Trim & Molding': ['Crown', 'Baseboards', 'Chair Rail', 'Picture Frame', 'Door & Window Casing'],
  'Ceiling Repairs': ['Drywall', 'Water Damage', 'Popcorn Removal', 'Texture Matching'],
  'Wall Repairs': ['Hole', 'Crack', 'Water Damage', 'Texture', 'Patch & Paint'],
};

const SERVICE_DESCRIPTIONS = {
  Painting: 'Professional interior painting for walls, ceilings, trim, accents, and touch-ups.',
  'Drywall Services':
    'Reliable drywall installation, hole and crack repair, patching, and finishing.',
  Insulation: 'Practical insulation work for walls, attic access points, and garage spaces.',
  Framing: 'Non-load-bearing framing for walls, doors, windows, and blocking.',
  'Trim & Molding':
    'Clean trim and molding installation for crown, baseboards, chair rail, and casing.',
  'Ceiling Repairs':
    'Careful ceiling repairs for drywall, water damage, popcorn removal, and texture matching.',
  'Wall Repairs':
    'Targeted wall repairs for holes, cracks, water damage, texture, and patch-and-paint work.',
};

export const WALLS_CEILINGS_SERVICES = createServiceCatalog({
  categories: WALLS_CEILINGS_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/service-electrical.png',
  imageAlt: 'Professional interior wall and ceiling repair work',
});
