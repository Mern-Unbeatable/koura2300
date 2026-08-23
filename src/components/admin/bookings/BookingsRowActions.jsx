import { MoreVertical } from 'lucide-react';
import {
  BOOKINGS_ACTION_MENU_CLASS,
  BOOKINGS_ACTION_MENU_ITEM_CLASS,
  BOOKINGS_ACTION_MENU_PRIMARY_CLASS,
  BOOKINGS_ACTION_MENU_STATUS_HEADING_CLASS,
  BOOKINGS_ACTION_MENU_STATUS_ITEM_CLASS,
  BOOKINGS_ACTION_STATUS_OPTIONS,
  BOOKINGS_ACTION_BUTTON_CLASS,
  BOOKINGS_STATUS_STYLES,
} from './bookingsData';

const BookingsActionMenu = ({
  copy,
  onSeeDetails,
  onChatWithCustomer,
  onStatusChange,
}) => (
  <div className={BOOKINGS_ACTION_MENU_CLASS} role="menu" aria-label={copy.actionMenu.label}>
    <button
      type="button"
      role="menuitem"
      className={BOOKINGS_ACTION_MENU_PRIMARY_CLASS}
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
);

const BookingsRowActions = ({
  bookingId,
  copy,
  isOpen,
  onToggle,
  onSeeDetails,
  onChatWithCustomer,
  onStatusChange,
}) => (
  <div
    className="relative"
    onClick={(event) => event.stopPropagation()}
    onKeyDown={(event) => event.stopPropagation()}
    role="presentation"
  >
    <button
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
        onSeeDetails={() => onSeeDetails(bookingId)}
        onChatWithCustomer={() => onChatWithCustomer(bookingId)}
        onStatusChange={(statusId) => onStatusChange(bookingId, statusId)}
      />
    ) : null}
  </div>
);

export default BookingsRowActions;
