import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { ADMIN_BLOG_COPY } from './blogCopy';
import {
  ADMIN_BLOG_DELETE_ACTIONS_CLASS,
  ADMIN_BLOG_DELETE_BODY_CLASS,
  ADMIN_BLOG_DELETE_CANCEL_CLASS,
  ADMIN_BLOG_DELETE_CLOSE_CLASS,
  ADMIN_BLOG_DELETE_CLOSE_ICON_SIZE_PX,
  ADMIN_BLOG_DELETE_CONFIRM_CLASS,
  ADMIN_BLOG_DELETE_DESCRIPTION_CLASS,
  ADMIN_BLOG_DELETE_DIALOG_CLASS,
  ADMIN_BLOG_DELETE_HEADER_CLASS,
  ADMIN_BLOG_DELETE_OVERLAY_CLASS,
  ADMIN_BLOG_DELETE_TITLE_CLASS,
} from './blogData';

const BlogDeleteModal = ({
  copy = ADMIN_BLOG_COPY,
  postTitle,
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
      className={ADMIN_BLOG_DELETE_OVERLAY_CLASS}
      data-testid="blog-delete-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.deleteModal.regionLabel}
        className={ADMIN_BLOG_DELETE_DIALOG_CLASS}
      >
        <div className={ADMIN_BLOG_DELETE_HEADER_CLASS}>
          <h2 className={ADMIN_BLOG_DELETE_TITLE_CLASS}>{copy.deleteModal.title}</h2>
          <button
            type="button"
            aria-label={copy.deleteModal.closeLabel}
            onClick={onClose}
            className={ADMIN_BLOG_DELETE_CLOSE_CLASS}
          >
            <X size={ADMIN_BLOG_DELETE_CLOSE_ICON_SIZE_PX} aria-hidden="true" />
          </button>
        </div>

        <div className={ADMIN_BLOG_DELETE_BODY_CLASS}>
          <p className={ADMIN_BLOG_DELETE_DESCRIPTION_CLASS}>
            {copy.deleteModal.description(postTitle)}
          </p>

          <div className={ADMIN_BLOG_DELETE_ACTIONS_CLASS}>
            <button
              type="button"
              className={ADMIN_BLOG_DELETE_CANCEL_CLASS}
              onClick={onClose}
            >
              {copy.deleteModal.cancel}
            </button>
            <button
              type="button"
              className={ADMIN_BLOG_DELETE_CONFIRM_CLASS}
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

export default BlogDeleteModal;
