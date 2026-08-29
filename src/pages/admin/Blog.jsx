import BlogView from '../../components/admin/blog/BlogView';
import useAdminBlog from '../../hooks/useAdminBlog';

const Blog = () => {
  const blogProps = useAdminBlog();

  return <BlogView {...blogProps} />;
};

export default Blog;
