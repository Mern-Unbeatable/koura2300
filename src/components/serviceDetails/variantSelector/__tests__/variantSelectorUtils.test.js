import { SERVICE_PACKAGES } from '../../serviceDetailsData';
import {
  VARIANT_SELECTOR_KIND,
  VARIANT_SELECTOR_VIEWPORT,
} from '../variantSelectorData';
import {
  applyVariantPricesToPackages,
  getVariantItemLabel,
  hasFilledServiceOptions,
  hasFilledServiceSizes,
  parseVariantPriceValue,
  resolveVariantSelector,
} from '../variantSelectorUtils';

describe('variantSelectorUtils', () => {
  const sizes = [
    { id: 'size-24', size: '24 Inch', standardPrice: '$180.00', premiumPrice: '$220.00' },
    { id: 'size-36', size: '36 Inch', standardPrice: '$200.00', premiumPrice: '$250.00' },
  ];
  const options = [
    { id: 'opt-a', name: 'Option A', standardPrice: '$150.00', premiumPrice: '$190.00' },
    { id: 'opt-b', name: 'Option B', standardPrice: '$175.00', premiumPrice: '$210.00' },
  ];

  it('exposes responsive viewport breakpoints from the project map', () => {
    expect(VARIANT_SELECTOR_VIEWPORT.MOBILE_S).toBe(320);
    expect(VARIANT_SELECTOR_VIEWPORT.MOBILE_M).toBe(375);
    expect(VARIANT_SELECTOR_VIEWPORT.MOBILE_L).toBe(425);
    expect(VARIANT_SELECTOR_VIEWPORT.TABLET).toBe(768);
    expect(VARIANT_SELECTOR_VIEWPORT.LAPTOP).toBe(1020);
    expect(VARIANT_SELECTOR_VIEWPORT.DESKTOP).toBe(1440);
  });

  it('hides empty size and option rows and prefers sizes over options', () => {
    expect(hasFilledServiceSizes([])).toBe(false);
    expect(hasFilledServiceSizes([{ id: 'x', size: '', standardPrice: '', premiumPrice: '' }])).toBe(
      false,
    );
    expect(hasFilledServiceSizes(sizes)).toBe(true);
    expect(hasFilledServiceOptions([])).toBe(false);
    expect(hasFilledServiceOptions(options)).toBe(true);

    expect(resolveVariantSelector({ sizes, options }).kind).toBe(VARIANT_SELECTOR_KIND.SIZES);
    expect(resolveVariantSelector({ sizes: [], options }).kind).toBe(VARIANT_SELECTOR_KIND.OPTIONS);
    expect(resolveVariantSelector({ sizes: [], options: [] })).toBeNull();
  });

  it('parses variant price text and labels items by kind', () => {
    expect(parseVariantPriceValue('$200.00')).toBe(200);
    expect(parseVariantPriceValue('')).toBeNull();
    expect(getVariantItemLabel(sizes[0], VARIANT_SELECTOR_KIND.SIZES)).toBe('24 Inch');
    expect(
      getVariantItemLabel(
        { id: 'size-24', size: '24', measurementUnit: 'inch' },
        VARIANT_SELECTOR_KIND.SIZES,
      ),
    ).toBe('24 inch');
    expect(getVariantItemLabel(options[0], VARIANT_SELECTOR_KIND.OPTIONS)).toBe('Option A');
  });

  it('applies selected variant prices onto package cards', () => {
    const packages = [
      { id: SERVICE_PACKAGES.STANDARD, title: 'Standard', price: 100, features: [] },
      { id: SERVICE_PACKAGES.PREMIUM, title: 'Premium', price: 150, features: [] },
    ];
    const next = applyVariantPricesToPackages(packages, sizes[1]);

    expect(next[0].price).toBe(200);
    expect(next[1].price).toBe(250);
  });
});
