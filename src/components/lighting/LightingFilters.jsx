import React, { memo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { LIGHTING_CONTENT } from './lightingCopy';
import { LIGHTING_FILTER_TABS, LIGHTING_PRICE_RANGES } from './lightingData';

const SELECT_CHEVRON_SIZE = 16;

const LightingCategoryButton = memo(({ category, isSelected, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(category);
  }, [category, onSelect]);

  const stateClass = isSelected
    ? 'bg-brand-orange text-white'
    : 'bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-brand-ink';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSelected}
      className={`shrink-0 cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 ${stateClass}`}
    >
      {category}
    </button>
  );
});

LightingCategoryButton.displayName = 'LightingCategoryButton';

const LightingFilters = memo(
  ({ selectedCategory, selectedPriceRange, onCategoryChange, onPriceRangeChange }) => (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div
        role="group"
        aria-label={LIGHTING_CONTENT.filters.groupLabel}
        className="scrollbar-none flex gap-3 overflow-x-auto pb-1"
      >
        {LIGHTING_FILTER_TABS.map((category) => (
          <LightingCategoryButton
            key={category}
            category={category}
            isSelected={category === selectedCategory}
            onSelect={onCategoryChange}
          />
        ))}
      </div>

      <label className="flex shrink-0 items-center gap-3 text-sm font-medium text-brand-ink">
        <span className="whitespace-nowrap text-brand-muted">
          {LIGHTING_CONTENT.filters.priceLabel}:
        </span>
        <span className="group relative inline-flex">
          <select
            value={selectedPriceRange}
            onChange={onPriceRangeChange}
            aria-label={LIGHTING_CONTENT.filters.priceLabel}
            className="w-full min-w-44 cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-11 text-sm font-semibold text-brand-ink shadow-sm transition-colors duration-200 ease-in-out hover:border-brand-orange focus:outline-none focus-visible:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-1"
          >
            {LIGHTING_PRICE_RANGES.map(({ value, label }) => (
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
  ),
);

LightingFilters.displayName = 'LightingFilters';

export default LightingFilters;
