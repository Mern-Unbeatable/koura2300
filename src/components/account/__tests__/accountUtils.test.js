import {
  buildAccountProfileFromUser,
  buildAuthUserFromProfile,
} from '../accountUtils';
import { ACCOUNT_DEFAULT_PROFILE } from '../accountData';

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
});
