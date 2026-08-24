import { getActionMenuPosition } from '../customersActionMenuUtils';

describe('customersActionMenuUtils', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1440 });
    Object.defineProperty(window, 'innerHeight', { writable: true, value: 900 });
  });

  it('positions the menu below the action anchor by default', () => {
    const position = getActionMenuPosition({
      top: 100,
      bottom: 124,
      left: 1200,
      right: 1224,
    });

    expect(position.top).toBeGreaterThan(124);
    expect(position.left).toBeLessThanOrEqual(1224 - 193);
  });

  it('flips the menu above when there is not enough space below', () => {
    const position = getActionMenuPosition(
      {
        top: 850,
        bottom: 874,
        left: 1200,
        right: 1224,
      },
      120,
    );

    expect(position.top).toBeLessThan(850);
  });
});
