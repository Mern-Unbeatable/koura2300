import AdminPagination from '../shared/AdminPagination';
import { ADS_COPY } from './adsCopy';
import { ADS_PAGE_CLASS } from './adsData';
import AdsDeleteModal from './AdsDeleteModal';
import AdsGrid from './AdsGrid';
import AdsHeader from './AdsHeader';

const AdsView = ({
  copy = ADS_COPY,
  ads,
  categoryOptions,
  subcategoryOptions,
  selectedCategoryId,
  selectedSubcategoryId,
  pagination,
  deleteAdTitle = '',
  isDeleteModalOpen = false,
  onCategoryFilterChange,
  onSubcategoryFilterChange,
  onAddNewAd,
  onEditAd,
  onDeleteAd,
  onCloseDeleteModal,
  onConfirmDeleteAd,
}) => (
  <div className={ADS_PAGE_CLASS}>
    <AdsHeader
      title={copy.title}
      subtitle={copy.subtitle}
      addNewAdLabel={copy.addNewAd}
      sortByLabel={copy.sortByLabel}
      categoryFilterLabel={copy.categoryFilterLabel}
      subcategoryFilterLabel={copy.subcategoryFilterLabel}
      categoryOptions={categoryOptions}
      subcategoryOptions={subcategoryOptions}
      selectedCategoryId={selectedCategoryId}
      selectedSubcategoryId={selectedSubcategoryId}
      onCategoryFilterChange={onCategoryFilterChange}
      onSubcategoryFilterChange={onSubcategoryFilterChange}
      onAddNewAd={onAddNewAd}
    />

    <AdsGrid copy={copy} ads={ads} onEditAd={onEditAd} onDeleteAd={onDeleteAd} />

    {pagination?.isVisible ? (
      <AdminPagination
        copy={copy}
        {...pagination}
        regionLabel={copy.pagination.regionLabel}
        testId="ads-pagination"
      />
    ) : null}

    {isDeleteModalOpen ? (
      <AdsDeleteModal
        copy={copy}
        adTitle={deleteAdTitle}
        onClose={onCloseDeleteModal}
        onConfirm={onConfirmDeleteAd}
      />
    ) : null}
  </div>
);

export default AdsView;
