import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const APPLIANCES_ALL_CATEGORY = 'All';
export const APPLIANCES_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const APPLIANCES_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const APPLIANCES_CATEGORIES = [
  'Kitchen Appliance Installation',
  'Laundry Appliance Installation',
  'TV Mounting',
  'Smart Home Device Installation',
  'Appliance Replacement',
];

export const APPLIANCES_FILTER_TABS = [APPLIANCES_ALL_CATEGORY, ...APPLIANCES_CATEGORIES];

const CATEGORY_TITLES = {
  'Kitchen Appliance Installation': [
    'Dishwasher',
    'Microwave',
    'Oven',
    'Cooktop',
    'Range Hood',
    'Garbage Disposal',
  ],
  'Laundry Appliance Installation': ['Washer', 'Dryer', 'Stacking Kit', 'Dryer Vent'],
  'TV Mounting': ['Fixed', 'Tilt', 'Full Motion', 'Cable Concealment'],
  'Smart Home Device Installation': ['Thermostats', 'Displays', 'Speakers', 'Hubs'],
  'Appliance Replacement': ['Remove Old', 'Install New', 'Leveling', 'Testing'],
};

const SERVICE_DESCRIPTIONS = {
  'Kitchen Appliance Installation':
    'Professional kitchen appliance installation with careful placement, secure connections, and testing.',
  'Laundry Appliance Installation':
    'Reliable washer and dryer installation, setup, ventilation, and stacking support.',
  'TV Mounting':
    'Secure TV mounting with careful placement, clean alignment, and cable management.',
  'Smart Home Device Installation':
    'Smart-home device installation and configuration for convenient everyday control.',
  'Appliance Replacement':
    'Appliance replacement including removal, installation, leveling, and operational testing.',
};

export const APPLIANCES_SERVICES = createServiceCatalog({
  categories: APPLIANCES_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/service-electrical.png',
  imageAlt: 'Professional household appliance installation',
});
