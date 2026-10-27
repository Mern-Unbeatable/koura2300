import { useCallback, useMemo, useState } from 'react';
import {
  applyVariantPricesToPackages,
  resolveVariantSelector,
} from './variantSelectorUtils';

const useVariantSelector = ({ sizes, options, packages }) => {
  const resolved = useMemo(
    () => resolveVariantSelector({ sizes, options }),
    [options, sizes],
  );
  const items = resolved?.items ?? [];
  const kind = resolved?.kind ?? null;
  const isVisible = Boolean(resolved);
  const [selectedId, setSelectedId] = useState(() => items[0]?.id ?? '');

  const activeSelectedId = items.some((item) => item.id === selectedId)
    ? selectedId
    : items[0]?.id ?? '';

  const selectedVariant = useMemo(
    () => items.find((item) => item.id === activeSelectedId) ?? null,
    [activeSelectedId, items],
  );

  const displayPackages = useMemo(
    () =>
      isVisible
        ? applyVariantPricesToPackages(packages, selectedVariant)
        : packages,
    [isVisible, packages, selectedVariant],
  );

  const handleSelectVariant = useCallback((nextId) => {
    setSelectedId(nextId);
  }, []);

  return {
    isVisible,
    kind,
    items,
    selectedId: activeSelectedId,
    displayPackages,
    onSelectVariant: handleSelectVariant,
  };
};

export default useVariantSelector;
