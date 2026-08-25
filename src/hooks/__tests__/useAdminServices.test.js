import { act, renderHook } from '@testing-library/react';
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
import useAdminServices from '../useAdminServices';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe('useAdminServices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('paginates full catalog services and shows pagination when needed', () => {
    const { result } = renderHook(() => useAdminServices());
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
    const { result } = renderHook(() => useAdminServices());

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
    const { result } = renderHook(() => useAdminServices());

    act(() => {
      result.current.onCategoryFilterChange({ target: { value: 'Deck' } });
    });

    expect(result.current.services.length).toBeGreaterThan(0);
    expect(result.current.services.every((service) => service.catalogTitle === 'Deck')).toBe(
      true,
    );
  });

  it('hides pagination when filtered results fit on one page', () => {
    const { result } = renderHook(() => useAdminServices());

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
    const { result } = renderHook(() => useAdminServices());

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
    const { result } = renderHook(() => useAdminServices());
    const targetId = SERVICES_SEED[0].id;

    act(() => {
      result.current.onDeleteService(targetId);
    });

    expect(toast.success).toHaveBeenCalledWith(SERVICES_COPY.toasts.deleteService);
    expect(result.current.summarySubtitle).toBe(`${SERVICES_SEED.length - 1} services`);
  });

  it('toasts when add action is requested', () => {
    const { result } = renderHook(() => useAdminServices());

    act(() => {
      result.current.onAddNewService();
    });

    expect(toast.success).toHaveBeenCalledWith(SERVICES_COPY.toasts.addNewService);
  });

  it('opens and saves the edit service modal with card fields', () => {
    const { result } = renderHook(() => useAdminServices());
    const target = SERVICES_SEED[1];

    act(() => {
      result.current.onEditService(target.id);
    });

    expect(result.current.editingService).toMatchObject({
      id: target.id,
      title: target.title,
      catalogTitle: target.catalogTitle,
      category: target.category,
    });

    act(() => {
      result.current.onSaveEditService({
        ...target,
        title: 'Saved from modal',
        price: 150,
      });
    });

    expect(result.current.editingService).toBeNull();
    expect(toast.success).toHaveBeenCalledWith(SERVICES_COPY.toasts.editService);
    expect(result.current.services.some((service) => service.title === 'Saved from modal')).toBe(
      true,
    );
  });

  it('closes the edit modal without saving', () => {
    const { result } = renderHook(() => useAdminServices());

    act(() => {
      result.current.onEditService(SERVICES_SEED[0].id);
    });

    act(() => {
      result.current.onCloseEditService();
    });

    expect(result.current.editingService).toBeNull();
  });

  it('moves through pages with eight cards each', () => {
    const { result } = renderHook(() => useAdminServices());
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
