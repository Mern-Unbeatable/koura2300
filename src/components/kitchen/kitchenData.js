import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const KITCHEN_ALL_CATEGORY = 'All';
export const KITCHEN_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const KITCHEN_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const KITCHEN_CATEGORIES = [
  'Sink Services',
  'Faucet Services',
  'Cabinet Services',
  'Countertop Services',
  'Backsplash & Tile Services',
  'Appliance Installation',
  'Plumbing Repairs',
  'Electrical Services',
  'Lighting Installation',
  'Caulking & Sealing',
  'General Kitchen Repairs',
];

export const KITCHEN_FILTER_TABS = [KITCHEN_ALL_CATEGORY, ...KITCHEN_CATEGORIES];

const CATEGORY_TITLES = {
  'Sink Services': [
    'Installation',
    'Replacement',
    'Repair',
    'Undermount',
    'Drop-In',
    'Farmhouse',
    'Drain',
    'Leak Repair',
  ],
  'Faucet Services': [
    'Installation',
    'Replacement',
    'Repair',
    'Touchless',
    'Sprayer',
    'Water Filter',
    'Leak Repair',
  ],
  'Cabinet Services': [
    'Installation',
    'Replacement',
    'Repair',
    'Door Replacement',
    'Door Adjustment',
    'Soft-Close Hinges',
    'Drawer Repair',
    'Drawer Slides',
    'Handles & Knobs',
    'Shelving',
    'Cabinet Crown Molding',
    'Under-Cabinet Lighting',
  ],
  'Countertop Services': [
    'Installation',
    'Replacement',
    'Repair',
    'Butcher Block',
    'Laminate',
    'Caulking',
  ],
  'Backsplash & Tile Services': [
    'Installation',
    'Replacement',
    'Tile Repair',
    'Tile Replacement',
    'Grouting',
    'Regrouting',
    'Sealing',
  ],
  'Appliance Installation': [
    'Dishwasher',
    'Microwave',
    'OTR Microwave',
    'Oven',
    'Cooktop',
    'Range Hood',
    'Garbage Disposal',
    'Refrigerator Water Line',
    'Ice Maker Line',
  ],
  'Plumbing Repairs': [
    'Pipe Leak',
    'Drain',
    'P-Trap',
    'Water Supply Line',
    'Shut-Off Valve',
    'Garbage Disposal Repair',
  ],
  'Electrical Services': [
    'Outlet',
    'Outlet Replacement',
    'GFCI',
    'USB Outlet',
    'Dedicated Appliance Outlet',
    'Light Switch',
  ],
  'Lighting Installation': ['Ceiling', 'Pendant', 'Recessed', 'Under-Cabinet', 'LED'],
  'Caulking & Sealing': ['Sink', 'Countertop', 'Backsplash', 'Window'],
  'General Kitchen Repairs': [
    'Trim',
    'Drywall',
    'Minor Painting',
    'Hardware',
    'Shelving',
    'General Repairs',
  ],
};

const SERVICE_DESCRIPTIONS = {
  'Sink Services':
    'Professional kitchen sink installation and repair, including drains, mounts, and leak resolution.',
  'Faucet Services':
    'Reliable faucet installation, replacement, repair, filtration, and leak service.',
  'Cabinet Services':
    'Careful cabinet installation, repair, hardware, drawers, shelving, and finishing work.',
  'Countertop Services':
    'Professional countertop installation, replacement, repair, caulking, and material service.',
  'Backsplash & Tile Services':
    'Clean backsplash and tile installation, repair, replacement, grouting, and sealing.',
  'Appliance Installation':
    'Safe kitchen appliance installation with precise placement, connections, and testing.',
  'Plumbing Repairs':
    'Targeted kitchen plumbing repairs for pipes, drains, traps, supply lines, and valves.',
  'Electrical Services':
    'Safe kitchen electrical service for outlets, GFCI protection, appliance circuits, and switches.',
  'Lighting Installation':
    'Kitchen lighting installation for ceiling, pendant, recessed, under-cabinet, and LED fixtures.',
  'Caulking & Sealing':
    'Careful kitchen caulking and sealing for sinks, countertops, backsplashes, and windows.',
  'General Kitchen Repairs':
    'Practical kitchen repairs for trim, drywall, painting, hardware, shelving, and general needs.',
};

export const KITCHEN_SERVICES = createServiceCatalog({
  categories: KITCHEN_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/service-electrical.png',
  imageAlt: 'Professional kitchen installation and repair work',
});
