export const SETTINGS_COPY = {
  seo: {
    title: 'Settings | Admin',
    description: 'Manage role and permission strategy for staff access.',
    keywords: ['settings', 'roles', 'permissions', 'admin'],
  },
  title: 'Role & Permission Strategy',
  subtitleLineOne:
    'Documentation of the access control layers implemented in Construpreco.',
  subtitleLineTwo:
    'This ensures data security and a focused user experience for each staff role.',
  regionLabel: 'Role and permission settings',
  invite: {
    title: 'Invite your team',
    descriptionLineOne:
      'Easily add new members to a role by entering their email addresses',
    descriptionLineTwo:
      "below. Once invited, they'll receive an email with a link to join.",
    emailLabel: 'Email Address',
    emailPlaceholder: 'Email Address',
    sendLabel: 'Send Invite',
    emailRequired: 'Enter an email address.',
    emailInvalid: 'Please enter a valid email address.',
  },
  moderators: {
    title: 'Moderator Management',
    countLabel: (count) => `${count} moderator`,
    columns: {
      name: 'Moderator name',
      phone: 'Phone number',
      email: 'Email',
      access: 'Access',
      status: 'Status',
      action: 'Action',
    },
    status: {
      active: 'Active',
      disabled: 'Disabled',
    },
    editLabel: (name) => `Edit ${name}`,
    pagination: {
      previous: 'Previous',
      next: 'Next',
      regionLabel: 'Moderator pagination',
    },
  },
  toasts: {
    inviteSent: 'Invite sent successfully.',
    accessSaved: 'Moderator access saved successfully.',
  },
};
