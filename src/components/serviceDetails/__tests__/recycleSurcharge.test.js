import {
  RECYCLE_SURCHARGE_RATE,
  applyRecycleSurchargeToPackages,
  computeRecycleSurcharge,
  createConfirmedCartItem,
  getPriceWithRecycleSurcharge,
} from '../serviceDetailsData';

describe('recycle surcharge', () => {
  it('uses a 5 percent rate of the package price', () => {
    expect(RECYCLE_SURCHARGE_RATE).toBe(0.05);
    expect(computeRecycleSurcharge(487)).toBe(24);
    expect(computeRecycleSurcharge(277)).toBe(14);
    expect(computeRecycleSurcharge(145)).toBe(7);
    expect(computeRecycleSurcharge(0)).toBe(0);
  });

  it('adds the surcharge only when recycle is selected', () => {
    expect(getPriceWithRecycleSurcharge(487, false)).toBe(487);
    expect(getPriceWithRecycleSurcharge(487, true)).toBe(511);
    expect(getPriceWithRecycleSurcharge(277, true)).toBe(291);
  });

  it('maps package display prices when recycle is enabled', () => {
    const packages = [
      { id: 'standard', title: 'Standard', price: 487 },
      { id: 'premium', title: 'Premium', price: 277 },
    ];

    expect(applyRecycleSurchargeToPackages(packages, false)).toEqual(packages);
    expect(applyRecycleSurchargeToPackages(packages, true)).toEqual([
      { id: 'standard', title: 'Standard', price: 511 },
      { id: 'premium', title: 'Premium', price: 291 },
    ]);
  });

  it('stores recycle surcharge on the confirmed cart item', () => {
    const item = createConfirmedCartItem({
      service: { id: 'svc-1', title: 'Cabinet Assembly' },
      selectedPackage: { id: 'standard', price: 487 },
      needsMaterials: true,
      recycleOldMaterials: true,
    });

    expect(item.price).toBe(511);
    expect(item.recycleOldMaterials).toBe(true);
    expect(item.recycleSurcharge).toBe(24);
  });
});
