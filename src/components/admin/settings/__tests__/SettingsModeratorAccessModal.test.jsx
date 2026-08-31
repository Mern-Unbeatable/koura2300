import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsModeratorAccessModal from '../SettingsModeratorAccessModal';
import { SETTINGS_MODERATOR_ACCESS_COPY } from '../settingsAccessCopy';
import {
  SETTINGS_MODERATOR_ACCESS_DIALOG_CLASS,
  SETTINGS_MODERATOR_ACCESS_OVERLAY_CLASS,
  SETTINGS_MODERATOR_ACCESS_PERMISSIONS,
  SETTINGS_MODERATOR_STATUS_ACTIVE,
  SETTINGS_MODERATOR_STATUS_DISABLED,
} from '../settingsAccessData';

const createModerator = (overrides = {}) => ({
  id: 'albert-flores',
  name: 'Albert Flores',
  access: 'Dashboard/ Overview',
  status: SETTINGS_MODERATOR_STATUS_ACTIVE,
  ...overrides,
});

describe('SettingsModeratorAccessModal', () => {
  it('renders the Figma Moderator access dialog with all permissions', () => {
    render(
      <SettingsModeratorAccessModal
        moderator={createModerator()}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    expect(
      screen.getByRole('dialog', { name: SETTINGS_MODERATOR_ACCESS_COPY.regionLabel }),
    ).toBeInTheDocument();
    expect(screen.getByText(SETTINGS_MODERATOR_ACCESS_COPY.title)).toBeInTheDocument();

    SETTINGS_MODERATOR_ACCESS_PERMISSIONS.forEach((permission) => {
      expect(screen.getByRole('checkbox', { name: permission.label })).toBeInTheDocument();
    });

    expect(
      screen.getByRole('button', { name: SETTINGS_MODERATOR_ACCESS_COPY.active }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: SETTINGS_MODERATOR_ACCESS_COPY.disabled }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: SETTINGS_MODERATOR_ACCESS_COPY.save }),
    ).toBeInTheDocument();
  });

  it('checks Overview / Analytics for Dashboard/ Overview moderators', () => {
    render(
      <SettingsModeratorAccessModal
        moderator={createModerator()}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    expect(screen.getByRole('checkbox', { name: 'Overview / Analytics' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Bookings' })).not.toBeChecked();
  });

  it('toggles permissions and saves Active/Disabled status', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();

    render(
      <SettingsModeratorAccessModal
        moderator={createModerator()}
        onClose={jest.fn()}
        onSave={onSave}
      />,
    );

    await user.click(screen.getByRole('checkbox', { name: 'Bookings' }));
    await user.click(screen.getByRole('button', { name: SETTINGS_MODERATOR_ACCESS_COPY.disabled }));
    await user.click(screen.getByRole('button', { name: SETTINGS_MODERATOR_ACCESS_COPY.save }));

    expect(onSave).toHaveBeenCalledWith({
      moderatorId: 'albert-flores',
      permissionIds: ['overview-analytics', 'bookings'],
      status: SETTINGS_MODERATOR_STATUS_DISABLED,
    });
  });

  it('closes from the close button and overlay click', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <SettingsModeratorAccessModal
        moderator={createModerator()}
        onClose={onClose}
        onSave={jest.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: SETTINGS_MODERATOR_ACCESS_COPY.closeLabel }));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('settings-moderator-access-overlay'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('uses responsive Figma dialog classes across breakpoints', () => {
    render(
      <SettingsModeratorAccessModal
        moderator={createModerator()}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />,
    );

    const dialog = screen.getByRole('dialog', {
      name: SETTINGS_MODERATOR_ACCESS_COPY.regionLabel,
    });
    const overlay = screen.getByTestId('settings-moderator-access-overlay');
    const actions = screen.getByTestId('settings-moderator-access-actions');

    expect(dialog.className).toContain('max-w-[470px]');
    expect(SETTINGS_MODERATOR_ACCESS_DIALOG_CLASS).toContain('max-w-[470px]');
    expect(SETTINGS_MODERATOR_ACCESS_OVERLAY_CLASS).toContain('animate-fade-in');
    expect(overlay.className).toContain('animate-fade-in');
    expect(actions.className).toContain('min-[376px]:flex-row');
    expect(within(dialog).getByText(SETTINGS_MODERATOR_ACCESS_COPY.title).className).toContain(
      'min-[376px]:text-xl',
    );
  });
});
