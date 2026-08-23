import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import useAdminBookingsChat from '../../../../hooks/useAdminBookingsChat';
import { BOOKINGS_CHAT_COPY } from '../bookingsChatCopy';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe('useAdminBookingsChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads the booking chat session and sends messages', () => {
    const { result } = renderHook(() =>
      useAdminBookingsChat({ bookingId: 'BK-001', onClose: jest.fn() }),
    );

    expect(result.current.session.customerName).toBe('Albert Flores');
    expect(result.current.messages).toHaveLength(4);

    act(() => {
      result.current.handleInputChange({ target: { value: '  On my way  ' } });
    });

    act(() => {
      result.current.handleSend();
    });

    expect(result.current.messages.at(-1)).toMatchObject({
      type: 'sent',
      text: 'On my way',
    });
    expect(result.current.inputValue).toBe('');
  });

  it('ignores empty sends and supports Enter to send', () => {
    const { result } = renderHook(() =>
      useAdminBookingsChat({ bookingId: 'BK-001', onClose: jest.fn() }),
    );

    act(() => {
      result.current.handleSend();
    });
    expect(result.current.messages).toHaveLength(4);

    act(() => {
      result.current.handleInputChange({ target: { value: 'Ping' } });
    });
    act(() => {
      result.current.handleKeyDown({ key: 'Enter', shiftKey: false, preventDefault: jest.fn() });
    });

    expect(result.current.messages.at(-1).text).toBe('Ping');
  });

  it('emits toasts for create offer and pay now actions', () => {
    const { result } = renderHook(() =>
      useAdminBookingsChat({ bookingId: 'BK-001', onClose: jest.fn() }),
    );

    act(() => {
      result.current.handleCreateOffer();
      result.current.handlePayNow();
    });

    expect(toast.success).toHaveBeenCalledWith(BOOKINGS_CHAT_COPY.createOfferToast);
    expect(toast.success).toHaveBeenCalledWith(BOOKINGS_CHAT_COPY.payNowToast);
  });
});
