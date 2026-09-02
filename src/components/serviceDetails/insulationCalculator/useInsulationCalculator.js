import { useCallback, useState } from 'react';
import {
  INSULATION_CALCULATOR_DEFAULT_AREA_SQ_FT,
  INSULATION_CALCULATOR_DEFAULT_ESTIMATE,
} from './insulationCalculatorData';
import {
  calculateInsulationEstimate,
  parseArea,
  validateArea,
} from './insulationCalculatorUtils';

const useInsulationCalculator = () => {
  const [areaSqFt, setAreaSqFt] = useState(INSULATION_CALCULATOR_DEFAULT_AREA_SQ_FT);
  const [estimate, setEstimate] = useState(INSULATION_CALCULATOR_DEFAULT_ESTIMATE);
  const [error, setError] = useState('');

  const handleAreaChange = useCallback((event) => {
    setAreaSqFt(event.target.value);
    setError('');
  }, []);

  const handleCalculate = useCallback(
    (event) => {
      event.preventDefault();
      const validationError = validateArea(areaSqFt);
      if (validationError) {
        setError(validationError);
        return;
      }

      setEstimate(calculateInsulationEstimate(parseArea(areaSqFt)));
      setError('');
    },
    [areaSqFt],
  );

  const handleClear = useCallback(() => {
    setAreaSqFt('');
    setEstimate(INSULATION_CALCULATOR_DEFAULT_ESTIMATE);
    setError('');
  }, []);

  return {
    areaSqFt,
    estimate,
    error,
    onAreaChange: handleAreaChange,
    onCalculate: handleCalculate,
    onClear: handleClear,
  };
};

export default useInsulationCalculator;
