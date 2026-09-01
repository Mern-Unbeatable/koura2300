import { useCallback, useState } from 'react';
import {
  BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE,
  BACKSPLASH_CALCULATOR_DEFAULT_HEIGHT_FT,
  BACKSPLASH_CALCULATOR_DEFAULT_WIDTH_FT,
} from './backsplashCalculatorData';
import {
  calculateBacksplashEstimate,
  parseWallDimension,
  validateWallHeight,
  validateWallWidth,
} from './backsplashCalculatorUtils';

const useBacksplashCalculator = () => {
  const [wallWidth, setWallWidth] = useState(BACKSPLASH_CALCULATOR_DEFAULT_WIDTH_FT);
  const [wallHeight, setWallHeight] = useState(BACKSPLASH_CALCULATOR_DEFAULT_HEIGHT_FT);
  const [estimate, setEstimate] = useState(BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE);
  const [widthError, setWidthError] = useState('');
  const [heightError, setHeightError] = useState('');

  const handleWidthChange = useCallback((event) => {
    setWallWidth(event.target.value);
    setWidthError('');
  }, []);

  const handleHeightChange = useCallback((event) => {
    setWallHeight(event.target.value);
    setHeightError('');
  }, []);

  const handleCalculate = useCallback(
    (event) => {
      event.preventDefault();
      const nextWidthError = validateWallWidth(wallWidth);
      const nextHeightError = validateWallHeight(wallHeight);
      setWidthError(nextWidthError);
      setHeightError(nextHeightError);

      if (nextWidthError || nextHeightError) {
        return;
      }

      const parsedWidth = parseWallDimension(wallWidth);
      const parsedHeight = parseWallDimension(wallHeight);
      setEstimate(calculateBacksplashEstimate(parsedWidth, parsedHeight));
    },
    [wallHeight, wallWidth],
  );

  const handleClear = useCallback(() => {
    setWallWidth('');
    setWallHeight('');
    setEstimate(BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE);
    setWidthError('');
    setHeightError('');
  }, []);

  return {
    wallWidth,
    wallHeight,
    estimate,
    widthError,
    heightError,
    onWidthChange: handleWidthChange,
    onHeightChange: handleHeightChange,
    onCalculate: handleCalculate,
    onClear: handleClear,
  };
};

export default useBacksplashCalculator;
