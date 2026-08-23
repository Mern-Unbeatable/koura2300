export const BOOKINGS_COPY = {
  title: 'Order Management',
  statusFilterLabel: 'Filter bookings by status',
  tableLabel: 'Bookings table',
  columns: {
    bookingId: 'Bookings ID',
    customer: 'Customer',
    serviceName: 'Service Name',
    serviceCategory: 'Service category',
    serviceCost: 'Service Cost',
    material: 'Material',
    status: 'Status',
    action: 'Action',
  },
  material: {
    required: 'Required',
    none: 'None',
  },
  actionMenu: {
    label: 'Booking actions',
    seeDetails: 'See Details',
    chatWithCustomer: 'Chat With Customer',
    statusHeading: 'Status',
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
  },
  emptyResults: 'No bookings found for this status.',
  toasts: {
    seeDetails: 'Opening booking details.',
    chatWithCustomer: 'Opening customer chat.',
    statusUpdated: 'Booking status updated.',
  },
};
