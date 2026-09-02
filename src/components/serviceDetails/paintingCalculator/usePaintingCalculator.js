import { useCallback, useState } from 'react';
import {
  PAINTING_CALCULATOR_DEFAULT_ESTIMATE,
  PAINTING_CALCULATOR_DEFAULT_HEIGHT_FT,
  PAINTING_CALCULATOR_DEFAULT_LENGTH_FT,
  PAINTING_CALCULATOR_DEFAULT_WIDTH_FT,
} from './paintingCalculatorData';
import {
  calculatePaintingEstimate,
  parseRoomDimension,
  validateCeilingHeight,
  validateRoomLength,
  validateRoomWidth,
} from './paintingCalculatorUtils';

const usePaintingCalculator = () => {
  const [roomLength, setRoomLength] = useState(PAINTING_CALCULATOR_DEFAULT_LENGTH_FT);
  const [roomWidth, setRoomWidth] = useState(PAINTING_CALCULATOR_DEFAULT_WIDTH_FT);
  const [ceilingHeight, setCeilingHeight] = useState(PAINTING_CALCULATOR_DEFAULT_HEIGHT_FT);
  const [estimate, setEstimate] = useState(PAINTING_CALCULATOR_DEFAULT_ESTIMATE);
  const [lengthError, setLengthError] = useState('');
  const [widthError, setWidthError] = useState('');
  const [heightError, setHeightError] = useState('');

  const handleLengthChange = useCallback((event) => {
    setRoomLength(event.target.value);
    setLengthError('');
  }, []);

  const handleWidthChange = useCallback((event) => {
    setRoomWidth(event.target.value);
    setWidthError('');
  }, []);

  const handleHeightChange = useCallback((event) => {
    setCeilingHeight(event.target.value);
    setHeightError('');
  }, []);

  const handleCalculate = useCallback(
    (event) => {
      event.preventDefault();
      const nextLengthError = validateRoomLength(roomLength);
      const nextWidthError = validateRoomWidth(roomWidth);
      const nextHeightError = validateCeilingHeight(ceilingHeight);
      setLengthError(nextLengthError);
      setWidthError(nextWidthError);
      setHeightError(nextHeightError);

      if (nextLengthError || nextWidthError || nextHeightError) {
        return;
      }

      setEstimate(
        calculatePaintingEstimate(
          parseRoomDimension(roomLength),
          parseRoomDimension(roomWidth),
          parseRoomDimension(ceilingHeight),
        ),
      );
    },
    [ceilingHeight, roomLength, roomWidth],
  );

  const handleClear = useCallback(() => {
    setRoomLength('');
    setRoomWidth('');
    setCeilingHeight('');
    setEstimate(PAINTING_CALCULATOR_DEFAULT_ESTIMATE);
    setLengthError('');
    setWidthError('');
    setHeightError('');
  }, []);

  return {
    roomLength,
    roomWidth,
    ceilingHeight,
    estimate,
    lengthError,
    widthError,
    heightError,
    onLengthChange: handleLengthChange,
    onWidthChange: handleWidthChange,
    onHeightChange: handleHeightChange,
    onCalculate: handleCalculate,
    onClear: handleClear,
  };
};

export default usePaintingCalculator;
