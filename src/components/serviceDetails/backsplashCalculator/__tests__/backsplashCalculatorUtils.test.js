import {
  calculateBacksplashEstimate,
  formatBacksplashEstimate,
  hasBacksplashCalculator,
  validateWallHeight,
  validateWallWidth,
} from '../backsplashCalculatorUtils';
import { BACKSPLASH_CALCULATOR_COPY } from '../backsplashCalculatorCopy';
import {
  BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE,
  BACKSPLASH_CATALOG_TITLE,
  BACKSPLASH_CATEGORY_NAME,
} from '../backsplashCalculatorData';

describe('backsplashCalculatorUtils', () => {
  it('detects only Kitchen Backsplash & Tile Services for the calculator', () => {
    expect(
      hasBacksplashCalculator({
        catalogTitle: BACKSPLASH_CATALOG_TITLE,
        category: BACKSPLASH_CATEGORY_NAME,
      }),
    ).toBe(true);
    expect(
      hasBacksplashCalculator({
        catalogTitle: BACKSPLASH_CATALOG_TITLE,
        category: 'Countertop Services',
      }),
    ).toBe(false);
    expect(
      hasBacksplashCalculator({
        catalogTitle: 'Flooring',
        category: BACKSPLASH_CATEGORY_NAME,
      }),
    ).toBe(false);
  });

  it('validates wall width and height inputs', () => {
    expect(validateWallWidth('')).toBe(BACKSPLASH_CALCULATOR_COPY.errors.widthRequired);
    expect(validateWallWidth('0')).toBe(BACKSPLASH_CALCULATOR_COPY.errors.widthInvalid);
    expect(validateWallWidth('15')).toBe('');
    expect(validateWallHeight('')).toBe(BACKSPLASH_CALCULATOR_COPY.errors.heightRequired);
    expect(validateWallHeight('0')).toBe(BACKSPLASH_CALCULATOR_COPY.errors.heightInvalid);
    expect(validateWallHeight('12')).toBe('');
  });

  it('calculates the Figma-aligned estimate from wall width and height', () => {
    expect(calculateBacksplashEstimate(15, 12)).toBe(BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE);
    expect(calculateBacksplashEstimate(20, 10)).toBe(155);
    expect(calculateBacksplashEstimate(0, 12)).toBe(BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE);
  });

  it('formats the estimate for display', () => {
    expect(formatBacksplashEstimate(145)).toBe('$145');
  });
});
