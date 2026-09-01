import { memo } from 'react';
import { Calculator, Layers, RotateCcw } from 'lucide-react';
import { COUNTERTOP_CALCULATOR_COPY } from './countertopCalculatorCopy';
import {
  COUNTERTOP_CALCULATOR_ACTION_ICON_SIZE_PX,
  COUNTERTOP_CALCULATOR_ACTIONS_CLASS,
  COUNTERTOP_CALCULATOR_CARD_CLASS,
  COUNTERTOP_CALCULATOR_ERROR_CLASS,
  COUNTERTOP_CALCULATOR_ESTIMATE_LABEL_CLASS,
  COUNTERTOP_CALCULATOR_ESTIMATE_VALUE_CLASS,
  COUNTERTOP_CALCULATOR_ESTIMATE_WRAP_CLASS,
  COUNTERTOP_CALCULATOR_HEADER_CLASS,
  COUNTERTOP_CALCULATOR_HEADER_ICON_SIZE_PX,
  COUNTERTOP_CALCULATOR_ICON_WRAP_CLASS,
  COUNTERTOP_CALCULATOR_INPUT_CLASS,
  COUNTERTOP_CALCULATOR_INPUT_ERROR_CLASS,
  COUNTERTOP_CALCULATOR_INPUT_WRAP_CLASS,
  COUNTERTOP_CALCULATOR_INPUTS_PANEL_CLASS,
  COUNTERTOP_CALCULATOR_LABEL_CLASS,
  COUNTERTOP_CALCULATOR_PRIMARY_BUTTON_CLASS,
  COUNTERTOP_CALCULATOR_SECONDARY_BUTTON_CLASS,
  COUNTERTOP_CALCULATOR_SUBTITLE_CLASS,
  COUNTERTOP_CALCULATOR_TITLE_CLASS,
  COUNTERTOP_CALCULATOR_TITLE_ROW_CLASS,
  COUNTERTOP_CALCULATOR_UNIT_CLASS,
} from './countertopCalculatorData';
import { formatCountertopEstimate } from './countertopCalculatorUtils';
import useCountertopCalculator from './useCountertopCalculator';

const LENGTH_FIELD_ID = 'countertop-calculator-length-sq-ft';
const LENGTH_ERROR_ID = 'countertop-calculator-length-error';

const CountertopCalculator = memo(() => {
  const { counterLength, estimate, error, onLengthChange, onCalculate, onClear } =
    useCountertopCalculator();

  const inputClassName = error
    ? `${COUNTERTOP_CALCULATOR_INPUT_CLASS} ${COUNTERTOP_CALCULATOR_INPUT_ERROR_CLASS}`
    : COUNTERTOP_CALCULATOR_INPUT_CLASS;

  return (
    <section
      className={COUNTERTOP_CALCULATOR_CARD_CLASS}
      aria-label={COUNTERTOP_CALCULATOR_COPY.regionLabel}
      data-testid="countertop-calculator"
    >
      <div className={COUNTERTOP_CALCULATOR_HEADER_CLASS}>
        <div className={COUNTERTOP_CALCULATOR_TITLE_ROW_CLASS}>
          <span className={COUNTERTOP_CALCULATOR_ICON_WRAP_CLASS} aria-hidden="true">
            <Layers size={COUNTERTOP_CALCULATOR_HEADER_ICON_SIZE_PX} />
          </span>
          <div className="min-w-0">
            <h2 className={COUNTERTOP_CALCULATOR_TITLE_CLASS}>
              {COUNTERTOP_CALCULATOR_COPY.title}
            </h2>
            <p className={COUNTERTOP_CALCULATOR_SUBTITLE_CLASS}>
              {COUNTERTOP_CALCULATOR_COPY.subtitle}
            </p>
          </div>
        </div>

        <div className={COUNTERTOP_CALCULATOR_ESTIMATE_WRAP_CLASS}>
          <p className={COUNTERTOP_CALCULATOR_ESTIMATE_LABEL_CLASS}>
            {COUNTERTOP_CALCULATOR_COPY.startingEstLabel}
          </p>
          <p
            className={COUNTERTOP_CALCULATOR_ESTIMATE_VALUE_CLASS}
            data-testid="countertop-calculator-estimate"
          >
            {formatCountertopEstimate(estimate)}
          </p>
        </div>
      </div>

      <form onSubmit={onCalculate} noValidate>
        <div className={COUNTERTOP_CALCULATOR_INPUTS_PANEL_CLASS}>
          <label htmlFor={LENGTH_FIELD_ID} className={COUNTERTOP_CALCULATOR_LABEL_CLASS}>
            {COUNTERTOP_CALCULATOR_COPY.lengthLabel}
          </label>
          <div className={COUNTERTOP_CALCULATOR_INPUT_WRAP_CLASS}>
            <input
              id={LENGTH_FIELD_ID}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              name="counterLength"
              value={counterLength}
              onChange={onLengthChange}
              placeholder={COUNTERTOP_CALCULATOR_COPY.lengthPlaceholder}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? LENGTH_ERROR_ID : undefined}
              className={inputClassName}
            />
            <span className={COUNTERTOP_CALCULATOR_UNIT_CLASS} aria-hidden="true">
              {COUNTERTOP_CALCULATOR_COPY.unitSuffix}
            </span>
          </div>
          {error ? (
            <p id={LENGTH_ERROR_ID} role="alert" className={COUNTERTOP_CALCULATOR_ERROR_CLASS}>
              {error}
            </p>
          ) : null}
        </div>

        <div className={`${COUNTERTOP_CALCULATOR_ACTIONS_CLASS} mt-2.5`}>
          <button type="submit" className={COUNTERTOP_CALCULATOR_PRIMARY_BUTTON_CLASS}>
            <Calculator size={COUNTERTOP_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {COUNTERTOP_CALCULATOR_COPY.calculate}
          </button>
          <button
            type="button"
            className={COUNTERTOP_CALCULATOR_SECONDARY_BUTTON_CLASS}
            onClick={onClear}
          >
            <RotateCcw size={COUNTERTOP_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {COUNTERTOP_CALCULATOR_COPY.clear}
          </button>
        </div>
      </form>
    </section>
  );
});

CountertopCalculator.displayName = 'CountertopCalculator';

export default CountertopCalculator;
