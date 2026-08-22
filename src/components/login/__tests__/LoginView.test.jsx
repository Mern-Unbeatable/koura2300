import { render, screen } from '@testing-library/react';
import LoginView from '../LoginView';
import { LOGIN_COPY } from '../loginCopy';

const createLoginViewProps = (overrides = {}) => ({
  copy: LOGIN_COPY,
  email: '',
  password: '',
  showPassword: false,
  errors: {},
  isLoading: false,
  onEmailChange: jest.fn(),
  onPasswordChange: jest.fn(),
  onTogglePasswordVisibility: jest.fn(),
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
  });

  it('renders desktop hero panel copy', () => {
    render(<LoginView {...createLoginViewProps()} />);

    expect(screen.getByText(LOGIN_COPY.hero.title)).toBeInTheDocument();
    expect(screen.getByText(LOGIN_COPY.hero.description)).toBeInTheDocument();
  });
});
