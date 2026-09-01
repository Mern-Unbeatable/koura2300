import { memo } from 'react';
import { Calculator, Layers, RotateCcw } from 'lucide-react';
import { BACKSPLASH_CALCULATOR_COPY } from './backsplashCalculatorCopy';
import {
  BACKSPLASH_CALCULATOR_ACTION_ICON_SIZE_PX,
  BACKSPLASH_CALCULATOR_ACTIONS_CLASS,
  BACKSPLASH_CALCULATOR_CARD_CLASS,
  BACKSPLASH_CALCULATOR_ERROR_CLASS,
  BACKSPLASH_CALCULATOR_ESTIMATE_LABEL_CLASS,
  BACKSPLASH_CALCULATOR_ESTIMATE_VALUE_CLASS,
  BACKSPLASH_CALCULATOR_ESTIMATE_WRAP_CLASS,
  BACKSPLASH_CALCULATOR_FIELD_CLASS,
  BACKSPLASH_CALCULATOR_HEADER_CLASS,
  BACKSPLASH_CALCULATOR_HEADER_ICON_SIZE_PX,
  BACKSPLASH_CALCULATOR_ICON_WRAP_CLASS,
  BACKSPLASH_CALCULATOR_INPUT_CLASS,
  BACKSPLASH_CALCULATOR_INPUT_ERROR_CLASS,
  BACKSPLASH_CALCULATOR_INPUT_WRAP_CLASS,
  BACKSPLASH_CALCULATOR_INPUTS_PANEL_CLASS,
  BACKSPLASH_CALCULATOR_LABEL_CLASS,
  BACKSPLASH_CALCULATOR_PRIMARY_BUTTON_CLASS,
  BACKSPLASH_CALCULATOR_SECONDARY_BUTTON_CLASS,
  BACKSPLASH_CALCULATOR_SUBTITLE_CLASS,
  BACKSPLASH_CALCULATOR_TITLE_CLASS,
  BACKSPLASH_CALCULATOR_TITLE_ROW_CLASS,
  BACKSPLASH_CALCULATOR_UNIT_CLASS,
} from './backsplashCalculatorData';
import { formatBacksplashEstimate } from './backsplashCalculatorUtils';
import useBacksplashCalculator from './useBacksplashCalculator';

const WIDTH_FIELD_ID = 'backsplash-calculator-wall-width-ft';
const WIDTH_ERROR_ID = 'backsplash-calculator-wall-width-error';
const HEIGHT_FIELD_ID = 'backsplash-calculator-wall-height-ft';
const HEIGHT_ERROR_ID = 'backsplash-calculator-wall-height-error';

const BacksplashCalculator = memo(() => {
  const {
    wallWidth,
    wallHeight,
    estimate,
    widthError,
    heightError,
    onWidthChange,
    onHeightChange,
    onCalculate,
    onClear,
  } = useBacksplashCalculator();

  const widthInputClassName = widthError
    ? `${BACKSPLASH_CALCULATOR_INPUT_CLASS} ${BACKSPLASH_CALCULATOR_INPUT_ERROR_CLASS}`
    : BACKSPLASH_CALCULATOR_INPUT_CLASS;
  const heightInputClassName = heightError
    ? `${BACKSPLASH_CALCULATOR_INPUT_CLASS} ${BACKSPLASH_CALCULATOR_INPUT_ERROR_CLASS}`
    : BACKSPLASH_CALCULATOR_INPUT_CLASS;

  return (
    <section
      className={BACKSPLASH_CALCULATOR_CARD_CLASS}
      aria-label={BACKSPLASH_CALCULATOR_COPY.regionLabel}
      data-testid="backsplash-calculator"
    >
      <div className={BACKSPLASH_CALCULATOR_HEADER_CLASS}>
        <div className={BACKSPLASH_CALCULATOR_TITLE_ROW_CLASS}>
          <span className={BACKSPLASH_CALCULATOR_ICON_WRAP_CLASS} aria-hidden="true">
            <Layers size={BACKSPLASH_CALCULATOR_HEADER_ICON_SIZE_PX} />
          </span>
          <div className="min-w-0">
            <h2 className={BACKSPLASH_CALCULATOR_TITLE_CLASS}>
              {BACKSPLASH_CALCULATOR_COPY.title}
            </h2>
            <p className={BACKSPLASH_CALCULATOR_SUBTITLE_CLASS}>
              {BACKSPLASH_CALCULATOR_COPY.subtitle}
            </p>
          </div>
        </div>

        <div className={BACKSPLASH_CALCULATOR_ESTIMATE_WRAP_CLASS}>
          <p className={BACKSPLASH_CALCULATOR_ESTIMATE_LABEL_CLASS}>
            {BACKSPLASH_CALCULATOR_COPY.startingEstLabel}
          </p>
          <p
            className={BACKSPLASH_CALCULATOR_ESTIMATE_VALUE_CLASS}
            data-testid="backsplash-calculator-estimate"
          >
            {formatBacksplashEstimate(estimate)}
          </p>
        </div>
      </div>

      <form onSubmit={onCalculate} noValidate>
        <div className={BACKSPLASH_CALCULATOR_INPUTS_PANEL_CLASS}>
          <div className={BACKSPLASH_CALCULATOR_FIELD_CLASS}>
            <label htmlFor={WIDTH_FIELD_ID} className={BACKSPLASH_CALCULATOR_LABEL_CLASS}>
              {BACKSPLASH_CALCULATOR_COPY.widthLabel}
            </label>
            <div className={BACKSPLASH_CALCULATOR_INPUT_WRAP_CLASS}>
              <input
                id={WIDTH_FIELD_ID}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                name="wallWidth"
                value={wallWidth}
                onChange={onWidthChange}
                placeholder={BACKSPLASH_CALCULATOR_COPY.widthPlaceholder}
                aria-invalid={Boolean(widthError)}
                aria-describedby={widthError ? WIDTH_ERROR_ID : undefined}
                className={widthInputClassName}
              />
              <span className={BACKSPLASH_CALCULATOR_UNIT_CLASS} aria-hidden="true">
                {BACKSPLASH_CALCULATOR_COPY.unitSuffix}
              </span>
            </div>
            {widthError ? (
              <p id={WIDTH_ERROR_ID} role="alert" className={BACKSPLASH_CALCULATOR_ERROR_CLASS}>
                {widthError}
              </p>
            ) : null}
          </div>

          <div className={BACKSPLASH_CALCULATOR_FIELD_CLASS}>
            <label htmlFor={HEIGHT_FIELD_ID} className={BACKSPLASH_CALCULATOR_LABEL_CLASS}>
              {BACKSPLASH_CALCULATOR_COPY.heightLabel}
            </label>
            <div className={BACKSPLASH_CALCULATOR_INPUT_WRAP_CLASS}>
              <input
                id={HEIGHT_FIELD_ID}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                name="wallHeight"
                value={wallHeight}
                onChange={onHeightChange}
                placeholder={BACKSPLASH_CALCULATOR_COPY.heightPlaceholder}
                aria-invalid={Boolean(heightError)}
                aria-describedby={heightError ? HEIGHT_ERROR_ID : undefined}
                className={heightInputClassName}
              />
              <span className={BACKSPLASH_CALCULATOR_UNIT_CLASS} aria-hidden="true">
                {BACKSPLASH_CALCULATOR_COPY.unitSuffix}
              </span>
            </div>
            {heightError ? (
              <p id={HEIGHT_ERROR_ID} role="alert" className={BACKSPLASH_CALCULATOR_ERROR_CLASS}>
                {heightError}
              </p>
            ) : null}
          </div>
        </div>

        <div className={`${BACKSPLASH_CALCULATOR_ACTIONS_CLASS} mt-2.5`}>
          <button type="submit" className={BACKSPLASH_CALCULATOR_PRIMARY_BUTTON_CLASS}>
            <Calculator size={BACKSPLASH_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {BACKSPLASH_CALCULATOR_COPY.calculate}
          </button>
          <button
            type="button"
            className={BACKSPLASH_CALCULATOR_SECONDARY_BUTTON_CLASS}
            onClick={onClear}
          >
            <RotateCcw size={BACKSPLASH_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {BACKSPLASH_CALCULATOR_COPY.clear}
          </button>
        </div>
      </form>
    </section>
  );
});

BacksplashCalculator.displayName = 'BacksplashCalculator';

export default BacksplashCalculator;
