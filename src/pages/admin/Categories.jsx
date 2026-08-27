import CategoriesView from '../../components/admin/categories/CategoriesView';
import useAdminCategories from '../../hooks/useAdminCategories';

const Categories = () => {
  const categoriesProps = useAdminCategories();

  return <CategoriesView {...categoriesProps} />;
};

export default Categories;
