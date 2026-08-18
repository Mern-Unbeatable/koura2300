import {
  createServiceCatalog,
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_PRICE_RANGES,
} from '../catalog/catalogData';

export const BATHROOM_ALL_CATEGORY = 'All';
export const BATHROOM_PAGE_SIZE = DEFAULT_CATALOG_PAGE_SIZE;
export const BATHROOM_PRICE_RANGES = DEFAULT_CATALOG_PRICE_RANGES;

export const BATHROOM_CATEGORIES = [
  'Toilet Services',
  'Bidet Installation & Services',
  'Vanity Services',
  'Sink & Faucet Services',
  'Shower & Bathtub Services',
  'Tile & Grout Services',
  'Plumbing Repairs',
  'Electrical Services',
  'Lighting Installation',
  'Ventilation Services',
  'Mirror & Accessory Installation',
  'Caulking & Waterproofing',
  'General Bathroom Repairs',
];

export const BATHROOM_FILTER_TABS = [BATHROOM_ALL_CATEGORY, ...BATHROOM_CATEGORIES];

const CATEGORY_TITLES = {
  'Toilet Services': [
    'Installation',
    'Replacement',
    'Repair',
    'Wax Ring',
    'Flange',
    'Fill Valve',
    'Flush Valve',
    'Handle',
    'Seat',
  ],
  'Bidet Installation & Services': [
    'Bidet Seat',
    'Electric',
    'Non-Electric',
    'Standalone',
    'Water Line',
    'Replacement',
  ],
  'Vanity Services': ['Installation', 'Replacement', 'Repair', 'Vanity Top', 'Hardware'],
  'Sink & Faucet Services': [
    'Sink Installation',
    'Sink Replacement',
    'Sink Repair',
    'Faucet Installation',
    'Faucet Replacement',
    'Faucet Repair',
    'Drain',
    'Pop-Up Drain',
  ],
  'Shower & Bathtub Services': [
    'Shower Head',
    'Handheld',
    'Shower Door',
    'Door Repair',
    'Valve',
    'Tub Faucet',
    'Bathtub',
    'Tub Repair',
    'Drain',
  ],
  'Tile & Grout Services': [
    'Wall Tile',
    'Floor Tile',
    'Tile Repair',
    'Replacement',
    'Grouting',
    'Regrouting',
    'Sealing',
  ],
  'Plumbing Repairs': [
    'Pipe Leak',
    'Drain',
    'P-Trap',
    'Water Supply Line',
    'Shut-Off Valve',
    'Shower Drain',
  ],
  'Electrical Services': [
    'GFCI',
    'Outlet',
    'Light Switch',
    'Exhaust Fan Wiring',
    'Heated Mirror Wiring',
  ],
  'Lighting Installation': ['Vanity', 'Ceiling', 'Recessed', 'LED Mirror'],
  'Ventilation Services': [
    'Exhaust Fan Installation',
    'Replacement',
    'Repair',
    'Vent Cover',
  ],
  'Mirror & Accessory Installation': [
    'Mirror',
    'Medicine Cabinet',
    'Towel Bar',
    'Toilet Paper Holder',
    'Robe Hook',
    'Grab Bar',
    'Floating Shelf',
  ],
  'Caulking & Waterproofing': [
    'Bathtub',
    'Shower',
    'Sink',
    'Waterproof Sealing',
    'Silicone Replacement',
  ],
  'General Bathroom Repairs': [
    'Drywall',
    'Minor Painting',
    'Trim',
    'Hardware',
    'Door',
    'Shelving',
    'General Repairs',
  ],
};

const SERVICE_DESCRIPTIONS = {
  'Toilet Services':
    'Professional toilet installation, replacement, and repair, including wax rings, flanges, and valves.',
  'Bidet Installation & Services':
    'Reliable bidet seat and standalone bidet installation, water-line setup, and replacement.',
  'Vanity Services':
    'Careful vanity installation, replacement, repair, tops, and hardware for a finished bathroom.',
  'Sink & Faucet Services':
    'Bathroom sink and faucet installation, replacement, repair, drains, and pop-up assemblies.',
  'Shower & Bathtub Services':
    'Shower and bathtub service for heads, doors, valves, tubs, drains, and everyday repairs.',
  'Tile & Grout Services':
    'Clean wall and floor tile installation, repair, replacement, grouting, and sealing.',
  'Plumbing Repairs':
    'Targeted bathroom plumbing repairs for leaks, drains, traps, supply lines, and valves.',
  'Electrical Services':
    'Safe bathroom electrical work for GFCI outlets, switches, exhaust fans, and heated mirrors.',
  'Lighting Installation':
    'Bathroom lighting installation for vanity, ceiling, recessed, and LED mirror fixtures.',
  'Ventilation Services':
    'Bathroom exhaust fan installation, replacement, repair, and vent-cover service.',
  'Mirror & Accessory Installation':
    'Secure installation of mirrors, cabinets, bars, hooks, grab bars, and floating shelves.',
  'Caulking & Waterproofing':
    'Careful bathroom caulking and waterproofing for tubs, showers, sinks, and silicone replacement.',
  'General Bathroom Repairs':
    'Practical bathroom repairs for drywall, painting, trim, hardware, doors, and shelving.',
};

export const BATHROOM_SERVICES = createServiceCatalog({
  categories: BATHROOM_CATEGORIES,
  titlesByCategory: CATEGORY_TITLES,
  descriptionsByCategory: SERVICE_DESCRIPTIONS,
  image: '/assets/landing/service-faucet.png',
  imageAlt: 'Professional bathroom faucet and fixture installation',
});
