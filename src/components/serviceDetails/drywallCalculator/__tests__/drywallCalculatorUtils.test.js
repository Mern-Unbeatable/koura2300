import {
  calculateDrywallEstimate,
  formatDrywallEstimate,
  hasDrywallCalculator,
  validateWallHeight,
  validateWallWidth,
} from '../drywallCalculatorUtils';
import { DRYWALL_CALCULATOR_COPY } from '../drywallCalculatorCopy';
import {
  DRYWALL_CALCULATOR_DEFAULT_ESTIMATE,
  DRYWALL_CATALOG_TITLE,
  DRYWALL_CATEGORY_NAME,
} from '../drywallCalculatorData';

describe('drywallCalculatorUtils', () => {
  it('detects only Walls & Ceilings Drywall Services for the calculator', () => {
    expect(
      hasDrywallCalculator({
        catalogTitle: DRYWALL_CATALOG_TITLE,
        category: DRYWALL_CATEGORY_NAME,
      }),
    ).toBe(true);
    expect(
      hasDrywallCalculator({
        catalogTitle: DRYWALL_CATALOG_TITLE,
        category: 'Painting',
      }),
    ).toBe(false);
    expect(
      hasDrywallCalculator({
        catalogTitle: 'Kitchen',
        category: DRYWALL_CATEGORY_NAME,
      }),
    ).toBe(false);
  });

  it('validates wall width and height inputs', () => {
    expect(validateWallWidth('')).toBe(DRYWALL_CALCULATOR_COPY.errors.widthRequired);
    expect(validateWallWidth('0')).toBe(DRYWALL_CALCULATOR_COPY.errors.widthInvalid);
    expect(validateWallWidth('15')).toBe('');
    expect(validateWallHeight('')).toBe(DRYWALL_CALCULATOR_COPY.errors.heightRequired);
    expect(validateWallHeight('0')).toBe(DRYWALL_CALCULATOR_COPY.errors.heightInvalid);
    expect(validateWallHeight('12')).toBe('');
  });

  it('calculates the Figma-aligned estimate from wall width and height', () => {
    expect(calculateDrywallEstimate(15, 12)).toBe(DRYWALL_CALCULATOR_DEFAULT_ESTIMATE);
    expect(calculateDrywallEstimate(20, 10)).toBe(155);
    expect(calculateDrywallEstimate(0, 12)).toBe(DRYWALL_CALCULATOR_DEFAULT_ESTIMATE);
  });

  it('formats the estimate for display', () => {
    expect(formatDrywallEstimate(145)).toBe('$145');
  });
});
