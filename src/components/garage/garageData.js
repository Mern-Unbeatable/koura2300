import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const GARAGE_ALL_CATEGORY = 'All';
export const GARAGE_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const GARAGE_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const GARAGE_CATEGORIES = [
  'Garage Door Services',
  'Garage Storage & Shelving',
  'Garage Electrical Services',
  'Garage Organization',
  'General Garage Repairs',
];

export const GARAGE_FILTER_TABS = [GARAGE_ALL_CATEGORY, ...GARAGE_CATEGORIES];

const CATEGORY_TITLES = {
  'Garage Door Services': [
    'Weather Stripping',
    'Bottom Seal',
    'Handle Replacement',
    'Lock Installation',
  ],
  'Garage Storage & Shelving': ['Wall Shelves', 'Overhead Storage', 'Cabinets', 'Pegboards'],
  'Garage Electrical Services': ['Outlet Installation', 'Lighting', 'Ceiling Outlet', 'GFCI'],
  'Garage Organization': ['Tool Storage', 'Bike Storage', 'Hooks', 'Wall Systems'],
  'General Garage Repairs': ['Drywall', 'Trim', 'Door Repairs', 'Miscellaneous'],
};

const SERVICE_DESCRIPTIONS = {
  'Garage Door Services':
    'Professional garage door service for seals, handles, locks, and everyday door hardware.',
  'Garage Storage & Shelving':
    'Durable garage shelving and storage installed to free up floor space and stay organized.',
  'Garage Electrical Services':
    'Safe garage electrical work for outlets, lighting, ceiling power, and GFCI protection.',
  'Garage Organization':
    'Practical garage organization systems for tools, bikes, hooks, and wall storage.',
  'General Garage Repairs':
    'Reliable garage repairs for drywall, trim, doors, and miscellaneous finishing needs.',
};

export const GARAGE_SERVICES = createServiceCatalog({
  categories: GARAGE_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/article-routine.png',
  imageAlt: 'Professional garage maintenance and organization work',
});
