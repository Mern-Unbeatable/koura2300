import { ROUTES } from '../../config';
import {
  filterFilledAdditionalFeatures,
  mapAdminFormValuesToPostedService,
  mergePostedServicesWithSeed,
  resolveCatalogPathByTitle,
} from '../postedServiceMapper';

describe('postedServiceMapper', () => {
  it('maps admin form values into a posted JSON service record', () => {
    const values = {
      categoryId: 'Bathroom',
      subcategoryId: 'Vanity Services',
      duration: '1-2 hours',
      standardPrice: '$200.00',
      standardFeatured: [{ id: 'standard-featured-1', value: 'Standard install' }],
      premiumPrice: '$250.00',
      premiumFeatured: [{ id: 'premium-featured-1', value: 'Premium install' }],
      title: 'Vanity Handle Replacement',
      shortDescription: 'Short copy',
      longDescription: '',
      included: [
        { id: 'included-1', value: 'Labor' },
        { id: 'included-2', value: 'Cleanup' },
      ],
      notIncluded: [{ id: 'not-included-1', value: 'Parts' }],
      additionalFeatures: [
        {
          id: 'feature-1',
          name: 'Handles',
          quantity: '2',
          standardPrice: '25%',
          premiumPrice: '30%',
          note1: 'First 2 included',
          note2: 'Extra surcharge',
        },
        {
          id: 'feature-empty',
          name: '',
          quantity: '',
          standardPrice: '',
          premiumPrice: '',
          note1: '',
          note2: '',
        },
      ],
      sizes: [
        {
          id: 'size-1',
          size: '24 Inch',
          standardPrice: '$180.00',
          premiumPrice: '$220.00',
        },
      ],
      options: [],
      bannerImage: {
        id: 'banner-1',
        previewUrl: 'data:image/png;base64,iVBORw0KGgo=',
        isExisting: false,
      },
      otherImages: [
        { id: 'o1', previewUrl: 'data:image/png;base64,AAAA', name: 'a.png' },
      ],
    };

    const posted = mapAdminFormValuesToPostedService(values);

    expect(posted.catalogTitle).toBe('Bathroom');
    expect(posted.category).toBe('Vanity Services');
    expect(posted.catalogPath).toBe(ROUTES.BATHROOM);
    expect(posted.details.packages[0].id).toBe('standard');
    expect(posted.details.packages[0].price).toBe(200);
    expect(posted.details.includedItems).toEqual(['Labor', 'Cleanup']);
    expect(posted.details.additionalFeatures).toHaveLength(1);
    expect(posted.details.additionalFeatures[0].name).toBe('Handles');
    expect(posted.details.sizes).toHaveLength(1);
    expect(posted.image).toBe('data:image/png;base64,iVBORw0KGgo=');
    expect(posted.details.otherImages).toEqual([
      { id: 'o1', previewUrl: 'data:image/png;base64,AAAA', name: 'a.png' },
    ]);
    expect(filterFilledAdditionalFeatures(values.additionalFeatures)).toHaveLength(1);
  });

  it('resolves catalog paths and merges posted services ahead of seed', () => {
    expect(resolveCatalogPathByTitle('Kitchen')).toBe(ROUTES.KITCHEN);

    const merged = mergePostedServicesWithSeed(
      [{ id: 'seed-1', title: 'Seed' }],
      [{ id: 'posted-1', title: 'Posted', category: 'A', catalogTitle: 'Bathroom' }],
    );

    expect(merged[0].id).toBe('posted-1');
    expect(merged[0].isPosted).toBe(true);
    expect(merged[1].id).toBe('seed-1');
  });
});
