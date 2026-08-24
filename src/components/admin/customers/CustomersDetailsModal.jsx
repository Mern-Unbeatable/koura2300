import { Mail, MapPin, Phone, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { CUSTOMERS_DETAILS_COPY } from './customersDetailsCopy';
import {
  CUSTOMERS_DETAILS_AVATAR_CLASS,
  CUSTOMERS_DETAILS_AVATAR_SUSPEND_CLASS,
  CUSTOMERS_DETAILS_CONTACT_CLASS,
  CUSTOMERS_DETAILS_CONTACT_ICON_WRAP_CLASS,
  CUSTOMERS_DETAILS_CONTACT_ROW_CLASS,
  CUSTOMERS_DETAILS_CONTACT_TEXT_CLASS,
  CUSTOMERS_DETAILS_DIALOG_CLASS,
  CUSTOMERS_DETAILS_HEADER_CLASS,
  CUSTOMERS_DETAILS_ICON_SIZE_PX,
  CUSTOMERS_DETAILS_NAME_CLASS,
  CUSTOMERS_DETAILS_OVERLAY_CLASS,
  CUSTOMERS_DETAILS_STAT_CLASS,
  CUSTOMERS_DETAILS_STAT_DIVIDER_CLASS,
  CUSTOMERS_DETAILS_STAT_LABEL_CLASS,
  CUSTOMERS_DETAILS_STAT_REVENUE_CLASS,
  CUSTOMERS_DETAILS_STAT_VALUE_CLASS,
  CUSTOMERS_DETAILS_STATS_CLASS,
  CUSTOMERS_DETAILS_STATUS_ACTIVE_CLASS,
  CUSTOMERS_DETAILS_STATUS_DOT_ACTIVE_CLASS,
  CUSTOMERS_DETAILS_STATUS_DOT_SUSPEND_CLASS,
  CUSTOMERS_DETAILS_STATUS_SUSPEND_CLASS,
} from './customersDetailsData';
import { CUSTOMERS_STATUS_STYLES } from './customersData';

const CustomersDetailsStatusBadge = ({ statusId }) => {
  const isActive = statusId === 'active';
  const label = CUSTOMERS_STATUS_STYLES[statusId]?.label ?? statusId;

  return (
    <span
      className={
        isActive ? CUSTOMERS_DETAILS_STATUS_ACTIVE_CLASS : CUSTOMERS_DETAILS_STATUS_SUSPEND_CLASS
      }
    >
      <span
        className={
          isActive
            ? CUSTOMERS_DETAILS_STATUS_DOT_ACTIVE_CLASS
            : CUSTOMERS_DETAILS_STATUS_DOT_SUSPEND_CLASS
        }
        aria-hidden="true"
      />
      {label}
    </span>
  );
};

const CustomersDetailsContactRow = ({ icon: Icon, children }) => (
  <div className={CUSTOMERS_DETAILS_CONTACT_ROW_CLASS}>
    <span className={CUSTOMERS_DETAILS_CONTACT_ICON_WRAP_CLASS} aria-hidden="true">
      <Icon size={CUSTOMERS_DETAILS_ICON_SIZE_PX} />
    </span>
    <p className={CUSTOMERS_DETAILS_CONTACT_TEXT_CLASS}>{children}</p>
  </div>
);

const CustomersDetailsModal = ({ details, onClose }) => {
  if (!details) {
    return null;
  }

  const isSuspended = details.statusId === 'suspend';
  const avatarClassName = `${CUSTOMERS_DETAILS_AVATAR_CLASS}${
    isSuspended ? ` ${CUSTOMERS_DETAILS_AVATAR_SUSPEND_CLASS}` : ''
  }`;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={CUSTOMERS_DETAILS_OVERLAY_CLASS}
      data-testid="customers-details-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={CUSTOMERS_DETAILS_COPY.regionLabel}
        className={CUSTOMERS_DETAILS_DIALOG_CLASS}
      >
        <button
          type="button"
          aria-label={CUSTOMERS_DETAILS_COPY.closeLabel}
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer rounded-md p-1 text-[#6b7280] transition-colors hover:text-[#111827] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className={CUSTOMERS_DETAILS_HEADER_CLASS}>
          <div className={avatarClassName} aria-hidden="true">
            {details.initials}
          </div>
          <h2 className={CUSTOMERS_DETAILS_NAME_CLASS}>{details.name}</h2>
          <CustomersDetailsStatusBadge statusId={details.statusId} />
        </div>

        <div className={CUSTOMERS_DETAILS_STATS_CLASS}>
          <div className={`${CUSTOMERS_DETAILS_STAT_CLASS} ${CUSTOMERS_DETAILS_STAT_DIVIDER_CLASS}`}>
            <p className={CUSTOMERS_DETAILS_STAT_VALUE_CLASS}>{details.bookingsCount}</p>
            <p className={CUSTOMERS_DETAILS_STAT_LABEL_CLASS}>
              {CUSTOMERS_DETAILS_COPY.bookingsLabel}
            </p>
          </div>
          <div className={CUSTOMERS_DETAILS_STAT_CLASS}>
            <p className={CUSTOMERS_DETAILS_STAT_REVENUE_CLASS}>{details.revenueLabel}</p>
            <p className={CUSTOMERS_DETAILS_STAT_LABEL_CLASS}>
              {CUSTOMERS_DETAILS_COPY.revenueLabel}
            </p>
          </div>
        </div>

        <div className={CUSTOMERS_DETAILS_CONTACT_CLASS}>
          <CustomersDetailsContactRow icon={Mail}>{details.email}</CustomersDetailsContactRow>
          <CustomersDetailsContactRow icon={Phone}>{details.phone}</CustomersDetailsContactRow>
          <CustomersDetailsContactRow icon={MapPin}>{details.address}</CustomersDetailsContactRow>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CustomersDetailsModal;
