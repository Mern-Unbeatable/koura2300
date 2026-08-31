import { memo } from 'react';
import { Calculator, Layers, RotateCcw } from 'lucide-react';
import { FLOORING_CALCULATOR_COPY } from './flooringCalculatorCopy';
import {
  FLOORING_CALCULATOR_ACTION_ICON_SIZE_PX,
  FLOORING_CALCULATOR_ACTIONS_CLASS,
  FLOORING_CALCULATOR_CARD_CLASS,
  FLOORING_CALCULATOR_ERROR_CLASS,
  FLOORING_CALCULATOR_ESTIMATE_LABEL_CLASS,
  FLOORING_CALCULATOR_ESTIMATE_VALUE_CLASS,
  FLOORING_CALCULATOR_ESTIMATE_WRAP_CLASS,
  FLOORING_CALCULATOR_HEADER_CLASS,
  FLOORING_CALCULATOR_HEADER_ICON_SIZE_PX,
  FLOORING_CALCULATOR_ICON_WRAP_CLASS,
  FLOORING_CALCULATOR_INPUT_CLASS,
  FLOORING_CALCULATOR_INPUT_ERROR_CLASS,
  FLOORING_CALCULATOR_INPUT_WRAP_CLASS,
  FLOORING_CALCULATOR_INPUTS_PANEL_CLASS,
  FLOORING_CALCULATOR_LABEL_CLASS,
  FLOORING_CALCULATOR_PRIMARY_BUTTON_CLASS,
  FLOORING_CALCULATOR_SECONDARY_BUTTON_CLASS,
  FLOORING_CALCULATOR_SUBTITLE_CLASS,
  FLOORING_CALCULATOR_TITLE_CLASS,
  FLOORING_CALCULATOR_TITLE_ROW_CLASS,
  FLOORING_CALCULATOR_UNIT_CLASS,
} from './flooringCalculatorData';
import { formatFlooringEstimate } from './flooringCalculatorUtils';
import useFlooringCalculator from './useFlooringCalculator';

const ROOM_FIELD_ID = 'flooring-calculator-room-sq-ft';
const ROOM_ERROR_ID = 'flooring-calculator-room-error';

const FlooringCalculator = memo(() => {
  const { roomSqFt, estimate, error, onRoomChange, onCalculate, onClear } =
    useFlooringCalculator();

  const inputClassName = error
    ? `${FLOORING_CALCULATOR_INPUT_CLASS} ${FLOORING_CALCULATOR_INPUT_ERROR_CLASS}`
    : FLOORING_CALCULATOR_INPUT_CLASS;

  return (
    <section
      className={FLOORING_CALCULATOR_CARD_CLASS}
      aria-label={FLOORING_CALCULATOR_COPY.regionLabel}
      data-testid="flooring-calculator"
    >
      <div className={FLOORING_CALCULATOR_HEADER_CLASS}>
        <div className={FLOORING_CALCULATOR_TITLE_ROW_CLASS}>
          <span className={FLOORING_CALCULATOR_ICON_WRAP_CLASS} aria-hidden="true">
            <Layers size={FLOORING_CALCULATOR_HEADER_ICON_SIZE_PX} />
          </span>
          <div className="min-w-0">
            <h2 className={FLOORING_CALCULATOR_TITLE_CLASS}>{FLOORING_CALCULATOR_COPY.title}</h2>
            <p className={FLOORING_CALCULATOR_SUBTITLE_CLASS}>{FLOORING_CALCULATOR_COPY.subtitle}</p>
          </div>
        </div>

        <div className={FLOORING_CALCULATOR_ESTIMATE_WRAP_CLASS}>
          <p className={FLOORING_CALCULATOR_ESTIMATE_LABEL_CLASS}>
            {FLOORING_CALCULATOR_COPY.startingEstLabel}
          </p>
          <p className={FLOORING_CALCULATOR_ESTIMATE_VALUE_CLASS} data-testid="flooring-calculator-estimate">
            {formatFlooringEstimate(estimate)}
          </p>
        </div>
      </div>

      <form onSubmit={onCalculate} noValidate>
        <div className={FLOORING_CALCULATOR_INPUTS_PANEL_CLASS}>
          <label htmlFor={ROOM_FIELD_ID} className={FLOORING_CALCULATOR_LABEL_CLASS}>
            {FLOORING_CALCULATOR_COPY.roomLabel}
          </label>
          <div className={FLOORING_CALCULATOR_INPUT_WRAP_CLASS}>
            <input
              id={ROOM_FIELD_ID}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              name="roomSqFt"
              value={roomSqFt}
              onChange={onRoomChange}
              placeholder={FLOORING_CALCULATOR_COPY.roomPlaceholder}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? ROOM_ERROR_ID : undefined}
              className={inputClassName}
            />
            <span className={FLOORING_CALCULATOR_UNIT_CLASS} aria-hidden="true">
              {FLOORING_CALCULATOR_COPY.unitSuffix}
            </span>
          </div>
          {error ? (
            <p id={ROOM_ERROR_ID} role="alert" className={FLOORING_CALCULATOR_ERROR_CLASS}>
              {error}
            </p>
          ) : null}
        </div>

        <div className={`${FLOORING_CALCULATOR_ACTIONS_CLASS} mt-2.5`}>
          <button type="submit" className={FLOORING_CALCULATOR_PRIMARY_BUTTON_CLASS}>
            <Calculator size={FLOORING_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {FLOORING_CALCULATOR_COPY.calculate}
          </button>
          <button
            type="button"
            className={FLOORING_CALCULATOR_SECONDARY_BUTTON_CLASS}
            onClick={onClear}
          >
            <RotateCcw size={FLOORING_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {FLOORING_CALCULATOR_COPY.clear}
          </button>
        </div>
      </form>
    </section>
  );
});

FlooringCalculator.displayName = 'FlooringCalculator';

export default FlooringCalculator;
