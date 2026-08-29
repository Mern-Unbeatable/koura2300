import { ADMIN_BLOG_EMPTY_CLASS, ADMIN_BLOG_GRID_CLASS } from './blogData';
import BlogPostCard from './BlogPostCard';

const BlogPostGrid = ({ copy, posts, onEditPost, onDeletePost }) => {
  if (posts.length === 0) {
    return <p className={ADMIN_BLOG_EMPTY_CLASS}>{copy.emptyMessage}</p>;
  }

  return (
    <section
      className={ADMIN_BLOG_GRID_CLASS}
      aria-label={copy.gridRegionLabel}
    >
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          copy={copy}
          post={post}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
        />
      ))}
    </section>
  );
};

export default BlogPostGrid;
