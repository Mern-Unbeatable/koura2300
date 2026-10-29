import { useCallback, useEffect, useMemo, useState } from 'react';
import { ADDITIONAL_FEATURE_QTY_COPY } from './additionalFeatureQtyCopy';
import {
  ADDITIONAL_FEATURE_QTY_INITIAL,
  ADDITIONAL_FEATURE_QTY_MIN,
  ADDITIONAL_FEATURE_QTY_STEP,
} from './additionalFeatureQtyData';
import {
  buildMeasurementUnitLabel,
  computeAdditionalFeatureSurcharge,
  formatAdditionalFeatureQuantity,
  getAdditionalFeatureNotes,
  getFilledAdditionalFeatures,
  hasSelectedMeasurementUnit,
  parseIncludedBaseline,
} from './additionalFeatureQtyUtils';

const useAdditionalFeatureQty = ({
  additionalFeatures,
  selectedPackageId,
  selectedPackagePrice,
}) => {
  const filledFeatures = useMemo(
    () => getFilledAdditionalFeatures(additionalFeatures),
    [additionalFeatures],
  );
  const primaryFeature = filledFeatures[0] ?? null;
  // Details qty UI only shows when admin selected a Measurement_unit.
  const isVisible = hasSelectedMeasurementUnit(primaryFeature);
  const includedBaseline = parseIncludedBaseline(primaryFeature);
  const [quantity, setQuantity] = useState(ADDITIONAL_FEATURE_QTY_INITIAL);

  useEffect(() => {
    setQuantity(ADDITIONAL_FEATURE_QTY_INITIAL);
  }, [primaryFeature?.id]);

  const activeQuantity = Math.max(ADDITIONAL_FEATURE_QTY_MIN, quantity);

  const surcharge = useMemo(
    () =>
      primaryFeature
        ? computeAdditionalFeatureSurcharge({
            feature: primaryFeature,
            selectedPackageId,
            selectedPackagePrice,
            quantity: activeQuantity,
          })
        : 0,
    [activeQuantity, primaryFeature, selectedPackageId, selectedPackagePrice],
  );

  const notes = useMemo(
    () => (primaryFeature ? getAdditionalFeatureNotes(primaryFeature) : []),
    [primaryFeature],
  );

  const unitLabel = buildMeasurementUnitLabel(primaryFeature, {
    prefix: ADDITIONAL_FEATURE_QTY_COPY.unitLabelPrefix,
  });

  const handleIncrement = useCallback(() => {
    setQuantity((current) => Math.max(ADDITIONAL_FEATURE_QTY_MIN, current) + ADDITIONAL_FEATURE_QTY_STEP);
  }, []);

  const handleDecrement = useCallback(() => {
    setQuantity((current) =>
      Math.max(ADDITIONAL_FEATURE_QTY_MIN, current - ADDITIONAL_FEATURE_QTY_STEP),
    );
  }, []);

  return {
    isVisible,
    feature: primaryFeature,
    unitLabel,
    quantity: activeQuantity,
    quantityLabel: formatAdditionalFeatureQuantity(activeQuantity),
    includedBaseline,
    notes,
    surcharge,
    canDecrement: activeQuantity > ADDITIONAL_FEATURE_QTY_MIN,
    onIncrement: handleIncrement,
    onDecrement: handleDecrement,
  };
};

export default useAdditionalFeatureQty;
