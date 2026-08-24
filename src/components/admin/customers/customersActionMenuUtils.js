export const CUSTOMERS_ACTION_MENU_WIDTH_PX = 193;
export const CUSTOMERS_ACTION_MENU_OFFSET_PX = 8;
export const CUSTOMERS_ACTION_MENU_VIEWPORT_PADDING_PX = 12;
export const CUSTOMERS_ACTION_MENU_ESTIMATED_HEIGHT_PX = 120;

export const getActionMenuPosition = (
  anchorRect,
  menuHeight = CUSTOMERS_ACTION_MENU_ESTIMATED_HEIGHT_PX,
) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const maxLeft =
    viewportWidth - CUSTOMERS_ACTION_MENU_WIDTH_PX - CUSTOMERS_ACTION_MENU_VIEWPORT_PADDING_PX;

  let top = anchorRect.bottom + CUSTOMERS_ACTION_MENU_OFFSET_PX;
  let left = anchorRect.right - CUSTOMERS_ACTION_MENU_WIDTH_PX;

  const fitsBelow =
    top + menuHeight <= viewportHeight - CUSTOMERS_ACTION_MENU_VIEWPORT_PADDING_PX;

  if (!fitsBelow) {
    top = anchorRect.top - menuHeight - CUSTOMERS_ACTION_MENU_OFFSET_PX;
  }

  left = Math.max(CUSTOMERS_ACTION_MENU_VIEWPORT_PADDING_PX, Math.min(left, maxLeft));
  top = Math.max(CUSTOMERS_ACTION_MENU_VIEWPORT_PADDING_PX, top);

  return { top, left };
};
