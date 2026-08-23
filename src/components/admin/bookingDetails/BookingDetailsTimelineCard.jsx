import { Check, ListOrdered } from 'lucide-react';
import BookingDetailsCard from './BookingDetailsCard';
import {
  BOOKING_DETAILS_TIMELINE_COMPLETE_DOT_CLASS,
  BOOKING_DETAILS_TIMELINE_COMPLETE_LINE_CLASS,
  BOOKING_DETAILS_TIMELINE_ICON_SIZE,
  BOOKING_DETAILS_TIMELINE_LIST_CLASS,
  BOOKING_DETAILS_TIMELINE_PENDING_DOT_CLASS,
  BOOKING_DETAILS_TIMELINE_PENDING_INNER_CLASS,
  BOOKING_DETAILS_TIMELINE_PENDING_LINE_CLASS,
  BOOKING_DETAILS_TIMELINE_STEP_CLASS,
} from './bookingDetailsData';

const TimelineStep = ({ step, isLast }) => {
  const isComplete = step.state === 'complete';

  return (
    <li className={BOOKING_DETAILS_TIMELINE_STEP_CLASS}>
      {!isLast ? (
        <span
          className={
            isComplete
              ? BOOKING_DETAILS_TIMELINE_COMPLETE_LINE_CLASS
              : BOOKING_DETAILS_TIMELINE_PENDING_LINE_CLASS
          }
          aria-hidden="true"
        />
      ) : null}
      <span
        className={
          isComplete
            ? BOOKING_DETAILS_TIMELINE_COMPLETE_DOT_CLASS
            : BOOKING_DETAILS_TIMELINE_PENDING_DOT_CLASS
        }
        aria-hidden="true"
      >
        {isComplete ? (
          <Check size={BOOKING_DETAILS_TIMELINE_ICON_SIZE} className="text-white" />
        ) : (
          <span className={BOOKING_DETAILS_TIMELINE_PENDING_INNER_CLASS} />
        )}
      </span>
      <div className="min-w-0 pt-0.5">
        <p
          className={
            isComplete
              ? 'text-sm font-semibold leading-5 text-[#0f172b]'
              : 'text-sm font-semibold leading-5 text-[#cad5e2]'
          }
        >
          {step.title}
        </p>
        {step.timestamp ? (
          <p className="pt-0.5 text-xs leading-4 text-[#90a1b9]">{step.timestamp}</p>
        ) : null}
        <p
          className={
            isComplete
              ? 'pt-1 text-xs leading-[19.5px] text-[#62748e]'
              : 'pt-1 text-xs leading-[19.5px] text-[#cad5e2]'
          }
        >
          {step.description}
        </p>
      </div>
    </li>
  );
};

const BookingDetailsTimelineCard = ({ copy, timeline }) => (
  <BookingDetailsCard title={copy.sections.orderTimeline} icon={ListOrdered}>
    <ol className={BOOKING_DETAILS_TIMELINE_LIST_CLASS}>
      {timeline.map((step, index) => (
        <TimelineStep key={step.id} step={step} isLast={index === timeline.length - 1} />
      ))}
    </ol>
  </BookingDetailsCard>
);

export default BookingDetailsTimelineCard;
