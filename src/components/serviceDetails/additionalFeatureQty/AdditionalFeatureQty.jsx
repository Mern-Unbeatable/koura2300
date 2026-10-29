import { memo } from 'react';
import { ADDITIONAL_FEATURE_QTY_COPY } from './additionalFeatureQtyCopy';
import {
  ADDITIONAL_FEATURE_QTY_ASSETS,
  ADDITIONAL_FEATURE_QTY_CONTROL_CLASS,
  ADDITIONAL_FEATURE_QTY_NOTE_CLASS,
  ADDITIONAL_FEATURE_QTY_NOTE_ICON_CLASS,
  ADDITIONAL_FEATURE_QTY_NOTES_CLASS,
  ADDITIONAL_FEATURE_QTY_SECTION_CLASS,
  ADDITIONAL_FEATURE_QTY_STEP_BUTTON_CLASS,
  ADDITIONAL_FEATURE_QTY_STEP_ICON_CLASS,
  ADDITIONAL_FEATURE_QTY_STEPPER_CLASS,
  ADDITIONAL_FEATURE_QTY_UNIT_LABEL_CLASS,
  ADDITIONAL_FEATURE_QTY_VALUE_CLASS,
} from './additionalFeatureQtyData';
import useAdditionalFeatureQty from './useAdditionalFeatureQty';

export const AdditionalFeatureQtyView = memo(
  ({
    isVisible,
    unitLabel,
    quantityLabel,
    notes = [],
    canDecrement,
    onIncrement,
    onDecrement,
  }) => {
    if (!isVisible) {
      return null;
    }

    return (
      <section
        className={ADDITIONAL_FEATURE_QTY_SECTION_CLASS}
        aria-label={unitLabel}
        data-testid="service-additional-feature-qty"
      >
        <div className={ADDITIONAL_FEATURE_QTY_CONTROL_CLASS}>
          <p className={ADDITIONAL_FEATURE_QTY_UNIT_LABEL_CLASS}>{unitLabel}</p>
          <div className={ADDITIONAL_FEATURE_QTY_STEPPER_CLASS}>
            <button
              type="button"
              className={ADDITIONAL_FEATURE_QTY_STEP_BUTTON_CLASS}
              aria-label={ADDITIONAL_FEATURE_QTY_COPY.decreaseLabel}
              onClick={onDecrement}
              disabled={!canDecrement}
            >
              <img
                src={ADDITIONAL_FEATURE_QTY_ASSETS.minus}
                alt=""
                width={16}
                height={16}
                className={ADDITIONAL_FEATURE_QTY_STEP_ICON_CLASS}
                aria-hidden="true"
              />
            </button>
            <span className={ADDITIONAL_FEATURE_QTY_VALUE_CLASS} aria-live="polite">
              {quantityLabel}
            </span>
            <button
              type="button"
              className={ADDITIONAL_FEATURE_QTY_STEP_BUTTON_CLASS}
              aria-label={ADDITIONAL_FEATURE_QTY_COPY.increaseLabel}
              onClick={onIncrement}
            >
              <img
                src={ADDITIONAL_FEATURE_QTY_ASSETS.plus}
                alt=""
                width={16}
                height={16}
                className={ADDITIONAL_FEATURE_QTY_STEP_ICON_CLASS}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {notes.length > 0 ? (
          <ul className={ADDITIONAL_FEATURE_QTY_NOTES_CLASS}>
            {notes.map((note) => (
              <li key={note} className={ADDITIONAL_FEATURE_QTY_NOTE_CLASS}>
                <img
                  src={ADDITIONAL_FEATURE_QTY_ASSETS.noteCheck}
                  alt=""
                  width={22}
                  height={22}
                  className={ADDITIONAL_FEATURE_QTY_NOTE_ICON_CLASS}
                  aria-hidden="true"
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    );
  },
);

AdditionalFeatureQtyView.displayName = 'AdditionalFeatureQtyView';

const AdditionalFeatureQty = memo(
  ({ additionalFeatures, selectedPackageId, selectedPackagePrice }) => {
    const featureQty = useAdditionalFeatureQty({
      additionalFeatures,
      selectedPackageId,
      selectedPackagePrice,
    });

    return (
      <AdditionalFeatureQtyView
        isVisible={featureQty.isVisible}
        unitLabel={featureQty.unitLabel}
        quantityLabel={featureQty.quantityLabel}
        notes={featureQty.notes}
        canDecrement={featureQty.canDecrement}
        onIncrement={featureQty.onIncrement}
        onDecrement={featureQty.onDecrement}
      />
    );
  },
);

AdditionalFeatureQty.displayName = 'AdditionalFeatureQty';

export default AdditionalFeatureQty;
