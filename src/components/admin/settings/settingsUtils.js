import { SETTINGS_COPY } from './settingsCopy';
import { SETTINGS_EMAIL_REGEX } from './settingsData';

export const validateInviteEmail = (email, copy = SETTINGS_COPY) => {
  const trimmed = email.trim();
  if (!trimmed) {
    return copy.invite.emailRequired;
  }
  if (!SETTINGS_EMAIL_REGEX.test(trimmed)) {
    return copy.invite.emailInvalid;
  }
  return '';
};

export const getTotalPages = (totalItems, pageSize) =>
  Math.max(1, Math.ceil(totalItems / pageSize));

export const paginateModerators = (moderators, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return moderators.slice(startIndex, startIndex + pageSize);
};

export const getPaginationRangeLabel = (currentPage, pageSize, totalItems) => {
  if (totalItems === 0) {
    return 'Showing 0 to 0 of 0 results';
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return `Showing ${start} to ${end} of ${totalItems} results`;
};

export const getModeratorCountLabel = (count, copy = SETTINGS_COPY) =>
  copy.moderators.countLabel(count);
