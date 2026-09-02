import { PAINTING_CALCULATOR_COPY } from './paintingCalculatorCopy';
import {
  PAINTING_CALCULATOR_BASE_FEE,
  PAINTING_CALCULATOR_DEFAULT_ESTIMATE,
  PAINTING_CALCULATOR_PRICE_PER_SQ_FT,
  PAINTING_CATALOG_TITLE,
  PAINTING_CATEGORY_NAME,
} from './paintingCalculatorData';

export const hasPaintingCalculator = (service) =>
  service?.catalogTitle === PAINTING_CATALOG_TITLE &&
  service?.category === PAINTING_CATEGORY_NAME;

export const parseRoomDimension = (value) => {
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

const validateRequiredPositiveDimension = (value, requiredMessage, invalidMessage) => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return requiredMessage;
  }

  const parsed = parseRoomDimension(trimmed);
  if (parsed === null || parsed <= 0) {
    return invalidMessage;
  }

  return '';
};

export const validateRoomLength = (value, copy = PAINTING_CALCULATOR_COPY) =>
  validateRequiredPositiveDimension(
    value,
    copy.errors.lengthRequired,
    copy.errors.lengthInvalid,
  );

export const validateRoomWidth = (value, copy = PAINTING_CALCULATOR_COPY) =>
  validateRequiredPositiveDimension(value, copy.errors.widthRequired, copy.errors.widthInvalid);

export const validateCeilingHeight = (value, copy = PAINTING_CALCULATOR_COPY) =>
  validateRequiredPositiveDimension(
    value,
    copy.errors.heightRequired,
    copy.errors.heightInvalid,
  );

/** Paintable wall area: perimeter walls = 2 × (length + width) × height. */
export const calculatePaintableWallArea = (lengthFt, widthFt, heightFt) => {
  if (
    !Number.isFinite(lengthFt) ||
    lengthFt <= 0 ||
    !Number.isFinite(widthFt) ||
    widthFt <= 0 ||
    !Number.isFinite(heightFt) ||
    heightFt <= 0
  ) {
    return 0;
  }

  return 2 * (lengthFt + widthFt) * heightFt;
};

export const calculatePaintingEstimate = (
  lengthFt,
  widthFt,
  heightFt,
  {
    baseFee = PAINTING_CALCULATOR_BASE_FEE,
    pricePerSqFt = PAINTING_CALCULATOR_PRICE_PER_SQ_FT,
    fallbackEstimate = PAINTING_CALCULATOR_DEFAULT_ESTIMATE,
  } = {},
) => {
  const wallArea = calculatePaintableWallArea(lengthFt, widthFt, heightFt);
  if (wallArea <= 0) {
    return fallbackEstimate;
  }

  return Math.round(baseFee + wallArea * pricePerSqFt);
};

export const formatPaintingEstimate = (estimate) => `$${estimate}`;
