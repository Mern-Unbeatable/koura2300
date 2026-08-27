import { CATEGORIES_COPY, CATEGORIES_VALIDATION } from '../categoriesCopy';
import { CATEGORIES_NAME_MAX_LENGTH } from '../categoriesData';
import {
  addNamedItem,
  buildCategorySeed,
  buildSubcategorySeed,
  createCategoryId,
  createSubcategoryId,
  isDuplicateName,
  normalizeItemName,
  removeItemById,
  reorderItemsById,
  validateItemName,
} from '../categoriesUtils';

describe('categoriesUtils', () => {
  it('builds category seed from catalog collections with stable ids', () => {
    const seed = buildCategorySeed();

    expect(seed.length).toBeGreaterThan(0);
    expect(seed[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Lighting',
      }),
    );
    expect(seed.map((item) => item.name)).toContain('Walls & Ceilings');
  });

  it('builds lighting subcategory seed linked to lighting category', () => {
    const categories = buildCategorySeed();
    const lighting = categories.find((item) => item.name === 'Lighting');
    const subcategories = buildSubcategorySeed(lighting.id);

    expect(subcategories.length).toBeGreaterThan(0);
    expect(subcategories.every((item) => item.categoryId === lighting.id)).toBe(true);
    expect(subcategories.map((item) => item.name)).toEqual(
      expect.arrayContaining(['Indoor Lighting', 'Outdoor Lighting', 'Smart Lighting']),
    );
  });

  it('normalizes names and detects duplicates case-insensitively', () => {
    expect(normalizeItemName('  Deck  ')).toBe('Deck');
    expect(
      isDuplicateName([{ id: '1', name: 'Fence' }], ' fence '),
    ).toBe(true);
    expect(
      isDuplicateName([{ id: '1', name: 'Fence' }], 'Garden'),
    ).toBe(false);
  });

  it('validates empty, too long, and duplicate names with copy keys', () => {
    expect(validateItemName('', [])).toBe(CATEGORIES_VALIDATION.REQUIRED);
    expect(
      validateItemName('a'.repeat(CATEGORIES_NAME_MAX_LENGTH + 1), []),
    ).toBe(CATEGORIES_VALIDATION.TOO_LONG);
    expect(
      validateItemName('Lighting', [{ id: '1', name: 'Lighting' }]),
    ).toBe(CATEGORIES_VALIDATION.DUPLICATE);
    expect(validateItemName('New Category', [])).toBeNull();
  });

  it('adds, removes, and reorders items immutably', () => {
    const initial = [
      { id: 'a', name: 'A' },
      { id: 'b', name: 'B' },
      { id: 'c', name: 'C' },
    ];

    const withAdded = addNamedItem(initial, 'D', createCategoryId);
    expect(withAdded).toHaveLength(4);
    expect(withAdded.at(-1).name).toBe('D');
    expect(initial).toHaveLength(3);

    const withoutB = removeItemById(initial, 'b');
    expect(withoutB.map((item) => item.id)).toEqual(['a', 'c']);

    const reordered = reorderItemsById(initial, 'a', 'c');
    expect(reordered.map((item) => item.id)).toEqual(['b', 'c', 'a']);
  });

  it('creates distinct category and subcategory ids', () => {
    expect(createCategoryId('Lighting')).toMatch(/^category-/);
    expect(createSubcategoryId('Indoor Lighting')).toMatch(/^subcategory-/);
  });

  it('exposes page copy used by the Categories Figma screen', () => {
    expect(CATEGORIES_COPY.title).toBe('Categories');
    expect(CATEGORIES_COPY.addCategory).toContain('Add Category');
    expect(CATEGORIES_COPY.addSubcategory).toContain('Add Sub-category');
  });
});
