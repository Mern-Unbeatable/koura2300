import { LOGIN_MIN_PASSWORD_LENGTH } from './loginData';

export const LOGIN_COPY = {
  seo: {
    title: 'Sign In',
    description: 'Sign in or create your Logoipsum account.',
  },
  hero: {
    eyebrow: 'Logoipsum',
    title: 'Welcome back.',
    description:
      'Sign in to manage orders, book services, and access your account from one place.',
  },
  form: {
    title: 'Sign in to your account',
    subtitle: 'Enter your credentials to continue.',
    emailLabel: 'Email Address',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your full name',
    submit: 'Sign In to Dashboard',
    submitting: 'Signing in…',
    createSubmit: 'Create your Account',
    creating: 'Creating account…',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    createTitle: 'Create your Account',
    createSubtitle: 'Enter your details to create a new customer account.',
    switchToCreatePrompt: "Don't have an account?",
    switchToCreateAction: 'Create your Account',
    switchToLoginPrompt: 'Already have an account?',
    switchToLoginAction: 'Sign in',
  },
  validation: {
    nameRequired: 'Full name is required.',
    emailRequired: 'Email is required.',
    emailInvalid: 'Please enter a valid email address.',
    passwordRequired: 'Password is required.',
    passwordTooShort: `Password must be at least ${LOGIN_MIN_PASSWORD_LENGTH} characters.`,
    minPasswordLength: LOGIN_MIN_PASSWORD_LENGTH,
    invalidCredentials: 'Invalid email or password.',
    registerFailed: 'Unable to create your account. Please try again.',
  },
  footerNote: (year, appName) => `© ${year} ${appName}`,
};
