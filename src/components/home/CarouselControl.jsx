import React, { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CHEVRON_SIZE = 24;

const BASE_CLASS =
  'absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg ring-2 ring-white transition hover:bg-brand-orange-dark focus:outline-none focus:ring-4 focus:ring-brand-orange-light disabled:cursor-not-allowed disabled:opacity-50';

const PLACEMENT_CLASS = {
  previous: 'left-2',
  next: 'right-2',
};

const CarouselControl = memo(({ direction, label, disabled, onClick }) => {
  const Icon = direction === 'previous' ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`${BASE_CLASS} ${PLACEMENT_CLASS[direction]}`}
    >
      <Icon size={CHEVRON_SIZE} aria-hidden="true" />
    </button>
  );
});

CarouselControl.displayName = 'CarouselControl';

export default CarouselControl;
