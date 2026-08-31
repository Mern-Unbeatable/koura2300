import {
  calculateFlooringEstimate,
  formatFlooringEstimate,
  hasFlooringCalculator,
  validateRoomSquareFeet,
} from '../flooringCalculatorUtils';
import { FLOORING_CALCULATOR_COPY } from '../flooringCalculatorCopy';
import {
  FLOORING_CALCULATOR_DEFAULT_ESTIMATE,
  FLOORING_CATALOG_TITLE,
} from '../flooringCalculatorData';

describe('flooringCalculatorUtils', () => {
  it('detects Flooring catalog services for the calculator', () => {
    expect(hasFlooringCalculator({ catalogTitle: FLOORING_CATALOG_TITLE })).toBe(true);
    expect(hasFlooringCalculator({ catalogTitle: 'Lighting' })).toBe(false);
    expect(hasFlooringCalculator(null)).toBe(false);
  });

  it('validates room square footage input', () => {
    expect(validateRoomSquareFeet('')).toBe(FLOORING_CALCULATOR_COPY.errors.roomRequired);
    expect(validateRoomSquareFeet('0')).toBe(FLOORING_CALCULATOR_COPY.errors.roomInvalid);
    expect(validateRoomSquareFeet('-5')).toBe(FLOORING_CALCULATOR_COPY.errors.roomInvalid);
    expect(validateRoomSquareFeet('15')).toBe('');
  });

  it('calculates the Figma-aligned estimate from room size', () => {
    expect(calculateFlooringEstimate(15)).toBe(FLOORING_CALCULATOR_DEFAULT_ESTIMATE);
    expect(calculateFlooringEstimate(20)).toBe(170);
    expect(calculateFlooringEstimate(0)).toBe(FLOORING_CALCULATOR_DEFAULT_ESTIMATE);
  });

  it('formats the estimate for display', () => {
    expect(formatFlooringEstimate(145)).toBe('$145');
  });
});
