import { memo } from 'react';
import { Calculator, Layers, RotateCcw } from 'lucide-react';
import { BATHROOM_TILE_CALCULATOR_COPY } from './bathroomTileCalculatorCopy';
import {
  BATHROOM_TILE_CALCULATOR_ACTION_ICON_SIZE_PX,
  BATHROOM_TILE_CALCULATOR_ACTIONS_CLASS,
  BATHROOM_TILE_CALCULATOR_CARD_CLASS,
  BATHROOM_TILE_CALCULATOR_ERROR_CLASS,
  BATHROOM_TILE_CALCULATOR_ESTIMATE_LABEL_CLASS,
  BATHROOM_TILE_CALCULATOR_ESTIMATE_VALUE_CLASS,
  BATHROOM_TILE_CALCULATOR_ESTIMATE_WRAP_CLASS,
  BATHROOM_TILE_CALCULATOR_HEADER_CLASS,
  BATHROOM_TILE_CALCULATOR_HEADER_ICON_SIZE_PX,
  BATHROOM_TILE_CALCULATOR_ICON_WRAP_CLASS,
  BATHROOM_TILE_CALCULATOR_INPUT_CLASS,
  BATHROOM_TILE_CALCULATOR_INPUT_ERROR_CLASS,
  BATHROOM_TILE_CALCULATOR_INPUT_WRAP_CLASS,
  BATHROOM_TILE_CALCULATOR_INPUTS_PANEL_CLASS,
  BATHROOM_TILE_CALCULATOR_LABEL_CLASS,
  BATHROOM_TILE_CALCULATOR_PRIMARY_BUTTON_CLASS,
  BATHROOM_TILE_CALCULATOR_SECONDARY_BUTTON_CLASS,
  BATHROOM_TILE_CALCULATOR_SUBTITLE_CLASS,
  BATHROOM_TILE_CALCULATOR_TITLE_CLASS,
  BATHROOM_TILE_CALCULATOR_TITLE_ROW_CLASS,
  BATHROOM_TILE_CALCULATOR_UNIT_CLASS,
} from './bathroomTileCalculatorData';
import { formatBathroomTileEstimate } from './bathroomTileCalculatorUtils';
import useBathroomTileCalculator from './useBathroomTileCalculator';

const FLOOR_FIELD_ID = 'bathroom-tile-calculator-floor-sq-ft';
const FLOOR_ERROR_ID = 'bathroom-tile-calculator-floor-error';

const BathroomTileCalculator = memo(() => {
  const { floorSqFt, estimate, error, onFloorChange, onCalculate, onClear } =
    useBathroomTileCalculator();

  const inputClassName = error
    ? `${BATHROOM_TILE_CALCULATOR_INPUT_CLASS} ${BATHROOM_TILE_CALCULATOR_INPUT_ERROR_CLASS}`
    : BATHROOM_TILE_CALCULATOR_INPUT_CLASS;

  return (
    <section
      className={BATHROOM_TILE_CALCULATOR_CARD_CLASS}
      aria-label={BATHROOM_TILE_CALCULATOR_COPY.regionLabel}
      data-testid="bathroom-tile-calculator"
    >
      <div className={BATHROOM_TILE_CALCULATOR_HEADER_CLASS}>
        <div className={BATHROOM_TILE_CALCULATOR_TITLE_ROW_CLASS}>
          <span className={BATHROOM_TILE_CALCULATOR_ICON_WRAP_CLASS} aria-hidden="true">
            <Layers size={BATHROOM_TILE_CALCULATOR_HEADER_ICON_SIZE_PX} />
          </span>
          <div className="min-w-0">
            <h2 className={BATHROOM_TILE_CALCULATOR_TITLE_CLASS}>
              {BATHROOM_TILE_CALCULATOR_COPY.title}
            </h2>
            <p className={BATHROOM_TILE_CALCULATOR_SUBTITLE_CLASS}>
              {BATHROOM_TILE_CALCULATOR_COPY.subtitle}
            </p>
          </div>
        </div>

        <div className={BATHROOM_TILE_CALCULATOR_ESTIMATE_WRAP_CLASS}>
          <p className={BATHROOM_TILE_CALCULATOR_ESTIMATE_LABEL_CLASS}>
            {BATHROOM_TILE_CALCULATOR_COPY.startingEstLabel}
          </p>
          <p
            className={BATHROOM_TILE_CALCULATOR_ESTIMATE_VALUE_CLASS}
            data-testid="bathroom-tile-calculator-estimate"
          >
            {formatBathroomTileEstimate(estimate)}
          </p>
        </div>
      </div>

      <form onSubmit={onCalculate} noValidate>
        <div className={BATHROOM_TILE_CALCULATOR_INPUTS_PANEL_CLASS}>
          <label htmlFor={FLOOR_FIELD_ID} className={BATHROOM_TILE_CALCULATOR_LABEL_CLASS}>
            {BATHROOM_TILE_CALCULATOR_COPY.floorLabel}
          </label>
          <div className={BATHROOM_TILE_CALCULATOR_INPUT_WRAP_CLASS}>
            <input
              id={FLOOR_FIELD_ID}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              name="floorSqFt"
              value={floorSqFt}
              onChange={onFloorChange}
              placeholder={BATHROOM_TILE_CALCULATOR_COPY.floorPlaceholder}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? FLOOR_ERROR_ID : undefined}
              className={inputClassName}
            />
            <span className={BATHROOM_TILE_CALCULATOR_UNIT_CLASS} aria-hidden="true">
              {BATHROOM_TILE_CALCULATOR_COPY.unitSuffix}
            </span>
          </div>
          {error ? (
            <p id={FLOOR_ERROR_ID} role="alert" className={BATHROOM_TILE_CALCULATOR_ERROR_CLASS}>
              {error}
            </p>
          ) : null}
        </div>

        <div className={`${BATHROOM_TILE_CALCULATOR_ACTIONS_CLASS} mt-2.5`}>
          <button type="submit" className={BATHROOM_TILE_CALCULATOR_PRIMARY_BUTTON_CLASS}>
            <Calculator size={BATHROOM_TILE_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {BATHROOM_TILE_CALCULATOR_COPY.calculate}
          </button>
          <button
            type="button"
            className={BATHROOM_TILE_CALCULATOR_SECONDARY_BUTTON_CLASS}
            onClick={onClear}
          >
            <RotateCcw size={BATHROOM_TILE_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {BATHROOM_TILE_CALCULATOR_COPY.clear}
          </button>
        </div>
      </form>
    </section>
  );
});

BathroomTileCalculator.displayName = 'BathroomTileCalculator';

export default BathroomTileCalculator;
