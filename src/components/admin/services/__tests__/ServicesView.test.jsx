import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServicesView from '../ServicesView';
import { SERVICES_COPY } from '../servicesCopy';
import {
  SERVICES_CATEGORY_OPTIONS,
  SERVICES_GRID_CLASS,
  SERVICES_PAGE_SIZE,
  SERVICES_SEED,
  SERVICES_SUBCATEGORY_OPTIONS,
  SERVICES_VIEWPORT,
} from '../servicesData';

const createServicesViewProps = (overrides = {}) => ({
  copy: SERVICES_COPY,
  services: SERVICES_SEED.slice(0, SERVICES_PAGE_SIZE),
  summarySubtitle: `${SERVICES_SEED.length} services`,
  categoryOptions: SERVICES_CATEGORY_OPTIONS,
  subcategoryOptions: SERVICES_SUBCATEGORY_OPTIONS,
  selectedCategoryId: 'all',
  selectedSubcategoryId: 'all',
  onCategoryFilterChange: jest.fn(),
  onSubcategoryFilterChange: jest.fn(),
  onAddNewService: jest.fn(),
  onEditService: jest.fn(),
  onDeleteService: jest.fn(),
  pagination: {
    isVisible: true,
    currentPage: 1,
    totalPages: 10,
    pageItems: [1, 2, 3, 'ellipsis', 10],
    canGoPrevious: false,
    canGoNext: true,
    onPrevious: jest.fn(),
    onNext: jest.fn(),
    onPageChange: jest.fn(),
  },
  ...overrides,
});

describe('ServicesView', () => {
  it('renders the Service Management header actions from the updated Figma', () => {
    render(<ServicesView {...createServicesViewProps()} />);

    expect(
      screen.getByRole('heading', { level: 1, name: SERVICES_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(`${SERVICES_SEED.length} services`)).toBeInTheDocument();
    expect(screen.getByText(SERVICES_COPY.sortByLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: SERVICES_COPY.addNewService }),
    ).toBeInTheDocument();
  });

  it('renders landing catalog category and sub-category filters', () => {
    render(<ServicesView {...createServicesViewProps()} />);

    expect(
      screen.getByLabelText(SERVICES_COPY.categoryFilterLabel),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(SERVICES_COPY.subcategoryFilterLabel),
    ).toBeInTheDocument();
  });

  it('keeps the Service Management title on one line', () => {
    render(<ServicesView {...createServicesViewProps()} />);

    expect(screen.getByRole('heading', { level: 1 }).className).toContain('whitespace-nowrap');
  });

  it('opens a compact sub-category menu with single-line options and ash scrollbar', async () => {
    const user = userEvent.setup();

    render(<ServicesView {...createServicesViewProps()} />);

    await user.click(screen.getByLabelText(SERVICES_COPY.subcategoryFilterLabel));

    const listbox = screen.getByRole('listbox', {
      name: SERVICES_COPY.subcategoryFilterLabel,
    });

    expect(listbox.className).toContain('scrollbar-services-ash');
    expect(listbox.className).toContain('max-h-[220px]');
    expect(
      screen.getByRole('option', { name: 'Indoor Lighting' }).className,
    ).toContain('break-words');
  });

  it('renders shared landing ServiceCard content for admin services', () => {
    const firstService = SERVICES_SEED[0];
    render(<ServicesView {...createServicesViewProps()} />);

    const grid = screen.getByRole('region', { name: SERVICES_COPY.gridLabel });
    const firstCard = within(grid).getByTestId(`services-card-${firstService.id}`);

    expect(within(firstCard).getByText(firstService.title)).toBeInTheDocument();
    expect(within(firstCard).getByText(firstService.catalogTitle)).toBeInTheDocument();
    expect(within(firstCard).getByText(firstService.category)).toBeInTheDocument();
    expect(
      within(firstCard).getByText(`Starting at $${firstService.price}`),
    ).toBeInTheDocument();
    expect(within(firstCard).getByText(firstService.duration)).toBeInTheDocument();
    expect(within(firstCard).getByText(firstService.rating)).toBeInTheDocument();
    expect(within(firstCard).getByRole('button', { name: SERVICES_COPY.edit })).toBeInTheDocument();
    expect(
      within(firstCard).getByRole('button', { name: SERVICES_COPY.delete }),
    ).toBeInTheDocument();
  });

  it('invokes filter and shared card action callbacks', async () => {
    const user = userEvent.setup();
    const onCategoryFilterChange = jest.fn();
    const onEditService = jest.fn();
    const onDeleteService = jest.fn();
    const onAddNewService = jest.fn();
    const firstServiceId = SERVICES_SEED[0].id;

    render(
      <ServicesView
        {...createServicesViewProps({
          onCategoryFilterChange,
          onEditService,
          onDeleteService,
          onAddNewService,
        })}
      />,
    );

    await user.click(screen.getByLabelText(SERVICES_COPY.categoryFilterLabel));
    await user.click(screen.getByRole('option', { name: 'Lighting' }));
    await user.click(screen.getByRole('button', { name: SERVICES_COPY.addNewService }));
    await user.click(screen.getAllByRole('button', { name: SERVICES_COPY.edit })[0]);
    await user.click(screen.getAllByRole('button', { name: SERVICES_COPY.delete })[0]);

    expect(onCategoryFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: 'Lighting' } }),
    );
    expect(onAddNewService).toHaveBeenCalled();
    expect(onEditService).toHaveBeenCalledWith(firstServiceId);
    expect(onDeleteService).toHaveBeenCalledWith(firstServiceId);
  });

  it('renders Figma numbered pagination with Prev Next and ellipsis', async () => {
    const user = userEvent.setup();
    const onNext = jest.fn();
    const onPageChange = jest.fn();

    render(
      <ServicesView
        {...createServicesViewProps({
          pagination: {
            isVisible: true,
            currentPage: 1,
            totalPages: 10,
            pageItems: [1, 2, 3, 'ellipsis', 10],
            canGoPrevious: false,
            canGoNext: true,
            onPrevious: jest.fn(),
            onNext,
            onPageChange,
          },
        })}
      />,
    );

    const pagination = screen.getByTestId('services-pagination');

    expect(screen.getByRole('button', { name: SERVICES_COPY.pagination.previous })).toBeDisabled();
    expect(screen.getByRole('button', { name: SERVICES_COPY.pagination.next })).toBeEnabled();
    expect(within(pagination).getByText(SERVICES_COPY.pagination.ellipsis)).toBeInTheDocument();
    expect(within(pagination).getByRole('button', { name: 'Go to page 10' })).toBeInTheDocument();
    expect(pagination.className).toContain('gap-[5px]');

    await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
    await user.click(screen.getByRole('button', { name: SERVICES_COPY.pagination.next }));

    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(onNext).toHaveBeenCalled();
  });

  it('hides pagination when results fit on one page or are empty', () => {
    const { rerender } = render(
      <ServicesView
        {...createServicesViewProps({
          services: [],
          summarySubtitle: '0 services',
          pagination: {
            isVisible: false,
            currentPage: 1,
            totalPages: 1,
            pageItems: [1],
            canGoPrevious: false,
            canGoNext: false,
            onPrevious: jest.fn(),
            onNext: jest.fn(),
            onPageChange: jest.fn(),
          },
        })}
      />,
    );

    expect(screen.queryByTestId('services-pagination')).not.toBeInTheDocument();
    expect(screen.getByText(SERVICES_COPY.emptyResults)).toBeInTheDocument();

    rerender(
      <ServicesView
        {...createServicesViewProps({
          services: SERVICES_SEED.slice(0, SERVICES_PAGE_SIZE),
          pagination: {
            isVisible: false,
            currentPage: 1,
            totalPages: 1,
            pageItems: [1],
            canGoPrevious: false,
            canGoNext: false,
            onPrevious: jest.fn(),
            onNext: jest.fn(),
            onPageChange: jest.fn(),
          },
        })}
      />,
    );

    expect(screen.queryByTestId('services-pagination')).not.toBeInTheDocument();
  });

  it('uses responsive grid classes across breakpoints', () => {
    render(<ServicesView {...createServicesViewProps()} />);

    const grid = screen.getByRole('region', { name: SERVICES_COPY.gridLabel });

    expect(SERVICES_VIEWPORT).toEqual({
      MOBILE_S: 320,
      MOBILE_M: 375,
      MOBILE_L: 425,
      TABLET: 768,
      LAPTOP: 1020,
      DESKTOP: 1440,
    });
    expect(grid.className).toContain('grid-cols-1');
    expect(grid.className).toContain('min-[768px]:grid-cols-2');
    expect(grid.className).toContain('min-[1020px]:grid-cols-3');
    expect(grid.className).toContain('min-[1440px]:grid-cols-4');
    expect(SERVICES_GRID_CLASS).toContain('min-[1440px]:grid-cols-4');
  });

  it('renders empty state when no services match', () => {
    render(
      <ServicesView
        {...createServicesViewProps({
          services: [],
          summarySubtitle: '0 services',
        })}
      />,
    );

    expect(screen.getByText(SERVICES_COPY.emptyResults)).toBeInTheDocument();
  });
});
