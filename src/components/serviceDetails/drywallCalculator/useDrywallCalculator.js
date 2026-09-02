import { useCallback, useState } from 'react';
import {
  DRYWALL_CALCULATOR_DEFAULT_ESTIMATE,
  DRYWALL_CALCULATOR_DEFAULT_HEIGHT_FT,
  DRYWALL_CALCULATOR_DEFAULT_WIDTH_FT,
} from './drywallCalculatorData';
import {
  calculateDrywallEstimate,
  parseWallDimension,
  validateWallHeight,
  validateWallWidth,
} from './drywallCalculatorUtils';

const useDrywallCalculator = () => {
  const [wallWidth, setWallWidth] = useState(DRYWALL_CALCULATOR_DEFAULT_WIDTH_FT);
  const [wallHeight, setWallHeight] = useState(DRYWALL_CALCULATOR_DEFAULT_HEIGHT_FT);
  const [estimate, setEstimate] = useState(DRYWALL_CALCULATOR_DEFAULT_ESTIMATE);
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

      setEstimate(
        calculateDrywallEstimate(
          parseWallDimension(wallWidth),
          parseWallDimension(wallHeight),
        ),
      );
    },
    [wallHeight, wallWidth],
  );

  const handleClear = useCallback(() => {
    setWallWidth('');
    setWallHeight('');
    setEstimate(DRYWALL_CALCULATOR_DEFAULT_ESTIMATE);
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

export default useDrywallCalculator;
