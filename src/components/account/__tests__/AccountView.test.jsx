import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountView from '../AccountView';
import { ACCOUNT_CONTENT } from '../accountCopy';
import { ACCOUNT_DEFAULT_PROFILE, ACCOUNT_PASSWORD_FIELDS, ACCOUNT_PROFILE_FIELDS } from '../accountData';

const createAccountViewProps = (overrides = {}) => ({
  profile: ACCOUNT_DEFAULT_PROFILE,
  profileCopy: ACCOUNT_CONTENT.accountSetting,
  profileFields: ACCOUNT_PROFILE_FIELDS,
  passwordCopy: ACCOUNT_CONTENT.changePassword,
  passwordFields: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  passwordVisibility: {
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  },
  passwordFieldNames: ACCOUNT_PASSWORD_FIELDS,
  isSaveDisabled: false,
  isPasswordSubmitDisabled: true,
  onProfileChange: jest.fn(),
  onSaveProfile: jest.fn(),
  onPasswordChange: jest.fn(),
  onPasswordSubmit: jest.fn(),
  onTogglePasswordVisibility: jest.fn(),
  onAvatarChange: jest.fn(),
  ...overrides,
});

describe('AccountView', () => {
  it('renders account setting and change password regions from Figma', () => {
    render(<AccountView {...createAccountViewProps()} />);

    expect(
      screen.getByRole('region', { name: ACCOUNT_CONTENT.accountSetting.regionLabel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: ACCOUNT_CONTENT.changePassword.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(ACCOUNT_CONTENT.accountSetting.title)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: ACCOUNT_CONTENT.changePassword.title }),
    ).toBeInTheDocument();
  });

  it('renders seeded profile values from the design', () => {
    render(<AccountView {...createAccountViewProps()} />);

    expect(screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.fullNameLabel)).toHaveValue(
      'Kevin Display name',
    );
    expect(screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.emailLabel)).toHaveValue(
      'customer@gmail.com',
    );
    expect(screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.phoneLabel)).toHaveValue(
      '+1-202-555-0118',
    );
    expect(screen.getByLabelText(ACCOUNT_CONTENT.accountSetting.addressLabel)).toHaveValue(
      ACCOUNT_DEFAULT_PROFILE.address,
    );
  });

  it('uses responsive two-column layout classes', () => {
    const { container } = render(<AccountView {...createAccountViewProps()} />);

    expect(container.firstChild).toHaveClass('xl:grid-cols-2');
    expect(screen.getByRole('img', { name: ACCOUNT_DEFAULT_PROFILE.avatarAlt })).toHaveClass(
      'size-[176px]',
    );
  });

  it('calls onSaveProfile when Save Changes is clicked', async () => {
    const user = userEvent.setup();
    const onSaveProfile = jest.fn();

    render(<AccountView {...createAccountViewProps({ onSaveProfile })} />);

    const accountRegion = screen.getByRole('region', {
      name: ACCOUNT_CONTENT.accountSetting.regionLabel,
    });

    await user.click(
      within(accountRegion).getByRole('button', { name: ACCOUNT_CONTENT.accountSetting.saveButton }),
    );

    expect(onSaveProfile).toHaveBeenCalledTimes(1);
  });

  it('calls onPasswordSubmit when Change Password is clicked', async () => {
    const user = userEvent.setup();
    const onPasswordSubmit = jest.fn();

    render(
      <AccountView
        {...createAccountViewProps({
          isPasswordSubmitDisabled: false,
          onPasswordSubmit,
        })}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: ACCOUNT_CONTENT.changePassword.submitButton }),
    );

    expect(onPasswordSubmit).toHaveBeenCalledTimes(1);
  });

  it('disables password submit when validation has not passed', () => {
    render(<AccountView {...createAccountViewProps({ isPasswordSubmitDisabled: true })} />);

    expect(
      screen.getByRole('button', { name: ACCOUNT_CONTENT.changePassword.submitButton }),
    ).toBeDisabled();
  });
});
