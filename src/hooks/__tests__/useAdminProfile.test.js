import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { PROFILE_COPY } from '../../components/admin/profile/profileCopy';
import { PROFILE_SEED } from '../../components/admin/profile/profileData';
import useAdminProfile from '../useAdminProfile';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe('useAdminProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('seeds profile values from Figma data', () => {
    const { result } = renderHook(() => useAdminProfile());

    expect(result.current.copy.title).toBe(PROFILE_COPY.title);
    expect(result.current.displayName).toBe(PROFILE_SEED.displayName);
    expect(result.current.displayEmail).toBe(PROFILE_SEED.displayEmail);
    expect(result.current.name).toBe(PROFILE_SEED.name);
    expect(result.current.email).toBe(PROFILE_SEED.email);
    expect(result.current.currentPassword).toBe('');
    expect(result.current.newPassword).toBe('');
    expect(result.current.confirmPassword).toBe('');
  });

  it('shows inline account errors and does not toast on invalid update', () => {
    const { result } = renderHook(() => useAdminProfile());

    act(() => {
      result.current.onNameChange({ target: { value: '' } });
      result.current.onEmailChange({ target: { value: 'bad' } });
    });
    act(() => {
      result.current.onUpdateProfile({ preventDefault: jest.fn() });
    });

    expect(result.current.accountErrors.email).toBe(PROFILE_COPY.errors.emailInvalid);
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('updates profile display values and toasts on valid save', () => {
    const { result } = renderHook(() => useAdminProfile());

    act(() => {
      result.current.onNameChange({ target: { value: 'Updated Industries' } });
      result.current.onEmailChange({ target: { value: 'updated@example.com' } });
    });
    act(() => {
      result.current.onUpdateProfile({ preventDefault: jest.fn() });
    });

    expect(result.current.displayName).toBe('Updated Industries');
    expect(result.current.displayEmail).toBe('updated@example.com');
    expect(result.current.accountErrors).toEqual({ name: '', email: '' });
    expect(toast.success).toHaveBeenCalledWith(PROFILE_COPY.toasts.profileUpdated);
  });

  it('shows inline password errors and does not toast on mismatch', () => {
    const { result } = renderHook(() => useAdminProfile());

    act(() => {
      result.current.onCurrentPasswordChange({ target: { value: 'old-password' } });
      result.current.onNewPasswordChange({ target: { value: 'password123' } });
      result.current.onConfirmPasswordChange({ target: { value: 'password999' } });
    });
    act(() => {
      result.current.onChangePassword({ preventDefault: jest.fn() });
    });

    expect(result.current.passwordErrors.confirmPassword).toBe(
      PROFILE_COPY.errors.confirmPasswordMismatch,
    );
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('clears password fields and toasts on valid password change', () => {
    const { result } = renderHook(() => useAdminProfile());

    act(() => {
      result.current.onCurrentPasswordChange({ target: { value: 'old-password' } });
      result.current.onNewPasswordChange({ target: { value: 'password123' } });
      result.current.onConfirmPasswordChange({ target: { value: 'password123' } });
    });
    act(() => {
      result.current.onChangePassword({ preventDefault: jest.fn() });
    });

    expect(result.current.currentPassword).toBe('');
    expect(result.current.newPassword).toBe('');
    expect(result.current.confirmPassword).toBe('');
    expect(toast.success).toHaveBeenCalledWith(PROFILE_COPY.toasts.passwordChanged);
  });

  it('toggles password field visibility independently', () => {
    const { result } = renderHook(() => useAdminProfile());

    act(() => {
      result.current.onTogglePasswordVisibility('currentPassword');
    });
    expect(result.current.passwordVisibility.currentPassword).toBe(true);

    act(() => {
      result.current.onTogglePasswordVisibility('newPassword');
    });
    expect(result.current.passwordVisibility.newPassword).toBe(true);
    expect(result.current.passwordVisibility.confirmPassword).toBe(false);
  });
});
