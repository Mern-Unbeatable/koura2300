import { BOOKINGS_COPY } from '../bookings/bookingsCopy';
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
import {
  formatOfferPriceLabel,
  parseOfferPrice,
} from '../bookingsChat/bookingsCreateOfferUtils';

export const PREFERRED_CONTACT_CHAT = 'chat';
export const PREFERRED_CONTACT_PHONE = 'phone';
export const PREFERRED_CONTACT_EMAIL = 'email';
export const PREFERRED_CONTACT_NA = 'na';

export const buildBookingDetailsTitle = (bookingId) => `Booking ${bookingId}`;

export const hasMaterialInformation = (bookingDetails) =>
  Boolean(bookingDetails?.materialRequired);

export const canAddBookingMaterial = (bookingDetails) =>
  Boolean(bookingDetails?.canAddMaterial);

export const formatPreferredContactLabel = (preferredContact) =>
  BOOKINGS_COPY.preferredContact[preferredContact] ?? BOOKINGS_COPY.preferredContact.na;

export const shouldAllowAddMaterial = (material, preferredContact) =>
  material === 'required' &&
  (preferredContact === PREFERRED_CONTACT_PHONE || preferredContact === PREFERRED_CONTACT_EMAIL);

export const shouldShowChatWithCustomer = (preferredContact) =>
  preferredContact === PREFERRED_CONTACT_CHAT;

export const sumMaterialItemsTotal = (materialItems) => {
  const totalAmount = materialItems.reduce((sum, item) => {
    const amount = parseOfferPrice(item.cost) ?? 0;
    return sum + amount;
  }, 0);

  return formatOfferPriceLabel(totalAmount);
};

export const mergeMaterialItems = (currentItems, nextItems) => {
  const materialItems = [...currentItems, ...nextItems];

  return {
    materialItems,
    materialTotal: sumMaterialItemsTotal(materialItems),
  };
};

export const buildMaterialItemsFromProducts = (products) => {
  const materialItems = products.map((product) => {
    const amount = parseOfferPrice(product.price) ?? 0;

    return {
      id: product.id,
      name: product.productName.trim(),
      qty: product.quantity.trim(),
      cost: formatOfferPriceLabel(amount),
    };
  });

  return {
    materialItems,
    materialTotal: sumMaterialItemsTotal(materialItems),
  };
};

const buildMaterialFields = (booking) => {
  if (booking.material !== 'required') {
    return {
      materialRequired: false,
      materialItems: [],
      materialTotal: null,
      canAddMaterial: false,
    };
  }

  if (shouldAllowAddMaterial(booking.material, booking.preferredContact)) {
    return {
      materialRequired: true,
      materialItems: [],
      materialTotal: null,
      canAddMaterial: true,
    };
  }

  return {
    materialRequired: true,
    materialItems: BOOKING_DETAILS_DEFAULT_MATERIAL_ITEMS,
    materialTotal: BOOKING_DETAILS_DEFAULT_MATERIAL_TOTAL,
    canAddMaterial: false,
  };
};

export const buildBookingDetails = (booking) => {
  if (!booking) {
    return null;
  }

  const preferredContact = booking.material === 'none' ? PREFERRED_CONTACT_NA : booking.preferredContact;

  return {
    id: booking.id,
    title: buildBookingDetailsTitle(booking.id),
    createdDate: BOOKING_DETAILS_CREATED_DATE,
    customerName: booking.customer,
    serviceName: booking.serviceName,
    serviceCategory: booking.serviceCategory,
    serviceCost: booking.serviceCost,
    statusId: booking.statusId,
    preferredContact,
    summary: {
      ...BOOKING_DETAILS_DEFAULT_SUMMARY,
      category: booking.serviceCategory,
    },
    customer: {
      ...BOOKING_DETAILS_DEFAULT_CUSTOMER,
      name: booking.customer,
      preferredContact: formatPreferredContactLabel(preferredContact),
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
    ...buildMaterialFields({ ...booking, preferredContact }),
  };
};

export const getBookingDetailsById = (bookingId, bookings = BOOKINGS_SEED) => {
  const booking = bookings.find((item) => item.id === bookingId);

  return buildBookingDetails(booking);
};
