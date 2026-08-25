import { SERVICES_PAGE_CLASS } from './servicesData';
import ServicesGrid from './ServicesGrid';
import ServicesHeader from './ServicesHeader';
import ServicesPagination from './ServicesPagination';

const ServicesView = ({
  copy,
  services,
  summarySubtitle,
  categoryOptions,
  subcategoryOptions,
  selectedCategoryId,
  selectedSubcategoryId,
  onCategoryFilterChange,
  onSubcategoryFilterChange,
  onAddNewService,
  onEditService,
  onDeleteService,
  pagination,
}) => (
  <div className={SERVICES_PAGE_CLASS}>
    <ServicesHeader
      title={copy.title}
      summarySubtitle={summarySubtitle}
      addNewServiceLabel={copy.addNewService}
      sortByLabel={copy.sortByLabel}
      categoryFilterLabel={copy.categoryFilterLabel}
      subcategoryFilterLabel={copy.subcategoryFilterLabel}
      categoryOptions={categoryOptions}
      subcategoryOptions={subcategoryOptions}
      selectedCategoryId={selectedCategoryId}
      selectedSubcategoryId={selectedSubcategoryId}
      onCategoryFilterChange={onCategoryFilterChange}
      onSubcategoryFilterChange={onSubcategoryFilterChange}
      onAddNewService={onAddNewService}
    />
    <ServicesGrid
      copy={copy}
      services={services}
      onEditService={onEditService}
      onDeleteService={onDeleteService}
    />
    <ServicesPagination copy={copy} {...pagination} />
  </div>
);

export default ServicesView;
