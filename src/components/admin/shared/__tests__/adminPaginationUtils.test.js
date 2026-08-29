import {
  clampPage,
  getPaginationItems,
  getTotalPages,
  paginateItems,
  PAGINATION_ELLIPSIS_TOKEN,
  shouldShowPagination,
} from '../adminPaginationUtils';

describe('adminPaginationUtils', () => {
  it('builds Figma page windows with ellipsis', () => {
    expect(getPaginationItems(1, 2)).toEqual([1, 2]);
    expect(getPaginationItems(1, 10)).toEqual([1, 2, 3, PAGINATION_ELLIPSIS_TOKEN, 10]);
    expect(getPaginationItems(10, 10)).toEqual([
      1,
      PAGINATION_ELLIPSIS_TOKEN,
      8,
      9,
      10,
    ]);
  });

  it('paginates items and clamps pages', () => {
    const items = Array.from({ length: 12 }, (_, index) => index + 1);

    expect(paginateItems(items, 1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(paginateItems(items, 2, 10)).toEqual([11, 12]);
    expect(getTotalPages(12, 10)).toBe(2);
    expect(clampPage(0, 3)).toBe(1);
    expect(clampPage(9, 3)).toBe(3);
  });

  it('shows pagination only when items exceed page size', () => {
    expect(shouldShowPagination(0, 10)).toBe(false);
    expect(shouldShowPagination(10, 10)).toBe(false);
    expect(shouldShowPagination(11, 10)).toBe(true);
  });
});
