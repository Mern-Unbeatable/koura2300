import {
  ACCOUNT_DEFAULT_PROFILE,
  ACCOUNT_MIN_PASSWORD_LENGTH,
  ACCOUNT_PASSWORD_FIELDS,
  ACCOUNT_PROFILE_FIELDS,
} from './accountData';

const PROFILE_TEXT_FIELDS = [
  ACCOUNT_PROFILE_FIELDS.FULL_NAME,
  ACCOUNT_PROFILE_FIELDS.EMAIL,
  ACCOUNT_PROFILE_FIELDS.PHONE,
  ACCOUNT_PROFILE_FIELDS.ADDRESS,
];

const splitFullName = (fullName = '') => {
  const trimmed = fullName.trim();

  if (!trimmed) {
    return { firstName: '', lastName: '' };
  }

  const [firstName, ...rest] = trimmed.split(/\s+/);
  return {
    firstName,
    lastName: rest.join(' '),
  };
};

const resolveFullName = (user) => {
  if (user.name?.trim()) {
    return user.name.trim();
  }

  return [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
};

export const buildAccountProfileFromUser = (user) => {
  if (!user) {
    return { ...ACCOUNT_DEFAULT_PROFILE };
  }

  const fullName = resolveFullName(user);
  const displayName = fullName || user.email || 'User';

  return {
    fullName,
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    avatarUrl: user.avatarUrl || ACCOUNT_DEFAULT_PROFILE.avatarUrl,
    avatarAlt: `${displayName} profile photo`,
  };
};

export const buildAuthUserFromProfile = (profile) => {
  const { firstName, lastName } = splitFullName(profile.fullName);

  return {
    firstName,
    lastName,
    name: profile.fullName.trim(),
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    avatarUrl: profile.avatarUrl,
  };
};

export const isAccountProfileComplete = (profile) =>
  PROFILE_TEXT_FIELDS.every((field) => profile?.[field]?.trim().length > 0);

export const hasAccountProfileChanges = (currentProfile, savedProfile) => {
  if (!currentProfile || !savedProfile) {
    return false;
  }

  const fieldsChanged = PROFILE_TEXT_FIELDS.some(
    (field) => (currentProfile[field] || '').trim() !== (savedProfile[field] || '').trim(),
  );

  if (fieldsChanged) {
    return true;
  }

  return (currentProfile.avatarUrl || '') !== (savedProfile.avatarUrl || '');
};

export const isChangePasswordReady = (fields) => {
  const currentPassword = fields?.[ACCOUNT_PASSWORD_FIELDS.CURRENT]?.trim() || '';
  const newPassword = fields?.[ACCOUNT_PASSWORD_FIELDS.NEW]?.trim() || '';
  const confirmPassword = fields?.[ACCOUNT_PASSWORD_FIELDS.CONFIRM]?.trim() || '';

  if (!currentPassword || !newPassword || !confirmPassword) {
    return false;
  }

  if (newPassword.length < ACCOUNT_MIN_PASSWORD_LENGTH) {
    return false;
  }

  return newPassword === confirmPassword;
};

export const hasChangePasswordInput = (fields) =>
  Object.values(fields || {}).some((value) => String(value || '').length > 0);
