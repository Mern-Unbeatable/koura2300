import { ROUTES, SERVICE_DETAILS_PREFIX, CATALOG_ALL_CATEGORY } from '../../config';
import { APPLIANCES_SERVICES } from '../appliances/appliancesData';
import { BASEMENT_SERVICES } from '../basement/basementData';
import { BATHROOM_SERVICES } from '../bathroom/bathroomData';
import { CLOSETS_SERVICES } from '../closets/closetsData';
import { DECK_SERVICES } from '../deck/deckData';
import { DOORS_SERVICES } from '../doors/doorsData';
import { FENCE_SERVICES } from '../fence/fenceData';
import { FLOORING_SERVICES } from '../flooring/flooringData';
import { GARAGE_SERVICES } from '../garage/garageData';
import { GARDEN_SERVICES } from '../garden/gardenData';
import { KITCHEN_SERVICES } from '../kitchen/kitchenData';
import { LIGHTING_SERVICES } from '../lighting/lightingData';
import { SECURITY_SERVICES } from '../security/securityData';
import { WALLS_CEILINGS_SERVICES } from '../wallsCeilings/wallsCeilingsData';
import { WINDOWS_SERVICES } from '../windows/windowsData';

export const CATALOG_COLLECTIONS = [
  { title: 'Lighting', path: ROUTES.LIGHTING, services: LIGHTING_SERVICES },
  { title: 'Security', path: ROUTES.SECURITY, services: SECURITY_SERVICES },
  { title: 'Closets', path: ROUTES.CLOSETS, services: CLOSETS_SERVICES },
  { title: 'Fence', path: ROUTES.FENCE, services: FENCE_SERVICES },
  { title: 'Deck', path: ROUTES.DECK, services: DECK_SERVICES },
  { title: 'Basement', path: ROUTES.BASEMENT, services: BASEMENT_SERVICES },
  { title: 'Appliances', path: ROUTES.APPLIANCES, services: APPLIANCES_SERVICES },
  { title: 'Garage', path: ROUTES.GARAGE, services: GARAGE_SERVICES },
  { title: 'Garden', path: ROUTES.GARDEN, services: GARDEN_SERVICES },
  { title: 'Flooring', path: ROUTES.FLOORING, services: FLOORING_SERVICES },
  { title: 'Windows', path: ROUTES.WINDOWS, services: WINDOWS_SERVICES },
  { title: 'Doors', path: ROUTES.DOORS, services: DOORS_SERVICES },
  { title: 'Kitchen', path: ROUTES.KITCHEN, services: KITCHEN_SERVICES },
  { title: 'Bathroom', path: ROUTES.BATHROOM, services: BATHROOM_SERVICES },
  { title: 'Walls & Ceilings', path: ROUTES.WALLS_CEILINGS, services: WALLS_CEILINGS_SERVICES },
];

const attachCatalogMetadata = (collection) =>
  collection.services.map((service) => ({
    ...service,
    catalogTitle: collection.title,
    catalogPath: collection.path,
  }));

export const ALL_CATALOG_SERVICES = CATALOG_COLLECTIONS.flatMap(attachCatalogMetadata);

export const getCatalogServiceById = (serviceId) =>
  ALL_CATALOG_SERVICES.find((service) => service.id === serviceId);

const isSameCatalogSibling = (candidate, service) =>
  candidate.catalogPath === service.catalogPath && candidate.id !== service.id;

const PROMOTIONAL_MATCHERS = {
  true: isSameCatalogSibling,
  false: (candidate, service, selectedCategory) =>
    isSameCatalogSibling(candidate, service) && candidate.category === selectedCategory,
};

export const getPromotionalServices = (
  service,
  selectedCategory = CATALOG_ALL_CATEGORY,
) => {
  const isAllTab = String(selectedCategory === CATALOG_ALL_CATEGORY);

  return ALL_CATALOG_SERVICES.filter((candidate) =>
    PROMOTIONAL_MATCHERS[isAllTab](candidate, service, selectedCategory),
  );
};

export const isCatalogPathCurrent = (pathname, catalogPath) => {
  if (pathname === catalogPath) {
    return true;
  }

  const service = getCatalogServiceFromPathname(pathname);
  return service?.catalogPath === catalogPath;
};

const getCatalogServiceFromPathname = (pathname) => {
  const serviceId = pathname.startsWith(SERVICE_DETAILS_PREFIX)
    ? pathname.slice(SERVICE_DETAILS_PREFIX.length)
    : '';

  if (!serviceId) {
    return undefined;
  }

  return getCatalogServiceById(serviceId);
};
