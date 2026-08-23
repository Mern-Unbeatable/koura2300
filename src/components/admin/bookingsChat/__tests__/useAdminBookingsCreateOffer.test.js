import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import useAdminBookingsCreateOffer from '../../../../hooks/useAdminBookingsCreateOffer';
import { BOOKINGS_CREATE_OFFER_COPY } from '../bookingsCreateOfferCopy';
import { resetOfferProductSequence } from '../bookingsCreateOfferUtils';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe('useAdminBookingsCreateOffer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetOfferProductSequence();
  });

  it('starts with one empty product and supports adding products', () => {
    const { result } = renderHook(() =>
      useAdminBookingsCreateOffer({ bookingId: 'BK-001', onClose: jest.fn(), onSend: jest.fn() }),
    );

    expect(result.current.products).toHaveLength(1);

    act(() => {
      result.current.handleAddProduct();
    });

    expect(result.current.products).toHaveLength(2);
  });

  it('updates product fields and shows inline errors on invalid submit', () => {
    const onSend = jest.fn();
    const { result } = renderHook(() =>
      useAdminBookingsCreateOffer({ bookingId: 'BK-001', onClose: jest.fn(), onSend }),
    );

    act(() => {
      result.current.handleFieldChange(result.current.products[0].id, 'productName', 'Panel');
    });

    act(() => {
      result.current.handleSendOffer();
    });

    expect(onSend).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
    expect(result.current.errors[result.current.products[0].id].quantity).toBe(
      BOOKINGS_CREATE_OFFER_COPY.errors.quantityRequired,
    );
  });

  it('sends a valid offer, toasts, and closes', () => {
    const onClose = jest.fn();
    const onSend = jest.fn();
    const { result } = renderHook(() =>
      useAdminBookingsCreateOffer({ bookingId: 'BK-001', onClose, onSend }),
    );

    const productId = result.current.products[0].id;

    act(() => {
      result.current.handleFieldChange(productId, 'productName', 'Panel');
      result.current.handleFieldChange(productId, 'quantity', '1 unit');
      result.current.handleFieldChange(productId, 'price', '85');
    });

    act(() => {
      result.current.handleSendOffer();
    });

    expect(onSend).toHaveBeenCalledWith(
      expect.objectContaining({
        bookingId: 'BK-001',
        totalLabel: '$85',
      }),
    );
    expect(toast.success).toHaveBeenCalledWith(BOOKINGS_CREATE_OFFER_COPY.sendSuccessToast);
    expect(onClose).toHaveBeenCalled();
  });
});
