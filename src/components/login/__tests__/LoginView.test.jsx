import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginView from '../LoginView';
import { LOGIN_COPY } from '../loginCopy';
import { LOGIN_AUTH_MODES } from '../loginData';

const createLoginViewProps = (overrides = {}) => ({
  copy: LOGIN_COPY,
  authMode: LOGIN_AUTH_MODES.LOGIN,
  name: '',
  phone: '',
  address: '',
  email: '',
  password: '',
  showPassword: false,
  errors: {},
  isLoading: false,
  onNameChange: jest.fn(),
  onPhoneChange: jest.fn(),
  onAddressChange: jest.fn(),
  onEmailChange: jest.fn(),
  onPasswordChange: jest.fn(),
  onTogglePasswordVisibility: jest.fn(),
  onSwitchToCreateAccount: jest.fn(),
  onSwitchToLogin: jest.fn(),
  onSubmit: jest.fn(),
  ...overrides,
});

describe('LoginView', () => {
  it('renders branded login form from site copy', () => {
    render(<LoginView {...createLoginViewProps()} />);

    expect(screen.getByRole('heading', { name: LOGIN_COPY.form.title })).toBeInTheDocument();
    expect(screen.getByLabelText(LOGIN_COPY.form.emailLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(LOGIN_COPY.form.passwordLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: LOGIN_COPY.form.submit }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: LOGIN_COPY.form.switchToCreateAction }),
    ).toBeInTheDocument();
  });

  it('renders desktop hero panel copy', () => {
    render(<LoginView {...createLoginViewProps()} />);

    expect(screen.getByText(LOGIN_COPY.hero.title)).toBeInTheDocument();
    expect(screen.getByText(LOGIN_COPY.hero.description)).toBeInTheDocument();
  });

  it('shows create-account fields when create mode is active', () => {
    render(
      <LoginView
        {...createLoginViewProps({
          authMode: LOGIN_AUTH_MODES.CREATE_ACCOUNT,
        })}
      />,
    );

    expect(
      screen.getByRole('heading', { name: LOGIN_COPY.form.createTitle }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(LOGIN_COPY.form.nameLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(LOGIN_COPY.form.phoneLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(LOGIN_COPY.form.addressLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(LOGIN_COPY.form.emailLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(LOGIN_COPY.form.passwordLabel)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: LOGIN_COPY.form.createSubmit }),
    ).toBeInTheDocument();
  });

  it('switches to create account when the CTA is clicked', async () => {
    const user = userEvent.setup();
    const onSwitchToCreateAccount = jest.fn();

    render(
      <LoginView {...createLoginViewProps({ onSwitchToCreateAccount })} />,
    );

    await user.click(
      screen.getByRole('button', { name: LOGIN_COPY.form.switchToCreateAction }),
    );

    expect(onSwitchToCreateAccount).toHaveBeenCalledTimes(1);
  });
});
