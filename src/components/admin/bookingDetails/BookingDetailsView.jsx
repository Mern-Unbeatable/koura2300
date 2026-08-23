import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config';
import BookingDetailsCustomerCard from './BookingDetailsCustomerCard';
import BookingDetailsHeader from './BookingDetailsHeader';
import BookingDetailsMaterialsCard from './BookingDetailsMaterialsCard';
import BookingDetailsPaymentCard from './BookingDetailsPaymentCard';
import BookingDetailsServiceCard from './BookingDetailsServiceCard';
import BookingDetailsSummaryCard from './BookingDetailsSummaryCard';
import BookingDetailsTimelineCard from './BookingDetailsTimelineCard';
import {
  BOOKING_DETAILS_NOT_FOUND_CLASS,
  BOOKING_DETAILS_PAGE_CLASS,
  BOOKING_DETAILS_STACK_CLASS,
  BOOKING_DETAILS_TOP_GRID_CLASS,
} from './bookingDetailsData';
import { hasMaterialInformation } from './bookingDetailsUtils';

const BookingDetailsNotFound = ({ copy }) => (
  <div className={BOOKING_DETAILS_NOT_FOUND_CLASS}>
    <h1 className="text-2xl font-bold text-[#0f172b]">{copy.notFound.title}</h1>
    <p className="mt-2 text-sm text-[#62748e]">{copy.notFound.description}</p>
    <Link
      to={ROUTES.ADMIN_BOOKINGS}
      className="mt-6 inline-flex rounded-xl bg-[#0f172b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e293b] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
    >
      {copy.notFound.backLabel}
    </Link>
  </div>
);

const BookingDetailsView = ({ copy, booking, onChatWithCustomer }) => {
  if (!booking) {
    return <BookingDetailsNotFound copy={copy} />;
  }

  return (
    <div className={BOOKING_DETAILS_PAGE_CLASS}>
      <BookingDetailsHeader
        copy={copy}
        booking={booking}
        onChatWithCustomer={onChatWithCustomer}
      />

      <div data-testid="booking-details-top-grid" className={BOOKING_DETAILS_TOP_GRID_CLASS}>
        <BookingDetailsSummaryCard copy={copy} summary={booking.summary} />
        <BookingDetailsCustomerCard copy={copy} customer={booking.customer} />
      </div>

      <div className={BOOKING_DETAILS_STACK_CLASS}>
        <BookingDetailsServiceCard copy={copy} service={booking.service} />
        {hasMaterialInformation(booking) ? (
          <BookingDetailsMaterialsCard copy={copy} booking={booking} />
        ) : null}
        <BookingDetailsPaymentCard copy={copy} payment={booking.payment} />
        <BookingDetailsTimelineCard copy={copy} timeline={booking.timeline} />
      </div>
    </div>
  );
};

export default BookingDetailsView;
