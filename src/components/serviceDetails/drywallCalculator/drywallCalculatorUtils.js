import { DRYWALL_CALCULATOR_COPY } from './drywallCalculatorCopy';
import {
  DRYWALL_CALCULATOR_BASE_FEE,
  DRYWALL_CALCULATOR_DEFAULT_ESTIMATE,
  DRYWALL_CALCULATOR_PRICE_PER_SQ_FT,
  DRYWALL_CATALOG_TITLE,
  DRYWALL_CATEGORY_NAME,
} from './drywallCalculatorData';

export const hasDrywallCalculator = (service) =>
  service?.catalogTitle === DRYWALL_CATALOG_TITLE &&
  service?.category === DRYWALL_CATEGORY_NAME;

export const parseWallDimension = (value) => {
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

export const validateWallWidth = (value, copy = DRYWALL_CALCULATOR_COPY) => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return copy.errors.widthRequired;
  }

  const parsed = parseWallDimension(trimmed);
  if (parsed === null || parsed <= 0) {
    return copy.errors.widthInvalid;
  }

  return '';
};

export const validateWallHeight = (value, copy = DRYWALL_CALCULATOR_COPY) => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return copy.errors.heightRequired;
  }

  const parsed = parseWallDimension(trimmed);
  if (parsed === null || parsed <= 0) {
    return copy.errors.heightInvalid;
  }

  return '';
};

export const calculateDrywallEstimate = (
  widthFt,
  heightFt,
  {
    baseFee = DRYWALL_CALCULATOR_BASE_FEE,
    pricePerSqFt = DRYWALL_CALCULATOR_PRICE_PER_SQ_FT,
    fallbackEstimate = DRYWALL_CALCULATOR_DEFAULT_ESTIMATE,
  } = {},
) => {
  if (!Number.isFinite(widthFt) || widthFt <= 0 || !Number.isFinite(heightFt) || heightFt <= 0) {
    return fallbackEstimate;
  }

  return Math.round(baseFee + widthFt * heightFt * pricePerSqFt);
};

export const formatDrywallEstimate = (estimate) => `$${estimate}`;
