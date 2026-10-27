import { act, renderHook } from '@testing-library/react';
import { SERVICE_PACKAGES } from '../../serviceDetailsData';
import useAdditionalFeatureQty from '../useAdditionalFeatureQty';

describe('useAdditionalFeatureQty', () => {
  const feature = {
    id: 'feature-1',
    name: 'Handles',
    measurementUnit: 'ft',
    quantity: '3',
    standardPrice: '25%',
    premiumPrice: '30%',
    note1: 'First 3 handles: included in base labor price.',
    note2: 'Each additional: +25% of selected labor price.',
  };

  it('shows Number of unit label and surcharges extras when measurement unit is set', () => {
    const { result } = renderHook(() =>
      useAdditionalFeatureQty({
        additionalFeatures: [feature],
        selectedPackageId: SERVICE_PACKAGES.STANDARD,
        selectedPackagePrice: 200,
      }),
    );

    expect(result.current.isVisible).toBe(true);
    expect(result.current.unitLabel).toBe('Number of ft');
    expect(result.current.quantity).toBe(1);
    expect(result.current.quantityLabel).toBe('01');
    expect(result.current.surcharge).toBe(0);
    expect(result.current.canDecrement).toBe(false);

    act(() => {
      result.current.onIncrement();
      result.current.onIncrement();
      result.current.onIncrement();
    });
    expect(result.current.quantity).toBe(4);
    expect(result.current.quantityLabel).toBe('04');
    expect(result.current.surcharge).toBe(50);
  });

  it('hides the qty UI when measurement unit is not selected', () => {
    const { result } = renderHook(() =>
      useAdditionalFeatureQty({
        additionalFeatures: [{ ...feature, measurementUnit: '' }],
        selectedPackageId: SERVICE_PACKAGES.STANDARD,
        selectedPackagePrice: 200,
      }),
    );

    expect(result.current.isVisible).toBe(false);
    expect(result.current.unitLabel).toBe('');
  });

  it('is hidden when features are empty', () => {
    const { result } = renderHook(() =>
      useAdditionalFeatureQty({
        additionalFeatures: [],
        selectedPackageId: SERVICE_PACKAGES.STANDARD,
        selectedPackagePrice: 200,
      }),
    );

    expect(result.current.isVisible).toBe(false);
  });
});
