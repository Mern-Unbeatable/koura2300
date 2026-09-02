import { FRAMING_CALCULATOR_COPY } from './framingCalculatorCopy';
import {
  FRAMING_CALCULATOR_BASE_FEE,
  FRAMING_CALCULATOR_DEFAULT_ESTIMATE,
  FRAMING_CALCULATOR_PRICE_PER_SQ_FT,
  FRAMING_CATALOG_TITLE,
  FRAMING_CATEGORY_NAME,
} from './framingCalculatorData';

export const hasFramingCalculator = (service) =>
  service?.catalogTitle === FRAMING_CATALOG_TITLE &&
  service?.category === FRAMING_CATEGORY_NAME;

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

export const validateWallLength = (value, copy = FRAMING_CALCULATOR_COPY) => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return copy.errors.lengthRequired;
  }

  const parsed = parseWallDimension(trimmed);
  if (parsed === null || parsed <= 0) {
    return copy.errors.lengthInvalid;
  }

  return '';
};

export const validateWallHeight = (value, copy = FRAMING_CALCULATOR_COPY) => {
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

export const calculateFramingEstimate = (
  lengthFt,
  heightFt,
  {
    baseFee = FRAMING_CALCULATOR_BASE_FEE,
    pricePerSqFt = FRAMING_CALCULATOR_PRICE_PER_SQ_FT,
    fallbackEstimate = FRAMING_CALCULATOR_DEFAULT_ESTIMATE,
  } = {},
) => {
  if (!Number.isFinite(lengthFt) || lengthFt <= 0 || !Number.isFinite(heightFt) || heightFt <= 0) {
    return fallbackEstimate;
  }

  return Math.round(baseFee + lengthFt * heightFt * pricePerSqFt);
};

export const formatFramingEstimate = (estimate) => `$${estimate}`;
