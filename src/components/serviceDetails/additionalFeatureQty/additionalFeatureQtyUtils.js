import { SERVICE_PACKAGES } from '../serviceDetailsData';
import {
  ADDITIONAL_FEATURE_QTY_DEFAULT_INCLUDED,
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

export const formatAdditionalFeatureQuantity = (quantity) =>
  String(Math.max(ADDITIONAL_FEATURE_QTY_MIN, Number(quantity) || ADDITIONAL_FEATURE_QTY_MIN)).padStart(
    ADDITIONAL_FEATURE_QTY_PAD_LENGTH,
    '0',
  );

export const parsePercentRate = (percentText) => {
  const cleaned = String(percentText ?? '')
    .trim()
    .replace(/[^0-9.]/g, '');

  if (!cleaned) {
    return 0;
  }

  const numeric = Number(cleaned);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return 0;
  }

  return numeric / 100;
};

const resolveFeaturePercentRate = (feature, selectedPackageId) => {
  if (selectedPackageId === SERVICE_PACKAGES.PREMIUM) {
    return parsePercentRate(feature?.premiumPrice);
  }

  return parsePercentRate(feature?.standardPrice);
};

export const computeAdditionalFeatureSurcharge = ({
  feature,
  selectedPackageId,
  selectedPackagePrice,
  quantity,
}) => {
  const includedBaseline = parseIncludedBaseline(feature);
  const extraUnits = Math.max(0, Number(quantity) - includedBaseline);
  if (extraUnits === 0) {
    return 0;
  }

  const rate = resolveFeaturePercentRate(feature, selectedPackageId);
  const packagePrice = Number(selectedPackagePrice);
  if (!Number.isFinite(packagePrice) || packagePrice <= 0 || rate <= 0) {
    return 0;
  }

  return Math.round(packagePrice * rate * extraUnits);
};
