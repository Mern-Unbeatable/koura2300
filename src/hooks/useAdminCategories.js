import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { CATEGORIES_COPY, CATEGORIES_VALIDATION } from '../components/admin/categories/categoriesCopy';
import { CATEGORIES_ADD_KIND } from '../components/admin/categories/categoriesData';
import {
  addNamedItem,
  buildAllSubcategorySeed,
  buildCategorySeed,
  createCategoryId,
  createSubcategoryId,
  filterSubcategoriesByCategoryId,
  getValidationErrorMessage,
  normalizeItemName,
  removeItemById,
  removeSubcategoriesByCategoryId,
  reorderItemsById,
  resolveSelectedCategoryId,
  validateItemName,
} from '../components/admin/categories/categoriesUtils';

const INITIAL_CATEGORIES = buildCategorySeed();
const INITIAL_LIGHTING_CATEGORY =
  INITIAL_CATEGORIES.find((item) => item.name === 'Lighting') ?? null;
const INITIAL_SUBCATEGORIES = buildAllSubcategorySeed(INITIAL_CATEGORIES);

const useAdminCategories = () => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [subcategories, setSubcategories] = useState(INITIAL_SUBCATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    INITIAL_LIGHTING_CATEGORY?.id ?? null,
  );
  const [addModalKind, setAddModalKind] = useState(null);
  const [draftName, setDraftName] = useState('');
  const [draftError, setDraftError] = useState(null);
  const [draftCategoryId, setDraftCategoryId] = useState('');
  const [draftCategoryError, setDraftCategoryError] = useState(null);

  const categoryOptions = useMemo(
    () => categories.map((category) => ({ id: category.id, label: category.name })),
    [categories],
  );

  const visibleSubcategories = useMemo(
    () => filterSubcategoriesByCategoryId(subcategories, selectedCategoryId),
    [selectedCategoryId, subcategories],
  );

  const resetAddModal = useCallback(() => {
    setAddModalKind(null);
    setDraftName('');
    setDraftError(null);
    setDraftCategoryId('');
    setDraftCategoryError(null);
  }, []);

  const handleSelectCategory = useCallback((categoryId) => {
    setSelectedCategoryId(categoryId);
  }, []);

  const handleOpenAddCategory = useCallback(() => {
    setAddModalKind(CATEGORIES_ADD_KIND.CATEGORY);
    setDraftName('');
    setDraftError(null);
  }, []);

  const handleOpenAddSubcategory = useCallback(() => {
    setAddModalKind(CATEGORIES_ADD_KIND.SUBCATEGORY);
    setDraftName('');
    setDraftError(null);
    setDraftCategoryId(selectedCategoryId ?? '');
    setDraftCategoryError(null);
  }, [selectedCategoryId]);

  const handleDraftNameChange = useCallback((event) => {
    setDraftName(event.target.value);
    setDraftError(null);
  }, []);

  const handleDraftCategoryChange = useCallback((event) => {
    setDraftCategoryId(event.target.value);
    setDraftCategoryError(null);
  }, []);

  const handleSubmitAddModal = useCallback(
    (event) => {
      event.preventDefault();

      if (addModalKind === CATEGORIES_ADD_KIND.CATEGORY) {
        const validationCode = validateItemName(draftName, categories);
        if (validationCode) {
          setDraftError(getValidationErrorMessage(validationCode));
          return;
        }

        const nextCategories = addNamedItem(categories, draftName, createCategoryId);
        setCategories(nextCategories);
        toast.success(CATEGORIES_COPY.toasts.categoryAdded);
        resetAddModal();
        return;
      }

      const siblingSubcategories = filterSubcategoriesByCategoryId(
        subcategories,
        draftCategoryId,
      );
      if (!draftCategoryId) {
        setDraftCategoryError(
          getValidationErrorMessage(CATEGORIES_VALIDATION.CATEGORY_REQUIRED),
        );
        return;
      }

      const validationCode = validateItemName(draftName, siblingSubcategories);
      if (validationCode) {
        setDraftError(getValidationErrorMessage(validationCode));
        return;
      }

      const normalized = normalizeItemName(draftName);
      setSubcategories((current) => [
        ...current,
        {
          id: createSubcategoryId(draftCategoryId, normalized),
          name: normalized,
          categoryId: draftCategoryId,
        },
      ]);
      setSelectedCategoryId(draftCategoryId);
      toast.success(CATEGORIES_COPY.toasts.subcategoryAdded);
      resetAddModal();
    },
    [addModalKind, categories, draftCategoryId, draftName, resetAddModal, subcategories],
  );

  const handleDeleteCategory = useCallback(
    (categoryId) => {
      setCategories((current) => {
        const nextCategories = removeItemById(current, categoryId);
        setSelectedCategoryId((currentSelected) =>
          resolveSelectedCategoryId(nextCategories, currentSelected),
        );
        return nextCategories;
      });
      setSubcategories((current) => removeSubcategoriesByCategoryId(current, categoryId));
      toast.success(CATEGORIES_COPY.toasts.categoryDeleted);
    },
    [],
  );

  const handleDeleteSubcategory = useCallback((subcategoryId) => {
    setSubcategories((current) => removeItemById(current, subcategoryId));
    toast.success(CATEGORIES_COPY.toasts.subcategoryDeleted);
  }, []);

  const handleReorderCategory = useCallback((draggedId, targetId) => {
    setCategories((current) => reorderItemsById(current, draggedId, targetId));
  }, []);

  const handleReorderSubcategory = useCallback(
    (draggedId, targetId) => {
      setSubcategories((current) => {
        const selectedItems = filterSubcategoriesByCategoryId(
          current,
          selectedCategoryId,
        );
        const reorderedSelected = reorderItemsById(selectedItems, draggedId, targetId);
        let selectedIndex = 0;

        return current.map((item) => {
          if (item.categoryId !== selectedCategoryId) {
            return item;
          }

          const nextItem = reorderedSelected[selectedIndex];
          selectedIndex += 1;
          return nextItem;
        });
      });
    },
    [selectedCategoryId],
  );

  return {
    copy: CATEGORIES_COPY,
    categories,
    subcategories: visibleSubcategories,
    selectedCategoryId,
    draftName,
    draftError,
    draftCategoryId,
    draftCategoryError,
    categoryOptions,
    addModalKind,
    onSelectCategory: handleSelectCategory,
    onDeleteCategory: handleDeleteCategory,
    onDeleteSubcategory: handleDeleteSubcategory,
    onOpenAddCategory: handleOpenAddCategory,
    onOpenAddSubcategory: handleOpenAddSubcategory,
    onCloseAddModal: resetAddModal,
    onDraftNameChange: handleDraftNameChange,
    onDraftCategoryChange: handleDraftCategoryChange,
    onSubmitAddModal: handleSubmitAddModal,
    onReorderCategory: handleReorderCategory,
    onReorderSubcategory: handleReorderSubcategory,
  };
};

export default useAdminCategories;
