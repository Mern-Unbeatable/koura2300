import {
  BOOKING_DETAILS_META_HIGHLIGHT_CLASS,
  BOOKING_DETAILS_META_ITEM_LEFT_CLASS,
  BOOKING_DETAILS_META_ITEM_RIGHT_CLASS,
  BOOKING_DETAILS_META_LABEL_CLASS,
  BOOKING_DETAILS_META_ROW_CLASS,
  BOOKING_DETAILS_META_STACK_CLASS,
  BOOKING_DETAILS_META_VALUE_CLASS,
} from './bookingDetailsData';

const MetaItem = ({ label, value, highlight = false, align = 'left' }) => (
  <div
    className={
      align === 'right'
        ? BOOKING_DETAILS_META_ITEM_RIGHT_CLASS
        : BOOKING_DETAILS_META_ITEM_LEFT_CLASS
    }
  >
    <p className={BOOKING_DETAILS_META_LABEL_CLASS}>{label}</p>
    <p className={highlight ? BOOKING_DETAILS_META_HIGHLIGHT_CLASS : BOOKING_DETAILS_META_VALUE_CLASS}>
      {value}
    </p>
  </div>
);

const BookingDetailsMetaPairs = ({ pairs }) => (
  <div className={BOOKING_DETAILS_META_STACK_CLASS}>
    {pairs.map((pair) => (
      <div
        key={`${pair.left.label}-${pair.right?.label ?? 'solo'}`}
        className={BOOKING_DETAILS_META_ROW_CLASS}
      >
        <MetaItem {...pair.left} align="left" />
        {pair.right ? <MetaItem {...pair.right} align="right" /> : null}
      </div>
    ))}
  </div>
);

export default BookingDetailsMetaPairs;
