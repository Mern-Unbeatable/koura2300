import React, { memo, useCallback } from 'react';
import { LIGHTING_CONTENT } from './lightingCopy';
import { LIGHTING_CATEGORIES, LIGHTING_PRICE_RANGES } from './lightingData';

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
        {LIGHTING_CATEGORIES.map((category) => (
          <LightingCategoryButton
            key={category}
            category={category}
            isSelected={category === selectedCategory}
            onSelect={onCategoryChange}
          />
        ))}
      </div>

      <label className="flex shrink-0 items-center gap-3 text-sm text-brand-ink">
        <span>{LIGHTING_CONTENT.filters.priceLabel}:</span>
        <select
          value={selectedPriceRange}
          onChange={onPriceRangeChange}
          aria-label={LIGHTING_CONTENT.filters.priceLabel}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-orange"
        >
          {LIGHTING_PRICE_RANGES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  ),
);

LightingFilters.displayName = 'LightingFilters';

export default LightingFilters;
