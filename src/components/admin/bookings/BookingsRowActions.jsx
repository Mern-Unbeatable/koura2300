import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';
import {
  BOOKINGS_ACTION_BUTTON_CLASS,
  BOOKINGS_ACTION_MENU_CLASS,
  BOOKINGS_ACTION_MENU_ITEM_CLASS,
  BOOKINGS_ACTION_MENU_STATUS_HEADING_CLASS,
  BOOKINGS_ACTION_MENU_STATUS_ITEM_CLASS,
  BOOKINGS_ACTION_MENU_SURFACE_CLASS,
  BOOKINGS_ACTION_STATUS_OPTIONS,
  BOOKINGS_STATUS_STYLES,
} from './bookingsData';
import useBookingsActionMenu from './useBookingsActionMenu';

const BookingsActionMenu = ({
  copy,
  menuRef,
  menuPosition,
  onSeeDetails,
  onChatWithCustomer,
  onStatusChange,
}) => {
  if (!menuPosition) {
    return null;
  }

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      aria-label={copy.actionMenu.label}
      className={BOOKINGS_ACTION_MENU_CLASS}
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      <div className={BOOKINGS_ACTION_MENU_SURFACE_CLASS}>
        <button
          type="button"
          role="menuitem"
          className={BOOKINGS_ACTION_MENU_ITEM_CLASS}
          onClick={onSeeDetails}
        >
          {copy.actionMenu.seeDetails}
        </button>
        <button
          type="button"
          role="menuitem"
          className={BOOKINGS_ACTION_MENU_ITEM_CLASS}
          onClick={onChatWithCustomer}
        >
          {copy.actionMenu.chatWithCustomer}
        </button>
        <p className={BOOKINGS_ACTION_MENU_STATUS_HEADING_CLASS}>{copy.actionMenu.statusHeading}</p>
        {BOOKINGS_ACTION_STATUS_OPTIONS.map((statusId) => (
          <button
            key={statusId}
            type="button"
            role="menuitem"
            className={BOOKINGS_ACTION_MENU_STATUS_ITEM_CLASS}
            onClick={() => onStatusChange(statusId)}
          >
            {BOOKINGS_STATUS_STYLES[statusId].label}
          </button>
        ))}
      </div>
    </div>,
    document.body,
  );
};

const BookingsRowActions = ({
  bookingId,
  copy,
  isOpen,
  onToggle,
  onClose,
  onSeeDetails,
  onChatWithCustomer,
  onStatusChange,
}) => {
  const { anchorRef, menuRef, menuPosition } = useBookingsActionMenu({
    isOpen,
    onClose,
  });

  return (
    <div className="relative flex justify-center" role="presentation">
      <button
        ref={anchorRef}
        type="button"
        aria-label={copy.actionMenu.label}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={BOOKINGS_ACTION_BUTTON_CLASS}
        onClick={() => onToggle(bookingId)}
      >
        <MoreVertical size={20} aria-hidden="true" />
      </button>
      {isOpen ? (
        <BookingsActionMenu
          copy={copy}
          menuRef={menuRef}
          menuPosition={menuPosition}
          onSeeDetails={() => onSeeDetails(bookingId)}
          onChatWithCustomer={() => onChatWithCustomer(bookingId)}
          onStatusChange={(statusId) => onStatusChange(bookingId, statusId)}
        />
      ) : null}
    </div>
  );
};

export default BookingsRowActions;
