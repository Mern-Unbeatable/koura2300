import {
  ADS_ALL_FILTER_ID,
  ADS_PAGE_SIZE,
  ADS_SEED,
  ADS_VIEWPORT,
} from '../adsData';
import {
  deleteAdById,
  filterAds,
  getPaginationItems,
  getSubcategoryOptionsForCategory,
  getTotalPages,
  PAGINATION_ELLIPSIS_TOKEN,
  paginateAds,
  shouldShowAdsPagination,
} from '../adsUtils';

describe('adsUtils', () => {
  it('filters ads by catalog category and subcategory', () => {
    const lightingAds = filterAds(ADS_SEED, 'Lighting', ADS_ALL_FILTER_ID);
    expect(lightingAds.length).toBeGreaterThan(0);
    expect(lightingAds.every((ad) => ad.catalogTitle === 'Lighting')).toBe(true);

    const indoor = filterAds(ADS_SEED, 'Lighting', 'Indoor Lighting');
    expect(indoor.every((ad) => ad.category === 'Indoor Lighting')).toBe(true);
  });

  it('returns subcategory options for the selected category', () => {
    const options = getSubcategoryOptionsForCategory('Lighting');
    expect(options[0].id).toBe(ADS_ALL_FILTER_ID);
    expect(options.every((option) => option.id === ADS_ALL_FILTER_ID || option.categoryId === 'Lighting')).toBe(
      true,
    );
  });

  it('paginates eight cards per page and shows pagination when needed', () => {
    expect(ADS_PAGE_SIZE).toBe(8);
    expect(paginateAds(ADS_SEED, 1, ADS_PAGE_SIZE)).toHaveLength(ADS_PAGE_SIZE);
    expect(getTotalPages(ADS_SEED.length, ADS_PAGE_SIZE)).toBeGreaterThan(1);
    expect(shouldShowAdsPagination(ADS_SEED.length, ADS_PAGE_SIZE)).toBe(true);
    expect(shouldShowAdsPagination(8, ADS_PAGE_SIZE)).toBe(false);
    expect(getPaginationItems(1, 10)).toContain(PAGINATION_ELLIPSIS_TOKEN);
  });

  it('removes an ad by id without mutating the source list', () => {
    const targetId = ADS_SEED[0].id;
    const nextAds = deleteAdById(ADS_SEED, targetId);

    expect(nextAds).toHaveLength(ADS_SEED.length - 1);
    expect(nextAds.find((ad) => ad.id === targetId)).toBeUndefined();
    expect(ADS_SEED.find((ad) => ad.id === targetId)).toBeDefined();
  });

  it('keeps responsive viewport tokens for required breakpoints', () => {
    expect(ADS_VIEWPORT.MOBILE_S).toBe(320);
    expect(ADS_VIEWPORT.MOBILE_M).toBe(375);
    expect(ADS_VIEWPORT.MOBILE_L).toBe(425);
    expect(ADS_VIEWPORT.TABLET).toBe(768);
    expect(ADS_VIEWPORT.LAPTOP).toBe(1020);
    expect(ADS_VIEWPORT.DESKTOP).toBe(1440);
  });
});
