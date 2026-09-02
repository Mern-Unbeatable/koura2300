import {
  calculateFramingEstimate,
  formatFramingEstimate,
  hasFramingCalculator,
  validateWallHeight,
  validateWallLength,
} from '../framingCalculatorUtils';
import { FRAMING_CALCULATOR_COPY } from '../framingCalculatorCopy';
import {
  FRAMING_CALCULATOR_DEFAULT_ESTIMATE,
  FRAMING_CATALOG_TITLE,
  FRAMING_CATEGORY_NAME,
} from '../framingCalculatorData';

describe('framingCalculatorUtils', () => {
  it('detects only Walls & Ceilings Framing services for the calculator', () => {
    expect(
      hasFramingCalculator({
        catalogTitle: FRAMING_CATALOG_TITLE,
        category: FRAMING_CATEGORY_NAME,
      }),
    ).toBe(true);
    expect(
      hasFramingCalculator({
        catalogTitle: FRAMING_CATALOG_TITLE,
        category: 'Insulation',
      }),
    ).toBe(false);
    expect(
      hasFramingCalculator({
        catalogTitle: 'Kitchen',
        category: FRAMING_CATEGORY_NAME,
      }),
    ).toBe(false);
  });

  it('validates wall length and height inputs', () => {
    expect(validateWallLength('')).toBe(FRAMING_CALCULATOR_COPY.errors.lengthRequired);
    expect(validateWallLength('0')).toBe(FRAMING_CALCULATOR_COPY.errors.lengthInvalid);
    expect(validateWallLength('15')).toBe('');
    expect(validateWallHeight('')).toBe(FRAMING_CALCULATOR_COPY.errors.heightRequired);
    expect(validateWallHeight('0')).toBe(FRAMING_CALCULATOR_COPY.errors.heightInvalid);
    expect(validateWallHeight('12')).toBe('');
  });

  it('calculates the Figma-aligned estimate from wall length and height', () => {
    expect(calculateFramingEstimate(15, 12)).toBe(FRAMING_CALCULATOR_DEFAULT_ESTIMATE);
    expect(calculateFramingEstimate(20, 10)).toBe(155);
    expect(calculateFramingEstimate(0, 12)).toBe(FRAMING_CALCULATOR_DEFAULT_ESTIMATE);
  });

  it('formats the estimate for display', () => {
    expect(formatFramingEstimate(145)).toBe('$145');
  });
});
