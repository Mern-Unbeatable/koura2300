import { useCallback, useState } from 'react';
import {
  FLOORING_CALCULATOR_DEFAULT_ESTIMATE,
  FLOORING_CALCULATOR_DEFAULT_ROOM_SQ_FT,
} from './flooringCalculatorData';
import {
  calculateFlooringEstimate,
  parseRoomSquareFeet,
  validateRoomSquareFeet,
} from './flooringCalculatorUtils';

const useFlooringCalculator = () => {
  const [roomSqFt, setRoomSqFt] = useState(FLOORING_CALCULATOR_DEFAULT_ROOM_SQ_FT);
  const [estimate, setEstimate] = useState(FLOORING_CALCULATOR_DEFAULT_ESTIMATE);
  const [error, setError] = useState('');

  const handleRoomChange = useCallback((event) => {
    setRoomSqFt(event.target.value);
    setError('');
  }, []);

  const handleCalculate = useCallback(
    (event) => {
      event.preventDefault();
      const validationError = validateRoomSquareFeet(roomSqFt);
      if (validationError) {
        setError(validationError);
        return;
      }

      const parsedRoom = parseRoomSquareFeet(roomSqFt);
      setEstimate(calculateFlooringEstimate(parsedRoom));
      setError('');
    },
    [roomSqFt],
  );

  const handleClear = useCallback(() => {
    setRoomSqFt('');
    setEstimate(FLOORING_CALCULATOR_DEFAULT_ESTIMATE);
    setError('');
  }, []);

  return {
    roomSqFt,
    estimate,
    error,
    onRoomChange: handleRoomChange,
    onCalculate: handleCalculate,
    onClear: handleClear,
  };
};

export default useFlooringCalculator;
