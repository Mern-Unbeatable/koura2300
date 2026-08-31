import { act, renderHook } from '@testing-library/react';
import {
  SETTINGS_MODERATOR_STATUS_ACTIVE,
  SETTINGS_MODERATOR_STATUS_DISABLED,
} from '../settingsAccessData';
import useSettingsModeratorAccessForm from '../useSettingsModeratorAccessForm';

const createModerator = (overrides = {}) => ({
  id: 'albert-flores',
  name: 'Albert Flores',
  access: 'Dashboard/ Overview',
  status: SETTINGS_MODERATOR_STATUS_ACTIVE,
  ...overrides,
});

describe('useSettingsModeratorAccessForm', () => {
  it('seeds permission ids and status from the selected moderator', () => {
    const { result } = renderHook(() =>
      useSettingsModeratorAccessForm({
        moderator: createModerator(),
        onSave: jest.fn(),
      }),
    );

    expect(result.current.permissionIds).toEqual(['overview-analytics']);
    expect(result.current.status).toBe(SETTINGS_MODERATOR_STATUS_ACTIVE);
  });

  it('toggles permission checkboxes', () => {
    const { result } = renderHook(() =>
      useSettingsModeratorAccessForm({
        moderator: createModerator(),
        onSave: jest.fn(),
      }),
    );

    act(() => {
      result.current.onTogglePermission('bookings');
    });

    expect(result.current.permissionIds).toEqual(['overview-analytics', 'bookings']);

    act(() => {
      result.current.onTogglePermission('overview-analytics');
    });

    expect(result.current.permissionIds).toEqual(['bookings']);
  });

  it('updates the draft status when Active or Disabled is selected', () => {
    const { result } = renderHook(() =>
      useSettingsModeratorAccessForm({
        moderator: createModerator(),
        onSave: jest.fn(),
      }),
    );

    act(() => {
      result.current.onSelectStatus(SETTINGS_MODERATOR_STATUS_DISABLED);
    });

    expect(result.current.status).toBe(SETTINGS_MODERATOR_STATUS_DISABLED);

    act(() => {
      result.current.onSelectStatus(SETTINGS_MODERATOR_STATUS_ACTIVE);
    });

    expect(result.current.status).toBe(SETTINGS_MODERATOR_STATUS_ACTIVE);
  });

  it('saves the draft payload and prevents the default form submit', () => {
    const onSave = jest.fn();
    const preventDefault = jest.fn();
    const { result } = renderHook(() =>
      useSettingsModeratorAccessForm({
        moderator: createModerator(),
        onSave,
      }),
    );

    act(() => {
      result.current.onTogglePermission('reviews');
      result.current.onSelectStatus(SETTINGS_MODERATOR_STATUS_DISABLED);
    });

    act(() => {
      result.current.onSubmit({ preventDefault });
    });

    expect(preventDefault).toHaveBeenCalled();
    expect(onSave).toHaveBeenCalledWith({
      moderatorId: 'albert-flores',
      permissionIds: ['overview-analytics', 'reviews'],
      status: SETTINGS_MODERATOR_STATUS_DISABLED,
    });
  });
});
