import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_COPY } from '../components/login/loginCopy';
import { LOGIN_AUTH_MODES, USER_ROLES, DUMMY_CREDENTIALS } from '../components/login/loginData';
import {
  buildAuthUser,
  resolveLoginRole,
  resolvePostLoginPath,
  validateCreateAccountForm,
  validateDummyCredentials,
  validateLoginForm,
} from '../components/login/loginUtils';
import { API_ENDPOINTS } from '../services/httpEndpoint';
import { httpMethods } from '../services/httpMethods';
import { isMockAuthEnabled } from '../config/authConfig';
import {
  loginSuccess,
  selectIsAuthenticated,
  selectUser,
} from '../store/slices/authSlice';

const LEGACY_DEV_PASSWORD_ALIASES = new Set(['Admin@123', 'password@123']);

const resolveDevLoginEmail = () =>
  process.env.REACT_APP_DEV_DEFAULT_EMAIL || DUMMY_CREDENTIALS.ADMIN.email;

const resolveDevLoginPassword = () => {
  const fromEnv = process.env.REACT_APP_DEV_DEFAULT_PASSWORD || '';
  if (!fromEnv || LEGACY_DEV_PASSWORD_ALIASES.has(fromEnv)) {
    return DUMMY_CREDENTIALS.ADMIN.password;
  }

  return fromEnv;
};

const DEV_LOGIN_EMAIL = resolveDevLoginEmail();
const DEV_LOGIN_PASSWORD = resolveDevLoginPassword();

const extractAuthPayload = (data) => ({
  token: data?.token ?? data?.data?.token ?? data?.accessToken ?? null,
  user: data?.user ?? data?.data?.user ?? null,
});

const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authUser = useSelector(selectUser);

  const [authMode, setAuthMode] = useState(LOGIN_AUTH_MODES.LOGIN);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState(DEV_LOGIN_EMAIL);
  const [password, setPassword] = useState(DEV_LOGIN_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fromPath = location.state?.from?.pathname;

  useEffect(() => {
    if (!isAuthenticated || !authUser) {
      return;
    }

    navigate(resolvePostLoginPath(authUser, fromPath), { replace: true });
  }, [authUser, fromPath, isAuthenticated, navigate]);

  const completeAuth = useCallback(
    (user, token, successMessage = LOGIN_COPY.toasts.loginSuccess) => {
      toast.success(successMessage);
      dispatch(loginSuccess({ user, token }));
      navigate(resolvePostLoginPath(user, fromPath), { replace: true });
    },
    [dispatch, fromPath, navigate],
  );

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const handlePhoneChange = useCallback((event) => {
    setPhone(event.target.value);
  }, []);

  const handleAddressChange = useCallback((event) => {
    setAddress(event.target.value);
  }, []);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const handleFillAdminCredentials = useCallback(() => {
    setEmail(DUMMY_CREDENTIALS.ADMIN.email);
    setPassword(DUMMY_CREDENTIALS.ADMIN.password);
    setErrors({});
  }, []);

  const handleFillUserCredentials = useCallback(() => {
    setEmail(DUMMY_CREDENTIALS.USER.email);
    setPassword(DUMMY_CREDENTIALS.USER.password);
    setErrors({});
  }, []);

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword((currentValue) => !currentValue);
  }, []);

  const handleSwitchToCreateAccount = useCallback(() => {
    setAuthMode(LOGIN_AUTH_MODES.CREATE_ACCOUNT);
    setName('');
    setPhone('');
    setAddress('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setErrors({});
  }, []);

  const handleSwitchToLogin = useCallback(() => {
    setAuthMode(LOGIN_AUTH_MODES.LOGIN);
    setName('');
    setPhone('');
    setAddress('');
    setEmail(DEV_LOGIN_EMAIL);
    setPassword(DEV_LOGIN_PASSWORD);
    setShowPassword(false);
    setErrors({});
  }, []);

  const submitLogin = useCallback(async () => {
    const validationErrors = validateLoginForm(email, password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstError = Object.values(validationErrors)[0];
      if (firstError) {
        toast.error(firstError);
      }
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Prefer mock/demo credentials first so local + staging always work
      // even when a real auth API is misconfigured or unreachable.
      const dummyUser = validateDummyCredentials(email, password);
      if (dummyUser) {
        completeAuth(buildAuthUser(dummyUser), null);
        return;
      }

      if (isMockAuthEnabled()) {
        const errorMessage = LOGIN_COPY.validation.invalidCredentials;
        setErrors({ form: errorMessage });
        toast.error(errorMessage);
        return;
      }

      const { data, error } = await httpMethods.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      if (error) {
        const errorMessage =
          error?.data?.message ??
          error?.message ??
          LOGIN_COPY.validation.invalidCredentials;
        setErrors({ form: errorMessage });
        toast.error(errorMessage);
        return;
      }

      const { token, user: apiUser } = extractAuthPayload(data);
      const role = resolveLoginRole(email, apiUser);
      completeAuth(buildAuthUser({ ...(apiUser || {}), email, role }), token);
    } catch (err) {
      const fallbackUser = validateDummyCredentials(email, password);
      if (fallbackUser) {
        completeAuth(buildAuthUser(fallbackUser), null);
        return;
      }

      const errorMessage = err?.message || LOGIN_COPY.validation.invalidCredentials;
      setErrors({ form: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [completeAuth, email, password]);

  const submitCreateAccount = useCallback(async () => {
    const validationErrors = validateCreateAccountForm({
      name,
      phone,
      address,
      email,
      password,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstError = Object.values(validationErrors)[0];
      if (firstError) {
        toast.error(firstError);
      }
      return;
    }

    setErrors({});
    setIsLoading(true);

    const profile = { name, phone, address, email, role: USER_ROLES.USER };

    try {
      if (isMockAuthEnabled()) {
        completeAuth(buildAuthUser(profile), null, LOGIN_COPY.toasts.registerSuccess);
        return;
      }

      const { data, error } = await httpMethods.post(API_ENDPOINTS.AUTH.REGISTER, {
        ...profile,
        password,
      });

      if (error) {
        const errorMessage =
          error?.data?.message ??
          error?.message ??
          LOGIN_COPY.validation.registerFailed;
        setErrors({ form: errorMessage });
        toast.error(errorMessage);
        return;
      }

      const { token, user: apiUser } = extractAuthPayload(data);
      completeAuth(buildAuthUser({ ...(apiUser || {}), ...profile }), token, LOGIN_COPY.toasts.registerSuccess);
    } catch (err) {
      const errorMessage = err?.message || LOGIN_COPY.validation.registerFailed;
      setErrors({ form: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [address, completeAuth, email, name, password, phone]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (authMode === LOGIN_AUTH_MODES.CREATE_ACCOUNT) {
        await submitCreateAccount();
        return;
      }

      await submitLogin();
    },
    [authMode, submitCreateAccount, submitLogin],
  );

  return {
    copy: LOGIN_COPY,
    authMode,
    name,
    phone,
    address,
    email,
    password,
    showPassword,
    errors,
    isLoading,
    onNameChange: handleNameChange,
    onPhoneChange: handlePhoneChange,
    onAddressChange: handleAddressChange,
    onEmailChange: handleEmailChange,
    onPasswordChange: handlePasswordChange,
    onFillAdminCredentials: handleFillAdminCredentials,
    onFillUserCredentials: handleFillUserCredentials,
    onTogglePasswordVisibility: handleTogglePasswordVisibility,
    onSwitchToCreateAccount: handleSwitchToCreateAccount,
    onSwitchToLogin: handleSwitchToLogin,
    onSubmit: handleSubmit,
  };
};

export default useLogin;
