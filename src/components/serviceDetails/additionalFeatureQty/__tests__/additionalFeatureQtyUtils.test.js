import { SERVICE_PACKAGES } from '../../serviceDetailsData';
import {
  ADDITIONAL_FEATURE_QTY_VIEWPORT,
} from '../additionalFeatureQtyData';
import {
  buildMeasurementUnitLabel,
  computeAdditionalFeatureSurcharge,
  formatAdditionalFeatureQuantity,
  getAdditionalFeatureNotes,
  getFilledAdditionalFeatures,
  hasAdditionalFeatures,
  hasSelectedMeasurementUnit,
  parseIncludedBaseline,
  parsePercentRate,
} from '../additionalFeatureQtyUtils';

describe('additionalFeatureQtyUtils', () => {
  const feature = {
    id: 'feature-1',
    name: 'Caulking',
    measurementUnit: 'ft',
    quantity: '2',
    standardPrice: '25%',
    premiumPrice: '30%',
    note1: 'First 2 ft included',
    note2: 'Each additional ft adds a surcharge',
  };

  it('exposes responsive viewport breakpoints', () => {
    expect(ADDITIONAL_FEATURE_QTY_VIEWPORT.MOBILE_S).toBe(320);
    expect(ADDITIONAL_FEATURE_QTY_VIEWPORT.LAPTOP).toBe(1020);
    expect(ADDITIONAL_FEATURE_QTY_VIEWPORT.DESKTOP).toBe(1440);
  });

  it('hides blank feature rows and surfaces filled notes', () => {
    expect(hasAdditionalFeatures([])).toBe(false);
    expect(
      hasAdditionalFeatures([
        {
          id: 'empty',
          name: '',
          quantity: '',
          standardPrice: '',
          premiumPrice: '',
          note1: '',
          note2: '',
        },
      ]),
    ).toBe(false);
    expect(hasAdditionalFeatures([feature])).toBe(true);
    expect(getFilledAdditionalFeatures([feature])).toHaveLength(1);
    expect(getAdditionalFeatureNotes(feature)).toEqual([
      'First 2 ft included',
      'Each additional ft adds a surcharge',
    ]);
  });

  it('parses included baseline, percent rates, padded qty, and measurement labels', () => {
    expect(parseIncludedBaseline(feature)).toBe(2);
    expect(parseIncludedBaseline({ quantity: '' })).toBe(1);
    expect(parsePercentRate('25%')).toBe(0.25);
    expect(parsePercentRate('30')).toBe(0.3);
    expect(parsePercentRate('')).toBe(0);
    expect(formatAdditionalFeatureQuantity(1)).toBe('01');
    expect(formatAdditionalFeatureQuantity(12)).toBe('12');
    expect(hasSelectedMeasurementUnit(feature)).toBe(true);
    expect(hasSelectedMeasurementUnit({ measurementUnit: '' })).toBe(false);
    expect(buildMeasurementUnitLabel(feature)).toBe('Number of ft');
    expect(buildMeasurementUnitLabel({ measurementUnit: 'cm' })).toBe('Number of cm');
    expect(buildMeasurementUnitLabel({ measurementUnit: '' })).toBe('');
  });

  it('computes surcharge only for quantity above the included baseline', () => {
    expect(
      computeAdditionalFeatureSurcharge({
        feature,
        selectedPackageId: SERVICE_PACKAGES.STANDARD,
        selectedPackagePrice: 200,
        quantity: 2,
      }),
    ).toBe(0);

    expect(
      computeAdditionalFeatureSurcharge({
        feature,
        selectedPackageId: SERVICE_PACKAGES.STANDARD,
        selectedPackagePrice: 200,
        quantity: 4,
      }),
    ).toBe(100);

    expect(
      computeAdditionalFeatureSurcharge({
        feature,
        selectedPackageId: SERVICE_PACKAGES.PREMIUM,
        selectedPackagePrice: 200,
        quantity: 3,
      }),
    ).toBe(60);
  });
});
