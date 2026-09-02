import { memo } from 'react';
import { Calculator, Layers, RotateCcw } from 'lucide-react';
import { DRYWALL_CALCULATOR_COPY } from './drywallCalculatorCopy';
import {
  DRYWALL_CALCULATOR_ACTION_ICON_SIZE_PX,
  DRYWALL_CALCULATOR_ACTIONS_CLASS,
  DRYWALL_CALCULATOR_CARD_CLASS,
  DRYWALL_CALCULATOR_ERROR_CLASS,
  DRYWALL_CALCULATOR_ESTIMATE_LABEL_CLASS,
  DRYWALL_CALCULATOR_ESTIMATE_VALUE_CLASS,
  DRYWALL_CALCULATOR_ESTIMATE_WRAP_CLASS,
  DRYWALL_CALCULATOR_FIELD_CLASS,
  DRYWALL_CALCULATOR_HEADER_CLASS,
  DRYWALL_CALCULATOR_HEADER_ICON_SIZE_PX,
  DRYWALL_CALCULATOR_ICON_WRAP_CLASS,
  DRYWALL_CALCULATOR_INPUT_CLASS,
  DRYWALL_CALCULATOR_INPUT_ERROR_CLASS,
  DRYWALL_CALCULATOR_INPUT_WRAP_CLASS,
  DRYWALL_CALCULATOR_INPUTS_PANEL_CLASS,
  DRYWALL_CALCULATOR_LABEL_CLASS,
  DRYWALL_CALCULATOR_PRIMARY_BUTTON_CLASS,
  DRYWALL_CALCULATOR_SECONDARY_BUTTON_CLASS,
  DRYWALL_CALCULATOR_SUBTITLE_CLASS,
  DRYWALL_CALCULATOR_TITLE_CLASS,
  DRYWALL_CALCULATOR_TITLE_ROW_CLASS,
  DRYWALL_CALCULATOR_UNIT_CLASS,
} from './drywallCalculatorData';
import { formatDrywallEstimate } from './drywallCalculatorUtils';
import useDrywallCalculator from './useDrywallCalculator';

const WIDTH_FIELD_ID = 'drywall-calculator-wall-width-ft';
const WIDTH_ERROR_ID = 'drywall-calculator-wall-width-error';
const HEIGHT_FIELD_ID = 'drywall-calculator-wall-height-ft';
const HEIGHT_ERROR_ID = 'drywall-calculator-wall-height-error';

const DrywallCalculator = memo(() => {
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
  } = useDrywallCalculator();

  const widthInputClassName = widthError
    ? `${DRYWALL_CALCULATOR_INPUT_CLASS} ${DRYWALL_CALCULATOR_INPUT_ERROR_CLASS}`
    : DRYWALL_CALCULATOR_INPUT_CLASS;
  const heightInputClassName = heightError
    ? `${DRYWALL_CALCULATOR_INPUT_CLASS} ${DRYWALL_CALCULATOR_INPUT_ERROR_CLASS}`
    : DRYWALL_CALCULATOR_INPUT_CLASS;

  return (
    <section
      className={DRYWALL_CALCULATOR_CARD_CLASS}
      aria-label={DRYWALL_CALCULATOR_COPY.regionLabel}
      data-testid="drywall-calculator"
    >
      <div className={DRYWALL_CALCULATOR_HEADER_CLASS}>
        <div className={DRYWALL_CALCULATOR_TITLE_ROW_CLASS}>
          <span className={DRYWALL_CALCULATOR_ICON_WRAP_CLASS} aria-hidden="true">
            <Layers size={DRYWALL_CALCULATOR_HEADER_ICON_SIZE_PX} />
          </span>
          <div className="min-w-0">
            <h2 className={DRYWALL_CALCULATOR_TITLE_CLASS}>{DRYWALL_CALCULATOR_COPY.title}</h2>
            <p className={DRYWALL_CALCULATOR_SUBTITLE_CLASS}>{DRYWALL_CALCULATOR_COPY.subtitle}</p>
          </div>
        </div>

        <div className={DRYWALL_CALCULATOR_ESTIMATE_WRAP_CLASS}>
          <p className={DRYWALL_CALCULATOR_ESTIMATE_LABEL_CLASS}>
            {DRYWALL_CALCULATOR_COPY.startingEstLabel}
          </p>
          <p
            className={DRYWALL_CALCULATOR_ESTIMATE_VALUE_CLASS}
            data-testid="drywall-calculator-estimate"
          >
            {formatDrywallEstimate(estimate)}
          </p>
        </div>
      </div>

      <form onSubmit={onCalculate} noValidate>
        <div className={DRYWALL_CALCULATOR_INPUTS_PANEL_CLASS}>
          <div className={DRYWALL_CALCULATOR_FIELD_CLASS}>
            <label htmlFor={WIDTH_FIELD_ID} className={DRYWALL_CALCULATOR_LABEL_CLASS}>
              {DRYWALL_CALCULATOR_COPY.widthLabel}
            </label>
            <div className={DRYWALL_CALCULATOR_INPUT_WRAP_CLASS}>
              <input
                id={WIDTH_FIELD_ID}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                name="wallWidth"
                value={wallWidth}
                onChange={onWidthChange}
                placeholder={DRYWALL_CALCULATOR_COPY.widthPlaceholder}
                aria-invalid={Boolean(widthError)}
                aria-describedby={widthError ? WIDTH_ERROR_ID : undefined}
                className={widthInputClassName}
              />
              <span className={DRYWALL_CALCULATOR_UNIT_CLASS} aria-hidden="true">
                {DRYWALL_CALCULATOR_COPY.unitSuffix}
              </span>
            </div>
            {widthError ? (
              <p id={WIDTH_ERROR_ID} role="alert" className={DRYWALL_CALCULATOR_ERROR_CLASS}>
                {widthError}
              </p>
            ) : null}
          </div>

          <div className={DRYWALL_CALCULATOR_FIELD_CLASS}>
            <label htmlFor={HEIGHT_FIELD_ID} className={DRYWALL_CALCULATOR_LABEL_CLASS}>
              {DRYWALL_CALCULATOR_COPY.heightLabel}
            </label>
            <div className={DRYWALL_CALCULATOR_INPUT_WRAP_CLASS}>
              <input
                id={HEIGHT_FIELD_ID}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                name="wallHeight"
                value={wallHeight}
                onChange={onHeightChange}
                placeholder={DRYWALL_CALCULATOR_COPY.heightPlaceholder}
                aria-invalid={Boolean(heightError)}
                aria-describedby={heightError ? HEIGHT_ERROR_ID : undefined}
                className={heightInputClassName}
              />
              <span className={DRYWALL_CALCULATOR_UNIT_CLASS} aria-hidden="true">
                {DRYWALL_CALCULATOR_COPY.unitSuffix}
              </span>
            </div>
            {heightError ? (
              <p id={HEIGHT_ERROR_ID} role="alert" className={DRYWALL_CALCULATOR_ERROR_CLASS}>
                {heightError}
              </p>
            ) : null}
          </div>
        </div>

        <div className={`${DRYWALL_CALCULATOR_ACTIONS_CLASS} mt-2.5`}>
          <button type="submit" className={DRYWALL_CALCULATOR_PRIMARY_BUTTON_CLASS}>
            <Calculator size={DRYWALL_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {DRYWALL_CALCULATOR_COPY.calculate}
          </button>
          <button
            type="button"
            className={DRYWALL_CALCULATOR_SECONDARY_BUTTON_CLASS}
            onClick={onClear}
          >
            <RotateCcw size={DRYWALL_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {DRYWALL_CALCULATOR_COPY.clear}
          </button>
        </div>
      </form>
    </section>
  );
});

DrywallCalculator.displayName = 'DrywallCalculator';

export default DrywallCalculator;
