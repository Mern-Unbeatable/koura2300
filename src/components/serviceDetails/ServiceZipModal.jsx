import React, { memo, useEffect } from 'react';
import { X } from 'lucide-react';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import { CLOSE_ICON_SIZE, ZIP_MODAL_IDS } from './serviceDetailsData';

const { zipModal } = SERVICE_DETAILS_CONTENT;
const ESCAPE_KEY = 'Escape';

const isEscapeKey = (event) => event.key === ESCAPE_KEY;

const ServiceZipModal = memo(
  ({ isOpen, zipCode, zipError, onZipCodeChange, onClose, onSubmit }) => {
    useBodyScrollLock(isOpen);

    useEffect(() => {
      if (!isOpen) {
        return undefined;
      }

      const handleKeyDown = (event) => {
        if (isEscapeKey(event)) {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, onClose]);

    if (!isOpen) {
      return null;
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={ZIP_MODAL_IDS.TITLE}
          className="w-full max-w-3xl rounded-xl bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 id={ZIP_MODAL_IDS.TITLE} className="text-lg font-semibold text-brand-ink">
              {zipModal.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={zipModal.closeLabel}
              className="rounded-md p-1 text-gray-500 transition-colors hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <X size={CLOSE_ICON_SIZE} aria-hidden="true" />
            </button>
          </div>
          <form onSubmit={onSubmit} className="px-6 py-6">
            <div className="relative mb-6 text-center text-sm text-gray-400">
              <span className="absolute inset-x-0 top-1/2 border-t border-gray-200" />
              <span className="relative bg-white px-3">{zipModal.dividerLabel}</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor={ZIP_MODAL_IDS.FIELD} className="sr-only">
                {zipModal.inputLabel}
              </label>
              <input
                id={ZIP_MODAL_IDS.FIELD}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                value={zipCode}
                onChange={onZipCodeChange}
                placeholder={zipModal.inputPlaceholder}
                aria-invalid={Boolean(zipError)}
                aria-describedby={zipError ? ZIP_MODAL_IDS.ERROR : undefined}
                className="h-10 flex-1 rounded-md border border-gray-300 px-3 text-sm text-brand-ink focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <button
                type="submit"
                className="h-10 rounded-md bg-brand-orange px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
              >
                {zipModal.continue}
              </button>
            </div>
            {zipError ? (
              <p id={ZIP_MODAL_IDS.ERROR} role="alert" className="mt-3 text-sm text-red-600">
                {zipError}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    );
  },
);

ServiceZipModal.displayName = 'ServiceZipModal';

export default ServiceZipModal;
