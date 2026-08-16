import { useEffect, useMemo, useState } from 'react';
import { useApi } from './useApi';
import { httpMethods } from '../services/httpMethods';

export const normalizeCollection = (data) => {
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return [];
};

const itemMatchesQuery = (item, query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return Object.values(item ?? {}).some((value) => {
    if (value == null || typeof value === 'object') return false;
    return String(value).toLowerCase().includes(normalizedQuery);
  });
};

/**
 * Shared admin list fetch + accessible search state.
 */
export function useAdminCollection(endpoint) {
  const { data, loading, error, execute } = useApi(httpMethods.get);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!endpoint) return;
    execute(endpoint);
  }, [endpoint, execute]);

  const items = useMemo(() => normalizeCollection(data), [data]);

  const filteredItems = useMemo(
    () => items.filter((item) => itemMatchesQuery(item, searchQuery)),
    [items, searchQuery],
  );

  return {
    items: filteredItems,
    allItems: items,
    loading,
    error,
    searchQuery,
    setSearchQuery,
  };
}
