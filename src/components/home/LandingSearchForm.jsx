import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Search } from 'lucide-react';

const LandingSearchForm = memo(
  ({ idPrefix, searchValue, onSearchChange, onSearchSubmit, showCategory, className }) => {
    const { t } = useTranslation();
    const searchId = `${idPrefix}-service-search`;

    return (
      <form role="search" onSubmit={onSearchSubmit} className={className}>
        {showCategory && (
          <>
            <label className="sr-only" htmlFor={`${idPrefix}-service-category`}>
              {t('landing.header.categoryLabel')}
            </label>
            <div className="relative">
              <select
                id={`${idPrefix}-service-category`}
                className="h-11 appearance-none rounded-l-lg border-r border-gray-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
                defaultValue="all"
              >
                <option value="all">{t('landing.header.allCategories')}</option>
              </select>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-brand-ink"
              />
            </div>
          </>
        )}
        <label className="sr-only" htmlFor={searchId}>
          {t('landing.header.searchLabel')}
        </label>
        <input
          id={searchId}
          type="search"
          value={searchValue}
          onChange={onSearchChange}
          placeholder={t('landing.header.searchPlaceholder')}
          className={`min-w-0 flex-1 bg-white px-4 text-brand-ink placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-orange ${
            showCategory ? '' : 'rounded-l-lg py-3'
          }`}
        />
        <button
          type="submit"
          aria-label={t('landing.header.searchSubmit')}
          className="flex w-13 items-center justify-center rounded-r-lg bg-brand-orange px-3 transition-colors duration-200 ease-in-out hover:bg-brand-orange-dark focus:outline-none focus:ring-2 focus:ring-white"
        >
          <Search size={showCategory ? 22 : 20} aria-hidden="true" />
        </button>
      </form>
    );
  },
);

LandingSearchForm.displayName = 'LandingSearchForm';

export default LandingSearchForm;
