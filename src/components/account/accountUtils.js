import { ACCOUNT_DEFAULT_PROFILE } from './accountData';

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
