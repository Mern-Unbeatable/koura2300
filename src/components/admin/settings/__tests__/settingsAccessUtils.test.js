import {
  SETTINGS_MODERATOR_ACCESS_PERMISSIONS,
  SETTINGS_MODERATOR_STATUS_ACTIVE,
  SETTINGS_MODERATOR_STATUS_DISABLED,
} from '../settingsAccessData';
import {
  buildModeratorAccessDraft,
  getSelectedPermissionIds,
  togglePermissionId,
  updateModeratorAccess,
} from '../settingsAccessUtils';

describe('settingsAccessUtils', () => {
  it('exposes the nine Figma moderator access permissions', () => {
    expect(SETTINGS_MODERATOR_ACCESS_PERMISSIONS).toHaveLength(9);
    expect(SETTINGS_MODERATOR_ACCESS_PERMISSIONS.map((item) => item.label)).toEqual([
      'Overview / Analytics',
      'Bookings',
      'Customers',
      'Services',
      'Categories Management',
      'Reviews',
      'Blog Post',
      'Ads Management',
      'Message',
    ]);
  });

  it('builds a draft from a moderator access label and status', () => {
    const draft = buildModeratorAccessDraft({
      id: 'albert-flores',
      name: 'Albert Flores',
      access: 'Dashboard/ Overview',
      status: SETTINGS_MODERATOR_STATUS_ACTIVE,
    });

    expect(draft.moderatorId).toBe('albert-flores');
    expect(draft.status).toBe(SETTINGS_MODERATOR_STATUS_ACTIVE);
    expect(draft.permissionIds).toEqual(['overview-analytics']);
  });

  it('maps known access labels onto permission ids', () => {
    expect(getSelectedPermissionIds('Bookings')).toEqual(['bookings']);
    expect(getSelectedPermissionIds('Categories Management')).toEqual(['categories-management']);
    expect(getSelectedPermissionIds('Unknown module')).toEqual([]);
  });

  it('toggles a permission id without mutating the source list', () => {
    const source = ['overview-analytics'];
    const withBookings = togglePermissionId(source, 'bookings');
    const withoutOverview = togglePermissionId(source, 'overview-analytics');

    expect(withBookings).toEqual(['overview-analytics', 'bookings']);
    expect(withoutOverview).toEqual([]);
    expect(source).toEqual(['overview-analytics']);
  });

  it('updates moderator access and status immutably on save', () => {
    const moderators = [
      {
        id: 'albert-flores',
        name: 'Albert Flores',
        access: 'Dashboard/ Overview',
        status: SETTINGS_MODERATOR_STATUS_ACTIVE,
      },
      {
        id: 'marvin-mckinney',
        name: 'Marvin McKinney',
        access: 'Bookings',
        status: SETTINGS_MODERATOR_STATUS_ACTIVE,
      },
    ];

    const next = updateModeratorAccess(moderators, {
      moderatorId: 'albert-flores',
      permissionIds: ['bookings', 'reviews'],
      status: SETTINGS_MODERATOR_STATUS_DISABLED,
    });

    expect(next[0]).toEqual({
      id: 'albert-flores',
      name: 'Albert Flores',
      access: 'Bookings',
      status: SETTINGS_MODERATOR_STATUS_DISABLED,
    });
    expect(next[1]).toBe(moderators[1]);
    expect(moderators[0].status).toBe(SETTINGS_MODERATOR_STATUS_ACTIVE);
  });
});
