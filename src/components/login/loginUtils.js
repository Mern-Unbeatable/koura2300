import { ROUTES } from '../../config';
import { LOGIN_COPY } from './loginCopy';
import {
  LOGIN_EMAIL_REGEX,
  USER_ROLES,
  DUMMY_CREDENTIALS,
  DUMMY_PASSWORD_ALIASES,
} from './loginData';

const matchesDummyPassword = (password) =>
  DUMMY_PASSWORD_ALIASES.includes(String(password ?? ''));

export const validateDummyCredentials = (email, password) => {
  const normalizedEmail = String(email || '').trim().toLowerCase();

  if (
    normalizedEmail === DUMMY_CREDENTIALS.ADMIN.email.toLowerCase() &&
    matchesDummyPassword(password)
  ) {
    return DUMMY_CREDENTIALS.ADMIN;
  }

  if (
    (normalizedEmail === DUMMY_CREDENTIALS.USER.email.toLowerCase() ||
      normalizedEmail === 'user@gnmail.com') &&
    matchesDummyPassword(password)
  ) {
    return DUMMY_CREDENTIALS.USER;
  }

  return null;
};

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

  const normalizedEmail = String(email || '').toLowerCase().trim();
  if (normalizedEmail === 'admin@gmail.com' || /admin/i.test(normalizedEmail)) {
    return USER_ROLES.ADMIN;
  }

  return USER_ROLES.USER;
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

export const validateCreateAccountForm = ({
  name = '',
  phone = '',
  address = '',
  email = '',
  password = '',
}) => {
  const errors = {};
  const emailError = validateEmailField(email);

  if (!name.trim()) {
    errors.name = LOGIN_COPY.validation.nameRequired;
  }

  if (!phone.trim()) {
    errors.phone = LOGIN_COPY.validation.phoneRequired;
  }

  if (!address.trim()) {
    errors.address = LOGIN_COPY.validation.addressRequired;
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
