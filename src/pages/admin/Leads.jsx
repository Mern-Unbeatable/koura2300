import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { useAdminCollection } from '../../hooks/useAdminCollection';
import API_ENDPOINTS from '../../services/httpEndpoint';
import {
  AdminPageHeader,
  AdminCollectionCard,
  AdminLoadingState,
  AdminErrorState,
  AdminEmptyState,
} from '../../components/admin/AdminCollectionUI';

const Leads = () => {
  const { items: leads, loading, error, searchQuery, setSearchQuery } =
    useAdminCollection(API_ENDPOINTS.LEADS.LIST);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Leads"
        description="Track and manage your sales leads."
        action={
          <button
            type="button"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-orange-600/20"
          >
            <UserPlus size={16} aria-hidden="true" />
            Add Lead
          </button>
        }
      />

      <AdminCollectionCard
        searchId="leads-search"
        searchLabel="Search leads"
        searchPlaceholder="Search leads..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        {loading ? (
          <AdminLoadingState label="Loading leads" />
        ) : error ? (
          <AdminErrorState
            icon={Users}
            message="Failed to load leads. Please try again."
          />
        ) : leads.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {leads.map((lead, i) => (
              <li key={lead.id ?? lead._id ?? i} className="px-5 py-4">
                <p className="text-sm font-medium text-gray-800">
                  {lead.name ?? lead.fullName ?? 'Lead'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{lead.email ?? ''}</p>
              </li>
            ))}
          </ul>
        ) : (
          <AdminEmptyState icon={Users} message="No leads yet." />
        )}
      </AdminCollectionCard>
    </div>
  );
};

export default Leads;
