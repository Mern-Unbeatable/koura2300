import { act, renderHook } from '@testing-library/react';
import {
  BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE,
  BACKSPLASH_CALCULATOR_DEFAULT_HEIGHT_FT,
  BACKSPLASH_CALCULATOR_DEFAULT_WIDTH_FT,
} from '../backsplashCalculatorData';
import { BACKSPLASH_CALCULATOR_COPY } from '../backsplashCalculatorCopy';
import useBacksplashCalculator from '../useBacksplashCalculator';

describe('useBacksplashCalculator', () => {
  it('seeds the Figma default wall dimensions and estimate', () => {
    const { result } = renderHook(() => useBacksplashCalculator());

    expect(result.current.wallWidth).toBe(BACKSPLASH_CALCULATOR_DEFAULT_WIDTH_FT);
    expect(result.current.wallHeight).toBe(BACKSPLASH_CALCULATOR_DEFAULT_HEIGHT_FT);
    expect(result.current.estimate).toBe(BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.widthError).toBe('');
    expect(result.current.heightError).toBe('');
  });

  it('shows inline errors when calculating without dimensions', () => {
    const { result } = renderHook(() => useBacksplashCalculator());

    act(() => {
      result.current.onWidthChange({ target: { value: '' } });
      result.current.onHeightChange({ target: { value: '' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.widthError).toBe(BACKSPLASH_CALCULATOR_COPY.errors.widthRequired);
    expect(result.current.heightError).toBe(BACKSPLASH_CALCULATOR_COPY.errors.heightRequired);
  });

  it('updates the estimate when Calculate is submitted with valid dimensions', () => {
    const { result } = renderHook(() => useBacksplashCalculator());

    act(() => {
      result.current.onWidthChange({ target: { value: '20' } });
      result.current.onHeightChange({ target: { value: '10' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.widthError).toBe('');
    expect(result.current.heightError).toBe('');
    expect(result.current.estimate).toBe(155);
  });

  it('clears the dimension inputs and restores the default estimate', () => {
    const { result } = renderHook(() => useBacksplashCalculator());

    act(() => {
      result.current.onWidthChange({ target: { value: '30' } });
      result.current.onHeightChange({ target: { value: '8' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });
    act(() => {
      result.current.onClear();
    });

    expect(result.current.wallWidth).toBe('');
    expect(result.current.wallHeight).toBe('');
    expect(result.current.estimate).toBe(BACKSPLASH_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.widthError).toBe('');
    expect(result.current.heightError).toBe('');
  });
});
