import {
  FLOORING_CALCULATOR_BASE_FEE,
  FLOORING_CALCULATOR_DEFAULT_ESTIMATE,
  FLOORING_CALCULATOR_PRICE_PER_SQ_FT,
  FLOORING_CATALOG_TITLE,
} from './flooringCalculatorData';
import { FLOORING_CALCULATOR_COPY } from './flooringCalculatorCopy';

export const hasFlooringCalculator = (service) =>
  service?.catalogTitle === FLOORING_CATALOG_TITLE;

export const parseRoomSquareFeet = (value) => {
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

export const validateRoomSquareFeet = (value, copy = FLOORING_CALCULATOR_COPY) => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return copy.errors.roomRequired;
  }

  const parsed = parseRoomSquareFeet(trimmed);
  if (parsed === null || parsed <= 0) {
    return copy.errors.roomInvalid;
  }

  return '';
};

export const calculateFlooringEstimate = (
  roomSqFt,
  {
    baseFee = FLOORING_CALCULATOR_BASE_FEE,
    pricePerSqFt = FLOORING_CALCULATOR_PRICE_PER_SQ_FT,
    fallbackEstimate = FLOORING_CALCULATOR_DEFAULT_ESTIMATE,
  } = {},
) => {
  if (!Number.isFinite(roomSqFt) || roomSqFt <= 0) {
    return fallbackEstimate;
  }

  return Math.round(baseFee + roomSqFt * pricePerSqFt);
};

export const formatFlooringEstimate = (estimate) => `$${estimate}`;
