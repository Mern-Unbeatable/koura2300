import {
  calculateInsulationEstimate,
  formatInsulationEstimate,
  hasInsulationCalculator,
  validateArea,
} from '../insulationCalculatorUtils';
import { INSULATION_CALCULATOR_COPY } from '../insulationCalculatorCopy';
import {
  INSULATION_CALCULATOR_DEFAULT_ESTIMATE,
  INSULATION_CATALOG_TITLE,
  INSULATION_CATEGORY_NAME,
} from '../insulationCalculatorData';

describe('insulationCalculatorUtils', () => {
  it('detects only Walls & Ceilings Insulation services for the calculator', () => {
    expect(
      hasInsulationCalculator({
        catalogTitle: INSULATION_CATALOG_TITLE,
        category: INSULATION_CATEGORY_NAME,
      }),
    ).toBe(true);
    expect(
      hasInsulationCalculator({
        catalogTitle: INSULATION_CATALOG_TITLE,
        category: 'Painting',
      }),
    ).toBe(false);
    expect(
      hasInsulationCalculator({
        catalogTitle: 'Flooring',
        category: INSULATION_CATEGORY_NAME,
      }),
    ).toBe(false);
  });

  it('validates area input', () => {
    expect(validateArea('')).toBe(INSULATION_CALCULATOR_COPY.errors.areaRequired);
    expect(validateArea('0')).toBe(INSULATION_CALCULATOR_COPY.errors.areaInvalid);
    expect(validateArea('15')).toBe('');
  });

  it('calculates the Figma-aligned estimate from area', () => {
    expect(calculateInsulationEstimate(15)).toBe(INSULATION_CALCULATOR_DEFAULT_ESTIMATE);
    expect(calculateInsulationEstimate(20)).toBe(170);
    expect(calculateInsulationEstimate(0)).toBe(INSULATION_CALCULATOR_DEFAULT_ESTIMATE);
  });

  it('formats the estimate for display', () => {
    expect(formatInsulationEstimate(145)).toBe('$145');
  });
});
