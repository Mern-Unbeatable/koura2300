import {
  buildServiceUpdatesFromForm,
  createServicesEditFormValues,
  findServiceById,
  getEditSubcategoryOptions,
  SERVICES_EDIT_CATEGORY_OPTIONS,
  updateServiceById,
  validateServicesEditForm,
} from '../servicesEditUtils';
import { SERVICES_EDIT_COPY } from '../servicesEditCopy';
import { SERVICES_SEED } from '../servicesData';

describe('servicesEditUtils', () => {
  const sampleService = SERVICES_SEED[0];

  it('builds edit form values from an existing service card', () => {
    expect(createServicesEditFormValues(sampleService)).toEqual({
      categoryId: sampleService.catalogTitle,
      subcategoryId: sampleService.category,
      title: sampleService.title,
      description: sampleService.description,
      duration: sampleService.duration,
      price: String(sampleService.price),
      rating: sampleService.rating,
      image: sampleService.image,
      imageAlt: sampleService.imageAlt,
    });
  });

  it('exposes every landing category for the edit modal', () => {
    const labels = SERVICES_EDIT_CATEGORY_OPTIONS.map((option) => option.label);

    expect(labels).toEqual(
      expect.arrayContaining([
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
      ]),
    );
    expect(labels).not.toContain('All Categories');
  });

  it('returns subcategories for the selected category', () => {
    const options = getEditSubcategoryOptions('Lighting');

    expect(options.every((option) => option.categoryId === 'Lighting')).toBe(true);
    expect(options.map((option) => option.label)).toContain('Indoor Lighting');
  });

  it('validates required card fields', () => {
    expect(validateServicesEditForm(createServicesEditFormValues(sampleService))).toEqual({});
    expect(validateServicesEditForm({})).toEqual({
      categoryId: SERVICES_EDIT_COPY.errors.categoryRequired,
      subcategoryId: SERVICES_EDIT_COPY.errors.subcategoryRequired,
      title: SERVICES_EDIT_COPY.errors.titleRequired,
      description: SERVICES_EDIT_COPY.errors.descriptionRequired,
      duration: SERVICES_EDIT_COPY.errors.durationRequired,
      price: SERVICES_EDIT_COPY.errors.priceRequired,
    });
    expect(
      validateServicesEditForm({
        ...createServicesEditFormValues(sampleService),
        price: 'abc',
      }).price,
    ).toBe(SERVICES_EDIT_COPY.errors.priceInvalid);
  });

  it('updates a service by id from form values', () => {
    const updates = buildServiceUpdatesFromForm({
      ...createServicesEditFormValues(sampleService),
      title: 'Updated title',
      price: '99',
    });
    const nextServices = updateServiceById(SERVICES_SEED.slice(0, 2), sampleService.id, updates);

    expect(findServiceById(nextServices, sampleService.id)).toMatchObject({
      title: 'Updated title',
      price: 99,
    });
    expect(nextServices[1]).toEqual(SERVICES_SEED[1]);
  });
});
