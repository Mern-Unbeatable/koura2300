import { CUSTOMERS_PAGE_CLASS } from './customersData';
import CustomersHeader from './CustomersHeader';
import CustomersTable from './CustomersTable';

const CustomersView = ({
  copy,
  customers,
  summarySubtitle,
  statusOptions,
  selectedStatusId,
  onStatusFilterChange,
  pagination,
  openActionMenuId,
  onToggleActionMenu,
  onCloseActionMenu,
  onSeeDetails,
  onStatusChange,
}) => (
  <div className={CUSTOMERS_PAGE_CLASS}>
    <CustomersHeader
      title={copy.title}
      summarySubtitle={summarySubtitle}
      statusOptions={statusOptions}
      selectedStatusId={selectedStatusId}
      statusFilterLabel={copy.statusFilterLabel}
      onStatusFilterChange={onStatusFilterChange}
    />
    <CustomersTable
      copy={copy}
      customers={customers}
      openActionMenuId={openActionMenuId}
      pagination={pagination}
      onToggleActionMenu={onToggleActionMenu}
      onCloseActionMenu={onCloseActionMenu}
      onSeeDetails={onSeeDetails}
      onStatusChange={onStatusChange}
    />
  </div>
);

export default CustomersView;
