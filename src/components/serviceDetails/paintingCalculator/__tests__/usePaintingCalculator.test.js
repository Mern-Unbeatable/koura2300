import { act, renderHook } from '@testing-library/react';
import {
  PAINTING_CALCULATOR_DEFAULT_ESTIMATE,
  PAINTING_CALCULATOR_DEFAULT_HEIGHT_FT,
  PAINTING_CALCULATOR_DEFAULT_LENGTH_FT,
  PAINTING_CALCULATOR_DEFAULT_WIDTH_FT,
} from '../paintingCalculatorData';
import { PAINTING_CALCULATOR_COPY } from '../paintingCalculatorCopy';
import usePaintingCalculator from '../usePaintingCalculator';

describe('usePaintingCalculator', () => {
  it('seeds the Figma default room dimensions and estimate', () => {
    const { result } = renderHook(() => usePaintingCalculator());

    expect(result.current.roomLength).toBe(PAINTING_CALCULATOR_DEFAULT_LENGTH_FT);
    expect(result.current.roomWidth).toBe(PAINTING_CALCULATOR_DEFAULT_WIDTH_FT);
    expect(result.current.ceilingHeight).toBe(PAINTING_CALCULATOR_DEFAULT_HEIGHT_FT);
    expect(result.current.estimate).toBe(PAINTING_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.lengthError).toBe('');
    expect(result.current.widthError).toBe('');
    expect(result.current.heightError).toBe('');
  });

  it('shows inline errors when calculating without dimensions', () => {
    const { result } = renderHook(() => usePaintingCalculator());

    act(() => {
      result.current.onLengthChange({ target: { value: '' } });
      result.current.onWidthChange({ target: { value: '' } });
      result.current.onHeightChange({ target: { value: '' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.lengthError).toBe(PAINTING_CALCULATOR_COPY.errors.lengthRequired);
    expect(result.current.widthError).toBe(PAINTING_CALCULATOR_COPY.errors.widthRequired);
    expect(result.current.heightError).toBe(PAINTING_CALCULATOR_COPY.errors.heightRequired);
  });

  it('updates the estimate when Calculate is submitted with valid dimensions', () => {
    const { result } = renderHook(() => usePaintingCalculator());

    act(() => {
      result.current.onLengthChange({ target: { value: '10' } });
      result.current.onWidthChange({ target: { value: '10' } });
      result.current.onHeightChange({ target: { value: '8' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.lengthError).toBe('');
    expect(result.current.widthError).toBe('');
    expect(result.current.heightError).toBe('');
    expect(result.current.estimate).toBe(121);
  });

  it('clears the dimension inputs and restores the default estimate', () => {
    const { result } = renderHook(() => usePaintingCalculator());

    act(() => {
      result.current.onLengthChange({ target: { value: '20' } });
      result.current.onWidthChange({ target: { value: '15' } });
      result.current.onHeightChange({ target: { value: '9' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });
    act(() => {
      result.current.onClear();
    });

    expect(result.current.roomLength).toBe('');
    expect(result.current.roomWidth).toBe('');
    expect(result.current.ceilingHeight).toBe('');
    expect(result.current.estimate).toBe(PAINTING_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.lengthError).toBe('');
    expect(result.current.widthError).toBe('');
    expect(result.current.heightError).toBe('');
  });
});
