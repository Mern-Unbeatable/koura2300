import {
  CUSTOMERS_EMPTY_ROW_CLASS,
  CUSTOMERS_TABLE_ACTION_HEAD_CELL_CLASS,
  CUSTOMERS_TABLE_CARD_CLASS,
  CUSTOMERS_TABLE_CLASS,
  CUSTOMERS_TABLE_COLUMN_COUNT,
  CUSTOMERS_TABLE_COLUMN_WIDTHS,
  CUSTOMERS_TABLE_HEAD_CELL_CLASS,
  CUSTOMERS_TABLE_HEAD_CLASS,
  CUSTOMERS_TABLE_SCROLL_CLASS,
} from './customersData';
import CustomersCards from './CustomersCards';
import CustomersPagination from './CustomersPagination';
import CustomersTableRow from './CustomersTableRow';
import useCustomersCompactLayout from './useCustomersCompactLayout';

const getHeadCellClass = (column, copy) =>
  column === copy.columns.action
    ? CUSTOMERS_TABLE_ACTION_HEAD_CELL_CLASS
    : CUSTOMERS_TABLE_HEAD_CELL_CLASS;

const CustomersTable = ({
  copy,
  customers,
  openActionMenuId,
  pagination,
  onToggleActionMenu,
  onCloseActionMenu,
  onSeeDetails,
  onStatusChange,
}) => {
  const isCompactLayout = useCustomersCompactLayout();

  return (
    <section
      className={CUSTOMERS_TABLE_CARD_CLASS}
      data-testid="customers-table-card"
      aria-label={copy.tableLabel}
    >
      {isCompactLayout ? (
        <CustomersCards
          copy={copy}
          customers={customers}
          openActionMenuId={openActionMenuId}
          onToggleActionMenu={onToggleActionMenu}
          onCloseActionMenu={onCloseActionMenu}
          onSeeDetails={onSeeDetails}
          onStatusChange={onStatusChange}
        />
      ) : (
        <div data-testid="customers-table-scroll" className={CUSTOMERS_TABLE_SCROLL_CLASS}>
          <table className={CUSTOMERS_TABLE_CLASS} aria-label={copy.tableLabel}>
            <colgroup>
              {CUSTOMERS_TABLE_COLUMN_WIDTHS.map((width, index) => (
                <col key={index} style={{ width }} />
              ))}
            </colgroup>
            <thead className={CUSTOMERS_TABLE_HEAD_CLASS}>
              <tr>
                {Object.values(copy.columns).map((column) => (
                  <th key={column} scope="col" className={getHeadCellClass(column, copy)}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={CUSTOMERS_TABLE_COLUMN_COUNT} className={CUSTOMERS_EMPTY_ROW_CLASS}>
                    {copy.emptyResults}
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <CustomersTableRow
                    key={customer.id}
                    customer={customer}
                    copy={copy}
                    isActionMenuOpen={openActionMenuId === customer.id}
                    onToggleActionMenu={onToggleActionMenu}
                    onCloseActionMenu={onCloseActionMenu}
                    onSeeDetails={onSeeDetails}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      <CustomersPagination copy={copy} {...pagination} />
    </section>
  );
};

export default CustomersTable;
