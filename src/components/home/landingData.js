import { Armchair, Droplets, Hammer, LampCeiling, ShieldCheck, Wrench, Zap } from 'lucide-react';

export const LANDING_ASSET_PATH = '/assets/landing';

export const SOLUTION_IMAGES = {
  cleaning: {
    webp: `${LANDING_ASSET_PATH}/solution-cleaning.webp`,
    png: `${LANDING_ASSET_PATH}/solution-cleaning.png`,
    width: 511,
    height: 495,
  },
  laundry: {
    webp: `${LANDING_ASSET_PATH}/solution-laundry.webp`,
    png: `${LANDING_ASSET_PATH}/solution-laundry.png`,
    width: 350,
    height: 288,
  },
};

export const CATEGORY_ITEMS = [
  {
    id: 'lighting',
    title: 'Lighting',
    image: `${LANDING_ASSET_PATH}/category-lighting.png`,
    imageAlt: 'Warm pendant lights hanging in a modern interior',
  },
  {
    id: 'security',
    title: 'Security',
    image: `${LANDING_ASSET_PATH}/category-security.png`,
    imageAlt: 'Classic wooden front doors on a residential building',
  },
  {
    id: 'closets',
    title: 'Closets',
    image: `${LANDING_ASSET_PATH}/category-closets.png`,
    imageAlt: 'A tidy modern walk-in closet with empty hangers',
  },
  {
    id: 'fence',
    title: 'Fence',
    image: `${LANDING_ASSET_PATH}/article-repairs.png`,
    imageAlt: 'A professional completing a home repair',
  },
  {
    id: 'deck',
    title: 'Deck',
    image: `${LANDING_ASSET_PATH}/article-maintenance.png`,
    imageAlt: 'A professional maintaining a home surface',
  },
  {
    id: 'basement',
    title: 'Basement',
    image: `${LANDING_ASSET_PATH}/article-winter.png`,
    imageAlt: 'A professional inspecting a home utility space',
  },
  {
    id: 'appliances',
    title: 'Appliances',
    image: `${LANDING_ASSET_PATH}/service-electrical.png`,
    imageAlt: 'A professional repairing a household appliance connection',
  },
  {
    id: 'garage',
    title: 'Garage',
    image: `${LANDING_ASSET_PATH}/article-routine.png`,
    imageAlt: 'A professional performing routine home maintenance',
  },
  {
    id: 'garden',
    title: 'Garden',
    image: `${LANDING_ASSET_PATH}/article-maintenance.png`,
    imageAlt: 'A professional maintaining an outdoor home area',
  },
  {
    id: 'flooring',
    title: 'Flooring',
    image: `${LANDING_ASSET_PATH}/article-repairs.png`,
    imageAlt: 'A professional completing an interior surface repair',
  },
  {
    id: 'windows',
    title: 'Windows',
    image: `${LANDING_ASSET_PATH}/solution-cleaning.png`,
    imageAlt: 'A professional cleaning a home interior',
  },
  {
    id: 'doors',
    title: 'Doors',
    image: `${LANDING_ASSET_PATH}/category-security.png`,
    imageAlt: 'A modern secured exterior door',
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    image: `${LANDING_ASSET_PATH}/solution-cleaning.png`,
    imageAlt: 'A kitchen cleaning service in progress',
  },
  {
    id: 'bathroom',
    title: 'Bathroom',
    image: `${LANDING_ASSET_PATH}/service-faucet.png`,
    imageAlt: 'A professional fitting a bathroom faucet',
  },
  {
    id: 'walls-ceilings',
    title: 'Walls & Ceilings',
    image: `${LANDING_ASSET_PATH}/service-electrical.png`,
    imageAlt: 'A professional working on an interior wall',
  },
];

export const HEADER_CATEGORIES = CATEGORY_ITEMS.map(({ title }) => title);

export const SERVICE_ITEMS = [
  {
    id: 'faucet-repair',
    category: 'Plumbing',
    title: 'Faucet Repair & Replacement',
    description:
      'Expert faucet repair or full replacement for kitchen and bathroom fixtures.',
    duration: '1–2 hrs',
    imageAlt: 'A professional repairing a kitchen faucet',
    image: `${LANDING_ASSET_PATH}/service-faucet.png`,
    price: 75,
    rating: '4.9 (312)',
  },
  {
    id: 'drain-cleaning',
    category: 'Plumbing',
    title: 'Drain Cleaning',
    description:
      'Professional drain cleaning to clear clogs in sinks, tubs, and floor drains fast.',
    duration: '1 hr',
    imageAlt: 'A professional cleaning a blocked drain',
    image: `${LANDING_ASSET_PATH}/service-drain.png`,
    price: 75,
    rating: '4.8 (204)',
  },
  {
    id: 'outlet-replacement',
    category: 'Electrical',
    title: 'Outlet & Switch Replacement',
    description:
      'Safe replacement of standard outlets, USB outlets, and light switches.',
    duration: '45 min',
    imageAlt: 'An electrician replacing a wall outlet',
    image: `${LANDING_ASSET_PATH}/service-electrical.png`,
    price: 75,
    rating: '4.8 (204)',
  },
  {
    id: 'ceiling-fan',
    category: 'Electrical',
    title: 'Ceiling Fan Installation',
    description:
      'Complete ceiling fan installation including wiring, mounting, and remote pairing.',
    duration: '1.5–2 hrs',
    imageAlt: 'An electrician installing a ceiling fan',
    image: `${LANDING_ASSET_PATH}/service-electrical.png`,
    price: 75,
    rating: '4.8 (204)',
  },
];

export const SERVICE_CAPABILITIES = [
  { id: 'plumbing', label: 'Wet / Plumbing Services', icon: Droplets },
  { id: 'carpentry', label: 'Dry / Carpentry Services', icon: Hammer },
  { id: 'electrical', label: 'Electrical Repairs & Installations', icon: Zap },
  { id: 'furniture', label: 'Furniture Assembly & Installation', icon: Armchair },
];

export const TRUST_ITEMS = [
  {
    id: 'experts',
    number: '01',
    title: 'Skilled & Certified Experts',
    body:
      'Our experienced technicians handle every job with precision, professionalism, and attention to detail.',
  },
  {
    id: 'solutions',
    number: '02',
    title: 'Complete Home Solutions',
    body:
      'From plumbing and carpentry to electrical work and furniture assembly, everything is available under one roof.',
  },
  {
    id: 'pricing',
    number: '03',
    title: 'Transparent Pricing',
    body:
      'Enjoy fair, upfront pricing with no hidden charges, so you always know what to expect.',
  },
  {
    id: 'scheduling',
    number: '04',
    title: 'Fast & Flexible Scheduling',
    body:
      'Book appointments at your convenience with prompt arrival and efficient service.',
  },
  {
    id: 'satisfaction',
    number: '05',
    title: '100% Satisfaction Guaranteed',
    body:
      'We stand behind our work and ensure every service is completed to the highest standard.',
  },
];

export const ARTICLE_ITEMS = [
  {
    id: 'plumbing',
    title: '5 Signs Your Home Needs a Plumbing Repair',
    body:
      'Learn how to spot common plumbing problems early and avoid costly repairs down the road.',
    imageAlt: 'A plumber installing pipe fittings with a wrench',
    image: `${LANDING_ASSET_PATH}/article-plumbing.png`,
  },
  {
    id: 'electrician',
    title: 'When Should You Call a Professional Electrician?',
    body:
      'Learn the warning signs of electrical problems and when it is safer to call a qualified professional.',
    imageAlt: 'An electrician repairing wall sockets with pliers',
    image: `${LANDING_ASSET_PATH}/article-electrical.png`,
  },
  {
    id: 'repairs',
    title: 'Small Repairs That Make a Big Difference',
    body:
      'Discover quick improvements that make your property more comfortable, functional, and maintained.',
    imageAlt: 'A handyman installing a hinge on a wooden door frame',
    image: `${LANDING_ASSET_PATH}/article-repairs.png`,
  },
  {
    id: 'shape',
    title: 'Simple Ways to Keep Your Home in Top Shape',
    body:
      'Discover easy maintenance tips that help protect your property and prevent unexpected issues.',
    imageAlt: 'A person painting an interior wall during a home renovation',
    image: `${LANDING_ASSET_PATH}/article-maintenance.png`,
  },
  {
    id: 'winter',
    title: 'How to Prepare Your Home for Winter',
    body:
      'Get ready for colder weather with maintenance tips that keep your space safe and comfortable.',
    imageAlt: 'A technician repairing a home heating system',
    image: `${LANDING_ASSET_PATH}/article-winter.png`,
  },
  {
    id: 'routine',
    title: 'How Often Should You Maintain Your Home?',
    body:
      'A simple maintenance routine can prevent bigger problems. Learn what to check and how often.',
    imageAlt: 'Professionals cleaning a bright modern kitchen',
    image: `${LANDING_ASSET_PATH}/article-routine.png`,
  },
  {
    id: 'leak-prevention',
    title: 'How to Prevent Costly Water Leaks',
    body:
      'Use these practical checks to find weak plumbing connections before they damage your home.',
    imageAlt: 'A modern kitchen sink with a chrome faucet',
    image: `${LANDING_ASSET_PATH}/service-faucet.png`,
  },
  {
    id: 'electrical-safety',
    title: 'Essential Electrical Safety Tips for Every Home',
    body:
      'Protect your family and property by recognizing overloaded circuits and unsafe electrical fittings.',
    imageAlt: 'An electrician fitting a wall outlet with a screwdriver',
    image: `${LANDING_ASSET_PATH}/service-electrical.png`,
  },
  {
    id: 'door-care',
    title: 'Easy Ways to Keep Doors Working Smoothly',
    body:
      'Simple hinge, frame, and lock maintenance can make doors safer and extend their useful life.',
    imageAlt: 'Classic wooden front doors on a residential building',
    image: `${LANDING_ASSET_PATH}/category-security.png`,
  },
  {
    id: 'seasonal-checklist',
    title: 'Your Complete Seasonal Home Checklist',
    body:
      'Stay ahead of repairs with a room-by-room maintenance checklist for every season.',
    imageAlt: 'Exposed plumbing pipes along a construction wall',
    image: `${LANDING_ASSET_PATH}/service-drain.png`,
  },
  {
    id: 'heating-efficiency',
    title: 'Simple Steps to Improve Heating Efficiency',
    body:
      'Reduce energy waste and keep rooms comfortable with a few essential heating-system checks.',
    imageAlt: 'Warm pendant lights hanging in a modern living room',
    image: `${LANDING_ASSET_PATH}/category-lighting.png`,
  },
  {
    id: 'cleaning-plan',
    title: 'Build a Cleaning Routine That Actually Works',
    body:
      'Create a manageable weekly plan that keeps every room clean without taking over your schedule.',
    imageAlt: 'A tidy modern walk-in closet with empty hangers',
    image: `${LANDING_ASSET_PATH}/category-closets.png`,
  },
];

export const FEATURE_ICON_MAP = {
  lighting: LampCeiling,
  security: ShieldCheck,
  closets: Wrench,
};
