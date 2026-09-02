import { memo } from 'react';
import { Calculator, Layers, RotateCcw } from 'lucide-react';
import { INSULATION_CALCULATOR_COPY } from './insulationCalculatorCopy';
import {
  INSULATION_CALCULATOR_ACTION_ICON_SIZE_PX,
  INSULATION_CALCULATOR_ACTIONS_CLASS,
  INSULATION_CALCULATOR_CARD_CLASS,
  INSULATION_CALCULATOR_ERROR_CLASS,
  INSULATION_CALCULATOR_ESTIMATE_LABEL_CLASS,
  INSULATION_CALCULATOR_ESTIMATE_VALUE_CLASS,
  INSULATION_CALCULATOR_ESTIMATE_WRAP_CLASS,
  INSULATION_CALCULATOR_HEADER_CLASS,
  INSULATION_CALCULATOR_HEADER_ICON_SIZE_PX,
  INSULATION_CALCULATOR_ICON_WRAP_CLASS,
  INSULATION_CALCULATOR_INPUT_CLASS,
  INSULATION_CALCULATOR_INPUT_ERROR_CLASS,
  INSULATION_CALCULATOR_INPUT_WRAP_CLASS,
  INSULATION_CALCULATOR_INPUTS_PANEL_CLASS,
  INSULATION_CALCULATOR_LABEL_CLASS,
  INSULATION_CALCULATOR_PRIMARY_BUTTON_CLASS,
  INSULATION_CALCULATOR_SECONDARY_BUTTON_CLASS,
  INSULATION_CALCULATOR_SUBTITLE_CLASS,
  INSULATION_CALCULATOR_TITLE_CLASS,
  INSULATION_CALCULATOR_TITLE_ROW_CLASS,
  INSULATION_CALCULATOR_UNIT_CLASS,
} from './insulationCalculatorData';
import { formatInsulationEstimate } from './insulationCalculatorUtils';
import useInsulationCalculator from './useInsulationCalculator';

const AREA_FIELD_ID = 'insulation-calculator-area-sq-ft';
const AREA_ERROR_ID = 'insulation-calculator-area-error';

const InsulationCalculator = memo(() => {
  const { areaSqFt, estimate, error, onAreaChange, onCalculate, onClear } =
    useInsulationCalculator();

  const inputClassName = error
    ? `${INSULATION_CALCULATOR_INPUT_CLASS} ${INSULATION_CALCULATOR_INPUT_ERROR_CLASS}`
    : INSULATION_CALCULATOR_INPUT_CLASS;

  return (
    <section
      className={INSULATION_CALCULATOR_CARD_CLASS}
      aria-label={INSULATION_CALCULATOR_COPY.regionLabel}
      data-testid="insulation-calculator"
    >
      <div className={INSULATION_CALCULATOR_HEADER_CLASS}>
        <div className={INSULATION_CALCULATOR_TITLE_ROW_CLASS}>
          <span className={INSULATION_CALCULATOR_ICON_WRAP_CLASS} aria-hidden="true">
            <Layers size={INSULATION_CALCULATOR_HEADER_ICON_SIZE_PX} />
          </span>
          <div className="min-w-0">
            <h2 className={INSULATION_CALCULATOR_TITLE_CLASS}>
              {INSULATION_CALCULATOR_COPY.title}
            </h2>
            <p className={INSULATION_CALCULATOR_SUBTITLE_CLASS}>
              {INSULATION_CALCULATOR_COPY.subtitle}
            </p>
          </div>
        </div>

        <div className={INSULATION_CALCULATOR_ESTIMATE_WRAP_CLASS}>
          <p className={INSULATION_CALCULATOR_ESTIMATE_LABEL_CLASS}>
            {INSULATION_CALCULATOR_COPY.startingEstLabel}
          </p>
          <p
            className={INSULATION_CALCULATOR_ESTIMATE_VALUE_CLASS}
            data-testid="insulation-calculator-estimate"
          >
            {formatInsulationEstimate(estimate)}
          </p>
        </div>
      </div>

      <form onSubmit={onCalculate} noValidate>
        <div className={INSULATION_CALCULATOR_INPUTS_PANEL_CLASS}>
          <label htmlFor={AREA_FIELD_ID} className={INSULATION_CALCULATOR_LABEL_CLASS}>
            {INSULATION_CALCULATOR_COPY.areaLabel}
          </label>
          <div className={INSULATION_CALCULATOR_INPUT_WRAP_CLASS}>
            <input
              id={AREA_FIELD_ID}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              name="areaSqFt"
              value={areaSqFt}
              onChange={onAreaChange}
              placeholder={INSULATION_CALCULATOR_COPY.areaPlaceholder}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? AREA_ERROR_ID : undefined}
              className={inputClassName}
            />
            <span className={INSULATION_CALCULATOR_UNIT_CLASS} aria-hidden="true">
              {INSULATION_CALCULATOR_COPY.unitSuffix}
            </span>
          </div>
          {error ? (
            <p id={AREA_ERROR_ID} role="alert" className={INSULATION_CALCULATOR_ERROR_CLASS}>
              {error}
            </p>
          ) : null}
        </div>

        <div className={`${INSULATION_CALCULATOR_ACTIONS_CLASS} mt-2.5`}>
          <button type="submit" className={INSULATION_CALCULATOR_PRIMARY_BUTTON_CLASS}>
            <Calculator size={INSULATION_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {INSULATION_CALCULATOR_COPY.calculate}
          </button>
          <button
            type="button"
            className={INSULATION_CALCULATOR_SECONDARY_BUTTON_CLASS}
            onClick={onClear}
          >
            <RotateCcw size={INSULATION_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {INSULATION_CALCULATOR_COPY.clear}
          </button>
        </div>
      </form>
    </section>
  );
});

InsulationCalculator.displayName = 'InsulationCalculator';

export default InsulationCalculator;
