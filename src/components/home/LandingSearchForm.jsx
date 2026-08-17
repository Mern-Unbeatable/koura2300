import React, { memo } from 'react';
import { ChevronDown, Menu, Search } from 'lucide-react';
import { LANDING_CONTENT } from './landingContent';
import { CATEGORY_ITEMS } from './landingData';

const MENU_ICON_SIZE = 13;
const CHEVRON_ICON_SIZE = 11;
const SEARCH_ICON_SIZE = 15;

const LandingSearchForm = memo(
  ({ idPrefix, searchValue, onSearchChange, onSearchSubmit, className }) => {
    const searchId = `${idPrefix}-service-search`;
    const categoryId = `${idPrefix}-service-category`;

    return (
      <form role="search" onSubmit={onSearchSubmit} className={className}>
        <div className="flex h-9 w-full items-stretch gap-1.5">
          <div className="relative flex shrink-0 items-center rounded-md bg-white">
            <label className="sr-only" htmlFor={categoryId}>
              {LANDING_CONTENT.header.categoryLabel}
            </label>
            <Menu
              size={MENU_ICON_SIZE}
              aria-hidden="true"
              className="pointer-events-none absolute left-2.5 text-brand-ink"
            />
            <select
              id={categoryId}
              defaultValue="all"
              className="h-full cursor-pointer appearance-none rounded-md bg-transparent pl-8 pr-6 text-xs font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-orange"
            >
              <option value="all">{LANDING_CONTENT.header.allCategories}</option>
              {CATEGORY_ITEMS.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
            <ChevronDown
              size={CHEVRON_ICON_SIZE}
              aria-hidden="true"
              className="pointer-events-none absolute right-2 text-brand-ink"
            />
          </div>

          <div className="flex min-w-0 flex-1 items-stretch overflow-hidden rounded-md bg-white">
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
              className="flex w-9 shrink-0 cursor-pointer items-center justify-center bg-brand-orange text-white transition-colors duration-200 ease-in-out hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
            >
              <Search size={SEARCH_ICON_SIZE} aria-hidden="true" />
            </button>
          </div>
        </div>
      </form>
    );
  },
);

LandingSearchForm.displayName = 'LandingSearchForm';

export default LandingSearchForm;
