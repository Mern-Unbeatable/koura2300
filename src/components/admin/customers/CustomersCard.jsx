import { formatTotalBookingsPrice } from './customersUtils';
import {
  CUSTOMERS_CARD_BODY_CLASS,
  CUSTOMERS_CARD_CLASS,
  CUSTOMERS_CARD_HEADER_CLASS,
  CUSTOMERS_CARD_ID_CLASS,
  CUSTOMERS_CARD_LABEL_CLASS,
  CUSTOMERS_CARD_NAME_CLASS,
  CUSTOMERS_CARD_ROW_CLASS,
  CUSTOMERS_CARD_VALUE_CLASS,
  CUSTOMERS_EMAIL_CLASS,
  CUSTOMERS_PHONE_CLASS,
  CUSTOMERS_PRICE_CLASS,
} from './customersData';
import CustomersRowActions from './CustomersRowActions';
import CustomersStatusBadge from './CustomersStatusBadge';

const CustomersCardField = ({ label, children, valueClassName = CUSTOMERS_CARD_VALUE_CLASS }) => (
  <div className={CUSTOMERS_CARD_ROW_CLASS}>
    <span className={CUSTOMERS_CARD_LABEL_CLASS}>{label}</span>
    <span className={valueClassName}>{children}</span>
  </div>
);

const CustomersCard = ({
  customer,
  copy,
  isActionMenuOpen,
  onToggleActionMenu,
  onCloseActionMenu,
  onSeeDetails,
  onStatusChange,
}) => (
  <article
    data-testid={`customers-card-${customer.id}`}
    className={CUSTOMERS_CARD_CLASS}
    aria-label={`${copy.columns.customerId} ${customer.id}`}
  >
    <div className={CUSTOMERS_CARD_HEADER_CLASS}>
      <div className="min-w-0">
        <p className={CUSTOMERS_CARD_ID_CLASS}>{customer.id}</p>
        <p className={CUSTOMERS_CARD_NAME_CLASS}>{customer.name}</p>
      </div>
      <CustomersRowActions
        customerId={customer.id}
        copy={copy}
        isOpen={isActionMenuOpen}
        onToggle={onToggleActionMenu}
        onClose={onCloseActionMenu}
        onSeeDetails={onSeeDetails}
        onStatusChange={onStatusChange}
      />
    </div>

    <div className={CUSTOMERS_CARD_BODY_CLASS}>
      <CustomersCardField
        label={copy.columns.phone}
        valueClassName={`${CUSTOMERS_CARD_VALUE_CLASS} ${CUSTOMERS_PHONE_CLASS}`}
      >
        {customer.phone}
      </CustomersCardField>
      <CustomersCardField
        label={copy.columns.email}
        valueClassName={`${CUSTOMERS_CARD_VALUE_CLASS} ${CUSTOMERS_EMAIL_CLASS}`}
      >
        {customer.email}
      </CustomersCardField>
      <CustomersCardField
        label={copy.columns.totalBookingsPrice}
        valueClassName={`${CUSTOMERS_CARD_VALUE_CLASS} ${CUSTOMERS_PRICE_CLASS}`}
      >
        {formatTotalBookingsPrice(customer.totalBookingsPrice)}
      </CustomersCardField>
      <CustomersCardField label={copy.columns.status}>
        <CustomersStatusBadge statusId={customer.statusId} />
      </CustomersCardField>
    </div>
  </article>
);

export default CustomersCard;
