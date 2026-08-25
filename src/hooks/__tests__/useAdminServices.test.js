import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SERVICES_COPY } from '../../components/admin/services/servicesCopy';
import {
  SERVICES_ALL_FILTER_ID,
  SERVICES_PAGE_SIZE,
  SERVICES_SEED,
} from '../../components/admin/services/servicesData';
import {
  getTotalPages,
  PAGINATION_ELLIPSIS_TOKEN,
} from '../../components/admin/services/servicesUtils';
import { buildAdminServiceEditRoute, buildAdminServiceNewRoute } from '../../config';
import useAdminServices from '../useAdminServices';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

const renderUseAdminServices = () =>
  renderHook(() => useAdminServices(), {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });

describe('useAdminServices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('paginates full catalog services and shows pagination when needed', () => {
    const { result } = renderUseAdminServices();
    const totalPages = getTotalPages(SERVICES_SEED.length, SERVICES_PAGE_SIZE);

    expect(result.current.services).toHaveLength(SERVICES_PAGE_SIZE);
    expect(result.current.summarySubtitle).toBe(`${SERVICES_SEED.length} services`);
    expect(result.current.pagination.isVisible).toBe(true);
    expect(result.current.pagination.totalPages).toBe(totalPages);
    expect(result.current.pagination.pageItems[0]).toBe(1);
    expect(result.current.pagination.pageItems).toContain(PAGINATION_ELLIPSIS_TOKEN);
    expect(result.current.pagination.canGoPrevious).toBe(false);
    expect(result.current.pagination.canGoNext).toBe(true);
    expect(result.current.selectedCategoryId).toBe(SERVICES_ALL_FILTER_ID);
  });

  it('filters by landing catalog category and resets page and subcategory', () => {
    const { result } = renderUseAdminServices();

    act(() => {
      result.current.pagination.onPageChange(4);
    });

    act(() => {
      result.current.onCategoryFilterChange({ target: { value: 'Lighting' } });
    });

    expect(result.current.selectedCategoryId).toBe('Lighting');
    expect(result.current.selectedSubcategoryId).toBe(SERVICES_ALL_FILTER_ID);
    expect(result.current.pagination.currentPage).toBe(1);
    expect(
      result.current.services.every((service) => service.catalogTitle === 'Lighting'),
    ).toBe(true);
  });

  it('keeps later categories populated with services', () => {
    const { result } = renderUseAdminServices();

    act(() => {
      result.current.onCategoryFilterChange({ target: { value: 'Deck' } });
    });

    expect(result.current.services.length).toBeGreaterThan(0);
    expect(result.current.services.every((service) => service.catalogTitle === 'Deck')).toBe(
      true,
    );
  });

  it('hides pagination when filtered results fit on one page', () => {
    const { result } = renderUseAdminServices();

    act(() => {
      result.current.onCategoryFilterChange({ target: { value: 'Lighting' } });
    });

    act(() => {
      result.current.onSubcategoryFilterChange({
        target: { value: 'Indoor Lighting' },
      });
    });

    const filteredCount = Number(result.current.summarySubtitle.split(' ')[0]);
    expect(result.current.pagination.isVisible).toBe(filteredCount > SERVICES_PAGE_SIZE);
  });

  it('filters by landing subcategory within a category', () => {
    const { result } = renderUseAdminServices();

    act(() => {
      result.current.onCategoryFilterChange({ target: { value: 'Lighting' } });
    });

    act(() => {
      result.current.onSubcategoryFilterChange({ target: { value: 'Indoor Lighting' } });
    });

    expect(
      result.current.services.every((service) => service.category === 'Indoor Lighting'),
    ).toBe(true);
  });

  it('deletes a service and shows a success toast', () => {
    const { result } = renderUseAdminServices();
    const targetId = SERVICES_SEED[0].id;

    act(() => {
      result.current.onDeleteService(targetId);
    });

    expect(toast.success).toHaveBeenCalledWith(SERVICES_COPY.toasts.deleteService);
    expect(result.current.summarySubtitle).toBe(`${SERVICES_SEED.length - 1} services`);
  });

  it('navigates to the add service form', () => {
    const { result } = renderUseAdminServices();

    act(() => {
      result.current.onAddNewService();
    });

    expect(mockNavigate).toHaveBeenCalledWith(buildAdminServiceNewRoute());
  });

  it('navigates to the edit service form for a card', () => {
    const { result } = renderUseAdminServices();
    const serviceId = SERVICES_SEED[0].id;

    act(() => {
      result.current.onEditService(serviceId);
    });

    expect(mockNavigate).toHaveBeenCalledWith(buildAdminServiceEditRoute(serviceId));
  });

  it('moves through pages with eight cards each', () => {
    const { result } = renderUseAdminServices();
    const lastPage = result.current.pagination.totalPages;

    act(() => {
      result.current.pagination.onNext();
    });

    expect(result.current.pagination.currentPage).toBe(2);
    expect(result.current.services).toHaveLength(SERVICES_PAGE_SIZE);
    expect(result.current.pagination.canGoPrevious).toBe(true);

    act(() => {
      result.current.pagination.onPageChange(lastPage);
    });

    expect(result.current.pagination.currentPage).toBe(lastPage);
    expect(result.current.pagination.canGoNext).toBe(false);
  });
});
