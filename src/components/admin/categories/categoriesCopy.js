export const CATEGORIES_COPY = {
  title: 'Categories',
  subtitle:
    'Organise the service categories tradesmen offer. Drag to reorder, create new ones, and manage visibility.',
  categorySection: 'Category',
  subcategorySection: 'Sub-category',
  addCategory: '+ Add Category',
  addSubcategory: '+ Add Sub-category',
  addCategoryModalTitle: 'Add Category',
  addSubcategoryModalTitle: 'Add Sub-category',
  nameLabel: 'Name',
  namePlaceholder: 'Enter a name',
  cancelLabel: 'Cancel',
  saveLabel: 'Save',
  closeLabel: 'Close',
  emptySubcategories: 'No sub-categories yet. Add one to get started.',
  deleteCategoryLabel: (name) => `Delete category ${name}`,
  deleteSubcategoryLabel: (name) => `Delete sub-category ${name}`,
  errors: {
    required: 'Name is required.',
    tooLong: 'Name is too long.',
    duplicate: 'This name already exists.',
  },
  toasts: {
    categoryAdded: 'Category added.',
    subcategoryAdded: 'Sub-category added.',
    categoryDeleted: 'Category deleted.',
    subcategoryDeleted: 'Sub-category deleted.',
  },
};

export const CATEGORIES_VALIDATION = {
  REQUIRED: 'required',
  TOO_LONG: 'tooLong',
  DUPLICATE: 'duplicate',
};

export const getCategoriesValidationMessage = (code) => {
  if (!code) {
    return null;
  }

  return CATEGORIES_COPY.errors[code] ?? null;
};
