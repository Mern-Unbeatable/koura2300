import { ROUTES } from '../../config';
import { LOGIN_COPY } from './loginCopy';
import { LOGIN_EMAIL_REGEX, USER_ROLES } from './loginData';

export const isAdminUser = (user) => {
  if (!user) {
    return false;
  }

  const role = String(user.role || '').toLowerCase();

  if (role === USER_ROLES.ADMIN) {
    return true;
  }

  if (role === USER_ROLES.USER) {
    return false;
  }

  return /admin/i.test(user.email || '');
};

export const resolveLoginRole = (email, apiUser) => {
  const apiRole = String(apiUser?.role || '').toLowerCase();

  if (apiRole === USER_ROLES.ADMIN || apiRole === USER_ROLES.USER) {
    return apiRole;
  }

  return /admin/i.test(email) ? USER_ROLES.ADMIN : USER_ROLES.USER;
};

export const buildAuthUser = ({ email, name, role, ...rest }) => ({
  email,
  name: name?.trim() || email.split('@')[0],
  role,
  ...rest,
});

export const resolvePostLoginPath = (user, fromPath) => {
  if (isAdminUser(user)) {
    if (fromPath?.startsWith(ROUTES.ADMIN)) {
      return fromPath;
    }

    return ROUTES.ADMIN_DASHBOARD;
  }

  if (fromPath && !fromPath.startsWith(ROUTES.ADMIN)) {
    return fromPath;
  }

  return ROUTES.HOME;
};

export const getAccountNavLabel = (user, fallbackLabel) => {
  if (!user) {
    return fallbackLabel;
  }

  return user.name || user.email || fallbackLabel;
};

const validateEmailField = (email) => {
  if (!email.trim()) {
    return LOGIN_COPY.validation.emailRequired;
  }

  if (!LOGIN_EMAIL_REGEX.test(email)) {
    return LOGIN_COPY.validation.emailInvalid;
  }

  return null;
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  const emailError = validateEmailField(email);

  if (emailError) {
    errors.email = emailError;
  }

  if (!password) {
    errors.password = LOGIN_COPY.validation.passwordRequired;
  }

  return errors;
};

export const validateCreateAccountForm = ({ name, email, password }) => {
  const errors = {};
  const emailError = validateEmailField(email);

  if (!name.trim()) {
    errors.name = LOGIN_COPY.validation.nameRequired;
  }

  if (emailError) {
    errors.email = emailError;
  }

  if (!password) {
    errors.password = LOGIN_COPY.validation.passwordRequired;
  } else if (password.length < LOGIN_COPY.validation.minPasswordLength) {
    errors.password = LOGIN_COPY.validation.passwordTooShort;
  }

  return errors;
};
