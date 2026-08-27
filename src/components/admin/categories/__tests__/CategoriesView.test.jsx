import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoriesView from '../CategoriesView';
import { CATEGORIES_COPY } from '../categoriesCopy';
import {
  CATEGORIES_CHIP_CLASS,
  CATEGORIES_PAGE_CLASS,
  CATEGORIES_VIEWPORT,
} from '../categoriesData';
import { buildCategorySeed, buildSubcategorySeedForCategory } from '../categoriesUtils';

const categories = buildCategorySeed();
const lighting = categories.find((item) => item.name === 'Lighting');
const subcategories = buildSubcategorySeedForCategory(categories, 'Lighting');

const createCategoriesViewProps = (overrides = {}) => ({
  copy: CATEGORIES_COPY,
  categories,
  subcategories,
  selectedCategoryId: lighting.id,
  draftName: '',
  draftError: null,
  addModalKind: null,
  onSelectCategory: jest.fn(),
  onDeleteCategory: jest.fn(),
  onDeleteSubcategory: jest.fn(),
  onOpenAddCategory: jest.fn(),
  onOpenAddSubcategory: jest.fn(),
  onCloseAddModal: jest.fn(),
  onDraftNameChange: jest.fn(),
  onSubmitAddModal: jest.fn(),
  onReorderCategory: jest.fn(),
  onReorderSubcategory: jest.fn(),
  ...overrides,
});

const renderCategoriesView = (overrides = {}) =>
  render(<CategoriesView {...createCategoriesViewProps(overrides)} />);

describe('CategoriesView', () => {
  it('renders the Categories header and both management cards from Figma', () => {
    renderCategoriesView();

    expect(
      screen.getByRole('heading', { level: 1, name: CATEGORIES_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(CATEGORIES_COPY.subtitle)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: CATEGORIES_COPY.categorySection }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: CATEGORIES_COPY.subcategorySection }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: CATEGORIES_COPY.addCategory }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: CATEGORIES_COPY.addSubcategory }),
    ).toBeInTheDocument();
  });

  it('renders peach category and subcategory chips with delete actions', () => {
    renderCategoriesView();

    const lightingChip = screen.getByTestId(`category-chip-${lighting.id}`);
    expect(lightingChip.className).toContain('bg-[#fff1eb]');
    expect(CATEGORIES_CHIP_CLASS).toContain('bg-[#fff1eb]');
    expect(within(lightingChip).getByText('Lighting')).toBeInTheDocument();
    expect(
      within(lightingChip).getByRole('button', {
        name: CATEGORIES_COPY.deleteCategoryLabel('Lighting'),
      }),
    ).toBeInTheDocument();

    const indoor = subcategories.find((item) => item.name === 'Indoor Lighting');
    expect(screen.getByText('Indoor Lighting')).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: CATEGORIES_COPY.deleteSubcategoryLabel('Indoor Lighting'),
      }),
    ).toBeInTheDocument();
    expect(indoor).toBeTruthy();
  });

  it('wires add, delete, and select handlers', async () => {
    const user = userEvent.setup();
    const props = createCategoriesViewProps();
    render(<CategoriesView {...props} />);

    await user.click(screen.getByRole('button', { name: CATEGORIES_COPY.addCategory }));
    expect(props.onOpenAddCategory).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: CATEGORIES_COPY.addSubcategory }));
    expect(props.onOpenAddSubcategory).toHaveBeenCalledTimes(1);

    const fence = categories.find((item) => item.name === 'Fence');
    await user.click(screen.getByTestId(`category-chip-${fence.id}`));
    expect(props.onSelectCategory).toHaveBeenCalledWith(fence.id);

    await user.click(
      screen.getByRole('button', {
        name: CATEGORIES_COPY.deleteCategoryLabel('Fence'),
      }),
    );
    expect(props.onDeleteCategory).toHaveBeenCalledWith(fence.id);
  });

  it('renders the add modal with inline validation error when open', async () => {
    const user = userEvent.setup();
    const onDraftNameChange = jest.fn();
    const onSubmitAddModal = jest.fn((event) => event.preventDefault());
    const onCloseAddModal = jest.fn();

    renderCategoriesView({
      addModalKind: 'category',
      draftName: '',
      draftError: CATEGORIES_COPY.errors.required,
      onDraftNameChange,
      onSubmitAddModal,
      onCloseAddModal,
    });

    expect(
      screen.getByRole('dialog', { name: CATEGORIES_COPY.addCategoryModalTitle }),
    ).toBeInTheDocument();
    expect(screen.getByText(CATEGORIES_COPY.errors.required)).toBeInTheDocument();

    await user.type(screen.getByLabelText(CATEGORIES_COPY.nameLabel), 'Solar');
    expect(onDraftNameChange).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: CATEGORIES_COPY.cancelLabel }));
    expect(onCloseAddModal).toHaveBeenCalledTimes(1);
  });

  it('keeps responsive page layout tokens for required breakpoints', () => {
    expect(CATEGORIES_VIEWPORT.MOBILE_S).toBe(320);
    expect(CATEGORIES_VIEWPORT.MOBILE_M).toBe(375);
    expect(CATEGORIES_VIEWPORT.MOBILE_L).toBe(425);
    expect(CATEGORIES_VIEWPORT.TABLET).toBe(768);
    expect(CATEGORIES_VIEWPORT.LAPTOP).toBe(1020);
    expect(CATEGORIES_PAGE_CLASS).toContain('flex');
  });
});
