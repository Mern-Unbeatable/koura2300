import {
  calculateBathroomTileEstimate,
  formatBathroomTileEstimate,
  hasBathroomTileCalculator,
  validateFloorArea,
} from '../bathroomTileCalculatorUtils';
import { BATHROOM_TILE_CALCULATOR_COPY } from '../bathroomTileCalculatorCopy';
import {
  BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE,
  BATHROOM_TILE_CATALOG_TITLE,
  BATHROOM_TILE_CATEGORY_NAME,
} from '../bathroomTileCalculatorData';

describe('bathroomTileCalculatorUtils', () => {
  it('detects only Bathroom Tile & Grout Services for the calculator', () => {
    expect(
      hasBathroomTileCalculator({
        catalogTitle: BATHROOM_TILE_CATALOG_TITLE,
        category: BATHROOM_TILE_CATEGORY_NAME,
      }),
    ).toBe(true);
    expect(
      hasBathroomTileCalculator({
        catalogTitle: BATHROOM_TILE_CATALOG_TITLE,
        category: 'Plumbing Repairs',
      }),
    ).toBe(false);
    expect(
      hasBathroomTileCalculator({
        catalogTitle: 'Kitchen',
        category: BATHROOM_TILE_CATEGORY_NAME,
      }),
    ).toBe(false);
  });

  it('validates floor area input', () => {
    expect(validateFloorArea('')).toBe(BATHROOM_TILE_CALCULATOR_COPY.errors.floorRequired);
    expect(validateFloorArea('0')).toBe(BATHROOM_TILE_CALCULATOR_COPY.errors.floorInvalid);
    expect(validateFloorArea('10')).toBe('');
  });

  it('calculates the Figma-aligned estimate from floor area', () => {
    expect(calculateBathroomTileEstimate(10)).toBe(BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE);
    expect(calculateBathroomTileEstimate(20)).toBe(195);
    expect(calculateBathroomTileEstimate(0)).toBe(BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE);
  });

  it('formats the estimate for display', () => {
    expect(formatBathroomTileEstimate(145)).toBe('$145');
  });
});
