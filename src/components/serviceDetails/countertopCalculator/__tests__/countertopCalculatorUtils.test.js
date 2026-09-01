import {
  calculateCountertopEstimate,
  formatCountertopEstimate,
  hasCountertopCalculator,
  validateCounterLength,
} from '../countertopCalculatorUtils';
import { COUNTERTOP_CALCULATOR_COPY } from '../countertopCalculatorCopy';
import {
  COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE,
  COUNTERTOP_CATALOG_TITLE,
  COUNTERTOP_CATEGORY_NAME,
} from '../countertopCalculatorData';

describe('countertopCalculatorUtils', () => {
  it('detects only Kitchen Countertop Services for the calculator', () => {
    expect(
      hasCountertopCalculator({
        catalogTitle: COUNTERTOP_CATALOG_TITLE,
        category: COUNTERTOP_CATEGORY_NAME,
      }),
    ).toBe(true);
    expect(
      hasCountertopCalculator({
        catalogTitle: COUNTERTOP_CATALOG_TITLE,
        category: 'Sink Services',
      }),
    ).toBe(false);
    expect(
      hasCountertopCalculator({
        catalogTitle: 'Flooring',
        category: COUNTERTOP_CATEGORY_NAME,
      }),
    ).toBe(false);
  });

  it('validates counter length input', () => {
    expect(validateCounterLength('')).toBe(COUNTERTOP_CALCULATOR_COPY.errors.lengthRequired);
    expect(validateCounterLength('0')).toBe(COUNTERTOP_CALCULATOR_COPY.errors.lengthInvalid);
    expect(validateCounterLength('10')).toBe('');
  });

  it('calculates the Figma-aligned estimate from counter length', () => {
    expect(calculateCountertopEstimate(10)).toBe(COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE);
    expect(calculateCountertopEstimate(20)).toBe(195);
    expect(calculateCountertopEstimate(0)).toBe(COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE);
  });

  it('formats the estimate for display', () => {
    expect(formatCountertopEstimate(145)).toBe('$145');
  });
});
