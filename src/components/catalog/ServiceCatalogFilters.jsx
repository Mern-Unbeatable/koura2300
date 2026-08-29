import React, { memo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const SELECT_CHEVRON_SIZE = 16;

const CATEGORY_BUTTON_BASE =
  'cursor-pointer whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2';
const CATEGORY_BUTTON_SELECTED =
  'border-brand-orange bg-brand-orange text-white shadow-sm shadow-brand-orange/30';
const CATEGORY_BUTTON_IDLE =
  'border-gray-200 bg-white text-gray-600 hover:border-brand-orange hover:bg-brand-orange-light hover:text-brand-ink';

const CategoryButton = memo(({ category, isSelected, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(category);
  }, [category, onSelect]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSelected}
      className={`${CATEGORY_BUTTON_BASE} ${
        isSelected ? CATEGORY_BUTTON_SELECTED : CATEGORY_BUTTON_IDLE
      }`}
    >
      {category}
    </button>
  );
});

CategoryButton.displayName = 'CategoryButton';

const ServiceCatalogFilters = memo(
  ({
    categories = [],
    priceRanges,
    selectedCategory,
    selectedPriceRange,
    groupLabel,
    priceLabel,
    showCategoryTabs = true,
    onCategoryChange,
    onPriceRangeChange,
  }) => {
    const handlePriceChange = useCallback(
      (event) => {
        onPriceRangeChange(event.target.value);
      },
      [onPriceRangeChange],
    );

    const shouldShowCategoryTabs = showCategoryTabs && categories.length > 0;

    return (
      <div
        className={`flex flex-col gap-5 lg:flex-row lg:items-center ${
          shouldShowCategoryTabs ? 'lg:justify-between lg:gap-6' : 'lg:justify-end'
        }`}
      >
        {shouldShowCategoryTabs ? (
          <div
            role="group"
            aria-label={groupLabel}
            className="flex min-w-0 flex-wrap gap-2.5 lg:flex-1"
          >
            {categories.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                isSelected={category === selectedCategory}
                onSelect={onCategoryChange}
              />
            ))}
          </div>
        ) : null}

        <label className="flex shrink-0 items-center gap-3 text-sm font-medium text-brand-ink">
          <span className="whitespace-nowrap text-brand-muted">{priceLabel}:</span>
          <span className="group relative inline-flex">
            <select
              value={selectedPriceRange}
              onChange={handlePriceChange}
              aria-label={priceLabel}
              className="w-full min-w-44 cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-11 text-sm font-semibold text-brand-ink shadow-sm transition-colors duration-200 ease-in-out hover:border-brand-orange focus:outline-none focus-visible:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-1"
            >
              {priceRanges.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={SELECT_CHEVRON_SIZE}
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-hover:text-brand-orange"
            />
          </span>
        </label>
      </div>
    );
  },
);

ServiceCatalogFilters.displayName = 'ServiceCatalogFilters';

export default ServiceCatalogFilters;
