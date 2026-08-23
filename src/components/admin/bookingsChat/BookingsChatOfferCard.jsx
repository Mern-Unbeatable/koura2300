import { Check, Package } from 'lucide-react';
import {
  BOOKINGS_CHAT_OFFER_CARD_CLASS,
  BOOKINGS_CHAT_OFFER_ICON_SIZE,
  BOOKINGS_CHAT_OFFER_ICON_WRAP_CLASS,
  BOOKINGS_CHAT_OFFER_PAY_BUTTON_CLASS,
  BOOKINGS_CHAT_OFFER_TABLE_CLASS,
  BOOKINGS_CHAT_OFFER_TABLE_WRAP_CLASS,
  BOOKINGS_CHAT_PAY_ICON_SIZE,
} from './bookingsChatData';

const BookingsChatOfferCard = ({ offer, copy, onPayNow }) => (
  <article className={BOOKINGS_CHAT_OFFER_CARD_CLASS} data-testid="bookings-chat-offer-card">
    <div className="flex flex-col gap-3 min-[426px]:flex-row min-[426px]:items-center min-[426px]:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className={BOOKINGS_CHAT_OFFER_ICON_WRAP_CLASS} aria-hidden="true">
          <Package size={BOOKINGS_CHAT_OFFER_ICON_SIZE} />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-7 text-[#101828] min-[376px]:text-lg">
            {copy.title}
          </h3>
          <p className="text-xs leading-4 text-[#4a5565]">{copy.status}</p>
        </div>
      </div>
      <div className="shrink-0 min-[426px]:text-left">
        <p className="text-sm leading-5 text-[#4a5565]">{copy.bookingIdLabel}</p>
        <p className="text-base font-bold leading-6 text-[#101828]">{offer.bookingId}</p>
      </div>
    </div>

    <div className={BOOKINGS_CHAT_OFFER_TABLE_WRAP_CLASS}>
      <table className={BOOKINGS_CHAT_OFFER_TABLE_CLASS}>
        <thead>
          <tr className="border-b border-[#f1f5f9] bg-white text-xs font-semibold text-[#383838]">
            <th className="px-3 py-3 text-left max-[425px]:px-2">{copy.itemColumn}</th>
            <th className="w-[22%] px-2 py-3 text-left max-[425px]:px-1.5">{copy.qtyColumn}</th>
            <th className="w-[18%] px-3 py-3 text-right max-[425px]:px-2">{copy.costColumn}</th>
          </tr>
        </thead>
        <tbody>
          {offer.lineItems.map((lineItem) => (
            <tr key={lineItem.id} className="border-b border-[#c4c4c4]">
              <td className="px-3 py-3 font-medium text-[#314158] max-[425px]:px-2">
                {lineItem.item}
              </td>
              <td className="px-2 py-3 whitespace-nowrap text-[#383838] max-[425px]:px-1.5">
                {lineItem.quantity}
              </td>
              <td className="px-3 py-3 text-right font-semibold text-[#0f172b] max-[425px]:px-2">
                {lineItem.costLabel}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-white">
            <td className="px-3 py-3.5 font-bold text-[#0f172b] max-[425px]:px-2" colSpan={2}>
              {copy.totalLabel}
            </td>
            <td className="px-3 py-3.5 text-right text-sm font-bold text-[#0f172b] max-[425px]:px-2 min-[376px]:text-base">
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
