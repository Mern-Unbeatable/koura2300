export const DEFAULT_CATALOG_PAGE_SIZE = 20;

export const DEFAULT_CATALOG_PRICE_RANGES = [
  { value: 'any', label: 'Any price', minimum: 0, maximum: Number.POSITIVE_INFINITY },
  { value: '0-99', label: 'Under $100', minimum: 0, maximum: 99 },
  { value: '100-200', label: '$100-$200', minimum: 100, maximum: 200 },
  { value: '201-300', label: '$201-$300', minimum: 201, maximum: 300 },
];

const BASE_PRICE = 75;
const PRICE_STEP = 25;
const PRICE_TIER_COUNT = 6;
const SERVICE_DURATION = '1–2 hrs';
const SERVICE_RATING = '4.9 (312)';

const toSlug = (value) => value.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');
const getServicePrice = (serviceIndex) =>
  BASE_PRICE + (serviceIndex % PRICE_TIER_COUNT) * PRICE_STEP;

const createService = ({
  category,
  title,
  serviceIndex,
  description,
  image,
  imageAlt,
}) => ({
  id: `${toSlug(category)}-${toSlug(title)}`,
  title,
  description,
  category,
  duration: SERVICE_DURATION,
  price: getServicePrice(serviceIndex),
  rating: SERVICE_RATING,
  image,
  imageAlt,
});

export const createServiceCatalog = ({
  categories,
  titlesByCategory,
  descriptionsByCategory,
  image,
  imageAlt,
}) =>
  categories.flatMap((category) =>
    titlesByCategory[category].map((title, serviceIndex) =>
      createService({
        category,
        title,
        serviceIndex,
        description: descriptionsByCategory[category],
        image,
        imageAlt,
      }),
    ),
  );
