import {
  getModeratorCountLabel,
  getPaginationRangeLabel,
  getTotalPages,
  paginateModerators,
  validateInviteEmail,
} from '../settingsUtils';
import { SETTINGS_COPY } from '../settingsCopy';
import {
  SETTINGS_MODERATOR_PAGE_SIZE,
  SETTINGS_MODERATORS_SEED,
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

  it('builds the moderator count label from Figma copy', () => {
    expect(getModeratorCountLabel(7)).toBe('7 moderator');
  });

  it('paginates moderators without mutating the seed', () => {
    const pageOne = paginateModerators(SETTINGS_MODERATORS_SEED, 1, SETTINGS_MODERATOR_PAGE_SIZE);

    expect(pageOne).toHaveLength(SETTINGS_MODERATOR_PAGE_SIZE);
    expect(pageOne[0].name).toBe('Albert Flores');
    expect(SETTINGS_MODERATORS_SEED).toHaveLength(7);
  });

  it('builds the pagination range label', () => {
    expect(getPaginationRangeLabel(1, SETTINGS_MODERATOR_PAGE_SIZE, 7)).toBe(
      'Showing 1 to 7 of 7 results',
    );
    expect(getPaginationRangeLabel(1, SETTINGS_MODERATOR_PAGE_SIZE, 0)).toBe(
      'Showing 0 to 0 of 0 results',
    );
  });

  it('calculates total pages', () => {
    expect(getTotalPages(7, SETTINGS_MODERATOR_PAGE_SIZE)).toBe(1);
    expect(getTotalPages(8, SETTINGS_MODERATOR_PAGE_SIZE)).toBe(2);
  });
});
