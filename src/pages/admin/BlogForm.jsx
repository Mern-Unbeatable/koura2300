import BlogFormView from '../../components/admin/blogForm/BlogFormView';
import useAdminBlogForm from '../../hooks/useAdminBlogForm';
import { useSEO } from '../../hooks/useSEO';

const BlogForm = () => {
  const formProps = useAdminBlogForm();
  useSEO(formProps.seo);

  return <BlogFormView {...formProps} />;
};

export default BlogForm;
