import { BACKSPLASH_CALCULATOR_COPY } from './backsplashCalculatorCopy';
import {
  BACKSPLASH_CALCULATOR_BASE_FEE,
  BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE,
  BACKSPLASH_CALCULATOR_PRICE_PER_SQ_FT,
  BACKSPLASH_CATALOG_TITLE,
  BACKSPLASH_CATEGORY_NAME,
} from './backsplashCalculatorData';

export const hasBacksplashCalculator = (service) =>
  service?.catalogTitle === BACKSPLASH_CATALOG_TITLE &&
  service?.category === BACKSPLASH_CATEGORY_NAME;

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

export const validateWallWidth = (value, copy = BACKSPLASH_CALCULATOR_COPY) => {
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

export const validateWallHeight = (value, copy = BACKSPLASH_CALCULATOR_COPY) => {
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

export const calculateBacksplashEstimate = (
  widthFt,
  heightFt,
  {
    baseFee = BACKSPLASH_CALCULATOR_BASE_FEE,
    pricePerSqFt = BACKSPLASH_CALCULATOR_PRICE_PER_SQ_FT,
    fallbackEstimate = BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE,
  } = {},
) => {
  if (!Number.isFinite(widthFt) || widthFt <= 0 || !Number.isFinite(heightFt) || heightFt <= 0) {
    return fallbackEstimate;
  }

  return Math.round(baseFee + widthFt * heightFt * pricePerSqFt);
};

export const formatBacksplashEstimate = (estimate) => `$${estimate}`;
