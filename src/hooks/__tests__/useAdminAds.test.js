import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { ADS_COPY } from '../../components/admin/ads/adsCopy';
import {
  ADS_ALL_FILTER_ID,
  ADS_PAGE_SIZE,
  ADS_SEED,
} from '../../components/admin/ads/adsData';
import useAdminAds from '../useAdminAds';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe('useAdminAds', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('seeds ads and shows pagination when results exceed eight cards', () => {
    const { result } = renderHook(() => useAdminAds());

    expect(result.current.ads).toHaveLength(ADS_PAGE_SIZE);
    expect(result.current.copy.title).toBe(ADS_COPY.title);
    expect(result.current.pagination.isVisible).toBe(true);
    expect(result.current.selectedCategoryId).toBe(ADS_ALL_FILTER_ID);
  });

  it('filters by category and resets subcategory plus page', () => {
    const { result } = renderHook(() => useAdminAds());

    act(() => {
      result.current.pagination.onPageChange(2);
    });

    act(() => {
      result.current.onCategoryFilterChange({ target: { value: 'Lighting' } });
    });

    expect(result.current.selectedCategoryId).toBe('Lighting');
    expect(result.current.selectedSubcategoryId).toBe(ADS_ALL_FILTER_ID);
    expect(result.current.pagination.currentPage).toBe(1);
    expect(result.current.ads.every((ad) => ad.catalogTitle === 'Lighting')).toBe(true);
  });

  it('opens delete confirmation instead of deleting immediately', () => {
    const { result } = renderHook(() => useAdminAds());
    const adId = result.current.ads[0].id;

    act(() => {
      result.current.onDeleteAd(adId);
    });

    expect(result.current.isDeleteModalOpen).toBe(true);
    expect(result.current.deleteAdTitle).toBe(result.current.ads[0].title);
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('confirms delete and closes the modal with a success toast', () => {
    const { result } = renderHook(() => useAdminAds());
    const adId = ADS_SEED[0].id;

    act(() => {
      result.current.onDeleteAd(adId);
    });

    act(() => {
      result.current.onConfirmDeleteAd();
    });

    expect(result.current.isDeleteModalOpen).toBe(false);
    expect(toast.success).toHaveBeenCalledWith(ADS_COPY.toasts.deleted);
    expect(result.current.ads.every((ad) => ad.id !== adId)).toBe(true);
  });

  it('toasts when adding or editing an ad', () => {
    const { result } = renderHook(() => useAdminAds());

    act(() => {
      result.current.onAddNewAd();
    });

    act(() => {
      result.current.onEditAd(ADS_SEED[0].id);
    });

    expect(toast.success).toHaveBeenCalledWith(ADS_COPY.toasts.addAd);
    expect(toast.success).toHaveBeenCalledWith(ADS_COPY.toasts.editAd);
  });
});
