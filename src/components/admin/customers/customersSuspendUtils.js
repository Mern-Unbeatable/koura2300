import { CUSTOMERS_SUSPEND_COPY } from './customersSuspendCopy';

export const validateSuspendReason = (reason) => {
  if (!String(reason ?? '').trim()) {
    return CUSTOMERS_SUSPEND_COPY.errors.reasonRequired;
  }

  return null;
};

export const suspendCustomer = (customers, customerId, reason) =>
  customers.map((customer) =>
    customer.id === customerId
      ? {
          ...customer,
          statusId: 'suspend',
          suspendReason: String(reason).trim(),
        }
      : customer,
  );
