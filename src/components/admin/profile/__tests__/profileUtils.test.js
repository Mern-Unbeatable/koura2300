import {
  validateProfileAccount,
  validateProfilePassword,
} from '../profileUtils';
import { PROFILE_COPY } from '../profileCopy';
import { PROFILE_MIN_PASSWORD_LENGTH } from '../profileData';

describe('profileUtils', () => {
  describe('validateProfileAccount', () => {
    it('requires name and email', () => {
      expect(validateProfileAccount({ name: '', email: '' })).toEqual({
        name: PROFILE_COPY.errors.nameRequired,
        email: PROFILE_COPY.errors.emailRequired,
      });
    });

    it('rejects an invalid email', () => {
      expect(validateProfileAccount({ name: 'John', email: 'bad' })).toEqual({
        name: '',
        email: PROFILE_COPY.errors.emailInvalid,
      });
    });

    it('accepts a valid account payload', () => {
      expect(
        validateProfileAccount({
          name: 'John Industries',
          email: 'admin@johnindustries.com',
        }),
      ).toEqual({ name: '', email: '' });
    });
  });

  describe('validateProfilePassword', () => {
    it('requires the current password', () => {
      expect(
        validateProfilePassword({
          currentPassword: '',
          newPassword: 'password123',
          confirmPassword: 'password123',
        }),
      ).toMatchObject({
        currentPassword: PROFILE_COPY.errors.currentPasswordRequired,
      });
    });

    it('enforces the minimum new password length', () => {
      expect(
        validateProfilePassword({
          currentPassword: 'old-password',
          newPassword: 'short',
          confirmPassword: 'short',
        }),
      ).toMatchObject({
        newPassword: PROFILE_COPY.errors.newPasswordTooShort(PROFILE_MIN_PASSWORD_LENGTH),
      });
    });

    it('requires confirm password to match', () => {
      expect(
        validateProfilePassword({
          currentPassword: 'old-password',
          newPassword: 'password123',
          confirmPassword: 'password999',
        }),
      ).toMatchObject({
        confirmPassword: PROFILE_COPY.errors.confirmPasswordMismatch,
      });
    });

    it('accepts a valid password payload', () => {
      expect(
        validateProfilePassword({
          currentPassword: 'old-password',
          newPassword: 'password123',
          confirmPassword: 'password123',
        }),
      ).toEqual({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    });
  });
});
