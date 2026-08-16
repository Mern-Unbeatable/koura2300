import React from 'react';
import { Store } from 'lucide-react';
import { useAdminCollection } from '../../hooks/useAdminCollection';
import API_ENDPOINTS from '../../services/httpEndpoint';
import {
  AdminPageHeader,
  AdminSearchField,
  AdminLoadingState,
} from '../../components/admin/AdminCollectionUI';

const COLUMNS = [
  'Order ID',
  'Marketplace',
  'Customer',
  'Date',
  'Total',
  'Status',
];

const MarketplaceOrders = () => {
  const { items: orders, loading, error, searchQuery, setSearchQuery } =
    useAdminCollection(API_ENDPOINTS.MARKETPLACE_ORDERS.LIST);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Marketplace Orders"
        description="Orders received from marketplace channels."
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <AdminSearchField
          id="marketplace-orders-search"
          label="Search marketplace orders"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search marketplace orders..."
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="px-5 py-20 text-center">
                    <AdminLoadingState label="Loading marketplace orders" />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
                    className="px-5 py-20 text-center text-red-400 text-sm"
                  >
                    <p role="alert">Failed to load orders. Please try again.</p>
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((order, i) => (
                  <tr
                    key={order.id ?? order._id ?? i}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 text-gray-700">
                      {order.id ?? order._id ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      {order.marketplace ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      {order.customer ?? order.customerName ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {order.date ?? order.createdAt ?? '—'}
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      {order.total != null ? `$${order.total}` : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {order.status ?? '—'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={COLUMNS.length} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <Store
                        size={36}
                        className="text-gray-200"
                        aria-hidden="true"
                      />
                      <p>No marketplace orders yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceOrders;
