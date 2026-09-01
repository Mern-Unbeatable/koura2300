import { BATHROOM_TILE_CALCULATOR_COPY } from './bathroomTileCalculatorCopy';
import {
  BATHROOM_TILE_CALCULATOR_BASE_FEE,
  BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE,
  BATHROOM_TILE_CALCULATOR_PRICE_PER_SQ_FT,
  BATHROOM_TILE_CATALOG_TITLE,
  BATHROOM_TILE_CATEGORY_NAME,
} from './bathroomTileCalculatorData';

export const hasBathroomTileCalculator = (service) =>
  service?.catalogTitle === BATHROOM_TILE_CATALOG_TITLE &&
  service?.category === BATHROOM_TILE_CATEGORY_NAME;

export const parseFloorArea = (value) => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
};

export const validateFloorArea = (value, copy = BATHROOM_TILE_CALCULATOR_COPY) => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return copy.errors.floorRequired;
  }

  const parsed = parseFloorArea(trimmed);
  if (parsed === null || parsed <= 0) {
    return copy.errors.floorInvalid;
  }

  return '';
};

export const calculateBathroomTileEstimate = (
  floorSqFt,
  {
    baseFee = BATHROOM_TILE_CALCULATOR_BASE_FEE,
    pricePerSqFt = BATHROOM_TILE_CALCULATOR_PRICE_PER_SQ_FT,
    fallbackEstimate = BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE,
  } = {},
) => {
  if (!Number.isFinite(floorSqFt) || floorSqFt <= 0) {
    return fallbackEstimate;
  }

  return Math.round(baseFee + floorSqFt * pricePerSqFt);
};

export const formatBathroomTileEstimate = (estimate) => `$${estimate}`;
