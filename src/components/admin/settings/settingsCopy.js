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
    roleLabel: 'Role',
    /** Matches Figma label spelling on Setting Page node 352:8307. */
    roleModeratorLabel: 'Moderetor',
    sendLabel: 'Send Invite',
    emailRequired: 'Enter an email address.',
    emailInvalid: 'Please enter a valid email address.',
  },
  editMatrix: {
    title: 'Edit Matrix',
    moduleColumn: 'Module / Page',
    moderatorColumn: 'Moderator',
    actionColumn: 'Action',
    deleteLabel: (moduleName) => `Remove ${moduleName} from edit matrix`,
    toggleLabel: (moduleName, enabled) =>
      `${enabled ? 'Disable' : 'Enable'} moderator edit for ${moduleName}`,
  },
  visibilityMatrix: {
    title: 'Visibility Matrix',
    moduleColumn: 'Module / Page',
    moderatorColumn: 'Moderator',
    downloadLabel: 'Download',
    visible: 'Visible',
    hidden: 'Hidden',
  },
  toasts: {
    inviteSent: 'Invite sent successfully.',
    moduleRemoved: 'Module removed from edit matrix.',
    downloadReady: 'Visibility matrix downloaded.',
  },
};
