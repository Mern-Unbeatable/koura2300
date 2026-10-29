import {
  RECYCLE_SURCHARGE_RATE,
  applyRecycleSurchargeToPackages,
  computeRecycleSurcharge,
  createConfirmedCartItem,
  formatMoneyAmount,
  getPriceWithRecycleSurcharge,
  roundMoney,
} from '../serviceDetailsData';

describe('recycle surcharge', () => {
  it('uses a 5 percent rate rounded to 2 decimal places', () => {
    expect(RECYCLE_SURCHARGE_RATE).toBe(0.05);
    expect(computeRecycleSurcharge(487)).toBe(24.35);
    expect(computeRecycleSurcharge(277)).toBe(13.85);
    expect(computeRecycleSurcharge(145)).toBe(7.25);
    expect(computeRecycleSurcharge(0)).toBe(0);
    expect(roundMoney(511.35)).toBe(511.35);
    expect(formatMoneyAmount(511.35)).toBe('511.35');
    expect(formatMoneyAmount(145)).toBe('145');
  });

  it('adds the surcharge only when recycle is selected', () => {
    expect(getPriceWithRecycleSurcharge(487, false)).toBe(487);
    expect(getPriceWithRecycleSurcharge(487, true)).toBe(511.35);
    expect(getPriceWithRecycleSurcharge(277, true)).toBe(290.85);
  });

  it('maps package display prices when recycle is enabled', () => {
    const packages = [
      { id: 'standard', title: 'Standard', price: 487 },
      { id: 'premium', title: 'Premium', price: 277 },
    ];

    expect(applyRecycleSurchargeToPackages(packages, false)).toEqual(packages);
    expect(applyRecycleSurchargeToPackages(packages, true)).toEqual([
      { id: 'standard', title: 'Standard', price: 511.35 },
      { id: 'premium', title: 'Premium', price: 290.85 },
    ]);
  });

  it('stores recycle surcharge on the confirmed cart item', () => {
    const item = createConfirmedCartItem({
      service: { id: 'svc-1', title: 'Cabinet Assembly' },
      selectedPackage: { id: 'standard', price: 487 },
      needsMaterials: true,
      recycleOldMaterials: true,
    });

    expect(item.price).toBe(511.35);
    expect(item.recycleOldMaterials).toBe(true);
    expect(item.recycleSurcharge).toBe(24.35);
  });
});
