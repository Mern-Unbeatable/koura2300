import { CUSTOMERS_SEED } from './customersData';
import { formatTotalBookingsPrice } from './customersUtils';
import { CUSTOMERS_DETAILS_DEFAULT_ADDRESS } from './customersDetailsData';

export const getCustomerInitials = (name) => {
  if (!name?.trim()) {
    return '';
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

export const buildCustomerDetails = (customer) => {
  if (!customer) {
    return null;
  }

  return {
    id: customer.id,
    name: customer.name,
    initials: getCustomerInitials(customer.name),
    statusId: customer.statusId,
    email: customer.email,
    phone: customer.phone,
    address: customer.address ?? CUSTOMERS_DETAILS_DEFAULT_ADDRESS,
    bookingsCount: customer.bookingsCount ?? 0,
    revenueLabel: formatTotalBookingsPrice(customer.totalBookingsPrice),
  };
};

export const getCustomerDetailsById = (customerId, customers = CUSTOMERS_SEED) => {
  const customer = customers.find((item) => item.id === customerId);

  return buildCustomerDetails(customer);
};
