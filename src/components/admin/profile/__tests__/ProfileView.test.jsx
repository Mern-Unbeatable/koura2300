import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileView from '../ProfileView';
import { PROFILE_COPY } from '../profileCopy';
import {
  PROFILE_CARD_CLASS,
  PROFILE_PAGE_CLASS,
  PROFILE_SEED,
  PROFILE_VIEWPORT,
} from '../profileData';

const createProfileViewProps = (overrides = {}) => ({
  copy: PROFILE_COPY,
  displayName: PROFILE_SEED.displayName,
  displayEmail: PROFILE_SEED.displayEmail,
  avatarPreviewUrl: '',
  name: PROFILE_SEED.name,
  email: PROFILE_SEED.email,
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  accountErrors: { name: '', email: '' },
  passwordErrors: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  passwordVisibility: {
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  },
  onNameChange: jest.fn(),
  onEmailChange: jest.fn(),
  onCurrentPasswordChange: jest.fn(),
  onNewPasswordChange: jest.fn(),
  onConfirmPasswordChange: jest.fn(),
  onTogglePasswordVisibility: jest.fn(),
  onAvatarChange: jest.fn(),
  onUpdateProfile: jest.fn((event) => event.preventDefault()),
  onChangePassword: jest.fn((event) => event.preventDefault()),
  ...overrides,
});

const renderProfileView = (overrides = {}) =>
  render(<ProfileView {...createProfileViewProps(overrides)} />);

describe('ProfileView', () => {
  it('renders the My Profile header from Figma', () => {
    const { container } = renderProfileView();

    expect(screen.getByRole('heading', { level: 1, name: PROFILE_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(PROFILE_COPY.subtitle)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(...PROFILE_PAGE_CLASS.split(' '));
  });

  it('renders identity, account, and password sections from Figma', () => {
    renderProfileView();

    expect(screen.getByText(PROFILE_SEED.displayName)).toBeInTheDocument();
    expect(screen.getByText(PROFILE_SEED.displayEmail)).toBeInTheDocument();
    expect(screen.getByText(PROFILE_COPY.accountTitle)).toBeInTheDocument();
    expect(screen.getByLabelText(PROFILE_COPY.fields.name)).toHaveValue(PROFILE_SEED.name);
    expect(screen.getByLabelText(PROFILE_COPY.fields.email)).toHaveValue(PROFILE_SEED.email);
    expect(
      screen.getByRole('heading', { level: 2, name: PROFILE_COPY.passwordTitle }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(PROFILE_COPY.fields.currentPassword)).toBeInTheDocument();
    expect(screen.getByLabelText(PROFILE_COPY.fields.newPassword)).toBeInTheDocument();
    expect(screen.getByLabelText(PROFILE_COPY.fields.confirmPassword)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: PROFILE_COPY.actions.updateProfile }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: PROFILE_COPY.actions.changePassword }),
    ).toBeInTheDocument();
  });

  it('shows inline account and password errors', () => {
    renderProfileView({
      accountErrors: {
        name: PROFILE_COPY.errors.nameRequired,
        email: PROFILE_COPY.errors.emailInvalid,
      },
      passwordErrors: {
        currentPassword: PROFILE_COPY.errors.currentPasswordRequired,
        newPassword: '',
        confirmPassword: PROFILE_COPY.errors.confirmPasswordMismatch,
      },
    });

    expect(screen.getByText(PROFILE_COPY.errors.nameRequired)).toBeInTheDocument();
    expect(screen.getByText(PROFILE_COPY.errors.emailInvalid)).toBeInTheDocument();
    expect(screen.getByText(PROFILE_COPY.errors.currentPasswordRequired)).toBeInTheDocument();
    expect(screen.getByText(PROFILE_COPY.errors.confirmPasswordMismatch)).toBeInTheDocument();
  });

  it('wires account and password form handlers', async () => {
    const user = userEvent.setup();
    const onNameChange = jest.fn();
    const onUpdateProfile = jest.fn((event) => event.preventDefault());
    const onChangePassword = jest.fn((event) => event.preventDefault());
    const onTogglePasswordVisibility = jest.fn();

    renderProfileView({
      onNameChange,
      onUpdateProfile,
      onChangePassword,
      onTogglePasswordVisibility,
    });

    await user.type(screen.getByLabelText(PROFILE_COPY.fields.name), 'A');
    expect(onNameChange).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: PROFILE_COPY.actions.updateProfile }));
    expect(onUpdateProfile).toHaveBeenCalled();

    await user.click(
      screen.getByRole('button', { name: PROFILE_COPY.visibility.show(PROFILE_COPY.fields.currentPassword) }),
    );
    expect(onTogglePasswordVisibility).toHaveBeenCalledWith('currentPassword');

    await user.click(screen.getByRole('button', { name: PROFILE_COPY.actions.changePassword }));
    expect(onChangePassword).toHaveBeenCalled();
  });

  it('uses responsive Figma classes across desktop through mobile breakpoints', () => {
    renderProfileView();

    const card = screen.getByTestId('admin-profile-card');
    const accountForm = screen.getByTestId('admin-profile-account-fields');
    const passwordForm = screen.getByTestId('admin-profile-password-fields');

    expect(PROFILE_VIEWPORT).toEqual({
      MOBILE_S: 320,
      MOBILE_M: 375,
      MOBILE_L: 425,
      TABLET: 768,
      LAPTOP: 1020,
      DESKTOP: 1440,
    });
    expect(PROFILE_CARD_CLASS).toContain('rounded-[20px]');
    expect(card.className).toContain('px-4');
    expect(card.className).toContain('min-[1020px]:px-[41px]');
    expect(accountForm.className).toContain('min-[768px]:flex-row');
    expect(passwordForm.className).toContain('min-[1020px]:flex-row');
    expect(
      within(card).getByRole('button', { name: PROFILE_COPY.actions.updateProfile }).className,
    ).toContain('bg-[#fc6f32]');
  });
});
