import { ROUTES } from '../../../config';
import {
  buildAuthUser,
  getAccountNavLabel,
  isAdminUser,
  resolveLoginRole,
  resolvePostLoginPath,
  validateCreateAccountForm,
  validateDummyCredentials,
  validateLoginForm,
} from '../loginUtils';
import { USER_ROLES } from '../loginData';

describe('loginUtils', () => {
  describe('validateDummyCredentials', () => {
    it('authenticates admin@gmail.com with password123 as admin', () => {
      const result = validateDummyCredentials('admin@gmail.com', 'password123');
      expect(result).toMatchObject({
        email: 'admin@gmail.com',
        role: USER_ROLES.ADMIN,
      });
    });

    it('authenticates admin with common password aliases', () => {
      expect(validateDummyCredentials('admin@gmail.com', 'password@123')).toMatchObject({
        role: USER_ROLES.ADMIN,
      });
      expect(validateDummyCredentials('admin@gmail.com', 'Admin@123')).toMatchObject({
        role: USER_ROLES.ADMIN,
      });
    });

    it('authenticates user@gmail.com with password123 as user', () => {
      const result = validateDummyCredentials('user@gmail.com', 'password123');
      expect(result).toMatchObject({
        email: 'user@gmail.com',
        role: USER_ROLES.USER,
      });
    });

    it('returns null for invalid email or wrong password', () => {
      expect(validateDummyCredentials('random@gmail.com', 'password123')).toBeNull();
      expect(validateDummyCredentials('admin@gmail.com', 'wrongpassword')).toBeNull();
    });
  });

  describe('isAdminUser', () => {
    it('returns true only for admin role', () => {
      expect(isAdminUser({ role: USER_ROLES.ADMIN })).toBe(true);
      expect(isAdminUser({ role: 'Admin' })).toBe(true);
      expect(isAdminUser({ role: USER_ROLES.USER })).toBe(false);
      expect(isAdminUser(null)).toBe(false);
    });
  });

  describe('resolveLoginRole', () => {
    it('prefers API role and falls back to email heuristic', () => {
      expect(resolveLoginRole('a@b.com', { role: 'admin' })).toBe(USER_ROLES.ADMIN);
      expect(resolveLoginRole('user@test.com', { role: 'user' })).toBe(USER_ROLES.USER);
      expect(resolveLoginRole('admin@test.com', null)).toBe(USER_ROLES.ADMIN);
      expect(resolveLoginRole('person@test.com', null)).toBe(USER_ROLES.USER);
    });
  });

  describe('resolvePostLoginPath', () => {
    it('sends admins to dashboard and users to home', () => {
      expect(resolvePostLoginPath({ role: USER_ROLES.ADMIN }, null)).toBe(
        ROUTES.ADMIN_DASHBOARD,
      );
      expect(resolvePostLoginPath({ role: USER_ROLES.USER }, null)).toBe(ROUTES.HOME);
    });

    it('never sends users to admin routes', () => {
      expect(
        resolvePostLoginPath({ role: USER_ROLES.USER }, ROUTES.ADMIN_DASHBOARD),
      ).toBe(ROUTES.HOME);
    });

    it('restores admin from-path when it is an admin route', () => {
      expect(
        resolvePostLoginPath({ role: USER_ROLES.ADMIN }, ROUTES.ADMIN_CATEGORIES),
      ).toBe(ROUTES.ADMIN_CATEGORIES);
    });
  });

  describe('buildAuthUser / getAccountNavLabel', () => {
    it('builds a user and prefers name for Account label', () => {
      const user = buildAuthUser({
        email: 'jane@test.com',
        name: 'Jane Doe',
        role: USER_ROLES.USER,
      });

      expect(user).toEqual({
        email: 'jane@test.com',
        name: 'Jane Doe',
        role: USER_ROLES.USER,
      });
      expect(getAccountNavLabel(user, 'Account')).toBe('Jane Doe');
      expect(getAccountNavLabel(null, 'Account')).toBe('Account');
    });
  });

  describe('form validation', () => {
    it('validates login and create-account forms', () => {
      expect(validateLoginForm('', '')).toMatchObject({
        email: expect.any(String),
        password: expect.any(String),
      });
      expect(validateCreateAccountForm({ name: '', email: 'x', password: '1' })).toMatchObject({
        name: expect.any(String),
        phone: expect.any(String),
        address: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
      });
      expect(
        validateCreateAccountForm({
          name: 'Jane',
          phone: '555-0100',
          address: '12 Main St',
          email: 'jane@test.com',
          password: 'password123',
        }),
      ).toEqual({});
    });
  });
});
