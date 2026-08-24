export const filterCustomersByStatus = (customers, statusId) => {
  if (!statusId || statusId === 'all') {
    return customers;
  }

  return customers.filter((customer) => customer.statusId === statusId);
};

export const getTotalPages = (totalItems, pageSize) =>
  Math.max(1, Math.ceil(totalItems / pageSize));

export const paginateCustomers = (customers, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;

  return customers.slice(startIndex, startIndex + pageSize);
};

export const getCustomersSummary = (customers) => ({
  totalCustomers: customers.length,
  subtitle: `${customers.length} customers`,
});

export const getPaginationRangeLabel = (currentPage, pageSize, totalItems) => {
  if (totalItems === 0) {
    return 'Showing 0 to 0 of 0 results';
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return `Showing ${start} to ${end} of ${totalItems} results`;
};

export const formatTotalBookingsPrice = (amount) =>
  `$${amount.toLocaleString('en-US')}`;

export const updateCustomerStatus = (customers, customerId, statusId) =>
  customers.map((customer) =>
    customer.id === customerId ? { ...customer, statusId } : customer,
  );
