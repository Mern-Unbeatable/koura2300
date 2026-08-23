import { Package } from 'lucide-react';
import BookingDetailsCard from './BookingDetailsCard';
import {
  BOOKING_DETAILS_MATERIALS_CELL_CLASS,
  BOOKING_DETAILS_MATERIALS_HEAD_CLASS,
  BOOKING_DETAILS_MATERIALS_TABLE_CLASS,
  BOOKING_DETAILS_MATERIALS_TABLE_WRAP_CLASS,
  BOOKING_DETAILS_MATERIALS_YES_CLASS,
} from './bookingDetailsData';

const BookingDetailsMaterialsCard = ({ copy, booking }) => (
  <BookingDetailsCard
    title={copy.sections.materialInformation}
    icon={Package}
    badge={copy.badges.paymentRequired}
    testId="booking-details-materials"
  >
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-sm text-[#90a1b9]">{copy.labels.materialRequired}</p>
      <span className={BOOKING_DETAILS_MATERIALS_YES_CLASS}>{copy.labels.yes}</span>
    </div>

    <div className={BOOKING_DETAILS_MATERIALS_TABLE_WRAP_CLASS}>
      <table className={BOOKING_DETAILS_MATERIALS_TABLE_CLASS}>
        <thead className={BOOKING_DETAILS_MATERIALS_HEAD_CLASS}>
          <tr className="border-b border-[#f1f5f9]">
            <th className={BOOKING_DETAILS_MATERIALS_CELL_CLASS}>{copy.labels.item}</th>
            <th className={BOOKING_DETAILS_MATERIALS_CELL_CLASS}>{copy.labels.qty}</th>
            <th className={`${BOOKING_DETAILS_MATERIALS_CELL_CLASS} text-right`}>
              {copy.labels.cost}
            </th>
          </tr>
        </thead>
        <tbody>
          {booking.materialItems.map((item) => (
            <tr key={item.id} className="border-b border-[#f8fafc]">
              <td className={`${BOOKING_DETAILS_MATERIALS_CELL_CLASS} font-medium text-[#314158]`}>
                {item.name}
              </td>
              <td className={`${BOOKING_DETAILS_MATERIALS_CELL_CLASS} text-[#90a1b9]`}>{item.qty}</td>
              <td
                className={`${BOOKING_DETAILS_MATERIALS_CELL_CLASS} text-right font-semibold text-[#0f172b]`}
              >
                {item.cost}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-[#f8fafc]">
            <td
              className={`${BOOKING_DETAILS_MATERIALS_CELL_CLASS} font-bold text-[#0f172b]`}
              colSpan={2}
            >
              {copy.labels.total}
            </td>
            <td
              className={`${BOOKING_DETAILS_MATERIALS_CELL_CLASS} text-right text-base font-bold text-[#0f172b] max-[425px]:text-sm`}
            >
              {booking.materialTotal}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </BookingDetailsCard>
);

export default BookingDetailsMaterialsCard;
