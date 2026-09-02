import { useCallback, useState } from 'react';
import {
  FRAMING_CALCULATOR_DEFAULT_ESTIMATE,
  FRAMING_CALCULATOR_DEFAULT_HEIGHT_FT,
  FRAMING_CALCULATOR_DEFAULT_LENGTH_FT,
} from './framingCalculatorData';
import {
  calculateFramingEstimate,
  parseWallDimension,
  validateWallHeight,
  validateWallLength,
} from './framingCalculatorUtils';

const useFramingCalculator = () => {
  const [wallLength, setWallLength] = useState(FRAMING_CALCULATOR_DEFAULT_LENGTH_FT);
  const [wallHeight, setWallHeight] = useState(FRAMING_CALCULATOR_DEFAULT_HEIGHT_FT);
  const [estimate, setEstimate] = useState(FRAMING_CALCULATOR_DEFAULT_ESTIMATE);
  const [lengthError, setLengthError] = useState('');
  const [heightError, setHeightError] = useState('');

  const handleLengthChange = useCallback((event) => {
    setWallLength(event.target.value);
    setLengthError('');
  }, []);

  const handleHeightChange = useCallback((event) => {
    setWallHeight(event.target.value);
    setHeightError('');
  }, []);

  const handleCalculate = useCallback(
    (event) => {
      event.preventDefault();
      const nextLengthError = validateWallLength(wallLength);
      const nextHeightError = validateWallHeight(wallHeight);
      setLengthError(nextLengthError);
      setHeightError(nextHeightError);

      if (nextLengthError || nextHeightError) {
        return;
      }

      setEstimate(
        calculateFramingEstimate(
          parseWallDimension(wallLength),
          parseWallDimension(wallHeight),
        ),
      );
    },
    [wallHeight, wallLength],
  );

  const handleClear = useCallback(() => {
    setWallLength('');
    setWallHeight('');
    setEstimate(FRAMING_CALCULATOR_DEFAULT_ESTIMATE);
    setLengthError('');
    setHeightError('');
  }, []);

  return {
    wallLength,
    wallHeight,
    estimate,
    lengthError,
    heightError,
    onLengthChange: handleLengthChange,
    onHeightChange: handleHeightChange,
    onCalculate: handleCalculate,
    onClear: handleClear,
  };
};

export default useFramingCalculator;
