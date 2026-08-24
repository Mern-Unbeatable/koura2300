import { CUSTOMERS_CARDS_CLASS, CUSTOMERS_CARDS_EMPTY_CLASS } from './customersData';
import CustomersCard from './CustomersCard';

const CustomersCards = ({
  copy,
  customers,
  openActionMenuId,
  onToggleActionMenu,
  onCloseActionMenu,
  onSeeDetails,
  onStatusChange,
}) => {
  if (customers.length === 0) {
    return (
      <p data-testid="customers-cards" className={CUSTOMERS_CARDS_EMPTY_CLASS}>
        {copy.emptyResults}
      </p>
    );
  }

  return (
    <div data-testid="customers-cards" className={CUSTOMERS_CARDS_CLASS}>
      {customers.map((customer) => (
        <CustomersCard
          key={customer.id}
          customer={customer}
          copy={copy}
          isActionMenuOpen={openActionMenuId === customer.id}
          onToggleActionMenu={onToggleActionMenu}
          onCloseActionMenu={onCloseActionMenu}
          onSeeDetails={onSeeDetails}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default CustomersCards;
