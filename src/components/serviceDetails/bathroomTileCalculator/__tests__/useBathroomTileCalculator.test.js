import { act, renderHook } from '@testing-library/react';
import {
  BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE,
  BATHROOM_TILE_CALCULATOR_DEFAULT_FLOOR_SQ_FT,
} from '../bathroomTileCalculatorData';
import { BATHROOM_TILE_CALCULATOR_COPY } from '../bathroomTileCalculatorCopy';
import useBathroomTileCalculator from '../useBathroomTileCalculator';

describe('useBathroomTileCalculator', () => {
  it('seeds the Figma default floor area and estimate', () => {
    const { result } = renderHook(() => useBathroomTileCalculator());

    expect(result.current.floorSqFt).toBe(BATHROOM_TILE_CALCULATOR_DEFAULT_FLOOR_SQ_FT);
    expect(result.current.estimate).toBe(BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.error).toBe('');
  });

  it('shows an inline error when calculating without a floor area', () => {
    const { result } = renderHook(() => useBathroomTileCalculator());

    act(() => {
      result.current.onFloorChange({ target: { value: '' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.error).toBe(BATHROOM_TILE_CALCULATOR_COPY.errors.floorRequired);
  });

  it('updates the estimate when Calculate is submitted with a valid floor area', () => {
    const { result } = renderHook(() => useBathroomTileCalculator());

    act(() => {
      result.current.onFloorChange({ target: { value: '20' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });

    expect(result.current.error).toBe('');
    expect(result.current.estimate).toBe(195);
  });

  it('clears the floor input and restores the default estimate', () => {
    const { result } = renderHook(() => useBathroomTileCalculator());

    act(() => {
      result.current.onFloorChange({ target: { value: '30' } });
    });
    act(() => {
      result.current.onCalculate({ preventDefault: jest.fn() });
    });
    act(() => {
      result.current.onClear();
    });

    expect(result.current.floorSqFt).toBe('');
    expect(result.current.estimate).toBe(BATHROOM_TILE_CALCULATOR_DEFAULT_ESTIMATE);
    expect(result.current.error).toBe('');
  });
});
