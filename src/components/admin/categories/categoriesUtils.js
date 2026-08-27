import { CATALOG_COLLECTIONS } from '../../catalog/catalogRegistry';
import {
  CATEGORIES_COPY,
  CATEGORIES_VALIDATION,
  getCategoriesValidationMessage,
} from './categoriesCopy';
import { CATEGORIES_NAME_MAX_LENGTH } from './categoriesData';

const slugifyName = (name) =>
  String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const createCategoryId = (name) => `category-${slugifyName(name)}`;

export const createSubcategoryId = (categoryId, name) =>
  `subcategory-${slugifyName(categoryId)}-${slugifyName(name)}`;

export const buildCategorySeed = () =>
  CATALOG_COLLECTIONS.map((collection) => ({
    id: createCategoryId(collection.title),
    name: collection.title,
  }));

const getUniqueSubcategoryNames = (services) =>
  [...new Set(services.map((service) => service.category))];

export const buildSubcategorySeedForCollection = (categoryId, services) =>
  getUniqueSubcategoryNames(services).map((name) => ({
    id: createSubcategoryId(categoryId, name),
    name,
    categoryId,
  }));

export const buildAllSubcategorySeed = (categories) => {
  const categoryIdByName = new Map(
    categories.map((category) => [category.name, category.id]),
  );

  return CATALOG_COLLECTIONS.flatMap((collection) => {
    const categoryId = categoryIdByName.get(collection.title);
    if (!categoryId) {
      return [];
    }

    return buildSubcategorySeedForCollection(categoryId, collection.services);
  });
};

export const buildSubcategorySeedForCategory = (categories, categoryName) => {
  const category = categories.find((item) => item.name === categoryName);
  const collection = CATALOG_COLLECTIONS.find((item) => item.title === categoryName);

  if (!category || !collection) {
    return [];
  }

  return buildSubcategorySeedForCollection(category.id, collection.services);
};

export const normalizeItemName = (name) => String(name ?? '').trim();

export const isDuplicateName = (items, name) => {
  const normalized = normalizeItemName(name).toLowerCase();

  return items.some((item) => item.name.toLowerCase() === normalized);
};

export const validateItemName = (name, items) => {
  const normalized = normalizeItemName(name);

  if (!normalized) {
    return CATEGORIES_VALIDATION.REQUIRED;
  }

  if (normalized.length > CATEGORIES_NAME_MAX_LENGTH) {
    return CATEGORIES_VALIDATION.TOO_LONG;
  }

  if (isDuplicateName(items, normalized)) {
    return CATEGORIES_VALIDATION.DUPLICATE;
  }

  return null;
};

export const getValidationErrorMessage = (code) => getCategoriesValidationMessage(code);

export const addNamedItem = (items, name, createId) => {
  const normalized = normalizeItemName(name);

  return [
    ...items,
    {
      id: createId(normalized),
      name: normalized,
    },
  ];
};

export const removeItemById = (items, itemId) =>
  items.filter((item) => item.id !== itemId);

export const removeSubcategoriesByCategoryId = (subcategories, categoryId) =>
  subcategories.filter((item) => item.categoryId !== categoryId);

export const filterSubcategoriesByCategoryId = (subcategories, categoryId) =>
  subcategories.filter((item) => item.categoryId === categoryId);

export const reorderItemsById = (items, draggedId, targetId) => {
  if (draggedId === targetId) {
    return items;
  }

  const sourceIndex = items.findIndex((item) => item.id === draggedId);
  const targetIndex = items.findIndex((item) => item.id === targetId);

  if (sourceIndex < 0 || targetIndex < 0) {
    return items;
  }

  const nextItems = [...items];
  const [movedItem] = nextItems.splice(sourceIndex, 1);
  nextItems.splice(targetIndex, 0, movedItem);
  return nextItems;
};

export const resolveSelectedCategoryId = (categories, preferredId) => {
  if (categories.some((item) => item.id === preferredId)) {
    return preferredId;
  }

  return categories[0]?.id ?? null;
};

export const getAddModalTitle = (kind) => {
  if (kind === 'subcategory') {
    return CATEGORIES_COPY.addSubcategoryModalTitle;
  }

  return CATEGORIES_COPY.addCategoryModalTitle;
};
