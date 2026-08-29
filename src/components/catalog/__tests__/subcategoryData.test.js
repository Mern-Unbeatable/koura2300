import {
  buildSubcategoryCards,
  DEFAULT_SUBCATEGORY_COPY,
  SUBCATEGORY_GRID_CLASS,
  SUBCATEGORY_VIEWPORT,
} from '../subcategoryData';
import { LIGHTING_ALL_CATEGORY, LIGHTING_SERVICES } from '../../lighting/lightingData';

describe('subcategoryData', () => {
  it('builds one card per subcategory excluding the All tab', () => {
    const cards = buildSubcategoryCards(LIGHTING_SERVICES, LIGHTING_ALL_CATEGORY);

    expect(cards.map((card) => card.title)).toEqual([
      'Indoor Lighting',
      'Outdoor Lighting',
      'Light Fixture Services',
      'Outlet & Switch Services',
      'Smart Lighting',
      'Lighting Repairs',
    ]);
    expect(cards.every((card) => card.id !== LIGHTING_ALL_CATEGORY)).toBe(true);
  });

  it('uses the lowest starting price for each subcategory card', () => {
    const cards = buildSubcategoryCards(LIGHTING_SERVICES, LIGHTING_ALL_CATEGORY);
    const indoor = cards.find((card) => card.id === 'Indoor Lighting');

    expect(indoor.startingPrice).toBe(75);
    expect(DEFAULT_SUBCATEGORY_COPY.startingAt(indoor.startingPrice)).toBe('Starting at $75');
  });

  it('keeps tablet-style grid columns through laptop widths', () => {
    expect(SUBCATEGORY_VIEWPORT.TABLET).toBe(768);
    expect(SUBCATEGORY_VIEWPORT.LAPTOP).toBe(1020);
    expect(SUBCATEGORY_GRID_CLASS).toContain('min-[768px]:grid-cols-2');
    expect(SUBCATEGORY_GRID_CLASS).toContain('min-[1440px]:grid-cols-3');
    expect(SUBCATEGORY_GRID_CLASS).not.toContain('min-[1020px]:grid-cols-3');
  });
});
