import { SETTINGS_COPY } from './settingsCopy';
import {
  SETTINGS_EMAIL_REGEX,
  SETTINGS_VISIBILITY_CSV_FILENAME,
  getVisibilityLabel,
} from './settingsData';

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

export const toggleEditPermission = (modules, moduleId) =>
  modules.map((module) =>
    module.id === moduleId ? { ...module, canEdit: !module.canEdit } : module,
  );

export const removeEditModule = (modules, moduleId) =>
  modules.filter((module) => module.id !== moduleId);

export const buildVisibilityCsv = (rows, copy = SETTINGS_COPY) => {
  const header = `${copy.visibilityMatrix.moduleColumn},${copy.visibilityMatrix.moderatorColumn}`;
  const body = rows
    .map((row) => `${escapeCsvValue(row.name)},${escapeCsvValue(getVisibilityLabel(row.visibility, copy))}`)
    .join('\n');
  return `${header}\n${body}\n`;
};

const escapeCsvValue = (value) => {
  const text = String(value ?? '');
  if (text.includes(',') || text.includes('"') || text.includes('\n')) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
};

export const downloadVisibilityCsv = (rows, copy = SETTINGS_COPY) => {
  const csv = buildVisibilityCsv(rows, copy);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = SETTINGS_VISIBILITY_CSV_FILENAME;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
