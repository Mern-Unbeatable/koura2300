import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';
import { useAdminCollection } from '../../hooks/useAdminCollection';
import API_ENDPOINTS from '../../services/httpEndpoint';
import {
  AdminPageHeader,
  AdminCollectionCard,
  AdminLoadingState,
  AdminErrorState,
  AdminEmptyState,
} from '../../components/admin/AdminCollectionUI';

const Jobs = () => {
  const { items: jobs, loading, error, searchQuery, setSearchQuery } =
    useAdminCollection(API_ENDPOINTS.JOBS.LIST);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Jobs"
        description="Post and manage job listings."
        action={
          <button
            type="button"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-orange-600/20"
          >
            <Plus size={16} aria-hidden="true" />
            Post Job
          </button>
        }
      />

      <AdminCollectionCard
        searchId="jobs-search"
        searchLabel="Search jobs"
        searchPlaceholder="Search jobs..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        {loading ? (
          <AdminLoadingState label="Loading job listings" />
        ) : error ? (
          <AdminErrorState
            icon={ClipboardList}
            message="Failed to load job listings. Please try again."
          />
        ) : jobs.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {jobs.map((job, i) => (
              <li key={job.id ?? job._id ?? i} className="px-5 py-4">
                <p className="text-sm font-medium text-gray-800">
                  {job.title ?? 'Job'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {job.location ?? job.type ?? ''}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <AdminEmptyState icon={ClipboardList} message="No job listings yet." />
        )}
      </AdminCollectionCard>
    </div>
  );
};

export default Jobs;
