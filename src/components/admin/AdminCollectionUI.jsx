import React, { memo } from 'react';
import { Search } from 'lucide-react';

export const AdminPageHeader = memo(({ title, description, action }) => (
  <div className="flex items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {description ? (
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      ) : null}
    </div>
    {action}
  </div>
));
AdminPageHeader.displayName = 'AdminPageHeader';

export const AdminSearchField = memo(
  ({ id, label, value, onChange, placeholder }) => (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
      <Search size={16} className="text-gray-400 shrink-0" aria-hidden="true" />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
      />
    </div>
  ),
);
AdminSearchField.displayName = 'AdminSearchField';

export const AdminLoadingState = memo(({ label = 'Loading' }) => (
  <div className="flex items-center justify-center py-20" role="status" aria-live="polite">
    <span className="sr-only">{label}</span>
    <span className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
  </div>
));
AdminLoadingState.displayName = 'AdminLoadingState';

export const AdminErrorState = memo(({ icon: Icon, message }) => (
  <div
    className="flex flex-col items-center justify-center py-20 gap-3 text-red-400"
    role="alert"
  >
    {Icon ? <Icon size={36} className="text-red-200" aria-hidden="true" /> : null}
    <p className="text-sm">{message}</p>
  </div>
));
AdminErrorState.displayName = 'AdminErrorState';

export const AdminEmptyState = memo(({ icon: Icon, message }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
    {Icon ? <Icon size={36} className="text-gray-200" aria-hidden="true" /> : null}
    <p className="text-sm">{message}</p>
  </div>
));
AdminEmptyState.displayName = 'AdminEmptyState';

export const AdminCollectionCard = memo(
  ({
    searchId,
    searchLabel,
    searchPlaceholder,
    searchQuery,
    onSearchChange,
    children,
  }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <AdminSearchField
        id={searchId}
        label={searchLabel}
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
      {children}
    </div>
  ),
);
AdminCollectionCard.displayName = 'AdminCollectionCard';
