import { BOOKINGS_SEED } from '../bookings/bookingsData';
import {
  BOOKING_DETAILS_CREATED_DATE,
  BOOKING_DETAILS_DEFAULT_CUSTOMER,
  BOOKING_DETAILS_DEFAULT_MATERIAL_ITEMS,
  BOOKING_DETAILS_DEFAULT_MATERIAL_TOTAL,
  BOOKING_DETAILS_DEFAULT_PAYMENT,
  BOOKING_DETAILS_DEFAULT_SERVICE,
  BOOKING_DETAILS_DEFAULT_SUMMARY,
  BOOKING_DETAILS_DEFAULT_TIMELINE,
} from './bookingDetailsData';

export const buildBookingDetailsTitle = (bookingId) => `Booking ${bookingId}`;

export const hasMaterialInformation = (bookingDetails) =>
  Boolean(bookingDetails?.materialRequired);

const buildMaterialFields = (material) => {
  const materialRequired = material === 'required';

  if (!materialRequired) {
    return {
      materialRequired: false,
      materialItems: [],
      materialTotal: null,
    };
  }

  return {
    materialRequired: true,
    materialItems: BOOKING_DETAILS_DEFAULT_MATERIAL_ITEMS,
    materialTotal: BOOKING_DETAILS_DEFAULT_MATERIAL_TOTAL,
  };
};

export const buildBookingDetails = (booking) => {
  if (!booking) {
    return null;
  }

  return {
    id: booking.id,
    title: buildBookingDetailsTitle(booking.id),
    createdDate: BOOKING_DETAILS_CREATED_DATE,
    customerName: booking.customer,
    serviceName: booking.serviceName,
    serviceCategory: booking.serviceCategory,
    serviceCost: booking.serviceCost,
    statusId: booking.statusId,
    summary: {
      ...BOOKING_DETAILS_DEFAULT_SUMMARY,
      category: booking.serviceCategory,
    },
    customer: {
      ...BOOKING_DETAILS_DEFAULT_CUSTOMER,
      name: booking.customer,
    },
    service: {
      ...BOOKING_DETAILS_DEFAULT_SERVICE,
      title: booking.serviceName,
      startingPrice: `$${booking.serviceCost}`,
    },
    payment: {
      ...BOOKING_DETAILS_DEFAULT_PAYMENT,
      bookingPrice: `$${booking.serviceCost}`,
    },
    timeline: BOOKING_DETAILS_DEFAULT_TIMELINE,
    ...buildMaterialFields(booking.material),
  };
};

export const getBookingDetailsById = (bookingId, bookings = BOOKINGS_SEED) => {
  const booking = bookings.find((item) => item.id === bookingId);

  return buildBookingDetails(booking);
};
