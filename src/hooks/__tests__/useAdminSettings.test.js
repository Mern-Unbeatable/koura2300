import { act, renderHook } from '@testing-library/react';
import toast from 'react-hot-toast';
import { SETTINGS_COPY } from '../../components/admin/settings/settingsCopy';
import {
  SETTINGS_EDIT_MATRIX_SEED,
  SETTINGS_VISIBILITY_MATRIX_SEED,
} from '../../components/admin/settings/settingsData';
import * as settingsUtils from '../../components/admin/settings/settingsUtils';
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

  it('seeds edit and visibility matrices from Figma data', () => {
    const { result } = renderHook(() => useAdminSettings());

    expect(result.current.copy.title).toBe(SETTINGS_COPY.title);
    expect(result.current.editModules).toHaveLength(SETTINGS_EDIT_MATRIX_SEED.length);
    expect(result.current.visibilityRows).toHaveLength(SETTINGS_VISIBILITY_MATRIX_SEED.length);
    expect(result.current.inviteEmail).toBe('');
    expect(result.current.inviteEmailError).toBe('');
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

  it('toggles edit permission for a module', () => {
    const { result } = renderHook(() => useAdminSettings());
    const before = result.current.editModules.find((module) => module.id === 'services');

    act(() => {
      result.current.onToggleEditPermission('services');
    });

    const after = result.current.editModules.find((module) => module.id === 'services');
    expect(after.canEdit).toBe(!before.canEdit);
  });

  it('removes a module from the edit matrix and toasts', () => {
    const { result } = renderHook(() => useAdminSettings());

    act(() => {
      result.current.onRemoveEditModule('blog');
    });

    expect(result.current.editModules.some((module) => module.id === 'blog')).toBe(false);
    expect(toast.success).toHaveBeenCalledWith(SETTINGS_COPY.toasts.moduleRemoved);
  });

  it('downloads the visibility matrix CSV', () => {
    const downloadSpy = jest
      .spyOn(settingsUtils, 'downloadVisibilityCsv')
      .mockImplementation(() => undefined);
    const { result } = renderHook(() => useAdminSettings());

    act(() => {
      result.current.onDownloadVisibility();
    });

    expect(downloadSpy).toHaveBeenCalledWith(
      SETTINGS_VISIBILITY_MATRIX_SEED,
      SETTINGS_COPY,
    );
    expect(toast.success).toHaveBeenCalledWith(SETTINGS_COPY.toasts.downloadReady);
    downloadSpy.mockRestore();
  });
});
