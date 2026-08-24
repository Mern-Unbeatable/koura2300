import { formatTotalBookingsPrice } from './customersUtils';
import {
  CUSTOMERS_EMAIL_CLASS,
  CUSTOMERS_PHONE_CLASS,
  CUSTOMERS_PRICE_CLASS,
  CUSTOMERS_TABLE_ACTION_CELL_CLASS,
  CUSTOMERS_TABLE_CELL_CLASS,
  CUSTOMERS_TABLE_ROW_CLASS,
} from './customersData';
import CustomersRowActions from './CustomersRowActions';
import CustomersStatusBadge from './CustomersStatusBadge';

const CustomersTableRow = ({
  customer,
  copy,
  isActionMenuOpen,
  onToggleActionMenu,
  onCloseActionMenu,
  onSeeDetails,
  onStatusChange,
}) => (
  <tr className={CUSTOMERS_TABLE_ROW_CLASS}>
    <td className={CUSTOMERS_TABLE_CELL_CLASS}>{customer.id}</td>
    <td className={CUSTOMERS_TABLE_CELL_CLASS}>{customer.name}</td>
    <td className={`${CUSTOMERS_TABLE_CELL_CLASS} ${CUSTOMERS_PHONE_CLASS}`}>{customer.phone}</td>
    <td className={`${CUSTOMERS_TABLE_CELL_CLASS} ${CUSTOMERS_EMAIL_CLASS}`}>{customer.email}</td>
    <td className={`${CUSTOMERS_TABLE_CELL_CLASS} ${CUSTOMERS_PRICE_CLASS}`}>
      {formatTotalBookingsPrice(customer.totalBookingsPrice)}
    </td>
    <td className={CUSTOMERS_TABLE_CELL_CLASS}>
      <CustomersStatusBadge statusId={customer.statusId} />
    </td>
    <td className={CUSTOMERS_TABLE_ACTION_CELL_CLASS}>
      <CustomersRowActions
        customerId={customer.id}
        copy={copy}
        isOpen={isActionMenuOpen}
        onToggle={onToggleActionMenu}
        onClose={onCloseActionMenu}
        onSeeDetails={onSeeDetails}
        onStatusChange={onStatusChange}
      />
    </td>
  </tr>
);

export default CustomersTableRow;
