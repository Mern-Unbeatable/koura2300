import { useCallback, useState } from 'react';
import {
  BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE,
  BATHROOM_TILE_CALCULATOR_DEFAULT_FLOOR_SQ_FT,
} from './bathroomTileCalculatorData';
import {
  calculateBathroomTileEstimate,
  parseFloorArea,
  validateFloorArea,
} from './bathroomTileCalculatorUtils';

const useBathroomTileCalculator = () => {
  const [floorSqFt, setFloorSqFt] = useState(BATHROOM_TILE_CALCULATOR_DEFAULT_FLOOR_SQ_FT);
  const [estimate, setEstimate] = useState(BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE);
  const [error, setError] = useState('');

  const handleFloorChange = useCallback((event) => {
    setFloorSqFt(event.target.value);
    setError('');
  }, []);

  const handleCalculate = useCallback(
    (event) => {
      event.preventDefault();
      const validationError = validateFloorArea(floorSqFt);
      if (validationError) {
        setError(validationError);
        return;
      }

      const parsedFloorArea = parseFloorArea(floorSqFt);
      setEstimate(calculateBathroomTileEstimate(parsedFloorArea));
      setError('');
    },
    [floorSqFt],
  );

  const handleClear = useCallback(() => {
    setFloorSqFt('');
    setEstimate(BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE);
    setError('');
  }, []);

  return {
    floorSqFt,
    estimate,
    error,
    onFloorChange: handleFloorChange,
    onCalculate: handleCalculate,
    onClear: handleClear,
  };
};

export default useBathroomTileCalculator;
