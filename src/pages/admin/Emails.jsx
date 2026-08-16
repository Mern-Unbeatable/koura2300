import React from 'react';
import { Mail } from 'lucide-react';
import { useAdminCollection } from '../../hooks/useAdminCollection';
import API_ENDPOINTS from '../../services/httpEndpoint';
import {
  AdminPageHeader,
  AdminCollectionCard,
  AdminLoadingState,
  AdminErrorState,
  AdminEmptyState,
} from '../../components/admin/AdminCollectionUI';

const Emails = () => {
  const { items: emails, loading, error, searchQuery, setSearchQuery } =
    useAdminCollection(API_ENDPOINTS.EMAILS.LIST);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Emails"
        description="Manage all incoming and outgoing emails."
      />

      <AdminCollectionCard
        searchId="emails-search"
        searchLabel="Search emails"
        searchPlaceholder="Search emails..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        {loading ? (
          <AdminLoadingState label="Loading emails" />
        ) : error ? (
          <AdminErrorState
            icon={Mail}
            message="Failed to load emails. Please try again."
          />
        ) : emails.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {emails.map((email, i) => (
              <li key={email.id ?? email._id ?? i} className="px-5 py-4">
                <p className="text-sm font-medium text-gray-800">
                  {email.subject ?? email.from ?? email.title ?? 'Email'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {email.from ?? email.email ?? ''}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <AdminEmptyState icon={Mail} message="No emails yet." />
        )}
      </AdminCollectionCard>
    </div>
  );
};

export default Emails;
