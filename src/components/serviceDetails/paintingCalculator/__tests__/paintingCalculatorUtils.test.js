import {
  calculatePaintableWallArea,
  calculatePaintingEstimate,
  formatPaintingEstimate,
  hasPaintingCalculator,
  validateCeilingHeight,
  validateRoomLength,
  validateRoomWidth,
} from '../paintingCalculatorUtils';
import { PAINTING_CALCULATOR_COPY } from '../paintingCalculatorCopy';
import {
  PAINTING_CALCULATOR_DEFAULT_ESTIMATE,
  PAINTING_CATALOG_TITLE,
  PAINTING_CATEGORY_NAME,
} from '../paintingCalculatorData';

describe('paintingCalculatorUtils', () => {
  it('detects only Walls & Ceilings Painting services for the calculator', () => {
    expect(
      hasPaintingCalculator({
        catalogTitle: PAINTING_CATALOG_TITLE,
        category: PAINTING_CATEGORY_NAME,
      }),
    ).toBe(true);
    expect(
      hasPaintingCalculator({
        catalogTitle: PAINTING_CATALOG_TITLE,
        category: 'Drywall Services',
      }),
    ).toBe(false);
    expect(
      hasPaintingCalculator({
        catalogTitle: 'Kitchen',
        category: PAINTING_CATEGORY_NAME,
      }),
    ).toBe(false);
  });

  it('validates room length, width, and ceiling height inputs', () => {
    expect(validateRoomLength('')).toBe(PAINTING_CALCULATOR_COPY.errors.lengthRequired);
    expect(validateRoomLength('0')).toBe(PAINTING_CALCULATOR_COPY.errors.lengthInvalid);
    expect(validateRoomLength('14')).toBe('');
    expect(validateRoomWidth('')).toBe(PAINTING_CALCULATOR_COPY.errors.widthRequired);
    expect(validateRoomWidth('0')).toBe(PAINTING_CALCULATOR_COPY.errors.widthInvalid);
    expect(validateRoomWidth('12')).toBe('');
    expect(validateCeilingHeight('')).toBe(PAINTING_CALCULATOR_COPY.errors.heightRequired);
    expect(validateCeilingHeight('0')).toBe(PAINTING_CALCULATOR_COPY.errors.heightInvalid);
    expect(validateCeilingHeight('8')).toBe('');
  });

  it('calculates paintable wall area and the Figma-aligned estimate', () => {
    expect(calculatePaintableWallArea(14, 12, 8)).toBe(416);
    expect(calculatePaintingEstimate(14, 12, 8)).toBe(PAINTING_CALCULATOR_DEFAULT_ESTIMATE);
    expect(calculatePaintingEstimate(10, 10, 8)).toBe(121);
    expect(calculatePaintingEstimate(0, 12, 8)).toBe(PAINTING_CALCULATOR_DEFAULT_ESTIMATE);
  });

  it('formats the estimate for display', () => {
    expect(formatPaintingEstimate(145)).toBe('$145');
  });
});
