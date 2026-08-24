import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { CUSTOMERS_COPY } from '../components/admin/customers/customersCopy';
import {
  CUSTOMERS_PAGE_SIZE,
  CUSTOMERS_SEED,
  CUSTOMERS_STATUS_OPTIONS,
} from '../components/admin/customers/customersData';
import { getCustomerDetailsById } from '../components/admin/customers/customersDetailsUtils';
import {
  filterCustomersByStatus,
  getCustomersSummary,
  getPaginationRangeLabel,
  getTotalPages,
  paginateCustomers,
  updateCustomerStatus,
} from '../components/admin/customers/customersUtils';

const useAdminCustomers = () => {
  const [customers, setCustomers] = useState(CUSTOMERS_SEED);
  const [selectedStatusId, setSelectedStatusId] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [detailsCustomerId, setDetailsCustomerId] = useState(null);

  const filteredCustomers = useMemo(
    () => filterCustomersByStatus(customers, selectedStatusId),
    [customers, selectedStatusId],
  );

  const totalPages = useMemo(
    () => getTotalPages(filteredCustomers.length, CUSTOMERS_PAGE_SIZE),
    [filteredCustomers.length],
  );

  const paginatedCustomers = useMemo(
    () => paginateCustomers(filteredCustomers, currentPage, CUSTOMERS_PAGE_SIZE),
    [filteredCustomers, currentPage],
  );

  const summarySubtitle = useMemo(
    () => getCustomersSummary(customers).subtitle,
    [customers],
  );

  const customerDetails = useMemo(
    () => getCustomerDetailsById(detailsCustomerId, customers),
    [customers, detailsCustomerId],
  );

  const pagination = useMemo(
    () => ({
      rangeLabel: getPaginationRangeLabel(
        currentPage,
        CUSTOMERS_PAGE_SIZE,
        filteredCustomers.length,
      ),
      canGoPrevious: currentPage > 1,
      canGoNext: currentPage < totalPages,
      onPrevious: () => setCurrentPage((page) => Math.max(1, page - 1)),
      onNext: () => setCurrentPage((page) => Math.min(totalPages, page + 1)),
    }),
    [currentPage, filteredCustomers.length, totalPages],
  );

  const handleStatusFilterChange = useCallback((event) => {
    setSelectedStatusId(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleToggleActionMenu = useCallback((customerId) => {
    setOpenActionMenuId((currentId) => (currentId === customerId ? null : customerId));
  }, []);

  const handleCloseActionMenu = useCallback(() => {
    setOpenActionMenuId(null);
  }, []);

  const handleSeeDetails = useCallback((customerId) => {
    setOpenActionMenuId(null);
    setDetailsCustomerId(customerId);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setDetailsCustomerId(null);
  }, []);

  const handleStatusChange = useCallback((customerId, statusId) => {
    setCustomers((currentCustomers) =>
      updateCustomerStatus(currentCustomers, customerId, statusId),
    );
    setOpenActionMenuId(null);
    toast.success(CUSTOMERS_COPY.toasts.statusUpdated);
  }, []);

  return {
    copy: CUSTOMERS_COPY,
    customers: paginatedCustomers,
    summarySubtitle,
    statusOptions: CUSTOMERS_STATUS_OPTIONS,
    selectedStatusId,
    onStatusFilterChange: handleStatusFilterChange,
    pagination,
    openActionMenuId,
    onToggleActionMenu: handleToggleActionMenu,
    onCloseActionMenu: handleCloseActionMenu,
    onSeeDetails: handleSeeDetails,
    onCloseDetails: handleCloseDetails,
    customerDetails,
    onStatusChange: handleStatusChange,
  };
};

export default useAdminCustomers;
