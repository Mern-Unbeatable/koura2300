import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_COPY } from '../components/login/loginCopy';
import { LOGIN_EMAIL_REGEX } from '../components/login/loginData';
import { ROUTES } from '../config';
import { API_ENDPOINTS } from '../services/httpEndpoint';
import { httpMethods } from '../services/httpMethods';
import { loginSuccess } from '../store/slices/authSlice';

const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = LOGIN_COPY.validation.emailRequired;
  } else if (!LOGIN_EMAIL_REGEX.test(email)) {
    errors.email = LOGIN_COPY.validation.emailInvalid;
  }

  if (!password) {
    errors.password = LOGIN_COPY.validation.passwordRequired;
  }

  return errors;
};

const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(process.env.REACT_APP_DEV_DEFAULT_EMAIL || '');
  const [password, setPassword] = useState(process.env.REACT_APP_DEV_DEFAULT_PASSWORD || '');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword((currentValue) => !currentValue);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const validationErrors = validateLoginForm(email, password);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});
      setIsLoading(true);

      try {
        if (process.env.REACT_APP_DEV_MOCK_AUTH === 'true') {
          dispatch(loginSuccess({ user: { email }, token: null }));
          const destination = location.state?.from?.pathname ?? ROUTES.ADMIN_DASHBOARD;
          navigate(destination, { replace: true });
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

        const token = data?.token ?? data?.data?.token ?? data?.accessToken;
        const user = data?.user ?? data?.data?.user ?? null;
        dispatch(loginSuccess({ user, token }));

        const destination = location.state?.from?.pathname ?? ROUTES.ADMIN_DASHBOARD;
        navigate(destination, { replace: true });
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, email, location.state?.from?.pathname, navigate, password],
  );

  return {
    copy: LOGIN_COPY,
    email,
    password,
    showPassword,
    errors,
    isLoading,
    onEmailChange: handleEmailChange,
    onPasswordChange: handlePasswordChange,
    onTogglePasswordVisibility: handleTogglePasswordVisibility,
    onSubmit: handleSubmit,
  };
};

export default useLogin;
