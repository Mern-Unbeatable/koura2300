import { memo } from 'react';
import { Calculator, Layers, RotateCcw } from 'lucide-react';
import { FRAMING_CALCULATOR_COPY } from './framingCalculatorCopy';
import {
  FRAMING_CALCULATOR_ACTION_ICON_SIZE_PX,
  FRAMING_CALCULATOR_ACTIONS_CLASS,
  FRAMING_CALCULATOR_CARD_CLASS,
  FRAMING_CALCULATOR_ERROR_CLASS,
  FRAMING_CALCULATOR_ESTIMATE_LABEL_CLASS,
  FRAMING_CALCULATOR_ESTIMATE_VALUE_CLASS,
  FRAMING_CALCULATOR_ESTIMATE_WRAP_CLASS,
  FRAMING_CALCULATOR_FIELD_CLASS,
  FRAMING_CALCULATOR_HEADER_CLASS,
  FRAMING_CALCULATOR_HEADER_ICON_SIZE_PX,
  FRAMING_CALCULATOR_ICON_WRAP_CLASS,
  FRAMING_CALCULATOR_INPUT_CLASS,
  FRAMING_CALCULATOR_INPUT_ERROR_CLASS,
  FRAMING_CALCULATOR_INPUT_WRAP_CLASS,
  FRAMING_CALCULATOR_INPUTS_PANEL_CLASS,
  FRAMING_CALCULATOR_LABEL_CLASS,
  FRAMING_CALCULATOR_PRIMARY_BUTTON_CLASS,
  FRAMING_CALCULATOR_SECONDARY_BUTTON_CLASS,
  FRAMING_CALCULATOR_SUBTITLE_CLASS,
  FRAMING_CALCULATOR_TITLE_CLASS,
  FRAMING_CALCULATOR_TITLE_ROW_CLASS,
  FRAMING_CALCULATOR_UNIT_CLASS,
} from './framingCalculatorData';
import { formatFramingEstimate } from './framingCalculatorUtils';
import useFramingCalculator from './useFramingCalculator';

const LENGTH_FIELD_ID = 'framing-calculator-wall-length-ft';
const LENGTH_ERROR_ID = 'framing-calculator-wall-length-error';
const HEIGHT_FIELD_ID = 'framing-calculator-wall-height-ft';
const HEIGHT_ERROR_ID = 'framing-calculator-wall-height-error';

const FramingCalculator = memo(() => {
  const {
    wallLength,
    wallHeight,
    estimate,
    lengthError,
    heightError,
    onLengthChange,
    onHeightChange,
    onCalculate,
    onClear,
  } = useFramingCalculator();

  const lengthInputClassName = lengthError
    ? `${FRAMING_CALCULATOR_INPUT_CLASS} ${FRAMING_CALCULATOR_INPUT_ERROR_CLASS}`
    : FRAMING_CALCULATOR_INPUT_CLASS;
  const heightInputClassName = heightError
    ? `${FRAMING_CALCULATOR_INPUT_CLASS} ${FRAMING_CALCULATOR_INPUT_ERROR_CLASS}`
    : FRAMING_CALCULATOR_INPUT_CLASS;

  return (
    <section
      className={FRAMING_CALCULATOR_CARD_CLASS}
      aria-label={FRAMING_CALCULATOR_COPY.regionLabel}
      data-testid="framing-calculator"
    >
      <div className={FRAMING_CALCULATOR_HEADER_CLASS}>
        <div className={FRAMING_CALCULATOR_TITLE_ROW_CLASS}>
          <span className={FRAMING_CALCULATOR_ICON_WRAP_CLASS} aria-hidden="true">
            <Layers size={FRAMING_CALCULATOR_HEADER_ICON_SIZE_PX} />
          </span>
          <div className="min-w-0">
            <h2 className={FRAMING_CALCULATOR_TITLE_CLASS}>{FRAMING_CALCULATOR_COPY.title}</h2>
            <p className={FRAMING_CALCULATOR_SUBTITLE_CLASS}>{FRAMING_CALCULATOR_COPY.subtitle}</p>
          </div>
        </div>

        <div className={FRAMING_CALCULATOR_ESTIMATE_WRAP_CLASS}>
          <p className={FRAMING_CALCULATOR_ESTIMATE_LABEL_CLASS}>
            {FRAMING_CALCULATOR_COPY.startingEstLabel}
          </p>
          <p
            className={FRAMING_CALCULATOR_ESTIMATE_VALUE_CLASS}
            data-testid="framing-calculator-estimate"
          >
            {formatFramingEstimate(estimate)}
          </p>
        </div>
      </div>

      <form onSubmit={onCalculate} noValidate>
        <div className={FRAMING_CALCULATOR_INPUTS_PANEL_CLASS}>
          <div className={FRAMING_CALCULATOR_FIELD_CLASS}>
            <label htmlFor={LENGTH_FIELD_ID} className={FRAMING_CALCULATOR_LABEL_CLASS}>
              {FRAMING_CALCULATOR_COPY.lengthLabel}
            </label>
            <div className={FRAMING_CALCULATOR_INPUT_WRAP_CLASS}>
              <input
                id={LENGTH_FIELD_ID}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                name="wallLength"
                value={wallLength}
                onChange={onLengthChange}
                placeholder={FRAMING_CALCULATOR_COPY.lengthPlaceholder}
                aria-invalid={Boolean(lengthError)}
                aria-describedby={lengthError ? LENGTH_ERROR_ID : undefined}
                className={lengthInputClassName}
              />
              <span className={FRAMING_CALCULATOR_UNIT_CLASS} aria-hidden="true">
                {FRAMING_CALCULATOR_COPY.unitSuffix}
              </span>
            </div>
            {lengthError ? (
              <p id={LENGTH_ERROR_ID} role="alert" className={FRAMING_CALCULATOR_ERROR_CLASS}>
                {lengthError}
              </p>
            ) : null}
          </div>

          <div className={FRAMING_CALCULATOR_FIELD_CLASS}>
            <label htmlFor={HEIGHT_FIELD_ID} className={FRAMING_CALCULATOR_LABEL_CLASS}>
              {FRAMING_CALCULATOR_COPY.heightLabel}
            </label>
            <div className={FRAMING_CALCULATOR_INPUT_WRAP_CLASS}>
              <input
                id={HEIGHT_FIELD_ID}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                name="wallHeight"
                value={wallHeight}
                onChange={onHeightChange}
                placeholder={FRAMING_CALCULATOR_COPY.heightPlaceholder}
                aria-invalid={Boolean(heightError)}
                aria-describedby={heightError ? HEIGHT_ERROR_ID : undefined}
                className={heightInputClassName}
              />
              <span className={FRAMING_CALCULATOR_UNIT_CLASS} aria-hidden="true">
                {FRAMING_CALCULATOR_COPY.unitSuffix}
              </span>
            </div>
            {heightError ? (
              <p id={HEIGHT_ERROR_ID} role="alert" className={FRAMING_CALCULATOR_ERROR_CLASS}>
                {heightError}
              </p>
            ) : null}
          </div>
        </div>

        <div className={`${FRAMING_CALCULATOR_ACTIONS_CLASS} mt-2.5`}>
          <button type="submit" className={FRAMING_CALCULATOR_PRIMARY_BUTTON_CLASS}>
            <Calculator size={FRAMING_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {FRAMING_CALCULATOR_COPY.calculate}
          </button>
          <button
            type="button"
            className={FRAMING_CALCULATOR_SECONDARY_BUTTON_CLASS}
            onClick={onClear}
          >
            <RotateCcw size={FRAMING_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {FRAMING_CALCULATOR_COPY.clear}
          </button>
        </div>
      </form>
    </section>
  );
});

FramingCalculator.displayName = 'FramingCalculator';

export default FramingCalculator;
