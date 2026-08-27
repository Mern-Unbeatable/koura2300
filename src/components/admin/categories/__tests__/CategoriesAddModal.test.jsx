import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoriesAddModal from '../CategoriesAddModal';
import { CATEGORIES_COPY } from '../categoriesCopy';
import { CATEGORIES_ADD_KIND } from '../categoriesData';
import { buildCategorySeed } from '../categoriesUtils';

const categories = buildCategorySeed();
const categoryOptions = categories.map((category) => ({
  id: category.id,
  label: category.name,
}));
const lighting = categories.find((item) => item.name === 'Lighting');

const renderCategoryModal = (overrides = {}) =>
  render(
    <CategoriesAddModal
      kind={CATEGORIES_ADD_KIND.CATEGORY}
      draftName=""
      draftError={null}
      draftCategoryId=""
      draftCategoryError={null}
      categoryOptions={categoryOptions}
      onClose={jest.fn()}
      onDraftNameChange={jest.fn()}
      onDraftCategoryChange={jest.fn()}
      onSubmit={jest.fn((event) => event.preventDefault())}
      {...overrides}
    />,
  );

const renderSubcategoryModal = (overrides = {}) =>
  render(
    <CategoriesAddModal
      kind={CATEGORIES_ADD_KIND.SUBCATEGORY}
      draftName=""
      draftError={null}
      draftCategoryId={lighting.id}
      draftCategoryError={null}
      categoryOptions={categoryOptions}
      onClose={jest.fn()}
      onDraftNameChange={jest.fn()}
      onDraftCategoryChange={jest.fn()}
      onSubmit={jest.fn((event) => event.preventDefault())}
      {...overrides}
    />,
  );

describe('CategoriesAddModal', () => {
  it('renders the Figma Add Category dialog with animated overlay', () => {
    renderCategoryModal();

    expect(
      screen.getByRole('dialog', { name: CATEGORIES_COPY.addCategoryModalTitle }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(CATEGORIES_COPY.categoryNameLabel)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(CATEGORIES_COPY.categoryNamePlaceholder),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: CATEGORIES_COPY.saveLabel })).toBeInTheDocument();
    expect(screen.getByTestId('categories-add-overlay').className).toContain('animate-fade-in');
    expect(screen.getByRole('dialog').className).toContain('animate-page-enter');
  });

  it('renders the Figma Add Sub-category dialog with category select and name field', () => {
    renderSubcategoryModal({ draftCategoryId: '' });

    expect(
      screen.getByRole('dialog', { name: CATEGORIES_COPY.addSubcategoryModalTitle }),
    ).toBeInTheDocument();
    expect(screen.getByText(CATEGORIES_COPY.categorySelectLabel)).toBeInTheDocument();
    expect(screen.getByText(CATEGORIES_COPY.categorySelectPlaceholder)).toBeInTheDocument();
    expect(screen.getByLabelText(CATEGORIES_COPY.subcategoryNameLabel)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(CATEGORIES_COPY.subcategoryNamePlaceholder),
    ).toBeInTheDocument();
  });

  it('shows inline validation errors for Add Category', () => {
    renderCategoryModal({ draftError: CATEGORIES_COPY.errors.required });

    expect(screen.getByText(CATEGORIES_COPY.errors.required)).toBeInTheDocument();
  });

  it('shows inline validation errors for Add Sub-category', () => {
    renderSubcategoryModal({
      draftCategoryError: CATEGORIES_COPY.errors.categoryRequired,
      draftError: CATEGORIES_COPY.errors.required,
    });

    expect(screen.getByText(CATEGORIES_COPY.errors.categoryRequired)).toBeInTheDocument();
    expect(screen.getByText(CATEGORIES_COPY.errors.required)).toBeInTheDocument();
  });

  it('closes from overlay click like the suspend modal', () => {
    const onClose = jest.fn();
    renderCategoryModal({ onClose });

    fireEvent.click(screen.getByTestId('categories-add-overlay'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes from the lucide close icon', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    renderCategoryModal({ onClose });

    await user.click(screen.getByRole('button', { name: CATEGORIES_COPY.closeLabel }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('wires category and subcategory field changes', async () => {
    const user = userEvent.setup();
    const onDraftNameChange = jest.fn();
    const onDraftCategoryChange = jest.fn();

    renderSubcategoryModal({ onDraftNameChange, onDraftCategoryChange });

    await user.type(
      screen.getByPlaceholderText(CATEGORIES_COPY.subcategoryNamePlaceholder),
      'Emergency Lighting',
    );
    expect(onDraftNameChange).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: CATEGORIES_COPY.categorySelectLabel }));
    await user.click(screen.getByRole('option', { name: 'Security' }));

    expect(onDraftCategoryChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: expect.any(String) } }),
    );
  });
});
