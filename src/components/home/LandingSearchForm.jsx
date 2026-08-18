import React, { memo, useCallback } from 'react';
import { ChevronDown, Menu, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config';
import { LANDING_CONTENT } from './landingContent';
import { ALL_CATEGORIES_VALUE, CATEGORY_ITEMS } from './landingData';

const MENU_ICON_SIZE = 13;
const CHEVRON_ICON_SIZE = 11;
const SEARCH_ICON_SIZE = 15;
const SEARCH_ROW_CLASS =
  'flex w-full min-w-0 items-stretch gap-1.5 max-[359px]:flex-col min-[360px]:h-9';
const CATEGORY_FIELD_CLASS =
  'relative flex h-9 min-w-0 items-center rounded-md bg-white max-[359px]:w-full min-[360px]:max-w-[38%] sm:max-w-48';
const CATEGORY_SELECT_CLASS =
  'h-full w-full min-w-0 cursor-pointer appearance-none rounded-md bg-transparent py-0 pl-8 pr-6 text-xs font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-orange';
const SEARCH_FIELD_CLASS =
  'flex h-9 min-w-0 flex-1 items-stretch overflow-hidden rounded-md bg-white';

const getSelectedCategoryPath = (pathname) => {
  const matchingCategory = CATEGORY_ITEMS.find(({ path }) => path === pathname);
  return matchingCategory ? matchingCategory.path : ALL_CATEGORIES_VALUE;
};

const LandingSearchForm = memo(
  ({ idPrefix, searchValue, onSearchChange, onSearchSubmit, className }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const searchId = `${idPrefix}-service-search`;
    const categoryId = `${idPrefix}-service-category`;
    const selectedCategory = getSelectedCategoryPath(pathname);

    const handleCategoryChange = useCallback(
      (event) => {
        const nextPath =
          event.target.value === ALL_CATEGORIES_VALUE ? ROUTES.HOME : event.target.value;
        navigate(nextPath);
      },
      [navigate],
    );

    return (
      <form role="search" onSubmit={onSearchSubmit} className={`min-w-0 ${className}`}>
        <div className={SEARCH_ROW_CLASS}>
          <div className={CATEGORY_FIELD_CLASS}>
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
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={CATEGORY_SELECT_CLASS}
            >
              <option value={ALL_CATEGORIES_VALUE}>{LANDING_CONTENT.header.allCategories}</option>
              {CATEGORY_ITEMS.map(({ id, title, path }) => (
                <option key={id} value={path}>
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

          <div className={SEARCH_FIELD_CLASS}>
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
