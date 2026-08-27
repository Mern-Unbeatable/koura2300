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

export const buildAccountProfileFromUser = (user) => {
  if (!user) {
    return { ...ACCOUNT_DEFAULT_PROFILE };
  }

  const fromFullName = splitFullName(user.name || '');
  const firstName = user.firstName?.trim() || fromFullName.firstName;
  const lastName = user.lastName?.trim() || fromFullName.lastName;
  const displayName = [firstName, lastName].filter(Boolean).join(' ') || user.email || 'User';

  return {
    firstName,
    lastName,
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    avatarUrl: user.avatarUrl || ACCOUNT_DEFAULT_PROFILE.avatarUrl,
    avatarAlt: `${displayName} profile photo`,
  };
};

export const buildAuthUserFromProfile = (profile) => ({
  firstName: profile.firstName,
  lastName: profile.lastName,
  name: [profile.firstName, profile.lastName].filter(Boolean).join(' ').trim(),
  email: profile.email,
  phone: profile.phone,
  address: profile.address,
  avatarUrl: profile.avatarUrl,
});
