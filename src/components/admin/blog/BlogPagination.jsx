import AdminPagination from '../shared/AdminPagination';

const BlogPagination = ({ copy, ...props }) => (
  <AdminPagination
    {...props}
    copy={copy}
    regionLabel={copy.pagination.regionLabel}
    testId="admin-blog-pagination"
  />
);

export default BlogPagination;
