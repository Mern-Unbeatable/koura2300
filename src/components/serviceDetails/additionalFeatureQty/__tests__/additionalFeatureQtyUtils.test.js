import { SERVICE_PACKAGES } from '../../serviceDetailsData';
import {
  ADDITIONAL_FEATURE_QTY_VIEWPORT,
} from '../additionalFeatureQtyData';
import {
  applyAdditionalFeatureSurchargeToPackages,
  buildMeasurementUnitLabel,
  computeAdditionalFeatureSurcharge,
  formatAdditionalFeatureQuantity,
  getAdditionalFeatureNotes,
  getFilledAdditionalFeatures,
  hasAdditionalFeatures,
  hasSelectedMeasurementUnit,
  parseIncludedBaseline,
  parsePercentRate,
  resolveFeaturePercentRate,
} from '../additionalFeatureQtyUtils';

describe('additionalFeatureQtyUtils', () => {
  const feature = {
    id: 'feature-1',
    name: 'Caulking',
    measurementUnit: 'ft',
    quantity: '2',
    standardPrice: '25%',
    premiumPrice: '25%',
    note1: 'First 2 ft: included in base labor price.',
    note2: 'Each additional: +25% of selected labor price.',
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
      'First 2 ft: included in base labor price.',
      'Each additional: +25% of selected labor price.',
    ]);
  });

  it('parses included baseline, percent rates, padded qty, and measurement labels', () => {
    expect(parseIncludedBaseline(feature)).toBe(2);
    expect(parseIncludedBaseline({ quantity: '' })).toBe(1);
    expect(parsePercentRate('25%')).toBe(0.25);
    expect(parsePercentRate('30%')).toBe(0.3);
    expect(parsePercentRate('30')).toBe(0);
    expect(parsePercentRate('$63.00')).toBe(0);
    expect(parsePercentRate('63')).toBe(0);
    expect(parsePercentRate('')).toBe(0);
    expect(resolveFeaturePercentRate(feature)).toBe(0.25);
    expect(resolveFeaturePercentRate({})).toBe(0.25);
    expect(resolveFeaturePercentRate({ standardPrice: '$63.00' })).toBe(0.25);
    expect(resolveFeaturePercentRate({ standardPrice: '63' })).toBe(0.25);
    expect(formatAdditionalFeatureQuantity(0)).toBe('00');
    expect(formatAdditionalFeatureQuantity(1)).toBe('01');
    expect(formatAdditionalFeatureQuantity(12)).toBe('12');
    expect(hasSelectedMeasurementUnit(feature)).toBe(true);
    expect(hasSelectedMeasurementUnit({ measurementUnit: '' })).toBe(false);
    expect(buildMeasurementUnitLabel(feature)).toBe('Number of ft');
    expect(buildMeasurementUnitLabel({ measurementUnit: 'cm' })).toBe('Number of cm');
    expect(buildMeasurementUnitLabel({ measurementUnit: '' })).toBe('');
  });

  it('adds 25% of the package price for every single unit on Standard and Premium', () => {
    expect(
      computeAdditionalFeatureSurcharge({
        feature,
        selectedPackagePrice: 318,
        quantity: 0,
      }),
    ).toBe(0);

    expect(
      computeAdditionalFeatureSurcharge({
        feature,
        selectedPackagePrice: 318,
        quantity: 1,
      }),
    ).toBe(79.5);

    expect(
      computeAdditionalFeatureSurcharge({
        feature,
        selectedPackagePrice: 607,
        quantity: 1,
      }),
    ).toBe(151.75);

    expect(
      computeAdditionalFeatureSurcharge({
        feature,
        selectedPackagePrice: 318,
        quantity: 2,
      }),
    ).toBe(159);
  });

  it('updates Standard and Premium card prices for every unit', () => {
    const packages = [
      { id: SERVICE_PACKAGES.STANDARD, title: 'Standard', price: 318 },
      { id: SERVICE_PACKAGES.PREMIUM, title: 'Premium', price: 607 },
    ];

    expect(applyAdditionalFeatureSurchargeToPackages(packages, feature, 0)).toEqual(packages);
    expect(applyAdditionalFeatureSurchargeToPackages(packages, feature, 1)).toEqual([
      { id: SERVICE_PACKAGES.STANDARD, title: 'Standard', price: 397.5 },
      { id: SERVICE_PACKAGES.PREMIUM, title: 'Premium', price: 758.75 },
    ]);
  });

  it('does not treat dollar feature prices as percents (avoids $518.34 / $989.41)', () => {
    const packages = [
      { id: SERVICE_PACKAGES.STANDARD, title: 'Standard', price: 318 },
      { id: SERVICE_PACKAGES.PREMIUM, title: 'Premium', price: 607 },
    ];
    const dollarFeature = { ...feature, standardPrice: '$63.00', premiumPrice: '$63.00' };

    expect(applyAdditionalFeatureSurchargeToPackages(packages, dollarFeature, 1)).toEqual([
      { id: SERVICE_PACKAGES.STANDARD, title: 'Standard', price: 397.5 },
      { id: SERVICE_PACKAGES.PREMIUM, title: 'Premium', price: 758.75 },
    ]);
  });
});
