import React, { memo } from 'react';
import { ChevronDown, Menu, Search } from 'lucide-react';
import { LANDING_CONTENT } from './landingContent';

const LandingSearchForm = memo(
  ({ idPrefix, searchValue, onSearchChange, onSearchSubmit, showCategory, className }) => {
    const searchId = `${idPrefix}-service-search`;
    const categoryId = `${idPrefix}-service-category`;

    return (
      <form role="search" onSubmit={onSearchSubmit} className={className}>
        <div className="flex h-11 w-full items-stretch overflow-hidden rounded-md bg-white">
          {showCategory && (
            <div className="relative flex shrink-0 items-center">
              <label className="sr-only" htmlFor={categoryId}>
                {LANDING_CONTENT.header.categoryLabel}
              </label>
              <Menu
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 text-brand-ink"
              />
              <select
                id={categoryId}
                defaultValue="all"
                className="h-full cursor-pointer appearance-none bg-transparent pl-9 pr-7 text-xs font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-orange"
              >
                <option value="all">{LANDING_CONTENT.header.allCategories}</option>
              </select>
              <ChevronDown
                size={12}
                aria-hidden="true"
                className="pointer-events-none absolute right-2.5 text-brand-ink"
              />
              <span aria-hidden="true" className="h-5 w-px shrink-0 bg-gray-300" />
            </div>
          )}

          <label className="sr-only" htmlFor={searchId}>
            {LANDING_CONTENT.header.searchLabel}
          </label>
          <input
            id={searchId}
            type="search"
            value={searchValue}
            onChange={onSearchChange}
            placeholder={LANDING_CONTENT.header.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-brand-ink placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-orange"
          />

          <button
            type="submit"
            aria-label={LANDING_CONTENT.header.searchSubmit}
            className="flex w-12 shrink-0 items-center justify-center bg-brand-orange text-white transition-colors duration-200 ease-in-out hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <Search size={18} aria-hidden="true" />
          </button>
        </div>
      </form>
    );
  },
);

LandingSearchForm.displayName = 'LandingSearchForm';

export default LandingSearchForm;
