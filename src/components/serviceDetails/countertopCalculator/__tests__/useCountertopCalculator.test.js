import { act, renderHook } from '@testing-library/react';
import {
  COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE,
  COUNTERTOP_CALCULATOR_DEFAULT_LENGTH_SQ_FT,
} from '../countertopCalculatorData';
import { COUNTERTOP_CALCULATOR_COPY } from '../countertopCalculatorCopy';
import useCountertopCalculator from '../useCountertopCalculator';

describe('useCountertopCalculator', () => {
  it('seeds the Figma default counter length and estimate', () => {
    const { result } = renderHook(() => useCountertopCalculator());

    expect(result.current.counterLength).toBe(COUNTERTOP_CALCULATOR_DEFAULT_LENGTH_SQ_FT);
    expect(result.current.estimate).toBe(COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.error).toBe('');
  });

  it('shows an inline error when calculating without a length', () => {
    const { result } = renderHook(() => useCountertopCalculator());

    act(() => {
      result.current.onLengthChange({ target: { value: '' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.error).toBe(COUNTERTOP_CALCULATOR_COPY.errors.lengthRequired);
  });

  it('updates the estimate when Calculate is submitted with a valid length', () => {
    const { result } = renderHook(() => useCountertopCalculator());

    act(() => {
      result.current.onLengthChange({ target: { value: '20' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.error).toBe('');
    expect(result.current.estimate).toBe(195);
  });

  it('clears the length input and restores the default estimate', () => {
    const { result } = renderHook(() => useCountertopCalculator());

    act(() => {
      result.current.onLengthChange({ target: { value: '30' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });
    act(() => {
      result.current.onClear();
    });

    expect(result.current.counterLength).toBe('');
    expect(result.current.estimate).toBe(COUNTERTOP_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.error).toBe('');
  });
});
