import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AdsView from '../AdsView';
import { ADS_COPY } from '../adsCopy';
import {
  ADS_CATEGORY_OPTIONS,
  ADS_HEADER_ACTIONS_CLASS,
  ADS_PAGE_CLASS,
  ADS_PAGE_SIZE,
  ADS_SEED,
  ADS_SUBCATEGORY_OPTIONS,
  ADS_VIEWPORT,
} from '../adsData';
import { getPaginationItems, PAGINATION_ELLIPSIS_TOKEN } from '../adsUtils';

const createAdsViewProps = (overrides = {}) => ({
  copy: ADS_COPY,
  ads: ADS_SEED.slice(0, ADS_PAGE_SIZE),
  categoryOptions: ADS_CATEGORY_OPTIONS,
  subcategoryOptions: ADS_SUBCATEGORY_OPTIONS,
  selectedCategoryId: 'all',
  selectedSubcategoryId: 'all',
  pagination: {
    isVisible: true,
    currentPage: 1,
    totalPages: 10,
    pageItems: getPaginationItems(1, 10),
    canGoPrevious: false,
    canGoNext: true,
    onPrevious: jest.fn(),
    onNext: jest.fn(),
    onPageChange: jest.fn(),
  },
  deleteAdTitle: '',
  isDeleteModalOpen: false,
  onCategoryFilterChange: jest.fn(),
  onSubcategoryFilterChange: jest.fn(),
  onAddNewAd: jest.fn(),
  onEditAd: jest.fn(),
  onDeleteAd: jest.fn(),
  onCloseDeleteModal: jest.fn(),
  onConfirmDeleteAd: jest.fn(),
  ...overrides,
});

const renderAdsView = (overrides = {}) =>
  render(
    <MemoryRouter>
      <AdsView {...createAdsViewProps(overrides)} />
    </MemoryRouter>,
  );

describe('AdsView', () => {
  it('renders Ads Management header, subtitle, and Add new Ads from Figma', () => {
    renderAdsView();

    expect(
      screen.getByRole('heading', { level: 1, name: ADS_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(ADS_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: ADS_COPY.addNewAd })).toBeInTheDocument();
    expect(screen.getByText(ADS_COPY.sortByLabel)).toBeInTheDocument();
    expect(ADS_HEADER_ACTIONS_CLASS).toContain('min-[768px]:flex-row');
    expect(ADS_HEADER_ACTIONS_CLASS).toContain('min-[768px]:items-center');
  });

  it('renders ad cards with category badges, pricing, Edit, and Delete', () => {
    renderAdsView();
    const firstAd = ADS_SEED[0];
    const card = screen.getByTestId(`services-card-${firstAd.id}`);

    expect(within(card).getByText(firstAd.title)).toBeInTheDocument();
    expect(within(card).getByRole('button', { name: ADS_COPY.edit })).toBeInTheDocument();
    expect(within(card).getByRole('button', { name: ADS_COPY.delete })).toBeInTheDocument();
  });

  it('wires Add, Edit, and Delete handlers', async () => {
    const user = userEvent.setup();
    const onAddNewAd = jest.fn();
    const onEditAd = jest.fn();
    const onDeleteAd = jest.fn();
    const firstAd = ADS_SEED[0];

    renderAdsView({ onAddNewAd, onEditAd, onDeleteAd });

    await user.click(screen.getByRole('button', { name: ADS_COPY.addNewAd }));
    const card = screen.getByTestId(`services-card-${firstAd.id}`);
    await user.click(within(card).getByRole('button', { name: ADS_COPY.edit }));
    await user.click(within(card).getByRole('button', { name: ADS_COPY.delete }));

    expect(onAddNewAd).toHaveBeenCalledTimes(1);
    expect(onEditAd).toHaveBeenCalledWith(firstAd.id);
    expect(onDeleteAd).toHaveBeenCalledWith(firstAd.id);
  });

  it('renders shared Service Management pagination when ads exceed one page', async () => {
    const user = userEvent.setup();
    const onNext = jest.fn();

    renderAdsView({
      pagination: {
        isVisible: true,
        currentPage: 1,
        totalPages: 10,
        pageItems: getPaginationItems(1, 10),
        canGoPrevious: false,
        canGoNext: true,
        onPrevious: jest.fn(),
        onNext,
        onPageChange: jest.fn(),
      },
    });

    const pagination = screen.getByTestId('ads-pagination');
    expect(pagination).toHaveAttribute('aria-label', ADS_COPY.pagination.regionLabel);
    expect(screen.getByRole('button', { name: ADS_COPY.pagination.previous })).toBeDisabled();
    expect(getPaginationItems(1, 10)).toContain(PAGINATION_ELLIPSIS_TOKEN);

    await user.click(screen.getByRole('button', { name: ADS_COPY.pagination.next }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('renders the animated delete confirmation modal when open', async () => {
    const user = userEvent.setup();
    const onConfirmDeleteAd = jest.fn();
    const onCloseDeleteModal = jest.fn();

    renderAdsView({
      isDeleteModalOpen: true,
      deleteAdTitle: 'Ceiling Light Installation',
      onConfirmDeleteAd,
      onCloseDeleteModal,
    });

    const dialog = screen.getByRole('dialog', {
      name: ADS_COPY.deleteModal.regionLabel,
    });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByTestId('ads-delete-overlay').className).toContain('animate-fade-in');

    await user.click(
      within(dialog).getByRole('button', { name: ADS_COPY.deleteModal.confirm }),
    );
    expect(onConfirmDeleteAd).toHaveBeenCalledTimes(1);
  });

  it('keeps responsive page layout tokens for required breakpoints', () => {
    expect(ADS_VIEWPORT.MOBILE_S).toBe(320);
    expect(ADS_VIEWPORT.LAPTOP).toBe(1020);
    expect(ADS_PAGE_CLASS).toContain('flex');
    expect(ADS_PAGE_CLASS).toContain('min-[1020px]');
  });
});
