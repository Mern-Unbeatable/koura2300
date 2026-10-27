import { act, renderHook } from '@testing-library/react';
import { SERVICE_PACKAGES } from '../../serviceDetailsData';
import { VARIANT_SELECTOR_KIND } from '../variantSelectorData';
import useVariantSelector from '../useVariantSelector';

describe('useVariantSelector', () => {
  const sizes = [
    { id: 'size-24', size: '24 Inch', standardPrice: '$180.00', premiumPrice: '$220.00' },
    { id: 'size-36', size: '36 Inch', standardPrice: '$200.00', premiumPrice: '$250.00' },
  ];
  const basePackages = [
    { id: SERVICE_PACKAGES.STANDARD, title: 'Standard', price: 100, features: ['A'] },
    { id: SERVICE_PACKAGES.PREMIUM, title: 'Premium', price: 150, features: ['B'] },
  ];

  it('selects the first size by default and updates package prices', () => {
    const { result } = renderHook(() =>
      useVariantSelector({ sizes, options: [], packages: basePackages }),
    );

    expect(result.current.kind).toBe(VARIANT_SELECTOR_KIND.SIZES);
    expect(result.current.selectedId).toBe('size-24');
    expect(result.current.displayPackages[0].price).toBe(180);
    expect(result.current.isVisible).toBe(true);
  });

  it('switches selected variant and keeps features intact', () => {
    const { result } = renderHook(() =>
      useVariantSelector({ sizes, options: [], packages: basePackages }),
    );

    act(() => {
      result.current.onSelectVariant('size-36');
    });

    expect(result.current.selectedId).toBe('size-36');
    expect(result.current.displayPackages[0].price).toBe(200);
    expect(result.current.displayPackages[0].features).toEqual(['A']);
  });

  it('is hidden when neither sizes nor options are filled', () => {
    const { result } = renderHook(() =>
      useVariantSelector({ sizes: [], options: [], packages: basePackages }),
    );

    expect(result.current.isVisible).toBe(false);
    expect(result.current.displayPackages).toEqual(basePackages);
  });
});
