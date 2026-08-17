import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const FENCE_ALL_CATEGORY = 'All';
export const FENCE_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const FENCE_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const FENCE_CATEGORIES = [
  'Fence Installation',
  'Fence Repair',
  'Fence Gate Services',
  'Fence Staining & Painting',
  'Fence Maintenance',
];

export const FENCE_FILTER_TABS = [FENCE_ALL_CATEGORY, ...FENCE_CATEGORIES];

const CATEGORY_TITLES = {
  'Fence Installation': [
    'Wood Fence',
    'Vinyl Fence',
    'Metal Fence',
    'Privacy Fence',
    'Decorative Fence',
  ],
  'Fence Repair': [
    'Broken Panels',
    'Leaning Fence',
    'Post Repair',
    'Fence Straightening',
  ],
  'Fence Gate Services': [
    'Gate Installation',
    'Gate Repair',
    'Latch Replacement',
    'Hinge Replacement',
    'Gate Alignment',
  ],
  'Fence Staining & Painting': ['Staining', 'Painting', 'Sealing', 'Power Washing'],
  'Fence Maintenance': [
    'Cleaning',
    'Hardware Tightening',
    'Rot Repair',
    'Preventive Maintenance',
  ],
};

const SERVICE_DESCRIPTIONS = {
  'Fence Installation':
    'Professional fence installation built for durability, privacy, and a clean finished look.',
  'Fence Repair':
    'Reliable fence repair that restores panels, posts, and alignment for lasting stability.',
  'Fence Gate Services':
    'Precise gate installation and repair for smooth operation, secure latches, and proper alignment.',
  'Fence Staining & Painting':
    'Protective staining, painting, sealing, and washing that refresh and preserve fence surfaces.',
  'Fence Maintenance':
    'Practical fence maintenance that keeps hardware tight, wood sound, and future repairs minimal.',
};

export const FENCE_SERVICES = createServiceCatalog({
  categories: FENCE_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/article-repairs.png',
  imageAlt: 'Professional fence and outdoor repair work',
});
