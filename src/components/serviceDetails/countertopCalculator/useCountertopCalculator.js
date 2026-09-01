import { useCallback, useState } from 'react';
import {
  COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE,
  COUNTERTOP_CALCULATOR_DEFAULT_LENGTH_SQ_FT,
} from './countertopCalculatorData';
import {
  calculateCountertopEstimate,
  parseCounterLength,
  validateCounterLength,
} from './countertopCalculatorUtils';

const useCountertopCalculator = () => {
  const [counterLength, setCounterLength] = useState(
    COUNTERTOP_CALCULATOR_DEFAULT_LENGTH_SQ_FT,
  );
  const [estimate, setEstimate] = useState(COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE);
  const [error, setError] = useState('');

  const handleLengthChange = useCallback((event) => {
    setCounterLength(event.target.value);
    setError('');
  }, []);

  const handleCalculate = useCallback(
    (event) => {
      event.preventDefault();
      const validationError = validateCounterLength(counterLength);
      if (validationError) {
        setError(validationError);
        return;
      }

      const parsedLength = parseCounterLength(counterLength);
      setEstimate(calculateCountertopEstimate(parsedLength));
      setError('');
    },
    [counterLength],
  );

  const handleClear = useCallback(() => {
    setCounterLength('');
    setEstimate(COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE);
    setError('');
  }, []);

  return {
    counterLength,
    estimate,
    error,
    onLengthChange: handleLengthChange,
    onCalculate: handleCalculate,
    onClear: handleClear,
  };
};

export default useCountertopCalculator;
