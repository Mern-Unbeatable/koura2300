import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { SETTINGS_COPY } from '../components/admin/settings/settingsCopy';
import {
  SETTINGS_EDIT_MATRIX_SEED,
  SETTINGS_VISIBILITY_MATRIX_SEED,
} from '../components/admin/settings/settingsData';
import {
  downloadVisibilityCsv,
  removeEditModule,
  toggleEditPermission,
  validateInviteEmail,
} from '../components/admin/settings/settingsUtils';

const useAdminSettings = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteEmailError, setInviteEmailError] = useState('');
  const [editModules, setEditModules] = useState(SETTINGS_EDIT_MATRIX_SEED);
  const [visibilityRows] = useState(SETTINGS_VISIBILITY_MATRIX_SEED);

  const handleInviteEmailChange = useCallback((event) => {
    setInviteEmail(event.target.value);
    setInviteEmailError('');
  }, []);

  const handleSendInvite = useCallback(
    (event) => {
      event.preventDefault();
      const error = validateInviteEmail(inviteEmail, SETTINGS_COPY);
      if (error) {
        setInviteEmailError(error);
        return;
      }

      setInviteEmail('');
      setInviteEmailError('');
      toast.success(SETTINGS_COPY.toasts.inviteSent);
    },
    [inviteEmail],
  );

  const handleToggleEditPermission = useCallback((moduleId) => {
    setEditModules((current) => toggleEditPermission(current, moduleId));
  }, []);

  const handleRemoveEditModule = useCallback((moduleId) => {
    setEditModules((current) => removeEditModule(current, moduleId));
    toast.success(SETTINGS_COPY.toasts.moduleRemoved);
  }, []);

  const handleDownloadVisibility = useCallback(() => {
    downloadVisibilityCsv(visibilityRows, SETTINGS_COPY);
    toast.success(SETTINGS_COPY.toasts.downloadReady);
  }, [visibilityRows]);

  return {
    copy: SETTINGS_COPY,
    inviteEmail,
    inviteEmailError,
    editModules,
    visibilityRows,
    onInviteEmailChange: handleInviteEmailChange,
    onSendInvite: handleSendInvite,
    onToggleEditPermission: handleToggleEditPermission,
    onRemoveEditModule: handleRemoveEditModule,
    onDownloadVisibility: handleDownloadVisibility,
  };
};

export default useAdminSettings;
