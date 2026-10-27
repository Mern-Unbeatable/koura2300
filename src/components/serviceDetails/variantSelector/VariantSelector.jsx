import { memo } from 'react';
import { VARIANT_SELECTOR_COPY } from './variantSelectorCopy';
import {
  VARIANT_SELECTOR_PILL_ACTIVE_CLASS,
  VARIANT_SELECTOR_PILL_BASE_CLASS,
  VARIANT_SELECTOR_PILL_IDLE_CLASS,
  VARIANT_SELECTOR_PILLS_CLASS,
  VARIANT_SELECTOR_SECTION_CLASS,
} from './variantSelectorData';
import { getVariantItemLabel } from './variantSelectorUtils';

const VariantPill = memo(({ label, isSelected, onSelect }) => {
  const appearanceClass = isSelected
    ? VARIANT_SELECTOR_PILL_ACTIVE_CLASS
    : VARIANT_SELECTOR_PILL_IDLE_CLASS;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={label}
      onClick={onSelect}
      className={`${VARIANT_SELECTOR_PILL_BASE_CLASS} ${appearanceClass}`}
    >
      {label}
    </button>
  );
});

VariantPill.displayName = 'VariantPill';

const VariantSelector = memo(({ kind, items, selectedId, onSelectVariant }) => {
  if (!kind || !items?.length) {
    return null;
  }

  const groupLabel = VARIANT_SELECTOR_COPY[kind]?.groupLabel ?? '';

  return (
    <section
      className={VARIANT_SELECTOR_SECTION_CLASS}
      aria-label={groupLabel}
      data-testid="service-variant-selector"
    >
      <div className={VARIANT_SELECTOR_PILLS_CLASS} role="radiogroup" aria-label={groupLabel}>
        {items.map((item) => {
          const label = getVariantItemLabel(item, kind);
          return (
            <VariantPill
              key={item.id}
              label={label}
              isSelected={item.id === selectedId}
              onSelect={() => onSelectVariant(item.id)}
            />
          );
        })}
      </div>
    </section>
  );
});

VariantSelector.displayName = 'VariantSelector';

export default VariantSelector;
