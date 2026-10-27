import { SERVICE_PACKAGES } from '../serviceDetailsData';
import { VARIANT_SELECTOR_KIND } from './variantSelectorData';

const isBlank = (value) => !String(value ?? '').trim();

const isFilledSizeRow = (row) =>
  Boolean(row) &&
  (!isBlank(row.size) || !isBlank(row.standardPrice) || !isBlank(row.premiumPrice));

const isFilledOptionRow = (row) =>
  Boolean(row) &&
  (!isBlank(row.name) || !isBlank(row.standardPrice) || !isBlank(row.premiumPrice));

export const hasFilledServiceSizes = (sizes) =>
  Array.isArray(sizes) && sizes.some(isFilledSizeRow);

export const hasFilledServiceOptions = (options) =>
  Array.isArray(options) && options.some(isFilledOptionRow);

export const getFilledServiceSizes = (sizes) =>
  (Array.isArray(sizes) ? sizes : []).filter(isFilledSizeRow);

export const getFilledServiceOptions = (options) =>
  (Array.isArray(options) ? options : []).filter(isFilledOptionRow);

export const resolveVariantSelector = ({ sizes, options }) => {
  const filledSizes = getFilledServiceSizes(sizes);
  if (filledSizes.length > 0) {
    return {
      kind: VARIANT_SELECTOR_KIND.SIZES,
      items: filledSizes,
    };
  }

  const filledOptions = getFilledServiceOptions(options);
  if (filledOptions.length > 0) {
    return {
      kind: VARIANT_SELECTOR_KIND.OPTIONS,
      items: filledOptions,
    };
  }

  return null;
};

export const parseVariantPriceValue = (priceText) => {
  const cleaned = String(priceText ?? '')
    .trim()
    .replace(/[^0-9.]/g, '');

  if (!cleaned) {
    return null;
  }

  const numeric = Number(cleaned);
  return Number.isFinite(numeric) ? numeric : null;
};

export const getVariantItemLabel = (item, kind) => {
  if (kind === VARIANT_SELECTOR_KIND.SIZES) {
    const sizeValue = String(item?.size ?? '').trim();
    const measurementUnit = String(item?.measurementUnit ?? '').trim();
    if (sizeValue && measurementUnit) {
      return `${sizeValue} ${measurementUnit}`;
    }

    return sizeValue;
  }

  return String(item?.name ?? '').trim();
};

export const applyVariantPricesToPackages = (packages, selectedVariant) => {
  if (!selectedVariant || !Array.isArray(packages)) {
    return packages ?? [];
  }

  const standardPrice = parseVariantPriceValue(selectedVariant.standardPrice);
  const premiumPrice = parseVariantPriceValue(selectedVariant.premiumPrice);

  return packages.map((servicePackage) => {
    if (
      servicePackage.id === SERVICE_PACKAGES.STANDARD &&
      standardPrice != null
    ) {
      return { ...servicePackage, price: standardPrice };
    }

    if (servicePackage.id === SERVICE_PACKAGES.PREMIUM && premiumPrice != null) {
      return { ...servicePackage, price: premiumPrice };
    }

    return servicePackage;
  });
};
