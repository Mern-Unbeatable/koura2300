import { act, renderHook } from '@testing-library/react';
import { LIGHTING_ALL_CATEGORY, LIGHTING_PRICE_RANGES, LIGHTING_SERVICES } from '../../components/lighting/lightingData';
import useServiceCatalog from '../useServiceCatalog';

describe('useServiceCatalog subcategory browse flow', () => {
  const renderCatalog = () =>
    renderHook(() =>
      useServiceCatalog({
        services: LIGHTING_SERVICES,
        allCategory: LIGHTING_ALL_CATEGORY,
        priceRanges: LIGHTING_PRICE_RANGES,
        pageSize: 20,
      }),
    );

  it('starts on the subcategory cards view with no service listing', () => {
    const { result } = renderCatalog();

    expect(result.current.isBrowsingServices).toBe(false);
    expect(result.current.selectedCategory).toBeNull();
    expect(result.current.subcategoryCards).toHaveLength(6);
    expect(result.current.visibleServices).toHaveLength(0);
  });

  it('opens child services when a subcategory card is selected', () => {
    const { result } = renderCatalog();

    act(() => {
      result.current.handleSubcategorySelect('Indoor Lighting');
    });

    expect(result.current.isBrowsingServices).toBe(true);
    expect(result.current.selectedCategory).toBe('Indoor Lighting');
    expect(result.current.visibleServices).toHaveLength(8);
    expect(
      result.current.visibleServices.every((service) => service.category === 'Indoor Lighting'),
    ).toBe(true);
  });

  it('returns to subcategory cards from the services view', () => {
    const { result } = renderCatalog();

    act(() => {
      result.current.handleSubcategorySelect('Outdoor Lighting');
    });
    act(() => {
      result.current.handleBackToSubcategories();
    });

    expect(result.current.isBrowsingServices).toBe(false);
    expect(result.current.selectedCategory).toBeNull();
    expect(result.current.visibleServices).toHaveLength(0);
  });

  it('scrolls to the top when opening or leaving a subcategory', () => {
    const { result } = renderCatalog();

    act(() => {
      result.current.handleSubcategorySelect('Indoor Lighting');
    });
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

    window.scrollTo.mockClear();

    act(() => {
      result.current.handleBackToSubcategories();
    });
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
