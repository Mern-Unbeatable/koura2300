import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const DOORS_ALL_CATEGORY = 'All';
export const DOORS_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const DOORS_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const DOORS_CATEGORIES = [
  'Interior Door Services',
  'Exterior Door Services',
  'Front Door Services',
  'Door Hardware',
  'Door Trim & Molding',
  'Screen Doors',
  'Weatherproofing',
];

export const DOORS_FILTER_TABS = [DOORS_ALL_CATEGORY, ...DOORS_CATEGORIES];

const CATEGORY_TITLES = {
  'Interior Door Services': ['Installation', 'Replacement', 'Repair', 'Adjustment'],
  'Exterior Door Services': ['Entry Door', 'Storm Door', 'Repair', 'Weatherproofing'],
  'Front Door Services': ['Replacement', 'Hardware', 'Threshold'],
  'Door Hardware': ['Locks', 'Deadbolts', 'Handles', 'Hinges', 'Closers'],
  'Door Trim & Molding': ['Trim', 'Casing', 'Threshold'],
  'Screen Doors': ['Installation', 'Repair', 'Sliding Repair'],
  Weatherproofing: ['Weather Stripping', 'Door Sweeps', 'Draft Sealing'],
};

const SERVICE_DESCRIPTIONS = {
  'Interior Door Services':
    'Professional interior door installation, replacement, repair, and adjustment for smooth operation.',
  'Exterior Door Services':
    'Reliable exterior door work for entry doors, storm doors, repairs, and weatherproofing.',
  'Front Door Services':
    'Careful front door replacement and hardware work, including thresholds for a secure finish.',
  'Door Hardware':
    'Precise door hardware installation and replacement for locks, handles, hinges, and closers.',
  'Door Trim & Molding':
    'Clean door trim, casing, and threshold work for a polished finished look.',
  'Screen Doors':
    'Screen door installation and repair, including sliding screen adjustments.',
  Weatherproofing:
    'Door weatherproofing with stripping, sweeps, and draft sealing for better comfort and efficiency.',
};

export const DOORS_SERVICES = createServiceCatalog({
  categories: DOORS_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/category-security.png',
  imageAlt: 'Professional door installation and hardware work',
});
