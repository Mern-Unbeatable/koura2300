import { CUSTOMERS_PAGE_CLASS } from './customersData';
import CustomersDetailsModal from './CustomersDetailsModal';
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
  onCloseDetails,
  customerDetails,
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
    {customerDetails ? (
      <CustomersDetailsModal details={customerDetails} onClose={onCloseDetails} />
    ) : null}
  </div>
);

export default CustomersView;
