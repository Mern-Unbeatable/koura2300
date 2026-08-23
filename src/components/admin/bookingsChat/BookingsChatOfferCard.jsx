import { Check, Package } from 'lucide-react';
import {
  BOOKINGS_CHAT_OFFER_BOOKING_ID_CLASS,
  BOOKINGS_CHAT_OFFER_BOOKING_LABEL_CLASS,
  BOOKINGS_CHAT_OFFER_CARD_CLASS,
  BOOKINGS_CHAT_OFFER_ICON_SIZE,
  BOOKINGS_CHAT_OFFER_ICON_WRAP_CLASS,
  BOOKINGS_CHAT_OFFER_PAY_BUTTON_CLASS,
  BOOKINGS_CHAT_OFFER_STATUS_CLASS,
  BOOKINGS_CHAT_OFFER_TABLE_CLASS,
  BOOKINGS_CHAT_OFFER_TABLE_WRAP_CLASS,
  BOOKINGS_CHAT_OFFER_TITLE_CLASS,
  BOOKINGS_CHAT_PAY_ICON_SIZE,
} from './bookingsChatData';

const BookingsChatOfferCard = ({ offer, copy, onPayNow }) => (
  <article className={BOOKINGS_CHAT_OFFER_CARD_CLASS} data-testid="bookings-chat-offer-card">
    <div className="flex flex-col gap-2.5 min-[426px]:flex-row min-[426px]:items-center min-[426px]:justify-between min-[426px]:gap-3">
      <div className="flex min-w-0 items-center gap-2.5 min-[376px]:gap-3">
        <span className={BOOKINGS_CHAT_OFFER_ICON_WRAP_CLASS} aria-hidden="true">
          <Package size={BOOKINGS_CHAT_OFFER_ICON_SIZE} />
        </span>
        <div className="min-w-0">
          <h3 className={BOOKINGS_CHAT_OFFER_TITLE_CLASS}>{copy.title}</h3>
          <p className={BOOKINGS_CHAT_OFFER_STATUS_CLASS}>{copy.status}</p>
        </div>
      </div>
      <div className="shrink-0 min-[426px]:text-left">
        <p className={BOOKINGS_CHAT_OFFER_BOOKING_LABEL_CLASS}>{copy.bookingIdLabel}</p>
        <p className={BOOKINGS_CHAT_OFFER_BOOKING_ID_CLASS}>{offer.bookingId}</p>
      </div>
    </div>

    <div className={BOOKINGS_CHAT_OFFER_TABLE_WRAP_CLASS}>
      <table className={BOOKINGS_CHAT_OFFER_TABLE_CLASS}>
        <thead>
          <tr className="border-b border-[#f1f5f9] bg-white text-[11px] font-semibold text-[#383838] min-[376px]:text-xs">
            <th className="px-2 py-2.5 text-left min-[376px]:px-3 min-[376px]:py-3">{copy.itemColumn}</th>
            <th className="w-[22%] px-1.5 py-2.5 text-left min-[376px]:px-2 min-[376px]:py-3">
              {copy.qtyColumn}
            </th>
            <th className="w-[18%] px-2 py-2.5 text-right min-[376px]:px-3 min-[376px]:py-3">
              {copy.costColumn}
            </th>
          </tr>
        </thead>
        <tbody>
          {offer.lineItems.map((lineItem) => (
            <tr key={lineItem.id} className="border-b border-[#c4c4c4]">
              <td className="px-2 py-2.5 font-medium text-[#314158] min-[376px]:px-3 min-[376px]:py-3">
                {lineItem.item}
              </td>
              <td className="px-1.5 py-2.5 whitespace-nowrap text-[#383838] min-[376px]:px-2 min-[376px]:py-3">
                {lineItem.quantity}
              </td>
              <td className="px-2 py-2.5 text-right font-semibold text-[#0f172b] min-[376px]:px-3 min-[376px]:py-3">
                {lineItem.costLabel}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-white">
            <td
              className="px-2 py-3 font-bold text-[#0f172b] min-[376px]:px-3 min-[376px]:py-3.5"
              colSpan={2}
            >
              {copy.totalLabel}
            </td>
            <td className="px-2 py-3 text-right text-sm font-bold text-[#0f172b] min-[376px]:px-3 min-[376px]:py-3.5 min-[376px]:text-base">
              {offer.totalLabel}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <button type="button" onClick={onPayNow} className={BOOKINGS_CHAT_OFFER_PAY_BUTTON_CLASS}>
      <Check size={BOOKINGS_CHAT_PAY_ICON_SIZE} aria-hidden="true" />
      {copy.payNow}
    </button>
  </article>
);

export default BookingsChatOfferCard;
