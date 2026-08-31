import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsView from '../SettingsView';
import { SETTINGS_COPY } from '../settingsCopy';
import {
  SETTINGS_MODERATORS_SEED,
  SETTINGS_MODERATORS_TABLE_CARD_CLASS,
  SETTINGS_MODERATORS_TABLE_MIN_WIDTH_PX,
  SETTINGS_PAGE_CLASS,
  SETTINGS_VIEWPORT,
} from '../settingsData';
import { SETTINGS_MODERATORS_CARDS_MEDIA_QUERY } from '../useSettingsModeratorCompactLayout';

const mockMatchMedia = (matchesCompactLayout) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: matchesCompactLayout && query === SETTINGS_MODERATORS_CARDS_MEDIA_QUERY,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};

const createSettingsViewProps = (overrides = {}) => ({
  copy: SETTINGS_COPY,
  inviteEmail: '',
  inviteEmailError: '',
  moderators: SETTINGS_MODERATORS_SEED,
  moderatorCountLabel: SETTINGS_COPY.moderators.countLabel(SETTINGS_MODERATORS_SEED.length),
  pagination: {
    rangeLabel: 'Showing 1 to 7 of 7 results',
    canGoPrevious: false,
    canGoNext: false,
  },
  onInviteEmailChange: jest.fn(),
  onSendInvite: jest.fn((event) => event.preventDefault()),
  onEditModerator: jest.fn(),
  onPreviousPage: jest.fn(),
  onNextPage: jest.fn(),
  ...overrides,
});

const renderSettingsView = (overrides = {}) =>
  render(<SettingsView {...createSettingsViewProps(overrides)} />);

describe('SettingsView', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it('renders the Role & Permission Strategy header from Figma', () => {
    const { container } = renderSettingsView();

    expect(screen.getByRole('heading', { level: 1, name: SETTINGS_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(SETTINGS_COPY.subtitleLineOne)).toBeInTheDocument();
    expect(screen.getByText(SETTINGS_COPY.subtitleLineTwo)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(...SETTINGS_PAGE_CLASS.split(' '));
  });

  it('renders the invite team card with email and send controls', () => {
    renderSettingsView();

    expect(screen.getByRole('heading', { level: 2, name: SETTINGS_COPY.invite.title })).toBeInTheDocument();
    expect(screen.getByLabelText(SETTINGS_COPY.invite.emailLabel)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: SETTINGS_COPY.invite.sendLabel })).toBeInTheDocument();
  });

  it('shows an inline invite email error when provided', () => {
    renderSettingsView({ inviteEmailError: SETTINGS_COPY.invite.emailInvalid });

    expect(screen.getByText(SETTINGS_COPY.invite.emailInvalid)).toBeInTheDocument();
  });

  it('wires invite form handlers', async () => {
    const user = userEvent.setup();
    const onInviteEmailChange = jest.fn();
    const onSendInvite = jest.fn((event) => event.preventDefault());

    renderSettingsView({ onInviteEmailChange, onSendInvite });

    await user.type(screen.getByLabelText(SETTINGS_COPY.invite.emailLabel), 'a@b.com');
    expect(onInviteEmailChange).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: SETTINGS_COPY.invite.sendLabel }));
    expect(onSendInvite).toHaveBeenCalled();
  });

  it('renders Moderator Management table columns and rows from Figma', () => {
    renderSettingsView();

    expect(
      screen.getByRole('heading', { level: 2, name: SETTINGS_COPY.moderators.title }),
    ).toBeInTheDocument();
    expect(screen.getByText('7 moderator')).toBeInTheDocument();

    const table = screen.getByRole('table', { name: SETTINGS_COPY.moderators.title });

    expect(within(table).getByRole('columnheader', { name: SETTINGS_COPY.moderators.columns.name })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: SETTINGS_COPY.moderators.columns.phone })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: SETTINGS_COPY.moderators.columns.email })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: SETTINGS_COPY.moderators.columns.access })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: SETTINGS_COPY.moderators.columns.status })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: SETTINGS_COPY.moderators.columns.action })).toBeInTheDocument();

    expect(within(table).getByText('Albert Flores')).toBeInTheDocument();
    expect(within(table).getByText('Brooklyn Simmons')).toBeInTheDocument();
    expect(within(table).getAllByText('Active').length).toBeGreaterThanOrEqual(6);
    expect(within(table).getByText('Disabled')).toBeInTheDocument();
  });

  it('renders moderator cards for laptop tablet and mobile viewports', () => {
    mockMatchMedia(true);
    renderSettingsView();

    expect(SETTINGS_VIEWPORT).toEqual({
      MOBILE_S: 320,
      MOBILE_M: 375,
      MOBILE_L: 425,
      TABLET: 768,
      LAPTOP: 1020,
      DESKTOP: 1440,
    });
    expect(SETTINGS_MODERATORS_TABLE_MIN_WIDTH_PX).toBe(1109);
    expect(
      screen.queryByRole('table', { name: SETTINGS_COPY.moderators.title }),
    ).not.toBeInTheDocument();

    const cards = screen.getByTestId('settings-moderator-cards');
    const firstCard = screen.getByTestId('settings-moderator-card-albert-flores');

    expect(cards).toBeInTheDocument();
    expect(firstCard).toHaveTextContent('Albert Flores');
    expect(firstCard).toHaveTextContent('(239) 555-0108');
    expect(firstCard).toHaveTextContent('curtis.weaver@example.com');
    expect(firstCard).toHaveTextContent('Dashboard/ Overview');
    expect(within(firstCard).getByText('Active')).toBeInTheDocument();
    expect(
      within(firstCard).getByRole('button', {
        name: SETTINGS_COPY.moderators.editLabel('Albert Flores'),
      }),
    ).toBeInTheDocument();
  });

  it('uses Figma viewport breakpoints for the moderator table card', () => {
    renderSettingsView();

    const tableCard = screen.getByTestId('settings-moderator-table-card');
    const table = screen.getByRole('table', { name: SETTINGS_COPY.moderators.title });
    const footer = screen.getByText('Showing 1 to 7 of 7 results').closest('footer');
    const nextButton = screen.getByRole('button', { name: SETTINGS_COPY.moderators.pagination.next });

    expect(tableCard.className).toContain('min-[768px]:rounded-xl');
    expect(table.className).toContain(`min-w-[${SETTINGS_MODERATORS_TABLE_MIN_WIDTH_PX}px]`);
    expect(table.className).toContain('table-fixed');
    expect(footer.className).toContain('min-[768px]:flex-row');
    expect(footer.className).toContain('min-[1020px]:px-6');
    expect(nextButton.className).toContain('min-[426px]:text-base');
    expect(SETTINGS_MODERATORS_TABLE_CARD_CLASS).toContain('min-[768px]:rounded-xl');
  });

  it('wires moderator edit and pagination handlers', async () => {
    const user = userEvent.setup();
    const onEditModerator = jest.fn();
    const onPreviousPage = jest.fn();
    const onNextPage = jest.fn();

    renderSettingsView({
      onEditModerator,
      onPreviousPage,
      onNextPage,
      pagination: {
        rangeLabel: 'Showing 1 to 7 of 7 results',
        canGoPrevious: true,
        canGoNext: true,
      },
    });

    await user.click(
      within(screen.getByRole('table', { name: SETTINGS_COPY.moderators.title })).getByRole(
        'button',
        {
          name: SETTINGS_COPY.moderators.editLabel('Albert Flores'),
        },
      ),
    );
    expect(onEditModerator).toHaveBeenCalledWith('albert-flores');

    const pagination = screen.getByTestId('settings-moderator-pagination');
    await user.click(within(pagination).getByRole('button', { name: SETTINGS_COPY.moderators.pagination.previous }));
    expect(onPreviousPage).toHaveBeenCalled();

    await user.click(within(pagination).getByRole('button', { name: SETTINGS_COPY.moderators.pagination.next }));
    expect(onNextPage).toHaveBeenCalled();
  });

  it('renders pagination summary from Figma', () => {
    renderSettingsView();

    expect(screen.getByText('Showing 1 to 7 of 7 results')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: SETTINGS_COPY.moderators.pagination.previous })).toBeDisabled();
    expect(screen.getByRole('button', { name: SETTINGS_COPY.moderators.pagination.next })).toBeDisabled();
  });
});
