import {
  SETTINGS_MODERATOR_ACCESS_LABEL_ALIASES,
  SETTINGS_MODERATOR_ACCESS_PERMISSION_OVERVIEW,
  SETTINGS_MODERATOR_ACCESS_PERMISSIONS,
} from './settingsAccessData';

export const getSelectedPermissionIds = (accessLabel) => {
  const permissionId = SETTINGS_MODERATOR_ACCESS_LABEL_ALIASES[accessLabel];
  return permissionId ? [permissionId] : [];
};

export const buildModeratorAccessDraft = (moderator) => ({
  moderatorId: moderator.id,
  permissionIds: getSelectedPermissionIds(moderator.access),
  status: moderator.status,
});

export const togglePermissionId = (permissionIds, permissionId) => {
  if (permissionIds.includes(permissionId)) {
    return permissionIds.filter((id) => id !== permissionId);
  }

  return [...permissionIds, permissionId];
};

export const getPrimaryAccessLabel = (permissionIds) => {
  const matchedPermission = SETTINGS_MODERATOR_ACCESS_PERMISSIONS.find((permission) =>
    permissionIds.includes(permission.id),
  );

  if (!matchedPermission) {
    return '';
  }

  if (matchedPermission.id === SETTINGS_MODERATOR_ACCESS_PERMISSION_OVERVIEW) {
    return 'Dashboard/ Overview';
  }

  return matchedPermission.label;
};

export const updateModeratorAccess = (moderators, { moderatorId, permissionIds, status }) =>
  moderators.map((moderator) => {
    if (moderator.id !== moderatorId) {
      return moderator;
    }

    return {
      ...moderator,
      access: getPrimaryAccessLabel(permissionIds),
      status,
    };
  });
