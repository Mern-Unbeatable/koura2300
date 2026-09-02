import { INSULATION_CALCULATOR_COPY } from './insulationCalculatorCopy';
import {
  INSULATION_CALCULATOR_BASE_FEE,
  INSULATION_CALCULATOR_DEFAULT_ESTIMATE,
  INSULATION_CALCULATOR_PRICE_PER_SQ_FT,
  INSULATION_CATALOG_TITLE,
  INSULATION_CATEGORY_NAME,
} from './insulationCalculatorData';

export const hasInsulationCalculator = (service) =>
  service?.catalogTitle === INSULATION_CATALOG_TITLE &&
  service?.category === INSULATION_CATEGORY_NAME;

export const parseArea = (value) => {
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

export const validateArea = (value, copy = INSULATION_CALCULATOR_COPY) => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return copy.errors.areaRequired;
  }

  const parsed = parseArea(trimmed);
  if (parsed === null || parsed <= 0) {
    return copy.errors.areaInvalid;
  }

  return '';
};

export const calculateInsulationEstimate = (
  areaSqFt,
  {
    baseFee = INSULATION_CALCULATOR_BASE_FEE,
    pricePerSqFt = INSULATION_CALCULATOR_PRICE_PER_SQ_FT,
    fallbackEstimate = INSULATION_CALCULATOR_DEFAULT_ESTIMATE,
  } = {},
) => {
  if (!Number.isFinite(areaSqFt) || areaSqFt <= 0) {
    return fallbackEstimate;
  }

  return Math.round(baseFee + areaSqFt * pricePerSqFt);
};

export const formatInsulationEstimate = (estimate) => `$${estimate}`;
