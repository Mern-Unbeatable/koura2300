import { useCallback, useState } from 'react';
import { SERVICE_DETAILS_CONTENT } from '../components/serviceDetails/serviceDetailsCopy';

export const ACCOUNT_MODE = {
  SIGN_UP: 'signup',
  LOGIN: 'login',
};

const createEmptyFields = () => ({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  password: '',
});

const isSignUpFilled = (fields) =>
  Object.values(fields).every((value) => value.trim().length > 0);

const isLoginFilled = (fields) =>
  fields.email.trim().length > 0 && fields.password.trim().length > 0;

const useServiceCreateAccount = ({ onComplete } = {}) => {
  const [fields, setFields] = useState(createEmptyFields);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState(ACCOUNT_MODE.SIGN_UP);

  const isLoginMode = mode === ACCOUNT_MODE.LOGIN;

  const handleFieldChange = useCallback((name) => (event) => {
    setFields((previous) => ({ ...previous, [name]: event.target.value }));
  }, []);

  const handleTogglePassword = useCallback(() => {
    setShowPassword((previous) => !previous);
  }, []);

  const handleSwitchToLogin = useCallback(() => {
    setMode(ACCOUNT_MODE.LOGIN);
    setShowPassword(false);
  }, []);

  const handleSwitchToSignUp = useCallback(() => {
    setMode(ACCOUNT_MODE.SIGN_UP);
    setShowPassword(false);
  }, []);

  const isSubmitEnabled = isLoginMode
    ? isLoginFilled(fields)
    : isSignUpFilled(fields);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!isSubmitEnabled) {
        return;
      }
      onComplete?.(fields);
    },
    [fields, isSubmitEnabled, onComplete],
  );

  return {
    fields,
    showPassword,
    isSubmitEnabled,
    isLoginMode,
    copy: SERVICE_DETAILS_CONTENT.createAccount,
    handleFieldChange,
    handleTogglePassword,
    handleSwitchToLogin,
    handleSwitchToSignUp,
    handleSubmit,
  };
};

export default useServiceCreateAccount;
