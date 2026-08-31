import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { PROFILE_COPY } from '../components/admin/profile/profileCopy';
import { PROFILE_SEED } from '../components/admin/profile/profileData';
import {
  hasProfileErrors,
  validateProfileAccount,
  validateProfilePassword,
} from '../components/admin/profile/profileUtils';

const EMPTY_ACCOUNT_ERRORS = { name: '', email: '' };
const EMPTY_PASSWORD_ERRORS = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};
const DEFAULT_PASSWORD_VISIBILITY = {
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
};

const useAdminProfile = () => {
  const [displayName, setDisplayName] = useState(PROFILE_SEED.displayName);
  const [displayEmail, setDisplayEmail] = useState(PROFILE_SEED.displayEmail);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState('');
  const [name, setName] = useState(PROFILE_SEED.name);
  const [email, setEmail] = useState(PROFILE_SEED.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountErrors, setAccountErrors] = useState(EMPTY_ACCOUNT_ERRORS);
  const [passwordErrors, setPasswordErrors] = useState(EMPTY_PASSWORD_ERRORS);
  const [passwordVisibility, setPasswordVisibility] = useState(
    DEFAULT_PASSWORD_VISIBILITY,
  );

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);
    setAccountErrors((current) => ({ ...current, name: '' }));
  }, []);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
    setAccountErrors((current) => ({ ...current, email: '' }));
  }, []);

  const handleCurrentPasswordChange = useCallback((event) => {
    setCurrentPassword(event.target.value);
    setPasswordErrors((current) => ({ ...current, currentPassword: '' }));
  }, []);

  const handleNewPasswordChange = useCallback((event) => {
    setNewPassword(event.target.value);
    setPasswordErrors((current) => ({ ...current, newPassword: '' }));
  }, []);

  const handleConfirmPasswordChange = useCallback((event) => {
    setConfirmPassword(event.target.value);
    setPasswordErrors((current) => ({ ...current, confirmPassword: '' }));
  }, []);

  const handleTogglePasswordVisibility = useCallback((fieldKey) => {
    setPasswordVisibility((current) => ({
      ...current,
      [fieldKey]: !current[fieldKey],
    }));
  }, []);

  const handleAvatarChange = useCallback((event) => {
    const [file] = event.target.files || [];
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setAvatarPreviewUrl((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }
      return objectUrl;
    });
  }, []);

  const handleUpdateProfile = useCallback(
    (event) => {
      event.preventDefault();
      const nextErrors = validateProfileAccount({ name, email }, PROFILE_COPY);
      setAccountErrors(nextErrors);

      if (hasProfileErrors(nextErrors)) {
        return;
      }

      const nextName = name.trim();
      const nextEmail = email.trim();
      setName(nextName);
      setEmail(nextEmail);
      setDisplayName(nextName);
      setDisplayEmail(nextEmail);
      toast.success(PROFILE_COPY.toasts.profileUpdated);
    },
    [email, name],
  );

  const handleChangePassword = useCallback(
    (event) => {
      event.preventDefault();
      const nextErrors = validateProfilePassword(
        { currentPassword, newPassword, confirmPassword },
        PROFILE_COPY,
      );
      setPasswordErrors(nextErrors);

      if (hasProfileErrors(nextErrors)) {
        return;
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordVisibility(DEFAULT_PASSWORD_VISIBILITY);
      toast.success(PROFILE_COPY.toasts.passwordChanged);
    },
    [confirmPassword, currentPassword, newPassword],
  );

  return {
    copy: PROFILE_COPY,
    seo: PROFILE_COPY.seo,
    displayName,
    displayEmail,
    avatarPreviewUrl,
    name,
    email,
    currentPassword,
    newPassword,
    confirmPassword,
    accountErrors,
    passwordErrors,
    passwordVisibility,
    onNameChange: handleNameChange,
    onEmailChange: handleEmailChange,
    onCurrentPasswordChange: handleCurrentPasswordChange,
    onNewPasswordChange: handleNewPasswordChange,
    onConfirmPasswordChange: handleConfirmPasswordChange,
    onTogglePasswordVisibility: handleTogglePasswordVisibility,
    onAvatarChange: handleAvatarChange,
    onUpdateProfile: handleUpdateProfile,
    onChangePassword: handleChangePassword,
  };
};

export default useAdminProfile;
