import { COUNTERTOP_CALCULATOR_COPY } from './countertopCalculatorCopy';
import {
  COUNTERTOP_CALCULATOR_BASE_FEE,
  COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE,
  COUNTERTOP_CALCULATOR_PRICE_PER_SQ_FT,
  COUNTERTOP_CATALOG_TITLE,
  COUNTERTOP_CATEGORY_NAME,
} from './countertopCalculatorData';

export const hasCountertopCalculator = (service) =>
  service?.catalogTitle === COUNTERTOP_CATALOG_TITLE &&
  service?.category === COUNTERTOP_CATEGORY_NAME;

export const parseCounterLength = (value) => {
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

export const validateCounterLength = (value, copy = COUNTERTOP_CALCULATOR_COPY) => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return copy.errors.lengthRequired;
  }

  const parsed = parseCounterLength(trimmed);
  if (parsed === null || parsed <= 0) {
    return copy.errors.lengthInvalid;
  }

  return '';
};

export const calculateCountertopEstimate = (
  lengthSqFt,
  {
    baseFee = COUNTERTOP_CALCULATOR_BASE_FEE,
    pricePerSqFt = COUNTERTOP_CALCULATOR_PRICE_PER_SQ_FT,
    fallbackEstimate = COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE,
  } = {},
) => {
  if (!Number.isFinite(lengthSqFt) || lengthSqFt <= 0) {
    return fallbackEstimate;
  }

  return Math.round(baseFee + lengthSqFt * pricePerSqFt);
};

export const formatCountertopEstimate = (estimate) => `$${estimate}`;
