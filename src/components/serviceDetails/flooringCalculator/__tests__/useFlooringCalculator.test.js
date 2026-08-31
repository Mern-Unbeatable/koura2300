import { act, renderHook } from '@testing-library/react';
import {
  FLOORING_CALCULATOR_DEFAULT_ESTIMATE,
  FLOORING_CALCULATOR_DEFAULT_ROOM_SQ_FT,
} from '../flooringCalculatorData';
import { FLOORING_CALCULATOR_COPY } from '../flooringCalculatorCopy';
import useFlooringCalculator from '../useFlooringCalculator';

describe('useFlooringCalculator', () => {
  it('seeds the Figma default room size and estimate', () => {
    const { result } = renderHook(() => useFlooringCalculator());

    expect(result.current.roomSqFt).toBe(FLOORING_CALCULATOR_DEFAULT_ROOM_SQ_FT);
    expect(result.current.estimate).toBe(FLOORING_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.error).toBe('');
  });

  it('shows an inline error when calculating without a room size', () => {
    const { result } = renderHook(() => useFlooringCalculator());

    act(() => {
      result.current.onRoomChange({ target: { value: '' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.error).toBe(FLOORING_CALCULATOR_COPY.errors.roomRequired);
    expect(result.current.estimate).toBe(FLOORING_CALCULATOR_DEFAULT_ESTIMATE);
  });

  it('updates the estimate when Calculate is submitted with a valid room size', () => {
    const { result } = renderHook(() => useFlooringCalculator());

    act(() => {
      result.current.onRoomChange({ target: { value: '20' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.error).toBe('');
    expect(result.current.estimate).toBe(170);
  });

  it('clears the room input and restores the default estimate', () => {
    const { result } = renderHook(() => useFlooringCalculator());

    act(() => {
      result.current.onRoomChange({ target: { value: '40' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });
    act(() => {
      result.current.onClear();
    });

    expect(result.current.roomSqFt).toBe('');
    expect(result.current.estimate).toBe(FLOORING_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.error).toBe('');
  });
});
