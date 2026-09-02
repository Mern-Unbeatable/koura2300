import { memo } from 'react';
import { Calculator, Layers, RotateCcw } from 'lucide-react';
import { PAINTING_CALCULATOR_COPY } from './paintingCalculatorCopy';
import {
  PAINTING_CALCULATOR_ACTION_ICON_SIZE_PX,
  PAINTING_CALCULATOR_ACTIONS_CLASS,
  PAINTING_CALCULATOR_CARD_CLASS,
  PAINTING_CALCULATOR_ERROR_CLASS,
  PAINTING_CALCULATOR_ESTIMATE_LABEL_CLASS,
  PAINTING_CALCULATOR_ESTIMATE_VALUE_CLASS,
  PAINTING_CALCULATOR_ESTIMATE_WRAP_CLASS,
  PAINTING_CALCULATOR_FIELD_CLASS,
  PAINTING_CALCULATOR_HEADER_CLASS,
  PAINTING_CALCULATOR_HEADER_ICON_SIZE_PX,
  PAINTING_CALCULATOR_ICON_WRAP_CLASS,
  PAINTING_CALCULATOR_INPUT_CLASS,
  PAINTING_CALCULATOR_INPUT_ERROR_CLASS,
  PAINTING_CALCULATOR_INPUT_WRAP_CLASS,
  PAINTING_CALCULATOR_INPUTS_PANEL_CLASS,
  PAINTING_CALCULATOR_LABEL_CLASS,
  PAINTING_CALCULATOR_PRIMARY_BUTTON_CLASS,
  PAINTING_CALCULATOR_SECONDARY_BUTTON_CLASS,
  PAINTING_CALCULATOR_SUBTITLE_CLASS,
  PAINTING_CALCULATOR_TITLE_CLASS,
  PAINTING_CALCULATOR_TITLE_ROW_CLASS,
  PAINTING_CALCULATOR_UNIT_CLASS,
} from './paintingCalculatorData';
import { formatPaintingEstimate } from './paintingCalculatorUtils';
import usePaintingCalculator from './usePaintingCalculator';

const LENGTH_FIELD_ID = 'painting-calculator-room-length-ft';
const LENGTH_ERROR_ID = 'painting-calculator-room-length-error';
const WIDTH_FIELD_ID = 'painting-calculator-room-width-ft';
const WIDTH_ERROR_ID = 'painting-calculator-room-width-error';
const HEIGHT_FIELD_ID = 'painting-calculator-ceiling-height-ft';
const HEIGHT_ERROR_ID = 'painting-calculator-ceiling-height-error';

const PaintingCalculator = memo(() => {
  const {
    roomLength,
    roomWidth,
    ceilingHeight,
    estimate,
    lengthError,
    widthError,
    heightError,
    onLengthChange,
    onWidthChange,
    onHeightChange,
    onCalculate,
    onClear,
  } = usePaintingCalculator();

  const lengthInputClassName = lengthError
    ? `${PAINTING_CALCULATOR_INPUT_CLASS} ${PAINTING_CALCULATOR_INPUT_ERROR_CLASS}`
    : PAINTING_CALCULATOR_INPUT_CLASS;
  const widthInputClassName = widthError
    ? `${PAINTING_CALCULATOR_INPUT_CLASS} ${PAINTING_CALCULATOR_INPUT_ERROR_CLASS}`
    : PAINTING_CALCULATOR_INPUT_CLASS;
  const heightInputClassName = heightError
    ? `${PAINTING_CALCULATOR_INPUT_CLASS} ${PAINTING_CALCULATOR_INPUT_ERROR_CLASS}`
    : PAINTING_CALCULATOR_INPUT_CLASS;

  return (
    <section
      className={PAINTING_CALCULATOR_CARD_CLASS}
      aria-label={PAINTING_CALCULATOR_COPY.regionLabel}
      data-testid="painting-calculator"
    >
      <div className={PAINTING_CALCULATOR_HEADER_CLASS}>
        <div className={PAINTING_CALCULATOR_TITLE_ROW_CLASS}>
          <span className={PAINTING_CALCULATOR_ICON_WRAP_CLASS} aria-hidden="true">
            <Layers size={PAINTING_CALCULATOR_HEADER_ICON_SIZE_PX} />
          </span>
          <div className="min-w-0">
            <h2 className={PAINTING_CALCULATOR_TITLE_CLASS}>{PAINTING_CALCULATOR_COPY.title}</h2>
            <p className={PAINTING_CALCULATOR_SUBTITLE_CLASS}>{PAINTING_CALCULATOR_COPY.subtitle}</p>
          </div>
        </div>

        <div className={PAINTING_CALCULATOR_ESTIMATE_WRAP_CLASS}>
          <p className={PAINTING_CALCULATOR_ESTIMATE_LABEL_CLASS}>
            {PAINTING_CALCULATOR_COPY.startingEstLabel}
          </p>
          <p
            className={PAINTING_CALCULATOR_ESTIMATE_VALUE_CLASS}
            data-testid="painting-calculator-estimate"
          >
            {formatPaintingEstimate(estimate)}
          </p>
        </div>
      </div>

      <form onSubmit={onCalculate} noValidate>
        <div className={PAINTING_CALCULATOR_INPUTS_PANEL_CLASS}>
          <div className={PAINTING_CALCULATOR_FIELD_CLASS}>
            <label htmlFor={LENGTH_FIELD_ID} className={PAINTING_CALCULATOR_LABEL_CLASS}>
              {PAINTING_CALCULATOR_COPY.lengthLabel}
            </label>
            <div className={PAINTING_CALCULATOR_INPUT_WRAP_CLASS}>
              <input
                id={LENGTH_FIELD_ID}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                name="roomLength"
                value={roomLength}
                onChange={onLengthChange}
                placeholder={PAINTING_CALCULATOR_COPY.lengthPlaceholder}
                aria-invalid={Boolean(lengthError)}
                aria-describedby={lengthError ? LENGTH_ERROR_ID : undefined}
                className={lengthInputClassName}
              />
              <span className={PAINTING_CALCULATOR_UNIT_CLASS} aria-hidden="true">
                {PAINTING_CALCULATOR_COPY.unitSuffix}
              </span>
            </div>
            {lengthError ? (
              <p id={LENGTH_ERROR_ID} role="alert" className={PAINTING_CALCULATOR_ERROR_CLASS}>
                {lengthError}
              </p>
            ) : null}
          </div>

          <div className={PAINTING_CALCULATOR_FIELD_CLASS}>
            <label htmlFor={WIDTH_FIELD_ID} className={PAINTING_CALCULATOR_LABEL_CLASS}>
              {PAINTING_CALCULATOR_COPY.widthLabel}
            </label>
            <div className={PAINTING_CALCULATOR_INPUT_WRAP_CLASS}>
              <input
                id={WIDTH_FIELD_ID}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                name="roomWidth"
                value={roomWidth}
                onChange={onWidthChange}
                placeholder={PAINTING_CALCULATOR_COPY.widthPlaceholder}
                aria-invalid={Boolean(widthError)}
                aria-describedby={widthError ? WIDTH_ERROR_ID : undefined}
                className={widthInputClassName}
              />
              <span className={PAINTING_CALCULATOR_UNIT_CLASS} aria-hidden="true">
                {PAINTING_CALCULATOR_COPY.unitSuffix}
              </span>
            </div>
            {widthError ? (
              <p id={WIDTH_ERROR_ID} role="alert" className={PAINTING_CALCULATOR_ERROR_CLASS}>
                {widthError}
              </p>
            ) : null}
          </div>

          <div className={PAINTING_CALCULATOR_FIELD_CLASS}>
            <label htmlFor={HEIGHT_FIELD_ID} className={PAINTING_CALCULATOR_LABEL_CLASS}>
              {PAINTING_CALCULATOR_COPY.heightLabel}
            </label>
            <div className={PAINTING_CALCULATOR_INPUT_WRAP_CLASS}>
              <input
                id={HEIGHT_FIELD_ID}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                name="ceilingHeight"
                value={ceilingHeight}
                onChange={onHeightChange}
                placeholder={PAINTING_CALCULATOR_COPY.heightPlaceholder}
                aria-invalid={Boolean(heightError)}
                aria-describedby={heightError ? HEIGHT_ERROR_ID : undefined}
                className={heightInputClassName}
              />
              <span className={PAINTING_CALCULATOR_UNIT_CLASS} aria-hidden="true">
                {PAINTING_CALCULATOR_COPY.unitSuffix}
              </span>
            </div>
            {heightError ? (
              <p id={HEIGHT_ERROR_ID} role="alert" className={PAINTING_CALCULATOR_ERROR_CLASS}>
                {heightError}
              </p>
            ) : null}
          </div>
        </div>

        <div className={`${PAINTING_CALCULATOR_ACTIONS_CLASS} mt-2.5`}>
          <button type="submit" className={PAINTING_CALCULATOR_PRIMARY_BUTTON_CLASS}>
            <Calculator size={PAINTING_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {PAINTING_CALCULATOR_COPY.calculate}
          </button>
          <button
            type="button"
            className={PAINTING_CALCULATOR_SECONDARY_BUTTON_CLASS}
            onClick={onClear}
          >
            <RotateCcw size={PAINTING_CALCULATOR_ACTION_ICON_SIZE_PX} aria-hidden="true" />
            {PAINTING_CALCULATOR_COPY.clear}
          </button>
        </div>
      </form>
    </section>
  );
});

PaintingCalculator.displayName = 'PaintingCalculator';

export default PaintingCalculator;
