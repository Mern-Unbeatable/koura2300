import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsView from '../SettingsView';
import { SETTINGS_COPY } from '../settingsCopy';
import {
  SETTINGS_EDIT_MATRIX_SEED,
  SETTINGS_PAGE_CLASS,
  SETTINGS_ROLE_MODERATOR,
  SETTINGS_ROLE_OPTIONS,
  SETTINGS_VISIBILITY_MATRIX_SEED,
} from '../settingsData';

const createSettingsViewProps = (overrides = {}) => ({
  copy: SETTINGS_COPY,
  inviteEmail: '',
  inviteRole: SETTINGS_ROLE_MODERATOR,
  inviteEmailError: '',
  roleOptions: SETTINGS_ROLE_OPTIONS,
  editModules: SETTINGS_EDIT_MATRIX_SEED,
  visibilityRows: SETTINGS_VISIBILITY_MATRIX_SEED,
  onInviteEmailChange: jest.fn(),
  onInviteRoleChange: jest.fn(),
  onSendInvite: jest.fn((event) => event.preventDefault()),
  onToggleEditPermission: jest.fn(),
  onRemoveEditModule: jest.fn(),
  onDownloadVisibility: jest.fn(),
  ...overrides,
});

const renderSettingsView = (overrides = {}) =>
  render(<SettingsView {...createSettingsViewProps(overrides)} />);

describe('SettingsView', () => {
  it('renders the Role & Permission Strategy header from Figma', () => {
    const { container } = renderSettingsView();

    expect(screen.getByRole('heading', { level: 1, name: SETTINGS_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(SETTINGS_COPY.subtitleLineOne)).toBeInTheDocument();
    expect(screen.getByText(SETTINGS_COPY.subtitleLineTwo)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(...SETTINGS_PAGE_CLASS.split(' '));
  });

  it('renders the invite team card with email, role, and send controls', () => {
    renderSettingsView();

    expect(screen.getByRole('heading', { level: 2, name: SETTINGS_COPY.invite.title })).toBeInTheDocument();
    expect(screen.getByLabelText(SETTINGS_COPY.invite.emailLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(SETTINGS_COPY.invite.roleLabel)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: SETTINGS_COPY.invite.sendLabel })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Moderator' })).toBeInTheDocument();
  });

  it('shows an inline invite email error when provided', () => {
    renderSettingsView({ inviteEmailError: SETTINGS_COPY.invite.emailInvalid });

    expect(screen.getByText(SETTINGS_COPY.invite.emailInvalid)).toBeInTheDocument();
  });

  it('wires invite form handlers', async () => {
    const user = userEvent.setup();
    const onInviteEmailChange = jest.fn();
    const onInviteRoleChange = jest.fn();
    const onSendInvite = jest.fn((event) => event.preventDefault());

    renderSettingsView({ onInviteEmailChange, onInviteRoleChange, onSendInvite });

    await user.type(screen.getByLabelText(SETTINGS_COPY.invite.emailLabel), 'a@b.com');
    expect(onInviteEmailChange).toHaveBeenCalled();

    await user.selectOptions(screen.getByLabelText(SETTINGS_COPY.invite.roleLabel), 'moderator');
    expect(onInviteRoleChange).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: SETTINGS_COPY.invite.sendLabel }));
    expect(onSendInvite).toHaveBeenCalled();
  });

  it('renders Edit Matrix rows with toggles and delete actions', () => {
    renderSettingsView();

    expect(screen.getByRole('heading', { level: 2, name: SETTINGS_COPY.editMatrix.title })).toBeInTheDocument();
    expect(screen.getByText('Dashboard/ Overview')).toBeInTheDocument();

    const editList = screen.getByRole('list', { name: SETTINGS_COPY.editMatrix.title });
    expect(within(editList).getByText('Categories Management')).toBeInTheDocument();

    const bookingsToggle = screen.getByRole('switch', {
      name: SETTINGS_COPY.editMatrix.toggleLabel('Bookings', true),
    });
    expect(bookingsToggle).toHaveAttribute('aria-checked', 'true');

    expect(
      screen.getByRole('button', {
        name: SETTINGS_COPY.editMatrix.deleteLabel('Bookings'),
      }),
    ).toBeInTheDocument();
  });

  it('wires edit matrix toggle and delete handlers', async () => {
    const user = userEvent.setup();
    const onToggleEditPermission = jest.fn();
    const onRemoveEditModule = jest.fn();

    renderSettingsView({ onToggleEditPermission, onRemoveEditModule });

    await user.click(
      screen.getByRole('switch', {
        name: SETTINGS_COPY.editMatrix.toggleLabel('Services', true),
      }),
    );
    expect(onToggleEditPermission).toHaveBeenCalledWith('services');

    await user.click(
      screen.getByRole('button', {
        name: SETTINGS_COPY.editMatrix.deleteLabel('Messages'),
      }),
    );
    expect(onRemoveEditModule).toHaveBeenCalledWith('messages');
  });

  it('renders Visibility Matrix statuses and download action', () => {
    renderSettingsView();

    expect(
      screen.getByRole('heading', { level: 2, name: SETTINGS_COPY.visibilityMatrix.title }),
    ).toBeInTheDocument();
    expect(screen.getByText('Overview / Analytics')).toBeInTheDocument();

    const visibilityRegion = screen.getByRole('region', {
      name: SETTINGS_COPY.visibilityMatrix.title,
    });
    expect(within(visibilityRegion).getAllByText('Visible').length).toBeGreaterThanOrEqual(4);
    expect(within(visibilityRegion).getAllByText('Hidden').length).toBeGreaterThanOrEqual(4);
    expect(
      screen.getByRole('button', { name: SETTINGS_COPY.visibilityMatrix.downloadLabel }),
    ).toBeInTheDocument();
  });

  it('wires visibility download handler', async () => {
    const user = userEvent.setup();
    const onDownloadVisibility = jest.fn();

    renderSettingsView({ onDownloadVisibility });

    await user.click(
      screen.getByRole('button', { name: SETTINGS_COPY.visibilityMatrix.downloadLabel }),
    );
    expect(onDownloadVisibility).toHaveBeenCalled();
  });
});
