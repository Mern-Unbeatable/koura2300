import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { CATEGORIES_COPY } from '../../components/admin/categories/categoriesCopy';
import {
  buildCategorySeed,
  buildSubcategorySeedForCategory,
} from '../../components/admin/categories/categoriesUtils';
import useAdminCategories from '../useAdminCategories';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe('useAdminCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('seeds categories and lighting subcategories with lighting selected', () => {
    const { result } = renderHook(() => useAdminCategories());
    const seed = buildCategorySeed();
    const lighting = seed.find((item) => item.name === 'Lighting');

    expect(result.current.categories).toHaveLength(seed.length);
    expect(result.current.selectedCategoryId).toBe(lighting.id);
    expect(result.current.subcategories).toEqual(
      buildSubcategorySeedForCategory(seed, 'Lighting'),
    );
    expect(result.current.copy.title).toBe(CATEGORIES_COPY.title);
  });

  it('filters subcategories when selecting another category', () => {
    const { result } = renderHook(() => useAdminCategories());
    const deck = result.current.categories.find((item) => item.name === 'Deck');

    act(() => {
      result.current.onSelectCategory(deck.id);
    });

    expect(result.current.selectedCategoryId).toBe(deck.id);
    expect(result.current.subcategories).toEqual(
      buildSubcategorySeedForCategory(result.current.categories, 'Deck'),
    );
    expect(result.current.subcategories.length).toBeGreaterThan(0);
  });

  it('adds a category after validating the draft name', () => {
    const { result } = renderHook(() => useAdminCategories());

    act(() => {
      result.current.onOpenAddCategory();
    });

    act(() => {
      result.current.onSubmitAddModal({ preventDefault: jest.fn() });
    });

    expect(result.current.draftError).toBe(CATEGORIES_COPY.errors.required);
    expect(result.current.addModalKind).toBe('category');

    act(() => {
      result.current.onDraftNameChange({ target: { value: 'Solar Panels' } });
    });

    act(() => {
      result.current.onSubmitAddModal({ preventDefault: jest.fn() });
    });

    expect(result.current.addModalKind).toBeNull();
    expect(result.current.categories.some((item) => item.name === 'Solar Panels')).toBe(
      true,
    );
    expect(toast.success).toHaveBeenCalledWith(CATEGORIES_COPY.toasts.categoryAdded);
  });

  it('prefills the subcategory modal with the selected category', () => {
    const { result } = renderHook(() => useAdminCategories());
    const deck = result.current.categories.find((item) => item.name === 'Deck');

    act(() => {
      result.current.onSelectCategory(deck.id);
    });

    act(() => {
      result.current.onOpenAddSubcategory();
    });

    expect(result.current.addModalKind).toBe('subcategory');
    expect(result.current.draftCategoryId).toBe(deck.id);
    expect(result.current.categoryOptions.some((option) => option.id === deck.id)).toBe(true);
  });

  it('requires a category before saving a subcategory', () => {
    const { result } = renderHook(() => useAdminCategories());

    act(() => {
      result.current.onOpenAddSubcategory();
      result.current.onDraftCategoryChange({ target: { value: '' } });
      result.current.onDraftNameChange({ target: { value: 'Emergency Lighting' } });
    });

    act(() => {
      result.current.onSubmitAddModal({ preventDefault: jest.fn() });
    });

    expect(result.current.draftCategoryError).toBe(CATEGORIES_COPY.errors.categoryRequired);
  });

  it('adds a subcategory under the category chosen in the modal', () => {
    const { result } = renderHook(() => useAdminCategories());
    const security = result.current.categories.find((item) => item.name === 'Security');

    act(() => {
      result.current.onOpenAddSubcategory();
      result.current.onDraftCategoryChange({ target: { value: security.id } });
      result.current.onDraftNameChange({ target: { value: 'Emergency Lighting' } });
    });

    act(() => {
      result.current.onSubmitAddModal({ preventDefault: jest.fn() });
    });

    expect(result.current.selectedCategoryId).toBe(security.id);
    expect(
      result.current.subcategories.some((item) => item.name === 'Emergency Lighting'),
    ).toBe(true);
    expect(toast.success).toHaveBeenCalledWith(CATEGORIES_COPY.toasts.subcategoryAdded);
  });

  it('deletes categories and their nested subcategories', () => {
    const { result } = renderHook(() => useAdminCategories());
    const lighting = result.current.categories.find((item) => item.name === 'Lighting');
    const nextSelected = result.current.categories.find((item) => item.id !== lighting.id);

    act(() => {
      result.current.onDeleteCategory(lighting.id);
    });

    expect(result.current.categories.some((item) => item.id === lighting.id)).toBe(false);
    expect(
      result.current.subcategories.every((item) => item.categoryId !== lighting.id),
    ).toBe(true);
    expect(result.current.selectedCategoryId).toBe(nextSelected.id);
    expect(toast.success).toHaveBeenCalledWith(CATEGORIES_COPY.toasts.categoryDeleted);
  });

  it('reorders categories by drag target id', () => {
    const { result } = renderHook(() => useAdminCategories());
    const [first, second] = result.current.categories;

    act(() => {
      result.current.onReorderCategory(first.id, second.id);
    });

    expect(result.current.categories[0].id).toBe(second.id);
    expect(result.current.categories[1].id).toBe(first.id);
  });
});
