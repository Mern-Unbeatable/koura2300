import { act, renderHook } from '@testing-library/react';
import {
  INSULATION_CALCULATOR_DEFAULT_AREA_SQ_FT,
  INSULATION_CALCULATOR_DEFAULT_ESTIMATE,
} from '../insulationCalculatorData';
import { INSULATION_CALCULATOR_COPY } from '../insulationCalculatorCopy';
import useInsulationCalculator from '../useInsulationCalculator';

describe('useInsulationCalculator', () => {
  it('seeds the Figma default area and estimate', () => {
    const { result } = renderHook(() => useInsulationCalculator());

    expect(result.current.areaSqFt).toBe(INSULATION_CALCULATOR_DEFAULT_AREA_SQ_FT);
    expect(result.current.estimate).toBe(INSULATION_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.error).toBe('');
  });

  it('shows an inline error when calculating without an area', () => {
    const { result } = renderHook(() => useInsulationCalculator());

    act(() => {
      result.current.onAreaChange({ target: { value: '' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.error).toBe(INSULATION_CALCULATOR_COPY.errors.areaRequired);
  });

  it('updates the estimate when Calculate is submitted with a valid area', () => {
    const { result } = renderHook(() => useInsulationCalculator());

    act(() => {
      result.current.onAreaChange({ target: { value: '20' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.error).toBe('');
    expect(result.current.estimate).toBe(170);
  });

  it('clears the area input and restores the default estimate', () => {
    const { result } = renderHook(() => useInsulationCalculator());

    act(() => {
      result.current.onAreaChange({ target: { value: '30' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });
    act(() => {
      result.current.onClear();
    });

    expect(result.current.areaSqFt).toBe('');
    expect(result.current.estimate).toBe(INSULATION_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.error).toBe('');
  });
});
