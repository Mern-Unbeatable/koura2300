import React, { memo } from 'react';
import { X } from 'lucide-react';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import { CLOSE_ICON_SIZE, ZIP_PANEL_IDS } from './serviceDetailsData';

const { zipPanel } = SERVICE_DETAILS_CONTENT;

const PANEL_CLASS = 'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm';
const HEADER_CLASS = 'flex items-center justify-between bg-gray-100 px-4 py-3';
const APPLY_BUTTON_CLASS =
  'h-10 shrink-0 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-brand-ink transition-colors hover:border-brand-orange hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange';
const INPUT_CLASS =
  'h-10 min-w-0 flex-1 rounded-md border border-gray-300 px-3 text-sm text-brand-ink focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange';

const ServiceZipPanel = memo(({ zipCode, zipError, onZipCodeChange, onClose, onSubmit }) => (
  <section className={PANEL_CLASS} aria-labelledby={ZIP_PANEL_IDS.TITLE}>
    <div className={HEADER_CLASS}>
      <h2 id={ZIP_PANEL_IDS.TITLE} className="text-sm font-bold text-brand-ink">
        {zipPanel.title}
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label={zipPanel.closeLabel}
        className="rounded-md p-1 text-brand-ink transition-colors hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
      >
        <X size={CLOSE_ICON_SIZE} aria-hidden="true" />
      </button>
    </div>
    <form onSubmit={onSubmit} className="px-4 py-5">
      <div className="relative mb-5 text-center text-sm text-gray-400">
        <span className="absolute inset-x-0 top-1/2 border-t border-gray-200" />
        <span className="relative bg-white px-3">{zipPanel.dividerLabel}</span>
      </div>
      <div className="flex min-w-0 items-center gap-3">
        <label htmlFor={ZIP_PANEL_IDS.FIELD} className="sr-only">
          {zipPanel.inputLabel}
        </label>
        <input
          id={ZIP_PANEL_IDS.FIELD}
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          value={zipCode}
          onChange={onZipCodeChange}
          placeholder={zipPanel.inputPlaceholder}
          aria-invalid={Boolean(zipError)}
          aria-describedby={zipError ? ZIP_PANEL_IDS.ERROR : undefined}
          className={INPUT_CLASS}
        />
        <button type="submit" className={APPLY_BUTTON_CLASS}>
          {zipPanel.apply}
        </button>
      </div>
      {zipError ? (
        <p id={ZIP_PANEL_IDS.ERROR} role="alert" className="mt-3 text-sm text-red-600">
          {zipError}
        </p>
      ) : null}
    </form>
  </section>
));

ServiceZipPanel.displayName = 'ServiceZipPanel';

export default ServiceZipPanel;
