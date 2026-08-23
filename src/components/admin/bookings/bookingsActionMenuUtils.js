export const BOOKINGS_ACTION_MENU_WIDTH_PX = 193;
export const BOOKINGS_ACTION_MENU_OFFSET_PX = 8;
export const BOOKINGS_ACTION_MENU_VIEWPORT_PADDING_PX = 12;
export const BOOKINGS_ACTION_MENU_ESTIMATED_HEIGHT_PX = 280;

export const getActionMenuPosition = (anchorRect, menuHeight = BOOKINGS_ACTION_MENU_ESTIMATED_HEIGHT_PX) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const maxLeft =
    viewportWidth - BOOKINGS_ACTION_MENU_WIDTH_PX - BOOKINGS_ACTION_MENU_VIEWPORT_PADDING_PX;

  let top = anchorRect.bottom + BOOKINGS_ACTION_MENU_OFFSET_PX;
  let left = anchorRect.right - BOOKINGS_ACTION_MENU_WIDTH_PX;

  const fitsBelow =
    top + menuHeight <= viewportHeight - BOOKINGS_ACTION_MENU_VIEWPORT_PADDING_PX;

  if (!fitsBelow) {
    top = anchorRect.top - menuHeight - BOOKINGS_ACTION_MENU_OFFSET_PX;
  }

  left = Math.max(BOOKINGS_ACTION_MENU_VIEWPORT_PADDING_PX, Math.min(left, maxLeft));
  top = Math.max(BOOKINGS_ACTION_MENU_VIEWPORT_PADDING_PX, top);

  return { top, left };
};
