import { ADMIN_BLOG_COPY } from './blogCopy';
import { ADMIN_BLOG_PAGE_CLASS } from './blogData';
import BlogDeleteModal from './BlogDeleteModal';
import BlogHeader from './BlogHeader';
import BlogPagination from './BlogPagination';
import BlogPostGrid from './BlogPostGrid';

const BlogView = ({
  copy = ADMIN_BLOG_COPY,
  postsCountLabel,
  posts,
  pagination,
  deletePostTitle,
  isDeleteModalOpen = false,
  onAddBlog,
  onEditPost,
  onDeletePost,
  onCloseDeleteModal,
  onConfirmDeletePost,
}) => (
  <div className={ADMIN_BLOG_PAGE_CLASS}>
    <BlogHeader
      title={copy.title}
      postsCountLabel={postsCountLabel}
      addButtonLabel={copy.addButton}
      onAddBlog={onAddBlog}
    />

    <BlogPostGrid
      copy={copy}
      posts={posts}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
    />

    {pagination.isVisible ? <BlogPagination copy={copy} {...pagination} /> : null}

    {isDeleteModalOpen ? (
      <BlogDeleteModal
        copy={copy}
        postTitle={deletePostTitle}
        onClose={onCloseDeleteModal}
        onConfirm={onConfirmDeletePost}
      />
    ) : null}
  </div>
);

export default BlogView;
