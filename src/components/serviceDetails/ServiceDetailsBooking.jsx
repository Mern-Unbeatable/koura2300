import React, { memo } from 'react';
import { Recycle } from 'lucide-react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import { RECYCLE_ICON_SIZE } from './serviceDetailsData';

const { booking } = SERVICE_DETAILS_CONTENT;

const TOGGLE_BUTTON_BASE =
  'rounded-lg px-5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
const TOGGLE_BUTTON_STYLES = {
  active: `${TOGGLE_BUTTON_BASE} bg-brand-orange text-white`,
  idle: `${TOGGLE_BUTTON_BASE} text-gray-600`,
};

const MaterialsToggle = memo(({ needsMaterials, onNeedMaterials, onHaveMaterials }) => (
  <div className="inline-flex rounded-xl bg-gray-100 p-0.5">
    <button
      type="button"
      aria-pressed={needsMaterials}
      onClick={onNeedMaterials}
      className={needsMaterials ? TOGGLE_BUTTON_STYLES.active : TOGGLE_BUTTON_STYLES.idle}
    >
      {booking.needMaterials}
    </button>
    <button
      type="button"
      aria-pressed={!needsMaterials}
      onClick={onHaveMaterials}
      className={needsMaterials ? TOGGLE_BUTTON_STYLES.idle : TOGGLE_BUTTON_STYLES.active}
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
    <div className="flex flex-col gap-6">
      <MaterialsToggle
        needsMaterials={needsMaterials}
        onNeedMaterials={onNeedMaterials}
        onHaveMaterials={onHaveMaterials}
      />
      <label className="flex cursor-pointer items-center gap-3 text-sm text-brand-ink">
        <input
          type="checkbox"
          checked={recycleOldMaterials}
          onChange={onToggleRecycle}
          className="size-5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
        />
        <Recycle size={RECYCLE_ICON_SIZE} aria-hidden="true" className="text-gray-500" />
        {booking.recycle}
      </label>
      <button
        type="button"
        onClick={onConfirmJob}
        className="w-full rounded-lg bg-brand-orange py-4 text-base font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
      >
        {booking.confirm}
      </button>
    </div>
  ),
);

ServiceDetailsBooking.displayName = 'ServiceDetailsBooking';

export default ServiceDetailsBooking;
