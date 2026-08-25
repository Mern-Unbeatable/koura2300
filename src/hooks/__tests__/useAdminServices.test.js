import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { SERVICES_COPY } from '../../components/admin/services/servicesCopy';
import {
  SERVICES_ALL_FILTER_ID,
  SERVICES_PAGE_SIZE,
  SERVICES_SEED,
  SERVICES_TOTAL_PAGES,
} from '../../components/admin/services/servicesData';
import { PAGINATION_ELLIPSIS_TOKEN } from '../../components/admin/services/servicesUtils';
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

  it('paginates seeded catalog services and exposes the Figma page chrome', () => {
    const { result } = renderHook(() => useAdminServices());

    expect(result.current.services).toHaveLength(SERVICES_PAGE_SIZE);
    expect(result.current.summarySubtitle).toBe(`${SERVICES_SEED.length} services`);
    expect(result.current.pagination.totalPages).toBe(SERVICES_TOTAL_PAGES);
    expect(result.current.pagination.pageItems).toEqual([
      1,
      2,
      3,
      PAGINATION_ELLIPSIS_TOKEN,
      SERVICES_TOTAL_PAGES,
    ]);
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

  it('toasts when add and edit actions are requested', () => {
    const { result } = renderHook(() => useAdminServices());

    act(() => {
      result.current.onAddNewService();
    });

    act(() => {
      result.current.onEditService(SERVICES_SEED[1].id);
    });

    expect(toast.success).toHaveBeenCalledWith(SERVICES_COPY.toasts.addNewService);
    expect(toast.success).toHaveBeenCalledWith(SERVICES_COPY.toasts.editService);
  });

  it('moves through pages with eight cards each', () => {
    const { result } = renderHook(() => useAdminServices());

    act(() => {
      result.current.pagination.onNext();
    });

    expect(result.current.pagination.currentPage).toBe(2);
    expect(result.current.services).toHaveLength(SERVICES_PAGE_SIZE);
    expect(result.current.pagination.canGoPrevious).toBe(true);

    act(() => {
      result.current.pagination.onPageChange(SERVICES_TOTAL_PAGES);
    });

    expect(result.current.pagination.currentPage).toBe(SERVICES_TOTAL_PAGES);
    expect(result.current.pagination.canGoNext).toBe(false);
    expect(result.current.pagination.pageItems).toEqual([
      1,
      PAGINATION_ELLIPSIS_TOKEN,
      8,
      9,
      10,
    ]);
  });
});
