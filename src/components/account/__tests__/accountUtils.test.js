import {
  buildAccountProfileFromUser,
  buildAuthUserFromProfile,
} from '../accountUtils';
import { ACCOUNT_DEFAULT_PROFILE } from '../accountData';

describe('accountUtils', () => {
  it('falls back to the default profile when no user is logged in', () => {
    expect(buildAccountProfileFromUser(null)).toEqual(ACCOUNT_DEFAULT_PROFILE);
  });

  it('maps the logged-in user into account setting fields', () => {
    expect(
      buildAccountProfileFromUser({
        name: 'Jane Doe',
        email: 'jane@test.com',
        phone: '555-0100',
        address: '12 Main St',
      }),
    ).toEqual({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@test.com',
      phone: '555-0100',
      address: '12 Main St',
      avatarUrl: ACCOUNT_DEFAULT_PROFILE.avatarUrl,
      avatarAlt: 'Jane Doe profile photo',
    });
  });

  it('prefers explicit first and last name fields when present', () => {
    expect(
      buildAccountProfileFromUser({
        firstName: 'Kamrul',
        lastName: 'Hasan',
        name: 'Ignored Name',
        email: 'kamrul@test.com',
      }),
    ).toMatchObject({
      firstName: 'Kamrul',
      lastName: 'Hasan',
      email: 'kamrul@test.com',
    });
  });

  it('builds auth user updates from the account profile form', () => {
    expect(
      buildAuthUserFromProfile({
        firstName: 'Jane',
        lastName: 'Doe',
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
});
