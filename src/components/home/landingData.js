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
    imageAlt: 'A collection of modern pendant lights',
  },
  {
    id: 'security',
    title: 'Security',
    image: `${LANDING_ASSET_PATH}/category-security.png`,
    imageAlt: 'A smart lock installed on a modern front door',
  },
  {
    id: 'closets',
    title: 'Closets',
    image: `${LANDING_ASSET_PATH}/category-closets.png`,
    imageAlt: 'A custom fitted bedroom closet',
  },
];

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
    imageAlt: 'A plumber working beneath a kitchen sink',
    image: `${LANDING_ASSET_PATH}/article-plumbing.png`,
  },
  {
    id: 'electrician',
    title: 'When Should You Call a Professional Electrician?',
    body:
      'Learn the warning signs of electrical problems and when it is safer to call a qualified professional.',
    imageAlt: 'An electrician inspecting a wall outlet',
    image: `${LANDING_ASSET_PATH}/article-electrical.png`,
  },
  {
    id: 'repairs',
    title: 'Small Repairs That Make a Big Difference',
    body:
      'Discover quick improvements that make your property more comfortable, functional, and maintained.',
    imageAlt: 'A professional repairing a wooden door',
    image: `${LANDING_ASSET_PATH}/article-repairs.png`,
  },
  {
    id: 'shape',
    title: 'Simple Ways to Keep Your Home in Top Shape',
    body:
      'Discover easy maintenance tips that help protect your property and prevent unexpected issues.',
    imageAlt: 'A worker repairing a wall inside a home',
    image: `${LANDING_ASSET_PATH}/article-maintenance.png`,
  },
  {
    id: 'winter',
    title: 'How to Prepare Your Home for Winter',
    body:
      'Get ready for colder weather with maintenance tips that keep your space safe and comfortable.',
    imageAlt: 'A professional inspecting a home heating system',
    image: `${LANDING_ASSET_PATH}/article-winter.png`,
  },
  {
    id: 'routine',
    title: 'How Often Should You Maintain Your Home?',
    body:
      'A simple maintenance routine can prevent bigger problems. Learn what to check and how often.',
    imageAlt: 'A home service professional holding cleaning supplies',
    image: `${LANDING_ASSET_PATH}/article-routine.png`,
  },
];

export const HEADER_CATEGORIES = [
  'Lighting',
  'Security',
  'Closets',
  'Fence',
  'Deck',
  'Basement',
  'Appliances',
  'Garage',
  'Garden',
  'Flooring',
  'Windows',
  'Doors',
  'Kitchen',
  'Bathroom',
  'Walls & Ceilings',
];

export const FEATURE_ICON_MAP = {
  lighting: LampCeiling,
  security: ShieldCheck,
  closets: Wrench,
};
