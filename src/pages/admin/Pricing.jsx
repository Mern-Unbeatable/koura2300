import React from 'react';
import { DollarSign, Plus } from 'lucide-react';
import { useAdminCollection } from '../../hooks/useAdminCollection';
import API_ENDPOINTS from '../../services/httpEndpoint';
import {
  AdminPageHeader,
  AdminCollectionCard,
  AdminLoadingState,
  AdminErrorState,
  AdminEmptyState,
} from '../../components/admin/AdminCollectionUI';

const Pricing = () => {
  const { items: plans, loading, error, searchQuery, setSearchQuery } =
    useAdminCollection(API_ENDPOINTS.PRICING.LIST);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Pricing"
        description="Manage your pricing plans and tiers."
        action={
          <button
            type="button"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-orange-600/20"
          >
            <Plus size={16} aria-hidden="true" />
            Add Plan
          </button>
        }
      />

      <AdminCollectionCard
        searchId="pricing-search"
        searchLabel="Search pricing plans"
        searchPlaceholder="Search plans..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        {loading ? (
          <AdminLoadingState label="Loading pricing plans" />
        ) : error ? (
          <AdminErrorState
            icon={DollarSign}
            message="Failed to load pricing plans. Please try again."
          />
        ) : plans.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {plans.map((plan, i) => (
              <li key={plan.id ?? plan._id ?? i} className="px-5 py-4">
                <p className="text-sm font-medium text-gray-800">
                  {plan.name ?? plan.title ?? 'Plan'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {plan.price != null ? `$${plan.price}` : ''}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <AdminEmptyState icon={DollarSign} message="No pricing plans yet." />
        )}
      </AdminCollectionCard>
    </div>
  );
};

export default Pricing;
