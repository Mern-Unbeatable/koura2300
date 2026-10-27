import { ALL_CATALOG_SERVICES, getCatalogServiceById } from '../../catalog/catalogRegistry';
import { getCatalogServiceDetails } from '../serviceDetailsData';
import { getServiceDetailsConfigOverlay } from '../serviceDetailsConfigOverlays';

describe('serviceDetailsConfigOverlays', () => {
  it('seeds bathroom demo services with admin-shaped config blocks', () => {
    const hardware = getCatalogServiceById('vanity-services-hardware');
    const installation = getCatalogServiceById('vanity-services-installation');
    const toilet = getCatalogServiceById('toilet-services-installation');
    const sink = getCatalogServiceById('caulking-waterproofing-sink');

    expect(hardware).toBeTruthy();
    expect(getServiceDetailsConfigOverlay(hardware).additionalFeatures).toHaveLength(1);
    expect(getServiceDetailsConfigOverlay(installation).sizes).toHaveLength(4);
    expect(getServiceDetailsConfigOverlay(toilet).options).toHaveLength(2);
    expect(getServiceDetailsConfigOverlay(sink).additionalFeatures[0].measurementUnit).toBe('ft');
  });

  it('returns empty overlays for services without admin config', () => {
    const lightingService = ALL_CATALOG_SERVICES.find(
      (service) => service.catalogTitle === 'Lighting',
    );

    const overlay = getServiceDetailsConfigOverlay(lightingService);
    expect(overlay.additionalFeatures).toEqual([]);
    expect(overlay.sizes).toEqual([]);
    expect(overlay.options).toEqual([]);
  });

  it('exposes overlay fields through getCatalogServiceDetails', () => {
    const details = getCatalogServiceDetails('vanity-services-installation');
    expect(details.sizes).toHaveLength(4);
    expect(details.options).toEqual([]);
    expect(details.additionalFeatures).toEqual([]);

    const flat = getCatalogServiceDetails('toilet-services-handle');
    expect(flat.sizes).toEqual([]);
    expect(flat.options).toEqual([]);
    expect(flat.additionalFeatures).toEqual([]);
  });
});
