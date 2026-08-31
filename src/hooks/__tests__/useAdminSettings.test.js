import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { SETTINGS_COPY } from '../../components/admin/settings/settingsCopy';
import { SETTINGS_MODERATORS_SEED } from '../../components/admin/settings/settingsData';
import useAdminSettings from '../useAdminSettings';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe('useAdminSettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('seeds moderators from Figma data', () => {
    const { result } = renderHook(() => useAdminSettings());

    expect(result.current.copy.title).toBe(SETTINGS_COPY.title);
    expect(result.current.moderators).toHaveLength(SETTINGS_MODERATORS_SEED.length);
    expect(result.current.moderatorCountLabel).toBe('7 moderator');
    expect(result.current.inviteEmail).toBe('');
    expect(result.current.inviteEmailError).toBe('');
    expect(result.current.pagination.rangeLabel).toBe('Showing 1 to 7 of 7 results');
  });

  it('shows an inline error and does not toast when invite email is invalid', () => {
    const { result } = renderHook(() => useAdminSettings());

    act(() => {
      result.current.onInviteEmailChange({ target: { value: 'bad' } });
    });
    act(() => {
      result.current.onSendInvite({ preventDefault: jest.fn() });
    });

    expect(result.current.inviteEmailError).toBe(SETTINGS_COPY.invite.emailInvalid);
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('sends an invite, clears the email, and toasts success', () => {
    const { result } = renderHook(() => useAdminSettings());

    act(() => {
      result.current.onInviteEmailChange({ target: { value: 'team@example.com' } });
    });
    act(() => {
      result.current.onSendInvite({ preventDefault: jest.fn() });
    });

    expect(result.current.inviteEmail).toBe('');
    expect(result.current.inviteEmailError).toBe('');
    expect(toast.success).toHaveBeenCalledWith(SETTINGS_COPY.toasts.inviteSent);
  });

  it('opens the Moderator access modal from the Action icon', () => {
    const { result } = renderHook(() => useAdminSettings());

    act(() => {
      result.current.onEditModerator('albert-flores');
    });

    expect(result.current.isAccessModalOpen).toBe(true);
    expect(result.current.accessModerator.id).toBe('albert-flores');
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('saves moderator access, closes the modal, and toasts success', () => {
    const { result } = renderHook(() => useAdminSettings());

    act(() => {
      result.current.onEditModerator('albert-flores');
    });

    act(() => {
      result.current.onSaveModeratorAccess({
        moderatorId: 'albert-flores',
        permissionIds: ['bookings', 'reviews'],
        status: 'disabled',
      });
    });

    expect(result.current.isAccessModalOpen).toBe(false);
    expect(result.current.accessModerator).toBeNull();
    expect(result.current.moderators.find((item) => item.id === 'albert-flores')).toMatchObject({
      access: 'Bookings',
      status: 'disabled',
    });
    expect(toast.success).toHaveBeenCalledWith(SETTINGS_COPY.toasts.accessSaved);
  });

  it('closes the Moderator access modal without saving', () => {
    const { result } = renderHook(() => useAdminSettings());

    act(() => {
      result.current.onEditModerator('albert-flores');
    });
    act(() => {
      result.current.onCloseAccessModal();
    });

    expect(result.current.isAccessModalOpen).toBe(false);
    expect(result.current.accessModerator).toBeNull();
    expect(toast.success).not.toHaveBeenCalled();
  });
});
