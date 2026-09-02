import { act, renderHook } from '@testing-library/react';
import {
  FRAMING_CALCULATOR_DEFAULT_ESTIMATE,
  FRAMING_CALCULATOR_DEFAULT_HEIGHT_FT,
  FRAMING_CALCULATOR_DEFAULT_LENGTH_FT,
} from '../framingCalculatorData';
import { FRAMING_CALCULATOR_COPY } from '../framingCalculatorCopy';
import useFramingCalculator from '../useFramingCalculator';

describe('useFramingCalculator', () => {
  it('seeds the Figma default wall dimensions and estimate', () => {
    const { result } = renderHook(() => useFramingCalculator());

    expect(result.current.wallLength).toBe(FRAMING_CALCULATOR_DEFAULT_LENGTH_FT);
    expect(result.current.wallHeight).toBe(FRAMING_CALCULATOR_DEFAULT_HEIGHT_FT);
    expect(result.current.estimate).toBe(FRAMING_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.lengthError).toBe('');
    expect(result.current.heightError).toBe('');
  });

  it('shows inline errors when calculating without dimensions', () => {
    const { result } = renderHook(() => useFramingCalculator());

    act(() => {
      result.current.onLengthChange({ target: { value: '' } });
      result.current.onHeightChange({ target: { value: '' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.lengthError).toBe(FRAMING_CALCULATOR_COPY.errors.lengthRequired);
    expect(result.current.heightError).toBe(FRAMING_CALCULATOR_COPY.errors.heightRequired);
  });

  it('updates the estimate when Calculate is submitted with valid dimensions', () => {
    const { result } = renderHook(() => useFramingCalculator());

    act(() => {
      result.current.onLengthChange({ target: { value: '20' } });
      result.current.onHeightChange({ target: { value: '10' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.lengthError).toBe('');
    expect(result.current.heightError).toBe('');
    expect(result.current.estimate).toBe(155);
  });

  it('clears the dimension inputs and restores the default estimate', () => {
    const { result } = renderHook(() => useFramingCalculator());

    act(() => {
      result.current.onLengthChange({ target: { value: '30' } });
      result.current.onHeightChange({ target: { value: '8' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });
    act(() => {
      result.current.onClear();
    });

    expect(result.current.wallLength).toBe('');
    expect(result.current.wallHeight).toBe('');
    expect(result.current.estimate).toBe(FRAMING_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.lengthError).toBe('');
    expect(result.current.heightError).toBe('');
  });
});
