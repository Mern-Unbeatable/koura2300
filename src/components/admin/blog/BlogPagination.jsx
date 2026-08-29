import {
  ADMIN_BLOG_PAGINATION_CLASS,
  ADMIN_BLOG_PAGINATION_CONTROL_CLASS,
  ADMIN_BLOG_PAGINATION_ELLIPSIS_CLASS,
  ADMIN_BLOG_PAGINATION_PAGE_ACTIVE_CLASS,
  ADMIN_BLOG_PAGINATION_PAGE_CLASS,
} from './blogData';
import { PAGINATION_ELLIPSIS_TOKEN } from './blogUtils';

const BlogPagination = ({
  copy,
  currentPage,
  pageItems,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onPageChange,
}) => (
  <nav
    className={ADMIN_BLOG_PAGINATION_CLASS}
    aria-label={copy.pagination.regionLabel}
    data-testid="admin-blog-pagination"
  >
    <button
      type="button"
      className={ADMIN_BLOG_PAGINATION_CONTROL_CLASS}
      onClick={onPrevious}
      disabled={!canGoPrevious}
      aria-label={copy.pagination.previous}
    >
      {copy.pagination.previous}
    </button>

    {pageItems.map((item, index) => {
      if (item === PAGINATION_ELLIPSIS_TOKEN) {
        return (
          <span
            key={`ellipsis-${index}`}
            className={ADMIN_BLOG_PAGINATION_ELLIPSIS_CLASS}
            aria-hidden="true"
          >
            {copy.pagination.ellipsis}
          </span>
        );
      }

      const isActive = item === currentPage;

      return (
        <button
          key={item}
          type="button"
          aria-label={copy.pagination.pageLabel(item)}
          aria-current={isActive ? 'page' : undefined}
          className={
            isActive
              ? ADMIN_BLOG_PAGINATION_PAGE_ACTIVE_CLASS
              : ADMIN_BLOG_PAGINATION_PAGE_CLASS
          }
          onClick={() => onPageChange(item)}
        >
          {item}
        </button>
      );
    })}

    <button
      type="button"
      className={ADMIN_BLOG_PAGINATION_CONTROL_CLASS}
      onClick={onNext}
      disabled={!canGoNext}
      aria-label={copy.pagination.next}
    >
      {copy.pagination.next}
    </button>
  </nav>
);

export default BlogPagination;
