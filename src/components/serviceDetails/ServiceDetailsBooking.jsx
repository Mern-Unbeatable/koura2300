import React, { memo } from 'react';
import { Recycle } from 'lucide-react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import { RECYCLE_ICON_SIZE } from './serviceDetailsData';

const { booking } = SERVICE_DETAILS_CONTENT;

const TOGGLE_TRACK_CLASS = 'grid w-[362px] max-w-full grid-cols-2 rounded-full bg-gray-100 p-0.5';
const TOGGLE_BUTTON_BASE =
  'w-full rounded-full px-4 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
const TOGGLE_BUTTON_STYLES = {
  active: `${TOGGLE_BUTTON_BASE} bg-brand-orange text-white hover:bg-brand-orange-dark`,
  idle: `${TOGGLE_BUTTON_BASE} text-brand-ink hover:bg-gray-200`,
};

const RECYCLE_LABEL_CLASS =
  'group flex cursor-pointer items-center gap-3 text-sm font-semibold text-brand-ink';
const RECYCLE_CHECKBOX_CLASS =
  'size-5 rounded border-gray-300 text-brand-orange transition-colors hover:border-brand-orange hover:bg-brand-orange-light group-hover:border-brand-orange group-hover:bg-brand-orange-light focus:ring-brand-orange';
const RECYCLE_ICON_CLASS = 'text-brand-orange transition-colors group-hover:text-brand-orange-dark';
const CONFIRM_BUTTON_CLASS =
  'w-full rounded-2xl bg-brand-orange py-4 text-base font-bold text-white transition-all hover:bg-brand-orange-dark hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2';

const getToggleStyle = (isActive) =>
  isActive ? TOGGLE_BUTTON_STYLES.active : TOGGLE_BUTTON_STYLES.idle;

const MaterialsToggle = memo(({ needsMaterials, onNeedMaterials, onHaveMaterials }) => (
  <div className={TOGGLE_TRACK_CLASS}>
    <button
      type="button"
      aria-pressed={needsMaterials}
      onClick={onNeedMaterials}
      className={getToggleStyle(needsMaterials)}
    >
      {booking.needMaterials}
    </button>
    <button
      type="button"
      aria-pressed={!needsMaterials}
      onClick={onHaveMaterials}
      className={getToggleStyle(!needsMaterials)}
    >
      {booking.haveMaterials}
    </button>
  </div>
));

MaterialsToggle.displayName = 'MaterialsToggle';

const ServiceDetailsBooking = memo(
  ({
    needsMaterials,
    recycleOldMaterials,
    onNeedMaterials,
    onHaveMaterials,
    onToggleRecycle,
    onConfirmJob,
  }) => (
    <div className="mt-auto flex flex-col gap-4">
      <MaterialsToggle
        needsMaterials={needsMaterials}
        onNeedMaterials={onNeedMaterials}
        onHaveMaterials={onHaveMaterials}
      />
      <label className={RECYCLE_LABEL_CLASS}>
        <input
          type="checkbox"
          checked={recycleOldMaterials}
          onChange={onToggleRecycle}
          className={RECYCLE_CHECKBOX_CLASS}
        />
        <Recycle size={RECYCLE_ICON_SIZE} aria-hidden="true" className={RECYCLE_ICON_CLASS} />
        {booking.recycle}
      </label>
      <button type="button" onClick={onConfirmJob} className={CONFIRM_BUTTON_CLASS}>
        {booking.confirm}
      </button>
    </div>
  ),
);

ServiceDetailsBooking.displayName = 'ServiceDetailsBooking';

export default ServiceDetailsBooking;
