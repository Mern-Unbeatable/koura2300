import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { REVIEWS_COPY } from './reviewsCopy';
import {
  REVIEWS_DELETE_ACTIONS_CLASS,
  REVIEWS_DELETE_BODY_CLASS,
  REVIEWS_DELETE_CANCEL_CLASS,
  REVIEWS_DELETE_CLOSE_CLASS,
  REVIEWS_DELETE_CLOSE_ICON_SIZE_PX,
  REVIEWS_DELETE_CONFIRM_CLASS,
  REVIEWS_DELETE_DESCRIPTION_CLASS,
  REVIEWS_DELETE_DIALOG_CLASS,
  REVIEWS_DELETE_HEADER_CLASS,
  REVIEWS_DELETE_OVERLAY_CLASS,
  REVIEWS_DELETE_TITLE_CLASS,
} from './reviewsData';

const ReviewsDeleteModal = ({
  copy = REVIEWS_COPY,
  reviewerName,
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
      className={REVIEWS_DELETE_OVERLAY_CLASS}
      data-testid="reviews-delete-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.deleteModal.regionLabel}
        className={REVIEWS_DELETE_DIALOG_CLASS}
      >
        <div className={REVIEWS_DELETE_HEADER_CLASS}>
          <h2 className={REVIEWS_DELETE_TITLE_CLASS}>{copy.deleteModal.title}</h2>
          <button
            type="button"
            aria-label={copy.deleteModal.closeLabel}
            onClick={onClose}
            className={REVIEWS_DELETE_CLOSE_CLASS}
          >
            <X size={REVIEWS_DELETE_CLOSE_ICON_SIZE_PX} aria-hidden="true" />
          </button>
        </div>

        <div className={REVIEWS_DELETE_BODY_CLASS}>
          <p className={REVIEWS_DELETE_DESCRIPTION_CLASS}>
            {copy.deleteModal.description(reviewerName)}
          </p>

          <div className={REVIEWS_DELETE_ACTIONS_CLASS}>
            <button
              type="button"
              className={REVIEWS_DELETE_CANCEL_CLASS}
              onClick={onClose}
            >
              {copy.deleteModal.cancel}
            </button>
            <button
              type="button"
              className={REVIEWS_DELETE_CONFIRM_CLASS}
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

export default ReviewsDeleteModal;
