import React, { memo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FIRST_PAGE_INDEX } from '../catalog/catalogData';
import {
  TOP_RATED_PAGE_NUMBER_OFFSET,
  TOP_RATED_PAGINATION_ARROW_CLASS,
  TOP_RATED_PAGINATION_ICON_SIZE,
  TOP_RATED_PAGINATION_NAV_CLASS,
  TOP_RATED_PAGINATION_PAGE_ACTIVE,
  TOP_RATED_PAGINATION_PAGE_IDLE,
} from './topRatedServicesData';

const toDisplayPageNumber = (zeroBasedIndex) => zeroBasedIndex + TOP_RATED_PAGE_NUMBER_OFFSET;
const toZeroBasedPageIndex = (displayPageNumber) => displayPageNumber - TOP_RATED_PAGE_NUMBER_OFFSET;

const TopRatedPageButton = memo(({ pageNumber, isActive, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(toZeroBasedPageIndex(pageNumber));
  }, [onSelect, pageNumber]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Page ${pageNumber}`}
      aria-current={isActive ? 'page' : undefined}
      className={isActive ? TOP_RATED_PAGINATION_PAGE_ACTIVE : TOP_RATED_PAGINATION_PAGE_IDLE}
    >
      {pageNumber}
    </button>
  );
});

TopRatedPageButton.displayName = 'TopRatedPageButton';

const TopRatedServicesPagination = memo(
  ({ pageIndex, pageCount, labels, onPrevious, onNext, onSelectPage }) => {
    const pageNumbers = Array.from({ length: pageCount }, (_, index) => toDisplayPageNumber(index));
    const lastPageIndex = pageCount - TOP_RATED_PAGE_NUMBER_OFFSET;

    return (
      <nav aria-label={labels.label} className={TOP_RATED_PAGINATION_NAV_CLASS}>
        <button
          type="button"
          onClick={onPrevious}
          disabled={pageIndex === FIRST_PAGE_INDEX}
          aria-label={labels.previous}
          className={TOP_RATED_PAGINATION_ARROW_CLASS}
        >
          <ChevronLeft size={TOP_RATED_PAGINATION_ICON_SIZE} aria-hidden="true" />
        </button>

        {pageNumbers.map((pageNumber) => (
          <TopRatedPageButton
            key={pageNumber}
            pageNumber={pageNumber}
            isActive={pageIndex === toZeroBasedPageIndex(pageNumber)}
            onSelect={onSelectPage}
          />
        ))}

        <button
          type="button"
          onClick={onNext}
          disabled={pageIndex === lastPageIndex}
          aria-label={labels.next}
          className={TOP_RATED_PAGINATION_ARROW_CLASS}
        >
          <ChevronRight size={TOP_RATED_PAGINATION_ICON_SIZE} aria-hidden="true" />
        </button>
      </nav>
    );
  },
);

TopRatedServicesPagination.displayName = 'TopRatedServicesPagination';

export default TopRatedServicesPagination;
