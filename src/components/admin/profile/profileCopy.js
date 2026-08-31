export const PROFILE_COPY = {
  seo: {
    title: 'My Profile | Admin',
    description: 'Manage your account and store preferences.',
    keywords: ['profile', 'account', 'admin', 'password'],
  },
  regionLabel: 'My profile settings',
  title: 'My Profile',
  subtitle: 'Manage your account and store preferences.',
  accountTitle: 'Account Information',
  passwordTitle: 'Change Password',
  fields: {
    name: 'Name',
    email: 'Email',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
  },
  placeholders: {
    password: '..........',
  },
  actions: {
    updateProfile: 'Update Profile',
    changePassword: 'Change Password',
    changeAvatar: 'Change profile photo',
  },
  visibility: {
    show: (fieldLabel) => `Show ${fieldLabel}`,
    hide: (fieldLabel) => `Hide ${fieldLabel}`,
  },
  errors: {
    nameRequired: 'Enter your name.',
    emailRequired: 'Enter your email address.',
    emailInvalid: 'Please enter a valid email address.',
    currentPasswordRequired: 'Enter your current password.',
    newPasswordRequired: 'Enter a new password.',
    newPasswordTooShort: (minLength) =>
      `New password must be at least ${minLength} characters.`,
    confirmPasswordRequired: 'Confirm your new password.',
    confirmPasswordMismatch: 'New password and confirmation do not match.',
  },
  toasts: {
    profileUpdated: 'Profile updated successfully.',
    passwordChanged: 'Password changed successfully.',
  },
};
