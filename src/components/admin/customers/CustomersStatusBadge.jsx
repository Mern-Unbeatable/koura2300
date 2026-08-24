import {
  CUSTOMERS_STATUS_BADGE_CLASS,
  CUSTOMERS_STATUS_STYLES,
} from './customersData';

const CustomersStatusBadge = ({ statusId }) => {
  const status = CUSTOMERS_STATUS_STYLES[statusId];

  if (!status) {
    return null;
  }

  return (
    <span className={`${CUSTOMERS_STATUS_BADGE_CLASS} ${status.badgeClass}`}>{status.label}</span>
  );
};

export default CustomersStatusBadge;
