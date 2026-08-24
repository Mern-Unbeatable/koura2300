import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { CUSTOMERS_COPY } from '../components/admin/customers/customersCopy';
import {
  CUSTOMERS_PAGE_SIZE,
  CUSTOMERS_SEED,
  CUSTOMERS_STATUS_OPTIONS,
} from '../components/admin/customers/customersData';
import { getCustomerDetailsById } from '../components/admin/customers/customersDetailsUtils';
import { CUSTOMERS_SUSPEND_COPY } from '../components/admin/customers/customersSuspendCopy';
import { suspendCustomer } from '../components/admin/customers/customersSuspendUtils';
import {
  filterCustomersByStatus,
  getCustomersSummary,
  getPaginationRangeLabel,
  getTotalPages,
  paginateCustomers,
  updateCustomerStatus,
} from '../components/admin/customers/customersUtils';

const CUSTOMERS_STATUS_SUSPEND = 'suspend';

const useAdminCustomers = () => {
  const [customers, setCustomers] = useState(CUSTOMERS_SEED);
  const [selectedStatusId, setSelectedStatusId] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [detailsCustomerId, setDetailsCustomerId] = useState(null);
  const [suspendCustomerId, setSuspendCustomerId] = useState(null);

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
    setOpenActionMenuId(null);

    if (statusId === CUSTOMERS_STATUS_SUSPEND) {
      setSuspendCustomerId(customerId);
      return;
    }

    setCustomers((currentCustomers) =>
      updateCustomerStatus(currentCustomers, customerId, statusId),
    );
    toast.success(CUSTOMERS_COPY.toasts.statusUpdated);
  }, []);

  const handleCloseSuspend = useCallback(() => {
    setSuspendCustomerId(null);
  }, []);

  const handleConfirmSuspend = useCallback(
    (reason) => {
      setCustomers((currentCustomers) =>
        suspendCustomer(currentCustomers, suspendCustomerId, reason),
      );
      setSuspendCustomerId(null);
      toast.success(CUSTOMERS_SUSPEND_COPY.successToast);
    },
    [suspendCustomerId],
  );

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
    isSuspendModalOpen: Boolean(suspendCustomerId),
    onCloseSuspend: handleCloseSuspend,
    onConfirmSuspend: handleConfirmSuspend,
  };
};

export default useAdminCustomers;
