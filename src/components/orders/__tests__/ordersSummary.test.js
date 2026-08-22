import {
  ORDER_ITEMS,
  ORDER_STATUS,
  buildOrderSummary,
  isUpcomingAppointment,
} from '../ordersData';

describe('buildOrderSummary', () => {
  const today = new Date('2026-08-20T12:00:00');

  it('counts Active Orders from the four active statuses', () => {
    const summary = buildOrderSummary(ORDER_ITEMS, today);

    expect(summary.active).toBe(4);
  });

  it('counts Upcoming Appt. only for active statuses with future appointments', () => {
    const summary = buildOrderSummary(ORDER_ITEMS, today);

    // Sep 05, Sep 05, Sep 10 — not Aug 18 (In Progress)
    expect(summary.upcoming).toBe(3);
  });

  it('counts Completed and Cancelled by status', () => {
    const summary = buildOrderSummary(ORDER_ITEMS, today);

    expect(summary.completed).toBe(1);
    expect(summary.cancelled).toBe(1);
    expect(summary.pendingPayment).toBe(1);
  });

  it('treats appointment after today as upcoming', () => {
    expect(isUpcomingAppointment('Aug 21, 2026', today)).toBe(true);
    expect(isUpcomingAppointment('Aug 20, 2026', today)).toBe(false);
    expect(isUpcomingAppointment('Aug 19, 2026', today)).toBe(false);
  });

  it('does not count completed or cancelled in active or upcoming', () => {
    const summary = buildOrderSummary(
      [
        {
          status: ORDER_STATUS.COMPLETED,
          appointment: 'Aug 30, 2026',
        },
        {
          status: ORDER_STATUS.CANCELLED,
          appointment: 'Aug 30, 2026',
        },
      ],
      today,
    );

    expect(summary.active).toBe(0);
    expect(summary.upcoming).toBe(0);
    expect(summary.completed).toBe(1);
    expect(summary.cancelled).toBe(1);
  });
});
