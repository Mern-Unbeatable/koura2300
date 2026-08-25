import {
  clampPage,
  deleteServiceById,
  filterServices,
  getPaginationItems,
  getServicesSummary,
  getSubcategoryOptionsForCategory,
  getTotalPages,
  PAGINATION_ELLIPSIS_TOKEN,
  paginateServices,
} from '../servicesUtils';
import {
  SERVICES_ALL_FILTER_ID,
  SERVICES_PAGE_SIZE,
  SERVICES_SEED,
  SERVICES_TOTAL_PAGES,
} from '../servicesData';

describe('servicesUtils', () => {
  it('filters services by landing catalog category and subcategory', () => {
    const byLighting = filterServices(SERVICES_SEED, 'Lighting', SERVICES_ALL_FILTER_ID);
    const subcategory = byLighting[0]?.category;
    const bySubcategory = filterServices(SERVICES_SEED, 'Lighting', subcategory);

    expect(byLighting.length).toBeGreaterThan(0);
    expect(byLighting.every((service) => service.catalogTitle === 'Lighting')).toBe(true);
    expect(bySubcategory.every((service) => service.category === subcategory)).toBe(true);
  });

  it('returns all seed services when filters are all', () => {
    expect(
      filterServices(SERVICES_SEED, SERVICES_ALL_FILTER_ID, SERVICES_ALL_FILTER_ID),
    ).toHaveLength(SERVICES_SEED.length);
  });

  it('paginates eight services per page across ten Figma pages', () => {
    const pageOne = paginateServices(SERVICES_SEED, 1, SERVICES_PAGE_SIZE);
    const pageTwo = paginateServices(SERVICES_SEED, 2, SERVICES_PAGE_SIZE);

    expect(SERVICES_SEED).toHaveLength(SERVICES_PAGE_SIZE * SERVICES_TOTAL_PAGES);
    expect(pageOne).toHaveLength(SERVICES_PAGE_SIZE);
    expect(pageTwo).toHaveLength(SERVICES_PAGE_SIZE);
    expect(getTotalPages(SERVICES_SEED.length, SERVICES_PAGE_SIZE)).toBe(SERVICES_TOTAL_PAGES);
  });

  it('builds summary subtitle from the service count', () => {
    expect(getServicesSummary(SERVICES_SEED)).toEqual({
      totalServices: SERVICES_SEED.length,
      subtitle: `${SERVICES_SEED.length} services`,
    });
  });

  it('limits subcategory options to the selected landing category', () => {
    const options = getSubcategoryOptionsForCategory('Lighting');

    expect(options[0].id).toBe(SERVICES_ALL_FILTER_ID);
    expect(options.slice(1).every((option) => option.categoryId === 'Lighting')).toBe(true);
    expect(options.some((option) => option.id === 'Indoor Lighting')).toBe(true);
  });

  it('builds Figma pagination items with ellipsis for ten pages', () => {
    expect(getPaginationItems(1, 2)).toEqual([1, 2]);
    expect(getPaginationItems(1, 10)).toEqual([1, 2, 3, PAGINATION_ELLIPSIS_TOKEN, 10]);
    expect(getPaginationItems(10, 10)).toEqual([1, PAGINATION_ELLIPSIS_TOKEN, 8, 9, 10]);
    expect(getPaginationItems(5, 10)).toEqual([
      1,
      PAGINATION_ELLIPSIS_TOKEN,
      4,
      5,
      6,
      PAGINATION_ELLIPSIS_TOKEN,
      10,
    ]);
  });

  it('clamps page numbers within the valid range', () => {
    expect(clampPage(0, 10)).toBe(1);
    expect(clampPage(15, 10)).toBe(10);
    expect(clampPage(4, 10)).toBe(4);
  });

  it('deletes a service immutably', () => {
    const targetId = SERVICES_SEED[0].id;
    const updated = deleteServiceById(SERVICES_SEED, targetId);

    expect(updated).toHaveLength(SERVICES_SEED.length - 1);
    expect(updated.find((service) => service.id === targetId)).toBeUndefined();
    expect(SERVICES_SEED).toHaveLength(SERVICES_PAGE_SIZE * SERVICES_TOTAL_PAGES);
  });
});
