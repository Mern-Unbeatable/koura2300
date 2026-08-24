import { suspendCustomer, validateSuspendReason } from '../customersSuspendUtils';
import { CUSTOMERS_SUSPEND_COPY } from '../customersSuspendCopy';
import { CUSTOMERS_SEED } from '../customersData';

describe('customersSuspendUtils', () => {
  it('requires a non-empty suspend reason', () => {
    expect(validateSuspendReason('')).toBe(CUSTOMERS_SUSPEND_COPY.errors.reasonRequired);
    expect(validateSuspendReason('   ')).toBe(CUSTOMERS_SUSPEND_COPY.errors.reasonRequired);
    expect(validateSuspendReason('Policy violation')).toBeNull();
  });

  it('suspends a customer immutably with a trimmed reason', () => {
    const updated = suspendCustomer(CUSTOMERS_SEED, 'CU-001', '  Abuse reports  ');

    expect(updated.find((customer) => customer.id === 'CU-001')).toMatchObject({
      statusId: 'suspend',
      suspendReason: 'Abuse reports',
    });
    expect(CUSTOMERS_SEED.find((customer) => customer.id === 'CU-001')?.statusId).toBe('active');
  });
});
