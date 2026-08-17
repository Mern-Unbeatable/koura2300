import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const WINDOWS_ALL_CATEGORY = 'All';
export const WINDOWS_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const WINDOWS_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const WINDOWS_CATEGORIES = [
  'Window Installation & Replacement',
  'Window Repair',
  'Window Screens',
  'Window Trim & Molding',
  'Caulking & Sealing',
  'Weatherproofing',
];

export const WINDOWS_FILTER_TABS = [WINDOWS_ALL_CATEGORY, ...WINDOWS_CATEGORIES];

const CATEGORY_TITLES = {
  'Window Installation & Replacement': ['New Installation', 'Replacement', 'Removal'],
  'Window Repair': ['Frame', 'Lock', 'Handle', 'Balance'],
  'Window Screens': ['Replacement', 'Repair', 'Installation'],
  'Window Trim & Molding': ['Interior', 'Exterior', 'Casing'],
  'Caulking & Sealing': ['Window Caulking', 'Air Leak', 'Water Leak'],
  Weatherproofing: ['Draft Protection', 'Weather Stripping', 'Insulation'],
};

const SERVICE_DESCRIPTIONS = {
  'Window Installation & Replacement':
    'Professional window installation, replacement, and removal for a clean dependable fit.',
  'Window Repair': 'Practical window repair for frames, locks, handles, and balances.',
  'Window Screens': 'Window screen installation, replacement, and repair for fresh airflow.',
  'Window Trim & Molding': 'Clean interior and exterior window trim, molding, and casing work.',
  'Caulking & Sealing': 'Careful caulking and sealing to address air and water leaks around windows.',
  Weatherproofing: 'Window weatherproofing for draft protection, sealing, and insulation.',
};

export const WINDOWS_SERVICES = createServiceCatalog({
  categories: WINDOWS_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/article-winter.png',
  imageAlt: 'Professional window repair and weatherproofing work',
});
