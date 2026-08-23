import {
  BOOKINGS_ACTION_MENU_ESTIMATED_HEIGHT_PX,
  BOOKINGS_ACTION_MENU_OFFSET_PX,
  BOOKINGS_ACTION_MENU_VIEWPORT_PADDING_PX,
  BOOKINGS_ACTION_MENU_WIDTH_PX,
  getActionMenuPosition,
} from '../bookingsActionMenuUtils';

describe('bookingsActionMenuUtils', () => {
  const anchorRect = {
    top: 400,
    bottom: 430,
    left: 900,
    right: 930,
    width: 30,
    height: 30,
  };

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1280,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    });
  });

  it('opens the menu below the trigger aligned to the right edge', () => {
    const position = getActionMenuPosition(anchorRect);

    expect(position).toEqual({
      top: anchorRect.bottom + BOOKINGS_ACTION_MENU_OFFSET_PX,
      left: anchorRect.right - BOOKINGS_ACTION_MENU_WIDTH_PX,
    });
  });

  it('flips the menu above the trigger when there is not enough space below', () => {
    const bottomAnchorRect = {
      ...anchorRect,
      top: 720,
      bottom: 750,
    };

    const position = getActionMenuPosition(bottomAnchorRect);

    expect(position.top).toBe(
      bottomAnchorRect.top - BOOKINGS_ACTION_MENU_ESTIMATED_HEIGHT_PX - BOOKINGS_ACTION_MENU_OFFSET_PX,
    );
  });

  it('keeps the menu inside the viewport horizontally', () => {
    const edgeAnchorRect = {
      ...anchorRect,
      left: 20,
      right: 50,
    };

    const position = getActionMenuPosition(edgeAnchorRect);

    expect(position.left).toBe(BOOKINGS_ACTION_MENU_VIEWPORT_PADDING_PX);
  });
});
