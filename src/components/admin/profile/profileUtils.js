import { PROFILE_COPY } from './profileCopy';
import { PROFILE_EMAIL_REGEX, PROFILE_MIN_PASSWORD_LENGTH } from './profileData';

const createEmptyAccountErrors = () => ({
  name: '',
  email: '',
});

const createEmptyPasswordErrors = () => ({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

export const validateProfileAccount = (
  { name, email },
  copy = PROFILE_COPY,
) => {
  const errors = createEmptyAccountErrors();
  const trimmedName = String(name || '').trim();
  const trimmedEmail = String(email || '').trim();

  if (!trimmedName) {
    errors.name = copy.errors.nameRequired;
  }

  if (!trimmedEmail) {
    errors.email = copy.errors.emailRequired;
  } else if (!PROFILE_EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = copy.errors.emailInvalid;
  }

  return errors;
};

export const hasProfileErrors = (errors) =>
  Object.values(errors).some((message) => Boolean(message));

export const validateProfilePassword = (
  { currentPassword, newPassword, confirmPassword },
  copy = PROFILE_COPY,
  minLength = PROFILE_MIN_PASSWORD_LENGTH,
) => {
  const errors = createEmptyPasswordErrors();
  const trimmedCurrent = String(currentPassword || '');
  const trimmedNew = String(newPassword || '');
  const trimmedConfirm = String(confirmPassword || '');

  if (!trimmedCurrent.trim()) {
    errors.currentPassword = copy.errors.currentPasswordRequired;
  }

  if (!trimmedNew.trim()) {
    errors.newPassword = copy.errors.newPasswordRequired;
  } else if (trimmedNew.length < minLength) {
    errors.newPassword = copy.errors.newPasswordTooShort(minLength);
  }

  if (!trimmedConfirm.trim()) {
    errors.confirmPassword = copy.errors.confirmPasswordRequired;
  } else if (trimmedNew && trimmedConfirm !== trimmedNew) {
    errors.confirmPassword = copy.errors.confirmPasswordMismatch;
  }

  return errors;
};
