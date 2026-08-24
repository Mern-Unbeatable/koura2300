import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { CUSTOMERS_SUSPEND_COPY } from './customersSuspendCopy';
import {
  CUSTOMERS_SUSPEND_ACTIONS_CLASS,
  CUSTOMERS_SUSPEND_BODY_CLASS,
  CUSTOMERS_SUSPEND_CANCEL_CLASS,
  CUSTOMERS_SUSPEND_CLOSE_CLASS,
  CUSTOMERS_SUSPEND_CLOSE_ICON_SIZE_PX,
  CUSTOMERS_SUSPEND_DIALOG_CLASS,
  CUSTOMERS_SUSPEND_ERROR_TEXT_CLASS,
  CUSTOMERS_SUSPEND_HEADER_CLASS,
  CUSTOMERS_SUSPEND_LABEL_CLASS,
  CUSTOMERS_SUSPEND_OVERLAY_CLASS,
  CUSTOMERS_SUSPEND_REQUIRED_CLASS,
  CUSTOMERS_SUSPEND_SUBMIT_CLASS,
  CUSTOMERS_SUSPEND_TEXTAREA_CLASS,
  CUSTOMERS_SUSPEND_TEXTAREA_ERROR_CLASS,
  CUSTOMERS_SUSPEND_TITLE_CLASS,
} from './customersSuspendData';
import useCustomersSuspendForm from './useCustomersSuspendForm';

const CUSTOMERS_SUSPEND_REASON_FIELD_ID = 'customers-suspend-reason';
const CUSTOMERS_SUSPEND_REASON_ERROR_ID = 'customers-suspend-reason-error';

const CustomersSuspendModal = ({ onClose, onConfirm }) => {
  const { reason, error, onReasonChange, onSubmit } = useCustomersSuspendForm({ onConfirm });

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const textareaClassName = error
    ? `${CUSTOMERS_SUSPEND_TEXTAREA_CLASS} ${CUSTOMERS_SUSPEND_TEXTAREA_ERROR_CLASS}`
    : CUSTOMERS_SUSPEND_TEXTAREA_CLASS;

  return createPortal(
    <div
      className={CUSTOMERS_SUSPEND_OVERLAY_CLASS}
      data-testid="customers-suspend-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={CUSTOMERS_SUSPEND_COPY.regionLabel}
        className={CUSTOMERS_SUSPEND_DIALOG_CLASS}
      >
        <div className={CUSTOMERS_SUSPEND_HEADER_CLASS}>
          <h2 className={CUSTOMERS_SUSPEND_TITLE_CLASS}>{CUSTOMERS_SUSPEND_COPY.title}</h2>
          <button
            type="button"
            aria-label={CUSTOMERS_SUSPEND_COPY.closeLabel}
            onClick={onClose}
            className={CUSTOMERS_SUSPEND_CLOSE_CLASS}
          >
            <X size={CUSTOMERS_SUSPEND_CLOSE_ICON_SIZE_PX} aria-hidden="true" />
          </button>
        </div>

        <form className={CUSTOMERS_SUSPEND_BODY_CLASS} onSubmit={onSubmit} noValidate>
          <label
            htmlFor={CUSTOMERS_SUSPEND_REASON_FIELD_ID}
            className={CUSTOMERS_SUSPEND_LABEL_CLASS}
          >
            {CUSTOMERS_SUSPEND_COPY.reasonLabel}
            <span className={CUSTOMERS_SUSPEND_REQUIRED_CLASS} aria-hidden="true">
              {CUSTOMERS_SUSPEND_COPY.reasonRequiredMarker}
            </span>
          </label>
          <textarea
            id={CUSTOMERS_SUSPEND_REASON_FIELD_ID}
            name="reason"
            value={reason}
            onChange={onReasonChange}
            placeholder={CUSTOMERS_SUSPEND_COPY.reasonPlaceholder}
            aria-required="true"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? CUSTOMERS_SUSPEND_REASON_ERROR_ID : undefined}
            className={textareaClassName}
          />
          {error ? (
            <p
              id={CUSTOMERS_SUSPEND_REASON_ERROR_ID}
              role="alert"
              className={CUSTOMERS_SUSPEND_ERROR_TEXT_CLASS}
            >
              {error}
            </p>
          ) : null}

          <div className={CUSTOMERS_SUSPEND_ACTIONS_CLASS}>
            <button type="button" className={CUSTOMERS_SUSPEND_CANCEL_CLASS} onClick={onClose}>
              {CUSTOMERS_SUSPEND_COPY.cancel}
            </button>
            <button type="submit" className={CUSTOMERS_SUSPEND_SUBMIT_CLASS}>
              {CUSTOMERS_SUSPEND_COPY.submit}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default CustomersSuspendModal;
