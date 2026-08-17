import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const CLOSETS_ALL_CATEGORY = 'All';
export const CLOSETS_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const CLOSETS_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const CLOSETS_CATEGORIES = [
  'Closet Door Services',
  'Closet Shelving',
  'Closet Organization',
  'Closet Lighting',
  'Closet Repairs',
];

export const CLOSETS_FILTER_TABS = [CLOSETS_ALL_CATEGORY, ...CLOSETS_CATEGORIES];

const CATEGORY_TITLES = {
  'Closet Door Services': [
    'Sliding Door Repair',
    'Bifold Door Repair',
    'Door Installation',
    'Door Replacement',
    'Track Repair',
  ],
  'Closet Shelving': [
    'Shelf Installation',
    'Shelf Replacement',
    'Wire Shelving',
    'Wood Shelving',
    'Adjustable Shelving',
  ],
  'Closet Organization': [
    'Storage Systems',
    'Hanging Rod Installation',
    'Shoe Racks',
    'Drawer Installation',
    'Storage Accessories',
  ],
  'Closet Lighting': ['LED Lighting', 'Motion Lights', 'Battery Lights', 'Smart Lighting'],
  'Closet Repairs': [
    'Wall Patching',
    'Hardware Replacement',
    'Trim Repair',
    'General Repairs',
  ],
};

const SERVICE_DESCRIPTIONS = {
  'Closet Door Services':
    'Professional closet door installation and repair for smooth, dependable operation.',
  'Closet Shelving':
    'Durable closet shelving installed or replaced to make better use of available storage.',
  'Closet Organization':
    'Practical closet organization systems designed to keep clothing and accessories accessible.',
  'Closet Lighting':
    'Efficient closet lighting installed for clear visibility and convenient everyday use.',
  'Closet Repairs':
    'Careful closet repairs that restore walls, trim, hardware, and general functionality.',
};

export const CLOSETS_SERVICES = createServiceCatalog({
  categories: CLOSETS_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/category-closets.png',
  imageAlt: 'Organized walk-in closet with shelving',
});
