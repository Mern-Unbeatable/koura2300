import { useMemo } from 'react';
import {
  listCatalogServicesWithPosted,
  mergePostedIntoCatalogServices,
  resolveCatalogPathForSeedServices,
} from '../components/catalog/catalogRegistry';
import usePostedMediaHydration from './usePostedMediaHydration';

/**
 * Returns seed catalog services merged with admin-posted services (until deleted).
 * Re-renders after IndexedDB media hydration so uploaded images appear.
 */
const usePostedCatalogServices = (seedServices, matcher = {}) => {
  const mediaVersion = usePostedMediaHydration();
  const catalogPath =
    matcher.catalogPath ??
    (matcher.catalogTitle ? undefined : resolveCatalogPathForSeedServices(seedServices));

  return useMemo(() => {
    if (!seedServices && !matcher.catalogTitle && !catalogPath) {
      return listCatalogServicesWithPosted();
    }

    return mergePostedIntoCatalogServices(seedServices ?? [], {
      catalogTitle: matcher.catalogTitle,
      catalogPath: matcher.catalogPath ?? catalogPath,
    });
  }, [catalogPath, matcher.catalogPath, matcher.catalogTitle, mediaVersion, seedServices]);
};

export default usePostedCatalogServices;
