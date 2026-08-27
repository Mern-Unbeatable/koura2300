import { CATEGORIES_COPY } from './categoriesCopy';
import {
  CATEGORIES_HEADER_CLASS,
  CATEGORIES_PAGE_CLASS,
  CATEGORIES_SECTIONS_CLASS,
  CATEGORIES_SUBTITLE_CLASS,
  CATEGORIES_TITLE_CLASS,
} from './categoriesData';
import CategoriesAddModal from './CategoriesAddModal';
import CategoriesSection from './CategoriesSection';

const CategoriesHeader = ({ title, subtitle }) => (
  <header className={CATEGORIES_HEADER_CLASS}>
    <h1 className={CATEGORIES_TITLE_CLASS}>{title}</h1>
    <p className={CATEGORIES_SUBTITLE_CLASS}>{subtitle}</p>
  </header>
);

const CategoriesView = ({
  copy = CATEGORIES_COPY,
  categories,
  subcategories,
  selectedCategoryId,
  draftName,
  draftError,
  addModalKind,
  onSelectCategory,
  onDeleteCategory,
  onDeleteSubcategory,
  onOpenAddCategory,
  onOpenAddSubcategory,
  onCloseAddModal,
  onDraftNameChange,
  onSubmitAddModal,
  onReorderCategory,
  onReorderSubcategory,
}) => (
  <div className={CATEGORIES_PAGE_CLASS}>
    <CategoriesHeader title={copy.title} subtitle={copy.subtitle} />

    <div className={CATEGORIES_SECTIONS_CLASS}>
      <CategoriesSection
        title={copy.categorySection}
        addLabel={copy.addCategory}
        items={categories}
        emptyLabel={copy.emptySubcategories}
        selectedItemId={selectedCategoryId}
        getDeleteLabel={copy.deleteCategoryLabel}
        onAdd={onOpenAddCategory}
        onSelect={onSelectCategory}
        onDelete={onDeleteCategory}
        onReorder={onReorderCategory}
      />

      <CategoriesSection
        title={copy.subcategorySection}
        addLabel={copy.addSubcategory}
        items={subcategories}
        emptyLabel={copy.emptySubcategories}
        getDeleteLabel={copy.deleteSubcategoryLabel}
        onAdd={onOpenAddSubcategory}
        onDelete={onDeleteSubcategory}
        onReorder={onReorderSubcategory}
      />
    </div>

    {addModalKind ? (
      <CategoriesAddModal
        kind={addModalKind}
        draftName={draftName}
        draftError={draftError}
        onClose={onCloseAddModal}
        onDraftNameChange={onDraftNameChange}
        onSubmit={onSubmitAddModal}
      />
    ) : null}
  </div>
);

export default CategoriesView;
