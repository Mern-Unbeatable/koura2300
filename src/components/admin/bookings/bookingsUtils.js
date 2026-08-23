export const filterBookingsByStatus = (bookings, statusId) => {
  if (!statusId || statusId === 'all') {
    return bookings;
  }

  return bookings.filter((booking) => booking.statusId === statusId);
};

export const getTotalPages = (totalItems, pageSize) =>
  Math.max(1, Math.ceil(totalItems / pageSize));

export const paginateBookings = (bookings, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;

  return bookings.slice(startIndex, startIndex + pageSize);
};

export const getAwaitingMaterialPaymentCount = (bookings) =>
  bookings.filter(
    (booking) => booking.statusId === 'new' && booking.material === 'required',
  ).length;

export const getBookingsSummary = (bookings) => {
  const awaitingMaterialPaymentCount = getAwaitingMaterialPaymentCount(bookings);

  return {
    totalOrders: bookings.length,
    awaitingMaterialPaymentCount,
    subtitle: `${bookings.length} orders · ${awaitingMaterialPaymentCount} awaiting material payment`,
  };
};

export const getPaginationRangeLabel = (currentPage, pageSize, totalItems) => {
  if (totalItems === 0) {
    return 'Showing 0 to 0 of 0 results';
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return `Showing ${start} to ${end} of ${totalItems} results`;
};

export const formatServiceCost = (amount) => `$${amount}`;

export const updateBookingStatus = (bookings, bookingId, statusId) =>
  bookings.map((booking) =>
    booking.id === bookingId ? { ...booking, statusId } : booking,
  );
