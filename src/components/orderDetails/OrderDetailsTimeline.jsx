import React, { memo } from 'react';
import OrderDetailsSection from './OrderDetailsSection';
import { ORDER_DETAILS_CONTENT } from './orderDetailsCopy';
import {
  ORDER_DETAILS_TIMELINE_CHECK_ICON,
  ORDER_DETAILS_TIMELINE_COMPLETE_DESCRIPTION_CLASS,
  ORDER_DETAILS_TIMELINE_COMPLETE_DOT_CLASS,
  ORDER_DETAILS_TIMELINE_COMPLETE_LINE_CLASS,
  ORDER_DETAILS_TIMELINE_COMPLETE_TIMESTAMP_CLASS,
  ORDER_DETAILS_TIMELINE_COMPLETE_TITLE_CLASS,
  ORDER_DETAILS_TIMELINE_HEADER_ICON,
  ORDER_DETAILS_TIMELINE_ICON_SIZE,
  ORDER_DETAILS_TIMELINE_LIST_CLASS,
  ORDER_DETAILS_TIMELINE_PENDING_DESCRIPTION_CLASS,
  ORDER_DETAILS_TIMELINE_PENDING_DOT_CLASS,
  ORDER_DETAILS_TIMELINE_PENDING_INNER_DOT_CLASS,
  ORDER_DETAILS_TIMELINE_PENDING_LINE_CLASS,
  ORDER_DETAILS_TIMELINE_PENDING_TEXT_CLASS,
  ORDER_DETAILS_TIMELINE_STEP_CLASS,
} from './orderDetailsData';

const { sections } = ORDER_DETAILS_CONTENT;

const TimelineStep = memo(({ step, isLast }) => {
  const isComplete = step.state === 'complete';

  return (
    <li className={ORDER_DETAILS_TIMELINE_STEP_CLASS}>
      {!isLast ? (
        <span
          className={
            isComplete
              ? ORDER_DETAILS_TIMELINE_COMPLETE_LINE_CLASS
              : ORDER_DETAILS_TIMELINE_PENDING_LINE_CLASS
          }
          aria-hidden="true"
        />
      ) : null}
      <span
        className={
          isComplete
            ? ORDER_DETAILS_TIMELINE_COMPLETE_DOT_CLASS
            : ORDER_DETAILS_TIMELINE_PENDING_DOT_CLASS
        }
      >
        {isComplete ? (
          <img
            src={ORDER_DETAILS_TIMELINE_CHECK_ICON}
            alt=""
            width={ORDER_DETAILS_TIMELINE_ICON_SIZE}
            height={ORDER_DETAILS_TIMELINE_ICON_SIZE}
            aria-hidden="true"
          />
        ) : (
          <span className={ORDER_DETAILS_TIMELINE_PENDING_INNER_DOT_CLASS} aria-hidden="true" />
        )}
      </span>
      <div className="min-w-0 pt-0.5">
        <p
          className={
            isComplete
              ? ORDER_DETAILS_TIMELINE_COMPLETE_TITLE_CLASS
              : ORDER_DETAILS_TIMELINE_PENDING_TEXT_CLASS
          }
        >
          {step.title}
        </p>
        {step.timestamp ? (
          <p className={ORDER_DETAILS_TIMELINE_COMPLETE_TIMESTAMP_CLASS}>{step.timestamp}</p>
        ) : null}
        {step.description ? (
          <p
            className={
              isComplete
                ? ORDER_DETAILS_TIMELINE_COMPLETE_DESCRIPTION_CLASS
                : ORDER_DETAILS_TIMELINE_PENDING_DESCRIPTION_CLASS
            }
          >
            {step.description}
          </p>
        ) : null}
      </div>
    </li>
  );
});

TimelineStep.displayName = 'TimelineStep';

const OrderDetailsTimeline = memo(({ timeline, isOpen, sectionId, onToggle }) => (
  <OrderDetailsSection
    id={sectionId}
    title={sections.timeline}
    iconSrc={ORDER_DETAILS_TIMELINE_HEADER_ICON}
    isOpen={isOpen}
    onToggle={onToggle}
  >
    <ol className={ORDER_DETAILS_TIMELINE_LIST_CLASS}>
      {timeline.map((step, index) => (
        <TimelineStep key={step.id} step={step} isLast={index === timeline.length - 1} />
      ))}
    </ol>
  </OrderDetailsSection>
));

OrderDetailsTimeline.displayName = 'OrderDetailsTimeline';

export default OrderDetailsTimeline;
