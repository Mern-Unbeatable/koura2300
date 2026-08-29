import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { ADS_COPY } from './adsCopy';
import {
  ADS_DELETE_ACTIONS_CLASS,
  ADS_DELETE_BODY_CLASS,
  ADS_DELETE_CANCEL_CLASS,
  ADS_DELETE_CLOSE_CLASS,
  ADS_DELETE_CLOSE_ICON_SIZE_PX,
  ADS_DELETE_CONFIRM_CLASS,
  ADS_DELETE_DESCRIPTION_CLASS,
  ADS_DELETE_DIALOG_CLASS,
  ADS_DELETE_HEADER_CLASS,
  ADS_DELETE_OVERLAY_CLASS,
  ADS_DELETE_TITLE_CLASS,
} from './adsData';

const AdsDeleteModal = ({
  copy = ADS_COPY,
  adTitle,
  onClose,
  onConfirm,
}) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={ADS_DELETE_OVERLAY_CLASS}
      data-testid="ads-delete-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.deleteModal.regionLabel}
        className={ADS_DELETE_DIALOG_CLASS}
      >
        <div className={ADS_DELETE_HEADER_CLASS}>
          <h2 className={ADS_DELETE_TITLE_CLASS}>{copy.deleteModal.title}</h2>
          <button
            type="button"
            aria-label={copy.deleteModal.closeLabel}
            onClick={onClose}
            className={ADS_DELETE_CLOSE_CLASS}
          >
            <X size={ADS_DELETE_CLOSE_ICON_SIZE_PX} aria-hidden="true" />
          </button>
        </div>

        <div className={ADS_DELETE_BODY_CLASS}>
          <p className={ADS_DELETE_DESCRIPTION_CLASS}>
            {copy.deleteModal.description(adTitle)}
          </p>

          <div className={ADS_DELETE_ACTIONS_CLASS}>
            <button
              type="button"
              className={ADS_DELETE_CANCEL_CLASS}
              onClick={onClose}
            >
              {copy.deleteModal.cancel}
            </button>
            <button
              type="button"
              className={ADS_DELETE_CONFIRM_CLASS}
              onClick={onConfirm}
            >
              {copy.deleteModal.confirm}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AdsDeleteModal;
