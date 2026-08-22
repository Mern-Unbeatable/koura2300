import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { ACCOUNT_CONTENT } from '../components/account/accountCopy';
import {
  ACCOUNT_DEFAULT_PROFILE,
  ACCOUNT_PROFILE_FIELDS,
} from '../components/account/accountData';
import { updateUser } from '../store/slices/authSlice';

const PROFILE_TEXT_FIELDS = [
  ACCOUNT_PROFILE_FIELDS.FIRST_NAME,
  ACCOUNT_PROFILE_FIELDS.LAST_NAME,
  ACCOUNT_PROFILE_FIELDS.EMAIL,
  ACCOUNT_PROFILE_FIELDS.PHONE,
  ACCOUNT_PROFILE_FIELDS.ADDRESS,
];

const isProfileValid = (profile) =>
  PROFILE_TEXT_FIELDS.every((field) => profile[field]?.trim().length > 0);

const readAvatarPreview = (file, onLoad) => {
  const reader = new FileReader();

  reader.onload = () => {
    if (typeof reader.result === 'string') {
      onLoad(reader.result);
    }
  };

  reader.readAsDataURL(file);
};

const useAccountSettings = () => {
  const dispatch = useDispatch();
  const avatarInputRef = useRef(null);
  const [profile, setProfile] = useState(ACCOUNT_DEFAULT_PROFILE);

  const handleProfileChange = useCallback((field) => (event) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: event.target.value,
    }));
  }, []);

  const handleAvatarButtonClick = useCallback(() => {
    avatarInputRef.current?.click();
  }, []);

  const handleAvatarChange = useCallback((event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    readAvatarPreview(file, (previewUrl) => {
      setProfile((currentProfile) => ({
        ...currentProfile,
        avatarUrl: previewUrl,
      }));
    });
  }, []);

  const handleSaveProfile = useCallback(
    (event) => {
      event.preventDefault();

      if (!isProfileValid(profile)) {
        toast.error(ACCOUNT_CONTENT.validation.firstNameRequired);
        return;
      }

      dispatch(
        updateUser({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        }),
      );
      toast.success(ACCOUNT_CONTENT.toasts.profileSaved);
    },
    [dispatch, profile],
  );

  const isSaveDisabled = !isProfileValid(profile);

  return {
    profile,
    avatarInputRef,
    isSaveDisabled,
    profileCopy: ACCOUNT_CONTENT.accountSetting,
    handleProfileChange,
    handleAvatarButtonClick,
    handleAvatarChange,
    handleSaveProfile,
    profileFields: ACCOUNT_PROFILE_FIELDS,
  };
};

export default useAccountSettings;
