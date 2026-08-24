import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';
import {
  CUSTOMERS_ACTION_BUTTON_CLASS,
  CUSTOMERS_ACTION_MENU_CLASS,
  CUSTOMERS_ACTION_MENU_ITEM_CLASS,
  CUSTOMERS_ACTION_MENU_SURFACE_CLASS,
  CUSTOMERS_ACTION_STATUS_OPTIONS,
  CUSTOMERS_STATUS_STYLES,
} from './customersData';
import useCustomersActionMenu from './useCustomersActionMenu';

const CustomersActionMenu = ({
  copy,
  menuRef,
  menuPosition,
  onSeeDetails,
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
      className={CUSTOMERS_ACTION_MENU_CLASS}
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      <div className={CUSTOMERS_ACTION_MENU_SURFACE_CLASS}>
        <button
          type="button"
          role="menuitem"
          className={CUSTOMERS_ACTION_MENU_ITEM_CLASS}
          onClick={onSeeDetails}
        >
          {copy.actionMenu.seeDetails}
        </button>
        {CUSTOMERS_ACTION_STATUS_OPTIONS.map((statusId) => (
          <button
            key={statusId}
            type="button"
            role="menuitem"
            className={CUSTOMERS_ACTION_MENU_ITEM_CLASS}
            onClick={() => onStatusChange(statusId)}
          >
            {CUSTOMERS_STATUS_STYLES[statusId].label}
          </button>
        ))}
      </div>
    </div>,
    document.body,
  );
};

const CustomersRowActions = ({
  customerId,
  copy,
  isOpen,
  onToggle,
  onClose,
  onSeeDetails,
  onStatusChange,
}) => {
  const { anchorRef, menuRef, menuPosition } = useCustomersActionMenu({
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
        className={CUSTOMERS_ACTION_BUTTON_CLASS}
        onClick={() => onToggle(customerId)}
      >
        <MoreVertical size={20} aria-hidden="true" />
      </button>
      {isOpen ? (
        <CustomersActionMenu
          copy={copy}
          menuRef={menuRef}
          menuPosition={menuPosition}
          onSeeDetails={() => onSeeDetails(customerId)}
          onStatusChange={(statusId) => onStatusChange(customerId, statusId)}
        />
      ) : null}
    </div>
  );
};

export default CustomersRowActions;
