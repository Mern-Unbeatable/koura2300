import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_COPY } from '../components/login/loginCopy';
import { LOGIN_AUTH_MODES, USER_ROLES } from '../components/login/loginData';
import {
  buildAuthUser,
  resolveLoginRole,
  resolvePostLoginPath,
  validateCreateAccountForm,
  validateLoginForm,
} from '../components/login/loginUtils';
import { API_ENDPOINTS } from '../services/httpEndpoint';
import { httpMethods } from '../services/httpMethods';
import {
  loginSuccess,
  selectIsAuthenticated,
  selectUser,
} from '../store/slices/authSlice';

const isMockAuthEnabled = () => process.env.REACT_APP_DEV_MOCK_AUTH === 'true';

const DEV_LOGIN_EMAIL = process.env.REACT_APP_DEV_DEFAULT_EMAIL || '';
const DEV_LOGIN_PASSWORD = process.env.REACT_APP_DEV_DEFAULT_PASSWORD || '';

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
    (user, token) => {
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
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      if (isMockAuthEnabled()) {
        const role = resolveLoginRole(email, null);
        completeAuth(buildAuthUser({ email, role }), null);
        return;
      }

      const { data, error } = await httpMethods.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      if (error) {
        setErrors({
          form:
            error?.data?.message ??
            error?.message ??
            LOGIN_COPY.validation.invalidCredentials,
        });
        return;
      }

      const { token, user: apiUser } = extractAuthPayload(data);
      const role = resolveLoginRole(email, apiUser);
      completeAuth(buildAuthUser({ ...(apiUser || {}), email, role }), token);
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
      return;
    }

    setErrors({});
    setIsLoading(true);

    const profile = { name, phone, address, email, role: USER_ROLES.USER };

    try {
      if (isMockAuthEnabled()) {
        completeAuth(buildAuthUser(profile), null);
        return;
      }

      const { data, error } = await httpMethods.post(API_ENDPOINTS.AUTH.REGISTER, {
        ...profile,
        password,
      });

      if (error) {
        setErrors({
          form:
            error?.data?.message ??
            error?.message ??
            LOGIN_COPY.validation.registerFailed,
        });
        return;
      }

      const { token, user: apiUser } = extractAuthPayload(data);
      completeAuth(buildAuthUser({ ...(apiUser || {}), ...profile }), token);
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
    onTogglePasswordVisibility: handleTogglePasswordVisibility,
    onSwitchToCreateAccount: handleSwitchToCreateAccount,
    onSwitchToLogin: handleSwitchToLogin,
    onSubmit: handleSubmit,
  };
};

export default useLogin;
