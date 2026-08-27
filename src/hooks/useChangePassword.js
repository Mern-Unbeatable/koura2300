import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { ACCOUNT_CONTENT } from '../components/account/accountCopy';
import {
  ACCOUNT_MIN_PASSWORD_LENGTH,
  ACCOUNT_PASSWORD_FIELDS,
} from '../components/account/accountData';
import { isChangePasswordReady } from '../components/account/accountUtils';

const createEmptyPasswordFields = () => ({
  [ACCOUNT_PASSWORD_FIELDS.CURRENT]: '',
  [ACCOUNT_PASSWORD_FIELDS.NEW]: '',
  [ACCOUNT_PASSWORD_FIELDS.CONFIRM]: '',
});

const createInitialVisibility = () => ({
  [ACCOUNT_PASSWORD_FIELDS.CURRENT]: false,
  [ACCOUNT_PASSWORD_FIELDS.NEW]: false,
  [ACCOUNT_PASSWORD_FIELDS.CONFIRM]: false,
});

const useChangePassword = () => {
  const [fields, setFields] = useState(createEmptyPasswordFields);
  const [visibility, setVisibility] = useState(createInitialVisibility);

  const handlePasswordChange = useCallback((field) => (event) => {
    setFields((currentFields) => ({
      ...currentFields,
      [field]: event.target.value,
    }));
  }, []);

  const handleTogglePasswordVisibility = useCallback((field) => {
    setVisibility((currentVisibility) => ({
      ...currentVisibility,
      [field]: !currentVisibility[field],
    }));
  }, []);

  const isPasswordSubmitDisabled = useMemo(
    () => !isChangePasswordReady(fields),
    [fields],
  );

  const resetPasswordFields = useCallback(() => {
    setFields(createEmptyPasswordFields());
    setVisibility(createInitialVisibility());
  }, []);

  const handlePasswordSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!fields[ACCOUNT_PASSWORD_FIELDS.CURRENT].trim()) {
        toast.error(ACCOUNT_CONTENT.toasts.currentPasswordRequired);
        return;
      }

      if (fields[ACCOUNT_PASSWORD_FIELDS.NEW].trim().length < ACCOUNT_MIN_PASSWORD_LENGTH) {
        toast.error(ACCOUNT_CONTENT.toasts.passwordTooShort);
        return;
      }

      if (fields[ACCOUNT_PASSWORD_FIELDS.NEW] !== fields[ACCOUNT_PASSWORD_FIELDS.CONFIRM]) {
        toast.error(ACCOUNT_CONTENT.toasts.passwordMismatch);
        return;
      }

      resetPasswordFields();
      toast.success(ACCOUNT_CONTENT.toasts.passwordChanged);
    },
    [fields, resetPasswordFields],
  );

  return {
    passwordFields: fields,
    passwordVisibility: visibility,
    isPasswordSubmitDisabled,
    passwordCopy: ACCOUNT_CONTENT.changePassword,
    handlePasswordChange,
    handleTogglePasswordVisibility,
    handlePasswordSubmit,
    passwordFieldNames: ACCOUNT_PASSWORD_FIELDS,
  };
};

export default useChangePassword;
