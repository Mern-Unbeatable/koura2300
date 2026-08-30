import {
  buildVisibilityCsv,
  removeEditModule,
  toggleEditPermission,
  validateInviteEmail,
} from '../settingsUtils';
import { SETTINGS_COPY } from '../settingsCopy';
import {
  SETTINGS_EDIT_MATRIX_SEED,
  SETTINGS_VISIBILITY_MATRIX_SEED,
} from '../settingsData';

describe('settingsUtils', () => {
  it('requires a non-empty invite email', () => {
    expect(validateInviteEmail('')).toBe(SETTINGS_COPY.invite.emailRequired);
    expect(validateInviteEmail('   ')).toBe(SETTINGS_COPY.invite.emailRequired);
  });

  it('rejects invalid invite emails inline', () => {
    expect(validateInviteEmail('not-an-email')).toBe(SETTINGS_COPY.invite.emailInvalid);
  });

  it('accepts a valid invite email', () => {
    expect(validateInviteEmail('moderator@example.com')).toBe('');
  });

  it('toggles moderator edit permission for a module', () => {
    const next = toggleEditPermission(SETTINGS_EDIT_MATRIX_SEED, 'bookings');
    const bookings = next.find((module) => module.id === 'bookings');

    expect(bookings.canEdit).toBe(false);
    expect(SETTINGS_EDIT_MATRIX_SEED.find((module) => module.id === 'bookings').canEdit).toBe(
      true,
    );
  });

  it('removes a module from the edit matrix without mutating the seed', () => {
    const next = removeEditModule(SETTINGS_EDIT_MATRIX_SEED, 'reviews');

    expect(next).toHaveLength(SETTINGS_EDIT_MATRIX_SEED.length - 1);
    expect(next.some((module) => module.id === 'reviews')).toBe(false);
    expect(SETTINGS_EDIT_MATRIX_SEED).toHaveLength(9);
  });

  it('builds a CSV matching the Visibility Matrix columns', () => {
    const csv = buildVisibilityCsv(SETTINGS_VISIBILITY_MATRIX_SEED);

    expect(csv).toContain('Module / Page,Moderator');
    expect(csv).toContain('Bookings,Visible');
    expect(csv).toContain('Reviews,Hidden');
    expect(csv).toContain('Overview / Analytics,Hidden');
  });
});
