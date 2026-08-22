import React, { memo } from 'react';
import { Check, History } from 'lucide-react';
import OrderDetailsSection from './OrderDetailsSection';
import { ORDER_DETAILS_CONTENT } from './orderDetailsCopy';
import { ORDER_DETAILS_TIMELINE_ICON_SIZE } from './orderDetailsData';

const { sections } = ORDER_DETAILS_CONTENT;

const TimelineStep = memo(({ step, isLast }) => {
  const isComplete = step.state === 'complete';

  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast ? (
        <span
          className={`absolute left-[13px] top-7 h-[calc(100%-1.75rem)] w-px ${
            isComplete ? 'bg-[#ffd6a8]' : 'bg-[#e2e8f0]'
          }`}
          aria-hidden="true"
        />
      ) : null}
      <span
        className={`relative z-[1] flex size-7 shrink-0 items-center justify-center rounded-full ${
          isComplete ? 'bg-[#ff6900] text-white' : 'border-2 border-[#e2e8f0] bg-white'
        }`}
      >
        {isComplete ? (
          <Check size={ORDER_DETAILS_TIMELINE_ICON_SIZE} aria-hidden="true" />
        ) : (
          <span className="size-2 rounded-full bg-[#cbd5e1]" />
        )}
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-sm font-semibold text-[#0f172b]">{step.title}</p>
        {step.timestamp ? (
          <p className="mt-0.5 text-xs text-[#90a1b9]">{step.timestamp}</p>
        ) : null}
        {step.description ? (
          <p className="mt-1 text-xs leading-5 text-[#62748e]">{step.description}</p>
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
    icon={History}
    isOpen={isOpen}
    onToggle={onToggle}
  >
    <ol className="pl-1">
      {timeline.map((step, index) => (
        <TimelineStep key={step.id} step={step} isLast={index === timeline.length - 1} />
      ))}
    </ol>
  </OrderDetailsSection>
));

OrderDetailsTimeline.displayName = 'OrderDetailsTimeline';

export default OrderDetailsTimeline;
