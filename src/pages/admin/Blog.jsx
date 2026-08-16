import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { useAdminCollection } from '../../hooks/useAdminCollection';
import API_ENDPOINTS from '../../services/httpEndpoint';
import {
  AdminPageHeader,
  AdminCollectionCard,
  AdminLoadingState,
  AdminErrorState,
  AdminEmptyState,
} from '../../components/admin/AdminCollectionUI';

const Blog = () => {
  const { items: posts, loading, error, searchQuery, setSearchQuery } =
    useAdminCollection(API_ENDPOINTS.BLOG.LIST);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Blog"
        description="Write and manage blog posts."
        action={
          <button
            type="button"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-orange-600/20"
          >
            <Plus size={16} aria-hidden="true" />
            New Post
          </button>
        }
      />

      <AdminCollectionCard
        searchId="blog-search"
        searchLabel="Search blog posts"
        searchPlaceholder="Search posts..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        {loading ? (
          <AdminLoadingState label="Loading blog posts" />
        ) : error ? (
          <AdminErrorState
            icon={FileText}
            message="Failed to load blog posts. Please try again."
          />
        ) : posts.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {posts.map((post, i) => (
              <li key={post.id ?? post._id ?? i} className="px-5 py-4">
                <p className="text-sm font-medium text-gray-800">
                  {post.title ?? 'Post'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {post.publishedAt ?? post.createdAt ?? ''}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <AdminEmptyState icon={FileText} message="No blog posts yet." />
        )}
      </AdminCollectionCard>
    </div>
  );
};

export default Blog;
