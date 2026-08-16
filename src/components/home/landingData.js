import { Armchair, Droplets, Hammer, LampCeiling, ShieldCheck, Wrench, Zap } from 'lucide-react';

export const LANDING_ASSET_PATH = '/assets/landing';

export const CATEGORY_ITEMS = [
  {
    id: 'lighting',
    titleKey: 'landing.categories.lighting',
    image: `${LANDING_ASSET_PATH}/category-lighting.png`,
    priceKey: 'landing.categories.price',
  },
  {
    id: 'security',
    titleKey: 'landing.categories.security',
    image: `${LANDING_ASSET_PATH}/category-security.png`,
    priceKey: 'landing.categories.price',
  },
  {
    id: 'closets',
    titleKey: 'landing.categories.closets',
    image: `${LANDING_ASSET_PATH}/category-closets.png`,
    priceKey: 'landing.categories.price',
  },
];

export const SERVICE_ITEMS = [
  {
    id: 'faucet-repair',
    categoryKey: 'landing.services.categories.plumbing',
    titleKey: 'landing.services.faucet.title',
    descriptionKey: 'landing.services.faucet.description',
    durationKey: 'landing.services.faucet.duration',
    imageAltKey: 'landing.services.faucet.imageAlt',
    image: `${LANDING_ASSET_PATH}/service-faucet.png`,
    price: 75,
    rating: '4.9 (312)',
  },
  {
    id: 'drain-cleaning',
    categoryKey: 'landing.services.categories.plumbing',
    titleKey: 'landing.services.drain.title',
    descriptionKey: 'landing.services.drain.description',
    durationKey: 'landing.services.drain.duration',
    imageAltKey: 'landing.services.drain.imageAlt',
    image: `${LANDING_ASSET_PATH}/service-drain.png`,
    price: 75,
    rating: '4.8 (204)',
  },
  {
    id: 'outlet-replacement',
    categoryKey: 'landing.services.categories.electrical',
    titleKey: 'landing.services.outlet.title',
    descriptionKey: 'landing.services.outlet.description',
    durationKey: 'landing.services.outlet.duration',
    imageAltKey: 'landing.services.outlet.imageAlt',
    image: `${LANDING_ASSET_PATH}/service-electrical.png`,
    price: 75,
    rating: '4.8 (204)',
  },
  {
    id: 'ceiling-fan',
    categoryKey: 'landing.services.categories.electrical',
    titleKey: 'landing.services.fan.title',
    descriptionKey: 'landing.services.fan.description',
    durationKey: 'landing.services.fan.duration',
    imageAltKey: 'landing.services.fan.imageAlt',
    image: `${LANDING_ASSET_PATH}/service-electrical.png`,
    price: 75,
    rating: '4.8 (204)',
  },
];

export const SERVICE_CAPABILITIES = [
  { id: 'plumbing', labelKey: 'landing.overview.capabilities.plumbing', icon: Droplets },
  { id: 'carpentry', labelKey: 'landing.overview.capabilities.carpentry', icon: Hammer },
  { id: 'electrical', labelKey: 'landing.overview.capabilities.electrical', icon: Zap },
  { id: 'furniture', labelKey: 'landing.overview.capabilities.furniture', icon: Armchair },
];

export const TRUST_ITEMS = [
  {
    id: 'experts',
    number: '01',
    titleKey: 'landing.trust.experts.title',
    bodyKey: 'landing.trust.experts.body',
  },
  {
    id: 'solutions',
    number: '02',
    titleKey: 'landing.trust.solutions.title',
    bodyKey: 'landing.trust.solutions.body',
  },
  {
    id: 'pricing',
    number: '03',
    titleKey: 'landing.trust.pricing.title',
    bodyKey: 'landing.trust.pricing.body',
  },
  {
    id: 'scheduling',
    number: '04',
    titleKey: 'landing.trust.scheduling.title',
    bodyKey: 'landing.trust.scheduling.body',
  },
  {
    id: 'satisfaction',
    number: '05',
    titleKey: 'landing.trust.satisfaction.title',
    bodyKey: 'landing.trust.satisfaction.body',
  },
];

export const ARTICLE_ITEMS = [
  {
    id: 'plumbing',
    titleKey: 'landing.learn.articles.plumbing.title',
    bodyKey: 'landing.learn.articles.plumbing.body',
    image: `${LANDING_ASSET_PATH}/article-plumbing.png`,
  },
  {
    id: 'electrician',
    titleKey: 'landing.learn.articles.electrician.title',
    bodyKey: 'landing.learn.articles.electrician.body',
    image: `${LANDING_ASSET_PATH}/article-electrical.png`,
  },
  {
    id: 'repairs',
    titleKey: 'landing.learn.articles.repairs.title',
    bodyKey: 'landing.learn.articles.repairs.body',
    image: `${LANDING_ASSET_PATH}/article-repairs.png`,
  },
  {
    id: 'shape',
    titleKey: 'landing.learn.articles.shape.title',
    bodyKey: 'landing.learn.articles.shape.body',
    image: `${LANDING_ASSET_PATH}/article-maintenance.png`,
  },
  {
    id: 'winter',
    titleKey: 'landing.learn.articles.winter.title',
    bodyKey: 'landing.learn.articles.winter.body',
    image: `${LANDING_ASSET_PATH}/article-winter.png`,
  },
  {
    id: 'routine',
    titleKey: 'landing.learn.articles.routine.title',
    bodyKey: 'landing.learn.articles.routine.body',
    image: `${LANDING_ASSET_PATH}/article-routine.png`,
  },
];

export const HEADER_CATEGORY_KEYS = [
  'lighting',
  'security',
  'closets',
  'fence',
  'deck',
  'basement',
  'appliances',
  'garage',
  'garden',
  'flooring',
  'windows',
  'doors',
  'kitchen',
  'bathroom',
  'walls',
];

export const FEATURE_ICON_MAP = {
  lighting: LampCeiling,
  security: ShieldCheck,
  closets: Wrench,
};
