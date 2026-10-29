import { roundMoney } from '../serviceDetailsData';
import {
  ADDITIONAL_FEATURE_QTY_DEFAULT_INCLUDED,
  ADDITIONAL_FEATURE_QTY_DEFAULT_RATE,
  ADDITIONAL_FEATURE_QTY_MIN,
  ADDITIONAL_FEATURE_QTY_PAD_LENGTH,
} from './additionalFeatureQtyData';

const isBlank = (value) => !String(value ?? '').trim();

const isFilledFeatureRow = (row) =>
  Boolean(row) &&
  (!isBlank(row.name) ||
    !isBlank(row.measurementUnit) ||
    !isBlank(row.note1) ||
    !isBlank(row.note2) ||
    !isBlank(row.standardPrice) ||
    !isBlank(row.premiumPrice) ||
    !isBlank(row.quantity));

export const getFilledAdditionalFeatures = (features) =>
  (Array.isArray(features) ? features : []).filter(isFilledFeatureRow);

export const hasAdditionalFeatures = (features) =>
  getFilledAdditionalFeatures(features).length > 0;

export const resolveMeasurementUnit = (feature) =>
  String(feature?.measurementUnit ?? '').trim();

export const hasSelectedMeasurementUnit = (feature) =>
  Boolean(resolveMeasurementUnit(feature));

export const buildMeasurementUnitLabel = (feature, { prefix } = {}) => {
  const unit = resolveMeasurementUnit(feature);
  if (!unit) {
    return '';
  }

  const labelPrefix = String(prefix ?? '').trim() || 'Number of';
  return `${labelPrefix} ${unit}`;
};

export const getAdditionalFeatureNotes = (feature) =>
  [feature?.note1, feature?.note2].map((note) => String(note ?? '').trim()).filter(Boolean);

export const parseIncludedBaseline = (feature) => {
  const numeric = Number(String(feature?.quantity ?? '').trim());
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return ADDITIONAL_FEATURE_QTY_DEFAULT_INCLUDED;
  }

  return Math.floor(numeric);
};

export const formatAdditionalFeatureQuantity = (quantity) => {
  const numeric = Number(quantity);
  const safeQuantity = Number.isFinite(numeric)
    ? Math.max(ADDITIONAL_FEATURE_QTY_MIN, numeric)
    : ADDITIONAL_FEATURE_QTY_MIN;

  return String(safeQuantity).padStart(ADDITIONAL_FEATURE_QTY_PAD_LENGTH, '0');
};

export const parsePercentRate = (percentText) => {
  const raw = String(percentText ?? '').trim();
  // Dollar amounts like "$63.00" must not become 63% (that produced $518.34 from $318).
  if (!raw || raw.includes('$')) {
    return 0;
  }

  const cleaned = raw.replace(/[^0-9.]/g, '');
  if (!cleaned) {
    return 0;
  }

  const numeric = Number(cleaned);
  if (!Number.isFinite(numeric) || numeric <= 0 || numeric > 100) {
    return 0;
  }

  // Require an explicit % so bare values like "63" are not treated as 63%.
  if (!raw.includes('%')) {
    return 0;
  }

  return numeric / 100;
};

/**
 * Same % for Standard and Premium cards: each unit adds rate × that card's price.
 * Prefer admin Standard %, then Premium %, else 25%.
 */
export const resolveFeaturePercentRate = (feature) => {
  const standardRate = parsePercentRate(feature?.standardPrice);
  if (standardRate > 0) {
    return standardRate;
  }

  const premiumRate = parsePercentRate(feature?.premiumPrice);
  if (premiumRate > 0) {
    return premiumRate;
  }

  return ADDITIONAL_FEATURE_QTY_DEFAULT_RATE;
};

export const computeAdditionalFeatureSurcharge = ({
  feature,
  selectedPackagePrice,
  quantity,
}) => {
  const units = Math.max(0, Number(quantity) || 0);
  if (units === 0) {
    return 0;
  }

  const rate = resolveFeaturePercentRate(feature);
  const packagePrice = Number(selectedPackagePrice);
  if (!Number.isFinite(packagePrice) || packagePrice <= 0 || rate <= 0) {
    return 0;
  }

  // Every unit: packagePrice + (packagePrice × rate × units), e.g. $318 + 25% → $397.50
  return roundMoney(packagePrice * rate * units);
};

export const applyAdditionalFeatureSurchargeToPackages = (packages, feature, quantity) =>
  (Array.isArray(packages) ? packages : []).map((servicePackage) => ({
    ...servicePackage,
    price: roundMoney(
      Number(servicePackage.price) +
        computeAdditionalFeatureSurcharge({
          feature,
          selectedPackagePrice: servicePackage.price,
          quantity,
        }),
    ),
  }));
