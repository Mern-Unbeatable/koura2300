import { CreditCard } from 'lucide-react';
import BookingDetailsCard from './BookingDetailsCard';
import {
  BOOKING_DETAILS_META_LABEL_CLASS,
  BOOKING_DETAILS_META_VALUE_CLASS,
  BOOKING_DETAILS_PAYMENT_ROW_CLASS,
} from './bookingDetailsData';

const BookingDetailsPaymentCard = ({ copy, payment }) => (
  <BookingDetailsCard
    title={copy.sections.bookingPayment}
    icon={CreditCard}
    badge={payment.badge}
  >
    <div className={BOOKING_DETAILS_PAYMENT_ROW_CLASS}>
      <div>
        <p className={BOOKING_DETAILS_META_LABEL_CLASS}>{copy.labels.bookingPrice}</p>
        <p className={BOOKING_DETAILS_META_VALUE_CLASS}>
          <span className="text-base font-bold">{payment.bookingPrice}</span>{' '}
          <span className="font-medium text-[#62748e]">{copy.labels.startingFrom}</span>
        </p>
      </div>
      <div className="min-[426px]:text-right">
        <p className={BOOKING_DETAILS_META_LABEL_CLASS}>{copy.labels.paymentStatus}</p>
        <p className={`${BOOKING_DETAILS_META_VALUE_CLASS} text-[#f54900]`}>
          {payment.paymentStatus}
        </p>
      </div>
    </div>
  </BookingDetailsCard>
);

export default BookingDetailsPaymentCard;
