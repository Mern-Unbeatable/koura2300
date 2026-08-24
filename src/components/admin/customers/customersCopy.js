export const CUSTOMERS_COPY = {
  title: 'Customer Management',
  statusFilterLabel: 'Filter customers by status',
  tableLabel: 'Customers table',
  columns: {
    customerId: 'Customer ID',
    customer: 'Customer',
    phone: 'Phone Number',
    email: 'Email',
    totalBookingsPrice: 'Total Bookings Price',
    status: 'Status',
    action: 'Action',
  },
  actionMenu: {
    label: 'Customer actions',
    seeDetails: 'See Details',
    active: 'Active',
    suspend: 'Suspend',
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
  },
  emptyResults: 'No customers found for this status.',
  toasts: {
    seeDetails: 'Opening customer details.',
    statusUpdated: 'Customer status updated.',
  },
};
