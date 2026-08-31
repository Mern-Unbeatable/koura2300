import { useCallback, useEffect, useState } from 'react';
import {
  buildModeratorAccessDraft,
  togglePermissionId,
} from './settingsAccessUtils';

const useSettingsModeratorAccessForm = ({ moderator, onSave }) => {
  const [permissionIds, setPermissionIds] = useState(() =>
    buildModeratorAccessDraft(moderator).permissionIds,
  );
  const [status, setStatus] = useState(() => buildModeratorAccessDraft(moderator).status);

  useEffect(() => {
    const draft = buildModeratorAccessDraft(moderator);
    setPermissionIds(draft.permissionIds);
    setStatus(draft.status);
  }, [moderator.id, moderator.access, moderator.status]);

  const handleTogglePermission = useCallback((permissionId) => {
    setPermissionIds((currentIds) => togglePermissionId(currentIds, permissionId));
  }, []);

  const handleSelectStatus = useCallback((nextStatus) => {
    setStatus(nextStatus);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSave({
        moderatorId: moderator.id,
        permissionIds,
        status,
      });
    },
    [moderator.id, onSave, permissionIds, status],
  );

  return {
    permissionIds,
    status,
    onTogglePermission: handleTogglePermission,
    onSelectStatus: handleSelectStatus,
    onSubmit: handleSubmit,
  };
};

export default useSettingsModeratorAccessForm;
