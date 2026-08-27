import {
  buildAccountProfileFromUser,
  buildAuthUserFromProfile,
  hasAccountProfileChanges,
  hasChangePasswordInput,
  isAccountProfileComplete,
  isChangePasswordReady,
} from '../accountUtils';
import { ACCOUNT_DEFAULT_PROFILE, ACCOUNT_PASSWORD_FIELDS } from '../accountData';

describe('accountUtils', () => {
  it('falls back to the default profile when no user is logged in', () => {
    expect(buildAccountProfileFromUser(null)).toEqual(ACCOUNT_DEFAULT_PROFILE);
  });

  it('maps the logged-in user into a full name field', () => {
    expect(
      buildAccountProfileFromUser({
        name: 'Jane Doe',
        email: 'jane@test.com',
        phone: '555-0100',
        address: '12 Main St',
      }),
    ).toEqual({
      fullName: 'Jane Doe',
      email: 'jane@test.com',
      phone: '555-0100',
      address: '12 Main St',
      avatarUrl: ACCOUNT_DEFAULT_PROFILE.avatarUrl,
      avatarAlt: 'Jane Doe profile photo',
    });
  });

  it('builds auth user updates from the full name profile form', () => {
    expect(
      buildAuthUserFromProfile({
        fullName: 'Jane Doe',
        email: 'jane@test.com',
        phone: '555-0100',
        address: '12 Main St',
        avatarUrl: '/avatar.png',
      }),
    ).toEqual({
      firstName: 'Jane',
      lastName: 'Doe',
      name: 'Jane Doe',
      email: 'jane@test.com',
      phone: '555-0100',
      address: '12 Main St',
      avatarUrl: '/avatar.png',
    });
  });

  it('marks profile incomplete when phone or address is missing', () => {
    expect(
      isAccountProfileComplete({
        fullName: 'kamrul',
        email: 'kamrul@gmail.com',
        phone: '',
        address: '',
      }),
    ).toBe(false);

    expect(
      isAccountProfileComplete({
        fullName: 'kamrul',
        email: 'kamrul@gmail.com',
        phone: '555-0199',
        address: '42 Service Lane',
      }),
    ).toBe(true);
  });

  it('detects profile edits even when some fields stay empty', () => {
    const saved = {
      fullName: 'kamrul',
      email: 'kamrul@gmail.com',
      phone: '',
      address: '',
      avatarUrl: '/a.png',
    };

    expect(hasAccountProfileChanges(saved, saved)).toBe(false);
    expect(
      hasAccountProfileChanges(
        {
          ...saved,
          address: 'adsfdasf',
        },
        saved,
      ),
    ).toBe(true);
  });

  it('requires filled matching passwords of minimum length', () => {
    expect(
      isChangePasswordReady({
        [ACCOUNT_PASSWORD_FIELDS.CURRENT]: 'old-pass',
        [ACCOUNT_PASSWORD_FIELDS.NEW]: 'short',
        [ACCOUNT_PASSWORD_FIELDS.CONFIRM]: 'short',
      }),
    ).toBe(false);

    expect(
      isChangePasswordReady({
        [ACCOUNT_PASSWORD_FIELDS.CURRENT]: 'old-pass',
        [ACCOUNT_PASSWORD_FIELDS.NEW]: 'new-pass-1',
        [ACCOUNT_PASSWORD_FIELDS.CONFIRM]: 'new-pass-2',
      }),
    ).toBe(false);

    expect(
      isChangePasswordReady({
        [ACCOUNT_PASSWORD_FIELDS.CURRENT]: 'old-pass',
        [ACCOUNT_PASSWORD_FIELDS.NEW]: 'new-pass-1',
        [ACCOUNT_PASSWORD_FIELDS.CONFIRM]: 'new-pass-1',
      }),
    ).toBe(true);
  });

  it('detects any password input for enabling the submit button', () => {
    expect(
      hasChangePasswordInput({
        [ACCOUNT_PASSWORD_FIELDS.CURRENT]: '',
        [ACCOUNT_PASSWORD_FIELDS.NEW]: '',
        [ACCOUNT_PASSWORD_FIELDS.CONFIRM]: '',
      }),
    ).toBe(false);

    expect(
      hasChangePasswordInput({
        [ACCOUNT_PASSWORD_FIELDS.CURRENT]: 'a',
        [ACCOUNT_PASSWORD_FIELDS.NEW]: '',
        [ACCOUNT_PASSWORD_FIELDS.CONFIRM]: '',
      }),
    ).toBe(true);
  });
});
